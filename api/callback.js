function getBaseUrl(req) {
  const host = req.headers["x-forwarded-host"] ?? req.headers.host;
  const protocol = req.headers["x-forwarded-proto"] ?? "https";
  return `${protocol}://${host}`;
}

function parseCookies(cookieHeader = "") {
  return Object.fromEntries(
    cookieHeader
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const [name, ...value] = part.split("=");
        return [name, decodeURIComponent(value.join("="))];
      }),
  );
}

function authResponse(provider, status, content) {
  const message = JSON.stringify(`authorization:${provider}:${status}:${JSON.stringify(content)}`);

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <title>Authorization complete</title>
  </head>
  <body>
    <script>
      (function () {
        function receiveMessage(event) {
          window.opener.postMessage(${message}, event.origin);
          window.removeEventListener("message", receiveMessage, false);
          window.close();
        }

        window.addEventListener("message", receiveMessage, false);

        if (window.opener) {
          window.opener.postMessage("authorizing:${provider}", "*");
        }
      })();
    </script>
  </body>
</html>`;
}

export default async function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const { code, state, error, error_description: errorDescription } = req.query;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Set-Cookie", "decap_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0");

  if (error) {
    res.status(400).send(authResponse("github", "error", { error, error_description: errorDescription }));
    return;
  }

  if (!clientId || !clientSecret) {
    res.status(500).send(authResponse("github", "error", { error: "Missing GitHub OAuth environment variables" }));
    return;
  }

  if (!code || typeof code !== "string") {
    res.status(400).send(authResponse("github", "error", { error: "Missing authorization code" }));
    return;
  }

  const cookies = parseCookies(req.headers.cookie);
  if (!state || state !== cookies.decap_oauth_state) {
    res.status(400).send(authResponse("github", "error", { error: "Invalid OAuth state" }));
    return;
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: `${getBaseUrl(req)}/api/callback`,
    }),
  });

  const tokenPayload = await tokenResponse.json();

  if (!tokenResponse.ok || tokenPayload.error || !tokenPayload.access_token) {
    res
      .status(400)
      .send(authResponse("github", "error", { error: tokenPayload.error ?? "Failed to fetch access token" }));
    return;
  }

  res.status(200).send(authResponse("github", "success", {
    token: tokenPayload.access_token,
    provider: "github",
  }));
}

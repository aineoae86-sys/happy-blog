import crypto from "node:crypto";

function getBaseUrl(req) {
  const host = req.headers["x-forwarded-host"] ?? req.headers.host;
  const protocol = req.headers["x-forwarded-proto"] ?? "https";
  return `${protocol}://${host}`;
}

export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    res.status(500).send("Missing GITHUB_CLIENT_ID");
    return;
  }

  const baseUrl = getBaseUrl(req);
  const state = crypto.randomBytes(24).toString("hex");
  const scope = typeof req.query.scope === "string" ? req.query.scope : "repo";
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${baseUrl}/api/callback`,
    scope,
    state,
  });

  res.setHeader(
    "Set-Cookie",
    `decap_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
  );
  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
}

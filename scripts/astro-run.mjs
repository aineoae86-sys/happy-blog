import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const astroBin = join(root, "node_modules", "astro", "bin", "astro.mjs");
const astroArgs = process.argv.slice(2);

const child = spawn(process.execPath, [astroBin, ...astroArgs], {
  cwd: root,
  env: {
    ...process.env,
    ASTRO_TELEMETRY_DISABLED: "1",
  },
  stdio: "inherit",
  shell: false,
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});

child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});

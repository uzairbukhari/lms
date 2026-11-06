// Lets the clip bundle import the web app's source (apps/web/src) and the shared schema, with ONE copy of React.
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, "..", "..");
const mine = join(here, "node_modules");

export function clipWebpackOverride(config) {
  const alias = { ...(config.resolve?.alias ?? {}) };
  // The web app's files sit outside tools/clips, so a plain `import "react"` from there would find the root install
  // (a second React, and hooks would break). Always resolve React from this folder.
  for (const name of ["react", "react-dom"]) alias[`${name}$`] = join(mine, name, "index.js");
  alias["react-dom/client"] = join(mine, "react-dom", "client.js");
  alias["react/jsx-runtime"] = join(mine, "react", "jsx-runtime.js");
  alias["react/jsx-dev-runtime"] = join(mine, "react", "jsx-dev-runtime.js");
  alias["@lms/schema$"] = join(repo, "packages/schema/src/index.ts");
  alias["@lms/schema/slides$"] = join(repo, "packages/schema/src/slides.ts");
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias,
      // Anything else the web files import (zod, via the schema) is found here first, then in the repo's own node_modules.
      modules: [mine, join(repo, "node_modules"), "node_modules"],
    },
  };
}

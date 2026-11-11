import { Config } from "@remotion/cli/config";
import { clipWebpackOverride } from "./webpack-override.mjs";

// Used by `npm run studio` only. scripts/render-clip.mjs passes the same override to the bundler itself.
Config.overrideWebpackConfig(clipWebpackOverride);

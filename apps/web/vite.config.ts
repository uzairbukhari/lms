import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // `npm run dev:worker` serves the API on 8787 during development.
    proxy: { "/api": "http://localhost:8787" },
  },
  test: {
    environment: "node",
  },
});

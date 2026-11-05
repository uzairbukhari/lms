import { defineConfig } from "vitest/config";

// The worker tests run real SQL migrations and password hashing, so on a shared CI runner a test that
// makes a dozen sequential calls can pass 5 seconds without being broken. A generous global ceiling
// stops one-off timeouts without hiding genuine hangs (those still fail at 30 seconds).
export default defineConfig({
  test: {
    testTimeout: 30_000,
    hookTimeout: 60_000,
  },
});

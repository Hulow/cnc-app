import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    // Reuse one jsdom per worker thread instead of recreating it per test
    // file — files still run isolated from each other, just cheaper setup.
    pool: "vmThreads",
  },
});

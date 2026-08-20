import { defineConfig, devices } from "@playwright/test";

// Replit exposes Chromium's Nix runtime libraries through this variable.
// Forward it for Playwright's browser child process when the shell has not
// already populated LD_LIBRARY_PATH.
const chromiumEnv = {
  ...process.env,
  ...(process.env.REPLIT_LD_LIBRARY_PATH
    ? {
        LD_LIBRARY_PATH: [
          process.env.LD_LIBRARY_PATH,
          process.env.REPLIT_LD_LIBRARY_PATH,
        ]
          .filter(Boolean)
          .join(":"),
      }
    : {}),
};

export default defineConfig({
  testDir: "./tests",
  // The main Vite app and the isolated mockup Vite server share this
  // development workspace. One browser worker keeps route/media assertions
  // deterministic without affecting production behavior.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:5000",
    trace: "on-first-retry",
    launchOptions: { env: chromiumEnv },
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:5000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
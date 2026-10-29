import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: "http://localhost:3100",
    headless: true,
    launchOptions: {
      executablePath:
        process.env.PLAYWRIGHT_CHROME_PATH || "/opt/google/chrome/chrome",
      args: ["--no-sandbox"],
    },
  },
  reporter: "list",
});

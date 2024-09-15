import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    // browser: {
    //   enabled: true,
    //   name: "chromium",
    //   provider: "playwright",
    //   // https://playwright.dev
    //   providerOptions: {},
    // },
    coverage: {
      reporter: ["html", "clover"],
    },
    // reporters: ["default", "html", "verbose"],
  },
  plugins: [tsconfigPaths()],
});

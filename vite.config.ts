/// <reference types="vitest" />
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import dts from "vite-plugin-dts";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "test/e2e/*"],
  },
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
  },
  plugins: [dts()],
});

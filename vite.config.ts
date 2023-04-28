import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      server: {
        host: true,
      },
      build: {
        rollupOptions: {
          input: {
            app: "test/index.html",
          },
        },
      },
    };
  }

  return {
    build: {
      lib: {
        entry: "src/index.ts",
        formats: ["es"],
        fileName: "index",
      },
    },
    plugins: [dts()],
  };
});

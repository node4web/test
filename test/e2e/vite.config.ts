import { defineConfig } from "vite";
import { redirect } from "vite-plugin-url-redirect";

export default defineConfig(() => {
  if (process.env.NODE_ENV === "test") {
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
      plugins: [redirect({ from: "/", to: "/test/" })],
    };
  }

  return {
    server: {
      host: true,
    },
  };
});

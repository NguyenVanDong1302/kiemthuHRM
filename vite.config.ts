import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import viteRewriteAll from "vite-plugin-rewrite-all";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    esbuild: {
      drop: command === "build" ? ["console", "debugger"] : [],
      pure:
        command === "build"
          ? [
              "console.log",
              "console.error",
              "console.warn",
              "console.debug",
              "console.trace",
            ]
          : [],
    },
    plugins: [react(), viteRewriteAll(), viteTsconfigPaths(), svgrPlugin()],
    server: {
      port: 8001,
    },
    resolve: {
      alias: {
        store: path.resolve(__dirname, "./src/store"),
        components: path.resolve(__dirname, "./src/components"),
        hooks: path.resolve(__dirname, "./src/hooks"),
        utils: path.resolve(__dirname, "./src/utils"),
        services: path.resolve(__dirname, "./src/services"),
        routes: path.resolve(__dirname, "./src/routes"),
      },
    },
  };
});

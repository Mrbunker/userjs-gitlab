import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import monkey, { cdn } from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: { "@": "/src/" } },
  esbuild: { charset: "utf8" },
  plugins: [
    vue(),
    monkey({
      entry: "src/main.ts",
      userscript: {
        // name: "gitlab",
        author: "*",
        version: "0.0.4",
        icon: "https://vitejs.dev/logo.svg",
        namespace: "npm/vite-plugin-monkey",
        match: ["*://*.gitlab.shxgroup.net/*"],
      },
      build: {
        fileName: "gitlab.user.js",
        externalGlobals: {
          vue: cdn.jsdelivr("Vue", "dist/vue.global.prod.js"),
        },
      },
    }),
  ],
});

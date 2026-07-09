import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import jsx from "@vitejs/plugin-vue-jsx";
import uno from "unocss/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: "/",

  plugins: [
    jsx(),
    uno({
      configFile: resolve(dirname(fileURLToPath(import.meta.url)), "../uno.config.ts")
    })
  ]
}));

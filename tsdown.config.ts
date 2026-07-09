import { defineConfig } from "tsdown";

export default defineConfig({
  dts: true,
  entry: ["src/index.ts"],
  exports: true,
  outExtensions: () => {
    return {
      js: ".js",
      dts: ".d.ts"
    };
  }
});

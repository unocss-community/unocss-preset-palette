import { defineConfig, presetWind4 } from "unocss";
import presetPalette from "./src";

export default defineConfig({

  presets: [
    presetWind4(),
    presetPalette({
      colorMode: {
        attribute: "data-theme"
      },
      colorFormat: "rgb",
      colors: {
        primary: "#ff0000",
        tertiary: "#30fad3",
        // dark mode
        secondary: {
          dark: "#000000",
          default: "#f5f5f5",
          // brown
          cafe: "#a52a2a"
        }
      }
    })
  ]
});

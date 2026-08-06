import { defineConfig, presetWind4 } from "unocss";
import presetPalette from "./src";

export default defineConfig({
  presets: [
    presetWind4(),
    presetPalette({
      colorMode: {
        attribute: "data-theme",
        defaultValue: "gallery"
      },
      colorFormat: "rgb",
      colorScheme: {
        gallery: "light",
        noir: "dark",
        cafe: "light",
        harbor: "light"
      },
      themeColors: {
        primary: {
          gallery: "#e23a3a",
          noir: "#ff6b6b",
          cafe: "#c45c26",
          harbor: "#0b6e99"
        },
        secondary: {
          gallery: "#eef1f5",
          noir: "#141820",
          cafe: "#a45a3a",
          harbor: "#dce8ef"
        },
        tertiary: {
          gallery: "#2bbfad",
          noir: "#3dd6c6",
          cafe: "#d9c3a5",
          harbor: "#1f9b8e"
        },
        ink: {
          gallery: "#171c26",
          noir: "#eef2f7",
          cafe: "#1c1410",
          harbor: "#102433"
        }
      }
    })
  ]
});

import { createGenerator, presetWind4 } from "unocss";
import { describe, expect, it } from "vitest";
import { presetPalette } from "../src";

describe("generate test", () => {
  it("generate prelights", async () => {
    const uno = await createGenerator({
      presets: [
        presetPalette({
          themeColors: {
            primary: "rgb(255,0,0)"
          }
        })
      ]
    });
    const { css } = await uno.generate("bg-primary");
    expect(css).toMatchInlineSnapshot(`
      "/* layer: palette */
      :root{--un-palette-primary-color-rgb:255 0 0;--un-palette-primary-color:rgb(var(--un-palette-primary-color-rgb));}"
    `);
  });

  it("generate", async () => {
    const uno = await createGenerator({
      presets: [
        presetPalette({
          themeColors: {
            primary: "rgb(255,0,0)"
          }
        }),
        presetWind4()
      ]
    });
    const { css } = await uno.generate("bg-primary", {
      preflights: false
    });
    expect(css).toMatchInlineSnapshot(`
      "/* layer: properties */
      @property --un-bg-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}
      /* layer: default */
      .bg-primary{background-color:color-mix(in srgb, rgb(var(--un-palette-primary-color-rgb)) var(--un-bg-opacity), transparent);}"
    `);
  });
});

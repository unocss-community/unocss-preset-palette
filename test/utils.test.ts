import { describe, expect, it } from "vitest";
import {
  colorComponentsToString,
  convertCssColor,
  getColorComponents,
  hsl2rgb,
  normalizeVarName,
  rgb2hsl,
  toCssColor
} from "../src/utils";

describe("utils test", () => {
  it("rgb2hsl", () => {
    expect(rgb2hsl([255, 0, 0])).toEqual([0, 1, 0.5]);
  });

  it("hsl2rgb", () => {
    expect(hsl2rgb([0, "100%", "50%"])).toEqual([255, 0, 0]);
  });

  it("toCssColor keeps matching color space", () => {
    expect(toCssColor("hsl(0 100% 50%)", "hsl")).toEqual({
      type: "hsl",
      components: ["0", "100%", "50%"],
      alpha: undefined
    });
  });

  it("toCssColor converts rgb to hsl", () => {
    expect(toCssColor("#ff0000", "hsl")).toEqual({
      type: "hsl",
      components: [0, "100%", "50%"],
      alpha: undefined
    });
  });

  it("toCssColor converts hsl to rgb", () => {
    expect(toCssColor("hsl(0, 100%, 50%)", "rgb")).toEqual({
      type: "rgb",
      components: [255, 0, 0],
      alpha: undefined
    });
  });

  it("convertCssColor normalizes rgba/hsla", () => {
    expect(convertCssColor({
      type: "rgba",
      components: [255, 0, 0],
      alpha: 0.5
    }, "rgb")).toEqual({
      type: "rgb",
      components: [255, 0, 0],
      alpha: 0.5
    });
  });

  it("getColorComponents", () => {
    const components = getColorComponents({
      primary: "rgb(255,0,0)"
    }, "light", "hsl");
    expect(colorComponentsToString(components.light.primary)).toEqual("0 100% 50%");
  });

  it("normalizeVarName", () => {
    expect(normalizeVarName("un-palette-primary-color")).toEqual("--un-palette-primary-color");
    expect(normalizeVarName("--un-palette-primary-color")).toEqual("--un-palette-primary-color");
  });
});

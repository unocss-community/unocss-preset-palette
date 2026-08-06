import type { CSSColorValue } from "@unocss/rule-utils";
import type { ThemeColors } from "./types";
import { parseCssColor } from "@unocss/rule-utils";

export function rgb2hsl(values: (string | number)[]) {
  const [r, g, b] = values.map((e) => Number(e) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    s = (max - l) / Math.min(l, 1 - l);

    switch (max) {
      case r:
        h = 60 * (g - b) / d;
        break;
      case g:
        h = 60 * ((b - r) / d + 2);
        break;
      case b:
        h = 60 * ((r - g) / d + 4);
        break;
    }
    if (h < 0) {
      h += 360;
    }
  }
  return [h, s, l] as const;
}

export function hsl2rgb(values: (string | number)[]) {
  const [hRaw, sRaw, lRaw] = values;
  const h = ((Number(hRaw) % 360) + 360) % 360;
  const s = parseChannel(sRaw, true);
  const l = parseChannel(lRaw, true);
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [
    Math.round(f(0) * 255),
    Math.round(f(8) * 255),
    Math.round(f(4) * 255)
  ] as const;
}

function parseChannel(value: string | number, percentage = false) {
  if (typeof value === "string" && value.endsWith("%")) {
    return Number(value.slice(0, -1)) / 100;
  }
  const num = Number(value);
  return percentage && num > 1 ? num / 100 : num;
}

function normalizeColorType(type: string): "rgb" | "hsl" | string {
  if (type === "rgba") {
    return "rgb";
  }
  if (type === "hsla") {
    return "hsl";
  }
  return type;
}

/**
 * Convert a CSSColorValue into the target rgb/hsl color space when needed.
 */
export function convertCssColor(color: CSSColorValue, colorFormat: "rgb" | "hsl"): CSSColorValue {
  const type = normalizeColorType(color.type);
  if (type === colorFormat) {
    return {
      type: colorFormat,
      components: [...color.components],
      alpha: color.alpha
    };
  }

  if (type === "rgb" && colorFormat === "hsl") {
    const [hue, sat, light] = rgb2hsl(color.components);
    return {
      type: "hsl",
      components: [hue, `${sat * 100}%`, `${light * 100}%`],
      alpha: color.alpha
    };
  }

  if (type === "hsl" && colorFormat === "rgb") {
    return {
      type: "rgb",
      components: [...hsl2rgb(color.components)],
      alpha: color.alpha
    };
  }

  return {
    type: colorFormat,
    components: [...color.components],
    alpha: color.alpha
  };
}

/**
 * Parse user color input into a CSSColorValue in the requested format.
 */
export function toCssColor(color: string | (string | number)[], colorFormat: "rgb" | "hsl"): CSSColorValue {
  if (Array.isArray(color)) {
    return {
      type: colorFormat,
      components: [...color],
      alpha: undefined
    };
  }

  const parsed = parseCssColor(color);
  if (parsed) {
    return convertCssColor(parsed, colorFormat);
  }

  return {
    type: colorFormat,
    components: [color],
    alpha: undefined
  };
}

export function colorComponentsToString(color: CSSColorValue) {
  return color.components.join(" ");
}

/**
 * 将主题颜色对象转换为指定格式的颜色组件
 *
 * @param colors - 主题颜色对象，包含不同主题下的颜色值
 * @param defaultTheme - 默认主题名称，用于处理未指定主题的颜色值
 * @param colorFormat - 颜色格式，支持 "rgb" 或 "hsl"
 * @returns 返回一个对象，包含按主题和颜色名称分类的 CSSColorValue
 */
export function getColorComponents(colors: ThemeColors = {}, defaultTheme: string, colorFormat: "rgb" | "hsl") {
  const rs: Record<string, Record<string, CSSColorValue>> = {};
  for (const key in colors) {
    const value = colors[key];

    if (typeof value === "string" || Array.isArray(value)) {
      if (!rs[defaultTheme]) {
        rs[defaultTheme] = {};
      }
      rs[defaultTheme][key] = toCssColor(value, colorFormat);
    } else {
      for (const themeName in value) {
        if (!rs[themeName]) {
          rs[themeName] = {};
        }
        rs[themeName][key] = toCssColor(value[themeName], colorFormat);
      }
    }
  }
  return rs;
}

export function normalizeVarName(varName: string) {
  return `--${varName}`.replace(/^-+/, "--");
}

const opacities = {
  // https://material.io/design/color/text-legibility.html#text-backgrounds
  text: {
    highEmphasis: 0.87,
    lowEmphasis: 0.6,
    disabled: 0.38,
  } as const,
  //  https://material.io/design/interaction/states.html#anatomy
  state: {
    hover: 0.04,
    focus: 0.12,
    selected: 0.08,
    activated: 0.12,
    pressed: 0.12,
    dragged: 0.08,
  } as const,
} as const;

const rgbPat = new RegExp(`#${"((?:\\d|[a-f]){2})".repeat(3)}`);

type KeyMap<T> = T extends Record<any, Record<any, any>> ? { [K in keyof T]: keyof T[K] } : T;
type Join<V1, V2> = V1 extends string ? (V2 extends string ? `${V1}.${V2}` : never) : never;
type JoinedKeyMap<T> = { [K in keyof T]: Join<K, T[K]> };
type ValueOf<T> = T extends Record<any, infer V> ? V : never;
type DeepKeys<T> = ValueOf<JoinedKeyMap<KeyMap<T>>>;
type OpacityKey = DeepKeys<typeof opacities>;

function colorWithOpacity(rgb: `#${string}`, opacity: OpacityKey) {
  const m = rgb.match(rgbPat);
  if (m == null) throw new Error(`invalid color format: ${rgb}`);
  return `rgba(${h2d(m[1])},${h2d(m[2])},${h2d(m[3])},${getOpacity(opacity)})`;
}

export function backgroundColor({
  color,
  state,
  theme = "light",
}: {
  color?: string;
  state?: keyof typeof opacities["state"];
  theme?: "light" | "dark";
}): string {
  const base = color == null ? "" : `linear-gradient(${color},${color})`;
  if (!state) return base;
  const overlayColor = `rgba(${theme === "light" ? "0,0,0" : "255,255,255"},${opacities.state[state]})`;
  return color == null ? overlayColor : `${backgroundColor({ color: overlayColor, theme })},${base}`;
}

function getOpacity(key: OpacityKey) {
  const keys = key.split(".");
  return keys.reduce<number>((obj: any, key) => obj[key] as any, opacities as any);
}

function h2d(h: string): number {
  return parseInt(h, 16);
}

// https://material.io/design/color/the-color-system.html#tools-for-picking-colors
const baseColors = {
  black: "#000000",
  white: "#ffffff",
  gray50: "#fafafa",
  gray100: "#f5f5f5",
  gray200: "#eeeeee",
  gray300: "#e0e0e0",
  gray400: "#bdbdbd",
  gray500: "#9e9e9e",
  gray600: "#757575",
  gray700: "#616161",
  gray800: "#424242",
  gray900: "#212121",
} as const;

export const colors = {
  ...baseColors,
  text: colorWithOpacity(baseColors.black, "text.highEmphasis"),
  textLowEmphasis: colorWithOpacity(baseColors.black, "text.lowEmphasis"),
  textDisabled: colorWithOpacity(baseColors.black, "text.disabled"),
  textLight: colorWithOpacity(baseColors.white, "text.highEmphasis"),
  textLightLowEmphasis: colorWithOpacity(baseColors.white, "text.lowEmphasis"),
  textLightDisabled: colorWithOpacity(baseColors.white, "text.disabled"),
};

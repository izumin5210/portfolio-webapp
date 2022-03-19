const opacities = {
  /**
   * @see https://material.io/design/color/text-legibility.html#text-backgrounds
   */
  text: {
    highEmphasis: 0.87,
    lowEmphasis: 0.6,
    disabled: 0.38,
  } as const,
  /**
   * @see https://material.io/design/interaction/states.html#anatomy
   */
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

function colorWithOpacity(rgb: string, opacity: OpacityKey) {
  const m = rgb.match(rgbPat);
  if (m == null) throw new Error(`invalid color format: ${rgb}`);
  return `rgba(${h2d(m[1])},${h2d(m[2])},${h2d(m[3])},${getOpacity(opacity)})`;
}

function overlayColor(baseHex: string, primaryHex: string, opacity: number): string {
  const rgb = [];
  for (const i of [1, 3, 5]) {
    rgb.push(h2d(baseHex.slice(i, i + 2)) * (1 - opacity) + h2d(primaryHex.slice(i, i + 2)) * opacity);
  }
  return `#${rgb.map((v) => Math.round(v).toString(16)).join("")}`;
}

export function backgroundWithOverlay(base: string, overlay: string): string {
  return `linear-gradient(${overlay},${overlay}),linear-gradient(${base},${base})`;
}

function getOpacity(key: OpacityKey) {
  const keys = key.split(".");
  return keys.reduce<number>((obj: any, key) => obj[key] as any, opacities as any);
}

function h2d(h: string): number {
  return parseInt(h, 16);
}

function colorFromHex(hex: string): { hex: string; rgb: `${number},${number},${number}` } {
  const m = hex.match(/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/);
  if (m == null) throw new Error(`invalid color code: ${hex}`);
  return {
    hex,
    rgb: `${h2d(m[1])},${h2d(m[2])},${h2d(m[3])}`,
  };
}

// https://material.io/design/color/the-color-system.html#tools-for-picking-colors
const baseColors = {
  black: colorFromHex("#000000"),
  white: colorFromHex("#ffffff"),
  gray50: colorFromHex("#fafafa"),
  gray100: colorFromHex("#f5f5f5"),
  gray200: colorFromHex("#eeeeee"),
  gray300: colorFromHex("#e0e0e0"),
  gray400: colorFromHex("#bdbdbd"),
  gray500: colorFromHex("#9e9e9e"),
  gray600: colorFromHex("#757575"),
  gray700: colorFromHex("#616161"),
  gray800: colorFromHex("#424242"),
  gray900: colorFromHex("#212121"),
  blue300: colorFromHex("#64b5f6"),
  blue700: colorFromHex("#1976d2"),
  blue800: colorFromHex("#1565c0"),
  blue900: colorFromHex("#0d47a1"),
  teal600: colorFromHex("#00897b"),
  blueGray100: colorFromHex("#cfd8dc"),
  blueGray700: colorFromHex("#455a64"),
} as const;

const themeBase = {
  light: {
    textBase: baseColors.black,
    primary: baseColors.blueGray100,
    secondary: baseColors.blue700,
    overlayRGB: "0,0,0",
  },
  dark: {
    textBase: baseColors.white,
    primary: baseColors.blueGray700,
    secondary: baseColors.blue300,
    overlayRGB: "255,255,255",
  },
};

export const colors = {
  ...baseColors,
  light: {
    ...themeBase.light,
    mode: "light" as const,
    background: baseColors.white.hex,
    text: colorWithOpacity(themeBase.light.textBase.hex, "text.highEmphasis"),
    textLowEmphasis: colorWithOpacity(themeBase.light.textBase.hex, "text.lowEmphasis"),
    textDisabled: colorWithOpacity(themeBase.light.textBase.hex, "text.disabled"),
    overlay50: `rgba(${themeBase.light.overlayRGB},${opacities.state.hover})`,
    overlay100: `rgba(${themeBase.light.overlayRGB},${opacities.state.selected})`,
    overlay150: `rgba(${themeBase.light.overlayRGB},${opacities.state.focus})`,
    overlayHover: `rgba(${themeBase.light.overlayRGB},${opacities.state.hover})`,
    overlayFocus: `rgba(${themeBase.light.overlayRGB},${opacities.state.focus})`,
    overlaySelected: `rgba(${themeBase.light.overlayRGB},${opacities.state.selected})`,
    overlayActivated: `rgba(${themeBase.light.overlayRGB},${opacities.state.activated})`,
    overlayPressed: `rgba(${themeBase.light.overlayRGB},${opacities.state.pressed})`,
    overlayDragged: `rgba(${themeBase.light.overlayRGB},${opacities.state.dragged})`,
    textOnPrimary: colorWithOpacity(themeBase.dark.textBase.hex, "text.highEmphasis"),
    textLink: themeBase.light.secondary.hex,
    outline: themeBase.light.secondary.hex,
  },
  dark: {
    ...themeBase.dark,
    mode: "dark" as const,
    background: overlayColor(baseColors.gray900.hex, themeBase.dark.primary.hex, 0.12),
    text: colorWithOpacity(themeBase.dark.textBase.hex, "text.highEmphasis"),
    textLowEmphasis: colorWithOpacity(themeBase.dark.textBase.hex, "text.lowEmphasis"),
    textDisabled: colorWithOpacity(themeBase.dark.textBase.hex, "text.disabled"),
    overlay50: `rgba(${themeBase.dark.overlayRGB},${opacities.state.hover})`,
    overlay100: `rgba(${themeBase.dark.overlayRGB},${opacities.state.selected})`,
    overlay150: `rgba(${themeBase.dark.overlayRGB},${opacities.state.focus})`,
    overlayHover: `rgba(${themeBase.dark.overlayRGB},${opacities.state.hover})`,
    overlayFocus: `rgba(${themeBase.dark.overlayRGB},${opacities.state.focus})`,
    overlaySelected: `rgba(${themeBase.dark.overlayRGB},${opacities.state.selected})`,
    overlayActivated: `rgba(${themeBase.dark.overlayRGB},${opacities.state.activated})`,
    overlayPressed: `rgba(${themeBase.dark.overlayRGB},${opacities.state.pressed})`,
    overlayDragged: `rgba(${themeBase.dark.overlayRGB},${opacities.state.dragged})`,
    textOnPrimary: colorWithOpacity(baseColors.white.hex, "text.highEmphasis"),
    textLink: themeBase.dark.secondary.hex,
    outline: themeBase.dark.secondary.hex,
  },
};

import { colors, colorWithOpacity } from "../styles/colors";

export const textLinkCss = (color: string = colors.blue700) => ({
  "&:focus-visible": {
    outline: `2px solid ${colors.blue700}`,
  },
  "&:focus:not(:focus-visible)": {
    outline: 0,
  },
  borderBottom: `1px solid ${colorWithOpacity(color, "text.lowEmphasis")}`,
  "&:hover, &:active": {
    borderBottom: "1px solid transparent",
  },
  color,
  textDecoration: "none",
  transition: "border 300ms",
});

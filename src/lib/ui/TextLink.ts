import { colors, colorWithOpacity } from "../styles/colors";

export const textLinkCss = (color: string = colors.blue700) => ({
  "&:focus-visible": {
    outline: `2px solid ${colors.blue700}`,
  },
  "&:focus:not(:focus-visible)": {
    outline: 0,
  },
  position: "relative",
  "&:before": {
    position: "absolute",
    bottom: "1px",
    content: '""',
    width: "100%",
    transition: "all 300ms",
    borderBottom: `1px solid ${colorWithOpacity(color, "text.lowEmphasis")}`,
  },
  "&:hover, &:active": {
    "&:before": {
      borderBottom: "1px solid transparent",
    },
  },
  borderRadius: "4px",
  color,
  textDecoration: "none",
  transition: "background 300ms",
});

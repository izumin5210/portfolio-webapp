import { reactionCss } from "../styles/reactions";

export const textLinkCss = (color = "var(--textLink)") => ({
  ...reactionCss({ withOverlay: false }),
  borderRadius: "4px",
  position: "relative",
  "outline-offset": "1px",
  "&:after": {
    transition: "all 300ms",
    content: "''",
    "border-bottom": `1px solid ${color}`,
    position: "absolute",
    left: "0",
    right: "0",
    bottom: "0",
  },
  "&:hover, &:active, &:focus, &:focus-visible": {
    "&:after": {
      "border-bottom-color": "transparent",
    },
  },
  color,
  textDecoration: "none",
});

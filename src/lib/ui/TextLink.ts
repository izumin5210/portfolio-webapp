export const textLinkCss = (color = "var(--textLink)") => ({
  "&:focus-visible": {
    outline: `2px solid var(--outline)`,
  },
  "&:focus:not(:focus-visible)": {
    outline: 0,
  },
  borderBottom: `1px solid ${color}`,
  "&:hover, &:active": {
    borderBottom: "1px solid transparent",
  },
  color,
  textDecoration: "none",
  transition: "border 300ms",
});

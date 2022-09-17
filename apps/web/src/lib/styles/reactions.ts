import { CSSProperties } from "@linaria/core";

export function reactionCss(
  props: {
    /** @defaultValue `false` */
    withOverlay?: boolean;
    background?: { image: string } | { color: string };
  } = {}
): CSSProperties {
  let styles: CSSProperties = {
    transition: "all 300ms",
    outline: "2px solid transparent",
    "outline-offset": "1px",
    "&:focus-visible": {
      "outline-color": "var(--outline)",
    },
  };

  if (props.background) {
    let backgroundImage: string;
    if ("image" in props.background) {
      backgroundImage = props.background.image;
    } else if (props.background && "color" in props.background) {
      backgroundImage = `linear-gradient(${props.background.color}, ${props.background.color})`;
    } else {
      const _exhaustiveCheck: never = props.background;
      throw new Error(`invalid background: ${props.background}`);
    }
    styles = {
      ...styles,
      "background-image": backgroundImage,
    };
  }

  if (props.withOverlay) {
    styles = {
      ...styles,
      "background-color": "transparent",
      "background-blend-mode": "overlay",
      "&:hover": {
        backgroundColor: "var(--overlayHover)",
      },
      "&:active": {
        backgroundColor: "var(--overlayPressed)",
      },
    };
  }

  return styles;
}

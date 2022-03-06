import { css } from "@linaria/core";
import { backgroundWithOverlay } from "../styles/colors";
import { caption, fontFamilyHead } from "../styles/typo";

interface Props<Comp extends React.ElementType> {
  text: string;
  selected?: boolean;
  as?: Comp;
}

type TagProps<C extends React.ElementType> = Props<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof Props<C>>;

export function Tag<Comp extends React.ElementType = "button">({
  text,
  selected = false,
  as,
  ...props
}: TagProps<Comp>) {
  const Component = as || "button";
  return (
    <Component className={tagCss} aria-selected={selected} {...props}>
      {text}
    </Component>
  );
}

const tagCss = css`
  ${caption}
  font-family: ${fontFamilyHead};
  line-height: 1.25;
  flex: 0 0 auto;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 9999vh;
  padding: 2px 8px;
  background: ${backgroundWithOverlay("var(--background)", "var(--overlay100)")};
  color: var(--textLowEmphasis);
  position: relative;
  transition: color 300ms;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 9999vh;
    top: 0;
    left: 0;
    transition: background 300ms;
  }

  &:hover,
  &:active,
  &:focus-visible {
    color: var(--textActive);
  }
  &:hover:after {
    background: var(--overlayHover);
  }
  &:active:after {
    background: var(--overlayPressed);
  }
  &:focus-visible:after {
    outline: 2px solid var(--outline);
  }
  &:focus:not(:focus-visible) {
    outline: 0;
  }

  &[aria-selected="true"] {
    color: var(--textOnPrimary);
    background: var(--primary);
  }
`;

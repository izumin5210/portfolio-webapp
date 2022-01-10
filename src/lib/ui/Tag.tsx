import { css } from "@linaria/core";
import { backgroundColor, colors } from "../styles/colors";
import { caption } from "../styles/typo";

interface Props<Comp extends React.ElementType> {
  text: string;
  as?: Comp;
}

type TagProps<C extends React.ElementType> = Props<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof Props<C>>;

export function Tag<Comp extends React.ElementType = "button">({ text, as, ...props }: TagProps<Comp>) {
  const Component = as || "button";
  return (
    <Component className={tagCss} {...props}>
      {text}
    </Component>
  );
}

const tagCss = css`
  ${caption}
  flex: 0 0 auto;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 9999vh;
  padding: 2px 8px;
  background: ${backgroundColor({ color: colors.gray200 })};
  color: ${colors.textLowEmphasis};
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
  &:focus,
  &:focus-visible {
    color: ${colors.text};
  }
  &:hover:after {
    background: ${backgroundColor({ state: "hover" })};
  }
  &:active:after {
    background: ${backgroundColor({ state: "pressed" })};
  }
  &:focus:after {
    background: ${backgroundColor({ state: "pressed" })};
  }
  &:focus-visible:after {
    outline: 2px solid ${colors.blue700};
  }
  &:focus:not(:focus-visible) {
    outline: 0;
  }

  &[aria-pressed="true"] {
    color: ${colors.textLightLowEmphasis};
    background: ${backgroundColor({ color: colors.gray500, theme: "dark" })};
    &:hover,
    &:active,
    &:focus,
    &:focus-visible {
      color: ${colors.textLight};
    }
    &:hover:after {
      background: ${backgroundColor({ state: "hover", theme: "dark" })};
    }
    &:active:after {
      background: ${backgroundColor({ state: "pressed", theme: "dark" })};
    }
    &:focus:after {
      background: ${backgroundColor({ state: "pressed", theme: "dark" })};
    }
  }
`;

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
  color: ${colors.text};
  transition: all 300ms;

  font-weight: 400;

  &:hover,
  &:focus-visible {
    background: ${backgroundColor({ color: colors.gray200, state: "hover" })};
  }

  &[aria-pressed="true"] {
    color: ${colors.textLight};
    background: ${backgroundColor({ color: colors.gray500, theme: "dark" })};
    &:hover,
    &:focus-visible {
      background: ${backgroundColor({ color: colors.gray500, state: "hover", theme: "dark" })};
    }
  }
`;

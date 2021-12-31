import { css } from "@linaria/core";
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
  background: linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04));
  color: rgba(0, 0, 0, 0.86);
  transition: all 300ms;

  font-weight: 400;

  &:hover,
  &:focus-visible {
    background: linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)),
      linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04));
  }

  &[aria-pressed="true"] {
    color: rgba(255, 255, 255, 0.84);
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
    &:hover,
    &:focus-visible {
      background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)),
        linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
    }
  }
`;

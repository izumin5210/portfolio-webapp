import React, { useEffect } from "react";
import { useRemark } from "react-remark";
import { css, cx } from "linaria";

export type Post = {
  title: string;
  content: string;
  slug: string;
  publishedDate: string;
};

export const PostRoot: React.VFC<{ post: Post }> = ({ post }) => {
  const rendered = useRenderedMarkdown(post.content);
  return <article>{rendered}</article>;
};

export const useRenderedMarkdown = (content: string) => {
  const [reactContent, setMarkdownSource] = useRemark({
    rehypeReactOptions: {
      createElement: React.createElement,
      components: {
        h1: MdH1,
      },
    },
  });

  useEffect(() => {
    setMarkdownSource(content);
  }, [content, setMarkdownSource]);

  return reactContent;
};

const MdH1: React.FC = ({ children }) => <h1 {...useMergedCss(useMdFormattingCss("#"), mdH1Css)}>{children}</h1>;

const mdH1Css = css`
  color: rgba(0, 0, 0, 0.84);
  font-size: 36px;
`;

const mdFormattingCss = css`
  &::before {
    content: var(--formatting-string);
    padding-right: 8px;
    font-size: 0.8em;
    color: rgba(0, 0, 0, 0.6);
  }
`;

// eslint-disable-next-line @typescript-eslint/ban-types
type Css = { className: string; style?: object } | string;
const useMdFormattingCss = (formattingString: string): Css => {
  return {
    style: { "--formatting-string": `'${formattingString}'` },
    className: mdFormattingCss,
  };
};

const useMergedCss = (...cssList: Css[]): Css => {
  const classNames = [];
  const styles = [];
  for (const css of cssList) {
    if (typeof css === "string") {
      classNames.push(css);
    } else {
      classNames.push(css.className);
      if (css.style) styles.push(css.style);
    }
  }
  return {
    className: cx(...classNames),
    style: Object.assign({}, ...styles),
  };
};

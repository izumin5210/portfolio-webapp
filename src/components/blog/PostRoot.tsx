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
        h2: MdH2,
        h3: MdH3,
        h4: MdH4,
        h5: MdH5,
        h6: MdH6,
      },
    },
  });

  useEffect(() => {
    setMarkdownSource(content);
  }, [content, setMarkdownSource]);

  return reactContent;
};

const MdH1: React.VFC<{ children?: React.ReactNode }> = (props) => (
  <h1 {...props} {...useMergedCss(textCss, mdH1Css, useMdFormattingCss("#"))} />
);

const MdH2: React.VFC<{ children?: React.ReactNode }> = (props) => (
  <h2 {...props} {...useMergedCss(textCss, mdH2Css, useMdFormattingCss("##"))} />
);

const MdH3: React.VFC<{ children?: React.ReactNode }> = (props) => (
  <h3 {...props} {...useMergedCss(textCss, mdH3Css, useMdFormattingCss("###"))} />
);

const MdH4: React.VFC<{ children?: React.ReactNode }> = (props) => (
  <h4 {...props} {...useMergedCss(textCss, mdH4Css, useMdFormattingCss("####"))} />
);

const MdH5: React.VFC<{ children?: React.ReactNode }> = (props) => (
  <h5 {...props} {...useMergedCss(textCss, mdH5Css, useMdFormattingCss("#####"))} />
);

const MdH6: React.VFC<{ children?: React.ReactNode }> = (props) => (
  <h5 {...props} {...useMergedCss(textCss, mdH6Css, useMdFormattingCss("######"))} />
);

const textCss = css`
  color: rgba(0, 0, 0, 0.84);
`;

const mdH1Css = css`
  font-size: 36px;
`;

const mdH2Css = css`
  font-size: 24px;
`;

const mdH3Css = css`
  font-size: 21px;
`;

const mdH4Css = css`
  font-size: 18px;
`;

const mdH5Css = css`
  font-size: 16px;
`;

const mdH6Css = css`
  font-size: 16px;
`;

const mdFormattingCss = css`
  &::before {
    content: var(--formatting-string);
    padding-right: 0.3em;
    font-size: 0.6em;
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

import { css, styled } from "@compiled/react";
import React, { ReactElement, useMemo } from "react";
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkToRehype from "remark-rehype";
import unified from "unified";

export type Post = {
  title: string;
  content: string;
  slug: string;
  publishedDate: string;
};

export const PostRoot: React.VFC<{ post: Post }> = ({ post }) => {
  const rendered = useRenderedMarkdownSync(post.content);
  return <article>{rendered}</article>;
};

const getRenderer = () => {
  return unified()
    .use(remarkParse)
    .use(remarkToRehype)
    .use(rehypeReact, {
      createElement: React.createElement,
      components: {
        h1: MdH1 as React.VFC<{ children?: React.ReactNode }>,
        h2: MdH2 as React.VFC<{ children?: React.ReactNode }>,
        h3: MdH3 as React.VFC<{ children?: React.ReactNode }>,
        h4: MdH4 as React.VFC<{ children?: React.ReactNode }>,
        h5: MdH5 as React.VFC<{ children?: React.ReactNode }>,
        h6: MdH6 as React.VFC<{ children?: React.ReactNode }>,
        p: MdP as React.VFC<{ children?: React.ReactNode }>,
        ul: MdUl as React.VFC<{ children?: React.ReactNode }>,
        ol: MdOl as React.VFC<{ children?: React.ReactNode }>,
        li: MdLi as React.VFC<{ children?: React.ReactNode }>,
        blockquote: MdQuote as React.VFC<{ children?: React.ReactNode }>,
      },
    });
};

export const useRenderedMarkdownSync = (content: string) => {
  const renderer = useMemo(getRenderer, []);
  return useMemo(() => renderer.processSync(content).result as ReactElement, [renderer, content]);
};

const mdFormattingCss = css`
  ::before {
    padding-right: 0.3em;
    font-size: 0.75em;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const resetCss = css`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`;

const textCss = css`
  color: rgba(0, 0, 0, 0.84);
  line-height: 1.7;
`;

const MdH1 = styled.h1`
  ${resetCss}
  ${textCss}
  ${mdFormattingCss}
  font-size: 36px;
  margin: 32px 0 8px;
  ::before {
    content: "#";
  }
`;

const MdH2 = styled.h2`
  ${resetCss}
  ${textCss}
  ${mdFormattingCss}
  font-size: 24px;
  margin: 24px 0 8px;
  ::before {
    content: "##";
  }
`;

const MdH3 = styled.h3`
  ${resetCss}
  ${textCss}
  ${mdFormattingCss}
  font-size: 21px;
  margin: 21px 0 8px;
  ::before {
    content: "###";
  }
`;

const MdH4 = styled.h4`
  ${resetCss}
  ${textCss}
  ${mdFormattingCss}
  font-size: 18px;
  margin: 18px 0 8px;
  ::before {
    content: "####";
  }
`;

const MdH5 = styled.h5`
  ${resetCss}
  ${textCss}
  ${mdFormattingCss}
  font-size: 16px;
  margin: 16px 0 8px;
  ::before {
    content: "#####";
  }
`;

const MdH6 = styled.h6`
  ${resetCss}
  ${textCss}
  ${mdFormattingCss}
  font-size: 16px;
  margin: 16px 0 8px;
  ::before {
    content: "#####";
  }
`;

const MdP = styled.div`
  ${resetCss}
  ${textCss}
  margin: 8px 0;
`;

const MdLi = styled.li`
  ${resetCss}
  ${textCss}
  ${mdFormattingCss}
  font-size: 16px;
  list-style: none;
`;

const nestedListCss = css`
  margin-left: 16px;
  ol,
  ul {
    margin-left: 16px;
  }
`;

const MdUl = styled.ul`
  ${resetCss}
  ${nestedListCss}
  > li::before {
    content: "-";
  }
`;

const MdOl = styled.ol`
  ${resetCss}
  ${nestedListCss}
  counter-reset: ordered-list;
  > li {
    counter-increment: ordered-list;
  }
  > li::before {
    content: counter(ordered-list) ".";
  }
`;

const MdQuote = styled.blockquote`
  ${resetCss}
  ${textCss}
  ${mdFormattingCss}
  margin-left: 16px;
  border-left: 4px solid rgba(0, 0, 0, 0.48);
  padding-left: 16px;
`;

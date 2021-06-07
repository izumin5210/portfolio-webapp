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
    font-size: 0.6em;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const textCss = css`
  color: rgba(0, 0, 0, 0.84);
`;

const MdH1 = styled.h1`
  ${textCss}
  ${mdFormattingCss}
  font-size: 36px;
  ::before {
    content: "#";
  }
`;

const MdH2 = styled.h2`
  ${textCss}
  ${mdFormattingCss}
  font-size: 24px;
  ::before {
    content: "##";
  }
`;

const MdH3 = styled.h3`
  ${textCss}
  ${mdFormattingCss}
  font-size: 21px;
  ::before {
    content: "###";
  }
`;

const MdH4 = styled.h4`
  ${textCss}
  ${mdFormattingCss}
  font-size: 18px;
  ::before {
    content: "####";
  }
`;

const MdH5 = styled.h5`
  ${textCss}
  ${mdFormattingCss}
  font-size: 16px;
  ::before {
    content: "#####";
  }
`;

const MdH6 = styled.h6`
  ${textCss}
  ${mdFormattingCss}
  font-size: 16px;
  ::before {
    content: "#####";
  }
`;

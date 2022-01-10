import { styled } from "@linaria/react";
import graphql from "babel-plugin-relay/macro";
import { createElement, Fragment, ReactElement, useEffect, useState } from "react";
import { useFragment } from "react-relay";
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { body2, heading1, heading2, heading3, heading4, heading5, heading6 } from "../../lib/styles/typo";
import { BlogArticle$key } from "./__generated__/BlogArticle.graphql";

export function BlogArticle(props: { article: BlogArticle$key }) {
  const data = useFragment(
    graphql`
      fragment BlogArticle on ArticleEntry {
        title
        body
      }
    `,
    props.article
  );
  const body = useMarkdownProcessor(data.body);
  return (
    <Article>
      <H1>{data.title}</H1>
      {body}
    </Article>
  );
}

function useMarkdownProcessor(text: string) {
  const [Content, setContent] = useState<ReactElement | null>(null);

  useEffect(() => {
    void unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeReact, {
        createElement,
        Fragment,
        components: {
          h1: H1,
          h2: H2,
          h3: H3,
          h4: H4,
          h5: H5,
          h6: H6,
          p: P,
          ul: Ul,
          ol: Ol,
          li: Li,
          a: A,
          strong: Strong,
          em: Em,
          code: Code,
          pre: Pre,
          blockquote: Blockquote,
        },
      })
      .process(text)
      .then((file) => {
        setContent(file.result);
      });
  }, [text]);

  return Content;
}

const Article = styled.article`
  color: rgba(0, 0, 0, 0.86);
`;

const headingMarkerStyle = {
  marginRight: "4px",
  color: "rgba(0, 0, 0, 0.56)",
  fontSize: "0.7em",
  fontWeight: "400",
  letterSpacing: "-0.08em",
};

const listStyle = {
  listStyle: "none",
  "li:before": {
    color: "rgba(0, 0, 0, 0.56)",
    marginRight: "4px",
  },
  paddingLeft: "12px",
  "ul, ol": {
    paddingLeft: "24px",
  },
};

const H1 = styled.h1`
  ${heading1}
  &:before {
    ${headingMarkerStyle}
    content: "#";
  }
`;

const H2 = styled.h2`
  ${heading2}
  &:before {
    ${headingMarkerStyle}
    content: "##";
  }
`;

const H3 = styled.h3`
  ${heading3}
  &:before {
    ${headingMarkerStyle}
    content: "###";
  }
`;

const H4 = styled.h4`
  ${heading4}
  &:before {
    ${headingMarkerStyle}
    content: "####";
  }
`;

const H5 = styled.h5`
  ${heading5}
  &:before {
    ${headingMarkerStyle}
    content: "#####";
  }
`;

const H6 = styled.h1`
  ${heading6}
  &:before {
    ${headingMarkerStyle}
    content: "######";
  }
`;

const P = styled.p`
  ${body2}
`;

const Li = styled.li`
  ${body2}
`;

const Ul = styled.ul`
  ${listStyle}
  li:before {
    content: "*";
  }
`;

const Ol = styled.ol`
  ${listStyle}
  counter-reset: ol-counter;
  & > li {
    counter-increment: ol-counter;
  }
  & > li:before {
    content: counter(ol-counter) ". ";
  }
`;

const A = styled.a``;
const Strong = styled.strong`
  &:before,
  &:after {
    content: "**";
    color: rgba(0, 0, 0, 0.56);
  }
`;
const Em = styled.em`
  &:before,
  &:after {
    content: "_";
    color: rgba(0, 0, 0, 0.56);
  }
`;
const Pre = styled.pre`
  & code {
    &:before,
    &:after {
      content: none;
    }
    background: none;
  }
`;
const Code = styled.code`
  &:before,
  &:after {
    content: "\`";
    color: rgba(0, 0, 0, 0.56);
  }
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
`;
const Blockquote = styled.blockquote``;

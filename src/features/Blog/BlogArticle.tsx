import { styled } from "@linaria/react";
import graphql from "babel-plugin-relay/macro";
import { createElement, Fragment, ReactElement, useEffect, useState } from "react";
import { useFragment } from "react-relay";
import rehypePrism from "rehype-prism-plus";
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkFrontmatter from "remark-frontmatter";
import { unified } from "unified";
import { backgroundColor, colors } from "../../lib/styles/colors";
import { body1, body2, heading3, heading4, heading5, heading6, subtitle1, subtitle2 } from "../../lib/styles/typo";
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
      .use(remarkFrontmatter)
      .use(remarkRehype)
      .use(rehypePrism) // FIXME: should import only used syntax
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
  color: ${colors.text};
  ${body2}
`;

const headingMarkerStyle = {
  color: colors.textDisabled,
  fontSize: "0.7em",
  fontWeight: "400",
  letterSpacing: "-0.08em",
};

const listStyle = {
  listStyle: "none",
  "li:before": {
    color: colors.textLowEmphasis,
  },
  paddingLeft: "12px",
  "ul, ol": {
    paddingLeft: "24px",
  },
};

const H1 = styled.h1`
  ${heading3}
  &:before {
    ${headingMarkerStyle}
    content: "#";
    margin-right: 8px;
  }
`;

const H2 = styled.h2`
  ${heading4}
  &:before {
    ${headingMarkerStyle}
    content: "##";
    margin-right: 8px;
  }
`;

const H3 = styled.h3`
  ${heading5}
  &:before {
    ${headingMarkerStyle}
    content: "###";
    margin-right: 8px;
  }
`;

const H4 = styled.h4`
  ${heading6}
  &:before {
    ${headingMarkerStyle}
    content: "####";
    margin-right: 4px;
  }
`;

const H5 = styled.h5`
  ${subtitle1}
  &:before {
    ${headingMarkerStyle}
    content: "#####";
    margin-right: 4px;
  }
`;

const H6 = styled.h1`
  ${subtitle2}
  &:before {
    ${headingMarkerStyle}
    content: "######";
    margin-right: 4px;
  }
`;

const P = styled.p`
  ${body1}
`;

const Li = styled.li`
  ${body1}
`;

const Ul = styled.ul`
  ${listStyle}
  & > li:before {
    content: "-";
    margin-right: 8px;
  }
`;

const Ol = styled.ol`
  ${listStyle}
  counter-reset: ol-counter;
  & > li {
    counter-increment: ol-counter;
    margin-right: 4px;
  }
  & > li:before {
    content: counter(ol-counter) ". ";
    font-size: 0.8em;
  }
`;

const A = styled.a`
  &:hover {
    background: ${backgroundColor({ state: "hover" })};
  }
  &:focus {
    background: ${backgroundColor({ state: "focus" })};
  }
  &:active {
    background: ${backgroundColor({ state: "pressed" })};
  }
  &:focus-visible {
    outline: 2px solid ${colors.blue700};
  }
  &:focus:not(:focus-visible) {
    outline: 0;
  }
  &:hover,
  &:focus,
  &:active {
    &:before {
      border-bottom: 1px solid transparent;
    }
  }
  position: relative;
  &:before {
    position: absolute;
    bottom: 2px;
    content: "";
    width: 100%;
    transition: all 300ms;
    border-bottom: 1px solid ${colors.blue700};
  }
  color: ${colors.blue700};
  border-radius: 4px;
  text-decoration: none;
  transition: all 300ms;
`;
const Strong = styled.strong`
  &:before,
  &:after {
    content: "**";
    color: ${colors.textDisabled};
  }
`;
const Em = styled.em`
  &:before,
  &:after {
    content: "_";
    color: ${colors.textDisabled};
  }
`;

const Blockquote = styled.blockquote``;

const Code = styled.code`
  ${body2}
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
  color: #f8f8f2;
  background: #2e3440;
  white-space: pre;
  hyphens: none;
  border-radius: 4px;
  &:before,
  &:after {
    content: "\`";
    color: ${colors.textLightLowEmphasis};
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

  & > code {
    display: block;
    padding: 0;
  }

  ${body2}
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
  color: #f8f8f2;
  background: #2e3440;
  white-space: pre;
  hyphens: none;
  tab-size: 4;
  border-radius: 4px;
  padding: 8px 16px;

  &:before,
  &:after {
    display: block;
    content: "\`\`\`";
    color: ${colors.textLightLowEmphasis};
  }

  // copy from https://github.com/PrismJS/prism-themes/blob/v1.9.0/themes/prism-nord.css
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #636f88;
  }

  .token.punctuation {
    color: #81a1c1;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #81a1c1;
  }

  .token.number {
    color: #b48ead;
  }

  .token.boolean {
    color: #81a1c1;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #a3be8c;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable {
    color: #81a1c1;
  }

  .token.atrule,
  .token.attr-value,
  .token.function,
  .token.class-name {
    color: #88c0d0;
  }

  .token.keyword {
    color: #81a1c1;
  }

  .token.regex,
  .token.important {
    color: #ebcb8b;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }
`;

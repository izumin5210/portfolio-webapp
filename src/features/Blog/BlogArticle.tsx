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
  marginRight: "8px",
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
  background: hsl(230, 1%, 98%);
  color: hsl(230, 8%, 24%);
  white-space: pre;
  hyphens: none;
  border-radius: 4px;
  &:before,
  &:after {
    content: "\`";
    color: ${colors.textDisabled};
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
  background: hsl(230, 1%, 98%);
  color: hsl(230, 8%, 24%);
  white-space: pre;
  hyphens: none;
  tab-size: 4;
  border-radius: 4px;
  padding: 8px 16px;

  &:before,
  &:after {
    display: block;
    content: "\`\`\`";
    color: ${colors.textDisabled};
  }

  // https://github.com/PrismJS/prism-themes/blob/v1.9.0/themes/prism-one-light.css#L81-L239
  .token.comment,
  .token.prolog,
  .token.cdata {
    color: hsl(230, 4%, 64%);
  }

  .token.doctype,
  .token.punctuation,
  .token.entity {
    color: hsl(230, 8%, 24%);
  }

  .token.attr-name,
  .token.class-name,
  .token.boolean,
  .token.constant,
  .token.number,
  .token.atrule {
    color: hsl(35, 99%, 36%);
  }

  .token.keyword {
    color: hsl(301, 63%, 40%);
  }

  .token.property,
  .token.tag,
  .token.symbol,
  .token.deleted,
  .token.important {
    color: hsl(5, 74%, 59%);
  }

  .token.selector,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted,
  .token.regex,
  .token.attr-value,
  .token.attr-value > .token.punctuation {
    color: hsl(119, 34%, 47%);
  }

  .token.variable,
  .token.operator,
  .token.function {
    color: hsl(221, 87%, 60%);
  }

  .token.url {
    color: hsl(198, 99%, 37%);
  }

  /* HTML overrides */
  .token.attr-value > .token.punctuation.attr-equals,
  .token.special-attr > .token.attr-value > .token.value.css {
    color: hsl(230, 8%, 24%);
  }

  /* CSS overrides */
  .language-css .token.selector {
    color: hsl(5, 74%, 59%);
  }

  .language-css .token.property {
    color: hsl(230, 8%, 24%);
  }

  .language-css .token.function,
  .language-css .token.url > .token.function {
    color: hsl(198, 99%, 37%);
  }

  .language-css .token.url > .token.string.url {
    color: hsl(119, 34%, 47%);
  }

  .language-css .token.important,
  .language-css .token.atrule .token.rule {
    color: hsl(301, 63%, 40%);
  }

  /* JS overrides */
  .language-javascript .token.operator {
    color: hsl(301, 63%, 40%);
  }

  .language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation {
    color: hsl(344, 84%, 43%);
  }

  /* JSON overrides */
  .language-json .token.operator {
    color: hsl(230, 8%, 24%);
  }

  .language-json .token.null.keyword {
    color: hsl(35, 99%, 36%);
  }

  /* MD overrides */
  .language-markdown .token.url,
  .language-markdown .token.url > .token.operator,
  .language-markdown .token.url-reference.url > .token.string {
    color: hsl(230, 8%, 24%);
  }

  .language-markdown .token.url > .token.content {
    color: hsl(221, 87%, 60%);
  }

  .language-markdown .token.url > .token.url,
  .language-markdown .token.url-reference.url {
    color: hsl(198, 99%, 37%);
  }

  .language-markdown .token.blockquote.punctuation,
  .language-markdown .token.hr.punctuation {
    color: hsl(230, 4%, 64%);
    font-style: italic;
  }

  .language-markdown .token.code-snippet {
    color: hsl(119, 34%, 47%);
  }

  .language-markdown .token.bold .token.content {
    color: hsl(35, 99%, 36%);
  }

  .language-markdown .token.italic .token.content {
    color: hsl(301, 63%, 40%);
  }

  .language-markdown .token.strike .token.content,
  .language-markdown .token.strike .token.punctuation,
  .language-markdown .token.list.punctuation,
  .language-markdown .token.title.important > .token.punctuation {
    color: hsl(5, 74%, 59%);
  }

  /* General */
  .token.bold {
    font-weight: bold;
  }

  .token.comment,
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .token.namespace {
    opacity: 0.8;
  }
`;

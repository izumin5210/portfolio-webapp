import { styled } from "@linaria/react";
import graphql from "babel-plugin-relay/macro";
import Link from "next/link";
import React, { createElement, Fragment, useMemo } from "react";
import { useFragment } from "react-relay";
import rehypePrism from "rehype-prism-plus";
import rehypeReact from "rehype-react";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { backgroundColor, colors } from "../../lib/styles/colors";
import { body1, body2, heading3, heading4, heading5, heading6, subtitle2 } from "../../lib/styles/typo";
import { textLinkCss } from "../../lib/ui/TextLink";
import { BlogArticle$key } from "./__generated__/BlogArticle.graphql";

export function BlogArticle(props: { article: BlogArticle$key }) {
  const data = useFragment(
    graphql`
      fragment BlogArticle on ArticleEntry {
        title
        body
        publishedOn
        updatedOn
        tags
      }
    `,
    props.article
  );
  const body = useMarkdownProcessor(data.body);
  return (
    <Article>
      <Aside>
        <DatesUl>
          <li>
            Published <Time dateTime={data.publishedOn}>{data.publishedOn}</Time>
          </li>
          <li>
            Updated <Time dateTime={data.updatedOn}>{data.updatedOn}</Time>
          </li>
        </DatesUl>
        <TagsUl>
          {data.tags.map((tag) => (
            <li key={tag}>
              <Tag href="/">{tag}</Tag>
            </li>
          ))}
        </TagsUl>
      </Aside>
      <H1 className="title">{data.title}</H1>
      {body}
    </Article>
  );
}

function useMarkdownProcessor(text: string) {
  return useMemo(() => {
    const processor = unified()
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
          img: Img,
          ul: Ul,
          ol: Ol,
          li: Li,
          a: TextLink,
          strong: Strong,
          em: Em,
          code: Code,
          pre: Pre,
          blockquote: Blockquote,
        },
      });
    const file = processor.processSync(text);
    return file.result;
  }, [text]);
}

const Article = styled.article`
  color: ${colors.text};
  ${body2}
  margin: 48px 16px 8px;
`;

const Aside = styled.aside``;

const DatesUl = styled.ul`
  display: flex;
  ${subtitle2}
  list-style: none;
  padding: 0;
  margin: 0;

  & > li {
    color: ${colors.textLowEmphasis};

    &:not(:last-child):after {
      content: "/";
      margin: 0 4px;
    }
  }
`;

const TagsUl = styled.ul`
  display: flex;
  ${subtitle2}
  list-style: none;
  padding: 0;
  margin: 2px 0 0 -8px;

  & > li {
    &:not(:last-child) {
      margin-right: -4px;
    }
  }
`;

const Tag = styled.a`
  &:hover {
    background: ${backgroundColor({ state: "hover" })};
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
  &:before {
    content: "#";
    color: ${colors.textLowEmphasis};
  }
  color: ${colors.text};
  border-radius: 9999vh;
  padding: 2px 8px;
  text-decoration: none;
  transition: all 300ms;
`;

const Time = styled.time`
  color: ${colors.text};
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
    margin: "0",
  },
  margin: "16px 0 0",
};

const H1 = styled.h1`
  ${heading3}
  margin: 40px 0 0;
  &:before {
    ${headingMarkerStyle}
    content: "#";
    margin-right: 8px;
  }

  &.title {
    margin-top: 8px;
  }
`;

const H2 = styled.h2`
  ${heading4}
  margin: 40px 0 0;
  &:before {
    ${headingMarkerStyle}
    content: "##";
    margin-right: 8px;
  }
`;

const H3 = styled.h3`
  ${heading5}
  margin: 32px 0 0;
  &:before {
    ${headingMarkerStyle}
    content: "###";
    margin-right: 8px;
  }
`;

const H4 = styled.h4`
  ${heading6}
  margin: 24px 0 0;
  &:before {
    ${headingMarkerStyle}
    content: "####";
    margin-right: 4px;
  }
`;

const H5 = styled.h5`
  ${heading6}
  margin: 16px 0 0;
  &:before {
    ${headingMarkerStyle}
    content: "#####";
    margin-right: 4px;
  }
`;

const H6 = styled.h1`
  ${heading6}
  margin: 16px 0 0;
  &:before {
    ${headingMarkerStyle}
    content: "######";
    margin-right: 4px;
  }
`;

const P = styled.p`
  ${body1}
  margin: 16px 0 0;
`;

const Img = styled.img`
  display: block;
  margin: 16px auto 0;
  max-width: 100%;
  max-height: 500px;
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

function TextLink({
  href,
  children,
  ...props
}: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
  const isExternalLink = /^https?:\/\//.test(href ?? "");
  return (
    <Link href={href ?? ""} passHref {...props}>
      <A {...(isExternalLink ? { rel: "noopener noreferrer", target: "_blank" } : {})}>{children}</A>
    </Link>
  );
}

const A = styled.a`
  ${textLinkCss()}
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
  margin: 16px 0 0;

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

import { styled } from "@linaria/react";
import Link from "next/link";
import { ComponentPropsWithoutRef, createElement, Fragment as ReactFragment, useMemo } from "react";
import rehypePrism from "rehype-prism-plus";
import rehypeReact from "rehype-react";
import remarkFrontmatter from "remark-frontmatter";
import { remarkH1AsTitle } from "remark-h1-as-title";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { getPath } from "../../lib/next-typed-routes";
import { colors } from "../../lib/styles/colors";
import { reactionCss } from "../../lib/styles/reactions";
import { body2, heading3, heading4, heading5, heading6, subtitle2 } from "../../lib/styles/typo";
import { textLinkCss } from "../../lib/ui/TextLink";
import { FragmentType, gql, useFragment } from "../../__generated__/gql";

/** @internal visible for testing */
export const Fragment = gql(/* GraphQL */ `
  fragment BlogArticle on ArticleEntry {
    id
    title
    body {
      markdown
    }
    publishedOn
    updatedOn
    tags {
      name
      displayName
    }
  }
`);

export function BlogArticle(props: { data: FragmentType<typeof Fragment> }) {
  const fragment = useFragment(Fragment, props.data);
  const body = useMarkdownProcessor(fragment.body.markdown);

  return (
    <Article>
      <Aside>
        <DatesUl>
          <li>
            Published <Time dateTime={fragment.publishedOn as string}>{fragment.publishedOn as string}</Time>
          </li>
          {fragment.updatedOn != null && (
            <li>
              Updated <Time dateTime={fragment.updatedOn as string}>{fragment.updatedOn as string}</Time>
            </li>
          )}
        </DatesUl>
        <TagsUl>
          {fragment.tags.map((tag) => (
            <li key={tag.name}>
              <Link href={getPath("/", { query: { tags: [tag.name] } })} passHref>
                <Tag>{tag.displayName}</Tag>
              </Link>
            </li>
          ))}
        </TagsUl>
      </Aside>
      <H1 className="title">{fragment.title}</H1>
      {body}
    </Article>
  );
}

function useMarkdownProcessor(text: string) {
  return useMemo(() => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(remarkH1AsTitle)
      .use(remarkRehype)
      .use(rehypePrism) // FIXME: should import only used syntax
      .use(rehypeReact, {
        createElement,
        Fragment: ReactFragment,
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
  color: var(--text);
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
    color: var(--textLowEmphasis);

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
  ${reactionCss({ withOverlay: true })}
  &:before {
    content: "#";
    color: var(--textLowEmphasis);
  }
  color: var(--text);
  border-radius: 9999vh;
  padding: 2px 8px;
  text-decoration: none;
`;

const Time = styled.time`
  color: var(--text);
`;

const headingMarkerStyle = {
  color: "var(--textDisabled)",
  fontSize: "0.7em",
  fontWeight: "400",
  letterSpacing: "-0.08em",
};

const listStyle = {
  listStyle: "none",
  "li:before": {
    color: "var(--textLowEmphasis)",
  },
  paddingLeft: "12px",
  "ul, ol": {
    paddingLeft: "24px",
    margin: "0",
  },
  margin: "16px 0 0",
};

// eslint-disable-next-line @typescript-eslint/ban-types
const H1 = styled.h1<{}>`
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

// eslint-disable-next-line @typescript-eslint/ban-types
const H2 = styled.h2<{}>`
  ${heading4}
  margin: 40px 0 0;
  &:before {
    ${headingMarkerStyle}
    content: "##";
    margin-right: 8px;
  }
`;

// eslint-disable-next-line @typescript-eslint/ban-types
const H3 = styled.h3<{}>`
  ${heading5}
  margin: 32px 0 0;
  &:before {
    ${headingMarkerStyle}
    content: "###";
    margin-right: 8px;
  }
`;

// eslint-disable-next-line @typescript-eslint/ban-types
const H4 = styled.h4<{}>`
  ${heading6}
  margin: 24px 0 0;
  &:before {
    ${headingMarkerStyle}
    content: "####";
    margin-right: 4px;
  }
`;

// eslint-disable-next-line @typescript-eslint/ban-types
const H5 = styled.h5<{}>`
  ${heading6}
  margin: 16px 0 0;
  &:before {
    ${headingMarkerStyle}
    content: "#####";
    margin-right: 4px;
  }
`;

// eslint-disable-next-line @typescript-eslint/ban-types
const H6 = styled.h6<{}>`
  ${heading6}
  margin: 16px 0 0;
  &:before {
    ${headingMarkerStyle}
    content: "######";
    margin-right: 4px;
  }
`;

// eslint-disable-next-line @typescript-eslint/ban-types
const P = styled.p<{}>`
  ${body2}
  line-height: 1.8;
  margin: 16px 0 0;
`;

// eslint-disable-next-line @typescript-eslint/ban-types
const Img = styled.img<{}>`
  display: block;
  margin: 16px auto 0;
  max-width: 100%;
  max-height: 500px;
`;

// eslint-disable-next-line @typescript-eslint/ban-types
const Li = styled.li<{}>`
  ${body2}
`;

// eslint-disable-next-line @typescript-eslint/ban-types
const Ul = styled.ul<{}>`
  ${listStyle}
  & > li:before {
    content: "-";
    margin-right: 8px;
  }
`;

// eslint-disable-next-line @typescript-eslint/ban-types
const Ol = styled.ol<{}>`
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

function TextLink({ href, children, ...props }: ComponentPropsWithoutRef<"a">) {
  const isExternalLink = /^https?:\/\//.test(href ?? "");
  return (
    <Link href={href ?? ""} passHref {...props}>
      <A {...(isExternalLink ? { rel: "noopener noreferrer", target: "_blank" } : {})}>{children}</A>
    </Link>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-types
const A = styled.a<{}>`
  ${textLinkCss()}
`;

// eslint-disable-next-line @typescript-eslint/ban-types
const Strong = styled.strong<{}>`
  &:before,
  &:after {
    content: "**";
    color: var(--textDisabled);
  }
`;

// eslint-disable-next-line @typescript-eslint/ban-types
const Em = styled.em<{}>`
  &:before,
  &:after {
    content: "_";
    color: var(--textDisabled);
  }
`;

// eslint-disable-next-line @typescript-eslint/ban-types
const Blockquote = styled.blockquote<{}>``;

// eslint-disable-next-line @typescript-eslint/ban-types
const Code = styled.code<{}>`
  ${body2}
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
  background: var(--overlay100);
  color: var(--text);
  white-space: pre;
  hyphens: none;
  border-radius: 4px;
  &:before,
  &:after {
    content: "\`";
    color: var(--textDisabled);
  }
`;

// eslint-disable-next-line @typescript-eslint/ban-types
const Pre = styled.pre<{}>`
  & code {
    &:before,
    &:after {
      content: none;
    }
    background: none;
    color: inherit;
  }

  & > code {
    display: block;
    padding: 0;
  }

  ${body2}
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
  background: hsl(220, 13%, 18%);
  color: hsl(220, 14%, 71%);
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
    color: ${colors.dark.textDisabled};
  }

  // https://github.com/PrismJS/prism-themes/blob/v1.9.0/themes/prism-one-dark.css#L92-L262
  .token.comment,
  .token.prolog,
  .token.cdata {
    color: hsl(220, 10%, 40%);
  }

  .token.doctype,
  .token.punctuation,
  .token.entity {
    color: hsl(220, 14%, 71%);
  }

  .token.attr-name,
  .token.class-name,
  .token.boolean,
  .token.constant,
  .token.number,
  .token.atrule {
    color: hsl(29, 54%, 61%);
  }

  .token.keyword {
    color: hsl(286, 60%, 67%);
  }

  .token.property,
  .token.tag,
  .token.symbol,
  .token.deleted,
  .token.important {
    color: hsl(355, 65%, 65%);
  }

  .token.selector,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted,
  .token.regex,
  .token.attr-value,
  .token.attr-value > .token.punctuation {
    color: hsl(95, 38%, 62%);
  }

  .token.variable,
  .token.operator,
  .token.function {
    color: hsl(207, 82%, 66%);
  }

  .token.url {
    color: hsl(187, 47%, 55%);
  }

  /* HTML overrides */
  .token.attr-value > .token.punctuation.attr-equals,
  .token.special-attr > .token.attr-value > .token.value.css {
    color: hsl(220, 14%, 71%);
  }

  /* CSS overrides */
  .language-css .token.selector {
    color: hsl(355, 65%, 65%);
  }

  .language-css .token.property {
    color: hsl(220, 14%, 71%);
  }

  .language-css .token.function,
  .language-css .token.url > .token.function {
    color: hsl(187, 47%, 55%);
  }

  .language-css .token.url > .token.string.url {
    color: hsl(95, 38%, 62%);
  }

  .language-css .token.important,
  .language-css .token.atrule .token.rule {
    color: hsl(286, 60%, 67%);
  }

  /* JS overrides */
  .language-javascript .token.operator {
    color: hsl(286, 60%, 67%);
  }

  .language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation {
    color: hsl(5, 48%, 51%);
  }

  /* JSON overrides */
  .language-json .token.operator {
    color: hsl(220, 14%, 71%);
  }

  .language-json .token.null.keyword {
    color: hsl(29, 54%, 61%);
  }

  /* MD overrides */
  .language-markdown .token.url,
  .language-markdown .token.url > .token.operator,
  .language-markdown .token.url-reference.url > .token.string {
    color: hsl(220, 14%, 71%);
  }

  .language-markdown .token.url > .token.content {
    color: hsl(207, 82%, 66%);
  }

  .language-markdown .token.url > .token.url,
  .language-markdown .token.url-reference.url {
    color: hsl(187, 47%, 55%);
  }

  .language-markdown .token.blockquote.punctuation,
  .language-markdown .token.hr.punctuation {
    color: hsl(220, 10%, 40%);
    font-style: italic;
  }

  .language-markdown .token.code-snippet {
    color: hsl(95, 38%, 62%);
  }

  .language-markdown .token.bold .token.content {
    color: hsl(29, 54%, 61%);
  }

  .language-markdown .token.italic .token.content {
    color: hsl(286, 60%, 67%);
  }

  .language-markdown .token.strike .token.content,
  .language-markdown .token.strike .token.punctuation,
  .language-markdown .token.list.punctuation,
  .language-markdown .token.title.important > .token.punctuation {
    color: hsl(355, 65%, 65%);
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

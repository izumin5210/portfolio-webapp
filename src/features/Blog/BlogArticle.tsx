import graphql from "babel-plugin-relay/macro";
import { createElement, Fragment, ReactElement, useEffect, useState } from "react";
import { useFragment } from "react-relay";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import { unified } from "unified";
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
    <article>
      <h1>{data.title}</h1>
      {body}
    </article>
  );
}

function useMarkdownProcessor(text: string) {
  const [Content, setContent] = useState<ReactElement | null>(null);

  useEffect(() => {
    void unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeReact, { createElement, Fragment })
      .process(text)
      .then((file) => {
        setContent(file.result);
      });
  }, [text]);

  return Content;
}

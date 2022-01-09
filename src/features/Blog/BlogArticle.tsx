import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
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
  return (
    <article>
      <h1>{data.title}</h1>
      {data.body}
    </article>
  );
}

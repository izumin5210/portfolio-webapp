import graphql from "babel-plugin-relay/macro";
import { BlogArticlePageQueryResponse } from "./__generated__/BlogArticlePageQuery.graphql";

export const BlogArticlePageQuery = graphql`
  query BlogArticlePageQuery($articlePath: String!) {
    articleEntryByPath(path: $articlePath) {
      title
      body
    }
  }
`;

export function BlogArticlePage(props: { queryResult: BlogArticlePageQueryResponse }) {
  const article = props.queryResult.articleEntryByPath;
  if (article == null) return null;
  return (
    <article>
      <h1>{article.title}</h1>
      {article.body}
    </article>
  );
}

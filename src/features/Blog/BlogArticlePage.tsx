import graphql from "babel-plugin-relay/macro";
import { BlogArticle } from "./BlogArticle";
import { BlogArticlePageQueryResponse } from "./__generated__/BlogArticlePageQuery.graphql";

export const BlogArticlePageQuery = graphql`
  query BlogArticlePageQuery($articlePath: String!) {
    articleEntryByPath(path: $articlePath) {
      ...BlogArticle
    }
  }
`;

export function BlogArticlePage(props: { queryResult: BlogArticlePageQueryResponse }) {
  const article = props.queryResult.articleEntryByPath;
  if (article == null) return null;
  return <BlogArticle article={article} />;
}

import graphql from "babel-plugin-relay/macro";
import { BlogArticle } from "./BlogArticle";
import { BlogArticlePageHead } from "./BlogArticlePageHead";
import { BlogArticlePageQuery$data } from "./__generated__/BlogArticlePageQuery.graphql";

export const BlogArticlePageQuery = graphql`
  query BlogArticlePageQuery($articlePath: String!) {
    articleEntryByPath(path: $articlePath) {
      ...BlogArticlePageHead
      ...BlogArticle
    }
  }
`;

export function BlogArticlePage(props: { queryResult: BlogArticlePageQuery$data }) {
  const article = props.queryResult.articleEntryByPath;
  if (article == null) return null;
  return (
    <>
      <BlogArticlePageHead article={article} />
      <BlogArticle article={article} />
    </>
  );
}

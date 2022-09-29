import { useQuery } from "urql";
import { gql } from "../../__generated__/gql";
import { BlogArticle } from "./BlogArticle";
import { BlogArticlePageHead } from "./BlogArticlePageHead";

export const BlogArticlePageQuery = gql(/* GraphQL */ `
  query GetBlogArticlePage($articlePath: String!) {
    articleEntryByPath(path: $articlePath) {
      ...BlogArticlePageHead
      ...BlogArticle
    }
  }
`);

export function BlogArticlePage({ articlePath }: { articlePath: string }) {
  const [res] = useQuery({
    query: BlogArticlePageQuery,
    variables: { articlePath },
  });
  const article = res.data?.articleEntryByPath;
  if (article == null) return null;
  return (
    <>
      <BlogArticlePageHead data={article} />
      <BlogArticle data={article} />
    </>
  );
}

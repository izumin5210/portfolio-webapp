import { styled } from "@linaria/react";
import Image from "next/image";
import { useEffect } from "react";
import { useQuery } from "urql";
import { colors } from "../../lib/styles/colors";
import { heading3, heading4, heading5 } from "../../lib/styles/typo";
import { Tag } from "../../lib/ui/Tag";
import { useTheme } from "../../lib/ui/useTheme";
import { FragmentType, gql, useFragment } from "../../__generated__/gql";

export const BlogArticleOgImagePageQuery = gql(/* GraphQL */ `
  query GetBlogArticleOgImagePage($articlePath: String!) {
    articleEntryByPath(path: $articlePath) {
      ...BlogArticleOgImagePageCard
    }
  }
`);

const Fragment = gql(/* GraphQL */ `
  fragment BlogArticleOgImagePageCard on ArticleEntry {
    title
    tags {
      name
      displayName
    }
    publishedOn
  }
`);

export function BlogArticleOgImagePage({ articlePath }: { articlePath: string }) {
  const [res] = useQuery({
    query: BlogArticleOgImagePageQuery,
    variables: { articlePath },
  });
  const article = res.data?.articleEntryByPath;
  if (article == null) return null;
  return <BlogArticleOgImage data={article} />;
}

function BlogArticleOgImage(props: { data: FragmentType<typeof Fragment> }) {
  const fragment = useFragment(Fragment, props.data);
  const { className, setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return (
    <Page className={className}>
      <Card>
        <Main>
          <AvatarWrapper>
            <Image src="/izumin.png" alt="izumin521t0" width={108} height={108} quality={100} layout="fixed" />
          </AvatarWrapper>
          <FirstLine>
            <AuthorName>@izumin5210</AuthorName>
            <Time dateTime={fragment.publishedOn as string}>{fragment.publishedOn as string}</Time>
          </FirstLine>

          <Title>{fragment.title}</Title>
          <TagsUl>
            {fragment.tags.map((tag) => (
              <Tag as="li" key={tag.name} text={tag.displayName} />
            ))}
          </TagsUl>
        </Main>
      </Card>
    </Page>
  );
}

const Page = styled.div`
  padding: 32px;
  background: ${colors.gray50.hex};
  width: 100vw;
  height: 100vh;
`;

const Card = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
  width: 100%;
  height: 100%;
  /* flex-direction: column; */
  color: var(--text);
  background: white;
  padding: 32px 64px;
  border-radius: 16px;
  // elevation 8
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 5px -3px, rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px;
`;

const Main = styled.main`
  display: grid;
  align-items: flex-start;
  grid-template-rows: auto auto;
  grid-template-columns: span 108px auto span;
  grid-template-areas:
    "avatar first-line"
    "avatar second-line"
    "avatar third-line";
  gap: 16px 32px;
`;

const FirstLine = styled.div`
  grid-area: first-line;
`;

const Title = styled.h1`
  grid-area: second-line;
  ${heading3}
  margin: 0;
`;

const TagsUl = styled.ul`
  grid-area: third-line;
  display: flex;
  list-style: none;
  gap: 4px 8px;
  padding: 0;
  margin: 0;

  & li {
    ${heading5}
    padding: 8px 16px;
  }

  & li:before {
    content: "#";
  }
`;

const Time = styled.time`
  ${heading5}
  color: var(--textLowEmphasis);
  margin-left: 1em;
`;

const AuthorName = styled.span`
  grid-area: name;
  flex: 100 auto;
  /* margin-left: 16px; */
  ${heading4}
  color: var(--text);
`;

const AvatarWrapper = styled.div`
  grid-area: avatar;
  border-radius: 9999vh;
  background: white;
  grid-row-start: 1;
  grid-row-end: 3;
  // elevation 2
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;
`;

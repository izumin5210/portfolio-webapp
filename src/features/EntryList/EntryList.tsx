import { styled } from "@linaria/react";
import { useCallback, useState } from "react";
import { useQuery } from "urql";
import { caption } from "../../lib/styles/typo";
import { FragmentType, gql, useFragment } from "../../__generated__/gql";
import { EntryItem } from "./EntryItem";

const ListFragment = gql(/* GraphQL */ `
  fragment EntryList on Query {
    entries(first: $count, after: $cursor) {
      pageInfo {
        endCursor
        hasNextPage
      }
      ...EntryListView
    }
  }
`);

const ListByTagsFragment = gql(/* GraphQL */ `
  fragment EntryListByTags on Query {
    entriesByTags(first: $count, after: $cursor, tags: $tags) {
      pageInfo {
        endCursor
        hasNextPage
      }
      ...EntryListView
    }
  }
`);

const ListViewFragment = gql(/* GraphQL */ `
  fragment EntryListView on EntryConnection {
    edges {
      node {
        __typename
        ... on ArticleEntry {
          id
          publishedOn
        }
        ... on ExternalArticleEntry {
          id
          publishedOn
        }
        ... on SlideEntry {
          id
          publishedOn
        }
        ... on OSSEntry {
          id
          publishedOn
        }
        ... on PodcastEntry {
          id
          publishedOn
        }
        ...EntryItem
      }
    }
  }
`);

const ListQuery = gql(/* GraphQL */ `
  query GetEntryList($cursor: String, $count: Int!) {
    ...EntryList
  }
`);

const ListByTagsQuery = gql(/* GraphQL */ `
  query GetEntryListByTags($cursor: String, $count: Int!, $tags: [String!]!) {
    ...EntryListByTags
  }
`);

export const initialEntriesCount = 20;

export function EntryList({ data }: { data: FragmentType<typeof ListFragment> }) {
  const [cursor, setCursor] = useState<string | null>(null);
  useQuery({
    query: ListQuery,
    variables: { count: initialEntriesCount, cursor },
    pause: cursor == null,
  });

  const fragment = useFragment(ListFragment, data);

  const { hasNextPage, endCursor } = fragment.entries.pageInfo;
  const loadNext = useCallback(() => {
    if (endCursor) setCursor(endCursor);
  }, [endCursor]);

  return <EntryListView data={fragment.entries} loadNext={loadNext} hasNext={hasNextPage} />;
}

export function EntryListFilteredByTags({
  data,
  tags,
}: {
  data: FragmentType<typeof ListByTagsFragment>;
  tags: string[];
}) {
  const [cursor, setCursor] = useState<string | null>(null);
  useQuery({
    query: ListByTagsQuery,
    variables: { count: initialEntriesCount, cursor, tags },
    pause: cursor == null,
  });
  const fragment = useFragment(ListByTagsFragment, data);

  const { hasNextPage, endCursor } = fragment.entriesByTags.pageInfo;
  const loadNext = useCallback(() => {
    if (endCursor) setCursor(endCursor);
  }, [endCursor]);

  return <EntryListView data={fragment.entriesByTags} loadNext={loadNext} hasNext={hasNextPage} />;
}

function EntryListView(props: { hasNext: boolean; loadNext: () => void; data: FragmentType<typeof ListViewFragment> }) {
  const data = useFragment(ListViewFragment, props.data);
  return (
    <>
      <Ul>
        {data.edges
          ?.flatMap((edge, idx, arr) => {
            if (edge?.node == null) return null;

            const prev = arr[idx - 1]?.node;

            let year: number | undefined;
            const currentPublishedOn = new Date(edge.node.publishedOn as string);
            if (prev != null) {
              const prevPublishedOn = new Date(prev.publishedOn as string);
              if (prevPublishedOn.getFullYear() !== currentPublishedOn.getFullYear()) {
                year = currentPublishedOn.getFullYear();
              }
            }

            return year ? [year, edge.node] : edge.node;
          })
          .filter((n): n is NonNullable<typeof n> => n != null)
          .map((node, idx) => {
            if (typeof node === "number") {
              return <YearLi key={`year-${node}`}>{node}</YearLi>;
            }
            const key = `item-${idx}`;
            return <EntryItem key={key} data={node} />;
          })}
      </Ul>
      {props.hasNext ? <button onClick={() => props.loadNext()}>Load more</button> : null}
    </>
  );
}

const Ul = styled.ul`
  padding: 0;
  margin: 8px;
`;

const YearLi = styled.li`
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding: 0 16px;

  list-style: none;
  color: var(--textDisabled);

  ${caption}
  font-weight: 400;
  font-style: italic;

  &:before,
  &:after {
    content: " ";
    border-top: 1px dashed var(--overlay150);
    width: 100%;
    height: 100%;
  }
`;

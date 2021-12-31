import { styled } from "@linaria/react";
import graphql from "babel-plugin-relay/macro";
import { Suspense as _Suspense, SuspenseProps } from "react";
import { useFragment, usePaginationFragment } from "react-relay";
import { caption } from "../../lib/styles/typo";
import { EntryItem } from "./EntryItem";
import type { EntryListEntries$key } from "./__generated__/EntryListEntries.graphql";
import { EntryListEntriesByTags$key } from "./__generated__/EntryListEntriesByTags.graphql";
import { EntryListFilteredByTagsPaginationQuery } from "./__generated__/EntryListFilteredByTagsPaginationQuery.graphql";
import { EntryListPaginationQuery } from "./__generated__/EntryListPaginationQuery.graphql";
import { EntryListView$key } from "./__generated__/EntryListView.graphql";

function DummySuspense(props: SuspenseProps) {
  return <>{props.children}</>;
}
const Suspense = typeof window === "undefined" ? DummySuspense : _Suspense;

function Loading() {
  return <li>Loading...</li>;
}

export function EntryList(props: { entries: EntryListEntries$key }) {
  const { data, loadNext, hasNext } = usePaginationFragment<EntryListPaginationQuery, EntryListEntries$key>(
    graphql`
      fragment EntryListEntries on Query
      @refetchable(queryName: "EntryListPaginationQuery")
      @argumentDefinitions(first: { type: "Int!" }, cursor: { type: "String" }) {
        entries(first: $count, after: $cursor) @connection(key: "EntryListEntries_entries") {
          edges {
            __typename
          }
          ...EntryListView
        }
      }
    `,
    props.entries
  );

  return <EntryListView entries={data.entries} loadNext={() => loadNext(20)} hasNext={hasNext} />;
}

export function EntryListFilteredByTags(props: { entriesByTags: EntryListEntriesByTags$key }) {
  const { data, loadNext, hasNext } = usePaginationFragment<
    EntryListFilteredByTagsPaginationQuery,
    EntryListEntriesByTags$key
  >(
    graphql`
      fragment EntryListEntriesByTags on Query
      @refetchable(queryName: "EntryListFilteredByTagsPaginationQuery")
      @argumentDefinitions(first: { type: "Int!" }, cursor: { type: "String" }, tags: { type: "[String!]!" }) {
        entriesByTags(first: $count, after: $cursor, tags: $tags) @connection(key: "EntryListEntries_entriesByTags") {
          edges {
            __typename
          }
          ...EntryListView
        }
      }
    `,
    props.entriesByTags
  );
  return <EntryListView entries={data.entriesByTags} loadNext={() => loadNext(20)} hasNext={hasNext} />;
}

function EntryListView(props: { hasNext: boolean; loadNext: () => void; entries: EntryListView$key }) {
  const data = useFragment(
    graphql`
      fragment EntryListView on EntryConnection {
        edges {
          node {
            ... on ArticleEntry {
              publishedOn
            }
            ... on SlideEntry {
              publishedOn
            }
            ... on OSSEntry {
              publishedOn
            }
            ... on PodcastEntry {
              publishedOn
            }
            ...EntryItem
          }
        }
      }
    `,
    props.entries
  );
  return (
    <>
      <Ul>
        {data.edges?.map((edge, idx, arr) => {
          const key = `item-${idx}`;
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

          return (
            <>
              {year ? <YearLi key={`year-${year}`}>{year}</YearLi> : null}
              <Suspense fallback={<Loading />} key={key}>
                <EntryItem entry={edge.node} />
              </Suspense>
            </>
          );
        })}
      </Ul>
      {props.hasNext ? <button onClick={() => props.loadNext()}>Load more</button> : null}
    </>
  );
}

const Ul = styled.ul`
  padding: 0;
  margin: 0;
`;

const YearLi = styled.li`
  display: flex;
  align-items: center;
  column-gap: 8px;

  list-style: none;
  color: rgba(0, 0, 0, 0.24);

  ${caption}
  font-family: "Poppins", sans-serif;
  font-weight: 400;

  &:before,
  &:after {
    content: " ";
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
  }
`;

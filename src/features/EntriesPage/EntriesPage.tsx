import { styled } from "@linaria/react";
import graphql from "babel-plugin-relay/macro";
import React, { Suspense as _Suspense, SuspenseProps } from "react";
import { heading5 } from "../../lib/styles/typo";
import { EntryList, EntryListFilteredByTags } from "../EntryList/EntryList";
import { PickedEntryList } from "../EntryList/PickedEntryList";
import { EntriesPageQuery$data } from "./__generated__/EntriesPageQuery.graphql";

export type { EntriesPageQuery as EntriesPageQueryType } from "./__generated__/EntriesPageQuery.graphql";

export const EntriesPageQuery = graphql`
  query EntriesPageQuery($cursor: String, $count: Int!, $tags: [String!]!, $filteredByTags: Boolean!) {
    ...PickedEntryListEntries
    ...EntryListEntries @arguments(cursor: $cursor, count: $count) @skip(if: $filteredByTags)
    ...EntryListEntriesByTags @arguments(cursor: $cursor, count: $count, tags: $tags) @include(if: $filteredByTags)
  }
`;

function DummySuspense(props: SuspenseProps) {
  return <>{props.children}</>;
}
const Suspense = typeof window === "undefined" ? DummySuspense : _Suspense;

export const EntriesPage: React.VFC<{ queryResult: EntriesPageQuery$data; filteredByTags: boolean }> = ({
  queryResult,
  filteredByTags,
}) => {
  return (
    <>
      <H2>Pickup</H2>
      <Suspense fallback={<p>loading...</p>}>
        <PickedEntryList pickedEntries={queryResult} />
      </Suspense>

      <H2>All Entries</H2>
      <Suspense fallback={<p>loading...</p>}>
        {filteredByTags ? <EntryListFilteredByTags entriesByTags={queryResult} /> : <EntryList entries={queryResult} />}
      </Suspense>
    </>
  );
};

const H2 = styled.h2`
  ${heading5}
  color: var(--text);
  margin: 48px 16px 8px;
  padding: 0;
`;

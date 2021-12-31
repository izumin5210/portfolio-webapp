import graphql from "babel-plugin-relay/macro";
import React, { Suspense as _Suspense, SuspenseProps } from "react";
import { EntryList, EntryListFilteredByTags } from "./EntryList";
import type { HomeQueryResponse } from "./__generated__/HomeQuery.graphql";

export const HomeQuery = graphql`
  query HomeQuery($cursor: String, $count: Int!, $tags: [String!]!, $filteredByTags: Boolean!) {
    ...EntryListEntries @arguments(cursor: $cursor, first: $count) @skip(if: $filteredByTags)
    ...EntryListEntriesByTags @arguments(cursor: $cursor, first: $count, tags: $tags) @include(if: $filteredByTags)
  }
`;

function DummySuspense(props: SuspenseProps) {
  return <>{props.children}</>;
}
const Suspense = typeof window === "undefined" ? DummySuspense : _Suspense;

export const Home: React.VFC<{ queryResult: HomeQueryResponse; filteredByTags: boolean }> = ({
  queryResult,
  filteredByTags,
}) => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      {filteredByTags ? <EntryListFilteredByTags entriesByTags={queryResult} /> : <EntryList entries={queryResult} />}
    </Suspense>
  );
};

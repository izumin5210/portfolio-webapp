import graphql from "babel-plugin-relay/macro";
import React, { Suspense as _Suspense, SuspenseProps } from "react";
import { EntryList } from "./EntryList";
import type { HomeQueryResponse } from "./__generated__/HomeQuery.graphql";

export const HomeQuery = graphql`
  query HomeQuery($cursor: String, $count: Int!) {
    ...EntryListEntries
  }
`;

function DummySuspense(props: SuspenseProps) {
  return <>{props.children}</>;
}
const Suspense = typeof window === "undefined" ? DummySuspense : _Suspense;

export const Home: React.VFC<{ queryResult: HomeQueryResponse }> = ({ queryResult }) => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <EntryList entries={queryResult} />
    </Suspense>
  );
};

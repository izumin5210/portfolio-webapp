import { styled } from "@linaria/react";
import graphql from "babel-plugin-relay/macro";
import { Suspense as _Suspense, SuspenseProps } from "react";
import { usePaginationFragment } from "react-relay";
import { EntryItem } from "./EntryItem";
import type { EntryListEntries$key } from "./__generated__/EntryListEntries.graphql";
import { EntryListPaginationQuery } from "./__generated__/EntryListPaginationQuery.graphql";

type Props = {
  entries: EntryListEntries$key;
};

function DummySuspense(props: SuspenseProps) {
  return <>{props.children}</>;
}
const Suspense = typeof window === "undefined" ? DummySuspense : _Suspense;

function Loading() {
  return <li>Loading...</li>;
}

export function EntryList(props: Props) {
  const { data, loadNext, hasNext } = usePaginationFragment<EntryListPaginationQuery, EntryListEntries$key>(
    graphql`
      fragment EntryListEntries on Query @refetchable(queryName: "EntryListPaginationQuery") {
        entries(first: $count, after: $cursor) @connection(key: "EntryListEntries_entries") {
          edges {
            node {
              ...EntryItem
            }
          }
        }
      }
    `,
    props.entries
  );

  return (
    <>
      <Ul>
        {data.entries?.edges?.map((edge, idx) => {
          const key = `item-${idx}`;
          if (edge?.node == null) return null;
          return (
            <Suspense fallback={<Loading />} key={key}>
              <EntryItem entry={edge.node} />
            </Suspense>
          );
        })}
      </Ul>
      {hasNext ? <button onClick={() => loadNext(20)}>Load more</button> : null}
    </>
  );
}

const Ul = styled.ul`
  padding: 0;
  margin: 0;
`;

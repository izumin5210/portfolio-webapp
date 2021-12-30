import { useFragment, usePaginationFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import type { EntryListEntries$key } from "./__generated__/EntryListEntries.graphql";
import { EntryListPaginationQuery } from "./__generated__/EntryListPaginationQuery.graphql";

type Props = {
  entries: EntryListEntries$key;
};

export function EntryList(props: Props) {
  const { data } = usePaginationFragment<EntryListPaginationQuery, EntryListEntries$key>(
    graphql`
      fragment EntryListEntries on Query @refetchable(queryName: "EntryListPaginationQuery") {
        entries(first: $count, after: $cursor) @connection(key: "EntryListEntries_entries") {
          edges {
            node {
              ... on ArticleEntry {
                title
                url
              }
              ... on SlideEntry {
                title
                url
              }
              ... on OSSEntry {
                title
                url
              }
              ... on PodcastEntry {
                title
                url
              }
            }
          }
        }
      }
    `,
    props.entries
  );

  return (
    <ul>
      {data.entries?.edges?.map(
        (edge) =>
          edge?.node && (
            <li key={edge.node.title}>
              <a href={edge.node.url}>{edge.node.title}</a>
            </li>
          )
      )}
    </ul>
  );
}

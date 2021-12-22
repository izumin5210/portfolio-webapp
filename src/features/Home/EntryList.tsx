import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { EntryListEntries$key } from "./__generated__/EntryListEntries.graphql";

type Props = {
  entries: EntryListEntries$key;
};

export function EntryList(props: Props) {
  const entries = useFragment(
    graphql`
      fragment EntryListEntries on Query {
        entries {
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
    `,
    props.entries
  );

  return (
    <ul>
      {entries.entries.map((entry: any) => (
        <li key={entry.title}>{entry.title}</li>
      ))}
    </ul>
  );
}

import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { EntryItem$key } from "./__generated__/EntryItem.graphql";

type Props = {
  entry: EntryItem$key;
};

export function EntryItem(props: Props) {
  const data = useFragment(
    graphql`
      fragment EntryItem on Entry {
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
    `,
    props.entry
  );

  return (
    <li key={data.title}>
      <a href={data.url}>{data.title}</a>
    </li>
  );
}

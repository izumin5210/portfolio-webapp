import { styled } from "@linaria/react";
import { reactionCss } from "../../lib/styles/reactions";
import { body1, caption } from "../../lib/styles/typo";
import { FragmentType, gql, useFragment } from "../../__generated__/gql";

const Fragment = gql(/* GraphQL */ `
  fragment PickedEntryListEntries on Query {
    pickedEntries {
      __typename
      ... on ArticleEntry {
        title
        path
      }
      ... on ExternalArticleEntry {
        title
        url
        source {
          name
        }
      }
      ... on SlideEntry {
        title
        url
        source {
          name
        }
      }
      ... on OSSEntry {
        title
        url
        source {
          name
        }
      }
      ... on PodcastEntry {
        title
        url
        source {
          name
        }
      }
    }
  }
`);

export function PickedEntryList(props: { data: FragmentType<typeof Fragment> }) {
  const fragment = useFragment(Fragment, props.data);
  return (
    <PickedEntryItemUl>
      {fragment.pickedEntries.map((entry, idx) => {
        const key = `pickedEntry-${idx}`;
        return (
          <li key={key}>
            <PickedEntryItemAnchor href={"url" in entry ? entry.url : entry.path}>
              <PickedEntryTitle>{entry.title}</PickedEntryTitle>
              <PickedEntryCite>{"source" in entry && entry.source.name}</PickedEntryCite>
            </PickedEntryItemAnchor>
          </li>
        );
      })}
    </PickedEntryItemUl>
  );
}

const PickedEntryItemUl = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  padding: 0;
  margin: 8px;
`;

const PickedEntryItemAnchor = styled.a`
  ${body1}
  display: block;
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 4px;
  color: var(--text);
  text-decoration: none;
  ${reactionCss({ withOverlay: true })}
`;

const PickedEntryTitle = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PickedEntryCite = styled.cite`
  display: block;
  ${caption}
  font-weight: 400;
  color: var(--textLowEmphasis);
`;

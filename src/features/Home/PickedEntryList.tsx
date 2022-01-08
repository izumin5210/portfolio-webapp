import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { PickedEntryListEntries$key } from "./__generated__/PickedEntryListEntries.graphql";
import { styled } from "@linaria/react";
import { body1, caption } from "../../lib/styles/typo";

export function PickedEntryList(props: { pickedEntries: PickedEntryListEntries$key }) {
  const data = useFragment(
    graphql`
      fragment PickedEntryListEntries on Query {
        pickedEntries {
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
    `,
    props.pickedEntries
  );
  return (
    <PickedEntryItemUl>
      {data.pickedEntries.map((entry, idx) => {
        const key = `pickedEntry-${idx}`;
        return (
          <li key={key}>
            <PickedEntryItemAnchor href={entry.url ?? data.path}>
              <PickedEntryTitle>{entry.title}</PickedEntryTitle>
              <PickedEntryCite>{entry.source?.name}</PickedEntryCite>
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
  transition: all 300ms;
  border-radius: 4px;
  &:hover,
  &:focus-visible {
    background: rgba(0, 0, 0, 0.04);
  }
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
  color: rgba(0, 0, 0, 0.56);
`;

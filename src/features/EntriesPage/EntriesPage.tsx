import { styled } from "@linaria/react";
import React from "react";
import { useQuery } from "urql";
import { heading5 } from "../../lib/styles/typo";
import { gql } from "../../__generated__/gql";
import { EntryList, EntryListFilteredByTags, initialEntriesCount } from "../EntryList/EntryList";
import { PickedEntryList } from "../EntryList/PickedEntryList";

export type { EntriesPageQuery as EntriesPageQueryType } from "./__generated__/EntriesPageQuery.graphql";

export const EntriesPageQuery = gql(/* GraphQL */ `
  query GetEntriesPage($cursor: String, $count: Int!, $tags: [String!]!, $filteredByTags: Boolean!) {
    ...PickedEntryListEntries
    ...EntryList
    ...EntryListByTags @include(if: $filteredByTags)
  }
`);

export { initialEntriesCount };

export const EntriesPage: React.VFC<{ tags: string[] }> = ({ tags }) => {
  const filteredByTags = tags.length > 0;
  const [res] = useQuery({
    query: EntriesPageQuery,
    variables: {
      count: initialEntriesCount,
      cursor: null,
      tags,
      filteredByTags: tags.length > 0,
    },
  });
  if (res.data == null) return null;

  return (
    <>
      <H2>Pickup</H2>
      <PickedEntryList data={res.data} />

      <H2>All Entries</H2>
      {filteredByTags ? <EntryListFilteredByTags data={res.data} /> : <EntryList data={res.data} />}
    </>
  );
};

const H2 = styled.h2`
  ${heading5}
  color: var(--text);
  margin: 48px 16px 8px;
  padding: 0;
`;

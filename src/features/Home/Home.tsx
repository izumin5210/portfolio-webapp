import { styled } from "@linaria/react";
import graphql from "babel-plugin-relay/macro";
import Image from "next/image";
import React, { Suspense as _Suspense, SuspenseProps } from "react";
import { body1, heading5 } from "../../lib/styles/typo";
import { EntryList, EntryListFilteredByTags } from "./EntryList";
import { PickedEntryList } from "./PickedEntryList";
import type { HomeQueryResponse } from "./__generated__/HomeQuery.graphql";

export const HomeQuery = graphql`
  query HomeQuery($cursor: String, $count: Int!, $tags: [String!]!, $filteredByTags: Boolean!) {
    ...PickedEntryListEntries
    ...EntryListEntries @arguments(cursor: $cursor, count: $count) @skip(if: $filteredByTags)
    ...EntryListEntriesByTags @arguments(cursor: $cursor, count: $count, tags: $tags) @include(if: $filteredByTags)
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
    <>
      <Header>
        <AvatarWrapper>
          <Image src="/izumin.png" alt="izumin521t0" width={80} height={80} quality={100} layout="fixed" />
        </AvatarWrapper>
        <InfoWrapper>
          <NameHeading>@izumin5210</NameHeading>
          <ShortDescription>Software Engineer</ShortDescription>
        </InfoWrapper>
      </Header>

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

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 84px 0 32px;
  margin: 0;
`;

const InfoWrapper = styled.div`
  margin-left: 16px;
`;

const NameHeading = styled.h1`
  ${heading5}
  font-weight: 400;
  color: rgba(0, 0, 0, 0.86);
  margin: 0;
  padding: 0;
`;

const ShortDescription = styled.p`
  ${body1}
  font-weight: 400;
  color: rgba(0, 0, 0, 0.86);
  margin: 0;
  padding: 0;
`;

const AvatarWrapper = styled.div`
  grid-area: avatar;
  border-radius: 9999vh;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
`;

const H2 = styled.h2`
  ${heading5}
  color: rgba(0, 0, 0, 0.86);
  margin: 48px 16px 8px;
  padding: 0;
`;

import { styled } from "@linaria/react";
import graphql from "babel-plugin-relay/macro";
import Image from "next/image";
import React, { Suspense as _Suspense, SuspenseProps } from "react";
import { body1, heading5 } from "../../lib/styles/typo";
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
    <>
      <Header>
        <AvatarWrapper>
          <Image src="/izumin.png" width={80} height={80} quality={100} layout="fixed" />
        </AvatarWrapper>
        <InfoWrapper>
          <NameHeading>@izumin5210</NameHeading>
          <ShortDescription>Software Engineer</ShortDescription>
        </InfoWrapper>
      </Header>

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
  margin: 80px 0 80px;
`;

const InfoWrapper = styled.div`
  margin-left: 16px;
`;

const NameHeading = styled.h1`
  ${heading5}
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  color: rgba(0, 0, 0, 0.86);
  margin: 0;
  padding: 0;
`;

const ShortDescription = styled.p`
  ${body1}
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  color: rgba(0, 0, 0, 0.86);
  margin: 0;
  padding: 0;
`;

const AvatarWrapper = styled.div`
  grid-area: avatar;
  border-radius: 9999vh;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
`;

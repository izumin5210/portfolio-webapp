import graphql from "babel-plugin-relay/macro";
import React from "react";
import { EntryList } from "./EntryList";
import type { HomeQueryResponse } from "./__generated__/HomeQuery.graphql";

export const HomeQuery = graphql`
  query HomeQuery($cursor: String, $count: Int!) {
    ...EntryListEntries
  }
`;

export const Home: React.VFC<{ queryResult: HomeQueryResponse }> = ({ queryResult }) => {
  return <EntryList entries={queryResult} />;
};

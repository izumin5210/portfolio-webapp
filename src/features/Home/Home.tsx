import graphql from "babel-plugin-relay/macro";
import React from "react";
import type { HomeQueryResponse } from "./__generated__/HomeQuery.graphql";

export const HomeQuery = graphql`
  query HomeQuery {
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
`;

export const Home: React.VFC<{ queryResult: HomeQueryResponse }> = ({ queryResult }) => {
  return (
    <ul>
      {queryResult.entries.map((entry: any) => (
        <li key={entry.title}>{entry.title}</li>
      ))}
    </ul>
  );
};

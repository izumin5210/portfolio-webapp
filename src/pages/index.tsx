import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import { fetchQuery } from "react-relay";
import { Home, HomeQuery } from "../features/Home";
import type { HomeQuery as HomeQueryType } from "../features/Home/__generated__/HomeQuery.graphql";
import { initRelayEnvironment } from "../lib/RelayEnvironment";

const HomePage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return props.queryResult ? <Home queryResult={props.queryResult} filteredByTags={props.filteredByTags} /> : null;
};

export type Query = {
  tags?: string[];
};

export const getServerSideProps: GetServerSideProps<{
  queryResult: HomeQueryType["response"] | undefined;
  filteredByTags: boolean;
  initialRecords: any;
}> = async (ctx) => {
  const query = ctx.query as Query;
  const tags = (query.tags ?? []) as string[];
  const filteredByTags = tags.length > 0;
  if (tags.includes("error")) {
    throw new Error("unknown error");
  }
  const env = initRelayEnvironment();
  const queryResult = await fetchQuery<HomeQueryType>(env, HomeQuery, {
    count: 20,
    cursor: null,
    tags,
    filteredByTags,
  }).toPromise();
  const initialRecords = env.getStore().getSource().toJSON();

  return {
    props: {
      queryResult,
      filteredByTags,
      initialRecords,
    },
  };
};

export default HomePage;

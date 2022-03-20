import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import { fetchQuery } from "react-relay";
import { EntriesPage, EntriesPageQuery, EntriesPageQueryType } from "../features/EntriesPage/EntriesPage";
import { initRelayEnvironment } from "../lib/RelayEnvironment";

const HomePage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (props.queryResult == null) return null;
  return <EntriesPage queryResult={props.queryResult} filteredByTags={props.filteredByTags} />;
};

export type Query = {
  tags?: string[];
};

export const getServerSideProps: GetServerSideProps<{
  queryResult: EntriesPageQueryType["response"] | undefined;
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
  const queryResult = await fetchQuery<EntriesPageQueryType>(env, EntriesPageQuery, {
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

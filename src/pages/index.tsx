import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import { fetchQuery } from "react-relay";
import { Home, HomeQuery } from "../features/Home";
import type { HomeQuery as HomeQueryType } from "../features/Home/__generated__/HomeQuery.graphql";
import { initRelayEnvironment } from "../lib/RelayEnvironment";

const HomePage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return props.queryResult ? <Home queryResult={props.queryResult} /> : null;
};

export const getServerSideProps: GetServerSideProps<{
  queryResult: HomeQueryType["response"] | undefined;
  initialRecords: any;
}> = async () => {
  const env = initRelayEnvironment();
  const queryResult = await fetchQuery<HomeQueryType>(env, HomeQuery, {}).toPromise();
  const initialRecords = env.getStore().getSource().toJSON();

  return {
    props: {
      queryResult,
      initialRecords,
    },
  };
};

export default HomePage;

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SSRData } from "next-urql";
import { EntriesPage, EntriesPageQuery, initialEntriesCount } from "../features/EntriesPage/EntriesPage";
import { initUrqlClient, withUrqlClient } from "../util/urqlSSR";

const HomePage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <EntriesPage tags={props.tags} />;
};

export type Query = {
  tags?: string[];
};

export const getServerSideProps: GetServerSideProps<{
  tags: string[];
  urqlState: SSRData;
}> = async (ctx) => {
  const query = ctx.query as Query;
  const tags = (query.tags ?? []) as string[];
  const filteredByTags = tags.length > 0;
  if (tags.includes("error")) {
    throw new Error("unknown error");
  }

  const { client, ssrCache } = initUrqlClient();
  await client?.query(EntriesPageQuery, { count: initialEntriesCount, cursor: null, tags, filteredByTags }).toPromise();

  return {
    props: {
      tags,
      urqlState: ssrCache.extractData(),
    },
  };
};

export default withUrqlClient(HomePage);

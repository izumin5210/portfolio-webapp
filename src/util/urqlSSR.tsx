import { cacheExchange } from "@urql/exchange-graphcache";
import { relayPagination } from "@urql/exchange-graphcache/extras";
import { NextComponentType, NextPage } from "next";
import {
  initUrqlClient as _initUrqlClient,
  NextUrqlContext,
  withUrqlClient as _withUrqlClient,
  WithUrqlProps,
} from "next-urql";
import NextApp from "next/app";
import { ComponentProps } from "react";
import { dedupExchange, fetchExchange, ssrExchange } from "urql";
import { schema } from "../__generated__/urql-introspection";

const baseUrl = typeof window === "undefined" ? `http://0.0.0.0:${process.env.PORT || 3000}` : location.origin;
const url = `${baseUrl}/api/graphql`;

function buildCacheExchange() {
  return cacheExchange({
    resolvers: {
      Query: {
        entries: relayPagination(),
      },
    },
    schema,
  });
}

export function initUrqlClient() {
  const ssrCache = ssrExchange({ isClient: false });
  const cache = buildCacheExchange();
  const client = _initUrqlClient(
    {
      url,
      exchanges: [dedupExchange, cache, ssrCache, fetchExchange],
    },
    false
  );
  return { client, ssrCache };
}

export function withUrqlClient<C extends NextPage<any, any> | typeof NextApp>(
  AppOrPage: C
  // eslint-disable-next-line @typescript-eslint/ban-types
): NextComponentType<NextUrqlContext, {}, ComponentProps<C> & WithUrqlProps> {
  return _withUrqlClient((ssr) => ({
    url,
    exchanges: [dedupExchange, buildCacheExchange(), ssr, fetchExchange],
  }))(AppOrPage) as NextComponentType<
    NextUrqlContext,
    // eslint-disable-next-line @typescript-eslint/ban-types
    {},
    ComponentProps<C> & WithUrqlProps
  >;
}

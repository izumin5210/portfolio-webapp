import { NextComponentType, NextPage } from "next";
import NextApp from "next/app";
import {
  initUrqlClient as _initUrqlClient,
  NextUrqlContext,
  withUrqlClient as _withUrqlClient,
  WithUrqlProps,
} from "next-urql";
import { dedupExchange, fetchExchange, ssrExchange } from "urql";
import { ComponentProps } from "react";
import { cacheExchange } from "@urql/exchange-graphcache";
import { relayPagination } from "@urql/exchange-graphcache/extras";

const baseUrl = typeof window === "undefined" ? `http://0.0.0.0:${process.env.PORT || 3000}` : location.origin;
const url = `${baseUrl}/api/graphql`;

function cacheExchangeResolvers() {
  return {
    Query: {
      entries: relayPagination(),
    },
  };
}

export function initUrqlClient() {
  const ssrCache = ssrExchange({ isClient: false });
  const client = _initUrqlClient(
    {
      url,
      exchanges: [dedupExchange, cacheExchange({ resolvers: cacheExchangeResolvers() }), ssrCache, fetchExchange],
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
    exchanges: [dedupExchange, cacheExchange({ resolvers: cacheExchangeResolvers() }), ssr, fetchExchange],
  }))(AppOrPage) as NextComponentType<
    NextUrqlContext,
    // eslint-disable-next-line @typescript-eslint/ban-types
    {},
    ComponentProps<C> & WithUrqlProps
  >;
}

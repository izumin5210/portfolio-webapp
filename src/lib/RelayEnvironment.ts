import { useMemo } from "react";
import { Environment, FetchFunction, Network, RecordSource, Store } from "relay-runtime";

const fetchQuery: FetchFunction = async (operation, variables, _cacheConfig, _uploadables) => {
  const url = `${
    typeof window === "undefined" ? `http://0.0.0.0:${process.env.PORT || 3000}` : location.origin
  }/api/graphql`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return await response.json();
};

function createEnvironment(_initialRecords: unknown) {
  return new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  });
}

let relayEnvironment: Environment;

export function initRelayEnvironment(initialRecords?: unknown) {
  const environment = relayEnvironment ?? createEnvironment(initialRecords);

  if (initialRecords) {
    environment.getStore().publish(new RecordSource(initialRecords as any));
  }
  if (typeof window === "undefined") return environment;
  if (!relayEnvironment) relayEnvironment = environment;

  return relayEnvironment;
}

export function useInitRelayEnvironment(initialRecords: unknown) {
  const store = useMemo(() => initRelayEnvironment(initialRecords), [initialRecords]);
  return store;
}

import { PropsWithChildren, Suspense, useEffect, useMemo } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";

export function RelayMockProvider(
  props: PropsWithChildren<{ mockResolvers?: Parameters<typeof MockPayloadGenerator.generate>[1] }>
) {
  const environment = useMemo(() => createMockEnvironment(), []);
  useEffect(() => {
    environment.mock.resolveMostRecentOperation((op) => {
      return MockPayloadGenerator.generate(op, props.mockResolvers);
    });
  }, [environment, props.mockResolvers]);
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback="loading">{props.children}</Suspense>
    </RelayEnvironmentProvider>
  );
}

export type PublicEnv = {
  previewedPrNum: number | null;
  graphqlGatewayEndpoint: string;
};

export const publicEnv = initPublicEnv();

function initPublicEnv(): PublicEnv {
  if (!isServer()) return (window as any).publicEnv;

  const previewedPrNum = Number(process.env.PREVIEWED_PR_NUM) || null;
  const graphqlGatewayUrl = isInCloudRun()
    ? previewedPrNum != null
      ? `https://pr${previewedPrNum}---portfolio-graphql-gateway-orj7ubxzkq-uc.a.run.app`
      : "https://graphql-gateway.izum.in"
    : "http://localhost:4001";

  return {
    previewedPrNum,
    graphqlGatewayEndpoint: `${graphqlGatewayUrl}/graphql`,
  };
}

function isServer(): boolean {
  return typeof window === "undefined";
}

function isInCloudRun(): boolean {
  // https://cloud.google.com/run/docs/container-contract
  return isServer() && !!process.env.K_SERVICE;
}

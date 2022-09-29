import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from "graphql-helix";
import type { NextApiRequest, NextApiResponse } from "next";
import { schema } from "../../api/graphql";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const request = {
    body: req.body,
    headers: req.headers,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    method: req.method!,
    query: req.query,
  };

  if (shouldRenderGraphiQL(request)) {
    res.send(
      renderGraphiQL({
        endpoint: "/api/graphql",
      })
    );
    return;
  }

  const { operationName, query, variables } = getGraphQLParameters(request);

  // Validate and execute the query
  const result = await processRequest({
    operationName,
    query,
    variables,
    request,
    schema,
  });

  await new Promise<void>((resolve) => {
    setTimeout(async () => {
      await sendResult(result, res);
      resolve();
    }, 1000);
  });
}

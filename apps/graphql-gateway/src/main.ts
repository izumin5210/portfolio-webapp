import { createServer } from "@graphql-yoga/node";
import { createContext } from "./context";
import { schema } from "./schema";

async function bootstrap() {
  const port = Number(process.env.PORT);
  if (isNaN(port)) throw new Error("require PORT");

  const server = createServer({ schema, context: createContext, port });

  await server.start();
}

void bootstrap();

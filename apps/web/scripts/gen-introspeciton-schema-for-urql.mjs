import { readFile, writeFile } from "fs/promises";
import { minifyIntrospectionQuery, getIntrospectedSchema } from "@urql/introspection";

const original = await readFile("./schema.json", "utf-8");
const minified = minifyIntrospectionQuery(getIntrospectedSchema(original));
await writeFile(
  "./src/__generated__/urql-introspection.ts",
  [
    `import type { IntrospectionData } from "@urql/exchange-graphcache/dist/types/ast";`,
    `export const schema = ${JSON.stringify(minified)} as IntrospectionData;`,
  ].join("\n")
);

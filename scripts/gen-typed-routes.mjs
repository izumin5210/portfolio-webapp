import * as fs from "fs/promises";
import _glob from "glob";
import * as path from "path";
import ts from "typescript";
import { promisify } from "util";

const glob = promisify(_glob);

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const rootDir = path.join(__dirname, "..");

const pagesDir = path.join(rootDir, "src/pages");
const filenames = (await glob(path.join(pagesDir, "**/*.tsx"))).filter((p) => !path.basename(p).startsWith("_"));

const prog = ts.createProgram({ rootNames: filenames, options: {} });
const srcs = prog.getSourceFiles();

const pageFilePat = new RegExp(`${pagesDir}/(.*).tsx`);

/** @type {Array<{ path: string, hasQuery: boolean }>} */
const routeDefs = srcs
  .map((src) => {
    const m = src.fileName.match(pageFilePat);
    if (m == null) return null;

    const path = m[1];

    let hasQuery = false;
    ts.forEachChild(src, (node) => {
      if ((ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) && node.name.text === "Query") {
        hasQuery = true;
      }
    });

    return { path, hasQuery };
  })
  .filter((d) => d != null);

/**
 * @param path {string}
 * @returns {string}
 */
export function pageTypeIdentFromPath(path) {
  const ident = path
    .replace(/\./g, "_$")
    .replace(/\//g, "$_")
    .replace(/(\[\])/g, "$$");
  return `types${ident}`;
}

const ast = [
  ...routeDefs
    .filter((rd) => rd.hasQuery)
    .map((routeDef) => {
      return ts.factory.createImportDeclaration(
        undefined,
        undefined,
        ts.factory.createImportClause(
          true,
          undefined,
          ts.factory.createNamespaceImport(ts.factory.createIdentifier(pageTypeIdentFromPath(routeDef.path)))
        ),
        ts.factory.createStringLiteral(`./pages/${routeDef.path}`),
        undefined
      );
    }),
  ts.factory.createTypeAliasDeclaration(
    undefined,
    [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    "Routes",
    undefined,
    ts.factory.createTypeLiteralNode(
      routeDefs.map((routeDef) => {
        const queryNode = routeDef.hasQuery
          ? ts.factory.createTypeReferenceNode(
              ts.factory.createQualifiedName(ts.factory.createIdentifier(pageTypeIdentFromPath(routeDef.path)), "Query")
            )
          : ts.factory.createTypeLiteralNode([]);
        return ts.factory.createPropertySignature(
          undefined,
          ts.factory.createStringLiteral(`/${routeDef.path.replace(/\/index$/, "/").replace(/^index$/, "")}`),
          undefined,
          ts.factory.createTypeLiteralNode([
            ts.factory.createPropertySignature(undefined, "query", undefined, queryNode),
          ])
        );
      })
    )
  ),
  ts.factory.createModuleDeclaration(
    undefined,
    [ts.factory.createToken(ts.SyntaxKind.DeclareKeyword)],
    ts.factory.createIdentifier("global"),
    ts.factory.createModuleBlock([
      ts.factory.createInterfaceDeclaration(
        undefined,
        undefined,
        "NextRoutes",
        undefined,
        [
          ts.factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
            ts.factory.createExpressionWithTypeArguments(ts.factory.createIdentifier("Routes"), []),
          ]),
        ],
        []
      ),
    ]),
    ts.NodeFlags.GlobalAugmentation
  ),
];

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const result = printer.printFile(
  ts.factory.updateSourceFile(
    ts.createSourceFile("generated.ts", "", ts.ScriptTarget.Latest, false, ts.ScriptKind.TS),
    ast,
    false
  )
);

const scriptFilename = path.relative(rootDir, new URL(import.meta.url).pathname);
await fs.mkdir("src/__generated__");
await fs.writeFile(
  "src/__generated__/Routes.ts",
  [`// Code generated by ${scriptFilename}. DO NOT EDIT.`, "", "/* eslint-disable */", "", result].join("\n"),
  {
    encoding: "utf-8",
  }
);

import type { ParsedUrlQuery } from "querystring";

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type TrimLeadingSlash<T extends string> = T extends `/${infer U}` ? U : never;
type TrimTrailingIndex<T extends string> = T extends `/index` ? never : T;
type SplitPaths<T extends string> = T extends `${infer U}/${infer S}` ? U | SplitPaths<S> : T;
type ExtractPathParams<T extends string> = T extends `[...${infer U}]`
  ? Record<U, string[]>
  : T extends `[${infer U}]`
  ? Record<U, string>
  : never;

/**
 * @see https://zenn.dev/panda_program/articles/typescript-nextjs-routing
 */
type PathParams<T extends string> = UnionToIntersection<
  ExtractPathParams<SplitPaths<TrimTrailingIndex<TrimLeadingSlash<T>>>>
>;

type Route<Q extends ParsedUrlQuery> = {
  query: Q;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface NextRoutes {}
}

type Path = keyof NextRoutes;

type Query<T extends Path> = NextRoutes[T] extends Route<infer U> ? U : never;

type ValueOf<T> = T[keyof T];
type Compact<T> = { [K in ValueOf<{ [K in keyof T]: keyof T[K] extends never ? never : K }>]: T[K] };

type GetPathProps<T extends Path> = Compact<{
  params: { [K in keyof PathParams<T>]: PathParams<T>[K] };
  query: { [K in keyof Query<T>]: Query<T>[K] };
}>;

export function getPath<T extends Path>(
  path: T,
  opts: /* flatten */ { [K in keyof GetPathProps<T>]: GetPathProps<T>[K] }
): string {
  const { params = {}, query = {} } = opts as { params?: ParsedUrlQuery; query?: ParsedUrlQuery };
  const pathChunks = path.split("/").flatMap((chunk) => {
    const m1 = chunk.match(/^\[\.\.\.(\w+)\]$/);
    if (m1 != null) {
      const p = params[m1[1]];
      if (p == null || p.length === 0) throw new Error(`param ${chunk} is required`);
      return p;
    }
    const m2 = chunk.match(/^\[(\w+)\]$/);
    if (m2 != null) {
      const p = params[m2[1]];
      if (p == null) throw new Error(`param ${chunk} is required`);
      return p;
    }
    return chunk;
  });
  const searchParams = new URLSearchParams();
  for (const [k, arr] of Object.entries(query)) {
    for (const v of Array.isArray(arr) ? arr : [arr]) {
      if (v) searchParams.append(k, v);
    }
  }
  const queryStr = searchParams.toString();
  return pathChunks.join("/") + (queryStr.length > 0 ? `?${queryStr}` : "");
}

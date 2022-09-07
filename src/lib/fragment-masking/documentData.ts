import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

import { FragmentType } from "../../__generated__/gql";

export function documentData<TType>(
  d: DocumentNode<TType, any>,
  f: ExpandFragmentRefs<TType>
): FragmentType<DocumentNode<TType, any>> {
  return f as any;
}

type ExpandFragmentRefs<T> = T extends Record<string, unknown>
  ? ExpandFragmentObjectRefs<T>
  : T extends ReadonlyArray<infer U>
  ? ExpandFragmentRefs<U>[]
  : T extends (infer U)[] // remove readonly
  ? ExpandFragmentRefs<U>[]
  : T;

type ExpandFragmentObjectRefs<T extends Record<string, unknown>> = UnionToIntersection<
  | OmitMeta<T extends { " $fragmentRefs": infer R } ? ExpandFragmentRefs<R[keyof R]> : never>
  | OmitMeta<{ -readonly [K in keyof T]: ExpandFragmentRefs<T[K]> }>
> extends infer U
  ? { [K in keyof U]: U[K] } // Flatten
  : never;

type OmitMeta<T> = T extends Record<string, unknown> ? Omit<T, " $fragmentName" | " $fragmentRefs"> : T;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

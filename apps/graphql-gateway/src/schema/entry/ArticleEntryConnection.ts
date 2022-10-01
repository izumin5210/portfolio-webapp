import { builder } from "../builder";
import { ArticleEntryRef } from "./ArticleEntry";

export const ArticleEntryConnectionRef = builder.connectionObject(
  { type: ArticleEntryRef, name: "ArticleEntryConnection" },
  {}
);

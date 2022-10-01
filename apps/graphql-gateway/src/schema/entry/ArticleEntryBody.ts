import { ArticleEntryBody } from "../../data/types";
import { builder } from "../builder";

export const ArticleEntryBodyRef = builder.objectRef<ArticleEntryBody>("ArticleEntryBody");

builder.objectType(ArticleEntryBodyRef, {
  fields: (t) => ({
    markdown: t.exposeString("markdown"),
  }),
});

import { ArticleEntry } from "../../data/types";
import { builder } from "../builder";
import { ArticleEntryBodyRef } from "./ArticleEntryBody";
import { EntrySourceRef } from "./EntrySource";
import { EntryTagRef } from "./EntryTag";

export const ArticleEntryRef = builder.objectRef<ArticleEntry>("ArticleEntry");

builder.objectType(ArticleEntryRef, {
  fields: (t) => ({
    id: t.exposeID("uuid"),
    uuid: t.exposeString("uuid"),
    title: t.exposeString("title"),
    path: t.exposeString("path"),
    publishedOn: t.expose("publishedOn", { type: "Date" }),
    tags: t.expose("tags", { type: [EntryTagRef] }),
    source: t.expose("source", { type: EntrySourceRef }),
    picked: t.exposeBoolean("picked"),
  }),
});

builder.objectField(ArticleEntryRef, "body", (t) =>
  t.field({
    type: ArticleEntryBodyRef,
    async resolve(parent, _args, ctx, _info) {
      return ctx.data.articleEntries.getArticleEntryBody(parent.path);
    },
  })
);

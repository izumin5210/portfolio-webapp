import { ExternalEntry } from "../../data/types";
import { builder } from "../builder";
import { EntrySourceRef } from "./EntrySource";
import { EntryTagRef } from "./EntryTag";

export const ExternalArticleEntryRef = builder.objectRef<ExternalEntry>("ExternalArticleEntry");

builder.objectType(ExternalArticleEntryRef, {
  fields: (t) => ({
    id: t.exposeID("uuid"),
    uuid: t.exposeString("uuid"),
    title: t.exposeString("title"),
    url: t.exposeString("url"),
    publishedOn: t.expose("publishedOn", { type: "Date" }),
    tags: t.expose("tags", { type: [EntryTagRef] }),
    source: t.expose("source", { type: EntrySourceRef }),
    picked: t.exposeBoolean("picked"),
  }),
});

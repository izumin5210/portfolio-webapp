import { ExternalEntry } from "../../data/types";
import { builder } from "../builder";
import { EntrySourceRef } from "./EntrySource";
import { EntryTagRef } from "./EntryTag";

export const OSSEntryRef = builder.objectRef<ExternalEntry>("OSSEntry");

builder.objectType(OSSEntryRef, {
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

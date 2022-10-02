import { ExternalEntry } from "../../data/types";
import { builder } from "../builder";
import { EntrySourceRef } from "./EntrySource";
import { EntryTagRef } from "./EntryTag";

export const SlideEntryRef = builder.objectRef<ExternalEntry>("SlideEntry");

builder.objectType(SlideEntryRef, {
  fields: (t) => ({
    id: t.exposeID("uuid"),
    uuid: t.exposeString("uuid"),
    title: t.exposeString("title"),
    url: t.exposeString("url"),
    publishedOn: t.expose("publishedOn", { type: "Date" }),
    updatedOn: t.expose("updatedOn", { type: "Date", nullable: true }),
    tags: t.expose("tags", { type: [EntryTagRef] }),
    source: t.expose("source", { type: EntrySourceRef }),
    picked: t.exposeBoolean("picked"),
  }),
});

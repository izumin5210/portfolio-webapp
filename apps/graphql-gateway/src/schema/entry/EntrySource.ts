import { EntrySource } from "../../data/types";
import { builder } from "../builder";

export const EntrySourceRef = builder.objectRef<EntrySource<any>>("EntrySource");

builder.objectType(EntrySourceRef, {
  fields: (t) => ({
    name: t.exposeString("name"),
  }),
});

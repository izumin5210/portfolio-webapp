import { EntryTag } from "../../data/types";
import { builder } from "../builder";

export const EntryTagRef = builder.objectRef<EntryTag>("EntryTag");

builder.objectType(EntryTagRef, {
  fields: (t) => ({
    name: t.exposeString("name"),
    displayName: t.exposeString("displayName"),
  }),
});

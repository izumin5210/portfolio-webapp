import { builder } from "../builder";
import { EntryRef } from "./Entry";

builder.queryField("pickedEntries", (t) =>
  t.field({
    type: [EntryRef],
    async resolve(_parent, _args, ctx, _info) {
      return await ctx.data.entries.listPickedEntries();
    },
  })
);

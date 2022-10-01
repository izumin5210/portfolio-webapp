import { builder } from "../builder";
import { EntryConnectionRef } from "./EntryConnection";

builder.queryField("entriesByTags", (t) =>
  t.field({
    type: EntryConnectionRef,
    args: {
      ...t.arg.connectionArgs(),
      tags: t.arg.stringList({ required: true }),
    },
    async resolve(_parent, args, ctx, _info) {
      if (args.before || args.last) {
        throw new Error("backward pagination is not supported");
      }
      const [entries, nextPageToken] = await ctx.data.entries.listEntriesByTags({
        tags: args.tags,
        pageToken: args.after ?? undefined,
        pageSize: args.first ?? 0,
      });
      return {
        pageInfo: {
          hasNextPage: nextPageToken != null,
          hasPreviousPage: false,
          startCursor: entries[0]?.uuid,
          endCursor: nextPageToken,
        },
        edges: entries.map((node) => ({
          node,
          cursor: node.uuid,
        })),
      };
    },
  })
);

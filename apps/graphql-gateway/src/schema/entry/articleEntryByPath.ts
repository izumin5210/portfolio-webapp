import { builder } from "../builder";
import { ArticleEntryRef } from "./ArticleEntry";

builder.queryField("articleEntryByPath", (t) =>
  t.field({
    type: ArticleEntryRef,
    nullable: true,
    args: { path: t.arg.string({ required: true }) },
    async resolve(_parent, args, ctx, _info) {
      return ctx.data.entries.getArticleEntryByPath(args.path);
    },
  })
);

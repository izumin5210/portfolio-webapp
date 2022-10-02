import { builder } from "../builder";
import { ArticleEntryRef } from "./ArticleEntry";
import { ExternalArticleEntryRef } from "./ExternalArticleEntry";
import { OSSEntryRef } from "./OSSEntry";
import { PodcastEntryRef } from "./PostcastEntry";
import { SlideEntryRef } from "./SlideEntry";

export const EntryRef = builder.unionType("Entry", {
  types: [ArticleEntryRef, ExternalArticleEntryRef, OSSEntryRef, PodcastEntryRef, SlideEntryRef],
  resolveType(parent) {
    switch (parent.source.type) {
      case "article":
        return ArticleEntryRef;
      case "externalArticle":
        return ExternalArticleEntryRef;
      case "oss":
        return OSSEntryRef;
      case "podcast":
        return PodcastEntryRef;
      case "slide":
        return SlideEntryRef;
      default: {
        const _exhaustiveCheck: never = parent.source;
        throw new Error(`unknown entry type: ${parent.source}`);
      }
    }
  },
});

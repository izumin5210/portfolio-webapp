import { ArticleEntryRepository } from "./data/ArticleEntryRepository";
import { EntryRepository } from "./data/EntryRepository";

export type Context = {
  data: {
    entries: EntryRepository;
    articleEntries: ArticleEntryRepository;
  };
};

export function createContext(): Context {
  return {
    data: {
      entries: new EntryRepository(),
      articleEntries: new ArticleEntryRepository(),
    },
  };
}

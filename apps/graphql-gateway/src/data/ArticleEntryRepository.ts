import * as fs from "fs/promises";
import { GraphQLDate } from "graphql-scalars";
import path from "path";
import { ArticleEntryBody } from "./types";

export const Date = GraphQLDate;

export class ArticleEntryRepository {
  public async getArticleEntryBody(path: string): Promise<ArticleEntryBody> {
    const markdown = await this.getArticleEntryBodyMarkdown(path);
    return { markdown };
  }

  private getArticleEntryBodyMarkdown(articlePath: string): Promise<string> {
    const filename = `${articlePath
      .replace("/blog/", "/_articles/")
      .replace(/\/(\d{4})\/(\d{2})\/(\d{2})\//, "/$1-$2-$3-")}.md`;
    return fs.readFile(path.join(process.cwd(), filename), "utf-8");
  }
}

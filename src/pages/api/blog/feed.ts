import fetch from "node-fetch";
import { Feed } from "feed";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const xml = await generateFeedXml();
  res.writeHead(200, { "Content-Type": "text/xml" }).end(xml);
}

async function generateFeedXml() {
  const feed = new Feed({
    id: "https://izum.in/blog",
    link: "https://izum.in/blog",
    title: "izum.in/blog",
    description: "@izumin5210 blog",
    copyright: "",
    generator: "izum.in",
    updated: process.env.BUILT_AT ? new Date(process.env.BUILT_AT) : new Date(),
    language: "ja",
  });

  const resp = await fetch(`http://0.0.0.0:${process.env.PORT || "3000"}/api/graphql`, {
    method: "POST",
    body: JSON.stringify({ query, variables: { count: 20 } }),
    headers: { "Content-Type": "application/json" },
  });
  type ArticleEntry = {
    title: string;
    body: string;
    path: string;
    publishedOn: string;
  };
  const json = (await resp.json()) as { data: { articleEntries: { edges: { node: ArticleEntry }[] } } };
  for (const { node } of json.data.articleEntries.edges) {
    const url = `https://izum.in/${node.path}`;
    feed.addItem({
      id: url,
      title: node.title,
      link: url,
      date: new Date(node.publishedOn),
    });
  }

  return feed.rss2();
}

const query = `#graphql
  query BlogFeed($count: Int!) {
    articleEntries(first: $count) {
      edges {
        node {
          title
          path
          publishedOn
        }
      }
    }
  }
`;

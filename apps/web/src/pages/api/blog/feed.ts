import { Feed } from "feed";
import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import rehypeStringify from "rehype-stringify";
import { remarkExtractLead } from "remark-extract-lead";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import { unified } from "unified";

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

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const resp = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY_URL!, {
    method: "POST",
    body: JSON.stringify({ query, variables: { count: 20 } }),
    headers: { "Content-Type": "application/json" },
  });
  type ArticleEntry = {
    title: string;
    path: string;
    publishedOn: string;
    body: {
      markdown: string;
    };
  };
  const json = (await resp.json()) as { data: { articleEntries: { edges: { node: ArticleEntry }[] } } };
  for (const { node } of json.data.articleEntries.edges) {
    const url = `https://izum.in/${node.path}`;
    feed.addItem({
      id: url,
      title: node.title,
      link: url,
      description: await getDescriptionHtml(node.body.markdown),
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
          body {
            markdown
          }
        }
      }
    }
  }
`;

async function getDescriptionHtml(body: string) {
  const originalVfile = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkExtractLead)
    .use(remarkStringify)
    .process(body);
  const rehypeTree = await unified()
    .use(remarkRehype)
    .run(originalVfile.data.lead as any);
  return await unified()
    .use(rehypeStringify)
    .stringify(rehypeTree as any);
}

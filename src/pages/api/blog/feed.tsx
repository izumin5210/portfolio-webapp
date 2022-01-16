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
    description: "",
    copyright: "",
    generator: "izum.in",
    updated: process.env.BUILT_AT ? new Date(process.env.BUILT_AT) : new Date(),
    language: "ja",
  });

  return feed.rss2();
}

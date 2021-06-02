import React, { useEffect } from "react";
import { useRemark } from "react-remark";

export type Post = {
  title: string;
  content: string;
  slug: string;
  publishedDate: string;
};

export const PostRoot: React.VFC<{ post: Post }> = ({ post }) => {
  const rendered = useRenderedMarkdown(post.content);
  return <article>{rendered}</article>;
};

export const useRenderedMarkdown = (content: string) => {
  const [reactContent, setMarkdownSource] = useRemark();

  useEffect(() => {
    setMarkdownSource(content);
  }, [content, setMarkdownSource]);

  return reactContent;
};

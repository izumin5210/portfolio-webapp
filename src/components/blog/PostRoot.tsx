import React from "react";

export type Post = {
  title: string;
  content: string;
  slug: string;
  publishedDate: string;
};

export const PostRoot: React.VFC<{ post: Post }> = (props) => {
  return (
    <dl>
      <dt>props</dt>
      <dd>{JSON.stringify(props)}</dd>
    </dl>
  );
};

import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import graphql from "babel-plugin-relay/macro";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useFragment } from "react-relay";
import { body1, caption } from "../../lib/styles/typo";
import { EntryItem$key } from "./__generated__/EntryItem.graphql";

type Props = {
  entry: EntryItem$key;
};

export function EntryItem(props: Props) {
  const data = useFragment(
    graphql`
      fragment EntryItem on Entry {
        ... on ArticleEntry {
          title
          url
          tags
        }
        ... on SlideEntry {
          title
          url
          tags
        }
        ... on OSSEntry {
          title
          url
          tags
        }
        ... on PodcastEntry {
          title
          url
          tags
        }
      }
    `,
    props.entry
  );
  const router = useRouter();

  const selectedTags = useMemo(() => {
    const q = router.query.tags ?? [];
    return new Set(Array.isArray(q) ? q : [q]);
  }, [router.query.tags]);

  return (
    <EntryLi key={data.title}>
      <EntryAnchor href={data.url}>
        {data.title}
        <TagsUl>
          {data.tags?.map((tag) => (
            <Tag
              key={tag}
              Component="li"
              text={tag}
              onClick={(e) => {
                e.preventDefault();
                if (selectedTags.has(tag)) {
                  const newTags = new Set(selectedTags);
                  newTags.delete(tag);
                  void router.push({ query: { ...router.query, tags: [...Array.from(newTags)] } });
                } else {
                  void router.push({ query: { ...router.query, tags: [...Array.from(selectedTags), tag] } });
                }
              }}
              aria-checked={selectedTags.has(tag)}
            />
          ))}
        </TagsUl>
      </EntryAnchor>
    </EntryLi>
  );
}

const EntryLi = styled.li`
  list-style: none;
  padding: 0px;
`;

const EntryAnchor = styled.a`
  display: block;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 300ms;
  ${body1}
  color: rgba(0, 0, 0, 0.86);

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

function Tag({
  text,
  Component,
  onClick,
  ...props
}: {
  text: string;
  Component: keyof JSX.IntrinsicElements;
  onClick?: React.MouseEventHandler;
}) {
  return (
    <Component className={tagCss} {...props} onClick={onClick}>
      {text}
    </Component>
  );
}

const TagsUl = styled.ul`
  display: inline-flex;
  padding: 0;

  & > li {
    margin-left: 8px;
  }
`;

const tagCss = css`
  ${caption}
  flex: 0 0 auto;
  list-style: none;
  border-radius: 9999vh;
  padding: 2px 8px;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
  color: rgba(0, 0, 0, 0.86);
  transition: all 300ms;

  font-family: "Poppins", sans-serif;
  font-weight: 400;

  &:hover {
    background: linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)),
      linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
  }

  &[aria-checked="true"] {
    background: linear-gradient(rgb(248, 187, 208), rgb(248, 187, 208));
    &:hover {
      background: linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)),
        linear-gradient(rgb(248, 187, 208), rgb(248, 187, 208));
    }
  }
`;

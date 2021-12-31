import { styled } from "@linaria/react";
import graphql from "babel-plugin-relay/macro";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useFragment } from "react-relay";
import { body1, caption } from "../../lib/styles/typo";
import { Tag } from "../../lib/ui/Tag";
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
          publishedOn
          source {
            name
          }
        }
        ... on SlideEntry {
          title
          url
          tags
          publishedOn
          source {
            name
          }
        }
        ... on OSSEntry {
          title
          url
          tags
          publishedOn
          source {
            name
          }
        }
        ... on PodcastEntry {
          title
          url
          tags
          publishedOn
          source {
            name
          }
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

  const publishedOn = data.publishedOn as string;

  return (
    <EntryLi key={data.title}>
      <EntryAnchor href={data.url} rel="noopener noreferrer" target="_blank">
        <EntryPublishedOn dateTime={publishedOn}>{publishedOn}</EntryPublishedOn>
        <EntryTitle>
          {data.title}
          <EntryCite>{data.source?.name}</EntryCite>
        </EntryTitle>
        <TagsUl>
          {data.tags?.map((tag) => (
            <li key={tag}>
              <Tag
                as="button"
                text={`#${tag}`}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  if (selectedTags.has(tag)) {
                    const newTags = new Set(selectedTags);
                    newTags.delete(tag);
                    void router.push({ query: { ...router.query, tags: [...Array.from(newTags)] } });
                  } else {
                    void router.push({ query: { ...router.query, tags: [...Array.from(selectedTags), tag] } });
                  }
                }}
                role="button"
                aria-pressed={selectedTags.has(tag)}
              />
            </li>
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
  padding: 12px 16px;
  border-radius: 4px;
  transition: all 300ms;
  color: rgba(0, 0, 0, 0.86);
  outline: none;

  &:hover,
  &:focus-visible {
    background: rgba(0, 0, 0, 0.04);
  }
`;

const EntryTitle = styled.p`
  ${body1}
  padding: 0px;
  margin: 0px;
`;

const EntryCite = styled.cite`
  display: inline;
  ${caption}
  font-weight: 400;
  color: rgba(0, 0, 0, 0.56);

  &:before {
    content: "-";
    margin: 0 8px;
  }
`;

const EntryPublishedOn = styled.time`
  display: block;
  ${caption}
  font-weight: 400;
  color: rgba(0, 0, 0, 0.56);
`;

const TagsUl = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;

  & > li:not(:first-child) {
    margin-left: 8px;
  }
`;

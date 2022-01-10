import { styled } from "@linaria/react";
import graphql from "babel-plugin-relay/macro";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useFragment } from "react-relay";
import { backgroundColor, colors } from "../../lib/styles/colors";
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
          path
          tags
          publishedOn
          source {
            name
          }
        }
        ... on ExternalArticleEntry {
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
      <EntryAnchor href={data.url ?? data.path} rel="noopener noreferrer" target="_blank">
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
                text={tag}
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
  transition: background 300ms;
  color: ${colors.text};
  text-decoration: none;
  outline: none;

  &:hover {
    background: ${backgroundColor({ state: "hover" })};
  }
  &:focus {
    background: ${backgroundColor({ state: "focus" })};
  }
  &:active {
    background: ${backgroundColor({ state: "pressed" })};
  }
  &:focus-visible {
    outline: 2px solid ${colors.blue700};
  }
  &:focus:not(:focus-visible) {
    outline: 0;
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
  color: ${colors.textLowEmphasis};

  &:before {
    content: "-";
    margin: 0 8px;
  }
`;

const EntryPublishedOn = styled.time`
  display: block;
  ${caption}
  font-weight: 400;
  color: ${colors.textLowEmphasis};
`;

const TagsUl = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;

  & > li:not(:first-child) {
    margin-left: 8px;
  }

  & > li > button:before {
    content: "#";
  }
`;

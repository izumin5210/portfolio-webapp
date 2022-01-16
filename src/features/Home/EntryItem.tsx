import { styled } from "@linaria/react";
import graphql from "babel-plugin-relay/macro";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useFragment } from "react-relay";
import { getPath } from "../../lib/next-typed-routes";
import { backgroundColor, colors } from "../../lib/styles/colors";
import { body1, caption } from "../../lib/styles/typo";
import { Tag } from "../../lib/ui/Tag";
import { EntryItem$key } from "./__generated__/EntryItem.graphql";
import { EntryItemTag$key } from "./__generated__/EntryItemTag.graphql";

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
          tags {
            name
            ...EntryItemTag
          }
          publishedOn
          source {
            name
          }
        }
        ... on ExternalArticleEntry {
          title
          url
          tags {
            name
            ...EntryItemTag
          }
          publishedOn
          source {
            name
          }
        }
        ... on SlideEntry {
          title
          url
          tags {
            name
            ...EntryItemTag
          }
          publishedOn
          source {
            name
          }
        }
        ... on OSSEntry {
          title
          url
          tags {
            name
            ...EntryItemTag
          }
          publishedOn
          source {
            name
          }
        }
        ... on PodcastEntry {
          title
          url
          tags {
            name
            ...EntryItemTag
          }
          publishedOn
          source {
            name
          }
        }
      }
    `,
    props.entry
  );

  const publishedOn = data.publishedOn as string;

  return (
    <EntryLi key={data.title}>
      <Link href={data.url ?? data.path ?? ""} passHref>
        <EntryAnchor {...(data.url ? { rel: "noopener noreferrer", target: "_blank" } : {})}>
          <EntryPublishedOn dateTime={publishedOn}>{publishedOn}</EntryPublishedOn>
          <EntryTitle>
            {data.title}
            <EntryCite>{data.source?.name}</EntryCite>
          </EntryTitle>
          <TagsUl>
            {data.tags?.map((tag) => (
              <li key={tag.name}>
                <EntryTag tag={tag} />
              </li>
            ))}
          </TagsUl>
        </EntryAnchor>
      </Link>
    </EntryLi>
  );
}

function EntryTag(props: { tag: EntryItemTag$key }) {
  const router = useRouter();
  const tag = useFragment(
    graphql`
      fragment EntryItemTag on EntryTag {
        name
        displayName
      }
    `,
    props.tag
  );

  const { url, selected, onClick } = useMemo(() => {
    const q = router.query.tags ?? [];
    const selectedTags = new Set(Array.isArray(q) ? q : [q]);
    const selected = selectedTags.has(tag.name);
    if (selected) {
      selectedTags.delete(tag.name);
    } else {
      selectedTags.add(tag.name);
    }
    const url = getPath("/", { query: { tags: Array.from(selectedTags) } });
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      void router.push(url);
    };
    return { url, selected, onClick };
  }, [router, tag.name]);

  return (
    <Tag as="button" text={tag.displayName} onClick={onClick} role="link" selected={selected} {...{ href: url }} />
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
  &:active:not(:has(:active)) {
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

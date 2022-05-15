import { MicrophoneIcon, PencilIcon } from "@heroicons/react/solid";
import { styled } from "@linaria/react";
import graphql from "babel-plugin-relay/macro";
import Link from "next/link";
import React from "react";
import { useFragment } from "react-relay";
import GitHubIcon from "../../lib/icons/GitHubIcon";
import MediumIcon from "../../lib/icons/MediumIcon";
import QiitaIcon from "../../lib/icons/QiitaIcon";
import SpeakerDeckIcon from "../../lib/icons/SpeakerDeckIcon";
import WantedlyIcon from "../../lib/icons/WantedlyIcon";
import ZennIcon from "../../lib/icons/ZennIcon";
import { reactionCss } from "../../lib/styles/reactions";
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
          path
          # tags {
          #   name
          #   ...EntryItemTag
          # }
          publishedOn
          source {
            name
          }
        }
        ... on ExternalArticleEntry {
          title
          url
          # tags {
          #   name
          #   ...EntryItemTag
          # }
          publishedOn
          source {
            name
          }
        }
        ... on SlideEntry {
          title
          url
          # tags {
          #   name
          #   ...EntryItemTag
          # }
          publishedOn
          source {
            name
          }
        }
        ... on OSSEntry {
          title
          url
          # tags {
          #   name
          #   ...EntryItemTag
          # }
          publishedOn
          source {
            name
          }
        }
        ... on PodcastEntry {
          title
          url
          # tags {
          #   name
          #   ...EntryItemTag
          # }
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
          {data.source?.name === "SpeakerDeck" ? (
            <SpeakerDeckIcon />
          ) : data.source?.name === "GitHub" ? (
            <GitHubIcon />
          ) : data.source?.name === "Zenn" ? (
            <ZennIcon />
          ) : data.source?.name === "Qiita" ? (
            <QiitaIcon />
          ) : data.source?.name === "Medium" ? (
            <MediumIcon />
          ) : data.source?.name === "izum.in/blog" ? (
            <PencilIcon />
          ) : data.source?.name === "Wantedly Engineer Blog" ? (
            <WantedlyIcon />
          ) : data.source?.name === "Wantedly Engineering Podcast" ? (
            <MicrophoneIcon />
          ) : null}
          <EntryPublishedOn dateTime={publishedOn}>{publishedOn}</EntryPublishedOn>
          <EntryTitle>{data.title}</EntryTitle>
          {/*
          <TagsUl>
            {data.tags?.map((tag) => (
              <li key={tag.name}>
                <EntryTag tag={tag} />
              </li>
            ))}
          </TagsUl>
           */}
        </EntryAnchor>
      </Link>
    </EntryLi>
  );
}

// function EntryTag(props: { tag: EntryItemTag$key }) {
//   const router = useRouter();
//   const tag = useFragment(
//     graphql`
//       fragment EntryItemTag on EntryTag {
//         name
//         displayName
//       }
//     `,
//     props.tag
//   );
//
//   const { url, selected, onClick } = useMemo(() => {
//     const q = router.query.tags ?? [];
//     const selectedTags = new Set(Array.isArray(q) ? q : [q]);
//     const selected = selectedTags.has(tag.name);
//     if (selected) {
//       selectedTags.delete(tag.name);
//     } else {
//       selectedTags.add(tag.name);
//     }
//     const url = getPath("/", { query: { tags: Array.from(selectedTags) } });
//     const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//       e.preventDefault();
//       void router.push(url);
//     };
//     return { url, selected, onClick };
//   }, [router, tag.name]);
//
//   return (
//     <Tag as="button" text={tag.displayName} onClick={onClick} role="link" selected={selected} {...{ href: url }} />
//   );
// }

const EntryLi = styled.li`
  list-style: none;
  padding: 0px;
`;

const EntryAnchor = styled.a`
  padding: 12px 8px;
  border-radius: 4px;
  color: var(--text);
  text-decoration: none;
  outline: none;

  display: grid;
  grid-template-areas:
    "logo title"
    "space meta";
  // "space meta"
  // "logo title"
  // "logo tags";
  justify-content: left;
  column-gap: 8px;

  svg {
    grid-area: logo;
    width: 17px;
    height: 17px;
    margin-top: calc((1.5 * 17px - 17px) / 2);
  }

  ${reactionCss({ withOverlay: true })}
`;

const EntryTitle = styled.p`
  grid-area: title;
  ${body1}
  padding: 0px;
  margin: 0px;
`;

const EntryPublishedOn = styled.time`
  grid-area: meta;
  display: block;
  ${caption}
  font-weight: 400;
  color: var(--textLowEmphasis);
`;

// const TagsUl = styled.ul`
//   grid-area: tags;
//   display: flex;
//   flex-wrap: wrap;
//   list-style: none;
//   padding: 0;
//   gap: 4px 8px;
//
//   & > li > button:before {
//     content: "#";
//   }
// `;

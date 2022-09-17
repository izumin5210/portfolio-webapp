import { MicrophoneIcon, PencilIcon } from "@heroicons/react/20/solid";
import { styled } from "@linaria/react";
import Link from "next/link";
import GitHubIcon from "../../lib/icons/GitHubIcon";
import MediumIcon from "../../lib/icons/MediumIcon";
import QiitaIcon from "../../lib/icons/QiitaIcon";
import SpeakerDeckIcon from "../../lib/icons/SpeakerDeckIcon";
import WantedlyIcon from "../../lib/icons/WantedlyIcon";
import ZennIcon from "../../lib/icons/ZennIcon";
import { reactionCss } from "../../lib/styles/reactions";
import { body1, caption } from "../../lib/styles/typo";
import { FragmentType, gql, useFragment } from "../../__generated__/gql";

const Fragment = gql(/* GraphQL */ `
  fragment EntryItem on Entry {
    ... on ArticleEntry {
      id
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
      id
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
      id
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
      id
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
      id
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
`);

export function EntryItem(props: { data: FragmentType<typeof Fragment> }) {
  const fragment = useFragment(Fragment, props.data);

  const publishedOn = fragment.publishedOn as string;

  return (
    <EntryLi key={fragment.title}>
      <Link href={"url" in fragment ? fragment.url : fragment.path} passHref>
        <EntryAnchor {...("url" in fragment && { rel: "noopener noreferrer", target: "_blank" })}>
          {fragment.source?.name === "SpeakerDeck" ? (
            <SpeakerDeckIcon />
          ) : fragment.source?.name === "GitHub" ? (
            <GitHubIcon />
          ) : fragment.source?.name === "Zenn" ? (
            <ZennIcon />
          ) : fragment.source?.name === "Qiita" ? (
            <QiitaIcon />
          ) : fragment.source?.name === "Medium" ? (
            <MediumIcon />
          ) : fragment.source?.name === "izum.in/blog" ? (
            <PencilIcon />
          ) : fragment.source?.name === "Wantedly Engineer Blog" ? (
            <WantedlyIcon />
          ) : fragment.source?.name === "Wantedly Engineering Podcast" ? (
            <MicrophoneIcon />
          ) : null}
          <EntryPublishedOn dateTime={publishedOn}>{publishedOn}</EntryPublishedOn>
          <EntryTitle>{fragment.title}</EntryTitle>
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

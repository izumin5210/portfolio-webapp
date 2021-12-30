import { styled } from "@linaria/react";
import graphql from "babel-plugin-relay/macro";
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

  return (
    <EntryLi key={data.title}>
      <EntryAnchor href={data.url}>
        {data.title}
        <TagsUl>
          {data.tags?.map((tag) => (
            <TagLi key={tag}>
              <TagAnchor>{tag}</TagAnchor>
            </TagLi>
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
  transition: background 300ms;
  ${body1}
  color: rgba(0, 0, 0, 0.86);

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

const TagsUl = styled.ul`
  display: inline-flex;
  padding: 0;
`;

const TagLi = styled.li`
  ${caption}
  flex: 0 0 auto;
  list-style: none;

  margin-left: 8px;
`;

const TagAnchor = styled.a`
  display: block;
  border-radius: 9999vh;
  padding: 2px 8px;
  background: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.86);

  &:hover {
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
      linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04));
  }
`;

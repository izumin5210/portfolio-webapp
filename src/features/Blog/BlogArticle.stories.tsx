import { Meta, Story } from "@storybook/react";
import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { RelayMockProvider } from "../../__helpers__/RelayMockProvider";
import { BlogArticle } from "./BlogArticle";
import { BlogArticle$data } from "./__generated__/BlogArticle.graphql";
import { BlogArticleTestQuery } from "./__generated__/BlogArticleTestQuery.graphql";

type Props = { article: Omit<BlogArticle$data, " $fragmentType"> };

export default {
  title: "Blog/BlogArticle",
  component: BlogArticle,
} as Meta<Props>;

const Queryer = () => {
  const data = useLazyLoadQuery<BlogArticleTestQuery>(
    graphql`
      query BlogArticleTestQuery @relay_test_operation {
        articleEntryByPath(path: "test-path") {
          ...BlogArticle
        }
      }
    `,
    {}
  );
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return <BlogArticle article={data.articleEntryByPath!} />;
};

const Template: Story<Props> = (args) => {
  return (
    <RelayMockProvider
      mockResolvers={{
        ArticleEntry() {
          return args.article;
        },
      }}
    >
      <Queryer />
    </RelayMockProvider>
  );
};

export const Normal = Template.bind({});
Normal.args = {
  article: {
    title: "Example article",
    body: `## Heading level 2

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel diam sed orci scelerisque ornare. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porta est imperdiet sem mattis condimentum. Duis sodales enim id est mattis consequat. Nam congue velit tortor, nec hendrerit orci efficitur non. Morbi sit amet quam vehicula, eleifend lacus euismod, vestibulum ligula. Suspendisse congue urna in purus faucibus facilisis. Etiam aliquam pellentesque tortor mollis gravida.

### Heading level 3

Nam tempor blandit pharetra. Nulla tellus urna, auctor nec libero eget, egestas tristique orci. Aenean dictum purus ut massa rutrum egestas. Donec orci purus, placerat sit amet sagittis vel, fringilla quis urna. Proin et convallis odio. Maecenas vitae sapien nisl. Donec sit amet neque quis massa fringilla scelerisque. Suspendisse placerat viverra efficitur. Aliquam pretium purus vel ex egestas lacinia id sit amet diam. Cras maximus odio mauris, ac porttitor nunc finibus vitae. Nunc dictum facilisis dolor et sodales.

In hac habitasse platea dictumst. Suspendisse posuere, tortor quis condimentum laoreet, sapien libero condimentum leo, in molestie lorem quam non justo. Fusce consectetur metus vitae lorem mollis, ut pharetra metus iaculis. Aliquam eu euismod ligula. Suspendisse venenatis aliquet nisi, in sodales sapien. Suspendisse pulvinar elementum semper. Nullam iaculis sagittis lobortis. Nunc mattis, risus ullamcorper tristique pellentesque, urna arcu convallis urna, ut gravida nulla sem nec nibh. Donec pellentesque, diam ac tempor finibus, sapien ipsum ultrices felis, dignissim sagittis tellus nisl at sapien. Nullam a mattis tortor, vitae egestas quam. Sed ornare, tortor convallis sagittis pellentesque, lacus dui porta enim, scelerisque consequat nunc magna at neque.

#### Heading level 4

##### Heading level 5

###### Heading level 6

- list item 1
- list item 2
- list item 3

\`\`\`ts
const message: string = "this is a codeblock";
console.log(message);
\`\`\`

1. ordered list item 1
1. ordered list item 2
1. ordered list item 3

THis is a [link text](./).

This is a **strong text**.

This is a _emphasis text_.

This is a \`inline code block\`.

> This is a quoted paragrapph.

`,
  },
};

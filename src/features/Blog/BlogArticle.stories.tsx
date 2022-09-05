import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { documentData } from "../../lib/fragment-masking/documentData";
import { BlogArticle, Fragment } from "./BlogArticle";

export default {
  title: "Blog/BlogArticle",
  component: BlogArticle,
} as ComponentMeta<typeof BlogArticle>;

export const Normal: ComponentStoryObj<typeof BlogArticle> = {
  args: {
    data: documentData(Fragment, {
      id: "f5f6d6a7-af5a-4a16-9133-27a1981b6ea2",
      title: "Example article",
      publishedOn: "2021-01-04",
      updatedOn: "2021-01-11",
      tags: [
        { name: "react", displayName: "React" },
        { name: "graphql", displayName: "GraphQL" },
      ],
      body: `# Example article

## Heading level 2

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel diam sed orci scelerisque ornare. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porta est imperdiet sem mattis condimentum. Duis sodales enim id est mattis consequat. Nam congue velit tortor, nec hendrerit orci efficitur non. Morbi sit amet quam vehicula, eleifend lacus euismod, vestibulum ligula. Suspendisse congue urna in purus faucibus facilisis. Etiam aliquam pellentesque tortor mollis gravida.

### Heading level 3

Nam tempor blandit pharetra. Nulla tellus urna, auctor nec libero eget, egestas tristique orci. Aenean dictum purus ut massa rutrum egestas. Donec orci purus, placerat sit amet sagittis vel, fringilla quis urna. Proin et convallis odio. Maecenas vitae sapien nisl. Donec sit amet neque quis massa fringilla scelerisque. Suspendisse placerat viverra efficitur. Aliquam pretium purus vel ex egestas lacinia id sit amet diam. Cras maximus odio mauris, ac porttitor nunc finibus vitae. Nunc dictum facilisis dolor et sodales.

In hac habitasse platea dictumst. Suspendisse posuere, tortor quis condimentum laoreet, sapien libero condimentum leo, in molestie lorem quam non justo. Fusce consectetur metus vitae lorem mollis, ut pharetra metus iaculis. Aliquam eu euismod ligula. Suspendisse venenatis aliquet nisi, in sodales sapien. Suspendisse pulvinar elementum semper. Nullam iaculis sagittis lobortis. Nunc mattis, risus ullamcorper tristique pellentesque, urna arcu convallis urna, ut gravida nulla sem nec nibh. Donec pellentesque, diam ac tempor finibus, sapien ipsum ultrices felis, dignissim sagittis tellus nisl at sapien. Nullam a mattis tortor, vitae egestas quam. Sed ornare, tortor convallis sagittis pellentesque, lacus dui porta enim, scelerisque consequat nunc magna at neque.

#### Heading level 4

![image](https://dummyimage.com/600x400/bdbdbd/000000)

##### Heading level 5

###### Heading level 6

- list item 1
    - nested list item 2
- list item 2
    1. nested ordered list item
- list item 3

\`\`\`tsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </main>
  );
}
\`\`\`

1. ordered list item 1
    - nested list item 1
1. ordered list item 2
    1. nested ordered list item
1. ordered list item 3

THis is a [link text](./).

This is a **strong text**.

This is a _emphasis text_.

This is a \`inline code block\`.

> This is a quoted paragrapph.

![large image](https://dummyimage.com/1600x1200/bdbdbd/000000)
![long image](https://dummyimage.com/600x2400/bdbdbd/000000)
`,
    }),
  },
};

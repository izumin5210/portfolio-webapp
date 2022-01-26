import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { remarkMetaDescription } from "./plugin.js";

const processor = unified().use(remarkParse).use(remarkFrontmatter).use(remarkMetaDescription).use(remarkStringify);

it("extracts lead contents", () => {
  const file = processor.processSync(`
foobarbaz

- item 1
- [item 2](./item2)
- [item 3](./item3)

# heading 2
foobabaz
`);
  expect(file.data.metaDescription as string).toMatchSnapshot();
});

it("returns all contents when there are no headings", () => {
  const file = processor.processSync(`
foobarbaz

- item 1
- [item 2](./item2)
- [item 3](./item3)
`);
  expect(file.data.metaDescription as string).toMatchSnapshot();
});

it("ignores leading h1", () => {
  const file = processor.processSync(`
# heading 1
foobarbaz

# heading 2
quxquux
`);
  expect(file.data.metaDescription as string).toMatchSnapshot();
});

it("ignores yaml frontmatter", () => {
  const file = processor.processSync(`---
foo: bar
---

# heading 1
foobarbaz

# heading 2
quxquux
`);
  expect(file.data.metaDescription as string).toMatchSnapshot();
});

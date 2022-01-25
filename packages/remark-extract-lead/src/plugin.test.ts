import type { Root } from "mdast";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { remarkExtractLead } from "./plugin.js";

const processor = unified().use(remarkParse).use(remarkFrontmatter).use(remarkExtractLead).use(remarkStringify);

const mdAstToHtmlString = (root: Root) => {
  const rehypeTree = unified()
    .use(remarkRehype)
    .runSync(root as any);
  return unified()
    .use(rehypeStringify)
    .stringify(rehypeTree as any);
};

it("extracts lead contents", () => {
  const file = processor.processSync(`
foobarbaz

- item 1
- [item 2](./item2)
- [item 3](./item3)

# heading 2
foobabaz
`);
  expect(mdAstToHtmlString(file.data.lead as any)).toMatchSnapshot();
});

it("returns all contents when there are no headings", () => {
  const file = processor.processSync(`
foobarbaz

- item 1
- [item 2](./item2)
- [item 3](./item3)
`);
  expect(mdAstToHtmlString(file.data.lead as any)).toMatchSnapshot();
});

it("ignores leading h1", () => {
  const file = processor.processSync(`
# heading 1
foobarbaz

# heading 2
quxquux
`);
  expect(mdAstToHtmlString(file.data.lead as any)).toMatchSnapshot();
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
  expect(mdAstToHtmlString(file.data.lead as any)).toMatchSnapshot();
});

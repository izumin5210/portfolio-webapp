import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { remarkH1AsTitle } from "./plugin.js";

const processor = unified().use(remarkParse).use(remarkFrontmatter).use(remarkH1AsTitle).use(remarkStringify);

it("extracts title from first h1 text", () => {
  const file = processor.processSync(`
# document title
foobarbaz
`);
  expect(file.data.title).toBe("document title");
  expect(file.value).toMatchSnapshot();
});

it("fails if h1 contains something other than plain text", () => {
  expect(() => {
    processor.processSync(`
# [document title](./document)
`);
  }).toThrowError();
});

it("fails if the document stats with something other than h1", async () => {
  expect(() => {
    processor.processSync(`
## foobar
`);
  }).toThrowError();
});

it("ignores yaml frontmatter", async () => {
  const file = processor.processSync(`---
foo: bar
---
# document title
foobarbaz
`);
  expect(file.data.title).toEqual("document title");
  expect(file.value).toMatchSnapshot();
});

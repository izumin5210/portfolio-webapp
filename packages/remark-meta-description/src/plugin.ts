import type { BlockContent, Code, Content, Heading, List, Paragraph, Root, YAML } from "mdast";
import { toString } from "mdast-util-to-string";
import type { Plugin } from "unified";
import { is } from "unist-util-is";
import { visit } from "unist-util-visit";

export const remarkMetaDescription: Plugin<[], Root> = () => {
  return function transformer(tree, file) {
    const leadContent: Content[] = [];
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (is<YAML>(node, "yaml") && leadContent.length === 0) continue;
      if (is<Heading>(node, "heading")) {
        if (node.depth === 1 && leadContent.length === 0) continue;
        break;
      }
      if (is<Code>(node, "code")) continue;
      if (isBlockContent(node) && !is<List>(node, "list") && !is<Paragraph>(node, "paragraph")) {
        file.fail(new Error(`meta description cannot has ${node.type} content`), node.position);
      }
      for (const bc of findBlockContents(node, { except: ["paragraph"] })) {
        file.fail(new Error(`meta description cannot has ${bc.type} content in ${node.type}`), bc.position);
      }

      leadContent.push(node);
    }

    for (let i = 0; i < leadContent.length; i++) {
      const node = leadContent[i];
      if (is<List>(node, "list")) {
        leadContent[i] = {
          type: "paragraph",
          children: node.children.map((li) => ({ type: "text", value: `· ${toString(li)}; ` })),
        };
      }
    }

    file.data.metaDescription = toString({ type: "root", children: leadContent }).replace(/\n/g, " ");
  };
};

function findBlockContents(content: Content, opts: { except: BlockContent["type"][] }): BlockContent[] {
  const blockContents: BlockContent[] = [];
  visit(content, (child) => {
    if (content === child) return;
    if (isBlockContent(child) && !opts.except.includes(child.type)) blockContents.push(child);
  });
  return blockContents;
}

function isBlockContent(content: Content): content is BlockContent {
  switch (content.type) {
    case "paragraph":
    case "heading":
    case "blockquote":
    case "thematicBreak":
    case "list":
    case "table":
    case "html":
    case "code": {
      const _blockContentCheck: BlockContent = content;
      return true;
    }
    default: {
      const _nonBlockContentCheck: Exclude<Content, BlockContent> = content;
      return false;
    }
  }
}

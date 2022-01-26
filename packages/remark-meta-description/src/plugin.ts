import type { BlockContent, Content, Heading, List, Paragraph, Root, YAML } from "mdast";
import { toString } from "mdast-util-to-string";
import type { Plugin } from "unified";
import { is } from "unist-util-is";
import { visit } from "unist-util-visit";

export const remarkMetaDescription: Plugin<[], Root> = () => {
  return function transformer(tree, file) {
    let [startIdx, endIdx] = [-1, -1];
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (is<YAML>(node, "yaml") && startIdx === -1) continue;
      if (is<Heading>(node, "heading")) {
        if (node.depth === 1 && startIdx === -1) continue;
        break;
      }
      if (isBlockContent(node) && !is<List>(node, "list") && !is<Paragraph>(node, "paragraph")) {
        file.fail(new Error(`meta description cannot has ${node.type} content`), node.position);
      }
      for (const bc of findBlockContents(node, { except: ["paragraph"] })) {
        file.fail(new Error(`meta description cannot has ${bc.type} content in ${node.type}`), bc.position);
      }

      if (startIdx === -1) startIdx = i;
      endIdx = i;
    }

    const descMdNodes = tree.children.slice(startIdx, endIdx + 1);
    for (let i = 0; i < descMdNodes.length; i++) {
      const node = descMdNodes[i];
      if (is<List>(node, "list")) {
        descMdNodes[i] = {
          type: "paragraph",
          children: node.children.map((li) => ({ type: "text", value: ` · ${toString(li)}; ` })),
        };
      }
    }

    file.data.metaDescription = toString({ type: "root", children: descMdNodes });
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

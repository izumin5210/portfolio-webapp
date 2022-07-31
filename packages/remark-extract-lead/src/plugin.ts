import type { Content, Heading, Root, YAML } from "mdast";
import type { Plugin } from "unified";
import { is } from "unist-util-is";

export const remarkExtractLead: Plugin<[], Root> = () => {
  return function transformer(tree, file) {
    const leadContents: Content[] = [];
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (is<YAML>(node, "yaml") && leadContents.length === 0) continue;
      if (is<Heading>(node, "heading")) {
        if (node.depth === 1 && leadContents.length === 0) continue;
        break;
      }
      leadContents.push(node);
    }

    file.data.lead = {
      type: "root",
      children: leadContents,
    };
  };
};

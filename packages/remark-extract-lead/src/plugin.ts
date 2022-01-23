import type { Plugin } from "unified";
import type { Node, Parent } from "unist";
import { is } from "unist-util-is";

export const remarkExtractLead: Plugin<[], Parent> = () => {
  return function transformer(tree, file) {
    let [startIdx, endIdx] = [-1, -1];
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (is<YamlNode>(node, "yaml") && startIdx === -1) continue;
      if (is<HeadingNode>(node, "heading")) {
        if (node.depth === 1 && startIdx === -1) continue;
        break;
      }
      if (startIdx === -1) startIdx = i;
      endIdx = i;
    }
    file.data.lead = {
      type: "root",
      children: tree.children.slice(startIdx, endIdx + 1),
    };
  };
};

interface HeadingNode extends Parent {
  depth: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface YamlNode extends Node {
  type: "yaml";
}

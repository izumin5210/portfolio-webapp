import type { Heading, Root, Text, YAML } from "mdast";
import type { Plugin } from "unified";
import { is } from "unist-util-is";

export const remarkH1AsTitle: Plugin<[], Root> = () => {
  return function transformer(tree, file) {
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (is<YAML>(node, "yaml")) continue;
      if (is<Heading>(node, "heading") && node.depth === 1) {
        if (node.children.length === 1 && is<Text>(node.children[0], "text")) {
          file.data.title = node.children[0].value;
          tree.children = [...tree.children.slice(0, i), ...tree.children.slice(i + 1)];
        } else {
          file.fail(new Error(" h1 at the beginning of the document must be text only"), node.position);
        }
        break;
      }
      file.fail(new Error("the document must start with h1"), node.position);
      break;
    }
  };
};

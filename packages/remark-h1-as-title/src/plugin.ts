import type { Plugin } from "unified";
import type { Node, Parent } from "unist";
import { is } from "unist-util-is";

export const remarkH1AsTitle: Plugin<[], Parent> = () => {
  return function transformer(tree, file) {
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (is<YamlNode>(node, "yaml")) continue;
      if (is<HeadingNode>(node, "heading") && node.depth === 1) {
        if (node.children.length === 1 && is<TextNode>(node.children[0], "text")) {
          file.data.title = node.children[0].value;
          tree.children = [...tree.children.slice(0, i), ...tree.children.slice(i + 1)];
        } else {
          file.fail(new Error(" h1 at the beginning of the document must be text only"), (node as Node).position);
        }
        break;
      }
      file.fail(new Error("the document must start with h1"), (node as Node).position);
      break;
    }
  };
};

interface HeadingNode extends Parent {
  type: "heading";
  depth: number;
}

interface TextNode extends Node {
  type: "text";
  value: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface YamlNode extends Node {
  type: "yaml";
}

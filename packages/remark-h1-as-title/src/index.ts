import { is } from "unist-util-is";
import type { Plugin } from "unified";
import type { Node, Parent } from "unist";

export const remarkH1AsTitlePlugin: Plugin<[], Parent> = () => {
  return function transformer(tree, file) {
    for (const node of tree.children) {
      if (node.type === "yaml") continue;
      if (is(node, "heading") && (node as { depth?: number }).depth === 1) {
        const h1 = node as Parent;
        if (h1.children.length === 1 && h1.children[0].type === "text") {
          file.data.title = (h1.children[0] as Node & { value: string }).value;
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

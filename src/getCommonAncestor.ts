import { INode } from "./INode.ts";
import { getAncestors } from "./getAncestors.ts";

export function getCommonAncestor(inodes: INode[]) {
  const ancestorsList = inodes.map((inode) => getAncestors(inode).reverse());

  let commonAncestor: INode | null = null;

  for (let i = 0; i < ancestorsList[0].length; i++) {
    const ancestor = ancestorsList[0][i];
    if (ancestorsList.every((ancestors) => ancestors[i] === ancestor)) {
      commonAncestor = ancestor;
    } else {
      break;
    }
  }

  return commonAncestor;
}

import { getAncestors } from "./getAncestors";
import { INode } from "./iNode";

export function getClosestCommonAncestor(iNodes: INode[]) {
  const iNodeAncestors = iNodes.map((iNode) => getAncestors(iNode));
  const shortestAncestorLength = Math.min(
    ...iNodeAncestors.map((ancestors) => ancestors.length)
  );
  let closestCommonAncestor: INode | undefined;
  for (let i = 0; i < shortestAncestorLength; i++) {
    if (
      iNodeAncestors.every((ancestors) => ancestors[i] === iNodeAncestors[0][i])
    ) {
      closestCommonAncestor = iNodeAncestors[0][i];
    } else {
      break;
    }
  }
  return closestCommonAncestor;
}

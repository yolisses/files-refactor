import { INode } from "./iNode";

export function getAncestors(iNode: INode) {
  const ancestors: INode[] = [iNode];
  let parent = iNode.getParent();
  while (parent) {
    ancestors.push(parent);
    parent = parent.getParent();
  }
  return ancestors.reverse();
}

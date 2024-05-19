import { INode } from "./INode.ts";

export function getAncestors(inode: INode) {
  const ancestors: INode[] = [];
  let current: INode | null = inode;
  while (current) {
    ancestors.push(current);
    current = current.parent;
  }
  return ancestors;
}

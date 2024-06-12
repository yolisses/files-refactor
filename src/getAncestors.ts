import { Folder } from "./folder";

export function getAncestors(folder: Folder) {
  const ancestors: Folder[] = [folder];
  let parent = folder.getParent();
  while (parent) {
    ancestors.push(parent);
    parent = parent.getParent();
  }
  return ancestors.reverse();
}

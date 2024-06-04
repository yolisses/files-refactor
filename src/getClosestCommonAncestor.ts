import { Folder } from "./folder";
import { getAncestors } from "./getAncestors";

export function getClosestCommonAncestor(folder: Folder[]) {
  const ancestors = folder.map((f) => getAncestors(f));

  let commonAncestor: Folder | undefined;
  for (let i = 0; i < ancestors[0].length; i++) {
    const ancestor = ancestors[0][i];
    if (ancestors.every((a) => a[i] === ancestor)) {
      commonAncestor = ancestor;
    } else {
      break;
    }
  }

  return commonAncestor;
}

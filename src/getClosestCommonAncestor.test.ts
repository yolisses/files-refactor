import { Folder } from "./folder";
import { getClosestCommonAncestor } from "./getClosestCommonAncestor";

test("getClosestCommonAncestor", () => {
  const folder1 = new Folder("folder1");

  const folder2 = new Folder("folder2");
  folder2.bareSetParent(folder1);

  const folder3 = new Folder("folder3");
  folder3.bareSetParent(folder2);

  const folder4 = new Folder("folder4");
  folder4.bareSetParent(folder3);

  expect(getClosestCommonAncestor([folder1, folder2])).toEqual(folder1);
  expect(getClosestCommonAncestor([folder1, folder4])).toEqual(folder1);
  expect(getClosestCommonAncestor([folder2, folder3])).toEqual(folder2);
  expect(getClosestCommonAncestor([folder2, folder4])).toEqual(folder2);
  expect(getClosestCommonAncestor([folder3, folder4])).toEqual(folder3);
  expect(getClosestCommonAncestor([folder4, folder2, folder3])).toEqual(
    folder2
  );
});

import { Folder } from "./folder";
import { getAncestors } from "./getAncestors";

test("getAncestors", () => {
  const folder1 = new Folder("folder1");

  const folder2 = new Folder("folder2");
  folder2.bareSetParent(folder1);

  const folder3 = new Folder("folder3");
  folder3.bareSetParent(folder2);

  const folder4 = new Folder("folder4");
  folder4.bareSetParent(folder3);

  expect(getAncestors(folder1)).toEqual([folder1]);
  expect(getAncestors(folder2)).toEqual([folder1, folder2]);
  expect(getAncestors(folder3)).toEqual([folder1, folder2, folder3]);
  expect(getAncestors(folder4)).toEqual([folder1, folder2, folder3, folder4]);
});

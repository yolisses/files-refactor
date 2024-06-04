import { FileNode } from "./fileNode";
import { Folder } from "./folder";
import { getAllFiles } from "./getAllFiles";

test("getAllFiles", () => {
  const a = new FileNode("a");
  const b = new FileNode("b");
  const c = new FileNode("c");

  const d = new Folder("d");
  d.files = [c];

  const e = new Folder("e");
  e.files = [b, a];
  e.folders = [d];

  const files = getAllFiles(e);

  expect(files).toEqual([b, a, c]);
});

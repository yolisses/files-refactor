import { FileNode } from "./file";
import { Folder } from "./folder";
import { getAllFiles } from "./getAllFiles";

test("getAllFiles", () => {
  const a = new FileNode();
  a.name = "a";

  const b = new FileNode();
  b.name = "b";

  const c = new FileNode();
  c.name = "c";

  const d = new Folder();
  d.name = "d";
  d.files = [c];

  const e = new Folder();
  e.name = "e";
  e.files = [b, a];
  e.folders = [d];

  const files = getAllFiles(e);

  expect(files).toEqual([b, a, c]);
});

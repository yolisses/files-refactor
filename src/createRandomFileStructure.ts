import { FileNode } from "./fileNode";
import { Folder } from "./folder";
import { getRandomElement } from "./getRandomElement";
import { times } from "./times";

export function createRandomFileStructure() {
  const root = new Folder("root");

  const folders = [root];
  const files: FileNode[] = [];

  times(20).forEach((i) => {
    const folder = new Folder(i.toString());
    const parent = getRandomElement(folders);
    parent.addFolder(folder);
    folders.push(folder);
  });

  times(10).forEach((i) => {
    const folder = getRandomElement(folders);
    const file = new FileNode(i.toString());
    folder.addFile(file);
    files.push(file);
  });

  times(10).forEach((i) => {
    const file = getRandomElement(files);
    const importFile = getRandomElement(files);
    file.addImport(importFile);
  });

  return root;
}

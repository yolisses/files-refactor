import { FileNode } from "./fileNode";
import { Folder } from "./folder";
import { getRandomElement } from "./getRandomElement";

export function createRandomFileStructure() {
  const root = new Folder("root");

  const folders = [root];
  const files: FileNode[] = [];

  for (let i = 0; i < 10; i++) {
    const folder = new Folder(i.toString());
    const parent = getRandomElement(folders);
    parent.addFolder(folder);
    folders.push(folder);
  }

  for (let i = 0; i < 10; i++) {
    const folder = getRandomElement(folders);
    const file = new FileNode(i.toString());
    folder.addFile(file);
    files.push(file);
  }

  for (let i = 0; i < 10; i++) {
    const file = getRandomElement(files);
    const importFile = getRandomElement(files);
    file.addImport(importFile);
  }

  return root;
}

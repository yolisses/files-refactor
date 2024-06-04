import { FileNode } from "./file";
import { Folder } from "./folder";
import { getRandomElement } from "./getRandomElement";

export function createRandomFileStructure() {
  const root = new Folder("root");

  const folders = [root];
  const files: FileNode[] = [];
  let id = 0;

  for (let i = 0; i < 10; i++) {
    const folder = new Folder(id.toString());
    const parent = getRandomElement(folders);
    parent.addFolder(folder);
    folders.push(folder);
    id++;
  }

  for (let i = 0; i < 10; i++) {
    const folder = getRandomElement(folders);
    const file = new FileNode(id.toString());
    folder.addFile(file);
    files.push(file);
    id++;
  }

  for (let i = 0; i < 10; i++) {
    const file = getRandomElement(files);
    const importFile = getRandomElement(files);
    file.addImport(importFile);
  }

  return root;
}

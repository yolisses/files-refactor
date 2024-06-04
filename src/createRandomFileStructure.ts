import { FileNode } from "./file";
import { Folder } from "./folder";
import { getRandomElement } from "./getRandomElement";

export function createRandomFileStructure() {
  const root = new Folder("root");

  const folders = [root];

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
  }

  return root;
}

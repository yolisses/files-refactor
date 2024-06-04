import { FileNode } from "./fileNode";
import { Folder } from "./folder";

export function lintFileStructure(files: FileNode[]) {
  // TODO stop creating a new root folder
  const root = new Folder("root");

  files.forEach((file) => {
    root.addFile(file);
  });

  return root;
}

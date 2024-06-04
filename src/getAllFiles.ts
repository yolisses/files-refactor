import { FileNode } from "./file";
import { Folder } from "./folder";

export function getAllFiles(folder: Folder) {
  let files: FileNode[] = [];

  files.push(...folder.files);

  folder.folders.forEach((folder) => {
    files.push(...getAllFiles(folder));
  });

  return files;
}

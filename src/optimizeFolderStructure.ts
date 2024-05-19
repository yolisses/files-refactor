import { FileNode } from "./FileNode.ts";

export function optimizeFolderStructure(files: FileNode[] = []) {
  files.forEach((file) => {
    file.imports.forEach((importedFile) => {
      importedFile.parent.move(file.parent!);
    });
  });
}

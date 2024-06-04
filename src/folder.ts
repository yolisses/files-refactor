import { FileNode } from "./fileNode";

export class Folder {
  files: FileNode[] = [];
  folders: Folder[] = [];

  constructor(public name: string) {}

  addFile(file: FileNode) {
    this.files.push(file);
    file.parent = this;
  }

  addFolder(folder: Folder) {
    this.folders.push(folder);
  }
}

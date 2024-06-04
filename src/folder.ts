import { FileNode } from "./fileNode";
import { INode } from "./iNode";

export class Folder extends INode {
  files: FileNode[] = [];
  folders: Folder[] = [];

  addFile(file: FileNode) {
    this.files.push(file);
    file.bareSetParent(this);
  }

  addFolder(folder: Folder) {
    this.folders.push(folder);
    folder.bareSetParent(this);
  }
}

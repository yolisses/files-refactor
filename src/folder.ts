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

  removeFile(file: FileNode) {
    this.files = this.files.filter((f) => f !== file);
    file.bareSetParent(null);
  }

  removeFolder(folder: Folder) {
    this.folders = this.folders.filter((f) => f !== folder);
    folder.bareSetParent(null);
  }

  removeINode(iNode: INode) {
    if (iNode instanceof FileNode) {
      this.removeFile(iNode);
    } else if (iNode instanceof Folder) {
      this.removeFolder(iNode);
    }
  }

  addINode(iNode: INode) {
    if (iNode instanceof FileNode) {
      this.addFile(iNode);
    } else if (iNode instanceof Folder) {
      this.addFolder(iNode);
    }
  }
}

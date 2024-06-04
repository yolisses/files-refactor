import { FileNode } from "./file";
import { INode } from "./inode";

export class Folder implements INode {
  name: string;
  files: FileNode[] = [];
  folders: Folder[] = [];

  get children(): INode[] {
    return [...this.files, ...this.folders];
  }
}

import { FileNode } from "./file";
import { INode } from "./inode";

export class Folder implements INode {
  files: FileNode[] = [];
  folders: Folder[] = [];

  constructor(public name: string) {}

  get children(): INode[] {
    return [...this.files, ...this.folders];
  }
}

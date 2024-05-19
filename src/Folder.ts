import { FileNode } from "./FileNode.ts";
import { INode } from "./INode.ts";

export class Folder extends INode {
  depth = 0;
  children: INode[] = [];

  updateDepth() {
    this.depth = this.parent ? this.parent.depth + 1 : 0;
    this.subfolders.forEach((subfolder) => subfolder.updateDepth());
  }

  addChild(inode: INode) {
    this.children.push(inode);
    inode.parent = this;
    this.updateDepth();
  }

  removeFile(inode: INode) {
    const index = this.children.indexOf(inode);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  get files() {
    return this.children.filter(
      (child) => child instanceof FileNode
    ) as FileNode[];
  }

  get subfolders() {
    return this.children.filter((child) => child instanceof Folder) as Folder[];
  }
}

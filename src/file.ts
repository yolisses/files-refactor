import { INode } from "./inode";

export class FileNode implements INode {
  imports: FileNode[] = [];

  constructor(public name: string) {}

  addImport(file: FileNode) {
    this.imports.push(file);
  }
}

import { Folder } from "./folder";

export class FileNode {
  imports: FileNode[] = [];
  parent: Folder | null = null;

  constructor(public name: string) {}

  addImport(file: FileNode) {
    this.imports.push(file);
  }
}

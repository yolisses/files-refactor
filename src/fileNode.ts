import { INode } from "./iNode";

export class FileNode extends INode {
  private imports: FileNode[] = [];

  addImport(file: FileNode) {
    this.imports.push(file);
  }

  getImports() {
    return this.imports;
  }
}

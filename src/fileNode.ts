import { INode } from "./iNode";

export class FileNode extends INode {
  private imports: FileNode[] = [];
  private importedBy: FileNode[] = [];

  addImport(file: FileNode) {
    this.imports.push(file);
    file.importedBy.push(this);
  }

  getImports() {
    return [...this.imports];
  }

  getImportedBy() {
    return [...this.importedBy];
  }
}

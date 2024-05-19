import { Folder } from "./Folder.ts";
import { INode } from "./INode.ts";

// TODO find a better name

export class FileNode extends INode {
  imports: FileNode[] = [];
  importedBy: FileNode[] = [];

  constructor(name: string) {
    super(name);
    const particularFolder = new Folder("folder_" + name);
    this.move(particularFolder);
  }

  addImport(file: FileNode) {
    this.imports.push(file);
    file.importedBy.push(this);
  }

  resume() {
    return {
      name: this.name,
      parent: this.parent?.name,
      imports: this.imports.map((file) => file.name),
      importedBy: this.importedBy.map((file) => file.name),
    };
  }
}

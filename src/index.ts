import { Graph, digraph } from "graphviz";

class INode {
  parent: Folder;
  constructor(public name: string) {}

  move(newParent: Folder) {
    console.log(`Moving ${this.name} to ${newParent.name}`);
    this.parent.removeFile(this);
    newParent.addChild(this);
    this.parent = newParent;
  }
}

class Folder extends INode {
  children: INode[] = [];

  addChild(inode: INode) {
    this.children.push(inode);
    inode.parent = this;
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

// TODO find a better name
class FileNode extends INode {
  imports: FileNode[] = [];
  importedBy: FileNode[] = [];

  addImport(file: FileNode) {
    this.imports.push(file);
    file.importedBy.push(this);
  }

  resume() {
    return {
      name: this.name,
      parent: this.parent.name,
      imports: this.imports.map((file) => file.name),
      importedBy: this.importedBy.map((file) => file.name),
    };
  }
}

const root = new Folder("root");
const folder1 = new Folder("folder1");
const folder2 = new Folder("folder2");

root.addChild(folder1);
root.addChild(folder2);

const file1 = new FileNode("1");
const file2 = new FileNode("2");
const file3 = new FileNode("3");
const file4 = new FileNode("4");
const files = [file1, file2, file3, file4];

file1.addImport(file2);
file1.addImport(file3);
file2.addImport(file3);
file2.addImport(file4);

folder1.addChild(file1);
folder2.addChild(file2);
root.addChild(file3);
root.addChild(file4);

function optimizeFolderStructure() {
  files.forEach((file) => {
    if (file.imports.length === 0 && file.importedBy.length === 1) {
      const importer = file.importedBy[0];
      file.move(importer.parent);
    }
  });
}

console.log(file4.resume());
optimizeFolderStructure();
console.log(file4.resume());

function plotFolders(g: Graph, folder: Folder) {
  const cluster = g.addCluster("cluster_" + folder.name);
  cluster.set("label", folder.name);
  folder.files.forEach((file) => {
    cluster.addNode(file.name);
  });
  folder.subfolders.forEach((subfolder) => {
    plotFolders(cluster, subfolder);
  });
}

function createGraphVisualization() {
  const g = digraph("G");
  g.set("rankdir", "RL");

  plotFolders(g, root);
  files.forEach((file) => {
    file.imports.forEach((importedFile) => {
      g.addEdge(file.name, importedFile.name);
    });
  });

  return g;
}

const graphVisualization = createGraphVisualization();
graphVisualization.output("svg", "output.svg");

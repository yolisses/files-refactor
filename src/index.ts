import { Graph, digraph } from "graphviz";

class INode {
  parent: Folder | null = null;
  constructor(public name: string) {}

  move(newParent: Folder) {
    if (this.parent) {
      this.parent.removeFile(this);
    }
    newParent.addChild(this);
  }
}

class Folder extends INode {
  children: INode[] = [];

  addChild(inode: INode) {
    this.children.push(inode);
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

  addImport(file: FileNode) {
    this.imports.push(file);
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
const files = [file1, file2, file3];

file1.addImport(file2);
file1.addImport(file3);
file2.addImport(file3);

folder1.addChild(file1);
folder2.addChild(file2);
root.addChild(file3);

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

import { Graph, digraph } from "graphviz";

class INode {
  parent: Folder;
  constructor(public name: string) {}

  move(newParent: Folder) {
    console.log(`Moving ${this.name} to ${newParent.name}`);
    if (this.parent) {
      this.parent.removeFile(this);
    }
    newParent.addChild(this);
    this.parent = newParent;
  }
}

class Folder extends INode {
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

// TODO find a better name
class FileNode extends INode {
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

const root = new Folder("root");

const file1 = new FileNode("1");
const file2 = new FileNode("2");
const file3 = new FileNode("3");
const file4 = new FileNode("4");
const file5 = new FileNode("5");
const file6 = new FileNode("6");
const file7 = new FileNode("7");
const file8 = new FileNode("8");
const file9 = new FileNode("9");
const file10 = new FileNode("10");
const file11 = new FileNode("11");
const file12 = new FileNode("12");
const files = [
  file1,
  file2,
  file7,
  file8,
  file9,
  file10,
  file11,
  file12,
  file3,
  file4,
  file5,
  file6,
];

file1.addImport(file2);
file1.addImport(file3);
file2.addImport(file3);
file2.addImport(file4);
file2.addImport(file5);
file5.addImport(file6);
file6.addImport(file7);
file8.addImport(file9);
file8.addImport(file10);
file8.addImport(file11);
file8.addImport(file12);
file3.addImport(file8);

function optimizeFolderStructure() {
  files.forEach((file) => {
    file.imports.forEach((importedFile) => {
      importedFile.parent.move(file.parent!);
    });
  });
}

console.log(file4.resume());
optimizeFolderStructure();
console.log(file4.resume());

function plotFolder(
  g: Graph,
  folder: Folder,
  alreadyPlotted: Set<Folder> = new Set()
) {
  const cluster = g.addCluster("cluster_" + folder.name);
  cluster.set("label", folder.name);

  folder.files.forEach((file) => {
    const node = cluster.addNode(file.name);
    node.set("shape", "box");
    node.set("label", file.name);
  });
  folder.subfolders.forEach((subfolder) => {
    if (alreadyPlotted.has(subfolder)) {
      return;
    }
    plotFolder(cluster, subfolder, alreadyPlotted);
  });
}

function createGraphVisualization() {
  const g = digraph("G");
  g.set("rankdir", "RL");
  g.setNodeAttribut("shape", "box");
  g.set("splines", "false");

  const alreadyPlotted = new Set<Folder>();
  files.forEach((file) => {
    plotFolder(g, file.parent, alreadyPlotted);
  });

  files.forEach((file) => {
    file.imports.forEach((importedFile) => {
      g.addEdge(file.name, importedFile.name);
    });
  });

  return g;
}

const graphVisualization = createGraphVisualization();
graphVisualization.output("svg", "output.svg");

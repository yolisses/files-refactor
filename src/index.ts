import { Graph, digraph } from "graphviz";

class Folder {
  files: FileNode[] = [];
  subfolders: Folder[] = [];
  parent: Folder | null = null;
  constructor(public name: string) {}

  addFile(file: FileNode) {
    this.files.push(file);
  }

  addFolder(folder: Folder) {
    folder.parent = this;
    this.subfolders.push(folder);
  }
}

// TODO find a better name
class FileNode {
  constructor(public name: string, public imports: FileNode[]) {}
}

const root = new Folder("root");
const folder1 = new Folder("folder1");
const folder2 = new Folder("folder2");

root.addFolder(folder1);
root.addFolder(folder2);

const file1 = new FileNode("1", []);
const file2 = new FileNode("2", [file1]);
const file3 = new FileNode("3", [file1, file2]);
const files = [file1, file2, file3];

folder1.addFile(file1);
folder2.addFile(file2);
root.addFile(file3);

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
  g.set("rankdir", "LR");

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

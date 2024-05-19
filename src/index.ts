import { digraph } from "graphviz";

class Folder {
  files: FileNode[] = [];
  constructor(public name: string) {}

  addFile(file: FileNode) {
    this.files.push(file);
  }
}

// TODO find a better name
class FileNode {
  constructor(public name: string, public imports: FileNode[]) {}
}

const root = new Folder("root");
const folders = [root];

const file1 = new FileNode("1", []);
const file2 = new FileNode("2", [file1]);
const file3 = new FileNode("3", [file1, file2]);
const files = [file1, file2, file3];

root.addFile(file1);
root.addFile(file2);
root.addFile(file3);

function createGraphVisualization() {
  const g = digraph("G");

  folders.forEach((folder) => {
    const cluster = g.addCluster("cluster_" + folder.name);
    cluster.set("label", folder.name);
    folder.files.forEach((file) => {
      cluster.addNode(file.name);
    });
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

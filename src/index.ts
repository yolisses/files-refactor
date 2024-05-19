import { digraph } from "graphviz";

// TODO find a better name
class FileNode {
  constructor(public name: string, public imports: FileNode[]) {}
}

const file1 = new FileNode("file1", []);
const file2 = new FileNode("file2", [file1]);
const file3 = new FileNode("file3", [file1, file2]);

const files = [file1, file2, file3];

function createGraphVisualization(files: FileNode[]) {
  const g = digraph("G");

  files.forEach((file) => {
    g.addNode(file.name);
    file.imports.forEach((importedFile) => {
      g.addEdge(file.name, importedFile.name);
    });
  });
  return g;
}

const graphVisualization = createGraphVisualization(files);
graphVisualization.output("svg", "output.svg");

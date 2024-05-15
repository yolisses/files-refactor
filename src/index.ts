import graphviz from "graphviz";

// TODO find a better name
class FileNode {
  constructor(public name: string, public importedFiles: FileNode[]) {}
}

const file1 = new FileNode("file1", []);
const file2 = new FileNode("file2", [file1]);

function plotFiles(files: FileNode[]) {
  const g = graphviz.digraph("G");
  files.forEach((file) => {
    g.addNode(file.name);
    file.importedFiles.forEach((importedFile) => {
      g.addEdge(file.name, importedFile.name);
    });
  });
  g.output("svg", "output.svg");
}

plotFiles([file1, file2]);

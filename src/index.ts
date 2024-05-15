import graphviz from "graphviz";
import { times } from "./times";

// TODO find a better name
class FileNode {
  constructor(public name: string, public importedFiles: FileNode[]) {}
}

function getGraphvizGraph(files: FileNode[]) {
  const g = graphviz.digraph("G");
  files.forEach((file) => {
    g.addNode(file.name);

    file.importedFiles.forEach((importedFile) => {
      g.addEdge(file.name, importedFile.name);
    });
  });
  return g;
}

function createRandomFiles(count: number) {
  const files = times(count).map((index) => {
    return new FileNode(`file${index}`, []);
  });

  files.forEach((file) => {
    file.importedFiles = files.filter((f) => {
      return Math.random() < 0.1;
    });
  });
  return files;
}

const randomFiles = createRandomFiles(10);

const graphvizGraph = getGraphvizGraph(randomFiles);
graphvizGraph.output("svg", "output.svg");

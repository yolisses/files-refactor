import graphviz from "graphviz";
import { times } from "./times";

class Folder {
  constructor(public name: string) {}
}

// TODO find a better name
class FileNode {
  constructor(
    public name: string,
    public folder: Folder,
    public importedFiles: FileNode[]
  ) {}
}

function getGraphvizGraph(files: FileNode[]) {
  const g = graphviz.digraph("G");

  files.forEach((file) => {
    const cluster = g.addCluster("cluster_" + file.folder.name);
    cluster.set("label", file.folder.name);
    const fileNode = cluster.addNode(file.name);

    file.importedFiles.forEach((importedFile) => {
      cluster.addEdge(file.name, importedFile.name);
    });
  });
  return g;
}

function createRandomFiles(count: number) {
  const folders = times(count).map((index) => {
    return new Folder(`folder${index}`);
  });

  const files = times(count).map((index) => {
    const folder = folders[Math.floor(Math.random() * folders.length)];
    return new FileNode(`file${index}`, folder, []);
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

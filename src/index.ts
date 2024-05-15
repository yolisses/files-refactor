import graphviz, { Graph } from "graphviz";
import { randomSample } from "./randomSample";
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
  const clusters: Record<string, Graph> = {};

  files.forEach((file) => {
    if (!clusters[file.folder.name]) {
      const folderCluster = g.addCluster("cluster_" + file.folder.name);
      folderCluster.set("label", file.folder.name);
      clusters[file.folder.name] = folderCluster;
    }
  });

  files.forEach((file) => {
    const cluster = clusters[file.folder.name];
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
    const count = Math.floor(Math.random() * 3);
    file.importedFiles = randomSample(files, count);
  });
  return files;
}

function organizeFiles(files: FileNode[]) {
  const rootFolder = new Folder("root");
  files.forEach((file) => {
    file.folder = rootFolder;
  });
}

const randomFiles = createRandomFiles(10);
organizeFiles(randomFiles);

const graphvizGraph = getGraphvizGraph(randomFiles);
graphvizGraph.output("svg", "output.svg");

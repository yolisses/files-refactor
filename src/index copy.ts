import graphviz, { Graph } from "graphviz";
import { randomNormal } from "./randomNormal";
import { randomSample } from "./randomSample";
import { times } from "./times";

class Folder {
  constructor(public name: string) {}
}

// TODO find a better name
export class FileNode {
  imports: FileNode[] = [];
  importedBy: FileNode[] = [];

  constructor(public name: string, public folder: Folder) {}

  addImport(file: FileNode) {
    this.imports.push(file);
    file.importedBy.push(this);
  }
}

function createFolderClusters(files: FileNode[], g: Graph) {
  const clusters: Record<string, Graph> = {};
  files.forEach((file) => {
    const { folder } = file;
    if (!clusters[folder.name]) {
      const folderCluster = g.addCluster("cluster_" + folder.name);
      folderCluster.set("label", folder.name);
      clusters[folder.name] = folderCluster;
    }
  });
  return clusters;
}

function getGraphvizGraph(files: FileNode[]) {
  const g = graphviz.digraph("G");
  const folderClusters = createFolderClusters(files, g);

  files.forEach((file) => {
    const folderCluster = folderClusters[file.folder.name];

    const fileNode = folderCluster.addNode(file.name);
    fileNode.set("label", file.name);

    file.imports.forEach((importedFile) => {
      g.addEdge(file.name, importedFile.name);
    });
  });
  return g;
}

function createRandomFiles(count: number) {
  const rootFolder = new Folder("root");

  const files = times(count).map((i) => {
    return new FileNode(`${i}`, rootFolder);
  });

  files.forEach((file) => {
    const importsCount = Math.round(Math.abs(randomNormal() * 5));
    const imports = randomSample(files, importsCount);
    imports.forEach((importedFile) => {
      file.addImport(importedFile);
    });
  });

  return files;
}

function organizeFiles(files: FileNode[]) {
  files.forEach((file) => {
    const folder = new Folder(file.name);
    file.folder = folder;
  });

  files.forEach((file) => {
    if (file.importedBy.length === 1 && file.imports.length === 0) {
      const importer = file.importedBy[0];
      file.folder = importer.folder;
    }
  });
}

export const randomFiles = createRandomFiles(20);

organizeFiles(randomFiles);

const graphvizGraph = getGraphvizGraph(randomFiles);
graphvizGraph.output("svg", "output.svg");

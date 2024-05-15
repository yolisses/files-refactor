import graphviz, { Graph } from "graphviz";
import { randomInteger } from "./randomInteger";
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
    public importedBy: FileNode[]
  ) {}
}

function getGraphvizGraph(files: FileNode[]) {
  const g = graphviz.digraph("G");
  const clusters: Record<string, Graph> = {};

  files.forEach((file) => {
    const { folder } = file;
    if (!clusters[folder.name]) {
      const folderCluster = g.addCluster("cluster_" + folder.name);
      folderCluster.set("label", folder.name);
      clusters[folder.name] = folderCluster;
    }
  });

  files.forEach((file) => {
    // const cluster = clusters[file.folder.name];
    // cluster.set("label", file.folder.name);

    const cluster = g;

    const fileNode = cluster.addNode(file.name);
    fileNode.set("label", `${file.name}\n${file.folder.name}`);

    if (file.folder.name === "unused_files") {
      fileNode.set("style", "filled");
      fileNode.set("fillcolor", "gray");
    }

    file.importedBy.forEach((importer) => {
      g.addEdge(importer.name, file.name);
    });
  });
  return g;
}

function createRandomFilesTree(count: number) {
  const rootFolder = new Folder("root");
  const files = times(count).map((i) => {
    return new FileNode(`${i}`, rootFolder, []);
  });

  files.forEach((file) => {
    const randomNumberOfImports = randomInteger(0, 2);
    file.importedBy = randomSample(files, randomNumberOfImports);
  });

  return files;
}

function organizeFiles(files: FileNode[]) {
  files.forEach((file) => {
    const folder = new Folder("folder_" + file.name);
    file.folder = folder;
  });

  files.forEach((file) => {
    if (file.importedBy.length === 1) {
      const importer = file.importedBy[0];
      file.folder = importer.folder;
    }
  });
}

const randomFiles = createRandomFilesTree(20);
organizeFiles(randomFiles);

const graphvizGraph = getGraphvizGraph(randomFiles);
graphvizGraph.output("svg", "output.svg");

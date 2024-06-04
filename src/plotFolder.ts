import { Graph, digraph } from "graphviz";
import { Folder } from "./folder";
import { getAllFiles } from "./getAllFiles";

function plotFolderStep(folder: Folder, parentCluster: Graph) {
  const cluster = parentCluster.addCluster("cluster_" + folder.name);
  cluster.set("label", folder.name);

  if (folder.files.length === 0 && folder.folders.length === 0) {
    // Creates a invisible node to make the cluster visible
    cluster.addNode("_", { style: "invis" });
  }

  folder.files.forEach((file) => {
    cluster.addNode(file.name);
  });

  folder.folders.forEach((childFolder) => {
    plotFolderStep(childFolder, cluster);
  });
}

export function plotFolder(folder: Folder) {
  const g = digraph("G");
  plotFolderStep(folder, g);

  const allFiles = getAllFiles(folder);
  allFiles.forEach((file) => {
    file.getImports().forEach((importedFile) => {
      g.addEdge(file.name, importedFile.name);
    });
  });

  return g;
}

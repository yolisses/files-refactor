import { Graph } from "graphviz";
import { Folder } from "./folder";

export function plotFolder(folder: Folder, parentCluster: Graph) {
  const cluster = parentCluster.addCluster("cluster_" + folder.name);
  cluster.set("label", folder.name);

  if (folder.files.length === 0 && folder.folders.length === 0) {
    // Creates a invisible node to make the cluster visible
    cluster.addNode("_", {
      style: "invis",
    });
  }

  folder.files.forEach((file) => {
    cluster.addNode(file.name);
  });

  folder.folders.forEach((childFolder) => {
    plotFolder(childFolder, cluster);
  });
}

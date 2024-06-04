import { graph } from "graphviz";
import { Folder } from "./folder";

export function plotFolder(folder: Folder) {
  const g = graph("G");

  function addNode(folder: Folder) {
    const cluster = g.addCluster("cluster_" + folder.name);

    cluster.set("label", folder.name);

    folder.files.forEach((file) => {
      cluster.addNode(file.name);
    });

    folder.folders.forEach(addNode);
  }

  addNode(folder);

  return g;
}

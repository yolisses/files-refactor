import { Graph } from "graphviz";
import { Folder } from "./Folder.ts";

export function plotFolder(
  g: Graph,
  folder: Folder,
  alreadyPlotted: Set<Folder> = new Set()
) {
  const cluster = g.addCluster("cluster_" + folder.name);
  cluster.set("label", folder.name);

  folder.files.forEach((file) => {
    const node = cluster.addNode(file.name);
    node.set("shape", "box");
    node.set("label", file.name);
  });
  folder.subfolders.forEach((subfolder) => {
    if (alreadyPlotted.has(subfolder)) {
      return;
    }
    plotFolder(cluster, subfolder, alreadyPlotted);
  });
}

import { digraph } from "graphviz";
import { FileNode } from "./FileNode.ts";
import { Folder } from "./Folder.ts";
import { plotFolder } from "./plotFolder.ts";

export function createGraphVisualization(files: FileNode[] = []) {
  const g = digraph("G");
  g.set("rankdir", "RL");
  g.setNodeAttribut("shape", "box");
  g.set("splines", "false");

  const alreadyPlotted = new Set<Folder>();
  files.forEach((file) => {
    plotFolder(g, file.parent, alreadyPlotted);
  });

  files.forEach((file) => {
    file.imports.forEach((importedFile) => {
      g.addEdge(file.name, importedFile.name);
    });
  });

  return g;
}

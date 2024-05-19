import { readFileSync } from "fs";
import { digraph } from "graphviz";
import { isDefined } from "./isDefined";

const sonhinImports: Record<string, string[]> = JSON.parse(
  readFileSync("examples/sonhinImports.json", "utf8")
);

class FileNode {
  constructor(public name: string, public imports: FileNode[]) {}
}

const symbolsWithRepetition = Object.entries(sonhinImports)
  .map(([name, imports]) => {
    return [name, ...imports];
  })
  .flat();
const symbols = Array.from(new Set(symbolsWithRepetition));

symbols.sort();

const files = symbols.map((name) => {
  return new FileNode(name, []);
});

files.forEach((file) => {
  const imports = sonhinImports[file.name] || [];
  file.imports = imports
    .map((importName) => {
      return files.find((f) => f.name === importName);
    })
    .filter(isDefined);
});

function getGraphvizGraph(files: FileNode[]) {
  const g = digraph("G");

  files.forEach((file) => {
    const fileNode = g.addNode(file.name);
    fileNode.set("label", file.name);

    file.imports.forEach((importedFile) => {
      g.addEdge(file.name, importedFile.name);
    });
  });
  return g;
}

function getSonhinGraphvizGraph() {
  const g = digraph("G");

  Object.entries(sonhinImports)
    .slice(0)
    .forEach(([name, imports]) => {
      const fileNode = g.addNode(name);
      fileNode.set("label", name);

      imports.forEach((importedFile) => {
        g.addEdge(name, importedFile);
      });
    });
  return g;
}

const graphvizGraph = getSonhinGraphvizGraph();
graphvizGraph.setNodeAttribut("shape", "box");
graphvizGraph.set("rankdir", "LR");
graphvizGraph.set("splines", false);
// const graphvizGraph = getGraphvizGraph(files);
graphvizGraph.output("svg", "output.svg");

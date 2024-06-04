import { graph } from "graphviz";
import { createRandomFileStructure } from "./createRandomFileStructure";
import { FileNode } from "./file";
import { Folder } from "./folder";
import { plotFolder } from "./plotFolder";

const a = new FileNode("a");
const b = new FileNode("b");
const c = new FileNode("c");

a.imports = [b];

const d = new Folder("d");
d.files = [c];

const e = new Folder("e");
e.files = [b, a];
e.folders = [d];

const root = createRandomFileStructure();
const g = graph("G");
plotFolder(root, g);

console.log(root);
g.output("svg", "example.svg");

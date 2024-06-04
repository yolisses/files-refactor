import { FileNode } from "./file";
import { Folder } from "./folder";
import { plotFolder } from "./plotFolder";

const a = new FileNode("a");
const b = new FileNode("b");
const c = new FileNode("c");

const d = new Folder("d");
d.files = [c];

const e = new Folder("e");
e.files = [b, a];
e.folders = [d];

const graph = plotFolder(e);
graph.output("png", "example.png");

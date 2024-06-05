import { readFileSync } from "fs";
import { createRandomFileStructure } from "./createRandomFileStructure";
import { FileNode } from "./fileNode";
import { Folder } from "./folder";
import { getAllFiles } from "./getAllFiles";
import { lintFileStructure } from "./lintFileStructure";
import { plotFolder } from "./plotFolder";

function run() {
  let root = createRandomFileStructure();
  const allFiles = getAllFiles(root);
  root = lintFileStructure(allFiles);
  const g = plotFolder(root);
  g.output("svg", "example.svg");
}

function run2() {
  const path = "./src/sonhinExample.json";
  const obj: Record<string, string[]> = JSON.parse(readFileSync(path, "utf8"));
  const files: Record<string, FileNode> = {};

  const root = new Folder("root");

  Object.keys(obj).forEach((key) => {
    if (!files[key]) {
      files[key] = new FileNode(key);
      root.addFile(files[key]);
    }
  });

  Object.values(obj).forEach((imports) => {
    imports.forEach((imp) => {
      if (!files[imp]) {
        files[imp] = new FileNode(imp);
        root.addFile(files[imp]);
      }
    });
  });

  Object.entries(obj).forEach(([key, imports]) => {
    const file = files[key];
    imports.forEach((imp) => {
      file.addImport(files[imp]);
    });
  });

  const g = plotFolder(root);
  g.output("svg", "example.svg");
}

run2();
console.log("done");
// run();

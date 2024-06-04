import { createRandomFileStructure } from "./createRandomFileStructure";
import { getAllFiles } from "./getAllFiles";
import { lintFileStructure } from "./lintFileStructure";
import { plotFolder } from "./plotFolder";

let root = createRandomFileStructure();
const allFiles = getAllFiles(root);
root = lintFileStructure(allFiles);
const g = plotFolder(root);
g.output("svg", "example.svg");

console.log("end");

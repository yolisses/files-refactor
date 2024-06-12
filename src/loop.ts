import { FileNode } from "./fileNode";

[
  { name: "0", imports: ["1", "9", "9"], importedBy: ["5"] },
  { name: "5", imports: ["7", "0", "8"], importedBy: ["7"] },
  { name: "9", imports: [], importedBy: ["0", "0"] },
  { name: "1", imports: [], importedBy: ["0", "8"] },
  { name: "8", imports: ["1"], importedBy: ["5", "7"] },
  { name: "7", imports: ["5", "8"], importedBy: ["5"] },
];

// const file0 = new FileNode("0");
const file5 = new FileNode("5");
// const file9 = new FileNode("9");
// const file1 = new FileNode("1");
const file8 = new FileNode("8");
const file7 = new FileNode("7");

// file0.addImport(file1);
// file0.addImport(file9);
// file0.addImport(file9);

file5.addImport(file7);
// file5.addImport(file0);
// file5.addImport(file8);

// file8.addImport(file1);

file7.addImport(file5);
file7.addImport(file8);

export const loopFiles = [
  //
  // file0,
  file5,
  // file9,
  // file1,
  file8,
  file7,
];

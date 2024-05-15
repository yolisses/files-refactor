import { Project } from "ts-morph";

const project = new Project();
const instrumentSourceFile = project.addSourceFileAtPath(
  "examples/instrument.ts"
);

const things = instrumentSourceFile.getExportSymbols();
console.log(things);

things.forEach((thing) => {
  // console.log(thing.isExported());
  console.log(thing.getName());
});

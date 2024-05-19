import { createGraphVisualization } from "./createGraphVisualization.ts";
import { exampleFiles } from "./exampleFiles.ts";
import { optimizeFolderStructure } from "./optimizeFolderStructure.ts";

const files = exampleFiles;
optimizeFolderStructure(files);
const graphVisualization = createGraphVisualization(files);
graphVisualization.output("svg", "output.svg");

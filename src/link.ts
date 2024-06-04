import { FileNode } from "./fileNode";

export type Link = {
  importer: FileNode;
  imported: FileNode;
};

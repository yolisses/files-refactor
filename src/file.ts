import { INode } from "./inode";

export class FileNode implements INode {
  name: string;
  imports: FileNode[] = [];
}

import { Folder } from "./Folder";

export class INode {
  parent: Folder;
  constructor(public name: string) {}

  move(newParent: Folder) {
    console.log(`Moving ${this.name} to ${newParent.name}`);
    if (this.parent) {
      this.parent.removeFile(this);
    }
    newParent.addChild(this);
    this.parent = newParent;
  }
}

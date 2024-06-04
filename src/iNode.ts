import { Folder } from "./folder";

export abstract class INode {
  private parent?: Folder;
  constructor(public name: string) {}

  bareSetParent(parent: Folder | null) {
    this.parent = parent;
  }

  getParent(): Folder {
    return this.parent;
  }

  move(newParent: Folder) {
    this.parent?.removeINode(this);
    newParent.addINode(this);
  }
}

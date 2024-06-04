import { Folder } from "./folder";

export abstract class INode {
  private parent?: Folder;
  constructor(public name: string) {}

  bareSetParent(parent: Folder | null) {
    if ((parent as INode) === this) {
      throw new Error("INode cannot be its own parent");
    }
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

import { Folder } from "./folder";

export abstract class INode {
  private parent?: Folder;
  constructor(public name: string) {}

  bareSetParent(parent: Folder | null) {
    // check if would create a circular reference
    let ancestor = parent;
    while (ancestor) {
      if (ancestor === (this as any)) {
        throw new Error("Creating a circular reference");
      }
      ancestor = ancestor.getParent();
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

import { FileNode } from "./fileNode";
import { Folder } from "./folder";
import { getLinks } from "./getLinks";

export function lintFileStructure(files: FileNode[]) {
  // TODO stop creating a new root folder
  const root = new Folder("root");
  const clones = new Map<FileNode, FileNode>();

  files.forEach((file) => {
    const clone = new FileNode(file.name + "_clone");
    clones.set(file, clone);

    const group = new Folder(file.name + "_group");
    group.addFile(clone);
    root.addFolder(group);
  });

  const links = getLinks(files);
  links.forEach((link) => {
    const { importer, imported } = link;
    const importerClone = clones.get(importer);
    const importedClone = clones.get(imported);
    importedClone.getParent().move(importerClone.getParent());
    importerClone.addImport(importedClone);
    console.log(
      `Moving ${importedClone.getParent().name} to ${
        importerClone.getParent().name
      }`
    );
  });

  return root;
}

import { FileNode } from "./fileNode";
import { Folder } from "./folder";
import { getClosestCommonAncestor } from "./getClosestCommonAncestor";
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
    importerClone.addImport(importedClone);

    const importedBy = importedClone.getImportedBy();
    const commonAncestor = getClosestCommonAncestor(
      importedBy.map((i) => i.getParent())
    );

    const destination = commonAncestor as Folder;
    importedClone.getParent().move(destination);
  });

  return root;
}

import { FileNode } from "./fileNode";
import { Link } from "./link";

export function getLinks(files: FileNode[]): Link[] {
  return files
    .map((importer) => {
      return importer.getImports().map((imported) => {
        return { imported, importer };
      });
    })
    .flat();
}

import { FileNode, randomFiles } from ".";

function logImports(files: FileNode[]) {
  console.log(
    randomFiles.map((file) => {
      return {
        name: file.name,
        imports: file.imports.map((importedFile) => importedFile.name),
        importedBy: file.importedBy.map((importer) => importer.name),
      };
    })
  );
}

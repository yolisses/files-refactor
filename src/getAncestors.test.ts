import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { Folder } from "./Folder.ts";
import { INode } from "./INode.ts";
import { getAncestors } from "./getAncestors.ts";

Deno.test("getAncestors", () => {
  const inode1 = new INode("1");
  const inode2 = new INode("2");
  const inode3 = new INode("3");
  inode1.parent = inode2 as Folder;
  inode2.parent = inode3 as Folder;

  const ancestors = getAncestors(inode1);
  assertEquals(ancestors, [inode1, inode2, inode3]);
});

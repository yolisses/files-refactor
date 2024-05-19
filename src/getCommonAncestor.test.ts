import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import { Folder } from "./Folder.ts";
import { INode } from "./INode.ts";
import { getCommonAncestor } from "./getCommonAncestor.ts";

Deno.test("getCommonAncestor", () => {
  const inode1 = new INode("1");
  const inode2 = new INode("2");
  const inode3 = new INode("3");
  inode1.parent = inode2 as Folder;
  inode2.parent = inode3 as Folder;
  const commonAncestor = getCommonAncestor([inode1, inode2, inode3]);
  assertEquals(commonAncestor, inode3);
});

Deno.test("getCommonAncestor without common ancestor", () => {
  const inode1 = new INode("1");
  const inode2 = new INode("2");
  const inode3 = new INode("3");
  inode1.parent = inode2 as Folder;
  const commonAncestor = getCommonAncestor([inode1, inode2, inode3]);
  assertEquals(commonAncestor, null);
});

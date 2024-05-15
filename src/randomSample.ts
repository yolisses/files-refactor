import { randomElement } from "./randomElement";

export function randomSample<T>(array: T[], count: number) {
  const result: Set<T> = new Set();
  while (result.size < count) {
    result.add(randomElement(array));
  }
  return Array.from(result);
}

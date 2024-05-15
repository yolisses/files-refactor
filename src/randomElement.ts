import { randomIndex } from "./randomIndex";

export function randomElement<T>(array: T[]) {
  return array[randomIndex(array)];
}

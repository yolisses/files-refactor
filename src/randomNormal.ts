/**
 * Returns a random number between -1 and 1, following
 * an approximately normal distribution
 * @returns a random number between -1 and 1
 */
export function randomNormal() {
  return (
    (Math.random() +
      Math.random() +
      Math.random() +
      Math.random() +
      Math.random() +
      Math.random() -
      3) /
    3
  );
}

/**
 * Whether the two arrays are equivalent
 * Arrays are equivalent when they are both empty, or when their lengths are equal and each of
 * their members is equal (===) to the corresponding member in the other array.
 * @param a first array
 * @param b second array
 */
export function arraysAreEquivalent(a: unknown, b: unknown): boolean {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return false;
  } else if (a.length !== b.length) { // lengths are different
    return false;
  } else if (!a.length && !b.length) { // both are empty
    return true;
  } else { // multi and length of both is equal
    for (const [i, element] of a.entries()) {
      if (element !== b[i]) {
        return false;
      }
    }
    return true;
  }
}

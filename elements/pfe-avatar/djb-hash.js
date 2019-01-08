/**
 * djb2 string hashing function.
 *
 * @see http://www.cse.yorku.ca/~oz/hash.html
 * @param {String} str the string to hash.
 * @return {Number} a positive integer
 */

function hash(str) {
  let hash = 5381;
  let i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  return hash >>> 0;
}

export { hash };

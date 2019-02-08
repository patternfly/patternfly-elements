function hash(str) {
  let hash = 5381;
  let i = str.length;

  while (i) {
    // hash = (hash * 33) ^ str.charCodeAt(--i);
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  return hash >>> 0;
}

export { hash };

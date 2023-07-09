/** Memoize an oft-called nary function */
export function memoize<T extends(...args: any[]) => unknown>(fn: T): T {
  if (!fn) {
    throw new Error('Trying to memoize non-function');
  }

  const cache = new Map<unknown, unknown>();

  const memoized =
    (function(...args) {
      const [key] = args;
      if (!cache.has(key)) {
        cache.set(key, fn(...args));
      }

      return cache.get(key);
    }) as T;

  if (fn.name) {
    Object.defineProperty(memoized, 'name', { value: fn.name, writable: false });
  }

  return memoized;
}

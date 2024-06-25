/**
 * Tracks the time a method takes to complete using the [performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
 * @param tag - short string to identify the method name
 */
export function time(tag?: string) {
  return function(_: unknown, key: string, descriptor: PropertyDescriptor) {
    const { value: f } = descriptor ?? {};

    if (!(typeof f === 'function')) {
      throw new Error('@time() may only decorate class methods');
    }

    descriptor.value = function(...args: any[]) {
      const TAG = tag ?? `${this.constructor.name}-${key}`;
      const START_TAG = `start-${TAG}`;
      const END_TAG = `end-${TAG}`;

      performance.mark(START_TAG);

      const x = f.call(this, ...args);

      const ret = () => {
        performance.mark(END_TAG);
        performance.measure(TAG, START_TAG, END_TAG);
        // eslint-disable-next-line no-console
        console.log(Array.from(performance.getEntriesByName(TAG)).pop());
        return x;
      };

      if (x instanceof Promise) {
        return x.then(ret);
      } else {
        return ret();
      }
    };
  };
}

/**
 * Tracks the time a method takes to complete using the [performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
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

      if (window.PfeConfig.trackPerformance) {
        window.performance.mark(START_TAG);
      }

      const x = f.call(this, ...args);

      const ret = () => {
        if (window.PfeConfig.trackPerformance) {
          window.performance.mark(END_TAG);
          window.performance.measure(TAG, START_TAG, END_TAG);
          // eslint-disable-next-line no-console
          console.log(Array.from(window.performance.getEntriesByName(TAG)).pop());
        }
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

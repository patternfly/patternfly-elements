/** Logs the result of a class method */
export function trace(tag?: string) {
  return function(_: unknown, key: string, descriptor: PropertyDescriptor) {
    const { value: f } = descriptor;
    descriptor.value = function(...args: any[]) {
      const x = f.call(this, ...args);

      const ret = () => {
        // eslint-disable-next-line no-console
        console.log(tag ?? key, x);
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

const configurable = true;

/**
 * Binds a class method to the instance
 * @param _
 * @param key
 * @param descriptor
 * @example Binding an event listener
 *     ```ts
 *     private mo = new MutationObserver(this.onMutation);
 *
 *     @bound onMutation(records: MutationRecord[]) {
 *       this.count = this.children.length;
 *     }
 *     ```
 */
export function bound(_: unknown, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  if (typeof descriptor?.value !== 'function') {
    throw new TypeError(`Only methods can be decorated with @bound. <${key ?? (_ as () => void).name}> is not a method!`);
  } /* c8 ignore next */
  return {
    configurable,
    get() {
      const value = descriptor.value.bind(this);
      Object.defineProperty(this, key, { value, configurable, writable: true });
      return value;
    },
  };
}

export class ObserverShim {
  observe() {
    void 0;
  }

  disconnect() {
    void 0;
  }
}

// @ts-expect-error: i'm shimmin' here!
globalThis.window ??= globalThis;
// @ts-expect-error: i'm shimmin' here!
globalThis.ErrorEvent ??= Event;
// @ts-expect-error: i'm shimmin' here!
globalThis.IntersectionObserver ??= ObserverShim;
// @ts-expect-error: i'm shimmin' here!
globalThis.MutationObserver ??= ObserverShim;
// @ts-expect-error: i'm shimmin' here!
globalThis.getComputedStyle ??= function() {
  return {
    getPropertyPriority() {
      return '';
    },
    getPropertyValue() {
      return '';
    },
  };
};


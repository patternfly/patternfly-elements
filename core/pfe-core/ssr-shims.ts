class ObserverShim {
  observe(): void {
    void 0;
  }

  disconnect(): void {
    void 0;
  }
}

class MiniHTMLElement {
  innerHTML = '';
  constructor(public tagName: string) { }
}

class MiniHTMLTemplateElement extends MiniHTMLElement {
  content = { cloneNode: (): string => this.innerHTML };
}

class MiniDocument {
  createElement(tagName: string): MiniHTMLElement {
    switch (tagName) {
      case 'template':
        return new MiniHTMLTemplateElement(tagName);
      default:
        return new MiniHTMLElement(tagName);
    }
  }
}

// @ts-expect-error: this runs in node
globalThis.window ??= globalThis;
// @ts-expect-error: this runs in node
globalThis.document ??= new MiniDocument();
// @ts-expect-error: this runs in node
globalThis.navigator ??= { userAgent: '' };
// @ts-expect-error: opt in to event support in ssr
globalThis.litSsrCallConnectedCallback = true;
// @ts-expect-error: this runs in node
globalThis.ErrorEvent ??= Event;
// @ts-expect-error: this runs in node
globalThis.IntersectionObserver ??= ObserverShim;
// @ts-expect-error: this runs in node
globalThis.MutationObserver ??= ObserverShim;
// @ts-expect-error: this runs in node
globalThis.ResizeObserver ??= ObserverShim;
// @ts-expect-error: this runs in node
globalThis.getComputedStyle ??= function() {
  return {
    getPropertyPriority() {
      return '';
    },
    getPropertyValue() {
      return '';
    },
  };
}

;

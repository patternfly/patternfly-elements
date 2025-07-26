import type { ReactiveElement } from 'lit';
import {
  type SlotControllerArgs,
  type SlotControllerPublicAPI,
} from './slot-controller.js';

export class SlotController implements SlotControllerPublicAPI {
  public static default = Symbol('default slot') satisfies symbol as symbol;

  /** @deprecated use `default` */
  public static anonymous: symbol = this.default;

  static attribute = 'ssr-hint-has-slotted' as const;

  static anonymousAttribute = 'ssr-hint-has-slotted-default' as const;

  constructor(public host: ReactiveElement, ..._: SlotControllerArgs) {
    host.addController(this);
  }

  hostConnected?(): Promise<void>;

  private fromAttribute(slots: string | null) {
    return (slots ?? '')
        .split(/[, ]/)
        .map(x => x.trim());
  }

  getSlotted<T extends Element = Element>(..._: (string | null)[]): T[] {
    return [];
  }

  hasSlotted(...names: (string | null)[]): boolean {
    const attr = this.host.getAttribute(SlotController.attribute);
    const anon = this.host.hasAttribute(SlotController.anonymousAttribute);
    const hints = new Set(this.fromAttribute(attr));
    if (!names.length) {
      names.push(null);
    }
    return names.every(x => x === null ? anon : hints.has(x));
  }

  isEmpty(...names: (string | null)[]): boolean {
    return !this.hasSlotted(...names);
  }
}

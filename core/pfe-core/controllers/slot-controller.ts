import type { ReactiveController, ReactiveElement } from 'lit';

interface AnonymousSlot {
  hasContent: boolean;
  elements: Element[];
  slot: HTMLSlotElement | null;
}

interface NamedSlot extends AnonymousSlot {
  name: string;
  initialized: true;
}

export type Slot = NamedSlot | AnonymousSlot;

export type SlotName = string | null;

export interface SlotsConfig {
  slots: SlotName[];
  /**
   * Object mapping new slot name keys to deprecated slot name values
   * @example `pf-modal--header` is deprecated in favour of `header`
   * ```js
   * new SlotController(this, {
   *   slots: ['header'],
   *   deprecations: {
   *     'header': 'pf-modal--header'
   *   }
   * })
   * ```
   */
  deprecations?: Record<string, string>;
}

export type SlotControllerArgs = [SlotsConfig] | SlotName[];

export function isObjectSpread(config: SlotControllerArgs): config is [SlotsConfig] {
  return config.length === 1 && typeof config[0] === 'object' && config[0] !== null;
}

function isContent(node: Node) {
  switch (node.nodeType) {
    case Node.TEXT_NODE:
      return !!node.textContent?.trim();
    case Node.COMMENT_NODE:
      return false;
    default:
      return true;
  }
}

export declare class SlotControllerPublicAPI implements ReactiveController {
  static default: symbol;

  public host: ReactiveElement;

  constructor(host: ReactiveElement, ...args: SlotControllerArgs);

  hostConnected?(): Promise<void>;

  hostDisconnected?(): void;

  hostUpdated?(): void;

  /**
   * Given a slot name or slot names, returns elements assigned to the requested slots as an array.
   * If no value is provided, it returns all children not assigned to a slot (without a slot attribute).
   * @param slotNames slots to query
   * @example Get header-slotted elements
   *          ```js
   *          this.getSlotted('header')
   *          ```
   * @example Get header- and footer-slotted elements
   *          ```js
   *          this.getSlotted('header', 'footer')
   *          ```
   * @example Get default-slotted elements
   *          ```js
   *          this.getSlotted();
   *          ```
   */
  getSlotted<T extends Element = Element>(...slotNames: string[]): T[];

  /**
   * Returns a boolean statement of whether or not any of those slots exists in the light DOM.
   * @param names The slot names to check.
   * @example this.hasSlotted('header');
   */
  hasSlotted(...names: (string | null | undefined)[]): boolean;

  /**
   * Whether or not all the requested slots are empty.
   * @param  names The slot names to query.  If no value is provided, it returns the default slot.
   * @example this.isEmpty('header', 'footer');
   * @example this.isEmpty();
   * @returns
   */
  isEmpty(...names: (string | null | undefined)[]): boolean;
}

class SlotRecord {
  constructor(
    public slot: HTMLSlotElement,
    public name: string | symbol,
    private host: ReactiveElement,
  ) {}

  get elements() {
    return this.slot?.assignedElements?.();
  }

  get hasContent() {
    if (this.name === SlotController.default) {
      return !!this.elements.length
        || !![...this.host.childNodes]
            .some(node => {
              if (node instanceof Element) {
                return !node.hasAttribute('slot');
              } else {
                return isContent(node);
              }
            });
    } else {
      return !!this.slot.assignedNodes()
          .some(isContent);
    }
  }
}

export class SlotController implements SlotControllerPublicAPI {
  public static default = Symbol('default slot') satisfies symbol as symbol;

  /** @deprecated use `default` */
  public static anonymous: symbol = this.default;

  #slotRecords = new Map<string | typeof SlotController.default, SlotRecord>();

  #slotNames: (string | symbol | null)[] = [];

  #deprecations: Record<string, string> = {};

  #initSlotMap = async () => {
    const { host } = this;
    await host.updateComplete;
    const slotRecords = this.#slotRecords;
    // Loop over the properties provided by the schema
    for (let slotName of this.#slotNames.concat(Object.values(this.#deprecations))) {
      slotName ||= SlotController.default;
      const slot = this.#getSlotElement(slotName);
      if (slot) {
        slotRecords.set(slotName, new SlotRecord(slot, slotName, host));
      }
    }
    host.requestUpdate();
  };

  #mo = new MutationObserver(this.#initSlotMap);

  constructor(public host: ReactiveElement, ...args: SlotControllerArgs) {
    host.addController(this);
    this.#initialize(...args);
    if (!this.#slotNames.length) {
      this.#slotNames = [null];
    }
  }

  #initialize(...config: SlotControllerArgs) {
    if (isObjectSpread(config)) {
      const [{ slots, deprecations }] = config;
      this.#slotNames = slots;
      this.#deprecations = deprecations ?? {};
    } else if (config.length >= 1) {
      this.#slotNames = config;
      this.#deprecations = {};
    }
  }

  #getSlotElement(slotId: string | symbol) {
    const selector =
      slotId === SlotController.default ? 'slot:not([name])' : `slot[name="${slotId as string}"]`;
    return this.host.shadowRoot?.querySelector?.<HTMLSlotElement>(selector) ?? null;
  }

  async hostConnected(): Promise<void> {
    this.#mo.observe(this.host, { childList: true });
    // Map the defined slots into an object that is easier to query
    this.#slotRecords.clear();
    await this.host.updateComplete;
    this.#initSlotMap();
    // insurance for framework integrations
    await this.host.updateComplete;
    this.host.requestUpdate();
  }

  hostDisconnected(): void {
    this.#mo.disconnect();
  }

  /**
   * Given a slot name or slot names, returns elements assigned to the requested slots as an array.
   * If no value is provided, it returns all children not assigned to a slot (without a slot attribute).
   * @param slotNames slots to query
   * @example Get header-slotted elements
   *          ```js
   *          this.getSlotted('header')
   *          ```
   * @example Get header- and footer-slotted elements
   *          ```js
   *          this.getSlotted('header', 'footer')
   *          ```
   * @example Get default-slotted elements
   *          ```js
   *          this.getSlotted();
   *          ```
   */
  public getSlotted<T extends Element = Element>(...slotNames: string[] | [null]): T[] {
    if (!slotNames.length || slotNames.length === 1 && slotNames.at(0) === null) {
      return (this.#slotRecords.get(SlotController.default)?.elements ?? []) as T[];
    } else {
      return slotNames.flatMap(slotName =>
        this.#slotRecords.get(slotName ?? SlotController.default)?.elements ?? []) as T[];
    }
  }

  /**
   * Returns a boolean statement of whether or not any of those slots exists in the light DOM.
   * @param names The slot names to check.
   * @example this.hasSlotted('header');
   */
  public hasSlotted(...names: (string | null | undefined)[]): boolean {
    const slotNames = Array.from(names, x =>
      x == null ? SlotController.default : x);
    if (!slotNames.length) {
      slotNames.push(SlotController.default);
    }
    return slotNames.some(slotName => {
      const slot = this.#slotRecords.get(slotName);
      if (!slot) {
        return false;
      } else {
        return slot.hasContent;
      }
    });
  }

  /**
   * Whether or not all the requested slots are empty.
   * @param  names The slot names to query.  If no value is provided, it returns the default slot.
   * @example this.isEmpty('header', 'footer');
   * @example this.isEmpty();
   * @returns
   */
  public isEmpty(...names: (string | null | undefined)[]): boolean {
    return !this.hasSlotted(...names);
  }
}

import { isServer, type ReactiveController, type ReactiveElement } from 'lit';

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

export interface SlotsConfig {
  slots: (string | null)[];
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

export type SlotControllerArgs = [SlotsConfig] | (string | null)[];

function isObjectSpread(
  config: ([SlotsConfig] | (string | null)[]),
): config is [SlotsConfig] {
  return config.length === 1 && typeof config[0] === 'object' && config[0] !== null;
}

/**
 * If it's a named slot, return its children,
 * for the default slot, look for direct children not assigned to a slot
 * @param n slot name
 */
const isSlot =
  <T extends Element = Element>(n: string | typeof SlotController.default) =>
    (child: Element): child is T =>
        n === SlotController.default ? !child.hasAttribute('slot')
      : child.getAttribute('slot') === n;

export class SlotController implements ReactiveController {
  public static default = Symbol('default slot') satisfies symbol as symbol;

  /** @deprecated use `default` */
  public static anonymous: symbol = this.default;

  private static singletons = new WeakMap<ReactiveElement, SlotController>();

  #nodes = new Map<string | typeof SlotController.default, Slot>();

  #slotMapInitialized = false;

  #slotNames: (string | null)[] = [];

  #ssrHintHasSlotted: (string | null)[] = [];

  #deprecations: Record<string, string> = {};

  #mo = new MutationObserver(this.#initSlotMap.bind(this));

  constructor(public host: ReactiveElement, ...args: SlotControllerArgs) {
    const singleton = SlotController.singletons.get(host);
    if (singleton) {
      singleton.#initialize(...args);
      return singleton;
    }
    this.#initialize(...args);
    host.addController(this);
    SlotController.singletons.set(host, this);
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

  async hostConnected(): Promise<void> {
    this.#mo.observe(this.host, { childList: true });
    this.#ssrHintHasSlotted =
      this.host
      // @ts-expect-error: this is a ponyfill for ::has-slotted, is not intended as a public API
          .ssrHintHasSlotted
          ?? [];
    // Map the defined slots into an object that is easier to query
    this.#nodes.clear();
    this.#initSlotMap();
    // insurance for framework integrations
    await this.host.updateComplete;
    this.host.requestUpdate();
  }

  hostDisconnected(): void {
    this.#mo.disconnect();
  }

  hostUpdated(): void {
    if (!this.#slotMapInitialized) {
      this.#initSlotMap();
    }
  }

  #initSlotMap() {
    // Loop over the properties provided by the schema
    for (const slotName of this.#slotNames
        .concat(Object.values(this.#deprecations))) {
      const slotId = slotName || SlotController.default;
      const name = slotName ?? '';
      const elements = this.#getChildrenForSlot(slotId);
      const slot = this.#getSlotElement(slotId);
      const hasContent =
          isServer ? this.#ssrHintHasSlotted.includes(slotName)
        : !!elements.length || !!slot?.assignedNodes?.()?.filter(x => x.textContent?.trim()).length;
      this.#nodes.set(slotId, { elements, name, hasContent, slot });
    }
    this.host.requestUpdate();
    this.#slotMapInitialized = true;
  }

  #getSlotElement(slotId: string | symbol) {
    if (isServer) {
      return null;
    } else {
      const selector =
      slotId === SlotController.default ? 'slot:not([name])' : `slot[name="${slotId as string}"]`;
      return this.host.shadowRoot?.querySelector?.<HTMLSlotElement>(selector) ?? null;
    }
  }

  #getChildrenForSlot<T extends Element = Element>(
    name: string | typeof SlotController.default,
  ): T[] {
    if (isServer) {
      return [];
    } else if (this.#nodes.has(name)) {
      return (this.#nodes.get(name)!.slot?.assignedElements?.() ?? []) as T[];
    } else {
      const children = Array.from(this.host.children) as T[];
      return children.filter(isSlot(name));
    }
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
  getSlotted<T extends Element = Element>(...slotNames: string[]): T[] {
    if (!slotNames.length) {
      return (this.#nodes.get(SlotController.default)?.elements ?? []) as T[];
    } else {
      return slotNames.flatMap(slotName =>
        this.#nodes.get(slotName)?.elements ?? []) as T[];
    }
  }

  /**
   * Returns a boolean statement of whether or not any of those slots exists in the light DOM.
   * @param names The slot names to check.
   * @example this.hasSlotted('header');
   */
  hasSlotted(...names: (string | null | undefined)[]): boolean {
    const slotNames = Array.from(names, x => x == null ? SlotController.default : x);
    if (!slotNames.length) {
      slotNames.push(SlotController.default);
    }
    return slotNames.some(x => this.#nodes.get(x)?.hasContent ?? false);
  }

  /**
   * Whether or not all the requested slots are empty.
   * @param  names The slot names to query.  If no value is provided, it returns the default slot.
   * @example this.isEmpty('header', 'footer');
   * @example this.isEmpty();
   * @returns
   */
  isEmpty(...names: (string | null | undefined)[]): boolean {
    return !this.hasSlotted(...names);
  }
}

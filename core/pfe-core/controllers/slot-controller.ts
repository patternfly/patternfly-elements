import type { ReactiveController, ReactiveElement } from 'lit';

import { bound } from '../decorators/bound.js';
import { Logger } from './logger.js';

interface AnonymousSlot {
  hasContent: boolean;
  elements: Element[];
  slot: HTMLSlotElement|null;
}

interface NamedSlot extends AnonymousSlot {
  name: string;
  initialized: true;
}

export type Slot = NamedSlot|AnonymousSlot;

export interface SlotsConfig {
  slots: (string|null)[];
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

function isObjectConfigSpread(config: ([SlotsConfig]|(string|null)[])): config is [SlotsConfig] {
  return config.length === 1 && typeof config[0] === 'object' && config[0] !== null;
}

/**
 * If it's a named slot, return its children,
 * for the default slot, look for direct children not assigned to a slot
 */
const isSlot =
  <T extends Element = Element>(n: string|typeof SlotController.anonymous) =>
    (child: Element): child is T =>
        n === SlotController.anonymous ? !child.hasAttribute('slot')
      : child.getAttribute('slot') === n;

export class SlotController implements ReactiveController {
  public static anonymous = Symbol('anonymous slot');

  private nodes = new Map<string|typeof SlotController.anonymous, Slot>();

  private logger: Logger;

  private firstUpdated = false;

  private mo = new MutationObserver(this.onMutation);

  private slotNames: (string|null)[];

  private deprecations: Record<string, string> = {};

  constructor(public host: ReactiveElement, ...config: ([SlotsConfig]|(string|null)[])) {
    this.logger = new Logger(this.host);

    if (isObjectConfigSpread(config)) {
      const [{ slots, deprecations }] = config;
      this.slotNames = slots;
      this.deprecations = deprecations ?? {};
    } else if (config.length >= 1) {
      this.slotNames = config;
      this.deprecations = {};
    } else {
      this.slotNames = [null];
    }


    host.addController(this);
  }

  hostConnected() {
    this.host.addEventListener('slotchange', this.onSlotChange as EventListener);
    this.firstUpdated = false;
    this.mo.observe(this.host, { childList: true });
    this.init();
  }

  hostUpdated() {
    if (!this.firstUpdated) {
      this.slotNames.forEach(this.initSlot);
      this.firstUpdated = true;
    }
  }

  hostDisconnected() {
    this.mo.disconnect();
  }

  /**
   * Returns a boolean statement of whether or not any of those slots exists in the light DOM.
   *
   * @param {String|Array} name The slot name.
   * @example this.hasSlotted("header");
   */
  hasSlotted(...names: string[]): boolean {
    if (!names.length) {
      this.logger.warn(`Please provide at least one slot name for which to search.`);
      return false;
    } else {
      return names.some(x =>
        this.nodes.get(x)?.hasContent ?? false);
    }
  }

  /**
   * Given a slot name or slot names, returns elements assigned to the requested slots as an array.
   * If no value is provided, it returns all children not assigned to a slot (without a slot attribute).
   *
   * @example Get header-slotted elements
   * ```js
   * this.getSlotted('header')
   * ```
   *
   * @example Get header- and footer-slotted elements
   * ```js
   * this.getSlotted('header', 'footer')
   * ```
   *
   * @example Get default-slotted elements
   * ```js
   * this.getSlotted();
   * ```
   */
  getSlotted<T extends Element = Element>(...slotNames: string[]): T[] {
    if (!slotNames.length) {
      return (this.nodes.get(SlotController.anonymous)?.elements ?? []) as T[];
    } else {
      return slotNames.flatMap(slotName =>
        this.nodes.get(slotName)?.elements ?? []) as T[];
    }
  }

  @bound private onSlotChange(event: Event & { target: HTMLSlotElement }) {
    const slotName = event.target.name;
    this.initSlot(slotName);
    this.host.requestUpdate();
  }

  @bound private async onMutation(records: MutationRecord[]) {
    const changed = [];
    for (const { addedNodes, removedNodes } of records) {
      for (const node of [...addedNodes, ...removedNodes]) {
        if (node instanceof HTMLElement && node.slot) {
          this.initSlot(node.slot);
          changed.push(node.slot);
        }
      }
    }
    if (changed.length) {
      this.host.requestUpdate();
    }
  }

  private getChildrenForSlot<T extends Element = Element>(name: string|typeof SlotController.anonymous): T[] {
    const children = Array.from(this.host.children) as T[];
    return children.filter(isSlot(name));
  }

  @bound private initSlot(slotName: string|null) {
    const name = slotName || SlotController.anonymous;
    const elements = this.nodes.get(name)?.slot?.assignedElements?.() ?? this.getChildrenForSlot(name);
    const selector = slotName ? `slot[name="${slotName}"]` : 'slot:not([name])';
    const slot = this.host.shadowRoot?.querySelector?.<HTMLSlotElement>(selector) ?? null;
    const hasContent = !!elements.length;
    this.nodes.set(name, { elements, name: slotName ?? '', hasContent, slot });
    this.logger.log(slotName, hasContent);
  }

  /**
   * Maps the defined slots into an object that is easier to query
   */
  @bound private init() {
    this.nodes.clear();
    // Loop over the properties provided by the schema
    this.slotNames.forEach(this.initSlot);
    Object.values(this.deprecations).forEach(this.initSlot);
    this.host.requestUpdate();
  }
}

import type { ReactiveController, ReactiveElement } from 'lit';

import { bound } from '../decorators/bound.js';
import { Logger } from './logger.js';

interface AnonymousSlot {
  nodes: Element[]
}
interface NamedSlot extends AnonymousSlot {
  name: string;
}

export type Slot = NamedSlot|AnonymousSlot;

const isSlot =
  <T extends Element = Element>(n: string) =>
    (child: Element): child is T =>
      child.getAttribute('slot') === n;

const defaultSlot = Symbol('default slot');

export class SlotController implements ReactiveController {
  private nodes = new Map<string|symbol, { nodes: Element[] }>();

  private logger: Logger;

  mo = new MutationObserver(this.init);

  constructor(public host: ReactiveElement, public slots: (string|null)[] = [null]) {
    this.logger = new Logger(this.host);
    host.addController(this);
  }

  hostConnected() {
    this.mo.observe(this.host, { childList: true });
    this.init();
  }

  hostDisconnected() {
    this.mo.disconnect();
  }

  /**
   * Returns a boolean statement of whether or not that slot exists in the light DOM.
   *
   * @param {String|Array} name The slot name.
   * @example this.hasSlotted("header");
   */
  hasSlotted(...names: string[]): boolean {
    if (!names.length) {
      this.logger.warn(`Please provide at least one slot name for which to search.`);
      return false;
    }

    return names.some(n => Array.from(this.host.children).some(isSlot(n)));
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
  getSlotted<T extends Element = Element>(...names: string[]): T[] {
    // TODO: use the cached children
    const children = Array.from(this.host.children) as T[];
    if (names.length === 0)
      return children.filter(x => !x.hasAttribute('slot'));
    else
      return names.flatMap(x => children.filter(isSlot(x)));
  }

  private getNodesFor(slot: string|symbol): Element[] {
    if (typeof slot === 'string') {
      const prefixedNodes = this.getSlotted(`${this.host.localName}--${slot}`);
      const unprefxdNodes = this.getSlotted(`${slot}`);
      return prefixedNodes.length ? prefixedNodes : unprefxdNodes;
      // If it's the default slot, look for direct children not assigned to a slot
    } else
      return [...this.host.children].filter(child => !child.hasAttribute('slot'));
  }

  @bound private initSlot(slot: string|null) {
    // if a name was specified, normalize it by removing BEM-style qualifiers
    // slot &&= slot?.replace?.(/^(.*)--/, '');
    // Only attach the information if the data provided is a schema object
    const name = slot || defaultSlot;
    const nodes = this.getNodesFor(name);

    this.nodes.set(name, { nodes });

    const slotExists = slot ? !!nodes.length : true;

    this.logger.log(slot, slotExists);

    const nameForAttr = slot || 'body';
    // If the slot exists, attach an attribute to the parent to indicate that
    // @TODO: these should be specified per-component. See PFE Proposals
    this.host.toggleAttribute(`has_${nameForAttr}`, slotExists);
    this.host.toggleAttribute(`has-${nameForAttr}`, slotExists);
  }

  /**
   * Maps the defined slots into an object that is easier to query
   */
  @bound private init() {
    this.logger.log('Validate slots...');

    // Loop over the properties provided by the schema
    this.slots.forEach(this.initSlot);

    this.logger.log('Slots validated.');
  }
}

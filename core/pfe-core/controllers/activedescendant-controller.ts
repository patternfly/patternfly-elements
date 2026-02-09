import type { ReactiveControllerHost } from 'lit';

import { type ATFocusControllerOptions, ATFocusController } from './at-focus-controller.js';

import { isServer, nothing } from 'lit';
import { getRandomId } from '../functions/random.js';
import { bound } from '../decorators/bound.js';

export interface ActivedescendantControllerOptions<
  Item extends HTMLElement
> extends ATFocusControllerOptions<Item> {
  /**
   * Returns a reference to the element which acts as the assistive technology container for
   * the items. In the case of a combobox, this is the input element.
   */
  getActiveDescendantContainer(): HTMLElement | null;
  /**
   * Optional callback to control the assistive technology focus behavior of items.
   * By default, ActivedescendantController will not do anything special to items when they receive
   * assistive technology focus, and will only set the `activedescendant` property on the container.
   * If you provide this callback, ActivedescendantController will call it on your item with the
   * active state. You may use this to set active styles.
   */
  setItemActive?(item: Item, active: boolean): void;
  /**
   * Optional callback to retrieve the value from an option element.
   * By default, retrieves the `value` attribute, or the text content.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement
   */
  getItemValue?(item: Item): string;
}

/**
 * Implements activedescendant pattern, as described in WAI-ARIA practices,
 * [Managing Focus in Composites Using aria-activedescendant][ad]
 *
 * The steps for using the aria-activedescendant method of managing focus are as follows.
 *
 *  - When the container element that has a role that supports aria-activedescendant is loaded
 *    or created, ensure that:
 *    - The container element is included in the tab sequence as described in
 *      Keyboard Navigation Between Components or is a focusable element of a composite
 *      that implements a roving tabindex.
 *    - It has aria-activedescendant="IDREF" where IDREF is the ID of the element within
 *      the container that should be identified as active when the widget receives focus.
 *      The referenced element needs to meet the DOM relationship requirements described below.
 *  - When the container element receives DOM focus, draw a visual focus indicator on the active
 *    element and ensure the active element is scrolled into view.
 *  - When the composite widget contains focus and the user presses a navigation key that moves
 *    focus within the widget, such as an arrow key:
 *    - Change the value of aria-activedescendant on the container to refer to the element
 *      that should be reported to assistive technologies as active.
 *    - Move the visual focus indicator and, if necessary, scrolled the active element into view.
 *  - If the design calls for a specific element to be focused the next time a user moves focus
 *    into the composite with Tab or Shift+Tab, check if aria-activedescendant is referring to
 *    that target element when the container loses focus. If it is not, set aria-activedescendant
 *    to refer to the target element.
 *
 * The specification for aria-activedescendant places important restrictions on the
 * DOM relationship between the focused element that has the aria-activedescendant attribute
 * and the element referenced as active by the value of the attribute.
 * One of the following three conditions must be met.
 *
 * 1. The element referenced as active is a DOM descendant of the focused referencing element.
 * 2. The focused referencing element has a value specified for the aria-owns property that
 *    includes the ID of the element referenced as active.
 * 3. The focused referencing element has role of combobox, textbox, or searchbox
 *    and has aria-controls property referring to an element with a role that supports
 *    aria-activedescendant and either:
 *   1. The element referenced as active is a descendant of the controlled element.
 *   2. The controlled element has a value specified for the aria-owns property that includes
 *      the ID of the element referenced as active.
 *
 * [ad]: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_focus_activedescendant
 */
export class ActivedescendantController<
  Item extends HTMLElement = HTMLElement
> extends ATFocusController<Item> {
  /**
   * When true, the browser supports cross-root ARIA such that the controller does not need
   * to copy item nodes into the controlling nodes' root
   */
  public static get supportsCrossRootActiveDescendant(): boolean {
    return !isServer && 'ariaActiveDescendantElement' in HTMLElement.prototype;
  }

  static of<Item extends HTMLElement>(
    host: ReactiveControllerHost,
    options: ActivedescendantControllerOptions<Item>,
  ): ActivedescendantController<Item> {
    return new ActivedescendantController(host, options);
  }

  /** Maps from original element to shadow DOM clone */
  #lightToShadowMap = new WeakMap<Item, Item>();

  /** Maps from shadow DOM clone to original element */
  #shadowToLightMap = new WeakMap<Item, Item>();

  /** Set of item which should not be cloned */
  #noCloneSet = new WeakSet<Item>();

  /** Element which controls the list i.e. combobox */
  #controlsElements: HTMLElement[] = [];

  #observing = false;

  #listMO = new MutationObserver(records => this.#onItemsDOMChange(records));

  #attrMO = new MutationObserver(records => this.#onItemAttributeChange(records));

  #syncAttr(attributeName: string, fromNode: Item) {
    const toNode = this.#shadowToLightMap.get(fromNode as Item)
                ?? this.#lightToShadowMap.get(fromNode as Item);
    const newVal = fromNode.getAttribute(attributeName);
    const oldVal = toNode?.getAttribute(attributeName);
    if (!fromNode.hasAttribute(attributeName)) {
      toNode?.removeAttribute(attributeName);
    } else if (oldVal !== newVal) {
      toNode?.setAttribute(attributeName, newVal!);
    }
  }

  get atFocusedItemIndex(): number {
    return super.atFocusedItemIndex;
  }

  /**
   * Rather than setting DOM focus, applies the `aria-activedescendant` attribute,
   * using AriaIDLAttributes for cross-root aria, if supported by the browser
   * @param item item
   */
  set atFocusedItemIndex(index: number) {
    super.atFocusedItemIndex = index;
    const item = this._items.at(this.atFocusedItemIndex);
    for (const _item of this.items) {
      const isActive = _item === item;
      // Map clone back to original item for setItemActive callback
      const originalItem = this.#shadowToLightMap.get(_item) ?? _item;
      this.options.setItemActive?.(originalItem, isActive);
    }
    const container = this.options.getActiveDescendantContainer();
    if (!ActivedescendantController.supportsCrossRootActiveDescendant) {
      container?.setAttribute('aria-activedescendant', item?.id ?? '');
    } else if (container) {
      container.ariaActiveDescendantElement = item ?? null;
    }
    this.host.requestUpdate();
  }

  protected get controlsElements(): HTMLElement[] {
    return this.#controlsElements;
  }

  protected set controlsElements(elements: HTMLElement[]) {
    // Avoid removing/re-adding listeners if elements haven't changed
    // This prevents breaking event listeners during active event dispatch
    if (elements.length === this.#controlsElements.length
        && elements.every((el, i) => el === this.#controlsElements[i])) {
      return;
    }
    for (const old of this.#controlsElements) {
      old?.removeEventListener('keydown', this.onKeydown);
    }
    this.#controlsElements = elements;
    for (const element of this.#controlsElements) {
      element.addEventListener('keydown', this.onKeydown);
    }
  }

  /**
   * Check the source item's focusable state, not the clone's.
   * This is needed because filtering sets `hidden` on the light DOM item,
   * and the MutationObserver sync to clones is asynchronous.
   */
  override get atFocusableItems(): Item[] {
    return this._items.filter(item => {
      // Map clone to source item to check actual hidden state
      const sourceItem = this.#shadowToLightMap.get(item) ?? item;
      return !!sourceItem
          && sourceItem.ariaHidden !== 'true'
          && !sourceItem.hasAttribute('inert')
          && !sourceItem.hasAttribute('hidden');
    });
  }

  /** All items */
  get items() {
    return this._items;
  }

  /**
   * Sets the list of items and activates the next activatable item after the current one
   * @param items tabindex items
   */
  override set items(items: Item[]) {
    const container = this.options.getItemsContainer?.() ?? this.host;
    if (!(container instanceof HTMLElement)) {
      throw new Error('items container must be an HTMLElement');
    }
    this.itemsContainerElement = container;
    const { supportsCrossRootActiveDescendant } = ActivedescendantController;
    if (supportsCrossRootActiveDescendant
        || [container] // all nodes are in the same root
            .concat(this.controlsElements)
            .concat(items)
            .every((node, _, a) => node.getRootNode() === a[0].getRootNode())) {
      this._items = items.map(x => {
        if (!supportsCrossRootActiveDescendant) {
          x.id ||= getRandomId();
        }
        return x;
      });
    } else {
      this._items = items?.map((item: Item) => {
        item.removeAttribute('tabindex');
        if (container.contains(item)) {
          item.id ||= getRandomId();
          this.#noCloneSet.add(item);
          this.#shadowToLightMap.set(item, item);
          return item;
        } else {
          // Reuse existing clone if available to maintain stable IDs
          const existingClone = this.#lightToShadowMap.get(item);
          if (existingClone) {
            return existingClone;
          }
          const clone = item.cloneNode(true) as Item;
          clone.id = getRandomId();
          this.#lightToShadowMap.set(item, clone);
          this.#shadowToLightMap.set(clone, item);
          // Though efforts were taken to disconnect
          // this observer, it may still be a memory leak
          this.#attrMO.observe(clone, { attributes: true });
          this.#attrMO.observe(item, { attributes: true });
          return clone;
        }
      });
    }
  }

  private constructor(
    public host: ReactiveControllerHost,
    protected options: ActivedescendantControllerOptions<Item>,
  ) {
    super(host, options);
    this.initItems();
    this.options.getItemValue ??= function(this: Item) {
      return (this as unknown as HTMLOptionElement).value;
    };
  }

  #onItemsDOMChange(records: MutationRecord[]) {
    for (const { removedNodes } of records) {
      for (const removed of removedNodes as NodeListOf<Item>) {
        this.#lightToShadowMap.get(removed)?.remove();
        this.#lightToShadowMap.delete(removed);
      }
    }
  };

  #onItemAttributeChange(records: MutationRecord[]) {
    for (const { target, attributeName } of records) {
      if (attributeName) {
        this.#syncAttr(attributeName, target as Item);
      }
    }
  };

  /** @internal */
  override initItems(): void {
    this.#attrMO.disconnect();
    super.initItems();
    this.controlsElements = this.options.getControlsElements?.() ?? [];
    if (!this.#observing && this.itemsContainerElement && this.itemsContainerElement.isConnected) {
      this.#listMO.observe(this.itemsContainerElement, { childList: true });
      this.#observing = true;
    }
  }

  hostDisconnected(): void {
    this.controlsElements = [];
    this.#observing = false;
    this.#listMO.disconnect();
    this.#attrMO.disconnect();
  }

  @bound
  protected override onKeydown(event: KeyboardEvent): void {
    if (!event.ctrlKey
        && !event.altKey
        && !event.metaKey
        && !!this.atFocusableItems.length) {
      super.onKeydown(event);
    };
  }

  public renderItemsToShadowRoot(): typeof nothing | Node[] {
    if (ActivedescendantController.supportsCrossRootActiveDescendant) {
      return nothing;
    } else {
      return this.items?.filter(x => !this.#noCloneSet.has(x));
    }
  }
}

import type { ReactiveControllerHost } from 'lit';

import { type ATFocusControllerOptions, ATFocusController } from './at-focus-controller.js';

import { nothing } from 'lit';
import { getRandomId } from '../functions/random.js';

export interface ActivedescendantControllerOptions<
  Item extends HTMLElement
> extends ATFocusControllerOptions<Item> {
  /**
   * Optional callback to control the assistive technology focus behavior of items.
   * By default, ActivedescendantController will not do anything special to items when they receive
   * assistive technology focus, and will only set the `activedescendant` property on the container.
   * If you provide this callback, ActivedescendantController will call it on your item with the
   * active state. You may use this to set active styles.
   */
  setItemActive?(this: Item, active: boolean): void;
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
  public static get canControlLightDom(): boolean {
    return 'ariaActiveDescendantElement' in HTMLElement.prototype;
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

  #mo = new MutationObserver(records => this.onMutation(records));

  #attrMO = new MutationObserver(records => {
    for (const { target, attributeName } of records) {
      if (attributeName) {
        if (this.#shadowToLightMap.has(target as Item)) {
          const shadow = target as Item;
          const light = this.#shadowToLightMap.get(shadow);
          const newVal = shadow.getAttribute(attributeName);
          const oldVal = light?.getAttribute(attributeName);
          if (oldVal !== newVal) {
            light?.setAttribute(attributeName, newVal!);
          }
        } else if (this.#lightToShadowMap.has(target as Item)) {
          const light = target as Item;
          const shadow = this.#lightToShadowMap.get(light);
          const newVal = light.getAttribute(attributeName);
          const oldVal = shadow?.getAttribute(attributeName);
          if (oldVal !== newVal) {
            shadow?.setAttribute(attributeName, newVal!);
          }
        }
      }
    }
  });

  // #atFocusedItem: Item | null = null;

  #atFocusedItemIndex = -1;

  get atFocusedItemIndex(): number {
    return this.#atFocusedItemIndex;
    // return this.#shadowToLightMap.get(shadowItem!) ?? shadowItem;
    // return this.#atFocusedItem;
  }

  /**
   * Rather than setting DOM focus, applies the `aria-activedescendant` attribute,
   * using AriaIDLAttributes for cross-root aria, if supported by the browser
   * @param item item
   */
  set atFocusedItemIndex(index: number) {
    this.#atFocusedItemIndex = index;
    let lightItem = this._items.at(index);
    let shadowItem = this._items.at(index);
    while (!shadowItem || !this.atFocusableItems.includes(shadowItem)) {
      if (index < 0) {
        index = this.items.length;
      } else if (index >= this.items.length) {
        index = 0;
      } else {
        index = index + 1;
      }
      this.#atFocusedItemIndex = index;
      lightItem = this._items.at(index);
      shadowItem = this._items.at(index);
    }
    for (const item of this.items) {
      this.options.setItemActive?.call(item, item === lightItem || item === shadowItem);
    }
    if (this.itemsContainerElement) {
      for (const el of [this.itemsContainerElement, ...this.#controlsElements]) {
        if (!ActivedescendantController.canControlLightDom) {
          el?.setAttribute('aria-activedescendant', shadowItem?.id ?? '');
        } else if (el) {
          el.ariaActiveDescendantElement = lightItem ?? null;
        }
      }
    }
    this.host.requestUpdate();
  }

  get controlsElements(): HTMLElement[] {
    return this.#controlsElements;
  }

  set controlsElements(elements: HTMLElement[]) {
    for (const old of this.#controlsElements) {
      old?.removeEventListener('keydown', this.onKeydown);
    }
    this.#controlsElements = elements;
    for (const element of this.#controlsElements) {
      element.addEventListener('keydown', this.onKeydown);
    }
  }

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
    this._items =
        ActivedescendantController.canControlLightDom ? items
      : items?.map((item: Item) => {
        item.removeAttribute('tabindex');
        if (container.contains(item)) {
          item.id ||= getRandomId();
          this.#noCloneSet.add(item);
          this.#shadowToLightMap.set(item, item);
          return item;
        } else {
          const clone = item.cloneNode(true) as Item;
          this.#lightToShadowMap.set(item, clone);
          this.#shadowToLightMap.set(clone, item);
          // QUESTION memory leak?
          this.#attrMO.observe(clone, { attributes: true });
          this.#attrMO.observe(item, { attributes: true });
          clone.id = getRandomId();
          return clone;
        }
      });
    const next = this.atFocusableItems.find(((_, i) => i !== this.#atFocusedItemIndex));
    const activeItem = next ?? this.firstATFocusableItem;
    this.#atFocusedItemIndex = this._items.indexOf(activeItem!);
  }

  private constructor(
    public host: ReactiveControllerHost,
    protected options: ActivedescendantControllerOptions<Item>,
  ) {
    super(host, options);
  }

  private onMutation = (records: MutationRecord[]) => {
    // todo: respond to attrs changing on lightdom nodes
    for (const { removedNodes } of records) {
      for (const removed of removedNodes as NodeListOf<Item>) {
        this.#lightToShadowMap.get(removed)?.remove();
        this.#lightToShadowMap.delete(removed);
      }
    }
  };

  protected override initItems(): void {
    super.initItems();
    this.controlsElements = this.options.getControlsElements?.() ?? [];
    if (!this.#observing && this.itemsContainerElement && this.itemsContainerElement.isConnected) {
      this.#mo.observe(this.itemsContainerElement, { attributes: true, childList: true });
      this.#observing = true;
    }
  }

  hostDisconnected(): void {
    this.#observing = false;
    this.#mo.disconnect();
  }

  protected override isRelevantKeyboardEvent(event: Event): event is KeyboardEvent {
    return !(!(event instanceof KeyboardEvent)
      || event.ctrlKey
      || event.altKey
      || event.metaKey
      || !this.atFocusableItems.length);
  }


  public renderItemsToShadowRoot(): typeof nothing | Node[] {
    if (ActivedescendantController.canControlLightDom) {
      return nothing;
    } else {
      return this.items?.filter(x => !this.#noCloneSet.has(x));
    }
  }
}

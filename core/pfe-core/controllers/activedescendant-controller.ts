import type { ReactiveControllerHost } from 'lit';

import { type ATFocusControllerOptions, ATFocusController } from './at-focus-controller.js';

import { nothing } from 'lit';
import { getRandomId } from '../functions/random.js';

export interface ActivedescendantControllerOptions<
  Item extends HTMLElement
> extends ATFocusControllerOptions<Item> {
  getItemsControlsElement: () => HTMLElement | null;
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
  private static IDLAttrsSupported = 'ariaActiveDescendantElement' in HTMLElement.prototype;

  public static canControlLightDom(): boolean {
    return this.IDLAttrsSupported;
  }

  static of<Item extends HTMLElement>(
    host: ReactiveControllerHost,
    options: ActivedescendantControllerOptions<Item>,
  ): ActivedescendantController<Item> {
    return new ActivedescendantController(host, options);
  }

  /** Maps from original element to shadow DOM clone */
  #cloneMap = new WeakMap<Item, Item>();

  /** Set of item which should not be cloned */
  #noCloneSet = new WeakSet<Item>();

  /** Element which controls the list i.e. combobox */
  #itemsControlsElement: HTMLElement | null = null;

  #options: ActivedescendantControllerOptions<Item>;

  private constructor(
    public host: ReactiveControllerHost,
    options: ActivedescendantControllerOptions<Item>,
  ) {
    super(host, options);
    this.#options = options;
    this.itemsControlsElement = this.#options.getItemsControlsElement();
  }

  hostConnected(): void {
    this.itemsControlsElement = this.#options.getItemsControlsElement();
  }

  get itemsControlsElement() {
    return this.#itemsControlsElement ?? null;
  }

  set itemsControlsElement(element: HTMLElement | null) {
    const oldController = this.#itemsControlsElement;
    oldController?.removeEventListener('keydown', this.onKeydown);
    this.#itemsControlsElement = element;
    if (element && oldController !== element) {
      element.addEventListener('keydown', this.onKeydown);
    }
  }

  public renderItemsToShadowRoot(): typeof nothing | Node[] {
    if (ActivedescendantController.canControlLightDom()) {
      return nothing;
    } else {
      return this.items.filter(x => !this.#noCloneSet.has(x));
    }
  }

  protected override isRelevantKeyboardEvent(event: Event): event is KeyboardEvent {
    return !(!(event instanceof KeyboardEvent)
      || event.ctrlKey
      || event.altKey
      || event.metaKey
      || !this.atFocusableItems.length);
  }

  #registerItemsPriorToPossiblyCloning = (item: Item) => {
    if (this.itemsContainerElement?.contains(item)) {
      item.id ||= getRandomId();
      this.#noCloneSet.add(item);
      return item;
    } else {
      const clone = item.cloneNode(true) as Item;
      this.#cloneMap.set(item, clone);
      clone.id = getRandomId();
      return clone;
    }
  };

  /**
   * Sets the list of items and activates the next activatable item after the current one
   * @param items tabindex items
   */
  override set items(items: Item[]) {
    super.items = (ActivedescendantController.IDLAttrsSupported ? items
      : items
          ?.map(this.#registerItemsPriorToPossiblyCloning)
          ?.filter(x => !!x));
    const [first] = this.atFocusableItems;
    const atFocusedItemIndex = this.atFocusableItems.indexOf(this.atFocusedItem!);
    const next = this.atFocusableItems.find(((_, i) => i !== atFocusedItemIndex));
    const activeItem = next ?? first ?? this.firstATFocusableItem;
    this.atFocusedItem = activeItem;
  }

  /**
   * Rather than setting DOM focus, applies the `aria-activedescendant` attribute,
   * using AriaIDLAttributes for cross-root aria, if supported by the browser
   * @param item item
   */
  override set atFocusedItem(item: Item | null) {
    super.atFocusedItem = item;
    if (this.itemsContainerElement && this.itemsControlsElement) {
      if (ActivedescendantController.IDLAttrsSupported) {
        this.itemsControlsElement.ariaActiveDescendantElement = item ?? null;
      } else {
        for (const el of [
          this.itemsContainerElement,
          this.itemsControlsElement,
        ]) {
          el?.setAttribute('aria-activedescendant', item?.id ?? '');
        }
      }
    }
    this.host.requestUpdate();
  }
}

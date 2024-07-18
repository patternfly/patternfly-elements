import type { ListboxAccessibilityController } from './listbox-controller.js';
import type { ReactiveController, ReactiveControllerHost } from 'lit';

import { nothing } from 'lit';
import { getRandomId } from '../functions/random.js';

const isActivatableElement = (el: Element): el is HTMLElement =>
  !!el
  && !el.ariaHidden
  && !el.hasAttribute('hidden');

export interface ActivedescendantControllerOptions<Item extends HTMLElement> {
  getOwningElement: () => HTMLElement | null;
  getItems: () => Item[];
  getItemsContainer?: () => HTMLElement | null;
  // todo: maybe this needs to be "horizontal"| "vertical" | "undefined" | "grid"
  getOrientation?(): 'horizontal' | 'vertical' | 'undefined';
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
> implements ReactiveController, ListboxAccessibilityController<Item> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static hosts = new WeakMap<ReactiveControllerHost, ActivedescendantController<any>>();

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

  /** active element */
  #activeItem?: Item;

  /** accessibility container of items */
  #itemsContainerElement?: Element;

  /** accessibility controllers of items */
  #ownerElement?: Element;

  /** array of all activatable elements */
  #items: Item[] = [];

  /**
   * finds focusable items from a group of items
   */
  get #activatableItems(): Item[] {
    return this.items.filter(isActivatableElement);
  }

  /**
   * index of active item in array of focusable items
   */
  get #activeIndex(): number {
    return !!this.#activatableItems
      && !!this.activeItem ? this.#activatableItems.indexOf(this.activeItem) : -1;
  }

  /**
   * index of active item in array of items
   */
  get #itemIndex(): number {
    return this.activeItem ? this.items.indexOf(this.activeItem) : -1;
  }

  /**
   * active item of array of items
   */
  get activeItem(): Item | undefined {
    return this.#activeItem;
  }

  /**
   * all items from array
   */
  get items(): Item[] {
    return this.#items;
  }

  /**
   * all focusable items from array
   */
  get focusableItems(): Item[] {
    return this.#activatableItems;
  }

  /**
   * first item in array of focusable items
   */
  get firstItem(): Item | undefined {
    return this.#activatableItems.at(0);
  }

  /**
   * last item in array of focusable items
   */
  get lastItem(): Item | undefined {
    return this.#activatableItems.at(-1);
  }

  /**
   * next item  after active item in array of focusable items
   */
  get nextItem(): Item | undefined {
    return (
      this.#activeIndex >= this.#activatableItems.length - 1 ? this.firstItem
        : this.#activatableItems[this.#activeIndex + 1]
    );
  }

  /**
   * previous item  after active item in array of focusable items
   */
  get prevItem(): Item | undefined {
    return (
      this.#activeIndex > 0 ? this.#activatableItems[this.#activeIndex - 1]
        : this.lastItem
    );
  }

  #options: Required<ActivedescendantControllerOptions<Item>>;

  #cloneMap = new WeakMap();
  #noCloneSet = new WeakSet();

  private constructor(
    public host: ReactiveControllerHost,
    options: ActivedescendantControllerOptions<Item>,
  ) {
    this.#options = options as Required<ActivedescendantControllerOptions<Item>>;
    this.#options.getItemsContainer ??= () => host instanceof HTMLElement ? host : null;
    this.#options.getOrientation ??= () =>
      this.#itemsContainerElement?.getAttribute('aria-orientation') as
        'horizontal' | 'vertical' | 'undefined';
    const instance = ActivedescendantController.hosts.get(host);
    if (instance) {
      return instance as unknown as ActivedescendantController<Item>;
    }
    ActivedescendantController.hosts.set(host, this);
    this.host.addController(this);
    this.updateItems();
  }

  hostUpdated(): void {
    const oldContainer = this.#itemsContainerElement;
    const oldController = this.#ownerElement;
    const container = this.#options.getItemsContainer();
    const controller = this.#options.getOwningElement();
    if (container && controller && (
      container !== oldContainer
      || controller !== oldController)) {
      this.#initDOM(container, controller);
    }
  }

  /**
   * removes event listeners from items container
   */
  hostDisconnected(): void {
    this.#itemsContainerElement?.removeEventListener('keydown', this.#onKeydown);
    this.#itemsContainerElement = undefined;
  }

  public renderItemsToShadowRoot(): typeof nothing | Node[] {
    if (ActivedescendantController.canControlLightDom()) {
      return nothing;
    } else {
      return this.items.filter(x => !this.#noCloneSet.has(x));
    }
  }

  /**
   * Sets the focus of assistive technology to the item
   * In the case of Active Descendant, does not change the DOM Focus
   * @param item item
   */
  public setATFocus(item?: Item): void {
    this.#activeItem = item;
    this.#applyAriaRelationship(item);
    this.host.requestUpdate();
  }

  #registerItemsPriorToPossiblyCloning = (item: Item) => {
    if (this.#itemsContainerElement?.contains(item)) {
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
  public updateItems(items: Item[] = this.#options.getItems?.() ?? []): void {
    this.#items = ActivedescendantController.IDLAttrsSupported ? items
      : items
          .map(this.#registerItemsPriorToPossiblyCloning)
          .filter(x => !!x);
    const [first] = this.#activatableItems;
    const next = this.#activatableItems.find(((_, i) => i !== this.#itemIndex));
    const activeItem = next ?? first ?? this.firstItem;
    this.setATFocus(activeItem);
  }

  #initDOM(container: HTMLElement, owner: HTMLElement) {
    this.#itemsContainerElement = container;
    this.#ownerElement = owner;
    owner.addEventListener('keydown', this.#onKeydown);
    this.updateItems();
  }

  #applyAriaRelationship(item?: Item) {
    if (this.#itemsContainerElement && this.#ownerElement) {
      if (ActivedescendantController.IDLAttrsSupported) {
        this.#ownerElement.ariaActiveDescendantElement = item ?? null;
      } else {
        for (const el of [
          this.#itemsContainerElement,
          this.#ownerElement,
        ]) {
          el?.setAttribute('aria-activedescendant', item?.id ?? '');
        }
      }
    }
  }

  /**
   * handles keyboard activation of items
   * @param event keydown event
   */
  #onKeydown = (event: Event) => {
    if (!(event instanceof KeyboardEvent)
        || event.ctrlKey
        || event.altKey
        || event.metaKey
        || !this.#activatableItems.length) {
      return;
    }

    const orientation = this.#options.getOrientation();
    const verticalOnly = orientation === 'vertical';
    const item = this.activeItem;
    const horizontalOnly =
        orientation === 'horizontal'
     || item?.localName === 'select'
     || item?.getAttribute('role') === 'spinbutton';

    switch (event.key) {
      case 'ArrowLeft':
        if (verticalOnly) {
          return;
        }
        this.setATFocus(this.prevItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'ArrowRight':
        if (verticalOnly) {
          return;
        }
        this.setATFocus(this.nextItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'ArrowUp':
        if (horizontalOnly) {
          return;
        }
        this.setATFocus(this.prevItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'ArrowDown':
        if (horizontalOnly) {
          return;
        }
        this.setATFocus(this.nextItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'Home':
        this.setATFocus(this.firstItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'End':
        this.setATFocus(this.lastItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      default:
        break;
    }
  };
}

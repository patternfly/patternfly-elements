import type { ListboxAccessibilityController } from './listbox-controller.js';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { getRandomId } from '../functions/random.js';

const isActivatableElement = (el: Element): el is HTMLElement =>
  !!el
  && !el.ariaHidden
  && !el.hasAttribute('hidden');

export interface ActivedescendantControllerOptions<Item extends HTMLElement> {
  getControllingElement: () => HTMLElement | null;
  getItems?: () => Item[];
  getItemContainer: () => HTMLElement | null;
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
  private static hosts = new WeakMap<ReactiveControllerHost, ActivedescendantController>();

  private static IDLAttrsSupported = 'ariaActiveDescendantElement' in HTMLElement.prototype;

  static of<Item extends HTMLElement>(
    host: ReactiveControllerHost,
    options: ActivedescendantControllerOptions<Item> & { getItems(): Item[] },
  ): ActivedescendantController<Item> {
    return new ActivedescendantController(host, options);
  }

  /** active element */
  #activeItem?: Item;

  /** accessibility container of items */
  #ancestor?: Element;

  /** accessibility controllers of items */
  #controller?: Element;

  /** array of all activatable elements */
  #items: Item[] = [];

  /**
   * finds focusable items from a group of items
   */
  get #activatableItems(): Item[] {
    return this.#items.filter(isActivatableElement);
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
    return this.activeItem ? this.#items.indexOf(this.activeItem) : -1;
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
    return this.#activatableItems[0];
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

  #options: ActivedescendantControllerOptions<Item>;

  constructor(
    public host: ReactiveControllerHost,
    options: ActivedescendantControllerOptions<Item>,
  ) {
    this.#options = options;
    const instance = ActivedescendantController.hosts.get(host);
    if (instance) {
      return instance as ActivedescendantController<Item>;
    }
    ActivedescendantController.hosts.set(host, this);
    this.host.addController(this);
    this.updateItems();
  }

  #liftMO = new MutationObserver(this.#onMutation);

  #liftOptions() {
    if (this.#ancestor) {
      this.#liftMO.observe(this.#ancestor);
    }
  }

  #onMutation(/* records: MutationRecord[]*/) {
    // todo: copy listbox items to shadowroot
  }

  hostUpdated(): void {
    const oldContainer = this.#ancestor;
    const oldController = this.#controller;
    const container = this.#options.getItemContainer();
    const controller = this.#options.getControllingElement();
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
    this.#ancestor?.removeEventListener('keydown', this.#onKeydown);
    this.#ancestor = undefined;
  }

  #initDOM(ancestor: HTMLElement, controller: HTMLElement) {
    this.#ancestor = ancestor;
    this.#controller = controller;
    controller.addEventListener('keydown', this.#onKeydown);
    this.updateItems();
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

    const orientation = this.#options.getControllingElement()
        ?.getAttribute('aria-orientation');
    const verticalOnly = orientation === 'vertical';
    const item = this.activeItem;
    const horizontalOnly =
     !!item
     && (item.tagName === 'SELECT'
     || item.getAttribute('role') === 'spinbutton'
     || orientation === 'horizontal');

    switch (event.key) {
      case 'ArrowLeft':
        if (verticalOnly) {
          return;
        }
        this.setActiveItem(this.prevItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'ArrowUp':
        if (horizontalOnly) {
          return;
        }
        this.setActiveItem(this.prevItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'ArrowRight':
        if (verticalOnly) {
          return;
        }
        this.setActiveItem(this.nextItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'ArrowDown':
        if (horizontalOnly) {
          return;
        }
        this.setActiveItem(this.nextItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'Home':
        this.setActiveItem(this.firstItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      case 'End':
        this.setActiveItem(this.lastItem);
        event.stopPropagation();
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  /**
   * Sets the active item and focuses it
   * @param item tabindex item
   */
  setActiveItem(item?: Item): void {
    this.#activeItem = item;
    if (this.#ancestor) {
      if (ActivedescendantController.IDLAttrsSupported) {
        // @ts-expect-error: waiting on tslib: https://w3c.github.io/aria/#ref-for-dom-ariamixin-ariaactivedescendantelement-1
        this.#controller.ariaActiveDescendantElement =
          item;
      } else {
        for (const el of [this.#ancestor, this.#controller]) {
          el?.setAttribute('aria-activedescendant', item?.id ?? '');
        }
      }
      this.host.requestUpdate();
    }
  }

  /**
   * Sets the list of items and activates the next activatable item after the current one
   * @param items tabindex items
   */
  updateItems(items: Item[] = this.#options.getItems?.() ?? []): void {
    if (!ActivedescendantController.IDLAttrsSupported) {
      for (const item of items) {
        item.id ??= getRandomId(item.localName);
      }
    }

    if (!ActivedescendantController.IDLAttrsSupported) {
      this.#liftOptions();
    }

    this.#items = items;
    const [first] = this.#activatableItems;
    const next = this.#activatableItems.find(((_, i) => i !== this.#itemIndex));
    const activeItem = next ?? first ?? this.firstItem;
    this.setActiveItem(activeItem);
  }
}

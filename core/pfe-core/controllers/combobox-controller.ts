import { nothing, type ReactiveController, type ReactiveControllerHost } from 'lit';
import type { ActivedescendantControllerOptions } from './activedescendant-controller.js';
import type { RovingTabindexControllerOptions } from './roving-tabindex-controller.js';
import type { ATFocusController } from './at-focus-controller';
import type { ListboxControllerOptions } from './listbox-controller.js';

import { ListboxController, isItem, isItemDisabled } from './listbox-controller.js';
import { RovingTabindexController } from './roving-tabindex-controller.js';
import { ActivedescendantController } from './activedescendant-controller.js';
import { InternalsController } from './internals-controller.js';
import { getRandomId } from '../functions/random.js';
import type { RequireProps } from '../core.js';

type AllOptions<Item extends HTMLElement> =
    ActivedescendantControllerOptions<Item>
  & ListboxControllerOptions<Item>
  & RovingTabindexControllerOptions<Item>;

function getItemValue<Item extends HTMLElement>(this: Item): string {
  if ('value' in this && typeof this.value === 'string') {
    return this.value;
  } else {
    return '';
  }
}

function filterItemOut<Item extends HTMLElement>(this: Item, value: string): boolean {
  return !getItemValue.call(this)
      .toLowerCase()
      .startsWith(value.toLowerCase());
}

function setComboboxValue(this: HTMLElement, value: string): void {
  if (!('value' in this)) {
    // eslint-disable-next-line no-console
    return console.warn(`Cannot set value on combobox element ${this.localName}`);
  } else {
    this.value = value;
  }
}

function getComboboxValue(this: HTMLElement): string {
  if ('value' in this && typeof this.value === 'string') {
    return this.value;
  } else {
    // eslint-disable-next-line no-console
    return console.warn(`Cannot get value from combobox element ${this.localName}`), '';
  }
}

export interface ComboboxControllerOptions<Item extends HTMLElement> extends
  Omit<AllOptions<Item>,
    | 'getATFocusedItem'
    | 'getControlsElements'
    | 'getActiveDescendantContainer'
    | 'getItemsContainer'> {
  /**
   * Predicate which establishes whether the listbox is expanded
   * e.g. `isExpanded: () => this.expanded`, if the host's `expanded` property
   * should correspond to the listbox expanded state.
   */
  isExpanded(): boolean;
  /**
   * Callback which the host must implement to change the expanded state to true.
   * Return or resolve false to prevent the change.
   */
  requestShowListbox(): boolean | Promise<boolean>;
  /**
   * Callback which the host must implement to change the expanded to false.
   * Return or resolve false to prevent the default.
   */
  requestHideListbox(): boolean | Promise<boolean>;
  /**
   * Returns the listbox container element
   */
  getListboxElement(): HTMLElement | null;
  /**
   * Returns the toggle button, if it exists
   */
  getToggleButton(): HTMLElement | null;
  /**
   * Returns the combobox input, if it exists
   */
  getComboboxInput(): HTMLElement | null;
  /**
   * Returns the label for the toggle button, combobox input, and listbox.
   * when `ariaLabelledByElements` is supported, the label elements associated with
   * the host element are used instead, and this value is ignored.
   */
  getFallbackLabel(): string;
  /**
   * Called on an item to retrieve it's value string. By default, returns the `value` property
   * of the item, as if it implemented the `<option>` element's interface.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement
   */
  getItemValue?(this: Item): string;
  /**
   * Optional callback, called on the combobox input element to set its value.
   * by default, returns the element's `value` DOM property.
   */
  getComboboxValue?(this: HTMLElement): string;
  /**
   * Optional callback, called on the combobox input element to set its value.
   * by default, sets the element's `value` DOM property.
   */
  setComboboxValue?(this: HTMLElement, value: string): void;
  /**
   * Called on each item, with the combobox input, to determine if the item should be shown in the
   * listbox or filtered out. Return false to hide the item. By default, checks whether the item's
   * value starts with the input value (when both are lowercased).
   */
  filterItemOut?(this: Item, value: string): boolean;
}

/**
 * @summary Implements the WAI-ARIA pattern [Editable Combobox with Both List and Inline Autocomplete].
 *
 * Combobox with keyboard and pointer navigation, using the aria-activedescendant pattern.
 *
 * WARNING: Safari VoiceOver does not support aria-activedescendant, so Safari users
 * rely on the combobox input value being announced when navigating the listbox with the keyboard.
 * We have erred on the side that it may be less-broken to avoid announcing disabled items in that
 * case, rather than announcing the disabled items value without indicating that it is disabled.
 * @see (https://bugs.webkit.org/show_bug.cgi?id=269026)
 *
 * [pattern]: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-both/
 */
export class ComboboxController<
  Item extends HTMLElement
> implements ReactiveController {
  #lb: ListboxController<Item>;
  #fc?: ATFocusController<Item>;
  #preventListboxGainingFocus = false;
  #input: HTMLElement | null = null;
  #button: HTMLElement | null = null;
  #listbox: HTMLElement | null = null;
  #buttonInitialRole: string | null = null;

  public static of<T extends HTMLElement>(
    host: ReactiveControllerHost,
    options: ComboboxControllerOptions<T>,
  ): ComboboxController<T> {
    return new ComboboxController(host, options);
  }

  /**
   * Whether the `ariaActiveDescendantElement` IDL attribute is supported for cross-root ARIA.
   */
  public static get canControlLightDom(): boolean {
    return ActivedescendantController.canControlLightDom;
  }

  private options: RequireProps<ComboboxControllerOptions<Item>,
    | 'isItemDisabled'
    | 'isItem'
    | 'filterItemOut'
    | 'getItemValue'
    | 'getOrientation'
    | 'getComboboxValue'
    | 'setComboboxValue'
  >;

  #mo = new MutationObserver(() => this.#initItems());

  private constructor(
    public host: ReactiveControllerHost,
    options: ComboboxControllerOptions<Item>,
  ) {
    host.addController(this);
    this.options = {
      isItem,
      getItemValue,
      filterItemOut,
      isItemDisabled,
      getComboboxValue,
      setComboboxValue,
      getOrientation: () => 'vertical',
      ...options,
    };
    this.#lb = ListboxController.of(host, {
      isItem: this.options.isItem,
      getItemsContainer: this.options.getListboxElement,
      getControlsElements: () => [this.#button, this.#input].filter(x => !!x),
      getATFocusedItem: () => this.items[this.#fc?.atFocusedItemIndex ?? -1] ?? null,
      isItemDisabled: this.options.isItemDisabled,
      setItemSelected: this.options.setItemSelected,
    });
  }

  /** All items */
  get items(): Item[] {
    return this.#lb.items;
  }

  set items(value: Item[]) {
    this.#lb.items = value;
  }

  /** Whether the combobox is disabled */
  get disabled() {
    return this.#lb.disabled;
  }

  set disabled(value: boolean) {
    this.#lb.disabled = value;
  }

  /** Whether multiselect is enabled */
  get multi() {
    return this.#lb.multi;
  }

  set multi(value: boolean) {
    this.#lb.multi = value;
  }

  /** The current selection: a list of items */
  get selected() {
    return this.#lb.selected;
  }

  set selected(value: Item[]) {
    this.#lb.selected = value;
  }

  get #hasTextInput() {
    return this.options.getComboboxInput();
  }

  get #focusedItem() {
    return this.#fc?.items.at(Math.max(this.#fc?.atFocusedItemIndex ?? -1, 0)) ?? null;
  }

  get #element() {
    if (this.host instanceof HTMLElement) {
      return this.host;
    } else if (this.options.getListboxElement() instanceof HTMLElement) {
      return this.options.getListboxElement();
    }
  }

  async hostConnected(): Promise<void> {
    await this.host.updateComplete;
    this.hostUpdated();
  }

  hostUpdated(): void {
    if (!this.#fc) {
      this.#init();
    }
    const expanded = this.options.isExpanded();
    this.#button?.setAttribute('aria-expanded', String(expanded));
    this.#input?.setAttribute('aria-expanded', String(expanded));
    if (this.#hasTextInput) {
      this.#button?.setAttribute('tabindex', '-1');
    } else {
      this.#button?.removeAttribute('tabindex');
    }
    this.#initLabels();
  }

  hostDisconnected(): void {
    this.#fc?.hostDisconnected();
  }

  /**
   * Order of operations is important
   */
  #init() {
    this.#initListbox();
    this.#initItems();
    this.#initButton();
    this.#initInput();
    this.#initLabels();
    this.#initController();
  }

  #initListbox() {
    this.#mo.disconnect();
    this.#listbox?.removeEventListener('focusout', this.#onFocusoutListbox);
    this.#listbox?.removeEventListener('keydown', this.#onKeydownListbox);
    this.#listbox?.removeEventListener('click', this.#onClickListbox);
    this.#listbox = this.options.getListboxElement();
    if (!this.#listbox) {
      throw new Error('ComboboxController getListboxElement() option must return an element');
    }
    this.#listbox.addEventListener('focusout', this.#onFocusoutListbox);
    this.#listbox.addEventListener('keydown', this.#onKeydownListbox);
    this.#listbox.addEventListener('click', this.#onClickListbox);
    this.#listbox.id ??= getRandomId();
    this.#mo.observe(this.#listbox, { childList: true });
  }

  #initButton() {
    this.#button?.removeEventListener('click', this.#onClickButton);
    this.#button?.removeEventListener('keydown', this.#onKeydownButton);
    this.#button = this.options.getToggleButton();
    if (!this.#button) {
      throw new Error('ComboboxController getToggleButton() option must return an element');
    }
    this.#buttonInitialRole = this.#button.role;
    this.#button.role = 'combobox';
    this.#button.setAttribute('aria-controls', this.#listbox?.id ?? '');
    this.#button.addEventListener('click', this.#onClickButton);
    this.#button.addEventListener('keydown', this.#onKeydownButton);
  }

  #initInput() {
    this.#input?.removeEventListener('click', this.#onClickButton);
    this.#input?.removeEventListener('keyup', this.#onKeyupInput);
    this.#input?.removeEventListener('keydown', this.#onKeydownInput);

    this.#input = this.options.getComboboxInput();
    if (this.#input && !('value' in this.#input)) {
      throw new Error(`ComboboxController getToggleInput() option must return an element with a value property`);
    } else if (this.#input) {
      this.#input.role = 'combobox';
      this.#button!.role = this.#buttonInitialRole;
      this.#input.setAttribute('aria-autocomplete', 'both');
      this.#input.setAttribute('aria-controls', this.#listbox?.id ?? '');
      this.#input.addEventListener('click', this.#onClickButton);
      this.#input.addEventListener('keyup', this.#onKeyupInput);
      this.#input.addEventListener('keydown', this.#onKeydownInput);
    }
  }

  #initLabels() {
    const labels = InternalsController.getLabels(this.host)
                ?? this.#element?.ariaLabelledByElements
                ?? [];
    const label = this.options.getFallbackLabel();

    for (const element of [this.#button, this.#listbox, this.#input].filter(x => !!x)) {
      if ('ariaLabelledByElements' in HTMLElement.prototype && labels.filter(x => !!x).length) {
        element.ariaLabelledByElements = [...labels ?? []];
      } else {
        element.ariaLabel = label;
      }
    }
  }

  #initController() {
    this.#fc?.hostDisconnected();
    const { getOrientation } = this.options;
    const getItems = () => this.items;
    const getItemsContainer = () => this.#listbox;
    if (this.#hasTextInput) {
      this.#fc = ActivedescendantController.of(this.host, {
        getItems, getItemsContainer, getOrientation,
        getActiveDescendantContainer: () => this.#input,
        getControlsElements: () => [this.#button, this.#input].filter(x => !!x),
        setItemActive: this.options.setItemActive,
      });
    } else {
      this.#fc = RovingTabindexController.of(this.host, {
        getItems, getItemsContainer, getOrientation,
        getControlsElements: () => [this.#button].filter(x => !!x),
      });
    }
  }

  #initItems() {
    if (this.#listbox) {
      this.items = this.options.getItems();
    }
  }

  #onClickButton = () => {
    if (!this.options.isExpanded()) {
      this.#show();
    } else {
      this.#hide();
    }
  };

  #onClickListbox = (event: MouseEvent) => {
    if (!this.multi && event.composedPath().some(this.options.isItem)) {
      this.#hide();
    }
  };

  /**
   * Handle keypresses on the input
   * ## `Down Arrow`
   * - If the textbox is not empty and the listbox is displayed,
   *   moves visual focus to the first suggested value.
   * - If the textbox is empty and the listbox is not displayed,
   *   opens the listbox and moves visual focus to the first option.
   * - In both cases DOM focus remains on the textbox.
   *
   * ## `Alt + Down Arrow`
   * Opens the listbox without moving focus or changing selection.
   *
   * ## `Up Arrow`
   * - If the textbox is not empty and the listbox is displayed,
   *   moves visual focus to the last suggested value.
   * - If the textbox is empty, first opens the listbox if it is not already displayed
   *   and then moves visual focus to the last option.
   * - In both cases DOM focus remains on the textbox.
   *
   * ## `Enter`
   * Closes the listbox if it is displayed.
   *
   * ## `Escape`
   * - If the listbox is displayed, closes it.
   * - If the listbox is not displayed, clears the textbox.
   *
   * ## Standard single line text editing keys
   * - Keys used for cursor movement and text manipulation,
   *   such as `Delete` and `Shift + Right Arrow`.
   * - An HTML `input` with `type="text"` is used for the textbox so the browser will provide
   *   platform-specific editing keys.
   *
   * @see https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list
   * @param event keydown event
   */
  #onKeydownInput = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.shiftKey || !this.#input) {
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        if (!this.options.isExpanded()) {
          this.#preventListboxGainingFocus = event.altKey;
          this.#show();
        }
        break;
      case 'Enter':
        if (!this.multi) {
          this.#hide();
        }
        break;
      case 'Escape':
        if (!this.options.isExpanded()) {
          this.options.setComboboxValue.call(this.#input, '');
          this.host.requestUpdate();
        }
        this.#hide();
        break;
      case 'Alt':
      case 'AltGraph':
      case 'Shift':
      case 'Control':
      case 'Fn':
      case 'Symbol':
      case 'Hyper':
      case 'Super':
      case 'Meta':
      case 'CapsLock':
      case 'FnLock':
      case 'NumLock':
      case 'Tab':
      case 'ScrollLock':
      case 'SymbolLock':
      case ' ':
        break;
      default:
        if (!this.options.isExpanded()) {
          this.#show();
        }
    }
  };

  /**
   * Populates the combobox input with the focused value when navigating the listbox,
   * and filters the items when typing.
   * @param event keyup event
   */
  #onKeyupInput = (event: KeyboardEvent) => {
    if (!this.#input) {
      return;
    }
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown': {
        const item = this.#focusedItem;
        const combobox = this.options.getComboboxInput();
        if (item && combobox
          /**
           * NOTE: Safari VoiceOver does not support aria-activedescendant, so Safari users
           * rely on the combobox input value being announced. It may be less-broken to avoid
           * announcing disabled items in that case.
           * @see (https://bugs.webkit.org/show_bug.cgi?id=269026)
           */
          && !this.options.isItemDisabled.call(item)) {
          const value = this.options.getItemValue?.call(item);
          this.options.setComboboxValue.call(combobox, value);
        }
        break;
      }
      default: {
        let value: string;
        for (const item of this.items) {
          item.hidden =
              !!this.options.isExpanded()
           && !!(value = this.options.getComboboxValue.call(this.#input))
           && this.options.filterItemOut?.call(item, value)
           || false;
        }
      }
    }
  };

  #onKeydownButton = (event: KeyboardEvent) => {
    if (this.#hasTextInput) {
      return this.#onKeydownInput(event);
    } else {
      return this.#onKeydownToggleButton(event);
    }
  };

  #onKeydownListbox = (event: KeyboardEvent) => {
    if (!this.#hasTextInput
      && event.key === 'Escape'
      || (!this.#hasTextInput
          && (event.key === 'Enter' || event.key === ' ')
          && event.composedPath().some(this.options.isItem)
          && !this.multi
      )
    ) {
      this.#hide();
      this.#button?.focus();
    }
  };

  #onFocusoutListbox = (event: FocusEvent) => {
    if (!this.#hasTextInput && this.options.isExpanded()) {
      const root = this.#element?.getRootNode();
      if ((root instanceof ShadowRoot || root instanceof Document)
          && !this.items.includes(event.relatedTarget as Item)
      ) {
        this.#hide();
      }
    }
  };

  #onKeydownToggleButton = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Enter':
        if (!this.options.isExpanded()) {
          this.#show();
        }
        break;
      case ' ':
        // prevent scroll
        event.preventDefault();
        if (!this.options.isExpanded()) {
          this.#show();
        }
    }
  };

  async #show(): Promise<void> {
    const success = await this.options.requestShowListbox();
    if (success !== false && !this.#hasTextInput) {
      if (!this.#preventListboxGainingFocus) {
        (this.#focusedItem ?? this.#fc?.items.at(0))?.focus();
        this.#preventListboxGainingFocus = false;
      }
    }
  }

  async #hide(): Promise<void> {
    await this.options.requestHideListbox();
  }

  /**
   * For Browsers which do not support `ariaActiveDescendantElement`, we must clone
   * the listbox items into the same root as the combobox input
   * Call this method to return either an array of (cloned) list box items, to be placed in your
   * shadow template, or nothing in the case the browser supports cross-root aria.
   */
  public renderItemsToShadowRoot(): Node[] | typeof nothing {
    if (this.#fc instanceof ActivedescendantController) {
      return this.#fc.renderItemsToShadowRoot();
    } else {
      return nothing;
    }
  }
}

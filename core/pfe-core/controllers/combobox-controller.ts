import { isServer, nothing, type ReactiveController, type ReactiveControllerHost } from 'lit';
import type { ActivedescendantControllerOptions } from './activedescendant-controller.js';
import type { RovingTabindexControllerOptions } from './roving-tabindex-controller.js';
import type { ATFocusController } from './at-focus-controller.js';
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

type Lang = typeof ComboboxController['langs'][number];

function deepClosest(element: Element | null, selector: string) {
  let closest = element?.closest(selector);
  let root = element?.getRootNode();
  let count = 0;
  while (count < 500 && !closest && element) {
    count++;
    root = element.getRootNode();
    if (root instanceof ShadowRoot) {
      element = root.host;
    } else if (root instanceof Document) {
      element = document.documentElement;
    } else {
      return null;
    }
    closest = element.closest(selector);
  }
  return closest;
}

function getItemValue<Item extends HTMLElement>(item: Item): string {
  if ('value' in item && typeof item.value === 'string') {
    return item.value;
  } else {
    return '';
  }
}

function isItemFiltered<Item extends HTMLElement>(item: Item, value: string): boolean {
  return !getItemValue(item)
      .toLowerCase()
      .startsWith(value.toLowerCase());
}

function setItemHidden(item: HTMLElement, hidden: boolean) {
  item.hidden = hidden;
}

function setComboboxValue(item: HTMLElement, value: string): void {
  if (!('value' in item)) {
    // eslint-disable-next-line no-console
    return console.warn(`Cannot set value on combobox element ${item.localName}`);
  } else {
    item.value = value;
  }
}

function getComboboxValue(combobox: HTMLElement): string {
  if ('value' in combobox && typeof combobox.value === 'string') {
    return combobox.value;
  } else {
    // eslint-disable-next-line no-console
    return console.warn(`Cannot get value from combobox element ${combobox.localName}`), '';
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
  requestShowListbox(): void | boolean | Promise<boolean> | Promise<void>;
  /**
   * Callback which the host must implement to change the expanded to false.
   * Return or resolve false to prevent the default.
   */
  requestHideListbox(): void | boolean | Promise<boolean> | Promise<void>;
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
  getItemValue?(item: Item): string;
  /**
   * Optional callback, called on the combobox input element to set its value.
   * by default, returns the element's `value` DOM property.
   */
  getComboboxValue?(combobox: HTMLElement): string;
  /**
   * Optional callback, called on the combobox input element to set its value.
   * by default, sets the element's `value` DOM property.
   */
  setComboboxValue?(item: HTMLElement, value: string): void;
  /**
   * Called on each item, with the combobox input, to determine if the item should be shown in the
   * listbox or filtered out. Return false to hide the item. By default, checks whether the item's
   * value starts with the input value (when both are lowercased).
   */
  isItemFiltered?(item: Item, value: string): boolean;
  /**
   * Called on each item when the filter changes.
   * By default, toggles the `hidden` attribute on the item
   */
  setItemHidden?(item: Item, hidden: boolean): void;
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
  public static of<T extends HTMLElement>(
    host: ReactiveControllerHost & HTMLElement,
    options: ComboboxControllerOptions<T>,
  ): ComboboxController<T> {
    return new ComboboxController(host, options);
  }

  /**
   * Whether the `ariaActiveDescendantElement` IDL attribute is supported for cross-root ARIA.
   */
  public static get supportsCrossRootActiveDescendant(): boolean {
    return ActivedescendantController.supportsCrossRootActiveDescendant;
  }

  static #alert?: HTMLElement;

  static #alertTemplate = document.createElement('template');

  private static langs = [
    'en',
    'es',
    'de',
    'fr',
    'it',
    'ja',
    'zh',
  ] as const;

  private static langsRE = new RegExp(ComboboxController.langs.join('|'));

  private static instances = new WeakMap<ReactiveControllerHost, ComboboxController<HTMLElement>>();

  private static hosts = new Set<ReactiveControllerHost>();

  static {
    // apply visually-hidden styles
    this.#alertTemplate.innerHTML = `
      <div role="alert" style="
         border: 0;
         clip: rect(0, 0, 0, 0);
         block-size: 1px;
         margin: -1px;
         overflow: hidden;
         padding: 0;
         position: absolute;
         white-space: nowrap;
         inline-size: 1px;
        "></div>
      `;
  }

  // Hide listbox on focusout
  static {
    if (!isServer) {
      document.addEventListener('focusout', event => {
        const target = event.target as HTMLElement;
        for (const host of ComboboxController.hosts) {
          if (host instanceof Node && host.contains(target)) {
            const instance = ComboboxController.instances.get(host);
            instance?._onFocusoutElement();
          }
        }
      });
    }
  }

  private options: RequireProps<ComboboxControllerOptions<Item>,
    | 'isItemDisabled'
    | 'isItem'
    | 'isItemFiltered'
    | 'getItemValue'
    | 'getOrientation'
    | 'getComboboxValue'
    | 'setComboboxValue'
    | 'setItemHidden'
  >;

  #lb: ListboxController<Item>;
  #fc?: ATFocusController<Item>;
  #initializing = false;
  #preventListboxGainingFocus = false;
  #input: HTMLElement | null = null;
  #button: HTMLElement | null = null;
  #listbox: HTMLElement | null = null;
  #buttonInitialRole: string | null = null;
  #buttonHasMouseDown = false;
  #mo = new MutationObserver(() => this.#initItems());
  #microcopy = new Map<string, Record<Lang, string>>(Object.entries({
    dimmed: {
      en: 'dimmed',
      es: 'atenuada',
      de: 'gedimmt',
      it: 'oscurato',
      fr: 'atténué',
      ja: '暗くなった',
      zh: '变暗',
    },
    selected: {
      en: 'selected',
      es: 'seleccionado',
      de: 'ausgewählt',
      fr: 'choisie',
      it: 'selezionato',
      ja: '選ばれた',
      zh: '选',
    },
    of: {
      en: 'of',
      es: 'de',
      de: 'von',
      fr: 'sur',
      it: 'di',
      ja: '件目',
      zh: '的',
    },
  }));

  /** All items */
  get items(): Item[] {
    return this.#lb.items;
  }

  set items(value: Item[]) {
    this.#lb.items = value;
    this.#fc?.initItems();
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

  private constructor(
    public host: ReactiveControllerHost & HTMLElement,
    options: ComboboxControllerOptions<Item>,
  ) {
    host.addController(this);
    this.options = {
      isItem,
      getItemValue,
      isItemFiltered,
      isItemDisabled,
      getComboboxValue,
      setComboboxValue,
      setItemHidden,
      getOrientation: () => 'vertical',
      ...options,
    };
    this.#lb = ListboxController.of(host, {
      isItem: this.options.isItem,
      getItemsContainer: this.options.getListboxElement,
      getControlsElements: () => [
        this.options.getToggleButton(),
        this.options.getComboboxInput(),
      ].filter(x => !!x),
      getATFocusedItem: () => this.items[this.#fc?.atFocusedItemIndex ?? -1] ?? null,
      isItemDisabled: this.options.isItemDisabled,
      setItemSelected: this.options.setItemSelected,
    });
    ComboboxController.instances.set(host, this);
    ComboboxController.hosts.add(host);
  }

  async hostConnected(): Promise<void> {
    await this.host.updateComplete;
    this.hostUpdated();
  }

  hostUpdated(): void {
    if (!this.#fc && !this.#initializing) {
      this.#init();
    }
    const expanded = this.options.isExpanded();
    this.#button?.setAttribute('aria-expanded', String(expanded));
    this.#input?.setAttribute('aria-expanded', String(expanded));
    this.#initLabels();
  }

  hostDisconnected(): void {
    this.#fc?.hostDisconnected();
  }

  disconnect(): void {
    ComboboxController.instances.delete(this.host);
    ComboboxController.hosts.delete(this.host);
  }

  private async _onFocusoutElement(): Promise<void> {
    if (this.#hasTextInput && this.options.isExpanded()) {
      const root = this.#element?.getRootNode();
      await new Promise(requestAnimationFrame);
      if (root instanceof ShadowRoot || root instanceof Document) {
        const { activeElement } = root;
        if (!this.#element?.contains(activeElement)) {
          this.#hide();
        }
      }
    }
  }

  /**
   * Order of operations is important
   */
  async #init() {
    this.#initializing = true;
    await this.host.updateComplete;
    this.#initListbox();
    this.#initItems();
    this.#initButton();
    this.#initInput();
    this.#initLabels();
    this.#initController();
    this.#initializing = false;
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
    this.#button?.removeEventListener('mousedown', this.#onMousedownButton);
    this.#button?.removeEventListener('mouseup', this.#onMouseupButton);
    this.#button = this.options.getToggleButton();
    if (!this.#button) {
      throw new Error('ComboboxController getToggleButton() option must return an element');
    }
    this.#buttonInitialRole = this.#button.role;
    this.#button.role = 'combobox';
    this.#button.setAttribute('aria-controls', this.#listbox?.id ?? '');
    this.#button.addEventListener('click', this.#onClickButton);
    this.#button.addEventListener('keydown', this.#onKeydownButton);
    this.#button.addEventListener('mousedown', this.#onMousedownButton);
    this.#button.addEventListener('mouseup', this.#onMouseupButton);
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
    const label = this.options.getFallbackLabel()
                  || this.#element?.ariaLabelledByElements?.map(x => x.textContent).join('')
                  || null;

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
        getControlsElements: () => [
          this.options.getToggleButton(),
          this.options.getComboboxInput(),
        ].filter(x => !!x),
        setItemActive: this.options.setItemActive,
      });
    } else {
      this.#fc = RovingTabindexController.of(this.host, {
        getItems, getItemsContainer, getOrientation,
        getControlsElements: () => [
          this.options.getToggleButton(),
        ].filter(x => !!x),
      });
    }
  }

  #initItems() {
    if (this.#listbox) {
      this.items = this.options.getItems();
    }
  }

  async #show(): Promise<void> {
    // Re-read items on open so slotted/dynamically added options are included:
    this.#initItems();
    const success = await this.options.requestShowListbox();
    this.#filterItems();
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

  async #toggle() {
    if (this.options.isExpanded()) {
      return this.#hide();
    } else {
      return this.#show();
    }
  }

  #translate(key: string, lang: Lang) {
    const strings = this.#microcopy.get(key);
    return strings?.[lang] ?? key;
  }

  /**
   * Announces the focused item to a live region (e.g. for Safari VoiceOver).
   * @param item - The listbox option item to announce.
   * TODO(bennypowers): perhaps move this to ActivedescendantController
 */
  #announce(item: Item): void {
    const value = this.options.getItemValue(item);
    ComboboxController.#alert?.remove();
    const fragment = ComboboxController.#alertTemplate.content.cloneNode(true) as DocumentFragment;
    ComboboxController.#alert = fragment.firstElementChild as HTMLElement;
    let text = value;
    const lang = deepClosest(this.#listbox, '[lang]')?.getAttribute('lang') ?? 'en';
    const langKey = (lang?.match(ComboboxController.langsRE)?.at(0) as Lang) ?? 'en';
    if (this.options.isItemDisabled(item)) {
      text += ` (${this.#translate('dimmed', langKey)})`;
    }
    if (this.#lb.isSelected(item)) {
      text += `, (${this.#translate('selected', langKey)})`;
    }
    const posInSet = InternalsController.getAriaPosInSet(item);
    const setSize = InternalsController.getAriaSetSize(item);
    if (posInSet != null && setSize != null) {
      if (langKey === 'ja') {
        text += `, (${setSize} 件中 ${posInSet} 件目)`;
      } else {
        text += `, (${posInSet} ${this.#translate('of', langKey)} ${setSize})`;
      }
    }
    ComboboxController.#alert.lang = lang;
    ComboboxController.#alert.innerText = text;
    document.body.append(ComboboxController.#alert);
  }

  #filterItems() {
    if (this.#input) {
      let value: string;
      for (const item of this.items) {
        const hidden =
          !!this.options.isExpanded()
            && !!(value = this.options.getComboboxValue(this.#input))
            && this.options.isItemFiltered?.(item, value)
            || false;
        this.options.setItemHidden(item, hidden);
      }
    }
  }

  #onClickButton = () => {
    if (!this.options.isExpanded()) {
      this.#show();
    } else {
      this.#hide();
    }
  };

  /**
   * Distinguish click-to-toggle vs Tab/Shift+Tab
  */
  #onMousedownButton = () => {
    this.#buttonHasMouseDown = true;
  };

  #onMouseupButton = () => {
    this.#buttonHasMouseDown = false;
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
          this.options.setComboboxValue(this.#input, '');
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
      case 'ArrowDown':
        /**
         * Safari VoiceOver does not support aria-activedescendant, so we must.
         * approximate the correct behaviour by constructing a visually-hidden alert role
         * @see (https://bugs.webkit.org/show_bug.cgi?id=269026)
         */
        if (this.#focusedItem
            && this.options.getComboboxInput()
            && InternalsController.isSafari) {
          this.#announce(this.#focusedItem);
        }
        break;
      default:
        this.#filterItems();
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
    if (!this.#hasTextInput) {
      switch (event.key) {
        case 'Home':
        case 'End':
          this.#onKeydownToggleButton(event);
          break;
        case 'Escape':
          this.#hide();
          this.#button?.focus();
          break;
        case 'Enter':
        case ' ': {
          const eventItem = event.composedPath().find(this.options.isItem);
          if (eventItem
              && !this.multi
              && this.options.isExpanded()
              && !this.options.isItemDisabled(eventItem)
          ) {
            this.#hide();
            this.#button?.focus();
          }
        }
      }
    }
  };

  #onFocusoutListbox = (event: FocusEvent) => {
    if (!this.#hasTextInput && this.options.isExpanded()) {
      const root = this.#element?.getRootNode();
      // Check if focus moved to the toggle button via mouse click
      // If so, let the click handler manage toggle (prevents double-toggle)
      // But if focus moved via Shift+Tab (no mousedown), we should still hide
      const isClickOnToggleButton =
          event.relatedTarget === this.#button && this.#buttonHasMouseDown;
      if ((root instanceof ShadowRoot || root instanceof Document)
          && !this.items.includes(event.relatedTarget as Item)
          && !isClickOnToggleButton) {
        this.#hide();
      }
    }
  };

  #onKeydownToggleButton = async (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        if (!this.options.isExpanded()) {
          this.#show();
        }
        break;
      case 'Home':
        if (!this.options.isExpanded()) {
          await this.#show();
        }
        if (this.#fc) {
          this.#fc.atFocusedItemIndex = 0;
        }
        break;
      case 'End':
        if (!this.options.isExpanded()) {
          await this.#show();
        }
        if (this.#fc) {
          this.#fc.atFocusedItemIndex = this.items.length - 1;
        }
        break;
      case ' ':
      case 'Enter':
        // prevent scroll
        event.preventDefault();
        await this.#toggle();
        await this.host.updateComplete;
        if (!this.options.isExpanded()) {
          this.#button?.focus();
        }
        break;
    }
  };

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

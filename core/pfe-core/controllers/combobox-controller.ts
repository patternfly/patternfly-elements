import { nothing, type ReactiveController, type ReactiveControllerHost } from 'lit';
import type { ActivedescendantControllerOptions } from './activedescendant-controller.js';
import type { RovingTabindexControllerOptions } from './roving-tabindex-controller.js';
import type { ATFocusController } from './at-focus-controller';

import { ListboxController, type ListboxControllerOptions } from './listbox-controller.js';
import { RovingTabindexController } from './roving-tabindex-controller.js';
import { ActivedescendantController } from './activedescendant-controller.js';
import { InternalsController } from './internals-controller.js';
import { getRandomId } from '../functions/random.js';

type AllOptions<Item extends HTMLElement> =
    ActivedescendantControllerOptions<Item>
  & ListboxControllerOptions<Item>
  & RovingTabindexControllerOptions<Item>;

export interface ComboboxControllerOptions<Item extends HTMLElement> extends
  Omit<AllOptions<Item>,
    | 'getATFocusedItem'
    | 'getControlsElements'
    | 'getItemsContainer'> {
  isExpanded(): boolean;
  requestExpand(): boolean | Promise<boolean>;
  requestCollapse(): boolean | Promise<boolean>;
  getListboxElement(): HTMLElement | null;
  getToggleButton(): HTMLElement | null;
  getToggleInput(): HTMLElement & { value: string } | null;
  getFallbackLabel(): string;
  getItemValue(this: Item): string;
}

export class ComboboxController<
  Item extends HTMLElement
> implements ReactiveController {
  #lb: ListboxController<Item>;
  #fc?: ATFocusController<Item>;
  #preventListboxGainingFocus = false;
  #input: HTMLElement & { value: string } | null = null;
  #button: HTMLElement | null = null;
  #listbox: HTMLElement | null = null;

  public static of<T extends HTMLElement>(
    host: ReactiveControllerHost,
    options: ComboboxControllerOptions<T>,
  ): ComboboxController<T> {
    return new ComboboxController(host, options);
  }

  public static get canControlLightDom(): boolean {
    return ActivedescendantController.canControlLightDom;
  }

  private constructor(
    public host: ReactiveControllerHost,
    private options: ComboboxControllerOptions<Item>,
  ) {
    host.addController(this);
    this.#lb = ListboxController.of(host, {
      getItemsContainer: options.getListboxElement,
      getControlsElements: () => [this.#button, this.#input].filter(x => !!x),
      getATFocusedItem: () => this.items[this.#fc?.atFocusedItemIndex ?? -1] ?? null,
      setItemSelected: this.options.setItemSelected,
    });
  }

  get items(): Item[] {
    return this.#lb.items;
  }

  set items(value: Item[]) {
    this.#lb.items = value;
  }

  get disabled() {
    return this.#lb.disabled;
  }

  set disabled(value: boolean) {
    this.#lb.disabled = value;
  }

  get multi() {
    return this.#lb.multi;
  }

  set multi(value: boolean) {
    this.#lb.multi = value;
  }

  get selected() {
    return this.#lb.selected;
  }

  set selected(value: Item[]) {
    this.#lb.selected = value;
  }

  get #isTypeahead() {
    return this.options.getToggleInput() && this.options.getToggleButton();
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

  // hostUpdate(): void {
  // }

  hostUpdated(): void {
    if (!this.#fc) {
      this.#init();
    }
    const expanded = this.options.isExpanded();
    this.#button?.setAttribute('aria-expanded', String(expanded));
    this.#input?.setAttribute('aria-expanded', String(expanded));
    if (this.#isTypeahead) {
      this.#button?.setAttribute('tabindex', '-1');
    } else {
      this.#button?.removeAttribute('tabindex');
    }
  }

  hostDisconnected(): void {
    this.#fc?.hostDisconnected();
  }

  /**
   * Order of operations is important
   */
  #init() {
    this.#initListbox();
    this.#initButton();
    this.#initInput();
    this.#initLabels();
    this.#initController();
  }

  #initListbox() {
    this.#listbox?.removeEventListener('focusout', this.#onFocusoutListbox);
    this.#listbox?.removeEventListener('keydown', this.#onKeydownListbox);
    this.#listbox = this.options.getListboxElement();
    if (!this.#listbox) {
      throw new Error('ComboboxController getListboxElement() option must return an element');
    }
    this.#listbox.addEventListener('focusout', this.#onFocusoutListbox);
    this.#listbox.addEventListener('keydown', this.#onKeydownListbox);
    this.#listbox.id ??= getRandomId();
  }

  #initButton() {
    this.#button?.removeEventListener('click', this.#onClickToggle);
    this.#button?.removeEventListener('keydown', this.#onKeydownButton);
    this.#button = this.options.getToggleButton();
    if (!this.#button) {
      throw new Error('ComboboxController getToggleButton() option must return an element');
    }
    this.#button.setAttribute('aria-controls', this.#listbox?.id ?? '');
    this.#button.addEventListener('click', this.#onClickToggle);
    this.#button.addEventListener('keydown', this.#onKeydownButton);
  }

  #initInput() {
    this.#input?.removeEventListener('click', this.#onClickToggle);
    this.#input?.removeEventListener('keyup', this.#onKeyupInput);
    this.#input?.removeEventListener('keydown', this.#onKeydownInput);

    this.#input = this.options.getToggleInput();
    if (this.#input && !('value' in this.#input)) {
      throw new Error(`ComboboxController getToggleInput() option must return an element with a value property`);
    } else if (this.#input) {
      this.#input.role = 'combobox';
      this.#input.setAttribute('aria-autocomplete', 'both');
      this.#input.setAttribute('aria-controls', this.#listbox?.id ?? '');
      this.#input.addEventListener('click', this.#onClickToggle);
      this.#input.addEventListener('keyup', this.#onKeyupInput);
      this.#input.addEventListener('keydown', this.#onKeydownInput);
    }
  }

  // this should move into hostUpdated, in case the label changes.
  #initLabels() {
    const labels = this.#element?.ariaLabelledByElements
                ?? InternalsController.getLabels(this.host)
                ?? [];
    const label = this.options.getFallbackLabel();

    for (const element of [this.#button, this.#listbox, this.#input].filter(x => !!x)) {
      if ('ariaLabelledByElements' in HTMLElement.prototype && labels.filter(x => !!x).length) {
        element.ariaLabelledByElements = [...labels ?? []] as readonly Element[];
      } else {
        element.ariaLabel = label;
      }
    }
  }

  #initController() {
    this.#fc?.hostDisconnected();
    const getItems = () => this.items;
    const getItemsContainer = () => this.#listbox;
    if (this.#isTypeahead) {
      this.#fc = ActivedescendantController.of(this.host, {
        getItems,
        getItemsContainer,
        getActiveDescendentContainer: () => this.#input,
        getControlsElements: () => [this.#button, this.#input].filter(x => !!x),
        setItemActive: this.options.setItemActive,
      });
    } else {
      this.#fc = RovingTabindexController.of(this.host, {
        getItems,
        getItemsContainer,
        getControlsElements: () => [this.#button].filter(x => !!x),
      });
    }
  }

  #onClickToggle = () =>{
    if (!this.options.isExpanded()) {
      this.show();
    } else {
      this.hide();
    }
  };

  /**
   * Handle keypresses on the input
   * @see https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list
   * +-----------------------------------+-----------------------------------+
   * | Key                               | Function                          |
   * +===================================+===================================+
   * | [Down Arrow]{.kbd}                | -   If the textbox is not empty   |
   * |                                   |     and the listbox is displayed, |
   * |                                   |     moves visual focus to the     |
   * |                                   |     first suggested value.        |
   * |                                   | -   If the textbox is empty and   |
   * |                                   |     the listbox is not displayed, |
   * |                                   |     opens the listbox and moves   |
   * |                                   |     visual focus to the first     |
   * |                                   |     option.                       |
   * |                                   | -   In both cases DOM focus       |
   * |                                   |     remains on the textbox.       |
   * +-----------------------------------+-----------------------------------+
   * | [Alt + Down Arrow]{.kbd}          | Opens the listbox without moving  |
   * |                                   | focus or changing selection.      |
   * +-----------------------------------+-----------------------------------+
   * | [Up Arrow]{.kbd}                  | -   If the textbox is not empty   |
   * |                                   |     and the listbox is displayed, |
   * |                                   |     moves visual focus to the     |
   * |                                   |     last suggested value.         |
   * |                                   | -   If the textbox is empty,      |
   * |                                   |     first opens the listbox if it |
   * |                                   |     is not already displayed and  |
   * |                                   |     then moves visual focus to    |
   * |                                   |     the last option.              |
   * |                                   | -   In both cases DOM focus       |
   * |                                   |     remains on the textbox.       |
   * +-----------------------------------+-----------------------------------+
   * | [Enter]{.kbd}                     | Closes the listbox if it is       |
   * |                                   | displayed.                        |
   * +-----------------------------------+-----------------------------------+
   * | [Escape]{.kbd}                    | -   If the listbox is displayed,  |
   * |                                   |     closes it.                    |
   * |                                   | -   If the listbox is not         |
   * |                                   |     displayed, clears the         |
   * |                                   |     textbox.                      |
   * +-----------------------------------+-----------------------------------+
   * | Standard single line text editing | -   Keys used for cursor movement |
   * | keys                              |     and text manipulation, such   |
   * |                                   |     as [Delete]{.kbd} and         |
   * |                                   |     [Shift + Right Arrow]{.kbd}.  |
   * |                                   | -   An HTML `input` with          |
   * |                                   |     `type="text"` is used for the |
   * |                                   |     textbox so the browser will   |
   * |                                   |     provide platform-specific     |
   * |                                   |     editing keys.                 |
   * +-----------------------------------+-----------------------------------+
   * @param event keydown event
   */
  #onKeydownInput = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        if (!this.options.isExpanded()) {
          this.#preventListboxGainingFocus = event.altKey;
          this.show();
        }
        break;
      case 'Enter':
        this.hide();
        break;
      case 'Escape':
        if (!this.options.isExpanded()) {
          this.#input!.value = '';
          this.host.requestUpdate();
        }
        this.hide();
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
        break;
      default:
        if (!this.options.isExpanded()) {
          this.show();
        }
    }
  };

  #onKeyupInput = (event: KeyboardEvent) => {
    const { value } = this.#input!;
    for (const item of this.items) {
      item.hidden =
        !!this.options.isExpanded()
     && !!value
     && !this.options.getItemValue.call(item)
         .toLowerCase()
         .startsWith(value.toLowerCase());
    }
  };

  #onKeydownButton = (event: KeyboardEvent) => {
    if (this.#isTypeahead) {
      return this.#onKeydownMenu(event);
    } else {
      return this.#onKeydownInput(event);
    }
  };

  #onKeydownListbox = (event: KeyboardEvent) => {
    if (!this.#isTypeahead && event.key === 'Escape') {
      this.hide();
      this.#button?.focus();
    }
  };

  #onFocusoutListbox = (event: FocusEvent) => {
    if (!this.#isTypeahead && this.options.isExpanded()) {
      const root = this.#element?.getRootNode();
      if ((root instanceof ShadowRoot || root instanceof Document)
          && !this.items.includes(event.relatedTarget as Item)
      ) {
        this.hide();
      }
    }
  };

  #onKeydownMenu = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        if (!this.options.isExpanded()) {
          this.show();
        }
    }
  };

  public async show(): Promise<void> {
    if (await this.options.requestExpand() && !this.#isTypeahead) {
      if (!this.#preventListboxGainingFocus) {
        (this.#focusedItem ?? this.#fc?.nextATFocusableItem)?.focus();
        this.#preventListboxGainingFocus = false;
      }
    }
  }

  public async hide(): Promise<void> {
    if (await this.options.requestCollapse() && !this.#isTypeahead) {
      this.options.getToggleButton()?.focus();
    }
  }

  public renderItemsToShadowRoot(): unknown {
    if (this.#fc instanceof ActivedescendantController) {
      return this.#fc.renderItemsToShadowRoot();
    } else {
      return nothing;
    }
  }
}

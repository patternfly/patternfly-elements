import { LitElement, html, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { queryAssignedNodes } from 'lit/decorators/query-assigned-nodes.js';
import { classMap } from 'lit/directives/class-map.js';

import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';

import { PfChip, PfChipRemoveEvent } from './pf-chip.js';

import styles from './pf-chip-group.css';

export class PfChipGroupExpandEvent extends Event {
  constructor() {
    super('expand', { bubbles: true, cancelable: true });
  }
}

export class PfChipGroupRemoveEvent extends Event {
  constructor() {
    super('remove', { bubbles: true, cancelable: true });
  }
}

/**
 * `${`
 * **WS** (_>= 0x_)
 * `remaining`
 * **WS** (_>= 0x_)
 * `}`
 */
const REMAINING_RE = /\$\{\s*remaining\s*\}/g;

/**
 * A **chip group** is a collection of chips that can be grouped by category and used to represent one or more values assigned to a single attribute. When value of numChips is exceeded, additional chips will be hidden using an overflow chip.
 *
 * @fires expand - Fires when chip group is expanded to show all chips
 * @fires remove - Fires when chip group is closed/removed
 *
 * @slot category-name
 *      Category name text for chip group category. If this prop is supplied chip group with have a label and category styling applied
 *
 * @slot
 *      Should be <Chip> elements.
 */
@customElement('pf-chip-group')
export class PfChipGroup extends LitElement {
  static readonly styles = [styles];

  static override readonly shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /**
   * Accessible label for chip group that does not have a category name
   */
  @property({ attribute: 'accessible-label', type: String }) accessibleLabel = '';

  /**
   * Accessible label for close button
   */
  @property({ attribute: 'accessible-close-label', type: String }) accessibleCloseLabel = 'Close';

  /**
   * Customizeable "more" template string. Use variable "${remaining}" for overflow chip count.
   */
  @property({ attribute: 'collapsed-text', type: String }) collapsedText = '${remaining} more';

  /**
   * Customizable "show less" text string.
   */
  @property({ attribute: 'expanded-text', type: String }) expandedText = 'show less';

  /**
   * Set number of chips to show before overflow
   */
  @property({ attribute: 'num-chips', type: Number }) numChips = 3;

  /**
   * Flag indicating if overflow chips are visible
   */
  @property({ reflect: true, type: Boolean }) open = false;

  /**
   * Flag if chip group can be closed
   */
  @property({ reflect: true, type: Boolean }) closeable = false;

  @query('#overflow') private _overflowChip?: HTMLButtonElement;

  @query('#close-button') private _button?: HTMLButtonElement;

  @queryAssignedNodes({ slot: 'category-name', flatten: true }) private _categorySlotted?: Node[];

  #chips: PfChip[] = [];

  #buttons: HTMLElement[] = [];

  #tabindex = new RovingTabindexController(this, {
    getItems: () => this.#buttons.filter(x => !x.hidden),
  });

  constructor() {
    super();
    this.addEventListener('remove', this.#onChipRemoved);
  }

  render() {
    const empty = this.#chips.length <= 0;
    return html`
      <div id="outer"
           class="${classMap({ 'has-category': this.hasCategory, empty })}"
           role="toolbar">
        <slot id="category"
              name="category-name"
              @slotchange="${this.#onSlotchange}">
          <span class="offscreen"
                ?hidden="${!this.accessibleLabel}">${this.accessibleLabel ?? ''}</span>
        </slot>
        <slot id="chips"
              @slotchange="${this.#onSlotchange}"
              @remove="${this.#updateChips}"
        ></slot>
        <pf-chip id="overflow"
                 aria-controls="chips"
                 overflow-chip
                 ?hidden="${this.remaining < 1}"
                 @click="${this.#onMoreClick}"
        >${this.remaining < 1 ? ''
         : this.open ? this.expandedText
         : this.collapsedText.replace(REMAINING_RE, this.remaining.toString())}</pf-chip>
        <pf-button id="close-button"
                   plain
                   icon="times-circle"
                   icon-set="fas"
                   label="${this.accessibleCloseLabel}"
                   aria-describedby="category"
                   ?hidden="${!this.closeable}"
                   @click="${this.#onCloseClick}"></pf-button>
      </div>
    `;
  }

  override updated(changed: PropertyValues<this>) {
    if (changed.has('accessibleCloseLabel') ||
        changed.has('numChips') ||
        changed.has('closeable') ||
        changed.has('open')) {
      this.#handleChipsChanged();
    }
  }

  /**
   * active chip that receives focus when group receives focus
   */
  get activeChip() {
    const button = this.#tabindex.activeItem as HTMLElement;
    const shadow = button?.getRootNode() as ShadowRoot;
    return shadow?.host as PfChip;
  }

  set activeChip(chip: HTMLElement) {
    const button = chip.shadowRoot?.querySelector('button') as HTMLElement;
    this.#tabindex.setActiveItem(button);
  }

  /**
   * whether or not group has a category
   */
  get hasCategory() {
    return (this._categorySlotted || []).length > 0;
  }

  get remaining() {
    return this.#chips.length - this.numChips;
  }

  /**
   * updates chips when they change
   */
  #handleChipsChanged() {
    if (this.#chips.length > 0) {
      const oldButtons = [...(this.#buttons || [])];
      const max = this.open ? this.#chips.length : Math.min(this.#chips.length, this.numChips);
      this.#buttons = [
        ...this.#chips.slice(0, max),
        this._overflowChip,
        this._button,
      ].filter((x): x is PfChip => !!x);
      if (oldButtons.length !== this.#buttons.length ||
          !oldButtons.every((element, index) => element === this.#buttons[index])) {
        this.#tabindex.updateItems();
      }
      this.#updateOverflow();
    }
  }

  /**
   * handles a chip's `chip-remove` event
   */
  async #onChipRemoved(event: Event) {
    if (event instanceof PfChipRemoveEvent) {
      await this.#updateChips();
      await this.updateComplete;
      this.#tabindex.setActiveItem(this.#tabindex.activeItem);
    }
  }

  /**
   * handles chip group close
   */
  #onCloseClick() {
    this.dispatchEvent(new PfChipGroupRemoveEvent());
    this.remove();
  }

  /**
   * handles overflow chip's click event
   */
  async #onMoreClick(event: Event) {
    event.stopPropagation();
    this.open = !this.open;
    await this.updateComplete;
    this.#handleChipsChanged();
    if (this._overflowChip) {
      this.focusOnChip(this._overflowChip);
    }
    this.dispatchEvent(new PfChipGroupExpandEvent());
  }

  #onSlotchange() {
    this.#updateChips();
    this.requestUpdate();
  }

  /**
   * updates which chips variable
   */
  async #updateChips() {
    await this.updateComplete;
    this.#chips = [...this.querySelectorAll<PfChip>('pf-chip:not([slot]):not([overflow-chip])')];
    this.requestUpdate();
    await this.updateComplete;
    this.#tabindex.updateItems(this.#chips);
    this.#handleChipsChanged();
    return this.#chips;
  }

  /**
   * updates which chips are hidden
   */
  #updateOverflow() {
    this.#chips.forEach((chip, i) => {
      chip.accessibleCloseLabel = this.accessibleCloseLabel;
      const overflowHidden = i >= this.numChips && !this.open;
      chip.hidden = overflowHidden;
    });
  }

  /**
   * Activates the specified chip and sets focus on it
   */
  focusOnChip(chip: HTMLElement) {
    this.#tabindex.setActiveItem(chip);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-chip-group': PfChipGroup;
  }
}

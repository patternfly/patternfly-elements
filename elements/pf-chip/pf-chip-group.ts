import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from '@patternfly/pfe-core/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { queryAssignedNodes } from 'lit/decorators/query-assigned-nodes.js';
import { classMap } from 'lit/directives/class-map.js';

import { observes } from '@patternfly/pfe-core/decorators/observes.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';

import { PfChip, PfChipRemoveEvent } from './pf-chip.js';

import styles from './pf-chip-group.css';
import shared from './pf-chip-shared.css';

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
 * @fires expand - Fires when chip group is expanded to show all chips
 * @fires remove - Fires when chip group is closed/removed
 * @slot category-name
 *      Category name text for chip group category. If this prop is supplied chip group with have a label and category styling applied
 * @slot - `<pf-chip>` elements.
 * @cssprop [--pf-c-chip-group__list--MarginBottom=calc(var(--pf-global--spacer--xs, 0.25rem) * -1)]
 * @cssprop [--pf-c-chip-group__list--MarginRight=calc(var(--pf-global--spacer--xs, 0.25rem) * -1)]
 * @cssprop [--pf-c-chip-group--m-category--PaddingTop=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-chip-group--m-category--PaddingRight=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-chip-group--m-category--PaddingBottom=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-chip-group--m-category--PaddingLeft=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-chip-group--m-category--BorderRadius=var(--pf-global--BorderRadius--sm, 3px)]
 * @cssprop [--pf-c-chip-group--m-category--BackgroundColor=var(--pf-global--BackgroundColor--200, #f0f0f0)]
 * @cssprop [--pf-c-chip-group__label--MarginRight=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-chip-group__label--FontSize=var(--pf-global--FontSize--sm, 0.875rem)]
 * @cssprop [--pf-c-chip-group__label--MaxWidth=18ch]
 * @cssprop [--pf-c-chip-group__close--MarginTop=calc(var(--pf-global--spacer--xs, 0.25rem) * -1)]
 * @cssprop [--pf-c-chip-group__close--MarginBottom=calc(var(--pf-global--spacer--xs, 0.25rem) * -1)]
 * @cssprop [--pf-c-chip-group__list-item--MarginRight=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-chip-group__list-item--MarginBottom=var(--pf-global--spacer--xs, 0.25rem)]
 */
@customElement('pf-chip-group')
export class PfChipGroup extends LitElement {
  static readonly styles: CSSStyleSheet[] = [shared, styles];

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

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

  @query('#overflow') private _overflowChip?: PfChip;

  @query('#close-button') private _button?: HTMLButtonElement;

  @queryAssignedNodes({ slot: 'category-name', flatten: true }) private _categorySlotted?: Node[];

  get #chips(): NodeListOf<PfChip> {
    return this.querySelectorAll<PfChip>('pf-chip:not([slot]):not([overflow-chip])');
  }

  #tabindex = RovingTabindexController.of(this, {
    getItems: () => [
      ...Array.prototype.slice.call(this.#chips, 0, this.open ? this.#chips.length
                            : Math.min(this.#chips.length, this.numChips)),
      this._overflowChip,
      this._button,
    ].filter(x => !!x),
  });

  /**
   * active chip that receives focus when group receives focus
   */
  get activeChip() {
    const button = this.#tabindex.items.at(this.#tabindex.atFocusedItemIndex);
    const shadow = button?.getRootNode() as ShadowRoot;
    return shadow?.host as PfChip;
  }

  set activeChip(chip: HTMLElement) {
    const button = chip.shadowRoot?.querySelector('button');
    if (button) {
      this.#tabindex.atFocusedItemIndex = this.#tabindex.items.indexOf(button);
    }
  }

  /**
   * whether or not group has a category
   */
  get hasCategory(): boolean {
    return (this._categorySlotted || []).length > 0;
  }

  get remaining(): number {
    return this.#chips.length - this.numChips;
  }

  constructor() {
    super();
    this.addEventListener('remove', this.#onRemove);
  }

  render(): TemplateResult<1> {
    const empty = this.#chips.length <= 0;
    return html`
      <div id="outer"
           class="${classMap({ 'has-category': this.hasCategory, empty })}"
           role="toolbar">
        <slot id="category"
              name="category-name"
              @slotchange="${this.#onSlotchange}">
          <span class="visually-hidden"
                ?hidden="${!this.accessibleLabel}">${this.accessibleLabel ?? ''}</span>
        </slot>
        <slot id="chips" @slotchange="${this.#onSlotchange}"></slot>
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

  /**
   * updates chips when they change
   */
  @observes('accessibleCloseLabel')
  @observes('numChips')
  @observes('closeable')
  @observes('open')
  private chipsChanged(): void {
    this.#updateOverflow();
  }

  /**
   * handles chip group close
   */
  #onCloseClick() {
    this.dispatchEvent(new PfChipGroupRemoveEvent());
  }

  /**
   * handles overflow chip's click event
   * @param event click event
   */
  async #onMoreClick(event: Event) {
    event.stopPropagation();
    this.open = !this.open;
    await this.updateComplete;
    this.chipsChanged();
    if (this._overflowChip) {
      this.focusOnChip(this._overflowChip);
    }
    this.dispatchEvent(new PfChipGroupExpandEvent());
  }

  #onSlotchange() {
    this.requestUpdate();
  }

  #onRemove(event: Event) {
    if (event instanceof PfChipRemoveEvent) {
      const index = this.#tabindex.atFocusedItemIndex;
      if (event.chip) {
        this.#tabindex.atFocusedItemIndex = index + 1;
      }
    } else if (event instanceof PfChipGroupRemoveEvent) {
      this.remove();
    }
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
   * @param chip pf-chip element
   */
  focusOnChip(chip: PfChip): void {
    this.#tabindex.atFocusedItemIndex = this.#tabindex.items.indexOf(chip);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-chip-group': PfChipGroup;
  }
}

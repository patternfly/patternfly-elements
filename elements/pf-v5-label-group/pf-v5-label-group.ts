import { LitElement, html, isServer, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';

import { observes } from '@patternfly/pfe-core/decorators/observes.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';

import { PfV5Label } from '../pf-v5-label/pf-v5-label.js';

import styles from './pf-v5-label-group.css';

export class PfV5LabelGroupExpandEvent extends Event {
  constructor() {
    super('expand', { bubbles: true, cancelable: true });
  }
}

export class PfV5LabelGroupRemoveEvent extends Event {
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
 * A **label group** is a collection of labels that can be grouped by category
 * and used to represent one or more values assigned to a single attribute.
 * When the number of labels exceeds `numLabels`, additional labels will be
 * hidden using an overflow label.
 *
 * @alias Label Group
 * @summary Groups multiple labels with overflow, category, and close support.
 *
 * @fires {PfV5LabelGroupExpandEvent} expand - Fires when label group is expanded to show all labels
 * @fires {PfV5LabelGroupRemoveEvent} remove - Fires when label group is closed/removed
 *
 * @slot category
 *       Category name text for label group category.
 *       If this slot is populated, the label group will have category styling applied.
 * @slot - `<pf-v5-label>` elements.
 */
@customElement('pf-v5-label-group')
export class PfV5LabelGroup extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** Orientation of the label group. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Accessible label for the label group when no category name is provided. */
  @property({ attribute: 'accessible-label' }) accessibleLabel = '';

  /** Accessible label for the close button. */
  @property({ attribute: 'accessible-close-label' }) accessibleCloseLabel = 'Close';

  /**
   * Customizable "more" template string.
   * Use variable `${remaining}` for the overflow label count.
   */
  @property({ attribute: 'collapsed-text' }) collapsedText = '${remaining} more';

  /** Customizable "show less" text string. */
  @property({ attribute: 'expanded-text' }) expandedText = 'show less';

  /** Number of labels to show before overflow. */
  @property({ attribute: 'num-labels', type: Number }) numLabels = 3;

  /** Whether overflow labels are visible. */
  @property({ reflect: true, type: Boolean }) open = false;

  /** Whether the label group can be closed. */
  @property({ reflect: true, type: Boolean }) closeable = false;

  /** Label count tracked during SSR via child events. */
  _ssrLabelCount = 0;

  get #overflowLabel(): PfV5Label | null {
    return this.renderRoot?.querySelector?.<PfV5Label>('#overflow') ?? null;
  }

  get #closeButton(): HTMLButtonElement | null {
    return this.renderRoot?.querySelector?.<HTMLButtonElement>('#close-button') ?? null;
  }

  get #categorySlotted(): Node[] {
    const slot = this.renderRoot
        ?.querySelector?.<HTMLSlotElement>('slot[name="category"]');
    return slot?.assignedNodes({ flatten: true }) ?? [];
  }

  get #labels(): NodeListOf<PfV5Label> | PfV5Label[] {
    if (isServer) {
      return [] as PfV5Label[];
    }
    return this.querySelectorAll<PfV5Label>('pf-v5-label:not([slot]):not([overflow-label])');
  }

  get #labelCount(): number {
    if (isServer) {
      return this._ssrLabelCount;
    }
    return this.#labels.length;
  }

  get #hasCategory(): boolean {
    return this.#categorySlotted.length > 0;
  }

  get #remaining(): number {
    return this.#labelCount - this.numLabels;
  }

  #tabindex = RovingTabindexController.of(this, {
    getItems: () => [
      ...Array.prototype.slice.call(
        this.#labels,
        0,
        this.open ? this.#labels.length : Math.min(this.#labels.length, this.numLabels),
      ),
      this.#overflowLabel,
      this.#closeButton,
    ].filter(x => !!x),
  });

  constructor() {
    super();
    this.addEventListener('remove', this.#onRemove);
    this.addEventListener('ssr:label', () => this._ssrLabelCount++);
  }

  override render(): TemplateResult<1> {
    const empty = this.#labelCount <= 0;
    return html`
      <div id="outer"
           class="${classMap({ 'has-category': this.#hasCategory, empty })}"
           role="toolbar">
        <slot id="category"
              name="category"
              @slotchange="${this.#onSlotchange}">
          <span class="visually-hidden"
                ?hidden="${!this.accessibleLabel}">${this.accessibleLabel ?? ''}</span>
        </slot>
        <slot id="labels" @slotchange="${this.#onSlotchange}"></slot>
        <pf-v5-label id="overflow"
                  aria-controls="labels"
                  overflow-label
                  ?hidden="${this.#remaining < 1}"
                  @click="${this.#onMoreClick}"
        >${this.#remaining < 1 ? ''
         : this.open ? this.expandedText
         : this.collapsedText.replace(REMAINING_RE, this.#remaining.toString())}</pf-v5-label>
        <pf-v5-button id="close-button"
                   plain
                   icon="times-circle"
                   icon-set="fas"
                   label="${this.accessibleCloseLabel}"
                   aria-describedby="category"
                   ?hidden="${!this.closeable}"
                   @click="${this.#onCloseClick}"></pf-v5-button>
      </div>
    `;
  }

  /** Updates labels when relevant properties change. */
  @observes('numLabels')
  @observes('closeable')
  @observes('open')
  private labelsChanged(): void {
    this.#updateOverflow();
  }

  #onCloseClick() {
    this.dispatchEvent(new PfV5LabelGroupRemoveEvent());
  }

  async #onMoreClick(event: Event) {
    event.stopPropagation();
    this.open = !this.open;
    await this.updateComplete;
    this.labelsChanged();
    if (this.#overflowLabel) {
      this.#tabindex.atFocusedItemIndex = this.#tabindex.items.indexOf(this.#overflowLabel);
    }
    this.dispatchEvent(new PfV5LabelGroupExpandEvent());
  }

  #onSlotchange() {
    this.requestUpdate();
  }

  #onRemove(event: Event) {
    if (event instanceof PfV5LabelGroupRemoveEvent) {
      this.remove();
    }
  }

  #updateOverflow() {
    this.#labels.forEach((label, i) => {
      label.hidden = i >= this.numLabels && !this.open;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v5-label-group': PfV5LabelGroup;
  }
}

import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { isServer } from 'lit';
import { state } from 'lit/decorators/state.js';
import { query } from 'lit/decorators/query.js';
import { observes } from '@patternfly/pfe-core/decorators/observes.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
import type { PfLabel } from '@patternfly/elements/pf-label/pf-label.js';
import styles from './pf-label-group.css';
import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-label/pf-label.js';

/**
 * Event fired when the label group is expanded to show all labels.
 */
export class PfLabelGroupExpandEvent extends Event {
  constructor() {
    super('expand', { bubbles: true, cancelable: true });
  }
}

/**
 * Event fired when the label group is removed/closed.
 */
export class PfLabelGroupRemoveEvent extends Event {
  constructor() {
    super('remove', { bubbles: true, cancelable: true, composed: true });
  }
}

/**
 * A **label group** is a collection of labels that can be grouped by category
 * and used to represent one or more values assigned to a single attribute.
 * When the number of labels exceeds `numLabels`, additional labels will be hidden
 * using an overflow label.
 *
 * @fires expand - Fired when label group is expanded to show all labels
 *
 * @slot category - Category name text for label group category. If supplied, label group will have category styling applied
 * @slot - Default slot for `<pf-label>` elements
 *
 * @example
 * <pf-label-group num-labels="2 ">
 *   <span slot="category">Fruit Types</span>
 *   <pf-label>Apple</pf-label>
 *   <pf-label>Banana</pf-label>
 *   <pf-label>Orange</pf-label>
 * </pf-label-group>
 */

@customElement('pf-label-group')
export class PfLabelGroup extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Orientation of the label group.
   */
  @property() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Accessible label for the label group when no category name is provided.
   */
  @property({ attribute: 'accessible-label', type: String }) accessibleLabel = '';
  /**
   * Accessible label for the close button.
   */
  @property({ attribute: 'accessible-close-label', type: String }) accessibleCloseLabel = 'Close';

  /**
   * Text for collapsed overflow label. Use `${remaining}` to indicate number of hidden labels.
   */
  @property({ attribute: 'collapsed-text', type: String }) collapsedText = '${remaining} more';

  /**
   * Text for expanded overflow label.
   */
  @property({ attribute: 'expanded-text', type: String }) expandedText = 'show less';

  /**
   * Number of labels to show before creating an overflow label.
   */
  @property({ attribute: 'num-labels', type: Number }) numLabels = 3;

  /**
   * Whether the overflow labels are visible (expanded state).
   */
  @property({ reflect: true, type: Boolean }) open = false;

  /**
   * Whether the label group can be closed.
   */
  @property({ reflect: true, type: Boolean }) closeable = false;

  /**
 * Current text shown in the overflow label (e.g., "3 more" or "show less").
 * Managed internally.
 */
  @state() private _overflowText = '';

  /**
 * Reference to the close button element in the shadow DOM.
 */
  @query('#close-button') private _button?: HTMLButtonElement;

  /**
 * Retrieves all elements assigned to the `category` slot.
 */
  private get _categorySlotted(): HTMLElement[] {
    if (isServer) {
      return [];
    }

    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="category"]');
    if (!slot) {
      return [];
    }

    return slot.assignedElements({ flatten: true }) as HTMLElement[];
  }

  /**
 * Returns all `<pf-label>` children except overflow and slotted labels.
 */
  get #labels(): NodeListOf<PfLabel> | PfLabel[] {
    if (isServer) {
      return [] as PfLabel[];
    }
    const selector =
      'pf-label:not([slot])'
      + ':not([overflow-label])'
      + ':not([id="add-button"])';

    return this.querySelectorAll<PfLabel>(selector);
  }

  #tabindex = RovingTabindexController.of(this, {
    getItems: () => [
      ...Array.prototype.slice.call(
        this.#labels,
        0,
        this.open ? this.#labels.length : Math.min(this.#labels.length, this.numLabels)
      ),
      this._button,
    ].filter(x => !!x),
  });

  render(): TemplateResult<1> {
    const empty = this.#labels.length <= 0;
    const hasCategory = (this._categorySlotted || []).length > 0;

    return html`
      <div id="outer" class="${classMap({ 'has-category': hasCategory, empty })}" role="toolbar">
        <slot id="category" name="category" @slotchange="${this.#onCategorySlotChange}">
          <span class="visually-hidden label-text" ?hidden="${!this.accessibleLabel}">
            ${this.accessibleLabel ?? ''}
          </span>
        </slot>

        <slot id="labels" @slotchange="${this.#onSlotchange}"></slot>

        ${this._overflowText ?
        html`<pf-label
              id="overflow"
              aria-controls="labels"
              overflow-label
              @click="${this.#onMoreClick}"
            >
              ${this._overflowText}
            </pf-label>`
        : ''}

        ${this.closeable ?
        html`<pf-button
              id="close-button"
              plain
              icon="times-circle"
              icon-set="fas"
              label="${this.accessibleCloseLabel}"
              aria-describedby="category"
              @click="${this.#onCloseClick}"
            ></pf-button>`
        : ''}
      </div>

   
    `;
  }

  /** Updates labels when relevant properties change */
  @observes('accessibleCloseLabel')
  @observes('numLabels')
  @observes('closeable')
  @observes('open')
  private labelsChanged(): void {
    this.#updateOverflow();
  }

  async #onSlotchange() {
    await this.updateComplete;
    this.labelsChanged();
  }

  /**
 * Tooltip logic for truncated category title.
 */
  async #onCategorySlotChange() {
    await this.updateComplete;
    const nodes = this._categorySlotted ?? [];
    for (const node of nodes) {
      if (!(node instanceof HTMLElement)) {
        continue;
      }
      const isTruncated = node.scrollWidth > node.clientWidth;
      node.title = isTruncated ? node.textContent?.trim() ?? '' : '';
    }
  }

  /**
    * Handles overflow label's click event.
    * @param {Event} event - Click event
  */
  async #onMoreClick(event: Event) {
    event.stopPropagation();
    this.open = !this.open;
    await this.updateComplete;
    this.labelsChanged();
    const overflow = isServer ? null : this.renderRoot.querySelector('#overflow') as PfLabel | null;
    if (overflow) {
      this.#tabindex.atFocusedItemIndex = this.#tabindex.items.indexOf(overflow);
    }
    this.dispatchEvent(new PfLabelGroupExpandEvent());
  }

  /**
 * Handles label group close.
 */
  #onCloseClick() {
    if (this.isConnected) {
      this.dispatchEvent(new PfLabelGroupRemoveEvent());
      this.remove();
    }
  }

  /**
   * Updates which labels are hidden based on `numLabels` and `open`.
   */
  #updateOverflow() {
    const labels = Array.from(this.#labels);
    labels.forEach((label, i) => {
      (label as any).accessibleCloseLabel = this.accessibleCloseLabel;
      const overflowHidden = i >= this.numLabels && !this.open;
      label.hidden = overflowHidden;
    });

    const rem = Math.max(0, labels.length - this.numLabels);

    if (rem < 1) {
      this._overflowText = '';
      if (this.open) {
        this.open = false;
      }
    } else {
      const placeholderMatch = this.collapsedText.match(/\$\{.*?\}/);
      if (placeholderMatch) {
        const [placeholder] = placeholderMatch;
        this._overflowText = this.collapsedText.replace(placeholder, rem.toString());
      } else {
        this._overflowText = this.collapsedText;
      }

      if (this.open) {
        this._overflowText = this.expandedText;
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-label-group': PfLabelGroup;
  }
}

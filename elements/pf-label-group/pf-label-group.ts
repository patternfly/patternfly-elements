
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import '@patternfly/elements/pf-button/pf-button.js';

import styles from './pf-label-group.css';

import { query } from 'lit/decorators/query.js';
import { queryAssignedNodes } from 'lit/decorators/query-assigned-nodes.js';
import { observes } from '@patternfly/pfe-core/decorators/observes.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
import { PfLabel } from '../pf-label/pf-label.js';

export class PfLabelGroupExpandEvent extends Event {
  constructor() {
    super('expand', { bubbles: true, cancelable: true });
  }
}

const REMAINING_RE = /\$\{\s*remaining\s*\}/g;

@customElement('pf-label-group')
export class PfLabelGroup extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ attribute: 'accessible-label', type: String }) accessibleLabel = '';
  @property({ attribute: 'accessible-close-label', type: String }) accessibleCloseLabel = 'Close';
  @property({ attribute: 'collapsed-text', type: String }) collapsedText = '${remaining} more';
  @property({ attribute: 'expanded-text', type: String }) expandedText = 'show less';
  @property({ attribute: 'num-labels', type: Number }) numLabels = 3;
  @property({ reflect: true, type: Boolean }) open = false;
  @property({ reflect: true, type: Boolean }) closeable = true;

  @property() private _overflowText = '';

  @query('#close-button') private _button?: HTMLButtonElement;
  @queryAssignedNodes({
    slot: 'category-name',
    flatten: true,
  })
  private _categorySlotted?: HTMLElement[];


  get #labels(): NodeListOf<PfLabel> {
    return this.querySelectorAll<PfLabel>('pf-label:not([slot]):not([overflow-label])');
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
        <slot id="category" name="category-name" @slotchange="${this.#onCategorySlotChange}">
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
   * Tooltip logic for truncated category title
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

  async #onMoreClick(event: Event) {
    event.stopPropagation();
    this.open = !this.open;
    await this.updateComplete;
    this.labelsChanged();
    const overflow = this.renderRoot.querySelector('#overflow') as PfLabel | null;
    if (overflow) {
      this.#tabindex.atFocusedItemIndex = this.#tabindex.items.indexOf(overflow);
    }
    this.dispatchEvent(new PfLabelGroupExpandEvent());
  }

  #onCloseClick() {
    if (this.isConnected) {
      this.remove();
    }
  }

  #updateOverflow() {
    const labels = Array.from(this.#labels);
    labels.forEach((label, i) => {
      (label as any).accessibleCloseLabel = this.accessibleCloseLabel;
      const overflowHidden = i >= this.numLabels && !this.open;
      label.hidden = overflowHidden;
    });

    const rem = Math.max(0, labels.length - this.numLabels);
    this._overflowText = rem < 1 ?
      ''
      : this.open ?
        this.expandedText
        : this.collapsedText.replace(REMAINING_RE, rem.toString());

    if (rem < 1 && this.open) {
      this.open = false;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-label-group': PfLabelGroup;
  }
}

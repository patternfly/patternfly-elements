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
import '@patternfly/elements/pf-select/pf-select.js';

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
   * @default ''
   */
  @property({ attribute: 'accessible-label', type: String }) accessibleLabel = '';
  /**
   * Accessible label for the close button.
   * @default 'Close'
   */
  @property({ attribute: 'accessible-close-label', type: String }) accessibleCloseLabel = 'Close';

  /**
   * Text for collapsed overflow label. Use `${remaining}` to indicate number of hidden labels.
   * @default '${remaining} more'
   */
  @property({ attribute: 'collapsed-text', type: String }) collapsedText = '${remaining} more';

  /**
   * Text for expanded overflow label.
   * @default 'show less'
   */
  @property({ attribute: 'expanded-text', type: String }) expandedText = 'show less';

  /**
   * Number of labels to show before creating an overflow label.
   * @default 3
   */
  @property({ attribute: 'num-labels', type: Number }) numLabels = 3;

  /**
   * Whether the overflow labels are visible (expanded state).
   * @default false
   */
  @property({ reflect: true, type: Boolean }) open = false;

  /**
   * Whether the label group can be closed.
   * @default true
   */
  @property({ reflect: true, type: Boolean }) closeable = false;

  /** --- ADD LABEL FUNCTIONALITY --- */

  /**
   * Mode controlling how labels can be added.
   * - `none`: No add label functionality
   * - `autoNoEdit`: Adds a default label automatically
   * - `fromList`: Allows choosing a label from a predefined list
   * - `customForm`: Opens a form for custom label creation
   */
  @property({ type: String, reflect: true, attribute: 'add-label-mode' })
  addLabelMode: 'none' | 'autoNoEdit' | 'fromList' | 'customForm' = 'none';

  /**
   * Controls visibility of the label dropdown for `fromList` mode.
   */
  @state() showDropdown = false;

  /**
   * Controls visibility of the custom label form for `customForm` mode.
   */
  @state() showCustomForm = false;

  /**
   * Text value for a new custom label.
   */
  @state() newLabelText = 'Text box';

  /**
   * Color value for a new custom label.
   */
  @state() newLabelColor = 'grey';

  /**
 * Icon value for a new custom label.
 */
  @state() newLabelIcon = '';

  /**
 * Variant of the new label. Can be 'filled' or 'outline'.
 */
  @state() newLabelVariant = 'filled';

  /**
 * Whether the new custom label is dismissable.
 */
  @state() newLabelDismissable = false;

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
 * Reference to the add button element in the shadow DOM.
 */
  @query('#add-button') private _addButton?: HTMLButtonElement;

  /**
 * Reference to the custom label modal element.
 */
  @query('#custom-label-modal')
  private _customModal!: HTMLElement & { show: () => void; close: () => void };

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
      this._addButton,
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

        ${this.addLabelMode !== 'none' ?
        html`
            <div style="position: relative; display: inline-block;">
              <pf-label
                  id="add-button"
                  color="blue"
                  variant="outline"
                  dismissible="false"
                  class="add-label"
                  @click="${this.#onAddClick}"
                >
                  Add label
                </pf-label>

                ${this.showDropdown ?
            html`
                    <div style="position: absolute; top: 100%; left: 0; z-index: 100%; background: white; border: 1px solid #ccc; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
                      ${this._defaultLabelList.map(
              label => html`
                          <pf-dropdown-item
                            @click="${() => this.#addLabelFromList(label)}"
                          >
                            ${label.name}
                          </pf-dropdown-item>`
            )}
                    </div>`
            : ''}
            </div>`
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

      ${this.showCustomForm ?
        html`
        <section>
          <pf-modal id="custom-label-modal" aria-describedby="custom-label-modal-description" variant="small" @close=${this.#closeCustomForm}>
            <h2 slot="header">Add label</h2>
            <div id="add-label-form">
              <label>
                Label text
                <input class="pf-c-form-control" .value=${this.newLabelText} @input=${(e: Event) => (this.newLabelText = (e.target as HTMLInputElement).value)} />
              </label>
              <label>Color</label>
              <pf-select id="color-select" @change=${this.#onSelectColor} style="display:inline-block; --pf-c-button--PaddingLeft:0.5rem; --pf-c-button--PaddingRight:0.5rem; --pf-c-button--MinWidth:0;">
                <pf-option value="Grey">Grey</pf-option>
                <pf-option value="Blue">Blue</pf-option>
                <pf-option value="Green">Green</pf-option>
                <pf-option value="Cyan">Cyan</pf-option>
                <pf-option value="Gold">Gold</pf-option>
                <pf-option value="Red">Red</pf-option>
                <pf-option value="Orange">Orange</pf-option>
                <pf-option value="Purple">Purple</pf-option>
              </pf-select>

              <label>Icon</label>
              <pf-select id="icon-select" @change=${this.#onSelectIcon} style="display:inline-block; --pf-c-button--PaddingLeft:0.5rem; --pf-c-button--PaddingRight:0.5rem; --pf-c-button--MinWidth:0;">
                <pf-option value="No icon">No icon</pf-option>
                <pf-option value="Info">Info</pf-option>
                <pf-option value="Check">Check</pf-option>
                <pf-option value="Exclamation">Exclamation</pf-option>
              </pf-select>

              <label>Label type</label>
              <div class="radio-group" id="label-type-group">
                <label><input type="radio" name="labelType" value="filled" .checked=${this.newLabelVariant === 'filled'} @change=${() => (this.newLabelVariant = 'filled')} />Filled</label>
                <label><input type="radio" name="labelType" value="outline" .checked=${this.newLabelVariant === 'outline'} @change=${() => (this.newLabelVariant = 'outline')} />Outline</label>
              </div>

              <label>Dismissable</label>
              <div class="radio-group" id="dismissable-group">
                <label><input type="radio" name="dismissable" value="true" .checked=${this.newLabelDismissable === true} @change=${() => (this.newLabelDismissable = true)} />Yes</label>
                <label><input type="radio" name="dismissable" value="false" .checked=${this.newLabelDismissable === false} @change=${() => (this.newLabelDismissable = false)} />No</label>
              </div>
            </div>

            <div slot="footer" style="display:flex; justify-content:flex-end; gap:0.5rem;">
              <pf-button variant="primary" @click=${this.#addCustomLabel}>Save</pf-button>
              <pf-button variant="secondary" @click=${this.#closeCustomForm}>Cancel</pf-button>
            </div>
          </pf-modal>
        </section>`
        : ''}
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
 * Handles click on the add label button according to `addLabelMode`.
 */
  #onAddClick() {
    switch (this.addLabelMode) {
      case 'none': break;
      case 'autoNoEdit': this.#addDefaultLabel(); break;
      case 'fromList': this.#showLabelDropdown(); break;
      case 'customForm': this.#openCustomForm(); break;
    }
  }

  /**
 * Adds a default label programmatically in `autoNoEdit` mode.
 */
  #addDefaultLabel() {
    const newLabel = document.createElement('pf-label');
    newLabel.textContent = 'New label';
    (newLabel as any).removable = true;
    this.insertBefore(newLabel, this.firstElementChild);
    this.requestUpdate();
    this.labelsChanged();
  }

  /**
 * Shows or hides the label dropdown for `fromList` mode.
 */
  #showLabelDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  /**
 * Adds a label from the predefined list.
 * @param label - Label object with `name`, optional `color` and `icon`
 */
  #addLabelFromList(label: { name: string; color?: string; icon?: string }) {
    const newLabel = document.createElement('pf-label');
    newLabel.textContent = label.name;
    if (label.color) {
      (newLabel as any).color = label.color;
    }
    if (label.icon) {
      (newLabel as any).icon = label.icon;
    }
    this.insertBefore(newLabel, this.firstElementChild);
    this.labelsChanged();
    this.showDropdown = false;
  }

  /**
 * Opens the custom label form modal in `customForm` mode.
 */
  #openCustomForm() {
    this.showCustomForm = true;
    this.updateComplete.then(() => this._customModal?.show());
  }

  /**
 * Closes the custom label form modal.
 */
  #closeCustomForm() {
    if (this._customModal) {
      this.showCustomForm = false;
    }
  }

  /**
 * Adds a custom label from form input values.
 */
  #addCustomLabel() {
    const newLabel = document.createElement('pf-label');
    newLabel.textContent = this.newLabelText;
    newLabel.setAttribute('color', this.newLabelColor);
    newLabel.setAttribute('variant', this.newLabelVariant);
    if (this.newLabelIcon) {
      newLabel.setAttribute('icon', this.newLabelIcon);
    }
    if (this.newLabelDismissable) {
      newLabel.setAttribute('removable', '');
    }
    this.insertBefore(newLabel, this.firstElementChild);

    this.newLabelText = 'Text box';
    this.newLabelColor = 'grey';
    this.newLabelIcon = '';
    this.newLabelVariant = 'filled';
    this.newLabelDismissable = false;
    this.showCustomForm = false;

    this.requestUpdate();
    this.labelsChanged();
  }

  /**
 * Updates the new label's color from the color select dropdown.
 * @param e - Change event from select element
 */
  #onSelectColor(e: Event) {
    const select = e.target as HTMLSelectElement;
    const selectedValue = select.value;
    this.newLabelColor = selectedValue.toLowerCase();
  }

  /**
 * Updates the new label's icon from the icon select dropdown.
 * @param e - Change event from select element
 */
  #onSelectIcon(e: Event) {
    const select = e.target as HTMLSelectElement;
    const selectedValue = select.value;
    this.newLabelIcon = selectedValue === 'No icon' ? ''
      : selectedValue.toLowerCase().concat('-circle');
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

  private _defaultLabelList: { name: string; color?: string; icon?: string }[] = [
    { name: 'Label 1', color: 'blue' },
    { name: 'Label 2', color: 'green', icon: 'check-circle' },
    { name: 'Label 3' },
    { name: 'Label 4', color: 'red' },
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-label-group': PfLabelGroup;
  }
}

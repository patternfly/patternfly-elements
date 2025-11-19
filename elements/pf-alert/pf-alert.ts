import { LitElement, html, type TemplateResult, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import '@patternfly/elements/pf-icon/pf-icon.js';
import '@patternfly/elements/pf-button/pf-button.js';
import styles from './pf-alert.css';


@customElement('pf-alert')
export class PfAlert extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];


  @property({ type: Number }) timeout = 0;

  @property({ reflect: true, attribute: 'ouia-id' }) ouiaId?: string;

  @property({ reflect: true })
  variant:
    | 'warning'
    | 'custom'
    | 'neutral'
    | 'info'
    | 'success'
    | 'danger' = 'neutral';

  @property() icon?: string;

  @property({ reflect: true, type: Boolean }) isExpandable = false;

  @property({ reflect: true, type: Boolean }) onClose = false;


  #timeoutId?: number;

  #slots = new SlotController(this, null, 'icon',
                              'actionClose',
                              'title',
                              'actionLinks',
                              'isExpandable');


  #onCloseClick() {
    if (this.isConnected) {
      clearTimeout(this.#timeoutId);
      this.remove();
    }
  }

  #onToggleClick() {
    this.isExpandable = !this.isExpandable;
  }

  override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('timeout')) {
      clearTimeout(this.#timeoutId);

      if (this.timeout > 0) {
        this.#timeoutId = setTimeout(() => {
          if (this.isConnected) {
            this.dispatchEvent(new CustomEvent('pf-alert:timeout'));
            this.remove();
          }
        }, this.timeout) as unknown as number;
      }
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.#timeoutId);
  }

  override render(): TemplateResult<1> {
    const { variant, isExpandable } = this;
    const calculatedIcon = this.icon ?? variantToIcon(variant);
    const hasIcon = !!calculatedIcon || this.#slots.hasSlotted('icon');
    const hasExpandableContent = this.#slots.hasSlotted('isExpandable');
    return html`
      <div id="container" part="container"
        class=${classMap({
      hasIcon, [variant ?? '']: !!variant, 'isExpandable': isExpandable,
    })}>


        <div id="toggle-container" part="toggle-container" ?hidden="${!hasExpandableContent}">
            <pf-button id="toggle-button"
                       plain
                       icon="${isExpandable ? 'angle-down' : 'angle-right'}"
                       icon-set="fas"
                       @click="${this.#onToggleClick}"
                       aria-expanded="${isExpandable ? 'true' : 'false'}"
                       aria-label="${isExpandable ? 'Collapse Alert' : 'Expand Alert'}">
            </pf-button>
        </div>

        <div id="icon-container" part="icon-container">
          <slot name="icon" part="icon">${!calculatedIcon ? '' : html`
            <pf-icon icon="${calculatedIcon}"></pf-icon>`}
          </slot>
        </div>

        

        <div id="title-area" part="title-area">
          <slot name="title"></slot>
        </div>

        <div id="expandable-description" part="expandable-description" 
          ?hidden="${!isExpandable}">
          <slot name="isExpandable"></slot>
        </div>

        <div id="description" part="description">
          <slot></slot>
        </div>

        <div id="action-links" part="action-links">
          <slot name="actionLinks"></slot>
        </div>

        <pf-button id="close-button"
                   plain
                   icon="close"
                   icon-set="patternfly"
                   ?hidden="${!this.onClose}"
                   @click="${this.#onCloseClick}">
        </pf-button>
      </div>
    `;
  }
}


const variantToIcon = (variant: PfAlert['variant']): string | undefined => {
  switch (variant) {
    case 'info':
      return 'info-circle';
    case 'success':
      return 'check-circle';
    case 'warning':
      return 'exclamation-triangle';
    case 'danger':
      return 'exclamation-circle';
    case 'neutral':
      return 'bell';
    case 'custom':
    default:
      return undefined;
  }
};

declare global {
  interface HTMLElementTagNameMap {
    'pf-alert': PfAlert;
  }
}

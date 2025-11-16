import { LitElement, html, type TemplateResult, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import '@patternfly/elements/pf-icon/pf-icon.js';
import styles from './pf-alert.css';


@customElement('pf-alert')
export class PfAlert extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  @property({ reflect: true })
  variant:
    | 'warning'
    | 'custom'
    | 'neutral'
    | 'info'
    | 'success'
    | 'danger' = 'neutral';

  @property() icon?: string;

  #slots = new SlotController(this, null, 'icon', 'actionClose', 'title');


  override render(): TemplateResult<1> {
    const { variant } = this;
    const calculatedIcon = this.icon ?? variantToIcon(variant);
    const hasIcon = !!calculatedIcon || this.#slots.hasSlotted('icon');
    return html`
      <div id="container" part="container"
        class=${classMap({ hasIcon, [variant ?? '']: !!variant })}>


        <div id="icon-container" part="icon-container">
          <slot name="icon" part="icon">${!calculatedIcon ? '' : html`
            <pf-icon icon="${calculatedIcon}"></pf-icon>`
          }
          </slot>
        </div>

        <div id="title-area" part="title-area">
          <slot name="title"></slot>
        </div>

        <div id="close-action" part="close-action">
          <slot name="actionClose"></slot> 
        </div>

        <div id="description" part="description">
          <slot></slot>
        </div>

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

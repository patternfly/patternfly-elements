
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { classMap } from 'lit/directives/class-map.js';
import '@patternfly/elements/pf-button/pf-button.js';

import styles from './pf-label-group.css';

export class GroupLabelCloseEvent extends Event {
  constructor() {
    super('close', { bubbles: true, cancelable: true });
  }
}

/**
 * Label Group
 * @slot - Place element content here
 */
@customElement('pf-label-group')
export class PfLabelGroup extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];


  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };


  @property({ type: String }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ type: Boolean }) removable = false;

  @property({ attribute: 'close-button-label' }) closeButtonLabel?: string;

  @property({ type: String }) categoryName = 'Category Name';

  @property({ attribute: 'add-label', type: Boolean }) addLabel = false;


  render(): TemplateResult<1> {
    const { removable, orientation } = this;
    return html`
    <span   id="container" class="${classMap({
      horizontal: orientation === 'horizontal',
      vertical: orientation === 'vertical',
      removable: removable,
    })}">
      <span part="close-button" ?hidden=${!this.removable}>
        </span>
         <slot name="header">${this.categoryName}</slot>
      

      <slot></slot>
      
       <!-- summary: container for removable label group' close button -->
        <span part="close-button" ?hidden=${!this.removable}>
          <pf-button plain
                     @click="${this.#onClickClose}"
                     label="${this.closeButtonLabel ?? 'remove'}">
            <svg viewBox="0 0 352 512">
              <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
            </svg>
          </pf-button>
        </span>
    `;
  }


  #onClickClose() {
    if (this.removable && this.dispatchEvent(new GroupLabelCloseEvent())) {
      this.remove();
    }
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'pf-label-group': PfLabelGroup;
  }
}

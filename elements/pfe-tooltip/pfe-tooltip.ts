/* eslint-disable no-console */
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { pfelement } from '@patternfly/pfe-core/decorators.js';

import styles from './pfe-tooltip.scss';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { createPopper } from './lib/createPopper';


/**
 * Tooltips are used.
 *
 * @summary Organizes content in a contained view on the same page
 *
 */

@customElement('pfe-tooltip') @pfelement()
export class PfeTooltip extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [styles];

  @property({ type: String, reflect: true }) position: 'top'|'left'|'right'|'bottom' = 'top';

  @property({ type: Boolean, reflect: true, attribute: 'is-open' }) isOpen = true;

  @property({ type: Array, reflect: true }) offset = [0, 18];

  private _id = `${PfeTooltip.name}-${getRandomId()}`;

  private _invoker?: HTMLElement | null = this.shadowRoot?.querySelector<HTMLElement>('#invoker');
  private _tooltip?: HTMLElement | null = this.shadowRoot?.querySelector<HTMLElement>('.pf-c-tooltip');

  private _popper?: any;

  connectedCallback(): void {
    super.connectedCallback();
    this._addListeners();
  }

  firstUpdated() {
    this._setupPopper();
  }

  show() {
    // set the internal state to open
    this.isOpen = true;
    // remove the hidden attribute so that we display the tooltip in css
    this._tooltip?.classList.remove('hidden');
    // every time we show the tooltip we should run update on the popper
    // instance to ensure it is properly positioned.
    this._popper?.update();
  }

  hide() {
    // set the internal state to open
    this.isOpen = false;
    // add the hidden attribute so that we hide the tooltip in css
    this._tooltip?.classList.add('hidden');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeListeners();
  }

  render() {
    return html`
      <div id="invoker-id" class="pf-c-invoker" role="tooltip" tabindex="0" aria-labelledby="${this.id}">
        <slot name="invoker"></slot>
      </div>
      <div id="${this.id}" class="pf-c-tooltip hidden" aria-hidden=${this.isOpen ? 'false' : 'true'}>
        <div class="pf-c-tooltip__arrow"></div>
        <div id="content" class="pf-c-tooltip__content">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }

  _addListeners() {
    this.addEventListener('focus', this.show);
    this.addEventListener('blur', this.hide);
    this.addEventListener('tap', this.show);
    this.addEventListener('click', this.show);
    this.addEventListener('mouseenter', this.show);
    this.addEventListener('mouseleave', this.hide);
  }

  _removeListeners() {
    this.removeEventListener('focus', this.show);
    this.removeEventListener('blur', this.hide);
    this.removeEventListener('tap', this.show);
    this.removeEventListener('click', this.show);
    this.removeEventListener('mouseenter', this.show);
    this.removeEventListener('mouseleave', this.hide);
  }

  _setupPopper() {
    this._invoker = this.shadowRoot?.querySelector<HTMLElement>(`#invoker-id`);
    this._tooltip = this.shadowRoot?.querySelector<HTMLElement>('.pf-c-tooltip');
    if (this._invoker && this._tooltip) {
      this._popper = createPopper(this._invoker, this._tooltip, {
        placement: this.position,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: this.offset
            }
          }
        ]
      });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tooltip': PfeTooltip;
  }
}

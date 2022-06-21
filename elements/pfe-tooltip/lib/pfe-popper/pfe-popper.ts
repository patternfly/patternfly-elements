import { eventListeners, popperOffsets, computeStyles, applyStyles, offset, flip, preventOverflow, arrow, hide, Instance, popperGenerator } from '@popperjs/core';

/* eslint-disable no-console */
import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { colorContextConsumer, pfelement } from '@patternfly/pfe-core/decorators.js';

import styles from './pfe-popper.scss';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { ColorTheme } from '@patternfly/pfe-core/core';
import { Position } from './pfe-popper-types';

@customElement('pfe-popper') @pfelement()
export class PfePopper extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [styles];

  @colorContextConsumer()
  @property({ reflect: true }) on: ColorTheme = 'light';

  @property({ type: String, reflect: true }) position = Position.TOP;

  @property({ type: Boolean, reflect: true, attribute: 'is-open' }) isOpen = true;

  @property({ type: Array, reflect: true }) offset = [0, 18];

  private _id = `${PfePopper.name}-${getRandomId()}`;

  @query('.invoker') _invoker?: HTMLElement|null;
  @query('.tooltip') _tooltip?: HTMLElement|null;

  private _popper?: Instance;

  private createPopper = popperGenerator({
    defaultModifiers: [eventListeners, popperOffsets, computeStyles, applyStyles, offset, flip, preventOverflow, arrow, hide],
  });

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
      <div id="invoker-id" class="invoker" role="tooltip" tabindex="0" aria-labelledby="${this._id}">
        <slot name="popper-invoker"></slot>
      </div>
      <div id="${this._id}" class="tooltip hidden" aria-hidden=${this.isOpen ? 'false' : 'true'}>
        <div class="tooltip__arrow"></div>
        <div id="content" class="tooltip__content">
          <slot name="popper-content"></slot>
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
    if (this._invoker && this._tooltip) {
      this._popper = this.createPopper(this._invoker, this._tooltip, {
        placement: this.position,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: this.offset
            }
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top', 'right', 'left', 'bottom'],
            },
          }
        ]
      });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-popper': PfePopper;
  }
}

/* eslint-disable no-console */
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { Placement } from '@popperjs/core';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { TooltipDOMController } from '@patternfly/pfe-core/controllers/popper-controller.js';
export abstract class BaseTooltip extends LitElement {
  @property({ reflect: true, type: String }) position = 'top';

  @property({ reflect: true, type: Array }) offset = [0, 15];

  #id = getRandomId(this.localName);

  #domController: TooltipDOMController = new TooltipDOMController(this);

  get #isOpen(): boolean {
    return this.#domController.getOpen();
  }

  get #invoker() {
    return this.shadowRoot?.querySelector('#invoker-id');
  }

  get #tooltip() {
    return this.shadowRoot?.querySelector(`[id^=${this.localName}`);
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!['top', 'bottom'].includes(this.position)) {
      this.offset = [-4, 15];
    }
    this._addListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeListeners();
  }

  protected override firstUpdated(): void {
    if (this.#invoker && this.#tooltip) {
      this.#domController.create(this.#invoker, this.#tooltip as HTMLElement, this.position as Placement, this.offset);
    }
  }

  show() {
    if (this.#domController) {
      this.#domController.show();
      this.performUpdate();
    }
  }

  hide() {
    if (this.#domController) {
      this.#domController.hide();
      this.performUpdate();
    }
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

  override render() {
    return html`
      <div id="invoker-id" role="tooltip" tabindex="0" aria-labelledby="${this.#id}">
        <slot name="invoker"></slot>
      </div>
      <div id="${this.#id}" aria-hidden=${this.#isOpen ? 'false' : 'true'}>
        <div class="tooltip__arrow"></div>
        <div id="content" class="tooltip__content">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
}

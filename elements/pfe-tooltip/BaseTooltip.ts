import type { Placement } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import { NumberListConverter } from '@patternfly/pfe-core';

import style from './BaseTooltip.scss';

export abstract class BaseTooltip extends LitElement {
  static readonly styles = [style];

  /** The placement of the tooltip, relative to the invoking content */
  @property({ reflect: true }) position: Placement = 'top';

  /**
   * Optional tooltip offset: a comma separated coordinate pair of numbers
   *     ```html
   *     <pfe-tooltip offset="5,6">...</pfe-tooltip>
   *     ```
   */
  @property({ converter: NumberListConverter }) offset = [0, 15];

  #domController: FloatingDOMController = new FloatingDOMController(this);

  get #isOpen(): boolean {
    return this.#domController.open;
  }

  get #invoker(): HTMLElement|null {
    return this.shadowRoot?.querySelector<HTMLElement>('#invoker') ?? null;
  }

  get #tooltip(): HTMLElement|null {
    return this.shadowRoot?.querySelector<HTMLElement>(`#tooltip`) ?? null;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (!['top', 'bottom'].includes(this.position)) {
      this.offset = [-4, 15];
    }
    this.#addListeners();
  }

  /** Show the tooltip */
  show() {
    if (this.#invoker && this.#tooltip) {
      this.#domController.create(this.#invoker, this.#tooltip, this.position, this.offset);
      this.#domController.show();
    }
  }

  /** Hide the tooltip */
  hide() {
    this.#domController.hide();
  }

  #addListeners() {
    this.addEventListener('focus', this.show);
    this.addEventListener('blur', this.hide);
    this.addEventListener('tap', this.show);
    this.addEventListener('click', this.show);
    this.addEventListener('mouseenter', this.show);
    this.addEventListener('mouseleave', this.hide);
  }

  override render() {
    const { initialized } = this.#domController;
    return html`
      <div id="invoker" role="tooltip" tabindex="0" aria-labelledby="tooltip">
        <slot></slot>
      </div>
      <div id="tooltip" aria-hidden=${!this.#isOpen} class=${classMap({ initialized })}>
        <div class="arrow"></div>
        <div id="content" class="content">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
}

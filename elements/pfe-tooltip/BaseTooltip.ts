import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';


import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

import style from './BaseTooltip.scss';

const enterEvents = ['focus', 'tap', 'click', 'mouseenter'];
const exitEvents = ['blur', 'mouseleave'];

export abstract class BaseTooltip extends LitElement {
  static readonly styles = [style];

  /** The placement of the tooltip, relative to the invoking content */
  @property({ reflect: true }) position = 'top';

  @property({ reflect: true, type: Boolean }) showing = false;

  /**
   * Optional tooltip offset: a comma separated coordinate pair of numbers
   *     ```html
   *     <pfe-tooltip offset="5,6">...</pfe-tooltip>
   *     ```
   */
  @property({
    converter: {
      fromAttribute(numbers: string) {
        return numbers.split(',').map(x => parseInt(x.trim()));
      }
    }
  })
    offset = [0, 15];

  #domController: FloatingDOMController = new FloatingDOMController(this);

  get #isOpen(): boolean {
    return this.#domController.open;
  }

  get #arrow(): HTMLElement | null {
    return this.shadowRoot?.querySelector<HTMLElement>('#arrow') ?? null;
  }

  get #invoker(): HTMLElement | null {
    return this.shadowRoot?.querySelector<HTMLElement>('#invoker') ?? null;
  }

  get #tooltip(): HTMLElement | null {
    return this.shadowRoot?.querySelector<HTMLElement>(`#tooltip`) ?? null;
  }

  disconnectedCallback() {
    this.#domController.removeAutoUpdate();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (!['top', 'bottom'].includes(this.position)) {
      this.offset = [-4, 15];
    }
    enterEvents.forEach(evt => this.addEventListener(evt, this.show));
    exitEvents.forEach(evt => this.addEventListener(evt, this.hide));
  }

  show() {
    if (this.#invoker && this.#tooltip && this.#arrow) {
      this.#domController.create(this.#invoker, this.#tooltip, this.#arrow, this.position, this.offset);
      this.#domController.show();
      this.showing = true;
    }
  }


  hide() {
    this.showing = false;
    this.#domController.hide();
  }

  override render() {
    const { initialized } = this.#domController;
    return html`
      <div id="invoker" role="tooltip" tabindex="0" aria-labelledby="tooltip">
        <slot></slot>
      </div>
      <div id="tooltip" aria-hidden=${!this.#isOpen} class=${classMap({ initialized })}>
        <div id="arrow"></div>
        <div id="content" class="content">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
}

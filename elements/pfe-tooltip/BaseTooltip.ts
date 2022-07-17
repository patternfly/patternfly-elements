import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { FloatingDOMController, Placement } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

export abstract class BaseTooltip extends LitElement {
  /** The placement of the tooltip, relative to the invoking content */
  @property({ reflect: true }) position: Placement = 'top';

  /**
   * Optional tooltip offset: a comma separated coordinate pair of numbers
   *     ```html
   *     <pfe-tooltip offset="5,6">...</pfe-tooltip>
   *     ```
   */
  @property({ converter: {
    fromAttribute(numbers: string) {
      return numbers.split(',').map(x => parseInt(x.trim()));
    }
  } })
    offset = [0, 15];

  #id = getRandomId(this.localName);

  #domController: FloatingDOMController = new FloatingDOMController(this);

  get #isOpen(): boolean {
    return this.#domController.open;
  }

  get #invoker(): HTMLElement|null {
    return this.shadowRoot?.querySelector<HTMLElement>('#invoker') ?? null;
  }

  get #tooltip(): HTMLElement|null {
    return this.shadowRoot?.querySelector<HTMLElement>(`[id^=${this.localName}`) ?? null;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (!['top', 'bottom'].includes(this.position)) {
      this.offset = [-4, 15];
    }
    this._addListeners();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._removeListeners();
  }

  override firstUpdated(): void {
    if (this.#invoker && this.#tooltip) {
      this.#domController.create(this.#invoker, this.#tooltip, this.position, this.offset);
    }
  }

  /** Show the tooltip */
  show() {
    if (this.#domController) {
      this.#domController.show();
      this.performUpdate();
    }
  }

  /** Hide the tooltip */
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
      <div id="invoker" role="tooltip" tabindex="0" aria-labelledby="${this.#id}">
        <slot></slot>
      </div>
      <div id="${this.#id}" aria-hidden=${this.#isOpen ? 'false' : 'true'}>
        <div class="arrow"></div>
        <div id="content" class="content">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
}

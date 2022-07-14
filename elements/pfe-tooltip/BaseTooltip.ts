import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { Placement } from '@popperjs/core';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

/**
 * Base tooltip class
 *
 * A Tooltip is a floating text area triggered by a user that provides helpful or contextual information.
 *
 * @summary Toggle the visiblity of helpful or contextual information.
 *
 * @slot
 *       This slot wraps around the element that should be used to invoke the tooltip content to display.
 *       Typically this would be an icon, button, or other small sized element.
 * @slot content
 *       This slot renders the content that will be displayed inside of the tooltip.
 *       Typically this would include a string of text without any additional elements.
 *       This element is wrapped with a div inside of the component to give it the stylings and background colors.
 *
 * @cssprop     {<color>} --pf-c-toolip__content--BackgroundColor
 *              Sets the background color for the tooltip content.
 *              {@default `#1b1d21`}
 * @cssprop     {<color>} --pf-c-tooltip__content--Color
 *              Sets the font color for the tooltip content.
 *              {@default `#e0e0e0`}
 * @cssprop     {<number>} --pf-c-tooltip--line-height
 *              Sets the font color for the tooltip content.
 *              {@default `1.5`}
 * @cssprop     {<length>} --pf-c-tooltip--MaxWidth
 *              Maximum width for the tooltip.
 *              {@default `18.75rem`}
 * @cssprop     --pf-c-tooltip--BoxShadow
 *              Box shadow for the tooltip.
 *              {@default `0 0.25rem 0.5rem 0rem rgba(3, 3, 3, 0.12), 0 0 0.25rem 0 rgba(3, 3, 3, 0.06)`}
 * @cssprop     {<length>} --pf-c-tooltip__content--PaddingTop
 *              Top padding for the tooltip.
 *              {@default `0.5rem`}
 * @cssprop     {<length>} --pf-c-tooltip__content--PaddingRight
 *              Right padding for the tooltip.
 *              {@default `0.5rem`}
 * @cssprop     {<length>} --pf-c-tooltip__content--PaddingBottom
 *              Bottom padding for the tooltip.
 *              {@default `0.5rem`}
 * @cssprop     {<length>} --pf-c-tooltip__content--PaddingLeft
 *              Left Padding for the tooltip.
 *              {@default `0.5rem`}
 * @cssprop     --pf-c-tooltip__content--FontSize
 *              Font size for the tooltip content.
 *              {@default `0.875rem`}
 * @cssprop     {<length>} --pf-c-tooltip__arrow--Width
 *              Tooltip arrow width.
 *              {@default `0.5rem`}
 * @cssprop     {<length>} --pf-c-tooltip__arrow--Height
 *              Tooltip arrow height.s
 *              {@default `0.5rem`}
 * @cssprop     --pf-c-tooltip__arrow--m-top--TranslateX
 *              Positions the tooltip arrow along the x axis for `top` positioned arrows.
 *              {@default `-50%`}
 * @cssprop     --pf-c-tooltip__arrow--m-top--TranslateY
 *              Positions the tooltip arrow along the y axis for `top` positioned arrows.
 *              {@default `50%`}
 * @cssprop     --pf-c-tooltip__arrow--m-top--Rotate
 *              Rotates the tooltip arrow based on degrees of movement for `top` positioned arrows.
 *              {@default `45deg`}
 * @cssprop     --pf-c-tooltip__arrow--m-right--TranslateX
 *              Positions the tooltip arrow along the x axis for `right` positioned arrows.
 *              {@default `-50%`}
 * @cssprop     --pf-c-tooltip__arrow--m-right--TranslateY
 *              Positions the tooltip arrow along the y axis for `right` positioned arrows.
 *              {@default `-50%`}
 * @cssprop     --pf-c-tooltip__arrow--m-right--Rotate
 *              Rotates the tooltip arrow based on degrees of movement for `right` positioned arrows.
 *              {@default `45deg`}
 * @cssprop     --pf-c-tooltip__arrow--m-bottom--TranslateX
 *              Positions the tooltip arrow along the x axis for `bottom` positioned arrows.
 *              {@default `-50%`}
 * @cssprop     --pf-c-tooltip__arrow--m-bottom--TranslateY
 *              Positions the tooltip arrow along the y axis for `bottom` positioned arrows.
 *              {@default `-50%`}
 * @cssprop     --pf-c-tooltip__arrow--m-bottom--Rotate
 *              Rotates the tooltip arrow based on degrees of movement for `bottom` positioned arrows.
 *              {@default `45deg`}
 * @cssprop     --pf-c-tooltip__arrow--m-left--TranslateX
 *              Positions the tooltip arrow along the x axis for `left` positioned arrows.
 *              {@default `50%`}
 * @cssprop     --pf-c-tooltip__arrow--m-left--TranslateY
 *              Positions the tooltip arrow along the y axis for `left` positioned arrows.
 *              {@default `-50%`}
 * @cssprop     --pf-c-tooltip__arrow--m-left--Rotate
 *              Rotates the tooltip arrow based on degrees of movement for `left` positioned arrows.
 *              {@default `45deg`}
 */
export abstract class BaseTooltip extends LitElement {
  @property({ reflect: true, type: String }) position = 'top';

  @property({ reflect: true, type: Array }) offset = [0, 15];

  #id = getRandomId(this.localName);

  #domController: FloatingDOMController = new FloatingDOMController(this);

  get #isOpen(): boolean {
    return this.#domController.getOpen();
  }

  get #invoker() {
    return this.shadowRoot?.querySelector('#invoker');
  }

  get #tooltip() {
    return this.shadowRoot?.querySelector(`[id^=${this.localName}`);
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

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { computePosition, Placement, offset, shift, arrow } from '@floating-ui/dom';

import style from './BaseTooltip.scss';

const enterEvents = ['focus', 'tap', 'click', 'mouseenter'];
const exitEvents = ['blur', 'mouseleave'];

export abstract class BaseTooltip extends LitElement {
  static readonly styles = [style];

  /** The placement of the tooltip, relative to the invoking content */
  @property({ reflect: true }) position: Placement = 'top';

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

  get #arrow(): HTMLElement | null {
    return this.shadowRoot?.querySelector<HTMLElement>('#arrow') ?? null;
  }

  get #invoker(): HTMLElement | null {
    return this.shadowRoot?.querySelector<HTMLElement>('#invoker') ?? null;
  }

  get #tooltip(): HTMLElement | null {
    return this.shadowRoot?.querySelector<HTMLElement>(`#tooltip`) ?? null;
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
    if (this.#invoker && this.#tooltip) {
      computePosition(this.#invoker!, this.#tooltip!, {
        strategy: 'absolute',
        placement: this.position,
        middleware: [
          offset(this.offset[1]),
          shift(),
          arrow({
            element: this.#arrow!
          }),
        ]
      }).then(({ x, y, middlewareData }) => {
        Object.assign(this.#tooltip!.style, {
          top: `${y}px`,
          left: `${x}px`,
        });

        if (middlewareData.arrow) {
          const { y: arrowY, x: arrowX } = middlewareData.arrow;

          const staticSide = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right',
          }[this.position.split('-')[0]];

          Object.assign(this.#arrow!.style, {
            left: arrowX != null ? `${arrowX}px` : '',
            top: arrowY != null ? `${arrowY}px` : '',
            right: '',
            bottom: '',
            [staticSide]: '-4px',
          });
        }
      });
    }
    this.showing = true;
  }


  hide() {
    this.showing = false;
  }

  override render() {
    // const { initialized } = this.#domController;
    return html`
      <div id="invoker" role="tooltip" tabindex="0" aria-labelledby="tooltip">
        <slot></slot>
      </div>
      <div id="tooltip">
        <div id="arrow"></div>
        <div id="content" class="content">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
}

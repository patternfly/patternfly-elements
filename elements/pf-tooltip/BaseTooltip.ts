// we will remove this file in #2628
/* eslint-disable lit-a11y/no-aria-slot */
import type { Placement } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

import style from './BaseTooltip.css';

const enterEvents = ['focusin', 'tap', 'click', 'mouseenter'];
const exitEvents = ['focusout', 'blur', 'mouseleave'];

/**
 * @deprecated - Will be removed in the next major version. Use FloatingDOMController
 */
export abstract class BaseTooltip extends LitElement {
  static readonly styles = [style];

  abstract content?: string;

  /** The position of the tooltip, relative to the invoking content */
  abstract position?: Placement;

  #float = new FloatingDOMController(this, {
    content: (): HTMLElement | undefined | null => this.shadowRoot?.querySelector('#tooltip'),
  });

  override connectedCallback(): void {
    super.connectedCallback();
    enterEvents.forEach(evt => this.addEventListener(evt, this.show));
    exitEvents.forEach(evt => this.addEventListener(evt, this.hide));
  }

  async show() {
    await this.updateComplete;
    const placement = this.position;
    const offset =
        !placement?.match(/top|bottom/) ? 15
      : { mainAxis: 15, alignmentAxis: -4 };
    await this.#float.show({ offset, placement });
  }

  async hide() {
    await this.#float.hide();
  }

  override render() {
    const { alignment, anchor, open, styles } = this.#float;

    return html`
      <div id="container"
           style="${styleMap(styles)}"
           class="${classMap({ open,
                               [anchor]: !!anchor,
                               [alignment]: !!alignment })}">
        <slot id="invoker" role="tooltip" aria-labelledby="tooltip"></slot>
        <slot id="tooltip"
              name="content"
              aria-hidden="${String(!open) as 'true' | 'false'}">${this.content}</slot>
      </div>
    `;
  }
}

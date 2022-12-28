import type { Placement } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import { NumberListConverter } from '@patternfly/pfe-core';

import style from './BaseTooltip.scss';

const enterEvents = ['focusin', 'focusout', 'tap', 'click', 'mouseenter'];
const exitEvents = ['blur', 'mouseleave'];

export abstract class BaseTooltip extends LitElement {
  static readonly styles = [style];

  /** The placement of the tooltip, relative to the invoking content */
  @property({ reflect: true }) position: Placement = 'top';

  @property({ reflect: true, type: Boolean })
  get showing() {
    return this.#float.open;
  }

  set showing(v: boolean) {
    this.#float.open = v;
    this.toggleAttribute('showing', v);
  }

  /**
   * Optional tooltip offset: a comma separated coordinate pair of numbers
   *     ```html
   *     <pfe-tooltip offset="5,6">...</pfe-tooltip>
   *     ```
   */
  @property({ converter: NumberListConverter }) offset = [0, 15];

  #float: FloatingDOMController;

  disconnectedCallback() {
    super.disconnectedCallback?.();
    this.#float.removeAutoUpdate();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (!['top', 'bottom'].includes(this.position)) {
      this.offset = [-4, 15];
    }
    enterEvents.forEach(evt => this.addEventListener(evt, this.show));
    exitEvents.forEach(evt => this.addEventListener(evt, this.hide));
  }

  firstUpdated() {
    const arrow = this.shadowRoot.querySelector('#arrow');
    const invoker = this.shadowRoot.querySelector('#invoker');
    const content = this.shadowRoot.querySelector('#tooltip');
    this.#float = new FloatingDOMController(this, { arrow, invoker, content });
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('position')) {
      this.#float.position = this.position;
    }
    if (changed.has('offset')) {
      this.#float.offset = this.offset;
    }
  }

  async show() {
    await this.updateComplete;
    const { offset, position } = this;
    await this.#float?.show({ offset, placement: position });
  }

  async hide() {
    await this.updateComplete;
    await this.#float?.hide();
  }

  override render() {
    return html`
      <span id="invoker" part="invoker" role="tooltip" tabindex="0" aria-labelledby="tooltip">
        <slot></slot>
      </span>
      <span id="tooltip" aria-hidden=${String(!this.#float?.open)} class=${classMap({ initialized: !!this.#float })}>
        <span id="arrow" style="${styleMap(this.#float?.arrowStyles ?? {})}"></span>
        <span id="content" class="content" style="${styleMap(this.#float?.contentStyles ?? {})}">
          <slot name="content"></slot>
        </span>
      </span>
    `;
  }
}

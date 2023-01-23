/* eslint-disable lit-a11y/click-events-have-key-events */
import { LitElement } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import styles from './pfe-popover.scss';

const headingLevels = [2, 3, 4, 5, 6] as const;

type HeadingLevel = typeof headingLevels[number];

/**
 * Popover
 * @slot - Place element content here
 */
@customElement('pfe-popover')
export class PfePopover extends LitElement {
  static readonly styles = [styles];

  @property() position = 'top';
  @property({ type: String, reflect: true }) header?: string;
  @property({ type: Number, reflect: true }) headingLevel?: HeadingLevel;
  @property({ type: String, reflect: true }) body?: string; // todo: make required
  @property({ type: String, reflect: true }) footer?: string;

  #float = new FloatingDOMController(this, {
    arrow: true,
    content: () => this.shadowRoot?.querySelector('#popover'),
  });

  #slots = new SlotController(this, { slots: [null, 'header', 'header-icon', 'body', 'footer'] });

  constructor() {
    super();
    // this.addEventListener('click', this.show);
  }

  async show() {
    await this.updateComplete;
    const placement = this.position;
    // todo: determine final offset due to larger arrow size
    const offset = !placement?.match(/top|bottom/) ? 35 : { mainAxis: 35, alignmentAxis: -4 };
    await this.#float.show({ offset, placement });
  }

  async hide() {
    await this.#float.hide();
  }

  render() {
    const { alignment, anchor, open, styles } = this.#float;
    const level = headingLevels.find(l => l === this.headingLevel) ?? 6;
    const hasHeader = this.#slots.hasSlotted('header') || !!this.header;
    const hasHeaderIcon = this.#slots.hasSlotted('header-icon');
    const hasFooter = this.#slots.hasSlotted('footer') || !!this.footer;

    return html`
      <div id="container"
          style="${styleMap(styles)}"
          class="${classMap({ open, [anchor]: !!anchor, [alignment]: !!alignment })}"
      >
      <!-- Popover -->
        <div id="popover">
          <!-- Content wrapper -->
          <div id="content" part="content">
            <!-- Close button -->
            <pfe-button id="close-button"
                label="Close"
                part="close-button"
                plain
                @click=${this.hide}>
              <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 352 512">
                <path
                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                ></path>
              </svg>
            </pfe-button>
            <!-- Header -->
            <header part="header" ?hidden=${!hasHeader}>
              <!-- Header icon -->
              <span part="header-icon" ?hidden=${!hasHeaderIcon}><slot name="header-icon"></slot></span>
              <!-- Header text -->
              <slot name="header">
                ${unsafeStatic(`<h${level} id="heading">${this.header}</h${level}>`)}
              </slot>
            </header>
            <!-- Body -->
            <div part="body">
              <slot name="body">${this.body}</slot>
            </div>
            <!-- Footer -->
            <footer part="footer" ?hidden=${!hasFooter}>
              <slot name="footer">${this.footer}</slot>
            </footer>
          </div>
        </div>
        <!-- Trigger -->
        <slot id="invoker" @click=${this.show}></slot>
      </div>
      <!-- <div
        class="pf-c-popover pf-m-top"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popover-top-header"
        aria-describedby="popover-top-body"
      >
        <div class="pf-c-popover__arrow"></div>
        <div class="pf-c-popover__content">
          <button class="pf-c-button pf-m-plain" type="button" aria-label="Close">
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
          <h1 class="pf-c-title pf-m-md" id="popover-top-header">Popover header</h1>
          <div class="pf-c-popover__body" id="popover-top-body">
            Popovers are triggered by click rather than hover. Click again to close.
          </div>
          <footer class="pf-c-popover__footer">Popover footer</footer>
        </div>
      </div> -->
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-popover': PfePopover;
  }
}

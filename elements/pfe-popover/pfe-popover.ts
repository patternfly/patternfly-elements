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

  @property({ type: String, reflect: true }) header?: string;
  @property({ type: Number, reflect: true }) headingLevel?: HeadingLevel;
  @property({ type: String, reflect: true }) body?: string; // todo: make required
  @property({ type: String, reflect: true }) footer?: string;

  #float = new FloatingDOMController(this, {
    arrow: true,
    content: () => this.shadowRoot?.querySelector('#popover'),
  });

  #slots = new SlotController(this, { slots: [null, 'header', 'header-icon', 'body', 'footer'] });

  render() {
    const level = headingLevels.find(l => l === this.headingLevel) ?? 6;
    const hasHeader = this.#slots.hasSlotted('header') || !!this.header;
    const hasHeaderIcon = this.#slots.hasSlotted('header-icon');
    const hasFooter = this.#slots.hasSlotted('footer') || !!this.footer;

    return html`
      <div id="container"
          style="${styleMap(styles)}"
          class="${classMap({ open, [anchor]: !!anchor, [alignment]: !!alignment })}">
        <div id="popover" part="content">
          <!-- todo: close btn -->
          <header part="header" ?hidden=${!hasHeader}>
            <span ?hidden=${!hasHeaderIcon}><slot name="header-icon"></slot></span>         
            <slot name="header">
              ${unsafeStatic(`<h${level}>${this.header}</h${level}>`)}
            </slot>
          </header>
          <div part="body">
            <slot name="body">${this.body}</slot>
          </div>
          <footer part="footer" ?hidden=${!hasFooter}>
            <slot name="footer">${this.footer}</slot>
          </footer>
        </div>
        <slot id="invoker"></slot>
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

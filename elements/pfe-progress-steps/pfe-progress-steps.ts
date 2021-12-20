import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { pfelement, bound, cascades } from '@patternfly/pfe-core/decorators.js';

import style from './pfe-progress-steps.scss';

import './pfe-progress-steps-item.js';

/**
 * A component that gives the user a visual representation of the current state of their progress through an application (typically a multistep form).
 * @cssprop --pfe-progress-steps__item--Width {@default var(--pfe-theme--ui--element--size--lg, 75px)} item
 * @cssprop --pfe-progress-steps__circle--Size {@default var(--pfe-theme--ui--element--size--md, 32px)} circle
 * @cssprop --pfe-progress-steps__progress-bar--Color {@default var(--pfe-theme--color--ui--border--lighter, #d2d2d2)} progress
 * @cssprop --pfe-progress-steps__progress-bar--Fill {@default var(--pfe-theme--color--ui-accent, #06c)} progress
 * @cssprop --pfe-progress-steps__progress-bar--Width {@default var(--pfe-theme--ui--border-width--md, 2px)} progress
 */
@customElement('pfe-progress-steps') @pfelement()
export class PfeProgressSteps extends LitElement {
  static readonly styles = [style];

  @cascades('pfe-progress-steps-item')
  @property({ type: Boolean, reflect: true }) vertical = false

  private _resizeObserver = new ResizeObserver(this._build);

  private get stepItems() {
    return [...this.querySelectorAll('pfe-progress-steps-item')];
  }

  private get _progressBar() {
    return this.shadowRoot?.querySelector<HTMLElement>(`.pfe-progress-steps__progress-bar--fill`) ?? null;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this._resizeObserver) {
      // this will call _build initially and estabilish a resize observer for this element
      this._resizeObserver.observe(this);
    } else {
      // if we don't have access to resize observer then
      // manually call build.
      this._build();
    }
  }

  render() {
    return html`
      <div class="pfe-progress-steps__progress-bar">
        <span class="pfe-progress-steps__progress-bar--fill"></span>
      </div>
      <slot></slot>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
  }

  @bound private _build() {
    const items = this.stepItems;

    // find what child item has the active state
    const activeItemIndex = items.findIndex(element => element.current);
    if (activeItemIndex >= 0) {
      // Calculate the size of the progress bar.
      const size = `${(activeItemIndex / (items.length - 1)) * 100}%`;
      const dimension = this.vertical ? 'height' : 'width';
      this._progressBar?.style.setProperty(dimension, size);
    }

    for (let index = 0; index < items.length; index++) {
      const item = items[index];

      if (!this.vertical) {
        Promise.all([customElements.whenDefined(item.tagName.toLowerCase())]).then(() => {
          if (index === 0) {
            this.style.setProperty(
              '--pfe-progress-steps__item--size--first',
              `${item.getBoundingClientRect().width}px`
            );
          } else if (index === items.length - 1) {
            this.style.setProperty(
              '--pfe-progress-steps__item--size--last',
              `${item.getBoundingClientRect().width}px`
            );
          }
        });
      } else {
        // Add spacing to the each of the items except for the top item
        // @todo we have to do it in javascript until everyone supports
        // targeting siblings in :slotted. i.e. slot:slotted(pfe-progress-steps-item + pfe-progress-steps-item) { margin-top }

        // if it's the last item then we'll explicitly set the min-height
        // to 0 so the circle and lines stop at the top of the last item.
        if (index === items.length - 1) {
          item.style.minHeight = '0';
        }
        // if it's not the last item then unset any inline min-height style
        // that was set.
        else {
          item.style.minHeight = '';
        }
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-progress-steps': PfeProgressSteps;
  }
}

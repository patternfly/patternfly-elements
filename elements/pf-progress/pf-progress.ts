import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';

import styles from './pf-progress.css';

const ICONS = new Map(Object.entries({
  success: { icon: 'circle-check' },
  danger: { icon: 'circle-xmark' },
  warning: { icon: 'triangle-exclamation' }
}));

/**
 * A progress bar gives the user a visual representation of their completion status of an ongoing process or task.
 *
 * @summary Display completion status of ongoing process or task.
 *
 * @cssprop {<length>} --pf-c-progress--GridGap
 *          Gap between the sections of the progress bar.
 *          {@default `1rem`}
 *
 * @cssprop {<color>} --pf-c-progress__bar--before--BackgroundColor
 *          Color of the progress bar.
 *          {@default `#06c`}
 *
 * @cssprop {<length>} --pf-c-progress__bar--Height
 *          Height of the progress bar.
 *          {@default `1rem`}
 *
 * @cssprop {<color>} --pf-c-progress__bar--BackgroundColor
 *          Background color of the progress bar.
 *          {@default `#ffffff`}
 *
 * @cssprop {<color>} --pf-c-progress__status-icon--Color
 *          Color of the status icon.
 *          {@default `#151515`}
 *
 * @cssprop {<length>} --pf-c-progress__status-icon--MarginLeft
 *          Margin left of the status icon.
 *          {@default `0.5rem`}
 *
 * @cssprop {<length>} --pf-c-progress__bar--before--Opacity
 *          Opacity of the progress bar.
 *          {@default `.2`}
 *
 * @cssprop {<length>} --pf-c-progress__indicator--Height
 *          Height of the progress bar indicator.
 *          {@default `1rem`}
 *
 * @cssprop {<color>} --pf-c-progress__indicator--BackgroundColor
 *          Background color of the progress bar indicator.
 *          {@default `#ffffff`}
 *
 * @cssprop {<color>} --pf-c-progress--m-success__bar--BackgroundColor
 *          Background color of the progress bar when variant is success.
 *          {@default `#3e8635`}
 *
 * @cssprop {<color>} --pf-c-progress--m-warning__bar--BackgroundColor
 *          Background color of the progress bar when variant is warning.
 *          {@default `#f0ab00`}
 *
 * @cssprop {<color>} --pf-c-progress--m-danger__bar--BackgroundColor
 *          Background color of the progress bar when variant is danger.
 *          {@default `#c9190b`}
 *
 * @cssprop {<color>} --pf-c-progress--m-success__status-icon--Color
 *          Color of the status icon when variant is success.
 *          {@default `#3e8635`}
 *
 * @cssprop {<color>} --pf-c-progress--m-warning__status-icon--Color
 *          Color of the status icon when variant is warning.
 *          {@default `#f0ab00`}
 *
 * @cssprop {<color>} --pf-c-progress--m-danger__status-icon--Color
 *          Color of the status icon when variant is danger.
 *          {@default `#c9190b`}
 *
 * @cssprop {<length>} --pf-c-progress--m-inside__indicator--MinWidth
 *          Minimum width of the progress bar indicator when measure location is inside.
 *          {@default `2rem`}
 *
 * @cssprop {<color>} --pf-c-progress--m-inside__measure--Color
 *          Color of the progress bar measure when measure location is inside.
 *          {@default `#ffffff`}
 *
 * @cssprop {<color>} --pf-c-progress--m-success--m-inside__measure--Color
 *          Color of the progress bar measure when variant is success and measure location is inside.
 *          {@default `#ffffff`}
 *
 * @cssprop {<length>} --pf-c-progress--m-inside__measure--FontSize
 *          Font size of the progress bar measure when measure location is inside.
 *          {@default `0.875rem`}
 *
 * @cssprop {<length>} --pf-c-progress--m-outside__measure--FontSize
 *          Font size of the progress bar measure when measure location is outside.
 *          {@default `0.875rem`}
 *
 * @cssprop {<length>} --pf-c-progress--m-sm__bar--Height
 *          Height of the progress bar when the size is small.
 *          {@default `0.5rem`}
 *
 * @cssprop {<length>} --pf-c-progress--m-sm__description--FontSize
 *          Font size of the progress bar description when the size is small.
 *          {@default `0.875rem`}
 *
 * @cssprop {<length>} --pf-c-progress--m-sm__measure--FontSize
 *          Font size of the progress bar measure when the size is small.
 *          {@default `0.875rem`}
 *
 * @cssprop {<length>} --pf-c-progress--m-lg__bar--Height
 *          Height of the progress bar when the size is large.
 *          {@default `1.5rem`}
 *
 */
@customElement('pf-progress')
export class PfProgress extends LitElement {
  static readonly styles = [styles];

  @property({ reflect: true, type: Number })
    value = 0;

  @property({ reflect: true })
    title = '';

  @property({ reflect: true })
    label = '';

  @property({ reflect: true })
    size: 'sm' | 'lg' | '' = '';

  @property({ reflect: true, attribute: 'measure-location' })
    measureLocation: '' | 'outside' | 'inside' | 'none' = '';

  @property({ reflect: true })
    markdown: 'html' | 'progress' | 'meter' = 'html';

  @property({ reflect: true })
    variant: '' | 'success' | 'danger' | 'warning' = '';

  @query('#bar')
    bar!: HTMLElement;

  #showInsideStatus() {
    return this.measureLocation === 'inside';
  }

  async #updateAccessibility() {
    !!await this.updateComplete;

    const { bar, value } = this;
    bar.setAttribute('aria-valuenow', `${value}`);
    if (this.title.length > 0 && this.bar !== null) {
      this.bar.setAttribute('aria-labelledby', 'title');
    } else if (this.bar !== null) {
      this.bar.setAttribute('aria-label', this.label);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.#updateAccessibility();
  }

  render() {
    const { size, measureLocation, variant, value, title, markdown } = this;
    const icon = variant && ICONS.get(variant)?.icon;
    const singleLine = title.length === 0 ? 'singleline' : '';

    return html`
      <div part="container" class="container ${classMap({ [size]: !!size, [measureLocation]: !!measureLocation, [variant]: !!variant, [singleLine]: !!singleLine })}">
        <div id="title" class="title">${title}</div>
        <div class="status">
          ${html`${!this.#showInsideStatus() ? `${value}%` : ''}`}
          <pf-icon set="fas"
                   size="md"
                   ?hidden="${!icon}"
                   icon="${ifDefined(icon)}"></pf-icon>
        </div>
          ${markdown === 'html' ? html`
          <div id="bar" role="progressbar">
            <div class="indicator" style="${styleMap({ 'width': `${value}%` })}">
                ${html`${this.#showInsideStatus() ? `${value}%` : ''}`}
            </div>
          </div>
          ` : markdown === 'progress' ?
                html`<progress min="0" max="100" value="${value}"></progress>`
            : html`
              <meter min="0" max="100" value="${value}">
                  </meter>
              <span style="${styleMap({ 'width': `${value}%` })}" data-value="${value}">
                ${html`${this.#showInsideStatus() ? `${value}%` : ''}`}
              </span>
          `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-progress': PfProgress;
  }
}

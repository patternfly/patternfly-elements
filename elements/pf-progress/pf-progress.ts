import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

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

  static readonly formAssociated = true;

  #calculatedPercentage = 0;

  #logger = new Logger(this);

  @property({ reflect: true, type: Number })
    value = 0;

  @property()
    title = '';

  @property({ attribute: 'aria-label' })
    ariaLabel = '';

  @property({ type: Number })
    max = 100;

  @property({ type: Number })
    min = 0;

  @property()
    size: 'sm' | 'lg' | '' = '';

  @property({ reflect: true, attribute: 'measure-location' })
    measureLocation: '' | 'outside' | 'inside' | 'none' = '';

  @property()
    variant: '' | 'success' | 'danger' | 'warning' = '';

  @query('progress')
    progressElement!: HTMLProgressElement;

  #showInsideStatus() {
    return this.measureLocation === 'inside';
  }

  #calculatePercentage() {
    const { value, max, min } = this;
    if (value === null ) {
      this.#logger.warn(`A progress element requires a value attribute.`);
      return;
    }
    const percentage = (value - min) / (max - min);
    this.#calculatedPercentage = Math.round(percentage * 100);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.#calculatePercentage();
    this.#updateAccessibility();
  }

  #updateAccessibility() {
    const { value, title, ariaLabel, max, progressElement } = this;
    if (progressElement) {
      progressElement.setAttribute('aria-valuemin', '0');
      if (title || ariaLabel) {
        progressElement.setAttribute('aria-label', `${title ? title : ariaLabel}`);
      }
      if (max != null) {
        progressElement.setAttribute('aria-valuemax', `${max}`);
      }
      if (value) {
        progressElement.setAttribute('aria-valuenow', `${value}`);
      }
    }
  }

  render() {
    const { size, measureLocation, variant, title } = this;
    const icon = variant && ICONS.get(variant)?.icon;
    const singleLine = title.length === 0 ? 'singleline' : '';

    return html`
      <div
        class="container ${classMap({ [size]: !!size, [measureLocation]: !!measureLocation, [variant]: !!variant, [singleLine]: !!singleLine })}">
        
        ${title ?
          html`
          <div id="title" class="title">${title}</div>` : ''}
          
          ${measureLocation !== 'none' ? html`<div class="status">
            ${html`${!this.#showInsideStatus() ? `${this.#calculatedPercentage}%` : ''}`}
            <pf-icon set="fas"
                  size="md"
                  ?hidden="${!icon}"
                  icon="${ifDefined(icon)}"></pf-icon>
          </div>` : ''}
            
          <progress tabindex="0" max="100" value="${this.#calculatedPercentage}"></progress>
            
          ${this.#showInsideStatus() ? html`
            <span class="progress-span" style="${styleMap({ 'width': `${this.#calculatedPercentage}%` })}" data-value="${this.#calculatedPercentage}%"></span>`
            : ''}    
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-progress': PfProgress;
  }
}

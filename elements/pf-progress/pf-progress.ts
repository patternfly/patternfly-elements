import type { PropertyValues } from 'lit';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';

import styles from './pf-progress.css';

const ICONS = new Map(Object.entries({
  success: { icon: 'circle-check' },
  danger: { icon: 'circle-xmark' },
  warning: { icon: 'triangle-exclamation' },
}));

/**
 * A progress bar gives the user a visual representation of their completion status of an ongoing process or task.
 * @summary Display completion status of ongoing process or task.
 * @cssprop {<length>} --pf-c-progress--GridGap
 *          Gap between the sections of the progress bar.
 *          {@default `1rem`}
 * @cssprop {<color>} --pf-c-progress__bar--before--BackgroundColor
 *          Color of the progress bar.
 *          {@default `#06c`}
 * @cssprop {<length>} --pf-c-progress__bar--Height
 *          Height of the progress bar.
 *          {@default `1rem`}
 * @cssprop {<color>} --pf-c-progress__bar--BackgroundColor
 *          Background color of the progress bar.
 *          {@default `#ffffff`}
 * @cssprop {<color>} --pf-c-progress__status-icon--Color
 *          Color of the status icon.
 *          {@default `#151515`}
 * @cssprop {<length>} --pf-c-progress__status-icon--MarginLeft
 *          Margin left of the status icon.
 *          {@default `0.5rem`}
 * @cssprop {<length>} --pf-c-progress__indicator--Height
 *          Height of the progress bar indicator.
 *          {@default `1rem`}
 * @cssprop {<color>} --pf-c-progress__indicator--BackgroundColor
 *          Background color of the progress bar indicator.
 *          {@default `#ffffff`}
 * @cssprop {<color>} --pf-c-progress--m-success__bar--BackgroundColor
 *          Background color of the progress bar when variant is success.
 *          {@default `#3e8635`}
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
 * @cssprop {<color>} --pf-c-progress--m-success--m-inside__measure--Color
 *          Color of the progress bar measure when variant is success and measure location is inside.
 *          {@default `#ffffff`}
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
 * @cssprop {<length>} --pf-c-progress--m-lg__bar--Height
 *          Height of the progress bar when the size is large.
 *          {@default `1.5rem`}
 *
 */
@customElement('pf-progress')
export class PfProgress extends LitElement {
  static readonly styles = [styles];

  #internals = this.attachInternals();

  /** Represents the value of the progress bar */
  @property({ reflect: true, type: Number }) value = 0;

  /** Description (title) above the progress bar */
  @property() description?: string;

  /** Indicate whether to truncate the string description (title) */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'description-truncated',
  }) descriptionTruncated = false;

  /** Maximum value for the progress bar */
  @property({ type: Number, reflect: true }) max = 100;

  /** Minimum value for the progress bar */
  @property({ type: Number, reflect: true }) min = 0;

  /** Size of the progress bar (height) */
  @property() size?: 'sm' | 'lg';

  /** Where the percentage will be displayed with the progress element */
  @property({ attribute: 'measure-location' }) measureLocation?: 'outside' | 'inside' | 'none';

  /** Variant of the progress bar */
  @property() variant?: 'success' | 'danger' | 'warning';

  get #calculatedPercentage(): number {
    const { value, min, max } = this;
    const percentage = Math.round((value - min) / (max - min) * 100);
    if (Number.isNaN(percentage) || percentage < 0) {
      return 0;
    }
    return Math.min(percentage, 100);
  }

  get #icon() {
    return ICONS.get(this.variant ?? '')?.icon;
  }

  override willUpdate(changed: PropertyValues<this>) {
    if (changed.has('value') || changed.has('min') || changed.has('max')) {
      this.#internals.ariaValueNow = this.#calculatedPercentage.toString();
    }
    if (this.#icon) {
      import('@patternfly/elements/pf-icon/pf-icon.js');
    }
    if (this.descriptionTruncated) {
      import('@patternfly/elements/pf-tooltip/pf-tooltip.js');
    }
  }

  render() {
    const { size, measureLocation, variant, description, descriptionTruncated } = this;
    const icon = this.#icon;
    const singleLine = description?.length === 0;
    const pct = this.#calculatedPercentage;
    const width = `${pct}%`;

    return html`
      <div id="container" class="${classMap({
          [size ?? '']: !!size,
          [measureLocation ?? '']: !!measureLocation,
          [variant ?? '']: !!variant,
          singleLine,
          descriptionTruncated,
        })}">

        <div id="description" aria-hidden="true">${description ?? ''}</div>

        ${!descriptionTruncated ? '' : html`
        <pf-tooltip content="${this.description ?? ''}"
                    trigger="description"></pf-tooltip>
        `}

        ${measureLocation === 'none' ? '' : html`
        <div id="status" aria-hidden="true">
          ${measureLocation !== 'inside' ? '' : width}
          <pf-icon set="fas"
                   icon="${ifDefined(icon)}"
                   size="md"
                   ?hidden="${!icon}"
          ></pf-icon>
        </div>
        `}

          <progress id="progress"
                    max="100"
                    value="${pct}"
                    aria-valuemin="0"
                    aria-valuenow="${pct}"
                    aria-valuemax="100"
          ></progress>

          ${measureLocation !== 'inside' ? '' : html`
          <span id="progress-span"
                style="${styleMap({ width })}"
                data-value="${width}"></span>
          `}
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-progress': PfProgress;
  }
}

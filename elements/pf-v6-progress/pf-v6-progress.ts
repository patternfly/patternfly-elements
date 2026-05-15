import type { PropertyValues, TemplateResult } from 'lit';
import { LitElement, html, nothing } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './pf-v6-progress.css';

export type ProgressSize = 'sm' | 'lg';
export type ProgressMeasureLocation = 'outside' | 'inside' | 'none' | 'singleline';
export type ProgressVariant = 'success' | 'danger' | 'warning';

const checkCircleIcon = html`<svg id="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>`;
const triangleExclamationIcon = html`<svg id="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>`;
const circleExclamationIcon = html`<svg id="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>`;

const VARIANT_ICONS = new Map<ProgressVariant, TemplateResult>([
  ['success', checkCircleIcon],
  ['warning', triangleExclamationIcon],
  ['danger', circleExclamationIcon],
]);

/**
 * A progress bar gives the user a visual representation of their completion
 * status of an ongoing process or task.
 * @summary Display completion status of ongoing process or task.
 * @slot helper-text - Helper text displayed below the progress bar.
 * @cssprop {<color>} --pf-v6-c-progress__bar--BackgroundColor - Background color of the progress bar track
 * @cssprop {<color>} --pf-v6-c-progress__indicator--BackgroundColor - Background color of the progress indicator
 * @cssprop {<length>} --pf-v6-c-progress__bar--Height - Height of the progress bar
 * @cssprop {<color>} --pf-v6-c-progress__status-icon--Color - Color of the status icon
 * @cssprop {<length>} --pf-v6-c-progress--GridGap - Gap between progress bar grid rows
 */
@customElement('pf-v6-progress')
export class PfV6Progress extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  /** Represents the value of the progress bar */
  @property({ type: Number }) value = 0;

  /** Description (title) above the progress bar */
  @property() description?: string;

  /** Indicate whether to truncate the string description (title) */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'description-truncated',
  }) descriptionTruncated = false;

  /** Maximum value for the progress bar */
  @property({ type: Number }) max = 100;

  /** Minimum value for the progress bar */
  @property({ type: Number }) min = 0;

  /** Size of the progress bar (height) */
  @property({ reflect: true }) size?: ProgressSize;

  /** Where the percentage will be displayed with the progress element */
  @property({
    reflect: true,
    attribute: 'measure-location',
  }) measureLocation?: ProgressMeasureLocation;

  /** Variant of the progress bar */
  @property({ reflect: true }) variant?: ProgressVariant;

  /** Custom text for aria-valuetext, used for finite step and step instruction displays */
  @property({ attribute: 'value-text' }) valueText?: string;

  /** When true, applies a fixed minimum width to the measure display for visual alignment */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'static-width',
  }) staticWidth = false;

  #internals = InternalsController.of(this, { role: 'progressbar' });

  #hasHelperText = false;

  get #calculatedPercentage(): number {
    const { value, min, max } = this;
    const percentage = Math.round((value - min) / (max - min) * 100);
    if (Number.isNaN(percentage) || percentage < 0) {
      return 0;
    }
    return Math.min(percentage, 100);
  }

  get #displayText(): string {
    return this.valueText ?? `${this.#calculatedPercentage}%`;
  }

  get #icon(): TemplateResult | typeof nothing {
    return VARIANT_ICONS.get(this.variant!) ?? nothing;
  }

  override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('value') || changed.has('min') || changed.has('max')) {
      this.#internals.ariaValueNow = this.#calculatedPercentage.toString();
      this.#internals.ariaValueMin = '0';
      this.#internals.ariaValueMax = '100';
    }
    if (changed.has('valueText')) {
      this.#internals.ariaValueText = this.valueText ?? null;
    }
    if (changed.has('description')) {
      this.#internals.ariaLabel = this.description ?? 'Progress status';
    }
  }

  override render(): TemplateResult<1> {
    const pct = this.#calculatedPercentage;
    const displayText = this.#displayText;
    const icon = this.#icon;
    const noMeasure = this.measureLocation === 'none';
    const inside = this.measureLocation === 'inside';
    const hasDescription = this.description != null;
    const hasIcon = this.variant != null;

    return html`
      <div id="description"
           ?hidden="${!hasDescription}"
           title="${ifDefined(this.descriptionTruncated ? this.description : undefined)}">${this.description ?? ''}</div>

      <div id="status"
           aria-hidden="true"
           ?hidden="${noMeasure && !hasIcon}">
        ${!inside && !noMeasure ? html`<span id="measure">${displayText}</span>` : nothing}
        ${icon}
      </div>

      <div id="bar">
        <div id="indicator"
             style="${styleMap({ width: `${pct}%` })}">
          ${inside && !noMeasure ? html`<span id="measure">${displayText}</span>` : nothing}
        </div>
      </div>

      <div id="helper-text" ?hidden="${!this.#hasHelperText}">
        <slot name="helper-text" @slotchange="${this.#onHelperTextSlotchange}"></slot>
      </div>
    `;
  }

  #onHelperTextSlotchange(event: Event) {
    const slot = event.currentTarget as HTMLSlotElement;
    this.#hasHelperText = slot.assignedNodes().length > 0;
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-progress': PfV6Progress;
  }
}

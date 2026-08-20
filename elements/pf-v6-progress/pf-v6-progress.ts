import type { TemplateResult } from 'lit';
import { LitElement, html, nothing } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import { observes } from '@patternfly/pfe-core/decorators/observes.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import styles from './pf-v6-progress.css';

export type ProgressSize = 'sm' | 'lg';
export type ProgressMeasureLocation = 'outside' | 'inside' | 'none';
export type ProgressVariant = 'success' | 'danger' | 'warning';

// TODO: replace inline SVGs with <pf-v6-icon> when available
const checkCircleIcon = html`<svg id="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>`;
const triangleExclamationIcon = html`<svg id="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>`;
const circleExclamationIcon = html`<svg id="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>`;

const VARIANT_ICONS = new Map<ProgressVariant, TemplateResult>([
  ['success', checkCircleIcon],
  ['warning', triangleExclamationIcon],
  ['danger', circleExclamationIcon],
]);

/**
 * A progress bar provides a visual representation of completion status for an
 * ongoing process or task. Authors SHOULD provide a `description` attribute for
 * visible title text above the bar. The accessible name resolves in order:
 * `accessible-label`, then `description`, then a fallback of `"Progress status"`.
 * Authors can also use native `aria-labelledby` directly on the host element
 * to reference an external label (the host has `role="progressbar"`).
 *
 * Authors SHOULD set the `variant` attribute to `success`, `warning`, or
 * `danger` when the progress reaches a terminal state. Authors SHOULD AVOID
 * using `measure-location="inside"` without `size="lg"`, as the measure
 * text will not fit inside the bar at the default size.
 *
 * This element uses `role="progressbar"` via ElementInternals. `aria-valuenow`,
 * `aria-valuemin`, and `aria-valuemax` are managed internally based on the
 * `value`, `min`, and `max` properties. This element is non-interactive and
 * does not receive keyboard focus.
 *
 * @summary Displays completion status of an ongoing process or task.
 * @slot helper-text - Supplementary text below the progress bar, such as status messages or additional context. Slotted elements are automatically associated to the progressbar via `aria-describedby`.
 */
@customElement('pf-v6-progress')
export class PfV6Progress extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  /** Represents the value of the progress bar */
  @property({ type: Number }) value = 0;

  /** Visible title text above the progress bar */
  @property() description?: string;

  // TODO: consider promoting to an enum attribute (e.g. truncated="…" or
  // truncated="……") to support locale-specific truncation. CSS text-overflow:
  // ellipsis always renders U+2026 (three dots); Chinese convention is six dots
  // (two U+2026 characters). The attribute value could set a private CSS custom
  // property like --_truncation-string, used as text-overflow: var(--_truncation-string, ellipsis).
  // text-overflow accepts arbitrary strings, so any value works (e.g. "……", "Read more").
  // TODO: blocked on pf-v6-tooltip — React shows a positioned tooltip with the
  // full description text on hover when truncated. Add tooltip-position attribute to match.
  /** Truncate the description with ellipsis when it overflows */
  @property({ type: Boolean }) truncated = false;

  /** Screen reader label for the progress bar, set via ElementInternals. Overrides `description` for the accessible name when both are set. */
  @property({ attribute: 'accessible-label' }) accessibleLabel?: string;

  /** Maximum value for the progress bar */
  @property({ type: Number }) max = 100;

  /** Minimum value for the progress bar */
  @property({ type: Number }) min = 0;

  /** Size of the progress bar (height) */
  @property() size?: ProgressSize;

  /** Where the percentage will be displayed with the progress element */
  @property({ attribute: 'measure-location' }) measureLocation?: ProgressMeasureLocation;

  /** Variant of the progress bar */
  @property() variant?: ProgressVariant;

  /** Hide the status icon when a variant is set. Useful in tight layouts like table cells. */
  @property({ type: Boolean, attribute: 'hide-status-icon' }) hideStatusIcon = false;

  /** Custom text for aria-valuetext, used for finite step and step instruction displays */
  @property({ attribute: 'value-text' }) valueText?: string;

  #internals = InternalsController.of(this, { role: 'progressbar' });

  #slots = new SlotController(this, 'helper-text');

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
    if (this.hideStatusIcon) {
      return nothing;
    }
    return VARIANT_ICONS.get(this.variant!) ?? nothing;
  }

  @observes('value')
  @observes('min')
  @observes('max')
  private _updateAriaValue() {
    this.#internals.ariaValueNow = this.#calculatedPercentage.toString();
    this.#internals.ariaValueMin = '0';
    this.#internals.ariaValueMax = '100';
  }

  @observes('valueText')
  private _updateAriaValueText() {
    this.#internals.ariaValueText = this.valueText ?? null;
  }

  #updateHelperTextDescribedBy(
    slot = this.shadowRoot?.getElementById('helper-text-slot') as HTMLSlotElement,
  ) {
    const elements = slot?.assignedElements() ?? [];
    this.#internals.ariaDescribedByElements = elements.length ? elements : null;
  }

  #onHelperTextSlotchange(event: Event) {
    this.#updateHelperTextDescribedBy(event.target as HTMLSlotElement);
  }

  override firstUpdated(): void {
    this.#updateHelperTextDescribedBy();
  }

  @observes('accessibleLabel', { waitFor: 'connected' })
  @observes('description', { waitFor: 'connected' })
  private _updateAriaLabel() {
    this.#internals.ariaLabel = this.accessibleLabel ?? this.description ?? 'Progress status';
  }

  override render(): TemplateResult<1> {
    const pct = this.#calculatedPercentage;
    const displayText = this.#displayText;
    const icon = this.#icon;
    const noMeasure = this.measureLocation === 'none';
    const inside = this.measureLocation === 'inside';
    const hasDescription = this.description != null;
    const hasIcon = this.variant != null && !this.hideStatusIcon;
    const singleline = !hasDescription;

    const classes = {
      [this.size ?? '']: !!this.size,
      [this.measureLocation ?? '']: !!this.measureLocation && this.measureLocation !== 'none',
      [this.variant ?? '']: !!this.variant,
      singleline,
      truncated: this.truncated,
    };

    return html`
      <div id="container" class="${classMap(classes)}">
        <div id="description"
             ?hidden="${!hasDescription}"
>${this.description ?? ''}</div>

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

        <div id="helper-text" ?hidden="${this.#slots.isEmpty('helper-text')}">
          <!-- summary: Supplementary text below the progress bar -->
          <slot id="helper-text-slot" name="helper-text" @slotchange="${this.#onHelperTextSlotchange}"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-progress': PfV6Progress;
  }
}

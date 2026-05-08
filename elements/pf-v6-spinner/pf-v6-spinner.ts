import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './pf-v6-spinner.css';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * A **spinner** is an animated visual that indicates when a quick action is
 * in progress. For actions that may take a long time, use a progress bar instead.
 * @summary Indicates that an action is in progress.
 * @cssprop {<length>} [--pf-v6-c-spinner--diameter] - Custom diameter of the spinner
 * @cssprop {<color>} [--pf-v6-c-spinner--Color] - Color of the spinner stroke
 * @cssprop {<time>} [--pf-v6-c-spinner--AnimationDuration=1.4s] - Duration of one animation cycle
 * @cssprop {<number>} [--pf-v6-c-spinner--StrokeWidth=10] - Width of the spinner stroke
 */
@customElement('pf-v6-spinner')
export class PfV6Spinner extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  /** Preset sizes for the spinner */
  @property({ reflect: true }) size?: SpinnerSize;

  /**
   * When true, the spinner inherits its font size from the surrounding text,
   * allowing it to display inline with content.
   */
  @property({ type: Boolean, reflect: true }) inline = false;

  /** Custom diameter of spinner set as CSS variable */
  @property({ reflect: true }) diameter?: string;

  /** Accessible label describing what is loading */
  @property({ attribute: 'accessible-label' }) accessibleLabel?: string;

  #internals = InternalsController.of(this, {
    role: 'progressbar',
    ariaValueText: 'Loading...',
    ariaLabel: 'Loading...',
  });

  override willUpdate(changed: Map<PropertyKey, unknown>): void {
    if (changed.has('accessibleLabel')) {
      const label = this.accessibleLabel ?? 'Loading...';
      this.#internals.ariaLabel = label;
      this.#internals.ariaValueText = label;
    }
    if (changed.has('diameter')) {
      if (this.diameter) {
        this.style.setProperty('--pf-v6-c-spinner--diameter', this.diameter);
      } else {
        this.style.removeProperty('--pf-v6-c-spinner--diameter');
      }
    }
  }

  override render(): TemplateResult {
    return html`
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="45" fill="none" />
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-spinner': PfV6Spinner;
  }
}

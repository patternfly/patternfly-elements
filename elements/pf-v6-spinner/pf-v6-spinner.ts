import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './pf-v6-spinner.css';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * A **spinner** provides an animated indicator for in-progress actions.
 * Authors SHOULD set `accessible-label` when the default "Loading..." is
 * insufficient. For long-running operations, use a progress bar instead.
 * Respects `prefers-reduced-motion` by disabling animation.
 *
 * @summary Indicates that an action is in progress
 *
 * @cssprop {<length>} --pf-v6-c-spinner--diameter - Spinner diameter (overrides `size` attribute)
 * @cssprop {<length>} --pf-v6-c-spinner--Width - Spinner width
 * @cssprop {<length>} --pf-v6-c-spinner--Height - Spinner height
 * @cssprop {<color>} --pf-v6-c-spinner--Color - Spinner stroke color
 * @cssprop {<length>} --pf-v6-c-spinner--StrokeWidth - Spinner stroke width
 * @cssprop {<time>} --pf-v6-c-spinner--AnimationDuration - Duration of one animation cycle
 * @cssprop --pf-v6-c-spinner--AnimationTimingFunction - Animation timing function for rotation
 * @cssprop --pf-v6-c-spinner__path--AnimationTimingFunction - Animation timing function for dash
 * @cssprop {<length>} --pf-v6-c-spinner--m-xs--diameter - Diameter when size is xs
 * @cssprop {<length>} --pf-v6-c-spinner--m-sm--diameter - Diameter when size is sm
 * @cssprop {<length>} --pf-v6-c-spinner--m-md--diameter - Diameter when size is md
 * @cssprop {<length>} --pf-v6-c-spinner--m-lg--diameter - Diameter when size is lg
 * @cssprop {<length>} --pf-v6-c-spinner--m-xl--diameter - Diameter when size is xl
 * @cssprop {<length>} --pf-v6-c-spinner--m-inline--diameter - Diameter when inline (defaults to 1em)
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

  /** Accessible name for the spinner */
  @property({ attribute: 'accessible-label' }) accessibleLabel?: string;

  /** Text describing the current progress state */
  @property({ attribute: 'value-text' }) valueText?: string;

  #internals = InternalsController.of(this, {
    role: 'progressbar',
    ariaLabel: 'Loading...',
    ariaValueText: 'Loading...',
  });

  override willUpdate(changed: Map<PropertyKey, unknown>): void {
    if (changed.has('accessibleLabel')) {
      this.#internals.ariaLabel = this.accessibleLabel ?? 'Loading...';
    }
    if (changed.has('valueText')) {
      this.#internals.ariaValueText = this.valueText ?? 'Loading...';
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

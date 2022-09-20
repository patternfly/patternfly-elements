import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { observed } from '@patternfly/pfe-core/decorators.js';

import styles from './BaseSpinner.scss';

export type SpinnerSize = (
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
)

/**
 * Base spinner class
 *
 * @cssprop {<length>} --pf-c-spinner--diameter {@default `3.375rem`}
 */

export abstract class BaseSpinner extends LitElement {
  static readonly styles = [styles];

  @property({ reflect: true }) role = 'progressbar';

  /**
   * Size variant of progress
   */
  @property({ reflect: true }) size: SpinnerSize = 'xl';

  /**
   * Custom diameter of spinner set as CSS variable
   */
  @observed
  @property({ reflect: true }) diameter?: string;

  override render() {
    return html`
      <svg class="pf-c-spinner" viewBox="0 0 100 100">
        <circle class="pf-c-spinner__path" cx="50" cy="50" r="45" fill="none" />
      </svg>
    `;
  }

  protected _diameterChanged() {
    if (!this.diameter) {
      return;
    }

    this.style.setProperty('--pf-c-spinner--diameter', this.diameter);
  }
}

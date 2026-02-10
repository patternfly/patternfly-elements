import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { styleMap } from 'lit/directives/style-map.js';
import { property } from 'lit/decorators/property.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './pf-spinner.css';

/**
 * A **spinner** is used to indicate to users that an action is in progress. For actions
 * that may take a long time, use a progress bar instead.
 * @alias Spinner
 */

@customElement('pf-spinner')
export class PfSpinner extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  // eslint-disable-next-line no-unused-private-class-members
  #internals = InternalsController.of(this, { role: 'progressbar' });

  /** Preset sizes for the spinner */
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' | 'xl' = 'xl';

  /** Custom diameter of spinner set as CSS variable */
  @property({ reflect: true }) diameter?: `${string}${'px' | '%' | 'rem' | 'em' | 'fr' | 'pt'}`;

  override render(): TemplateResult<1> {
    return html`
      <svg viewBox="0 0 100 100"
           style="${styleMap({ '--pf-c-spinner--diameter': this.diameter })}">
        <circle cx="50" cy="50" r="45" fill="none" />
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-spinner': PfSpinner;
  }
}

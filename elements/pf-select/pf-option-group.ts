import { LitElement, html, type TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './pf-option-group.css';

/**
 * Group of options within a listbox
 * @slot - `<pf-option>` or `<hr>` elements
 * @slot label - Group label. Overrides the `label` attribute.
 */
@customElement('pf-option-group')
export class PfOptionGroup extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  /** Group description. Overridden by `label` slot. */
  @property() label?: string;

  /** whether group is disabled */
  @property({ type: Boolean, reflect: true }) disabled = false;

  // for the role
  // eslint-disable-next-line no-unused-private-class-members
  #internals = InternalsController.of(this, { role: 'group' });

  render(): TemplateResult<1> {
    const { disabled } = this;
    return html`
      <div id="label-container"
           role="presentation">
        <slot class="${classMap({ disabled })}"
              name="label">${this.label}</slot>
      </div>
      <slot class="${classMap({ disabled })}"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-option-group': PfOptionGroup;
  }
}

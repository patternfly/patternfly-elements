import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './pf-option-group.css';

/**
 * Group of options within a listbox
 * @slot - Place element content here
 */
@customElement('pf-option-group')
export class PfOptionGroup extends LitElement {
  static readonly styles = [styles];

  /** whether group is disabled */
  @property({ type: Boolean, reflect: true }) disabled = false;

  #internals = InternalsController.of(this, { role: 'group' });

  render() {
    const { disabled } = this;
    return html`
      <div id="label-container"
           name="label"
           role="presentation">
        <slot class="${classMap({ disabled })}"></slot>
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

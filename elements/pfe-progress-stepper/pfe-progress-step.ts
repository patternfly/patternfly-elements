import type { PropertyValues } from 'lit';

import { LitElement, html, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import style from './pfe-progress-steps-item.scss';

const ICONS = new Map(Object.entries({
  success: 'circle-check',
  danger: 'circle-exclamation',
  warning: 'triangle-exclamation',
  info: 'circle',
}));

/**
 * @slot -
 *       Short description of the current step.
 * @slot description
 *       Longer decscription of the current step.
 * @slot icon
 *       Overrides the icon property
 *
 */
@customElement('pfe-progress-step')
export class PfeProgressStep extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  @property() icon?: string;

  @property() description?: string;

  @property({ attribute: 'icon-set' }) iconSet?: string;

  /** Describes the state of the current item */
  @property({ reflect: true }) variant?: 'pending'|'info'|'success'|'warning'|'danger';

  /** Indicates if this item is the current active item. */
  @property({ type: Boolean, reflect: true }) current = false;

  #slots = new SlotController(this, 'title', 'description');

  #internals = new InternalsController(this);

  render() {
    const hasDescription = this.#slots.hasSlotted('description');
    const icon = this.icon ?? ICONS.get(this.variant ?? 'default');
    return html`
      <slot name="icon">
        <pfe-icon ?hidden="${!icon}"
                  icon="${ifDefined(icon)}"
                  set="${ifDefined(this.iconSet)}"></pfe-icon>
      </slot>
      <slot></slot>
      <slot name="description" ?hidden="${!hasDescription}">${this.description}</slot>
    `;
  }

  updated(changed: PropertyValues<this>) {
    super.updated?.(changed);
    this.#internals.ariaCurrent = String(!!this.current);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-progress-step': PfeProgressStep;
  }
}

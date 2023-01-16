import type { PropertyValues } from 'lit';

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import style from './pfe-progress-step.scss';

const ICONS = new Map(Object.entries({
  success: { icon: 'circle-check' },
  danger: { icon: 'circle-exclamation' },
  warning: { icon: 'triangle-exclamation' },
  info: { icon: 'resources-full', set: 'patternfly' },
}));

/**
 * @slot -
 *       Short description of the current step.
 * @slot description
 *       Longer description of the current step.
 * @slot icon
 *       Overrides the icon property
 *
 */
@customElement('pfe-progress-step')
export class PfeProgressStep extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  /** Optional extended description of the step */
  @property() description?: string;

  /** Step Icon */
  @property() icon?: string;

  /** Step icon set */
  @property({ attribute: 'icon-set' }) iconSet?: string;

  /** Describes the state of the current item */
  @property({ reflect: true }) variant?: 'pending'|'info'|'success'|'warning'|'danger';

  /** Indicates if this item is the current active item. */
  @property({ type: Boolean, reflect: true }) current = false;

  #slots = new SlotController(this, 'title', 'description');

  #internals = new InternalsController(this, {
    role: 'listitem',
  });

  render() {
    const hasDescription = !!this.description ?? this.#slots.hasSlotted('description');
    const icon = this.icon ?? ICONS.get(this.variant ?? 'default')?.icon;
    const set = this.iconSet ?? ICONS.get(this.variant ?? 'default')?.set;
    const { compact = false } = this.closest('pfe-progress-stepper') ?? {};
    return html`
      <div id="connector" class="${classMap({ compact })}">
        <slot id="icon" name="icon">
          <pfe-icon ?hidden="${!icon}"
                    icon="${ifDefined(icon)}"
                    set="${ifDefined(set)}"></pfe-icon>
        </slot>
      </div>
      <div id="main" class="${classMap({ compact })}">
        <slot id="title"></slot>
        <slot id="description" name="description" ?hidden="${!hasDescription}">${this.description}</slot>
      </div>
    `;
  }

  updated(changed: PropertyValues<this>) {
    super.updated?.(changed);
    if (changed.has('current')) {
      this.#internals.ariaCurrent = String(!!this.current);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-progress-step': PfeProgressStep;
  }
}

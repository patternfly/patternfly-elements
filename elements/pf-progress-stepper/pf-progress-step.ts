import type { PropertyValues, TemplateResult } from 'lit';
import type { PfProgressStepper } from './pf-progress-stepper.js';

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import style from './pf-progress-step.css';

const ICONS = new Map(Object.entries({
  success: { icon: 'check-circle' },
  danger: { icon: 'exclamation-circle' },
  warning: { icon: 'exclamation-triangle' },
  info: { icon: 'resources-full', set: 'patternfly' },
}));

/**
 * @slot -
 *       Short description of the current step.
 * @slot description
 *       Longer description of the current step.
 * @slot icon
 *       Overrides the icon property
 */
@customElement('pf-progress-step')
export class PfProgressStep extends LitElement {
  protected static parentTagName = 'pf-progress-stepper';

  static readonly styles: CSSStyleSheet[] = [style];

  /** Optional extended description of the step */
  @property() description?: string;

  /** Step Icon */
  @property() icon?: string;

  /** Step icon set */
  @property({ attribute: 'icon-set' }) iconSet?: string;

  /** Describes the state of the current item */
  @property({ reflect: true }) variant?: 'pending' | 'info' | 'success' | 'warning' | 'danger';

  /** Indicates if this item is the current active item. */
  @property({ type: Boolean, reflect: true }) current = false;

  #slots = new SlotController(this, 'title', 'description');

  #internals = InternalsController.of(this, { role: 'listitem' });

  render(): TemplateResult<1> {
    const hasDescription = !!(this.description ?? this.#slots.hasSlotted('description'));
    const icon = this.icon ?? ICONS.get(this.variant ?? 'default')?.icon;
    const set = this.iconSet ?? ICONS.get(this.variant ?? 'default')?.set;
    const { parentTagName } = (this.constructor as typeof PfProgressStep);
    const { compact = false } = this.closest?.<PfProgressStepper>(parentTagName) ?? {};
    return html`
      <div id="connector" class="${classMap({ compact })}">
        <slot id="icon" name="icon">
          <pf-icon ?hidden="${!icon}"
                    icon="${ifDefined(icon)}"
                    set="${ifDefined(set)}"></pf-icon>
        </slot>
      </div>
      <div id="main" class="${classMap({ compact })}">
        <slot id="title"></slot>
        <slot id="description" name="description" ?hidden="${!hasDescription}">${this.description}</slot>
      </div>
    `;
  }

  updated(changed: PropertyValues<this>): void {
    if (changed.has('current')) {
      this.#internals.ariaCurrent = String(!!this.current);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-progress-step': PfProgressStep;
  }
}

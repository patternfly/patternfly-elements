import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { observed } from '@patternfly/pfe-core/decorators/observed.js';

import style from './pf-progress-stepper.css';

import { PfProgressStep } from './pf-progress-step.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import '@patternfly/elements/pf-icon/pf-icon.js';

/**
 * A **progress stepper** displays a timeline of tasks in a workflow and tracks the user's current progress through this workflow.
 */
@customElement('pf-progress-stepper')
export class PfProgressStepper extends LitElement {
  protected static childTagName = 'pf-progress-step';

  static readonly styles = [style];

  static formAssociated = true;

  /** Whether to use the vertical layout */
  @property({ type: Boolean, reflect: true }) vertical = false;

  /** Whether to use the center alignment */
  @property({ type: Boolean, reflect: true }) center = false;

  /** Whether to use the compact layout */
  @observed(function(this: PfProgressStepper) {
    const { childTagName } = (this.constructor as typeof PfProgressStepper);
    this.querySelectorAll<PfProgressStep>(childTagName).forEach(step => step.requestUpdate());
  })
  @property({ type: Boolean, reflect: true }) compact = false;

  #internals = InternalsController.for(this, {
    role: 'progressbar',
    ariaValueNow: this.value.toString(),
  });

  #mo = new MutationObserver(() => this.#onMutation());

  get value() {
    const { childTagName } = (this.constructor as typeof PfProgressStepper);
    const steps = this.querySelectorAll<PfProgressStep>(childTagName);
    const current = this.querySelector(`${childTagName}[current]`);
    const n = Array.from(steps).indexOf(current as PfProgressStep) + 1;
    return (n / steps.length) * 100;
  }

  constructor() {
    super();
    this.#mo.observe(this, { childList: true });
  }

  #onMutation() {
    this.#internals.ariaValueNow = this.value.toString();
  }

  render() {
    return html`
      <slot role="listbox"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-progress-stepper': PfProgressStepper;
  }
}

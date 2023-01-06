import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { observed } from '@patternfly/pfe-core/decorators/observed.js';

import style from './pfe-progress-stepper.scss';

import { PfeProgressStep } from './pfe-progress-step.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import '@patternfly/pfe-icon';

/**
 * A **progress stepper** displays a timeline of tasks in a workflow and tracks the user's current progress through this workflow.
 */
@customElement('pfe-progress-stepper')
export class PfeProgressStepper extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  static formAssociated = true;

  /** Whether to use the vertical layout */
  @property({ type: Boolean, reflect: true }) vertical = false;

  /** Whether to use the center alignment */
  @property({ type: Boolean, reflect: true }) center = false;

  /** Whether to use the compact layout */
  @observed(function(this: PfeProgressStepper) {
    this.querySelectorAll('pfe-progress-step').forEach(step => step.requestUpdate());
  })
  @property({ type: Boolean, reflect: true }) compact = false;

  #internals = new InternalsController(this, {
    role: 'progressbar',
    ariaValueNow: this.value,
  });

  #mo = new MutationObserver(() => this.#onMutation());

  get value() {
    const steps = this.querySelectorAll('pfe-progress-step');
    const current = this.querySelector('pfe-progress-step[current]');
    const n = Array.from(steps).indexOf(current as PfeProgressStep) + 1;
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
    'pfe-progress-stepper': PfeProgressStepper;
  }
}

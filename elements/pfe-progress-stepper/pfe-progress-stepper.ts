import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { observed } from '@patternfly/pfe-core/decorators/observed.js';

import style from './pfe-progress-stepper.css';

import { PfeProgressStep } from './pfe-progress-step.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import '@patternfly/elements/pfe-icon/pfe-icon.js';

/**
 * A **progress stepper** displays a timeline of tasks in a workflow and tracks the user's current progress through this workflow.
 */
@customElement('pfe-progress-stepper')
export class PfeProgressStepper extends LitElement {
  protected static childTagName = 'pfe-progress-step';

  static readonly version = '{{version}}';

  static readonly styles = [style];

  static formAssociated = true;

  /** Whether to use the vertical layout */
  @property({ type: Boolean, reflect: true }) vertical = false;

  /** Whether to use the center alignment */
  @property({ type: Boolean, reflect: true }) center = false;

  /** Whether to use the compact layout */
  @observed(function(this: PfeProgressStepper) {
    const { childTagName } = (this.constructor as typeof PfeProgressStepper);
    this.querySelectorAll<PfeProgressStep>(childTagName).forEach(step => step.requestUpdate());
  })
  @property({ type: Boolean, reflect: true }) compact = false;

  #internals = new InternalsController(this, {
    role: 'progressbar',
    ariaValueNow: this.value.toString(),
  });

  #mo = new MutationObserver(() => this.#onMutation());

  get value() {
    const { childTagName } = (this.constructor as typeof PfeProgressStepper);
    const steps = this.querySelectorAll<PfeProgressStep>(childTagName);
    const current = this.querySelector(`${childTagName}[current]`);
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

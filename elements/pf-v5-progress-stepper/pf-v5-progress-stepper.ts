import { LitElement, html, type PropertyValues, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import style from './pf-v5-progress-stepper.css';

import { PfV5ProgressStep } from './pf-v5-progress-step.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import '@patternfly/elements/pf-v5-icon/pf-v5-icon.js';

/**
 * A **progress stepper** displays a timeline of tasks in a workflow and tracks the user's current progress through this workflow.
 * @alias Progress Stepper
 */
@customElement('pf-v5-progress-stepper')
export class PfV5ProgressStepper extends LitElement {
  protected static childTagName = 'pf-v5-progress-step';

  static readonly styles: CSSStyleSheet[] = [style];

  static formAssociated = true;

  /** Whether to use the vertical layout */
  @property({ type: Boolean, reflect: true }) vertical = false;

  /** Whether to use the center alignment */
  @property({ type: Boolean, reflect: true }) center = false;

  /** Whether to use the compact layout */
  @property({ type: Boolean, reflect: true }) compact = false;

  #internals = InternalsController.of(this, {
    role: 'progressbar',
    ariaValueNow: this.value.toString(),
  });

  #mo = new MutationObserver(() => this.#onMutation());

  get value(): number {
    const { childTagName } = (this.constructor as typeof PfV5ProgressStepper);
    const steps = this.querySelectorAll?.<PfV5ProgressStep>(childTagName) ?? [];
    const current = this.querySelector?.(`${childTagName}[current]`);
    const n = Array.from(steps).indexOf(current as PfV5ProgressStep) + 1;
    return (n / steps.length) * 100;
  }

  constructor() {
    super();
    this.#mo.observe(this, { childList: true });
  }

  #onMutation() {
    this.#internals.ariaValueNow = this.value.toString();
  }

  render(): TemplateResult<1> {
    // TODO: add label prop
    // eslint-disable-next-line lit-a11y/accessible-name
    return html`<div role="listbox" style="display:contents;"><slot></slot></div>`;
  }

  updated(changed: PropertyValues<this>): void {
    if (changed.has('compact')) {
      this.querySelectorAll?.('pf-v5-progress-step').forEach(step => step.requestUpdate());
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v5-progress-stepper': PfV5ProgressStepper;
  }
}

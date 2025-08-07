import { LitElement, html, type PropertyValues, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import style from './pf-progress-stepper.css';

import { PfProgressStep } from './pf-progress-step.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import '@patternfly/elements/pf-icon/pf-icon.js';

/**
 * A **progress stepper** displays a timeline of tasks in a workflow and tracks the user's current progress through this workflow.
 * @alias Progress Stepper
 * @cssprop [--pf-c-progress-stepper--m-vertical--GridAutoFlow=row]
 * @cssprop [--pf-c-progress-stepper--m-vertical--GridTemplateColumns=auto 1fr]
 * @cssprop [--pf-c-progress-stepper--m-vertical__step-connector--before--Top=0]
 * @cssprop [--pf-c-progress-stepper--m-vertical__step-connector--before--Left=calc(var(--pf-c-progress-stepper__step-icon--Width) / 2)]
 * @cssprop [--pf-c-progress-stepper--m-vertical__step-connector--before--Width=auto]
 * @cssprop [--pf-c-progress-stepper--m-vertical__step-connector--before--Height=100%]
 * @cssprop [--pf-c-progress-stepper--m-vertical__step-connector--before--BorderRightWidth=var(--pf-global--BorderWidth--md, 2px)]
 * @cssprop [--pf-c-progress-stepper--m-vertical__step-connector--before--BorderRightColor=var(--pf-global--BorderColor--100, #d2d2d2)]
 * @cssprop [--pf-c-progress-stepper--m-vertical__step-connector--before--BorderBottomWidth=0]
 * @cssprop [--pf-c-progress-stepper--m-vertical__step-connector--before--BorderBottomColor=transparent]
 * @cssprop [--pf-c-progress-stepper--m-vertical__step-connector--before--Transform=translateX(-50%)]
 * @cssprop [--pf-c-progress-stepper--m-vertical__step-main--MarginTop=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-progress-stepper--m-vertical__step-main--MarginRight=0]
 * @cssprop [--pf-c-progress-stepper--m-vertical__step-main--MarginBottom=var(--pf-global--spacer--xl, 2rem)]
 * @cssprop [--pf-c-progress-stepper--m-vertical__step-main--MarginLeft=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-progress-stepper--m-vertical--m-compact--GridTemplateColumns=1fr]
 * @cssprop [--pf-c-progress-stepper--m-vertical--m-compact__step-connector--PaddingBottom=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-progress-stepper--m-vertical--m-compact__step-connector--GridRow=auto]
 * @cssprop [--pf-c-progress-stepper--m-vertical--m-compact__step-main--MarginRight=0]
 * @cssprop [--pf-c-progress-stepper--m-vertical--m-center__step-main--MarginRight=0]
 * @cssprop [--pf-c-progress-stepper--m-vertical--m-center__step-main--MarginLeft=0]
 * @cssprop [--pf-c-progress-stepper--m-horizontal--GridAutoFlow=column]
 * @cssprop [--pf-c-progress-stepper--m-horizontal--GridTemplateColumns=initial]
 * @cssprop [--pf-c-progress-stepper--m-horizontal__step-connector--before--Top=calc(var(--pf-c-progress-stepper__step-icon--Height) / 2)]
 * @cssprop [--pf-c-progress-stepper--m-horizontal__step-connector--before--Left=0]
 * @cssprop [--pf-c-progress-stepper--m-horizontal__step-connector--before--Width=100%]
 * @cssprop [--pf-c-progress-stepper--m-horizontal__step-connector--before--Height=auto]
 * @cssprop [--pf-c-progress-stepper--m-horizontal__step-connector--before--BorderRightWidth=0]
 * @cssprop [--pf-c-progress-stepper--m-horizontal__step-connector--before--BorderRightColor=unset]
 * @cssprop [--pf-c-progress-stepper--m-horizontal__step-connector--before--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)]
 * @cssprop [--pf-c-progress-stepper--m-horizontal__step-connector--before--BorderBottomColor=var(--pf-global--BorderColor--100, #d2d2d2)]
 * @cssprop [--pf-c-progress-stepper--m-horizontal__step-connector--before--Transform=translateY(-50%)]
 * @cssprop [--pf-c-progress-stepper--m-horizontal__step-main--MarginTop=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-progress-stepper--m-horizontal__step-main--MarginRight=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-progress-stepper--m-horizontal__step-main--MarginBottom=0]
 * @cssprop [--pf-c-progress-stepper--m-horizontal__step-main--MarginLeft=0]
 * @cssprop [--pf-c-progress-stepper--m-horizontal--m-compact--GridTemplateColumns=repeat(auto-fill, 1.75rem)]
 * @cssprop [--pf-c-progress-stepper--m-horizontal--m-compact__step-connector--PaddingBottom=0]
 * @cssprop [--pf-c-progress-stepper--m-horizontal--m-compact__step-connector--GridRow=2]
 * @cssprop [--pf-c-progress-stepper--m-compact--GridAutoFlow=row]
 * @cssprop [--pf-c-progress-stepper--m-compact__step-main--MarginTop=0]
 * @cssprop [--pf-c-progress-stepper--m-compact__step-main--MarginBottom=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-progress-stepper--m-compact__step-connector--MinWidth=1.75rem]
 * @cssprop [--pf-c-progress-stepper--m-compact__step-icon--Width=1.125rem]
 * @cssprop [--pf-c-progress-stepper--m-compact__step-icon--FontSize=var(--pf-global--icon--FontSize--sm, 0.625rem)]
 * @cssprop [--pf-c-progress-stepper--m-compact__step-title--FontSize=var(--pf-global--FontSize--sm, 0.875rem)]
 * @cssprop [--pf-c-progress-stepper--m-compact__step-title--FontWeight=var(--pf-global--FontWeight--normal, 400)]
 * @cssprop [--pf-c-progress-stepper--m-compact__pficon--MarginTop=2px]
 * @cssprop [--pf-c-progress-stepper--m-compact__fa-exclamation-triangle--MarginTop=-3px]
 * @cssprop [--pf-c-progress-stepper--m-center__step-connector--before--Left=50%]
 * @cssprop [--pf-c-progress-stepper--m-center--GridTemplateColumns=1fr]
 * @cssprop [--pf-c-progress-stepper--m-center__step-connector--JustifyContent=center]
 * @cssprop [--pf-c-progress-stepper--m-center__step-main--MarginRight=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-progress-stepper--m-center__step-main--MarginLeft=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-progress-stepper--m-center__step-main--TextAlign=center]
 * @cssprop [--pf-c-progress-stepper--m-center__step-description--MarginRight=0]
 * @cssprop [--pf-c-progress-stepper--m-center__step-description--MarginLeft=0]
 * @cssprop [--pf-c-progress-stepper--GridTemplateRows=auto 1fr]
 * @cssprop [--pf-c-progress-stepper__step-connector--JustifyContent=start]
 * @cssprop [--pf-c-progress-stepper__step-icon--ZIndex=var(--pf-global--ZIndex--xs, 100)]
 * @cssprop [--pf-c-progress-stepper__step-icon--Width=1.75rem]
 * @cssprop [--pf-c-progress-stepper__step-icon--Height=var(--pf-c-progress-stepper__step-icon--Width)]
 * @cssprop [--pf-c-progress-stepper__step-icon--FontSize=var(--pf-global--FontSize--md, 1rem)]
 * @cssprop [--pf-c-progress-stepper__step-icon--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-progress-stepper__step-icon--BackgroundColor=var(--pf-global--BackgroundColor--light-200, #fafafa)]
 * @cssprop [--pf-c-progress-stepper__step-icon--BorderWidth=var(--pf-global--BorderWidth--md, 2px)]
 * @cssprop [--pf-c-progress-stepper__step-icon--BorderColor=var(--pf-global--BorderColor--100, #d2d2d2)]
 * @cssprop [--pf-c-progress-stepper__pficon--MarginTop=3px]
 * @cssprop [--pf-c-progress-stepper__fa-exclamation-triangle--MarginTop=-5px]
 * @cssprop [--pf-c-progress-stepper__step-title--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-progress-stepper__step-title--TextAlign=left]
 * @cssprop [--pf-c-progress-stepper__step-title--FontSize=var(--pf-global--FontSize--md, 1rem)]
 * @cssprop [--pf-c-progress-stepper__step-title--FontWeight=var(--pf-global--FontWeight--normal, 400)]
 * @cssprop [--pf-c-progress-stepper__step--m-current__step-title--FontWeight=var(--pf-global--FontWeight--bold, 700)]
 * @cssprop [--pf-c-progress-stepper__step--m-current__step-title--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-progress-stepper__step--m-pending__step-title--Color=var(--pf-global--Color--200, #6a6e73)]
 * @cssprop [--pf-c-progress-stepper__step--m-danger__step-title--Color=var(--pf-global--danger-color--100, #c9190b)]
 * @cssprop [--pf-c-progress-stepper__step-title--m-help-text--TextDecorationColor=var(--pf-global--BorderColor--200, #8a8d90)]
 * @cssprop [--pf-c-progress-stepper__step-title--m-help-text--TextDecorationThickness=var(--pf-global--BorderWidth--sm, 1px)]
 * @cssprop [--pf-c-progress-stepper__step-title--m-help-text--TextUnderlineOffset=0.25rem]
 * @cssprop [--pf-c-progress-stepper__step-title--m-help-text--hover--TextDecorationColor=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-progress-stepper__step-title--m-help-text--focus--TextDecorationColor=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-progress-stepper__step-title--m-help-text--hover--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-progress-stepper__step-title--m-help-text--focus--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-progress-stepper__step--m-danger__step-title--m-help-text--hover--Color=var(--pf-global--danger-color--200, #a30000)]
 * @cssprop [--pf-c-progress-stepper__step--m-danger__step-title--m-help-text--focus--Color=var(--pf-global--danger-color--200, #a30000)]
 * @cssprop [--pf-c-progress-stepper__step--m-danger__step-title--m-help-text--TextDecorationColor=var(--pf-global--danger-color--100, #c9190b)]
 * @cssprop [--pf-c-progress-stepper__step--m-danger__step-title--m-help-text--hover--TextDecorationColor=var(--pf-global--danger-color--200, #a30000)]
 * @cssprop [--pf-c-progress-stepper__step--m-danger__step-title--m-help-text--focus--TextDecoerationColor=var(--pf-global--danger-color--200, #a30000)]
 * @cssprop [--pf-c-progress-stepper__step-description--MarginTop=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-progress-stepper__step-description--FontSize=var(--pf-global--FontSize--sm, 0.875rem)]
 * @cssprop [--pf-c-progress-stepper__step-description--Color=var(--pf-global--Color--200, #6a6e73)]
 * @cssprop [--pf-c-progress-stepper__step-description--TextAlign=left]
 * @cssprop [--pf-c-progress-stepper--GridAutoFlow=var(--pf-c-progress-stepper--m-vertical--GridAutoFlow)]
 * @cssprop [--pf-c-progress-stepper--GridTemplateColumns=var(--pf-c-progress-stepper--m-vertical--GridTemplateColumns)]
 * @cssprop [--pf-c-progress-stepper__step-connector--before--Top=var(--pf-c-progress-stepper--m-vertical__step-connector--before--Top)]
 * @cssprop [--pf-c-progress-stepper__step-connector--before--Left=var(--pf-c-progress-stepper--m-vertical__step-connector--before--Left)]
 * @cssprop [--pf-c-progress-stepper__step-connector--before--Width=var(--pf-c-progress-stepper--m-vertical__step-connector--before--Width)]
 * @cssprop [--pf-c-progress-stepper__step-connector--before--Height=var(--pf-c-progress-stepper--m-vertical__step-connector--before--Height)]
 * @cssprop [--pf-c-progress-stepper__step-connector--before--BorderRightWidth=var(--pf-c-progress-stepper--m-vertical__step-connector--before--BorderRightWidth)]
 * @cssprop [--pf-c-progress-stepper__step-connector--before--BorderRightColor=var(--pf-c-progress-stepper--m-vertical__step-connector--before--BorderRightColor)]
 * @cssprop [--pf-c-progress-stepper__step-connector--before--BorderBottomWidth=var(--pf-c-progress-stepper--m-vertical__step-connector--before--BorderBottomWidth)]
 * @cssprop [--pf-c-progress-stepper__step-connector--before--BorderBottomColor=var(--pf-c-progress-stepper--m-vertical__step-connector--before--BorderBottomColor)]
 * @cssprop [--pf-c-progress-stepper__step-connector--before--Transform=var(--pf-c-progress-stepper--m-vertical__step-connector--before--Transform)]
 * @cssprop [--pf-c-progress-stepper__step-main--MarginTop=var(--pf-c-progress-stepper--m-vertical__step-main--MarginTop)]
 * @cssprop [--pf-c-progress-stepper__step-main--MarginRight=var(--pf-c-progress-stepper--m-vertical__step-main--MarginRight)]
 * @cssprop [--pf-c-progress-stepper__step-main--MarginBottom=var(--pf-c-progress-stepper--m-vertical__step-main--MarginBottom)]
 * @cssprop [--pf-c-progress-stepper__step-main--MarginLeft=var(--pf-c-progress-stepper--m-vertical__step-main--MarginLeft)]
 * @cssprop [--pf-c-progress-stepper--m-compact--GridTemplateColumns=var(--pf-c-progress-stepper--m-vertical--m-compact--GridTemplateColumns)]
 * @cssprop [--pf-c-progress-stepper--m-compact__step-connector--GridRow=var(--pf-c-progress-stepper--m-vertical--m-compact__step-connector--GridRow)]
 * @cssprop [--pf-c-progress-stepper--m-compact__step-connector--PaddingBottom=var(--pf-c-progress-stepper--m-vertical--m-compact__step-connector--PaddingBottom)]
 * @cssprop [--pf-c-progress-stepper--m-center__step-connector--before--Content=none]
 * @cssprop [--pf-c-progress-stepper--m-center__step-main--before--Content='']
 * @cssprop [--pf-c-progress-stepper__step-connector--before--Content='']
 * @cssprop [--pf-c-progress-stepper__step-main--before--Content=none]
 */
@customElement('pf-progress-stepper')
export class PfProgressStepper extends LitElement {
  protected static childTagName = 'pf-progress-step';

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
    const { childTagName } = (this.constructor as typeof PfProgressStepper);
    const steps = this.querySelectorAll?.<PfProgressStep>(childTagName) ?? [];
    const current = this.querySelector?.(`${childTagName}[current]`);
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

  render(): TemplateResult<1> {
    // TODO: add label prop
    // eslint-disable-next-line lit-a11y/accessible-name
    return html`<div role="listbox" style="display:contents;"><slot></slot></div>`;
  }

  updated(changed: PropertyValues<this>): void {
    if (changed.has('compact')) {
      this.querySelectorAll?.('pf-progress-step').forEach(step => step.requestUpdate());
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-progress-stepper': PfProgressStepper;
  }
}

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { bound, initializer, observed, pfelement } from '@patternfly/pfe-core/decorators.js';
import { pfeEvent } from '@patternfly/pfe-core/functions/pfeEvent.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import styles from './pfe-button.scss';

/**
 * Buttons allow users to perform an action when triggered. They feature a text label, a background or a border, and icons.
 *
 * @fires {Event} pfe-button:click {@deprecated use native click event instead}
 *
 * @cssprop {<color>} --pfe-button--BackgroundColor
 *          no region
 *          {@default var(--pfe-theme--color--ui-accent, #06c)}
 * @cssprop {<color>} --pfe-button--Color
 *          no region
 *          {@default var(--pfe-theme--color--ui-base--text, #fff)}
 * @cssprop --pfe-button--FontSize
 *          no region
 *          {@default var(--pf-global--FontSize--md, 1rem)}
 * @cssprop {normal | bold | bolder | lighter | <number [1,1000]>} --pfe-button--FontWeight
 *          no region
 *          {@default var(--pfe-theme--font-weight--normal, 400)}
 * @cssprop {<length>} --pfe-button--Padding
 *          no region
 *          {@default calc(var(--pfe-theme--container-padding, 1rem) / 2) var(--pfe-theme--container-padding, 1rem)}
 * @cssprop {<length>|<percentage>} --pfe-button--BorderRadius
 *          no region
 *          {@default var(--pfe-theme--surface--border-radius, 3px)}
 * @cssprop {<number>} --pfe-button--LineHeight
 *          no region
 *          {@default var(--pfe-theme--line-height, 1.5)}
 * @cssprop --pfe-button__after--Border
 *          region `after`
 *          {@default var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-button__after--BorderColor, transparent)}
 * @cssprop {<color>} --pfe-button--BackgroundColor--hover
 *          no region
 *          {@default var(--pfe-theme--color--ui-accent--hover, #004080)}
 * @cssprop --pfe-button__after--Border--hover
 *          region `after`
 *          {@default var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-button__after--BorderColor--hover, transparent)}
 * @cssprop --pfe-button--FontWeight--large
 *          no region
 *          {@default var(--pfe-theme--font-weight--semi-bold, 600)}
 * @cssprop --pfe-button--Padding--large
 *          no region
 *          {@default 12px 24px}
 *
 * @csspart container
 * @csspart {HTMLButtonElement} button - The shadow button
 */
@customElement('pfe-button') @pfelement()
export class PfeButton extends LitElement {
  static readonly styles = styles;

  /** Disables the button */
  @observed
  @property({ type: Boolean }) disabled = false;

  // TODO: describe these states ccccvklectlddctgknkhrntlgikugccdebeduhigfh
  /**
   * Changes the style of the button. Possible values are
   *
   * - primary (default)
   * - secondary
   * - tertiary
   * - danger
   * - control
   */
  @property({ reflect: true })
  variant: 'primary'|'secondary'|'tertiary'|'danger'|'control' = 'primary';

  /** Changes the size of the button. */
  @property({ reflect: true })
  size: 'medium'|'large' = 'medium';

  private logger = new Logger(this);

  private get _slottedButton() {
    return this.querySelector('button');
  }

  connectedCallback() {
    if (this._slottedButton) {
      this.disabled = this._slottedButton.hasAttribute('disabled');
    }
    super.connectedCallback();
  }

  render() {
    return html`
      <span id="internalBtn" part="container">
        <button id="${ifDefined(this._slottedButton?.id)}"
                part="button"
                class="${ifDefined(this._slottedButton?.getAttribute('class') ?? undefined)}"
                type="${ifDefined(this._slottedButton?.getAttribute('type') ?? undefined)}"
                ?disabled="${this.disabled}"
                @click="${this.onClick}">${unsafeHTML(this._slottedButton?.innerHTML)}</button>
      </span>
    `;
  }

  @initializer({ observe: {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  } })
  protected _init(records?: MutationRecord[]) {
    if (!this._isValidLightDom() || !this._slottedButton) {
      return;
    }

    if (records) {
      for (const { addedNodes, removedNodes, type } of records) {
        if (type === 'childList') {
          this.requestUpdate();
        } else if (type === 'attributes') {
          this.disabled = this._slottedButton?.hasAttribute('disabled');
        }

        addedNodes.forEach(n => {
          if (n instanceof HTMLButtonElement) {
            n.addEventListener('click', this.onClickSlottedButton);
          }
        });

        removedNodes.forEach(n => {
          if (n instanceof HTMLButtonElement) {
            n.removeEventListener('click', this.onClickSlottedButton);
          }
        });
      }
    } else {
      this._slottedButton?.addEventListener('click', this.onClickSlottedButton);
    }


    if (this._slottedButton.hasAttribute('disabled')) {
      this.disabled = true;
    }
  }

  protected _disabledChanged() {
    this._slottedButton?.toggleAttribute('disabled', this.disabled);
  }

  private _isValidLightDom() {
    if (!this._slottedButton) {
      return !!(void this.logger.warn(`You must have a button in the light DOM`));
    } else if (this.firstElementChild?.tagName !== 'BUTTON') {
      return !!(void this.logger.warn(`The only child in the light DOM must be a button tag`));
    } else {
      return true;
    }
  }

  /**
   * programmatically clicking the _slottedButton is what makes
   * this web component button work in a form as you'd expect
   */
  @bound private onClick() {
    this._slottedButton?.click?.();
  }

  @bound private onClickSlottedButton() {
    this.dispatchEvent(pfeEvent('pfe-button:click'));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-button': PfeButton;
  }
}

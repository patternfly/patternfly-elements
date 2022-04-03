import { LitElement, html, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { bound, colorContextConsumer, observed, pfelement } from '@patternfly/pfe-core/decorators.js';
import { deprecatedCustomEvent } from '@patternfly/pfe-core/functions/deprecatedCustomEvent.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import styles from './pfe-button.scss';
import { ColorTheme } from '@patternfly/pfe-core';

/**
 * Buttons allow users to perform an action when triggered. They feature a text label, a background or a border, and icons.
 *
 * @summary Allows users to perform an action when triggered
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
 */
@customElement('pfe-button') @pfelement()
export class PfeButton extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = styles;

  /** Disables the button */
  @observed
  @property({ reflect: true, type: Boolean }) disabled = false;

  // TODO: describe the semantic meaning of these states
  /**
   * Changes the style of the button. Possible values are
   *
   * - primary (default)
   * - secondary
   * - tertiary
   * - danger
   * - control
   */
  @property({ reflect: true }) variant: 'primary'|'secondary'|'tertiary'|'danger'|'control' = 'primary';

  /** Changes the size of the button. */
  @property({ reflect: true }) size: 'medium'|'large' = 'medium';

  @observed
  @property() type?: 'button'|'submit'|'reset';

  /**
   * Sets color theme based on parent context
   */
  @colorContextConsumer()
  @property({ reflect: true }) on?: ColorTheme;

  private logger = new Logger(this);

  private mo = new MutationObserver(this.onMutation);

  private get button() {
    return this.querySelector('button');
  }

  connectedCallback() {
    this.onSlotChange();
    super.connectedCallback();
    this.addEventListener('click', this.onClick);
  }

  render() {
    return html`
      <span id="container" part="container" @slotchange="${this.onSlotChange}">
        <slot></slot>
      </span>
    `;
  }

  protected firstUpdated(): void {
    this._disabledChanged();
    this.onMutation();
  }

  protected _typeChanged() {
    if (this.button && this.button.type !== this.type) {
      if (this.type) {
        this.button.type = this.type;
      } else {
        this.button.removeAttribute('type');
      }
    }
  }

  protected _disabledChanged() {
    if (this.button && this.button.disabled !== this.disabled) {
      this.button.disabled = this.disabled;
    }
  }

  private onSlotChange() {
    this.mo.disconnect();
    if (this.button) {
      this.mo.observe(this.button, { attributes: true, attributeFilter: ['type', 'disabled'] });
    }
  }

  @bound private onClick(event: Event) {
    if (event.target === this.button) {
      this.dispatchEvent(deprecatedCustomEvent('pfe-button:click'));
    }
  }

  @bound private onMutation() {
    if (this.querySelector(':not(button)')) {
      this.logger.warn('The only child in the light DOM must be a button tag');
    } else if (!this.button) {
      this.logger.warn('You must have a button in the light DOM');
    } else {
      this.disabled = this.button.hasAttribute('disabled');
      this.type = this.button.getAttribute('type') as this['type'] ?? undefined;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-button': PfeButton;
  }
}

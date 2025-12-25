import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { observes } from '@patternfly/pfe-core/decorators.js';

import '@patternfly/elements/pf-icon/pf-icon.js';
import '@patternfly/elements/pf-button/pf-button.js';

import styles from './pf-alert.css';

const VariantIconMap = new Map(Object.entries({
  info: 'info-circle',
  success: 'check-circle',
  warning: 'exclamation-triangle',
  danger: 'exclamation-circle',
  neutral: 'bell',
}));

export class PfAlertTimeoutEvent extends Event {
  constructor() {
    super('timeout', { bubbles: true, cancelable: true });
  }
}

/**
 * An **alert** is a notification that provides brief information to the user
 * without blocking their workflow.
 *
 * @fires timeout - When an alert has timed out. Cancel the event to prevent the
 *                  alert from being removed.
 */
@customElement('pf-alert')
export class PfAlert extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  /**
   * Use the `timeout` property to automatically dismiss an alert after a period
   * of time. If set to `true`, the timeout will be 8000 milliseconds. Provide a
   * specific value to dismiss the alert after a different number of
   * milliseconds.
   */
  @property({ type: Number }) timeout: number | true = 0;

  /**
   * PatternFly supports several alert variants for different scenarios.
   * Each variant has an associated status icon, background, and alert title
   * coded to communicate the severity of an alert. Use the variant property to
   * apply the following styling options. If no variant is specified, then the
   * variant will be set to "default".
   *
   * - **Default** - Use for generic messages with no associated severity
   * - **Info** - Use for general informational messages
   * - **Success** - Use to indicate that a task or process has been completed successfully
   * - **Warning** - Use to indicate that a non-critical error has occurred
   * - **Danger** - Use to indicate that a critical or blocking error has occurred
   */
  @property({ reflect: true })
  variant:
    | 'warning'
    | 'custom'
    | 'neutral'
    | 'info'
    | 'success'
    | 'danger' = 'neutral';

  /**
   * Use the `icon` attribute to replace a default alert icon with a custom icon.
   * The `icon` attribute is overridden by the `icon` slot.
   */
  @property() icon?: string;

  /**
   * An alert can contain additional, hidden information that is made visible
   * when users click a caret icon. This information can be expanded and
   * collapsed each time the icon is clicked.
   *
   * It is not recommended to use an expandable alert with a timeout in a toast
   * alert group because the alert could timeout before users have time to
   * interact with and view the entire alert.
   *
   * See the toast alert considerations section of the alert accessibility
   * documentation to understand the accessibility risks associated with using
   * toast alerts.
   */
  @property({ reflect: true, type: Boolean }) expandable = false;

  @property({ reflect: true, type: Boolean }) dismissable = false;

  @state() private expanded = false;

  #timeoutId?: number;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.#timeoutId);
  }

  override render(): TemplateResult<1> {
    const { variant, expandable, expanded } = this;
    const icon = this.icon ?? VariantIconMap.get(variant);
    return html`
      <div id="container"
           class=${classMap({ [variant ?? '']: !!variant, expandable })}>
        <pf-button id="toggle-button"
                   plain
                   ?hidden="${!expandable}"
                   icon="${expandable ? 'angle-down' : 'angle-right'}"
                   icon-set="fas"
                   @click="${this.#onToggleClick}"
                   aria-controls="${ifDefined(expandable ? 'description' : undefined)}"
                   aria-expanded="${ifDefined(expandable ? String(expanded) : undefined)}"
                   aria-label="${expanded ? 'Collapse Alert' : 'Expand Alert'}">
        </pf-button>

        <div id="icon-container">
          <slot name="icon">
            <pf-icon icon="${icon}"></pf-icon>
          </slot>
        </div>

        <div id="title-area">
          <slot name="title"></slot>
        </div>

        <div id="description"
             ?hidden="${expandable && !expanded}">
          <slot></slot>
        </div>

        <div id="action-links">
          <slot name="actions"></slot>
        </div>

        <pf-button id="close-button"
                   plain
                   icon="close"
                   icon-set="patternfly"
                   ?hidden="${!this.dismissable}"
                   @click="${this.#onCloseClick}">
        </pf-button>
      </div>
    `;
  }

  @observes('timeout')
  protected timeoutChanged(): void {
    clearTimeout(this.#timeoutId);
    let { timeout } = this;
    if (timeout === true) {
      timeout = 8000;
    }
    if (timeout > 0) {
      this.#timeoutId = setTimeout(() => {
        if (this.isConnected && this.dispatchEvent(new PfAlertTimeoutEvent())) {
          this.remove();
        }
      }, timeout) as unknown as number;
    }
  }

  #onCloseClick() {
    if (this.isConnected) {
      clearTimeout(this.#timeoutId);
      this.remove();
    }
  }

  #onToggleClick() {
    this.expandable = !this.expandable;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-alert': PfAlert;
  }
}

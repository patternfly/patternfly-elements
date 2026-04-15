import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
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

export class PfAlertCloseEvent extends Event {
  constructor(public reason: 'closed' | 'timeout' = 'closed') {
    super('close', { bubbles: true, cancelable: true });
  }
}

/**
 * An **alert** is a notification that provides brief information to the user
 * without blocking their workflow.
 *
 * @fires close - When an alert is closed e.g. when close button is clicked or when the alert times
 *                out. Cancel the event to prevent the alert from being removed.
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
   * The title of the alert. Overridden by the title slot.
   */
  @property({ attribute: 'title-text', reflect: true }) titleText?: string;

  /**
   * The heading level of the alert's title. Overridden by the title slot.
   * Default: 3
   */
  @property({ attribute: 'title-level', reflect: true }) titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Use inline alerts to display an alert inline with content. All alert
   * variants may use the `inline` attribute to position alerts in content-heavy
   * areas, such as within forms, wizards, or drawers.
   */
  @property({ type: Boolean, reflect: true }) inline = false;

  /**
   * Use the `plain` attribute to make any inline alert plain. Plain styling
   * removes the colored background but keeps colored text and icons.
   */
  @property({ type: Boolean, reflect: true }) plain = false;

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

  /**
   * True when an expandable alert is expanded
   */
  @property({ reflect: true, type: Boolean }) expanded = false;

  /**
   * When true, the alert displays a close button
   * Clicking the close button removes the alert
   */
  @property({ reflect: true, type: Boolean }) dismissable = false;

  #timeoutId?: number;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.#timeoutId);
  }

  override render(): TemplateResult<1> {
    const { expandable, expanded, variant } = this;
    const icon = this.icon ?? VariantIconMap.get(variant);
    return html`
      <pf-button id="toggle"
                 plain
                 ?hidden="${!expandable}"
                 icon="${expandable ? 'angle-down' : 'angle-right'}"
                 icon-set="fas"
                 @click="${this.#onToggleClick}"
                 aria-controls="${ifDefined(expandable ? 'description' : undefined)}"
                 aria-expanded="${ifDefined(expandable ? String(expanded) : undefined)}"
                 aria-label="${expanded ? 'Collapse Alert' : 'Expand Alert'}">
      </pf-button>

      <div id="icon">
        <slot name="icon">
          <pf-icon icon="${icon}"></pf-icon>
        </slot>
      </div>

      <div id="title">
        <slot name="title">${this.#renderDefaultTitle()}</slot>
      </div>

      <div id="description"
           ?hidden="${expandable && !expanded}">
        <slot></slot>
      </div>

      <div id="actions">
        <slot name="actions"></slot>
      </div>

      <pf-button id="close"
                 plain
                 icon="close"
                 icon-set="patternfly"
                 ?hidden="${!this.dismissable}"
                 @click="${this.#onCloseClick}">
      </pf-button>
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
        if (this.isConnected && this.dispatchEvent(new PfAlertCloseEvent('timeout'))) {
          this.remove();
        }
      }, timeout) as unknown as number;
    }
  }

  #renderDefaultTitle() {
    if (!this.titleText) {
      return '';
    }
    switch (this.titleLevel ?? 3) {
      case 1: return html`<h1>${this.titleText}</h1>`;
      case 2: return html`<h2>${this.titleText}</h2>`;
      case 4: return html`<h4>${this.titleText}</h4>`;
      case 5: return html`<h5>${this.titleText}</h5>`;
      case 6: return html`<h6>${this.titleText}</h6>`;
      case 3:
      default: return html`<h3>${this.titleText}</h3>`;
    }
  }

  #onCloseClick() {
    if (this.isConnected && this.dispatchEvent(new PfAlertCloseEvent())) {
      clearTimeout(this.#timeoutId);
      this.remove();
    }
  }

  #onToggleClick() {
    this.expanded = !this.expanded;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-alert': PfAlert;
  }
}

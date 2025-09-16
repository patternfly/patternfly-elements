
// ייבוא הרכיבים של PatternFly
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { repeat } from 'lit/directives/repeat.js';
import { render } from 'lit/html.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import '@patternfly/elements/pf-alert/pf-alert.js';
import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-icon/pf-icon.js';
import styles from './pf-alert.css';

/**
 * Alert
 * @slot - Place element content here
 */
interface AlertAction {
  action: 'dismiss' | 'confirm' | string;
  text: string;
}
interface ToastOptions {
  id?: string;
  message: string | TemplateResult;
  heading?: string;
  state?: PfAlert['state'];
  persistent?: boolean;
  actions?: AlertAction[];
}

let toaster: HTMLElement;
const toasts = new Set<Required<ToastOptions>>();

/**
 * @alias Alert
 */
@customElement('pf-alert')
export class PfAlert extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];
  @property({ reflect: true })
  state:
  | 'neutral'
  | 'info'
  | 'success'
  | 'caution'
  | 'warning'
  | 'danger' = 'neutral';

  @property({ reflect: true }) variant?: 'inline' | 'toast' ;
  @property({ type: Boolean, reflect: true }) dismissable = false;

//   public static initDemoColorContext(alert: PfAlert): void {
//     if(alert.variant) alert.variant = alert.variant;
//     if(alert.state) alert.state = alert.state;
//   }
// public static showDemo(alerts: NodeListOf<PfAlert>, index: number): void {
//     alerts.forEach((a, i) => {
//       a.style.display = i === index ? 'block' : 'none';
//       PfAlert.initDemoColorContext(a);
//     });
//   }
  static async toast(options: Omit<ToastOptions, 'id'>): Promise<void> {
    const {
      message,
      persistent = false,
      heading = 'Success',
      state = 'info',
      actions = [],
    } = options;
    toaster ??= initToaster();
    const id = getRandomId();
    const toast = { actions, heading, message, state, id, persistent };
    toasts.add(toast);
    renderToasts();
  }

  render(): TemplateResult<1> {
    return html`
       <pf-alert state="${this.state}" variant="${this.variant ?? 'inline'}">
        <h3 slot="header"><slot name="header"></slot></h3>
        <slot></slot>
        <slot name="actions"></slot>
      </pf-alert>
    `;
  }
}
function initToaster() {
  const node = document.createElement('section');
  node.classList.add('pf-alert-toast-group');
  document.body.append(node);
  return node;
}
function renderToasts() {
  render(
    repeat(toasts, t => t.id, ({ id, state, heading, message, actions }) => html`
      <pf-alert id="${id}" state="${state}" variant="toast">
        <h3 slot="header">${heading}</h3>
        <p>${message}</p>
        ${actions?.map(action => html`
          <pf-button slot="actions" variant="${action.action === 'confirm' ? 'secondary' : 'link'}"
                     data-action="${action.action}">
            ${action.text}
          </pf-button>
        `)}
      </pf-alert>
    `),
    toaster!
  );
}
// export { PfAlert };

declare global {
  interface HTMLElementTagNameMap {
    'pf-alert': PfAlert;
  }
}

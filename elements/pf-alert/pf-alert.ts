import { LitElement, type TemplateResult, html, isServer } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import styles from './pf-alert.css';
import '@patternfly/elements/pf-icon/pf-icon.js';
import '@patternfly/elements/pf-button/pf-button.js';


interface AlertAction {
  action: 'dismiss' | 'confirm' | string;
  text: string;
}
interface ToastOptions {
  id?: string;
  message: string | TemplateResult;
  heading?: string;
  state?: PfAlert['status'];
  persistent?: boolean;
  actions?: AlertAction[];
}
const ICONS = new Map(Object.entries({
  neutral: 'minus-circle',
  info: 'info-circle',
  success: 'check-circle',
  custom: 'bell',
  cogear: 'cog',
  warning: 'exclamation-triangle',
  danger: 'exclamation-circle',
  close: 'times',

}));


export class AlertCloseEvent extends Event {
  constructor(public action: 'close' | 'confirm' | 'dismiss' | string) {
    super('close', { bubbles: true, cancelable: true });
  }
}
let toaster: HTMLElement;
const toasts = new Set<Required<ToastOptions>>();


@customElement('pf-alert')
export class PfAlert extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  @property({ reflect: true })
  status:
    | 'warning'
    | 'custom'
    | 'neutral'
    | 'info'
    | 'success'
    | 'danger' = 'neutral';

  @property({ reflect: true }) variant?: 'alternate' | 'inline';

  @property({ reflect: true, type: Boolean }) dismissable = false;

  #slots = new SlotController(this, 'header', null, 'actions');

  get #icon() {
  const internalStatus = this.closest('.demo-with-arrows') &&
   this.status === 'neutral' && this.classList.contains('cogear-demo')
    ? 'cogear'
    : this.status;
    switch (internalStatus) {
      // @ts-expect-error: support for deprecated props
      case 'note': return ICONS.get('info');
      // @ts-expect-error: support for deprecated props
      case 'default': return ICONS.get('neutral');
      // @ts-expect-error: support for deprecated props
      case 'error': return ICONS.get('danger');
      default: return ICONS.get(internalStatus);
    }
  }

  #aliasState(state: string) {
    switch (state.toLowerCase()) {
      // the first three are deprecated pre-DPO status names
      case 'note': return 'info';
      case 'default': return 'neutral';
      case 'error': return 'danger';
      // the following are DPO-approved status names
      case 'danger':
      case 'warning':
      case 'custom':
      case 'neutral':
      case 'info':
      case 'success':
      case 'cogear':
        return state.toLowerCase() as this['status'];
      default:
        return 'neutral';
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!isServer) {
      this.requestUpdate();
    }
  }

  render(): TemplateResult<1> {
    const _isServer = isServer && !this.hasUpdated;
    const hasActions = _isServer || this.#slots.hasSlotted('actions');
    const hasBody =
      _isServer || this.#slots.hasSlotted(SlotController.default as unknown as string);
    const { variant = 'inline' } = this;
    // const state = this.#aliasState(this.status);
    const inDemo = this.closest('.demo-with-arrows') !== null;
    const hasDescription = this.querySelector('p') !== null;
    const showArrow = inDemo;
    const internalStatus = (this.closest('.demo-with-arrows') && this.classList.contains('cogear-demo'))
  ? 'cogear'
  : this.status;
    const arrowDirection = hasDescription ? 'angle-down' : 'angle-right';
    const footer = html`<footer class="${classMap({ hasActions })}"
            <!-- Provide actions that the user can take for the alert -->
            <slot name="actions"></slot>
          </footer>`;
    return html`
      <div id="container"
              part="container"
              class=
              ${classMap({
      hasBody,
      light: true,
      [internalStatus]: true,
      [variant ?? 'inline']: !!variant,
    })}
             role="alert"
             aria-hidden="false"
             color-palette="lightest">
        <div id="left-column" style="display: flex; align-items: center; gap: 0.5rem;">
          ${showArrow ? html`
          <pf-icon 
            id="arrow-icon"
            set="fas"
            icon="${arrowDirection}"
            class="alerts-page-only"
            style="--pf-c-icon--Color: var(--_icon-color); font-size: 16px; height: 16px; width: 16px;">
          </pf-icon>` : ''}
          <pf-icon 
            id="icon"
            set="fas" 
            icon="${this.#icon}"  
            style="--pf-c-icon--Color: var(--_icon-color); font-size: 36px; height: 36px; width: 36px;">
          </pf-icon>
        </div>
        <div id="middle-column">
          <header ?hidden="${!_isServer && this.#slots.isEmpty('header')}">
            <div id="header">
              <!-- Provide a header for the alert message. -->
              <slot name="header"></slot>
            </div>${!this.dismissable ? '' : html`
            <div id="header-actions">
                <pf-icon
                  id="close-button"
                  set="fas"
                  icon="times"
                  role="button"
                  tabindex="0"
                  aria-label="Close"
                </pf-icon>
              </div>`}
        </header>
        <div id="description">
          <!-- Provide a description for the alert message -->
          <slot></slot>
        </div>
        ${footer}
      </div>
    </div>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'pf-alert': PfAlert;
  }
}

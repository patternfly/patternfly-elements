import { LitElement, html, type TemplateResult, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { state } from 'lit/decorators.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import styles from './pf-alert.css';

export type AlertVariant = (
  | 'default'
  | 'info'
  | 'warning'
  | 'danger'
  | 'success'
);

interface AlertAction {
  action: 'dismiss' | 'confirm' | string;
  text: string;
}
interface ToastOptions {
  id?: string;
  children: string | TemplateResult;
  title?: string;
  variant?: AlertVariant;
  timeout?: number;
  actionLinks?: AlertAction[];
}



const toasts = new Set<Required<ToastOptions>>();

@customElement('pf-alert')
export class PfAlert extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  @property({ reflect: true }) variant?: AlertVariant;

  @property() icon?: string;

  #slots = new SlotController(this, null, 'icon', 'actionClose', 'title', 'actionLinks');



  private static readonly TIMEOUT_MS = 8000;
  private static _toastContainer: HTMLElement | null = null;
  private static _instanceCounter = 0;

  public static async toast(options: ToastOptions): Promise<PfAlert> {
    if (!PfAlert._toastContainer) {
      PfAlert._toastContainer = document.getElementById('toast-alerts-container');
      if (!PfAlert._toastContainer) {
        throw new Error("Toast container '#toast-alerts-container' not found in DOM.");
      }
    }

    const alertElement = document.createElement('pf-alert') as PfAlert;
    PfAlert._instanceCounter++;
    alertElement.variant = options.variant || 'default';
    alertElement.icon = options.variant === 'default' ? 'bell' :
     options.variant || 'bell';
    if (options.title) {
      const title = document.createElement('h3'); title.slot = 'title'; title.textContent = options.title;
      alertElement.appendChild(title);
    }
    if (typeof options.children === 'string') {
      const p = document.createElement('p'); p.textContent = options.children;
      alertElement.appendChild(p);
    }

    if (options.actionLinks && options.actionLinks.length > 0) {
      const actionsDiv = document.createElement('div'); actionsDiv.slot = 'actionLinks';
      options.actionLinks.forEach(actionLinks => {
        const button = document.createElement('pf-button'); button.setAttribute('variant', 'link');
        button.textContent = actionLinks.text;
        switch (actionLinks.text) {
          case 'View details':
            button.addEventListener('click', () => {
              PfAlert._toastContainer!.innerHTML = '';
            });
            break;
          case 'Ignore':
            // button.addEventListener('click', () => {  });
            break;
          default:
            button.addEventListener('click', () => { alertElement.remove(); });
            break;
        }
        actionsDiv.appendChild(button);
      });
      alertElement.appendChild(actionsDiv);
    }

    PfAlert._toastContainer!.prepend(alertElement);


    if (!options.timeout) {
      let timer: number;
      const startTimer = () => { timer = window.setTimeout(() => alertElement.remove(), PfAlert.TIMEOUT_MS); };
      alertElement.addEventListener('mouseenter', () => window.clearTimeout(timer));
      alertElement.addEventListener('mouseleave', startTimer);
      startTimer();
    }
    return alertElement;
  }




  override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('icon') && this.icon) {
      import('@patternfly/elements/pf-icon/pf-icon.js');
    }
  }


  override render(): TemplateResult<1> {
    const { variant, icon } = this;
    const hasIcon = !!icon || this.#slots.hasSlotted('icon');
    return html`
      <div id="container" part="container"
        class=${classMap({ hasIcon, [variant ?? '']: !!variant })}>

        <div id="icon-container" part="icon-container">
          <slot name="icon" part="icon">${!this.icon ? '' : html`
            <pf-icon icon="${this.icon}"></pf-icon>`}
          </slot>
        </div>

        <div id="title-area" part="title-area">
          <slot name="title"></slot>
        </div>

        <div id="close-action" part="close-action">
          <slot name="actionClose"></slot> 
        </div>

        <div id="description" part="description">
          <slot></slot>
        </div>

        <div id="action-links" part="action-links">
          <slot name="actionLinks"></slot>
        </div>

      </div>
    `;
  }
}
@customElement('alert-demo-page')
export class AlertDemoPage extends LitElement {

  @state() private alertCounter = 0;
  private addToastAlert() {
    this.alertCounter++;
    const id = this.alertCounter;

    PfAlert.toast({
      variant: 'default',
      title: `Default timeout Alert`,
      children: `This alert will dismiss after 8 seconds.`,
      actionLinks: [
        { action: 'view', text: 'View details' },
        { action: 'ignore', text: 'Ignore' },
      ],
    });
  }
  private removeAllToastAlerts() {
    const container = document.getElementById('toast-alerts-container');
    if (container) {
      container.innerHTML = '';
    }
  }
  override render(): TemplateResult {
    return html`
       <div class="demo-controls">
         <pf-button variant="control" @click="${this.addToastAlert}">
           Add alert
         </pf-button>
         <pf-button variant="control" @click="${this.removeAllToastAlerts}">
           Remove all alerts
         </pf-button>
       </div>
     `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-alert': PfAlert;
  }
}

import { LitElement, type TemplateResult, html, isServer, render } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
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
  state?: PfAlert['state'];
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

  public static async toast(options: Omit<ToastOptions, 'id'>): Promise<void> {
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
    const { matches: motionOK } = window.matchMedia('(prefers-reduced-motion: no-preference)');
    renderToasts();
    const alert = toaster.querySelector(`#${id}`);
    if (toaster.children.length && motionOK) {
      flip(toaster);
    }
    await Promise.all(toaster.getAnimations().map(x => x.finished));
    if (!persistent && alert) {
      await Promise.all(alert?.getAnimations().map(x => x.finished) ?? []);
      toasts.delete(toast);
    }
    renderToasts();
  }


  @property({ reflect: true })
  state:
    | 'warning'
    | 'custom'
    | 'neutral'
    | 'info'
    | 'success'
    | 'danger'
    | 'cogear' = 'neutral';

  @property({ reflect: true }) variant?: 'alternate' | 'toast' | 'inline';

  @property({ reflect: true, type: Boolean }) dismissable = false;

  #slots = new SlotController(this, 'header', null, 'actions');

  get #icon() {
    const state = this.state.toLowerCase() as this['state'];
    switch (state) {
      // @ts-expect-error: support for deprecated props
      case 'note': return ICONS.get('info');
      // @ts-expect-error: support for deprecated props
      case 'default': return ICONS.get('neutral');
      // @ts-expect-error: support for deprecated props
      case 'error': return ICONS.get('danger');
      default: return ICONS.get(state);
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
        return state.toLowerCase() as this['state'];
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
    const state = this.#aliasState(this.state);
    const inDemo = this.closest('.demo-with-arrows') !== null;
    const hasDescription = this.querySelector('p') !== null;
    const showArrow = inDemo;
    const arrowDirection = hasDescription ? 'angle-down' : 'angle-right';
    const footer = html`<footer class="${classMap({ hasActions })}"
            <!-- Provide actions that the user can take for the alert -->
            <slot name="actions"></slot>
          </footer>`;
    return html`
      <section id="container"
              part="container"
              class=
              ${classMap({
      hasBody,
      light: true,
      [state]: true,
      [variant]: !!variant,
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
            </div>${!this.dismissable && this.variant !== 'toast' ? '' : html`
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
    </section>
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
  render(repeat(toasts, t => t.id, ({
    id, state, heading, message, actions, persistent }) => {
    const [firstAction, secondAction] = actions ?? [];
    return html`
          <pf-alert id="${id}"
                state="${state}" 
                variant="toast"
                class="${classMap({ persistent })}"
                role="status"
                aria-live="polite"
                @focusin="${manageAlertAnimation}"
                @focusout="${manageAlertAnimation}"
                @mouseenter="${manageAlertAnimation}"
                @mouseleave="${manageAlertAnimation}">
        <h3 slot="header">${heading}</h3>
      ${!message ? '' : typeof message !== 'string' ? message : html`
      <p class="text" ?hidden="${!message}">${message}</p>`}
      ${[firstAction, secondAction].filter(x => !!x).map(action => html`      
            <pf-button slot="actions" 
                    variant="${action.action === 'confirm' ? 'secondary' : 'link'}"
                    data-action="${action.action}">${action.text}</pf-button>
          `) ?? []}

      </pf-alert>
    `;
  }), toaster);
}


function manageAlertAnimation(event: Event) {
  const alert =
    event.target instanceof PfAlert ? event.target
      : event.target instanceof Element ? event.target.closest('pf-alert')
        : null;
  if (!alert) {
    return;
  }
  for (const animation of alert.getAnimations() ?? []) {
    switch (event.type) {
      case 'focusin':
      case 'mouseenter':
        animation.pause();
        break;
      case 'focusout':
      case 'mouseleave':
        if (!alert.matches(':focus-within')) {
          animation.play();
        }
        break;
    }
  }
}
/**
 * @see https://aerotwist.com/blog/flip-your-animations/
 * @param toaster container for toasted alerts
 */
function flip(toaster: HTMLElement) {
  const first = toaster.offsetHeight;
  const last = toaster.offsetHeight;
  const invert = last - first;
  const animation = toaster.animate([
    { transform: `translateY(${invert}px)` },
    { transform: 'translateY(0)' },
  ], {
    duration: 150,
    easing: 'ease-out',
  });
  animation.startTime = document.timeline.currentTime;
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-alert': PfAlert;
  }
}

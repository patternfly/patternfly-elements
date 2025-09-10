// --- Lit core ---
import { LitElement, html, render, isServer, type TemplateResult, type CSSResult } from 'lit';
import { css, unsafeCSS } from 'lit';

// --- Lit decorators ---
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

// --- Lit directives ---
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';

// --- PatternFly helpers/controllers ---
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

// --- PatternFly elements ---
import '@patternfly/elements/pf-alert/pf-alert.js';
import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-icon/pf-icon.js';

// --- CSS ---
import alertCSS from './pf-alert.css';
import toastStyles from './pf-alert-toast-styles.css';

// import { css, LitElement } from 'lit';
const styles = css`${unsafeCSS(alertCSS)}`;


interface AlertAction {
  action: 'dismiss' | 'confirm' | string;
  text: string;
}

interface ToastOptions {
  id?: string;
  message: string | Node | TemplateResult | (string | Node | TemplateResult)[];
  heading?: string;
  state?: PfAlert['state'];
  persistent?: boolean;
  actions?: [] | [AlertAction] | [AlertAction, AlertAction];
}

const ICONS = new Map(Object.entries({
  neutral: 'pf-icon-info',
  info: 'pf-icon-info',
  success: 'pf-icon-ok',
  caution: 'pf-icon-warning-triangle-o',
  warning: 'pf-icon-warning-triangle-o',
  danger: 'pf-icon-error-circle-o',
}));

export class AlertCloseEvent extends Event {
  constructor(public action: 'close' | 'confirm' | 'dismiss' | string) {
    super('close', { bubbles: true, cancelable: true });
  }
}

let toaster: HTMLElement;
const toasts = new Set<Required<ToastOptions>>();

@customElement('pf-alert-wrapper')
export class PfAlert extends LitElement {
  static override styles: CSSResult[] = [styles];

  @property({ reflect: true })
  state: 'danger' | 'warning' | 'caution' | 'neutral' | 'info' | 'success' = 'neutral';

  @property({ reflect: true }) variant?: 'inline' | 'toast';

  @property({ reflect: true, type: Boolean }) dismissable = false;

  #slots = new SlotController(this, 'header', null, 'actions');

  get #icon() {
    const state = this.state.toLowerCase() as this['state'];
    return ICONS.get(state);
  }

  #onClose() {
    if (this.dispatchEvent(new AlertCloseEvent('close'))) {
      this.#close();
    }
  }

connectedCallback(): void {
  super.connectedCallback();
  if (!isServer) this.requestUpdate();
}

render(): TemplateResult {
    const _isServer = isServer && !this.hasUpdated;
    const hasActions = _isServer || this.#slots.hasSlotted('actions');
    const hasBody = _isServer || this.#slots.hasSlotted(SlotController.default as unknown as string);
    const { variant = 'inline' } = this;

    const footer = html`<footer class="${classMap({ hasActions })}" @click="${this.#onActionsClick}">
      <slot name="actions"></slot>
    </footer>`;

    return html`
      <pf-alert id="container"
                class="${classMap({ [variant]: true, [this.state]: true })}"
                variant="${variant}"
                state="${this.state}"
                ?dismissible="${this.dismissable}">
        <pf-icon id="icon" icon="${this.#icon}"></pf-icon>
        <header ?hidden="${!_isServer && this.#slots.isEmpty('header')}">
          <slot name="header"></slot>
          ${this.dismissable && variant !== 'toast' ? html`
            <pf-button id="close-button" variant="plain" @click="${this.#onClose}">×</pf-button>` : ''}
        </header>
        <div id="description"><slot></slot></div>
        ${footer}
      </pf-alert>
    `;
  }

  async #close() {
    await this.updateComplete;
    await Promise.all(this.getAnimations().map(x => { x.finish(); return x.finished; }));
    this.remove();
  }

  async #onActionsClick(event: MouseEvent) {
    if (event.target instanceof HTMLElement
      && event.target.slot === 'actions'
      && typeof event.target.dataset.action === 'string'
      && this.dispatchEvent(new AlertCloseEvent(event.target.dataset.action.toLowerCase()))) {
      this.#close();
    }
  }

  public static async toast({
    message, persistent = false, heading = 'Success', state = 'info', actions: _actions
  }: Omit<ToastOptions, 'id'>): Promise<void> {
    const actions = _actions ?? [];
    toaster ??= initToaster();
    const id = getRandomId();
    const toast = { actions, heading, message, state, id, persistent };
    toasts.add(toast);
    const { matches: motionOK } = window.matchMedia('(prefers-reduced-motion: no-preference)');
    renderToasts();
    const alert = toaster.querySelector(`#${id}`);
    if (toaster.children.length && motionOK) flip(toaster);
    await Promise.all(toaster.getAnimations().map(x => x.finished));
    if (!persistent) {
      await Promise.all(alert?.getAnimations().map(x => x.finished) ?? []);
      toasts.delete(toast);
    }
    renderToasts();
  }
}

function initToaster() {
  const node = document.createElement('section');
  node.classList.add('pf-alert-toast-group');
  document.adoptedStyleSheets = [...document.adoptedStyleSheets ?? [], (toastStyles as unknown as CSSResult).styleSheet!];
  document.body.append(node);
  return node;
}

function renderToasts() {
  render(repeat(toasts, x => x.id, ({ actions, id, state, heading, message, persistent }) => {
    const [firstAction, secondAction] = actions ?? [];
    return html`
      <pf-alert-wrapper id="${id}" state="${state}" variant="toast" class="${classMap({ persistent })}" @mouseenter="${manageAlertAnimation}" @mouseleave="${manageAlertAnimation}">
        <h3 slot="header">${heading}</h3>
        ${!message ? '' : typeof message !== 'string' ? message : html`<p>${message}</p>`}
        ${[firstAction, secondAction].filter(x => !!x).map(action => html`
          <pf-button slot="actions" variant="${action === firstAction ? 'secondary' : 'link'}" data-action="${action.action}">${action.text}</pf-button>`)}
      </pf-alert-wrapper>
    `;
  }), toaster);
}

async function manageAlertAnimation(event: Event) {
  const alert = event.target instanceof PfAlert ? event.target : event.target instanceof Element ? event.target.closest('pf-alert-wrapper') : null;
  if (!alert) return;
  for (const animation of alert.getAnimations() ?? []) {
    switch (event.type) {
      case 'focusin':
      case 'mouseenter':
        return animation.pause();
      case 'focusout':
      case 'mouseleave':
        if (!alert.matches(':focus-within')) return animation.play();
    }
  }
}

function flip(toaster: HTMLElement) {
  const first = toaster.offsetHeight;
  const last = toaster.offsetHeight;
  const invert = last - first;
  const animation = toaster.animate([{ transform: `translateY(${invert}px)` }, { transform: 'translateY(0)' }], {
    duration: 150,
    easing: 'ease-out',
  });
  animation.startTime = document.timeline.currentTime;
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-alert-wrapper': PfAlert;
  }
}
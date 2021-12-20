import { LitElement, html, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { pfelement, bound, observed, initializer } from '@patternfly/pfe-core/decorators.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import style from './pfe-progress-steps-item.scss';

const ICONS = new Map(Object.entries({
  done: svg`<svg height="100%" width="100%" viewBox="0 0 512 512" aria-hidden="true" role="img" aria-describedby="pf-tooltip-183" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>`,
  error: svg`<svg height="100%" width="100%" viewBox="0 0 512 512" aria-hidden="true" role="img" aria-describedby="pf-tooltip-196" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>`,
}));

/**
 * @cssprop `--pfe-progress-steps-item--Width` {@default auto}
 * @cssprop `--pfe-progress-steps-item--MinHeight--vertical` {@default var(--pfe-progress-steps__item--Width, var(--pfe-theme--ui--element--size--lg, 75px))}
 * @cssprop `--pfe-progress-steps-item__circle--Size` {@default var(--pfe-theme--ui--element--size--md, 32px)} circle
 * @cssprop `--pfe-progress-steps-item__circle--Color` {@default var(--pfe-theme--color--feedback--info, #06c)} circle
 * @cssprop `--pfe-progress-steps-item__circle--Color--hover` {@default var(--pfe-theme--color--feedback--info, #06c)} circle
 * @cssprop `--pfe-progress-steps-item__circle--Color--focus` {@default var(--pfe-theme--color--feedback--info, #06c)} circle
 * @cssprop `--pfe-progress-steps-item__circle--Background` {@default radial-gradient(circle, white 60%, rgba(255, 255, 255, 0) 61%)} circle
 * @cssprop `--pfe-progress-steps-item__circle--Width` {@default var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px))} circle
 * @cssprop `--pfe-progress-steps-item__circle--Height` {@default var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px))} circle
 * @cssprop `--pfe-progress-steps-item__circle-wrapper--Width` {@default var(--pfe-progress-steps-item__circle--Width, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px)))} circle
 * @cssprop `--pfe-progress-steps-item__circle-wrapper--Height` {@default var(--pfe-progress-steps-item__circle--Height, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px)))} circle
 * @cssprop `--pfe-progress-steps-item__title--Color` {@default var(--pfe-theme--color--text, #151515)} title
 * @cssprop `--pfe-progress-steps-item__title--Color--active` {@default var(--pfe-theme--color--feedback--info, #06c)} title
 * @cssprop `--pfe-progress-steps-item__title--Color--error` {@default var(--pfe-theme--color--feedback--critical--lighter, #c9190b)} title
 * @cssprop `--pfe-progress-steps-item__title--MarginTop--vertical` {@default calc( var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px)) / 6)} title
 * @cssprop `--pfe-progress-steps-item__description--Color` {@default var(--pfe-theme--color--text--muted, #6a6e73)} description
 * @cssprop `--pfe-progress-steps-item__description--Color--error` {@default var(--pfe-theme--color--feedback--critical--lighter, #c9190b)} description
 * @cssprop `--pfe-progress-steps-item--spacer` {@default var(--pfe-theme--content-spacer--body--sm, 0.5rem)}
 * @cssprop `--pfe-progress-steps-item__circle-inner--Width` {@default calc( var(--pfe-progress-steps-item__circle--Width, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px))) / 2.2)} circle
 * @cssprop `--pfe-progress-steps-item__circle-inner--Height` {@default calc( var(--pfe-progress-steps-item__circle--Height, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px))) / 2.2)} circle
 * @cssprop `--pfe-progress-steps-item__circle-outer--Width` {@default var(--pfe-progress-steps-item__circle--Width, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px)))} circle
 * @cssprop `--pfe-progress-steps-item__circle-outer--Height` {@default var(--pfe-progress-steps-item__circle--Height, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px)))} circle
 */
@customElement('pfe-progress-steps-item') @pfelement()
export class PfeProgressStepsItem extends LitElement {
  static readonly styles = [style];

  get icon() {
    return ICONS.get(this.state) ?? '';
  }

  /** Describes the state of the current item; allows "inactive", "done", or "error". */
  @observed
  @property({ reflect: true }) state: 'inactive'|'done'|'error' = 'inactive';

  @property({ type: Boolean, reflect: true }) vertical = false;

  /**
   * Indicates if this item is the current active item.
   */
  @observed
  @property({ type: Boolean, reflect: true }) current = false;

  // programatically generate a link based on slot
  @observed
  @property({ type: Boolean, reflect: true, attribute: 'is-link' }) isLink = false;

  // programatically skip links based on state
  private _skipLink = false;

  private slots = new SlotController(this, 'title', 'description');

  private _link?: HTMLAnchorElement|null;

  constructor() {
    super();
    this.addEventListener('click', this._clickHandler);
    this.addEventListener('keydown', this._keydownHandler);
  }

  render() {
    return html`
      <div class="pfe-progress-steps-item__circle">${this.icon}</div>
        ${this.slots.hasSlotted('title') || this.slots.hasSlotted('description') ? html`
        <div class="pfe-progress-steps-item__content">${this.slots.hasSlotted('title') ? html`
            <div class="pfe-progress-steps-item__content--title">
                <slot name="title"></slot>
            </div>` : ''}${this.slots.hasSlotted('description') ? html`
            <div class="pfe-progress-steps-item__content--description">
                <slot name="description"></slot>
            </div>` : ''}
        </div>` : ''}
    `;
  }

  @initializer({ observe: false }) protected _build() {
    // find out if we should skip the link
    this._skipLink = this.current || this.state === 'error';

    if (this._skipLink) {
      this._link = null;
      this.isLink = false;
    } else {
      // Find out if there are any links
      this._link = this.querySelector<HTMLAnchorElement>('a[slot=link]');

      if (this._link?.innerText) {
        this.setAttribute('aria-label', this._link?.innerText);
      }

      this.isLink = !!this._link;
    }
  }

  protected _currentChanged(oldVal?: boolean, newVal?: boolean) {
    if (oldVal === newVal) {
      return;
    }
    this.setAttribute('aria-current', (!!newVal).toString());
  }

  protected _stateChanged() {
    this._build();
  }

  protected _isLinkChanged() {
    this.setAttribute('tabindex', this.isLink ? '0' : '-1');
    if (this.isLink) {
      this.setAttribute('role', 'link');
    } else {
      this.removeAttribute('role');
      this.removeAttribute('aria-label');
    }
  }

  @bound private _clickHandler() {
    this._link?.click();
  }

  // Listen for keyboard events and map them to their
  // corresponding mouse events.
  // @TODO This needs AT
  @bound private _keydownHandler(event: KeyboardEvent) {
    const { key } = event;
    switch (key) {
      case 'Enter':
        this._clickHandler();
        break;
      case ' ':
        // Prevent the browser from scolling when the user hits the space key
        event.stopPropagation();
        event.preventDefault();
        this._clickHandler();
        break;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-progress-steps-item': PfeProgressStepsItem;
  }
}

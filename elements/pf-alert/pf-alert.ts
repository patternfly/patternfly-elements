import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import { LitElement, html, type ComplexAttributeConverter, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';

import styles from './pf-alert.css';
import { ComposedEvent } from '@patternfly/pfe-core';

import '@patternfly/elements/pf-icon/pf-icon.js';

const ICONS = {
  default: { set: 'patternfly', icon: 'bell' },
  success: { set: 'fas', icon: 'circle-check' },
  warning: { set: 'fas', icon: 'exclamation-triangle' },
  danger: { set: 'fas', icon: 'exclamation-circle' },
  info: { set: 'fas', icon: 'info-circle' },
  close: { set: 'patternfly', icon: 'close' },
  get(name: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'close') {
    const { set, icon } = ICONS[name];
    return html`
      <pf-icon
          aria-hidden="true"
          fill="currentColor"
          size="md"
          set="${set}"
          icon="${icon}">
      </pf-icon>`;
  }
};

export class AlertCloseEvent extends ComposedEvent {
  constructor() {
    super('close', {
      cancelable: true
    });
  }
}

const BooleanNumberConverter: ComplexAttributeConverter<boolean | number> = {
  toAttribute(value: boolean | number) {
    if (!value) {
      return null;
    } else if (typeof value === 'boolean' && value) {
      return 8000;
    } else {
      return Number(value);
    }
  }
};

/**
 * An **alert** is a message that communicates a change in state or condition that might affect the user's experience on a page.
 *
 * @summary Communicates a change in state or condition that might affect the user's experience on a page.
 *
 * @fires {AlertCloseEvent} close - when the alert is closed
 *
 * @slot header - Place the alert header here
 * @slot - Place the alert content here
 * @slot actions - Place the alert actions here
 * @slot icon - Place the alert icon here
 *
 * @cssproperty {<color>} --alert-title-color
 *              Color of the alert title
 *              {@default `var(--pf-global--default-color--300, #003737)`}
 * @cssproperty {<color>} --alert-icon-color
 *              Color of the alert icon
 *              {@default `var(--pf-global--default-color--200, #009596)`}
 * @cssproperty {<color>} --alert-inline-background-color
 *              Background color of the alert when inline
 *              {@default `var(--pf-global--palette--cyan-50, #f2f9f9)`}
 * @cssproperty {<color>} --alert-border-top-color
 *              Color of the top border of the alert
 *              {@default `#009596`}
 * @cssproperty {<color>} --alert-background-color
 *              Background color of the alert
 *              {@default `#ffffff`}
 * @cssproperty {<string>} --alert-box-shadow
 *              Box shadow of the alert
 *              {@default `0 0.5rem 1rem 0 rgba(3, 3, 3, 0.16), 0 0 0.375rem 0 rgba(3, 3, 3, 0.08)`}
 * @cssproperty {<length>} --alert-padding-top
 *              Padding top of the alert
 *              {@default `1rem`}
 * @cssproperty {<length>} --alert-padding-left
 *              Padding left of the alert
 *              {@default `1rem`}
 * @cssproperty {<length>} --alert-padding-right
 *              Padding right of the alert
 *              {@default `1rem`}
 * @cssproperty {<length>} --alert-padding-bottom
 *              Padding bottom of the alert
 *              {@default `1rem`}
 * @cssproperty {<length>} --alert-font-size
 *              Font size of the alert
 *              {@default `0.875rem`}
 * @cssproperty {<length>} --alert-border-top-width
 *              Width of the top border of the alert
 *              {@default `2px`}
 * @cssproperty {<length>} --alert-header-slotted-margin
 *              Margin of the slotted header
 *              {@default `0`}
 * @cssproperty {<length>} --alert-header-slotted-padding-block
 *              Padding block of the slotted header
 *              {@default `2px 4px`}
 * @cssproperty {<length>} --alert-icon-font-size
 *              Font size of the alert icon
 *              {@default `var(--pf-global--icon--font-size--md, 1.125rem)`}
 * @cssproperty {<length>} --alert-description-slotted-margin-block
 *              Margin block of the slotted description
 *              {@default `0`}
 * @cssproperty {<length>} --alert-description-slotted-padding
 *              Padding of the slotted description
 *              {@default `0`}
 * @cssproperty {<length>} --alert-description-action-group-padding-top
 *              Padding top of the slotted description action group
 *              {@default `1rem`}
 * @cssproperty {<length>} --alert-footer-slotted-actions-padding
 *              Padding of the slotted footer actions
 *              {@default `0`}
 * @cssproperty {<length>} --alert-footer-slotted-actions-border
 *              Border of the slotted footer actions
 *              {@default `none`}
 * @cssproperty {<length>} --alert-footer-slotted-actions-background-color
 *              Background color of the slotted footer actions
 *              {@default `transparent`}
 * @cssproperty {<length>} --alert-action-group-not-last-child-margin-right
 *              Margin right of the slotted action group when it is not the last child
 *              {@default `var(--pf-global--spacer--lg, 1.5rem)`}
 * @cssproperty {<length>} --alert-footer-slotted-actions-text-decoration-focus
 *              Text decoration of the slotted footer actions when focused
 *              {@default `underline`}
 * @cssproperty {<length>} --alert-footer-slotted-actions-cursor-hover
 *              Cursor of the slotted footer actions when hovered
 *              {@default `pointer`}
 * @cssproperty {<length>} --alert-footer-slotted-actions-text-decoration-hover
 *              Text decoration of the slotted footer actions when hovered
 *              {@default `underline`}
 */
@customElement('pf-alert')
export class PfAlert extends LitElement {
  static readonly styles = [styles];

  /** Header or title of the alert. */
  @property({ reflect: true }) header = '';

  /**
   * The amount of time, in milliseconds, the alert will be visible before automatically closing.
   * If set to `undefined`, the alert will not automatically close.
   * If set to `true`, the alert will close after 8 seconds.
   */
  @property({ reflect: true, converter: BooleanNumberConverter }) timeout: boolean | number = false;

  /**
   * The variant of the alert.
   * @type {('success' | 'danger' | 'warning' | 'info' | 'default')}
   */
  @property({ reflect: true })
    variant: 'success' | 'danger' | 'warning' | 'info' | 'default' = 'default';

  /** Whether the alert should be displayed inline. */
  @property({ reflect: true, type: Boolean }) inline = false;

  /** Whether the alert should be displayed as plain text. */
  @property({ reflect: true, type: Boolean }) plain = false;

  /** Whether the alert should be dismissable. */
  @property({ reflect: true, type: Boolean }) dismissable = false;

  /** Whether the alert should have a truncated title with a tooltip. */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'truncate-title',
  }) truncateTitle = false;

  #slots = new SlotController(this, 'header', null, 'actions');

  #icon = ICONS.get(this.variant) ?? ``;

  override willUpdate() {
    if (this.truncateTitle) {
      import('@patternfly/elements/pf-tooltip/pf-tooltip.js');
    }
  }

  firstUpdated(_changedProperties: PropertyValues<this>) {
    if (_changedProperties.has('timeout')) {
      if (this.timeout) {
        const parsed = typeof this.timeout === 'boolean' ? 8000 : this.timeout;
        setTimeout(() => {
          this.remove();
        }, parsed);
      }
    }
  }

  #closeHandler() {
    const event = new AlertCloseEvent();
    if (this.dispatchEvent(event)) {
      this.remove();
    }
  }

  render() {
    const { truncateTitle, header, dismissable } = this;
    const hasActions = this.#slots.hasSlotted('actions');
    const hasDescriptionContent = this.#slots.hasSlotted();

    return html`
       <div id="container" role="alert" aria-hidden="false"  class="${classMap({ truncateTitle })}">
        <div id="left-column" part="left-column">
          <slot name="icon" id="icon">${this.#icon}</slot>
        </div>
        <div id="middle-column" part="middle-column">
          <header>
            ${!truncateTitle ? '' : html`
              <pf-tooltip content="${header ?? ''}" trigger="header"></pf-tooltip>
             `}
            <div id="header">
              ${header ? html`${header}` : html`<slot name="header"></slot>`}
            </div>${!dismissable ? '' : html`
            <div id="header-actions">
              <button id="close-button"
                  aria-label="Close"
                  confirm
                  @click=${this.#closeHandler}><pf-icon icon="close"></pf-icon></button>
            </div>`}
          </header>
          <div id="description" class="${classMap({ hasDescriptionContent })}" part="description">
            <slot></slot>
          </div>
          <footer class="${classMap({ hasActions })}" part="footer">
            <slot name="actions"></slot>
          </footer>
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

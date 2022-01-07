import type { PfeCollapsePanel } from './pfe-collapse-panel';

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { pfeEvent } from '@patternfly/pfe-core/functions/pfeEvent.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { observed, pfelement } from '@patternfly/pfe-core/decorators.js';

import style from './pfe-collapse-toggle.scss';

export class CollapseChangeEvent extends ComposedEvent {
  constructor(
    /** @summary The toggle element which triggered the change */
    public toggle: PfeCollapseToggle,
    /** @summary The panel element which toggled */
    public panel: PfeCollapsePanel,
    /** @summary Whether the panel expanded (`true`) or collapsed (`false`) */
    public expanded: boolean
  ) {
    super('change');
  }
}

// TODO: consider moving this to core
function disablable(_: PfeCollapseToggle, __: string, descriptor: PropertyDescriptor) {
  const fn = descriptor.value;
  descriptor.value = function(this: PfeCollapseToggle, ...args: any[]) {
    if (this.disabled) {
      return;
    } else {
      return fn.call(this, ...args);
    }
  }
}

/**
 * @slot - Add the toggle content here.
 * @fires {CollapseChangeEvent} change
 *        Fired when `pfe-collase-toggle` is either expanded or collapsed.
 * @fires {CustomEvent<{ expanded: boolean, toggle: PfeCollapseToggle, panel: PfeCollapsePanel }>} pfe-collapse:change
 *        {@deprecated use `change`}
 */
@customElement('pfe-collapse-toggle') @pfelement()
export class PfeCollapseToggle extends LitElement {
  static readonly styles = [style];

  private logger = new Logger(this);

  @observed
  @property({ type: Boolean, attribute: 'expanded' }) expanded = false;

  @observed
  @property({ attribute: 'aria-controls', reflect: true }) ariaControls = '';

  @property({ type: Boolean, reflect: true }) disabled = false;

  private controlledPanel: PfeCollapsePanel|null = null;

  constructor() {
    super();
    this.addEventListener('click', this.toggle);
    this.addEventListener('keydown', this._keydownHandler);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'button');

    this.tabIndex = 0;

    this.id ||= getRandomId('pfe-collapse-toggle');

    if (!this.controlledPanel) {
      this._connectPanel(this.ariaControls);
    }
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  protected _expandedChanged() {
    this.setAttribute('aria-expanded', String(!!this.expanded));

    // one last try to hook up a panel
    if (!this.controlledPanel) {
      this._connectPanel(this.ariaControls);
    }

    if (!this.controlledPanel) {
      this.logger.warn('This toggle doesn\'t have a panel associated with it');
    } else {
      const { expanded, controlledPanel: panel } = this;

      panel.expanded = expanded;
      /**
       * @deprecated use `change`
       */
      this.dispatchEvent(pfeEvent('pfe-collapse:change', { expanded, panel, toggle: this }));
      this.dispatchEvent(new CollapseChangeEvent(this, panel, expanded));
    }
  }

  protected _ariaControlsChanged(_oldVal: string, newVal: string) {
    if (newVal) {
      this._connectPanel(newVal);
    }
  }

  private _keydownHandler(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
      case 'Spacebar':
      case 'Enter':
        this.toggle();
        break;
    }
  }

  private _connectPanel(id: string) {
    if (id) {
      const root = this.getRootNode();
      if (root instanceof Document || root instanceof ShadowRoot) {
        this.controlledPanel = root.querySelector(`#${id}`);
      } else {
        this.logger.warn('pfe-collapse-toggle was not connected');
      }
    }
  }

  /** Expand the panel */
  @disablable
  expand() {
    this.expanded = true;
  }

  /** Collapse the panel */
  @disablable
  collapse() {
    this.expanded = false;
  }

  /** Toggle the panel */
  @disablable
  toggle() {
    this.expanded = !this.expanded;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-collapse-toggle': PfeCollapseToggle;
  }
}

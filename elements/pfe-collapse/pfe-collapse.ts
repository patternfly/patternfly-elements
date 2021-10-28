import type { PfeCollapsePanel } from './pfe-collapse-panel.js';
import type { PfeCollapseToggle } from './pfe-collapse-toggle.js';

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { observed, pfelement, initializer } from '@patternfly/pfe-core/decorators.js';

import './pfe-collapse-panel.js';
import './pfe-collapse-toggle.js';

import style from './pfe-collapse.scss';

/**
 * Collapse is used to hide and show content.
 *
 * @slot - Place the `pfe-collapse-toggle` and `pfe-collapse-panel` elements here.
 */
@customElement('pfe-collapse') @pfelement()
export class PfeCollapse extends LitElement {
  static readonly styles = [style];

  /**
   * Can turn the animation of the panel expanding and collapsing either on or off.
   * Animation of the panel defaults to true. Adding `animation` to the
   * `pfe-collapse` tag will copy the `animation` attribute to the
   * `pfe-collapse-panel`.
   *
   * ```html
   * <pfe-collasible animation="false">
   *   ...
   * </pfe-collapse>
   * ```
   */
  @observed
  @property({ reflect: true })
    animation?: 'true'|'false';

  private _toggle: PfeCollapseToggle|null = null;
  private _panel: PfeCollapsePanel|null = null;

  constructor() {
    super();
    this.addEventListener('pfe-collapse-panel:animation-start', this._animationStartHandler);
    this.addEventListener('pfe-collapse-panel:animation-end', this._animationEndHandler);
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  protected _animationChanged(_oldVal?: 'false'|'true', newVal?: 'false'|'true') {
    if (newVal !== 'false' && newVal !== 'true') {
      return;
    }

    if (this._panel) {
      this._panel.animation = newVal;
    }
  }

  @initializer() protected async _init() {
    await this.updateComplete;
    this._toggle = this.querySelector('pfe-collapse-toggle');
    this._panel = this.querySelector('pfe-collapse-panel');
    this._toggle?.setAttribute?.('aria-controls', this._panel?.id ?? '');
  }

  private _animationStartHandler() {
    this.classList.add('animating');
  }

  private _animationEndHandler() {
    this.classList.remove('animating');
  }

  toggle() {
    this._toggle?.toggle?.();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-collapse': PfeCollapse;
  }
}

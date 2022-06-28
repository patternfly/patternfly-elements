/* eslint-disable no-console */
import { property } from 'lit/decorators.js';

import { observed } from '@patternfly/pfe-core/decorators.js';

import { LitElement } from 'lit';
import { BasePopper } from '../Popper/Popper';

import style from './pfe-popper.scss';
export abstract class BaseTooltip extends BasePopper {
  @observed
  @property({ type: String, reflect: true }) position = 'top';

  // @observed
  // @property({ type: Boolean, reflect: true, attribute: 'is-open' }) isOpen = false;

  // @observed
  // @property({ type: Array, reflect: true }) offset = [0, 18];

  static readonly styles = [style];


  connectedCallback(): void {
    super.connectedCallback();
    this._addListeners();
    if (!['top', 'bottom'].includes(this.position)) {
      this.offset = [-4, 15];
    }
  }

  abstract render(): ReturnType<LitElement['render']>


  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeListeners();
  }

  _addListeners() {
    this.addEventListener('focus', this.show);
    this.addEventListener('blur', this.hide);
    this.addEventListener('tap', this.show);
    this.addEventListener('click', this.show);
    this.addEventListener('mouseenter', this.show);
    this.addEventListener('mouseleave', this.hide);
  }

  _removeListeners() {
    this.removeEventListener('focus', this.show);
    this.removeEventListener('blur', this.hide);
    this.removeEventListener('tap', this.show);
    this.removeEventListener('click', this.show);
    this.removeEventListener('mouseenter', this.show);
    this.removeEventListener('mouseleave', this.hide);
  }
}

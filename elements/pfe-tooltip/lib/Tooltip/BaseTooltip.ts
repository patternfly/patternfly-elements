/* eslint-disable no-console */
import { LitElement } from 'lit';
import { BasePopper } from '../Popper/Popper.js';
export abstract class BaseTooltip extends BasePopper {
  connectedCallback(): void {
    super.connectedCallback();
    this._addListeners();
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

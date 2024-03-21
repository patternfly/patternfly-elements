import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './BaseSwitch.css';
/**
 * Switch
 */
export abstract class BaseSwitch extends LitElement {
  static readonly styles = [styles];

  static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true, };

  static readonly formAssociated = true;

  declare shadowRoot: ShadowRoot;

  #internals = InternalsController.of(this, { role: 'switch' });

  #initiallyDisabled = this.hasAttribute('disabled');

  @property({ reflect: true }) label?: string;

  @property({ reflect: true, type: Boolean, attribute: 'show-check-icon' }) showCheckIcon = false;

  @property({ reflect: true, type: Boolean }) checked = false;

  disabled = this.#initiallyDisabled;

  get labels(): NodeListOf<HTMLLabelElement> {
    return this.#internals.labels as NodeListOf<HTMLLabelElement>;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('click', this.#onClick);
    this.addEventListener('keyup', this.#onKeyup);
    this.addEventListener('keydown', this.#onKeyDown);
    this.#updateLabels();
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
    this.requestUpdate();
  }

  override render() {
    return html`
      <div id="container" tabindex="0">
        <svg id="toggle" fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512">
          <path ?hidden=${!this.showCheckIcon} d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
        </svg>
      </div>
    `;
  }

  override willUpdate() {
    this.#internals.ariaChecked = String(this.checked);
    this.#internals.ariaDisabled = String(this.disabled);
  }

  #onClick(event: Event) {
    // @ts-expect-error: firefox workarounds for double-firing in the case of switch nested in label
    const { originalTarget, explicitOriginalTarget } = event;
    if (explicitOriginalTarget) {
      let labels: HTMLLabelElement[];
      if (
        originalTarget === event.target &&
        !(labels = Array.from(this.labels)).includes(explicitOriginalTarget) &&
        labels.includes(this.closest('label') as HTMLLabelElement)
      ) {
        return;
      }
    }
    this.#toggle();
  }

  #onKeyup(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        event.stopPropagation();
        this.#toggle();
    }
  }

  #onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
        event.preventDefault();
        event.stopPropagation();
    }
  }

  #toggle() {
    if (this.disabled) {
      return;
    }

    this.checked = !this.checked;
    this.#updateLabels();
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  #updateLabels() {
    const labelState = this.checked ? 'on' : 'off';
    this.labels.forEach(label => {
      const spans = label.querySelectorAll('span');
      spans.forEach(span => {
        if (span) {
          span.hidden = span.dataset.state !== labelState;
        }
      });
    });
  }
}

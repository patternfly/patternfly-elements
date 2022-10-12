import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { pfelement } from '@patternfly/pfe-core/decorators.js';

import styles from './pfe-clipboard-copy.scss';

export type ClipboardCopyVariant = (
  | 'basic'
  | 'expanded'
);

/**
 * Clipboard Copy
 * @slot - Place element content here
 */
@customElement('pfe-clipboard-copy') @pfelement()
export class PfeClipboardCopy extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [styles];

  @property({ reflect: true }) variant: ClipboardCopyVariant = 'basic';

  @property({ type: Boolean, reflect: true }) readonly = false;

  #renderBasic() {
    return html`
      <div class="pf-c-clipboard-copy">
        <div class="pf-c-clipboard-copy__group">
          <input
            class="pf-c-form-control"
            type="text"
            value="This is editable"
            id="basic-editable-text-input"
            aria-label="Copyable input"
            ?readonly=${this.readonly}
          />
          <button
            class="pf-c-button pf-m-control"
            type="button"
            aria-label="Copy to clipboard"
            id="basic-editable-copy-button"
            aria-labelledby="basic-editable-copy-button basic-editable-text-input"
          >
            <slot name="icon" aria-hidden="true">
              <pfe-icon icon="web-icon-globe"></pfe-icon>
            </slot>
          </button>
        </div>
      </div>
    `;
  }

  #renderExpandable() {
    return html`
      <div class="pf-c-clipboard-copy">
        <div class="pf-c-clipboard-copy__group">
          <button
            class="pf-c-button pf-m-control"
            type="button"
            id="expandable-not-expanded-editable-toggle"
            aria-labelledby="expandable-not-expanded-editable-toggle expandable-not-expanded-editable-text-input"
            aria-controls="expandable-not-expanded-editable-content"
          >
            <div class="pf-c-clipboard-copy__toggle-icon">
              <i class="fas fa-angle-right" aria-hidden="true"></i>
            </div>
          </button>
          <input
            class="pf-c-form-control"
            type="text"
            value="This is an editable version of the copy to clipboard component that has an expandable section. Got a lot of text here, need to see all of it? Click that arrow on the left side and check out the resulting expansion."
            id="expandable-not-expanded-editable-text-input"
            aria-label="Copyable input"
          />
          <button
            class="pf-c-button pf-m-control"
            type="button"
            aria-label="Copy to clipboard"
            id="expandable-not-expanded-editable-copy-button"
            aria-labelledby="expandable-not-expanded-editable-copy-button expandable-not-expanded-editable-text-input"
          >
            <i class="fas fa-copy" aria-hidden="true"></i>
          </button>
        </div>
        <div
          class="pf-c-clipboard-copy__expandable-content"
          hidden
          id="expandable-not-expanded-editable-content"
        >This is an editable version of the copy to clipboard component that has an expandable section. Got a lot of text here, need to see all of it? Click that arrow on the left side and check out the resulting expansion.</div>
      </div>
    `;
  }

  render() {
    return html`
      ${this.variant === 'basic' ? this.#renderBasic() : ''}
      ${this.variant === 'expanded' ? this.#renderExpandable() : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-clipboard-copy': PfeClipboardCopy;
  }
}

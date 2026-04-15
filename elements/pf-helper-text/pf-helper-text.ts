import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import '@patternfly/elements/pf-icon/pf-icon.js';

import styles from './pf-helper-text.css';

/** Map of status to default icons (Font Awesome solid set). */
const StatusIconMap = {
  success: 'check-circle',
  warning: 'exclamation-triangle',
  error: 'exclamation-circle',
  indeterminate: 'info-circle',
};

/**
 * Displays contextual feedback for form fields with optional icon and status color.
 *
 * @slot icon - Optional custom icon to override the default icon.
 * @slot - Default slot for the helper text content.
 *
 * @fires icon-load - Fired when the icon successfully loads.
 * @fires icon-error - Fired if loading the icon fails.
 *
 * @csspart icon - The container for the icon.
 * @csspart text - The container for the text.
 */
@customElement('pf-helper-text')
export class PfHelperText extends LitElement {
  public static readonly styles: CSSStyleSheet[] = [styles];

  /**
   * Defines the helper text status and its corresponding color and icon.
   */
  @property({ reflect: true }) variant:
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'indeterminate' = 'default';

  /**
   * Custom icon name to override the default icon.
   * Requires `<pf-icon>` to be imported.
   */
  @property() icon?: string;

  /**
   * Icon set for custom icons (e.g., 'fas', 'patternfly').
   */
  @property({ attribute: 'icon-set' }) iconSet?: string;

  #slots = new SlotController(this, 'icon', null);

  /**
   * Determine the effective icon to display.
   */
  private get _resolvedIcon(): string | undefined {
    if (this.icon) {
      return this.icon;
    }
    if (this.variant !== 'default') {
      return StatusIconMap[this.variant];
    }
    return undefined;
  }

  protected render(): TemplateResult<1> {
    const iconName = this._resolvedIcon;
    const showIcon = !!this.icon || this.#slots.hasSlotted('icon');

    return html`
      <span id="icon" ?hidden="${!showIcon}">
        <slot name="icon">
          <pf-icon icon="${iconName}"
                   set="${ifDefined(this.iconSet)}"
                   role="presentation"></pf-icon>
        </slot>
      </span>
      <span id="text" aria-live="polite">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-helper-text': PfHelperText;
  }
}

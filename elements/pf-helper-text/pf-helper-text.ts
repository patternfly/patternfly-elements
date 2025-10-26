import '@patternfly/elements/pf-icon/pf-icon.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import styles from './pf-helper-text.css';

/**
 * Status types for helper text.
 * Determines which default icon to show if no custom icon is provided.
 */
export type HelperTextStatus = 'default' | 'success' | 'warning' | 'error' | 'indeterminate';

/**
 * Helper Text
 *
 * Provides contextual feedback for form fields or UI elements.
 * Allows showing default icons based on status or custom icons via properties or slotted content.
 *
 * Slots:
 * - `icon`: optional slot to override the default icon
 * - default slot: place any text/content
 *
 * Properties:
 * - `status`: sets the helper text status and chooses a default icon
 * - `icon`: custom icon name (overrides default)
 * - `iconSet`: icon set to use when `icon` is specified
 *
 * Events:
 * - `icon-load`: fired when the icon successfully loads
 * - `icon-error`: fired if loading the icon fails, includes the error detail
 */
@customElement('pf-helper-text')
export class PfHelperText extends LitElement {
  /** Static styles for the component */
  static readonly styles: CSSStyleSheet[] = [styles];

  /**
   * The helper text status.
   * Options: 'default' | 'success' | 'warning' | 'error' | 'indeterminate'
   * Determines the default icon if no custom icon is provided.
   */
  @property({ attribute: 'status' })
  status: HelperTextStatus = 'default';

  /**
   * Name of a custom icon to display.
   * Overrides the default icon associated with the status.
   * Requires pf-icon to be imported.
   */
  @property({ attribute: 'icon' })
  icon: string | undefined;

  /**
   * Icon set to use for the custom icon.
   * Required when specifying the `icon` property.
   */
  @property({ attribute: 'icon-set' })
  iconSet: string | undefined;

  /**
   * Computes the icon name to display.
   * - Returns `icon` if defined
   * - Otherwise maps `status` to a default icon
   * - Returns undefined if no icon should be shown (status 'default')
   */
  private get _iconName(): string | undefined {
    // Use custom icon if provided
    if (this.icon) {
      return this.icon;
    }

    // Map status to default icons
    switch (this.status) {
      case 'success': return 'circle-check';
      case 'warning': return 'exclamation-triangle';
      case 'error': return 'exclamation-circle';
      case 'indeterminate': return 'minus-circle';
      default: return undefined; // no icon for default status
    }
  }

  /**
   * Render method for the helper text element.
   * - Renders `<pf-icon>` if there is an icon
   * - Supports lazy loading to optimize performance
   * - Fires `icon-load` and `icon-error` events from pf-icon
   * - Provides slots for custom icons and text content
   */
  render(): TemplateResult<1> {
    const iconName = this._iconName;
    const hasIcon = !!iconName;

    return html`
      <!-- Slot for user-defined icon. If none is provided, render pf-icon -->
      <slot name="icon">
        ${hasIcon ?
          html`
            <pf-icon
              icon="${iconName}"             <!-- icon name from _iconName -->
              set="${ifDefined(this.iconSet)}" <!-- optional icon set -->
              loading="lazy"                 <!-- defer loading until needed -->
              @load=${() => this.dispatchEvent(new CustomEvent('icon-load', { bubbles: true }))} 
              @error=${(e: Event) => this.dispatchEvent(new CustomEvent('icon-error', { bubbles: true, detail: e }))}
            ></pf-icon>
          `
          : ''}
      </slot>

      <!-- Default slot for helper text content -->
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-helper-text': PfHelperText;
  }
}

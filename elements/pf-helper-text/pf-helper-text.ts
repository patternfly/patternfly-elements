import '@patternfly/elements/pf-icon/pf-icon.js';
import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import styles from './pf-helper-text.css';

/**
 * Helper Text Statuses
 */
export type HelperTextStatus = 'default' | 'success' | 'warning' | 'error' | 'indeterminate';

/**
 * Helper Text
 * @slot icon - Custom icon to override default
 * @slot - Place element content here
 */
@customElement('pf-helper-text')
export class PfHelperText extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  /**
   * Defines the helper text status and its corresponding icon.
   * Options include 'default', 'success', 'warning', 'error', 'indeterminate'.
   */
  @property({ attribute: 'status' })
  status: HelperTextStatus = 'default';

  /**
   * The icon name to use. Overrides the default icon for a given status.
   * Requires pf-icon to be imported.
   */
  @property({ attribute: 'icon' })
  icon: string | undefined;

  /**
   * The icon set to use, e.g., 'fas' for Font Awesome Solid.
   * Required when using the 'icon' property.
   */
  @property({ attribute: 'icon-set' })
  iconSet: string | undefined;

  /**
   * מחשב את האייקון שיוצג, בהתבסס על הסטטוס או המאפיין icon
   */
  private get _iconName(): string | undefined {
    // אם המשתמש הגדיר אייקון ספציפי, השתמש בו
    if (this.icon) {
      return this.icon;
    }

    // אם לא הוגדר אייקון ספציפי, החזר אייקון ברירת מחדל לפי הסטטוס
    switch (this.status) {
      case 'success':
        return 'circle-check';
      case 'warning':
        return 'exclamation-triangle';
      case 'error':
        return 'exclamation-circle';
      case 'indeterminate':
        return 'minus-circle';
      default:
        return undefined; // במצב 'default' אין אייקון ברירת מחדל
    }
  }

  // בקובץ pf-helper-text.ts
  render(): TemplateResult<1> {
    const iconName = this._iconName; // מקבל את שם האייקון או undefined
    const hasIcon = !!iconName;

    return html`
      
      <slot name="icon">
        
        ${hasIcon ?
          html`
            <pf-icon icon="${iconName}"  set="${ifDefined(this.iconSet)}" ></pf-icon>
        
          `
          : ''}
      </slot>
      
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-helper-text': PfHelperText;
  }
}

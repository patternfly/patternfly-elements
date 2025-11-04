import '@patternfly/elements/pf-icon/pf-icon.js';
import { LitElement, html, css, type TemplateResult, type CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * Status types for helper text items.
 */
export type HelperTextStatus =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'indeterminate';

/**
 * `<pf-helper-text-item>`
 *
 * Represents a single helper text line, including optional icon and status color.
 * Can be used inside `<pf-helper-text>` to display contextual feedback for form fields.
 *
 * @slot icon - Optional custom icon to override the default icon.
 * @slot - Default slot for the helper text content.
 *
 * @fires icon-load - Fired when the icon successfully loads.
 * @fires icon-error - Fired if loading the icon fails.
 *
 * @csspart icon - The container for the icon.
 * @csspart text - The container for the text.
 * @csspart item - The wrapper for both icon and text.
 */
@customElement('pf-helper-text-item')
export class PfHelperTextItem extends LitElement {
  /**
   * Defines the helper text status and its corresponding color and icon.
   */
  @property({ reflect: true })
  status: HelperTextStatus = 'default';

  /**
   * Custom icon name to override the default icon.
   * Requires `<pf-icon>` to be imported.
   */
  @property({ type: String })
  icon?: string;

  /**
   * Icon set for custom icons (e.g., 'fas', 'patternfly').
   */
  @property({ type: String, attribute: 'icon-set' })
  iconSet?: string;

  /**
   * When true, indicates the item is dynamic (updates visually in response to validation).
   */
  @property({ type: Boolean, attribute: 'is-dynamic' })
  isDynamic = false;

  /**
   * Controls whether the item should display an icon.
   */
  @property({ type: Boolean, attribute: 'has-icon' })
  hasIcon = true;

  /**
   * Map of status to default icons (Font Awesome solid set).
   */
  private readonly _statusIconMap: Record<
    Exclude<HelperTextStatus, 'default'>,
    string
  > = {
      success: 'check-circle',
      warning: 'exclamation-triangle',
      error: 'exclamation-circle',
      indeterminate: 'info-circle',
    };

  /**
   * Determine the effective icon to display.
   */
  private get _resolvedIcon(): string | undefined {
    if (this.icon) {
      return this.icon;
    }
    if (this.status !== 'default') {
      return this._statusIconMap[this.status];
    }
    return undefined;
  }

  /**
   * Base styles adapted from PatternFly helper text design tokens.
   */
  static readonly styles: CSSResultGroup = css`
    :host {
      display: flex;
      align-items: center;
      gap: var(--pf-c-helper-text--Gap, 0.25rem);
      font-size: var(--pf-c-helper-text--FontSize, 0.875rem);
      color: var(--pf-c-helper-text__item-text--Color, #151515);
      line-height: 1.4;
    }

    /* Color variants */
    :host([status='indeterminate']) {
      color: var(--pf-c-helper-text__item-text--m-indeterminate--Color, #6a6e73);
    }

    :host([status='warning']) {
      color: var(--pf-c-helper-text__item-text--m-warning--Color, #795600);
    }

    :host([status='success']) {
      color: var(--pf-c-helper-text__item-text--m-success--Color, #1e4f18);
    }

    :host([status='error']) {
      color: var(--pf-c-helper-text__item-text--m-error--Color, #a30000);
    }

    pf-icon {
      fill: currentColor;
    }
  `;

  protected render(): TemplateResult {
    const iconName = this._resolvedIcon;
    const showIcon = this.hasIcon && iconName;

    return html`
      <div class="pf-c-helper-text__item" part="item">
        ${showIcon ?
          html`
              <span class="pf-c-helper-text__item-icon" part="icon">
                <slot name="icon">
                  <pf-icon
                    icon="${iconName}"
                    set="${ifDefined(this.iconSet)}"
                    aria-hidden="true"
                    @load=${() =>
            this.dispatchEvent(
              new CustomEvent('icon-load', { bubbles: true })
            )}
                    @error=${(e: Event) =>
              this.dispatchEvent(
                new CustomEvent('icon-error', {
                          bubbles: true,
                          detail: { error: e },
                        })
              )}
                  ></pf-icon>
                </slot>
              </span>
            `
          : ''}
        <span class="pf-c-helper-text__item-text" part="text">
          <slot></slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-helper-text-item': PfHelperTextItem;
  }
}

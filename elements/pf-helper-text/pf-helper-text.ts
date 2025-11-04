import { LitElement, html, css, type TemplateResult, type CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';


/**
 * `<pf-helper-text>`
 *
 * Container for one or more `<pf-helper-text-item>` elements.
 * Provides accessibility structure and optional live-region behavior.
 *
 * @slot - Contains one or more `<pf-helper-text-item>` elements.
 */
@customElement('pf-helper-text')
export class PfHelperText extends LitElement {
  /**
   * Styles controlling spacing and layout.
   */
  static readonly styles: CSSResultGroup = css`
    :host {
      display: block;
      font-size: var(--pf-c-helper-text--FontSize, 0.875rem);
      gap: var(--pf-c-helper-text--Gap, 0.25rem);
    }

    ::slotted(pf-helper-text-item) {
      display: block;
      margin-block: 0.25rem;
    }
  `;

  protected render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-helper-text': PfHelperText;
  }
}

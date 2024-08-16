import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import style from './pf-accordion-panel.css';

/**
 * Accordion Panel
 * @slot - Panel content
 * @cssprop     {<color>} --pf-c-accordion--BackgroundColor
 *              Sets the background color for the panel content.
 *              {@default `var(--pf-global--BackgroundColor--light-100, #ffffff)`}
 * @cssprop     {<color>} --pf-c-accordion__panel--Color
 *              Sets the font color for the panel content.
 *              {@default `var(--pf-global--Color--dark-200, #6a6e73)`}
 * @cssprop     {<length>} --pf-c-accordion__panel--FontSize
 *              Sets the font size for the panel content.
 *              {@default `var(--pf-global--FontSize--sm, 0.875rem)`}
 * @cssprop     {<color>} --pf-c-accordion__panel--content-body--before--BackgroundColor
 *              Sets the sidebar color for the panel when the context is expanded.
 *              {@default `var(--pf-global--primary-color--100, #0066cc)`}
 * @cssprop     {<length>} --pf-c-accordion__panel--m-fixed--MaxHeight
 *              Sets the maximum height for the panel content.
 *              Will only be used if the `fixed` attribute is used.
 *              {@default `9.375rem`}
 * @cssprop     {<length>} --pf-c-accordion__panel-body--PaddingTop
 *              Sets the padding top for the panel content.
 *              {@default `var(--pf-global--spacer--sm, 0.5rem)`}
 * @cssprop     {<length>} --pf-c-accordion__panel-body--PaddingRight
 *              Sets the padding right for the panel content.
 *              {@default `var(--pf-global--spacer--md, 1rem)`}
 * @cssprop     {<length>} --pf-c-accordion__panel-body--PaddingBottom
 *              Sets the padding bottom for the panel content.
 *              {@default `var(--pf-global--spacer--sm, 0.5rem)`}
 * @cssprop     {<length>} --pf-c-accordion__panel-body--PaddingLeft
 *              Sets the padding left for the panel content.
 *              {@default `var(--pf-global--spacer--md, 1rem)`}
 * @cssprop     {<color>} --pf-c-accordion__panel-body--before--BackgroundColor
 *              Sets the background color for the panel content.
 *              {@default `transparent`}
 * @cssprop     --pf-c-accordion__panel-body--before--Width
 *              Sets the before width for the panel content.
 *              {@default `var(--pf-global--BorderWidth--lg, 3px)`}
 */
@customElement('pf-accordion-panel')
export class PfAccordionPanel extends LitElement {
  static readonly styles: CSSStyleSheet[] = [style];

  @property({ type: Boolean, reflect: true }) expanded = false;

  @property({ reflect: true }) bordered?: 'true' | 'false';

  override connectedCallback(): void {
    super.connectedCallback();
    this.id ||= getRandomId(this.localName);
    this.setAttribute('role', 'region');
  }

  override render(): TemplateResult<1> {
    return html`
      <div tabindex="-1">
        <div id="container" class="content" part="container">
          <div class="body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-accordion-panel': PfAccordionPanel;
  }
}

import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { styleMap } from 'lit/directives/style-map.js';

import styles from './pf-v6-background-image.css';

/**
 * A **background image** allows you to place a decorative image in the
 * background of your page or area of a page. Use this when you want to
 * provide a branded backdrop. The element SHOULD be placed as a direct
 * child of `<body>`. Users MUST set `src` to display an image. This
 * element SHOULD NOT contain interactive content. It is hidden from
 * screen readers via `aria-hidden` for WCAG compliance.
 *
 * @summary Places a decorative image in the background of a page.
 */
@customElement('pf-v6-background-image')
export class PfV6BackgroundImage extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  /** URL or file path of the background image */
  @property() src?: string;

  override render(): TemplateResult<1> {
    return html`<div id="background" aria-hidden="true" style="${styleMap({
      '--pf-v6-c-background-image--BackgroundImage': this.src ? `url('${this.src.replace(/'/g, '\\\'')}')` : undefined,
    })}"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-background-image': PfV6BackgroundImage;
  }
}

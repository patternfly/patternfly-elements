import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { property } from 'lit/decorators/property.js';


import { styleMap, type StyleInfo } from 'lit/directives/style-map.js';

import styles from './pf-background-image.css';

/**
 * A **background image** allows you to place an image in the background of your page or area of a page.
 * @summary Allows users to place an image in the background of your page or area of a page.
 * @alias Background Image
 */
@customElement('pf-background-image')
export class PfBackgroundImage extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  /**
   * The URL for the image shown on mobile
   */
  @property({ reflect: true }) src?: string;

  /**
   * The image shown on mobile with 2x DPI
   */
  @property({ reflect: true, attribute: 'src-2x' }) src2x?: string;

  /**
   * The URL for the image shown on small screens (min-width: 576px)
   */
  @property({ reflect: true, attribute: 'src-sm' }) srcSm?: string;

  /**
   * The URL for the image shown on small screens (min-width: 576px) with 2x DPI
   */
  @property({ reflect: true, attribute: 'src-sm-2x' }) srcSm2x?: string;

  /**
   * The URL for the image shown on large screens (min-width: 992px)
   */
  @property({ reflect: true, attribute: 'src-lg' }) srcLg?: string;

  /**
   * Apply SVG Filter to the image
   */
  @property({ type: Boolean, reflect: true }) filter = false;

  @queryAssignedElements({ slot: 'filter', selector: 'svg' }) private _svg?: SVGElement[];

  #svg?: SVGElement;

  #updated = false;

  render(): TemplateResult<1> {
    const cssProps = {
      '--_background-image': this.src,
      '--_background-image-2x': this.src2x,
      '--_background-image-sm': this.srcSm,
      '--_background-image-sm-2x': this.srcSm2x,
      '--_background-image-lg': this.srcLg,
    } as StyleInfo;

    Object.entries(cssProps).forEach(([key, value]) => {
      // if the value is undefined, remove the css property
      if (!value) {
        delete cssProps[key];
      } else {
        // otherwise, add the value with the url() css function
        cssProps[key] = `url(${value})`;
      }
    });

    return html`
      <div id="container" part="container" style="${styleMap(cssProps)}">
        ${!this.filter ? html`` : html`
          <!-- Overrides the default svg filter for the background image. -->
          <slot name="filter" @slotchange=${this.#onSlotChange}>
            ${(this.#svg && this.#updated) ? this.#svg : html`
              <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
                <filter id="image_overlay">
                  <feColorMatrix type="matrix" values="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 1 0"></feColorMatrix>
                  <feComponentTransfer color-interpolation-filters="sRGB" result="duotone">
                    <feFuncR type="table" tableValues="0.086274509803922 0.43921568627451"></feFuncR>
                    <feFuncG type="table" tableValues="0.086274509803922 0.43921568627451"></feFuncG>
                    <feFuncB type="table" tableValues="0.086274509803922 0.43921568627451"></feFuncB>
                    <feFuncA type="table" tableValues="0 1"></feFuncA>
                  </feComponentTransfer>
                </filter>
              </svg>
            `}
          </slot>
        `}
      </div>
    `;
  }

  #onSlotChange() {
    const [svg] = this._svg as SVGElement[];
    if (svg) {
      this.#svg = svg;
      this.#updated = true;
      this.requestUpdate();
    } else {
      this.#updated = false;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-background-image': PfBackgroundImage;
  }
}

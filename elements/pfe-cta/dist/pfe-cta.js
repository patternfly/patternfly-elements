import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeCta 1.0.0-prerelease.39
 * @license
 * Copyright 2020 Red Hat, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
*/

class PfeCta extends PFElement {
  static get version() {
    return "1.0.0-prerelease.39";
  }

  get html() {
    return `<style>.pfe-cta--wrapper button,.pfe-cta--wrapper input,::slotted(button),::slotted(input){background-color:transparent;border:none;margin:0;padding:0;text-align:left}:host{--pfe-cta--Padding:0.6rem 0;--pfe-cta--BorderRadius:0;--pfe-cta--BackgroundColor:transparent;--pfe-cta--BackgroundColor--hover:transparent;--pfe-cta--BackgroundColor--focus:transparent;--pfe-cta--BorderColor:transparent;--pfe-cta--BorderColor--hover:transparent;--pfe-cta--BorderColor--focus:transparent;--pfe-cta--Color:var(--pfe-broadcasted--link, #06c);--pfe-cta--Color--hover:var(--pfe-broadcasted--link--hover, #003366);--pfe-cta--Color--focus:var(--pfe-broadcasted--link--focus, #003366);--pfe-cta--TextDecoration:none;--pfe-cta--TextDecoration--hover:none;--pfe-cta--TextDecoration--focus:none;--pfe-cta--FontWeight:var(--pfe-theme--font-weight--bold, 700);--pfe-cta__arrow--Display:inline;--pfe-cta__arrow--Padding:0 0.125rem 0 0.375rem;--pfe-cta__arrow--size:13px;--pfe-cta__arrow--MarginLeft:calc(var(--pfe-theme--content-spacer, 24px) * 0.25);--pfe-cta__inner--BorderColor:transparent;--pfe-cta__inner--BorderColor--hover:transparent;--pfe-cta__inner--BorderColor--focus:transparent;display:inline-block;position:relative;z-index:0;max-width:-webkit-max-content;max-width:-moz-max-content;max-width:max-content;vertical-align:middle;-webkit-transition:padding .3s cubic-bezier(.465,.183,.153,.946);transition:padding .3s cubic-bezier(.465,.183,.153,.946);-webkit-transition:padding var(--pfe-theme--animation-speed,.3s) var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:padding var(--pfe-theme--animation-speed,.3s) var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));background-color:var(--pfe-cta--BackgroundColor);border-color:var(--pfe-cta--BorderColor);background-color:var(--pfe-cta--BackgroundColor);border-radius:var(--pfe-cta--BorderRadius);border:1px solid var(--pfe-cta--BorderColor);border:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-cta--BorderColor)}:host(.focus-within),:host(:focus){outline:0!important;background-color:var(--pfe-cta--BackgroundColor--focus);border-color:var(--pfe-cta--BorderColor--focus)}::slotted(:focus),:host(.focus-within) ::slotted(*){outline:0!important;color:var(--pfe-cta--Color--focus)!important;-webkit-text-decoration:var(--pfe-cta--TextDecoration--focus)!important;text-decoration:var(--pfe-cta--TextDecoration--focus)!important}::slotted(:hover),:host(:hover),:host(:hover) ::slotted(*){--pfe-cta__arrow--Padding:0 0 0 0.5rem}:host(:hover){background-color:var(--pfe-cta--BackgroundColor--hover);border-color:var(--pfe-cta--BorderColor--hover)}:host(:hover),:host(:hover) ::slotted(*){color:var(--pfe-cta--Color--hover)!important}::slotted(*){white-space:normal;display:inline;padding:var(--pfe-cta--Padding)!important;color:#036!important;color:var(--pfe-cta--Color,#036)!important;font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-cta--FontFamily, var(--pfe-theme--font-family--heading, "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif));font-size:16px;font-size:var(--pfe-cta--FontSize,var(--pfe-theme--font-size,16px));font-weight:var(--pfe-cta--FontWeight);line-height:1.5;line-height:var(--pfe-cta--LineHeight,var(--pfe-theme--line-height,1.5));-webkit-text-decoration:var(--pfe-cta--TextDecoration)!important;text-decoration:var(--pfe-cta--TextDecoration)!important}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){::slotted(*){padding:0!important}}@supports (-ms-ime-align:auto){::slotted(*){padding:0!important}}:host(:hover) ::slotted(*){color:var(--pfe-cta--Color--hover)!important;-webkit-text-decoration:var(--pfe-cta--TextDecoration--hover)!important;text-decoration:var(--pfe-cta--TextDecoration--hover)!important}:host ::slotted(:not(:disabled)),:host(:not([aria-disabled=true])) ::slotted(:not(:disabled)){cursor:pointer}:host([aria-disabled=true]) ::slotted(*){cursor:default!important}.pfe-cta--wrapper{white-space:nowrap}:host([aria-disabled=true]) .pfe-cta--wrapper,:host([pfe-priority]) .pfe-cta--wrapper{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:100%}.pfe-cta--inner{display:block;height:calc(100% - 4px);width:calc(100% - 4px);-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;top:2px;left:2px;z-index:-1;border:1px solid var(--pfe-cta__inner--BorderColor);border:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-cta__inner--BorderColor);border-radius:2px;outline:0}:host(.focus-within) .pfe-cta--inner{border-color:var(--pfe-cta__inner--BorderColor--focus)}:host(:hover) .pfe-cta--inner{border-color:var(--pfe-cta__inner--BorderColor--hover)}.pfe-cta--arrow{display:var(--pfe-cta__arrow--Display);padding:var(--pfe-cta__arrow--Padding);fill:var(--pfe-cta--Color);width:var(--pfe-cta__arrow--size);height:var(--pfe-cta__arrow--size);-webkit-transition:padding .3s cubic-bezier(.465,.183,.153,.946);transition:padding .3s cubic-bezier(.465,.183,.153,.946);-webkit-transition:padding var(--pfe-theme--animation-speed,.3s) var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:padding var(--pfe-theme--animation-speed,.3s) var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946))}:host(.focus-within) .pfe-cta--arrow{fill:var(--pfe-cta--Color--focus)}:host(:hover) .pfe-cta--arrow{fill:var(--pfe-cta--Color--hover)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pfe-cta--arrow{width:18px}}@supports (-ms-ime-align:auto){.pfe-cta--arrow{width:18px}}:host([pfe-priority]) svg{display:none}:host([aria-disabled=true]),:host([pfe-priority]){--pfe-cta--Padding:var(--pfe-theme--container-padding, 16px) calc(var(--pfe-theme--container-padding, 16px) * 2)}:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #99ccff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #cce6ff);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #cce6ff);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #b38cd9);--pfe-broadcasted--link-decoration:none;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:none}:host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, white);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, white);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #b38cd9);--pfe-broadcasted--link-decoration:underline;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:underline}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #333);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #003366);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #003366);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, rebeccapurple);--pfe-broadcasted--link-decoration:none;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:none}:host(:not([pfe-priority]):not([aria-disabled=true])){--pfe-cta--Color:var(--pfe-broadcasted--link, #06c);--pfe-cta--Color--hover:var(--pfe-broadcasted--link--hover, #003366);--pfe-cta--BackgroundColor--focus:rgba(40, 151, 240, 0.2);--pfe-cta--Color--focus:var(--pfe-broadcasted--link--focus, #003366)}:host([pfe-priority=secondary]){--pfe-cta--BorderRadius:var(--pfe-theme--ui--border-radius, 2px);--pfe-cta__arrow--Display:none;--pfe-cta--BackgroundColor:transparent;--pfe-cta--BorderColor:var(
    --pfe-broadcasted--text,
    var(--pfe-theme--color--ui-complement, #464646)
  );--pfe-cta--Color:var(--pfe-broadcasted--text, var(--pfe-theme--color--ui-complement, #464646));--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--BorderColor--hover:var(
    --pfe-broadcasted--text,
    var(--pfe-theme--color--ui-complement, #464646)
  );--pfe-cta--Color--hover:var(--pfe-theme--color--ui-complement--text, #fff);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-complement, #464646)}:host([pfe-priority=primary]){--pfe-cta--BorderRadius:var(--pfe-theme--ui--border-radius, 2px);--pfe-cta__arrow--Display:none;--pfe-cta--BackgroundColor:var(--pfe-theme--color--ui-accent, #e00);--pfe-cta--BorderColor:var(--pfe-theme--color--ui-accent, #e00);--pfe-cta--Color:var(--pfe-theme--color--ui-accent--text, #fff);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-accent--hover, #880000);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--ui-accent--hover, #880000);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-accent--text, #fff);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--ui-accent, #e00);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--ui-accent, #e00);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-accent--text, #fff);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-accent--text, #fff)}:host(:not([pfe-priority])[pfe-color=accent]:not([on=saturated])){--pfe-cta--Color:var(--pfe-theme--color--ui-accent, #e00)}:host([pfe-priority=secondary][pfe-color=accent]){--pfe-cta--BackgroundColor:transparent;--pfe-cta--BorderColor:var(--pfe-theme--color--ui-accent, #e00);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-accent, #e00);--pfe-cta--Color:var(--pfe-theme--color--ui-accent, #e00);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-accent, #e00);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--ui-accent, #e00);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-accent--text, #fff);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--ui-accent, #e00);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-accent, #e00);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-accent, #e00)}:host([pfe-priority=secondary][pfe-color=accent].focus-within){--pfe-cta--Color--hover:var(--pfe-theme--color--ui-accent--text, #fff)}:host([pfe-priority=primary][pfe-color=base]){--pfe-cta--BackgroundColor:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta--BorderColor:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta--Color:var(--pfe-theme--color--ui-base--text, #fff);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-base--hover, #022f40);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--ui-base--hover, #022f40);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-base--text, #fff);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-base--text, #fff);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--surface--darker, #464646);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-base--text, #fff)}:host([pfe-priority=secondary][pfe-color=base]){--pfe-cta--BackgroundColor:transparent;--pfe-cta--BorderColor:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta--Color:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-base--text, #fff);--pfe-cta--BackgroundColor--focus:rgba(40, 151, 240, 0.2);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--ui-base, #0477a4);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-base, #0477a4)}:host([pfe-priority=secondary][pfe-color=base].focus-within){--pfe-cta--Color--hover:var(--pfe-theme--color--ui-base--text, #fff)}:host(:not([pfe-priority])[pfe-color=complement]:not([on=dark]):not([on=saturated])){--pfe-cta--Color:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-complement--hover, #131313)}:host([pfe-priority=primary][pfe-color=complement]){--pfe-cta--BackgroundColor:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--BorderColor:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--Color:var(--pfe-theme--color--ui-complement--text, #fff);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-complement--hover, #131313);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--ui-complement--hover, #131313);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-complement--text, #fff);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-complement--text, #fff);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--surface--darker, #464646);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-complement--text, #fff)}:host([pfe-priority=secondary][pfe-color=complement]){--pfe-cta--BackgroundColor:transparent;--pfe-cta--BorderColor:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--Color:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-complement--text, #fff);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--ui-complement, #464646);--pfe-cta--Color--focus:var(--pfe-theme--color--ui-complement, #464646)}:host([pfe-priority=secondary][pfe-color=complement].focus-within){--pfe-cta--Color--hover:var(--pfe-theme--color--ui-complement--text, #fff)}:host([pfe-priority=secondary][pfe-variant=wind]){--pfe-cta--BackgroundColor:transparent;--pfe-cta--BorderColor:var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-cta--Color:var(--pfe-broadcasted--link, var(--pfe-theme--color--link, #06c));--pfe-cta--FontWeight:var(--pfe-theme--font-weight--normal, 500);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--surface--border--lightest, #ececec);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-cta--Color--hover:var(--pfe-theme--color--link--hover, #003366);--pfe-cta--Color--focus:var(--pfe-theme--color--link--hover, #003366);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-cta__inner--BorderColor--focus:var(--pfe-cta--BorderColor--focus);--pfe-cta--TextDecoration--hover:var(--pfe-theme--link-decoration--hover, underline)}:host([pfe-priority=secondary][pfe-variant=wind].focus-within){--pfe-cta--Color--hover:var(--pfe-theme--color--link--hover, #003366)}:host([pfe-priority=secondary][on=dark]),:host([pfe-priority=secondary][on=saturated]){--pfe-cta--BackgroundColor:transparent;--pfe-cta--BorderColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta--Color:var(--pfe-theme--color--text--on-dark, #fff);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-cta--Color--hover:var(--pfe-theme--color--text, #333);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--surface--darkest, #131313);--pfe-cta--Color--focus:var(--pfe-theme--color--text, #333)}:host([pfe-priority=primary][on=saturated]),:host([pfe-priority=primary][pfe-color=complement][on=dark]){--pfe-cta--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta--BorderColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta--Color:var(--pfe-theme--color--text, #333);--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-cta--Color--hover:var(--pfe-theme--color--text, #333);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta--BorderColor--focus:var(--pfe-theme--color--surface--lightest, #fff);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--surface--darkest, #131313);--pfe-cta--Color--focus:var(--pfe-theme--color--text, #333)}:host([aria-disabled=true]){--pfe-cta__arrow--Display:none;--pfe-cta--BackgroundColor:var(--pfe-theme--color--ui-disabled, #d2d2d2);--pfe-cta--BorderColor:var(--pfe-theme--color--ui-disabled, #d2d2d2);--pfe-cta--Color:var(--pfe-theme--color--ui-disabled--text, #797979)!important;--pfe-cta--BackgroundColor--hover:var(--pfe-theme--color--ui-disabled--hover, #d2d2d2);--pfe-cta--BorderColor--hover:var(--pfe-theme--color--ui-disabled--hover, #d2d2d2);--pfe-cta--Color--hover:var(--pfe-theme--color--ui-disabled--text, #797979);--pfe-cta--BackgroundColor--focus:var(--pfe-theme--color--ui-disabled, #d2d2d2);--pfe-cta__inner--BorderColor--focus:var(--pfe-theme--color--ui-disabled--focus, #939393);--pfe-cta--BorderColor--focus:transparent;--pfe-cta--Color--focus:var(--pfe-theme--color--ui-disabled--text, #797979)}
/*# sourceMappingURL=pfe-cta.min.css.map */
</style><span class="pfe-cta--wrapper">
  <slot></slot>${this.defaultStyle ? `<svg
    class="pfe-cta--arrow"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 31.56 31.56"
    focusable="false"
  >
    <path
      d="M15.78 0l-3.1 3.1 10.5 10.49H0v4.38h23.18l-10.5 10.49 3.1 3.1 15.78-15.78L15.78 0z"
    /></svg
  >` : ``}
  <span class="pfe-cta--inner"></span>
</span>`;
  }

  static get properties() {
    return {"priority":{"title":"Priority","type":"string","prefixed":true,"enum":["primary","secondary"],"observer":"_basicAttributeChanged"},"color":{"title":"Color","type":"string","prefixed":true,"enum":["accent","base","complement","lightest"],"observer":"_basicAttributeChanged"},"variant":{"title":"Style variant","type":"string","prefixed":true,"enum":["wind"],"observer":"_basicAttributeChanged"}};
  }

  static get slots() {
    return {"link":{"title":"Link","type":"array","maxItems":1,"namedSlot":false,"items":{"oneOf":[{"$ref":"a"},{"$ref":"button"}]}}};
  }
  static get tag() {
    return "pfe-cta";
  }

  get styleUrl() {
    return "pfe-cta.scss";
  }

  get templateUrl() {
    return "pfe-cta.html";
  }

  get schemaUrl() {
    return "pfe-cta.json";
  }

  get defaultStyle() {
    return this.hasAttribute("pfe-priority") ? false : true;
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get observedAttributes() {
    return ["pfe-priority", "pfe-color", "pfe-variant"];
  }

  constructor() {
    super(PfeCta);
    this.cta = null;

    this._init = this._init.bind(this);
    this._focusHandler = this._focusHandler.bind(this);
    this._blurHandler = this._blurHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    // Get the slot
    this._slot = this.shadowRoot.querySelector("slot");

    // Attach the slotchange listener
    this._slot.addEventListener("slotchange", this._init);

    if (this.children.length) {
      this._init();
    }
  }

  disconnectedCallback() {
    // Remove the slot change listeners
    this._slot.removeEventListener("slotchange", this._init);

    // Remove the focus state listeners
    if (this.cta) {
      this.cta.removeEventListener("focus", this._focusHandler);
      this.cta.removeEventListener("blur", this._blurHandler);
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    // Strip the prefix form the attribute
    attr = attr.replace("pfe-", "");
    // If the observer is defined in the attribute properties
    if (this[attr] && this[attr].observer) {
      // Get the observer function
      let observer = this[this[attr].observer].bind(this);
      // If it's a function, allow it to run
      if (typeof observer === "function") observer(attr, oldValue, newValue);
    }
  }

  // Initialize the component
  _init() {
    // Get the first child of the web component (light DOM)
    const firstChild = this.children[0];
    const supportedTags = ["a", "button"]; // add input later
    let supportedTag = false;

    // If the first child does not exist or that child is not a supported tag
    if (firstChild) {
      supportedTags.forEach(tag => {
        if (firstChild.tagName.toLowerCase() === tag) {
          supportedTag = true;
        }
      });
    }

    if (!firstChild || !supportedTag) {
      console.warn(
        `${PfeCta.tag}: The first child in the light DOM must be a supported call-to-action tag (<a>, <button>)`
      );
    } else if (
      firstChild.tagName.toLowerCase() === "button" &&
      this.props.priority.value === null &&
      this.getAttribute("aria-disabled") !== "true"
    ) {
      console.warn(
        `${PfeCta.tag}: Button tag is not supported semantically by the default link styles`
      );
    } else {
      // Capture the first child as the CTA element
      this.cta = firstChild;

      // Watch the light DOM link for focus and blur events
      this.cta.addEventListener("focus", this._focusHandler);
      this.cta.addEventListener("blur", this._blurHandler);
    }
  }

  // On focus, add a class
  _focusHandler(event) {
    this.classList.add("focus-within");
  }

  // On focus out, remove that class
  _blurHandler(event) {
    this.classList.remove("focus-within");
  }

  _basicAttributeChanged(attr, oldValue, newValue) {
    this[attr].value = newValue;
  }
}

PFElement.create(PfeCta);

export default PfeCta;
//# sourceMappingURL=pfe-cta.js.map

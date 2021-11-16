/*!
 * PatternFly Elements: PfeTabs 1.12.2
 * @license
 * Copyright 2021 Red Hat, Inc.
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

import PFElement from "../../pfelement/dist/pfelement.js";

const TAB_PANEL_MUTATION_CONFIG = {
  childList: true,
  subtree: true,
};

class PfeTabPanel extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.12.2";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host{display:block;color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42)}:host(:focus){outline:0}:host [tabindex]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:100%}:host .container{margin:0;width:100%;background-color:transparent;background-color:var(--pfe-tabs__panel--BackgroundColor,transparent);border-top:0;border-top:var(--pfe-tabs__panel--BorderTop,0);border-right:0;border-right:var(--pfe-tabs__panel--BorderRight,0);border-bottom:0;border-bottom:var(--pfe-tabs__panel--BorderBottom,0);border-left:0;border-left:var(--pfe-tabs__panel--BorderLeft,0);padding-top:calc(1rem * 3);padding-top:var(--pfe-tabs__panel--PaddingTop,calc(var(--pfe-theme--container-padding,1rem) * 3))}@media screen and (min-width:1200px){:host .container{padding-top:calc(1rem * 3);padding-top:var(--pfe-tabs__panel--PaddingTop,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-right:0;padding-right:var(--pfe-tabs__panel--PaddingRight,0);padding-bottom:0;padding-bottom:var(--pfe-tabs__panel--PaddingBottom,0);padding-left:0;padding-left:var(--pfe-tabs__panel--PaddingLeft,0)}}:host .container::after{clear:both;content:"";display:table}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host .container{padding:1em;background-color:#fff!important;color:#151515!important}}:host([hidden]){display:none}:host([variant=earth]){background-color:#fff;background-color:var(--pfe-tabs__panel--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff))}:host([variant=earth]) .container{padding-top:calc(1rem * 3);padding-top:var(--pfe-tabs__panel--PaddingTop,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-right:calc(1rem * 3);padding-right:var(--pfe-tabs__panel--PaddingRight,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-bottom:calc(1rem * 3);padding-bottom:var(--pfe-tabs__panel--PaddingBottom,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-left:calc(1rem * 3);padding-left:var(--pfe-tabs__panel--PaddingLeft,calc(var(--pfe-theme--container-padding,1rem) * 3))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([variant=earth]) .container{background-color:#fff;padding:1em;border-right:1px solid #d2d2d2;border-bottom:1px solid #d2d2d2;border-left:1px solid #d2d2d2}}@media screen and (min-width:768px){:host([variant=wind][vertical]) .container{padding-top:0;padding-top:var(--pfe-tabs__panel--PaddingTop,0);padding-bottom:0;padding-bottom:var(--pfe-tabs__panel--PaddingBottom,0);padding-right:0;padding-right:var(--pfe-tabs__panel--PaddingRight,0);margin:0 calc(1rem - 2px);margin:0 calc(var(--pfe-theme--container-spacer,1rem) - 2px)}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([variant=wind][vertical]) .container{padding:1em 0 1em 2em}}@media screen and (min-width:768px){:host([variant=earth][vertical]){border-top:0;border-top:var(--pfe-tabs--BorderTop,0);border-left:1px solid #d2d2d2;border-left:var(--pfe-tabs--BorderLeft,var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2));height:100%;background-color:#fff;background-color:var(--pfe-tabs__panel--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff))}:host([variant=earth][vertical]) .container{padding-left:calc(1rem * 3);padding-left:var(--pfe-tabs__panel--PaddingLeft,calc(var(--pfe-theme--container-padding,1rem) * 3))}}@media screen and (min-width:768px) and (-ms-high-contrast:active),screen and (min-width:768px) and (-ms-high-contrast:none){:host([variant=earth][vertical]) .container{border-top:1px solid #d2d2d2}}:host([variant=earth]) .container{padding-top:calc(1rem * 3);padding-top:var(--pfe-tabs__panel--PaddingTop,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-right:calc(1rem * 3);padding-right:var(--pfe-tabs__panel--PaddingRight,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-bottom:calc(1rem * 3);padding-bottom:var(--pfe-tabs__panel--PaddingBottom,calc(var(--pfe-theme--container-padding,1rem) * 3));padding-left:calc(1rem * 3);padding-left:var(--pfe-tabs__panel--PaddingLeft,calc(var(--pfe-theme--container-padding,1rem) * 3))}:host([on=dark][variant=earth]){background-color:#151515;background-color:var(--pfe-tabs__panel--BackgroundColor,var(--pfe-theme--color--surface--darkest,#151515));--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted--on-dark, #d2d2d2);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([on=saturated][variant=earth]){background-color:#fff;background-color:var(--pfe-tabs__panel--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted, #6a6e73);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}:host([on=saturated]:not([variant=earth])){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted--on-saturated, #d2d2d2);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, #fafafa);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, #fafafa);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #d2d2d2);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-saturated, underline);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-saturated, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-saturated, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-saturated, underline)}:host([on=dark]:not([variant=earth])){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted--on-dark, #d2d2d2);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)} /*# sourceMappingURL=pfe-tab-panel.min.css.map */</style>
<div tabindex="-1" role="tabpanel">
  <div class="container">
    <slot></slot>
  </div>
</div>`;
  }

  static get tag() {
    return "pfe-tab-panel";
  }

  get styleUrl() {
    return "pfe-tab-panel.scss";
  }

  get templateUrl() {
    return "pfe-tab-panel.html";
  }

  static get properties() {
    return {
      selected: {
        title: "Selected tab",
        type: Boolean,
        default: false,
        attr: "aria-selected",
        observer: "_selectedHandler",
      },
      hidden: {
        title: "Visibility",
        type: Boolean,
        default: false,
      },
      role: {
        type: String,
        default: "tabpanel",
      },
      tabindex: {
        type: Number,
        default: 0,
      },
      labelledby: {
        type: String,
        attr: "aria-labelledby",
      },
      variant: {
        title: "Variant",
        type: String,
        enum: ["wind", "earth"],
      },
      // @TODO: Deprecated in 1.0
      oldPfeId: {
        type: String,
        attr: "pfe-id",
        observer: "_oldPfeIdChanged",
      },
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeTabPanel, { type: PfeTabPanel.PfeType });

    this._init = this._init.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.hasLightDOM()) this._init();
    this._observer.observe(this, TAB_PANEL_MUTATION_CONFIG);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
  }

  _init() {
    if (window.ShadyCSS) this._observer.disconnect();

    // If an ID is not defined, generate a random one
    if (!this.id) this.id = this.randomId;

    // Force role to be set to tab
    this.role = "tabpanel";

    if (this.previousElementSibling && this.previousElementSibling.selected !== "true") {
      this.hidden = true;
    }

    if (window.ShadyCSS) this._observer.observe(this, TAB_PANEL_MUTATION_CONFIG);
  }

  _oldPfeIdChanged(oldVal, newVal) {
    if (!this.id) this.id = newVal;
  }
}

export default PfeTabPanel;

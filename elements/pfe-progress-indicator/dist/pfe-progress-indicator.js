import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeProgressIndicator 1.11.0
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

class PfeProgressIndicator extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.11.0";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host([indeterminate]) ::slotted(*){position:absolute;overflow:hidden;clip:rect(0,0,0,0);height:1px;width:1px;margin:-1px;padding:0;border:0}:host([hidden]){display:none}:host([indeterminate]){animation:spin 1s linear infinite;-webkit-animation:spin 1s linear infinite;-moz-animation:spin 1s linear infinite;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);border-width:4px;border-width:var(--pfe-theme--surface--border-width--heavy,4px);border-color:rgba(0,0,0,.25);border-color:var(--pfe-progress-indicator--background-color,rgba(0,0,0,.25));border-top-color:rgba(0,0,0,.75);border-top-color:var(--pfe-progress-indicator--foreground-color,rgba(0,0,0,.75));border-radius:100%;display:inline-block;height:2rem;height:var(--pfe-progress-indicator--Height,2rem);margin:0 auto;position:relative;width:2rem;width:var(--pfe-progress-indicator--Width,2rem);vertical-align:middle;visibility:visible}:host([size=sm]){height:1rem;width:1rem;border-width:calc(4px * .75);border-width:calc(var(--pfe-theme--surface--border-width--heavy,4px) * .75)}:host([size=md]){height:2rem;width:2rem;border-width:calc(4px * 1);border-width:calc(var(--pfe-theme--surface--border-width--heavy,4px) * 1)}:host([size=xl]){height:4rem;width:4rem;border-width:calc(4px * 1.5);border-width:calc(var(--pfe-theme--surface--border-width--heavy,4px) * 1.5)}@-webkit-keyframes spin{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}} /*# sourceMappingURL=pfe-progress-indicator.min.css.map */</style>
<slot></slot>`;
  }

  // @TODO: Deprecating in 1.0 release
  // Injected at build-time
  static get schemaProperties() {
    return {"indeterminate":{"title":"Status","type":"boolean","default":true,"prefixed":true},"size":{"title":"Size","type":"string","enum":["sm","md","xl"],"default":"md"}};
  }

  // Injected at build-time
  static get slots() {
    return {"content":{"title":"Content","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"raw"}]}}};
  }

  static get tag() {
    return "pfe-progress-indicator";
  }

  get templateUrl() {
    return "pfe-progress-indicator.html";
  }

  get styleUrl() {
    return "pfe-progress-indicator.scss";
  }

  get schemaUrl() {
    return "pfe-progress-indicator.json";
  }

  static get properties() {
    return {
      indeterminate: {
        title: "Indeterminate",
        type: Boolean,
      },
      // @TODO: Deprecated in 1.0
      oldIndeterminate: {
        alias: "indeterminate",
        attr: "pfe-indeterminate",
      },
      size: {
        title: "Size",
        type: String,
        values: ["sm", "md", "xl"],
        default: "md",
      },
    };
  }

  constructor() {
    super(PfeProgressIndicator);
    this._init = this._init.bind(this);
    this._slot = this.shadowRoot.querySelector("slot");
    this._slot.addEventListener("slotchange", this._init);
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._slot.removeEventListener("slotchange", this._init);
  }

  _init() {
    const firstChild = this.children[0];

    if (!firstChild) {
      this.warn(`You do not have a backup loading message.`);
    }
  }
}

PFElement.create(PfeProgressIndicator);

export default PfeProgressIndicator;
//# sourceMappingURL=pfe-progress-indicator.js.map

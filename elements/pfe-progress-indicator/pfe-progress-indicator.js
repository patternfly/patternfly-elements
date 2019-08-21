import PFElement from '../pfelement/pfelement.js';

/*!
 * PatternFly Elements: PfeProgressIndicator 1.0.0-prerelease.20
 * @license
 * Copyright 2019 Red Hat, Inc.
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
  static get version() {
    return "1.0.0-prerelease.20";
  }

  get html() {
    return `<style>:host([hidden]){display:none}:host([pfe-indeterminate]){animation:spin 1s linear infinite;-webkit-animation:spin 1s linear infinite;-moz-animation:spin 1s linear infinite;border-bottom:3px solid rgba(0,0,0,.25);border-bottom:var(--pfe-theme--surface--border-width--heavy,3px) var(--pfe-theme--surface--border-style,solid) rgba(0,0,0,.25);border-left:3px solid rgba(0,0,0,.25);border-left:var(--pfe-theme--surface--border-width--heavy,3px) var(--pfe-theme--surface--border-style,solid) rgba(0,0,0,.25);border-right:3px solid rgba(0,0,0,.25);border-right:var(--pfe-theme--surface--border-width--heavy,3px) var(--pfe-theme--surface--border-style,solid) rgba(0,0,0,.25);border-top:3px solid rgba(0,0,0,.75);border-top:var(--pfe-theme--surface--border-width--heavy,3px) var(--pfe-theme--surface--border-style,solid) rgba(0,0,0,.75);border-radius:100%;display:inline-block;height:2rem;height:var(--pfe-progress-indicator--Height,2rem);margin:0 auto;position:relative;width:2rem;width:var(--pfe-progress-indicator--Width,2rem);vertical-align:middle;visibility:visible}:host([pfe-indeterminate]) ::slotted(*){position:absolute;overflow:hidden;clip:rect(0,0,0,0);height:1px;width:1px;margin:-1px;padding:0;border:0}@-webkit-keyframes spin{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}</style><slot></slot>`;
  }

  static get properties() {
    return {"status":{"title":"Status","type":"string","enum":["indeterminate"],"default":"default","prefixed":true,"observer":"_basicAttributeChanged"}};
  }

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
    this._slot.removeEventListener("slotchange", this._init);
  }

  _init() {
    const firstChild = this.children[0];

    if (!firstChild) {
      console.warn(
        `${
        PfeProgressIndicator.tag
        }: You do not have a backup loading message.`
      );
    }
  }

}

PFElement.create(PfeProgressIndicator);

export default PfeProgressIndicator;
//# sourceMappingURL=pfe-progress-indicator.js.map

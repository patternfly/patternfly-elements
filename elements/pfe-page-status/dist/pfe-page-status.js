import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfePageStatus 1.0.0-prerelease.40
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

class PfePageStatus extends PFElement {
  static get version() {
    return "1.0.0-prerelease.40";
  }

  get html() {
    return `<style>:host{--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--default, #606060);--pfe-broadcasted--text:var(--pfe-theme--color--feedback--default--lightest, #ececec);--pfe-status--TextTransform:uppercase;background-color:var(--pfe-status--BackgroundColor);color:var(--pfe-broadcasted--text);position:fixed;right:0;top:0;height:100vh;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:3rem}:host([hidden]){display:none}.flag{-webkit-transform:rotateZ(90deg);transform:rotateZ(90deg)}.flag>span{display:inline-block;font-weight:700;text-transform:var(--pfe-status--TextTransform);font-size:.875rem;line-height:1em;white-space:nowrap}:host([pfe-status=moderate]){--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--moderate, #ffc024);--pfe-broadcasted--text:var(--pfe-theme--color--feedback--moderate--lightest, #fffbf0)}:host([pfe-status=important]){--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--important, #d73401);--pfe-broadcasted--text:var(--pfe-theme--color--feedback--important--lightest, #ffe1d8)}:host([pfe-status=critical]){--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--critical, #bb0000);--pfe-broadcasted--text:var(--pfe-theme--color--feedback--critical--lightest, #ffeeee)}:host([pfe-status=success]){--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--success, #2e7d32);--pfe-broadcasted--text:var(--pfe-theme--color--feedback--success--lightest, #f7fcec)}:host([pfe-status=info]){--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--info, #0277bd);--pfe-broadcasted--text:var(--pfe-theme--color--feedback--info--lightest, #dcf5fe)}:host([pfe-status=warning]){--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--moderate, #ffc024);--pfe-broadcasted--text:var(--pfe-theme--color--feedback--moderate--darkest, #8a6200)}:host([pfe-status=normal]){--pfe-status--BackgroundColor:var(--pfe-theme--color--ui-base, #0477a4);--pfe-broadcasted--text:var(--pfe-theme--color--ui-base--text, #fff)}:host([pfe-status=complement]){--pfe-status--BackgroundColor:var(--pfe-theme--color--ui-complement, #464646);--pfe-broadcasted--text:var(--pfe-theme--color--ui-complement--text, #fff)}:host([pfe-status=accent]){--pfe-status--BackgroundColor:var(--pfe-theme--color--ui-accent, #e00);--pfe-broadcasted--text:var(--pfe-theme--color--ui-accent--text, #fff)}
/*# sourceMappingURL=pfe-page-status.min.css.map */
</style><div class="flag" aria-hidden="true"><span><slot></slot></span></div>`;
  }

  static get properties() {
    return {"status":{"title":"Status","type":"string","enum":["default","moderate","warning","important","critical","success","info","normal","accent","complement"],"default":"default","prefixed":true,"observer":"_basicAttributeChanged"}};
  }

  static get slots() {
    return {"content":{"title":"Content","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"raw"}]}}};
  }
  static get tag() {
    return "pfe-page-status";
  }

  get schemaUrl() {
    return "pfe-page-status.json";
  }

  get templateUrl() {
    return "pfe-page-status.html";
  }

  get styleUrl() {
    return "pfe-page-status.scss";
  }

  static get observedAttributes() {
    return ["pfe-status"];
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfePageStatus);
  }

  connectedCallback() {
    super.connectedCallback();
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

  _basicAttributeChanged(attr, oldValue, newValue) {
    this[attr].value = newValue;
  }
}

PFElement.create(PfePageStatus);

export default PfePageStatus;
//# sourceMappingURL=pfe-page-status.js.map

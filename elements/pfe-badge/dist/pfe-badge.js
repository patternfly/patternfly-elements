import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeBadge 1.9.1
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

class PfeBadge extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.9.1";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host{display:inline-block;line-height:calc(1.5 * .75);line-height:calc(var(--pfe-theme--line-height,1.5) * .75);text-align:center;text-rendering:optimizelegibility}span{background-color:#f0f0f0;background-color:var(--pfe-badge--BackgroundColor,var(--pfe-theme--color--feedback--default--lightest,#f0f0f0));border-radius:calc(2px * 30);border-radius:var(--pfe-badge--BorderRadius,calc(var(--pfe-theme--ui--border-radius,2px) * 30));color:#151515;color:var(--pfe-badge--Color,var(--pfe-theme--color--text,#151515));font-size:calc(1rem * .75);font-size:var(--pfe-badge--FontSize,calc(var(--pfe-theme--font-size,1rem) * .75));font-weight:600;font-weight:var(--pfe-badge--FontWeight,var(--pfe-theme--font-weight--semi-bold,600));min-width:calc(1px * 2);min-width:var(--pfe-badge--MinWidth,calc(var(--pfe-theme--ui--border-width,1px) * 2));padding-left:calc(1rem / 2);padding-left:var(--pfe-badge--PaddingLeft,calc(var(--pfe-theme--container-padding,1rem)/ 2));padding-right:calc(1rem / 2);padding-right:var(--pfe-badge--PaddingRight,calc(var(--pfe-theme--container-padding,1rem)/ 2))}:host([state=moderate]) span{--pfe-badge--BackgroundColor:var(--pfe-theme--color--feedback--moderate, #f0ab00);--pfe-badge--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([state=important]) span{--pfe-badge--BackgroundColor:var(--pfe-theme--color--feedback--important, #c9190b);--pfe-badge--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([state=critical]) span{--pfe-badge--BackgroundColor:var(--pfe-theme--color--feedback--critical, #a30000);--pfe-badge--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([state=success]) span{--pfe-badge--BackgroundColor:var(--pfe-theme--color--feedback--success, #3e8635);--pfe-badge--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([state=info]) span{--pfe-badge--BackgroundColor:var(--pfe-theme--color--feedback--info, #06c);--pfe-badge--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([hidden]){display:none} /*# sourceMappingURL=pfe-badge.min.css.map */</style>
<span></span>`;
  }

  static get tag() {
    return "pfe-badge";
  }

  get templateUrl() {
    return "pfe-badge.html";
  }

  get styleUrl() {
    return "pfe-badge.scss";
  }

  static get properties() {
    return {
      state: {
        title: "State",
        type: String,
        values: ["default", "moderate", "important", "critical", "success", "info"],
        default: "default"
      },
      // @TODO: Deprecated property in 1.0
      pfeState: {
        type: String,
        prefix: false,
        alias: "state"
      },
      number: {
        title: "Number",
        type: Number,
        observer: "_numberChanged"
      },
      threshold: {
        title: "Threshold",
        type: Number,
        observer: "_thresholdChanged"
      },
      // @TODO: Deprecated property in 1.0
      pfeThreshold: {
        type: Number,
        alias: "threshold",
        prefix: false
      }
    };
  }

  constructor() {
    super(PfeBadge);
    this._textContainer = this.shadowRoot.querySelector("span");
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(...arguments);
    this._textContainer.textContent = this.textContent;
  }

  _thresholdChanged(oldVal, newVal) {
    this.textContent = Number(this.threshold) < Number(this.textContent) ? `${this.threshold}+` : this.textContent;
  }

  _numberChanged(oldVal, newVal) {
    this.textContent = this.threshold && Number(this.threshold) < Number(newVal) ? `${this.threshold}+` : newVal;
  }
}

PFElement.create(PfeBadge);

export default PfeBadge;
//# sourceMappingURL=pfe-badge.js.map

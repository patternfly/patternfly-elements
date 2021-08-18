import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfePageStatus 1.11.0
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

class PfePageStatus extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.11.0";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host{background-color:#4f5255;background-color:var(--pfe-status--BackgroundColor,var(--pfe-theme--color--feedback--default,#4f5255));position:fixed;right:0;right:var(--pfe-status--Right,0);top:0;height:100vh;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:3rem}:host([hidden]){display:none}.flag{-webkit-transform:rotateZ(90deg);transform:rotateZ(90deg)}.flag>span{color:#fff;color:var(--pfe-status--Color,var(--pfe-theme--color--text--on-dark,#fff));display:inline-block;text-transform:uppercase;text-transform:var(--pfe-status--TextTransform,uppercase);font-size:.875rem;font-family:"Red Hat Text",RedHatText,Overpass,Overpass,Arial,sans-serif;font-family:var(--pfe-theme--font-family, "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif);font-size:1rem;font-size:var(--pfe-theme--font-size,1rem);font-weight:700;line-height:1em;white-space:nowrap}:host([status=important]){--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--important, #c9190b);--pfe-status--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([status=critical]){--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--critical, #a30000);--pfe-status--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([status=success]){--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--success, #3e8635);--pfe-status--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([status=info]){--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--info, #06c);--pfe-status--Color:var(--pfe-theme--color--text--on-dark, #fff)}:host([status=moderate]),:host([status=warning]){--pfe-status--BackgroundColor:var(--pfe-theme--color--feedback--moderate, #f0ab00);--pfe-status--Color:var(--pfe-theme--color--text, #151515)}:host([status=normal]){--pfe-status--BackgroundColor:var(--pfe-theme--color--ui-accent, #06c);--pfe-status--Color:var(--pfe-theme--color--ui-accent--text, #fff)}:host([status=accent]){--pfe-status--BackgroundColor:var(--pfe-theme--color--ui-accent, #06c);--pfe-status--Color:var(--pfe-theme--color--ui-accent--text, #fff)} /*# sourceMappingURL=pfe-page-status.min.css.map */</style>
<div class="flag" aria-hidden="true"><span><slot></slot></span></div>`;
  }

  // @TODO: Deprecating in 1.0 release
  // Injected at build-time
  static get schemaProperties() {
    return {"status":{"title":"Status","type":"string","enum":["default","moderate","warning","important","critical","success","info","normal","accent","complement"],"default":"default","prefixed":true,"observer":"_basicAttributeChanged"}};
  }

  // Injected at build-time
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

  static get properties() {
    return {
      status: {
        title: "Status",
        type: String,
        values: [
          "default",
          "moderate",
          "warning",
          "important",
          "critical",
          "success",
          "info",
          "normal",
          "accent",
          "complement",
        ],
        default: "default",
      },
      // @TODO: Deprecated in 1.0
      oldStatus: {
        alias: "status",
        attr: "pfe-status",
      },
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfePageStatus);
  }
}

PFElement.create(PfePageStatus);

export default PfePageStatus;
//# sourceMappingURL=pfe-page-status.js.map

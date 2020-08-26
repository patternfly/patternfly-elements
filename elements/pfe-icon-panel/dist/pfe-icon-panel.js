import PFElement from '../../pfelement/dist/pfelement.js';
import '../../pfe-icon/dist/pfe-icon.js';

/*!
 * PatternFly Elements: PfeIconPanel 1.0.0-prerelease.55
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

class PfeIconPanel extends PFElement {
  static get version() {
    return "1.0.0-prerelease.55";
  }

  get html() {
    return `<style>:host{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-content:flex-start;-ms-flex-line-pack:start;align-content:flex-start;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}@media (min-width:576px){:host{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}}:host([pfe-stacked]:not([pfe-stacked=false])){-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}:host([pfe-stacked]:not([pfe-stacked=false])[pfe-centered]:not([pfe-centered=false])){-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;text-align:center}.pfe-icon-panel__content{margin-top:16px;margin-top:var(--pfe-theme--container-spacer,16px);margin-left:0}@media (min-width:576px){.pfe-icon-panel__content{margin-top:0;margin-left:16px;margin-left:var(--pfe-theme--container-spacer,16px)}}:host([pfe-stacked]:not([pfe-stacked=false])) .pfe-icon-panel__content{margin-top:16px;margin-top:var(--pfe-theme--container-spacer,16px);margin-left:0}.pfe-icon-panel__footer{margin-top:24px;margin-top:var(--pfe-theme--content-spacer,24px)}
/*# sourceMappingURL=pfe-icon-panel.min.css.map */
</style><pfe-icon pfe-size="${this.getAttribute("pfe-circled") === "true" ? "lg" : "xl"}"></pfe-icon>
<div class="pfe-icon-panel__content">
  <slot class="pfe-icon-panel__header" name="pfe-icon-panel--header"></slot>
  <slot class="pfe-icon-panel__body"></slot>
  <slot class="pfe-icon-panel__footer" name="pfe-icon-panel--footer"></slot>
</div>`;
  }

  static get properties() {
    return {"icon":{"title":"Icon","type":"string","prefixed":false},"color":{"title":"Color","type":"string","enum":["complement","accent","lightest","base","darker","darkest","critical","important","moderate","success","info"],"default":"darker","prefixed":true},"centered":{"title":"Centered","type":"boolean","prefixed":true,"default":false},"stacked":{"title":"Stacked","type":"boolean","prefixed":true,"default":false},"circled":{"title":"Circled","type":"boolean","default":true,"prefixed":true}};
  }

  static get slots() {
    return {"header":{"title":"Header","type":"array","namedSlot":true,"items":{"title":"Header item","oneOf":[{"$ref":"raw"}]}},"body":{"title":"Body","type":"array","namedSlot":false,"items":{"title":"Body item","oneOf":[{"$ref":"raw"}]}},"footer":{"title":"Footer","type":"array","namedSlot":true,"maxItems":3,"items":{"title":"Footer item","oneOf":[{"$ref":"raw"}]}}};
  }
  static get tag() {
    return "pfe-icon-panel";
  }

  get styleUrl() {
    return "pfe-icon-panel.scss";
  }

  get templateUrl() {
    return "pfe-icon-panel.html";
  }

  get schemaUrl() {
    return "pfe-icon-panel.json";
  }

  static get observedAttributes() {
    return ["icon", "pfe-circled", "pfe-color", "pfe-stacked", "pfe-centered"];
  }

  static get cascadingAttributes() {
    return {
      icon: "pfe-icon",
      "pfe-circled": "pfe-icon",
      "pfe-color": "pfe-icon"
    };
  }

  constructor() {
    super(PfeIconPanel);
  }
}

PFElement.create(PfeIconPanel);

export default PfeIconPanel;
//# sourceMappingURL=pfe-icon-panel.js.map

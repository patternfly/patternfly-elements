import PFElement from '../../pfelement/dist/pfelement.js';
import '../../pfe-icon/dist/pfe-icon.js';

/*!
 * PatternFly Elements: PfeIconPanel 1.12.0
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

class PfeIconPanel extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.12.0";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-content:flex-start;-ms-flex-line-pack:start;align-content:flex-start;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;margin-top:calc(-1 * 1rem);margin-top:calc(-1 * var(--pfe-theme--container-spacer,1rem));margin-right:calc(-1 * 1rem);margin-right:calc(-1 * var(--pfe-theme--container-spacer,1rem))}@media (min-width:576px){:host{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){::slotted(*){max-width:100%}}:host([stacked]),:host([stacked]:not([stacked=false])){-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.pfe-icon-panel__content{margin-top:1rem;margin-top:var(--pfe-theme--container-spacer,1rem);margin-left:0}@media (min-width:576px){.pfe-icon-panel__content{margin-top:0;margin-left:1rem;margin-left:var(--pfe-theme--container-spacer,1rem)}}.pfe-icon-panel__footer{margin-top:1.5rem;margin-top:var(--pfe-theme--content-spacer,1.5rem)} /*# sourceMappingURL=pfe-icon-panel.min.css.map */</style>
<pfe-icon size="${this.getAttribute("pfe-circled") === "true" ? "lg" : "xl"}"></pfe-icon>
<div class="pfe-icon-panel__content">
  <slot class="pfe-icon-panel__header" name="pfe-icon-panel--header"></slot>
  <slot class="pfe-icon-panel__body"></slot>
  <slot class="pfe-icon-panel__footer" name="pfe-icon-panel--footer"></slot>
</div>`;
  }

  // @TODO: Deprecating in 1.0 release
  // Injected at build-time
  static get schemaProperties() {
    return {"icon":{"title":"Icon","type":"string","prefixed":false},"color":{"title":"Color","type":"string","enum":["complement","accent","lightest","base","darker","darkest","critical","important","moderate","success","info"],"default":"darker","prefixed":true},"centered":{"title":"Centered","type":"boolean","prefixed":true,"default":false},"stacked":{"title":"Stacked","type":"boolean","prefixed":true,"default":false},"circled":{"title":"Circled","type":"boolean","default":true,"prefixed":true}};
  }

  // Injected at build-time
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

  static get properties() {
    return {
      icon: {
        title: "Icon",
        type: String,
        attr: "icon",
        cascade: ["pfe-icon"],
      },
      circled: {
        title: "Circled",
        type: Boolean,
        cascade: ["pfe-icon"],
      },
      oldCircled: {
        alias: "circled",
        attr: "pfe-circled",
      },
      color: {
        title: "Color",
        type: String,
        values: [
          "complement",
          "accent",
          "lightest",
          "base",
          "darker",
          "darkest",
          "critical",
          "important",
          "moderate",
          "success",
          "info",
        ],
        default: "darker",
        cascade: ["pfe-icon"],
      },
      oldColor: {
        alias: "color",
        attr: "pfe-color",
      },
      stacked: {
        title: "Stacked",
        type: Boolean,
      },
      oldStacked: {
        alias: "stacked",
        attr: "pfe-stacked",
      },
      centered: {
        title: "Centered",
        type: Boolean,
      },
      oldCentered: {
        alias: "centered",
        attr: "pfe-centered",
      },
    };
  }

  constructor() {
    super(PfeIconPanel);
  }
}

PFElement.create(PfeIconPanel);

export default PfeIconPanel;
//# sourceMappingURL=pfe-icon-panel.js.map

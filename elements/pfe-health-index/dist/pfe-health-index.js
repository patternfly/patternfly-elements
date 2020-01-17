import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeHealthIndex 1.0.0-prerelease.35
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

class PfeHealthIndex extends PFElement {
  static get version() {
    return "1.0.0-prerelease.35";
  }

  get html() {
    return `<style>:host{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}:host([hidden]){display:none}:host(:not([size=lg])) .box-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;border:1px solid #d2d2d2;border:1px solid var(--pfe-theme--color--surface--border,#d2d2d2);margin-left:calc(16px * .5);margin-left:calc(var(--pfe-theme--container-spacer,16px) * .5)}:host(:not([size=lg])) .box-container .box{background:#fff;width:10px;height:20px;border-right:1px solid #d2d2d2;border-right:1px solid var(--pfe-theme--color--surface--border,#d2d2d2)}:host(:not([size=lg])) .box-container .box:last-child{border-right:0}:host(:not([size=lg])) .box-container .box.active.a{background-color:#3f9c35}:host(:not([size=lg])) .box-container .box.active.b{background-color:#92d400}:host(:not([size=lg])) .box-container .box.active.c{background-color:#efaa00}:host(:not([size=lg])) .box-container .box.active.d{background-color:#ec7a08}:host(:not([size=lg])) .box-container .box.active.e{background-color:#c00}:host(:not([size=lg])) .box-container .box.active.f{background-color:#a30000}:host([size=lg]) .box-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;border:none;margin-left:0}:host([size=lg]) .grade{padding:6px 10px}:host([size=lg]) .box{background:#fff;color:#777;border-top:2px solid #ececec}:host([size=lg]) .box:first-child{margin-left:0;border-left:2px solid #ececec}:host([size=lg]) .box.active:first-child{border-left:none}:host([size=lg]) .box:last-child{margin-right:0;border-right:2px solid #ececec}:host([size=lg]) .box.active:last-child{border-right:none}:host([size=lg]) .box>.bottom{height:8px;margin:0 .5px}:host([size=lg]) .box.active .grade{color:#fff;margin:-2px .5px 0 .5px;padding-top:8px}:host([size=lg]) .box.a.active .grade,:host([size=lg]) .box.a>.bottom{background-color:#3f9c35}:host([size=lg]) .box.b.active .grade,:host([size=lg]) .box.b>.bottom{background-color:#92d400}:host([size=lg]) .box.c.active .grade,:host([size=lg]) .box.c>.bottom{background-color:#efaa00}:host([size=lg]) .box.d.active .grade,:host([size=lg]) .box.d>.bottom{background-color:#ec7a08}:host([size=lg]) .box.e.active .grade,:host([size=lg]) .box.e>.bottom{background-color:#c00}:host([size=lg]) .box.f.active .grade,:host([size=lg]) .box.f>.bottom{background-color:#a30000}
/*# sourceMappingURL=pfe-health-index.min.css.map */
</style>${this.size !== "lg" ? `
<div id="healthIndex"></div>
<div class="box-container">
  <div class="box a"></div>
  <div class="box b"></div>
  <div class="box c"></div>
  <div class="box d"></div>
  <div class="box e"></div>
  <div class="box f"></div>
</div>
` : `
<div class="box-container">
  <div class="box a">
    <div class="grade">A</div>
    <div class="bottom"></div>
  </div>
  <div class="box b">
    <div class="grade">B</div>
    <div class="bottom"></div>
  </div>
  <div class="box c">
    <div class="grade">C</div>
    <div class="bottom"></div>
  </div>
  <div class="box d">
    <div class="grade">D</div>
    <div class="bottom"></div>
  </div>
  <div class="box e">
    <div class="grade">E</div>
    <div class="bottom"></div>
  </div>
  <div class="box f">
    <div class="grade">F</div>
    <div class="bottom"></div>
  </div>
</div>
`}`;
  }

  static get properties() {
    return {"health-index":{"title":"Health Index","type":"string","enum":["A","B","C","D","E","F"],"default":"A","prefixed":false},"size":{"title":"Size","type":"string","enum":["lg"],"default":null,"prefixed":false}};
  }

  static get slots() {
    return {};
  }
  static get tag() {
    return "pfe-health-index";
  }

  get schemaUrl() {
    return "pfe-health-index.json";
  }

  get templateUrl() {
    return "pfe-health-index.html";
  }

  get styleUrl() {
    return "pfe-health-index.scss";
  }

  static get observedAttributes() {
    return ["health-index", "size"];
  }

  constructor() {
    super(PfeHealthIndex, { delayRender: true });
    this.size = null;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case "size":
        this.size = newValue;
        this.render();
        this.updateHealthIndex(this.getAttribute("health-index"));
        break;
      case "health-index":
        this.render();
        this.updateHealthIndex(newValue);
        break;
      default:
        break;
    }
  }

  updateHealthIndex(grade) {
    const healthIndex = grade.toLowerCase();
    const healthIndexUpperCase = grade.toUpperCase();
    const boxes = [...this.shadowRoot.querySelectorAll(".box")];
    this.innerHTML = healthIndexUpperCase;

    boxes.forEach(box => {
      if (box.classList.contains(healthIndex)) {
        box.classList.add("active");
      } else {
        box.classList.remove("active");
      }
    });

    if (this.size !== "lg") {
      this.shadowRoot.querySelector(
        "#healthIndex"
      ).innerText = healthIndexUpperCase;
    }

    if (!this.shadowRoot.querySelector(".box.active")) {
      console.warn(
        `${
        PfeHealthIndex.tag
        }: a valid health-index was not provided. Please use A, B, C, D, E, or F`
      );
    }
  }
}

PFElement.create(PfeHealthIndex);

export default PfeHealthIndex;
//# sourceMappingURL=pfe-health-index.js.map

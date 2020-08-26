import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeHealthIndex 1.0.0-prerelease.55
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
    return "1.0.0-prerelease.55";
  }

  get html() {
    return `<style>@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#151515!important}}:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, #fafafa);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, #fafafa);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #8476d1);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-saturated, underline);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-saturated, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-saturated, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-saturated, underline)}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}:host{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}:host([hidden]){display:none}.box.a{--pfe-health-index--accent:#3f9c35;--pfe-health-index--accent--text:var(--pfe-theme--color--text--on-dark, #fff)}.box.b{--pfe-health-index--accent:#92d400;--pfe-health-index--accent--text:var(--pfe-theme--color--text--on-dark, #fff)}.box.c{--pfe-health-index--accent:#efaa00;--pfe-health-index--accent--text:var(--pfe-theme--color--text--on-dark, #fff)}.box.d{--pfe-health-index--accent:#ec7a08;--pfe-health-index--accent--text:var(--pfe-theme--color--text--on-dark, #fff)}.box.e{--pfe-health-index--accent:#cc0000;--pfe-health-index--accent--text:var(--pfe-theme--color--text--on-dark, #fff)}.box.f{--pfe-health-index--accent:#523333;--pfe-health-index--accent--text:var(--pfe-theme--color--text--on-dark, #fff)}:host(:not([size=lg]):not([size=mini])) .box{background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);width:calc(20px / 2);width:calc(var(--pfe-theme--ui--element--size,20px)/ 2);height:20px;height:var(--pfe-theme--ui--element--size,20px);border-right:1px solid #d2d2d2;border-right:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2)}:host(:not([size=lg]):not([size=mini])) .box:last-child{border-right:0}:host(:not([size=lg]):not([size=mini])) .box.active{background-color:var(--pfe-health-index--accent)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host(:not([size=lg]):not([size=mini])) .box.active.a{background-color:#3f9c35}:host(:not([size=lg]):not([size=mini])) .box.active.b{background-color:#92d400}:host(:not([size=lg]):not([size=mini])) .box.active.c{background-color:#efaa00}:host(:not([size=lg]):not([size=mini])) .box.active.d{background-color:#ec7a08}:host(:not([size=lg]):not([size=mini])) .box.active.e{background-color:#c00}:host(:not([size=lg]):not([size=mini])) .box.active.f{background-color:#523333}}:host([size=mini]) .box{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:20px;width:var(--pfe-theme--ui--element--size,20px);height:20px;height:var(--pfe-theme--ui--element--size,20px);-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:1em;border-radius:2px;border-radius:var(--pfe-theme--ui--border-radius,2px);background-color:var(--pfe-health-index--accent);color:var(--pfe-health-index--accent--text)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([size=mini]) .box.a{background-color:#3f9c35;color:#fff}:host([size=mini]) .box.b{background-color:#92d400;color:#fff}:host([size=mini]) .box.c{background-color:#efaa00;color:#fff}:host([size=mini]) .box.d{background-color:#ec7a08;color:#fff}:host([size=mini]) .box.e{background-color:#c00;color:#fff}:host([size=mini]) .box.f{background-color:#523333;color:#fff}}:host([size=lg]) .box{background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);color:#6a6e73;color:var(--pfe-theme--color--ui-disabled--text,#6a6e73);border-top:calc(1px * 2) solid #f5f5f5;border-top:calc(var(--pfe-theme--ui--border-width,1px) * 2) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border--lightest,#f5f5f5)}:host([size=lg]) .box:first-child{margin-left:0;border-left:calc(1px * 2) solid #f5f5f5;border-left:calc(var(--pfe-theme--ui--border-width,1px) * 2) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border--lightest,#f5f5f5)}:host([size=lg]) .box.active:first-child{border-left:none}:host([size=lg]) .box:last-child{margin-right:0;border-right:calc(1px * 2) solid #f5f5f5;border-right:calc(var(--pfe-theme--ui--border-width,1px) * 2) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border--lightest,#f5f5f5)}:host([size=lg]) .box.active:last-child{border-right:0}:host([size=lg]) .box>.bottom{height:.5em;margin:0 .5px}:host([size=lg]) .box .grade{padding:6px calc(20px / 2);padding:6px calc(var(--pfe-theme--ui--element--size,20px)/ 2)}:host([size=lg]) .box.active .grade{margin:calc(1px * -2) .5px 0 .5px;margin:calc(var(--pfe-theme--ui--border-width,1px) * -2) .5px 0 .5px;padding-top:.5em}:host([size=lg]) .box.active .grade,:host([size=lg]) .box>.bottom{background-color:var(--pfe-health-index--accent);color:var(--pfe-health-index--accent--text)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([size=lg]) .box.a>.bottom,:host([size=lg]) .box.active.a .grade{background-color:#3f9c35;color:#fff}:host([size=lg]) .box.active.b .grade,:host([size=lg]) .box.b>.bottom{background-color:#92d400;color:#fff}:host([size=lg]) .box.active.c .grade,:host([size=lg]) .box.c>.bottom{background-color:#efaa00;color:#fff}:host([size=lg]) .box.active.d .grade,:host([size=lg]) .box.d>.bottom{background-color:#ec7a08;color:#fff}:host([size=lg]) .box.active.e .grade,:host([size=lg]) .box.e>.bottom{background-color:#c00;color:#fff}:host([size=lg]) .box.active.f .grade,:host([size=lg]) .box.f>.bottom{background-color:#523333;color:#fff}}:host(:not([size=mini])) .box-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}:host(:not([size=lg]):not([size=mini])) .box-container{border:1px solid #d2d2d2;border:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2);margin-left:calc(16px * .5);margin-left:calc(var(--pfe-theme--container-spacer,16px) * .5)}:host([size=mini],[size=lg]) .box-container{border:none}:host([size=mini]) .box-container{margin:0}:host([size=lg]) .box-container{margin-left:0}
/*# sourceMappingURL=pfe-health-index.min.css.map */
</style>${this.props.size.value !== "lg" ? `
  ${this.props.size.value === "mini" ? `
    <div class="box-container">
      <div class="box">
        <div class="grade" id="healthIndex"></div>
      </div>
    </div>
  ` : `
    <div id="healthIndex"></div>
    <div class="box-container">
      <div class="box a"></div>
      <div class="box b"></div>
      <div class="box c"></div>
      <div class="box d"></div>
      <div class="box e"></div>
      <div class="box f"></div>
    </div>
  `}
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
    return {"health-index":{"title":"Health Index","type":"string","enum":["A","B","C","D","E","F"],"default":"A","prefixed":false},"size":{"title":"Size","type":"string","enum":["mini","lg"],"default":null,"prefixed":false}};
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
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);

    switch (attr) {
      case "size":
        this.props.size.value = newValue;
        this.render();
        this.updateHealthIndex(this.getAttribute("health-index"), oldValue);
        break;
      case "health-index":
        this.props.size.value = this.getAttribute("size");
        this.render();
        this.updateHealthIndex(newValue);
        break;
      default:
        break;
    }
  }

  updateHealthIndex(grade, oldValue) {
    const healthIndex = grade.toLowerCase();
    const healthIndexUpperCase = grade.toUpperCase();
    const boxes = [...this.shadowRoot.querySelectorAll(".box")];
    this.innerHTML = healthIndexUpperCase;

    if (this.props.size.value === "mini") {
      this.shadowRoot.querySelector(".box").classList.remove(oldValue);
      this.shadowRoot.querySelector(".box").classList.add(healthIndex);
    }

    boxes.forEach(box => {
      if (box.classList.contains(healthIndex)) {
        box.classList.add("active");
      } else {
        box.classList.remove("active");
      }
    });

    if (this.props.size.value !== "lg") {
      this.shadowRoot.querySelector(
        "#healthIndex"
      ).innerText = healthIndexUpperCase;
    }

    if (!this.shadowRoot.querySelector(".box.active")) {
      console.warn(
        `${PfeHealthIndex.tag}: a valid health-index was not provided. Please use A, B, C, D, E, or F`
      );
    }
  }
}

PFElement.create(PfeHealthIndex);

export default PfeHealthIndex;
//# sourceMappingURL=pfe-health-index.js.map

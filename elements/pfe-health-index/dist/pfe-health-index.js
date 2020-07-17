import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeHealthIndex 1.0.0-prerelease.52
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
    return "1.0.0-prerelease.52";
  }

  get html() {
    return `<style>@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#333!important}}:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #99ccff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #cce6ff);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #cce6ff);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #b38cd9);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, white);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, white);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #b38cd9);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-saturated, underline);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-saturated, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-saturated, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-saturated, underline)}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #333);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #003366);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #003366);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, rebeccapurple);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}:host{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}:host([hidden]){display:none}.box.a{--pfe-health-index--accent:#3f9c35;--pfe-health-index--accent--text:var(--pfe-theme--color--text--on-dark, #fff)}.box.b{--pfe-health-index--accent:#92d400;--pfe-health-index--accent--text:var(--pfe-theme--color--text--on-dark, #fff)}.box.c{--pfe-health-index--accent:#efaa00;--pfe-health-index--accent--text:var(--pfe-theme--color--text--on-dark, #fff)}.box.d{--pfe-health-index--accent:#ec7a08;--pfe-health-index--accent--text:var(--pfe-theme--color--text--on-dark, #fff)}.box.e{--pfe-health-index--accent:#cc0000;--pfe-health-index--accent--text:var(--pfe-theme--color--text--on-dark, #fff)}.box.f{--pfe-health-index--accent:#523333;--pfe-health-index--accent--text:var(--pfe-theme--color--text--on-dark, #fff)}:host(:not([size=lg]):not([size=mini])) .box{background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);width:calc(20px / 2);width:calc(var(--pfe-theme--ui--element--size,20px)/ 2);height:20px;height:var(--pfe-theme--ui--element--size,20px);border-right:1px solid #d2d2d2;border-right:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2)}:host(:not([size=lg]):not([size=mini])) .box:last-child{border-right:0}:host(:not([size=lg]):not([size=mini])) .box.active{background-color:var(--pfe-health-index--accent)}:host([size=mini]) .box{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:20px;width:var(--pfe-theme--ui--element--size,20px);height:20px;height:var(--pfe-theme--ui--element--size,20px);-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:1em;border-radius:2px;border-radius:var(--pfe-theme--ui--border-radius,2px);background-color:var(--pfe-health-index--accent);color:var(--pfe-health-index--accent--text)}:host([size=lg]) .box{background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);color:#797979;color:var(--pfe-theme--color--ui-disabled--text,#797979);border-top:calc(1px * 2) solid #ececec;border-top:calc(var(--pfe-theme--ui--border-width,1px) * 2) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border--lightest,#ececec)}:host([size=lg]) .box:first-child{margin-left:0;border-left:calc(1px * 2) solid #ececec;border-left:calc(var(--pfe-theme--ui--border-width,1px) * 2) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border--lightest,#ececec)}:host([size=lg]) .box.active:first-child{border-left:none}:host([size=lg]) .box:last-child{margin-right:0;border-right:calc(1px * 2) solid #ececec;border-right:calc(var(--pfe-theme--ui--border-width,1px) * 2) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border--lightest,#ececec)}:host([size=lg]) .box.active:last-child{border-right:0}:host([size=lg]) .box>.bottom{height:.5em;margin:0 .5px}:host([size=lg]) .box .grade{padding:6px calc(20px / 2);padding:6px calc(var(--pfe-theme--ui--element--size,20px)/ 2)}:host([size=lg]) .box.active .grade{margin:calc(1px * -2) .5px 0 .5px;margin:calc(var(--pfe-theme--ui--border-width,1px) * -2) .5px 0 .5px;padding-top:.5em}:host([size=lg]) .box.active .grade,:host([size=lg]) .box>.bottom{background-color:var(--pfe-health-index--accent);color:var(--pfe-health-index--accent--text)}:host(:not([size=mini])) .box-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}:host(:not([size=lg]):not([size=mini])) .box-container{border:1px solid #d2d2d2;border:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2);margin-left:calc(16px * .5);margin-left:calc(var(--pfe-theme--container-spacer,16px) * .5)}:host([size=mini],[size=lg]) .box-container{border:none}:host([size=mini]) .box-container{margin:0}:host([size=lg]) .box-container{margin-left:0}
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

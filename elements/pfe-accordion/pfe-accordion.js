import PFElement from "../pfelement/pfelement.js";

/*
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

// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, "findIndex", {
    value: function(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    }
  });
}

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

class PfeAccordion extends PFElement {
  get html() {
    return `
<style>
:host {
  display: block;
  position: relative;
  overflow: hidden;
  margin: 0; }
</style>
<slot></slot>`;
  }

  static get tag() {
    return "pfe-accordion";
  }

  get styleUrl() {
    return "pfe-accordion.scss";
  }

  get templateUrl() {
    return "pfe-accordion.html";
  }

  static get observedAttributes() {
    return ["theme", "color"];
  }

  static get cascadingAttributes() {
    return {
      color: "pfe-accordion-header"
    };
  }

  constructor() {
    super(PfeAccordion);
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute("role", "presentation");
    this.setAttribute("defined", "");

    this.addEventListener(`${PfeAccordion.tag}:change`, this._changeHandler);
    this.addEventListener("keydown", this._keydownHandler);

    Promise.all([
      customElements.whenDefined(PfeAccordionHeader.tag),
      customElements.whenDefined(PfeAccordionPanel.tag)
    ]).then(this._linkPanels());
  }

  disconnectedCallback() {
    this.removeEventListener(`${PfeAccordion.tag}:change`, this._changeHandler);
    this.removeEventListener("keydown", this._keydownHandler);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    if (attr === "color") {
      const headers = this.querySelectorAll(PfeAccordionHeader.tag);

      if (newVal === "striped") {
        [...headers].forEach((header, index) => {
          const headerClass = index % 2 ? "even" : "odd";
          header.classList.add(headerClass);
        });
      } else {
        [...headers].forEach((header, index) => {
          header.classList.remove("even", "odd");
        });
      }
    }
  }

  toggle(index) {
    const headers = this._allHeaders();
    const panels = this._allPanels();
    const header = headers[index];
    const panel = panels[index];

    if (!header || !panel) {
      return;
    }

    if (!header.expanded) {
      this._expandHeader(header);
      this._expandPanel(panel);
    } else {
      this._collapseHeader(header);
      this._collapsePanel(panel);
    }
  }

  expand(index) {
    const headers = this._allHeaders();
    const panels = this._allPanels();
    const header = headers[index];
    const panel = panels[index];

    if (!header || !panel) {
      return;
    }

    this._expandHeader(header);
    this._expandPanel(panel);
  }

  expandAll() {
    const headers = this._allHeaders();
    const panels = this._allPanels();

    headers.forEach(header => this._expandHeader(header));
    panels.forEach(panel => this._expandPanel(panel));
  }

  collapse(index) {
    const headers = this._allHeaders();
    const panels = this._allPanels();
    const header = headers[index];
    const panel = panels[index];

    if (!header || !panel) {
      return;
    }

    this._collapseHeader(header);
    this._collapsePanel(panel);
  }

  collapseAll() {
    const headers = this._allHeaders();
    const panels = this._allPanels();

    headers.forEach(header => this._collapseHeader(header));
    panels.forEach(panel => this._collapsePanel(panel));
  }

  _linkPanels() {
    const headers = this._allHeaders();
    headers.forEach(header => {
      const panel = this._panelForHeader(header);

      header.setAttribute("aria-controls", panel.id);
      panel.setAttribute("aria-labelledby", header.id);
    });
  }

  _changeHandler(evt) {
    if (this.classList.contains("animating")) {
      return;
    }

    const header = evt.target;
    const panel = evt.target.nextElementSibling;

    if (evt.detail.expanded) {
      this._expandHeader(header);
      this._expandPanel(panel);
    } else {
      this._collapseHeader(header);
      this._collapsePanel(panel);
    }
  }

  _toggle(header, panel) {}

  _expandHeader(header) {
    header.expanded = true;
  }

  _expandPanel(panel) {
    if (panel.expanded) {
      return;
    }

    panel.expanded = true;

    const height = panel.getBoundingClientRect().height;
    this._animate(panel, 0, height);
  }

  _collapseHeader(header) {
    header.expanded = false;
  }

  _collapsePanel(panel) {
    if (!panel.expanded) {
      return;
    }

    const height = panel.getBoundingClientRect().height;
    panel.expanded = false;

    this._animate(panel, height, 0);
  }

  _animate(panel, start, end) {
    panel.classList.add("animating");
    panel.style.height = `${start}px`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.style.height = `${end}px`;
        panel.classList.add("animating");
        panel.addEventListener("transitionend", this._transitionEndHandler);
      });
    });
  }

  _keydownHandler(evt) {
    const currentHeader = evt.target;

    if (!this._isHeader(currentHeader)) {
      return;
    }

    let newHeader;

    switch (evt.key) {
      case "ArrowDown":
      case "Down":
      case "ArrowRight":
      case "Right":
        newHeader = this._nextHeader();
        break;
      case "ArrowUp":
      case "Up":
      case "ArrowLeft":
      case "Left":
        newHeader = this._previousHeader();
        break;
      case "Home":
        newHeader = this._firstHeader();
        break;
      case "End":
        newHeader = this._lastHeader();
        break;
      default:
        return;
    }

    newHeader.shadowRoot.querySelector("button").focus();
  }

  _transitionEndHandler(evt) {
    evt.target.style.height = "";
    evt.target.classList.remove("animating");
    evt.target.removeEventListener("transitionend", this._transitionEndHandler);
  }

  _allHeaders() {
    return [...this.querySelectorAll(PfeAccordionHeader.tag)];
  }

  _allPanels() {
    return [...this.querySelectorAll(PfeAccordionPanel.tag)];
  }

  _panelForHeader(header) {
    const next = header.nextElementSibling;

    if (next.tagName.toLowerCase() !== PfeAccordionPanel.tag) {
      console.error(
        `${PfeAccordion.tag}: Sibling element to a header needs to be a panel`
      );
      return;
    }

    return next;
  }

  _previousHeader() {
    const headers = this._allHeaders();
    let newIndex =
      headers.findIndex(header => header === document.activeElement) - 1;
    return headers[(newIndex + headers.length) % headers.length];
  }

  _nextHeader() {
    const headers = this._allHeaders();
    let newIndex =
      headers.findIndex(header => header === document.activeElement) + 1;
    return headers[newIndex % headers.length];
  }

  _firstHeader() {
    const headers = this._allHeaders();
    return headers[0];
  }

  _lastHeader() {
    const headers = this._allHeaders();
    return headers[headers.length - 1];
  }

  _isHeader(element) {
    return element.tagName.toLowerCase() === PfeAccordionHeader.tag;
  }
}

class PfeAccordionHeader extends PFElement {
  get html() {
    return `
<style>
:host {
  --pfe-accordion--main:         var(--pfe-theme--color--surface--lighter, #ececec);
  --pfe-accordion--aux:          var(--pfe-theme--color--surface--lighter--text, #333);
  --pfe-accordion--focus:        var(--pfe-theme--color--surface--lighter--link--focus, #003366);
  display: block;
  background: var(--pfe-accordion--main);
  color: var(--pfe-accordion--aux); }
  :host button {
    padding: calc(var(--pfe-theme--container-spacer, 1rem) * 0.75);
    margin: 0;
    width: 100%;
    height: auto;
    border: 1px solid transparent;
    font-family: inherit;
    font-size: var(--pfe-theme--font-size, 16px);
    line-height: 1.5;
    text-align: left;
    background: none;
    cursor: pointer;
    color: var(--pfe-accordion--aux); }
    :host button:focus {
      outline: 1px solid var(--pfe-accordion--focus); }
    :host button::-moz-focus-inner {
      border: 0; }
    :host button[aria-expanded] {
      position: relative;
      display: block;
      font-weight: normal;
      padding-left: calc(var(--pfe-theme--container-spacer, 1rem) * 2.5); }
    :host button[aria-expanded="false"]::before {
      content: "";
      position: absolute;
      left: var(--pfe-theme--container-spacer, 1rem);
      top: calc((var(--pfe-theme--container-spacer, 1rem) * 0.75) + 0.5935em);
      display: block;
      border-style: solid;
      border-width: 0.15em 0.15em 0 0;
      height: 0.313em;
      width: 0.313em;
      text-align: center;
      transition: transform 0.15s;
      transform: rotate(45deg); }
    :host button[aria-expanded="true"]::before {
      content: "";
      position: absolute;
      left: var(--pfe-theme--container-spacer, 1rem);
      top: calc((var(--pfe-theme--container-spacer, 1rem) * 0.75) + 0.5935em);
      display: block;
      width: 0.313em;
      height: 0.313em;
      border-style: solid;
      border-width: 0.15em 0.15em 0 0;
      text-align: center;
      transition: all 0.15s;
      transform: rotate(135deg); }

:host(.animating) {
  transition: transform 0.3s var(--pfe-theme--animation-timing, cubic-bezier(0.465, 0.183, 0.153, 0.946)); }

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 1px; }

:host([color="lightest"]),
:host([color="striped"].even) {
  --pfe-accordion--main:         var(--pfe-theme--color--surface--lightest, #fff);
  --pfe-accordion--aux:          var(--pfe-theme--color--surface--lightest--text, #333);
  --pfe-accordion--focus:        var(--pfe-theme--color--surface--lightest--link--focus, #003366); }
  :host([color="lightest"]) button[aria-expanded="true"],
  :host([color="striped"].even) button[aria-expanded="true"] {
    border-top-color: var(--pfe-theme--color--surface--border--lightest, #ececec);
    border-left-color: var(--pfe-theme--color--surface--border--lightest, #ececec);
    border-right-color: var(--pfe-theme--color--surface--border--lightest, #ececec); }

:host([color="base"]) {
  --pfe-accordion--main:         var(--pfe-theme--color--surface--base, #dfdfdf);
  --pfe-accordion--aux:          var(--pfe-theme--color--surface--base--text, #333);
  --pfe-accordion--focus:        var(--pfe-theme--color--surface--base--link--focus, #00305b); }

:host([color="dark"]) {
  --pfe-accordion--main:         var(--pfe-theme--color--surface--darker, #464646);
  --pfe-accordion--aux:          var(--pfe-theme--color--surface--darker--text, #fff);
  --pfe-accordion--focus:        var(--pfe-theme--color--surface--darker--link--focus, #cce6ff); }

:host([color="darkest"]) {
  --pfe-accordion--main:         var(--pfe-theme--color--surface--darkest, #131313);
  --pfe-accordion--aux:          var(--pfe-theme--color--surface--darkest--text, #fff);
  --pfe-accordion--focus:        var(--pfe-theme--color--surface--darkest--link--focus, #cce6ff); }

:host([color="accent"]) {
  --pfe-accordion--main:         var(--pfe-theme--color--surface--accent, #fe460d);
  --pfe-accordion--aux:          var(--pfe-theme--color--surface--accent--text, #fff);
  --pfe-accordion--focus:        var(--pfe-theme--color--surface--accent--link--focus, #cce6ff); }

:host([color="complement"]) {
  --pfe-accordion--main:         var(--pfe-theme--color--surface--complement, #0477a4);
  --pfe-accordion--aux:          var(--pfe-theme--color--surface--complement--text, #fff);
  --pfe-accordion--focus:        var(--pfe-theme--color--surface--complement--link--focus, #cce6ff); }
</style>
<button aria-expanded="false" role="tab"></button>`;
  }

  static get tag() {
    return "pfe-accordion-header";
  }

  get styleUrl() {
    return "pfe-accordion-header.scss";
  }

  get templateUrl() {
    return "pfe-accordion-header.html";
  }

  static get observedAttributes() {
    return ["aria-expanded"];
  }

  constructor() {
    super(PfeAccordionHeader);
    this._clickHandler = this._clickHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "header");
    }

    if (!this.id) {
      this.id = `${PfeAccordionHeader.tag}-${generateId()}`;
    }

    this.button = this.shadowRoot.querySelector("button");

    const child = this.children[0];
    let isHeaderTag = false;

    if (child) {
      switch (child.tagName) {
        case "H1":
        case "H2":
        case "H3":
        case "H4":
        case "H5":
        case "H6":
          isHeaderTag = true;
          break;
      }

      const wrapperTag = document.createElement(child.tagName);
      this.button.innerText = child.innerText;

      wrapperTag.appendChild(this.button);
      this.shadowRoot.appendChild(wrapperTag);
    } else {
      this.button.innerText = this.textContent.trim();
    }

    if (!isHeaderTag) {
      console.warn(
        `${
          PfeAccordionHeader.tag
        }: The first child in the light DOM must be a Header level tag (h1, h2, h3, h4, h5, or h6)`
      );
    }

    this.addEventListener("click", this._clickHandler);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._clickHandler);
  }

  get expanded() {
    return this.hasAttribute("aria-expanded");
  }

  set expanded(val) {
    val = Boolean(val);

    if (val) {
      this.setAttribute("aria-expanded", true);
      this.button.setAttribute("aria-expanded", true);
    } else {
      this.removeAttribute("aria-expanded");
      this.button.setAttribute("aria-expanded", false);
    }
  }

  _clickHandler(event) {
    this.dispatchEvent(
      new CustomEvent(`${PfeAccordion.tag}:change`, {
        detail: { expanded: !this.expanded },
        bubbles: true
      })
    );
  }
}

class PfeAccordionPanel extends PFElement {
  get html() {
    return `
<style>
:host {
  display: none;
  overflow: hidden;
  background: var(--pfe-theme--color--surface--lightest, #fff);
  will-change: height; }

:host([expanded]) {
  display: block;
  position: relative; }

:host(.animating) {
  display: block;
  transition: height 0.3s ease-in-out; }

.container {
  margin: 0 1px;
  border: 1px solid var(--pfe-theme--color--surface--border--lightest, #ececec);
  border-top: none;
  padding: var(--pfe-theme--container-spacer, 1rem); }
</style>
<div tabindex="-1" role="tabpanel">
  <div class="container">
    <slot></slot>
  </div>
</div>`;
  }

  static get tag() {
    return "pfe-accordion-panel";
  }

  get styleUrl() {
    return "pfe-accordion-panel.scss";
  }

  get templateUrl() {
    return "pfe-accordion-panel.html";
  }

  constructor() {
    super(PfeAccordionPanel);
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "region");
    }

    if (!this.id) {
      this.id = `${PfeAccordionPanel.tag}-${generateId()}`;
    }
  }

  get expanded() {
    return this.hasAttribute("expanded");
  }

  set expanded(val) {
    const value = Boolean(val);

    if (value) {
      this.setAttribute("expanded", "");
    } else {
      this.removeAttribute("expanded");
    }
  }
}

PFElement.create(PfeAccordionHeader);
PFElement.create(PfeAccordionPanel);
PFElement.create(PfeAccordion);

export default PfeAccordion;
//# sourceMappingURL=pfe-accordion.js.map

import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeAccordion 1.0.0-prerelease.28
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
  static get version() {
    return "1.0.0-prerelease.28";
  }

  get html() {
    return `<style>:host{display:block;position:relative;overflow:hidden;margin:0;color:var(--pfe-broadcasted--color--text)}:host([on=dark]){--pfe-broadcasted--color--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--ui-link--on-dark, #99ccff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--ui-link--on-dark--visited, #b38cd9);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--ui-link--on-dark--hover, #cce6ff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--ui-link--on-dark--focus, #cce6ff)}:host([on=light]){--pfe-broadcasted--color--text:var(--pfe-theme--color--text, #333);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--ui-link, #06c);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--ui-link--visited, rebeccapurple);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--ui-link--hover, #003366);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--ui-link--focus, #003366)}
/*# sourceMappingURL=pfe-accordion.min.css.map */
</style><slot></slot>`;
  }

  static get properties() {
    return {"on":{"title":"Context","type":"string","enum":["light","dark"],"default":"light","prefixed":false}};
  }

  static get slots() {
    return {"default":{"title":"Default","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"pfe-accordion-header"},{"$ref":"pfe-accordion-panel"}]}}};
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

  get schemaUrl() {
    return "pfe-accordion.json";
  }

  static get observedAttributes() {
    return ["on"];
  }

  static get cascadingAttributes() {
    return {
      on: "pfe-accordion-header, pfe-accordion-panel"
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeAccordion, { type: PfeAccordion.PfeType });

    this._linkPanels = this._linkPanels.bind(this);
    this._observer = new MutationObserver(this._linkPanels);
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
    ]).then(() => {
      if (this.children.length) {
        this._linkPanels();
      }

      this._observer.observe(this, { childList: true });
    });
  }

  disconnectedCallback() {
    this.removeEventListener(`${PfeAccordion.tag}:change`, this._changeHandler);
    this.removeEventListener("keydown", this._keydownHandler);
    this._observer.disconnect();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);
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

      if (!panel) {
        return;
      }

      header.setAttribute("aria-controls", panel.pfeId);
      panel.setAttribute("aria-labelledby", header.pfeId);
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
    if (!panel) {
      console.error(`${PfeAccordion.tag}: Trying to expand a panel that doesn't exist`);
      return;
    }

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
    if (!panel) {
      console.error(`${PfeAccordion.tag}: Trying to collapse a panel that doesn't exist`);
      return;
    }

    if (!panel.expanded) {
      return;
    }

    const height = panel.getBoundingClientRect().height;
    panel.expanded = false;

    this._animate(panel, height, 0);
  }

  _animate(panel, start, end) {
    const header = panel.previousElementSibling;
    panel.classList.add("animating");
    header.classList.add("animating");
    panel.style.height = `${start}px`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.style.height = `${end}px`;
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
    const header = evt.target.previousElementSibling;
    header.classList.remove("animating");
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

    if (!next) {
      return;
    }

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
  static get version() {
    return "1.0.0-prerelease.28";
  }

  get html() {
    return `<style>:host{display:block}:host>*{margin:0}:host button{--pfe-accordion--main:transparent;--pfe-accordion--aux:var(--pfe-theme--color--surface--lightest--text, #333);--pfe-accordion--BorderLeft:var(--pfe-theme--surface--border-width--heavy, 4px) var(--pfe-theme--surface--border-style, solid) transparent;--pfe-accordion--BorderRight:var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) transparent;--pfe-accordion--BorderBottom:var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-accordion--BorderLeftColor--focus:var(--pfe-theme--color--surface--lightest--link, #06c);margin:0;width:100%;height:auto;font-family:inherit;font-weight:700;font-weight:var(--pfe-theme--font-weight--bold,700);text-align:left;cursor:pointer;z-index:1;position:relative;font-size:calc(16px * 1.1);font-size:calc(var(--pfe-theme--font-size,16px) * 1.1);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);color:var(--pfe-accordion--aux);background-color:var(--pfe-accordion--main);border-left:var(--pfe-accordion--BorderLeft);border-right:var(--pfe-accordion--BorderRight);border-bottom:var(--pfe-accordion--BorderBottom);border-top:0;padding:16px 50px 16px calc(16px * 1.5)!important;padding:var(--pfe-theme--container-spacer,16px) 50px var(--pfe-theme--container-spacer,16px) calc(var(--pfe-theme--container-spacer,16px) * 1.5)!important}:host button:hover{outline:0;border-left-color:var(--pfe-accordion--BorderLeftColor--focus);z-index:2}:host button:focus{outline:0;z-index:2;text-decoration:underline}:host button::-moz-focus-inner{border:0}:host button[aria-expanded=true]{--pfe-accordion--main:var(--pfe-theme--color--surface--lightest, #fff);--pfe-accordion--aux:var(--pfe-theme--color--surface--lightest--text, #333);--pfe-accordion--focus:var(--pfe-theme--color--surface--lightest--link, #06c);--pfe-accordion--BorderLeft:var(--pfe-theme--surface--border-width--heavy, 4px) var(--pfe-theme--surface--border-style, solid) var(--pfe-theme--color--surface--lightest--link, #06c);--pfe-accordion--BorderRight:var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2);position:relative;display:block;border-bottom:0}:host button[aria-expanded=true]::after{content:"";position:absolute;top:calc((16px * .75) + .5935em);top:calc((var(--pfe-theme--container-spacer,16px) * .75) + .5935em);display:block;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);height:.313em;width:.313em;text-align:center;-webkit-transition:-webkit-transform .15s;transition:-webkit-transform .15s;transition:transform .15s;transition:transform .15s,-webkit-transform .15s;border-width:.15em .15em 0 0;border-bottom:0;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:calc(16px * 1.5);right:calc(var(--pfe-theme--container-spacer,16px) * 1.5)}:host button[aria-expanded=false]::after{content:"";position:absolute;top:calc((16px * .75) + .5935em);top:calc((var(--pfe-theme--container-spacer,16px) * .75) + .5935em);display:block;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);height:.313em;width:.313em;text-align:center;-webkit-transition:-webkit-transform .15s;transition:-webkit-transform .15s;transition:transform .15s;transition:transform .15s,-webkit-transform .15s;border-width:0 .15em .15em 0;-webkit-transform:rotate(45deg);transform:rotate(45deg);right:calc(16px * 1.5);right:calc(var(--pfe-theme--container-spacer,16px) * 1.5)}:host(:first-child) button{border-top:1px solid #d2d2d2;border-top:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2)}:host(:last-of-type) button[aria-expanded=false]{border-bottom:1px solid #d2d2d2;border-bottom:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2);border-top:0}:host(.animating){-webkit-transition:-webkit-transform .3s cubic-bezier(.465,.183,.153,.946);transition:-webkit-transform .3s cubic-bezier(.465,.183,.153,.946);transition:transform .3s cubic-bezier(.465,.183,.153,.946);transition:transform .3s cubic-bezier(.465,.183,.153,.946),-webkit-transform .3s cubic-bezier(.465,.183,.153,.946);-webkit-transition:-webkit-transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:-webkit-transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946)),-webkit-transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946))}:host(.animating) button{position:relative;display:block;border-bottom:0;--pfe-accordion--main:var(--pfe-theme--color--surface--lightest, #fff);--pfe-accordion--aux:var(--pfe-theme--color--surface--lightest--text, #333);--pfe-accordion--focus:var(--pfe-theme--color--surface--lightest--link, #06c);--pfe-accordion--BorderLeft:var(--pfe-theme--surface--border-width--heavy, 4px) var(--pfe-theme--surface--border-style, solid) var(--pfe-theme--color--surface--lightest--link, #06c);--pfe-accordion--BorderRight:var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2)}:host([on=dark]) button{--pfe-accordion--main:transparent;--pfe-accordion--aux:var(--pfe-theme--color--surface--darkest--text, #fff);--pfe-accordion--BorderLeftColor--focus:var(--pfe-theme--color--surface--lightest, #fff)}:host([on=dark]) button[aria-expanded=true]{--pfe-accordion--main:var(--pfe-theme--color--surface--darker, #464646);--pfe-accordion--aux:var(--pfe-theme--color--surface--darkest--text, #fff);--pfe-accordion--BorderLeft:var(--pfe-theme--surface--border-width--heavy, 4px) var(--pfe-theme--surface--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-accordion--BorderRight:var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-accordion--BorderLeftColor--focus:var(--pfe-theme--color--surface--lightest, #fff)}:host([on=dark].animating) button{--pfe-accordion--main:var(--pfe-theme--color--surface--darker, #464646);--pfe-accordion--aux:var(--pfe-theme--color--surface--darkest--text, #fff);--pfe-accordion--BorderLeft:var(--pfe-theme--surface--border-width--heavy, 4px) var(--pfe-theme--surface--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-accordion--BorderRight:var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-accordion--BorderLeftColor--focus:var(--pfe-theme--color--surface--lightest, #fff)}
/*# sourceMappingURL=pfe-accordion-header.min.css.map */
</style><button type="button" aria-expanded="false" role="tab"></button>`;
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

  get pfeId() {
    return this.getAttribute("pfe-id");
  }

  set pfeId(id) {
    if (!id) {
      return;
    }

    this.setAttribute("pfe-id", id);
  }

  static get observedAttributes() {
    return ["aria-expanded"];
  }

  constructor() {
    super(PfeAccordionHeader);

    this.button = this.shadowRoot.querySelector("button");

    this._init = this._init.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.children.length || this.textContent.trim().length) {
      this._init();
    }

    this.addEventListener("click", this._clickHandler);
    this._observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._clickHandler);
    this._observer.disconnect();
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

  _init() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "header");
    }

    if (!this.pfeId) {
      this.pfeId = `${PfeAccordionHeader.tag}-${generateId()}`;
    }

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

    if (window.ShadyCSS) {
      this._observer.observe(this, { childList: true });
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
  static get version() {
    return "1.0.0-prerelease.28";
  }

  get html() {
    return `<style>:host{display:none;overflow:hidden;will-change:height;border-color:transparent;opacity:0}:host(.animating),:host([expanded]){display:block;position:relative;opacity:1;border-right:1px solid transparent;border-right:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) transparent;border-left:4px solid transparent;border-left:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) transparent;-webkit-box-shadow:0 5px 4px rgba(140,140,140,.35);box-shadow:0 5px 4px rgba(140,140,140,.35);-webkit-box-shadow:0 5px var(--pfe-theme--surface--border-width--heavy,4px) rgba(140,140,140,.35);box-shadow:0 5px var(--pfe-theme--surface--border-width--heavy,4px) rgba(140,140,140,.35);border-left-color:#06c;border-left-color:var(--pfe-theme--color--surface--lightest--link,#06c);background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);border-right-color:#d2d2d2;border-right-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-bottom:1px solid #d2d2d2;border-bottom:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2)}:host([on=dark].animating),:host([on=dark][expanded]){--pfe-broadcasted--color--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--ui-link--on-dark, #99ccff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--ui-link--on-dark--visited, #b38cd9);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--ui-link--on-dark--hover, #cce6ff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--ui-link--on-dark--focus, #cce6ff);border-right:1px solid transparent;border-right:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) transparent;border-left:4px solid transparent;border-left:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) transparent;-webkit-box-shadow:none;box-shadow:none;background-color:#464646;background-color:var(--pfe-theme--color--surface--darker,#464646);border-left-color:#d2d2d2;border-left-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-right-color:#d2d2d2;border-right-color:var(--pfe-theme--color--surface--border,#d2d2d2)}:host(.animating){display:block;-webkit-transition:height .3s ease-in-out;transition:height .3s ease-in-out}.container{-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;padding:0 3em 16px calc(16px * 1.5);padding:0 3em var(--pfe-theme--container-spacer,16px) calc(var(--pfe-theme--container-spacer,16px) * 1.5)}:host(:last-of-type[expanded]){margin-bottom:0}
/*# sourceMappingURL=pfe-accordion-panel.min.css.map */
</style><div tabindex="-1" role="tabpanel">
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

  get pfeId() {
    return this.getAttribute("pfe-id");
  }

  set pfeId(id) {
    if (!id) {
      return;
    }

    this.setAttribute("pfe-id", id);
  }

  constructor() {
    super(PfeAccordionPanel);
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "region");
    }

    if (!this.pfeId) {
      this.pfeId = `${PfeAccordionPanel.tag}-${generateId()}`;
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

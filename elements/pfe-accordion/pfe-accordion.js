import e from "../pfelement/pfelement.js";
function t() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}
Array.prototype.findIndex ||
  Object.defineProperty(Array.prototype, "findIndex", {
    value: function(e) {
      if (null == this) throw new TypeError('"this" is null or not defined');
      var t = Object(this),
        n = t.length >>> 0;
      if ("function" != typeof e)
        throw new TypeError("predicate must be a function");
      for (var a = arguments[1], r = 0; r < n; ) {
        var o = t[r];
        if (e.call(a, o, r, t)) return r;
        r++;
      }
      return -1;
    }
  });
class n extends e {
  get html() {
    return "<style>:host {\n  display: block;\n  position: relative;\n  overflow: hidden;\n  margin: 0; }</style>\n<slot></slot>";
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
    return { color: "pfe-accordion-header" };
  }
  constructor() {
    super(n);
  }
  connectedCallback() {
    super.connectedCallback(),
      this.setAttribute("role", "presentation"),
      this.setAttribute("defined", ""),
      this.addEventListener(`${n.tag}:change`, this._changeHandler),
      this.addEventListener("keydown", this._keydownHandler),
      Promise.all([
        customElements.whenDefined(a.tag),
        customElements.whenDefined(r.tag)
      ]).then(this._linkPanels());
  }
  disconnectedCallback() {
    this.removeEventListener(`${n.tag}:change`, this._changeHandler),
      this.removeEventListener("keydown", this._keydownHandler);
  }
  attributeChangedCallback(e, t, n) {
    if ((super.attributeChangedCallback(e, t, n), "color" === e)) {
      const e = this.querySelectorAll(a.tag);
      "striped" === n
        ? [...e].forEach((e, t) => {
            const n = t % 2 ? "even" : "odd";
            e.classList.add(n);
          })
        : [...e].forEach((e, t) => {
            e.classList.remove("even", "odd");
          });
    }
  }
  toggle(e) {
    const t = this._allHeaders(),
      n = this._allPanels(),
      a = t[e],
      r = n[e];
    a &&
      r &&
      (a.expanded
        ? (this._collapseHeader(a), this._collapsePanel(r))
        : (this._expandHeader(a), this._expandPanel(r)));
  }
  expand(e) {
    const t = this._allHeaders(),
      n = this._allPanels(),
      a = t[e],
      r = n[e];
    a && r && (this._expandHeader(a), this._expandPanel(r));
  }
  expandAll() {
    const e = this._allHeaders(),
      t = this._allPanels();
    e.forEach(e => this._expandHeader(e)), t.forEach(e => this._expandPanel(e));
  }
  collapse(e) {
    const t = this._allHeaders(),
      n = this._allPanels(),
      a = t[e],
      r = n[e];
    a && r && (this._collapseHeader(a), this._collapsePanel(r));
  }
  collapseAll() {
    const e = this._allHeaders(),
      t = this._allPanels();
    e.forEach(e => this._collapseHeader(e)),
      t.forEach(e => this._collapsePanel(e));
  }
  _linkPanels() {
    this._allHeaders().forEach(e => {
      const t = this._panelForHeader(e);
      e.setAttribute("aria-controls", t.id),
        t.setAttribute("aria-labelledby", e.id);
    });
  }
  _changeHandler(e) {
    if (this.classList.contains("animating")) return;
    const t = e.target,
      n = e.target.nextElementSibling;
    e.detail.expanded
      ? (this._expandHeader(t), this._expandPanel(n))
      : (this._collapseHeader(t), this._collapsePanel(n));
  }
  _toggle(e, t) {}
  _expandHeader(e) {
    e.expanded = !0;
  }
  _expandPanel(e) {
    if (e.expanded) return;
    e.expanded = !0;
    const t = e.getBoundingClientRect().height;
    this._animate(e, 0, t);
  }
  _collapseHeader(e) {
    e.expanded = !1;
  }
  _collapsePanel(e) {
    if (!e.expanded) return;
    const t = e.getBoundingClientRect().height;
    (e.expanded = !1), this._animate(e, t, 0);
  }
  _animate(e, t, n) {
    e.classList.add("animating"),
      (e.style.height = `${t}px`),
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          (e.style.height = `${n}px`),
            e.classList.add("animating"),
            e.addEventListener("transitionend", this._transitionEndHandler);
        });
      });
  }
  _keydownHandler(e) {
    const t = e.target;
    if (!this._isHeader(t)) return;
    let n;
    switch (e.key) {
      case "ArrowDown":
      case "Down":
      case "ArrowRight":
      case "Right":
        n = this._nextHeader();
        break;
      case "ArrowUp":
      case "Up":
      case "ArrowLeft":
      case "Left":
        n = this._previousHeader();
        break;
      case "Home":
        n = this._firstHeader();
        break;
      case "End":
        n = this._lastHeader();
        break;
      default:
        return;
    }
    n.shadowRoot.querySelector("button").focus();
  }
  _transitionEndHandler(e) {
    (e.target.style.height = ""),
      e.target.classList.remove("animating"),
      e.target.removeEventListener("transitionend", this._transitionEndHandler);
  }
  _allHeaders() {
    return [...this.querySelectorAll(a.tag)];
  }
  _allPanels() {
    return [...this.querySelectorAll(r.tag)];
  }
  _panelForHeader(e) {
    const t = e.nextElementSibling;
    if (t.tagName.toLowerCase() === r.tag) return t;
    console.error(`${n.tag}: Sibling element to a header needs to be a panel`);
  }
  _previousHeader() {
    const e = this._allHeaders();
    let t = e.findIndex(e => e === document.activeElement) - 1;
    return e[(t + e.length) % e.length];
  }
  _nextHeader() {
    const e = this._allHeaders();
    let t = e.findIndex(e => e === document.activeElement) + 1;
    return e[t % e.length];
  }
  _firstHeader() {
    return this._allHeaders()[0];
  }
  _lastHeader() {
    const e = this._allHeaders();
    return e[e.length - 1];
  }
  _isHeader(e) {
    return e.tagName.toLowerCase() === a.tag;
  }
}
class a extends e {
  get html() {
    return '<style>:host {\n  --pfe-accordion--main:         var(--pfe-theme--color--surface--lighter, #ececec);\n  --pfe-accordion--aux:          var(--pfe-theme--color--surface--lighter--text, #333);\n  --pfe-accordion--focus:        var(--pfe-theme--color--surface--lighter--link--focus, #003366);\n  display: block;\n  background: var(--pfe-accordion--main);\n  color: var(--pfe-accordion--aux); }\n  :host button {\n    padding: calc(var(--pfe-theme--container-spacer, 1rem) * 0.75);\n    margin: 0;\n    width: 100%;\n    height: auto;\n    border: 1px solid transparent;\n    font-family: inherit;\n    font-size: var(--pfe-theme--font-size, 16px);\n    line-height: 1.5;\n    text-align: left;\n    background: none;\n    cursor: pointer;\n    color: var(--pfe-accordion--aux); }\n    :host button:focus {\n      outline: 1px solid var(--pfe-accordion--focus); }\n    :host button::-moz-focus-inner {\n      border: 0; }\n    :host button[aria-expanded] {\n      position: relative;\n      display: block;\n      font-weight: normal;\n      padding-left: calc(var(--pfe-theme--container-spacer, 1rem) * 2.5); }\n    :host button[aria-expanded="false"]::before {\n      content: "";\n      position: absolute;\n      left: var(--pfe-theme--container-spacer, 1rem);\n      top: calc((var(--pfe-theme--container-spacer, 1rem) * 0.75) + 0.5935em);\n      display: block;\n      border-style: solid;\n      border-width: 0.15em 0.15em 0 0;\n      height: 0.313em;\n      width: 0.313em;\n      text-align: center;\n      transition: transform 0.15s;\n      transform: rotate(45deg); }\n    :host button[aria-expanded="true"]::before {\n      content: "";\n      position: absolute;\n      left: var(--pfe-theme--container-spacer, 1rem);\n      top: calc((var(--pfe-theme--container-spacer, 1rem) * 0.75) + 0.5935em);\n      display: block;\n      width: 0.313em;\n      height: 0.313em;\n      border-style: solid;\n      border-width: 0.15em 0.15em 0 0;\n      text-align: center;\n      transition: all 0.15s;\n      transform: rotate(135deg); }\n\n:host(.animating) {\n  transition: transform 0.3s var(--pfe-theme--animation-timing, cubic-bezier(0.465, 0.183, 0.153, 0.946)); }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 1px; }\n\n:host([color="lightest"]),\n:host([color="striped"].even) {\n  --pfe-accordion--main:         var(--pfe-theme--color--surface--lightest, #fff);\n  --pfe-accordion--aux:          var(--pfe-theme--color--surface--lightest--text, #333);\n  --pfe-accordion--focus:        var(--pfe-theme--color--surface--lightest--link--focus, #003366); }\n  :host([color="lightest"]) button[aria-expanded="true"],\n  :host([color="striped"].even) button[aria-expanded="true"] {\n    border-top-color: var(--pfe-theme--color--surface--border--lightest, #ececec);\n    border-left-color: var(--pfe-theme--color--surface--border--lightest, #ececec);\n    border-right-color: var(--pfe-theme--color--surface--border--lightest, #ececec); }\n\n:host([color="base"]) {\n  --pfe-accordion--main:         var(--pfe-theme--color--surface--base, #dfdfdf);\n  --pfe-accordion--aux:          var(--pfe-theme--color--surface--base--text, #333);\n  --pfe-accordion--focus:        var(--pfe-theme--color--surface--base--link--focus, #00305b); }\n\n:host([color="dark"]) {\n  --pfe-accordion--main:         var(--pfe-theme--color--surface--darker, #464646);\n  --pfe-accordion--aux:          var(--pfe-theme--color--surface--darker--text, #fff);\n  --pfe-accordion--focus:        var(--pfe-theme--color--surface--darker--link--focus, #cce6ff); }\n\n:host([color="darkest"]) {\n  --pfe-accordion--main:         var(--pfe-theme--color--surface--darkest, #131313);\n  --pfe-accordion--aux:          var(--pfe-theme--color--surface--darkest--text, #fff);\n  --pfe-accordion--focus:        var(--pfe-theme--color--surface--darkest--link--focus, #cce6ff); }\n\n:host([color="accent"]) {\n  --pfe-accordion--main:         var(--pfe-theme--color--surface--accent, #fe460d);\n  --pfe-accordion--aux:          var(--pfe-theme--color--surface--accent--text, #fff);\n  --pfe-accordion--focus:        var(--pfe-theme--color--surface--accent--link--focus, #cce6ff); }\n\n:host([color="complement"]) {\n  --pfe-accordion--main:         var(--pfe-theme--color--surface--complement, #0477a4);\n  --pfe-accordion--aux:          var(--pfe-theme--color--surface--complement--text, #fff);\n  --pfe-accordion--focus:        var(--pfe-theme--color--surface--complement--link--focus, #cce6ff); }</style>\n<button aria-expanded="false" role="tab"></button>';
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
    super(a), (this._clickHandler = this._clickHandler.bind(this));
  }
  connectedCallback() {
    super.connectedCallback(),
      this.hasAttribute("role") || this.setAttribute("role", "header"),
      this.id || (this.id = `${a.tag}-${t()}`),
      (this.button = this.shadowRoot.querySelector("button"));
    const e = this.children[0];
    let n = !1;
    if (e) {
      switch (e.tagName) {
        case "H1":
        case "H2":
        case "H3":
        case "H4":
        case "H5":
        case "H6":
          n = !0;
      }
      const t = document.createElement(e.tagName);
      (this.button.innerText = e.innerText),
        t.appendChild(this.button),
        this.shadowRoot.appendChild(t);
    } else this.button.innerText = this.textContent.trim();
    n ||
      console.warn(
        `${
          a.tag
        }: The first child in the light DOM must be a Header level tag (h1, h2, h3, h4, h5, or h6)`
      ),
      this.addEventListener("click", this._clickHandler);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this._clickHandler);
  }
  get expanded() {
    return this.hasAttribute("aria-expanded");
  }
  set expanded(e) {
    (e = Boolean(e))
      ? (this.setAttribute("aria-expanded", !0),
        this.button.setAttribute("aria-expanded", !0))
      : (this.removeAttribute("aria-expanded"),
        this.button.setAttribute("aria-expanded", !1));
  }
  _clickHandler(e) {
    this.dispatchEvent(
      new CustomEvent(`${n.tag}:change`, {
        detail: { expanded: !this.expanded },
        bubbles: !0
      })
    );
  }
}
class r extends e {
  get html() {
    return '<style>:host {\n  display: none;\n  overflow: hidden;\n  background: var(--pfe-theme--color--surface--lightest, #fff);\n  will-change: height; }\n\n:host([expanded]) {\n  display: block;\n  position: relative; }\n\n:host(.animating) {\n  display: block;\n  transition: height 0.3s ease-in-out; }\n\n.container {\n  margin: 0 1px;\n  border: 1px solid var(--pfe-theme--color--surface--border--lightest, #ececec);\n  border-top: none;\n  padding: var(--pfe-theme--container-spacer, 1rem); }</style>\n<div tabindex="-1" role="tabpanel">\n  <div class="container">\n    <slot></slot>\n  </div>\n</div>';
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
    super(r);
  }
  connectedCallback() {
    super.connectedCallback(),
      this.hasAttribute("role") || this.setAttribute("role", "region"),
      this.id || (this.id = `${r.tag}-${t()}`);
  }
  get expanded() {
    return this.hasAttribute("expanded");
  }
  set expanded(e) {
    Boolean(e)
      ? this.setAttribute("expanded", "")
      : this.removeAttribute("expanded");
  }
}
e.create(a), e.create(r), e.create(n);
export default n;
//# sourceMappingURL=pfe-accordion.js.map

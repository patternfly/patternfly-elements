import e from "../pfelement/pfelement.js";
class t extends e {
  get html() {
    return `<style>:host {\n  display: block; }</style>\n${
      this.isTab
        ? `\n    <pfe-tabs ${
            this.settings.variant ? "pfe-variant=" + this.settings.variant : ""
          }\n    ${
            this.orientation ? this.orientation : ""
          }>\n      ${this.groupings
            .map(
              e =>
                `\n        <pfe-tab slot="tab">\n          ${
                  e.heading.innerText
                }\n        </pfe-tab>\n        <pfe-tab-panel slot="panel">\n          ${e.body
                  .map(e => e.outerHTML)
                  .join("")}\n        </pfe-tab-panel>\n      `
            )
            .join("")}\n    </pfe-tabs>\n  `
        : `\n    <pfe-accordion ${
            this.settings.color ? "color=" + this.settings.color : ""
          }>\n        ${this.groupings
            .map(
              e =>
                `\n        <pfe-accordion-header>\n          ${
                  e.heading.outerHTML
                }\n        </pfe-accordion-header>\n        <pfe-accordion-panel>\n            ${e.body
                  .map(e => e.outerHTML)
                  .join("")}\n        </pfe-accordion-panel>\n      `
            )
            .join("")}\n    </pfe-accordion>\n  `
    }`;
  }
  static get tag() {
    return "pfe-content-set";
  }
  get styleUrl() {
    return "pfe-content-set.css";
  }
  get templateUrl() {
    return "pfe-content-set.html";
  }
  get isTab() {
    return this.parentNode
      ? this.parentNode.offsetWidth > 768
      : window.outerWidth > 768;
  }
  get settings() {
    let e = {};
    const t = this.getAttribute("pfe-variant");
    return (
      "primary" === t
        ? ((e.variant = t), (e.color = "striped"))
        : "secondary" === t
          ? ((e.variant = t), (e.color = "dark"))
          : (e.color = "lightest"),
      e
    );
  }
  get orientation() {
    if (this.hasAttribute("vertical")) return " vertical";
  }
  static get observedAttributes() {
    return ["pfe-vertical", "selected-index", "pfe-variant", "theme", "color"];
  }
  static get cascadingAttributes() {
    return {
      vertical: "pfe-tabs",
      "selected-index": "pfe-tabs",
      "pfe-variant": "pfe-tabs",
      theme: "pfe-accordion",
      color: "pfe-accordion"
    };
  }
  static get pfeType() {
    return e.pfeType.combo;
  }
  constructor() {
    super(t, { delayRender: !0 }),
      (this.groupings = []),
      (this._observer = new MutationObserver(() => {
        [...this.querySelectorAll("pfe-content-set-group")].forEach(e => {
          const t = {
            heading: e.querySelector("[pfe-heading]"),
            body: [...e.querySelectorAll(":not([pfe-heading])")]
          };
          this.groupings.push(t);
        }),
          this.render();
      })),
      this._observer.observe(this, { attributes: !0, childList: !0 });
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    this._observer.disconnect();
  }
}
e.create(t);
export default t;
//# sourceMappingURL=pfe-content-set.js.map

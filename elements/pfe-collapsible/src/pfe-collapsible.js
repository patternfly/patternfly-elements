import PFElement from "../pfelement/pfelement.js";

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

class PfeCollapsibleToggle extends PFElement {
  static get tag() {
    return "pfe-collapsible-toggle";
  }

  get templateUrl() {
    return "pfe-collapsible-toggle.html";
  }

  get styleUrl() {
    return "pfe-collapsible-toggle.scss";
  }

  get expanded() {
    return this.getAttribute("aria-expanded") === "true";
  }

  set expanded(val) {
    const value = Boolean(val);
    this.setAttribute("aria-expanded", value);
  }

  static get observedAttributes() {
    return ["aria-controls"];
  }

  constructor() {
    super(PfeCollapsibleToggle);

    this.expanded = false;
    this.controlledPanel = false;

    this.addEventListener("click", this._clickHandler);
    this.addEventListener("keydown", this._keydownHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute("role", "button");
    this.setAttribute("tabindex", 0);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._clickHandler);
    this.removeEventListener("keydown", this._keydownHandler);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);
    this.controlledPanel = document.querySelector(`#${newVal}`);
  }

  toggle() {
    this.expanded = !this.expanded;

    if (this.controlledPanel) {
      this.controlledPanel.expanded = this.expanded;

      this.dispatchEvent(
        new CustomEvent(`${PfeCollapsibleToggle.tag}:change`, {
          detail: {
            expanded: this.expanded,
            panel: this.controlledPanel
          },
          bubbles: true
        })
      );
    } else {
      console.warn(
        `${PfeCollapsibleToggle.tag}: This toggle doesn't have a ${
          PfeCollapsiblePanel.tag
        } associated with it`
      );
    }
  }

  _clickHandler() {
    this.toggle();
  }

  _keydownHandler(event) {
    const key = event.key;

    switch (key) {
      case " ":
      case "Spacebar":
      case "Enter":
        this.toggle();
        break;
    }
  }
}

class PfeCollapsiblePanel extends PFElement {
  static get tag() {
    return "pfe-collapsible-panel";
  }

  get templateUrl() {
    return "pfe-collapsible-panel.html";
  }

  get styleUrl() {
    return "pfe-collapsible-panel.scss";
  }

  get expanded() {
    return this.hasAttribute("pfe-expanded");
  }

  set expanded(val) {
    const value = Boolean(val);

    if (value) {
      this.setAttribute("pfe-expanded", "");
    } else {
      this.removeAttribute("pfe-expanded");
    }
  }

  constructor() {
    super(PfeCollapsiblePanel);
    this.expanded = false;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.id) {
      this.id = `${PfeCollapsiblePanel.tag}-${generateId()}`;
    }
  }
}

class PfeCollapsible extends PFElement {
  static get tag() {
    return "pfe-collapsible";
  }

  get templateUrl() {
    return "pfe-collapsible.html";
  }

  get styleUrl() {
    return "pfe-collapsible.scss";
  }

  constructor() {
    super(PfeCollapsible);

    this._toggle = null;
    this._panel = null;

    this._linkControls = this._linkControls.bind(this);
    this._observer = new MutationObserver(this._linkControls);
  }

  connectedCallback() {
    super.connectedCallback();

    Promise.all([
      customElements.whenDefined(PfeCollapsiblePanel.tag),
      customElements.whenDefined(PfeCollapsibleToggle.tag)
    ]).then(() => {
      if (this.children.length) {
        this._linkControls();
      }

      this._observer.observe(this, { childList: true });
    });
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  toggle() {
    this._toggle.toggle();
  }

  _linkControls() {
    this._toggle = this.querySelector(PfeCollapsibleToggle.tag);
    this._panel = this.querySelector(PfeCollapsiblePanel.tag);

    this._toggle.setAttribute("aria-controls", this._panel.id);
  }
}

PFElement.create(PfeCollapsible);
PFElement.create(PfeCollapsibleToggle);
PFElement.create(PfeCollapsiblePanel);

export default PfeCollapsible;

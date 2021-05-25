import PFElement from "../../pfelement/dist/pfelement.js";

class PfeCollapseToggle extends PFElement {
  static get tag() {
    return "pfe-collapse-toggle";
  }

  get templateUrl() {
    return "pfe-collapse-toggle.html";
  }

  get styleUrl() {
    return "pfe-collapse-toggle.scss";
  }

  get expanded() {
    return this.button.getAttribute("aria-expanded") === "true";
  }

  set expanded(val) {
    const value = Boolean(val);
    
    this.setAttribute("expanded", value);
    this.button.setAttribute("aria-expanded", value);
  }

  set focus(state) {
    state = Boolean(state);

    if (state) return this.button.focus();

    return;
  }

  get button() {
    return this;
  }

  static get properties() {
    return {
      ariaExpanded: {
        title: "Aria expanded",
        type: String,
        prefix: false,
        values: ["true", "false"]
      },
      ariaControls: {
        title: "Aria controls",
        type: String,
        prefix: false,
        observer: "_ariaControlsChanged"
      }
    };
  }

  constructor(pfeClass, {
    setTabIndex = true,
    addKeydownHandler = true
  } = {}) {
    super(pfeClass || PfeCollapseToggle);

    this.controlledPanel = false;
    this._setTabIndex = setTabIndex;

    this._connectPanel = this._connectPanel.bind(this);

    this._addKeydownHandler = addKeydownHandler;

    this.addEventListener("click", this._clickHandler);
    if (addKeydownHandler) this.addEventListener("keydown", this._keydownHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    this.expanded = false;

    this.id = this.id || `${this.tag}-${generateId()}`;

    // If it's not a button, make it quack like a button
    if (this.button.tagName !== "BUTTON") {
        this.button.setAttribute("role", "button");
        if (this._setTabIndex) this.button.setAttribute("tabindex", 0);
    }

    if (!this.controlledPanel) {
      this._connectPanel(this.getAttribute("aria-controls"));
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("click", this._clickHandler);

    if (this._addKeydownHandler) {
      this.removeEventListener("keydown", this._keydownHandler);
    }
  }

  /**
   * Expand or collapse the element based on current state
   */
  toggle() {
    if (this.hasAttribute("disabled")) return;

    this.expanded = !this.expanded;

    // one last try to hook up a panel
    if (!this.controlledPanel) {
      this._connectPanel(this.getAttribute("aria-controls"));
    }

    if (this.controlledPanel) {
      this.controlledPanel.expanded = this.expanded;

      this.emitEvent(PfeCollapse.events.change, {
        detail: {
          expanded: this.expanded,
          toggle: this,
          panel: this.controlledPanel
        }
      });
    } else {
      this.warn(`This toggle doesn't have a panel associated with it.`);
    }
  }

  _ariaControlsChanged(oldVal, newVal) {
    if (!newVal || (oldVal === newVal && oldVal !== null)) return;

    this._connectPanel(newVal);
  }

  _clickHandler() {
    this.toggle();

    this.emitEvent(`${this.tag}:change`, {
      detail: {
        expanded: !this.expanded
      },
      bubbles: true,
      composed: true
    });
  }

  _keydownHandler(event) {
    const key = event.key;

    switch (key) {
      case " ":
      case "Spacebar":
      case 32:
      case "Enter":
      case 13:
        this.toggle();
        break;
    }
  }

  _connectPanel(id) {
    //   console.log(id);
    // this can be an issue if the pfe-collapse is located within
    // a shadow root
    if (this.getRootNode) {
      this.controlledPanel = this.getRootNode().querySelector(`#${id}`);
    } else {
      this.controlledPanel = document.querySelector(`#${id}`);
    }
  }
}

export default PfeCollapseToggle;

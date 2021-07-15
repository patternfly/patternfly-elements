import PFElement from "../../pfelement/dist/pfelement.js";

class PfeCollapseToggle extends PFElement {
  static get tag() {
    return "pfe-collapse-toggle";
  }

  /**
   * A local alias to the tag.
   */
  get tag() {
    return this._pfeClass.tag || PfeCollapseToggle.tag;
  }

  get templateUrl() {
    return "pfe-collapse-toggle.html";
  }

  get styleUrl() {
    return "pfe-collapse-toggle.scss";
  }

  set focus(state) {
    state = Boolean(state);

    if (state) return this.button.focus();

    return;
  }

  get button() {
    return this._button || this;
  }

  set button(newButton) {
    this._button = newButton;
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
      },
      expanded: {
        title: "Expanded",
        type: Boolean,
        default: false,
        observer: "_expandHandler"
      },
      // @TODO: Deprecated
      oldExpanded: {
        alias: "expanded",
        attr: "pfe-expanded"
      }
    };
  }

  constructor(pfeClass = PfeCollapseToggle, { setTabIndex = true, addKeydownHandler = true } = {}) {
    super(pfeClass);

    this._pfeClass = pfeClass;

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
      this._connectPanel(this.ariaControls);
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
  expand() {
    if (this.hasAttribute("disabled")) return;

    this.expanded = true;
    this.focus = true;

    // one last try to hook up a panel
    if (!this.controlledPanel) {
      this._connectPanel(this.ariaControls);
    }

    if (this.controlledPanel) {
      this.controlledPanel.expanded = this.expanded;
    } else {
      this.warn(`This toggle doesn't have a panel associated with it.`);
    }
  }

  /**
   * Expand or collapse the element based on current state
   */
  collapse() {
    if (this.hasAttribute("disabled")) return;

    this.expanded = false;
    this.focus = true;

    // one last try to hook up a panel
    if (!this.controlledPanel) {
      this._connectPanel(this.ariaControls);
    }

    if (this.controlledPanel) {
      this.controlledPanel.expanded = this.expanded;
    } else {
      this.warn(`This toggle doesn't have a panel associated with it.`);
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
      this._connectPanel(this.ariaControls);
    }

    if (this.controlledPanel) {
      this.controlledPanel.expanded = this.expanded;
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

  _expandHandler(oldVal, newVal) {
    if (oldVal === newVal || !this.button) return;
    this.button.setAttribute("aria-expanded", newVal);
    this.expanded = newVal;
  }

  _connectPanel(id) {
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

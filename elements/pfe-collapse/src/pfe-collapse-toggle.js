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

  get html() {
    return `<slot></slot>`;
  }

  get styleUrl() {
    return "pfe-collapse-toggle.scss";
  }

  set focus(state) {
    state = Boolean(state);

    if (state && this.button && typeof this.button.focus === "function") return this.button.focus();

    return;
  }

  get button() {
    return this._button || this;
  }

  set button(newButton) {
    this._button = newButton;
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
    };
  }

  static get properties() {
    return {
      _id: {
        type: String,
        default: (el) => el.randomId.replace("pfe", el.tag),
        attr: "id",
      },
      ariaControls: {
        title: "Aria controls",
        type: String,
        prefix: false,
        observer: "_ariaControlsChanged",
      },
      // State is managed via this attribute
      expanded: {
        title: "Expanded",
        type: Boolean,
        default: false,
        observer: "_expandHandler",
      },
      // @TODO: Deprecated
      oldExpanded: {
        alias: "expanded",
        attr: "pfe-expanded",
      },
    };
  }

  // ---------------------
  // -------- API --------
  // ---------------------
  /**
   * Expand the element
   */
  expand() {
    if (this.hasAttribute("disabled") || this.expanded === true) return;
    this.expanded = true;
  }

  /**
   * Collapse the element
   */
  collapse() {
    if (this.hasAttribute("disabled") || this.expanded === false) return;
    this.expanded = false;
  }

  /**
   * Expand or collapse the element based on current state
   */
  toggle() {
    if (this.hasAttribute("disabled")) return;
    this.expanded = !this.expanded;
  }
  // -------- end of API --------

  constructor(pfeClass = PfeCollapseToggle, { setTabIndex = true } = {}) {
    super(pfeClass);

    // Capture inputs in global pointers
    this._pfeClass = pfeClass;
    this._setTabIndex = setTabIndex;

    // Initialize global variables
    this.controlledPanel = undefined;

    // Bind local methods to this context
    this._connectPanel = this._connectPanel.bind(this);

    // Attach the click event
    this.addEventListener("click", this._clickHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    // If it's not a button, make it quack like a button
    if (this.button && this.button.tagName !== "BUTTON") {
      this.button.setAttribute("role", "button");
      this.button.setAttribute("tabindex", 0);
      this.addEventListener("keyup", this._keydownHandler);
    } else if (this._setTabIndex) {
      // If opting into the tab-index, assign it
      this.button.setAttribute("tabindex", 0);
    }

    if (!this.controlledPanel) {
      this._connectPanel(this.ariaControls);
    }

    // Initialize the button state after connecting
    // note: the handler doesn't set this up; maybe a race condition with the button definition?
    this.button.setAttribute("aria-expanded", this.expanded ? "true" : "false");
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("click", this._clickHandler);
    this.removeEventListener("keydown", this._keydownHandler);
  }

  _triggerPanel() {
    // one last try to hook up a panel if it doesn't exist
    if (!this.controlledPanel) {
      this._connectPanel(this.ariaControls);
    }

    // If we've found it, set it to expand; otherwise, throw a warning
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
  }

  _expandHandler(oldVal, newVal) {
    if (this.hasAttribute("disabled") || oldVal === newVal) return;

    if (this.button) {
      this.button.setAttribute("aria-expanded", newVal ? "true" : "false");
    }

    this._triggerPanel();

    // @TODO how does this align with the change event from PfeCollapse?
    this.emitEvent(this._pfeClass.events.change, {
      detail: {
        expanded: this.expanded,
        toggle: this,
        panel: this.controlledPanel,
      },
    });
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

import PFElement from "../pfelement/pfelement.js";

const KEYCODE = {
  ENTER: 13,
  DOWN: 40,
  UP: 38,
  ESC: 27
};

class PfeNavigation extends PFElement {
  static get tag() {
    return "pfe-navigation";
  }

  get templateUrl() {
    return "pfe-navigation.html";
  }

  get styleUrl() {
    return "pfe-navigation.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeNavigation);

    this._activeNavigationItem = null;

    this._toggledHandler = this._toggledHandler.bind(this);
    this.addEventListener(`${PfeNavigationItem.tag}:toggled`, this._toggledHandler);
  }

  // connectedCallback() {
  //   super.connectedCallback();
  // }

  disconnectedCallback() {
    this.removeEventListener(`${PfeNavigationItem.tag}:toggled`, this._toggledHandler);
  }

  _toggledHandler(event) {
    if (!this._activeNavigationItem) {
      this._activeNavigationItem = event.detail.navigationItem;
      return;
    }

    this._activeNavigationItem.expanded = false;
    this._activeNavigationItem = event.detail.navigationItem;
  }

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

class PfeNavigationItem extends PFElement {
  static get tag() {
    return "pfe-navigation-item";
  }

  get templateUrl() {
    return "pfe-navigation-item.html"
  }

  get styleUrl() {
    return "pfe-navigation-item.scss";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  get expanded() {
    return this.classList.contains("expanded");
  }

  set expanded(val) {
    val = Boolean(val);

    if (val) {
      this.classList.add("expanded");

      if (this.trigger) {
        this.trigger.setAttribute("aria-expanded", true);
      }

      if (this.tray) {
        this.tray.removeAttribute("hidden");
        this.tray.setAttribute("aria-expanded", true);
      }
    } else {
      this.classList.remove("expanded");

      if (this.trigger) {
        this.trigger.removeAttribute("aria-expanded");
      }

      if (this.tray) {
        this.tray.setAttribute("hidden", true);
        this.tray.removeAttribute("aria-expanded");
      }
    }
  }

  constructor() {
    super(PfeNavigationItem);

    this.expanded = false;
    this.trigger = null;
    this.tray = null;

    this._clickHandler = this._clickHandler.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.trigger = this.querySelector(`[slot="trigger"]`);
    this.tray = this.querySelector(`[slot="tray"]`);

    if (this.trigger) {
      this.trigger.addEventListener("click", this._clickHandler);
      this.trigger.addEventListener("keydown", this._keydownHandler);
    }
  }

  disconnectedCallback() {
    if (this.trigger) {
      this.trigger.removeEventListener("click", this._clickHandler);
      this.trigger.removeEventListener("keydown", this._keydownHandler);
    }
  }

  _clickHandler(event) {
    event.preventDefault();
    this.expanded = !this.expanded;
    this._fireExpandToggledEvent();
  }

  _keydownHandler(event) {
    switch (event.key) {
      case "Spacebar":
      case " ":
        event.preventDefault();
        this.expanded = !this.expanded;
        this._fireExpandToggledEvent();
        break;
      case "Esc":
      case "Escape":
        event.preventDefault();

        if (this.trigger) {
          this.trigger.focus();
        }

        this.expanded = false;
        this._fireExpandToggledEvent();
        break;
      default:
        return;
    }
  }

  _fireExpandToggledEvent() {
    this.dispatchEvent(
      new CustomEvent(`${PfeNavigationItem.tag}:toggled`, {
        detail: { navigationItem: this, expanded: this.expanded },
        bubbles: true,
        composed: true
      })
    );
  }
}

PFElement.create(PfeNavigationItem);
PFElement.create(PfeNavigation);

export default PfeNavigation;

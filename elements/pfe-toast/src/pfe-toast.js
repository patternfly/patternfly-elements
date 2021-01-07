import PFElement from "../../pfelement/dist/pfelement.js";

class PfeToast extends PFElement {
  static get tag() {
    return "pfe-toast";
  }

  get templateUrl() {
    return "pfe-toast.html";
  }

  get schemaUrl() {
    return "pfe-toast.json";
  }

  get styleUrl() {
    return "pfe-toast.scss";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get properties() {
    return {
      closeLabel: {
        title: "Close label",
        type: String,
        default: "Close",
        observer: "_closeLabelChanged"
      },
      autoDismiss: {
        title: "Auto dismiss",
        type: String,
        observer: "_autoDismissChanged"
      }
    };
  }

  constructor() {
    super(PfeToast);

    // state
    this.isOpen = false;
    this.doesAutoDismiss = false;

    // elements
    this._container = this.shadowRoot.querySelector(`.${this.tag}__container`);
    this._content = this.shadowRoot.querySelector(`.${this.tag}__content`);
    this._toastCloseButton = this.shadowRoot.querySelector(`.${this.tag}__close`);

    // events
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  _closeLabelChanged() {
    this._toastCloseButton.setAttribute("aria-label", this.closeLabel);
  }

  _autoDismissChanged(oldVal, newVal) {
    this.doesAutoDismiss = !!newVal;
    this._setAccessibility();
  }

  _setAccessibility() {
    if (!this.doesAutoDismiss) {
      this.removeAttribute("aria-live");
      this.removeAttribute("aria-atomic");

      this.setAttribute("role", "alertdialog");
      // default if none provided
      if (!this.hasAttribute("aria-label")) {
        this.setAttribute("aria-label", "Alert dialog");
      }
      this.setAttribute("aria-describedby", `${this.tag}__content`);
    } else {
      this.removeAttribute("aria-label");
      this.removeAttribute("aria-describedby");

      this.setAttribute("role", "alert");
      this.setAttribute("aria-live", "polite");
      this.setAttribute("aria-atomic", "true");
    }
  }

  connectedCallback() {
    super.connectedCallback();

    // get/set state
    this.doesAutoDismiss = this.autoDismiss !== null;
    this._toastCloseButton.setAttribute("aria-label", this.closeLabel);
    this._setAccessibility();
    this.setAttribute("hidden", "");

    // attach listeners
    this._toastCloseButton.addEventListener("click", this.close);
    this.addEventListener("keydown", this._keydownHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._toastCloseButton.removeEventListener("click", this.close);
    this.removeEventListener("keydown", this._keydownHandler);
  }

  open(event) {
    if (event) {
      event.preventDefault();
    }

    this.isOpen = true;

    this.removeAttribute("hidden");
    setTimeout(() => {
      this.classList.add("open");
    }, 500);

    this.dispatchEvent(
      new CustomEvent(`${this.tag}:open`, {
        detail: {},
        bubbles: true
      })
    );

    if (this.doesAutoDismiss) {
      setTimeout(() => {
        this.close();
      }, this._toMilliseconds(this.autoDismiss));
    }

    return this;
  }

  close(event) {
    if (event) {
      event.preventDefault();
    }

    this.isOpen = false;

    this.classList.remove("open");
    setTimeout(() => {
      this.setAttribute("hidden", "");
    }, 500);

    this.dispatchEvent(
      new CustomEvent(`${this.tag}:close`, {
        detail: {},
        bubbles: true
      })
    );

    return this;
  }

  toggle(event) {
    this.isOpen ? this.close(event) : this.open(event);
    return this;
  }

  _toMilliseconds(value) {
    // set default delay if none provided
    const digits = value.match(/\d+/) || [8000];
    const unit = value.match(/\D+/) || "";
    return unit[0] === "s" ? digits[0] * 1000 : digits[0];
  }

  _keydownHandler(event) {
    let target = event.target || window.event.srcElement;
    let key = event.key || event.keyCode;
    switch (key) {
      case "Escape":
      case "Esc":
      case 27:
        this.close(event);
        break;
      case "Enter":
      case 13:
        if (target === this._toastCloseButton) {
          this.close(event);
        }
        break;
      default:
        break;
    }
  }
}

PFElement.create(PfeToast);

export default PfeToast;

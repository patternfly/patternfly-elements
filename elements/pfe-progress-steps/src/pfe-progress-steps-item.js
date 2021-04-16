import PFElement from "../../pfelement/dist/pfelement.js";

class PfeProgressStepsItem extends PFElement {
  static get tag() {
    return "pfe-progress-steps-item";
  }

  static get meta() {
    return {
      title: "Progress stepper item",
      description:
        "A component that gives the user a visual representation of the current state of their progress through an application (typeically a multistep form)."
    };
  }

  get templateUrl() {
    return "pfe-progress-steps-item.html";
  }

  get styleUrl() {
    return "pfe-progress-steps-item.scss";
  }

  renderIcon() {
    if (this.state === "done") {
      return `<svg style="vertical-align:-0.125em" fill="var(--pf-global--success-color--100)" height="100%" width="100%" viewBox="0 0 512 512" aria-hidden="true" role="img" aria-describedby="pf-tooltip-183" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>`;
    }
    if (this.state === "error") {
      return `<svg style="vertical-align:-0.125em" fill="var(--pf-global--danger-color--100)" height="100%" width="100%" viewBox="0 0 512 512" aria-hidden="true" role="img" aria-describedby="pf-tooltip-196" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>`;
    }
    return ``;
  }

  // static get events() {
  //   return {
  //   };
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      state: { type: String, default: "inactive", observer: "render" },
      vertical: { type: String, default: false },
      current: { type: Boolean, default: false, observer: "_currentHandler" }
    };
  }

  static get slots() {
    return {};
  }

  constructor() {
    super(PfeProgressStepsItem, { type: PfeProgressStepsItem.PfeType });
    this._hasLink = false;
  }

  connectedCallback() {
    this._build();
    super.connectedCallback();
    this.addEventListener("click", this._clickHandler.bind(this));
    this.addEventListener("keydown", this._keydownHandler.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._clickHandler.bind(this));
    this.removeEventListener("keydown", this._keydownHandler.bind(this));
  }

  // Rerender the template if this property changes
  _stateHandler(test) {
    if (this._rendered) this.render();
  }

  _build() {
    // Find out if there are any links
    const link = this.querySelector(`a[slot="link"]`);
    if (link) {
      // let the component know we have a link
      this._hasLink = true;
      this.setAttribute("hasLink", true);
      // store link in a local variable for later use.
      this._link = link;
      // Set accessibility attrs
      this.setAttribute("tabindex", "0");
      this.setAttribute("role", "link");
      const linkText = link.innerText;
      if (linkText) {
        this.setAttribute("aria-label", linkText);
      }
    } else {
      this.removeAttribute("tabindex");
      this.removeAttribute("role");
      this.removeAttribute("aria-label");
      this._hasLink = false;
    }
  }

  _clickHandler(event) {
    if (this._hasLink) {
      this._link.click();
    }
  }

  // Listen for keyboard events and map them to their
  // corresponding mouse events.
  _keydownHandler(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Enter" || 13:
        this._clickHandler(event);
        break;
      case " " || 32:
        // Prevent the browser from scolling when the user hits the space key
        event.stopPropagation();
        event.preventDefault();
        this._clickHandler(event);
        break;
    }
  }

  // Toggle aria attributes when current state changes
  _currentHandler() {
    if (this.current) {
      this.setAttribute("aria-current", "true");
    } else {
      this.removeAttribute("aria-current");
    }
  }
}

PFElement.create(PfeProgressStepsItem);

export default PfeProgressStepsItem;

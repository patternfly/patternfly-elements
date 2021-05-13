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
      return `<svg height="100%" width="100%" viewBox="0 0 512 512" aria-hidden="true" role="img" aria-describedby="pf-tooltip-183" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>`;
    }
    if (this.state === "error") {
      return `<svg height="100%" width="100%" viewBox="0 0 512 512" aria-hidden="true" role="img" aria-describedby="pf-tooltip-196" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>`;
    }
    return ``;
  }

  static get events() {
    return {
      
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      state: {
        type: String,
        default: "inactive",
        values: ["inactive", "done", "error"],
        observer: "_build"
      },
      vertical: {
        type: String,
        default: false
      },
      current: {
        type: Boolean,
        default: false,
        observer: "_currentHandler"
      }
    };
  }

  static get slots() {
    return {
      title: {
        title: "Title",
        type: "array",
        namedSlot: true,
        maxItems: 1,
        items: {
          $ref: "raw"
        }
      },
      description: {
        title: "Description",
        type: "array",
        namedSlot: true,
        items: {
          $ref: "raw"
        }
      }
    };
  }

  constructor() {
    super(PfeProgressStepsItem, {
      type: PfeProgressStepsItem.PfeType
    });
    // programatically generate a link based on slot
    this.isLink = false;
    // programatically skip links based on state
    this._skipLink = false;

    this.addEventListener("click", this._clickHandler.bind(this));
    this.addEventListener("keydown", this._keydownHandler.bind(this));
  }

  connectedCallback() {
    super.connectedCallback();
    this._build();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._clickHandler.bind(this));
    this.removeEventListener("keydown", this._keydownHandler.bind(this));
  }

  set isLink(state) {
    // Convert to boolean if not already
    state = Boolean(state);

    if (state) {
      this.setAttribute("is_link", "");
      // Set accessibility attrs
      this.setAttribute("tabindex", "0");
      this.setAttribute("role", "link");
    } else {
      this.removeAttribute("is_link");
      // Remove accessibility attrs
      this.removeAttribute("tabindex");
      this.removeAttribute("role");
      this.removeAttribute("aria-label");
    }
  }

  _build() {
    if (this.isIE11) return;

    // find out if we should skip the link
    this._skipLink = this.current || this.state === "error";

    // Find out if there are any links
    const link = this.querySelector(`a[slot="link"]`);
    if (link && !this._skipLink) {
      // Let the component know we have a link
      this.isLink = true;
      // store link in a local variable for later use.
      this._link = link;
      const linkText = link.innerText;
      if (linkText) this.setAttribute("aria-label", linkText);
    } else this.isLink = false;

    // Rerender
    this.render();
  }
s
  _currentHandler(oldVal, newVal) {
    if (oldVal === newVal) return;

    if (newVal) this.setAttribute("aria-current", "true");
    else this.removeAttribute("aria-current");
  }

  _clickHandler(event) {
    if (this.isLink) this._link.click();
  }

  // Listen for keyboard events and map them to their
  // corresponding mouse events.
// @TODO This needs AT
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
}

PFElement.create(PfeProgressStepsItem);

export default PfeProgressStepsItem;

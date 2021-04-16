import PFElement from "../../pfelement/dist/pfelement.js";

class PfeAlert extends PFElement {
  static get tag() {
    return "pfe-alert";
  }

  static get meta() {
    return {
      title: "Alert",
      description:
        "Notify the user about a change in status or other event without blocking other actions in an interface."
    };
  }

  get templateUrl() {
    return "pfe-alert.html";
  }

  get styleUrl() {
    return "pfe-alert.scss";
  }

  static get events() {
    return {
      confirm: `${this.tag}:confirm`,
      dismiss: `${this.tag}:dismiss`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      state: { type: String, default: "default" },
      variant: { type: Boolean, default: false }
    };
  }

  // @todo maybe we can move these into pfe-icon
  renderIcon() {
    if (this.state === "default") {
      return `<svg style="vertical-align:-0.125em" fill="currentColor" height="1em" width="1em" viewBox="0 0 896 1024" aria-hidden="true" role="img"><path d="M448,0 C465.333333,0 480.333333,6.33333333 493,19 C505.666667,31.6666667 512,46.6666667 512,64 L512,106 L514.23,106.45 C587.89,121.39 648.48,157.24 696,214 C744,271.333333 768,338.666667 768,416 C768,500 780,568.666667 804,622 C818.666667,652.666667 841.333333,684 872,716 C873.773676,718.829136 875.780658,721.505113 878,724 C890,737.333333 896,752.333333 896,769 C896,785.666667 890,800.333333 878,813 C866,825.666667 850.666667,832 832,832 L63.3,832 C44.9533333,831.84 29.8533333,825.506667 18,813 C6,800.333333 0,785.666667 0,769 C0,752.333333 6,737.333333 18,724 L24,716 L25.06,714.9 C55.1933333,683.28 77.5066667,652.313333 92,622 C116,568.666667 128,500 128,416 C128,338.666667 152,271.333333 200,214 C248,156.666667 309.333333,120.666667 384,106 L384,63.31 C384.166667,46.27 390.5,31.5 403,19 C415.666667,6.33333333 430.666667,0 448,0 Z M576,896 L576,897.08 C575.74,932.6 563.073333,962.573333 538,987 C512.666667,1011.66667 482.666667,1024 448,1024 C413.333333,1024 383.333333,1011.66667 358,987 C332.666667,962.333333 320,932 320,896 L576,896 Z"></path></svg>`;
    }
    if (this.state === "error") {
      return `<svg style="vertical-align:-0.125em" fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512" aria-hidden="true" role="img"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>`;
    }
    if (this.state === "success") {
      return `<svg style="vertical-align:-0.125em" fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512" aria-hidden="true" role="img"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>`;
    }
    if (this.state === "warning") {
      return `<svg style="vertical-align:-0.125em" fill="currentColor" height="1em" width="1em" viewBox="0 0 576 512" aria-hidden="true" role="img"><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>`;
    }
    if (this.state === "danger") {
      return `<svg style="vertical-align:-0.125em" fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512" aria-hidden="true" role="img"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>`;
    }
    if (this.state === "info") {
      return `<svg style="vertical-align:-0.125em" fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512" aria-hidden="true" role="img"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>`;
    }
    return ``;
  }

  static get slots() {
    return {};
  }

  constructor() {
    super(PfeAlert, { type: PfeAlert.PfeType });
    // Listen to click events to see if anyone clicked on a confirm / dismiss
    this.addEventListener("click", this._clickHandler.bind(this));
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here
    this.render();
  }

  render() {
    super.render();
    this._addEventListeners();
  }

  _addEventListeners() {
    this.shadowRoot.querySelector("#close-button").addEventListener("click", this._clickHandler.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._clickHandler.bind(this));
    this.shadowRoot.querySelector("#close-button").removeEventListener("click", this._clickHandler.bind(this));
  }

  /**
   * Dismiss the alert
   *
   * This will remove the alert from the dom.
   */
  dismiss() {
    this.remove();
  }

  _clickHandler(event) {
    // look for confirm or dismiss
    const target = event.target.closest("button, .pfe-alert__action-group-item");
    if (target) {
      if (target.hasAttribute("confirm")) {
        this.emitEvent(PfeAlert.events.confirm, {
          detail: {
            target
          }
        });
        this.dismiss();
      }
      if (target.hasAttribute("dismiss")) {
        this.emitEvent(PfeAlert.events.confirm, {
          detail: {
            target
          }
        });
        this.dismiss();
      }
    }
  }
}

PFElement.create(PfeAlert);

export default PfeAlert;

import PFElement from "../../pfelement/dist/pfelement.js";

class PfeClipboard extends PFElement {
  static get tag() {
    return "pfe-clipboard";
  }

  static get meta() {
    return {
      title: "Clipboard",
      description: "Copy current URL to clipboard."
    };
  }

  get templateUrl() {
    return "pfe-clipboard.html";
  }

  get styleUrl() {
    return "pfe-clipboard.scss";
  }

  static get events() {
    return {
      copied: `${this.tag}:copied`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      noIcon: {
        title: "No Icon",
        type: Boolean,
        attr: "no-icon",
        observer: "_noIconChanged"
      },
      role: {
        type: String,
        default: "button"
      },
      tabindex: {
        type: Number,
        default: 0
      }
    };
  }

  static get slots() {
    return {
      icon: {
        title: "Icon",
        slotName: "pfe-clipboard--icon",
        slotClass: "pfe-clipboard__icon",
        slotId: "icon"
      },
      text: {
        title: "Text",
        slotName: "pfe-clipboard--text",
        slotClass: "pfe-clipboard__text",
        slotId: "text"
      },
      textSuccess: {
        title: "Text Success",
        slotName: "pfe-clipboard--text--success",
        slotClass: "pfe-clipboard__text--success",
        slotId: "text--success"
      }
    };
  }

  constructor() {
    super(PfeClipboard, { type: PfeClipboard.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    // Add a slotchange listener to the lightDOM trigger
    // this.icon.addEventListener("slotchange", this._init);

    // Since this element as the role of button we are going to listen
    // for click and as well as 'enter' and 'space' commands to trigger
    // the copy functionality
    this.addEventListener("click", this._clickHandler.bind(this));
    this.addEventListener("keydown", this._keydownHandler.bind(this));

    // Monitor the default slot for changes so we can map them to the text slot
    this.shadowRoot.addEventListener("slotchange", this._slotchangeHandler.bind(this));
  }

  // Monitor the default slot for changes so we can map them to the text slot
  _slotchangeHandler(event) {
    // Target just the default slot
    if (!event.target.hasAttribute("name")) {
      // Transpose the default slot content
      this._transposeDefaultSlot(this.shadowRoot.querySelector("#text"));
    }
  }

  /**
   * Transpose content from the default slot to a named slot. Accounts
   * for empty default content and filters it.
   * @todo Make this._targetSlotContent unique to each element so you can
   *       transpose to muliple targets
   * @todo Provide the filter logic a call back for the filter logic.
   * @example `_transposeSlot(this.shadowRoot("slot#text"));`
   * @param {Element} target
   * @return void
   */
  _transposeDefaultSlot(target) {
    // Store the default content of the target for later use.
    if (typeof this._targetSlotContent === "undefined") {
      this._targetSlotContent = target.innerHTML;
    }
    // Get all children for a the default slot. We need to include flatten to make sure we get the content.
    const childNodes = [...this.shadowRoot.querySelector(`slot:not([name])`).assignedNodes({ flatten: true })];
    // Trim the content nodes for whitespace and combine it into one string for evaluation.
    const childContent = childNodes.map(child => child.textContent.trim()).join("");
    // Find out if their is any non whitespace content
    if (childContent !== "") {
      // Transpose the content to the target slot
      target.innerHTML = childContent;
    }
    // If there isn't any content then we are going to place the target slot's default content back.
    else {
      target.innerHTML = this._targetSlotContent;
    }
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._clickHandler.bind(this));
    this.removeEventListener("keydown", this._keydownHandler.bind(this));
    this.shadowRoot.removeEventListener("slotchange", this._slotchangeHandler.bind(this));
    super.disconnectedCallback();
  }

  _noIconChanged(previousValue) {
    // dirty check to see if we should rerender the template
    if (this._rendered && this.noIcon !== previousValue) {
      this.render();
    }
  }

  _clickHandler(event) {
    // Execute the copy to clipboard functionality
    this.copyURLToClipboard()
      .then(url => {
        // Emit event that lets others know the user has "copied"
        // the url. We are also going to include the url that was
        // copied.
        this.emitEvent(PfeClipboard.events.copied, {
          detail: {
            url
          }
        });
        // Toggle the copied state for 3 seconds
        this.setAttribute("copied", "");
        setTimeout(() => {
          this.removeAttribute("copied");
        }, 3000);
      })
      .catch(error => {
        this.warn(error);
      });
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

  /**
   * Copy url to the user's system clipboard clipboard
   * https://caniuse.com/mdn-api_navigator_clipboard
   * @async
   * @return {Promise<string>} url
   */
  copyURLToClipboard() {
    return new Promise((resolve, reject) => {
      const url = window.location.href;
      // If the Clipboard API is available then use that
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(resolve(url));
      }
      // If execCommand("copy") exists then use that method
      else if (document.queryCommandEnabled("copy")) {
        const dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.value = url;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        resolve(url);
      } else {
        reject(new Error("Your browser does not support copying to the clipboard."));
      }
    });
  }
}

PFElement.create(PfeClipboard);

export default PfeClipboard;

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
        title: "No icon",
        type: Boolean,
        observer: "_noIconChanged"
      },
      copiedDuration: {
        title: "Success message duration (in seconds)",
        type: Number,
        default: 3
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
        description: "This field can accept an SVG, pfe-icon component, or other format for displaying an icon.",
        slotName: "icon",
        slotClass: "pfe-clipboard__icon",
        slotId: "icon"
      },
      text: {
        title: "Default text",
        slotName: "text",
        slotClass: "pfe-clipboard__text",
        slotId: "text"
      },
      textSuccess: {
        title: "Success message",
        description: "Shown when the URL is successfully copied to the clipboard.",
        slotName: "text--success",
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
      this._transposeSlot(event);
    }
  }

  /**
   * Transpose content from one slot to another. Accounts
   * for empty default content and filters it.
   * @todo Provide hook to allow users to add their own filtering logic.
   * @todo Convert from slotchange to MutationObserver to observe children.
   * @example
   * // Decorate the source slot with a `hidden` attribute and a `data-slot`
   * // attribute where the destination slot name is provided.
   * // <slot hidden data-slot="text"></slot>
   * _slotchangeHandler(event) { this._transposeSlot(event) }
   *
   * @param {event} SlotchangeEvent
   * @return void
   */
  _transposeSlot(event) {
    const source = event.target;
    const slot = source.dataset.slot;
    const target = this.shadowRoot.querySelector(`slot[name="${slot}"]`);
    const fallbackContentVariable = `_transposeSlot${slot}`;
    // Store the default content of the target for later use.
    if (typeof this[fallbackContentVariable] === "undefined") {
      this[fallbackContentVariable] = target.innerHTML;
    }
    // Get all children for the source slot. We need to include flatten to make sure we get the content.
    const childNodes = [...source.assignedNodes({ flatten: true })];
    // Trim the content nodes for whitespace and combine it into one string for evaluation.
    const childContent = childNodes.map(child => child.textContent.trim()).join("");
    // Find out if there is any non whitespace content
    if (childContent !== "") {
      // Transpose the content to the target slot
      target.innerHTML = childContent;
    }
    // If there isn't any content then we are going to place the target slot's default content back in.
    else {
      target.innerHTML = this[fallbackContentVariable];
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
        // Toggle the copied state. Use the this._formattedCopiedTimeout function
        // to an appropraite setTimout length.
        this.setAttribute("copied", "");
        setTimeout(() => {
          this.removeAttribute("copied");
        }, this._formattedCopiedTimeout());
      })
      .catch(error => {
        this.warn(error);
      });
  }

  // Formatted copied timeout value. Use the formattedCopiedTimeout function
  // to get a type safe, millisecond value of the timeout duration.
  _formattedCopiedTimeout() {
    const copiedDuration = Number(this.copiedDuration * 1000);
    if (!(copiedDuration > -1)) {
      this.warn(`copied-duration must be a valid number. Defaulting to 3 seconds.`);
      // default to 3 seconds
      return 3000;
    } else {
      return copiedDuration;
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

  /**
   * Copy url to the user's system clipboard
   *
   * If available, it will use the new Navigator API to access the system clipboard
   * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/clipboard
   *
   * If unavailable, it will use the legacy execCommand("copy")
   * https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
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

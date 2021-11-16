import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeClipboard 1.12.2
 * @license
 * Copyright 2021 Red Hat, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
*/

class PfeClipboard extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.12.2";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:0;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;max-width:-webkit-fit-content;max-width:-moz-fit-content;max-width:fit-content;color:#06c!important;color:var(--pfe-clipboard--Color,var(--pfe-broadcasted--link,#06c))!important;cursor:pointer;padding:6px 16px;padding:var(--pfe-clipboard--Padding,6px 16px);font-weight:300;font-weight:var(--pfe-clipboard--FontWeight,var(--pfe-theme--font-weight--light,300));font-size:1rem;font-size:var(--pfe-clipboard--FontSize,var(--pf-global--FontSize--md,1rem))}:host([hidden]){display:none}.pfe-clipboard__icon{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:1em;width:var(--pfe-clipboard--icon--Width,var(--pfe-theme--icon-size,1em));height:auto;height:var(--pfe-clipboard--icon--Height,auto);margin:0 .4825rem 0 0;margin:var(--pfe-clipboard--icon--Margin,0 .4825rem 0 0);--pfe-icon--Color:var(--pfe-clipboard--icon--Color, var(--pfe-theme--color--text--muted, #6a6e73))}.pfe-clipboard__icon svg{fill:#6a6e73!important;fill:var(--pfe-clipboard--icon--Color,var(--pfe-theme--color--text--muted,#6a6e73))!important}:host([disabled]) .pfe-clipboard__icon{opacity:.4}.pfe-clipboard__text{color:#06c!important;color:var(--pfe-clipboard--Color,var(--pfe-broadcasted--link,#06c))!important}:host([disabled]) .pfe-clipboard__text{color:#6a6e73!important;color:var(--pfe-clipboard--Color--disabled,var(--pfe-theme--color--ui-disabled--text,#6a6e73))!important}.pfe-clipboard__text--success{color:#3e8635!important;color:var(--pfe-clipboard--text--success--Color,var(--pfe-theme--color--feedback--success,#3e8635))!important}:host(:focus:not([disabled])) .pfe-clipboard__text,:host(:hover:not([disabled])) .pfe-clipboard__text{color:#004080!important;color:var(--pfe-clipboard--Color--hover,var(--pfe-broadcasted--link--hover,#004080))!important}:host(:focus:not([disabled])) .pfe-clipboard__icon,:host(:hover:not([disabled])) .pfe-clipboard__icon{--pfe-icon--Color:var(--pfe-clipboard--icon--Color--hover, var(--pfe-theme--color--ui-base--hover, #151515))}:host(:focus:not([disabled])) .pfe-clipboard__icon svg,:host(:hover:not([disabled])) .pfe-clipboard__icon svg{fill:#151515!important;fill:var(--pfe-clipboard--icon--Color--hover,var(--pfe-theme--color--ui-base--hover,#151515))!important}.pfe-clipboard[copied] .pfe-clipboard__text,:host([copied]) .pfe-clipboard__text{display:none!important}.pfe-clipboard:not([copied]) .pfe-clipboard__text--success,:host(:not([copied])) .pfe-clipboard__text--success{display:none!important}.pfe-clipboard__icon>*,::slotted([slot=icon]){width:100%}#icon--url{display:none}:host([copy-from=url]) #icon--url{display:block}:host([copy-from=url]) #icon--copy{display:none}:host([on=dark]){--pfe-clipboard--icon--Color:var(--pfe-clipboard--icon--Color--dark, var(--pfe-theme--color--text--muted--on-dark, #d2d2d2));--pfe-clipboard--icon--Color--hover:var(--pfe-clipboard--icon--Color--hover--dark, var(--pfe-theme--color--text--on-dark, #fff))}:host([on=saturated]){--pfe-clipboard--icon--Color:var(--pfe-clipboard--icon--Color--saturated, var(--pfe-theme--color--text--muted--on-saturated, #d2d2d2));--pfe-clipboard--icon--Color--hover:var(--pfe-clipboard--icon--Color--hover--saturated, var(--pfe-theme--color--text--on-saturated, #fff))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{display:inline-block}.pfe-clipboard__icon{display:inline-block;margin-right:0}.pfe-clipboard__text{display:inline-block}.pfe-clipboard__text--success{display:inline-block}} /*# sourceMappingURL=pfe-clipboard.min.css.map */</style>
<!-- icon slot -->
${!this.noIcon ? `
    <div class="pfe-clipboard__icon">
      <slot name="icon" id="icon">
        <svg id="icon--url" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 15.277 16"><g transform="translate(-2.077 -1.807)"><path class="a" d="M15.34,2.879a3.86,3.86,0,0,0-5.339,0L6.347,6.545a3.769,3.769,0,0,0,0,5.339.81.81,0,0,0,1.132,0,.823.823,0,0,0,0-1.145A2.144,2.144,0,0,1,7.5,7.677l3.641-3.654a2.161,2.161,0,1,1,3.049,3.062l-.8.8a.811.811,0,1,0,1.145,1.132l.8-.8a3.769,3.769,0,0,0,0-5.339Z" transform="translate(0.906 0)"/><path class="a" d="M10.482,6.822a.823.823,0,0,0,0,1.145,2.161,2.161,0,0,1,0,3.049L7.343,14.155a2.161,2.161,0,0,1-3.062,0,2.187,2.187,0,0,1,0-3.062l.193-.116a.823.823,0,0,0,0-1.145.811.811,0,0,0-1.132,0l-.193.193a3.86,3.86,0,0,0,0,5.339,3.86,3.86,0,0,0,5.339,0l3.126-3.139A3.731,3.731,0,0,0,12.72,9.562a3.769,3.769,0,0,0-1.094-2.74A.823.823,0,0,0,10.482,6.822Z" transform="translate(0 1.37)"/></g></svg>
        <svg id="icon--copy" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32"><g></g><path d="M30.286 6.857q0.714 0 1.214 0.5t0.5 1.214v21.714q0 0.714-0.5 1.214t-1.214 0.5h-17.143q-0.714 0-1.214-0.5t-0.5-1.214v-5.143h-9.714q-0.714 0-1.214-0.5t-0.5-1.214v-12q0-0.714 0.357-1.571t0.857-1.357l7.286-7.286q0.5-0.5 1.357-0.857t1.571-0.357h7.429q0.714 0 1.214 0.5t0.5 1.214v5.857q1.214-0.714 2.286-0.714h7.429zM20.571 10.661l-5.339 5.339h5.339v-5.339zM9.143 3.804l-5.339 5.339h5.339v-5.339zM12.643 15.357l5.643-5.643v-7.429h-6.857v7.429q0 0.714-0.5 1.214t-1.214 0.5h-7.429v11.429h9.143v-4.571q0-0.714 0.357-1.571t0.857-1.357zM29.714 29.714v-20.571h-6.857v7.429q0 0.714-0.5 1.214t-1.214 0.5h-7.429v11.429h16z"/></svg>
      </slot>
    </div>
` : ""}
<div class="pfe-clipboard__text">
    <slot name="text" id="text">Copy</slot>
</div>
<div class="pfe-clipboard__text--success" role="alert">
    <slot name="text--success" id="text--success">Copied</slot>
</div>`;
  }

  static get tag() {
    return "pfe-clipboard";
  }

  static get meta() {
    return {
      title: "Clipboard",
      description: "Copy current URL to clipboard.",
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
      copied: `${this.tag}:copied`,
      connected: `${this.tag}:connected`,
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
        observer: "_noIconChanged",
      },
      copiedDuration: {
        title: "Success message duration (in seconds)",
        type: Number,
        default: 3,
      },
      role: {
        type: String,
        default: "button",
      },
      tabindex: {
        type: Number,
        default: 0,
      },
      copyFrom: {
        type: String,
        default: "url",
        observer: "_checkForCopyTarget",
      },
    };
  }

  static get slots() {
    return {
      icon: {
        title: "Icon",
        description: "This field can accept an SVG, pfe-icon component, or other format for displaying an icon.",
        slotName: "icon",
        slotClass: "pfe-clipboard__icon",
        slotId: "icon",
      },
      text: {
        title: "Default text",
        slotName: "text",
        slotClass: "pfe-clipboard__text",
        slotId: "text",
      },
      textSuccess: {
        title: "Success message",
        description: "Shown when the URL is successfully copied to the clipboard.",
        slotName: "text--success",
        slotClass: "pfe-clipboard__text--success",
        slotId: "text--success",
      },
    };
  }

  get contentToCopy() {
    return this._contentToCopy;
  }

  /**
   * Adding Getter/Setter for
   */
  set contentToCopy(contentToCopy) {
    if (contentToCopy) {
      this.removeAttribute("disabled");
      this._contentToCopy = contentToCopy;
    }
  }

  constructor() {
    super(PfeClipboard, { type: PfeClipboard.PfeType });
    this._contentToCopy = null;

    this._checkForCopyTarget = this._checkForCopyTarget.bind(this);
    this.copyURLToClipboard = this.copyURLToClipboard.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    // Since this element as the role of button we are going to listen
    // for click and as well as 'enter' and 'space' commands to trigger
    // the copy functionality
    this.addEventListener("click", this._clickHandler.bind(this));
    this.addEventListener("keydown", this._keydownHandler.bind(this));

    // Make sure the thing we might copy exists
    this._checkForCopyTarget();

    // Emit event when this component has connected in case copyContent needs to be set
    this.emitEvent(PfeClipboard.events.connected, {
      detail: {
        component: this,
      },
    });

    // This prevents a regression, default text used to be "Copy URL".
    // Now that component can copy _anything_ that's not ideal default text
    if (this.copyFrom === "url" && !this.hasSlot("text")) {
      this.shadowRoot.getElementById("text").innerText = "Copy URL";
    }
  }

  disconnectedCallback() {
    // Clean up after ourselves
    this.removeEventListener("click", this._clickHandler.bind(this));
    this.removeEventListener("keydown", this._keydownHandler.bind(this));
    super.disconnectedCallback();
  }

  _noIconChanged(previousValue) {
    // dirty check to see if we should rerender the template
    if (this._rendered && this.noIcon !== previousValue) {
      this.render();
    }
  }

  /**
   * Checks to make sure the thing we may copy exists
   */
  _checkForCopyTarget() {
    if (this.copyFrom === "property") {
      if (!this._contentToCopy) {
        this.setAttribute("disabled", "");
      } else if (this.hasAttribute("disabled")) {
        this.removeAttribute("disabled");
      }
    }
    // If target is set to anything else, we're not doing checks for it
    else if (this.copyFrom.length) {
      this.removeAttribute("disabled");
    }
  }

  /**
   * Event handler for any activation of the copy button
   */
  _clickHandler() {
    let text;
    switch (this.copyFrom) {
      // Copy current URL
      case "url":
        text = window.location.href;
        break;
      // Copy whatever is in this.contentToCopy
      case "property":
        if (this._contentToCopy) {
          text = this._contentToCopy;
        } else {
          this.setAttribute("disabled", "");
          this.error("Set to copy property, but this.contentToCopy is not set");
          return;
        }
        break;
      // Assume what's in the target property is a selector and copy the text from the element
      default:
        const targetElement = document.querySelector(this.copyFrom);
        if (targetElement && targetElement.tagName) {
          // What needs to be copied changes for some types of elements
          switch (targetElement.tagName.toLowerCase()) {
            // Copy the value of form fields
            case "input":
              text = targetElement.value;
              break;
            // Copy the text of our element
            default:
              text = targetElement.innerText;
              break;
          }
        }
        break;
    }

    if (!text || (typeof text === "string" && !text.length)) {
      this.error("Couldn't find text to copy.");
      this.setAttribute("disabled", "");
      return;
    }

    // Execute the copy to clipboard functionality
    this.copyTextToClipboard(text)
      .then((copiedText) => {
        // Emit event that lets others know the user has "copied"
        // the url. We are also going to include the url that was
        // copied.
        this.emitEvent(PfeClipboard.events.copied, {
          detail: {
            url: copiedText, // @todo deprecate
            copiedText: copiedText,
          },
        });
        // Toggle the copied state. Use the this._formattedCopiedTimeout function
        // to an appropraite setTimout length.
        this.setAttribute("copied", "");
        setTimeout(() => {
          this.removeAttribute("copied");
        }, this._formattedCopiedTimeout());
      })
      .catch((error) => {
        this.warn(error);
        this._checkForCopyTarget();
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
      case "Enter" :
        this._clickHandler(event);
        break;
      case " " :
        // Prevent the browser from scolling when the user hits the space key
        event.stopPropagation();
        event.preventDefault();
        this._clickHandler(event);
        break;
    }
  }

  /**
   * Copy arbitrary text to system clipboard
   *
   * If available, it will use the new Navigator API to access the system clipboard
   * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/clipboard
   *
   * If unavailable, it will use the legacy execCommand("copy")
   * https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
   * @async
   * @param {string} text Text to be copied
   * @return {Promise<string>} url
   */
  copyTextToClipboard(text) {
    if (!text) this.error("Copy function called, but no text was given to copy.");
    return new Promise((resolve, reject) => {
      // If the Clipboard API is available then use that
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(resolve(text));
      }
      // If execCommand("copy") exists then use that method
      else if (document.queryCommandEnabled("copy")) {
        const dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        resolve(text);
      } else {
        reject(new Error("Current browser does not support copying to the clipboard."));
      }
    });
  }

  /**
   * Copy url to the user's system clipboard
   *
   * @async
   * @deprecated This will be removed in version 2.0
   * @return {Promise<string>} url
   */
  copyURLToClipboard() {
    const url = window.location.href;
    return this.copyTextToClipboard(url);
  }
}

PFElement.create(PfeClipboard);

export default PfeClipboard;
//# sourceMappingURL=pfe-clipboard.js.map

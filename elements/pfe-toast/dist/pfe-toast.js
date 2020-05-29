import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeToast 1.0.0-prerelease.49
 * @license
 * Copyright 2020 Red Hat, Inc.
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

class PfeToast extends PFElement {
  static get version() {
    return "1.0.0-prerelease.49";
  }

  get html() {
    return `<style>@charset "UTF-8";:host{--pfe-toast--Top:50px;--pfe-toast--MaxWidth:500px;--pfe-toast--MinWidth:250px;--pfe-toast--Right--offset:50px;--pfe-toast--Right:calc(-1 * (var(--pfe-toast--MaxWidth) + var(--pfe-toast--Right--offset)));--pfe-toast__container--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-toast__container--BoxShadow:rgba(3, 3, 3, 0.13) 0px 3px 7px 3px,rgba(3, 3, 3, 0.12) 0px 11px 24px 16px;--pfe-toast__container--Color:var(--pfe-theme--color--text, #333);--pfe-toast__container--Padding:1rem;--pfe-toast__close--svg--Fill:var(--pfe-theme--color--feedback--default--darkest, #464646);--pfe-toast__close--svg--Fill--hover:#333;--pfe-toast__close--svg--Height:12px;--pfe-toast__close--svg--Width:12px;--pfe-toast__close--PaddingTop:0;--pfe-toast__close--PaddingRight:0;--pfe-toast__close--PaddingBottom:0;--pfe-toast__close--PaddingLeft:0;--pfe-toast__close--Padding:var(--pfe-toast__close--PaddingTop) var(--pfe-toast__close--PaddingRight) var(--pfe-toast__close--PaddingBottom) var(--pfe-toast__close--PaddingLeft);-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row wrap;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;position:absolute;right:var(--pfe-toast--Right);top:var(--pfe-toast--Top);-webkit-transition:right .5s ease-in-out;transition:right .5s ease-in-out;will-change:right;max-width:var(--pfe-toast--MaxWidth);min-width:var(--pfe-toast--MinWidth)}@media only screen and (max-width:575px){:host{max-width:calc(var(--pfe-toast--MaxWidth)/ 2);min-width:calc(var(--pfe-toast--MinWidth)/ 2)}}:host([hidden]){display:none}:host(.open){--pfe-toast--Right:50px}:host(:not(.open)){--pfe-toast--Right:calc(-1 * (var(--pfe-toast--MaxWidth) + var(--pfe-toast--Right--offset)))}::slotted(:first-child){margin-top:0}::slotted(button){background:0 0;border-radius:0;display:inline-block;margin-bottom:0;margin-right:1rem;padding: .5rem .75rem;text-align:center}.pfe-toast__container{-webkit-align-self:flex-start;-ms-flex-item-align:start;align-self:flex-start;-webkit-box-flex:1;-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;background-color:var(--pfe-toast__container--BackgroundColor);-webkit-box-shadow:var(--pfe-toast__container--BoxShadow);box-shadow:var(--pfe-toast__container--BoxShadow);color:var(--pfe-toast__container--Color);padding:var(--pfe-toast__container--Padding)}.pfe-toast__content{-webkit-box-flex:1;-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto}.pfe-toast__close{-webkit-box-flex:0;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;background-color:transparent;border:none;cursor:pointer;margin:0;padding:var(--pfe-toast__close--Padding)}.pfe-toast__close>svg{fill:var(--pfe-toast__close--svg--Fill);height:var(--pfe-toast__close--svg--Height);width:var(--pfe-toast__close--svg--Width)}.pfe-toast__close:hover>svg{fill:var(--pfe-toast__close--svg--Fill--hover)}
/*# sourceMappingURL=pfe-toast.min.css.map */
</style><div class="pfe-toast__container">
    <div class="pfe-toast__content">
        <slot></slot>
    </div>
    <button class="pfe-toast__close">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32"
            height="32" viewBox="-11 11 22 23">
            <path
                d="M30 16.669v-1.331c0-0.363-0.131-0.675-0.394-0.938s-0.575-0.394-0.938-0.394h-10.669v-10.65c0-0.362-0.131-0.675-0.394-0.938s-0.575-0.394-0.938-0.394h-1.331c-0.363 0-0.675 0.131-0.938 0.394s-0.394 0.575-0.394 0.938v10.644h-10.675c-0.362 0-0.675 0.131-0.938 0.394s-0.394 0.575-0.394 0.938v1.331c0 0.363 0.131 0.675 0.394 0.938s0.575 0.394 0.938 0.394h10.669v10.644c0 0.363 0.131 0.675 0.394 0.938 0.262 0.262 0.575 0.394 0.938 0.394h1.331c0.363 0 0.675-0.131 0.938-0.394s0.394-0.575 0.394-0.938v-10.637h10.669c0.363 0 0.675-0.131 0.938-0.394 0.269-0.262 0.4-0.575 0.4-0.938z"
                transform="rotate(45)" />
        </svg>
    </button>
</div>`;
  }

  static get properties() {
    return {"auto_dismiss":{"title":"Auto dismiss","type":"string"},"close_label":{"title":"Close label","type":"string"}};
  }

  static get slots() {
    return {"content":{"title":"Content","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"raw"}]}}};
  }
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

  get closeLabel() {
    return this.getAttribute("close-label") || "Close";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get observedAttributes() {
    return ["auto-dismiss", "close-label"];
  }

  constructor() {
    super(PfeToast);

    // state
    this.isOpen = false;
    this.doesAutoDismiss = false;

    // elements
    this._container = this.shadowRoot.querySelector(`.${this.tag}__container`);
    this._content = this.shadowRoot.querySelector(`.${this.tag}__content`);
    this._toastCloseButton = this.shadowRoot.querySelector(
      `.${this.tag}__close`
    );

    // events
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case "close-label":
        this._toastCloseButton.setAttribute("aria-label", this.closeLabel);
      case "auto-dismiss":
        this.doesAutoDismiss = !!newValue;
        this._setAccessibility();
      default:
        break;
    }
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
    this.doesAutoDismiss = this.hasAttribute("auto-dismiss");
    this._toastCloseButton.setAttribute("aria-label", this.closeLabel);
    this._setAccessibility();
    this.setAttribute("hidden", "");

    // attach listeners
    this._toastCloseButton.addEventListener("click", this.close);
    this.addEventListener("keydown", this._keydownHandler);
  }

  disconnectedCallback() {
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
      }, this._toMilliseconds(this.getAttribute("auto-dismiss")));
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
//# sourceMappingURL=pfe-toast.js.map

import PFElement from '../../pfelement/dist/pfelement.js';
import '../../pfe-badge/dist/pfe-badge.js';
import PfeIcon from '../../pfe-icon/dist/pfe-icon.js';

/*!
 * PatternFly Elements: PfeChip 1.7.0
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

class PfeChip extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.7.0";
  }

  // Injected at build-time
  get html() {
    return `
<style>.pfe-chip__button,.pfe-chip__close{background-color:transparent;border:none;margin:0;padding:0;text-align:left}:host{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;position:relative;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;min-width:-webkit-fit-content;min-width:-moz-fit-content;min-width:fit-content;color:#151515;color:var(--pfe-chip--Color,var(--pfe-theme--color--text,#151515));padding:0 0 0 .5rem;padding:var(--pfe-chip--Padding,var(--pfe-chip--PaddingTop,0) var(--pfe-chip--PaddingRight,0) var(--pfe-chip--PaddingBottom,0) var(--pfe-chip--PaddingLeft,var(--pfe-theme--content-spacer--body--sm,.5rem)));list-style:none;background-color:#fff;background-color:var(--pfe-chip--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));border-radius:2px;border-radius:var(--pfe-chip--BorderRadius,var(--pfe-theme--ui--border-radius,2px));border:1px solid #d2d2d2;border:var(--pfe-chip--BorderWidth,var(--pfe-theme--ui--border-width,1px)) var(--pfe-theme--ui--border-style,solid) var(--pfe-chip--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2));border-radius:2px;border-radius:var(--pfe-chip--BorderRadius,var(--pfe-theme--ui--border-radius,2px))}:host([hidden]){display:none}:host([on=dark]),:host([on=saturated]){border-width:0;border-width:var(--pfe-chip--BorderWidth,0)}.pfe-chip__text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:7.5rem;max-width:var(--pfe-chip__text--MaxWidth,7.5rem);font-size:.75rem;font-size:var(--pfe-chip__text--FontSize,var(--pf-global--FontSize--xs,.75rem));line-height:1.5;line-height:var(--pfe-chip__text--LineHeight,var(--pfe-theme--line-height,1.5));color:#151515;color:var(--pfe-chip__text--Color,var(--pfe-theme--color--text,#151515))}.pfe-chip__badge{margin-left:.25rem;margin-left:var(--pfe-chip__badge--MarginLeft,var(--pf-global--spacer--xs,.25rem))}.pfe-chip__button,.pfe-chip__close{position:relative;display:inline-block;text-align:center;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:.02344rem .5rem .02344rem .5rem;padding:var(--pfe-chip__button--Padding,var(--pfe-chip__button--PaddingTop,var(--pfe-theme--form-spacer,.02344rem)) var(--pfe-chip__button--PaddingRight,var(--pfe-theme--content-spacer--body--sm,.5rem)) var(--pfe-chip__button--PaddingBottom,var(--pfe-theme--form-spacer,.02344rem)) var(--pfe-chip__button--PaddingLeft,var(--pfe-theme--content-spacer--body--sm,.5rem)))}.pfe-chip__button::after,.pfe-chip__close::after{border:0 solid #3c3f42;border:var(--pfe-chip__button--BorderWidth,0) var(--pfe-theme--ui--border-style,solid) var(--pfe-chip__button--BorderColor,var(--pfe-theme--color--surface--border--darkest,#3c3f42));border-radius:2px;border-radius:var(--pfe-chip__button--BorderRadius,var(--pfe-theme--ui--border-radius,2px))}.pfe-chip__button pfe-icon,.pfe-chip__close pfe-icon{--pfe-icon--color:pfe-local(BackgroundColor, $region: button);display:inline-block;height:calc(.75rem * 1.5);height:calc(var(--pfe-chip__button--size,var(--pf-global--FontSize--xs,.75rem)) * 1.5);width:.75rem;width:var(--pfe-chip__button--size,var(--pf-global--FontSize--xs,.75rem));line-height:1;vertical-align:-.125em}.pfe-chip__button:hover,.pfe-chip__close:hover{cursor:pointer}.pfe-chip__button:hover::after,.pfe-chip__close:hover::after{border-width:var(--pfe-chip__button--BorderWidth--hover)}.pfe-chip__button:hover pfe-icon,.pfe-chip__close:hover pfe-icon{fill:#004080;fill:var(--pfe-chip__button--BackgroundColor--hover,var(--pfe-theme--color--ui-accent--hover,#004080))}:host([on=dark]) .pfe-chip__button:hover::after,:host([on=dark]) .pfe-chip__close:hover::after{margin:1px}.pfe-chip__button:active::after,.pfe-chip__close:active::after{border-width:var(--pfe-chip__button--BorderWidth--active)}.pfe-chip__button:active pfe-icon,.pfe-chip__close:active pfe-icon{fill:#004080;fill:var(--pfe-chip__button--BackgroundColor--active,var(--pfe-theme--color--ui-accent--hover,#004080))}:host([on=dark]) .pfe-chip__button:active::after,:host([on=dark]) .pfe-chip__close:active::after{margin:1px}.pfe-chip__button:focus::after,.pfe-chip__close:focus::after{border-width:var(--pfe-chip__button--BorderWidth--focus)}.pfe-chip__button:focus pfe-icon,.pfe-chip__close:focus pfe-icon{fill:#004080;fill:var(--pfe-chip__button--BackgroundColor--focus,var(--pfe-theme--color--ui-accent--hover,#004080))}:host([on=dark]) .pfe-chip__button:focus::after,:host([on=dark]) .pfe-chip__close:focus::after{margin:1px}:host([read-only]){padding:.02344rem .5rem .02344rem .5rem;padding:var(--pfe-chip--Padding,var(--pfe-chip--PaddingTop,var(--pfe-theme--form-spacer,.02344rem)) var(--pfe-chip--PaddingRight,var(--pfe-theme--content-spacer--body--sm,.5rem)) var(--pfe-chip--PaddingBottom,var(--pfe-theme--form-spacer,.02344rem)) var(--pfe-chip--PaddingLeft,var(--pfe-theme--content-spacer--body--sm,.5rem)))}:host([overflow]){padding-left:0;padding-left:var(--pfe-chip--PaddingLeft,0);border-width:0;border-width:var(--pfe-chip--BorderWidth,0);color:#06c;color:var(--pfe-chip--Color,var(--pfe-theme--color--link,#06c))}:host([overflow]) .pfe-chip__button:hover,:host([overflow]) .pfe-chip__close:hover{border-width:1px;border-width:var(--pfe-chip__button--BorderWidth--hover,var(--pfe-theme--ui--border-width,1px));color:#004080;color:var(--pfe-chip--Color,var(--pfe-theme--color--link--hover,#004080))}:host([overflow]) .pfe-chip__button:active,:host([overflow]) .pfe-chip__close:active{border-width:1px;border-width:var(--pfe-chip__button--BorderWidth--active,var(--pfe-theme--ui--border-width,1px));color:#004080;color:var(--pfe-chip--Color,var(--pfe-theme--color--link--hover,#004080))}:host([overflow]) .pfe-chip__button:focus,:host([overflow]) .pfe-chip__close:focus{border-width:1px;border-width:var(--pfe-chip__button--BorderWidth--focus,var(--pfe-theme--ui--border-width,1px));color:#004080;color:var(--pfe-chip--Color,var(--pfe-theme--color--link--hover,#004080))} /*# sourceMappingURL=pfe-chip.min.css.map */</style>
<slot hidden aria-hidden="true"></slot>

${this.overflow ? `<button class="pfe-chip__button" type="button" aria-labelledby="chip">` : ""}
  <span class="pfe-chip__text" id="chip" aria-hidden="true"></span>
  ${this.hasSlot("pfe-chip--badge") ? `<pfe-badge class="pfe-chip__badge">
    <slot name="pfe-chip--badge"></slot>
  </pfe-badge>` : ""}
  ${this.overflow ? `</button>` : ""}

${this.showCloseButton ? `<button class="pfe-chip__close" type="button" aria-labelledby="remove_chip"
  aria-label="Remove" id="remove_chip">
  <pfe-icon icon="fas-times"></pfe-icon>
</button>` : ""}`;
  }

  static get tag() {
    return "pfe-chip";
  }

  static get meta() {
    return {
      title: "Chip",
      description:
        "A chip is used to display items that have been filtered or selected from a larger group. They comprise of a text element and a button component that is used to remove the chip from selection. When the text overflows it is truncated using ellipses."
    };
  }

  get templateUrl() {
    return "pfe-chip.html";
  }

  get styleUrl() {
    return "pfe-chip.scss";
  }

  get showCloseButton() {
    return !this.readOnly && !this.overflow;
  }

  hide() {
    this.setAttribute("hidden", "");
  }

  show() {
    this.removeAttribute("hidden");
  }

  delete() {
    this.parentNode.removeChild(this);
  }

  static get events() {
    return {
      close: `${this.tag}:close`,
      load: `${this.tag}:load`
    };
  }

  static get properties() {
    return {
      readOnly: {
        title: "Read only",
        type: Boolean,
        default: false
      },
      overflow: {
        title: "Overflow",
        type: Number
      },
      badge: {
        title: "Badge",
        type: Number
      }
    };
  }

  static get slots() {
    return {
      default: {
        title: "Default slot",
        type: "array",
        namedSlot: false,
        items: {
          oneOf: [
            {
              $ref: "raw"
            }
          ]
        }
      },
      badge: {
        title: "Badge",
        type: "array",
        namedSlot: true,
        items: {
          title: "Badge item",
          oneOf: [
            {
              $ref: "raw"
            }
          ]
        }
      }
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeChip, { type: PfeChip.PfeType });

    this._text = this.shadowRoot.querySelector(`.${this.tag}__text`);
    this._badge = this.shadowRoot.querySelector(`pfe-badge`);
    this._close = this.shadowRoot.querySelector(`.${this.tag}__close`);
    this._add = this.shadowRoot.querySelector(`.${this.tag}__button`);

    this._init = this._init.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._keyupHandler = this._keyupHandler.bind(this);
    this._badgeObserver = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    this.badge = this.querySelector(`[slot="badge"]`);

    // Add a slotchange listener to the lightDOM trigger
    if (this.badge) {
      this._badgeObserver.observe(this.badge, {
        characterData: true,
        attributes: true,
        subtree: true,
        childList: true
      });
      // this.badge.addEventListener("slotchange", this._init);
    }

    // @TODO load icon using pfe-icon instead of hardcoding SVG
    Promise.all([
      customElements.whenDefined(PfeIcon.tag)
    ]).then(() => {
      // Set up font-awesome icon set
      if(!PfeIcon._iconSets["fas"]) {
        PfeIcon.addIconSet(
          "fas",
          "//unpkg.com/@fortawesome/fontawesome-free@5/svgs/solid",
          (iconName, setName, path) => {
            const name = iconName.replace("fas-", "");
            return `${path}/${name}.svg`;
          }
        );
      }
    });

    this._init();
  }

  _init() {
    // Capture the text content and move it to the Shadow DOM
    if (this.firstChild && this.firstChild.textContent.trim()) {
      this._text.textContent = this.firstChild.textContent.trim();
    } else if (this.firstElementChild && this.firstElementChild.textContent.trim()) {
      this._text.textContent = this.firstElementChild.textContent.trim();
    }

    // If the badge element exists, check that it's value is numeric
    let badgeContent = "";
    if (this.badge) badgeContent = this.badge.textContent;

    if (badgeContent) {
      if (isNaN(badgeContent)) {
        console.warn(`${this.tag}: The badge content must be numeric.`);
      } else {
        this._badge.setAttribute("number", this.badge.textContent);
      }
    }

    // If this is not a read-only chip, attach event listeners
    if (this._close) {
      this._close.addEventListener("click", this._clickHandler);
      this._close.addEventListener("keyup", this._keyupHandler);
    }

    // If this is not a read-only chip, attach event listeners
    if (this._add) {
      this._add.addEventListener("click", this._clickHandler);
      this._add.addEventListener("keyup", this._keyupHandler);
    }
  }

  disconnectedCallback() {
    if (this.badge) {
      this.badge.removeEventListener("slotchange", this._init);
    }

    if (this._close) {
      this._close.removeEventListener("click", this._clickHandler);
      this._close.removeEventListener("keyup", this._keyupHandler);
    }

    if (this._add) {
      this._add.removeEventListener("click", this._clickHandler);
      this._add.removeEventListener("keyup", this._keyupHandler);
    }
  }

  _clickHandler(event) {
    if (!this.overflow) {
      this.emitEvent(PfeChip.events.close);
    } else {
      this.emitEvent(PfeChip.events.load);
    }
  }

  _keyupHandler(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Enter":
      case 13:
        if (!this.overflow) {
          this.emitEvent(PfeChip.events.close);
        } else {
          this.emitEvent(PfeChip.events.load);
        }
    }
  }
}

PFElement.create(PfeChip);

export default PfeChip;
//# sourceMappingURL=pfe-chip.js.map

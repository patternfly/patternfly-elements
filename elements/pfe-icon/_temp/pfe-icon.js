/*!
 * PatternFly Elements: PfeIcon 1.0.0-prerelease.24
 * @license
 * Copyright 2019 Red Hat, Inc.
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

import PFElement from "../pfelement/pfelement.js";
import PfeIconSet from "./icon-set.js";
import { addBuiltIns } from "./builtin-icon-sets.js";

/**
 * Sets the id attribute on the <filter> element and points the CSS `filter` at that id.
 */
function _setRandomFilterId(el) {
  const randomId =
    "filter-" +
    Math.random()
      .toString()
      .slice(2, 10);

  // set the CSS filter property to point at the given id
  el.shadowRoot.querySelector("svg image").style.filter = `url(#${randomId})`;

  // set the id attribute on the SVG filter element to match
  el.shadowRoot.querySelector("svg filter").setAttribute("id", randomId);
}

function _createIconSetHandler(el, setName) {
  return ev => {
    // if the set we're waiting for was added, run updateIcon again
    if (setName === ev.detail.set.name) {
      document.body.removeEventListener(
        PfeIcon.EVENTS.ADD_ICON_SET,
        el._handleAddIconSet
      );
      el.updateIcon();
    }
  };
}

function _iconLoad(el) {
  el.image.classList.remove("load-failed");
}

function _iconLoadError(el) {
  el.image.classList.add("load-failed");
}

class PfeIcon extends PFElement {
  static get version() {
    return "1.0.0-prerelease.24";
  }

  get html() {
    return `<style>:host{--pfe-icon--Spacing:var(--pfe-theme--container-spacer, 1rem);--pfe-icon--Size:var(--pfe-theme--icon-size, 1em);--pfe-icon--Color:var(--pfe-broadcasted--color--text, var(--pfe-theme--color--text, #333));--pfe-icon--BackgroundColor:transparent;--pfe-icon--BorderColor:transparent;display:inline-block;vertical-align:middle;border-radius:50%;background-color:var(--pfe-icon--BackgroundColor);border:var(--pfe-icon--BorderColor);position:relative}:host,:host svg{width:1em;height:1em}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{background-color:#fff!important}:host svg filter feFlood{flood-color:#000!important}}@supports (-ms-accelerator:true){:host{background-color:#fff!important}:host svg filter feFlood{flood-color:#000!important}}@supports (-ms-ime-align:auto){:host{background-color:#fff!important}:host svg filter feFlood{flood-color:#000!important}}:host([data-block]){display:block;margin-bottom:var(--pfe-icon--Spacing);margin-top:var(--pfe-icon--Spacing)}:host([data-block]):first-child{margin-top:0}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host svg image{-webkit-filter:none;filter:none}}:host svg image.load-failed{display:none}:host svg filter feFlood{flood-color:var(--pfe-icon--Color)}:host([size="2x"]),:host([size="2x"]) svg{width:2em;height:2em}:host([size="3x"]),:host([size="3x"]) svg{width:3em;height:3em}:host([size="4x"]),:host([size="4x"]) svg{width:4em;height:4em}:host([size=xl]),:host([size=xl]) svg{width:100px;height:100px}:host([size=lg]),:host([size=lg]) svg{width:64px;height:64px}:host([size=md]),:host([size=md]) svg{width:32px;height:32px}:host([size=sm]),:host([size=sm]) svg{width:14px;height:14px}:host([color=base]){--pfe-broadcasted--color--text:var(--pfe-theme--color--ui-base, #0477a4)}:host([color=complement]){--pfe-broadcasted--color--text:var(--pfe-theme--color--ui-complement, #464646)}:host([color=accent]){--pfe-broadcasted--color--text:var(--pfe-theme--color--ui-accent, #fe460d)}:host([color=critical]){--pfe-broadcasted--color--text:var(--pfe-theme--color--feedback--critical, #bb0000)}:host([color=important]){--pfe-broadcasted--color--text:var(--pfe-theme--color--feedback--important, #d73401)}:host([color=moderate]){--pfe-broadcasted--color--text:var(--pfe-theme--color--feedback--moderate, #ffc024)}:host([color=success]){--pfe-broadcasted--color--text:var(--pfe-theme--color--feedback--success, #2e7d32)}:host([color=info]){--pfe-broadcasted--color--text:var(--pfe-theme--color--feedback--info, #0277bd)}:host([color=default]){--pfe-broadcasted--color--text:var(--pfe-theme--color--feedback--default, #606060)}:host([circled]){--pfe-icon--BackgroundColor:transparent;--pfe-icon--BorderColor:var(--pfe-theme--color--surface--border, #dfdfdf);padding:.05em}:host([circled=base]){--pfe-icon--BackgroundColor:var(--pfe-theme--color--surface--base, #dfdfdf);--pfe-icon--BorderColor:transparent;--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--base--text, #333)}:host([circled=lightest]){--pfe-icon--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-icon--BorderColor:transparent;--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--lightest--text, #333)}:host([circled=light]){--pfe-icon--BackgroundColor:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-icon--BorderColor:transparent;--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--lighter--text, #333)}:host([circled=dark]){--pfe-icon--BackgroundColor:var(--pfe-theme--color--surface--darker, #464646);--pfe-icon--BorderColor:transparent;--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--darker--text, #fff)}:host([circled=darkest]){--pfe-icon--BackgroundColor:var(--pfe-theme--color--surface--darkest, #131313);--pfe-icon--BorderColor:transparent;--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--darkest--text, #fff)}:host([circled=complement]){--pfe-icon--BackgroundColor:var(--pfe-theme--color--surface--complement, #0477a4);--pfe-icon--BorderColor:transparent;--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--complement--text, #fff)}:host([circled=accent]){--pfe-icon--BackgroundColor:var(--pfe-theme--color--surface--accent, #fe460d);--pfe-icon--BorderColor:transparent;--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--accent--text, #fff)}</style><svg xmlns="http://www.w3.org/2000/svg">
  <filter color-interpolation-filters="sRGB" x="0" y="0" height="100%" width="100%">
    <feFlood result="COLOR" />
    <feComposite operator="in" in="COLOR" in2="SourceAlpha" />
  </filter>
  <image xlink:href="" width="100%" height="100%"></image>
</svg>`;
  }

  static get properties() {
    return {"icon":{"title":"Icon","type":"string","enum":[],"prefixed":false},"size":{"title":"Size","type":"string","enum":["default","xl","lg","md","sm","2x","3x","4x"],"default":"default","prefixed":false},"color":{"title":"Color","type":"string","enum":["default","base","compliment","accent","critical","important","moderate","success","info"],"default":"default","prefixed":false}};
  }

  static get slots() {
    return {};
  }
  static get tag() {
    return "pfe-icon";
  }

  get templateUrl() {
    return "pfe-icon.html";
  }

  get styleUrl() {
    return "pfe-icon.scss";
  }

  get schemaUrl() {
    return "pfe-icon.json";
  }

  static get observedAttributes() {
    return ["icon"];
  }

  constructor() {
    super(PfeIcon);

    this.image = this.shadowRoot.querySelector("svg image");
    this.image.addEventListener("load", () => _iconLoad(this));
    this.image.addEventListener("error", () => _iconLoadError(this));
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(...arguments);
    this.updateIcon(newValue);
  }

  updateIcon(iconName = this.getAttribute("icon")) {
    const { setName, set } = PfeIcon.getIconSet(iconName);

    if (set) {
      const iconPath = set.resolveIconName(iconName);
      this.image.setAttribute("xlink:href", iconPath);
      _setRandomFilterId(this);
    } else {
      // the icon set we want doesn't exist (yet?) so start listening for new icon sets
      this._handleAddIconSet = _createIconSetHandler(this, setName);

      document.body.addEventListener(
        PfeIcon.EVENTS.ADD_ICON_SET,
        this._handleAddIconSet
      );
    }
  }

  /**
   * Get an icon set by providing the set's name, _or_ the name of an icon from that set.
   *
   * @param {String} iconName the name of the set, or the name of an icon from that set.
   * @return {PfeIconSet} the icon set
   */
  static getIconSet(iconName) {
    const [setName] = iconName.split("-");
    const set = this._iconSets[setName];
    return { setName, set };
  }

  static addIconSet(name, path, resolveIconName) {
    if (this._iconSets[name]) {
      throw new Error(
        `can't add icon set ${name}; a set with that name already exists.`
      );
    }

    this._iconSets[name] = new PfeIconSet(name, path, resolveIconName);

    document.body.dispatchEvent(
      new CustomEvent(this.EVENTS.ADD_ICON_SET, {
        bubbles: false,
        detail: {
          set: this._iconSets[name]
        }
      })
    );
  }

  static get EVENTS() {
    return {
      ADD_ICON_SET: `${this.tag}:add-icon-set`
    };
  }
}

PfeIcon._iconSets = {};

addBuiltIns(PfeIcon);

PFElement.create(PfeIcon);

export default PfeIcon;

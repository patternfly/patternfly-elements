import PFElement from '../../pfelement/dist/pfelement.js';

class PfeIconSet {
  /**
   * Run the icon set's name resolver to turn an icon name into an icon path, id, etc.
   */
  resolveIconName(iconName) {
    return this._resolveIconName(iconName, this.name, this.path);
  }

  /**
   * Create a new icon set.  Icon sets have a name (ie, a namespace).  For
   * example, an icon with a name of "rh-logo" represents a "logo" icon from the
   * "rh" set.  Icon set names are always separated from the rest of the icon
   * name with a hyphen `-`.  This means that set names cannot contain a hyphen.
   *
   * @param {String} name the namespace of the icon set
   * @param {String} path the web-accessible path to the icon set (for instance, a CDN)
   * @param {Function} resolveIconName an optional function to combine the path and an icon name into a final path.  The function will be passed the namespaced icon name (for example, "rh-api" where rh is the namespace and api is the individual icon's name)
   * @returns {Object} an object with the status of the icon set installation, such as `{ result: true, text: 'icon set installed' }` or `{ result: false, text: 'icon set is already installed' }`
   */
  constructor(name, path, resolveIconName) {
    this.name = name;
    this.path = path;
    this._resolveIconName = resolveIconName;
  }
}

/**
 * An 'init' function to add the PFE built-in icon sets to the current page.
 */
function addBuiltIns(PfeIcon) {
  [
    {
      name: "web",
      path: "https://access.redhat.com/webassets/avalon/j/lib/rh-iconfont-svgs"
    },
    {
      name: "rh",
      path: "https://access.redhat.com/webassets/avalon/j/lib/rh-iconfont-svgs"
    }
  ].forEach(set =>
    PfeIcon.addIconSet(set.name, set.path, (name, iconSetName, iconSetPath) => {
      const regex = new RegExp(`^${iconSetName}(-icon)?-(.*)`);
      const [, , iconName] = regex.exec(name);

      const iconId = `${iconSetName}-icon-${iconName}`;
      const iconPath = `${iconSetPath}/${iconId}.svg`;

      return iconPath;
    })
  );
}

/*!
 * PatternFly Elements: PfeIcon 1.0.0-prerelease.55
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

class PfeIcon extends PFElement {
  static get version() {
    return "1.0.0-prerelease.55";
  }

  get html() {
    return `<style>@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#151515!important}}:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, #fafafa);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, #fafafa);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #8476d1);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-saturated, underline);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-saturated, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-saturated, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-saturated, underline)}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}:host{--theme:var(--pfe-icon--theme, light);position:relative;display:inline-block;max-width:calc(1em + 0 * 2);max-width:calc(var(--pfe-icon--size,var(--pfe-theme--icon-size,1em)) + var(--pfe-icon--Padding,0) * 2);width:-webkit-fit-content!important;width:-moz-fit-content!important;width:fit-content!important;max-height:calc(1em + 0 * 2);max-height:calc(var(--pfe-icon--size,var(--pfe-theme--icon-size,1em)) + var(--pfe-icon--Padding,0) * 2);height:-webkit-fit-content!important;height:-moz-fit-content!important;height:fit-content!important;line-height:0}:host([data-block]){display:block;margin-bottom:16px;margin-bottom:var(--pfe-icon--spacing,var(--pfe-theme--container-spacer,16px));margin-top:16px;margin-top:var(--pfe-icon--spacing,var(--pfe-theme--container-spacer,16px))}:host([data-block]):first-child{margin-top:0}:host svg{width:1em;width:var(--pfe-icon--size,var(--pfe-theme--icon-size,1em));height:1em;height:var(--pfe-icon--size,var(--pfe-theme--icon-size,1em))}:host(:not(.load-failed)){vertical-align:middle;border-radius:50%;background-color:transparent;background-color:var(--pfe-icon--BackgroundColor,transparent);border:0 solid transparent;border:var(--pfe-icon--BorderWidth,0) var(--pfe-theme--ui--border-style,solid) var(--pfe-icon--BorderColor,var(--pfe-icon--color,transparent));padding:0;padding:var(--pfe-icon--Padding,0)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host(:not(.load-failed)){background-color:#fff!important}:host(:not(.load-failed)) svg filter feFlood{flood-color:#000!important}}@supports (-ms-accelerator:true){:host(:not(.load-failed)){background-color:#fff!important}:host(:not(.load-failed)) svg filter feFlood{flood-color:#000!important}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host(:not(.load-failed)) svg image{-webkit-filter:none;filter:none}}:host(:not(.load-failed)) filter feFlood{flood-color:#3c3f42;flood-color:var(--pfe-icon--Color,var(--pfe-icon--color,var(--pfe-broadcasted--text,#3c3f42)))}:host(:not(.load-failed)) .pfe-icon--fallback{display:none}:host([pfe-size="2x"]){--pfe-icon--size:2em}:host([pfe-size="3x"]){--pfe-icon--size:3em}:host([pfe-size="4x"]){--pfe-icon--size:4em}:host([pfe-size=xl]){--pfe-icon--size:100px}:host([pfe-size=lg]){--pfe-icon--size:64px}:host([pfe-size=md]){--pfe-icon--size:32px}:host([pfe-size=sm]){--pfe-icon--size:14px}:host([pfe-color=critical]){--pfe-icon--color:var(--pfe-theme--color--feedback--critical, #bb0000);--pfe-icon--theme:dark}:host([pfe-color=important]){--pfe-icon--color:var(--pfe-theme--color--feedback--important, #d73401);--pfe-icon--theme:dark}:host([pfe-color=moderate]){--pfe-icon--color:var(--pfe-theme--color--feedback--moderate, #ffc024)}:host([pfe-color=success]){--pfe-icon--color:var(--pfe-theme--color--feedback--success, #2e7d32);--pfe-icon--theme:dark}:host([pfe-color=info]){--pfe-icon--color:var(--pfe-theme--color--feedback--info, #0277bd);--pfe-icon--theme:dark}:host([pfe-color=default]){--pfe-icon--color:var(--pfe-theme--color--feedback--default, #4f5255);--pfe-icon--theme:dark}:host([pfe-color=lightest]){--pfe-icon--color:var(--pfe-theme--color--surface--lightest, #fff);--pfe-icon--theme:light}:host([pfe-color=base]){--pfe-icon--color:var(--pfe-theme--color--surface--base, #f0f0f0);--pfe-icon--theme:light}:host([pfe-color=darker]){--pfe-icon--color:var(--pfe-theme--color--surface--darker, #3c3f42);--pfe-icon--theme:dark}:host([pfe-color=darkest]){--pfe-icon--color:var(--pfe-theme--color--surface--darkest, #151515);--pfe-icon--theme:dark}:host([pfe-color=complement]){--pfe-icon--color:var(--pfe-theme--color--surface--complement, #002952);--pfe-icon--theme:saturated}:host([pfe-color=accent]){--pfe-icon--color:var(--pfe-theme--color--surface--accent, #004080);--pfe-icon--theme:saturated}:host([pfe-circled]:not([pfe-circled=false])){--pfe-icon--BackgroundColor:var(--pfe-icon--color, var(--pfe-theme--color--surface--lightest, #fff));--pfe-icon--Color:var(--pfe-broadcasted--text, #3c3f42);--pfe-icon--Padding:0.5em;--pfe-icon--BorderWidth:var(--pfe-theme--ui--border-width, 1px);--pfe-icon--BorderColor:var(--pfe-icon--color, var(--pfe-theme--color--surface--border, #d2d2d2))}:host(.load-failed) svg image{display:none}:host(.load-failed.has-fallback) svg,:host(.load-failed[on-fail=collapse]) svg{display:none}:host(.load-failed[on-fail=collapse]){--pfe-icon--size:0}
/*# sourceMappingURL=pfe-icon.min.css.map */
</style><div class="pfe-icon--fallback">
  <slot></slot>
</div>
<svg xmlns="http://www.w3.org/2000/svg">
  <filter color-interpolation-filters="sRGB" x="0" y="0" height="100%" width="100%">
    <feFlood result="COLOR" />
    <feComposite operator="in" in="COLOR" in2="SourceAlpha" />
  </filter>
  <image xlink:href="" width="100%" height="100%"></image>
</svg>`;
  }

  static get properties() {
    return {"icon":{"title":"Icon","type":"string","prefixed":false},"size":{"title":"Size","type":"string","enum":["xl","lg","md","sm","2x","3x","4x"],"prefixed":true},"color":{"title":"Color","type":"string","enum":["complement","accent","lightest","base","darker","darkest","critical","important","moderate","success","info"],"prefixed":true},"circled":{"title":"Circled","type":"boolean","default":false,"prefixed":true}};
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

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get EVENTS() {
    return {
      ADD_ICON_SET: `${this.tag}:add-icon-set`
    };
  }

  get upgraded() {
    return this.image.hasAttribute("xlink:href");
  }

  get has_fallback() {
    return this.children.length > 0 || this.innerText.length > 0;
  }

  static get observedAttributes() {
    return ["icon", "on-fail", "pfe-circled", "pfe-color"];
  }

  _iconLoad() {
    this.classList.remove("load-failed");
  }

  _iconLoadError() {
    this.classList.add("load-failed");
    if (this.has_fallback) {
      this.classList.add("has-fallback");
    }
  }

  constructor() {
    super(PfeIcon, { type: PfeIcon.PfeType });

    this._iconLoad = this._iconLoad.bind(this);
    this._iconLoadError = this._iconLoadError.bind(this);

    this.image = this.shadowRoot.querySelector("svg image");
    if (this.image) {
      this.image.addEventListener("load", this._iconLoad);
      this.image.addEventListener("error", this._iconLoadError);
    }

    // Attach a listener for the registration of an icon set
    // Leaving this attached allows for the registered set to be updated
    document.body.addEventListener(PfeIcon.EVENTS.ADD_ICON_SET, () =>
      this.updateIcon()
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.image) {
      this.image.removeEventListener("load", this._iconLoad);
      this.image.removeEventListener("error", this._iconLoadError);
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(...arguments);
    this.updateIcon(newValue);
    this.context_update();
  }

  updateIcon(iconName = this.getAttribute("icon")) {
    const { set } = PfeIcon.getIconSet(iconName);
    if (set) {
      const iconPath = set.resolveIconName(iconName);
      this.image.setAttribute("xlink:href", iconPath);
      _setRandomFilterId(this);
    }
  }

  /**
   * Get an icon set by providing the set's name, _or_ the name of an icon from that set.
   *
   * @param {String} iconName the name of the set, or the name of an icon from that set.
   * @return {PfeIconSet} the icon set
   */
  static getIconSet(iconName) {
    let set;
    if (iconName) {
      const [setName] = iconName.split("-");
      set = this._iconSets[setName];
    }
    return { set };
  }

  static addIconSet(name, path, resolveIconName) {
    let resolveFunction;

    if (typeof resolveIconName === "function") {
      resolveFunction = resolveIconName;
    } else if (
      typeof resolveIconName === "undefined" &&
      this._iconSets[name] &&
      typeof this._iconSets[name]._resolveIconName === "function"
    ) {
      resolveFunction = this._iconSets[name]._resolveIconName;
    } else if (
      typeof resolveIconName !== "function" &&
      typeof resolveIconName !== "undefined"
    ) {
      console.warn(
        `${this.tag}: The third input to addIconSet should be a function that parses and returns the icon's filename.`
      );
    } else {
      console.warn(
        `${this.tag}: The set ${name} needs a resolve function for the icon names.`
      );
    }

    // Register the icon set and set up the event indicating the change
    this._iconSets[name] = new PfeIconSet(name, path, resolveFunction);

    document.body.dispatchEvent(
      new CustomEvent(this.EVENTS.ADD_ICON_SET, {
        bubbles: false,
        detail: {
          set: this._iconSets[name]
        }
      })
    );
  }
}

PfeIcon._iconSets = {};

addBuiltIns(PfeIcon);

PFElement.create(PfeIcon);

export default PfeIcon;
//# sourceMappingURL=pfe-icon.js.map

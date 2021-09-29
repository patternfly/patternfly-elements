import PFElement from '../../pfelement/dist/pfelement.js';

// @POLYFILL  window.CustomEvent
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function () {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: null };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  window.CustomEvent = CustomEvent;
})();

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
function addBuiltIns({ PfeIcon, config }) {
  // If the user wants to completely opt out of default icon sets,
  // allow them to.
  if (config.IconSets && config.IconSets.length === 0) {
    return;
  }

  // If the user provides their own icon sets, use them. If not, use our defaults.
  // @TODO: Switch from access.redhat.com to another icon set.
  const iconSets = config.IconSets || [
    {
      name: "web",
      path: "https://access.redhat.com/webassets/avalon/j/lib/rh-iconfont-svgs",
    },
    {
      name: "rh",
      path: "https://access.redhat.com/webassets/avalon/j/lib/rh-iconfont-svgs",
    },
  ];

  let resolveDefaultIconName = (name, iconSetName, iconSetPath) => {
    const regex = new RegExp(`^${iconSetName}(-icon)?-(.*)`);
    const [, , iconName] = regex.exec(name);

    const iconId = `${iconSetName}-icon-${iconName}`;
    const iconPath = `${iconSetPath}/${iconId}.svg`;

    return iconPath;
  };

  // Register the icon sets.
  iconSets.forEach((set) => {
    // If there's a `resolveIconName` function provided, use it. If not, fall back
    // to the `resolveDefaultIconName` function.
    if (set.resolveIconName && typeof set.resolveIconName === "function") {
      resolveDefaultIconName = set.resolveIconName;
    }

    PfeIcon.addIconSet(set.name, set.path, resolveDefaultIconName);
  });
}

/*!
 * PatternFly Elements: PfeIcon 1.11.2
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

/**
 * Sets the id attribute on the <filter> element and points the CSS `filter` at that id.
 */

function _setRandomFilterId(el) {
  const randomId = "filter-" + Math.random().toString().slice(2, 10);

  // set the CSS filter property to point at the given id
  el.shadowRoot.querySelector("svg image").style.filter = `url(#${randomId})`;

  // set the id attribute on the SVG filter element to match
  el.shadowRoot.querySelector("svg filter").setAttribute("id", randomId);
}

class PfeIcon extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.11.2";
  }

  // Injected at build-time
  get html() {
    return `
<style>@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#151515!important}}:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted--on-dark, #d2d2d2);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted--on-saturated, #d2d2d2);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, #fafafa);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, #fafafa);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #d2d2d2);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-saturated, underline);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-saturated, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-saturated, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-saturated, underline)}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted, #6a6e73);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}:host{--context:var(--pfe-icon--context, light);position:relative;display:inline-block;-webkit-box-sizing:content-box!important;box-sizing:content-box!important;width:-webkit-fit-content!important;width:-moz-fit-content!important;width:fit-content!important;height:-webkit-fit-content!important;height:-moz-fit-content!important;height:fit-content!important;line-height:0;max-width:1em;max-width:var(--pfe-icon--size,var(--pfe-theme--icon-size,1em));max-height:1em;max-height:var(--pfe-icon--size,var(--pfe-theme--icon-size,1em))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{width:1em!important;width:var(--pfe-theme--icon-size,1em)!important;height:1em!important;height:var(--pfe-theme--icon-size,1em)!important}}:host svg{width:1em;width:var(--pfe-icon--size,var(--pfe-theme--icon-size,1em));height:1em;height:var(--pfe-icon--size,var(--pfe-theme--icon-size,1em))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host svg{width:1em!important;width:var(--pfe-theme--icon-size,1em)!important;height:1em!important;height:var(--pfe-theme--icon-size,1em)!important}}:host([block]){display:block;margin-bottom:1rem;margin-bottom:var(--pfe-icon--spacing,var(--pfe-theme--container-spacer,1rem));margin-top:1rem;margin-top:var(--pfe-icon--spacing,var(--pfe-theme--container-spacer,1rem))}:host([block]):first-child{margin-top:0}:host(:not(.load-failed)){vertical-align:middle;border-radius:50%;background-color:transparent;background-color:var(--pfe-icon--BackgroundColor,transparent);border:1px solid transparent;border:var(--pfe-icon--BorderWidth,var(--pfe-theme--ui--border-width,1px)) var(--pfe-theme--ui--border-style,solid) var(--pfe-icon--BorderColor,var(--pfe-icon--BackgroundColor,transparent));padding:0;padding:var(--pfe-icon--Padding,0)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host(:not(.load-failed)){background-color:#fff!important}:host(:not(.load-failed)) svg filter feFlood{flood-color:#000!important}}@supports (-ms-accelerator:true){:host(:not(.load-failed)){background-color:#fff!important}:host(:not(.load-failed)) svg filter feFlood{flood-color:#000!important}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host(:not(.load-failed)) svg image{-webkit-filter:none;filter:none}}:host(:not(.load-failed)) filter feFlood{flood-color:#3c3f42;flood-color:var(--pfe-icon--color,var(--pfe-icon--Color,var(--pfe-broadcasted--text,#3c3f42)))}:host(:not(.load-failed)) .pfe-icon--fallback{display:none}:host([size="2x"]){max-width:2em;max-width:var(--pfe-icon--size,2em);max-height:2em;max-height:var(--pfe-icon--size,2em)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([size="2x"]){width:2em!important;height:2em!important}}:host([size="2x"]) svg{width:2em;width:var(--pfe-icon--size,2em);height:2em;height:var(--pfe-icon--size,2em)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([size="2x"]) svg{width:2em!important;height:2em!important}}:host([size="3x"]){max-width:3em;max-width:var(--pfe-icon--size,3em);max-height:3em;max-height:var(--pfe-icon--size,3em)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([size="3x"]){width:3em!important;height:3em!important}}:host([size="3x"]) svg{width:3em;width:var(--pfe-icon--size,3em);height:3em;height:var(--pfe-icon--size,3em)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([size="3x"]) svg{width:3em!important;height:3em!important}}:host([size="4x"]){max-width:4em;max-width:var(--pfe-icon--size,4em);max-height:4em;max-height:var(--pfe-icon--size,4em)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([size="4x"]){width:4em!important;height:4em!important}}:host([size="4x"]) svg{width:4em;width:var(--pfe-icon--size,4em);height:4em;height:var(--pfe-icon--size,4em)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([size="4x"]) svg{width:4em!important;height:4em!important}}:host([size=xl]){max-width:100px;max-width:var(--pfe-icon--size,100px);max-height:100px;max-height:var(--pfe-icon--size,100px)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([size=xl]){width:100px!important;height:100px!important}}:host([size=xl]) svg{width:100px;width:var(--pfe-icon--size,100px);height:100px;height:var(--pfe-icon--size,100px)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([size=xl]) svg{width:100px!important;height:100px!important}}:host([size=lg]){max-width:64px;max-width:var(--pfe-icon--size,64px);max-height:64px;max-height:var(--pfe-icon--size,64px)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([size=lg]){width:64px!important;height:64px!important}}:host([size=lg]) svg{width:64px;width:var(--pfe-icon--size,64px);height:64px;height:var(--pfe-icon--size,64px)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([size=lg]) svg{width:64px!important;height:64px!important}}:host([size=md]){max-width:32px;max-width:var(--pfe-icon--size,32px);max-height:32px;max-height:var(--pfe-icon--size,32px)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([size=md]){width:32px!important;height:32px!important}}:host([size=md]) svg{width:32px;width:var(--pfe-icon--size,32px);height:32px;height:var(--pfe-icon--size,32px)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([size=md]) svg{width:32px!important;height:32px!important}}:host([size=sm]){max-width:14px;max-width:var(--pfe-icon--size,14px);max-height:14px;max-height:var(--pfe-icon--size,14px)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([size=sm]){width:14px!important;height:14px!important}}:host([size=sm]) svg{width:14px;width:var(--pfe-icon--size,14px);height:14px;height:var(--pfe-icon--size,14px)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([size=sm]) svg{width:14px!important;height:14px!important}}:host([circled]:not([circled=false])){padding:.5em;padding:var(--pfe-icon--Padding,.5em);background-color:#fff;background-color:var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));border-color:#d2d2d2;border-color:var(--pfe-icon--BorderColor,var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--surface--border,#d2d2d2)))}:host([color=critical]:not([circled])) filter feFlood,:host([color=critical][circled=false]) filter feFlood{flood-color:#a30000;flood-color:var(--pfe-icon--color,var(--pfe-icon--Color,var(--pfe-theme--color--feedback--critical,#a30000)))}:host([color=critical][circled]:not([circled=false])){background-color:#a30000;background-color:var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--feedback--critical,#a30000));border-color:#a30000;border-color:var(--pfe-icon--BorderColor,var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--feedback--critical,#a30000)));--pfe-icon--context:dark}:host([color=important]:not([circled])) filter feFlood,:host([color=important][circled=false]) filter feFlood{flood-color:#c9190b;flood-color:var(--pfe-icon--color,var(--pfe-icon--Color,var(--pfe-theme--color--feedback--important,#c9190b)))}:host([color=important][circled]:not([circled=false])){background-color:#c9190b;background-color:var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--feedback--important,#c9190b));border-color:#c9190b;border-color:var(--pfe-icon--BorderColor,var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--feedback--important,#c9190b)));--pfe-icon--context:dark}:host([color=moderate]:not([circled])) filter feFlood,:host([color=moderate][circled=false]) filter feFlood{flood-color:#f0ab00;flood-color:var(--pfe-icon--color,var(--pfe-icon--Color,var(--pfe-theme--color--feedback--moderate,#f0ab00)))}:host([color=moderate][circled]:not([circled=false])){background-color:#f0ab00;background-color:var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--feedback--moderate,#f0ab00));border-color:#f0ab00;border-color:var(--pfe-icon--BorderColor,var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--feedback--moderate,#f0ab00)))}:host([color=success]:not([circled])) filter feFlood,:host([color=success][circled=false]) filter feFlood{flood-color:#3e8635;flood-color:var(--pfe-icon--color,var(--pfe-icon--Color,var(--pfe-theme--color--feedback--success,#3e8635)))}:host([color=success][circled]:not([circled=false])){background-color:#3e8635;background-color:var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--feedback--success,#3e8635));border-color:#3e8635;border-color:var(--pfe-icon--BorderColor,var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--feedback--success,#3e8635)));--pfe-icon--context:dark}:host([color=info]:not([circled])) filter feFlood,:host([color=info][circled=false]) filter feFlood{flood-color:#06c;flood-color:var(--pfe-icon--color,var(--pfe-icon--Color,var(--pfe-theme--color--feedback--info,#06c)))}:host([color=info][circled]:not([circled=false])){background-color:#06c;background-color:var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--feedback--info,#06c));border-color:#06c;border-color:var(--pfe-icon--BorderColor,var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--feedback--info,#06c)));--pfe-icon--context:dark}:host([color=default]:not([circled])) filter feFlood,:host([color=default][circled=false]) filter feFlood{flood-color:#4f5255;flood-color:var(--pfe-icon--color,var(--pfe-icon--Color,var(--pfe-theme--color--feedback--default,#4f5255)))}:host([color=default][circled]:not([circled=false])){background-color:#4f5255;background-color:var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--feedback--default,#4f5255));border-color:#4f5255;border-color:var(--pfe-icon--BorderColor,var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--feedback--default,#4f5255)));--pfe-icon--context:dark}:host([color=lightest]:not([circled])) filter feFlood,:host([color=lightest][circled=false]) filter feFlood{flood-color:#fff;flood-color:var(--pfe-icon--color,var(--pfe-icon--Color,var(--pfe-theme--color--surface--lightest,#fff)))}:host([color=lightest][circled]:not([circled=false])){--pfe-icon--context:var(--pfe-theme--color--surface--lightest--context, light);background-color:#fff;background-color:var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));border-color:#fff;border-color:var(--pfe-icon--BorderColor,var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff)))}:host([color=base]:not([circled])) filter feFlood,:host([color=base][circled=false]) filter feFlood{flood-color:#f0f0f0;flood-color:var(--pfe-icon--color,var(--pfe-icon--Color,var(--pfe-theme--color--surface--base,#f0f0f0)))}:host([color=base][circled]:not([circled=false])){--pfe-icon--context:var(--pfe-theme--color--surface--base--context, light);background-color:#f0f0f0;background-color:var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--surface--base,#f0f0f0));border-color:#f0f0f0;border-color:var(--pfe-icon--BorderColor,var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--surface--base,#f0f0f0)))}:host([color=darker]:not([circled])) filter feFlood,:host([color=darker][circled=false]) filter feFlood{flood-color:#3c3f42;flood-color:var(--pfe-icon--color,var(--pfe-icon--Color,var(--pfe-theme--color--surface--darker,#3c3f42)))}:host([color=darker][circled]:not([circled=false])){--pfe-icon--context:var(--pfe-theme--color--surface--darker--context, dark);background-color:#3c3f42;background-color:var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--surface--darker,#3c3f42));border-color:#3c3f42;border-color:var(--pfe-icon--BorderColor,var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--surface--darker,#3c3f42)))}:host([color=darkest]:not([circled])) filter feFlood,:host([color=darkest][circled=false]) filter feFlood{flood-color:#151515;flood-color:var(--pfe-icon--color,var(--pfe-icon--Color,var(--pfe-theme--color--surface--darkest,#151515)))}:host([color=darkest][circled]:not([circled=false])){--pfe-icon--context:var(--pfe-theme--color--surface--darkest--context, dark);background-color:#151515;background-color:var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--surface--darkest,#151515));border-color:#151515;border-color:var(--pfe-icon--BorderColor,var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--surface--darkest,#151515)))}:host([color=complement]:not([circled])) filter feFlood,:host([color=complement][circled=false]) filter feFlood{flood-color:#002952;flood-color:var(--pfe-icon--color,var(--pfe-icon--Color,var(--pfe-theme--color--surface--complement,#002952)))}:host([color=complement][circled]:not([circled=false])){--pfe-icon--context:var(--pfe-theme--color--surface--complement--context, saturated);background-color:#002952;background-color:var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--surface--complement,#002952));border-color:#002952;border-color:var(--pfe-icon--BorderColor,var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--surface--complement,#002952)))}:host([color=accent]:not([circled])) filter feFlood,:host([color=accent][circled=false]) filter feFlood{flood-color:#004080;flood-color:var(--pfe-icon--color,var(--pfe-icon--Color,var(--pfe-theme--color--surface--accent,#004080)))}:host([color=accent][circled]:not([circled=false])){--pfe-icon--context:var(--pfe-theme--color--surface--accent--context, saturated);background-color:#004080;background-color:var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--surface--accent,#004080));border-color:#004080;border-color:var(--pfe-icon--BorderColor,var(--pfe-icon--BackgroundColor,var(--pfe-theme--color--surface--accent,#004080)))}:host(.load-failed) svg image,:host(.load-failed.has-fallback) svg,:host(.load-failed[on-fail=collapse]) svg{display:none}:host(.load-failed[on-fail=collapse]){max-width:0;max-width:var(--pfe-icon--size,0);max-height:0;max-height:var(--pfe-icon--size,0)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host(.load-failed[on-fail=collapse]){width:0!important;height:0!important}}:host(.load-failed[on-fail=collapse]) svg{width:0;width:var(--pfe-icon--size,0);height:0;height:var(--pfe-icon--size,0)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host(.load-failed[on-fail=collapse]) svg{width:0!important;height:0!important}} /*# sourceMappingURL=pfe-icon.min.css.map */</style>
<div class="pfe-icon--fallback">
  <slot></slot>
</div>
<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
  <filter color-interpolation-filters="sRGB" x="0" y="0" height="100%" width="100%">
    <feFlood result="COLOR" />
    <feComposite operator="in" in="COLOR" in2="SourceAlpha" />
  </filter>
  <image xlink:href="" width="100%" height="100%"></image>
</svg>`;
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

  static get properties() {
    return {
      icon: {
        type: String,
        observer: "updateIcon",
        prefix: false,
      },
      size: {
        type: String,
        values: ["xl", "lg", "md", "sm", "1x", "2x", "3x", "4x"],
        default: "1x",
      },
      color: {
        type: String,
        values: [
          "complement",
          "accent",
          "lightest",
          "base",
          "darker",
          "darkest",
          "critical",
          "important",
          "moderate",
          "success",
          "info",
        ],
        observer: "_colorChanged",
      },
      onFail: {
        type: String,
        values: ["collapse"],
      },
      circled: {
        type: Boolean,
      },
      block: {
        type: Boolean,
      },

      // TODO: Deprecated for 1.0
      oldColor: {
        type: String,
        alias: "color",
        attr: "pfe-color",
      },
      // TODO: Deprecated for 1.0
      oldSize: {
        type: String,
        alias: "size",
        attr: "pfe-size",
      },
      // TODO: Deprecated for 1.0
      oldCircled: {
        type: Boolean,
        alias: "circled",
        attr: "pfe-circled",
      },
      // TODO: Deprecated for 1.0
      oldBlock: {
        type: Boolean,
        alias: "block",
        attr: "data-block",
      },
    };
  }

  static get EVENTS() {
    return {
      ADD_ICON_SET: `${this.tag}:add-icon-set`,
    };
  }

  get upgraded() {
    return this.image.hasAttribute("xlink:href");
  }

  _iconLoad() {
    this.classList.remove("load-failed");
  }

  _iconLoadError(e) {
    this.classList.add("load-failed");
    if (this.hasLightDOM()) this.classList.add("has-fallback");
  }

  _colorChanged() {
    // Update the context
    this.resetContext();
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
    document.body.addEventListener(PfeIcon.EVENTS.ADD_ICON_SET, () => this.updateIcon());
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.image) {
      this.image.removeEventListener("load", this._iconLoad);
      this.image.removeEventListener("error", this._iconLoadError);
    }
  }

  updateIcon() {
    const { set } = PfeIcon.getIconSet(this.icon);
    if (set) {
      const iconPath = set.resolveIconName(this.icon);
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
    } else if (typeof resolveIconName !== "function" && typeof resolveIconName !== "undefined") {
      PfeIcon.warn(
        `[${this.tag}]: The third input to addIconSet should be a function that parses and returns the icon's filename.`
      );
    } else {
      PfeIcon.warn(`[${this.tag}]: The set ${name} needs a resolve function for the icon names.`);
    }

    // Register the icon set and set up the event indicating the change
    this._iconSets[name] = new PfeIconSet(name, path, resolveFunction);

    document.body.dispatchEvent(
      new CustomEvent(this.EVENTS.ADD_ICON_SET, {
        bubbles: false,
        detail: {
          set: this._iconSets[name],
        },
      })
    );
  }
}

PfeIcon._iconSets = {};

// Allow the user to supply their own icon sets via config.
// See more in the pfe-icon README.md.
const config = PFElement.config;

addBuiltIns({ PfeIcon, config });

PFElement.create(PfeIcon);

export default PfeIcon;
//# sourceMappingURL=pfe-icon.js.map

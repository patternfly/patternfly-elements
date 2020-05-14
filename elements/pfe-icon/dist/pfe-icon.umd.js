(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global.PfeIcon = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && PFElement.hasOwnProperty('default') ? PFElement['default'] : PFElement;

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var PfeIconSet = function () {
    createClass(PfeIconSet, [{
      key: "resolveIconName",

      /**
       * Run the icon set's name resolver to turn an icon name into an icon path, id, etc.
       */
      value: function resolveIconName(iconName) {
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

    }]);

    function PfeIconSet(name, path, resolveIconName) {
      classCallCheck(this, PfeIconSet);

      this.name = name;
      this.path = path;
      this._resolveIconName = resolveIconName;
    }

    return PfeIconSet;
  }();

  /**
   * An icon name resolver for the PFE built-in icon sets.
   */
  function resolveIconName(name, iconSetName, iconSetPath) {
    var _$exec = /^([^-]+)-(.*)/.exec(name),
        _$exec2 = slicedToArray(_$exec, 3),
        iconName = _$exec2[2];

    var iconId = iconSetName + "-icon-" + iconName;
    var iconPath = iconSetPath + "/" + iconId + ".svg";

    return iconPath;
  }

  /**
   * An 'init' function to add the PFE built-in icon sets to the current page.
   */
  function addBuiltIns(PfeIcon) {
    [{
      name: "web",
      path: "https://access.redhat.com/webassets/avalon/j/lib/rh-iconfont-svgs"
    }, {
      name: "rh",
      path: "https://access.redhat.com/webassets/avalon/j/lib/rh-iconfont-svgs"
    }].forEach(function (set$$1) {
      return PfeIcon.addIconSet(set$$1.name, set$$1.path, resolveIconName);
    });
  }

  /*!
   * PatternFly Elements: PfeIcon 1.0.0-prerelease.45
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
    var randomId = "filter-" + Math.random().toString().slice(2, 10);

    // set the CSS filter property to point at the given id
    el.shadowRoot.querySelector("svg image").style.filter = "url(#" + randomId + ")";

    // set the id attribute on the SVG filter element to match
    el.shadowRoot.querySelector("svg filter").setAttribute("id", randomId);
  }

  function _createIconSetHandler(el, setName) {
    return function (ev) {
      // if the set we're waiting for was added, run updateIcon again
      if (setName === ev.detail.set.name) {
        document.body.removeEventListener(PfeIcon.EVENTS.ADD_ICON_SET, el._handleAddIconSet);
        el.updateIcon();
      }
    };
  }

  function _iconLoad(el) {
    el.classList.remove("load-failed");
  }

  function _iconLoadError(el) {
    el.classList.add("load-failed");
    if (el.has_fallback) {
      el.classList.add("has-fallback");
    }
  }

  var PfeIcon = function (_PFElement) {
    inherits(PfeIcon, _PFElement);
    createClass(PfeIcon, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #99ccff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #cce6ff);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #cce6ff);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #b38cd9);--pfe-broadcasted--link-decoration:none;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:none}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#333!important;color:var(--pfe-theme--color--text,#333)!important}}:host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, white);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, white);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #b38cd9);--pfe-broadcasted--link-decoration:underline;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:underline}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#333!important;color:var(--pfe-theme--color--text,#333)!important}}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #333);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #003366);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #003366);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, rebeccapurple);--pfe-broadcasted--link-decoration:none;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:none}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#333!important;color:var(--pfe-theme--color--text,#333)!important}}:host{--pfe-icon--Spacing:var(--pfe-theme--container-spacer, 16px);--pfe-icon--Size:var(--pfe-theme--icon-size, 1em);--pfe-icon--Padding:0;--pfe-icon--Color:var(--pfe-broadcasted--text, #333);--pfe-icon--BackgroundColor:transparent;--pfe-icon--BorderColor:transparent;position:relative;display:inline-block;max-width:calc(var(--pfe-icon--Size) + (var(--pfe-icon--Padding) * 2));width:-webkit-fit-content!important;width:-moz-fit-content!important;width:fit-content!important;max-height:calc(var(--pfe-icon--Size) + (var(--pfe-icon--Padding) * 2));height:-webkit-fit-content!important;height:-moz-fit-content!important;height:fit-content!important;line-height:0}:host([data-block]){display:block;margin-bottom:var(--pfe-icon--Spacing);margin-top:var(--pfe-icon--Spacing)}:host([data-block]):first-child{margin-top:0}:host svg{width:var(--pfe-icon--Size);height:var(--pfe-icon--Size)}:host(:not(.load-failed)){vertical-align:middle;border-radius:50%;background-color:transparent;background-color:var(--pfe-icon--BackgroundColor,transparent);border:1px solid transparent;border:var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-icon--BorderColor,transparent);padding:0;padding:var(--pfe-icon--Padding,0)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host(:not(.load-failed)){background-color:#fff!important}:host(:not(.load-failed)) svg filter feFlood{flood-color:#000!important}}@supports (-ms-accelerator:true){:host(:not(.load-failed)){background-color:#fff!important}:host(:not(.load-failed)) svg filter feFlood{flood-color:#000!important}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host(:not(.load-failed)) svg image{-webkit-filter:none;filter:none}}:host(:not(.load-failed)) filter feFlood{flood-color:var(--pfe-icon--Color)}:host(:not(.load-failed)) .pfe-icon--fallback{display:none}:host([size=\"2x\"]){--pfe-icon--Size:2em}:host([size=\"3x\"]){--pfe-icon--Size:3em}:host([size=\"4x\"]){--pfe-icon--Size:4em}:host([size=xl]){--pfe-icon--Size:100px}:host([size=lg]){--pfe-icon--Size:64px}:host([size=md]){--pfe-icon--Size:32px}:host([size=sm]){--pfe-icon--Size:14px}:host([color=base]){--pfe-broadcasted--text:var(--pfe-theme--color--ui-base, #0477a4)}:host([color=complement]){--pfe-broadcasted--text:var(--pfe-theme--color--ui-complement, #464646)}:host([color=accent]){--pfe-broadcasted--text:var(--pfe-theme--color--ui-accent, #e00)}:host([color=critical]){--pfe-broadcasted--text:feedback--critical}:host([color=important]){--pfe-broadcasted--text:feedback--important}:host([color=moderate]){--pfe-broadcasted--text:feedback--moderate}:host([color=success]){--pfe-broadcasted--text:feedback--success}:host([color=info]){--pfe-broadcasted--text:feedback--info}:host([color=default]){--pfe-broadcasted--text:feedback--default}:host([circled]){--pfe-icon--BackgroundColor:transparent;--pfe-icon--BorderColor:var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-icon--Padding:0.05em}:host([circled=base]){--pfe-icon--BackgroundColor:var(--pfe-theme--color--surface--base, #dfdfdf);--pfe-icon--BorderColor:transparent;--pfe-broadcasted--text:var(--pfe-theme--color--text, #333);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #003366);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #003366);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, rebeccapurple);--pfe-broadcasted--link-decoration:none;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:none}:host([circled=lightest]){--pfe-icon--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-icon--BorderColor:transparent;--pfe-broadcasted--text:var(--pfe-theme--color--text, #333);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #003366);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #003366);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, rebeccapurple);--pfe-broadcasted--link-decoration:none;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:none}:host([circled=light]){--pfe-icon--BackgroundColor:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-icon--BorderColor:transparent;--pfe-broadcasted--text:var(--pfe-theme--color--text, #333);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #003366);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #003366);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, rebeccapurple);--pfe-broadcasted--link-decoration:none;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:none}:host([circled=dark]){--pfe-icon--BackgroundColor:var(--pfe-theme--color--surface--darker, #464646);--pfe-icon--BorderColor:transparent;--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #99ccff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #cce6ff);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #cce6ff);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #b38cd9);--pfe-broadcasted--link-decoration:none;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:none}:host([circled=darkest]){--pfe-icon--BackgroundColor:var(--pfe-theme--color--surface--darkest, #131313);--pfe-icon--BorderColor:transparent;--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #99ccff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #cce6ff);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #cce6ff);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #b38cd9);--pfe-broadcasted--link-decoration:none;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:none}:host([circled=complement]){--pfe-icon--BackgroundColor:var(--pfe-theme--color--surface--complement, #0477a4);--pfe-icon--BorderColor:transparent;--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, white);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, white);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #b38cd9);--pfe-broadcasted--link-decoration:underline;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:underline}:host([circled=accent]){--pfe-icon--BackgroundColor:var(--pfe-theme--color--surface--accent, #e00);--pfe-icon--BorderColor:transparent;--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, white);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, white);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #b38cd9);--pfe-broadcasted--link-decoration:underline;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:underline}:host(.load-failed){--pfe-icon--BackgroundColor:transparent;--pfe-icon--BorderColor:transparent;--pfe-icon--Padding:0}:host(.load-failed) ::slotted(:first-child){margin-top:0}:host(.load-failed) ::slotted(:last-child){margin-bottom:0}:host(.load-failed) svg image{display:none}:host(.load-failed.has-fallback) svg,:host(.load-failed[on-fail=collapse]) svg{display:none}:host(.load-failed[on-fail=collapse]){--pfe-icon--Size:0}\n/*# sourceMappingURL=pfe-icon.min.css.map */\n</style><div class=\"pfe-icon--fallback\">\n  <slot></slot>\n</div>\n<svg xmlns=\"http://www.w3.org/2000/svg\">\n  <filter color-interpolation-filters=\"sRGB\" x=\"0\" y=\"0\" height=\"100%\" width=\"100%\">\n    <feFlood result=\"COLOR\" />\n    <feComposite operator=\"in\" in=\"COLOR\" in2=\"SourceAlpha\" />\n  </filter>\n  <image xlink:href=\"\" width=\"100%\" height=\"100%\"></image>\n</svg>";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-icon.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-icon.scss";
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-icon.json";
      }
    }, {
      key: "has_fallback",
      get: function get$$1() {
        return this.children.length > 0 || this.innerText.length > 0;
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.45";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "icon": { "title": "Icon", "type": "string", "prefixed": false }, "size": { "title": "Size", "type": "string", "enum": ["default", "xl", "lg", "md", "sm", "2x", "3x", "4x"], "default": "default", "prefixed": false }, "color": { "title": "Color", "type": "string", "enum": ["default", "base", "compliment", "accent", "critical", "important", "moderate", "success", "info"], "default": "default", "prefixed": false }, "circled": { "title": "Circled", "type": "boolean", "prefixed": false } };
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return {};
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-icon";
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["icon", "on-fail"];
      }
    }]);

    function PfeIcon() {
      classCallCheck(this, PfeIcon);

      var _this = possibleConstructorReturn(this, (PfeIcon.__proto__ || Object.getPrototypeOf(PfeIcon)).call(this, PfeIcon));

      _this.image = _this.shadowRoot.querySelector("svg image");
      _this.image.addEventListener("load", function () {
        return _iconLoad(_this);
      });
      _this.image.addEventListener("error", function () {
        return _iconLoadError(_this);
      });
      return _this;
    }

    createClass(PfeIcon, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        get(PfeIcon.prototype.__proto__ || Object.getPrototypeOf(PfeIcon.prototype), "attributeChangedCallback", this).apply(this, arguments);
        this.updateIcon(newValue);
      }
    }, {
      key: "updateIcon",
      value: function updateIcon() {
        var iconName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getAttribute("icon");

        var _PfeIcon$getIconSet = PfeIcon.getIconSet(iconName),
            setName = _PfeIcon$getIconSet.setName,
            set$$1 = _PfeIcon$getIconSet.set;

        if (set$$1) {
          var iconPath = set$$1.resolveIconName(iconName);
          this.image.setAttribute("xlink:href", iconPath);
          _setRandomFilterId(this);
        } else {
          // the icon set we want doesn't exist (yet?) so start listening for new icon sets
          this._handleAddIconSet = _createIconSetHandler(this, setName);

          document.body.addEventListener(PfeIcon.EVENTS.ADD_ICON_SET, this._handleAddIconSet);
        }
      }

      /**
       * Get an icon set by providing the set's name, _or_ the name of an icon from that set.
       *
       * @param {String} iconName the name of the set, or the name of an icon from that set.
       * @return {PfeIconSet} the icon set
       */

    }], [{
      key: "getIconSet",
      value: function getIconSet(iconName) {
        var _iconName$split = iconName.split("-"),
            _iconName$split2 = slicedToArray(_iconName$split, 1),
            setName = _iconName$split2[0];

        var set$$1 = this._iconSets[setName];
        return { setName: setName, set: set$$1 };
      }
    }, {
      key: "addIconSet",
      value: function addIconSet(name, path, resolveIconName) {
        if (this._iconSets[name]) {
          throw new Error("can't add icon set " + name + "; a set with that name already exists.");
        }

        this._iconSets[name] = new PfeIconSet(name, path, resolveIconName);

        document.body.dispatchEvent(new CustomEvent(this.EVENTS.ADD_ICON_SET, {
          bubbles: false,
          detail: {
            set: this._iconSets[name]
          }
        }));
      }
    }, {
      key: "EVENTS",
      get: function get$$1() {
        return {
          ADD_ICON_SET: this.tag + ":add-icon-set"
        };
      }
    }]);
    return PfeIcon;
  }(PFElement);

  PfeIcon._iconSets = {};

  addBuiltIns(PfeIcon);

  PFElement.create(PfeIcon);

  return PfeIcon;

})));
//# sourceMappingURL=pfe-icon.umd.js.map

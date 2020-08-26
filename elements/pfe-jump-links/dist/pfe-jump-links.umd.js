(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global.PfeJumpLinks = factory(global.PFElement));
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

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  /*!
   * PatternFly Elements: PfeJumpLinks 1.0.0-prerelease.55
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

  var pfeJumpLinksNavObserverConfig = {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true
  };

  var pfeJumpLinksPanelObserverConfig = {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true
  };

  var PfeJumpLinks = function (_PFElement) {
    inherits(PfeJumpLinks, _PFElement);
    createClass(PfeJumpLinks, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{display:block}:host([hidden]){display:none}\n/*# sourceMappingURL=pfe-jump-links.min.css.map */\n</style><slot></slot>";
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-jump-links.json";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-jump-links.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-jump-links.scss";
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.55";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return {};
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return { "default": { "title": "Default slot", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "raw" }] } } };
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-jump-links";
      }
    }, {
      key: "PfeType",
      get: function get$$1() {
        return PFElement.PfeTypes.Content;
      }
    }]);

    function PfeJumpLinks() {
      classCallCheck(this, PfeJumpLinks);
      return possibleConstructorReturn(this, (PfeJumpLinks.__proto__ || Object.getPrototypeOf(PfeJumpLinks)).call(this, PfeJumpLinks, { type: PfeJumpLinks.PfeType }));
    }

    return PfeJumpLinks;
  }(PFElement);

  var PfeJumpLinksNav = function (_PFElement2) {
    inherits(PfeJumpLinksNav, _PFElement2);
    createClass(PfeJumpLinksNav, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{-webkit-box-sizing:border-box;box-sizing:border-box;font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-theme--font-family, \"Overpass\", Overpass, Helvetica, helvetica, arial, sans-serif);font-weight:500;font-weight:var(--pfe-theme--font-weight--normal,500);font-weight:400;display:block;position:-webkit-sticky;position:sticky;top:calc(16px * 4);top:calc(var(--pfe-theme--container-spacer,16px) * 4);padding-left:0;background-color:#fff;background-color:var(--pfe-jump-links--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff))}@media (min-width:992px){:host{border:1px solid transparent;border:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) transparent;padding:calc(16px * 2) calc(16px * 2);padding:var(--pfe-jump-links--vertical-spacer,calc(var(--pfe-theme--container-padding,16px) * 2)) var(--pfe-jump-links--horizontal-spacer,calc(var(--pfe-theme--container-padding,16px) * 2))}}:host ::slotted([slot=pfe-jump-links-nav--heading]){color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42);margin:0 0 16px;margin:0 0 var(--pfe-theme--container-spacer,16px);font-size:14px;font-size:var(--pfe-jump-links__heading--FontSize,var(--pfe-theme--font-size--heading--zeta,14px));font-weight:400;text-transform:uppercase}@media (max-width:991px){:host ::slotted([slot=pfe-jump-links-nav--heading]){display:none}}:host([pfe-sticky=false]){position:relative}nav{visibility:visible;margin:0;list-style:none;padding:0}nav ul{padding:0;border-left:1px solid #d2d2d2;border-left:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-disabled,#d2d2d2)}nav li{border-left:4px solid transparent;border-left:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) transparent;display:block;text-decoration:none;margin-left:calc(1px * -1);margin-left:calc(var(--pfe-theme--surface--border-width,1px) * -1)}nav li.expand ul{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}nav li.expand .sub-section{display:table;height:auto}nav li[active]{border-left-color:#06c;border-left-color:var(--pfe-jump-links--BorderColor,var(--pfe-theme--color--ui-accent,#06c))}nav a{position:relative;display:table;color:#6a6e73;color:var(--pfe-theme--color--ui-disabled--text,#6a6e73);font-size:16px;font-size:var(--pfe-jump-links--FontSize,var(--pfe-theme--font-size--heading--epsilon,16px));text-decoration:none;line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);padding:calc(calc(24px / 6) * 2) calc(calc(24px / 3) * 2);padding:calc(var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,24px)/ 6)) * 2) calc(var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,24px)/ 3)) * 2)}nav a.has-sub-section{padding-bottom:calc(24px / 6);padding-bottom:var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,24px)/ 6))}nav a.sub-section{margin-left:calc(16px * .75);margin-left:calc(var(--pfe-theme--container-spacer,16px) * .75);font-size:calc(16px * .85);font-size:calc(var(--pfe-jump-links--FontSize,var(--pfe-theme--font-size--heading--epsilon,16px)) * .85);padding:calc(24px / 6) calc(calc(24px / 3) * 2);padding:var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,24px)/ 6)) calc(var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,24px)/ 3)) * 2)}@media (min-width:992px){nav a.sub-section{display:none}}nav a.sub-section:last-child{padding-bottom:calc(24px / 3);padding-bottom:var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,24px)/ 3))}nav a::after{content:\"\";position:absolute;width:calc(100% - 4px);width:calc(100% - var(--pfe-theme--surface--border-width--heavy,4px));height:calc(100% - 4px);height:calc(100% - var(--pfe-theme--surface--border-width--heavy,4px));top:0;left:0}nav a:focus{outline:0}nav a:focus::after{border-radius:3px;border-radius:var(--pfe-theme--surface--border-radius,3px);border:2px solid #06c;border:2px var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--link,#06c)}nav a:hover{color:#151515;color:var(--pfe-theme--color--surface--darkest,#151515)}nav a[active]{color:#151515;color:var(--pfe-theme--color--surface--darkest,#151515)}nav ul ul{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:0;-webkit-flex:0;-ms-flex:0;flex:0;margin:0;padding:0;border-left:none!important;overflow-y:hidden;-webkit-transition:-webkit-box-flex 1s linear,-webkit-flex 1s linear;transition:-webkit-box-flex 1s linear,-webkit-flex 1s linear;transition:flex 1s linear;transition:flex 1s linear,-webkit-box-flex 1s linear,-webkit-flex 1s linear,-ms-flex 1s linear}nav ul ul li{border-left:none!important}pfe-accordion{--pfe-accordion--BackgroundColor:transparent;--pfe-accordion--accent:transparent;--pfe-accordion--BorderLeftWidth:0;--pfe-accordion--BorderColor:transparent;--pfe-accordion--BorderColor--accent:transparent}@media (min-width:992px){pfe-accordion{--pfe-accordion__base--Padding:0}}@media (max-width:991px){pfe-accordion{border:1px solid #d2d2d2;border:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-disabled,#d2d2d2)}}pfe-accordion-header{--pfe-theme--color--surface--border:transparent;--pfe-theme--color--ui-base--on-dark:transparent;--pfe-theme--color--ui-base:transparent;position:-webkit-sticky;position:sticky;top:0}@media (max-width:991px){pfe-accordion-header{background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);--theme:light}}@media (min-width:992px){pfe-accordion-header{visibility:collapse!important;display:none}}pfe-accordion-panel{border-left-color:transparent}@media (min-width:992px){pfe-accordion-panel{visibility:collapse;display:none;opacity:1;display:block}}@media (min-width:992px){pfe-accordion-panel>pfe-jump-links-nav{width:100%;display:block;visibility:visible}}:host([pfe-color=darkest]){--pfe-jump-links--theme:dark;--pfe-jump-links--BackgroundColor:var(--pfe-theme--color--surface--darkest, #151515);border:1px solid #6a6e73;border:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-disabled--text,#6a6e73)}:host([pfe-color=darkest]) button[aria-expanded=true],:host([pfe-color=darkest]) pfe-accordion-header,:host([pfe-color=darkest]) pfe-accordion-panel{--pfe-accordion--BackgroundColor:var(--pfe-theme--color--surface--darkest, #151515);--pfe-jump-links--BackgroundColor:var(--pfe-theme--color--surface--darkest, #151515)}:host([pfe-color=darkest]) ::slotted([slot=pfe-jump-links-nav--heading]){color:#f0f0f0;color:var(--pfe-theme--color--surface--lighter,#f0f0f0)}:host([pfe-color=darkest]) ul{border-left:1px solid #6a6e73;border-left:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-disabled--text,#6a6e73)}:host([pfe-color=darkest]) ul li[active]{border-left:3px solid #06c;border-left:3px var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-accent,#06c)}:host([pfe-color=darkest]) ul a{color:#2b9af3;color:var(--pfe-theme--color--ui-accent--focus--on-dark,#2b9af3)}:host([pfe-color=darkest]) ul a:hover{color:#2b9af3;color:var(--pfe-theme--color--ui-accent--hover--on-dark,#2b9af3)}:host([pfe-color=darkest]) ul a[active]{color:#73bcf7;color:var(--pfe-theme--color--ui-accent--on-dark,#73bcf7)}:host([pfe-color=darkest]) ul a:focus::after{border-color:#73bcf7;border-color:var(--pfe-theme--color--link--on-dark,#73bcf7)}:host([hidden]){display:none}:host([pfe-c-horizontal]){padding:0;top:0;width:100%}:host([pfe-c-horizontal]) nav{min-height:calc(16px * 5.5);min-height:calc(var(--pfe-theme--container-spacer,16px) * 5.5);background-color:#f0f0f0;background-color:var(--pfe-theme--color--surface--lighter,#f0f0f0);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative}:host([pfe-c-horizontal]) nav .pfe-jump-links-nav__heading{display:none}:host([pfe-c-horizontal]) nav ::slotted([slot=pfe-jump-links-nav--logo]){position:absolute;left:0;max-height:calc(16px * 3.5);max-height:calc(var(--pfe-theme--container-spacer,16px) * 3.5);max-width:calc(16px * 14);max-width:calc(var(--pfe-theme--container-spacer,16px) * 14);top:calc(16px * 1);top:calc(var(--pfe-theme--container-spacer,16px) * 1)}@media (max-width:991px){:host([pfe-c-horizontal]) nav ::slotted([slot=pfe-jump-links-nav--logo]){left:calc(16px * 2);left:calc(var(--pfe-theme--container-spacer,16px) * 2)}}@media (min-width:992px){:host([pfe-c-horizontal]) nav ::slotted([slot=pfe-jump-links-nav--logo]){left:calc(16px * 4);left:calc(var(--pfe-theme--container-spacer,16px) * 4)}}:host([pfe-c-horizontal]) nav ::slotted([slot=pfe-jump-links-nav--cta]){position:absolute;top:calc(16px * 1);top:calc(var(--pfe-theme--container-spacer,16px) * 1)}@media (max-width:991px){:host([pfe-c-horizontal]) nav ::slotted([slot=pfe-jump-links-nav--cta]){right:calc(16px * 2);right:calc(var(--pfe-theme--container-spacer,16px) * 2)}}@media (min-width:992px){:host([pfe-c-horizontal]) nav ::slotted([slot=pfe-jump-links-nav--cta]){right:calc(16px * 4);right:calc(var(--pfe-theme--container-spacer,16px) * 4)}}:host([pfe-c-horizontal]) #container{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;justify-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}:host([pfe-c-horizontal]) ul{border:none;display:block;text-align:center;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:0;width:auto;margin:0;margin-left:auto;margin-right:auto}:host([pfe-c-horizontal]) ul li{padding:0 calc(16px * 1.5);padding:0 calc(var(--pfe-theme--container-spacer,16px) * 1.5);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:calc(16px * 5);height:calc(var(--pfe-theme--container-spacer,16px) * 5);-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;border-top:4px solid transparent;border-top:4px var(--pfe-theme--surface--border-style,solid) transparent;border-bottom:4px solid transparent;border-bottom:4px var(--pfe-theme--surface--border-style,solid) transparent;border-left:none;border-right:none}:host([pfe-c-horizontal]) ul li[active]{border-top:4px solid #06c;border-top:4px var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-accent,#06c)}:host([pfe-c-horizontal]) ul a{text-decoration:none;color:#6a6e73;color:var(--pfe-theme--color--ui-disabled--text,#6a6e73)}:host([pfe-c-horizontal]) ul a[active]{color:#151515;color:var(--pfe-theme--color--surface--darkest,#151515)}:host([pfe-c-horizontal]) ul a:hover{color:#151515;color:var(--pfe-theme--color--surface--darkest,#151515)}@media (max-width:991px){:host([pfe-c-horizontal]) nav{min-height:calc(16px * 5.5);min-height:calc(var(--pfe-theme--container-spacer,16px) * 5.5);background-color:#f0f0f0;background-color:var(--pfe-theme--color--surface--lighter,#f0f0f0)}:host([pfe-c-horizontal]) .pfe-jump-links-nav{display:none}}\n/*# sourceMappingURL=pfe-jump-links-nav.min.css.map */\n</style>\n  " + (this.hasAttribute("pfe-c-horizontal") ? "" : "<pfe-accordion>\n    <pfe-accordion-header>\n    </pfe-accordion-header>\n    <pfe-accordion-panel>") + "\n      <nav>\n        <slot class=\"pfe-jump-links-nav__heading\" name=\"pfe-jump-links-nav--heading\" id=\"pfe-jump-links-nav--heading\">\n        </slot>\n        <slot class=\"pfe-jump-links-nav__logo\" name=\"pfe-jump-links-nav--logo\"></slot>\n        <div id=\"container\"></div>\n        <slot class=\"pfe-jump-links-nav__cta\" name=\"pfe-jump-links-nav--cta\"></slot>\n      </nav>\n      " + (this.hasAttribute("pfe-c-horizontal") ? "" : "</pfe-accordion-panel>\n  </pfe-accordion>");
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-jump-links-nav.json";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-jump-links-nav.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-jump-links-nav.scss";
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.55";
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-jump-links-nav";
      }
    }, {
      key: "PfeType",
      get: function get$$1() {
        return PFElement.PfeTypes.Content;
      }
    }]);

    function PfeJumpLinksNav() {
      classCallCheck(this, PfeJumpLinksNav);

      var _this2 = possibleConstructorReturn(this, (PfeJumpLinksNav.__proto__ || Object.getPrototypeOf(PfeJumpLinksNav)).call(this, PfeJumpLinksNav, { type: PfeJumpLinksNav.PfeType }));

      _this2._buildNav = _this2._buildNav.bind(_this2);
      _this2._mutationCallback = _this2._mutationCallback.bind(_this2);
      _this2._menuContainer = _this2.shadowRoot.querySelector("#container");
      _this2._observer = new MutationObserver(_this2._mutationCallback);
      _this2._reportHeight = _this2._reportHeight.bind(_this2);
      _this2.panel = document.querySelector("[pfe-c-scrolltarget=" + _this2.id + "]");

      window.addEventListener("resize", function () {});
      return _this2;
    }

    createClass(PfeJumpLinksNav, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeJumpLinksNav.prototype.__proto__ || Object.getPrototypeOf(PfeJumpLinksNav.prototype), "connectedCallback", this).call(this);
        //Check that the light DOM is there
        if (this.hasAttribute("autobuild")) {
          this._buildNav();
        } else {
          //Check that the light DOM is valid
          if (this._isValidLightDom()) {
            var menu = this.querySelector("ul");
            menu.classList.add("pfe-jump-links-nav");
            this._menuContainer.innerHTML = menu.outerHTML;

            var div = document.createElement("div");

            div.innerHTML = "<h2 class=\"sr-only\" hidden>" + this.getAttribute("sr-text") + "</h2>";

            if (this.getAttribute("sr-text")) {
              this.shadowRoot.querySelector("nav").prepend(div);
            }

            var html = "";
            if (this.querySelector("[slot='pfe-jump-links-nav--heading']")) {
              html = this.querySelector("[slot='pfe-jump-links-nav--heading']").cloneNode(true);
            }
            if (!this.hasAttribute("pfe-c-horizontal") && html !== "") {
              this.shadowRoot.querySelector("pfe-accordion-header").appendChild(html);
            } else {
              var heading = document.createElement("h3");
              heading.id = "pfe-jump-links-nav--heading";

              this.shadowRoot.querySelector("pfe-accordion-header").appendChild(heading);
              this.shadowRoot.querySelector("#pfe-jump-links-nav--heading").innerHTML = "Jump to section";
            }
          }
        }
        this._reportHeight();

        this._observer.observe(this, pfeJumpLinksNavObserverConfig);

        this.panel = document.querySelector("[pfe-c-scrolltarget=\"" + this.id + "\"]");

        this.panel.addEventListener(PfeJumpLinksPanel.events.change, this._buildNav);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this._observer.disconnect();
        this.panel.removeEventListener(PfeJumpLinksPanel.events.change, this._buildNav);
        this.removeEventListener("click");
      }
    }, {
      key: "_rebuildNav",
      value: function _rebuildNav() {
        this._buildNav();
      }
    }, {
      key: "_buildNav",
      value: function _buildNav() {
        var _this3 = this;

        var buildLinkList = function buildLinkList() {
          var linkList = "";
          if (!_this3.panel) {
            _this3.panel = document.querySelector("[pfe-c-scrolltarget=\"" + _this3.id + "\"]");
          }
          var panelSections = _this3.panel.querySelectorAll(".pfe-jump-links-panel__section");

          for (var i = 0; i < panelSections.length; i++) {
            var arr = [].concat(toConsumableArray(panelSections));
            if (arr[i].classList.contains("has-sub-section")) {
              var linkListItem = "\n          <li class=\"pfe-jump-links-nav__item\">\n            <a\n              class=\"pfe-jump-links-nav__link has-sub-section\"\n              href=\"#" + arr[i].id + "\"\n              data-target=\"" + arr[i].id + "\">\n                " + arr[i].innerHTML + "\n            </a>\n            <ul class=\"sub-nav\">\n        ";
              linkList += linkListItem;
            } else if (arr[i].classList.contains("sub-section")) {
              var linkSubItem = "\n        <li class=\"pfe-jump-links-nav__item\">\n            <a\n              class=\"pfe-jump-links-nav__link sub-section\"\n              href=\"#" + arr[i].id + "\"\n              data-target=\"" + arr[i].id + "\">\n                " + arr[i].innerHTML + "\n            </a>\n        </li>";
              if (!arr[i + 1].classList.contains("sub-section")) {
                linkSubItem += "</ul></li>";
              }
              linkList += linkSubItem;
            } else {
              var _linkListItem = "\n          <li class=\"pfe-jump-links-nav__item\">\n            <a\n              class=\"pfe-jump-links-nav__link\"\n              href=\"#" + arr[i].id + "\"\n              data-target=\"" + arr[i].id + "\">\n                " + arr[i].innerHTML + "\n            </a>\n          </li>\n        ";
              linkList += _linkListItem;
            }
          }
          return linkList;
        };

        var html = "\n      <ul class=\"pfe-jump-links-nav\">\n        " + buildLinkList() + "\n    ";
        this.shadowRoot.querySelector("#container").innerHTML = html;
        var heading = document.createElement("h3");
        heading.innerHTML = "Jump to section";
        this.shadowRoot.querySelector("pfe-accordion-header").appendChild(heading);
      }
    }, {
      key: "_mutationCallback",
      value: function _mutationCallback() {
        if (window.ShadyCSS) {
          this._observer.disconnect();
        }

        if (!this.hasAttribute("autobuild")) {
          var menu = this.querySelector("ul");
          this._menuContainer.innerHTML = menu.outerHTML;
        } else if (this.hasAttribute("autobuild")) {
          this._buildNav();
        }

        if (window.ShadyCSS) {
          this._observer.observe(this, pfeJumpLinksNavObserverConfig);
        }
      }
    }, {
      key: "_isValidLightDom",
      value: function _isValidLightDom() {
        if (!this.children.length) {
          console.warn(PfeJumpLinks.tag + ": You must have a <ul> tag in the light DOM");
          return false;
        }
        if ((this.has_slot("logo") || this.has_slot("link")) && !this.hasAttribute("pfe-c-horizontal")) {
          console.warn(PfeJumpLinks.tag + ": logo and link slots NOT supported in vertical jump links");
        }
        if (this.children[1].tagName !== "UL") {
          if (!this.hasAttribute("pfe-c-horizontal")) {
            console.warn(PfeJumpLinks.tag + ": The top-level list of links MUST be a <ul>");
          }

          return false;
        }

        return true;
      }
    }, {
      key: "_reportHeight",
      value: function _reportHeight() {
        var cssVarName = "--" + this.tag + "--Height--actual";
        var height = this.clientHeight + "px";
        this.panel.style.setProperty(cssVarName, height);
      }
    }]);
    return PfeJumpLinksNav;
  }(PFElement);

  var PfeJumpLinksPanel = function (_PFElement3) {
    inherits(PfeJumpLinksPanel, _PFElement3);
    createClass(PfeJumpLinksPanel, [{
      key: "html",
      get: function get$$1() {
        return "<slot></slot>";
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-jump-links-panel.json";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-jump-links-panel.html";
      }
    }, {
      key: "offsetValue",
      get: function get$$1() {
        return this.sectionMargin || this.customVar;
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.55";
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-jump-links-panel";
      }
    }, {
      key: "events",
      get: function get$$1() {
        return {
          change: this.tag + ":change",
          activeNavItem: this.tag + ":active-navItem"
        };
      }
    }, {
      key: "PfeType",
      get: function get$$1() {
        return PFElement.PfeTypes.Content;
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["pfe-c-offset"];
      }
    }]);

    function PfeJumpLinksPanel() {
      classCallCheck(this, PfeJumpLinksPanel);

      var _this4 = possibleConstructorReturn(this, (PfeJumpLinksPanel.__proto__ || Object.getPrototypeOf(PfeJumpLinksPanel)).call(this, PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType }));

      _this4._init = _this4._init.bind(_this4);
      _this4._slot = _this4.shadowRoot.querySelector("slot");
      _this4._slot.addEventListener("slotchange", _this4._init);
      _this4._scrollCallback = _this4._scrollCallback.bind(_this4);
      _this4._mutationCallback = _this4._mutationCallback.bind(_this4);
      _this4._handleResize = _this4._handleResize.bind(_this4);
      _this4._observer = new MutationObserver(_this4._mutationCallback);
      _this4.currentActive = null;
      _this4.currentActive = 0;
      _this4.current = -1;
      window.addEventListener("resize", _this4._handleResize);
      return _this4;
    }

    createClass(PfeJumpLinksPanel, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeJumpLinksPanel.prototype.__proto__ || Object.getPrototypeOf(PfeJumpLinksPanel.prototype), "connectedCallback", this).call(this);
        this.nav = this._getNav();
        this._init();
        this.sectionMargin = this.getAttribute("pfe-c-offset");
        this.customVar = this.cssVariable("--pfe-jump-links-panel--offset") || 200;
        if (this.nav && this.nav.hasAttribute("pfe-c-autobuild")) {
          this.nav._rebuildNav();
        }

        this._observer.observe(this, pfeJumpLinksPanelObserverConfig);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this._observer.disconnect();
        window.removeEventListener("scroll");
        this._slot.removeEventListener("slotchange", this._init);
        window.removeEventListener("resize", this._handleResize);
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldVal, newVal) {
        get(PfeJumpLinksPanel.prototype.__proto__ || Object.getPrototypeOf(PfeJumpLinksPanel.prototype), "attributeChangedCallback", this).call(this, attr, oldVal, newVal);

        switch (attr) {
          case "pfe-c-offset":
            this.sectionMargin = newVal;
            break;
        }
      }
    }, {
      key: "_init",
      value: function _init() {
        window.addEventListener("scroll", this._scrollCallback);
        this.scrollTarget = this.getAttribute("pfe-c-scrolltarget");
        this.JumpLinksNav = document.querySelector("#" + this.scrollTarget);
        this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");

        if (this.JumpLinksNav) {
          this.menu_links = this.JumpLinksNav.querySelectorAll("a");
        }
      }
    }, {
      key: "_handleResize",
      value: function _handleResize() {
        this.nav._reportHeight();
        this.sectionMargin = this.getAttribute("pfe-c-offset");
        this.customVar = this.cssVariable("--pfe-jump-links-panel--offset") || 200;
      }
    }, {
      key: "_getNav",
      value: function _getNav() {
        return document.querySelector("pfe-jump-links-nav#" + this.getAttribute("pfe-c-scrolltarget"));
      }
    }, {
      key: "_makeActive",
      value: function _makeActive(link) {
        if (this.menu_links[link]) {
          // Check if this is a subnav or has subsections
          if (this.menu_links[link].classList.contains("sub-section")) {
            this.menu_links[link].setAttribute("active", "");
            this.menu_links[link].parentNode.parentNode.parentNode.setAttribute("active", "");
            this.menu_links[link].parentNode.parentNode.parentNode.classList.add("expand");
          } else if (this.menu_links[link].classList.contains("has-sub-section")) {
            this.menu_links[link].setAttribute("active", "");
            this.menu_links[link].parentNode.setAttribute("active", "");
            this.menu_links[link].parentNode.classList.add("expand");
          } else {
            this.menu_links[link].setAttribute("active", "");
            this.menu_links[link].parentNode.setAttribute("active", "");
          }

          var activeLink = this.JumpLinksNav.querySelector("[active]");
          this.emitEvent(PfeJumpLinksPanel.events.activeNavItem, {
            detail: {
              activeNavItem: activeLink
            }
          });
        }
      }
    }, {
      key: "_removeActive",
      value: function _removeActive(link) {
        if (this.menu_links[link]) {
          if (this.menu_links[link].classList.contains("sub-section")) {
            this.menu_links[link].parentNode.parentNode.parentNode.classList.remove("expand");
          }
          this.menu_links[link].removeAttribute("active");
          this.menu_links[link].parentNode.removeAttribute("active");
        }
      }
    }, {
      key: "_removeAllActive",
      value: function _removeAllActive() {
        var _this5 = this;

        if (!Object.keys) {
          Object.keys = function (obj) {
            if (obj !== Object(obj)) throw new TypeError("Object.keys called on a non-object");
            var k = [],
                p;
            for (p in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, p)) k.push(p);
            }return k;
          };
          Object.keys.forEach = Array.forEach;
        }
        [].concat(toConsumableArray(Array(this.sections.length).keys())).forEach(function (link) {
          _this5._removeActive(link);
        });
      }
    }, {
      key: "_mutationCallback",
      value: function _mutationCallback() {
        if (window.ShadyCSS) {
          this._observer.disconnect();
        }

        //If we didn't get nav in the constructor, grab it now
        if (!this.nav) {
          this.nav = document.querySelector("pfe-jump-links-nav#" + this.getAttribute("pfe-c-scrolltarget"));
        }
        //If we want the nav to be built automatically, re-init panel and rebuild nav
        if (this.nav.hasAttribute("autobuild")) {
          this._init();
          this.emitEvent(PfeJumpLinksPanel.events.change);
          this.nav._rebuildNav();
        }

        if (window.ShadyCSS) {
          this._observer.observe(this, pfeJumpLinksPanelObserverConfig);
        }
      }
    }, {
      key: "_scrollCallback",
      value: function _scrollCallback() {
        var _this6 = this;

        var sections = void 0;
        var menu_links = void 0;
        //Check sections to make sure we have them (if not, get them)
        if (!this.sections || typeof this.sections === "undefined") {
          this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");
        } else {
          sections = this.sections;
        }
        //Check list of links to make sure we have them (if not, get them)
        if (this.menu_links.length < 1 || !this.menu_links) {
          this.menu_links = this.JumpLinksNav.shadowRoot.querySelectorAll("a");
          menu_links = this.menu_links;
        }

        // Make an array from the node list
        var sectionArr = [].concat(toConsumableArray(sections));
        // Get all the sections that match this point in the scroll
        var matches = sectionArr.filter(function (section) {
          return window.scrollY >= section.offsetTop - _this6.offsetValue;
        }).reverse();

        //Identify the last one queried as the current section
        var current = sectionArr.indexOf(matches[0]);

        // If that section isn't already active,
        // remove active from the other links and make it active
        if (current !== this.currentActive) {
          this._removeAllActive();
          this.currentActive = current;
          this._makeActive(current);
        }
      }
    }]);
    return PfeJumpLinksPanel;
  }(PFElement);

  PFElement.create(PfeJumpLinks);
  PFElement.create(PfeJumpLinksNav);
  PFElement.create(PfeJumpLinksPanel);

  return PfeJumpLinks;

})));
//# sourceMappingURL=pfe-jump-links.umd.js.map

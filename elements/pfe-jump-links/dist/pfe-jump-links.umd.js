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
   * PatternFly Elements: PfeJumpLinks 1.0.0-prerelease.39
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

      // static get events() {
      //   return {
      //   };
      // }

    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.39";
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

      // static get observedAttributes() {
      //   return [];
      // }

    }]);

    function PfeJumpLinks() {
      classCallCheck(this, PfeJumpLinks);
      return possibleConstructorReturn(this, (PfeJumpLinks.__proto__ || Object.getPrototypeOf(PfeJumpLinks)).call(this, PfeJumpLinks, { type: PfeJumpLinks.PfeType }));
    }

    createClass(PfeJumpLinks, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeJumpLinks.prototype.__proto__ || Object.getPrototypeOf(PfeJumpLinks.prototype), "connectedCallback", this).call(this);
        // If you need to initialize any attributes, do that here
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {}
    }]);
    return PfeJumpLinks;
  }(PFElement);

  var PfeJumpLinksNav = function (_PFElement2) {
    inherits(PfeJumpLinksNav, _PFElement2);
    createClass(PfeJumpLinksNav, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{font-weight:400;display:block;position:-webkit-sticky;position:sticky;top:calc(16px * 4);top:calc(var(--pfe-theme--container-spacer,16px) * 4);padding:calc(16px * 2);padding:calc(var(--pfe-theme--container-spacer,16px) * 2);--pfe-jump-links--BackgroundColor:BackgroundColor}::slotted([slot=heading]){margin:0 0 1rem 0!important;margin-bottom:calc(16px * 1);margin-bottom:calc(var(--pfe-theme--container-spacer,16px) * 1);font-size:14px;font-weight:400;text-transform:uppercase}ul.pfe-jump-links-nav{padding:1rem 1rem 1rem 0;padding:1rem 1rem 1rem 0;margin:0;list-style:none}ul.sub-nav{margin:0;padding:0;overflow-y:hidden;-webkit-transition:-webkit-box-flex 1s linear,-webkit-flex 1s linear;transition:-webkit-box-flex 1s linear,-webkit-flex 1s linear;transition:flex 1s linear;transition:flex 1s linear,-webkit-box-flex 1s linear,-webkit-flex 1s linear,-ms-flex 1s linear;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:0;-webkit-flex:0;-ms-flex:0;flex:0}li{border-left:3px solid transparent;display:block;text-decoration:none}li.expand ul.sub-nav{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}li.expand a.sub-section{display:table;height:auto}a{display:table;text-decoration:none;font-size:16px;padding:8px;line-height:1.5;border-left:3px solid transparent;position:relative}a.sub-section{display:none;margin-left:12px;font-size:14px}a::after{content:\"\";position:absolute;width:calc(100% - 4px);height:calc(100% - 4px);top:0;left:0}a:focus{outline:0}a:focus::after{border-radius:3px;border:2px solid #62a1f4}:host([default]){border:1px solid #d2d2d2}:host([default]) ::slotted([slot=heading]){color:#151515}:host([default]) ul.pfe-jump-links-nav{border-left:1px solid #d2d2d2}:host([default]) li[active]{border-left:3px solid #06c}:host([default]) a{color:#72767b;position:relative}:host([default]) a:hover{color:#151515}:host([default]) a[active]{color:#151515}:host([default]) a::after{content:\"\";position:absolute;width:calc(100% - 4px);height:calc(100% - 4px);top:0;left:0}:host([default]) a:focus{outline:0}:host([default]) a:focus::after{border-radius:3px;border:2px solid #62a1f4}:host([dark]){background-color:#151515;border:1px solid #72767b}:host([dark]) ::slotted([slot=heading]){color:#ccc}:host([dark]) ul.pfe-jump-links-nav{border-left:1px solid #72767b}:host([dark]) li[active]{border-left:3px solid #e00}:host([dark]) a{color:#ccc}:host([dark]) a:hover{color:#999}:host([dark]) a[active]{color:#fff}:host([dark]) a::after{content:\"\";position:absolute;width:calc(100% - 4px);height:calc(100% - 4px);top:0;left:0}:host([dark]) a:focus{outline:0}:host([dark]) a:focus::after{border-radius:3px;border:2px solid #62a1f4}:host([hidden]){display:none}:host([horizontal]){padding:0;top:0;width:100%;background-color:#f0f0f0}:host([horizontal]) nav{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative}:host([horizontal]) nav ::slotted([slot=heading]){display:none}:host([horizontal]) nav ::slotted([slot=logo]){position:absolute;left:0;max-height:56px;max-width:224px;top:1rem;left:64px}:host([horizontal]) nav ::slotted([slot=link]){position:absolute;right:64px;top:1rem;background-color:red;padding:16px 32px;border-radius:3px;color:#fff!important}:host([horizontal]) .heading{display:none}:host([horizontal]) #container{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;justify-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}:host([horizontal]) ul{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:0;width:auto;margin-left:auto;margin-right:auto}:host([horizontal]) ul li{padding:0 24px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:80px;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;border-top:4px solid transparent;border-bottom:4px solid transparent;border-left:none;border-right:none}:host([horizontal]) ul li[active]{border-top:4px solid #e00}:host([horizontal]) a{color:#72767b}:host([horizontal]) a[active]{color:#151515}\n/*# sourceMappingURL=pfe-jump-links-nav.min.css.map */\n</style><nav>\n  <h2 class=\"sr-only\" hidden>Page navigation</h2>\n  " + (this.has_slot("heading") ? "<slot class=\"heading\" name=\"heading\" id=\"heading\"></slot>" : "<h4 class=\"heading\" id=\"heading\">Jump to section</h4>") + "\n  " + (this.has_slot("logo") ? "<slot class=\"logo\" name=\"logo\" id=\"logo\"></slot>" : "") + "\n\n  <div id=\"container\"></div>\n  " + (this.has_slot("link") ? "<slot class=\"link\" name=\"link\" id=\"link\"></slot>" : "") + "\n</nav>";
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

      // static get events() {
      //   return {
      //   };
      // }

      // Declare the type of this component

    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.39";
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

      // static get observedAttributes() {
      //   return [];
      // }

    }]);

    function PfeJumpLinksNav() {
      classCallCheck(this, PfeJumpLinksNav);

      var _this2 = possibleConstructorReturn(this, (PfeJumpLinksNav.__proto__ || Object.getPrototypeOf(PfeJumpLinksNav)).call(this, PfeJumpLinksNav, { type: PfeJumpLinksNav.PfeType }));

      _this2._buildNav = _this2._buildNav.bind(_this2);
      _this2._mutationCallback = _this2._mutationCallback.bind(_this2);
      _this2._menuContainer = _this2.shadowRoot.querySelector("#container");
      _this2._observer = new MutationObserver(_this2._mutationCallback);
      return _this2;
    }

    createClass(PfeJumpLinksNav, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeJumpLinksNav.prototype.__proto__ || Object.getPrototypeOf(PfeJumpLinksNav.prototype), "connectedCallback", this).call(this);
        // If you need to initialize any attributes, do that here

        //Check that the light DOM is there
        if (this.hasAttribute("autobuild")) {
          this._buildNav();
        } else {
          //Check that the light DOM is valid
          if (this._isValidLightDom()) {
            var menu = this.querySelector("ul");
            this._menuContainer.innerHTML = menu.outerHTML;
          }
        }

        this._observer.observe(this, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true
        });

        this.panel = document.querySelector("[scrolltarget=\"" + this.id + "\"]");

        this.panel.addEventListener(PfeJumpLinksPanel.events.change, this._buildNav);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.removeEventListener("click");
        this.removeEventListener(PfeJumpLinksPanel.events.change, _eventCallback);
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
            _this3.panel = document.querySelector("[scrolltarget=\"" + _this3.id + "\"]");
          }
          var panelSections = _this3.panel.querySelectorAll(".pfe-jump-links-panel__section");

          for (var i = 0; i < panelSections.length; i++) {
            var arr = [].concat(toConsumableArray(panelSections));
            if (arr[i].classList.contains("has-sub-section")) {
              var linkListItem = "\n          <li>\n            <a\n              class=\"pfe-jump-links-nav__item has-sub-section\"\n              href=\"#" + arr[i].id + "\"\n              data-target=\"" + arr[i].id + "\">\n                " + arr[i].innerHTML + "\n            </a>\n            <ul class=\"sub-nav\">\n        ";
              linkList += linkListItem;
            } else if (arr[i].classList.contains("sub-section")) {
              var linkSubItem = "\n        <li>\n            <a\n              class=\"pfe-jump-links-nav__item sub-section\"\n              href=\"#" + arr[i].id + "\"\n              data-target=\"" + arr[i].id + "\">\n                " + arr[i].innerHTML + "\n            </a>\n        </li>";
              if (!arr[i + 1].classList.contains("sub-section")) {
                linkSubItem += "</ul></li>";
              }
              linkList += linkSubItem;
            } else {
              var _linkListItem = "\n          <li>\n            <a\n              class=\"pfe-jump-links-nav__item\"\n              href=\"#" + arr[i].id + "\"\n              data-target=\"" + arr[i].id + "\">\n                " + arr[i].innerHTML + "\n            </a>\n          </li>\n        ";
              linkList += _linkListItem;
            }
          }
          return linkList;
        };

        var html = "\n      <ul class=\"pfe-jump-links-nav\">\n        " + buildLinkList() + "\n    ";
        this.shadowRoot.querySelector("#container").innerHTML = html;
      }
    }, {
      key: "_mutationCallback",
      value: function _mutationCallback() {
        if (!this.hasAttribute("autobuild")) {
          var menu = this.querySelector("ul");
          this._menuContainer.innerHTML = menu.outerHTML;
        }
      }
    }, {
      key: "_isValidLightDom",
      value: function _isValidLightDom() {
        if (!this.children.length) {
          console.warn(PfeJumpLinks.tag + ": You must have a <ul> tag in the light DOM");
          return false;
        }

        if (this.children[1].tagName !== "UL") {
          console.warn(PfeJumpLinks.tag + ": The top-level list of links MUST be a <ul>");

          return false;
        }

        return true;
      }
    }]);
    return PfeJumpLinksNav;
  }(PFElement);

  var PfeJumpLinksPanel = function (_PFElement3) {
    inherits(PfeJumpLinksPanel, _PFElement3);
    createClass(PfeJumpLinksPanel, [{
      key: "html",
      get: function get$$1() {
        return "<style>\n/*# sourceMappingURL=pfe-jump-links-panel.min.css.map */\n</style><slot></slot>";
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
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-jump-links-panel.scss";
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.39";
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

      // Declare the type of this component

    }, {
      key: "PfeType",
      get: function get$$1() {
        return PFElement.PfeTypes.Content;
      }

      // static get observedAttributes() {
      //   return [];
      // }

    }]);

    function PfeJumpLinksPanel() {
      classCallCheck(this, PfeJumpLinksPanel);

      var _this4 = possibleConstructorReturn(this, (PfeJumpLinksPanel.__proto__ || Object.getPrototypeOf(PfeJumpLinksPanel)).call(this, PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType }));

      _this4._init = _this4._init.bind(_this4);
      _this4._slot = _this4.shadowRoot.querySelector("slot");
      _this4._slot.addEventListener("slotchange", _this4._init);
      _this4._scrollCallback = _this4._scrollCallback.bind(_this4);
      _this4._mutationCallback = _this4._mutationCallback.bind(_this4);
      _this4._observer = new MutationObserver(_this4._mutationCallback);
      _this4.currentActive = null;
      _this4.sectionMargin = _this4.getAttribute("offset") || 200;
      _this4.currentActive = 0;
      _this4.current = -1;
      _this4.nav = _this4._getNav();
      return _this4;
    }

    createClass(PfeJumpLinksPanel, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeJumpLinksPanel.prototype.__proto__ || Object.getPrototypeOf(PfeJumpLinksPanel.prototype), "connectedCallback", this).call(this);
        this._init();
        this.nav._rebuildNav();
        this._observer.observe(this, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true
        });
        // If you need to initialize any attributes, do that here
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        window.removeEventListener("scroll");
        this._slot.removeEventListener("slotchange", this._init);
      }
    }, {
      key: "_init",
      value: function _init() {
        window.addEventListener("scroll", this._scrollCallback);
        this.scrollTarget = this.getAttribute("scrolltarget");
        this.JumpLinksNav = document.querySelector("#" + this.scrollTarget);
        this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");
        if (this.JumpLinksNav) {
          this.menu_links = this.JumpLinksNav.querySelectorAll(".pfe-jump-links-nav__item");
        }
      }
    }, {
      key: "_getNav",
      value: function _getNav() {
        return document.querySelector("pfe-jump-links-nav#" + this.getAttribute("scrolltarget"));
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
          //@TODO Should add logic here that doesn't remove active attribute
          // when ones of its children is the active link

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

        [].concat(toConsumableArray(Array(this.sections.length).keys())).forEach(function (link) {
          _this5._removeActive(link);
        });
      }
    }, {
      key: "_mutationCallback",
      value: function _mutationCallback() {
        //If we didn't get nav in the constructor, grab it now
        if (!this.nav) {
          this.nav = document.querySelector("pfe-jump-links-nav#" + this.getAttribute("scrolltarget"));
        }
        //If we want the nav to be built automatically, re-init panel and rebuild nav
        if (this.nav.hasAttribute("autobuild")) {
          this._init();
          //@TODO change this to emit an event that nav is subscribed to
          this.emitEvent(PfeJumpLinksPanel.events.change);
          this.nav._rebuildNav();
        }
      }
    }, {
      key: "_scrollCallback",
      value: function _scrollCallback() {
        var sections = void 0;
        var menu_links = void 0;
        var sectionMargin = void 0;

        //Check sections to make sure we have them (if not, get them)
        if (!this.sections || typeof this.sections === "undefined") {
          this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");
        } else {
          sections = this.sections;
        }
        //Check list of links to make sure we have them (if not, get them)
        if (this.menu_links.length < 1 || !this.menu_links) {
          this.menu_links = this.JumpLinksNav.shadowRoot.querySelectorAll(".pfe-jump-links-nav__item");
          menu_links = this.menu_links;
        }

        //@TODO read value from an attribute so devs can customize
        // margin from the top of the window
        if (!this.sectionMargin) {
          sectionMargin = 200;
        } else {
          sectionMargin = this.sectionMargin;
        }

        // Make an array from the node list
        var sectionArr = [].concat(toConsumableArray(sections));
        // Get all the sections that match this point in the scroll
        var matches = sectionArr.filter(function (section) {
          return window.scrollY >= section.offsetTop - sectionMargin;
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

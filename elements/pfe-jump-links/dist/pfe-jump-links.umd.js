(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global = global || self, global.PfeJumpLinks = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && Object.prototype.hasOwnProperty.call(PFElement, 'default') ? PFElement['default'] : PFElement;

  // @POLYFILL  NodeList.prototype.forEach
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

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
   * PatternFly Elements: PfeJumpLinks 1.7.0
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

  var PfeJumpLinksPanel = function (_PFElement) {
    inherits(PfeJumpLinksPanel, _PFElement);
    createClass(PfeJumpLinksPanel, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>::slotted(.pfe-jump-links__section--spacer){--pfe-jump-links-panel__section--spacer:calc(  var(--pfe-navigation--Height--actual) + var(--pfe-jump-links--nav-height) );height:100px;margin-top:-100px;display:block;position:relative;width:0;margin-top:calc(-1 * var(--pfe-jump-links-panel__section--spacer));height:var(--pfe-jump-links-panel__section--spacer)} /*# sourceMappingURL=pfe-jump-links-panel.min.css.map */</style>\n<slot></slot>";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-jump-links-panel.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-jump-links-panel.scss";
      }
    }, {
      key: "offsetValue",
      get: function get() {
        return this.sectionMargin || parseInt(this.customVar, 10);
      }
    }, {
      key: "nav",
      get: function get() {
        // Use the ID from the navigation to target the panel elements
        // Automatically if there's only one set of tags on the page
        if (this.scrolltarget) {
          return document.querySelector("pfe-jump-links-nav#" + this.scrolltarget);
        } else {
          var navs = document.querySelectorAll("pfe-jump-links-nav");
          if (navs.length === 1) {
            return navs.item(0);
          } else if (navs.length > 1) {
            this.warn("Cannot locate a navigation element that is connected to this panel." + (this.id ? " Please add id=\"" + this.scrolltarget + "\" to the appropriate navigation." : ""));
          } else {
            this.warn("Cannot locate any navigation elements on this page. Please add a \"pfe-jump-links-nav\" element.");
          }
        }

        return;
      }
    }, {
      key: "sections",
      get: function get() {
        return this.querySelectorAll(".pfe-jump-links-panel__section");
      }
    }, {
      key: "customVar",
      get: function get() {
        return this.cssVariable(this.tag + "--offset") || 200;
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.7.0";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-jump-links-panel";
      }
    }, {
      key: "events",
      get: function get() {
        return {
          change: this.tag + ":change",
          activeNavItem: this.tag + ":active-navItem"
        };
      }
    }, {
      key: "PfeType",
      get: function get() {
        return PFElement.PfeTypes.Content;
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          offset: {
            title: "Offset",
            type: Number,
            observer: "_offsetChanged"
          },
          scrolltarget: {
            title: "Scroll target",
            type: String
          },
          // @TODO: Deprecated in 1.0
          oldOffset: {
            alias: "offset",
            attr: "pfe-c-offset"
          },
          // @TODO: Deprecated in 1.0
          oldScrolltarget: {
            alias: "scrolltarget",
            attr: "pfe-c-scrolltarget"
          }
        };
      }
    }]);

    function PfeJumpLinksPanel() {
      classCallCheck(this, PfeJumpLinksPanel);

      var _this = possibleConstructorReturn(this, (PfeJumpLinksPanel.__proto__ || Object.getPrototypeOf(PfeJumpLinksPanel)).call(this, PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType }));

      _this.currentActive = null;
      _this._slot = _this.shadowRoot.querySelector("slot");

      _this._init = _this._init.bind(_this);
      _this._makeSpacers = _this._makeSpacers.bind(_this);
      _this._isValidMarkup = _this._isValidMarkup.bind(_this);

      _this._handleResize = _this._handleResize.bind(_this);
      _this._scrollCallback = _this._scrollCallback.bind(_this);
      _this._mutationCallback = _this._mutationCallback.bind(_this);

      _this._observer = new MutationObserver(_this._mutationCallback);
      return _this;
    }

    createClass(PfeJumpLinksPanel, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeJumpLinksPanel.prototype.__proto__ || Object.getPrototypeOf(PfeJumpLinksPanel.prototype), "connectedCallback", this).call(this);

        this._makeSpacers();
        this._isValidMarkup();

        this._init();

        this.sectionMargin = this.offset;

        // Fire a rebuild if necessary
        if (this.nav && this.nav.autobuild) this.nav.rebuild();

        // Set up the mutation observer
        this._observer.observe(this, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true
        });

        // Attach the event listener for resize
        window.addEventListener("resize", this._handleResize);

        // Initialize if changes are made to slotted elements
        this._slot.addEventListener("slotchange", this._init);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        get(PfeJumpLinksPanel.prototype.__proto__ || Object.getPrototypeOf(PfeJumpLinksPanel.prototype), "disconnectedCallback", this).call(this);

        this._observer.disconnect();
        this._slot.removeEventListener("slotchange", this._init);

        window.removeEventListener("scroll", this._scrollCallback);
        window.removeEventListener("resize", this._handleResize);
      }
    }, {
      key: "_offsetChanged",
      value: function _offsetChanged(oldVal, newVal) {
        this.sectionMargin = newVal;
      }
    }, {
      key: "_isValidMarkup",
      value: function _isValidMarkup() {
        if (this.childElementCount === 1) {
          this.warn("pfe-jump-links-panel must contain more than one child element. Having a top-level 'wrapper' will prevent appropriate styles from being applied.");
        }
      }
    }, {
      key: "_makeSpacers",
      value: function _makeSpacers() {
        if (!this.sections) {
          return;
        }
        this.sections.forEach(function (section) {
          var parentDiv = section.parentNode;
          var html = document.createElement("div");
          parentDiv.insertBefore(html, section);
          var spacer = section.previousElementSibling;
          spacer.classList.add("pfe-jump-links__section--spacer");
          spacer.id = section.id;
          section.removeAttribute("id");
        });
      }
    }, {
      key: "_init",
      value: function _init() {
        var _this2 = this;

        window.addEventListener("scroll", this._scrollCallback);

        Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(function () {
          _this2.menu_links = _this2.nav.links;
        });
      }
    }, {
      key: "_handleResize",
      value: function _handleResize() {
        if (this.nav) this.nav._reportHeight();
        this.sectionMargin = this.offset;
      }
    }, {
      key: "_makeActive",
      value: function _makeActive(link) {
        if (!(link > this.menu_links.length)) {
          var activeLink = this.menu_links.item(link);
          if (activeLink) {
            // Check if this is a subnav or has subsections
            if (activeLink.classList.contains("sub-section")) {
              activeLink.setAttribute("active", "");
              activeLink.parentNode.parentNode.parentNode.setAttribute("active", "");
              activeLink.parentNode.parentNode.parentNode.classList.add("expand");
            } else if (activeLink.classList.contains("has-sub-section")) {
              activeLink.setAttribute("active", "");
              activeLink.parentNode.setAttribute("active", "");
              activeLink.parentNode.classList.add("expand");
            } else {
              activeLink.setAttribute("active", "");
              activeLink.parentNode.setAttribute("active", "");
            }

            // let activeLink2 = this.menu_links.querySelector("[active]");
            this.emitEvent(PfeJumpLinksPanel.events.activeNavItem, {
              detail: {
                activeNavItem: activeLink
              }
            });
          }
        }
      }
    }, {
      key: "_removeActive",
      value: function _removeActive(link) {
        var oldLink = this.menu_links[link];
        if (oldLink) {
          if (oldLink.classList.contains("sub-section")) {
            oldLink.parentNode.parentNode.parentNode.classList.remove("expand");
          }
          oldLink.removeAttribute("active");
          oldLink.parentNode.removeAttribute("active");
        }
      }
    }, {
      key: "_removeAllActive",
      value: function _removeAllActive() {
        var _this3 = this;

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
          _this3._removeActive(link);
        });
      }
    }, {
      key: "_mutationCallback",
      value: function _mutationCallback() {
        if (window.ShadyCSS) {
          this._observer.disconnect();
        }

        //If we want the nav to be built automatically, re-init panel and rebuild nav
        if (this.nav && this.nav.autobuild) {
          this._init();
          this.emitEvent(PfeJumpLinksPanel.events.change);
          this.nav.rebuild();
        }

        if (window.ShadyCSS) {
          this._observer.observe(this, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true
          });
        }
      }
    }, {
      key: "_scrollCallback",
      value: function _scrollCallback() {
        var _this4 = this;

        // Check list of links to make sure we have them (if not, get them)
        if (this.menu_links.length <= 0) {
          this.menu_links = this.nav.links;
        }

        // Make an array from the node list
        var sectionArr = [].concat(toConsumableArray(this.sections));
        // Get all the sections that match this point in the scroll
        var matches = sectionArr.filter(function (section) {
          return window.scrollY >= section.offsetTop - _this4.offsetValue;
        }).reverse();

        // If a match was found, process it
        if (matches.length > 0) {
          // Identify the last one queried as the current section
          var current = sectionArr.indexOf(matches[0]);

          // If that section isn't already active,
          // remove active from the other links and make it active
          if (current !== this.currentActive) {
            this._observer.disconnect();

            this._removeAllActive();
            this.currentActive = current;
            this._makeActive(current);

            this._observer.observe(this, {
              childList: true,
              subtree: true,
              characterData: true,
              attributes: true
            });
          }
        }
      }
    }]);
    return PfeJumpLinksPanel;
  }(PFElement);

  /*!
   * PatternFly Elements: PfeJumpLinks 1.7.0
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

  var PfeJumpLinksNav = function (_PFElement) {
    inherits(PfeJumpLinksNav, _PFElement);
    createClass(PfeJumpLinksNav, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{--pfe-jump-links-panel__section--spacer:calc(var(--pfe-jump-links-nav--Height--actual) + var(--pfe-navigation--Height--actual) + var(--jump-links-nav--nudge));--context:var(--pfe-jump-links--context);-webkit-box-sizing:border-box;box-sizing:border-box;font-family:\"Red Hat Text\",RedHatText,Overpass,Overpass,Arial,sans-serif;font-family:var(--pfe-theme--font-family, \"Red Hat Text\", \"RedHatText\", \"Overpass\", Overpass, Arial, sans-serif);font-weight:400;font-weight:var(--pfe-theme--font-weight--normal,400);font-weight:400;display:block;position:-webkit-sticky;position:sticky;top:calc(1rem * 4);top:var(--pfe-jump-links__nav--offset,calc(var(--pfe-theme--container-spacer,1rem) * 4));padding-left:0;background-color:transparent;background-color:var(--pfe-jump-links--BackgroundColor,transparent)}@media (min-width:992px){:host{border:1px solid transparent;border:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) transparent;padding:0;padding:var(--pfe-jump-links__nav--Padding,0)}}:host .pfe-jump-links-nav__heading>h3,:host ::slotted([slot=pfe-jump-links-nav--heading]){--pf-c--FontSize:var(--pfe-jump-links__heading--FontSize, var(--pf-global--FontSize--sm, 0.875rem));color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42);margin:0 0 1rem;margin:0 0 var(--pfe-theme--container-spacer,1rem);font-size:.875rem;font-size:var(--pfe-jump-links__heading--FontSize,var(--pf-global--FontSize--sm,.875rem));font-weight:400;text-transform:uppercase}@media (max-width:991px){:host .pfe-jump-links-nav__heading>h3,:host ::slotted([slot=pfe-jump-links-nav--heading]){display:none}}:host([sticky=false]){position:relative}nav{visibility:visible;margin:0;list-style:none;padding:0}nav ul{padding:0;border-left:1px solid #d2d2d2;border-left:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-disabled,#d2d2d2)}nav li{border-left:4px solid transparent;border-left:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) transparent;display:block;text-decoration:none;margin-left:calc(1px * -1);margin-left:calc(var(--pfe-theme--surface--border-width,1px) * -1)}nav li.expand ul{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}nav li.expand .sub-section{display:table;height:auto}nav li[active]{border-left-color:#06c;border-left-color:var(--pfe-jump-links--BorderColor,var(--pfe-theme--color--ui-accent,#06c))}nav a{position:relative;display:table;color:#6a6e73;color:var(--pfe-theme--color--ui-disabled--text,#6a6e73);font-size:1rem;font-size:var(--pfe-jump-links--FontSize,var(--pf-global--FontSize--md,1rem));text-decoration:none;line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);padding:calc(calc(1.5rem / 6) * 2) calc(calc(1.5rem / 3) * 2);padding:calc(var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 6)) * 2) calc(var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 3)) * 2)}nav a.has-sub-section{padding-bottom:calc(1.5rem / 6);padding-bottom:var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 6))}nav a.sub-section{margin-left:calc(1rem * .75);margin-left:calc(var(--pfe-theme--container-spacer,1rem) * .75);font-size:calc(1rem * .85);font-size:calc(var(--pfe-jump-links--FontSize,var(--pf-global--FontSize--md,1rem)) * .85);padding:calc(1.5rem / 6) calc(calc(1.5rem / 3) * 2);padding:var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 6)) calc(var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 3)) * 2)}@media (min-width:992px){nav a.sub-section{display:none}}nav a.sub-section:last-child{padding-bottom:calc(1.5rem / 3);padding-bottom:var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 3))}nav a::after{content:\"\";position:absolute;width:calc(100% - 4px);width:calc(100% - var(--pfe-theme--surface--border-width--heavy,4px));height:calc(100% - 4px);height:calc(100% - var(--pfe-theme--surface--border-width--heavy,4px));top:0;left:0}nav a:focus{outline:0}nav a:focus::after{border-radius:3px;border-radius:var(--pfe-theme--surface--border-radius,3px);border:2px solid #06c;border:2px var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--link,#06c)}nav a:hover{color:#151515;color:var(--pfe-theme--color--surface--darkest,#151515)}nav a[active]{color:#151515;color:var(--pfe-theme--color--surface--darkest,#151515)}nav ul ul{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:0;-webkit-flex:0;-ms-flex:0;flex:0;margin:0;padding:0;border-left:none!important;overflow-y:hidden;-webkit-transition:-webkit-box-flex 1s linear,-webkit-flex 1s linear;transition:-webkit-box-flex 1s linear,-webkit-flex 1s linear;transition:flex 1s linear;transition:flex 1s linear,-webkit-box-flex 1s linear,-webkit-flex 1s linear,-ms-flex 1s linear}nav ul ul li{border-left:none!important}:host{--pfe-accordion__panel-container--Padding:0}@media (max-width:767px){:host{--pfe-accordion__panel-container--Padding:20px}}pfe-accordion pfe-accordion-header{--pfe-theme--color--surface--border:transparent;--pfe-theme--color--ui-base--on-dark:transparent;--pfe-theme--color--ui-base:transparent;position:-webkit-sticky;position:sticky;top:0}pfe-accordion pfe-accordion-panel{border-left-color:transparent;border-right:none}@media (max-width:991px){pfe-accordion{border:1px solid #d2d2d2;border:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-disabled,#d2d2d2)}pfe-accordion pfe-accordion-header{background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);--context:var(--pfe-theme--color--surface--lightest--context, light)}}@media (min-width:992px){pfe-accordion pfe-accordion-header{visibility:collapse!important;display:none}pfe-accordion pfe-accordion-panel{visibility:collapse;display:none;opacity:1;display:block}pfe-accordion pfe-accordion-panel>pfe-jump-links-nav{width:100%;display:block;visibility:visible}}:host([color=darkest]) button[aria-expanded=true]{--pfe-jump-links--context:var(--pfe-theme--color--surface--darkest--context, dark);background-color:#151515;background-color:var(--pfe-jump-links--BackgroundColor,var(--pfe-theme--color--surface--darkest,#151515))}:host([color=darkest]) .pfe-jump-links-nav__heading>h3,:host([color=darkest]) ::slotted([slot=pfe-jump-links-nav--heading]){color:#fff;color:var(--pfe-theme--color--text--on-dark,#fff)}:host([color=darkest]) ul{border-left-color:#6a6e73;border-left-color:var(--pfe-theme--color--text--muted,#6a6e73)}:host([color=darkest]) ul li[active]{border-left-width:3px;border-left-width:var(--pfe-theme--ui--border-width--active,3px);border-left-color:#73bcf7;border-left-color:var(--pfe-theme--color--link--on-dark,#73bcf7)}:host([color=darkest]) ul a{color:#d2d2d2;color:var(--pfe-theme--color--text--muted--on-dark,#d2d2d2)}:host([color=darkest]) ul a:hover{color:#fff;color:var(--pfe-theme--color--text--on-dark,#fff)}:host([color=darkest]) ul a[active]{color:#fff;color:var(--pfe-theme--color--text--on-dark,#fff)}:host([color=darkest]) ul a:focus::after{border-color:#73bcf7;border-color:var(--pfe-theme--color--link--on-dark,#73bcf7)}:host([color=accent]) button[aria-expanded=true]{--pfe-jump-links--context:var(--pfe-theme--color--surface--accent--context, saturated);background-color:#004080;background-color:var(--pfe-jump-links--BackgroundColor,var(--pfe-theme--color--surface--accent,#004080))}:host([color=accent]) .pfe-jump-links-nav__heading>h3,:host([color=accent]) ::slotted([slot=pfe-jump-links-nav--heading]){color:#fff;color:var(--pfe-theme--color--text--on-saturated,#fff)}:host([color=accent]) ul{border-left-color:#6a6e73;border-left-color:var(--pfe-theme--color--text--muted,#6a6e73)}:host([color=accent]) ul li[active]{border-left-width:3px;border-left-width:var(--pfe-theme--ui--border-width--active,3px);border-left-color:#fff;border-left-color:var(--pfe-theme--color--link--on-saturated,#fff)}:host([color=accent]) ul a{color:#d2d2d2;color:var(--pfe-theme--color--text--muted--on-saturated,#d2d2d2)}:host([color=accent]) ul a:hover{color:#fff;color:var(--pfe-theme--color--text--on-saturated,#fff)}:host([color=accent]) ul a[active]{color:#fff;color:var(--pfe-theme--color--text--on-saturated,#fff)}:host([color=accent]) ul a:focus::after{border-color:#fff;border-color:var(--pfe-theme--color--link--on-saturated,#fff)}:host([horizontal]){padding:0;top:0;top:var(--pfe-jump-links-panel--offset,0);width:100%}:host([horizontal]) nav{min-height:calc(1rem * 5.5);min-height:calc(var(--pfe-theme--container-spacer,1rem) * 5.5);background-color:#f0f0f0;background-color:var(--pfe-theme--color--surface--lighter,#f0f0f0);--context:var(--pfe-theme--color--surface--lighter--context, light);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative}:host([horizontal]) nav .pfe-jump-links-nav__heading{display:none}:host([horizontal]) nav ::slotted([slot=pfe-jump-links-nav--logo]){position:absolute;left:0;max-height:calc(1rem * 3.5);max-height:calc(var(--pfe-theme--container-spacer,1rem) * 3.5);max-width:calc(1rem * 14);max-width:calc(var(--pfe-theme--container-spacer,1rem) * 14);top:calc(1rem * 1);top:calc(var(--pfe-theme--container-spacer,1rem) * 1)}@media (max-width:991px){:host([horizontal]) nav ::slotted([slot=pfe-jump-links-nav--logo]){left:calc(1rem * 2);left:calc(var(--pfe-theme--container-spacer,1rem) * 2)}}@media (min-width:992px){:host([horizontal]) nav ::slotted([slot=pfe-jump-links-nav--logo]){left:calc(1rem * 4);left:calc(var(--pfe-theme--container-spacer,1rem) * 4)}}:host([horizontal]) nav ::slotted([slot=pfe-jump-links-nav--cta]){position:absolute;top:calc(1rem * 1);top:calc(var(--pfe-theme--container-spacer,1rem) * 1)}@media (max-width:991px){:host([horizontal]) nav ::slotted([slot=pfe-jump-links-nav--cta]){right:calc(1rem * 2);right:calc(var(--pfe-theme--container-spacer,1rem) * 2)}}@media (min-width:992px){:host([horizontal]) nav ::slotted([slot=pfe-jump-links-nav--cta]){right:calc(1rem * 4);right:calc(var(--pfe-theme--container-spacer,1rem) * 4)}}:host([horizontal]) #container{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;justify-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}:host([horizontal]) ul{border:none;text-align:center;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:0;width:auto;margin:0 auto}:host([horizontal]) ul li{padding:0 calc(1rem * 1.5);padding:0 calc(var(--pfe-theme--container-spacer,1rem) * 1.5);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:calc(1rem * 5);height:calc(var(--pfe-theme--container-spacer,1rem) * 5);-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;border-top:4px solid transparent;border-top:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) transparent;border-bottom:4px solid transparent;border-bottom:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) transparent;border-left:none;border-right:none}:host([horizontal]) ul li[active]{border-top:4px solid #06c;border-top:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-accent,#06c)}:host([horizontal]) ul a{text-decoration:none;color:#6a6e73;color:var(--pfe-theme--color--ui-disabled--text,#6a6e73)}:host([horizontal]) ul a[active]{color:#151515;color:var(--pfe-theme--color--text,#151515)}:host([horizontal]) ul a:hover{color:#151515;color:var(--pfe-theme--color--text,#151515)}@media (max-width:991px){:host([horizontal]) nav{min-height:calc(1rem * 5.5);min-height:calc(var(--pfe-theme--container-spacer,1rem) * 5.5);background-color:#f0f0f0;background-color:var(--pfe-theme--color--surface--lighter,#f0f0f0);--context:var(--pfe-theme--color--surface--lighter--context, light)}:host([horizontal]) .pfe-jump-links-nav{display:none}}:host([hidden]){display:none} /*# sourceMappingURL=pfe-jump-links-nav.min.css.map */</style>\n" + (this.horizontal ? "\n\n<nav>\n  <slot class=\"pfe-jump-links-nav__heading\" name=\"pfe-jump-links-nav--heading\">\n    <h3>" + (this.srText ? this.srText : "Jump to section") + "</h3>\n  </slot>\n  <slot class=\"pfe-jump-links-nav__logo\" name=\"pfe-jump-links-nav--logo\"></slot>\n  <div id=\"container\"></div>\n  <slot class=\"pfe-jump-links-nav__cta\" name=\"pfe-jump-links-nav--cta\"></slot>\n</nav>\n" : "\n\n<pfe-accordion>\n  <pfe-accordion-header>\n    <h3>" + (this.srText ? this.srText : "Jump to section") + "</h3>\n  </pfe-accordion-header>\n  <pfe-accordion-panel>\n    <nav>\n      <slot class=\"pfe-jump-links-nav__heading\" name=\"pfe-jump-links-nav--heading\">\n        <h3>" + (this.srText ? this.srText : "Jump to section") + "</h3>\n      </slot>\n      <slot class=\"pfe-jump-links-nav__logo\" name=\"pfe-jump-links-nav--logo\"></slot>\n      <div id=\"container\"></div>\n      <slot class=\"pfe-jump-links-nav__cta\" name=\"pfe-jump-links-nav--cta\"></slot>\n    </nav>\n  </pfe-accordion-panel>\n</pfe-accordion>");
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-jump-links-nav.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-jump-links-nav.scss";
      }
    }, {
      key: "header",
      get: function get() {
        if (!this.horizontal) return this.shadowRoot.querySelector("pfe-accordion-header");

        return this.getSlot("pfe-jump-links-nav--heading");
      }
    }, {
      key: "panel",
      get: function get() {
        // Use the ID from the navigation to target the panel elements
        // Automatically if there's only one set of tags on the page
        if (this.id) {
          this.removeAttribute("hidden");
          return document.querySelector("[scrolltarget=" + this.id + "]");
        } else {
          var panels = document.querySelectorAll(PfeJumpLinksPanel.tag);
          if (panels.length === 1) {
            this.removeAttribute("hidden");
            panels[0].id = this.randomId;
            return panels[0];
          } else if (panels.length > 1) {
            this.warn("Cannot locate a panel that is connected to this navigation element." + (this.id ? " Please add scrolltarget=\"" + this.id + "\" to the appropriate panel." : ""));
          } else {
            this.warn("Cannot locate any panels on this page. Please add a " + PfeJumpLinksPanel.tag + " element around the content you want to target.");
          }
        }

        // Hide the navigation if no content can be found
        this.setAttribute("hidden", "");
        return;
      }
    }, {
      key: "links",
      get: function get() {
        return this._menuContainer.querySelectorAll("a");
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.7.0";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-jump-links-nav";
      }
    }, {
      key: "PfeType",
      get: function get() {
        return PFElement.PfeTypes.Content;
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          autobuild: {
            title: "Autobuild",
            type: Boolean
          },
          horizontal: {
            title: "Horizontal",
            type: Boolean
          },
          srText: {
            title: "Screen reader text",
            type: String,
            default: "Jump to section"
          },
          color: {
            title: "Color",
            type: String,
            values: ["darkest"]
          },
          // @TODO: Deprecated in 2.0
          oldAutobuild: {
            alias: "autobuild",
            attr: "pfe-c-autobuild"
          },
          // @TODO: Deprecated in 2.0
          oldHorizontal: {
            alias: "horizontal",
            attr: "pfe-c-horizontal"
          },
          // @TODO: Deprecated in 2.0
          oldColor: {
            alias: "color",
            attr: "pfe-color"
          }
        };
      }
    }]);

    function PfeJumpLinksNav() {
      classCallCheck(this, PfeJumpLinksNav);

      var _this = possibleConstructorReturn(this, (PfeJumpLinksNav.__proto__ || Object.getPrototypeOf(PfeJumpLinksNav)).call(this, PfeJumpLinksNav, {
        type: PfeJumpLinksNav.PfeType
      }));

      _this._buildNav = _this._buildNav.bind(_this);
      _this._buildItem = _this._buildItem.bind(_this);
      _this._init = _this._init.bind(_this);
      _this._reportHeight = _this._reportHeight.bind(_this);
      _this.closeAccordion = _this.closeAccordion.bind(_this);
      _this._closeAccordion = _this._closeAccordion.bind(_this);

      _this._observer = new MutationObserver(_this._init);
      return _this;
    }

    createClass(PfeJumpLinksNav, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeJumpLinksNav.prototype.__proto__ || Object.getPrototypeOf(PfeJumpLinksNav.prototype), "connectedCallback", this).call(this);

        // Templated elements in the shadow DOM
        this._menuContainer = this.shadowRoot.querySelector("#container");
        this._navTag = this.shadowRoot.querySelector("nav");

        this._init();

        // Trigger the mutation observer
        this._observer.observe(this, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true
        });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        var _this2 = this;

        get(PfeJumpLinksNav.prototype.__proto__ || Object.getPrototypeOf(PfeJumpLinksNav.prototype), "disconnectedCallback", this).call(this);

        this._observer.disconnect();
        if (this.panel) this.panel.removeEventListener(PfeJumpLinksPanel.events.change, this._init);

        [].concat(toConsumableArray(this.links)).forEach(function (link) {
          link.removeEventListener("click", _this2.closeAccordion);
        });
      }
    }, {
      key: "closeAccordion",
      value: function closeAccordion() {
        // @TODO
        // Create JSON tokens for media query breakpoints
        if (window.matchMedia("(min-width: 992px)").matches) {
          return;
        }
        setTimeout(this._closeAccordion, 750);
      }
    }, {
      key: "_closeAccordion",
      value: function _closeAccordion() {
        this.shadowRoot.querySelector("pfe-accordion").collapseAll();
      }
    }, {
      key: "rebuild",
      value: function rebuild() {
        this._buildNav();
      }
    }, {
      key: "_buildItem",
      value: function _buildItem(data) {
        var isSubSection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var item = document.createElement("li");
        item.className = "pfe-jump-links-nav__item";

        var link = document.createElement("a");
        link.className = "pfe-jump-links-nav__link";
        link.href = "#" + data.target;
        link.setAttribute("data-target", data.target);
        link.innerHTML = data.content;

        if (data.subsection) link.classList.add("has-sub-section");
        if (isSubSection) link.classList.add("sub-section");

        item.appendChild(link);
        return item;
      }
    }, {
      key: "_buildNav",
      value: function _buildNav() {
        var _this3 = this;

        Promise.all([customElements.whenDefined(PfeJumpLinksPanel.tag)]).then(function () {
          var list = [];
          if (_this3.panel) {
            var item = {};
            var has_subsection = false;
            // Build an object with all the information we need to dynamically build the navigation
            _this3.panel.sections.forEach(function (sectionHeading, idx) {
              var is_subsection = sectionHeading.classList.contains("sub-section");

              // Empty out the item object if this isn't a nested section
              if (!has_subsection && !is_subsection) {
                if (Object.keys(item).length > 0) list.push(item);
                item = {};
              }

              // Get ID for the navigation
              var id = sectionHeading.id;
              if (!id && sectionHeading.previousElementSibling && sectionHeading.previousElementSibling.id) id = sectionHeading.previousElementSibling.id;

              if (is_subsection) {
                if (item.subsection) {
                  item.subsection.push({
                    target: id,
                    content: sectionHeading.innerHTML
                  });
                } else {
                  item.subsection = [{
                    target: id,
                    content: sectionHeading.innerHTML
                  }];
                }
              } else {
                item = {
                  target: id,
                  content: sectionHeading.innerHTML
                };
              }

              has_subsection = sectionHeading.classList.contains("has-sub-section");

              // If this is the last item in the set, push it to the object now
              if (idx === _this3.panel.sections.length - 1) list.push(item);
            });
          }

          var wrapper = document.createElement("ul");
          wrapper.className = "pfe-jump-links-nav";

          list.forEach(function (item) {
            var child = _this3._buildItem(item);

            if (item.subsection) {
              var nested = document.createElement("ul");
              nested.className = "sub-nav";
              item.subsection.forEach(function (subsection) {
                nested.appendChild(_this3._buildItem(subsection, true));
              });

              child.appendChild(nested);
            }

            wrapper.appendChild(child);
          });

          _this3._menuContainer.innerHTML = wrapper.outerHTML;
        });
      }
    }, {
      key: "_isValidLightDom",
      value: function _isValidLightDom() {
        if (!this.hasLightDOM()) {
          this.warn("You must have a <ul> tag in the light DOM");
          return false;
        }
        if ((this.hasSlot("pfe-jump-links-nav--logo") || this.hasSlot("pfe-jump-links-nav--link")) && !this.horizontal) {
          this.warn("logo and link slots NOT supported in vertical jump links");
        }
        if (this.children[1].tagName !== "UL") {
          if (!this.horizontal) {
            this.warn("The top-level list of links MUST be a <ul>");
          }

          return false;
        }
        if (Number.isInteger(Number(this.customVar))) {
          this.warn("Using an integer with a unit is not supported for custom property --pfe-jump-links-panel--offset. The component strips the unit using parseInt(). For example so 1rem would become 1 and behave as if you had entered 1px. Values with a pixel unit will behave correctly.");
        }

        return true;
      }
    }, {
      key: "_reportHeight",
      value: function _reportHeight() {
        var cssVarName = "--" + this.tag + "--Height--actual";
        var styles = window.getComputedStyle(this);

        var height = styles.getPropertyValue("height");
        if (window.matchMedia("(min-width: 992px)").matches) {
          height = "0px";
        }

        if (this.panel) this.panel.style.setProperty(cssVarName, height);
      }
    }, {
      key: "_init",
      value: function _init() {
        var _this4 = this;

        if (window.ShadyCSS) this._observer.disconnect();

        //Check that the light DOM is there
        if (!this.autobuild && this._isValidLightDom()) {
          var menu = this.querySelector("ul");

          // If the class is not already on the list wrapper
          if (!menu.classList.contains("pfe-jump-links-nav")) {
            menu.classList.add("pfe-jump-links-nav");
          }

          // Move the menu into the shadow DOM
          this._menuContainer.innerHTML = menu.outerHTML;

          // Build the label for screen readers
          var label = document.createElement("h2");
          label.className = "sr-only";
          label.setAttribute("hidden", "");
          label.innerText = this.srText;

          this._navTag.prepend(label);
        } else {
          this._buildNav();
        }

        this._reportHeight();

        // @TODO: Is this doing anything?
        // Set up a resize listener
        window.addEventListener("resize", function () {});

        // Attach the event listeners
        [].concat(toConsumableArray(this.links)).forEach(function (link) {
          link.addEventListener("click", _this4.closeAccordion);
        });

        if (this.panel && this.autobuild) this.panel.addEventListener(PfeJumpLinksPanel.events.change, this._init);

        // Trigger the mutation observer
        if (window.ShadyCSS) {
          this._observer.observe(this, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true
          });
        }
      }
    }]);
    return PfeJumpLinksNav;
  }(PFElement);

  /*!
   * PatternFly Elements: PfeJumpLinks 1.7.0
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

  // @TODO: Deprecate the parent wrapper?

  var PfeJumpLinks = function (_PFElement) {
    inherits(PfeJumpLinks, _PFElement);
    createClass(PfeJumpLinks, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:block}:host([hidden]){display:none} /*# sourceMappingURL=pfe-jump-links.min.css.map */</style>\n<slot></slot>";
      }

      // Injected at build-time

    }, {
      key: "schemaUrl",
      get: function get() {
        return "pfe-jump-links.json";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-jump-links.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-jump-links.scss";
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.7.0";
      }
    }, {
      key: "slots",
      get: function get() {
        return { "default": { "title": "Default slot", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "raw" }] } } };
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-jump-links";
      }
    }, {
      key: "PfeType",
      get: function get() {
        return PFElement.PfeTypes.Content;
      }
    }]);

    function PfeJumpLinks() {
      classCallCheck(this, PfeJumpLinks);
      return possibleConstructorReturn(this, (PfeJumpLinks.__proto__ || Object.getPrototypeOf(PfeJumpLinks)).call(this, PfeJumpLinks, { type: PfeJumpLinks.PfeType }));
    }

    return PfeJumpLinks;
  }(PFElement);

  PFElement.create(PfeJumpLinksPanel);
  PFElement.create(PfeJumpLinksNav);
  PFElement.create(PfeJumpLinks);

  return PfeJumpLinks;

})));
//# sourceMappingURL=pfe-jump-links.umd.js.map

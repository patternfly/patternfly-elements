(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global = global || self, global.PfePrimaryDetail = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && Object.prototype.hasOwnProperty.call(PFElement, 'default') ? PFElement['default'] : PFElement;

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

  /*!
   * PatternFly Elements: PfePrimaryDetail 1.9.0
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

  // Config for mutation observer to see if things change inside of the component
  var lightDomObserverConfig = {
    childList: true
  };

  // @TODO Add keyboard controls for arrows?
  // @TODO Add functions to open a specific item by index or ID

  var PfePrimaryDetail = function (_PFElement) {
    inherits(PfePrimaryDetail, _PFElement);
    createClass(PfePrimaryDetail, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>*{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}@supports (display:grid){:host{display:-ms-grid;display:grid;-ms-grid-columns:1fr 2fr;grid-template-columns:1fr 2fr;-ms-grid-columns:var(--pfe-primary-details--GridTemplateColumns,1fr 2fr);grid-template-columns:var(--pfe-primary-details--GridTemplateColumns,1fr 2fr);border:1px solid #d2d2d2;border:var(--pfe-primary-details--Border,var(--pfe-theme--ui--border-width--sm,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--ui--border--lighter,#d2d2d2));-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-pack:stretch;-webkit-justify-content:stretch;-ms-flex-pack:stretch;justify-content:stretch}}:host([hidden]){display:none}#details-nav{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:9px 0;border-right:1px solid #d2d2d2;border-right:var(--pfe-primary-details--Border,var(--pfe-theme--ui--border-width--sm,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--ui--border--lighter,#d2d2d2));overflow:hidden}::slotted([slot=details-nav]){display:block!important;-webkit-appearance:none!important;-moz-appearance:none!important;appearance:none!important;background:0 0!important;border:0!important;margin:0!important;padding:.5em 1.5em .5em .75em!important;font:inherit;line-height:1.5;text-align:left!important;color:#151515!important;color:var(--pfe-primary-details__nav--Color,var(--pfe-theme--color--text,#151515))!important;cursor:pointer!important}::slotted([aria-selected=true]){color:#06c!important;color:var(--pfe-primary-details__nav--Color--active,var(--pfe-theme--color--link,#06c))!important;background:#f0f0f0!important;background:var(--pfe-primary-details__nav--Background--active,#f0f0f0)!important}#details-wrapper{width:100%;padding:.5em 1.5em;background:#fff;background:var(--pfe-primary-details__details--Background,var(--pfe-theme--color--surface--lightest,#fff))}:host([consistent-height]) #details-wrapper{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}@supports (display:grid){:host([consistent-height]) #details-wrapper{display:-ms-grid;display:grid;-ms-grid-rows:1fr;-ms-grid-columns:1fr;grid-template:1fr/1fr;justify-items:start;-webkit-box-align:start;-webkit-align-items:start;-ms-flex-align:start;align-items:start}}::slotted([slot=details]){display:none!important}:host([consistent-height]) ::slotted([slot=details]){display:block!important;-ms-grid-row:1!important;-ms-grid-row-span:1!important;grid-row:1/span 1!important;-ms-grid-column:1!important;-ms-grid-column-span:1!important;grid-column:1/span 1!important;visibility:hidden!important}::slotted([aria-hidden=false]){display:block!important}:host([consistent-height]) ::slotted([aria-hidden=false]){visibility:visible!important} /*# sourceMappingURL=pfe-primary-detail.min.css.map */</style>\n<div id=\"details-nav\">\n  <slot name=\"details-nav--header\"></slot>\n  <slot name=\"details-nav\"></slot>\n  <slot name=\"details-nav--footer\"></slot>\n</div>\n<div id=\"details-wrapper\">\n  <slot name=\"details\"></slot>\n</div>";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-primary-detail.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-primary-detail.scss";
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.9.0";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-primary-detail";
      }
    }, {
      key: "meta",
      get: function get() {
        return {
          title: "Primary detail",
          description: ""
        };
      }
    }, {
      key: "events",
      get: function get() {
        return {
          hiddenTab: this.tag + ":hidden-tab",
          shownTab: this.tag + ":shown-tab"
        };
      }

      // Declare the type of this component

    }, {
      key: "PfeType",
      get: function get() {
        return PFElement.PfeTypes.Container;
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          // Set orientation (doesn't change)
          orientation: {
            title: "Orientation",
            type: String,
            attr: "aria-orientation",
            default: "vertical"
          },
          // Set aria role
          role: {
            type: String,
            default: "tablist"
          }
        };
      }
    }, {
      key: "slots",
      get: function get() {
        return {
          detailsNavHeader: {
            title: "Details Nav Header",
            type: "array",
            namedSlot: true
          },
          detailsNav: {
            title: "Details Nav",
            type: "array",
            namedSlot: true
          },
          detailsNavFooter: {
            title: "Details Nav Footer",
            type: "array",
            namedSlot: true
          },
          details: {
            title: "Details",
            type: "array",
            namedSlot: true
          }
        };
      }
    }]);

    function PfePrimaryDetail() {
      classCallCheck(this, PfePrimaryDetail);

      var _this = possibleConstructorReturn(this, (PfePrimaryDetail.__proto__ || Object.getPrototypeOf(PfePrimaryDetail)).call(this, PfePrimaryDetail, { type: PfePrimaryDetail.PfeType }));

      _this.isIE = !!window.MSInputMethodContext && !!document.documentMode;

      _this._handleHideShow = _this._handleHideShow.bind(_this);
      _this._initDetailsNav = _this._initDetailsNav.bind(_this);
      _this._initDetail = _this._initDetail.bind(_this);
      _this._processLightDom = _this._processLightDom.bind(_this);

      _this._slots = {
        detailsNav: null,
        details: null,
        detailsNavHeader: null,
        detailsNavFooter: null
      };

      // Setup mutation observer to watch for content changes
      _this._observer = new MutationObserver(_this._processLightDom);

      _this._detailsNav = _this.shadowRoot.getElementById("details-nav");
      _this._detailsWrapper = _this.shadowRoot.getElementById("details-wrapper");
      return _this;
    }

    createClass(PfePrimaryDetail, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfePrimaryDetail.prototype.__proto__ || Object.getPrototypeOf(PfePrimaryDetail.prototype), "connectedCallback", this).call(this);

        // Add appropriate markup and behaviors if DOM is ready
        if (this.hasLightDOM()) {
          this._processLightDom();
        }

        // Process the light DOM on any update
        this._observer.observe(this, lightDomObserverConfig);

        // Set first item as active for initial load
        this._handleHideShow({
          target: this._slots.detailsNav[0],
          pfeInitializing: true
        });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this._observer.disconnect();

        if (this._slots.detailsNav) {
          for (var index = 0; index < this._slots.detailsNav.length; index++) {
            this._slots.detailsNav[index].removeEventListener("click", this._handleHideShow);
          }
        }
      }

      /**
       * Updates markup of details-nav elements to be toggle buttons
       * @param {object} toggle Slotted element (probably a headline, unless it's been initialized already)
       * @param {integer} index The index of the item in the details-nav slot
       */

    }, {
      key: "_initDetailsNav",
      value: function _initDetailsNav(detailNavElement, index) {
        // Don't re-init anything that's been initialized already
        if (detailNavElement.hasAttribute("role") && detailNavElement.dataset.index && detailNavElement.id) {
          // Make sure the data-index attribute is up to date in case order has changed
          detailNavElement.dataset.index = index;
          return;
        }

        // Set data-index attribute
        detailNavElement.dataset.index = index;

        // If the detailNavElement does not have a ID, set a unique ID
        if (!detailNavElement.id) {
          detailNavElement.setAttribute("id", "pfe-detail-toggle-" + Math.random().toString(36).substr(2, 9));
        }

        detailNavElement.setAttribute("role", "tab");
        detailNavElement.setAttribute("aria-selected", "false");

        detailNavElement.addEventListener("click", this._handleHideShow);
        this._slots.detailsNav[index] = detailNavElement;
      }

      /**
       * Process detail wrapper elements
       * @param {object} detail DOM Object of detail wrapper
       * @param {integer} index The index of the item when detail wrappers are queried
       */

    }, {
      key: "_initDetail",
      value: function _initDetail(detail, index) {
        detail.dataset.index = index;

        // Don't re-init anything that's been initialized already
        if (detail.dataset.processed === "true") {
          return;
        }

        // If the toggle does not have a ID, set a unique ID
        if (!detail.hasAttribute("id")) {
          detail.setAttribute("id", "pfe-detail-" + Math.random().toString(36).substr(2, 9));
        }

        detail.setAttribute("role", "tabpanel");
        detail.setAttribute("aria-hidden", "true");

        var toggleId = this._slots.detailsNav[index].getAttribute("id");
        if (!detail.hasAttribute("aria-labelledby") && toggleId) {
          detail.setAttribute("aria-labelledby", toggleId);
        }

        // Swing back to detailsNav to add aria-controls, now that details have an Id
        if (!this._slots.detailsNav[index].hasAttribute("aria-controls") && detail.id) {
          this._slots.detailsNav[index].setAttribute("aria-controls", detail.id);
        }

        // Leave a reliable indicator that this has been initialized so we don't do it again
        detail.dataset.processed = true;
        detail.hidden = true;
      }

      /**
       * Adds nav functionality and adds additional HTML/attributes to markup
       */

    }, {
      key: "_processLightDom",
      value: function _processLightDom() {
        var _this2 = this;

        // Update slots
        this._slots = {
          detailsNav: this.getSlot("details-nav"),
          details: this.getSlot("details"),
          detailsNavHeader: this.getSlot("details-nav--header"),
          detailsNavFooter: this.getSlot("details-nav--footer")
        };

        if (this._slots.detailsNav.length !== this._slots.details.length) {
          this.error("The number of item headings does not match the number of item details. Found " + this._slots.detailsNav.length + " item headings & " + this._slots.details.length + " item details.");
          return;
        }

        // Setup left sidebar navigation
        this._slots.detailsNav.forEach(function (toggle, index) {
          _this2._initDetailsNav(toggle, index);
        });

        // Setup item detail elements
        this._slots.details.forEach(function (detail, index) {
          _this2._initDetail(detail, index);
        });
      }

      /**
       * Handles changes in state
       * @param {object} e Event object
       */

    }, {
      key: "_handleHideShow",
      value: function _handleHideShow(e) {
        var nextToggle = e.target;

        if (typeof nextToggle === "undefined") {
          return;
        }
        // If the clicked toggle is already open, no need to do anything
        else if (nextToggle.hasAttribute("aria-selected") && nextToggle.getAttribute("aria-selected") === "true") {
            return;
          }

        var currentToggle = null;

        // Find the active toggle by looking through them all and finding the ones with aria-selected set
        for (var index = 0; index < this._slots.detailsNav.length; index++) {
          var toggle = this._slots.detailsNav[index];
          if (toggle.hasAttribute("aria-selected") && toggle.getAttribute("aria-selected") === "true") {
            currentToggle = toggle;
            break;
          }
        }

        // Get details elements
        var nextDetails = this._slots.details[parseInt(nextToggle.dataset.index)];

        if (currentToggle) {
          var currentDetails = this._slots.details[parseInt(currentToggle.dataset.index)];

          // Remove Current Item's active attributes
          currentToggle.setAttribute("aria-selected", "false");

          // Remove Current Detail's attributes
          currentDetails.setAttribute("aria-hidden", "true");
          currentDetails.hidden = true;

          this.emitEvent(PfePrimaryDetail.events.hiddenTab, {
            detail: {
              tab: currentToggle,
              details: currentDetails
            }
          });
        }

        // Add active attributes to Next Item
        nextToggle.setAttribute("aria-selected", "true");

        // Add active attributes to Next Details
        nextDetails.setAttribute("aria-hidden", "false");
        nextDetails.hidden = false;

        this.emitEvent(PfePrimaryDetail.events.shownTab, {
          detail: {
            tab: nextToggle,
            details: nextDetails
          }
        });

        // Set focus to pane if this isn't initialization
        if (typeof e.pfeInitializing === "undefined") {
          var firstFocusableElement = nextDetails.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (firstFocusableElement) {
            firstFocusableElement.focus();
          }
        }
      }
    }]);
    return PfePrimaryDetail;
  }(PFElement);

  PFElement.create(PfePrimaryDetail);

  return PfePrimaryDetail;

})));
//# sourceMappingURL=pfe-primary-detail.umd.js.map

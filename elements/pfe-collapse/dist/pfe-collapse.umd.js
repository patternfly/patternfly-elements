(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['exports', '../../pfelement/dist/pfelement.umd'], factory) :
  (global = global || self, factory(global.PfeCollapse = {}, global.PFElement));
}(this, (function (exports, PFElement) { 'use strict';

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
   * PatternFly Elements: PfeCollapse 1.12.3
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

  function generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  var PfeCollapseToggle = function (_PFElement) {
    inherits(PfeCollapseToggle, _PFElement);
    createClass(PfeCollapseToggle, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:block;cursor:default} /*# sourceMappingURL=pfe-collapse-toggle.min.css.map */</style>\n<slot></slot>";
      }

      // Injected at build-time

    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-collapse-toggle.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-collapse-toggle.scss";
      }
    }, {
      key: "expanded",
      get: function get() {
        return this.getAttribute("aria-expanded") === "true";
      },
      set: function set(val) {
        var value = Boolean(val);
        this.setAttribute("aria-expanded", value);
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.12.3";
      }
    }, {
      key: "slots",
      get: function get() {
        return { "default": { "title": "Default", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "pfe-collapsibe-toggle" }, { "$ref": "pfe-collapse-panel" }] } } };
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-collapse-toggle";
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          ariaExpanded: {
            title: "Aria expanded",
            type: String,
            prefix: false,
            values: ["true", "false"]
          },
          ariaControls: {
            title: "Aria controls",
            type: String,
            prefix: false,
            observer: "_ariaControlsChanged"
          }
        };
      }
    }]);

    function PfeCollapseToggle(pfeClass) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$setTabIndex = _ref.setTabIndex,
          setTabIndex = _ref$setTabIndex === undefined ? true : _ref$setTabIndex,
          _ref$addKeydownHandle = _ref.addKeydownHandler,
          addKeydownHandler = _ref$addKeydownHandle === undefined ? true : _ref$addKeydownHandle;

      classCallCheck(this, PfeCollapseToggle);

      var _this = possibleConstructorReturn(this, (PfeCollapseToggle.__proto__ || Object.getPrototypeOf(PfeCollapseToggle)).call(this, pfeClass || PfeCollapseToggle));

      _this.controlledPanel = false;
      _this._setTabIndex = setTabIndex;
      _this._addKeydownHandler = addKeydownHandler;

      _this.addEventListener("click", _this._clickHandler);

      if (addKeydownHandler) {
        _this.addEventListener("keydown", _this._keydownHandler);
      }
      return _this;
    }

    createClass(PfeCollapseToggle, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeCollapseToggle.prototype.__proto__ || Object.getPrototypeOf(PfeCollapseToggle.prototype), "connectedCallback", this).call(this);

        this.expanded = false;

        this.id = this.id || PfeCollapseToggle.tag + "-" + generateId();

        this.setAttribute("role", "button");

        if (this._setTabIndex) {
          this.setAttribute("tabindex", 0);
        }

        if (!this.controlledPanel) {
          this._connectPanel(this.getAttribute("aria-controls"));
        }
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        get(PfeCollapseToggle.prototype.__proto__ || Object.getPrototypeOf(PfeCollapseToggle.prototype), "disconnectedCallback", this).call(this);

        this.removeEventListener("click", this._clickHandler);

        if (this._addKeydownHandler) {
          this.removeEventListener("keydown", this._keydownHandler);
        }
      }
    }, {
      key: "_ariaControlsChanged",
      value: function _ariaControlsChanged(oldVal, newVal) {
        if (!newVal) {
          return;
        }

        this._connectPanel(newVal);
      }
    }, {
      key: "toggle",
      value: function toggle() {
        if (this.hasAttribute("disabled")) {
          return;
        }

        this.expanded = !this.expanded;

        // one last try to hook up a panel
        if (!this.controlledPanel) {
          this._connectPanel(this.getAttribute("aria-controls"));
        }

        if (this.controlledPanel) {
          this.controlledPanel.expanded = this.expanded;

          this.emitEvent(PfeCollapse.events.change, {
            detail: {
              expanded: this.expanded,
              toggle: this,
              panel: this.controlledPanel
            }
          });
        } else {
          this.warn("This toggle doesn't have a panel associated with it");
        }
      }
    }, {
      key: "_clickHandler",
      value: function _clickHandler() {
        this.toggle();
      }
    }, {
      key: "_keydownHandler",
      value: function _keydownHandler(event) {
        var key = event.key;

        switch (key) {
          case " ":
          case "Spacebar":
          case "Enter":
            this.toggle();
            break;
        }
      }
    }, {
      key: "_connectPanel",
      value: function _connectPanel(id) {
        // this can be an issue if the pfe-collapse is located within
        // a shadow root
        if (this.getRootNode) {
          this.controlledPanel = this.getRootNode().querySelector("#" + id);
        } else {
          this.controlledPanel = document.querySelector("#" + id);
        }
      }
    }]);
    return PfeCollapseToggle;
  }(PFElement);

  var PfeCollapsePanel = function (_PFElement2) {
    inherits(PfeCollapsePanel, _PFElement2);
    createClass(PfeCollapsePanel, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:none;overflow:hidden;will-change:height}:host([expanded]){display:block;position:relative}:host(.animating){display:block;-webkit-transition:height .3s ease-in-out;transition:height .3s ease-in-out} /*# sourceMappingURL=pfe-collapse-panel.min.css.map */</style>\n<slot></slot>";
      }

      // Injected at build-time

    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-collapse-panel.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-collapse-panel.scss";
      }
    }, {
      key: "animates",
      get: function get() {
        return this.animation === "false" ? false : true;
      }
    }, {
      key: "expanded",
      get: function get() {
        return this.hasAttribute("expanded") || this.hasAttribute("pfe-expanded"); // @TODO: Deprecated
      },
      set: function set(val) {
        var value = Boolean(val);

        if (value) {
          this.setAttribute("pfe-expanded", ""); // @TODO: Deprecated
          this.setAttribute("expanded", "");

          if (this.animates) {
            var height = this.getBoundingClientRect().height;
            this._fireAnimationEvent("opening");
            this._animate(0, height);
          }
        } else {
          if (this.hasAttribute("expanded") || this.hasAttribute("pfe-expanded")) {
            // @TODO: Deprecated
            var _height = this.getBoundingClientRect().height;
            this.removeAttribute("expanded");
            this.removeAttribute("pfe-expanded"); // @TODO: Deprecated

            if (this.animates) {
              this._fireAnimationEvent("closing");
              this._animate(_height, 0);
            }
          }
        }
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.12.3";
      }
    }, {
      key: "slots",
      get: function get() {
        return { "default": { "title": "Default", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "pfe-collapsibe-toggle" }, { "$ref": "pfe-collapse-panel" }] } } };
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-collapse-panel";
      }
    }, {
      key: "events",
      get: function get() {
        return {
          animationStart: this.tag + ":animation-start",
          animationEnd: this.tag + ":animation-end"
        };
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          animation: {
            title: "Animation",
            type: String,
            values: ["false"]
          },
          // @TODO: Deprecated
          oldAnimation: {
            alias: "animation",
            attr: "pfe-animation"
          }
        };
      }
    }]);

    function PfeCollapsePanel(pfeClass) {
      classCallCheck(this, PfeCollapsePanel);
      return possibleConstructorReturn(this, (PfeCollapsePanel.__proto__ || Object.getPrototypeOf(PfeCollapsePanel)).call(this, pfeClass || PfeCollapsePanel));
    }

    createClass(PfeCollapsePanel, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeCollapsePanel.prototype.__proto__ || Object.getPrototypeOf(PfeCollapsePanel.prototype), "connectedCallback", this).call(this);

        this.expanded = false;

        this.id = this.id || PfeCollapsePanel.tag + "-" + generateId();
      }
    }, {
      key: "_animate",
      value: function _animate(start, end) {
        var _this3 = this;

        this.classList.add("animating");
        this.style.height = start + "px";

        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            _this3.style.height = end + "px";
            _this3.classList.add("animating");
            _this3.addEventListener("transitionend", _this3._transitionEndHandler);
          });
        });
      }
    }, {
      key: "_transitionEndHandler",
      value: function _transitionEndHandler(event) {
        event.target.style.height = "";
        event.target.classList.remove("animating");
        event.target.removeEventListener("transitionend", this._transitionEndHandler);

        this.emitEvent(PfeCollapsePanel.events.animationEnd, {
          detail: {
            expanded: this.expanded,
            panel: this
          }
        });
      }
    }, {
      key: "_fireAnimationEvent",
      value: function _fireAnimationEvent(state) {
        this.emitEvent(PfeCollapsePanel.events.animationStart, {
          detail: {
            state: state,
            panel: this
          }
        });
      }
    }]);
    return PfeCollapsePanel;
  }(PFElement);

  var PfeCollapse = function (_PFElement3) {
    inherits(PfeCollapse, _PFElement3);
    createClass(PfeCollapse, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:block}:host([hidden]){display:none}:host(.animating),:host([expanded]){display:block} /*# sourceMappingURL=pfe-collapse.min.css.map */</style>\n<slot></slot>";
      }

      // Injected at build-time

    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-collapse.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-collapse.scss";
      }
    }, {
      key: "schemaUrl",
      get: function get() {
        return "pfe-collapse.json";
      }
    }, {
      key: "animates",
      get: function get() {
        return this.animation === "false" ? false : true;
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.12.3";
      }
    }, {
      key: "slots",
      get: function get() {
        return { "default": { "title": "Default", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "pfe-collapsibe-toggle" }, { "$ref": "pfe-collapse-panel" }] } } };
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-collapse";
      }
    }, {
      key: "events",
      get: function get() {
        return {
          change: this.tag + ":change"
        };
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          animation: {
            title: "Animation",
            type: String,
            values: ["false"],
            observer: "_animationChanged"
          },
          // @TODO: Deprecated
          oldAnimation: {
            alias: "animation",
            attr: "pfe-animation"
          }
        };
      }
    }]);

    function PfeCollapse(pfeClass) {
      classCallCheck(this, PfeCollapse);

      var _this4 = possibleConstructorReturn(this, (PfeCollapse.__proto__ || Object.getPrototypeOf(PfeCollapse)).call(this, pfeClass || PfeCollapse));

      _this4._toggle = null;
      _this4._panel = null;
      _this4._linkControls = _this4._linkControls.bind(_this4);
      _this4._changeHandler = _this4._changeHandler.bind(_this4);
      _this4._observer = new MutationObserver(_this4._linkControls);

      _this4.addEventListener(PfeCollapse.events.change, _this4._changeHandler);
      _this4.addEventListener(PfeCollapse.events.animationStart, _this4._animationStartHandler);
      _this4.addEventListener(PfeCollapse.events.animationEnd, _this4._animationEndHandler);
      return _this4;
    }

    createClass(PfeCollapse, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this5 = this;

        get(PfeCollapse.prototype.__proto__ || Object.getPrototypeOf(PfeCollapse.prototype), "connectedCallback", this).call(this);

        Promise.all([customElements.whenDefined(PfeCollapsePanel.tag), customElements.whenDefined(PfeCollapseToggle.tag)]).then(function () {
          if (_this5.hasLightDOM()) _this5._linkControls();

          _this5._observer.observe(_this5, { childList: true });
        });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        get(PfeCollapse.prototype.__proto__ || Object.getPrototypeOf(PfeCollapse.prototype), "disconnectedCallback", this).call(this);

        this.removeEventListener(PfeCollapse.events.change, this._changeHandler);
        this.removeEventListener(PfeCollapse.events.animationStart, this._animationStartHandler);
        this.removeEventListener(PfeCollapse.events.animationEnd, this._animationEndHandler);
        this._observer.disconnect();
      }
    }, {
      key: "_animationChanged",
      value: function _animationChanged(oldVal, newVal) {
        if (!newVal) {
          return;
        }

        if (newVal !== "false" && newVal !== "true") {
          return;
        }

        if (this._panel) {
          this._panel.animation = newVal;
        }
      }
    }, {
      key: "toggle",
      value: function toggle() {
        this._toggle.toggle();
      }
    }, {
      key: "_linkControls",
      value: function _linkControls() {
        this._toggle = this.querySelector(PfeCollapseToggle.tag);
        this._panel = this.querySelector(PfeCollapsePanel.tag);

        this._toggle.setAttribute("aria-controls", this._panel.id);
      }
    }, {
      key: "_animationStartHandler",
      value: function _animationStartHandler() {
        this.classList.add("animating");
      }
    }, {
      key: "_animationEndHandler",
      value: function _animationEndHandler() {
        this.classList.remove("animating");
      }
    }, {
      key: "_changeHandler",
      value: function _changeHandler(event) {}
    }]);
    return PfeCollapse;
  }(PFElement);

  PFElement.create(PfeCollapse);
  PFElement.create(PfeCollapseToggle);
  PFElement.create(PfeCollapsePanel);

  exports.PfeCollapse = PfeCollapse;
  exports.PfeCollapsePanel = PfeCollapsePanel;
  exports.PfeCollapseToggle = PfeCollapseToggle;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pfe-collapse.umd.js.map

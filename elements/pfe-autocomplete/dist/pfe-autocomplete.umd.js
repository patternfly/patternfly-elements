(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global.PfeAutocomplete = factory(global.PFElement));
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

  /*!
   * PatternFly Elements: PfeAutocomplete 1.0.0-prerelease.55
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

  var KEYCODE = {
    ENTER: 13,
    DOWN: 40,
    UP: 38,
    ESC: 27
  };

  // use this variable to debounce api call when user types very fast
  var throttle = false;

  var PfeAutocomplete = function (_PFElement) {
    inherits(PfeAutocomplete, _PFElement);
    createClass(PfeAutocomplete, [{
      key: "html",
      get: function get$$1() {
        return "<style>.sr-only{position:absolute;overflow:hidden;clip:rect(0,0,0,0);height:1px;width:1px;margin:-1px;padding:0;border:0}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#151515!important}}:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, #fafafa);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, #fafafa);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #8476d1);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-saturated, underline);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-saturated, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-saturated, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-saturated, underline)}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}:host{display:block;position:relative;font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-theme--font-family, \"Overpass\", Overpass, Helvetica, helvetica, arial, sans-serif)}#input-box-wrapper{border-color:#0277bd;border-color:var(--pfe-theme--color--feedback--info,#0277bd)}#input-box-wrapper ::slotted(input){width:100%;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-box-shadow:inset 0 0 .625rem 0 #fafafa!important;box-shadow:inset 0 0 .625rem 0 #fafafa!important;-webkit-box-shadow:var(--pfe-autocomplete--BoxShadow,var(--pfe-theme--box-shadow--inset,inset 0 0 .625rem 0 #fafafa))!important;box-shadow:var(--pfe-autocomplete--BoxShadow,var(--pfe-theme--box-shadow--inset,inset 0 0 .625rem 0 #fafafa))!important;padding-left:10px;padding-right:30px;border-radius:2px;border-radius:var(--pfe-theme--ui--border-radius,2px);background-color:#fff;background-color:var(--pfe-autocomplete--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));border:1px solid #d2d2d2;border:var(--pfe-autocomplete--Border,var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2));font-size:16px;font-size:var(--pfe-theme--font-size,16px);height:calc(20px * 2);height:calc(var(--pfe-theme--ui--element--size,20px) * 2);-webkit-transition:border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;opacity:1;outline:0}#input-box-wrapper ::slotted(input:disabled),#input-box-wrapper button:disabled{cursor:not-allowed;background-color:transparent;color:#ccc;opacity:.5}#input-box-wrapper ::slotted(input:focus),#input-box-wrapper button:focus{outline:0}#input-box-wrapper ::slotted(input),#input-box-wrapper button{-webkit-appearance:none}#input-box-wrapper ::slotted([type=search]::-ms-clear){display:none}#input-box-wrapper ::slotted(input[type=search]::-webkit-search-cancel-button),#input-box-wrapper ::slotted(input[type=search]::-webkit-search-decoration){-webkit-appearance:none}button{color:#6a6e73;color:var(--pfe-theme--color--ui-base,#6a6e73);background-color:transparent;border:none;position:absolute;top:0;bottom:0;cursor:pointer}button.clear-search{right:30px;width:20px;margin:2px 1px;background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff)}button.clear-search:hover{color:#6a6e73;color:var(--pfe-theme--color--ui-base,#6a6e73)}button.clear-search svg{width:12px;stroke:#d2d2d2;stroke:var(--pfe-theme--color--surface--border,#d2d2d2)}button.clear-search:focus svg,button.clear-search:hover svg{opacity:1;stroke:#06c;stroke:var(--pfe-theme--color--link,#06c)}button[disabled].clear-search:focus svg,button[disabled].clear-search:hover svg{stroke:#d2d2d2;stroke:var(--pfe-theme--color--surface--border,#d2d2d2)}button.search-button{right:1px;width:30px}button.search-button svg{fill:#06c;fill:var(--pfe-theme--color--link,#06c);width:16px}button.search-button:focus svg,button.search-button:hover svg{fill:#004080;fill:var(--pfe-theme--color--link--hover,#004080)}button.search-button:disabled svg{fill:#d2d2d2;fill:var(--pfe-theme--color--ui-disabled,#d2d2d2)}.loading{position:absolute;width:30px;right:52px;top:0;bottom:0}.loading svg{width:26px;padding-top:7px}\n/*# sourceMappingURL=pfe-autocomplete.min.css.map */\n</style><div id=\"input-box-wrapper\">\n    <slot></slot>\n\n    <span class=\"loading\" aria-hidden=\"true\" hidden>\n        <svg viewBox=\"0 0 40 40\" enable-background=\"new 0 0 40 40\">\n          <path opacity=\"0.2\" fill=\"#000\" d=\"M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\n          s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\n          c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z\"/>\n          <path fill=\"#000\" d=\"M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\n          C22.32,8.481,24.301,9.057,26.013,10.047z\">\n          <animateTransform attributeType=\"xml\"\n            attributeName=\"transform\"\n            type=\"rotate\"\n            from=\"0 20 20\"\n            to=\"360 20 20\"\n            dur=\"0.5s\"\n            repeatCount=\"indefinite\"/>\n          </path>\n        </svg>\n    </span>\n\n    <button class=\"clear-search\" type=\"button\" aria-label=\"clear search query\" hidden>\n      <svg viewBox=\"0 0 40 40\" enable-background=\"new 0 0 40 40\">\n        <line x1=\"5\" y1=\"5\" x2=\"35\" y2=\"35\" stroke-width=\"10\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"></line>\n        <line x1=\"35\" y1=\"5\" x2=\"5\" y2=\"35\" stroke-width=\"10\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"></line>\n      </svg>\n    </button>\n\n    <button class=\"search-button\" type=\"button\" aria-label=\"Search\" disabled>\n      <svg viewBox=\"0 0 512 512\">\n        <path d=\"M256.233,5.756c-71.07,15.793-141.44,87.863-155.834,159.233c-11.495,57.076,0.3,111.153,27.688,154.335L6.339,441.172\n      c-8.596,8.596-8.596,22.391,0,30.987l33.286,33.286c8.596,8.596,22.391,8.596,30.987,0L192.26,383.796\n      c43.282,27.688,97.559,39.683,154.734,28.188c79.167-15.893,142.04-77.067,159.632-155.934\n      C540.212,104.314,407.968-27.93,256.233,5.756z M435.857,208.37c0,72.869-59.075,131.944-131.944,131.944\n      S171.969,281.239,171.969,208.37S231.043,76.426,303.913,76.426S435.857,135.501,435.857,208.37z\"/>\n      </svg>\n    </button>\n</div>\n<pfe-search-droplist id=\"dropdown\"></pfe-search-droplist>";
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-autocomplete.json";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-autocomplete.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-autocomplete.scss";
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.55";
      }
    }, {
      key: "properties",
      get: function get$$1() {
        return { "debounce_timer": { "title": "Debounce", "description": "The amount of time that should pass before the next API call is made", "type": "string", "prefixed": false }, "init_value": { "title": "Initial value", "description": "An initial value to show in the input field", "type": "string", "prefixed": false }, "is_disabled": { "title": "Is disabled", "description": "Disable the input", "type": "boolean", "prefixed": false } };
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return { "content": { "title": "Content", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "input" }] }, "required": true } };
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-autocomplete";
      }
    }, {
      key: "events",
      get: function get$$1() {
        return {
          search: this.tag + ":search-event",
          select: this.tag + ":option-selected",
          optionsShown: this.tag + ":options-shown",
          slotchange: "slotchange"
        };
      }
    }]);

    function PfeAutocomplete() {
      classCallCheck(this, PfeAutocomplete);

      var _this = possibleConstructorReturn(this, (PfeAutocomplete.__proto__ || Object.getPrototypeOf(PfeAutocomplete)).call(this, PfeAutocomplete));

      _this._slotchangeHandler = _this._slotchangeHandler.bind(_this);

      _this._slot = _this.shadowRoot.querySelector("slot");
      _this._slot.addEventListener(PfeAutocomplete.events.slotchange, _this._slotchangeHandler);
      return _this;
    }

    createClass(PfeAutocomplete, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeAutocomplete.prototype.__proto__ || Object.getPrototypeOf(PfeAutocomplete.prototype), "connectedCallback", this).call(this);

        this.loading = false;
        this.debounce = this.debounce || 300;
        this._ariaAnnounceTemplate = "There are ${numOptions} suggestions. Use the up and down arrows to browse.";

        // clear button
        this._clearBtn = this.shadowRoot.querySelector(".clear-search");
        this._clearBtn.addEventListener("click", this._clear.bind(this));

        // search button
        this._searchBtn = this.shadowRoot.querySelector(".search-button");
        this._searchBtn.addEventListener("click", this._search.bind(this));

        this._dropdown = this.shadowRoot.querySelector("#dropdown");
        this._dropdown.data = [];

        this.activeIndex = null;

        this.addEventListener("keyup", this._inputKeyUp.bind(this));

        // these two events, fire search
        this.addEventListener(PfeAutocomplete.events.search, this._closeDroplist.bind(this));
        this.addEventListener(PfeAutocomplete.events.select, this._optionSelected.bind(this));
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.removeEventListener("keyup", this._inputKeyUp);

        this.removeEventListener(PfeAutocomplete.events.search, this._closeDroplist);
        this.removeEventListener(PfeAutocomplete.events.select, this._optionSelected);
        this._slot.removeEventListener(PfeAutocomplete.events.slotchange, this._slotchangeHandler);
        if (this._input) {
          this._input.removeEventListener("input", this._inputChanged);
          this._input.removeEventListener("blur", this._closeDroplist);
        }

        this._clearBtn.removeEventListener("click", this._clear);
        this._searchBtn.removeEventListener("click", this._search);
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldVal, newVal) {
        get(PfeAutocomplete.prototype.__proto__ || Object.getPrototypeOf(PfeAutocomplete.prototype), "attributeChangedCallback", this).call(this);

        var slotNodes = this.shadowRoot.querySelector("slot").assignedNodes();
        var slotElems = slotNodes.filter(function (n) {
          return n.nodeType === Node.ELEMENT_NODE;
        });
        var _input = slotElems[0];

        var _clearBtn = this.shadowRoot.querySelector(".clear-search");
        var _searchBtn = this.shadowRoot.querySelector(".search-button");

        switch (attr) {
          case "loading":
            if (!this.loading || _input.value === "") {
              this.shadowRoot.querySelector(".loading").setAttribute("hidden", "");
            } else {
              this.shadowRoot.querySelector(".loading").removeAttribute("hidden");
            }
            break;

          case "init-value":
            if (this["init-value"] !== newVal) {
              // set inputbox and buttons in the inner component
              _input.value = newVal;
              if (newVal !== "" && !this.isDisabled) {
                _searchBtn.removeAttribute("disabled");
                _clearBtn.removeAttribute("hidden");
              } else {
                _searchBtn.setAttribute("disabled", "");
                _clearBtn.setAttribute("hidden", "");
              }
            }
            break;

          case "is-disabled":
            if (this.isDisabled) {
              _clearBtn.setAttribute("disabled", "");
              _searchBtn.setAttribute("disabled", "");
              _input.setAttribute("disabled", "");
            } else {
              _clearBtn.removeAttribute("disabled");
              _searchBtn.removeAttribute("disabled");
              _input.removeAttribute("disabled");
            }
            break;
        }
      }
    }, {
      key: "_slotchangeHandler",
      value: function _slotchangeHandler() {
        // input box
        var slotNodes = this.shadowRoot.querySelector("slot").assignedNodes();
        var slotElems = slotNodes.filter(function (n) {
          return n.nodeType === Node.ELEMENT_NODE;
        });

        if (slotElems.length === 0) {
          console.error(PfeAutocomplete.tag + ": There must be a input tag in the light DOM");

          return;
        }

        this._input = slotElems[0];

        if (this._input.tagName.toLowerCase() !== "input") {
          console.error(PfeAutocomplete.tag + ": The only child in the light DOM must be an input tag");

          return;
        }

        this._input.addEventListener("input", this._inputChanged.bind(this));
        this._input.addEventListener("blur", this._closeDroplist.bind(this));

        this._input.setAttribute("role", "combobox");

        if (!this._input.hasAttribute("aria-label")) {
          this._input.setAttribute("aria-label", "Search");
        }

        this._input.setAttribute("aria-autocomplete", "both");
        this._input.setAttribute("aria-haspopup", "true");
        this._input.setAttribute("type", "search");
        this._input.setAttribute("autocomplete", "off");
        this._input.setAttribute("autocorrect", "off");
        this._input.setAttribute("autocapitalize", "off");
        this._input.setAttribute("spellcheck", "false");

        this._dropdown._ariaAnnounceTemplate = this.getAttribute("aria-announce-template") || this._ariaAnnounceTemplate;
      }
    }, {
      key: "_inputChanged",
      value: function _inputChanged() {
        var _this2 = this;

        if (this._input.value === "") {
          this._searchBtn.setAttribute("disabled", "");
          this._clearBtn.setAttribute("hidden", "");

          this._reset();
          return;
        } else {
          if (!this._input.hasAttribute("disabled")) {
            this._searchBtn.removeAttribute("disabled");
          }
          this._clearBtn.removeAttribute("hidden");
        }

        if (throttle === false) {
          throttle = true;

          window.setTimeout(function () {
            _this2._sendAutocompleteRequest(_this2._input.value);
            throttle = false;
          }, this.debounce);
        }
      }
    }, {
      key: "_clear",
      value: function _clear() {
        this._input.value = "";
        this._clearBtn.setAttribute("hidden", "");
        this._searchBtn.setAttribute("disabled", "");
        this._input.focus();
      }
    }, {
      key: "_search",
      value: function _search() {
        this._doSearch(this._input.value);
      }
    }, {
      key: "_closeDroplist",
      value: function _closeDroplist() {
        this._dropdown.open = null;
        this._dropdown.removeAttribute("active-index");
      }
    }, {
      key: "_openDroplist",
      value: function _openDroplist() {
        this.activeIndex = null;
        this._dropdown.setAttribute("open", true);
        this._dropdown.setAttribute("active-index", null);
        this.emitEvent(PfeAutocomplete.events.optionsShown, {
          composed: true
        });
      }
    }, {
      key: "_optionSelected",
      value: function _optionSelected(e) {
        var selectedValue = e.detail.optionValue;

        // update input box with selected value from options list
        this._input.value = selectedValue;

        // send search request
        this._doSearch(selectedValue);
      }
    }, {
      key: "_doSearch",
      value: function _doSearch(searchQuery) {
        this.emitEvent(PfeAutocomplete.events.search, {
          detail: { searchValue: searchQuery },
          composed: true
        });
        this._reset();
        this.selectedValue = searchQuery;
      }
    }, {
      key: "_sendAutocompleteRequest",
      value: function _sendAutocompleteRequest(input) {
        if (!this.autocompleteRequest) return;

        this.autocompleteRequest({ query: input }, this._autocompleteCallback.bind(this));
      }
    }, {
      key: "_autocompleteCallback",
      value: function _autocompleteCallback(response) {
        this._dropdown.data = response;
        this._dropdown.reflow = true;
        response.length !== 0 ? this._openDroplist() : this._closeDroplist();
      }
    }, {
      key: "_reset",
      value: function _reset() {
        this._dropdown.activeIndex = null;
        this._input.setAttribute("aria-activedescendant", "");
        this._dropdown.data = [];
        this._closeDroplist();
      }
    }, {
      key: "_activeOption",
      value: function _activeOption(activeIndex) {
        if (activeIndex === null || activeIndex === "null") return;
        return this._dropdown.shadowRoot.querySelector("li:nth-child(" + (parseInt(activeIndex, 10) + 1) + ")").innerHTML;
      }
    }, {
      key: "_inputKeyUp",
      value: function _inputKeyUp(e) {
        var key = e.keyCode;

        if (this._dropdown.data.length === 0 && key !== KEYCODE.DOWN && key !== KEYCODE.UP && key !== KEYCODE.ENTER && key !== KEYCODE.ESC) return;

        var activeIndex = this._dropdown.activeIndex;
        var optionsLength = this._dropdown.data.length;

        if (key == KEYCODE.ESC) {
          this._closeDroplist();
        } else if (key === KEYCODE.UP) {
          if (!this._dropdown.open) {
            return;
          }

          activeIndex = activeIndex === null || activeIndex === "null" ? optionsLength : parseInt(activeIndex, 10);

          activeIndex -= 1;

          if (activeIndex < 0) {
            activeIndex = optionsLength - 1;
          }

          this._input.value = this._activeOption(activeIndex);
        } else if (key === KEYCODE.DOWN) {
          if (!this._dropdown.open) {
            return;
          }

          activeIndex = activeIndex === null || activeIndex === "null" ? -1 : parseInt(activeIndex, 10);
          activeIndex += 1;

          if (activeIndex > optionsLength - 1) {
            activeIndex = 0;
          }

          this._input.value = this._activeOption(activeIndex);
        } else if (key === KEYCODE.ENTER) {
          if (this._activeOption(activeIndex)) {
            this.emitEvent(PfeAutocomplete.events.select, {
              detail: { optionValue: this._activeOption(activeIndex) },
              composed: true
            });

            return;
          }

          var selectedValue = this._input.value;
          this._doSearch(selectedValue);
          return;
        }

        if (activeIndex !== null && activeIndex !== "null") {
          this._input.setAttribute("aria-activedescendant", "option-" + activeIndex);
        } else {
          this._input.setAttribute("aria-activedescendant", "");
        }

        this.activeIndex = activeIndex;
        this._dropdown.activeIndex = activeIndex;
      }
    }, {
      key: "selectedValue",
      get: function get$$1() {
        return this.getAttribute("selected-value");
      },
      set: function set$$1(val) {
        this.setAttribute("selected-value", val);
      }
    }, {
      key: "isDisabled",
      set: function set$$1(value) {
        if (value) {
          this.setAttribute("is-disabled", "");
        } else {
          this.removeAttribute("is-disabled");
        }
      },
      get: function get$$1() {
        return this.hasAttribute("is-disabled");
      }
    }, {
      key: "loading",
      set: function set$$1(value) {
        var loading = Boolean(value);
        if (loading) {
          this.setAttribute("loading", "");
        } else {
          this.removeAttribute("loading");
        }
      },
      get: function get$$1() {
        return this.hasAttribute("loading");
      }
    }, {
      key: "initValue",
      get: function get$$1() {
        return this.getAttribute("init-value");
      },
      set: function set$$1(val) {
        this.setAttribute("init-value", val);
      }
    }, {
      key: "debounce",
      get: function get$$1() {
        return this.getAttribute("debounce");
      },
      set: function set$$1(val) {
        this.setAttribute("debounce", val);
      }
    }], [{
      key: "observedAttributes",
      get: function get$$1() {
        return ["init-value", "loading", "is-disabled"];
      }
    }]);
    return PfeAutocomplete;
  }(PFElement);

  /*
  * - Attributes ------------------------------------
  * open               | Set when the combo box dropdown is open
  * active-index       | Set selected option
  * reflow             | Re-renders the dropdown

  * - Events ----------------------------------------
  * pfe-autocomplete:option-selected | Fires when an option is selected.
    event.details.optionValue contains the selected value.
  */


  var PfeSearchDroplist = function (_PFElement2) {
    inherits(PfeSearchDroplist, _PFElement2);
    createClass(PfeSearchDroplist, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{position:relative;display:none;font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-theme--font-family, \"Overpass\", Overpass, Helvetica, helvetica, arial, sans-serif);font-size:16px;font-size:var(--pfe-theme--font-size,16px);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5)}:host([open]){display:block}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.droplist{position:absolute;top:100%;left:0;right:0;max-height:250px;z-index:9999;overflow-y:scroll;overflow-x:hidden;border:1px solid #ccc;background-color:#fff}ul{font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-theme--font-family, \"Overpass\", Overpass, Helvetica, helvetica, arial, sans-serif);font-size:16px;font-size:var(--pfe-theme--font-size,16px);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);border-top:none;margin:0;padding:0;list-style:none;cursor:pointer}ul li{display:list-item;cursor:pointer;padding:10px;margin:0}ul li.active{background-color:#f0f0f0;background-color:var(--pfe-theme--color--surface--lighter,#f0f0f0)}\n/*# sourceMappingURL=pfe-search-droplist.min.css.map */\n</style><div class=\"suggestions-aria-help sr-only\" aria-hidden=\"false\" role=\"status\"></div>\n<div class=\"droplist\">\n  <ul role=\"listbox\" tabindex=\"-1\">\n  </ul>\n</div>";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-search-droplist.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-search-droplist.scss";
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.55";
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-search-droplist";
      }
    }]);

    function PfeSearchDroplist() {
      classCallCheck(this, PfeSearchDroplist);
      return possibleConstructorReturn(this, (PfeSearchDroplist.__proto__ || Object.getPrototypeOf(PfeSearchDroplist)).call(this, PfeSearchDroplist));
    }

    createClass(PfeSearchDroplist, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeSearchDroplist.prototype.__proto__ || Object.getPrototypeOf(PfeSearchDroplist.prototype), "connectedCallback", this).call(this);

        this._ariaAnnounce = this.shadowRoot.querySelector(".suggestions-aria-help");

        this.activeIndex = null;
        this._ul = this.shadowRoot.querySelector("ul");
        this._ul.addEventListener("mousedown", this._optionSelected.bind(this));
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this._ul.removeEventListener("mousedown", this._optionSelected);
      }
    }, {
      key: "_optionSelected",
      value: function _optionSelected(e) {
        if (e.target.tagName === "LI") {
          this.emitEvent(PfeAutocomplete.events.select, {
            detail: { optionValue: e.target.innerText },
            composed: true
          });
        }
      }
    }, {
      key: "_renderOptions",
      value: function _renderOptions() {
        this.reflow = "";

        var options = this.data;
        var ariaAnnounceText = "";

        if (this._ariaAnnounceTemplate) {
          ariaAnnounceText = this._ariaAnnounceTemplate.replace("${numOptions}", options.length);
        }

        this._ariaAnnounce.textContent = ariaAnnounceText;
        this._ariaAnnounce.setAttribute("aria-live", "polite");

        this._ul.innerHTML = "" + options.map(function (item, index) {
          return "<li id=\"option-" + index + "\" role=\"option\" tabindex=\"-1\" value=\"" + item + "\">" + item + "</li>";
        }).join("");
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldVal, newVal) {
        get(PfeSearchDroplist.prototype.__proto__ || Object.getPrototypeOf(PfeSearchDroplist.prototype), "attributeChangedCallback", this).call(this);

        if (this[name] !== newVal) {
          this[name] = newVal;
        }

        if (attr === "active-index" && oldVal !== newVal) {
          this._activeIndexChanged();
        }

        if (attr === "reflow") {
          this._renderOptions();
        }
      }
    }, {
      key: "_activeIndexChanged",
      value: function _activeIndexChanged() {
        if (!this.data || this.data.length === 0 || this.activeIndex === null || this.activeIndex === "null") return;

        // remove active class
        if (this._ul.querySelector(".active")) {
          this._ul.querySelector(".active").classList.remove("active");
        }

        // add active class to selected option
        var activeOption = this._ul.querySelector("li:nth-child(" + (parseInt(this.activeIndex, 10) + 1) + ")");

        activeOption.classList.add("active");

        // scroll to selected element when selected item with keyboard is out of view
        var ulWrapper = this.shadowRoot.querySelector(".droplist");
        var activeOptionHeight = activeOption.offsetHeight;
        activeOptionHeight += parseInt(window.getComputedStyle(activeOption).getPropertyValue("margin-bottom"), 10);
        ulWrapper.scrollTop = activeOption.offsetTop - ulWrapper.offsetHeight + activeOptionHeight;
      }
    }, {
      key: "open",
      get: function get$$1() {
        return this.hasAttribute("open");
      },
      set: function set$$1(val) {
        val = Boolean(val);

        if (val) {
          this.setAttribute("open", "");
        } else {
          this.removeAttribute("open");
        }
      }
    }, {
      key: "activeIndex",
      get: function get$$1() {
        return this.getAttribute("active-index");
      },
      set: function set$$1(val) {
        this.setAttribute("active-index", val);
      }
    }, {
      key: "reflow",
      get: function get$$1() {
        return this.hasAttribute("reflow");
      },
      set: function set$$1(val) {
        val = Boolean(val);

        if (val) {
          this.setAttribute("reflow", "");
        } else {
          this.removeAttribute("reflow");
        }
      }
    }], [{
      key: "observedAttributes",
      get: function get$$1() {
        return ["open", "reflow", "active-index"];
      }
    }]);
    return PfeSearchDroplist;
  }(PFElement);

  PFElement.create(PfeSearchDroplist);
  PFElement.create(PfeAutocomplete);

  return PfeAutocomplete;

})));
//# sourceMappingURL=pfe-autocomplete.umd.js.map

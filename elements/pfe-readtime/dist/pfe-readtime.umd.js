(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global = global || self, global.PfeReadtime = factory(global.PFElement));
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
   * PatternFly Elements: PfeReadtime 1.9.2
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

  function getEstimatedWPM(language) {
    switch (language) {
      case "en": // 228 wpm
      case "ko":
        // for Korean, we were able to locate 7 studies in five articles: 5 with silent reading and 2 with reading aloud. Silent reading rate was 226 wpm, reading aloud 133 wpm.
        return 228;
      case "zh":
        // 158 wpm
        return 158;
      case "fr":
        // 195 wpm
        return 195;
      case "ja":
        // 193 wpm
        return 193;
      case "de":
        return 179;
      case "it":
        // 188 wpm
        return 188;
      case "pt-br":
        // 181 wpm
        return 181;
      case "es":
        return 218;
      default:
        return 228;
    }
  }

  var PfeReadtime = function (_PFElement) {
    inherits(PfeReadtime, _PFElement);
    createClass(PfeReadtime, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{font-size:1rem;font-size:var(--pfe-readtime--FontSize,var(--pf-global--FontSize--md,1rem))}:host([hidden]){display:none} /*# sourceMappingURL=pfe-readtime.min.css.map */</style>\n<span class=\"pfe-readtime__text\">" + this.readString + "</span>";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-readtime.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-readtime.scss";
      }

      // Declare the type of this component

    }, {
      key: "readtime",
      get: function get() {
        return Math.floor(this.wordCount / this.wpm) || 0;
      }
    }, {
      key: "readString",
      get: function get() {
        if (this.readtime <= 0) {
          this.setAttribute("hidden", "");
          return;
        }

        this.removeAttribute("hidden");

        if (this.templateString && this.templateString.match(/%t/)) {
          return this.templateString.replace("%t", this.readtime);
        } else {
          return "" + this.readtime + this.templateString;
        }
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.9.2";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-readtime";
      }
    }, {
      key: "meta",
      get: function get() {
        return {
          title: "Readtime",
          description: "This element will collect a word count on a given section and calculate the readtime based on that count."
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
          wpm: {
            title: "Words per minute",
            type: Number,
            default: function _default(el) {
              return getEstimatedWPM(el._lang);
            },
            observer: "render"
          },
          wordCount: {
            title: "Number of words in the content",
            type: Number,
            default: 0,
            observer: "render"
          },
          templateString: {
            title: "Template for printing the readtime",
            description: "Translatable string for printing out the readtime in a readable format. Use %t as a stand-in for the calculated value.",
            attr: "template",
            type: String,
            default: function _default(el) {
              return el.textContent.trim() || "%t-minute readtime";
            },
            observer: "render"
          },
          _lang: {
            title: "Language of content",
            type: String,
            attr: "lang",
            enum: ["en", "ko", "zh", "fr", "ja", "de", "it", "pt-br", "es"],
            default: function _default() {
              return document.documentElement.lang || "en";
            },
            observer: "_langChangedHandler"
          },
          for: {
            title: "Element containing content",
            //This is the unique selector of the target
            type: String,
            observer: "_forChangeHandler"
          }
        };
      }
    }]);

    function PfeReadtime() {
      classCallCheck(this, PfeReadtime);

      var _this = possibleConstructorReturn(this, (PfeReadtime.__proto__ || Object.getPrototypeOf(PfeReadtime)).call(this, PfeReadtime, { type: PfeReadtime.PfeType, delayRender: true }));
      // Note: Delay render is important here for the timing of variable definitions
      // we want to render after all the inputs have been read in and parsed


      _this._forChangeHandler = _this._forChangeHandler.bind(_this);
      _this._langChangedHandler = _this._langChangedHandler.bind(_this);
      return _this;
    }

    createClass(PfeReadtime, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeReadtime.prototype.__proto__ || Object.getPrototypeOf(PfeReadtime.prototype), "connectedCallback", this).call(this);

        this.render();
      }

      // disconnectedCallback() {}

    }, {
      key: "_forChangeHandler",
      value: function _forChangeHandler(oldVal, newVal) {
        if (newVal === oldVal) return;

        var target = document.querySelector(newVal) || document.querySelector("#" + newVal);
        if (target) {
          this.content = target;

          if (target.hasAttribute("word-count")) {
            var wcAttr = target.getAttribute("word-count");
            if (Number(wcAttr) >= 0) {
              this.wordCount = Number(wcAttr);
            }
          } else if (target.textContent.trim()) {
            this.wordCount = target.textContent.split(/\b\w+\b/).length;
          }

          // If a new target element is identified, re-render
          this.render();
        }
      }
    }, {
      key: "_langChangedHandler",
      value: function _langChangedHandler(oldVal, newVal) {
        if (newVal === oldVal) return;

        this.wpm = getEstimatedWPM(newVal);
        this.render();
      }
    }]);
    return PfeReadtime;
  }(PFElement);

  PFElement.create(PfeReadtime);

  return PfeReadtime;

})));
//# sourceMappingURL=pfe-readtime.umd.js.map

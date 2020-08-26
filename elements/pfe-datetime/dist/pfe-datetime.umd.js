(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global.PfeDatetime = factory(global.PFElement));
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
   * PatternFly Elements: PfeDatetime 1.0.0-prerelease.55
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

  var PfeDatetime = function (_PFElement) {
    inherits(PfeDatetime, _PFElement);
    createClass(PfeDatetime, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{display:inline}\n/*# sourceMappingURL=pfe-datetime.min.css.map */\n</style><span></span>";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-datetime.scss";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-datetime.html";
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.55";
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-datetime";
      }
    }]);

    function PfeDatetime() {
      classCallCheck(this, PfeDatetime);

      var _this = possibleConstructorReturn(this, (PfeDatetime.__proto__ || Object.getPrototypeOf(PfeDatetime)).call(this, PfeDatetime));

      _this.type = _this.getAttribute("type") || "local";
      return _this;
    }

    createClass(PfeDatetime, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldVal, newVal) {
        this[attr] = newVal;
      }
    }, {
      key: "setDate",
      value: function setDate(date) {
        this._datetime = date;
        this.shadowRoot.querySelector("span").innerText = window.Intl ? this._getTypeString() : date.toLocaleString();
      }
    }, {
      key: "_getOptions",
      value: function _getOptions() {
        var props = {
          weekday: {
            short: "short",
            long: "long"
          },
          day: {
            numeric: "numeric",
            "2-digit": "2-digit"
          },
          month: {
            short: "short",
            long: "long"
          },
          year: {
            numeric: "numeric",
            "2-digit": "2-digit"
          },
          hour: {
            numeric: "numeric",
            "2-digit": "2-digit"
          },
          minute: {
            numeric: "numeric",
            "2-digit": "2-digit"
          },
          second: {
            numeric: "numeric",
            "2-digit": "2-digit"
          },
          timeZoneName: {
            short: "short",
            long: "long"
          }
        };

        var options = {};

        for (var prop in props) {
          // converting the prop name from camel case to
          // hyphenated so it matches the attribute.
          // for example: timeZoneName to time-zone-name
          var attributeName = prop.replace(/[\w]([A-Z])/g, function (match) {
            return match[0] + "-" + match[1];
          }).toLowerCase();

          var value = props[prop][this.getAttribute(attributeName)];
          if (value) {
            options[prop] = value;
          }
        }

        if (this.getAttribute("time-zone")) {
          options.timeZone = this.getAttribute("time-zone");
        }

        return options;
      }
    }, {
      key: "_getTypeString",
      value: function _getTypeString() {
        var options = this._getOptions();
        var locale = this.getAttribute("locale") || navigator.language;
        var dt = "";
        switch (this.type) {
          case "local":
            dt = new Intl.DateTimeFormat(locale, options).format(this._datetime);
            break;
          case "relative":
            dt = this._getTimeRelative(this._datetime - Date.now());
            break;
          default:
            dt = this._datetime;
        }
        return dt;
      }
    }, {
      key: "_getTimeRelative",
      value: function _getTimeRelative(ms) {
        var tense = ms > 0 ? "until" : "ago";
        var str = "just now";
        // Based off of Github Relative Time
        // https://github.com/github/time-elements/blob/master/src/relative-time.js
        var s = Math.round(Math.abs(ms) / 1000);
        var min = Math.round(s / 60);
        var h = Math.round(min / 60);
        var d = Math.round(h / 24);
        var m = Math.round(d / 30);
        var y = Math.round(m / 12);
        if (m >= 18) {
          str = y + " years";
        } else if (m >= 12) {
          str = "a year";
        } else if (d >= 45) {
          str = m + " months";
        } else if (d >= 30) {
          str = "a month";
        } else if (h >= 36) {
          str = d + " days";
        } else if (h >= 24) {
          str = "a day";
        } else if (min >= 90) {
          str = h + " hours";
        } else if (min >= 45) {
          str = "an hour";
        } else if (s >= 90) {
          str = min + " minutes";
        } else if (s >= 45) {
          str = "a minute";
        } else if (s >= 10) {
          str = s + " seconds";
        }
        return str !== "just now" ? str + " " + tense : str;
      }
    }, {
      key: "type",
      get: function get$$1() {
        return this._type;
      },
      set: function set$$1(val) {
        if (this._type === val) {
          return;
        }

        this._type = val;
      }
    }, {
      key: "timestamp",
      get: function get$$1() {
        return this._timestamp;
      },
      set: function set$$1(val) {
        if (this._timestamp === val) {
          return;
        }

        this._timestamp = val;
        this.setDate(new Date(val * 1000));
      }
    }, {
      key: "datetime",
      get: function get$$1() {
        return this._datetime;
      },
      set: function set$$1(val) {
        if (!Date.parse(val)) {
          return;
        }

        if (Date.parse(val) && this._datetime === Date.parse(val)) {
          return;
        }

        this.setDate(Date.parse(val));
      }
    }], [{
      key: "observedAttributes",
      get: function get$$1() {
        return ["datetime", "type", "timestamp"];
      }
    }]);
    return PfeDatetime;
  }(PFElement);

  PFElement.create(PfeDatetime);

  return PfeDatetime;

})));
//# sourceMappingURL=pfe-datetime.umd.js.map

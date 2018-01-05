!(function(e, t) {
  if ("function" == typeof define && define.amd)
    define(["./node_modules/numeral/min/numeral.min.js"], t);
  else if ("undefined" != typeof exports)
    t(require("./node_modules/numeral/min/numeral.min.js"));
  else {
    t(e.numeralMin), (e.rhNumber = {});
  }
})(this, function(e) {
  "use strict";
  var t = (function(e) {
      return e && e.__esModule ? e : { default: e };
    })(e),
    n = (function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    })(),
    r = document.createElement("template");
  (r.innerHTML =
    "\n  <style>\n    :host {\n      display: inline;\n      white-space: nowrap;\n    }\n  </style>\n\n  <span></span>\n"),
    window.ShadyCSS && ShadyCSS.prepareTemplate(r, "rh-number");
  var o = {
      abbrev: "0a",
      ordinal: "0o",
      percent: "0%",
      bytes: "0[.][00] ib",
      e: "0[.00]e+0"
    },
    i = (function(e) {
      function i() {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, i);
        var e = (function(e, t) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
        })(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this));
        return (
          e.attachShadow({ mode: "open" }),
          e.shadowRoot.appendChild(r.content.cloneNode(!0)),
          e
        );
      }
      return (
        (function(e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function, not " +
                typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          })),
            t &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(e, t)
                : (e.__proto__ = t));
        })(i, HTMLElement),
        n(i, null, [
          {
            key: "observedAttributes",
            get: function() {
              return ["number"];
            }
          }
        ]),
        n(i, [
          {
            key: "connectedCallback",
            value: function() {
              window.ShadyCSS && ShadyCSS.styleElement(this),
                this._determineFormat(),
                this._setInitialNumber();
            }
          },
          {
            key: "attributeChangedCallback",
            value: function(e, t, n) {
              this["_" + e + "AttrUpdate"](t, n);
            }
          },
          {
            key: "_setInitialNumber",
            value: function() {
              var e = void 0 === this.number ? this.textContent : this.number;
              this.setAttribute("number", e);
            }
          },
          {
            key: "_determineFormat",
            value: function() {
              var e = this.getAttribute("type");
              e && o[e]
                ? this.setAttribute("format", o[e])
                : this.setAttribute(
                    "format",
                    this.getAttribute("format") || "0"
                  );
            }
          },
          {
            key: "_numberAttrUpdate",
            value: function(e, n) {
              this.shadowRoot.querySelector("span").textContent = (0,
              t.default)(n).format(this.getAttribute("format"));
            }
          }
        ]),
        i
      );
    })();
  window.customElements.define("rh-number", i);
});

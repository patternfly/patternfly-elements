(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
	typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
	(global = global || self, global.PfeMarkdown = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

	PFElement = PFElement && Object.prototype.hasOwnProperty.call(PFElement, 'default') ? PFElement['default'] : PFElement;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var marked_min = createCommonjsModule(function (module, exports) {
	  /**
	   * marked - a markdown parser
	   * Copyright (c) 2011-2021, Christopher Jeffrey. (MIT Licensed)
	   * https://github.com/markedjs/marked
	   */
	  !function (e, t) {
	     module.exports = t() ;
	  }(commonjsGlobal, function () {
	    function r(e, t) {
	      for (var u = 0; u < t.length; u++) {
	        var n = t[u];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
	      }
	    }function i(e, t) {
	      (null == t || t > e.length) && (t = e.length);for (var u = 0, n = new Array(t); u < t; u++) {
	        n[u] = e[u];
	      }return n;
	    }function o(e, t) {
	      var u = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];if (u) return (u = u.call(e)).next.bind(u);if (Array.isArray(e) || (u = function (e, t) {
	        if (e) {
	          if ("string" == typeof e) return i(e, t);var u = Object.prototype.toString.call(e).slice(8, -1);return "Map" === (u = "Object" === u && e.constructor ? e.constructor.name : u) || "Set" === u ? Array.from(e) : "Arguments" === u || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u) ? i(e, t) : void 0;
	        }
	      }(e)) || t && e && "number" == typeof e.length) {
	        u && (e = u);var n = 0;return function () {
	          return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
	        };
	      }throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	    }var t = { exports: {} };function e() {
	      return { baseUrl: null, breaks: !1, extensions: null, gfm: !0, headerIds: !0, headerPrefix: "", highlight: null, langPrefix: "language-", mangle: !0, pedantic: !1, renderer: null, sanitize: !1, sanitizer: null, silent: !1, smartLists: !1, smartypants: !1, tokenizer: null, walkTokens: null, xhtml: !1 };
	    }t.exports = { defaults: e(), getDefaults: e, changeDefaults: function changeDefaults(e) {
	        t.exports.defaults = e;
	      } };function u(e) {
	      return D[e];
	    }var n = /[&<>"']/,
	        s = /[&<>"']/g,
	        l = /[<>"']|&(?!#?\w+;)/,
	        a = /[<>"']|&(?!#?\w+;)/g,
	        D = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };var c = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function h(e) {
	      return e.replace(c, function (e, t) {
	        return "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : "";
	      });
	    }var p = /(^|[^\[])\^/g;var g = /[^\w:]/g,
	        f = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;var F = {},
	        A = /^[^:]+:\/*[^/]*$/,
	        d = /^([^:]+:)[\s\S]*$/,
	        C = /^([^:]+:\/*[^/]*)[\s\S]*$/;function k(e, t) {
	      F[" " + e] || (A.test(e) ? F[" " + e] = e + "/" : F[" " + e] = E(e, "/", !0));var u = -1 === (e = F[" " + e]).indexOf(":");return "//" === t.substring(0, 2) ? u ? t : e.replace(d, "$1") + t : "/" === t.charAt(0) ? u ? t : e.replace(C, "$1") + t : e + t;
	    }function E(e, t, u) {
	      var n = e.length;if (0 === n) return "";for (var r = 0; r < n;) {
	        var i = e.charAt(n - r - 1);if (i !== t || u) {
	          if (i === t || !u) break;r++;
	        } else r++;
	      }return e.substr(0, n - r);
	    }var x = function x(e, t) {
	      if (t) {
	        if (n.test(e)) return e.replace(s, u);
	      } else if (l.test(e)) return e.replace(a, u);return e;
	    },
	        m = h,
	        b = function b(u, e) {
	      u = u.source || u, e = e || "";var n = { replace: function replace(e, t) {
	          return t = (t = t.source || t).replace(p, "$1"), u = u.replace(e, t), n;
	        }, getRegex: function getRegex() {
	          return new RegExp(u, e);
	        } };return n;
	    },
	        B = function B(e, t, u) {
	      if (e) {
	        var n;try {
	          n = decodeURIComponent(h(u)).replace(g, "").toLowerCase();
	        } catch (e) {
	          return null;
	        }if (0 === n.indexOf("javascript:") || 0 === n.indexOf("vbscript:") || 0 === n.indexOf("data:")) return null;
	      }t && !f.test(u) && (u = k(t, u));try {
	        u = encodeURI(u).replace(/%25/g, "%");
	      } catch (e) {
	        return null;
	      }return u;
	    },
	        w = { exec: function exec() {} },
	        v = function v(e) {
	      for (var t, u, n = 1; n < arguments.length; n++) {
	        for (u in t = arguments[n]) {
	          Object.prototype.hasOwnProperty.call(t, u) && (e[u] = t[u]);
	        }
	      }return e;
	    },
	        y = function y(e, t) {
	      var u = e.replace(/\|/g, function (e, t, u) {
	        for (var n = !1, r = t; 0 <= --r && "\\" === u[r];) {
	          n = !n;
	        }return n ? "|" : " |";
	      }).split(/ \|/),
	          n = 0;if (u.length > t) u.splice(t);else for (; u.length < t;) {
	        u.push("");
	      }for (; n < u.length; n++) {
	        u[n] = u[n].trim().replace(/\\\|/g, "|");
	      }return u;
	    },
	        _ = E,
	        z = function z(e, t) {
	      if (-1 === e.indexOf(t[1])) return -1;for (var u = e.length, n = 0, r = 0; r < u; r++) {
	        if ("\\" === e[r]) r++;else if (e[r] === t[0]) n++;else if (e[r] === t[1] && --n < 0) return r;
	      }return -1;
	    },
	        $ = function $(e) {
	      e && e.sanitize && !e.silent && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
	    },
	        S = function S(e, t) {
	      if (t < 1) return "";for (var u = ""; 1 < t;) {
	        1 & t && (u += e), t >>= 1, e += e;
	      }return u + e;
	    },
	        T = t.exports.defaults,
	        I = _,
	        R = y,
	        q = x,
	        Z = z;function O(e, t, u) {
	      var n = t.href,
	          r = t.title ? q(t.title) : null,
	          t = e[1].replace(/\\([\[\]])/g, "$1");return "!" !== e[0].charAt(0) ? { type: "link", raw: u, href: n, title: r, text: t } : { type: "image", raw: u, href: n, title: r, text: q(t) };
	    }_ = function () {
	      function e(e) {
	        this.options = e || T;
	      }var t = e.prototype;return t.space = function (e) {
	        e = this.rules.block.newline.exec(e);if (e) return 1 < e[0].length ? { type: "space", raw: e[0] } : { raw: "\n" };
	      }, t.code = function (e) {
	        var t = this.rules.block.code.exec(e);if (t) {
	          e = t[0].replace(/^ {1,4}/gm, "");return { type: "code", raw: t[0], codeBlockStyle: "indented", text: this.options.pedantic ? e : I(e, "\n") };
	        }
	      }, t.fences = function (e) {
	        var t = this.rules.block.fences.exec(e);if (t) {
	          var u = t[0],
	              e = function (e, t) {
	            if (null === (e = e.match(/^(\s+)(?:```)/))) return t;var u = e[1];return t.split("\n").map(function (e) {
	              var t = e.match(/^\s+/);return null !== t && t[0].length >= u.length ? e.slice(u.length) : e;
	            }).join("\n");
	          }(u, t[3] || "");return { type: "code", raw: u, lang: t[2] && t[2].trim(), text: e };
	        }
	      }, t.heading = function (e) {
	        var t = this.rules.block.heading.exec(e);if (t) {
	          var u = t[2].trim();return (/#$/.test(u) && (e = I(u, "#"), !this.options.pedantic && e && !/ $/.test(e) || (u = e.trim())), { type: "heading", raw: t[0], depth: t[1].length, text: u }
	          );
	        }
	      }, t.nptable = function (e) {
	        e = this.rules.block.nptable.exec(e);if (e) {
	          var t = { type: "table", header: R(e[1].replace(/^ *| *\| *$/g, "")), align: e[2].replace(/^ *|\| *$/g, "").split(/ *\| */), cells: e[3] ? e[3].replace(/\n$/, "").split("\n") : [], raw: e[0] };if (t.header.length === t.align.length) {
	            for (var u = t.align.length, n = 0; n < u; n++) {
	              /^ *-+: *$/.test(t.align[n]) ? t.align[n] = "right" : /^ *:-+: *$/.test(t.align[n]) ? t.align[n] = "center" : /^ *:-+ *$/.test(t.align[n]) ? t.align[n] = "left" : t.align[n] = null;
	            }for (u = t.cells.length, n = 0; n < u; n++) {
	              t.cells[n] = R(t.cells[n], t.header.length);
	            }return t;
	          }
	        }
	      }, t.hr = function (e) {
	        e = this.rules.block.hr.exec(e);if (e) return { type: "hr", raw: e[0] };
	      }, t.blockquote = function (e) {
	        var t = this.rules.block.blockquote.exec(e);if (t) {
	          e = t[0].replace(/^ *> ?/gm, "");return { type: "blockquote", raw: t[0], text: e };
	        }
	      }, t.list = function (e) {
	        e = this.rules.block.list.exec(e);if (e) {
	          for (var t, u, n, r, i, s, l = e[0], a = e[2], o = 1 < a.length, D = { type: "list", raw: l, ordered: o, start: o ? +a.slice(0, -1) : "", loose: !1, items: [] }, c = e[0].match(this.rules.block.item), h = !1, p = c.length, g = this.rules.block.listItemStart.exec(c[0]), f = 0; f < p; f++) {
	            if (l = t = c[f], this.options.pedantic || (s = t.match(new RegExp("\\n\\s*\\n {0," + (g[0].length - 1) + "}\\S"))) && (u = t.length - s.index + c.slice(f + 1).join("\n").length, D.raw = D.raw.substring(0, D.raw.length - u), l = t = t.substring(0, s.index), p = f + 1), f !== p - 1) {
	              if (n = this.rules.block.listItemStart.exec(c[f + 1]), this.options.pedantic ? n[1].length > g[1].length : n[1].length >= g[0].length || 3 < n[1].length) {
	                c.splice(f, 2, c[f] + (!this.options.pedantic && n[1].length < g[0].length && !c[f].match(/\n$/) ? "" : "\n") + c[f + 1]), f--, p--;continue;
	              }(!this.options.pedantic || this.options.smartLists ? n[2][n[2].length - 1] !== a[a.length - 1] : o == (1 === n[2].length)) && (u = c.slice(f + 1).join("\n").length, D.raw = D.raw.substring(0, D.raw.length - u), f = p - 1), g = n;
	            }n = t.length, ~(t = t.replace(/^ *([*+-]|\d+[.)]) ?/, "")).indexOf("\n ") && (n -= t.length, t = this.options.pedantic ? t.replace(/^ {1,4}/gm, "") : t.replace(new RegExp("^ {1," + n + "}", "gm"), "")), t = I(t, "\n"), f !== p - 1 && (l += "\n"), n = h || /\n\n(?!\s*$)/.test(l), f !== p - 1 && (h = "\n\n" === l.slice(-2), n = n || h), n && (D.loose = !0), this.options.gfm && (i = void 0, (r = /^\[[ xX]\] /.test(t)) && (i = " " !== t[1], t = t.replace(/^\[[ xX]\] +/, ""))), D.items.push({ type: "list_item", raw: l, task: r, checked: i, loose: n, text: t });
	          }return D;
	        }
	      }, t.html = function (e) {
	        e = this.rules.block.html.exec(e);if (e) return { type: this.options.sanitize ? "paragraph" : "html", raw: e[0], pre: !this.options.sanitizer && ("pre" === e[1] || "script" === e[1] || "style" === e[1]), text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e[0]) : q(e[0]) : e[0] };
	      }, t.def = function (e) {
	        e = this.rules.block.def.exec(e);if (e) return e[3] && (e[3] = e[3].substring(1, e[3].length - 1)), { type: "def", tag: e[1].toLowerCase().replace(/\s+/g, " "), raw: e[0], href: e[2], title: e[3] };
	      }, t.table = function (e) {
	        e = this.rules.block.table.exec(e);if (e) {
	          var t = { type: "table", header: R(e[1].replace(/^ *| *\| *$/g, "")), align: e[2].replace(/^ *|\| *$/g, "").split(/ *\| */), cells: e[3] ? e[3].replace(/\n$/, "").split("\n") : [] };if (t.header.length === t.align.length) {
	            t.raw = e[0];for (var u = t.align.length, n = 0; n < u; n++) {
	              /^ *-+: *$/.test(t.align[n]) ? t.align[n] = "right" : /^ *:-+: *$/.test(t.align[n]) ? t.align[n] = "center" : /^ *:-+ *$/.test(t.align[n]) ? t.align[n] = "left" : t.align[n] = null;
	            }for (u = t.cells.length, n = 0; n < u; n++) {
	              t.cells[n] = R(t.cells[n].replace(/^ *\| *| *\| *$/g, ""), t.header.length);
	            }return t;
	          }
	        }
	      }, t.lheading = function (e) {
	        e = this.rules.block.lheading.exec(e);if (e) return { type: "heading", raw: e[0], depth: "=" === e[2].charAt(0) ? 1 : 2, text: e[1] };
	      }, t.paragraph = function (e) {
	        e = this.rules.block.paragraph.exec(e);if (e) return { type: "paragraph", raw: e[0], text: "\n" === e[1].charAt(e[1].length - 1) ? e[1].slice(0, -1) : e[1] };
	      }, t.text = function (e) {
	        e = this.rules.block.text.exec(e);if (e) return { type: "text", raw: e[0], text: e[0] };
	      }, t.escape = function (e) {
	        e = this.rules.inline.escape.exec(e);if (e) return { type: "escape", raw: e[0], text: q(e[1]) };
	      }, t.tag = function (e, t, u) {
	        e = this.rules.inline.tag.exec(e);if (e) return !t && /^<a /i.test(e[0]) ? t = !0 : t && /^<\/a>/i.test(e[0]) && (t = !1), !u && /^<(pre|code|kbd|script)(\s|>)/i.test(e[0]) ? u = !0 : u && /^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0]) && (u = !1), { type: this.options.sanitize ? "text" : "html", raw: e[0], inLink: t, inRawBlock: u, text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e[0]) : q(e[0]) : e[0] };
	      }, t.link = function (e) {
	        var t = this.rules.inline.link.exec(e);if (t) {
	          var u = t[2].trim();if (!this.options.pedantic && /^</.test(u)) {
	            if (!/>$/.test(u)) return;e = I(u.slice(0, -1), "\\");if ((u.length - e.length) % 2 == 0) return;
	          } else {
	            var n = Z(t[2], "()");-1 < n && (i = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + n, t[2] = t[2].substring(0, n), t[0] = t[0].substring(0, i).trim(), t[3] = "");
	          }var r,
	              n = t[2],
	              i = "";return this.options.pedantic ? (r = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n)) && (n = r[1], i = r[3]) : i = t[3] ? t[3].slice(1, -1) : "", n = n.trim(), O(t, { href: (n = /^</.test(n) ? this.options.pedantic && !/>$/.test(u) ? n.slice(1) : n.slice(1, -1) : n) && n.replace(this.rules.inline._escapes, "$1"), title: i && i.replace(this.rules.inline._escapes, "$1") }, t[0]);
	        }
	      }, t.reflink = function (e, t) {
	        if ((u = this.rules.inline.reflink.exec(e)) || (u = this.rules.inline.nolink.exec(e))) {
	          e = (u[2] || u[1]).replace(/\s+/g, " ");if ((e = t[e.toLowerCase()]) && e.href) return O(u, e, u[0]);var u = u[0].charAt(0);return { type: "text", raw: u, text: u };
	        }
	      }, t.emStrong = function (e, t, u) {
	        void 0 === u && (u = "");var n = this.rules.inline.emStrong.lDelim.exec(e);if (n && (!n[3] || !u.match(/(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/))) {
	          var r = n[1] || n[2] || "";if (!r || r && ("" === u || this.rules.inline.punctuation.exec(u))) {
	            var i,
	                s = n[0].length - 1,
	                l = s,
	                a = 0,
	                o = "*" === n[0][0] ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;for (o.lastIndex = 0, t = t.slice(-1 * e.length + s); null != (n = o.exec(t));) {
	              if (i = n[1] || n[2] || n[3] || n[4] || n[5] || n[6]) if (i = i.length, n[3] || n[4]) l += i;else if (!((n[5] || n[6]) && s % 3) || (s + i) % 3) {
	                if (!(0 < (l -= i))) return i = Math.min(i, i + l + a), Math.min(s, i) % 2 ? { type: "em", raw: e.slice(0, s + n.index + i + 1), text: e.slice(1, s + n.index + i) } : { type: "strong", raw: e.slice(0, s + n.index + i + 1), text: e.slice(2, s + n.index + i - 1) };
	              } else a += i;
	            }
	          }
	        }
	      }, t.codespan = function (e) {
	        var t = this.rules.inline.code.exec(e);if (t) {
	          var u = t[2].replace(/\n/g, " "),
	              n = /[^ ]/.test(u),
	              e = /^ /.test(u) && / $/.test(u);return n && e && (u = u.substring(1, u.length - 1)), u = q(u, !0), { type: "codespan", raw: t[0], text: u };
	        }
	      }, t.br = function (e) {
	        e = this.rules.inline.br.exec(e);if (e) return { type: "br", raw: e[0] };
	      }, t.del = function (e) {
	        e = this.rules.inline.del.exec(e);if (e) return { type: "del", raw: e[0], text: e[2] };
	      }, t.autolink = function (e, t) {
	        e = this.rules.inline.autolink.exec(e);if (e) {
	          var u,
	              t = "@" === e[2] ? "mailto:" + (u = q(this.options.mangle ? t(e[1]) : e[1])) : u = q(e[1]);return { type: "link", raw: e[0], text: u, href: t, tokens: [{ type: "text", raw: u, text: u }] };
	        }
	      }, t.url = function (e, t) {
	        var u, n, r, i;if (u = this.rules.inline.url.exec(e)) {
	          if ("@" === u[2]) r = "mailto:" + (n = q(this.options.mangle ? t(u[0]) : u[0]));else {
	            for (; i = u[0], u[0] = this.rules.inline._backpedal.exec(u[0])[0], i !== u[0];) {}n = q(u[0]), r = "www." === u[1] ? "http://" + n : n;
	          }return { type: "link", raw: u[0], text: n, href: r, tokens: [{ type: "text", raw: n, text: n }] };
	        }
	      }, t.inlineText = function (e, t, u) {
	        e = this.rules.inline.text.exec(e);if (e) {
	          u = t ? this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e[0]) : q(e[0]) : e[0] : q(this.options.smartypants ? u(e[0]) : e[0]);return { type: "text", raw: e[0], text: u };
	        }
	      }, e;
	    }(), y = w, z = b, w = v, b = { newline: /^(?: *(?:\n|$))+/, code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/, fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/, hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/, heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/, list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?! {0,3}bull )\n*|\s*$)/, html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/, nptable: y, table: y, lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/, _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html| +\n)[^\n]+)*)/, text: /^[^\n]+/, _label: /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/, _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/ };b.def = z(b.def).replace("label", b._label).replace("title", b._title).getRegex(), b.bullet = /(?:[*+-]|\d{1,9}[.)])/, b.item = /^( *)(bull) ?[^\n]*(?:\n(?! *bull ?)[^\n]*)*/, b.item = z(b.item, "gm").replace(/bull/g, b.bullet).getRegex(), b.listItemStart = z(/^( *)(bull) */).replace("bull", b.bullet).getRegex(), b.list = z(b.list).replace(/bull/g, b.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + b.def.source + ")").getRegex(), b._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", b._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/, b.html = z(b.html, "i").replace("comment", b._comment).replace("tag", b._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), b.paragraph = z(b._paragraph).replace("hr", b.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", b._tag).getRegex(), b.blockquote = z(b.blockquote).replace("paragraph", b.paragraph).getRegex(), b.normal = w({}, b), b.gfm = w({}, b.normal, { nptable: "^ *([^|\\n ].*\\|.*)\\n {0,3}([-:]+ *\\|[-| :]*)(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)", table: "^ *\\|(.+)\\n {0,3}\\|?( *[-:]+[-| :]*)(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)" }), b.gfm.nptable = z(b.gfm.nptable).replace("hr", b.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", b._tag).getRegex(), b.gfm.table = z(b.gfm.table).replace("hr", b.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", b._tag).getRegex(), b.pedantic = w({}, b.normal, { html: z("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", b._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: y, paragraph: z(b.normal._paragraph).replace("hr", b.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", b.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex() });y = { escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/, url: y, tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/, reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/, nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/, reflinkSearch: "reflink|nolink(?!\\()", emStrong: { lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/, rDelimAst: /\_\_[^_*]*?\*[^_*]*?\_\_|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/, rDelimUnd: /\*\*[^_*]*?\_[^_*]*?\*\*|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/ }, code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, br: /^( {2,}|\\)\n(?!\s*$)/, del: y, text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, punctuation: /^([\spunctuation])/, _punctuation: "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~" };y.punctuation = z(y.punctuation).replace(/punctuation/g, y._punctuation).getRegex(), y.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g, y.escapedEmSt = /\\\*|\\_/g, y._comment = z(b._comment).replace("(?:--\x3e|$)", "--\x3e").getRegex(), y.emStrong.lDelim = z(y.emStrong.lDelim).replace(/punct/g, y._punctuation).getRegex(), y.emStrong.rDelimAst = z(y.emStrong.rDelimAst, "g").replace(/punct/g, y._punctuation).getRegex(), y.emStrong.rDelimUnd = z(y.emStrong.rDelimUnd, "g").replace(/punct/g, y._punctuation).getRegex(), y._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g, y._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/, y._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/, y.autolink = z(y.autolink).replace("scheme", y._scheme).replace("email", y._email).getRegex(), y._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/, y.tag = z(y.tag).replace("comment", y._comment).replace("attribute", y._attribute).getRegex(), y._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, y._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/, y._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/, y.link = z(y.link).replace("label", y._label).replace("href", y._href).replace("title", y._title).getRegex(), y.reflink = z(y.reflink).replace("label", y._label).getRegex(), y.reflinkSearch = z(y.reflinkSearch, "g").replace("reflink", y.reflink).replace("nolink", y.nolink).getRegex(), y.normal = w({}, y), y.pedantic = w({}, y.normal, { strong: { start: /^__|\*\*/, middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/, endAst: /\*\*(?!\*)/g, endUnd: /__(?!_)/g }, em: { start: /^_|\*/, middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/, endAst: /\*(?!\*)/g, endUnd: /_(?!_)/g }, link: z(/^!?\[(label)\]\((.*?)\)/).replace("label", y._label).getRegex(), reflink: z(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", y._label).getRegex() }), y.gfm = w({}, y.normal, { escape: z(y.escape).replace("])", "~|])").getRegex(), _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/, url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/, text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/ }), y.gfm.url = z(y.gfm.url, "i").replace("email", y.gfm._extended_email).getRegex(), y.breaks = w({}, y.gfm, { br: z(y.br).replace("{2,}", "*").getRegex(), text: z(y.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() });var b = { block: b, inline: y },
	        j = _,
	        U = t.exports.defaults,
	        P = b.block,
	        L = b.inline,
	        M = S;function N(e) {
	      return e.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…");
	    }function X(e) {
	      for (var t, u = "", n = e.length, r = 0; r < n; r++) {
	        t = e.charCodeAt(r), u += "&#" + (t = .5 < Math.random() ? "x" + t.toString(16) : t) + ";";
	      }return u;
	    }var y = function () {
	      function u(e) {
	        this.tokens = [], this.tokens.links = Object.create(null), this.options = e || U, this.options.tokenizer = this.options.tokenizer || new j(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options;e = { block: P.normal, inline: L.normal };this.options.pedantic ? (e.block = P.pedantic, e.inline = L.pedantic) : this.options.gfm && (e.block = P.gfm, this.options.breaks ? e.inline = L.breaks : e.inline = L.gfm), this.tokenizer.rules = e;
	      }u.lex = function (e, t) {
	        return new u(t).lex(e);
	      }, u.lexInline = function (e, t) {
	        return new u(t).inlineTokens(e);
	      };var e,
	          t,
	          n = u.prototype;return n.lex = function (e) {
	        return e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    "), this.blockTokens(e, this.tokens, !0), this.inline(this.tokens), this.tokens;
	      }, n.blockTokens = function (r, t, e) {
	        var u,
	            n,
	            i,
	            s,
	            l,
	            a,
	            o = this;for (void 0 === t && (t = []), void 0 === e && (e = !0), this.options.pedantic && (r = r.replace(/^ +$/gm, "")); r;) {
	          if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some(function (e) {
	            return !!(u = e.call(o, r, t)) && (r = r.substring(u.raw.length), t.push(u), !0);
	          }))) if (u = this.tokenizer.space(r)) r = r.substring(u.raw.length), u.type && t.push(u);else if (u = this.tokenizer.code(r)) r = r.substring(u.raw.length), (s = t[t.length - 1]) && "paragraph" === s.type ? (s.raw += "\n" + u.raw, s.text += "\n" + u.text) : t.push(u);else if (u = this.tokenizer.fences(r)) r = r.substring(u.raw.length), t.push(u);else if (u = this.tokenizer.heading(r)) r = r.substring(u.raw.length), t.push(u);else if (u = this.tokenizer.nptable(r)) r = r.substring(u.raw.length), t.push(u);else if (u = this.tokenizer.hr(r)) r = r.substring(u.raw.length), t.push(u);else if (u = this.tokenizer.blockquote(r)) r = r.substring(u.raw.length), u.tokens = this.blockTokens(u.text, [], e), t.push(u);else if (u = this.tokenizer.list(r)) {
	            for (r = r.substring(u.raw.length), i = u.items.length, n = 0; n < i; n++) {
	              u.items[n].tokens = this.blockTokens(u.items[n].text, [], !1);
	            }t.push(u);
	          } else if (u = this.tokenizer.html(r)) r = r.substring(u.raw.length), t.push(u);else if (e && (u = this.tokenizer.def(r))) r = r.substring(u.raw.length), this.tokens.links[u.tag] || (this.tokens.links[u.tag] = { href: u.href, title: u.title });else if (u = this.tokenizer.table(r)) r = r.substring(u.raw.length), t.push(u);else if (u = this.tokenizer.lheading(r)) r = r.substring(u.raw.length), t.push(u);else if (l = r, this.options.extensions && this.options.extensions.startBlock && function () {
	            var t,
	                u = 1 / 0,
	                n = r.slice(1);o.options.extensions.startBlock.forEach(function (e) {
	              "number" == typeof (t = e.call(this, n)) && 0 <= t && (u = Math.min(u, t));
	            }), u < 1 / 0 && 0 <= u && (l = r.substring(0, u + 1));
	          }(), e && (u = this.tokenizer.paragraph(l))) s = t[t.length - 1], a && "paragraph" === s.type ? (s.raw += "\n" + u.raw, s.text += "\n" + u.text) : t.push(u), a = l.length !== r.length, r = r.substring(u.raw.length);else if (u = this.tokenizer.text(r)) r = r.substring(u.raw.length), (s = t[t.length - 1]) && "text" === s.type ? (s.raw += "\n" + u.raw, s.text += "\n" + u.text) : t.push(u);else if (r) {
	            var D = "Infinite loop on byte: " + r.charCodeAt(0);if (this.options.silent) {
	              console.error(D);break;
	            }throw new Error(D);
	          }
	        }return t;
	      }, n.inline = function (e) {
	        for (var t, u, n, r, i, s = e.length, l = 0; l < s; l++) {
	          switch ((i = e[l]).type) {case "paragraph":case "text":case "heading":
	              i.tokens = [], this.inlineTokens(i.text, i.tokens);break;case "table":
	              for (i.tokens = { header: [], cells: [] }, n = i.header.length, t = 0; t < n; t++) {
	                i.tokens.header[t] = [], this.inlineTokens(i.header[t], i.tokens.header[t]);
	              }for (n = i.cells.length, t = 0; t < n; t++) {
	                for (r = i.cells[t], i.tokens.cells[t] = [], u = 0; u < r.length; u++) {
	                  i.tokens.cells[t][u] = [], this.inlineTokens(r[u], i.tokens.cells[t][u]);
	                }
	              }break;case "blockquote":
	              this.inline(i.tokens);break;case "list":
	              for (n = i.items.length, t = 0; t < n; t++) {
	                this.inline(i.items[t].tokens);
	              }}
	        }return e;
	      }, n.inlineTokens = function (r, t, e, u) {
	        var n,
	            i,
	            s,
	            l = this;void 0 === t && (t = []), void 0 === e && (e = !1), void 0 === u && (u = !1);var a,
	            o,
	            D,
	            c = r;if (this.tokens.links) {
	          var h = Object.keys(this.tokens.links);if (0 < h.length) for (; null != (a = this.tokenizer.rules.inline.reflinkSearch.exec(c));) {
	            h.includes(a[0].slice(a[0].lastIndexOf("[") + 1, -1)) && (c = c.slice(0, a.index) + "[" + M("a", a[0].length - 2) + "]" + c.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
	          }
	        }for (; null != (a = this.tokenizer.rules.inline.blockSkip.exec(c));) {
	          c = c.slice(0, a.index) + "[" + M("a", a[0].length - 2) + "]" + c.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
	        }for (; null != (a = this.tokenizer.rules.inline.escapedEmSt.exec(c));) {
	          c = c.slice(0, a.index) + "++" + c.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
	        }for (; r;) {
	          if (o || (D = ""), o = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some(function (e) {
	            return !!(n = e.call(l, r, t)) && (r = r.substring(n.raw.length), t.push(n), !0);
	          }))) if (n = this.tokenizer.escape(r)) r = r.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.tag(r, e, u)) r = r.substring(n.raw.length), e = n.inLink, u = n.inRawBlock, (i = t[t.length - 1]) && "text" === n.type && "text" === i.type ? (i.raw += n.raw, i.text += n.text) : t.push(n);else if (n = this.tokenizer.link(r)) r = r.substring(n.raw.length), "link" === n.type && (n.tokens = this.inlineTokens(n.text, [], !0, u)), t.push(n);else if (n = this.tokenizer.reflink(r, this.tokens.links)) r = r.substring(n.raw.length), i = t[t.length - 1], "link" === n.type ? (n.tokens = this.inlineTokens(n.text, [], !0, u), t.push(n)) : i && "text" === n.type && "text" === i.type ? (i.raw += n.raw, i.text += n.text) : t.push(n);else if (n = this.tokenizer.emStrong(r, c, D)) r = r.substring(n.raw.length), n.tokens = this.inlineTokens(n.text, [], e, u), t.push(n);else if (n = this.tokenizer.codespan(r)) r = r.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.br(r)) r = r.substring(n.raw.length), t.push(n);else if (n = this.tokenizer.del(r)) r = r.substring(n.raw.length), n.tokens = this.inlineTokens(n.text, [], e, u), t.push(n);else if (n = this.tokenizer.autolink(r, X)) r = r.substring(n.raw.length), t.push(n);else if (e || !(n = this.tokenizer.url(r, X))) {
	            if (s = r, this.options.extensions && this.options.extensions.startInline && function () {
	              var t,
	                  u = 1 / 0,
	                  n = r.slice(1);l.options.extensions.startInline.forEach(function (e) {
	                "number" == typeof (t = e.call(this, n)) && 0 <= t && (u = Math.min(u, t));
	              }), u < 1 / 0 && 0 <= u && (s = r.substring(0, u + 1));
	            }(), n = this.tokenizer.inlineText(s, u, N)) r = r.substring(n.raw.length), "_" !== n.raw.slice(-1) && (D = n.raw.slice(-1)), o = !0, (i = t[t.length - 1]) && "text" === i.type ? (i.raw += n.raw, i.text += n.text) : t.push(n);else if (r) {
	              var p = "Infinite loop on byte: " + r.charCodeAt(0);if (this.options.silent) {
	                console.error(p);break;
	              }throw new Error(p);
	            }
	          } else r = r.substring(n.raw.length), t.push(n);
	        }return t;
	      }, e = u, t = [{ key: "rules", get: function get() {
	          return { block: P, inline: L };
	        } }], (n = null) && r(e.prototype, n), t && r(e, t), u;
	    }(),
	        G = t.exports.defaults,
	        V = B,
	        H = x,
	        b = function () {
	      function e(e) {
	        this.options = e || G;
	      }var t = e.prototype;return t.code = function (e, t, u) {
	        var n = (t || "").match(/\S*/)[0];return !this.options.highlight || null != (t = this.options.highlight(e, n)) && t !== e && (u = !0, e = t), e = e.replace(/\n$/, "") + "\n", n ? '<pre><code class="' + this.options.langPrefix + H(n, !0) + '">' + (u ? e : H(e, !0)) + "</code></pre>\n" : "<pre><code>" + (u ? e : H(e, !0)) + "</code></pre>\n";
	      }, t.blockquote = function (e) {
	        return "<blockquote>\n" + e + "</blockquote>\n";
	      }, t.html = function (e) {
	        return e;
	      }, t.heading = function (e, t, u, n) {
	        return this.options.headerIds ? "<h" + t + ' id="' + this.options.headerPrefix + n.slug(u) + '">' + e + "</h" + t + ">\n" : "<h" + t + ">" + e + "</h" + t + ">\n";
	      }, t.hr = function () {
	        return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
	      }, t.list = function (e, t, u) {
	        var n = t ? "ol" : "ul";return "<" + n + (t && 1 !== u ? ' start="' + u + '"' : "") + ">\n" + e + "</" + n + ">\n";
	      }, t.listitem = function (e) {
	        return "<li>" + e + "</li>\n";
	      }, t.checkbox = function (e) {
	        return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
	      }, t.paragraph = function (e) {
	        return "<p>" + e + "</p>\n";
	      }, t.table = function (e, t) {
	        return "<table>\n<thead>\n" + e + "</thead>\n" + (t = t && "<tbody>" + t + "</tbody>") + "</table>\n";
	      }, t.tablerow = function (e) {
	        return "<tr>\n" + e + "</tr>\n";
	      }, t.tablecell = function (e, t) {
	        var u = t.header ? "th" : "td";return (t.align ? "<" + u + ' align="' + t.align + '">' : "<" + u + ">") + e + "</" + u + ">\n";
	      }, t.strong = function (e) {
	        return "<strong>" + e + "</strong>";
	      }, t.em = function (e) {
	        return "<em>" + e + "</em>";
	      }, t.codespan = function (e) {
	        return "<code>" + e + "</code>";
	      }, t.br = function () {
	        return this.options.xhtml ? "<br/>" : "<br>";
	      }, t.del = function (e) {
	        return "<del>" + e + "</del>";
	      }, t.link = function (e, t, u) {
	        if (null === (e = V(this.options.sanitize, this.options.baseUrl, e))) return u;e = '<a href="' + H(e) + '"';return t && (e += ' title="' + t + '"'), e += ">" + u + "</a>";
	      }, t.image = function (e, t, u) {
	        if (null === (e = V(this.options.sanitize, this.options.baseUrl, e))) return u;u = '<img src="' + e + '" alt="' + u + '"';return t && (u += ' title="' + t + '"'), u += this.options.xhtml ? "/>" : ">";
	      }, t.text = function (e) {
	        return e;
	      }, e;
	    }(),
	        S = function () {
	      function e() {}var t = e.prototype;return t.strong = function (e) {
	        return e;
	      }, t.em = function (e) {
	        return e;
	      }, t.codespan = function (e) {
	        return e;
	      }, t.del = function (e) {
	        return e;
	      }, t.html = function (e) {
	        return e;
	      }, t.text = function (e) {
	        return e;
	      }, t.link = function (e, t, u) {
	        return "" + u;
	      }, t.image = function (e, t, u) {
	        return "" + u;
	      }, t.br = function () {
	        return "";
	      }, e;
	    }(),
	        B = function () {
	      function e() {
	        this.seen = {};
	      }var t = e.prototype;return t.serialize = function (e) {
	        return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
	      }, t.getNextSafeSlug = function (e, t) {
	        var u = e,
	            n = 0;if (this.seen.hasOwnProperty(u)) for (n = this.seen[e]; u = e + "-" + ++n, this.seen.hasOwnProperty(u);) {}return t || (this.seen[e] = n, this.seen[u] = 0), u;
	      }, t.slug = function (e, t) {
	        void 0 === t && (t = {});var u = this.serialize(e);return this.getNextSafeSlug(u, t.dryrun);
	      }, e;
	    }(),
	        J = b,
	        K = S,
	        Q = B,
	        W = t.exports.defaults,
	        Y = m,
	        ee = y,
	        te = function () {
	      function u(e) {
	        this.options = e || W, this.options.renderer = this.options.renderer || new J(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new K(), this.slugger = new Q();
	      }u.parse = function (e, t) {
	        return new u(t).parse(e);
	      }, u.parseInline = function (e, t) {
	        return new u(t).parseInline(e);
	      };var e = u.prototype;return e.parse = function (e, t) {
	        void 0 === t && (t = !0);for (var u, n, r, i, s, l, a, o, D, c, h, p, g, f, F, A, d = "", C = e.length, k = 0; k < C; k++) {
	          if (o = e[k], !(this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[o.type]) || !1 === (A = this.options.extensions.renderers[o.type].call(this, o)) && ["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(o.type)) switch (o.type) {case "space":
	              continue;case "hr":
	              d += this.renderer.hr();continue;case "heading":
	              d += this.renderer.heading(this.parseInline(o.tokens), o.depth, Y(this.parseInline(o.tokens, this.textRenderer)), this.slugger);continue;case "code":
	              d += this.renderer.code(o.text, o.lang, o.escaped);continue;case "table":
	              for (l = D = "", r = o.header.length, u = 0; u < r; u++) {
	                l += this.renderer.tablecell(this.parseInline(o.tokens.header[u]), { header: !0, align: o.align[u] });
	              }for (D += this.renderer.tablerow(l), a = "", r = o.cells.length, u = 0; u < r; u++) {
	                for (l = "", i = (s = o.tokens.cells[u]).length, n = 0; n < i; n++) {
	                  l += this.renderer.tablecell(this.parseInline(s[n]), { header: !1, align: o.align[n] });
	                }a += this.renderer.tablerow(l);
	              }d += this.renderer.table(D, a);continue;case "blockquote":
	              a = this.parse(o.tokens), d += this.renderer.blockquote(a);continue;case "list":
	              for (D = o.ordered, E = o.start, c = o.loose, r = o.items.length, a = "", u = 0; u < r; u++) {
	                g = (p = o.items[u]).checked, f = p.task, h = "", p.task && (F = this.renderer.checkbox(g), c ? 0 < p.tokens.length && "text" === p.tokens[0].type ? (p.tokens[0].text = F + " " + p.tokens[0].text, p.tokens[0].tokens && 0 < p.tokens[0].tokens.length && "text" === p.tokens[0].tokens[0].type && (p.tokens[0].tokens[0].text = F + " " + p.tokens[0].tokens[0].text)) : p.tokens.unshift({ type: "text", text: F }) : h += F), h += this.parse(p.tokens, c), a += this.renderer.listitem(h, f, g);
	              }d += this.renderer.list(a, D, E);continue;case "html":
	              d += this.renderer.html(o.text);continue;case "paragraph":
	              d += this.renderer.paragraph(this.parseInline(o.tokens));continue;case "text":
	              for (a = o.tokens ? this.parseInline(o.tokens) : o.text; k + 1 < C && "text" === e[k + 1].type;) {
	                a += "\n" + ((o = e[++k]).tokens ? this.parseInline(o.tokens) : o.text);
	              }d += t ? this.renderer.paragraph(a) : a;continue;default:
	              var E = 'Token with "' + o.type + '" type was not found.';if (this.options.silent) return void console.error(E);throw new Error(E);} else d += A || "";
	        }return d;
	      }, e.parseInline = function (e, t) {
	        t = t || this.renderer;for (var u, n, r = "", i = e.length, s = 0; s < i; s++) {
	          if (u = e[s], !(this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[u.type]) || !1 === (n = this.options.extensions.renderers[u.type].call(this, u)) && ["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(u.type)) switch (u.type) {case "escape":
	              r += t.text(u.text);break;case "html":
	              r += t.html(u.text);break;case "link":
	              r += t.link(u.href, u.title, this.parseInline(u.tokens, t));break;case "image":
	              r += t.image(u.href, u.title, u.text);break;case "strong":
	              r += t.strong(this.parseInline(u.tokens, t));break;case "em":
	              r += t.em(this.parseInline(u.tokens, t));break;case "codespan":
	              r += t.codespan(u.text);break;case "br":
	              r += t.br();break;case "del":
	              r += t.del(this.parseInline(u.tokens, t));break;case "text":
	              r += t.text(u.text);break;default:
	              var l = 'Token with "' + u.type + '" type was not found.';if (this.options.silent) return void console.error(l);throw new Error(l);} else r += n || "";
	        }return r;
	      }, u;
	    }(),
	        ue = _,
	        ne = b,
	        S = S,
	        B = B,
	        re = v,
	        ie = $,
	        se = x,
	        $ = t.exports.getDefaults,
	        le = t.exports.changeDefaults,
	        x = t.exports.defaults;function ae(e, u, n) {
	      if (null == e) throw new Error("marked(): input parameter is undefined or null");if ("string" != typeof e) throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");if ("function" == typeof u && (n = u, u = null), u = re({}, ae.defaults, u || {}), ie(u), n) {
	        var r,
	            i = u.highlight;try {
	          r = ee.lex(e, u);
	        } catch (e) {
	          return n(e);
	        }var s = function s(t) {
	          var e;if (!t) try {
	            u.walkTokens && ae.walkTokens(r, u.walkTokens), e = te.parse(r, u);
	          } catch (e) {
	            t = e;
	          }return u.highlight = i, t ? n(t) : n(null, e);
	        };if (!i || i.length < 3) return s();if (delete u.highlight, !r.length) return s();var l = 0;return ae.walkTokens(r, function (u) {
	          "code" === u.type && (l++, setTimeout(function () {
	            i(u.text, u.lang, function (e, t) {
	              return e ? s(e) : (null != t && t !== u.text && (u.text = t, u.escaped = !0), void (0 === --l && s()));
	            });
	          }, 0));
	        }), void (0 === l && s());
	      }try {
	        var t = ee.lex(e, u);return u.walkTokens && ae.walkTokens(t, u.walkTokens), te.parse(t, u);
	      } catch (e) {
	        if (e.message += "\nPlease report this to https://github.com/markedjs/marked.", u.silent) return "<p>An error occurred:</p><pre>" + se(e.message + "", !0) + "</pre>";throw e;
	      }
	    }return ae.options = ae.setOptions = function (e) {
	      return re(ae.defaults, e), le(ae.defaults), ae;
	    }, ae.getDefaults = $, ae.defaults = x, ae.use = function () {
	      for (var u = this, e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
	        t[n] = arguments[n];
	      }var r,
	          i = re.apply(void 0, [{}].concat(t)),
	          s = ae.defaults.extensions || { renderers: {}, childTokens: {} };t.forEach(function (l) {
	        var t;l.extensions && (r = !0, l.extensions.forEach(function (r) {
	          if (!r.name) throw new Error("extension name required");var i;if (r.renderer && (i = s.renderers ? s.renderers[r.name] : null, s.renderers[r.name] = i ? function () {
	            for (var e = arguments.length, t = new Array(e), u = 0; u < e; u++) {
	              t[u] = arguments[u];
	            }var n = r.renderer.apply(this, t);return n = !1 === n ? i.apply(this, t) : n;
	          } : r.renderer), r.tokenizer) {
	            if (!r.level || "block" !== r.level && "inline" !== r.level) throw new Error("extension level must be 'block' or 'inline'");s[r.level] ? s[r.level].unshift(r.tokenizer) : s[r.level] = [r.tokenizer], r.start && ("block" === r.level ? s.startBlock ? s.startBlock.push(r.start) : s.startBlock = [r.start] : "inline" === r.level && (s.startInline ? s.startInline.push(r.start) : s.startInline = [r.start]));
	          }r.childTokens && (s.childTokens[r.name] = r.childTokens);
	        })), l.renderer && function () {
	          var e,
	              s = ae.defaults.renderer || new ne();for (e in l.renderer) {
	            !function (r) {
	              var i = s[r];s[r] = function () {
	                for (var e = arguments.length, t = new Array(e), u = 0; u < e; u++) {
	                  t[u] = arguments[u];
	                }var n = l.renderer[r].apply(s, t);return n = !1 === n ? i.apply(s, t) : n;
	              };
	            }(e);
	          }i.renderer = s;
	        }(), l.tokenizer && function () {
	          var e,
	              s = ae.defaults.tokenizer || new ue();for (e in l.tokenizer) {
	            !function (r) {
	              var i = s[r];s[r] = function () {
	                for (var e = arguments.length, t = new Array(e), u = 0; u < e; u++) {
	                  t[u] = arguments[u];
	                }var n = l.tokenizer[r].apply(s, t);return n = !1 === n ? i.apply(s, t) : n;
	              };
	            }(e);
	          }i.tokenizer = s;
	        }(), l.walkTokens && (t = ae.defaults.walkTokens, i.walkTokens = function (e) {
	          l.walkTokens.call(u, e), t && t(e);
	        }), r && (i.extensions = s), ae.setOptions(i);
	      });
	    }, ae.walkTokens = function (e, l) {
	      for (var a, t = o(e); !(a = t()).done;) {
	        !function () {
	          var t = a.value;switch (l(t), t.type) {case "table":
	              for (var e = o(t.tokens.header); !(u = e()).done;) {
	                var u = u.value;ae.walkTokens(u, l);
	              }for (var n, r = o(t.tokens.cells); !(n = r()).done;) {
	                for (var i = o(n.value); !(s = i()).done;) {
	                  var s = s.value;ae.walkTokens(s, l);
	                }
	              }break;case "list":
	              ae.walkTokens(t.items, l);break;default:
	              ae.defaults.extensions && ae.defaults.extensions.childTokens && ae.defaults.extensions.childTokens[t.type] ? ae.defaults.extensions.childTokens[t.type].forEach(function (e) {
	                ae.walkTokens(t[e], l);
	              }) : t.tokens && ae.walkTokens(t.tokens, l);}
	        }();
	      }
	    }, ae.parseInline = function (e, t) {
	      if (null == e) throw new Error("marked.parseInline(): input parameter is undefined or null");if ("string" != typeof e) throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");t = re({}, ae.defaults, t || {}), ie(t);try {
	        var u = ee.lexInline(e, t);return t.walkTokens && ae.walkTokens(u, t.walkTokens), te.parseInline(u, t);
	      } catch (e) {
	        if (e.message += "\nPlease report this to https://github.com/markedjs/marked.", t.silent) return "<p>An error occurred:</p><pre>" + se(e.message + "", !0) + "</pre>";throw e;
	      }
	    }, ae.Parser = te, ae.parser = te.parse, ae.Renderer = ne, ae.TextRenderer = S, ae.Lexer = ee, ae.lexer = ee.lex, ae.Tokenizer = ue, ae.Slugger = B, ae.parse = ae;
	  });
	});

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
	 * PatternFly Elements: PfeMarkdown 1.11.0
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

	var PfeMarkdown = function (_PFElement) {
	  inherits(PfeMarkdown, _PFElement);
	  createClass(PfeMarkdown, [{
	    key: "html",


	    // Injected at build-time
	    get: function get() {
	      return "\n<style>@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#151515!important}}:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted--on-dark, #d2d2d2);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted--on-saturated, #d2d2d2);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, #fafafa);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, #fafafa);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #d2d2d2);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-saturated, underline);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-saturated, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-saturated, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-saturated, underline)}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted, #6a6e73);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}:host{display:block;color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42)}:host([hidden]){display:none} /*# sourceMappingURL=pfe-markdown.min.css.map */</style>\n<slot></slot>";
	    }

	    // Injected at build-time

	  }, {
	    key: "templateUrl",
	    get: function get() {
	      return "pfe-markdown.html";
	    }
	  }, {
	    key: "styleUrl",
	    get: function get() {
	      return "pfe-markdown.scss";
	    }
	  }, {
	    key: "schemaUrl",
	    get: function get() {
	      return "pfe-markdown.json";
	    }
	  }, {
	    key: "markdown",
	    get: function get() {
	      return this._markdown;
	    },
	    set: function set(text) {
	      if (!text) {
	        return;
	      }

	      this._markdown = this._unindent(text);
	      this.renderMarkdown();
	    }
	  }], [{
	    key: "version",


	    // Injected at build-time
	    get: function get() {
	      return "1.11.0";
	    }
	  }, {
	    key: "slots",
	    get: function get() {
	      return { "default": { "title": "Markdown", "type": "array", "namedSlot": false, "items": { "oneOf": [{ "$ref": "raw" }] } } };
	    }
	  }, {
	    key: "tag",
	    get: function get() {
	      return "pfe-markdown";
	    }
	  }, {
	    key: "meta",
	    get: function get() {
	      return {
	        title: "Markdown",
	        description: "This element converts markdown into HTML."
	      };
	    }
	  }, {
	    key: "pfeType",
	    get: function get() {
	      return PFElement.pfeType.content;
	    }
	  }, {
	    key: "properties",
	    get: function get() {
	      return {};
	    }
	  }]);

	  function PfeMarkdown() {
	    classCallCheck(this, PfeMarkdown);

	    var _this = possibleConstructorReturn(this, (PfeMarkdown.__proto__ || Object.getPrototypeOf(PfeMarkdown)).call(this, PfeMarkdown));

	    _this._markdown = null;
	    _this._markdownRender = null;
	    _this._markdownContainer = null;
	    _this._observerConfig = { childList: true, subtree: true };
	    _this._readyStateChangeHandler = _this._readyStateChangeHandler.bind(_this);

	    _this.observer = new MutationObserver(function (mutationList, observer) {
	      if (!_this._markdownContainer.textContent) {
	        _this._markdownRender.innerHTML = "";
	        return;
	      }

	      // TODO: when we stop supporting IE11, the need to disconnect and
	      // then reconnect will no longer be needed
	      if (window.ShadyCSS) observer.disconnect();
	      _this.markdown = _this._markdownContainer.textContent;
	      if (window.ShadyCSS) _this._muationObserve();
	    });
	    return _this;
	  }

	  createClass(PfeMarkdown, [{
	    key: "connectedCallback",
	    value: function connectedCallback() {
	      var _this2 = this;

	      get(PfeMarkdown.prototype.__proto__ || Object.getPrototypeOf(PfeMarkdown.prototype), "connectedCallback", this).call(this);

	      this._markdownRender = document.createElement("div");
	      this._markdownRender.setAttribute("pfe-markdown-render", "");
	      this.appendChild(this._markdownRender);

	      this.shadowRoot.querySelector("slot").addEventListener("slotchange", function () {
	        if (!_this2._markdownContainer) {
	          _this2._markdownContainer = _this2.querySelector("[pfe-markdown-container]");
	          _this2._markdownContainer.style.display = "none";

	          _this2._init();
	        }
	      });
	    }
	  }, {
	    key: "disconnectedCallback",
	    value: function disconnectedCallback() {
	      get(PfeMarkdown.prototype.__proto__ || Object.getPrototypeOf(PfeMarkdown.prototype), "disconnectedCallback", this).call(this);
	      if (this.observer) this.observer.disconnect();
	    }
	  }, {
	    key: "_readyStateChangeHandler",
	    value: function _readyStateChangeHandler(event) {
	      if (event.target.readyState === "complete") {
	        document.removeEventListener("readystatechange", this._readyStateChangeHandler);
	        this._init();
	      }
	    }
	  }, {
	    key: "_init",
	    value: function _init() {
	      if (this._markdownContainer.textContent) {
	        this.markdown = this._markdownContainer.textContent;
	      }

	      this._muationObserve();
	    }
	  }, {
	    key: "renderMarkdown",
	    value: function renderMarkdown() {
	      this._markdownRender.innerHTML = marked_min(this.markdown);
	    }
	  }, {
	    key: "_muationObserve",
	    value: function _muationObserve() {
	      this.observer.observe(this._markdownContainer, this._observerConfig);
	    }

	    // pulled from https://github.com/PolymerElements/marked-element/blob/master/marked-element.js#L340

	  }, {
	    key: "_unindent",
	    value: function _unindent(text) {
	      if (!text) return text;

	      var lines = text.replace(/\t/g, "  ").split("\n");
	      var indent = lines.reduce(function (prev, line) {
	        // Completely ignore blank lines.
	        if (/^\s*$/.test(line)) return prev;

	        var lineIndent = line.match(/^(\s*)/)[0].length;

	        if (prev === null) return lineIndent;

	        return lineIndent < prev ? lineIndent : prev;
	      }, null);

	      return lines.map(function (l) {
	        return l.substr(indent);
	      }).join("\n");
	    }
	  }]);
	  return PfeMarkdown;
	}(PFElement);

	PFElement.create(PfeMarkdown);

	return PfeMarkdown;

})));
//# sourceMappingURL=pfe-markdown.umd.js.map

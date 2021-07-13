// @POLYFILL  Number.prototype.parseInt
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt
if (Number.parseInt === undefined) {
  Number.parseInt = window.parseInt;
}

// @POLYFILL  Array.prototype.filter
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
if (!Array.prototype.filter) {
  Array.prototype.filter = function (func, thisArg) {
    "use strict";
    if (!((typeof func === "Function" || typeof func === "function") && this)) throw new TypeError();

    var len = this.length >>> 0,
      res = new Array(len), // preallocate array
      t = this,
      c = 0,
      i = -1;

    var kValue;
    if (thisArg === undefined) {
      while (++i !== len) {
        // checks to see if the key was set
        if (i in this) {
          kValue = t[i]; // in case t is changed in callback
          if (func(t[i], i, t)) {
            res[c++] = kValue;
          }
        }
      }
    } else {
      while (++i !== len) {
        // checks to see if the key was set
        if (i in this) {
          kValue = t[i];
          if (func.call(thisArg, t[i], i, t)) {
            res[c++] = kValue;
          }
        }
      }
    }

    res.length = c; // shrink down array to proper size
    return res;
  };
}

// @POLYFILL  Event.prototype.path
// https://stackoverflow.com/questions/36845515/mouseevent-path-equivalent-in-firefox-safari
if (!("path" in Event.prototype)) {
  Object.defineProperty(Event.prototype, "path", {
    get: function () {
      var path = [];
      var currentElem = this.target;
      while (currentElem) {
        path.push(currentElem);
        currentElem = currentElem.parentElement;
      }
      if (path.indexOf(window) === -1 && path.indexOf(document) === -1) path.push(document);
      if (path.indexOf(window) === -1) path.push(window);
      return path;
    },
  });
}

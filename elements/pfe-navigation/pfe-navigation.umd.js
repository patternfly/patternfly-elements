(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../pfelement/pfelement.umd'), require('../pfe-accordion/pfe-accordion.umd')) :
  typeof define === 'function' && define.amd ? define(['../pfelement/pfelement.umd', '../pfe-accordion/pfe-accordion.umd'], factory) :
  (global.PfeNavigation = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && PFElement.hasOwnProperty('default') ? PFElement['default'] : PFElement;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

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

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
      return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var es5 = createCommonjsModule(function (module) {
      var isES5 = function () {
          return this === undefined;
      }();

      if (isES5) {
          module.exports = {
              freeze: Object.freeze,
              defineProperty: Object.defineProperty,
              getDescriptor: Object.getOwnPropertyDescriptor,
              keys: Object.keys,
              names: Object.getOwnPropertyNames,
              getPrototypeOf: Object.getPrototypeOf,
              isArray: Array.isArray,
              isES5: isES5,
              propertyIsWritable: function propertyIsWritable(obj, prop) {
                  var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
                  return !!(!descriptor || descriptor.writable || descriptor.set);
              }
          };
      } else {
          var has = {}.hasOwnProperty;
          var str = {}.toString;
          var proto = {}.constructor.prototype;

          var ObjectKeys = function ObjectKeys(o) {
              var ret = [];
              for (var key in o) {
                  if (has.call(o, key)) {
                      ret.push(key);
                  }
              }
              return ret;
          };

          var ObjectGetDescriptor = function ObjectGetDescriptor(o, key) {
              return { value: o[key] };
          };

          var ObjectDefineProperty = function ObjectDefineProperty(o, key, desc) {
              o[key] = desc.value;
              return o;
          };

          var ObjectFreeze = function ObjectFreeze(obj) {
              return obj;
          };

          var ObjectGetPrototypeOf = function ObjectGetPrototypeOf(obj) {
              try {
                  return Object(obj).constructor.prototype;
              } catch (e) {
                  return proto;
              }
          };

          var ArrayIsArray = function ArrayIsArray(obj) {
              try {
                  return str.call(obj) === "[object Array]";
              } catch (e) {
                  return false;
              }
          };

          module.exports = {
              isArray: ArrayIsArray,
              keys: ObjectKeys,
              names: ObjectKeys,
              defineProperty: ObjectDefineProperty,
              getDescriptor: ObjectGetDescriptor,
              freeze: ObjectFreeze,
              getPrototypeOf: ObjectGetPrototypeOf,
              isES5: isES5,
              propertyIsWritable: function propertyIsWritable() {
                  return true;
              }
          };
      }
  });
  var es5_1 = es5.freeze;
  var es5_2 = es5.defineProperty;
  var es5_3 = es5.getDescriptor;
  var es5_4 = es5.keys;
  var es5_5 = es5.names;
  var es5_6 = es5.getPrototypeOf;
  var es5_7 = es5.isArray;
  var es5_8 = es5.isES5;
  var es5_9 = es5.propertyIsWritable;

  var canEvaluate = typeof navigator == "undefined";

  var errorObj = { e: {} };
  var tryCatchTarget;
  var globalObject = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : commonjsGlobal !== undefined ? commonjsGlobal : null;

  function tryCatcher() {
      try {
          var target = tryCatchTarget;
          tryCatchTarget = null;
          return target.apply(this, arguments);
      } catch (e) {
          errorObj.e = e;
          return errorObj;
      }
  }
  function tryCatch(fn) {
      tryCatchTarget = fn;
      return tryCatcher;
  }

  var inherits$1 = function inherits$$1(Child, Parent) {
      var hasProp = {}.hasOwnProperty;

      function T() {
          this.constructor = Child;
          this.constructor$ = Parent;
          for (var propertyName in Parent.prototype) {
              if (hasProp.call(Parent.prototype, propertyName) && propertyName.charAt(propertyName.length - 1) !== "$") {
                  this[propertyName + "$"] = Parent.prototype[propertyName];
              }
          }
      }
      T.prototype = Parent.prototype;
      Child.prototype = new T();
      return Child.prototype;
  };

  function isPrimitive(val) {
      return val == null || val === true || val === false || typeof val === "string" || typeof val === "number";
  }

  function isObject(value) {
      return typeof value === "function" || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === "object" && value !== null;
  }

  function maybeWrapAsError(maybeError) {
      if (!isPrimitive(maybeError)) return maybeError;

      return new Error(safeToString(maybeError));
  }

  function withAppended(target, appendee) {
      var len = target.length;
      var ret = new Array(len + 1);
      var i;
      for (i = 0; i < len; ++i) {
          ret[i] = target[i];
      }
      ret[i] = appendee;
      return ret;
  }

  function getDataPropertyOrDefault(obj, key, defaultValue) {
      if (es5.isES5) {
          var desc = Object.getOwnPropertyDescriptor(obj, key);

          if (desc != null) {
              return desc.get == null && desc.set == null ? desc.value : defaultValue;
          }
      } else {
          return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
      }
  }

  function notEnumerableProp(obj, name, value) {
      if (isPrimitive(obj)) return obj;
      var descriptor = {
          value: value,
          configurable: true,
          enumerable: false,
          writable: true
      };
      es5.defineProperty(obj, name, descriptor);
      return obj;
  }

  function thrower(r) {
      throw r;
  }

  var inheritedDataKeys = function () {
      var excludedPrototypes = [Array.prototype, Object.prototype, Function.prototype];

      var isExcludedProto = function isExcludedProto(val) {
          for (var i = 0; i < excludedPrototypes.length; ++i) {
              if (excludedPrototypes[i] === val) {
                  return true;
              }
          }
          return false;
      };

      if (es5.isES5) {
          var getKeys = Object.getOwnPropertyNames;
          return function (obj) {
              var ret = [];
              var visitedKeys = Object.create(null);
              while (obj != null && !isExcludedProto(obj)) {
                  var keys;
                  try {
                      keys = getKeys(obj);
                  } catch (e) {
                      return ret;
                  }
                  for (var i = 0; i < keys.length; ++i) {
                      var key = keys[i];
                      if (visitedKeys[key]) continue;
                      visitedKeys[key] = true;
                      var desc = Object.getOwnPropertyDescriptor(obj, key);
                      if (desc != null && desc.get == null && desc.set == null) {
                          ret.push(key);
                      }
                  }
                  obj = es5.getPrototypeOf(obj);
              }
              return ret;
          };
      } else {
          var hasProp = {}.hasOwnProperty;
          return function (obj) {
              if (isExcludedProto(obj)) return [];
              var ret = [];

              /*jshint forin:false */
              enumeration: for (var key in obj) {
                  if (hasProp.call(obj, key)) {
                      ret.push(key);
                  } else {
                      for (var i = 0; i < excludedPrototypes.length; ++i) {
                          if (hasProp.call(excludedPrototypes[i], key)) {
                              continue enumeration;
                          }
                      }
                      ret.push(key);
                  }
              }
              return ret;
          };
      }
  }();

  var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
  function isClass(fn) {
      try {
          if (typeof fn === "function") {
              var keys = es5.names(fn.prototype);

              var hasMethods = es5.isES5 && keys.length > 1;
              var hasMethodsOtherThanConstructor = keys.length > 0 && !(keys.length === 1 && keys[0] === "constructor");
              var hasThisAssignmentAndStaticMethods = thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

              if (hasMethods || hasMethodsOtherThanConstructor || hasThisAssignmentAndStaticMethods) {
                  return true;
              }
          }
          return false;
      } catch (e) {
          return false;
      }
  }

  function toFastProperties(obj) {
      return obj;
      eval(obj);
  }

  var rident = /^[a-z$_][a-z$_0-9]*$/i;
  function isIdentifier(str) {
      return rident.test(str);
  }

  function filledRange(count, prefix, suffix) {
      var ret = new Array(count);
      for (var i = 0; i < count; ++i) {
          ret[i] = prefix + i + suffix;
      }
      return ret;
  }

  function safeToString(obj) {
      try {
          return obj + "";
      } catch (e) {
          return "[no string representation]";
      }
  }

  function isError(obj) {
      return obj instanceof Error || obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object" && typeof obj.message === "string" && typeof obj.name === "string";
  }

  function markAsOriginatingFromRejection(e) {
      try {
          notEnumerableProp(e, "isOperational", true);
      } catch (ignore) {}
  }

  function originatesFromRejection(e) {
      if (e == null) return false;
      return e instanceof Error["__BluebirdErrorTypes__"].OperationalError || e["isOperational"] === true;
  }

  function canAttachTrace(obj) {
      return isError(obj) && es5.propertyIsWritable(obj, "stack");
  }

  var ensureErrorObject = function () {
      if (!("stack" in new Error())) {
          return function (value) {
              if (canAttachTrace(value)) return value;
              try {
                  throw new Error(safeToString(value));
              } catch (err) {
                  return err;
              }
          };
      } else {
          return function (value) {
              if (canAttachTrace(value)) return value;
              return new Error(safeToString(value));
          };
      }
  }();

  function classString(obj) {
      return {}.toString.call(obj);
  }

  function copyDescriptors(from, to, filter) {
      var keys = es5.names(from);
      for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          if (filter(key)) {
              try {
                  es5.defineProperty(to, key, es5.getDescriptor(from, key));
              } catch (ignore) {}
          }
      }
  }

  var asArray = function asArray(v) {
      if (es5.isArray(v)) {
          return v;
      }
      return null;
  };

  if (typeof Symbol !== "undefined" && Symbol.iterator) {
      var ArrayFrom = typeof Array.from === "function" ? function (v) {
          return Array.from(v);
      } : function (v) {
          var ret = [];
          var it = v[Symbol.iterator]();
          var itResult;
          while (!(itResult = it.next()).done) {
              ret.push(itResult.value);
          }
          return ret;
      };

      asArray = function asArray(v) {
          if (es5.isArray(v)) {
              return v;
          } else if (v != null && typeof v[Symbol.iterator] === "function") {
              return ArrayFrom(v);
          }
          return null;
      };
  }

  var isNode = typeof process !== "undefined" && classString(process).toLowerCase() === "[object process]";

  var hasEnvVariables = typeof process !== "undefined" && typeof process.env !== "undefined";

  function env(key) {
      return hasEnvVariables ? process.env[key] : undefined;
  }

  function getNativePromise() {
      if (typeof Promise === "function") {
          try {
              var promise = new Promise(function () {});
              if ({}.toString.call(promise) === "[object Promise]") {
                  return Promise;
              }
          } catch (e) {}
      }
  }

  function domainBind(self, cb) {
      return self.bind(cb);
  }

  var ret = {
      isClass: isClass,
      isIdentifier: isIdentifier,
      inheritedDataKeys: inheritedDataKeys,
      getDataPropertyOrDefault: getDataPropertyOrDefault,
      thrower: thrower,
      isArray: es5.isArray,
      asArray: asArray,
      notEnumerableProp: notEnumerableProp,
      isPrimitive: isPrimitive,
      isObject: isObject,
      isError: isError,
      canEvaluate: canEvaluate,
      errorObj: errorObj,
      tryCatch: tryCatch,
      inherits: inherits$1,
      withAppended: withAppended,
      maybeWrapAsError: maybeWrapAsError,
      toFastProperties: toFastProperties,
      filledRange: filledRange,
      toString: safeToString,
      canAttachTrace: canAttachTrace,
      ensureErrorObject: ensureErrorObject,
      originatesFromRejection: originatesFromRejection,
      markAsOriginatingFromRejection: markAsOriginatingFromRejection,
      classString: classString,
      copyDescriptors: copyDescriptors,
      hasDevTools: typeof chrome !== "undefined" && chrome && typeof chrome.loadTimes === "function",
      isNode: isNode,
      hasEnvVariables: hasEnvVariables,
      env: env,
      global: globalObject,
      getNativePromise: getNativePromise,
      domainBind: domainBind
  };
  ret.isRecentNode = ret.isNode && function () {
      var version = process.versions.node.split(".").map(Number);
      return version[0] === 0 && version[1] > 10 || version[0] > 0;
  }();

  if (ret.isNode) ret.toFastProperties(process);

  try {
      throw new Error();
  } catch (e) {
      ret.lastLineError = e;
  }
  var util = ret;

  var schedule;
  var noAsyncScheduler = function noAsyncScheduler() {
      throw new Error('No async scheduler available\n\n    See http://goo.gl/MqrFmX\n');
  };
  var NativePromise = util.getNativePromise();
  if (util.isNode && typeof MutationObserver === "undefined") {
      var GlobalSetImmediate = commonjsGlobal.setImmediate;
      var ProcessNextTick = process.nextTick;
      schedule = util.isRecentNode ? function (fn) {
          GlobalSetImmediate.call(commonjsGlobal, fn);
      } : function (fn) {
          ProcessNextTick.call(process, fn);
      };
  } else if (typeof NativePromise === "function" && typeof NativePromise.resolve === "function") {
      var nativePromise = NativePromise.resolve();
      schedule = function schedule(fn) {
          nativePromise.then(fn);
      };
  } else if (typeof MutationObserver !== "undefined" && !(typeof window !== "undefined" && window.navigator && (window.navigator.standalone || window.cordova))) {
      schedule = function () {
          var div = document.createElement("div");
          var opts = { attributes: true };
          var toggleScheduled = false;
          var div2 = document.createElement("div");
          var o2 = new MutationObserver(function () {
              div.classList.toggle("foo");
              toggleScheduled = false;
          });
          o2.observe(div2, opts);

          var scheduleToggle = function scheduleToggle() {
              if (toggleScheduled) return;
              toggleScheduled = true;
              div2.classList.toggle("foo");
          };

          return function schedule(fn) {
              var o = new MutationObserver(function () {
                  o.disconnect();
                  fn();
              });
              o.observe(div, opts);
              scheduleToggle();
          };
      }();
  } else if (typeof setImmediate !== "undefined") {
      schedule = function schedule(fn) {
          setImmediate(fn);
      };
  } else if (typeof setTimeout !== "undefined") {
      schedule = function schedule(fn) {
          setTimeout(fn, 0);
      };
  } else {
      schedule = noAsyncScheduler;
  }
  var schedule_1 = schedule;

  function arrayMove(src, srcIndex, dst, dstIndex, len) {
      for (var j = 0; j < len; ++j) {
          dst[j + dstIndex] = src[j + srcIndex];
          src[j + srcIndex] = void 0;
      }
  }

  function Queue(capacity) {
      this._capacity = capacity;
      this._length = 0;
      this._front = 0;
  }

  Queue.prototype._willBeOverCapacity = function (size) {
      return this._capacity < size;
  };

  Queue.prototype._pushOne = function (arg) {
      var length = this.length();
      this._checkCapacity(length + 1);
      var i = this._front + length & this._capacity - 1;
      this[i] = arg;
      this._length = length + 1;
  };

  Queue.prototype.push = function (fn, receiver, arg) {
      var length = this.length() + 3;
      if (this._willBeOverCapacity(length)) {
          this._pushOne(fn);
          this._pushOne(receiver);
          this._pushOne(arg);
          return;
      }
      var j = this._front + length - 3;
      this._checkCapacity(length);
      var wrapMask = this._capacity - 1;
      this[j + 0 & wrapMask] = fn;
      this[j + 1 & wrapMask] = receiver;
      this[j + 2 & wrapMask] = arg;
      this._length = length;
  };

  Queue.prototype.shift = function () {
      var front = this._front,
          ret = this[front];

      this[front] = undefined;
      this._front = front + 1 & this._capacity - 1;
      this._length--;
      return ret;
  };

  Queue.prototype.length = function () {
      return this._length;
  };

  Queue.prototype._checkCapacity = function (size) {
      if (this._capacity < size) {
          this._resizeTo(this._capacity << 1);
      }
  };

  Queue.prototype._resizeTo = function (capacity) {
      var oldCapacity = this._capacity;
      this._capacity = capacity;
      var front = this._front;
      var length = this._length;
      var moveItemsCount = front + length & oldCapacity - 1;
      arrayMove(this, 0, this, oldCapacity, moveItemsCount);
  };

  var queue = Queue;

  var firstLineError;
  try {
      throw new Error();
  } catch (e) {
      firstLineError = e;
  }

  function Async() {
      this._customScheduler = false;
      this._isTickUsed = false;
      this._lateQueue = new queue(16);
      this._normalQueue = new queue(16);
      this._haveDrainedQueues = false;
      this._trampolineEnabled = true;
      var self = this;
      this.drainQueues = function () {
          self._drainQueues();
      };
      this._schedule = schedule_1;
  }

  Async.prototype.setScheduler = function (fn) {
      var prev = this._schedule;
      this._schedule = fn;
      this._customScheduler = true;
      return prev;
  };

  Async.prototype.hasCustomScheduler = function () {
      return this._customScheduler;
  };

  Async.prototype.enableTrampoline = function () {
      this._trampolineEnabled = true;
  };

  Async.prototype.disableTrampolineIfNecessary = function () {
      if (util.hasDevTools) {
          this._trampolineEnabled = false;
      }
  };

  Async.prototype.haveItemsQueued = function () {
      return this._isTickUsed || this._haveDrainedQueues;
  };

  Async.prototype.fatalError = function (e, isNode) {
      if (isNode) {
          process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) + "\n");
          process.exit(2);
      } else {
          this.throwLater(e);
      }
  };

  Async.prototype.throwLater = function (fn, arg) {
      if (arguments.length === 1) {
          arg = fn;
          fn = function fn() {
              throw arg;
          };
      }
      if (typeof setTimeout !== "undefined") {
          setTimeout(function () {
              fn(arg);
          }, 0);
      } else try {
          this._schedule(function () {
              fn(arg);
          });
      } catch (e) {
          throw new Error('No async scheduler available\n\n    See http://goo.gl/MqrFmX\n');
      }
  };

  function AsyncInvokeLater(fn, receiver, arg) {
      this._lateQueue.push(fn, receiver, arg);
      this._queueTick();
  }

  function AsyncInvoke(fn, receiver, arg) {
      this._normalQueue.push(fn, receiver, arg);
      this._queueTick();
  }

  function AsyncSettlePromises(promise) {
      this._normalQueue._pushOne(promise);
      this._queueTick();
  }

  if (!util.hasDevTools) {
      Async.prototype.invokeLater = AsyncInvokeLater;
      Async.prototype.invoke = AsyncInvoke;
      Async.prototype.settlePromises = AsyncSettlePromises;
  } else {
      Async.prototype.invokeLater = function (fn, receiver, arg) {
          if (this._trampolineEnabled) {
              AsyncInvokeLater.call(this, fn, receiver, arg);
          } else {
              this._schedule(function () {
                  setTimeout(function () {
                      fn.call(receiver, arg);
                  }, 100);
              });
          }
      };

      Async.prototype.invoke = function (fn, receiver, arg) {
          if (this._trampolineEnabled) {
              AsyncInvoke.call(this, fn, receiver, arg);
          } else {
              this._schedule(function () {
                  fn.call(receiver, arg);
              });
          }
      };

      Async.prototype.settlePromises = function (promise) {
          if (this._trampolineEnabled) {
              AsyncSettlePromises.call(this, promise);
          } else {
              this._schedule(function () {
                  promise._settlePromises();
              });
          }
      };
  }

  function _drainQueue(queue$$1) {
      while (queue$$1.length() > 0) {
          _drainQueueStep(queue$$1);
      }
  }

  function _drainQueueStep(queue$$1) {
      var fn = queue$$1.shift();
      if (typeof fn !== "function") {
          fn._settlePromises();
      } else {
          var receiver = queue$$1.shift();
          var arg = queue$$1.shift();
          fn.call(receiver, arg);
      }
  }

  Async.prototype._drainQueues = function () {
      _drainQueue(this._normalQueue);
      this._reset();
      this._haveDrainedQueues = true;
      _drainQueue(this._lateQueue);
  };

  Async.prototype._queueTick = function () {
      if (!this._isTickUsed) {
          this._isTickUsed = true;
          this._schedule(this.drainQueues);
      }
  };

  Async.prototype._reset = function () {
      this._isTickUsed = false;
  };

  var async = Async;
  var firstLineError_1 = firstLineError;
  async.firstLineError = firstLineError_1;

  var Objectfreeze = es5.freeze;

  var inherits$1$1 = util.inherits;
  var notEnumerableProp$1 = util.notEnumerableProp;

  function subError(nameProperty, defaultMessage) {
      function SubError(message) {
          if (!(this instanceof SubError)) return new SubError(message);
          notEnumerableProp$1(this, "message", typeof message === "string" ? message : defaultMessage);
          notEnumerableProp$1(this, "name", nameProperty);
          if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
          } else {
              Error.call(this);
          }
      }
      inherits$1$1(SubError, Error);
      return SubError;
  }

  var _TypeError, _RangeError;
  var Warning = subError("Warning", "warning");
  var CancellationError = subError("CancellationError", "cancellation error");
  var TimeoutError = subError("TimeoutError", "timeout error");
  var AggregateError = subError("AggregateError", "aggregate error");
  try {
      _TypeError = TypeError;
      _RangeError = RangeError;
  } catch (e) {
      _TypeError = subError("TypeError", "type error");
      _RangeError = subError("RangeError", "range error");
  }

  var methods = ("join pop push shift unshift slice filter forEach some " + "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

  for (var i = 0; i < methods.length; ++i) {
      if (typeof Array.prototype[methods[i]] === "function") {
          AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
      }
  }

  es5.defineProperty(AggregateError.prototype, "length", {
      value: 0,
      configurable: false,
      writable: true,
      enumerable: true
  });
  AggregateError.prototype["isOperational"] = true;
  var level = 0;
  AggregateError.prototype.toString = function () {
      var indent = Array(level * 4 + 1).join(" ");
      var ret = "\n" + indent + "AggregateError of:" + "\n";
      level++;
      indent = Array(level * 4 + 1).join(" ");
      for (var i = 0; i < this.length; ++i) {
          var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
          var lines = str.split("\n");
          for (var j = 0; j < lines.length; ++j) {
              lines[j] = indent + lines[j];
          }
          str = lines.join("\n");
          ret += str + "\n";
      }
      level--;
      return ret;
  };

  function OperationalError(message) {
      if (!(this instanceof OperationalError)) return new OperationalError(message);
      notEnumerableProp$1(this, "name", "OperationalError");
      notEnumerableProp$1(this, "message", message);
      this.cause = message;
      this["isOperational"] = true;

      if (message instanceof Error) {
          notEnumerableProp$1(this, "message", message.message);
          notEnumerableProp$1(this, "stack", message.stack);
      } else if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
      }
  }
  inherits$1$1(OperationalError, Error);

  var errorTypes = Error["__BluebirdErrorTypes__"];
  if (!errorTypes) {
      errorTypes = Objectfreeze({
          CancellationError: CancellationError,
          TimeoutError: TimeoutError,
          OperationalError: OperationalError,
          RejectionError: OperationalError,
          AggregateError: AggregateError
      });
      es5.defineProperty(Error, "__BluebirdErrorTypes__", {
          value: errorTypes,
          writable: false,
          enumerable: false,
          configurable: false
      });
  }

  var errors = {
      Error: Error,
      TypeError: _TypeError,
      RangeError: _RangeError,
      CancellationError: errorTypes.CancellationError,
      OperationalError: errorTypes.OperationalError,
      TimeoutError: errorTypes.TimeoutError,
      AggregateError: errorTypes.AggregateError,
      Warning: Warning
  };

  var thenables = function thenables(Promise, INTERNAL) {
      var util$$1 = util;
      var errorObj = util$$1.errorObj;
      var isObject = util$$1.isObject;

      function tryConvertToPromise(obj, context) {
          if (isObject(obj)) {
              if (obj instanceof Promise) return obj;
              var then = getThen(obj);
              if (then === errorObj) {
                  if (context) context._pushContext();
                  var ret = Promise.reject(then.e);
                  if (context) context._popContext();
                  return ret;
              } else if (typeof then === "function") {
                  if (isAnyBluebirdPromise(obj)) {
                      var ret = new Promise(INTERNAL);
                      obj._then(ret._fulfill, ret._reject, undefined, ret, null);
                      return ret;
                  }
                  return doThenable(obj, then, context);
              }
          }
          return obj;
      }

      function doGetThen(obj) {
          return obj.then;
      }

      function getThen(obj) {
          try {
              return doGetThen(obj);
          } catch (e) {
              errorObj.e = e;
              return errorObj;
          }
      }

      var hasProp = {}.hasOwnProperty;
      function isAnyBluebirdPromise(obj) {
          try {
              return hasProp.call(obj, "_promise0");
          } catch (e) {
              return false;
          }
      }

      function doThenable(x, then, context) {
          var promise = new Promise(INTERNAL);
          var ret = promise;
          if (context) context._pushContext();
          promise._captureStackTrace();
          if (context) context._popContext();
          var synchronous = true;
          var result = util$$1.tryCatch(then).call(x, resolve, reject);
          synchronous = false;

          if (promise && result === errorObj) {
              promise._rejectCallback(result.e, true, true);
              promise = null;
          }

          function resolve(value) {
              if (!promise) return;
              promise._resolveCallback(value);
              promise = null;
          }

          function reject(reason) {
              if (!promise) return;
              promise._rejectCallback(reason, synchronous, true);
              promise = null;
          }
          return ret;
      }

      return tryConvertToPromise;
  };

  var promise_array = function promise_array(Promise, INTERNAL, tryConvertToPromise, apiRejection, Proxyable) {
      var util$$1 = util;

      function toResolutionValue(val) {
          switch (val) {
              case -2:
                  return [];
              case -3:
                  return {};
              case -6:
                  return new Map();
          }
      }

      function PromiseArray(values) {
          var promise = this._promise = new Promise(INTERNAL);
          if (values instanceof Promise) {
              promise._propagateFrom(values, 3);
          }
          promise._setOnCancel(this);
          this._values = values;
          this._length = 0;
          this._totalResolved = 0;
          this._init(undefined, -2);
      }
      util$$1.inherits(PromiseArray, Proxyable);

      PromiseArray.prototype.length = function () {
          return this._length;
      };

      PromiseArray.prototype.promise = function () {
          return this._promise;
      };

      PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
          var values = tryConvertToPromise(this._values, this._promise);
          if (values instanceof Promise) {
              values = values._target();
              var bitField = values._bitField;
              this._values = values;

              if ((bitField & 50397184) === 0) {
                  this._promise._setAsyncGuaranteed();
                  return values._then(init, this._reject, undefined, this, resolveValueIfEmpty);
              } else if ((bitField & 33554432) !== 0) {
                  values = values._value();
              } else if ((bitField & 16777216) !== 0) {
                  return this._reject(values._reason());
              } else {
                  return this._cancel();
              }
          }
          values = util$$1.asArray(values);
          if (values === null) {
              var err = apiRejection("expecting an array or an iterable object but got " + util$$1.classString(values)).reason();
              this._promise._rejectCallback(err, false);
              return;
          }

          if (values.length === 0) {
              if (resolveValueIfEmpty === -5) {
                  this._resolveEmptyArray();
              } else {
                  this._resolve(toResolutionValue(resolveValueIfEmpty));
              }
              return;
          }
          this._iterate(values);
      };

      PromiseArray.prototype._iterate = function (values) {
          var len = this.getActualLength(values.length);
          this._length = len;
          this._values = this.shouldCopyValues() ? new Array(len) : this._values;
          var result = this._promise;
          var isResolved = false;
          var bitField = null;
          for (var i = 0; i < len; ++i) {
              var maybePromise = tryConvertToPromise(values[i], result);

              if (maybePromise instanceof Promise) {
                  maybePromise = maybePromise._target();
                  bitField = maybePromise._bitField;
              } else {
                  bitField = null;
              }

              if (isResolved) {
                  if (bitField !== null) {
                      maybePromise.suppressUnhandledRejections();
                  }
              } else if (bitField !== null) {
                  if ((bitField & 50397184) === 0) {
                      maybePromise._proxy(this, i);
                      this._values[i] = maybePromise;
                  } else if ((bitField & 33554432) !== 0) {
                      isResolved = this._promiseFulfilled(maybePromise._value(), i);
                  } else if ((bitField & 16777216) !== 0) {
                      isResolved = this._promiseRejected(maybePromise._reason(), i);
                  } else {
                      isResolved = this._promiseCancelled(i);
                  }
              } else {
                  isResolved = this._promiseFulfilled(maybePromise, i);
              }
          }
          if (!isResolved) result._setAsyncGuaranteed();
      };

      PromiseArray.prototype._isResolved = function () {
          return this._values === null;
      };

      PromiseArray.prototype._resolve = function (value) {
          this._values = null;
          this._promise._fulfill(value);
      };

      PromiseArray.prototype._cancel = function () {
          if (this._isResolved() || !this._promise._isCancellable()) return;
          this._values = null;
          this._promise._cancel();
      };

      PromiseArray.prototype._reject = function (reason) {
          this._values = null;
          this._promise._rejectCallback(reason, false);
      };

      PromiseArray.prototype._promiseFulfilled = function (value, index) {
          this._values[index] = value;
          var totalResolved = ++this._totalResolved;
          if (totalResolved >= this._length) {
              this._resolve(this._values);
              return true;
          }
          return false;
      };

      PromiseArray.prototype._promiseCancelled = function () {
          this._cancel();
          return true;
      };

      PromiseArray.prototype._promiseRejected = function (reason) {
          this._totalResolved++;
          this._reject(reason);
          return true;
      };

      PromiseArray.prototype._resultCancelled = function () {
          if (this._isResolved()) return;
          var values = this._values;
          this._cancel();
          if (values instanceof Promise) {
              values.cancel();
          } else {
              for (var i = 0; i < values.length; ++i) {
                  if (values[i] instanceof Promise) {
                      values[i].cancel();
                  }
              }
          }
      };

      PromiseArray.prototype.shouldCopyValues = function () {
          return true;
      };

      PromiseArray.prototype.getActualLength = function (len) {
          return len;
      };

      return PromiseArray;
  };

  var context = function context(Promise) {
      var longStackTraces = false;
      var contextStack = [];

      Promise.prototype._promiseCreated = function () {};
      Promise.prototype._pushContext = function () {};
      Promise.prototype._popContext = function () {
          return null;
      };
      Promise._peekContext = Promise.prototype._peekContext = function () {};

      function Context() {
          this._trace = new Context.CapturedTrace(peekContext());
      }
      Context.prototype._pushContext = function () {
          if (this._trace !== undefined) {
              this._trace._promiseCreated = null;
              contextStack.push(this._trace);
          }
      };

      Context.prototype._popContext = function () {
          if (this._trace !== undefined) {
              var trace = contextStack.pop();
              var ret = trace._promiseCreated;
              trace._promiseCreated = null;
              return ret;
          }
          return null;
      };

      function createContext() {
          if (longStackTraces) return new Context();
      }

      function peekContext() {
          var lastIndex = contextStack.length - 1;
          if (lastIndex >= 0) {
              return contextStack[lastIndex];
          }
          return undefined;
      }
      Context.CapturedTrace = null;
      Context.create = createContext;
      Context.deactivateLongStackTraces = function () {};
      Context.activateLongStackTraces = function () {
          var Promise_pushContext = Promise.prototype._pushContext;
          var Promise_popContext = Promise.prototype._popContext;
          var Promise_PeekContext = Promise._peekContext;
          var Promise_peekContext = Promise.prototype._peekContext;
          var Promise_promiseCreated = Promise.prototype._promiseCreated;
          Context.deactivateLongStackTraces = function () {
              Promise.prototype._pushContext = Promise_pushContext;
              Promise.prototype._popContext = Promise_popContext;
              Promise._peekContext = Promise_PeekContext;
              Promise.prototype._peekContext = Promise_peekContext;
              Promise.prototype._promiseCreated = Promise_promiseCreated;
              longStackTraces = false;
          };
          longStackTraces = true;
          Promise.prototype._pushContext = Context.prototype._pushContext;
          Promise.prototype._popContext = Context.prototype._popContext;
          Promise._peekContext = Promise.prototype._peekContext = peekContext;
          Promise.prototype._promiseCreated = function () {
              var ctx = this._peekContext();
              if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
          };
      };
      return Context;
  };

  var debuggability = function debuggability(Promise, Context) {
      var getDomain = Promise._getDomain;
      var async = Promise._async;
      var Warning = errors.Warning;
      var util$$1 = util;
      var es5$$1 = es5;
      var canAttachTrace = util$$1.canAttachTrace;
      var unhandledRejectionHandled;
      var possiblyUnhandledRejection;
      var bluebirdFramePattern = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
      var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
      var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
      var stackFramePattern = null;
      var formatStack = null;
      var indentStackFrames = false;
      var printWarning;
      var debugging = !!(util$$1.env("BLUEBIRD_DEBUG") != 0 && (util$$1.env("BLUEBIRD_DEBUG") || util$$1.env("NODE_ENV") === "development"));

      var warnings = !!(util$$1.env("BLUEBIRD_WARNINGS") != 0 && (debugging || util$$1.env("BLUEBIRD_WARNINGS")));

      var longStackTraces = !!(util$$1.env("BLUEBIRD_LONG_STACK_TRACES") != 0 && (debugging || util$$1.env("BLUEBIRD_LONG_STACK_TRACES")));

      var wForgottenReturn = util$$1.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 && (warnings || !!util$$1.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

      Promise.prototype.suppressUnhandledRejections = function () {
          var target = this._target();
          target._bitField = target._bitField & ~1048576 | 524288;
      };

      Promise.prototype._ensurePossibleRejectionHandled = function () {
          if ((this._bitField & 524288) !== 0) return;
          this._setRejectionIsUnhandled();
          var self = this;
          setTimeout(function () {
              self._notifyUnhandledRejection();
          }, 1);
      };

      Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
          fireRejectionEvent("rejectionHandled", unhandledRejectionHandled, undefined, this);
      };

      Promise.prototype._setReturnedNonUndefined = function () {
          this._bitField = this._bitField | 268435456;
      };

      Promise.prototype._returnedNonUndefined = function () {
          return (this._bitField & 268435456) !== 0;
      };

      Promise.prototype._notifyUnhandledRejection = function () {
          if (this._isRejectionUnhandled()) {
              var reason = this._settledValue();
              this._setUnhandledRejectionIsNotified();
              fireRejectionEvent("unhandledRejection", possiblyUnhandledRejection, reason, this);
          }
      };

      Promise.prototype._setUnhandledRejectionIsNotified = function () {
          this._bitField = this._bitField | 262144;
      };

      Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
          this._bitField = this._bitField & ~262144;
      };

      Promise.prototype._isUnhandledRejectionNotified = function () {
          return (this._bitField & 262144) > 0;
      };

      Promise.prototype._setRejectionIsUnhandled = function () {
          this._bitField = this._bitField | 1048576;
      };

      Promise.prototype._unsetRejectionIsUnhandled = function () {
          this._bitField = this._bitField & ~1048576;
          if (this._isUnhandledRejectionNotified()) {
              this._unsetUnhandledRejectionIsNotified();
              this._notifyUnhandledRejectionIsHandled();
          }
      };

      Promise.prototype._isRejectionUnhandled = function () {
          return (this._bitField & 1048576) > 0;
      };

      Promise.prototype._warn = function (message, shouldUseOwnTrace, promise) {
          return warn(message, shouldUseOwnTrace, promise || this);
      };

      Promise.onPossiblyUnhandledRejection = function (fn) {
          var domain = getDomain();
          possiblyUnhandledRejection = typeof fn === "function" ? domain === null ? fn : util$$1.domainBind(domain, fn) : undefined;
      };

      Promise.onUnhandledRejectionHandled = function (fn) {
          var domain = getDomain();
          unhandledRejectionHandled = typeof fn === "function" ? domain === null ? fn : util$$1.domainBind(domain, fn) : undefined;
      };

      var disableLongStackTraces = function disableLongStackTraces() {};
      Promise.longStackTraces = function () {
          if (async.haveItemsQueued() && !config.longStackTraces) {
              throw new Error('cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n');
          }
          if (!config.longStackTraces && longStackTracesIsSupported()) {
              var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
              var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
              var Promise_dereferenceTrace = Promise.prototype._dereferenceTrace;
              config.longStackTraces = true;
              disableLongStackTraces = function disableLongStackTraces() {
                  if (async.haveItemsQueued() && !config.longStackTraces) {
                      throw new Error('cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n');
                  }
                  Promise.prototype._captureStackTrace = Promise_captureStackTrace;
                  Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
                  Promise.prototype._dereferenceTrace = Promise_dereferenceTrace;
                  Context.deactivateLongStackTraces();
                  async.enableTrampoline();
                  config.longStackTraces = false;
              };
              Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
              Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
              Promise.prototype._dereferenceTrace = longStackTracesDereferenceTrace;
              Context.activateLongStackTraces();
              async.disableTrampolineIfNecessary();
          }
      };

      Promise.hasLongStackTraces = function () {
          return config.longStackTraces && longStackTracesIsSupported();
      };

      var fireDomEvent = function () {
          try {
              if (typeof CustomEvent === "function") {
                  var event = new CustomEvent("CustomEvent");
                  util$$1.global.dispatchEvent(event);
                  return function (name, event) {
                      var eventData = {
                          detail: event,
                          cancelable: true
                      };
                      es5$$1.defineProperty(eventData, "promise", { value: event.promise });
                      es5$$1.defineProperty(eventData, "reason", { value: event.reason });
                      var domEvent = new CustomEvent(name.toLowerCase(), eventData);
                      return !util$$1.global.dispatchEvent(domEvent);
                  };
              } else if (typeof Event === "function") {
                  var event = new Event("CustomEvent");
                  util$$1.global.dispatchEvent(event);
                  return function (name, event) {
                      var domEvent = new Event(name.toLowerCase(), {
                          cancelable: true
                      });
                      domEvent.detail = event;
                      es5$$1.defineProperty(domEvent, "promise", { value: event.promise });
                      es5$$1.defineProperty(domEvent, "reason", { value: event.reason });
                      return !util$$1.global.dispatchEvent(domEvent);
                  };
              } else {
                  var event = document.createEvent("CustomEvent");
                  event.initCustomEvent("testingtheevent", false, true, {});
                  util$$1.global.dispatchEvent(event);
                  return function (name, event) {
                      var domEvent = document.createEvent("CustomEvent");
                      domEvent.initCustomEvent(name.toLowerCase(), false, true, event);
                      return !util$$1.global.dispatchEvent(domEvent);
                  };
              }
          } catch (e) {}
          return function () {
              return false;
          };
      }();

      var fireGlobalEvent = function () {
          if (util$$1.isNode) {
              return function () {
                  return process.emit.apply(process, arguments);
              };
          } else {
              if (!util$$1.global) {
                  return function () {
                      return false;
                  };
              }
              return function (name) {
                  var methodName = "on" + name.toLowerCase();
                  var method = util$$1.global[methodName];
                  if (!method) return false;
                  method.apply(util$$1.global, [].slice.call(arguments, 1));
                  return true;
              };
          }
      }();

      function generatePromiseLifecycleEventObject(name, promise) {
          return { promise: promise };
      }

      var eventToObjectGenerator = {
          promiseCreated: generatePromiseLifecycleEventObject,
          promiseFulfilled: generatePromiseLifecycleEventObject,
          promiseRejected: generatePromiseLifecycleEventObject,
          promiseResolved: generatePromiseLifecycleEventObject,
          promiseCancelled: generatePromiseLifecycleEventObject,
          promiseChained: function promiseChained(name, promise, child) {
              return { promise: promise, child: child };
          },
          warning: function warning(name, _warning) {
              return { warning: _warning };
          },
          unhandledRejection: function unhandledRejection(name, reason, promise) {
              return { reason: reason, promise: promise };
          },
          rejectionHandled: generatePromiseLifecycleEventObject
      };

      var activeFireEvent = function activeFireEvent(name) {
          var globalEventFired = false;
          try {
              globalEventFired = fireGlobalEvent.apply(null, arguments);
          } catch (e) {
              async.throwLater(e);
              globalEventFired = true;
          }

          var domEventFired = false;
          try {
              domEventFired = fireDomEvent(name, eventToObjectGenerator[name].apply(null, arguments));
          } catch (e) {
              async.throwLater(e);
              domEventFired = true;
          }

          return domEventFired || globalEventFired;
      };

      Promise.config = function (opts) {
          opts = Object(opts);
          if ("longStackTraces" in opts) {
              if (opts.longStackTraces) {
                  Promise.longStackTraces();
              } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
                  disableLongStackTraces();
              }
          }
          if ("warnings" in opts) {
              var warningsOption = opts.warnings;
              config.warnings = !!warningsOption;
              wForgottenReturn = config.warnings;

              if (util$$1.isObject(warningsOption)) {
                  if ("wForgottenReturn" in warningsOption) {
                      wForgottenReturn = !!warningsOption.wForgottenReturn;
                  }
              }
          }
          if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
              if (async.haveItemsQueued()) {
                  throw new Error("cannot enable cancellation after promises are in use");
              }
              Promise.prototype._clearCancellationData = cancellationClearCancellationData;
              Promise.prototype._propagateFrom = cancellationPropagateFrom;
              Promise.prototype._onCancel = cancellationOnCancel;
              Promise.prototype._setOnCancel = cancellationSetOnCancel;
              Promise.prototype._attachCancellationCallback = cancellationAttachCancellationCallback;
              Promise.prototype._execute = cancellationExecute;
              _propagateFromFunction = cancellationPropagateFrom;
              config.cancellation = true;
          }
          if ("monitoring" in opts) {
              if (opts.monitoring && !config.monitoring) {
                  config.monitoring = true;
                  Promise.prototype._fireEvent = activeFireEvent;
              } else if (!opts.monitoring && config.monitoring) {
                  config.monitoring = false;
                  Promise.prototype._fireEvent = defaultFireEvent;
              }
          }
          return Promise;
      };

      function defaultFireEvent() {
          return false;
      }

      Promise.prototype._fireEvent = defaultFireEvent;
      Promise.prototype._execute = function (executor, resolve, reject) {
          try {
              executor(resolve, reject);
          } catch (e) {
              return e;
          }
      };
      Promise.prototype._onCancel = function () {};
      Promise.prototype._setOnCancel = function (handler) {};
      Promise.prototype._attachCancellationCallback = function (onCancel) {};
      Promise.prototype._captureStackTrace = function () {};
      Promise.prototype._attachExtraTrace = function () {};
      Promise.prototype._dereferenceTrace = function () {};
      Promise.prototype._clearCancellationData = function () {};
      Promise.prototype._propagateFrom = function (parent, flags) {};

      function cancellationExecute(executor, resolve, reject) {
          var promise = this;
          try {
              executor(resolve, reject, function (onCancel) {
                  if (typeof onCancel !== "function") {
                      throw new TypeError("onCancel must be a function, got: " + util$$1.toString(onCancel));
                  }
                  promise._attachCancellationCallback(onCancel);
              });
          } catch (e) {
              return e;
          }
      }

      function cancellationAttachCancellationCallback(onCancel) {
          if (!this._isCancellable()) return this;

          var previousOnCancel = this._onCancel();
          if (previousOnCancel !== undefined) {
              if (util$$1.isArray(previousOnCancel)) {
                  previousOnCancel.push(onCancel);
              } else {
                  this._setOnCancel([previousOnCancel, onCancel]);
              }
          } else {
              this._setOnCancel(onCancel);
          }
      }

      function cancellationOnCancel() {
          return this._onCancelField;
      }

      function cancellationSetOnCancel(onCancel) {
          this._onCancelField = onCancel;
      }

      function cancellationClearCancellationData() {
          this._cancellationParent = undefined;
          this._onCancelField = undefined;
      }

      function cancellationPropagateFrom(parent, flags) {
          if ((flags & 1) !== 0) {
              this._cancellationParent = parent;
              var branchesRemainingToCancel = parent._branchesRemainingToCancel;
              if (branchesRemainingToCancel === undefined) {
                  branchesRemainingToCancel = 0;
              }
              parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
          }
          if ((flags & 2) !== 0 && parent._isBound()) {
              this._setBoundTo(parent._boundTo);
          }
      }

      function bindingPropagateFrom(parent, flags) {
          if ((flags & 2) !== 0 && parent._isBound()) {
              this._setBoundTo(parent._boundTo);
          }
      }
      var _propagateFromFunction = bindingPropagateFrom;

      function _boundValueFunction() {
          var ret = this._boundTo;
          if (ret !== undefined) {
              if (ret instanceof Promise) {
                  if (ret.isFulfilled()) {
                      return ret.value();
                  } else {
                      return undefined;
                  }
              }
          }
          return ret;
      }

      function longStackTracesCaptureStackTrace() {
          this._trace = new CapturedTrace(this._peekContext());
      }

      function longStackTracesAttachExtraTrace(error, ignoreSelf) {
          if (canAttachTrace(error)) {
              var trace = this._trace;
              if (trace !== undefined) {
                  if (ignoreSelf) trace = trace._parent;
              }
              if (trace !== undefined) {
                  trace.attachExtraTrace(error);
              } else if (!error.__stackCleaned__) {
                  var parsed = parseStackAndMessage(error);
                  util$$1.notEnumerableProp(error, "stack", parsed.message + "\n" + parsed.stack.join("\n"));
                  util$$1.notEnumerableProp(error, "__stackCleaned__", true);
              }
          }
      }

      function longStackTracesDereferenceTrace() {
          this._trace = undefined;
      }

      function checkForgottenReturns(returnValue, promiseCreated, name, promise, parent) {
          if (returnValue === undefined && promiseCreated !== null && wForgottenReturn) {
              if (parent !== undefined && parent._returnedNonUndefined()) return;
              if ((promise._bitField & 65535) === 0) return;

              if (name) name = name + " ";
              var handlerLine = "";
              var creatorLine = "";
              if (promiseCreated._trace) {
                  var traceLines = promiseCreated._trace.stack.split("\n");
                  var stack = cleanStack(traceLines);
                  for (var i = stack.length - 1; i >= 0; --i) {
                      var line = stack[i];
                      if (!nodeFramePattern.test(line)) {
                          var lineMatches = line.match(parseLinePattern);
                          if (lineMatches) {
                              handlerLine = "at " + lineMatches[1] + ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
                          }
                          break;
                      }
                  }

                  if (stack.length > 0) {
                      var firstUserLine = stack[0];
                      for (var i = 0; i < traceLines.length; ++i) {

                          if (traceLines[i] === firstUserLine) {
                              if (i > 0) {
                                  creatorLine = "\n" + traceLines[i - 1];
                              }
                              break;
                          }
                      }
                  }
              }
              var msg = "a promise was created in a " + name + "handler " + handlerLine + "but was not returned from it, " + "see http://goo.gl/rRqMUw" + creatorLine;
              promise._warn(msg, true, promiseCreated);
          }
      }

      function deprecated(name, replacement) {
          var message = name + " is deprecated and will be removed in a future version.";
          if (replacement) message += " Use " + replacement + " instead.";
          return warn(message);
      }

      function warn(message, shouldUseOwnTrace, promise) {
          if (!config.warnings) return;
          var warning = new Warning(message);
          var ctx;
          if (shouldUseOwnTrace) {
              promise._attachExtraTrace(warning);
          } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
              ctx.attachExtraTrace(warning);
          } else {
              var parsed = parseStackAndMessage(warning);
              warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
          }

          if (!activeFireEvent("warning", warning)) {
              formatAndLogError(warning, "", true);
          }
      }

      function reconstructStack(message, stacks) {
          for (var i = 0; i < stacks.length - 1; ++i) {
              stacks[i].push("From previous event:");
              stacks[i] = stacks[i].join("\n");
          }
          if (i < stacks.length) {
              stacks[i] = stacks[i].join("\n");
          }
          return message + "\n" + stacks.join("\n");
      }

      function removeDuplicateOrEmptyJumps(stacks) {
          for (var i = 0; i < stacks.length; ++i) {
              if (stacks[i].length === 0 || i + 1 < stacks.length && stacks[i][0] === stacks[i + 1][0]) {
                  stacks.splice(i, 1);
                  i--;
              }
          }
      }

      function removeCommonRoots(stacks) {
          var current = stacks[0];
          for (var i = 1; i < stacks.length; ++i) {
              var prev = stacks[i];
              var currentLastIndex = current.length - 1;
              var currentLastLine = current[currentLastIndex];
              var commonRootMeetPoint = -1;

              for (var j = prev.length - 1; j >= 0; --j) {
                  if (prev[j] === currentLastLine) {
                      commonRootMeetPoint = j;
                      break;
                  }
              }

              for (var j = commonRootMeetPoint; j >= 0; --j) {
                  var line = prev[j];
                  if (current[currentLastIndex] === line) {
                      current.pop();
                      currentLastIndex--;
                  } else {
                      break;
                  }
              }
              current = prev;
          }
      }

      function cleanStack(stack) {
          var ret = [];
          for (var i = 0; i < stack.length; ++i) {
              var line = stack[i];
              var isTraceLine = "    (No stack trace)" === line || stackFramePattern.test(line);
              var isInternalFrame = isTraceLine && shouldIgnore(line);
              if (isTraceLine && !isInternalFrame) {
                  if (indentStackFrames && line.charAt(0) !== " ") {
                      line = "    " + line;
                  }
                  ret.push(line);
              }
          }
          return ret;
      }

      function stackFramesAsArray(error) {
          var stack = error.stack.replace(/\s+$/g, "").split("\n");
          for (var i = 0; i < stack.length; ++i) {
              var line = stack[i];
              if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
                  break;
              }
          }
          if (i > 0 && error.name != "SyntaxError") {
              stack = stack.slice(i);
          }
          return stack;
      }

      function parseStackAndMessage(error) {
          var stack = error.stack;
          var message = error.toString();
          stack = typeof stack === "string" && stack.length > 0 ? stackFramesAsArray(error) : ["    (No stack trace)"];
          return {
              message: message,
              stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
          };
      }

      function formatAndLogError(error, title, isSoft) {
          if (typeof console !== "undefined") {
              var message;
              if (util$$1.isObject(error)) {
                  var stack = error.stack;
                  message = title + formatStack(stack, error);
              } else {
                  message = title + String(error);
              }
              if (typeof printWarning === "function") {
                  printWarning(message, isSoft);
              } else if (typeof console.log === "function" || _typeof(console.log) === "object") {
                  console.log(message);
              }
          }
      }

      function fireRejectionEvent(name, localHandler, reason, promise) {
          var localEventFired = false;
          try {
              if (typeof localHandler === "function") {
                  localEventFired = true;
                  if (name === "rejectionHandled") {
                      localHandler(promise);
                  } else {
                      localHandler(reason, promise);
                  }
              }
          } catch (e) {
              async.throwLater(e);
          }

          if (name === "unhandledRejection") {
              if (!activeFireEvent(name, reason, promise) && !localEventFired) {
                  formatAndLogError(reason, "Unhandled rejection ");
              }
          } else {
              activeFireEvent(name, promise);
          }
      }

      function formatNonError(obj) {
          var str;
          if (typeof obj === "function") {
              str = "[function " + (obj.name || "anonymous") + "]";
          } else {
              str = obj && typeof obj.toString === "function" ? obj.toString() : util$$1.toString(obj);
              var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
              if (ruselessToString.test(str)) {
                  try {
                      var newStr = JSON.stringify(obj);
                      str = newStr;
                  } catch (e) {}
              }
              if (str.length === 0) {
                  str = "(empty array)";
              }
          }
          return "(<" + snip(str) + ">, no stack trace)";
      }

      function snip(str) {
          var maxChars = 41;
          if (str.length < maxChars) {
              return str;
          }
          return str.substr(0, maxChars - 3) + "...";
      }

      function longStackTracesIsSupported() {
          return typeof captureStackTrace === "function";
      }

      var shouldIgnore = function shouldIgnore() {
          return false;
      };
      var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
      function parseLineInfo(line) {
          var matches = line.match(parseLineInfoRegex);
          if (matches) {
              return {
                  fileName: matches[1],
                  line: parseInt(matches[2], 10)
              };
          }
      }

      function setBounds(firstLineError, lastLineError) {
          if (!longStackTracesIsSupported()) return;
          var firstStackLines = firstLineError.stack.split("\n");
          var lastStackLines = lastLineError.stack.split("\n");
          var firstIndex = -1;
          var lastIndex = -1;
          var firstFileName;
          var lastFileName;
          for (var i = 0; i < firstStackLines.length; ++i) {
              var result = parseLineInfo(firstStackLines[i]);
              if (result) {
                  firstFileName = result.fileName;
                  firstIndex = result.line;
                  break;
              }
          }
          for (var i = 0; i < lastStackLines.length; ++i) {
              var result = parseLineInfo(lastStackLines[i]);
              if (result) {
                  lastFileName = result.fileName;
                  lastIndex = result.line;
                  break;
              }
          }
          if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName || firstFileName !== lastFileName || firstIndex >= lastIndex) {
              return;
          }

          shouldIgnore = function shouldIgnore(line) {
              if (bluebirdFramePattern.test(line)) return true;
              var info = parseLineInfo(line);
              if (info) {
                  if (info.fileName === firstFileName && firstIndex <= info.line && info.line <= lastIndex) {
                      return true;
                  }
              }
              return false;
          };
      }

      function CapturedTrace(parent) {
          this._parent = parent;
          this._promisesCreated = 0;
          var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
          captureStackTrace(this, CapturedTrace);
          if (length > 32) this.uncycle();
      }
      util$$1.inherits(CapturedTrace, Error);
      Context.CapturedTrace = CapturedTrace;

      CapturedTrace.prototype.uncycle = function () {
          var length = this._length;
          if (length < 2) return;
          var nodes = [];
          var stackToIndex = {};

          for (var i = 0, node = this; node !== undefined; ++i) {
              nodes.push(node);
              node = node._parent;
          }
          length = this._length = i;
          for (var i = length - 1; i >= 0; --i) {
              var stack = nodes[i].stack;
              if (stackToIndex[stack] === undefined) {
                  stackToIndex[stack] = i;
              }
          }
          for (var i = 0; i < length; ++i) {
              var currentStack = nodes[i].stack;
              var index = stackToIndex[currentStack];
              if (index !== undefined && index !== i) {
                  if (index > 0) {
                      nodes[index - 1]._parent = undefined;
                      nodes[index - 1]._length = 1;
                  }
                  nodes[i]._parent = undefined;
                  nodes[i]._length = 1;
                  var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

                  if (index < length - 1) {
                      cycleEdgeNode._parent = nodes[index + 1];
                      cycleEdgeNode._parent.uncycle();
                      cycleEdgeNode._length = cycleEdgeNode._parent._length + 1;
                  } else {
                      cycleEdgeNode._parent = undefined;
                      cycleEdgeNode._length = 1;
                  }
                  var currentChildLength = cycleEdgeNode._length + 1;
                  for (var j = i - 2; j >= 0; --j) {
                      nodes[j]._length = currentChildLength;
                      currentChildLength++;
                  }
                  return;
              }
          }
      };

      CapturedTrace.prototype.attachExtraTrace = function (error) {
          if (error.__stackCleaned__) return;
          this.uncycle();
          var parsed = parseStackAndMessage(error);
          var message = parsed.message;
          var stacks = [parsed.stack];

          var trace = this;
          while (trace !== undefined) {
              stacks.push(cleanStack(trace.stack.split("\n")));
              trace = trace._parent;
          }
          removeCommonRoots(stacks);
          removeDuplicateOrEmptyJumps(stacks);
          util$$1.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
          util$$1.notEnumerableProp(error, "__stackCleaned__", true);
      };

      var captureStackTrace = function stackDetection() {
          var v8stackFramePattern = /^\s*at\s*/;
          var v8stackFormatter = function v8stackFormatter(stack, error) {
              if (typeof stack === "string") return stack;

              if (error.name !== undefined && error.message !== undefined) {
                  return error.toString();
              }
              return formatNonError(error);
          };

          if (typeof Error.stackTraceLimit === "number" && typeof Error.captureStackTrace === "function") {
              Error.stackTraceLimit += 6;
              stackFramePattern = v8stackFramePattern;
              formatStack = v8stackFormatter;
              var captureStackTrace = Error.captureStackTrace;

              shouldIgnore = function shouldIgnore(line) {
                  return bluebirdFramePattern.test(line);
              };
              return function (receiver, ignoreUntil) {
                  Error.stackTraceLimit += 6;
                  captureStackTrace(receiver, ignoreUntil);
                  Error.stackTraceLimit -= 6;
              };
          }
          var err = new Error();

          if (typeof err.stack === "string" && err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
              stackFramePattern = /@/;
              formatStack = v8stackFormatter;
              indentStackFrames = true;
              return function captureStackTrace(o) {
                  o.stack = new Error().stack;
              };
          }

          var hasStackAfterThrow;
          try {
              throw new Error();
          } catch (e) {
              hasStackAfterThrow = "stack" in e;
          }
          if (!("stack" in err) && hasStackAfterThrow && typeof Error.stackTraceLimit === "number") {
              stackFramePattern = v8stackFramePattern;
              formatStack = v8stackFormatter;
              return function captureStackTrace(o) {
                  Error.stackTraceLimit += 6;
                  try {
                      throw new Error();
                  } catch (e) {
                      o.stack = e.stack;
                  }
                  Error.stackTraceLimit -= 6;
              };
          }

          formatStack = function formatStack(stack, error) {
              if (typeof stack === "string") return stack;

              if (((typeof error === 'undefined' ? 'undefined' : _typeof(error)) === "object" || typeof error === "function") && error.name !== undefined && error.message !== undefined) {
                  return error.toString();
              }
              return formatNonError(error);
          };

          return null;
      }([]);

      if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
          printWarning = function printWarning(message) {
              console.warn(message);
          };
          if (util$$1.isNode && process.stderr.isTTY) {
              printWarning = function printWarning(message, isSoft) {
                  var color = isSoft ? '\x1B[33m' : '\x1B[31m';
                  console.warn(color + message + '\x1B[0m\n');
              };
          } else if (!util$$1.isNode && typeof new Error().stack === "string") {
              printWarning = function printWarning(message, isSoft) {
                  console.warn("%c" + message, isSoft ? "color: darkorange" : "color: red");
              };
          }
      }

      var config = {
          warnings: warnings,
          longStackTraces: false,
          cancellation: false,
          monitoring: false
      };

      if (longStackTraces) Promise.longStackTraces();

      return {
          longStackTraces: function longStackTraces() {
              return config.longStackTraces;
          },
          warnings: function warnings() {
              return config.warnings;
          },
          cancellation: function cancellation() {
              return config.cancellation;
          },
          monitoring: function monitoring() {
              return config.monitoring;
          },
          propagateFromFunction: function propagateFromFunction() {
              return _propagateFromFunction;
          },
          boundValueFunction: function boundValueFunction() {
              return _boundValueFunction;
          },
          checkForgottenReturns: checkForgottenReturns,
          setBounds: setBounds,
          warn: warn,
          deprecated: deprecated,
          CapturedTrace: CapturedTrace,
          fireDomEvent: fireDomEvent,
          fireGlobalEvent: fireGlobalEvent
      };
  };

  var catch_filter = function catch_filter(NEXT_FILTER) {
      var util$$1 = util;
      var getKeys = es5.keys;
      var tryCatch = util$$1.tryCatch;
      var errorObj = util$$1.errorObj;

      function catchFilter(instances, cb, promise) {
          return function (e) {
              var boundTo = promise._boundValue();
              predicateLoop: for (var i = 0; i < instances.length; ++i) {
                  var item = instances[i];

                  if (item === Error || item != null && item.prototype instanceof Error) {
                      if (e instanceof item) {
                          return tryCatch(cb).call(boundTo, e);
                      }
                  } else if (typeof item === "function") {
                      var matchesPredicate = tryCatch(item).call(boundTo, e);
                      if (matchesPredicate === errorObj) {
                          return matchesPredicate;
                      } else if (matchesPredicate) {
                          return tryCatch(cb).call(boundTo, e);
                      }
                  } else if (util$$1.isObject(e)) {
                      var keys = getKeys(item);
                      for (var j = 0; j < keys.length; ++j) {
                          var key = keys[j];
                          if (item[key] != e[key]) {
                              continue predicateLoop;
                          }
                      }
                      return tryCatch(cb).call(boundTo, e);
                  }
              }
              return NEXT_FILTER;
          };
      }

      return catchFilter;
  };

  var _finally = function _finally(Promise, tryConvertToPromise, NEXT_FILTER) {
      var util$$1 = util;
      var CancellationError = Promise.CancellationError;
      var errorObj = util$$1.errorObj;
      var catchFilter = catch_filter(NEXT_FILTER);

      function PassThroughHandlerContext(promise, type, handler) {
          this.promise = promise;
          this.type = type;
          this.handler = handler;
          this.called = false;
          this.cancelPromise = null;
      }

      PassThroughHandlerContext.prototype.isFinallyHandler = function () {
          return this.type === 0;
      };

      function FinallyHandlerCancelReaction(finallyHandler) {
          this.finallyHandler = finallyHandler;
      }

      FinallyHandlerCancelReaction.prototype._resultCancelled = function () {
          checkCancel(this.finallyHandler);
      };

      function checkCancel(ctx, reason) {
          if (ctx.cancelPromise != null) {
              if (arguments.length > 1) {
                  ctx.cancelPromise._reject(reason);
              } else {
                  ctx.cancelPromise._cancel();
              }
              ctx.cancelPromise = null;
              return true;
          }
          return false;
      }

      function succeed() {
          return finallyHandler.call(this, this.promise._target()._settledValue());
      }
      function fail(reason) {
          if (checkCancel(this, reason)) return;
          errorObj.e = reason;
          return errorObj;
      }
      function finallyHandler(reasonOrValue) {
          var promise = this.promise;
          var handler = this.handler;

          if (!this.called) {
              this.called = true;
              var ret = this.isFinallyHandler() ? handler.call(promise._boundValue()) : handler.call(promise._boundValue(), reasonOrValue);
              if (ret === NEXT_FILTER) {
                  return ret;
              } else if (ret !== undefined) {
                  promise._setReturnedNonUndefined();
                  var maybePromise = tryConvertToPromise(ret, promise);
                  if (maybePromise instanceof Promise) {
                      if (this.cancelPromise != null) {
                          if (maybePromise._isCancelled()) {
                              var reason = new CancellationError("late cancellation observer");
                              promise._attachExtraTrace(reason);
                              errorObj.e = reason;
                              return errorObj;
                          } else if (maybePromise.isPending()) {
                              maybePromise._attachCancellationCallback(new FinallyHandlerCancelReaction(this));
                          }
                      }
                      return maybePromise._then(succeed, fail, undefined, this, undefined);
                  }
              }
          }

          if (promise.isRejected()) {
              checkCancel(this);
              errorObj.e = reasonOrValue;
              return errorObj;
          } else {
              checkCancel(this);
              return reasonOrValue;
          }
      }

      Promise.prototype._passThrough = function (handler, type, success, fail) {
          if (typeof handler !== "function") return this.then();
          return this._then(success, fail, undefined, new PassThroughHandlerContext(this, type, handler), undefined);
      };

      Promise.prototype.lastly = Promise.prototype["finally"] = function (handler) {
          return this._passThrough(handler, 0, finallyHandler, finallyHandler);
      };

      Promise.prototype.tap = function (handler) {
          return this._passThrough(handler, 1, finallyHandler);
      };

      Promise.prototype.tapCatch = function (handlerOrPredicate) {
          var len = arguments.length;
          if (len === 1) {
              return this._passThrough(handlerOrPredicate, 1, undefined, finallyHandler);
          } else {
              var catchInstances = new Array(len - 1),
                  j = 0,
                  i;
              for (i = 0; i < len - 1; ++i) {
                  var item = arguments[i];
                  if (util$$1.isObject(item)) {
                      catchInstances[j++] = item;
                  } else {
                      return Promise.reject(new TypeError("tapCatch statement predicate: " + "expecting an object but got " + util$$1.classString(item)));
                  }
              }
              catchInstances.length = j;
              var handler = arguments[i];
              return this._passThrough(catchFilter(catchInstances, handler, this), 1, undefined, finallyHandler);
          }
      };

      return PassThroughHandlerContext;
  };

  var maybeWrapAsError$1 = util.maybeWrapAsError;

  var OperationalError$1 = errors.OperationalError;

  function isUntypedError(obj) {
      return obj instanceof Error && es5.getPrototypeOf(obj) === Error.prototype;
  }

  var rErrorKey = /^(?:name|message|stack|cause)$/;
  function wrapAsOperationalError(obj) {
      var ret;
      if (isUntypedError(obj)) {
          ret = new OperationalError$1(obj);
          ret.name = obj.name;
          ret.message = obj.message;
          ret.stack = obj.stack;
          var keys = es5.keys(obj);
          for (var i = 0; i < keys.length; ++i) {
              var key = keys[i];
              if (!rErrorKey.test(key)) {
                  ret[key] = obj[key];
              }
          }
          return ret;
      }
      util.markAsOriginatingFromRejection(obj);
      return obj;
  }

  function nodebackForPromise(promise, multiArgs) {
      return function (err, value) {
          if (promise === null) return;
          if (err) {
              var wrapped = wrapAsOperationalError(maybeWrapAsError$1(err));
              promise._attachExtraTrace(wrapped);
              promise._reject(wrapped);
          } else if (!multiArgs) {
              promise._fulfill(value);
          } else {
              var $_len = arguments.length;var args = new Array(Math.max($_len - 1, 0));for (var $_i = 1; $_i < $_len; ++$_i) {
                  args[$_i - 1] = arguments[$_i];
              }promise._fulfill(args);
          }
          promise = null;
      };
  }

  var nodeback = nodebackForPromise;

  var method = function method(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
      var util$$1 = util;
      var tryCatch = util$$1.tryCatch;

      Promise.method = function (fn) {
          if (typeof fn !== "function") {
              throw new Promise.TypeError("expecting a function but got " + util$$1.classString(fn));
          }
          return function () {
              var ret = new Promise(INTERNAL);
              ret._captureStackTrace();
              ret._pushContext();
              var value = tryCatch(fn).apply(this, arguments);
              var promiseCreated = ret._popContext();
              debug.checkForgottenReturns(value, promiseCreated, "Promise.method", ret);
              ret._resolveFromSyncValue(value);
              return ret;
          };
      };

      Promise.attempt = Promise["try"] = function (fn) {
          if (typeof fn !== "function") {
              return apiRejection("expecting a function but got " + util$$1.classString(fn));
          }
          var ret = new Promise(INTERNAL);
          ret._captureStackTrace();
          ret._pushContext();
          var value;
          if (arguments.length > 1) {
              debug.deprecated("calling Promise.try with more than 1 argument");
              var arg = arguments[1];
              var ctx = arguments[2];
              value = util$$1.isArray(arg) ? tryCatch(fn).apply(ctx, arg) : tryCatch(fn).call(ctx, arg);
          } else {
              value = tryCatch(fn)();
          }
          var promiseCreated = ret._popContext();
          debug.checkForgottenReturns(value, promiseCreated, "Promise.try", ret);
          ret._resolveFromSyncValue(value);
          return ret;
      };

      Promise.prototype._resolveFromSyncValue = function (value) {
          if (value === util$$1.errorObj) {
              this._rejectCallback(value.e, false);
          } else {
              this._resolveCallback(value, true);
          }
      };
  };

  var bind = function bind(Promise, INTERNAL, tryConvertToPromise, debug) {
      var calledBind = false;
      var rejectThis = function rejectThis(_, e) {
          this._reject(e);
      };

      var targetRejected = function targetRejected(e, context) {
          context.promiseRejectionQueued = true;
          context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
      };

      var bindingResolved = function bindingResolved(thisArg, context) {
          if ((this._bitField & 50397184) === 0) {
              this._resolveCallback(context.target);
          }
      };

      var bindingRejected = function bindingRejected(e, context) {
          if (!context.promiseRejectionQueued) this._reject(e);
      };

      Promise.prototype.bind = function (thisArg) {
          if (!calledBind) {
              calledBind = true;
              Promise.prototype._propagateFrom = debug.propagateFromFunction();
              Promise.prototype._boundValue = debug.boundValueFunction();
          }
          var maybePromise = tryConvertToPromise(thisArg);
          var ret = new Promise(INTERNAL);
          ret._propagateFrom(this, 1);
          var target = this._target();
          ret._setBoundTo(maybePromise);
          if (maybePromise instanceof Promise) {
              var context = {
                  promiseRejectionQueued: false,
                  promise: ret,
                  target: target,
                  bindingPromise: maybePromise
              };
              target._then(INTERNAL, targetRejected, undefined, ret, context);
              maybePromise._then(bindingResolved, bindingRejected, undefined, ret, context);
              ret._setOnCancel(maybePromise);
          } else {
              ret._resolveCallback(target);
          }
          return ret;
      };

      Promise.prototype._setBoundTo = function (obj) {
          if (obj !== undefined) {
              this._bitField = this._bitField | 2097152;
              this._boundTo = obj;
          } else {
              this._bitField = this._bitField & ~2097152;
          }
      };

      Promise.prototype._isBound = function () {
          return (this._bitField & 2097152) === 2097152;
      };

      Promise.bind = function (thisArg, value) {
          return Promise.resolve(value).bind(thisArg);
      };
  };

  var cancel = function cancel(Promise, PromiseArray, apiRejection, debug) {
      var util$$1 = util;
      var tryCatch = util$$1.tryCatch;
      var errorObj = util$$1.errorObj;
      var async = Promise._async;

      Promise.prototype["break"] = Promise.prototype.cancel = function () {
          if (!debug.cancellation()) return this._warn("cancellation is disabled");

          var promise = this;
          var child = promise;
          while (promise._isCancellable()) {
              if (!promise._cancelBy(child)) {
                  if (child._isFollowing()) {
                      child._followee().cancel();
                  } else {
                      child._cancelBranched();
                  }
                  break;
              }

              var parent = promise._cancellationParent;
              if (parent == null || !parent._isCancellable()) {
                  if (promise._isFollowing()) {
                      promise._followee().cancel();
                  } else {
                      promise._cancelBranched();
                  }
                  break;
              } else {
                  if (promise._isFollowing()) promise._followee().cancel();
                  promise._setWillBeCancelled();
                  child = promise;
                  promise = parent;
              }
          }
      };

      Promise.prototype._branchHasCancelled = function () {
          this._branchesRemainingToCancel--;
      };

      Promise.prototype._enoughBranchesHaveCancelled = function () {
          return this._branchesRemainingToCancel === undefined || this._branchesRemainingToCancel <= 0;
      };

      Promise.prototype._cancelBy = function (canceller) {
          if (canceller === this) {
              this._branchesRemainingToCancel = 0;
              this._invokeOnCancel();
              return true;
          } else {
              this._branchHasCancelled();
              if (this._enoughBranchesHaveCancelled()) {
                  this._invokeOnCancel();
                  return true;
              }
          }
          return false;
      };

      Promise.prototype._cancelBranched = function () {
          if (this._enoughBranchesHaveCancelled()) {
              this._cancel();
          }
      };

      Promise.prototype._cancel = function () {
          if (!this._isCancellable()) return;
          this._setCancelled();
          async.invoke(this._cancelPromises, this, undefined);
      };

      Promise.prototype._cancelPromises = function () {
          if (this._length() > 0) this._settlePromises();
      };

      Promise.prototype._unsetOnCancel = function () {
          this._onCancelField = undefined;
      };

      Promise.prototype._isCancellable = function () {
          return this.isPending() && !this._isCancelled();
      };

      Promise.prototype.isCancellable = function () {
          return this.isPending() && !this.isCancelled();
      };

      Promise.prototype._doInvokeOnCancel = function (onCancelCallback, internalOnly) {
          if (util$$1.isArray(onCancelCallback)) {
              for (var i = 0; i < onCancelCallback.length; ++i) {
                  this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
              }
          } else if (onCancelCallback !== undefined) {
              if (typeof onCancelCallback === "function") {
                  if (!internalOnly) {
                      var e = tryCatch(onCancelCallback).call(this._boundValue());
                      if (e === errorObj) {
                          this._attachExtraTrace(e.e);
                          async.throwLater(e.e);
                      }
                  }
              } else {
                  onCancelCallback._resultCancelled(this);
              }
          }
      };

      Promise.prototype._invokeOnCancel = function () {
          var onCancelCallback = this._onCancel();
          this._unsetOnCancel();
          async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
      };

      Promise.prototype._invokeInternalOnCancel = function () {
          if (this._isCancellable()) {
              this._doInvokeOnCancel(this._onCancel(), true);
              this._unsetOnCancel();
          }
      };

      Promise.prototype._resultCancelled = function () {
          this.cancel();
      };
  };

  var direct_resolve = function direct_resolve(Promise) {
      function returner() {
          return this.value;
      }
      function thrower() {
          throw this.reason;
      }

      Promise.prototype["return"] = Promise.prototype.thenReturn = function (value) {
          if (value instanceof Promise) value.suppressUnhandledRejections();
          return this._then(returner, undefined, undefined, { value: value }, undefined);
      };

      Promise.prototype["throw"] = Promise.prototype.thenThrow = function (reason) {
          return this._then(thrower, undefined, undefined, { reason: reason }, undefined);
      };

      Promise.prototype.catchThrow = function (reason) {
          if (arguments.length <= 1) {
              return this._then(undefined, thrower, undefined, { reason: reason }, undefined);
          } else {
              var _reason = arguments[1];
              var handler = function handler() {
                  throw _reason;
              };
              return this.caught(reason, handler);
          }
      };

      Promise.prototype.catchReturn = function (value) {
          if (arguments.length <= 1) {
              if (value instanceof Promise) value.suppressUnhandledRejections();
              return this._then(undefined, returner, undefined, { value: value }, undefined);
          } else {
              var _value = arguments[1];
              if (_value instanceof Promise) _value.suppressUnhandledRejections();
              var handler = function handler() {
                  return _value;
              };
              return this.caught(value, handler);
          }
      };
  };

  var synchronous_inspection = function synchronous_inspection(Promise) {
      function PromiseInspection(promise) {
          if (promise !== undefined) {
              promise = promise._target();
              this._bitField = promise._bitField;
              this._settledValueField = promise._isFateSealed() ? promise._settledValue() : undefined;
          } else {
              this._bitField = 0;
              this._settledValueField = undefined;
          }
      }

      PromiseInspection.prototype._settledValue = function () {
          return this._settledValueField;
      };

      var value = PromiseInspection.prototype.value = function () {
          if (!this.isFulfilled()) {
              throw new TypeError('cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n');
          }
          return this._settledValue();
      };

      var reason = PromiseInspection.prototype.error = PromiseInspection.prototype.reason = function () {
          if (!this.isRejected()) {
              throw new TypeError('cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n');
          }
          return this._settledValue();
      };

      var isFulfilled = PromiseInspection.prototype.isFulfilled = function () {
          return (this._bitField & 33554432) !== 0;
      };

      var isRejected = PromiseInspection.prototype.isRejected = function () {
          return (this._bitField & 16777216) !== 0;
      };

      var isPending = PromiseInspection.prototype.isPending = function () {
          return (this._bitField & 50397184) === 0;
      };

      var isResolved = PromiseInspection.prototype.isResolved = function () {
          return (this._bitField & 50331648) !== 0;
      };

      PromiseInspection.prototype.isCancelled = function () {
          return (this._bitField & 8454144) !== 0;
      };

      Promise.prototype.__isCancelled = function () {
          return (this._bitField & 65536) === 65536;
      };

      Promise.prototype._isCancelled = function () {
          return this._target().__isCancelled();
      };

      Promise.prototype.isCancelled = function () {
          return (this._target()._bitField & 8454144) !== 0;
      };

      Promise.prototype.isPending = function () {
          return isPending.call(this._target());
      };

      Promise.prototype.isRejected = function () {
          return isRejected.call(this._target());
      };

      Promise.prototype.isFulfilled = function () {
          return isFulfilled.call(this._target());
      };

      Promise.prototype.isResolved = function () {
          return isResolved.call(this._target());
      };

      Promise.prototype.value = function () {
          return value.call(this._target());
      };

      Promise.prototype.reason = function () {
          var target = this._target();
          target._unsetRejectionIsUnhandled();
          return reason.call(target);
      };

      Promise.prototype._value = function () {
          return this._settledValue();
      };

      Promise.prototype._reason = function () {
          this._unsetRejectionIsUnhandled();
          return this._settledValue();
      };

      Promise.PromiseInspection = PromiseInspection;
  };

  var join = function join(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain) {
      var util$$1 = util;
      var canEvaluate = util$$1.canEvaluate;
      var tryCatch = util$$1.tryCatch;
      var errorObj = util$$1.errorObj;
      var reject;

      {
          if (canEvaluate) {
              var thenCallback = function thenCallback(i) {
                  return new Function("value", "holder", "                             \n\
            'use strict';                                                    \n\
            holder.pIndex = value;                                           \n\
            holder.checkFulfillment(this);                                   \n\
            ".replace(/Index/g, i));
              };

              var promiseSetter = function promiseSetter(i) {
                  return new Function("promise", "holder", "                           \n\
            'use strict';                                                    \n\
            holder.pIndex = promise;                                         \n\
            ".replace(/Index/g, i));
              };

              var generateHolderClass = function generateHolderClass(total) {
                  var props = new Array(total);
                  for (var i = 0; i < props.length; ++i) {
                      props[i] = "this.p" + (i + 1);
                  }
                  var assignment = props.join(" = ") + " = null;";
                  var cancellationCode = "var promise;\n" + props.map(function (prop) {
                      return "                                                         \n\
                promise = " + prop + ";                                      \n\
                if (promise instanceof Promise) {                            \n\
                    promise.cancel();                                        \n\
                }                                                            \n\
            ";
                  }).join("\n");
                  var passedArguments = props.join(", ");
                  var name = "Holder$" + total;

                  var code = "return function(tryCatch, errorObj, Promise, async) {    \n\
            'use strict';                                                    \n\
            function [TheName](fn) {                                         \n\
                [TheProperties]                                              \n\
                this.fn = fn;                                                \n\
                this.asyncNeeded = true;                                     \n\
                this.now = 0;                                                \n\
            }                                                                \n\
                                                                             \n\
            [TheName].prototype._callFunction = function(promise) {          \n\
                promise._pushContext();                                      \n\
                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n\
                promise._popContext();                                       \n\
                if (ret === errorObj) {                                      \n\
                    promise._rejectCallback(ret.e, false);                   \n\
                } else {                                                     \n\
                    promise._resolveCallback(ret);                           \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype.checkFulfillment = function(promise) {       \n\
                var now = ++this.now;                                        \n\
                if (now === [TheTotal]) {                                    \n\
                    if (this.asyncNeeded) {                                  \n\
                        async.invoke(this._callFunction, this, promise);     \n\
                    } else {                                                 \n\
                        this._callFunction(promise);                         \n\
                    }                                                        \n\
                                                                             \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype._resultCancelled = function() {              \n\
                [CancellationCode]                                           \n\
            };                                                               \n\
                                                                             \n\
            return [TheName];                                                \n\
        }(tryCatch, errorObj, Promise, async);                               \n\
        ";

                  code = code.replace(/\[TheName\]/g, name).replace(/\[TheTotal\]/g, total).replace(/\[ThePassedArguments\]/g, passedArguments).replace(/\[TheProperties\]/g, assignment).replace(/\[CancellationCode\]/g, cancellationCode);

                  return new Function("tryCatch", "errorObj", "Promise", "async", code)(tryCatch, errorObj, Promise, async);
              };

              var holderClasses = [];
              var thenCallbacks = [];
              var promiseSetters = [];

              for (var i = 0; i < 8; ++i) {
                  holderClasses.push(generateHolderClass(i + 1));
                  thenCallbacks.push(thenCallback(i + 1));
                  promiseSetters.push(promiseSetter(i + 1));
              }

              reject = function reject(reason) {
                  this._reject(reason);
              };
          }
      }

      Promise.join = function () {
          var last = arguments.length - 1;
          var fn;
          if (last > 0 && typeof arguments[last] === "function") {
              fn = arguments[last];
              {
                  if (last <= 8 && canEvaluate) {
                      var ret = new Promise(INTERNAL);
                      ret._captureStackTrace();
                      var HolderClass = holderClasses[last - 1];
                      var holder = new HolderClass(fn);
                      var callbacks = thenCallbacks;

                      for (var i = 0; i < last; ++i) {
                          var maybePromise = tryConvertToPromise(arguments[i], ret);
                          if (maybePromise instanceof Promise) {
                              maybePromise = maybePromise._target();
                              var bitField = maybePromise._bitField;
                              if ((bitField & 50397184) === 0) {
                                  maybePromise._then(callbacks[i], reject, undefined, ret, holder);
                                  promiseSetters[i](maybePromise, holder);
                                  holder.asyncNeeded = false;
                              } else if ((bitField & 33554432) !== 0) {
                                  callbacks[i].call(ret, maybePromise._value(), holder);
                              } else if ((bitField & 16777216) !== 0) {
                                  ret._reject(maybePromise._reason());
                              } else {
                                  ret._cancel();
                              }
                          } else {
                              callbacks[i].call(ret, maybePromise, holder);
                          }
                      }

                      if (!ret._isFateSealed()) {
                          if (holder.asyncNeeded) {
                              var domain = getDomain();
                              if (domain !== null) {
                                  holder.fn = util$$1.domainBind(domain, holder.fn);
                              }
                          }
                          ret._setAsyncGuaranteed();
                          ret._setOnCancel(holder);
                      }
                      return ret;
                  }
              }
          }
          var $_len = arguments.length;var args = new Array($_len);for (var $_i = 0; $_i < $_len; ++$_i) {
              args[$_i] = arguments[$_i];
          }if (fn) args.pop();
          var ret = new PromiseArray(args).promise();
          return fn !== undefined ? ret.spread(fn) : ret;
      };
  };

  var map = function map(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
      var getDomain = Promise._getDomain;
      var util$$1 = util;
      var tryCatch = util$$1.tryCatch;
      var errorObj = util$$1.errorObj;
      var async = Promise._async;

      function MappingPromiseArray(promises, fn, limit, _filter) {
          this.constructor$(promises);
          this._promise._captureStackTrace();
          var domain = getDomain();
          this._callback = domain === null ? fn : util$$1.domainBind(domain, fn);
          this._preservedValues = _filter === INTERNAL ? new Array(this.length()) : null;
          this._limit = limit;
          this._inFlight = 0;
          this._queue = [];
          async.invoke(this._asyncInit, this, undefined);
      }
      util$$1.inherits(MappingPromiseArray, PromiseArray);

      MappingPromiseArray.prototype._asyncInit = function () {
          this._init$(undefined, -2);
      };

      MappingPromiseArray.prototype._init = function () {};

      MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
          var values = this._values;
          var length = this.length();
          var preservedValues = this._preservedValues;
          var limit = this._limit;

          if (index < 0) {
              index = index * -1 - 1;
              values[index] = value;
              if (limit >= 1) {
                  this._inFlight--;
                  this._drainQueue();
                  if (this._isResolved()) return true;
              }
          } else {
              if (limit >= 1 && this._inFlight >= limit) {
                  values[index] = value;
                  this._queue.push(index);
                  return false;
              }
              if (preservedValues !== null) preservedValues[index] = value;

              var promise = this._promise;
              var callback = this._callback;
              var receiver = promise._boundValue();
              promise._pushContext();
              var ret = tryCatch(callback).call(receiver, value, index, length);
              var promiseCreated = promise._popContext();
              debug.checkForgottenReturns(ret, promiseCreated, preservedValues !== null ? "Promise.filter" : "Promise.map", promise);
              if (ret === errorObj) {
                  this._reject(ret.e);
                  return true;
              }

              var maybePromise = tryConvertToPromise(ret, this._promise);
              if (maybePromise instanceof Promise) {
                  maybePromise = maybePromise._target();
                  var bitField = maybePromise._bitField;
                  if ((bitField & 50397184) === 0) {
                      if (limit >= 1) this._inFlight++;
                      values[index] = maybePromise;
                      maybePromise._proxy(this, (index + 1) * -1);
                      return false;
                  } else if ((bitField & 33554432) !== 0) {
                      ret = maybePromise._value();
                  } else if ((bitField & 16777216) !== 0) {
                      this._reject(maybePromise._reason());
                      return true;
                  } else {
                      this._cancel();
                      return true;
                  }
              }
              values[index] = ret;
          }
          var totalResolved = ++this._totalResolved;
          if (totalResolved >= length) {
              if (preservedValues !== null) {
                  this._filter(values, preservedValues);
              } else {
                  this._resolve(values);
              }
              return true;
          }
          return false;
      };

      MappingPromiseArray.prototype._drainQueue = function () {
          var queue = this._queue;
          var limit = this._limit;
          var values = this._values;
          while (queue.length > 0 && this._inFlight < limit) {
              if (this._isResolved()) return;
              var index = queue.pop();
              this._promiseFulfilled(values[index], index);
          }
      };

      MappingPromiseArray.prototype._filter = function (booleans, values) {
          var len = values.length;
          var ret = new Array(len);
          var j = 0;
          for (var i = 0; i < len; ++i) {
              if (booleans[i]) ret[j++] = values[i];
          }
          ret.length = j;
          this._resolve(ret);
      };

      MappingPromiseArray.prototype.preservedValues = function () {
          return this._preservedValues;
      };

      function map(promises, fn, options, _filter) {
          if (typeof fn !== "function") {
              return apiRejection("expecting a function but got " + util$$1.classString(fn));
          }

          var limit = 0;
          if (options !== undefined) {
              if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === "object" && options !== null) {
                  if (typeof options.concurrency !== "number") {
                      return Promise.reject(new TypeError("'concurrency' must be a number but it is " + util$$1.classString(options.concurrency)));
                  }
                  limit = options.concurrency;
              } else {
                  return Promise.reject(new TypeError("options argument must be an object but it is " + util$$1.classString(options)));
              }
          }
          limit = typeof limit === "number" && isFinite(limit) && limit >= 1 ? limit : 0;
          return new MappingPromiseArray(promises, fn, limit, _filter).promise();
      }

      Promise.prototype.map = function (fn, options) {
          return map(this, fn, options, null);
      };

      Promise.map = function (promises, fn, options, _filter) {
          return map(promises, fn, options, _filter);
      };
  };

  var cr = Object.create;
  if (cr) {
      var callerCache = cr(null);
      var getterCache = cr(null);
      callerCache[" size"] = getterCache[" size"] = 0;
  }

  var call_get = function call_get(Promise) {
      var util$$1 = util;
      var canEvaluate = util$$1.canEvaluate;
      var isIdentifier = util$$1.isIdentifier;

      var getMethodCaller;
      var getGetter;
      {
          var makeMethodCaller = function makeMethodCaller(methodName) {
              return new Function("ensureMethod", "                                    \n\
        return function(obj) {                                               \n\
            'use strict'                                                     \n\
            var len = this.length;                                           \n\
            ensureMethod(obj, 'methodName');                                 \n\
            switch(len) {                                                    \n\
                case 1: return obj.methodName(this[0]);                      \n\
                case 2: return obj.methodName(this[0], this[1]);             \n\
                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
                case 0: return obj.methodName();                             \n\
                default:                                                     \n\
                    return obj.methodName.apply(obj, this);                  \n\
            }                                                                \n\
        };                                                                   \n\
        ".replace(/methodName/g, methodName))(ensureMethod);
          };

          var makeGetter = function makeGetter(propertyName) {
              return new Function("obj", "                                             \n\
        'use strict';                                                        \n\
        return obj.propertyName;                                             \n\
        ".replace("propertyName", propertyName));
          };

          var getCompiled = function getCompiled(name, compiler, cache) {
              var ret = cache[name];
              if (typeof ret !== "function") {
                  if (!isIdentifier(name)) {
                      return null;
                  }
                  ret = compiler(name);
                  cache[name] = ret;
                  cache[" size"]++;
                  if (cache[" size"] > 512) {
                      var keys = Object.keys(cache);
                      for (var i = 0; i < 256; ++i) {
                          delete cache[keys[i]];
                      }cache[" size"] = keys.length - 256;
                  }
              }
              return ret;
          };

          getMethodCaller = function getMethodCaller(name) {
              return getCompiled(name, makeMethodCaller, callerCache);
          };

          getGetter = function getGetter(name) {
              return getCompiled(name, makeGetter, getterCache);
          };
      }

      function ensureMethod(obj, methodName) {
          var fn;
          if (obj != null) fn = obj[methodName];
          if (typeof fn !== "function") {
              var message = "Object " + util$$1.classString(obj) + " has no method '" + util$$1.toString(methodName) + "'";
              throw new Promise.TypeError(message);
          }
          return fn;
      }

      function caller(obj) {
          var methodName = this.pop();
          var fn = ensureMethod(obj, methodName);
          return fn.apply(obj, this);
      }
      Promise.prototype.call = function (methodName) {
          var $_len = arguments.length;var args = new Array(Math.max($_len - 1, 0));for (var $_i = 1; $_i < $_len; ++$_i) {
              args[$_i - 1] = arguments[$_i];
          }{
              if (canEvaluate) {
                  var maybeCaller = getMethodCaller(methodName);
                  if (maybeCaller !== null) {
                      return this._then(maybeCaller, undefined, undefined, args, undefined);
                  }
              }
          }
          args.push(methodName);
          return this._then(caller, undefined, undefined, args, undefined);
      };

      function namedGetter(obj) {
          return obj[this];
      }
      function indexedGetter(obj) {
          var index = +this;
          if (index < 0) index = Math.max(0, index + obj.length);
          return obj[index];
      }
      Promise.prototype.get = function (propertyName) {
          var isIndex = typeof propertyName === "number";
          var getter;
          if (!isIndex) {
              if (canEvaluate) {
                  var maybeGetter = getGetter(propertyName);
                  getter = maybeGetter !== null ? maybeGetter : namedGetter;
              } else {
                  getter = namedGetter;
              }
          } else {
              getter = indexedGetter;
          }
          return this._then(getter, undefined, undefined, propertyName, undefined);
      };
  };

  var using = function using(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug) {
      var util$$1 = util;
      var TypeError = errors.TypeError;
      var inherits$$1 = util.inherits;
      var errorObj = util$$1.errorObj;
      var tryCatch = util$$1.tryCatch;
      var NULL = {};

      function thrower(e) {
          setTimeout(function () {
              throw e;
          }, 0);
      }

      function castPreservingDisposable(thenable) {
          var maybePromise = tryConvertToPromise(thenable);
          if (maybePromise !== thenable && typeof thenable._isDisposable === "function" && typeof thenable._getDisposer === "function" && thenable._isDisposable()) {
              maybePromise._setDisposable(thenable._getDisposer());
          }
          return maybePromise;
      }
      function dispose(resources, inspection) {
          var i = 0;
          var len = resources.length;
          var ret = new Promise(INTERNAL);
          function iterator() {
              if (i >= len) return ret._fulfill();
              var maybePromise = castPreservingDisposable(resources[i++]);
              if (maybePromise instanceof Promise && maybePromise._isDisposable()) {
                  try {
                      maybePromise = tryConvertToPromise(maybePromise._getDisposer().tryDispose(inspection), resources.promise);
                  } catch (e) {
                      return thrower(e);
                  }
                  if (maybePromise instanceof Promise) {
                      return maybePromise._then(iterator, thrower, null, null, null);
                  }
              }
              iterator();
          }
          iterator();
          return ret;
      }

      function Disposer(data, promise, context) {
          this._data = data;
          this._promise = promise;
          this._context = context;
      }

      Disposer.prototype.data = function () {
          return this._data;
      };

      Disposer.prototype.promise = function () {
          return this._promise;
      };

      Disposer.prototype.resource = function () {
          if (this.promise().isFulfilled()) {
              return this.promise().value();
          }
          return NULL;
      };

      Disposer.prototype.tryDispose = function (inspection) {
          var resource = this.resource();
          var context = this._context;
          if (context !== undefined) context._pushContext();
          var ret = resource !== NULL ? this.doDispose(resource, inspection) : null;
          if (context !== undefined) context._popContext();
          this._promise._unsetDisposable();
          this._data = null;
          return ret;
      };

      Disposer.isDisposer = function (d) {
          return d != null && typeof d.resource === "function" && typeof d.tryDispose === "function";
      };

      function FunctionDisposer(fn, promise, context) {
          this.constructor$(fn, promise, context);
      }
      inherits$$1(FunctionDisposer, Disposer);

      FunctionDisposer.prototype.doDispose = function (resource, inspection) {
          var fn = this.data();
          return fn.call(resource, resource, inspection);
      };

      function maybeUnwrapDisposer(value) {
          if (Disposer.isDisposer(value)) {
              this.resources[this.index]._setDisposable(value);
              return value.promise();
          }
          return value;
      }

      function ResourceList(length) {
          this.length = length;
          this.promise = null;
          this[length - 1] = null;
      }

      ResourceList.prototype._resultCancelled = function () {
          var len = this.length;
          for (var i = 0; i < len; ++i) {
              var item = this[i];
              if (item instanceof Promise) {
                  item.cancel();
              }
          }
      };

      Promise.using = function () {
          var len = arguments.length;
          if (len < 2) return apiRejection("you must pass at least 2 arguments to Promise.using");
          var fn = arguments[len - 1];
          if (typeof fn !== "function") {
              return apiRejection("expecting a function but got " + util$$1.classString(fn));
          }
          var input;
          var spreadArgs = true;
          if (len === 2 && Array.isArray(arguments[0])) {
              input = arguments[0];
              len = input.length;
              spreadArgs = false;
          } else {
              input = arguments;
              len--;
          }
          var resources = new ResourceList(len);
          for (var i = 0; i < len; ++i) {
              var resource = input[i];
              if (Disposer.isDisposer(resource)) {
                  var disposer = resource;
                  resource = resource.promise();
                  resource._setDisposable(disposer);
              } else {
                  var maybePromise = tryConvertToPromise(resource);
                  if (maybePromise instanceof Promise) {
                      resource = maybePromise._then(maybeUnwrapDisposer, null, null, {
                          resources: resources,
                          index: i
                      }, undefined);
                  }
              }
              resources[i] = resource;
          }

          var reflectedResources = new Array(resources.length);
          for (var i = 0; i < reflectedResources.length; ++i) {
              reflectedResources[i] = Promise.resolve(resources[i]).reflect();
          }

          var resultPromise = Promise.all(reflectedResources).then(function (inspections) {
              for (var i = 0; i < inspections.length; ++i) {
                  var inspection = inspections[i];
                  if (inspection.isRejected()) {
                      errorObj.e = inspection.error();
                      return errorObj;
                  } else if (!inspection.isFulfilled()) {
                      resultPromise.cancel();
                      return;
                  }
                  inspections[i] = inspection.value();
              }
              promise._pushContext();

              fn = tryCatch(fn);
              var ret = spreadArgs ? fn.apply(undefined, inspections) : fn(inspections);
              var promiseCreated = promise._popContext();
              debug.checkForgottenReturns(ret, promiseCreated, "Promise.using", promise);
              return ret;
          });

          var promise = resultPromise.lastly(function () {
              var inspection = new Promise.PromiseInspection(resultPromise);
              return dispose(resources, inspection);
          });
          resources.promise = promise;
          promise._setOnCancel(resources);
          return promise;
      };

      Promise.prototype._setDisposable = function (disposer) {
          this._bitField = this._bitField | 131072;
          this._disposer = disposer;
      };

      Promise.prototype._isDisposable = function () {
          return (this._bitField & 131072) > 0;
      };

      Promise.prototype._getDisposer = function () {
          return this._disposer;
      };

      Promise.prototype._unsetDisposable = function () {
          this._bitField = this._bitField & ~131072;
          this._disposer = undefined;
      };

      Promise.prototype.disposer = function (fn) {
          if (typeof fn === "function") {
              return new FunctionDisposer(fn, this, createContext());
          }
          throw new TypeError();
      };
  };

  var timers = function timers(Promise, INTERNAL, debug) {
      var util$$1 = util;
      var TimeoutError = Promise.TimeoutError;

      function HandleWrapper(handle) {
          this.handle = handle;
      }

      HandleWrapper.prototype._resultCancelled = function () {
          clearTimeout(this.handle);
      };

      var afterValue = function afterValue(value) {
          return delay(+this).thenReturn(value);
      };
      var delay = Promise.delay = function (ms, value) {
          var ret;
          var handle;
          if (value !== undefined) {
              ret = Promise.resolve(value)._then(afterValue, null, null, ms, undefined);
              if (debug.cancellation() && value instanceof Promise) {
                  ret._setOnCancel(value);
              }
          } else {
              ret = new Promise(INTERNAL);
              handle = setTimeout(function () {
                  ret._fulfill();
              }, +ms);
              if (debug.cancellation()) {
                  ret._setOnCancel(new HandleWrapper(handle));
              }
              ret._captureStackTrace();
          }
          ret._setAsyncGuaranteed();
          return ret;
      };

      Promise.prototype.delay = function (ms) {
          return delay(ms, this);
      };

      var afterTimeout = function afterTimeout(promise, message, parent) {
          var err;
          if (typeof message !== "string") {
              if (message instanceof Error) {
                  err = message;
              } else {
                  err = new TimeoutError("operation timed out");
              }
          } else {
              err = new TimeoutError(message);
          }
          util$$1.markAsOriginatingFromRejection(err);
          promise._attachExtraTrace(err);
          promise._reject(err);

          if (parent != null) {
              parent.cancel();
          }
      };

      function successClear(value) {
          clearTimeout(this.handle);
          return value;
      }

      function failureClear(reason) {
          clearTimeout(this.handle);
          throw reason;
      }

      Promise.prototype.timeout = function (ms, message) {
          ms = +ms;
          var ret, parent;

          var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
              if (ret.isPending()) {
                  afterTimeout(ret, message, parent);
              }
          }, ms));

          if (debug.cancellation()) {
              parent = this.then();
              ret = parent._then(successClear, failureClear, undefined, handleWrapper, undefined);
              ret._setOnCancel(handleWrapper);
          } else {
              ret = this._then(successClear, failureClear, undefined, handleWrapper, undefined);
          }

          return ret;
      };
  };

  var generators = function generators(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug) {
      var errors$$1 = errors;
      var TypeError = errors$$1.TypeError;
      var util$$1 = util;
      var errorObj = util$$1.errorObj;
      var tryCatch = util$$1.tryCatch;
      var yieldHandlers = [];

      function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
          for (var i = 0; i < yieldHandlers.length; ++i) {
              traceParent._pushContext();
              var result = tryCatch(yieldHandlers[i])(value);
              traceParent._popContext();
              if (result === errorObj) {
                  traceParent._pushContext();
                  var ret = Promise.reject(errorObj.e);
                  traceParent._popContext();
                  return ret;
              }
              var maybePromise = tryConvertToPromise(result, traceParent);
              if (maybePromise instanceof Promise) return maybePromise;
          }
          return null;
      }

      function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
          if (debug.cancellation()) {
              var internal = new Promise(INTERNAL);
              var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
              this._promise = internal.lastly(function () {
                  return _finallyPromise;
              });
              internal._captureStackTrace();
              internal._setOnCancel(this);
          } else {
              var promise = this._promise = new Promise(INTERNAL);
              promise._captureStackTrace();
          }
          this._stack = stack;
          this._generatorFunction = generatorFunction;
          this._receiver = receiver;
          this._generator = undefined;
          this._yieldHandlers = typeof yieldHandler === "function" ? [yieldHandler].concat(yieldHandlers) : yieldHandlers;
          this._yieldedPromise = null;
          this._cancellationPhase = false;
      }
      util$$1.inherits(PromiseSpawn, Proxyable);

      PromiseSpawn.prototype._isResolved = function () {
          return this._promise === null;
      };

      PromiseSpawn.prototype._cleanup = function () {
          this._promise = this._generator = null;
          if (debug.cancellation() && this._finallyPromise !== null) {
              this._finallyPromise._fulfill();
              this._finallyPromise = null;
          }
      };

      PromiseSpawn.prototype._promiseCancelled = function () {
          if (this._isResolved()) return;
          var implementsReturn = typeof this._generator["return"] !== "undefined";

          var result;
          if (!implementsReturn) {
              var reason = new Promise.CancellationError("generator .return() sentinel");
              Promise.coroutine.returnSentinel = reason;
              this._promise._attachExtraTrace(reason);
              this._promise._pushContext();
              result = tryCatch(this._generator["throw"]).call(this._generator, reason);
              this._promise._popContext();
          } else {
              this._promise._pushContext();
              result = tryCatch(this._generator["return"]).call(this._generator, undefined);
              this._promise._popContext();
          }
          this._cancellationPhase = true;
          this._yieldedPromise = null;
          this._continue(result);
      };

      PromiseSpawn.prototype._promiseFulfilled = function (value) {
          this._yieldedPromise = null;
          this._promise._pushContext();
          var result = tryCatch(this._generator.next).call(this._generator, value);
          this._promise._popContext();
          this._continue(result);
      };

      PromiseSpawn.prototype._promiseRejected = function (reason) {
          this._yieldedPromise = null;
          this._promise._attachExtraTrace(reason);
          this._promise._pushContext();
          var result = tryCatch(this._generator["throw"]).call(this._generator, reason);
          this._promise._popContext();
          this._continue(result);
      };

      PromiseSpawn.prototype._resultCancelled = function () {
          if (this._yieldedPromise instanceof Promise) {
              var promise = this._yieldedPromise;
              this._yieldedPromise = null;
              promise.cancel();
          }
      };

      PromiseSpawn.prototype.promise = function () {
          return this._promise;
      };

      PromiseSpawn.prototype._run = function () {
          this._generator = this._generatorFunction.call(this._receiver);
          this._receiver = this._generatorFunction = undefined;
          this._promiseFulfilled(undefined);
      };

      PromiseSpawn.prototype._continue = function (result) {
          var promise = this._promise;
          if (result === errorObj) {
              this._cleanup();
              if (this._cancellationPhase) {
                  return promise.cancel();
              } else {
                  return promise._rejectCallback(result.e, false);
              }
          }

          var value = result.value;
          if (result.done === true) {
              this._cleanup();
              if (this._cancellationPhase) {
                  return promise.cancel();
              } else {
                  return promise._resolveCallback(value);
              }
          } else {
              var maybePromise = tryConvertToPromise(value, this._promise);
              if (!(maybePromise instanceof Promise)) {
                  maybePromise = promiseFromYieldHandler(maybePromise, this._yieldHandlers, this._promise);
                  if (maybePromise === null) {
                      this._promiseRejected(new TypeError('A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n'.replace("%s", String(value)) + 'From coroutine:\n' + this._stack.split("\n").slice(1, -7).join("\n")));
                      return;
                  }
              }
              maybePromise = maybePromise._target();
              var bitField = maybePromise._bitField;
              if ((bitField & 50397184) === 0) {
                  this._yieldedPromise = maybePromise;
                  maybePromise._proxy(this, null);
              } else if ((bitField & 33554432) !== 0) {
                  Promise._async.invoke(this._promiseFulfilled, this, maybePromise._value());
              } else if ((bitField & 16777216) !== 0) {
                  Promise._async.invoke(this._promiseRejected, this, maybePromise._reason());
              } else {
                  this._promiseCancelled();
              }
          }
      };

      Promise.coroutine = function (generatorFunction, options) {
          if (typeof generatorFunction !== "function") {
              throw new TypeError('generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n');
          }
          var yieldHandler = Object(options).yieldHandler;
          var PromiseSpawn$ = PromiseSpawn;
          var stack = new Error().stack;
          return function () {
              var generator = generatorFunction.apply(this, arguments);
              var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler, stack);
              var ret = spawn.promise();
              spawn._generator = generator;
              spawn._promiseFulfilled(undefined);
              return ret;
          };
      };

      Promise.coroutine.addYieldHandler = function (fn) {
          if (typeof fn !== "function") {
              throw new TypeError("expecting a function but got " + util$$1.classString(fn));
          }
          yieldHandlers.push(fn);
      };

      Promise.spawn = function (generatorFunction) {
          debug.deprecated("Promise.spawn()", "Promise.coroutine()");
          if (typeof generatorFunction !== "function") {
              return apiRejection('generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n');
          }
          var spawn = new PromiseSpawn(generatorFunction, this);
          var ret = spawn.promise();
          spawn._run(Promise.spawn);
          return ret;
      };
  };

  var nodeify = function nodeify(Promise) {
      var util$$1 = util;
      var async = Promise._async;
      var tryCatch = util$$1.tryCatch;
      var errorObj = util$$1.errorObj;

      function spreadAdapter(val, nodeback) {
          var promise = this;
          if (!util$$1.isArray(val)) return successAdapter.call(promise, val, nodeback);
          var ret = tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
          if (ret === errorObj) {
              async.throwLater(ret.e);
          }
      }

      function successAdapter(val, nodeback) {
          var promise = this;
          var receiver = promise._boundValue();
          var ret = val === undefined ? tryCatch(nodeback).call(receiver, null) : tryCatch(nodeback).call(receiver, null, val);
          if (ret === errorObj) {
              async.throwLater(ret.e);
          }
      }
      function errorAdapter(reason, nodeback) {
          var promise = this;
          if (!reason) {
              var newReason = new Error(reason + "");
              newReason.cause = reason;
              reason = newReason;
          }
          var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
          if (ret === errorObj) {
              async.throwLater(ret.e);
          }
      }

      Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback, options) {
          if (typeof nodeback == "function") {
              var adapter = successAdapter;
              if (options !== undefined && Object(options).spread) {
                  adapter = spreadAdapter;
              }
              this._then(adapter, errorAdapter, undefined, this, nodeback);
          }
          return this;
      };
  };

  var promisify = function promisify(Promise, INTERNAL) {
      var THIS = {};
      var util$$1 = util;
      var nodebackForPromise = nodeback;
      var withAppended = util$$1.withAppended;
      var maybeWrapAsError = util$$1.maybeWrapAsError;
      var canEvaluate = util$$1.canEvaluate;
      var TypeError = errors.TypeError;
      var defaultSuffix = "Async";
      var defaultPromisified = { __isPromisified__: true };
      var noCopyProps = ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"];
      var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

      var defaultFilter = function defaultFilter(name) {
          return util$$1.isIdentifier(name) && name.charAt(0) !== "_" && name !== "constructor";
      };

      function propsFilter(key) {
          return !noCopyPropsPattern.test(key);
      }

      function isPromisified(fn) {
          try {
              return fn.__isPromisified__ === true;
          } catch (e) {
              return false;
          }
      }

      function hasPromisified(obj, key, suffix) {
          var val = util$$1.getDataPropertyOrDefault(obj, key + suffix, defaultPromisified);
          return val ? isPromisified(val) : false;
      }
      function checkValid(ret, suffix, suffixRegexp) {
          for (var i = 0; i < ret.length; i += 2) {
              var key = ret[i];
              if (suffixRegexp.test(key)) {
                  var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
                  for (var j = 0; j < ret.length; j += 2) {
                      if (ret[j] === keyWithoutAsyncSuffix) {
                          throw new TypeError('Cannot promisify an API that has normal methods with \'%s\'-suffix\n\n    See http://goo.gl/MqrFmX\n'.replace("%s", suffix));
                      }
                  }
              }
          }
      }

      function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
          var keys = util$$1.inheritedDataKeys(obj);
          var ret = [];
          for (var i = 0; i < keys.length; ++i) {
              var key = keys[i];
              var value = obj[key];
              var passesDefaultFilter = filter === defaultFilter ? true : defaultFilter(key, value, obj);
              if (typeof value === "function" && !isPromisified(value) && !hasPromisified(obj, key, suffix) && filter(key, value, obj, passesDefaultFilter)) {
                  ret.push(key, value);
              }
          }
          checkValid(ret, suffix, suffixRegexp);
          return ret;
      }

      var escapeIdentRegex = function escapeIdentRegex(str) {
          return str.replace(/([$])/, "\\$");
      };

      var makeNodePromisifiedEval;
      {
          var switchCaseArgumentOrder = function switchCaseArgumentOrder(likelyArgumentCount) {
              var ret = [likelyArgumentCount];
              var min = Math.max(0, likelyArgumentCount - 1 - 3);
              for (var i = likelyArgumentCount - 1; i >= min; --i) {
                  ret.push(i);
              }
              for (var i = likelyArgumentCount + 1; i <= 3; ++i) {
                  ret.push(i);
              }
              return ret;
          };

          var argumentSequence = function argumentSequence(argumentCount) {
              return util$$1.filledRange(argumentCount, "_arg", "");
          };

          var parameterDeclaration = function parameterDeclaration(parameterCount) {
              return util$$1.filledRange(Math.max(parameterCount, 3), "_arg", "");
          };

          var parameterCount = function parameterCount(fn) {
              if (typeof fn.length === "number") {
                  return Math.max(Math.min(fn.length, 1023 + 1), 0);
              }
              return 0;
          };

          makeNodePromisifiedEval = function makeNodePromisifiedEval(callback, receiver, originalName, fn, _, multiArgs) {
              var newParameterCount = Math.max(0, parameterCount(fn) - 1);
              var argumentOrder = switchCaseArgumentOrder(newParameterCount);
              var shouldProxyThis = typeof callback === "string" || receiver === THIS;

              function generateCallForArgumentCount(count) {
                  var args = argumentSequence(count).join(", ");
                  var comma = count > 0 ? ", " : "";
                  var ret;
                  if (shouldProxyThis) {
                      ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
                  } else {
                      ret = receiver === undefined ? "ret = callback({{args}}, nodeback); break;\n" : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
                  }
                  return ret.replace("{{args}}", args).replace(", ", comma);
              }

              function generateArgumentSwitchCase() {
                  var ret = "";
                  for (var i = 0; i < argumentOrder.length; ++i) {
                      ret += "case " + argumentOrder[i] + ":" + generateCallForArgumentCount(argumentOrder[i]);
                  }

                  ret += "                                                             \n\
        default:                                                             \n\
            var args = new Array(len + 1);                                   \n\
            var i = 0;                                                       \n\
            for (var i = 0; i < len; ++i) {                                  \n\
               args[i] = arguments[i];                                       \n\
            }                                                                \n\
            args[i] = nodeback;                                              \n\
            [CodeForCall]                                                    \n\
            break;                                                           \n\
        ".replace("[CodeForCall]", shouldProxyThis ? "ret = callback.apply(this, args);\n" : "ret = callback.apply(receiver, args);\n");
                  return ret;
              }

              var getFunctionCode = typeof callback === "string" ? "this != null ? this['" + callback + "'] : fn" : "fn";
              var body = "'use strict';                                                \n\
        var ret = function (Parameters) {                                    \n\
            'use strict';                                                    \n\
            var len = arguments.length;                                      \n\
            var promise = new Promise(INTERNAL);                             \n\
            promise._captureStackTrace();                                    \n\
            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
            var ret;                                                         \n\
            var callback = tryCatch([GetFunctionCode]);                      \n\
            switch(len) {                                                    \n\
                [CodeForSwitchCase]                                          \n\
            }                                                                \n\
            if (ret === errorObj) {                                          \n\
                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
            }                                                                \n\
            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
            return promise;                                                  \n\
        };                                                                   \n\
        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
        return ret;                                                          \n\
    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase()).replace("[GetFunctionCode]", getFunctionCode);
              body = body.replace("Parameters", parameterDeclaration(newParameterCount));
              return new Function("Promise", "fn", "receiver", "withAppended", "maybeWrapAsError", "nodebackForPromise", "tryCatch", "errorObj", "notEnumerableProp", "INTERNAL", body)(Promise, fn, receiver, withAppended, maybeWrapAsError, nodebackForPromise, util$$1.tryCatch, util$$1.errorObj, util$$1.notEnumerableProp, INTERNAL);
          };
      }

      function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
          var defaultThis = function () {
              return this;
          }();
          var method = callback;
          if (typeof method === "string") {
              callback = fn;
          }
          function promisified() {
              var _receiver = receiver;
              if (receiver === THIS) _receiver = this;
              var promise = new Promise(INTERNAL);
              promise._captureStackTrace();
              var cb = typeof method === "string" && this !== defaultThis ? this[method] : callback;
              var fn = nodebackForPromise(promise, multiArgs);
              try {
                  cb.apply(_receiver, withAppended(arguments, fn));
              } catch (e) {
                  promise._rejectCallback(maybeWrapAsError(e), true, true);
              }
              if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
              return promise;
          }
          util$$1.notEnumerableProp(promisified, "__isPromisified__", true);
          return promisified;
      }

      var makeNodePromisified = canEvaluate ? makeNodePromisifiedEval : makeNodePromisifiedClosure;

      function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
          var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
          var methods = promisifiableMethods(obj, suffix, suffixRegexp, filter);

          for (var i = 0, len = methods.length; i < len; i += 2) {
              var key = methods[i];
              var fn = methods[i + 1];
              var promisifiedKey = key + suffix;
              if (promisifier === makeNodePromisified) {
                  obj[promisifiedKey] = makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
              } else {
                  var promisified = promisifier(fn, function () {
                      return makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
                  });
                  util$$1.notEnumerableProp(promisified, "__isPromisified__", true);
                  obj[promisifiedKey] = promisified;
              }
          }
          util$$1.toFastProperties(obj);
          return obj;
      }

      function promisify(callback, receiver, multiArgs) {
          return makeNodePromisified(callback, receiver, undefined, callback, null, multiArgs);
      }

      Promise.promisify = function (fn, options) {
          if (typeof fn !== "function") {
              throw new TypeError("expecting a function but got " + util$$1.classString(fn));
          }
          if (isPromisified(fn)) {
              return fn;
          }
          options = Object(options);
          var receiver = options.context === undefined ? THIS : options.context;
          var multiArgs = !!options.multiArgs;
          var ret = promisify(fn, receiver, multiArgs);
          util$$1.copyDescriptors(fn, ret, propsFilter);
          return ret;
      };

      Promise.promisifyAll = function (target, options) {
          if (typeof target !== "function" && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== "object") {
              throw new TypeError('the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n');
          }
          options = Object(options);
          var multiArgs = !!options.multiArgs;
          var suffix = options.suffix;
          if (typeof suffix !== "string") suffix = defaultSuffix;
          var filter = options.filter;
          if (typeof filter !== "function") filter = defaultFilter;
          var promisifier = options.promisifier;
          if (typeof promisifier !== "function") promisifier = makeNodePromisified;

          if (!util$$1.isIdentifier(suffix)) {
              throw new RangeError('suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n');
          }

          var keys = util$$1.inheritedDataKeys(target);
          for (var i = 0; i < keys.length; ++i) {
              var value = target[keys[i]];
              if (keys[i] !== "constructor" && util$$1.isClass(value)) {
                  promisifyAll(value.prototype, suffix, filter, promisifier, multiArgs);
                  promisifyAll(value, suffix, filter, promisifier, multiArgs);
              }
          }

          return promisifyAll(target, suffix, filter, promisifier, multiArgs);
      };
  };

  var props = function props(Promise, PromiseArray, tryConvertToPromise, apiRejection) {
      var util$$1 = util;
      var isObject = util$$1.isObject;
      var es5$$1 = es5;
      var Es6Map;
      if (typeof Map === "function") Es6Map = Map;

      var mapToEntries = function () {
          var index = 0;
          var size = 0;

          function extractEntry(value, key) {
              this[index] = value;
              this[index + size] = key;
              index++;
          }

          return function mapToEntries(map) {
              size = map.size;
              index = 0;
              var ret = new Array(map.size * 2);
              map.forEach(extractEntry, ret);
              return ret;
          };
      }();

      var entriesToMap = function entriesToMap(entries) {
          var ret = new Es6Map();
          var length = entries.length / 2 | 0;
          for (var i = 0; i < length; ++i) {
              var key = entries[length + i];
              var value = entries[i];
              ret.set(key, value);
          }
          return ret;
      };

      function PropertiesPromiseArray(obj) {
          var isMap = false;
          var entries;
          if (Es6Map !== undefined && obj instanceof Es6Map) {
              entries = mapToEntries(obj);
              isMap = true;
          } else {
              var keys = es5$$1.keys(obj);
              var len = keys.length;
              entries = new Array(len * 2);
              for (var i = 0; i < len; ++i) {
                  var key = keys[i];
                  entries[i] = obj[key];
                  entries[i + len] = key;
              }
          }
          this.constructor$(entries);
          this._isMap = isMap;
          this._init$(undefined, isMap ? -6 : -3);
      }
      util$$1.inherits(PropertiesPromiseArray, PromiseArray);

      PropertiesPromiseArray.prototype._init = function () {};

      PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
          this._values[index] = value;
          var totalResolved = ++this._totalResolved;
          if (totalResolved >= this._length) {
              var val;
              if (this._isMap) {
                  val = entriesToMap(this._values);
              } else {
                  val = {};
                  var keyOffset = this.length();
                  for (var i = 0, len = this.length(); i < len; ++i) {
                      val[this._values[i + keyOffset]] = this._values[i];
                  }
              }
              this._resolve(val);
              return true;
          }
          return false;
      };

      PropertiesPromiseArray.prototype.shouldCopyValues = function () {
          return false;
      };

      PropertiesPromiseArray.prototype.getActualLength = function (len) {
          return len >> 1;
      };

      function props(promises) {
          var ret;
          var castValue = tryConvertToPromise(promises);

          if (!isObject(castValue)) {
              return apiRejection('cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n');
          } else if (castValue instanceof Promise) {
              ret = castValue._then(Promise.props, undefined, undefined, undefined, undefined);
          } else {
              ret = new PropertiesPromiseArray(castValue).promise();
          }

          if (castValue instanceof Promise) {
              ret._propagateFrom(castValue, 2);
          }
          return ret;
      }

      Promise.prototype.props = function () {
          return props(this);
      };

      Promise.props = function (promises) {
          return props(promises);
      };
  };

  var race = function race(Promise, INTERNAL, tryConvertToPromise, apiRejection) {
      var util$$1 = util;

      var raceLater = function raceLater(promise) {
          return promise.then(function (array) {
              return race(array, promise);
          });
      };

      function race(promises, parent) {
          var maybePromise = tryConvertToPromise(promises);

          if (maybePromise instanceof Promise) {
              return raceLater(maybePromise);
          } else {
              promises = util$$1.asArray(promises);
              if (promises === null) return apiRejection("expecting an array or an iterable object but got " + util$$1.classString(promises));
          }

          var ret = new Promise(INTERNAL);
          if (parent !== undefined) {
              ret._propagateFrom(parent, 3);
          }
          var fulfill = ret._fulfill;
          var reject = ret._reject;
          for (var i = 0, len = promises.length; i < len; ++i) {
              var val = promises[i];

              if (val === undefined && !(i in promises)) {
                  continue;
              }

              Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
          }
          return ret;
      }

      Promise.race = function (promises) {
          return race(promises, undefined);
      };

      Promise.prototype.race = function () {
          return race(this, undefined);
      };
  };

  var reduce = function reduce(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
      var getDomain = Promise._getDomain;
      var util$$1 = util;
      var tryCatch = util$$1.tryCatch;

      function ReductionPromiseArray(promises, fn, initialValue, _each) {
          this.constructor$(promises);
          var domain = getDomain();
          this._fn = domain === null ? fn : util$$1.domainBind(domain, fn);
          if (initialValue !== undefined) {
              initialValue = Promise.resolve(initialValue);
              initialValue._attachCancellationCallback(this);
          }
          this._initialValue = initialValue;
          this._currentCancellable = null;
          if (_each === INTERNAL) {
              this._eachValues = Array(this._length);
          } else if (_each === 0) {
              this._eachValues = null;
          } else {
              this._eachValues = undefined;
          }
          this._promise._captureStackTrace();
          this._init$(undefined, -5);
      }
      util$$1.inherits(ReductionPromiseArray, PromiseArray);

      ReductionPromiseArray.prototype._gotAccum = function (accum) {
          if (this._eachValues !== undefined && this._eachValues !== null && accum !== INTERNAL) {
              this._eachValues.push(accum);
          }
      };

      ReductionPromiseArray.prototype._eachComplete = function (value) {
          if (this._eachValues !== null) {
              this._eachValues.push(value);
          }
          return this._eachValues;
      };

      ReductionPromiseArray.prototype._init = function () {};

      ReductionPromiseArray.prototype._resolveEmptyArray = function () {
          this._resolve(this._eachValues !== undefined ? this._eachValues : this._initialValue);
      };

      ReductionPromiseArray.prototype.shouldCopyValues = function () {
          return false;
      };

      ReductionPromiseArray.prototype._resolve = function (value) {
          this._promise._resolveCallback(value);
          this._values = null;
      };

      ReductionPromiseArray.prototype._resultCancelled = function (sender) {
          if (sender === this._initialValue) return this._cancel();
          if (this._isResolved()) return;
          this._resultCancelled$();
          if (this._currentCancellable instanceof Promise) {
              this._currentCancellable.cancel();
          }
          if (this._initialValue instanceof Promise) {
              this._initialValue.cancel();
          }
      };

      ReductionPromiseArray.prototype._iterate = function (values) {
          this._values = values;
          var value;
          var i;
          var length = values.length;
          if (this._initialValue !== undefined) {
              value = this._initialValue;
              i = 0;
          } else {
              value = Promise.resolve(values[0]);
              i = 1;
          }

          this._currentCancellable = value;

          if (!value.isRejected()) {
              for (; i < length; ++i) {
                  var ctx = {
                      accum: null,
                      value: values[i],
                      index: i,
                      length: length,
                      array: this
                  };
                  value = value._then(gotAccum, undefined, undefined, ctx, undefined);
              }
          }

          if (this._eachValues !== undefined) {
              value = value._then(this._eachComplete, undefined, undefined, this, undefined);
          }
          value._then(completed, completed, undefined, value, this);
      };

      Promise.prototype.reduce = function (fn, initialValue) {
          return reduce(this, fn, initialValue, null);
      };

      Promise.reduce = function (promises, fn, initialValue, _each) {
          return reduce(promises, fn, initialValue, _each);
      };

      function completed(valueOrReason, array) {
          if (this.isFulfilled()) {
              array._resolve(valueOrReason);
          } else {
              array._reject(valueOrReason);
          }
      }

      function reduce(promises, fn, initialValue, _each) {
          if (typeof fn !== "function") {
              return apiRejection("expecting a function but got " + util$$1.classString(fn));
          }
          var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
          return array.promise();
      }

      function gotAccum(accum) {
          this.accum = accum;
          this.array._gotAccum(accum);
          var value = tryConvertToPromise(this.value, this.array._promise);
          if (value instanceof Promise) {
              this.array._currentCancellable = value;
              return value._then(gotValue, undefined, undefined, this, undefined);
          } else {
              return gotValue.call(this, value);
          }
      }

      function gotValue(value) {
          var array = this.array;
          var promise = array._promise;
          var fn = tryCatch(array._fn);
          promise._pushContext();
          var ret;
          if (array._eachValues !== undefined) {
              ret = fn.call(promise._boundValue(), value, this.index, this.length);
          } else {
              ret = fn.call(promise._boundValue(), this.accum, value, this.index, this.length);
          }
          if (ret instanceof Promise) {
              array._currentCancellable = ret;
          }
          var promiseCreated = promise._popContext();
          debug.checkForgottenReturns(ret, promiseCreated, array._eachValues !== undefined ? "Promise.each" : "Promise.reduce", promise);
          return ret;
      }
  };

  var settle = function settle(Promise, PromiseArray, debug) {
      var PromiseInspection = Promise.PromiseInspection;
      var util$$1 = util;

      function SettledPromiseArray(values) {
          this.constructor$(values);
      }
      util$$1.inherits(SettledPromiseArray, PromiseArray);

      SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
          this._values[index] = inspection;
          var totalResolved = ++this._totalResolved;
          if (totalResolved >= this._length) {
              this._resolve(this._values);
              return true;
          }
          return false;
      };

      SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
          var ret = new PromiseInspection();
          ret._bitField = 33554432;
          ret._settledValueField = value;
          return this._promiseResolved(index, ret);
      };
      SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
          var ret = new PromiseInspection();
          ret._bitField = 16777216;
          ret._settledValueField = reason;
          return this._promiseResolved(index, ret);
      };

      Promise.settle = function (promises) {
          debug.deprecated(".settle()", ".reflect()");
          return new SettledPromiseArray(promises).promise();
      };

      Promise.prototype.settle = function () {
          return Promise.settle(this);
      };
  };

  var some = function some(Promise, PromiseArray, apiRejection) {
      var util$$1 = util;
      var RangeError = errors.RangeError;
      var AggregateError = errors.AggregateError;
      var isArray = util$$1.isArray;
      var CANCELLATION = {};

      function SomePromiseArray(values) {
          this.constructor$(values);
          this._howMany = 0;
          this._unwrap = false;
          this._initialized = false;
      }
      util$$1.inherits(SomePromiseArray, PromiseArray);

      SomePromiseArray.prototype._init = function () {
          if (!this._initialized) {
              return;
          }
          if (this._howMany === 0) {
              this._resolve([]);
              return;
          }
          this._init$(undefined, -5);
          var isArrayResolved = isArray(this._values);
          if (!this._isResolved() && isArrayResolved && this._howMany > this._canPossiblyFulfill()) {
              this._reject(this._getRangeError(this.length()));
          }
      };

      SomePromiseArray.prototype.init = function () {
          this._initialized = true;
          this._init();
      };

      SomePromiseArray.prototype.setUnwrap = function () {
          this._unwrap = true;
      };

      SomePromiseArray.prototype.howMany = function () {
          return this._howMany;
      };

      SomePromiseArray.prototype.setHowMany = function (count) {
          this._howMany = count;
      };

      SomePromiseArray.prototype._promiseFulfilled = function (value) {
          this._addFulfilled(value);
          if (this._fulfilled() === this.howMany()) {
              this._values.length = this.howMany();
              if (this.howMany() === 1 && this._unwrap) {
                  this._resolve(this._values[0]);
              } else {
                  this._resolve(this._values);
              }
              return true;
          }
          return false;
      };
      SomePromiseArray.prototype._promiseRejected = function (reason) {
          this._addRejected(reason);
          return this._checkOutcome();
      };

      SomePromiseArray.prototype._promiseCancelled = function () {
          if (this._values instanceof Promise || this._values == null) {
              return this._cancel();
          }
          this._addRejected(CANCELLATION);
          return this._checkOutcome();
      };

      SomePromiseArray.prototype._checkOutcome = function () {
          if (this.howMany() > this._canPossiblyFulfill()) {
              var e = new AggregateError();
              for (var i = this.length(); i < this._values.length; ++i) {
                  if (this._values[i] !== CANCELLATION) {
                      e.push(this._values[i]);
                  }
              }
              if (e.length > 0) {
                  this._reject(e);
              } else {
                  this._cancel();
              }
              return true;
          }
          return false;
      };

      SomePromiseArray.prototype._fulfilled = function () {
          return this._totalResolved;
      };

      SomePromiseArray.prototype._rejected = function () {
          return this._values.length - this.length();
      };

      SomePromiseArray.prototype._addRejected = function (reason) {
          this._values.push(reason);
      };

      SomePromiseArray.prototype._addFulfilled = function (value) {
          this._values[this._totalResolved++] = value;
      };

      SomePromiseArray.prototype._canPossiblyFulfill = function () {
          return this.length() - this._rejected();
      };

      SomePromiseArray.prototype._getRangeError = function (count) {
          var message = "Input array must contain at least " + this._howMany + " items but contains only " + count + " items";
          return new RangeError(message);
      };

      SomePromiseArray.prototype._resolveEmptyArray = function () {
          this._reject(this._getRangeError(0));
      };

      function some(promises, howMany) {
          if ((howMany | 0) !== howMany || howMany < 0) {
              return apiRejection('expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n');
          }
          var ret = new SomePromiseArray(promises);
          var promise = ret.promise();
          ret.setHowMany(howMany);
          ret.init();
          return promise;
      }

      Promise.some = function (promises, howMany) {
          return some(promises, howMany);
      };

      Promise.prototype.some = function (howMany) {
          return some(this, howMany);
      };

      Promise._SomePromiseArray = SomePromiseArray;
  };

  var filter = function filter(Promise, INTERNAL) {
      var PromiseMap = Promise.map;

      Promise.prototype.filter = function (fn, options) {
          return PromiseMap(this, fn, options, INTERNAL);
      };

      Promise.filter = function (promises, fn, options) {
          return PromiseMap(promises, fn, options, INTERNAL);
      };
  };

  var each = function each(Promise, INTERNAL) {
      var PromiseReduce = Promise.reduce;
      var PromiseAll = Promise.all;

      function promiseAllThis() {
          return PromiseAll(this);
      }

      function PromiseMapSeries(promises, fn) {
          return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
      }

      Promise.prototype.each = function (fn) {
          return PromiseReduce(this, fn, INTERNAL, 0)._then(promiseAllThis, undefined, undefined, this, undefined);
      };

      Promise.prototype.mapSeries = function (fn) {
          return PromiseReduce(this, fn, INTERNAL, INTERNAL);
      };

      Promise.each = function (promises, fn) {
          return PromiseReduce(promises, fn, INTERNAL, 0)._then(promiseAllThis, undefined, undefined, promises, undefined);
      };

      Promise.mapSeries = PromiseMapSeries;
  };

  var any = function any(Promise) {
      var SomePromiseArray = Promise._SomePromiseArray;
      function any(promises) {
          var ret = new SomePromiseArray(promises);
          var promise = ret.promise();
          ret.setHowMany(1);
          ret.setUnwrap();
          ret.init();
          return promise;
      }

      Promise.any = function (promises) {
          return any(promises);
      };

      Promise.prototype.any = function () {
          return any(this);
      };
  };

  var promise = createCommonjsModule(function (module) {
      module.exports = function () {
          var makeSelfResolutionError = function makeSelfResolutionError() {
              return new TypeError('circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n');
          };
          var reflectHandler = function reflectHandler() {
              return new Promise.PromiseInspection(this._target());
          };
          var apiRejection = function apiRejection(msg) {
              return Promise.reject(new TypeError(msg));
          };
          function Proxyable() {}
          var UNDEFINED_BINDING = {};
          var util$$1 = util;

          var getDomain;
          if (util$$1.isNode) {
              getDomain = function getDomain() {
                  var ret = process.domain;
                  if (ret === undefined) ret = null;
                  return ret;
              };
          } else {
              getDomain = function getDomain() {
                  return null;
              };
          }
          util$$1.notEnumerableProp(Promise, "_getDomain", getDomain);

          var es5$$1 = es5;
          var Async = async;
          var async$$1 = new Async();
          es5$$1.defineProperty(Promise, "_async", { value: async$$1 });
          var errors$$1 = errors;
          var TypeError = Promise.TypeError = errors$$1.TypeError;
          Promise.RangeError = errors$$1.RangeError;
          var CancellationError = Promise.CancellationError = errors$$1.CancellationError;
          Promise.TimeoutError = errors$$1.TimeoutError;
          Promise.OperationalError = errors$$1.OperationalError;
          Promise.RejectionError = errors$$1.OperationalError;
          Promise.AggregateError = errors$$1.AggregateError;
          var INTERNAL = function INTERNAL() {};
          var APPLY = {};
          var NEXT_FILTER = {};
          var tryConvertToPromise = thenables(Promise, INTERNAL);
          var PromiseArray = promise_array(Promise, INTERNAL, tryConvertToPromise, apiRejection, Proxyable);
          var Context = context(Promise);
          /*jshint unused:false*/
          var createContext = Context.create;
          var debug = debuggability(Promise, Context);
          var PassThroughHandlerContext = _finally(Promise, tryConvertToPromise, NEXT_FILTER);
          var catchFilter = catch_filter(NEXT_FILTER);
          var nodebackForPromise = nodeback;
          var errorObj = util$$1.errorObj;
          var tryCatch = util$$1.tryCatch;
          function check(self, executor) {
              if (self == null || self.constructor !== Promise) {
                  throw new TypeError('the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n');
              }
              if (typeof executor !== "function") {
                  throw new TypeError("expecting a function but got " + util$$1.classString(executor));
              }
          }

          function Promise(executor) {
              if (executor !== INTERNAL) {
                  check(this, executor);
              }
              this._bitField = 0;
              this._fulfillmentHandler0 = undefined;
              this._rejectionHandler0 = undefined;
              this._promise0 = undefined;
              this._receiver0 = undefined;
              this._resolveFromExecutor(executor);
              this._promiseCreated();
              this._fireEvent("promiseCreated", this);
          }

          Promise.prototype.toString = function () {
              return "[object Promise]";
          };

          Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
              var len = arguments.length;
              if (len > 1) {
                  var catchInstances = new Array(len - 1),
                      j = 0,
                      i;
                  for (i = 0; i < len - 1; ++i) {
                      var item = arguments[i];
                      if (util$$1.isObject(item)) {
                          catchInstances[j++] = item;
                      } else {
                          return apiRejection("Catch statement predicate: " + "expecting an object but got " + util$$1.classString(item));
                      }
                  }
                  catchInstances.length = j;
                  fn = arguments[i];
                  return this.then(undefined, catchFilter(catchInstances, fn, this));
              }
              return this.then(undefined, fn);
          };

          Promise.prototype.reflect = function () {
              return this._then(reflectHandler, reflectHandler, undefined, this, undefined);
          };

          Promise.prototype.then = function (didFulfill, didReject) {
              if (debug.warnings() && arguments.length > 0 && typeof didFulfill !== "function" && typeof didReject !== "function") {
                  var msg = ".then() only accepts functions but was passed: " + util$$1.classString(didFulfill);
                  if (arguments.length > 1) {
                      msg += ", " + util$$1.classString(didReject);
                  }
                  this._warn(msg);
              }
              return this._then(didFulfill, didReject, undefined, undefined, undefined);
          };

          Promise.prototype.done = function (didFulfill, didReject) {
              var promise = this._then(didFulfill, didReject, undefined, undefined, undefined);
              promise._setIsFinal();
          };

          Promise.prototype.spread = function (fn) {
              if (typeof fn !== "function") {
                  return apiRejection("expecting a function but got " + util$$1.classString(fn));
              }
              return this.all()._then(fn, undefined, undefined, APPLY, undefined);
          };

          Promise.prototype.toJSON = function () {
              var ret = {
                  isFulfilled: false,
                  isRejected: false,
                  fulfillmentValue: undefined,
                  rejectionReason: undefined
              };
              if (this.isFulfilled()) {
                  ret.fulfillmentValue = this.value();
                  ret.isFulfilled = true;
              } else if (this.isRejected()) {
                  ret.rejectionReason = this.reason();
                  ret.isRejected = true;
              }
              return ret;
          };

          Promise.prototype.all = function () {
              if (arguments.length > 0) {
                  this._warn(".all() was passed arguments but it does not take any");
              }
              return new PromiseArray(this).promise();
          };

          Promise.prototype.error = function (fn) {
              return this.caught(util$$1.originatesFromRejection, fn);
          };

          Promise.getNewLibraryCopy = module.exports;

          Promise.is = function (val) {
              return val instanceof Promise;
          };

          Promise.fromNode = Promise.fromCallback = function (fn) {
              var ret = new Promise(INTERNAL);
              ret._captureStackTrace();
              var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : false;
              var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
              if (result === errorObj) {
                  ret._rejectCallback(result.e, true);
              }
              if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
              return ret;
          };

          Promise.all = function (promises) {
              return new PromiseArray(promises).promise();
          };

          Promise.cast = function (obj) {
              var ret = tryConvertToPromise(obj);
              if (!(ret instanceof Promise)) {
                  ret = new Promise(INTERNAL);
                  ret._captureStackTrace();
                  ret._setFulfilled();
                  ret._rejectionHandler0 = obj;
              }
              return ret;
          };

          Promise.resolve = Promise.fulfilled = Promise.cast;

          Promise.reject = Promise.rejected = function (reason) {
              var ret = new Promise(INTERNAL);
              ret._captureStackTrace();
              ret._rejectCallback(reason, true);
              return ret;
          };

          Promise.setScheduler = function (fn) {
              if (typeof fn !== "function") {
                  throw new TypeError("expecting a function but got " + util$$1.classString(fn));
              }
              return async$$1.setScheduler(fn);
          };

          Promise.prototype._then = function (didFulfill, didReject, _, receiver, internalData) {
              var haveInternalData = internalData !== undefined;
              var promise = haveInternalData ? internalData : new Promise(INTERNAL);
              var target = this._target();
              var bitField = target._bitField;

              if (!haveInternalData) {
                  promise._propagateFrom(this, 3);
                  promise._captureStackTrace();
                  if (receiver === undefined && (this._bitField & 2097152) !== 0) {
                      if (!((bitField & 50397184) === 0)) {
                          receiver = this._boundValue();
                      } else {
                          receiver = target === this ? undefined : this._boundTo;
                      }
                  }
                  this._fireEvent("promiseChained", this, promise);
              }

              var domain = getDomain();
              if (!((bitField & 50397184) === 0)) {
                  var handler,
                      value,
                      settler = target._settlePromiseCtx;
                  if ((bitField & 33554432) !== 0) {
                      value = target._rejectionHandler0;
                      handler = didFulfill;
                  } else if ((bitField & 16777216) !== 0) {
                      value = target._fulfillmentHandler0;
                      handler = didReject;
                      target._unsetRejectionIsUnhandled();
                  } else {
                      settler = target._settlePromiseLateCancellationObserver;
                      value = new CancellationError("late cancellation observer");
                      target._attachExtraTrace(value);
                      handler = didReject;
                  }

                  async$$1.invoke(settler, target, {
                      handler: domain === null ? handler : typeof handler === "function" && util$$1.domainBind(domain, handler),
                      promise: promise,
                      receiver: receiver,
                      value: value
                  });
              } else {
                  target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
              }

              return promise;
          };

          Promise.prototype._length = function () {
              return this._bitField & 65535;
          };

          Promise.prototype._isFateSealed = function () {
              return (this._bitField & 117506048) !== 0;
          };

          Promise.prototype._isFollowing = function () {
              return (this._bitField & 67108864) === 67108864;
          };

          Promise.prototype._setLength = function (len) {
              this._bitField = this._bitField & -65536 | len & 65535;
          };

          Promise.prototype._setFulfilled = function () {
              this._bitField = this._bitField | 33554432;
              this._fireEvent("promiseFulfilled", this);
          };

          Promise.prototype._setRejected = function () {
              this._bitField = this._bitField | 16777216;
              this._fireEvent("promiseRejected", this);
          };

          Promise.prototype._setFollowing = function () {
              this._bitField = this._bitField | 67108864;
              this._fireEvent("promiseResolved", this);
          };

          Promise.prototype._setIsFinal = function () {
              this._bitField = this._bitField | 4194304;
          };

          Promise.prototype._isFinal = function () {
              return (this._bitField & 4194304) > 0;
          };

          Promise.prototype._unsetCancelled = function () {
              this._bitField = this._bitField & ~65536;
          };

          Promise.prototype._setCancelled = function () {
              this._bitField = this._bitField | 65536;
              this._fireEvent("promiseCancelled", this);
          };

          Promise.prototype._setWillBeCancelled = function () {
              this._bitField = this._bitField | 8388608;
          };

          Promise.prototype._setAsyncGuaranteed = function () {
              if (async$$1.hasCustomScheduler()) return;
              this._bitField = this._bitField | 134217728;
          };

          Promise.prototype._receiverAt = function (index) {
              var ret = index === 0 ? this._receiver0 : this[index * 4 - 4 + 3];
              if (ret === UNDEFINED_BINDING) {
                  return undefined;
              } else if (ret === undefined && this._isBound()) {
                  return this._boundValue();
              }
              return ret;
          };

          Promise.prototype._promiseAt = function (index) {
              return this[index * 4 - 4 + 2];
          };

          Promise.prototype._fulfillmentHandlerAt = function (index) {
              return this[index * 4 - 4 + 0];
          };

          Promise.prototype._rejectionHandlerAt = function (index) {
              return this[index * 4 - 4 + 1];
          };

          Promise.prototype._boundValue = function () {};

          Promise.prototype._migrateCallback0 = function (follower) {
              var bitField = follower._bitField;
              var fulfill = follower._fulfillmentHandler0;
              var reject = follower._rejectionHandler0;
              var promise = follower._promise0;
              var receiver = follower._receiverAt(0);
              if (receiver === undefined) receiver = UNDEFINED_BINDING;
              this._addCallbacks(fulfill, reject, promise, receiver, null);
          };

          Promise.prototype._migrateCallbackAt = function (follower, index) {
              var fulfill = follower._fulfillmentHandlerAt(index);
              var reject = follower._rejectionHandlerAt(index);
              var promise = follower._promiseAt(index);
              var receiver = follower._receiverAt(index);
              if (receiver === undefined) receiver = UNDEFINED_BINDING;
              this._addCallbacks(fulfill, reject, promise, receiver, null);
          };

          Promise.prototype._addCallbacks = function (fulfill, reject, promise, receiver, domain) {
              var index = this._length();

              if (index >= 65535 - 4) {
                  index = 0;
                  this._setLength(0);
              }

              if (index === 0) {
                  this._promise0 = promise;
                  this._receiver0 = receiver;
                  if (typeof fulfill === "function") {
                      this._fulfillmentHandler0 = domain === null ? fulfill : util$$1.domainBind(domain, fulfill);
                  }
                  if (typeof reject === "function") {
                      this._rejectionHandler0 = domain === null ? reject : util$$1.domainBind(domain, reject);
                  }
              } else {
                  var base = index * 4 - 4;
                  this[base + 2] = promise;
                  this[base + 3] = receiver;
                  if (typeof fulfill === "function") {
                      this[base + 0] = domain === null ? fulfill : util$$1.domainBind(domain, fulfill);
                  }
                  if (typeof reject === "function") {
                      this[base + 1] = domain === null ? reject : util$$1.domainBind(domain, reject);
                  }
              }
              this._setLength(index + 1);
              return index;
          };

          Promise.prototype._proxy = function (proxyable, arg) {
              this._addCallbacks(undefined, undefined, arg, proxyable, null);
          };

          Promise.prototype._resolveCallback = function (value, shouldBind) {
              if ((this._bitField & 117506048) !== 0) return;
              if (value === this) return this._rejectCallback(makeSelfResolutionError(), false);
              var maybePromise = tryConvertToPromise(value, this);
              if (!(maybePromise instanceof Promise)) return this._fulfill(value);

              if (shouldBind) this._propagateFrom(maybePromise, 2);

              var promise = maybePromise._target();

              if (promise === this) {
                  this._reject(makeSelfResolutionError());
                  return;
              }

              var bitField = promise._bitField;
              if ((bitField & 50397184) === 0) {
                  var len = this._length();
                  if (len > 0) promise._migrateCallback0(this);
                  for (var i = 1; i < len; ++i) {
                      promise._migrateCallbackAt(this, i);
                  }
                  this._setFollowing();
                  this._setLength(0);
                  this._setFollowee(promise);
              } else if ((bitField & 33554432) !== 0) {
                  this._fulfill(promise._value());
              } else if ((bitField & 16777216) !== 0) {
                  this._reject(promise._reason());
              } else {
                  var reason = new CancellationError("late cancellation observer");
                  promise._attachExtraTrace(reason);
                  this._reject(reason);
              }
          };

          Promise.prototype._rejectCallback = function (reason, synchronous, ignoreNonErrorWarnings) {
              var trace = util$$1.ensureErrorObject(reason);
              var hasStack = trace === reason;
              if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
                  var message = "a promise was rejected with a non-error: " + util$$1.classString(reason);
                  this._warn(message, true);
              }
              this._attachExtraTrace(trace, synchronous ? hasStack : false);
              this._reject(reason);
          };

          Promise.prototype._resolveFromExecutor = function (executor) {
              if (executor === INTERNAL) return;
              var promise = this;
              this._captureStackTrace();
              this._pushContext();
              var synchronous = true;
              var r = this._execute(executor, function (value) {
                  promise._resolveCallback(value);
              }, function (reason) {
                  promise._rejectCallback(reason, synchronous);
              });
              synchronous = false;
              this._popContext();

              if (r !== undefined) {
                  promise._rejectCallback(r, true);
              }
          };

          Promise.prototype._settlePromiseFromHandler = function (handler, receiver, value, promise) {
              var bitField = promise._bitField;
              if ((bitField & 65536) !== 0) return;
              promise._pushContext();
              var x;
              if (receiver === APPLY) {
                  if (!value || typeof value.length !== "number") {
                      x = errorObj;
                      x.e = new TypeError("cannot .spread() a non-array: " + util$$1.classString(value));
                  } else {
                      x = tryCatch(handler).apply(this._boundValue(), value);
                  }
              } else {
                  x = tryCatch(handler).call(receiver, value);
              }
              var promiseCreated = promise._popContext();
              bitField = promise._bitField;
              if ((bitField & 65536) !== 0) return;

              if (x === NEXT_FILTER) {
                  promise._reject(value);
              } else if (x === errorObj) {
                  promise._rejectCallback(x.e, false);
              } else {
                  debug.checkForgottenReturns(x, promiseCreated, "", promise, this);
                  promise._resolveCallback(x);
              }
          };

          Promise.prototype._target = function () {
              var ret = this;
              while (ret._isFollowing()) {
                  ret = ret._followee();
              }return ret;
          };

          Promise.prototype._followee = function () {
              return this._rejectionHandler0;
          };

          Promise.prototype._setFollowee = function (promise) {
              this._rejectionHandler0 = promise;
          };

          Promise.prototype._settlePromise = function (promise, handler, receiver, value) {
              var isPromise = promise instanceof Promise;
              var bitField = this._bitField;
              var asyncGuaranteed = (bitField & 134217728) !== 0;
              if ((bitField & 65536) !== 0) {
                  if (isPromise) promise._invokeInternalOnCancel();

                  if (receiver instanceof PassThroughHandlerContext && receiver.isFinallyHandler()) {
                      receiver.cancelPromise = promise;
                      if (tryCatch(handler).call(receiver, value) === errorObj) {
                          promise._reject(errorObj.e);
                      }
                  } else if (handler === reflectHandler) {
                      promise._fulfill(reflectHandler.call(receiver));
                  } else if (receiver instanceof Proxyable) {
                      receiver._promiseCancelled(promise);
                  } else if (isPromise || promise instanceof PromiseArray) {
                      promise._cancel();
                  } else {
                      receiver.cancel();
                  }
              } else if (typeof handler === "function") {
                  if (!isPromise) {
                      handler.call(receiver, value, promise);
                  } else {
                      if (asyncGuaranteed) promise._setAsyncGuaranteed();
                      this._settlePromiseFromHandler(handler, receiver, value, promise);
                  }
              } else if (receiver instanceof Proxyable) {
                  if (!receiver._isResolved()) {
                      if ((bitField & 33554432) !== 0) {
                          receiver._promiseFulfilled(value, promise);
                      } else {
                          receiver._promiseRejected(value, promise);
                      }
                  }
              } else if (isPromise) {
                  if (asyncGuaranteed) promise._setAsyncGuaranteed();
                  if ((bitField & 33554432) !== 0) {
                      promise._fulfill(value);
                  } else {
                      promise._reject(value);
                  }
              }
          };

          Promise.prototype._settlePromiseLateCancellationObserver = function (ctx) {
              var handler = ctx.handler;
              var promise = ctx.promise;
              var receiver = ctx.receiver;
              var value = ctx.value;
              if (typeof handler === "function") {
                  if (!(promise instanceof Promise)) {
                      handler.call(receiver, value, promise);
                  } else {
                      this._settlePromiseFromHandler(handler, receiver, value, promise);
                  }
              } else if (promise instanceof Promise) {
                  promise._reject(value);
              }
          };

          Promise.prototype._settlePromiseCtx = function (ctx) {
              this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
          };

          Promise.prototype._settlePromise0 = function (handler, value, bitField) {
              var promise = this._promise0;
              var receiver = this._receiverAt(0);
              this._promise0 = undefined;
              this._receiver0 = undefined;
              this._settlePromise(promise, handler, receiver, value);
          };

          Promise.prototype._clearCallbackDataAtIndex = function (index) {
              var base = index * 4 - 4;
              this[base + 2] = this[base + 3] = this[base + 0] = this[base + 1] = undefined;
          };

          Promise.prototype._fulfill = function (value) {
              var bitField = this._bitField;
              if ((bitField & 117506048) >>> 16) return;
              if (value === this) {
                  var err = makeSelfResolutionError();
                  this._attachExtraTrace(err);
                  return this._reject(err);
              }
              this._setFulfilled();
              this._rejectionHandler0 = value;

              if ((bitField & 65535) > 0) {
                  if ((bitField & 134217728) !== 0) {
                      this._settlePromises();
                  } else {
                      async$$1.settlePromises(this);
                  }
                  this._dereferenceTrace();
              }
          };

          Promise.prototype._reject = function (reason) {
              var bitField = this._bitField;
              if ((bitField & 117506048) >>> 16) return;
              this._setRejected();
              this._fulfillmentHandler0 = reason;

              if (this._isFinal()) {
                  return async$$1.fatalError(reason, util$$1.isNode);
              }

              if ((bitField & 65535) > 0) {
                  async$$1.settlePromises(this);
              } else {
                  this._ensurePossibleRejectionHandled();
              }
          };

          Promise.prototype._fulfillPromises = function (len, value) {
              for (var i = 1; i < len; i++) {
                  var handler = this._fulfillmentHandlerAt(i);
                  var promise = this._promiseAt(i);
                  var receiver = this._receiverAt(i);
                  this._clearCallbackDataAtIndex(i);
                  this._settlePromise(promise, handler, receiver, value);
              }
          };

          Promise.prototype._rejectPromises = function (len, reason) {
              for (var i = 1; i < len; i++) {
                  var handler = this._rejectionHandlerAt(i);
                  var promise = this._promiseAt(i);
                  var receiver = this._receiverAt(i);
                  this._clearCallbackDataAtIndex(i);
                  this._settlePromise(promise, handler, receiver, reason);
              }
          };

          Promise.prototype._settlePromises = function () {
              var bitField = this._bitField;
              var len = bitField & 65535;

              if (len > 0) {
                  if ((bitField & 16842752) !== 0) {
                      var reason = this._fulfillmentHandler0;
                      this._settlePromise0(this._rejectionHandler0, reason, bitField);
                      this._rejectPromises(len, reason);
                  } else {
                      var value = this._rejectionHandler0;
                      this._settlePromise0(this._fulfillmentHandler0, value, bitField);
                      this._fulfillPromises(len, value);
                  }
                  this._setLength(0);
              }
              this._clearCancellationData();
          };

          Promise.prototype._settledValue = function () {
              var bitField = this._bitField;
              if ((bitField & 33554432) !== 0) {
                  return this._rejectionHandler0;
              } else if ((bitField & 16777216) !== 0) {
                  return this._fulfillmentHandler0;
              }
          };

          function deferResolve(v) {
              this.promise._resolveCallback(v);
          }
          function deferReject(v) {
              this.promise._rejectCallback(v, false);
          }

          Promise.defer = Promise.pending = function () {
              debug.deprecated("Promise.defer", "new Promise");
              var promise = new Promise(INTERNAL);
              return {
                  promise: promise,
                  resolve: deferResolve,
                  reject: deferReject
              };
          };

          util$$1.notEnumerableProp(Promise, "_makeSelfResolutionError", makeSelfResolutionError);

          method(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug);
          bind(Promise, INTERNAL, tryConvertToPromise, debug);
          cancel(Promise, PromiseArray, apiRejection, debug);
          direct_resolve(Promise);
          synchronous_inspection(Promise);
          join(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async$$1, getDomain);
          Promise.Promise = Promise;
          Promise.version = "3.5.3";
          map(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
          call_get(Promise);
          using(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
          timers(Promise, INTERNAL, debug);
          generators(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
          nodeify(Promise);
          promisify(Promise, INTERNAL);
          props(Promise, PromiseArray, tryConvertToPromise, apiRejection);
          race(Promise, INTERNAL, tryConvertToPromise, apiRejection);
          reduce(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
          settle(Promise, PromiseArray, debug);
          some(Promise, PromiseArray, apiRejection);
          filter(Promise, INTERNAL);
          each(Promise, INTERNAL);
          any(Promise);

          util$$1.toFastProperties(Promise);
          util$$1.toFastProperties(Promise.prototype);
          function fillTypes(value) {
              var p = new Promise(INTERNAL);
              p._fulfillmentHandler0 = value;
              p._rejectionHandler0 = value;
              p._promise0 = value;
              p._receiver0 = value;
          }
          // Complete slack tracking, opt out of field-type tracking and           
          // stabilize map                                                         
          fillTypes({ a: 1 });
          fillTypes({ b: 2 });
          fillTypes({ c: 3 });
          fillTypes(1);
          fillTypes(function () {});
          fillTypes(undefined);
          fillTypes(false);
          fillTypes(new Promise(INTERNAL));
          debug.setBounds(Async.firstLineError, util$$1.lastLineError);
          return Promise;
      };
  });

  var old;
  if (typeof Promise !== "undefined") old = Promise;
  function noConflict() {
      try {
          if (Promise === bluebird) Promise = old;
      } catch (e) {}
      return bluebird;
  }
  var bluebird = promise();
  bluebird.noConflict = noConflict;

  /*!
   * PatternFly Elements: PfeNavigation 1.0.0-prerelease.19
   * @license
   * Copyright 2019 Red Hat, Inc.
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

  if (!("path" in Event.prototype)) {
      Object.defineProperty(Event.prototype, "path", {
          get: function get$$1() {
              var path = [];
              var currentElem = this.target;
              while (currentElem) {
                  path.push(currentElem);
                  currentElem = currentElem.parentElement;
              }
              if (path.indexOf(window) === -1 && path.indexOf(document) === -1) path.push(document);
              if (path.indexOf(window) === -1) path.push(window);
              return path;
          }
      });
  }

  var PfeNavigationItem = function (_PFElement) {
      inherits(PfeNavigationItem, _PFElement);
      createClass(PfeNavigationItem, [{
          key: 'open',
          value: function open(event) {
              if (event) event.preventDefault();

              this.dispatchEvent(new CustomEvent(this.tag + ':toggle', {
                  detail: {
                      navigationItem: this,
                      action: "open"
                  },
                  bubbles: true,
                  composed: true
              }));
          }
      }, {
          key: 'close',
          value: function close(event) {
              if (event) event.preventDefault();

              this.dispatchEvent(new CustomEvent(this.tag + ':toggle', {
                  detail: {
                      navigationItem: this,
                      action: "close"
                  },
                  bubbles: true,
                  composed: true
              }));
          }
      }, {
          key: 'toggle',
          value: function toggle(event) {
              if (event) event.preventDefault();

              this.dispatchEvent(new CustomEvent(this.tag + ':toggle', {
                  detail: {
                      navigationItem: this
                  },
                  bubbles: true,
                  composed: true
              }));
          }
      }, {
          key: 'html',
          get: function get$$1() {
              return '<style>:host{height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}::slotted([slot=tray][hidden]),:host([hidden]:not([pfe-icon=menu])){display:none;visibility:hidden}::slotted([slot=trigger]){--pfe-theme--link--text-decoration:none;--pfe-theme--link--text-decoration--hover:none;--pfe-theme--link--text-decoration--focus:none;--pfe-broadcasted--color--text:var(--pfe-navigation--Color, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-navigation--Color, #fff);--pfe-broadcasted--color--ui-link--hover:var(--pfe-navigation--Color, #fff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-navigation--Color, #fff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-navigation--Color, #fff);--pfe-theme--font-size--alpha:var(--pfe-navigation--FontSize, 14px);--pfe-theme--font-weight--alpha:var(--pfe-navigation--FontWeight, 14px);--pfe-theme--font-size--beta:var(--pfe-navigation--FontSize, 14px);--pfe-theme--font-weight--beta:var(--pfe-navigation--FontWeight, 14px);--pfe-theme--font-size--gamma:var(--pfe-navigation--FontSize, 14px);--pfe-theme--font-weight--gamma:var(--pfe-navigation--FontWeight, 14px);font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-theme--font-family, "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif);font-size:14px;font-size:var(--pfe-navigation--FontSize,14px);font-weight:14px;font-weight:var(--pfe-navigation--FontWeight,14px);color:#fff;color:var(--pfe-navigation--Color,#fff);margin:0}@media screen and (max-width:1199px){:host([is_nested]) ::slotted([slot=trigger]){--pfe-navigation--Color:var(--pfe-theme--color--text, #333)}}::slotted([slot=tray]){--pfe-navigation--Color:var(--pfe-theme--color--text, #333);--pfe-navigation--FontWeight:var(--pfe-theme--color--text, #333);-webkit-transition:all cubic-bezier(.465,.183,.153,.946);transition:all cubic-bezier(.465,.183,.153,.946);-webkit-transition:all var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:all var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));-webkit-box-sizing:border-box;box-sizing:border-box}:host([pfe-icon=menu][hidden]) ::slotted([slot=tray]){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;visibility:visible}:host(:not([pfe-icon=menu]):not([is_nested])) ::slotted([slot=tray]),:host([is_nested][parent_hidden]) ::slotted([slot=tray]),:host([pfe-icon=menu]:not([hidden])) ::slotted([slot=tray]){position:absolute;top:100%;left:0;background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);color:var(--pfe-navigation--Color);padding:var(--pfe-navigation__tray--Padding);width:100%;max-height:calc(100vh - 84px);max-height:calc(100vh - var(--pfe-navigation--Height,84px));overflow-x:hidden;overflow-y:scroll}@media screen and (max-width:1199px){:host([is_nested]:not([parent_hidden])) ::slotted([slot=tray]){--pfe-navigation--Padding:calc(var(--pfe-navigation--Padding--vertical) / 2) var(--pfe-navigation--Padding--horizontal);position:relative;display:block;width:100%;padding:calc(var(--pfe-navigation--Padding--vertical)/ 2) var(--pfe-navigation--Padding--horizontal)}}@media screen and (max-width:1199px) and (min-width:576px){:host([is_nested]:not([parent_hidden])) ::slotted([slot=tray]){padding:var(--pfe-navigation--Padding)}}.pfe-navigation-item__trigger{--pfe-navigation--Color:var(--pfe-theme--color--text--on-dark, #fff);border-top:4px solid var(--pfe-navigation--BorderTopColor);border-top:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) var(--pfe-navigation--BorderTopColor);border-right:1px dashed var(--pfe-navigation--BorderColor);border-right:var(--pfe-theme--surface--border-width,1px) dashed var(--pfe-navigation--BorderColor);border-bottom:1px dashed var(--pfe-navigation--BorderColor);border-bottom:var(--pfe-theme--surface--border-width,1px) dashed var(--pfe-navigation--BorderColor);border-left:1px dashed var(--pfe-navigation--BorderColor);border-left:var(--pfe-theme--surface--border-width,1px) dashed var(--pfe-navigation--BorderColor);position:relative;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;--pfe-theme--link--text-decoration:none;--pfe-theme--link--text-decoration--hover:none;--pfe-theme--link--text-decoration--focus:none;text-align:center;white-space:nowrap;margin-bottom:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-transition:all cubic-bezier(.465,.183,.153,.946);transition:all cubic-bezier(.465,.183,.153,.946);-webkit-transition:all var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:all var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));margin:0;outline:0;background-color:var(--pfe-navigation--BackgroundColor);padding:calc(16px / 2) 16px;padding:calc(var(--pfe-theme--container-padding,16px)/ 2) var(--pfe-theme--container-padding,16px)}.pfe-navigation-item__trigger:hover{cursor:pointer}.pfe-navigation-item__trigger :host([aria-current=location]),.pfe-navigation-item__trigger:hover{--pfe-navigation--BorderTopColor:var(--pfe-theme--color--surface--accent, #fe460d)}.pfe-navigation-item__trigger:focus{--pfe-navigation--BorderTopColor:var(--pfe-theme--color--surface--accent, #fe460d);--pfe-navigation--BorderColor:var(--pfe-theme--color--surface--lightest, #fff)}.pfe-navigation-item__trigger:focus:not(:focus-visible){outline:0}.expanded .pfe-navigation-item__trigger,.pfe-navigation-item__trigger[aria-expanded=true]{--pfe-navigation--Color:var(--pfe-theme--color--text, #333);--pfe-navigation--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-navigation--BorderTopColor:var(--pfe-theme--color--surface--accent, #fe460d)}@media screen and (max-width:1199px){:host([is_nested]) .pfe-navigation-item__trigger:hover{border-left:4px solid var(--pfe-navigation--BorderLeftColor--focus);border-left:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) var(--pfe-navigation--BorderLeftColor--focus)}:host([is_nested]) .pfe-navigation-item__trigger[aria-expanded=true],:host([is_nested].expanded) .pfe-navigation-item__trigger{position:relative;display:block;border-bottom:0}}@media screen and (min-width:1200px){:host([pfe-icon=menu]) .pfe-navigation-item__trigger{display:none}}:host([pfe-icon]) .pfe-navigation-item__trigger{--pfe-navigation__trigger--FontSize:14px}.pfe-navigation-item__trigger--icon{visibility:hidden}:host([has_tray]:not([pfe-icon]):not([is_nested])) [aria-expanded=false]:hover .pfe-navigation-item__trigger--icon{visibility:visible;border-top-color:var(--pfe-navigation--Color)}@media screen and (min-width:1200px){:host([has_tray]:not([pfe-icon])) [aria-expanded=false]:hover .pfe-navigation-item__trigger--icon{visibility:visible}}:host [aria-expanded=true] .pfe-navigation-item__trigger--icon{visibility:visible}:host(:not([pfe-icon])) .pfe-navigation-item__trigger--icon{border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);border-width:6px 6px 0;border-color:transparent;border-top-color:#606060;border-top-color:var(--pfe-theme--color--feedback--default,#606060);-webkit-transform:rotate(0);transform:rotate(0);position:absolute;bottom:16px;bottom:var(--pfe-theme--container-spacer,16px)}@media screen and (max-width:1199px){:host([is_nested]) [aria-expanded=false] .pfe-navigation-item__trigger--icon{visibility:visible;content:"";position:absolute;top:calc((16px * .75) + .55em);top:calc((var(--pfe-theme--container-spacer,16px) * .75) + .55em);display:block;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);height:.4em;width:.4em;text-align:center;-webkit-transition:-webkit-transform .15s;transition:-webkit-transform .15s;transition:transform .15s;transition:transform .15s,-webkit-transform .15s;border-width:0 .1em .1em 0;-webkit-transform:rotate(45deg);transform:rotate(45deg);right:calc(16px * 1.5);right:calc(var(--pfe-theme--container-spacer,16px) * 1.5)}:host([is_nested]) [aria-expanded=true] .pfe-navigation-item__trigger--icon{visibility:visible;content:"";position:absolute;top:calc((16px * .75) + .55em);top:calc((var(--pfe-theme--container-spacer,16px) * .75) + .55em);display:block;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);height:.4em;width:.4em;text-align:center;-webkit-transition:-webkit-transform .15s;transition:-webkit-transform .15s;transition:transform .15s;transition:transform .15s,-webkit-transform .15s;border-width:.1em .1em 0 0;border-bottom:0;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:calc(16px * 1.5);right:calc(var(--pfe-theme--container-spacer,16px) * 1.5)}:host([is_nested]:not([has_tray])) .pfe-navigation-item__trigger--icon{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}}:host([pfe-icon]) .pfe-navigation-item__trigger--icon{visibility:visible;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;background:var(--pfe-navigation--icon) no-repeat;background-size:contain;background-position:center;width:21px;height:21px;margin-bottom:calc(16px / 2);margin-bottom:calc(var(--pfe-theme--container-spacer,16px)/ 2)}:host(:not([pfe-icon],[is_nested])) [aria-expanded=false] .pfe-navigation-item__trigger--icon{visibility:hidden}@media screen and (max-width:1199px){:host([is_nested]) .pfe-navigation-item__tray{display:none;overflow:hidden;will-change:height;border-color:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%}:host([is_nested]) .pfe-navigation-item__tray[aria-expanded=true],:host([is_nested].expanded) .pfe-navigation-item__tray{display:block;position:relative;border-right:1px solid transparent;border-right:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) transparent;border-left:4px solid transparent;border-left:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) transparent;-webkit-box-shadow:0 5px 4px rgba(140,140,140,.35);box-shadow:0 5px 4px rgba(140,140,140,.35);-webkit-box-shadow:0 5px var(--pfe-theme--surface--border-width--heavy,4px) rgba(140,140,140,.35);box-shadow:0 5px var(--pfe-theme--surface--border-width--heavy,4px) rgba(140,140,140,.35);border-left-color:#06c;border-left-color:var(--pfe-theme--color--surface--lightest--link,#06c);background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);border-right-color:#d2d2d2;border-right-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-bottom:1px solid #d2d2d2;border-bottom:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2)}}@media screen and (min-width:1200px){:host([pfe-icon=menu]) .pfe-navigation-item__tray{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}}:host(.animating){-webkit-transition:-webkit-transform .3s cubic-bezier(.465,.183,.153,.946);transition:-webkit-transform .3s cubic-bezier(.465,.183,.153,.946);transition:transform .3s cubic-bezier(.465,.183,.153,.946);transition:transform .3s cubic-bezier(.465,.183,.153,.946),-webkit-transform .3s cubic-bezier(.465,.183,.153,.946);-webkit-transition:-webkit-transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:-webkit-transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946)),-webkit-transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946))}@media screen and (max-width:1199px){:host([is_nested]){--pfe-navigation__trigger--FontSize:16px;--pfe-navigation--BackgroundColor:var(--pfe-theme--surface--lightest);--pfe-navigation--Color:var(--pfe-theme--surface--lightest--text);--pfe-navigation--main:transparent;--pfe-navigation--aux:var(--pfe-theme--color--surface--lightest--text, #333);--pfe-navigation--BorderLeft:var(--pfe-theme--surface--border-width--heavy, 4px) var(--pfe-theme--surface--border-style, solid) transparent;--pfe-navigation--BorderRight:var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) transparent;--pfe-navigation--BorderBottom:var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-navigation--BorderLeftColor--focus:var(--pfe-theme--color--surface--lightest--link, #06c)}:host([is_nested]) .pfe-navigation-item__trigger{margin:0;width:100%;height:auto;font-family:inherit;font-weight:700;font-weight:var(--pfe-theme--font-weight--bold,700);text-align:left;cursor:pointer;z-index:1;position:relative;font-size:calc(16px * 1.1);font-size:calc(var(--pfe-theme--font-size,16px) * 1.1);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);color:var(--pfe-navigation--aux);background-color:var(--pfe-navigation--main);border-left:var(--pfe-navigation--BorderLeft);border-right:var(--pfe-navigation--BorderRight);border-bottom:var(--pfe-navigation--BorderBottom);border-top:0;padding:16px 50px 16px calc(16px * 1.5);padding:var(--pfe-theme--container-spacer,16px) 50px var(--pfe-theme--container-spacer,16px) calc(var(--pfe-theme--container-spacer,16px) * 1.5);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch}:host([is_nested]) .pfe-navigation-item__trigger:hover{outline:0;border-left-color:var(--pfe-navigation--BorderLeftColor--focus);z-index:2}:host([is_nested]) .pfe-navigation-item__trigger:focus{outline:0;z-index:2;text-decoration:underline;-webkit-text-decoration-color:#c6c6c6;text-decoration-color:#c6c6c6;-webkit-text-decoration-color:var(--pfe-theme--color--surface--border--darker,#c6c6c6);text-decoration-color:var(--pfe-theme--color--surface--border--darker,#c6c6c6)}:host([is_nested]) .pfe-navigation-item__trigger::-moz-focus-inner{border:0}:host([is_nested]) .pfe-navigation-item__trigger[aria-expanded=true]{--pfe-navigation--main:var(--pfe-theme--color--surface--lightest, #fff);--pfe-navigation--aux:var(--pfe-theme--color--surface--lightest--text, #333);--pfe-navigation--focus:var(--pfe-theme--color--surface--lightest--link, #06c);--pfe-navigation--BorderLeft:var(--pfe-theme--surface--border-width--heavy, 4px) var(--pfe-theme--surface--border-style, solid) var(--pfe-theme--color--surface--lightest--link, #06c);--pfe-navigation--BorderRight:var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2)}:host([is_nested][first]){border-top:1px solid #d2d2d2;border-top:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2)}:host([is_nested][last]) [aria-expanded=false]{border-bottom:1px solid #d2d2d2;border-bottom:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2)}}</style><div class="pfe-navigation-item__trigger" aria-expanded="false" tabindex="0">\n    ' + (this.hasIcon ? '<span class="pfe-navigation-item__trigger--icon"></span>' : "") + '\n    <slot name="trigger" class="pfe-navigation-item__trigger--slot"></slot>\n    ' + (!this.hasIcon ? '<span class="pfe-navigation-item__trigger--icon"></span>' : "") + '\n</div>\n<div class="pfe-navigation-item__tray">\n    <slot name="tray"></slot>\n</div>';
          }
      }, {
          key: 'templateUrl',
          get: function get$$1() {
              return "pfe-navigation-item.html";
          }
      }, {
          key: 'styleUrl',
          get: function get$$1() {
              return "pfe-navigation-item.scss";
          }
      }, {
          key: 'schemaUrl',
          get: function get$$1() {
              return "pfe-navigation-item.json";
          }
      }, {
          key: 'hasIcon',


          // Used in the template to determine where to print the icon
          get: function get$$1() {
              return this.hasAttribute("pfe-icon");
          }
      }, {
          key: 'nested',
          get: function get$$1() {
              return this.hasAttribute("is_nested");
          },
          set: function set$$1(isNested) {
              isNested = Boolean(isNested);

              if (isNested) {
                  this.setAttribute("is_nested", "");
              } else {
                  this.removeAttribute("is_nested");
              }
          }
      }, {
          key: 'expanded',
          get: function get$$1() {
              return this.classList.contains("expanded");
          },
          set: function set$$1(isExpanded) {
              isExpanded = Boolean(isExpanded);

              if (isExpanded) {
                  this.classList.add("expanded");

                  if (this._trigger) {
                      this._trigger.setAttribute("aria-expanded", true);
                  }

                  if (this.tray) {
                      this.tray.removeAttribute("hidden");
                  }

                  if (this._tray) {
                      this._tray.setAttribute("aria-expanded", true);
                  }
              } else {
                  this.classList.remove("expanded");

                  if (this._trigger) {
                      this._trigger.setAttribute("aria-expanded", false);
                  }

                  if (this.tray) {
                      this.tray.setAttribute("hidden", "");
                  }

                  if (this._tray) {
                      this._tray.setAttribute("aria-expanded", false);
                  }
              }
          }
      }, {
          key: 'visible',
          get: function get$$1() {
              return !this.hasAttribute("hidden");
          },
          set: function set$$1(isVisible) {
              isVisible = Boolean(isVisible);

              if (isVisible) {
                  this.removeAttribute("hidden");
              } else {
                  this.setAttribute("hidden", "");
              }
          }
      }], [{
          key: 'version',
          get: function get$$1() {
              return "1.0.0-prerelease.19";
          }
      }, {
          key: 'properties',
          get: function get$$1() {
              return { "icon": { "title": "Icon name", "type": "string", "enum": ["bento", "user", "globe", "search", "menu"], "prefixed": true } };
          }
      }, {
          key: 'slots',
          get: function get$$1() {
              return { "trigger": { "title": "Navigation trigger", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "raw" }] } }, "tray": { "title": "Navigation tray", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "raw" }] } } };
          }
      }, {
          key: 'tag',
          get: function get$$1() {
              return "pfe-navigation-item";
          }
      }, {
          key: 'PfeType',
          get: function get$$1() {
              return PFElement.PfeTypes.Container;
          }
      }, {
          key: 'observedAttributes',
          get: function get$$1() {
              return ["pfe-icon"];
          }
      }]);

      function PfeNavigationItem() {
          classCallCheck(this, PfeNavigationItem);

          var _this = possibleConstructorReturn(this, (PfeNavigationItem.__proto__ || Object.getPrototypeOf(PfeNavigationItem)).call(this, PfeNavigationItem));

          _this.nested = false;
          _this.expanded = false;
          _this.trigger = null;
          _this.tray = null;
          _this.directLink = null;
          _this.linkUrl = null;

          _this._trigger = _this.shadowRoot.querySelector('.' + _this.tag + '__trigger');
          _this._tray = _this.shadowRoot.querySelector('.' + _this.tag + '__tray');
          _this._icon = _this.shadowRoot.querySelector('.' + _this.tag + '__trigger--icon');

          // Externally accessible events
          _this.close = _this.close.bind(_this);
          _this.open = _this.open.bind(_this);
          _this.toggle = _this.toggle.bind(_this);

          _this._init = _this._init.bind(_this);
          _this._keydownHandler = _this._keydownHandler.bind(_this);
          _this._suppressLink = _this._suppressLink.bind(_this);
          _this._navigateToUrl = _this._navigateToUrl.bind(_this);
          _this._directLinkHandler = _this._directLinkHandler.bind(_this);
          return _this;
      }

      createClass(PfeNavigationItem, [{
          key: 'connectedCallback',
          value: function connectedCallback() {
              var _this2 = this;

              get(PfeNavigationItem.prototype.__proto__ || Object.getPrototypeOf(PfeNavigationItem.prototype), 'connectedCallback', this).call(this);

              // If no slots have been assigned, assign it to the trigger slot
              var unassigned = [].concat(toConsumableArray(this.children)).filter(function (child) {
                  return !child.hasAttribute("slot");
              });
              unassigned.map(function (item) {
                  return item.setAttribute("slot", "trigger");
              });

              // Get the LightDOM trigger & tray content
              this.trigger = this.querySelector('[slot="trigger"]');
              this.tray = this.querySelector('[slot="tray"]');

              // Check for any nested navigation items
              this.nestedItems = [];

              // If a light DOM tray exists, check for descendents
              if (this.tray) {
                  this.nestedItems = this.nestedItems.concat([].concat(toConsumableArray(this.tray.querySelectorAll('' + this.tag))));
                  this.nestedItems = this.nestedItems.concat([].concat(toConsumableArray(this.tray.querySelectorAll("slot"))).map(function (slot) {
                      return slot.assignedElements().map(function (node) {
                          return [].concat(toConsumableArray(node.querySelectorAll('' + _this2.tag)));
                      });
                  }).flat(3));
              }

              this._init();

              // Add a slotchange listener to the lightDOM trigger
              this.trigger.addEventListener("slotchange", this._init);
          }
      }, {
          key: 'attributeChangedCallback',
          value: function attributeChangedCallback(attr, oldValue, newValue) {
              get(PfeNavigationItem.prototype.__proto__ || Object.getPrototypeOf(PfeNavigationItem.prototype), 'attributeChangedCallback', this).call(this, attr, oldValue, newValue);
          }
      }, {
          key: 'disconnectedCallback',
          value: function disconnectedCallback() {
              this.trigger.removeEventListener("slotchange", this._init);

              if (this.tray) {
                  this.removeEventListener("keydown", this._keydownHandler);

                  this._trigger.removeEventListener("click", this.toggle);
                  if (this.directLink) {
                      this.directLink.removeEventListener("click", this._suppressLink);
                  }
              } else {
                  this._trigger.removeEventListener("click", this._navigateToUrl);
                  this._trigger.removeEventListener("keydown", this._directLinkHandler);
              }
          }
      }, {
          key: '_init',
          value: function _init() {
              this.directLink = this.trigger.querySelector("a");

              // If there is a tray element, add click events
              if (this.tray) {
                  // Toggle the navigation when the trigger is clicked
                  this._trigger.addEventListener("click", this.toggle);
                  // Attaching to the parent element allows the exit key to work inside the tray too
                  this.addEventListener("keydown", this._keydownHandler);

                  // Turn off the fallback link
                  if (this.directLink) {
                      this.directLink.setAttribute("tabindex", "-1");
                      this.directLink.addEventListener("click", this._suppressLink);
                  }
              } else {
                  this.linkUrl = this.directLink ? this.directLink.href : "#";
                  this._trigger.addEventListener("click", this._navigateToUrl);
                  this._trigger.addEventListener("keydown", this._directLinkHandler);
              }
          }
      }, {
          key: '_suppressLink',
          value: function _suppressLink(event) {
              event.preventDefault();
          }
      }, {
          key: '_navigateToUrl',
          value: function _navigateToUrl(event) {
              event.preventDefault();
              window.location.href = this.linkUrl;
          }
      }, {
          key: '_directLinkHandler',
          value: function _directLinkHandler(event) {
              switch (event.key) {
                  case "Spacebar":
                  case "Enter":
                  case " ":
                      this._navigateToUrl(event);
                      break;
                  default:
                      return;
              }
          }
      }, {
          key: '_keydownHandler',
          value: function _keydownHandler(event) {
              // @TODO need to add fallback key mappings for other browsers
              switch (event.key) {
                  case "Spacebar":
                  case "Enter":
                  case " ":
                      // Check that the event is on the trigger element
                      if (event && event.path && event.path[0] && event.path[0].classList.contains(this.tag + '__trigger')) {
                          this.toggle(event);
                      }
                      break;
                  case "Esc":
                  case "Escape":
                      this.close(event);
                      this.focus();
                      break;
                  default:
                      return;
              }
          }
      }]);
      return PfeNavigationItem;
  }(PFElement);

  var PfeNavigationMain = function (_PFElement2) {
      inherits(PfeNavigationMain, _PFElement2);
      createClass(PfeNavigationMain, [{
          key: 'html',
          get: function get$$1() {
              return '<style>:host{display:block;height:100%}::slotted(*){margin:0;padding:0;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap}:host([show_content]) ::slotted(*){-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch}::slotted(ul){list-style-type:none}:host([show_content]) ::slotted(ul){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap}</style><slot></slot>';
          }
      }, {
          key: 'templateUrl',
          get: function get$$1() {
              return "pfe-navigation-main.html";
          }
      }, {
          key: 'styleUrl',
          get: function get$$1() {
              return "pfe-navigation-main.scss";
          }
      }], [{
          key: 'version',
          get: function get$$1() {
              return "1.0.0-prerelease.19";
          }
      }, {
          key: 'properties',
          get: function get$$1() {
              return { "sticky": { "title": "Sticky navigation", "type": "boolean", "default": true, "prefixed": true }, "close-on-click": { "title": "Close navigation on click event", "type": "string", "enum": ["external"], "default": "external", "prefixed": true } };
          }
      }, {
          key: 'slots',
          get: function get$$1() {
              return { "skip": { "title": "Skip navigation", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "raw" }] } }, "logo": { "title": "Logo", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "raw" }] } }, "search": { "title": "Search", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "pfe-navigation-item" }] } }, "mobile-search": { "title": "Mobile search functionality", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "raw" }] } }, "main": { "title": "Main navigation", "type": "array", "namedSlot": false, "items": { "title": "Item", "oneOf": [{ "$ref": "nav" }, { "$ref": "raw" }] } }, "language": { "title": "Language switcher", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "pfe-navigation-item" }] } }, "mobile-language": { "title": "Mobile link to language page", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "a" }] } }, "login": { "title": "Log in", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "pfe-navigation-item" }] } }, "mobile-login": { "title": "Mobile link to log in page", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "a" }] } }, "site-switcher": { "title": "Site switcher", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "pfe-navigation-item" }] } } };
          }
      }, {
          key: 'tag',
          get: function get$$1() {
              return "pfe-navigation-main";
          }
      }, {
          key: 'PfeType',
          get: function get$$1() {
              return PFElement.PfeTypes.Container;
          }
      }, {
          key: 'observedAttributes',
          get: function get$$1() {
              return ["show_content"];
          }
      }]);

      function PfeNavigationMain() {
          classCallCheck(this, PfeNavigationMain);

          // Get all the nested navigation items
          var _this3 = possibleConstructorReturn(this, (PfeNavigationMain.__proto__ || Object.getPrototypeOf(PfeNavigationMain)).call(this, PfeNavigationMain));

          _this3.navItems = _this3.querySelectorAll("pfe-navigation-item");
          // Find the first nested element
          _this3.first = _this3.navItems.item(0);
          // Find the last nested element
          _this3.last = _this3.navItems.item(_this3.navItems.length - 1);

          _this3._init = _this3._init.bind(_this3);
          return _this3;
      }

      createClass(PfeNavigationMain, [{
          key: 'connectedCallback',
          value: function connectedCallback() {
              get(PfeNavigationMain.prototype.__proto__ || Object.getPrototypeOf(PfeNavigationMain.prototype), 'connectedCallback', this).call(this);

              this._init();

              // Add a slotchange listener to the lightDOM trigger
              this.addEventListener("slotchange", this._init);
          }
      }, {
          key: 'disconnectedCallback',
          value: function disconnectedCallback() {
              this.removeEventListener("slotchange", this._init);
          }
      }, {
          key: '_init',
          value: function _init() {
              // Ensure the necessary a11y is set
              this.setAttribute("role", "navigation");
              this.setAttribute("aria-label", "Main");

              // For each nested navigation item, tag it with context
              this.navItems.forEach(function (item) {
                  item.nested = true;
              });

              // Tag the first and last navigation items for styling in mobile
              if (this.first) this.first.setAttribute("first", "");
              if (this.last) this.last.setAttribute("last", "");
          }
      }]);
      return PfeNavigationMain;
  }(PFElement);

  var PfeNavigation = function (_PFElement3) {
      inherits(PfeNavigation, _PFElement3);
      createClass(PfeNavigation, [{
          key: 'closeAllNavigationItems',
          value: function closeAllNavigationItems() {
              this.dispatchEvent(new CustomEvent("pfe-navigation-item:toggle", {
                  detail: {
                      action: "close"
                  },
                  bubbles: true,
                  composed: true
              }));
          }
      }, {
          key: 'html',
          get: function get$$1() {
              return '<style>:host{--pfe-navigation--Padding--vertical:var(--pfe-theme--container-padding, 16px);--pfe-navigation--Padding--horizontal:var(--pfe-theme--container-padding, 16px);--pfe-navigation--Padding:0 var(--pfe-navigation--Padding--horizontal);--pfe-navigation--BackgroundColor:var(--pfe-theme--color--surface--darkest, #131313);--pfe-navigation--Color:var(--pfe-theme--color--surface--darkest--text, #fff);--pfe-navigation--BorderTopColor:transparent;--pfe-navigation--BorderColor:transparent;--pfe-navigation--Border:var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) var(--pfe-navigation--BorderColor);--pfe-navigation--MinHeight:72px;--pfe-navigation--icon:none;--pfe-navigation__overlay--BackgroundColor:var(--pfe-theme--overlay--BackgroundColor, rgba(37, 37, 37, 0.5));--pfe-navigation__trigger--FontWeight:100;--pfe-navigation__tray--Padding:var(--pfe-theme--container-padding, 16px);display:block;z-index:0;z-index:var(--pfe-theme--zindex--content,0);width:100%}@media print{:host{--pfe-navigation--Padding:calc(var(--pfe-navigation--Padding--vertical) / 2) var(--pfe-navigation--Padding--horizontal)}}@media screen and (min-width:576px){:host{--pfe-navigation--Padding--horizontal:calc(var(--pfe-theme--container-padding, 16px) * 2)}}@media screen and (min-width:992px){:host{--pfe-navigation--Padding--horizontal:calc(var(--pfe-theme--container-padding, 16px) / 2);--pfe-navigation__tray--Padding:calc(var(--pfe-theme--container-padding, 16px) * 2)}}@media screen and (min-width:1200px){:host{--pfe-navigation--Padding--horizontal:var(--pfe-theme--container-padding, 16px)}}:host(.sticky){position:-webkit-sticky;position:sticky;top:0;left:0;width:100vw;z-index:99;z-index:var(--pfe-theme--zindex--navigation,99)}::slotted([slot=logo]){margin:0;max-height:var(--pfe-navigation--MinHeight)}::slotted([slot=mobile-language]),::slotted([slot=mobile-login]){color:#06c;color:var(--pfe-broadcasted--color--ui-link,#06c);text-decoration:underline;-webkit-text-decoration:var(--pfe-broadcasted--link--text-decoration,underline);text-decoration:var(--pfe-broadcasted--link--text-decoration,underline)}::slotted([slot=mobile-menu--label]){font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-theme--font-family, "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif);font-size:var(--pfe-navigation--FontSize);font-weight:var(--pfe-navigation--FontWeight);color:var(--pfe-navigation--Color);margin-bottom:0}::slotted([pfe-icon=bento]),[pfe-icon=bento]{--pfe-navigation--icon:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="19px" height="19px" viewBox="0 0 19 19" xml:space="preserve"><g stroke="none" stroke-width="1" fill="white" fill-rule="evenodd"><g><rect x="14" y="14" width="5" height="5"></rect><rect x="7" y="14" width="5" height="5"></rect><rect x="0" y="14" width="5" height="5"></rect><rect x="14" y="7" width="5" height="5"></rect><rect x="7" y="7" width="5" height="5"></rect><rect x="0" y="7" width="5" height="5"></rect><rect x="14" y="0" width="5" height="5"></rect><rect x="7" y="0" width="5" height="5"></rect><rect x="0" y="0" width="5" height="5"></rect></g></g></svg>\')}::slotted([pfe-icon=bento].expanded),[pfe-icon=bento].expanded{--pfe-navigation--icon:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="19px" height="19px" viewBox="0 0 19 19" xml:space="preserve"><g stroke="none" stroke-width="1" fill="black" fill-rule="evenodd"><g><rect x="14" y="14" width="5" height="5"></rect><rect x="7" y="14" width="5" height="5"></rect><rect x="0" y="14" width="5" height="5"></rect><rect x="14" y="7" width="5" height="5"></rect><rect x="7" y="7" width="5" height="5"></rect><rect x="0" y="7" width="5" height="5"></rect><rect x="14" y="0" width="5" height="5"></rect><rect x="7" y="0" width="5" height="5"></rect><rect x="0" y="0" width="5" height="5"></rect></g></g></svg>\')}::slotted([pfe-icon=user]),[pfe-icon=user]{--pfe-navigation--icon:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="21px" height="20px" viewBox="0 -1 21 20" xml:space="preserve"><g stroke="white" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g><path d="M0,19 C0,13.75 4.25,9.5 9.5,9.5 C14.75,9.5 19,13.75 19,19"></path><circle cx="9.5" cy="4.75" r="4.75"></circle></g></g></svg>\')}::slotted([pfe-icon=user].expanded),[pfe-icon=user].expanded{--pfe-navigation--icon:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="21px" height="20px" viewBox="0 -1 21 20" xml:space="preserve"><g stroke="black" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g><path d="M0,19 C0,13.75 4.25,9.5 9.5,9.5 C14.75,9.5 19,13.75 19,19"></path><circle cx="9.5" cy="4.75" r="4.75"></circle></g></g></svg>\')}::slotted([pfe-icon=globe]),[pfe-icon=globe]{--pfe-navigation--icon:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="21px" height="21px" viewBox="-1 -1 21 21" xml:space="preserve"><g stroke="white" stroke-width="1" fill="none" fill-rule="evenodd"><g><circle cx="9.5" cy="9.5" r="9.5"></circle><ellipse cx="9.5" cy="9.5" rx="4.75" ry="9.5"></ellipse><path d="M9.5,0 L9.5,19"></path><path d="M1,14 L18,14"></path><path d="M0,9.5 L19,9.5"></path><path d="M1,5 L18,5"></path></g></g></svg>\')}::slotted([pfe-icon=globe].expanded),[pfe-icon=globe].expanded{--pfe-navigation--icon:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="21px" height="21px" viewBox="-1 -1 21 21" xml:space="preserve"><g stroke="black" stroke-width="1" fill="none" fill-rule="evenodd"><g><circle cx="9.5" cy="9.5" r="9.5"></circle><ellipse cx="9.5" cy="9.5" rx="4.75" ry="9.5"></ellipse><path d="M9.5,0 L9.5,19"></path><path d="M1,14 L18,14"></path><path d="M0,9.5 L19,9.5"></path><path d="M1,5 L18,5"></path></g></g></svg>\')}::slotted([pfe-icon=search]),[pfe-icon=search]{--pfe-navigation--icon:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20px" height="20px" viewBox="-1 -1 21 21" xml:space="preserve"><g stroke="white" stroke-width="1" fill="none" fill-rule="evenodd"><g><path d="M12,13 L18,19" stroke-linecap="round"></path><ellipse cx="7" cy="7.5" rx="7" ry="7.5"></ellipse></g></g></svg>\')}::slotted([pfe-icon=search].expanded),[pfe-icon=search].expanded{--pfe-navigation--icon:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20px" height="20px" viewBox="-1 -1 21 21" xml:space="preserve"><g stroke="black" stroke-width="1" fill="none" fill-rule="evenodd"><g><path d="M12,13 L18,19" stroke-linecap="round"></path><ellipse cx="7" cy="7.5" rx="7" ry="7.5"></ellipse></g></g></svg>\')}::slotted([pfe-icon=menu]),[pfe-icon=menu]{--pfe-navigation--icon:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="23px" height="18px" viewBox="0 0 23 18" xml:space="preserve"><g stroke="white" stroke-width="1" fill="white" fill-rule="evenodd"><g><rect x="0.5" y="14.5" width="22" height="3"></rect><rect x="0.5" y="7.5" width="22" height="3"></rect><rect x="0.5" y="0.5" width="22" height="3"></rect></g></g></svg>\')}::slotted([pfe-icon=menu].expanded),[pfe-icon=menu].expanded{--pfe-navigation--icon:url(\'data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="-11 11 22 23"><path fill="black" d="M30 16.669v-1.331c0-0.363-0.131-0.675-0.394-0.938s-0.575-0.394-0.938-0.394h-10.669v-10.65c0-0.362-0.131-0.675-0.394-0.938s-0.575-0.394-0.938-0.394h-1.331c-0.363 0-0.675 0.131-0.938 0.394s-0.394 0.575-0.394 0.938v10.644h-10.675c-0.362 0-0.675 0.131-0.938 0.394s-0.394 0.575-0.394 0.938v1.331c0 0.363 0.131 0.675 0.394 0.938s0.575 0.394 0.938 0.394h10.669v10.644c0 0.363 0.131 0.675 0.394 0.938 0.262 0.262 0.575 0.394 0.938 0.394h1.331c0.363 0 0.675-0.131 0.938-0.394s0.394-0.575 0.394-0.938v-10.637h10.669c0.363 0 0.675-0.131 0.938-0.394 0.269-0.262 0.4-0.575 0.4-0.938z" transform="rotate(45)"/></svg>\')}.pfe-navigation__wrapper{position:relative;z-index:99;z-index:var(--pfe-theme--navigation,99);background-color:#131313;background-color:var(--pfe-navigation--BackgroundColor);color:var(--pfe-navigation--Color);min-height:var(--pfe-navigation--MinHeight)}.pfe-navigation__container{margin:0 auto;padding:0 var(--pfe-navigation--Padding--horizontal);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}@media screen and (min-width:768px){.pfe-navigation__container{--pfe-navigation--Width:calc(768px - calc(var(--pfe-navigation--Padding--horizontal) * 2));width:calc(768px - 2rem);width:var(--pfe-navigation--Width)}}@media screen and (min-width:992px){.pfe-navigation__container{--pfe-navigation--Width:calc(992px - calc(var(--pfe-navigation--Padding--horizontal) * 2));width:calc(992px - 2rem);width:var(--pfe-navigation--Width)}}@media screen and (min-width:1200px){.pfe-navigation__container{--pfe-navigation--Width:calc(1200px - calc(var(--pfe-navigation--Padding--horizontal) * 2));width:calc(1200px - 2rem);width:var(--pfe-navigation--Width)}}@media (min-width:992px){.pfe-navigation__container{padding:0}}.pfe-navigation__overlay{display:block;background-color:rgba(37,37,37,.5);background-color:var(--pfe-navigation__overlay--BackgroundColor,rgba(37,37,37,.5));position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:98;z-index:var(--pfe-theme--zindex--overlay,98)}.pfe-navigation__overlay[hidden]{display:none}.pfe-navigation__logo{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;padding-top:var(--pfe-navigation--Padding--vertical);padding-right:16px;padding-right:var(--pfe-theme--container-padding,16px);padding-bottom:var(--pfe-navigation--Padding--vertical)}.pfe-navigation__skip{position:absolute;overflow:hidden;clip:rect(0,0,0,0);height:1px;width:1px;margin:-1px;padding:0;border:0}.pfe-navigation__main{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}@media (min-width:1200px){.pfe-navigation__main{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start}}.pfe-navigation__main--mobile{display:grid;grid-gap:16px;grid-gap:var(--pfe-theme--container-spacer,16px);height:100%}@media (min-width:992px){.pfe-navigation__main--mobile-search{display:none}}.pfe-navigation__main--mobile--columns{display:grid;grid-gap:16px;grid-gap:var(--pfe-theme--container-spacer,16px);grid-template-columns:repeat(auto-fill,minmax(200px,1fr))}@media (min-width:768px){.pfe-navigation__main--mobile--columns{display:none}}.pfe-navigation__main--mobile--item[pfe-icon=user]{--pfe-navigation--icon:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="21px" height="20px" viewBox="0 -1 21 20" xml:space="preserve"><g stroke="royalblue" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g><path d="M0,19 C0,13.75 4.25,9.5 9.5,9.5 C14.75,9.5 19,13.75 19,19"></path><circle cx="9.5" cy="4.75" r="4.75"></circle></g></g></svg>\')}.pfe-navigation__main--mobile--item[pfe-icon=globe]{--pfe-navigation--icon:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="21px" height="21px" viewBox="-1 -1 21 21" xml:space="preserve"><g stroke="royalblue" stroke-width="1" fill="none" fill-rule="evenodd"><g><circle cx="9.5" cy="9.5" r="9.5"></circle><ellipse cx="9.5" cy="9.5" rx="4.75" ry="9.5"></ellipse><path d="M9.5,0 L9.5,19"></path><path d="M1,14 L18,14"></path><path d="M0,9.5 L19,9.5"></path><path d="M1,5 L18,5"></path></g></g></svg>\')}.pfe-navigation__main--icon{display:inline-block;background:var(--pfe-navigation--icon) no-repeat;background-size:contain;background-position:center;width:1em;height:1em;margin-right:calc(16px / 2);margin-right:calc(var(--pfe-theme--container-spacer,16px)/ 2)}.pfe-navigation__utility{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}</style><div class="pfe-navigation__wrapper">\n  <div class="pfe-navigation__container">\n    <div class="pfe-navigation__logo">\n      <slot name="logo"></slot>\n    </div>\n    <div class="pfe-navigation__skip">\n      <slot name="skip"></slot>\n    </div>\n    <div class="pfe-navigation__main">\n      <pfe-navigation-item pfe-icon="menu">\n        <span slot="trigger">\n          <slot name="mobile-menu--label" class="pfe-navigation__main--menu-label"></slot>\n        </span>\n        <div slot="tray" hidden>\n          <div class="pfe-navigation__main--mobile">\n            <slot name="mobile-search" class="pfe-navigation__main--mobile-search"></slot>\n            <slot></slot>\n            <div class="pfe-navigation__main--mobile--columns">\n              <span class="pfe-navigation__main--mobile--item" pfe-icon="user">\n                <span class="pfe-navigation__main--icon"></span>\n                <slot name="mobile-login"></slot>\n              </span>\n              <span class="pfe-navigation__main--mobile--item" pfe-icon="globe">\n                <span class="pfe-navigation__main--icon"></span>\n                <slot name="mobile-language"></slot>\n              </span>\n            </div>\n          </div>\n        </div>\n      </pfe-navigation-item>\n    </div>\n    <div class="pfe-navigation__utility">\n      <slot name="language"></slot>\n      <slot name="search"></slot>\n      <slot name="login"></slot>\n      <slot name="site-switcher"></slot>\n    </div>\n  </div>\n  <div class="pfe-navigation__end" hidden tabindex="-1"></div>\n</div>\n<div class="pfe-navigation__overlay" hidden></div>';
          }
      }, {
          key: 'templateUrl',
          get: function get$$1() {
              return "pfe-navigation.html";
          }
      }, {
          key: 'styleUrl',
          get: function get$$1() {
              return "pfe-navigation.scss";
          }
      }, {
          key: 'schemaUrl',
          get: function get$$1() {
              return "pfe-navigation.json";
          }
      }, {
          key: 'overlay',
          get: function get$$1() {
              return !this._overlay.hasAttribute("hidden");
          },
          set: function set$$1(state) {
              if (state) {
                  // Add the overlay to the page
                  this._overlay.removeAttribute("hidden");
                  // This prevents background scroll while nav is open
                  document.body.style.overflow = "hidden";
              } else {
                  // Remove the overlay from the page
                  this._overlay.setAttribute("hidden", "");
                  // Allow background to scroll again
                  document.body.style.overflow = "auto";
              }
          }
      }], [{
          key: 'version',
          get: function get$$1() {
              return "1.0.0-prerelease.19";
          }
      }, {
          key: 'properties',
          get: function get$$1() {
              return { "sticky": { "title": "Sticky navigation", "type": "boolean", "default": true, "prefixed": true }, "close-on-click": { "title": "Close navigation on click event", "type": "string", "enum": ["external"], "default": "external", "prefixed": true } };
          }
      }, {
          key: 'slots',
          get: function get$$1() {
              return { "skip": { "title": "Skip navigation", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "raw" }] } }, "logo": { "title": "Logo", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "raw" }] } }, "search": { "title": "Search", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "pfe-navigation-item" }] } }, "mobile-search": { "title": "Mobile search functionality", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "raw" }] } }, "main": { "title": "Main navigation", "type": "array", "namedSlot": false, "items": { "title": "Item", "oneOf": [{ "$ref": "nav" }, { "$ref": "raw" }] } }, "language": { "title": "Language switcher", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "pfe-navigation-item" }] } }, "mobile-language": { "title": "Mobile link to language page", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "a" }] } }, "login": { "title": "Log in", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "pfe-navigation-item" }] } }, "mobile-login": { "title": "Mobile link to log in page", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "a" }] } }, "site-switcher": { "title": "Site switcher", "type": "array", "namedSlot": true, "items": { "title": "Item", "oneOf": [{ "$ref": "pfe-navigation-item" }] } } };
          }
      }, {
          key: 'tag',
          get: function get$$1() {
              return "pfe-navigation";
          }
      }]);

      function PfeNavigation() {
          classCallCheck(this, PfeNavigation);

          // Attach functions for use below
          var _this4 = possibleConstructorReturn(this, (PfeNavigation.__proto__ || Object.getPrototypeOf(PfeNavigation)).call(this, PfeNavigation));

          _this4._init = _this4._init.bind(_this4);
          _this4._setVisibility = _this4._setVisibility.bind(_this4);

          // -- handlers
          _this4._toggledHandler = _this4._toggledHandler.bind(_this4);
          _this4._closeAllNavigationItems = _this4._closeAllNavigationItems.bind(_this4);
          _this4._observerHandler = _this4._observerHandler.bind(_this4);
          _this4._resizeHandler = _this4._resizeHandler.bind(_this4);
          _this4._stickyHandler = _this4._stickyHandler.bind(_this4);
          _this4.closeAllNavigationItems = _this4.closeAllNavigationItems.bind(_this4);
          _this4._outsideListener = _this4._outsideListener.bind(_this4);
          _this4._observer = new MutationObserver(_this4._observerHandler);

          // Capture shadow elements
          _this4._overlay = _this4.shadowRoot.querySelector(".pfe-navigation__overlay");
          _this4._menuItem = _this4.shadowRoot.querySelector("pfe-navigation-item[pfe-icon='menu']");

          // Initialize active navigation item to empty array
          _this4._activeNavigationItems = [];
          // Set the state of this element to false until initialized
          _this4.initialized = false;
          _this4.overlay = false;
          // Initial position of this element from the top of the screen
          _this4.top = _this4.getBoundingClientRect().top || 0;

          return _this4;
      }

      createClass(PfeNavigation, [{
          key: 'connectedCallback',
          value: function connectedCallback() {
              get(PfeNavigation.prototype.__proto__ || Object.getPrototypeOf(PfeNavigation.prototype), 'connectedCallback', this).call(this);

              // If this element contains light DOM, initialize it
              if (this.children.length) {
                  // If only one value exists in the array, it starts at that size and goes up
                  this.breakpoints = {
                      main: [0, 1200], // visible from 0 - 1200px
                      search: [768], // visible from 768px +
                      "mobile-search": [0, 767],
                      language: [768],
                      "mobile-language": [0, 767],
                      login: [768],
                      "mobile-login": [0, 767]
                  };

                  // Kick off the initialization of the light DOM elements
                  this.initialized = this._init();

                  // Listen for the toggled event on the navigation children
                  this.addEventListener("pfe-navigation-item:toggle", this._toggledHandler);

                  // Watch for screen resizing
                  window.addEventListener("resize", this._resizeHandler);
              } else {
                  console.error("This component does not have any light DOM children.  Please check documentation for requirements.");
              }
          }
      }, {
          key: 'disconnectedCallback',
          value: function disconnectedCallback() {
              // Remove the custom listener for the toggled event
              this.removeEventListener("pfe-navigation-item:toggle", this._toggledHandler);

              // Remove the scroll, resize, and outside click event listeners
              window.removeEventListener("resize", this._resizeHandler);
              window.removeEventListener("scroll", this._stickyHandler);
              document.removeEventListener("click", this._outsideListener);

              this._observer.disconnect();
          }
      }, {
          key: '_observerHandler',
          value: function _observerHandler(mutationsList) {
              // Reset the state to false, rerun the initializer
              this.initialized = false;
              this.initialized = this._init();
          }
      }, {
          key: '_resizeHandler',
          value: function _resizeHandler(event) {
              var _this5 = this;

              // Set the visibility of items
              this._setVisibility(this.offsetWidth);

              // Check what the active item is
              this._activeNavigationItems.forEach(function (item) {
                  // If the item is open but not visible, update it to hidden
                  if (item.expanded && !item.visible) {
                      item.expanded = false;
                      _this5._activeNavigationItems = _this5._activeNavigationItems.filter(function (i) {
                          return i !== item;
                      });
                  } else if (item.expanded && item.parent && item.parent.visible) {
                      item.parent.expanded = true; // Ensure the parent is open
                      // If the parent item doesn't exist in the active array, add it
                      if (!_this5._activeNavigationItems.includes(item.parent)) {
                          _this5._activeNavigationItems.push(item.parent);
                      }
                  }
              });

              this.overlay = this._activeNavigationItems.length > 0;
          }
      }, {
          key: '_closeAllNavigationItems',
          value: function _closeAllNavigationItems() {
              // Close any open navigation items
              this._activeNavigationItems = this._activeNavigationItems.filter(function (item) {
                  item.expanded = false;
                  return false;
              });

              this.overlay = this._activeNavigationItems.length > 0;
          }
      }, {
          key: '_toggledHandler',
          value: function _toggledHandler(event) {
              var close = event && event.detail ? event.detail.action === "close" : false;
              var newItem = event && event.detail ? event.detail.navigationItem : null;
              var currentItems = this._activeNavigationItems;

              // Check if the new item shares a parent with the current one and that the parent is visible
              var openSibling = currentItems.filter(function (item) {
                  return newItem && newItem.parent && newItem.parent === item.parent && newItem.parent.visible;
              });
              var hasOpenParent = newItem && newItem.parent && newItem.parent.visible && currentItems.includes(newItem.parent);
              var isOpen = currentItems.includes(newItem);

              // If the action is specifically to close the item or there is a new item and it isn't visibly nested
              if (close || !newItem && currentItems.length > 0 || newItem && newItem.visible && !hasOpenParent) {
                  // Close the items in the array and remove them
                  currentItems.map(function (item) {
                      item.expanded = false;
                  });
                  this._activeNavigationItems = [];
              }
              // If there is a new item and it isn't visibly nested
              else if (newItem && newItem.visible && hasOpenParent && openSibling.length > 0) {
                      // Close the items in the array and remove them
                      this._activeNavigationItems = currentItems.filter(function (item) {
                          if (item !== newItem.parent) {
                              item.expanded = false;
                          } else {
                              return item;
                          }
                      });
                  }

              // If the clicked item is open, close itself
              if (isOpen) {
                  newItem.expanded = false;
                  // Remove this item from the active items
                  this._activeNavigationItems = currentItems.filter(function (item) {
                      return item !== newItem;
                  });
              }
              // If there are no open items and it's a visible element
              else if (newItem && !isOpen && !close) {
                      // Open that item and add it to the active array
                      newItem.expanded = true;
                      this._activeNavigationItems.push(newItem);
                  } else {
                      this._closeAllNavigationItems();
                  }

              // The overlay is open if any active items exist
              this.overlay = this._activeNavigationItems.length > 0;

              return;
          }
      }, {
          key: '_stickyHandler',
          value: function _stickyHandler() {
              if (window.pageYOffset >= this.top) {
                  this.classList.add("sticky");
              } else {
                  this.classList.remove("sticky");
              }
          }
      }, {
          key: '_outsideListener',
          value: function _outsideListener(event) {
              if (event.target !== this && event.target.closest("pfe-navigation") === null || event.path.length > 0 && event.path[0] === this._overlay) {
                  this._closeAllNavigationItems();
              }
          }
      }, {
          key: '_setVisibility',
          value: function _setVisibility(width) {
              var _this6 = this;

              Object.entries(this.breakpoints).map(function (item) {
                  var label = item[0];
                  var bps = item[1];
                  var start = bps[0];
                  var end = bps[1];
                  var isVisible = false;

                  // If the slot exists, set attribute based on supported breakpoints
                  if (_this6.slots[label] && _this6.slots[label].nodes.length > 0) {
                      if (width > start && (!end || end && width < end)) {
                          isVisible = true;
                      }

                      _this6.slots[label].nodes.forEach(function (node) {
                          if (label !== "main") {
                              node.visible = isVisible;
                          } else {
                              isVisible ? node.removeAttribute("show_content") : node.setAttribute("show_content", "");
                              _this6._menuItem.visible = isVisible;
                              node.navItems.forEach(function (item) {
                                  return isVisible ? item.removeAttribute("parent_hidden") : item.setAttribute("parent_hidden", "");
                              });
                          }
                      });
                  }
              });
          }
      }, {
          key: '_init',
          value: function _init() {
              var _this7 = this;

              if (!this.initialized) {
                  // @IE11 This is necessary so the script doesn't become non-responsive
                  if (window.ShadyCSS) {
                      this._observer.disconnect();
                  }

                  // Connect the shadow menu with the main component
                  var mainNav = this.querySelector("pfe-navigation-main");
                  if (mainNav && mainNav.navItems) {
                      mainNav.navItems.forEach(function (item) {
                          item.parent = _this7._menuItem;
                      });
                  }

                  // Start by setting the visibility of the slots
                  this._setVisibility(this.offsetWidth);

                  // If the nav is set to sticky, inject the height of the nav to the next element in the DOM
                  if (this.hasAttribute("pfe-sticky") && this.getAttribute("pfe-sticky") != "false") {
                      // Run the sticky check on first page load
                      this._stickyHandler();

                      // Attach the scroll event to the window
                      window.addEventListener("scroll", this._stickyHandler);
                  }

                  // Listen for clicks outside the navigation element
                  if (this.hasAttribute("pfe-close-on-click") && this.getAttribute("pfe-close-on-click") === "external") {
                      document.addEventListener("click", this._outsideListener);
                  }

                  // @IE11 This is necessary so the script doesn't become non-responsive
                  if (window.ShadyCSS) {
                      setTimeout(function () {
                          _this7._observer.observe(_this7, {
                              childList: true,
                              subtree: true,
                              characterData: true
                          });
                      }, 0);
                  }
              }

              return true;
          }
      }]);
      return PfeNavigation;
  }(PFElement);

  PFElement.create(PfeNavigationItem);
  PFElement.create(PfeNavigationMain);
  PFElement.create(PfeNavigation);

  return PfeNavigation;

})));
//# sourceMappingURL=pfe-navigation.umd.js.map

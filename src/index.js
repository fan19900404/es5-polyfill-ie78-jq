(function($) {
  /**
   * polyfill for Array
   */

  if (!Array.isArray) {
    Array.isArray = function(arg) {
      return $.isArray(arg);
    };
  }

  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {
      var O = Object(this);
      if (this === void 0 || this === null) {
        throw new TypeError(
          "Array.prototype.forEach called on null or undefined"
        );
      }
      $.each(O, function(index, value) {
        callback.call(thisArg, value, index, O);
      });
    };
  }
  if (!Array.prototype.every) {
    Array.prototype.every = function(callback) {
      if (this === void 0 || this === null) {
        throw new TypeError(
          "Array.prototype.every called on null or undefined"
        );
      }

      var O = Object(this);
      var len = O.length >>> 0;
      if (Object.prototype.toString.call(callback) != "[object Function]") {
        throw new TypeError(callback + " is not a function");
      }
      var ctx = arguments.length >= 2 ? arguments[1] : void 0;
      for (var i = 0; i < len; i++) {
        if (i in O && !callback.call(ctx, O[i], i, O)) {
          return false;
        }
      }

      return true;
    };
  }
  if (!Array.prototype.filter) {
    Array.prototype.filter = function(callback) {
      if (this === void 0 || this === null) {
        throw new TypeError(
          "Array.prototype.filter called on null or undefined"
        );
      }
      if (Object.prototype.toString.call(callback) != "[object Function]") {
        throw new TypeError(callback + " is not a function");
      }
      return $.grep(this, callback);
    };
  }
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
      if (this === void 0 || this === null) {
        throw new TypeError(
          "Array.prototype.indexOf called on null or undefined"
        );
      }
      var k;
      var O = Object(this);
      var len = O.length >>> 0;
      if (len === 0) {
        return -1;
      }
      var n = fromIndex | 0;
      if (n >= len) {
        return -1;
      }
      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      while (k < len) {
        if (k in O && O[k] === searchElement) {
          return k;
        }
        k++;
      }
      return -1;
    };
  }
  if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf = function(searchElement) {
      if (this === void 0 || this === null) {
        throw new TypeError(
          "Array.prototype.lastIndexOf called on null or undefined"
        );
      }
      var n, k;
      var t = Object(this);
      var len = t.length >>> 0;
      if (len === 0) {
        return -1;
      }
      n = len - 1;
      if (arguments.length > 1) {
        n = Number(arguments[1]);
        if (n !== n) {
          n = 0;
        } else if (n != 0 && n != 1 / 0 && n != -(1 / 0)) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }
      k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);
      for (; k >= 0; k--) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      return -1;
    };
  }
  if (!Array.prototype.map) {
    Array.prototype.map = function(callback, thisArg) {
      if (this === void 0 || this === null) {
        throw new TypeError("Array.prototype.map called on null or undefined");
      }
      if (Object.prototype.toString.call(callback) !== "[object Function]") {
        throw new TypeError(callback + " is not a function");
      }
      return $.map(this, callback);
    };
  }
  // from https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  if (!Array.prototype.reduce) {
    Array.prototype.reduce = function(callback) {
      if (this === void 0 || this === null) {
        throw new TypeError(
          "Array.prototype.reduce called on null or undefined"
        );
      }
      if (Object.prototype.toString.call(callback) !== "[object Function]") {
        throw new TypeError(callback + " is not a function");
      }
      var t = Object(this),
        len = t.length >>> 0,
        k = 0,
        value;
      if (arguments.length >= 2) {
        value = arguments[1];
      } else {
        while (k < len && !(k in t)) {
          k++;
        }
        if (k >= len) {
          throw new TypeError("Reduce of empty array with no initial value");
        }
        value = t[k++];
      }
      for (; k < len; k++) {
        if (k in t) {
          value = callback(value, t[k], k, t);
        }
      }
      return value;
    };
  }

  // from https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
  if (!Array.prototype.reduceRight) {
    Array.prototype.reduceRight = function(callback) {
      if (this === void 0 || this === null) {
        throw new TypeError(
          "Array.prototype.reduceRight called on null or undefined"
        );
      }
      if (Object.prototype.toString.call(callback) !== "[object Function]") {
        throw new TypeError(callback + " is not a function");
      }
      var t = Object(this),
        len = t.length >>> 0,
        k = len - 1,
        value;
      if (arguments.length >= 2) {
        value = arguments[1];
      } else {
        while (k >= 0 && !(k in t)) {
          k--;
        }
        if (k < 0) {
          throw new TypeError("Reduce of empty array with no initial value");
        }
        value = t[k--];
      }
      for (; k >= 0; k--) {
        if (k in t) {
          value = callback(value, t[k], k, t);
        }
      }
      return value;
    };
  }

  // from https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some
  if (!Array.prototype.some) {
    Array.prototype.some = function(callback) {
      if (this === void 0 || this === null) {
        throw new TypeError(
          "Array.prototype.reduceRight called on null or undefined"
        );
      }
      if (Object.prototype.toString.call(callback) !== "[object Function]") {
        throw new TypeError(callback + " is not a function");
      }
      var t = Object(this);
      var len = t.length >>> 0;
      var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
      for (var i = 0; i < len; i++) {
        if (i in t && callback.call(thisArg, t[i], i, t)) {
          return true;
        }
      }
      return false;
    };
  }

  /**
   * polyfill for Function
   */

  // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
      if (typeof this !== "function") {
        throw new TypeError(
          "Function.prototype.bind - what is trying to be bound is not callable"
        );
      }
      var args = Array.prototype.slice.call(arguments, 1);
      var fToBind = this;
      var fNOP = function() {};
      var fBound = function() {
        return fToBind.apply(
          this instanceof fNOP ? this : oThis,
          args.concat(Array.prototype.slice.call(arguments))
        );
      };

      if (this.prototype) {
        fNOP.prototype = this.prototype;
      }
      fBound.prototype = new fNOP();
      return fBound;
    };
  }

  /**
   * polyfill for String
   */

  if (!String.prototype.trim) {
    String.prototype.trim = function() {
      return $.trim(this);
    };
  }

  /**
   * polyfill for Date
   */

  if (!Date.now) {
    Date.now = function() {
      return +new Date();
    };
  }
  // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
  if (!Date.prototype.toISOString) {
    (function() {
      function pad(number) {
        if (number < 10) {
          return "0" + number;
        }
        return number;
      }
      Date.prototype.toISOString = function() {
        return (
          this.getUTCFullYear() +
          "-" +
          pad(this.getUTCMonth() + 1) +
          "-" +
          pad(this.getUTCDate()) +
          "T" +
          pad(this.getUTCHours()) +
          ":" +
          pad(this.getUTCMinutes()) +
          ":" +
          pad(this.getUTCSeconds()) +
          "." +
          (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
          "Z"
        );
      };
    })();
  }

  /**
   * polyfill for Object
   */
  if (!Object.keys) {
    Object.keys = (function() {
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var hasDontEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
      var dontEnums = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor"
      ];
      var dontEnumsLength = dontEnums.length;

      return function(obj) {
        if (
          typeof obj !== "object" &&
          (typeof obj !== "function" || obj === null)
        ) {
          throw new TypeError("Object.keys called on non-object");
        }
        var result = [],
          prop,
          i;

        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }
        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    })();
  }
})(jQuery);

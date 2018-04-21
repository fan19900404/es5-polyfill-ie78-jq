(function($) {
  /**
   * polyfill for Array
   */

  var ArrayPrototype = Array.prototype;
  if (!Array.isArray) {
    Array.isArray = $.isArray;
  }
  if (!ArrayPrototype.forEach) {
    ArrayPrototype.forEach = function(callback, thisArg) {
      var that = this;
      $.each(that, function(index, value) {
        callback.call(thisArg, value, index, that);
      });
    };
  }
  if (!ArrayPrototype.every) {
    ArrayPrototype.every = function(fn, context) {
      var passed = true;
      var that = this;
      if (typeof fn === "function") {
        for (var k = 0, length = that.length; k < length; k++) {
          if (passed === false) break;
          passed = !!fn.call(context, that[k], k, that);
        }
      }
      return passed;
    };
  }
  if (!ArrayPrototype.filter) {
    ArrayPrototype.filter = function(callback, thisArg) {
      var that = this;
      return $.grep(that, function(value, index) {
        return callback.call(thisArg, value, index, that);
      });
    };
  }
  if (!ArrayPrototype.indexOf) {
    ArrayPrototype.indexOf = function(searchElement, fromIndex) {
      var that = this;
      fromIndex = fromIndex * 1 || 0;
      var result = $(that.slice(fromIndex)).index(searchElement);
      return result > -1 ? result + fromIndex : result;
    };
  }
  // if (!Array.prototype.lastIndexOf) {
  //   Array.prototype.lastIndexOf = function(searchElement) {
  //     if (this === void 0 || this === null) {
  //       throw new TypeError(
  //         "Array.prototype.lastIndexOf called on null or undefined"
  //       );
  //     }
  //     var n, k;
  //     var t = Object(this);
  //     var len = t.length >>> 0;
  //     if (len === 0) {
  //       return -1;
  //     }
  //     n = len - 1;
  //     if (arguments.length > 1) {
  //       n = Number(arguments[1]);
  //       if (n !== n) {
  //         n = 0;
  //       } else if (n != 0 && n != 1 / 0 && n != -(1 / 0)) {
  //         n = (n > 0 || -1) * Math.floor(Math.abs(n));
  //       }
  //     }
  //     k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);
  //     for (; k >= 0; k--) {
  //       if (k in t && t[k] === searchElement) {
  //         return k;
  //       }
  //     }
  //     return -1;
  //   };
  // }
  if (!ArrayPrototype.map) {
    ArrayPrototype.map = function(callback, thisArg) {
      var that = this;
      return $.map(that, function(value, index) {
        return callback.call(thisArg, value, index, that);
      });
    };
  }
  // from https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  // if (!Array.prototype.reduce) {
  //   Array.prototype.reduce = function(callback) {
  //     if (this === void 0 || this === null) {
  //       throw new TypeError(
  //         "Array.prototype.reduce called on null or undefined"
  //       );
  //     }
  //     if (Object.prototype.toString.call(callback) !== "[object Function]") {
  //       throw new TypeError(callback + " is not a function");
  //     }
  //     var t = Object(this),
  //       len = t.length >>> 0,
  //       k = 0,
  //       value;
  //     if (arguments.length >= 2) {
  //       value = arguments[1];
  //     } else {
  //       while (k < len && !(k in t)) {
  //         k++;
  //       }
  //       if (k >= len) {
  //         throw new TypeError("Reduce of empty array with no initial value");
  //       }
  //       value = t[k++];
  //     }
  //     for (; k < len; k++) {
  //       if (k in t) {
  //         value = callback(value, t[k], k, t);
  //       }
  //     }
  //     return value;
  //   };
  // }

  // from https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
  // if (!Array.prototype.reduceRight) {
  //   Array.prototype.reduceRight = function(callback) {
  //     if (this === void 0 || this === null) {
  //       throw new TypeError(
  //         "Array.prototype.reduceRight called on null or undefined"
  //       );
  //     }
  //     if (Object.prototype.toString.call(callback) !== "[object Function]") {
  //       throw new TypeError(callback + " is not a function");
  //     }
  //     var t = Object(this),
  //       len = t.length >>> 0,
  //       k = len - 1,
  //       value;
  //     if (arguments.length >= 2) {
  //       value = arguments[1];
  //     } else {
  //       while (k >= 0 && !(k in t)) {
  //         k--;
  //       }
  //       if (k < 0) {
  //         throw new TypeError("Reduce of empty array with no initial value");
  //       }
  //       value = t[k--];
  //     }
  //     for (; k >= 0; k--) {
  //       if (k in t) {
  //         value = callback(value, t[k], k, t);
  //       }
  //     }
  //     return value;
  //   };
  // }

  // from https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some
  if (!ArrayPrototype.some) {
    ArrayPrototype.some = function(fn, context) {
      var passed = false;
      var that = this;
      if (typeof fn === "function") {
        for (var k = 0, length = that.length; k < length; k++) {
          if (passed === true) break;
          passed = !!fn.call(context, that[k], k, that);
        }
      }
      return passed;
    };
  }

  /**
   * polyfill for Function
   */

  // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
  // if (!Function.prototype.bind) {
  //   Function.prototype.bind = function(oThis) {
  //     if (typeof this !== "function") {
  //       throw new TypeError(
  //         "Function.prototype.bind - what is trying to be bound is not callable"
  //       );
  //     }
  //     var args = Array.prototype.slice.call(arguments, 1);
  //     var fToBind = this;
  //     var fNOP = function() {};
  //     var fBound = function() {
  //       return fToBind.apply(
  //         this instanceof fNOP ? this : oThis,
  //         args.concat(Array.prototype.slice.call(arguments))
  //       );
  //     };

  //     if (this.prototype) {
  //       fNOP.prototype = this.prototype;
  //     }
  //     fBound.prototype = new fNOP();
  //     return fBound;
  //   };
  // }

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
  // if (!Date.prototype.toISOString) {
  //   (function() {
  //     function pad(number) {
  //       if (number < 10) {
  //         return "0" + number;
  //       }
  //       return number;
  //     }
  //     Date.prototype.toISOString = function() {
  //       return (
  //         this.getUTCFullYear() +
  //         "-" +
  //         pad(this.getUTCMonth() + 1) +
  //         "-" +
  //         pad(this.getUTCDate()) +
  //         "T" +
  //         pad(this.getUTCHours()) +
  //         ":" +
  //         pad(this.getUTCMinutes()) +
  //         ":" +
  //         pad(this.getUTCSeconds()) +
  //         "." +
  //         (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
  //         "Z"
  //       );
  //     };
  //   })();
  // }

  /**
   * polyfill for Object
   */
  if (!Object.keys) {
    Object.keys = function(o) {
      if (o !== Object(o)) {
        throw new TypeError("Object.keys called on a non-object");
      }
      var k = [],
        p;
      for (p in o) {
        if (Object.prototype.hasOwnProperty.call(o, p)) {
          k.push(p);
        }
      }
      return k;
    };
  }
})(jQuery);

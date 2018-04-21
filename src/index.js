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
  if (!ArrayPrototype.map) {
    ArrayPrototype.map = function(callback, thisArg) {
      var that = this;
      return $.map(that, function(value, index) {
        return callback.call(thisArg, value, index, that);
      });
    };
  }
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

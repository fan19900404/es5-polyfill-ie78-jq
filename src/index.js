(function($) {
  /**
   * polyfill for Array
   */

  var ArrayPrototype = Array.prototype;

  Array.isArray = $.isArray;

  ArrayPrototype.map = function(callback, thisArg) {
    var that = this;
    return $.map(that, function(value, index) {
      return callback.call(thisArg, value, index, that);
    });
  };

  ArrayPrototype.forEach = function(callback, thisArg) {
    this.map(callback, thisArg);
  };

  ArrayPrototype.indexOf = function(searchElement, fromIndex) {
    var that = this;
    fromIndex = fromIndex * 1 || 0;
    var result = $(that.slice(fromIndex)).index(searchElement);
    return result > -1 ? result + fromIndex : result;
  };

  ArrayPrototype.filter = function(callback, thisArg) {
    var that = this;
    return $.grep(that, function(value, index) {
      return callback.call(thisArg, value, index, that);
    });
  };

  ArrayPrototype.every = function(callback, thisArg) {
    var that = this;
    return that.filter(callback, thisArg).length == that.length;
  };

  ArrayPrototype.some = function(callback, thisArg) {
    return this.filter(callback, thisArg).length > 0;
  };

  /**
   * polyfill for String
   */

  String.prototype.trim = function() {
    return $.trim(this);
  };

  /**
   * polyfill for Date
   */

  Date.now = function() {
    return +new Date();
  };

  /**
   * polyfill for Object
   */

  Object.keys = function(obj) {
    if (obj !== Object(obj)) {
      throw new TypeError("Object.keys called on a non-object");
    }
    var keys = [];
    var prop;
    for (prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        keys.push(prop);
      }
    }
    return keys;
  };
})(jQuery);

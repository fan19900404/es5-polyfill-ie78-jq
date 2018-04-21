# es5-polyfill-ie78-jq
基于jq的，在ie7/8浏览器环境下，实现的es5方法垫片语法糖

## 项目缘由
由于公司的项目，还是要求兼容IE7/8，并且在项目中已经引入了jquery1.x版本，但是并没有引入es5-shim一类的es5兼容库（理由是es5-shim 库太大？）

所以，在完成公司任务的时候，不能愉快的使用es5的Array的相关方法，非常不爽，即使jq也提供了$.each,$.map一类的方法，我还是想要使用原生方法。

在考虑到体积一类的问题，最终决定，依赖jq这个库，自己动手写个语法糖，比如
```js
  if (!Array.prototype.map) {
    Array.prototype.map = function(callback, thisArg) {
      var that = this;
      return $.map(this, function(value, index) {
        return callback.call(thisArg, value, index, that);
      });
    };
  }
```

## 支持的API

+ Array
  - Array.isArray
  - Array.prototype.forEach
  - Array.prototype.every
  - Array.prototype.filter
  - Array.prototype.indexOf
  - Array.prototype.map
  - Array.prototype.some
+ String
  - String.prototype.trim
+ Date
  - Date.now
+ Object
  - Object.keys

## 注意
- 本兼容方案，是以在IE7/8环境中正常可用为标准，不关心是否和ES5完全一致，比如错误提示一致。
- 本兼容方案出于体积考虑，只放入常用方法。
- 本兼容方案依赖jq，请先引入jq，在引入本js。
- 如无特殊要求，建议引入`es5-shim`的兼容方案。
- 再次重申，本兼容方案，只适合于使用了jq，并且要兼容IE7/8时，可使用ES5的部分方法。
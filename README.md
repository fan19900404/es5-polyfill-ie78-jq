# es5-polyfill-ie78-jq
基于jq的，在ie7/8浏览器环境下，实现的es5方法垫片语法糖

## 项目缘由
由于公司的项目，还是要求兼容IE7/8，并且在项目中已经引入了jquery1.x版本，但是并没有引入es5-shim一类的es5兼容库（理由是es5-shim 库太大？）

所以，在完成公司任务的时候，不能愉快的使用es5的Array的相关方法，非常不爽，即使jq也提供了$.each,$.map一类的方法，我还是想要使用原生方法。

在考虑到体积一类的问题，最终决定，依赖jq这个库，自己动手写个语法糖

## 支持的API

+ Array
  - Array.isArray
  - Array.prototype.forEach
  - Array.prototype.every
  - Array.prototype.filter
  - Array.prototype.indexOf
  - Array.prototype.lastIndexOf
  - Array.prototype.map
  - Array.prototype.reduce
  - Array.prototype.reduceRight
  - Array.prototype.some
+ String
  - String.prototype.trim
+ Date
  - Date.now
  - Date.prototype.toISOString
+ Function
  - Function.prototype.bind
+ Object
  - Object.keys
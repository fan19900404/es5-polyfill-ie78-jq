// 获取 gulp
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task("script", function() {
  return gulp
    // 1. 找到文件
    .src("src/index.js")
    // 2. 压缩文件
    .pipe(uglify())
    // 3. 另存压缩后的文件
    .pipe(rename("es5-polyfill-ie78-jq.min.js"))
    .pipe(gulp.dest("dist"));
});

gulp.task("auto", function () {
  gulp.watch("src/index.js", gulp.series("script"));
});

gulp.task("default", gulp.parallel("auto"));
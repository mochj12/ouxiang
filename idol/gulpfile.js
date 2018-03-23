var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var uglify = require("gulp-uglify");
var reload = browserSync.reload;
gulp.task('serve', ['minify'], function() {

    browserSync.init({
        files: ['**'],
        server: {
            baseDir: "./"
        },
        port: 80
    });
    gulp.watch("js/*.js", ['minify']);
});

gulp.task('minify', function () {
    gulp.src('js/*.js')
    .pipe(uglify()) // 要压缩的js文件
    .pipe(gulp.dest('dist'))//压缩后的路径
    .pipe(reload({stream:true}));
});

gulp.task('default', ['serve']);
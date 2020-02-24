const gulp = require('gulp');
// const webp = require('gulp-webp');

// gulp.task('tiny', () => {
//     const imageRoot = '../bin/res/exchange/';
//     return gulp.src(`${imageRoot}/**/*.{png,jpg,jpeg}`)
//         .pipe(webp())
//         .pipe(gulp.dest(`../bin/webp/`));
// });

// gulp.task('default', gulp.series('tiny'));


const imageisux = require("gulp-imageisux");

gulp.task("imageisux", function () {
    return gulp
        .src(["bin/res/**/*.{png,jpg,jpeg}"])
        .pipe(imageisux("", true));
});
gulp.task("default", gulp.series("imageisux"));

// 监听文件夹变化
// gulp.task('watch', () =>
//     gulp.watch("bin/res/**/*.{png,jpg,jpeg}", ['imageisux'])
// );
// gulp.task('default', () =>
//     gulp.start('watch')
// );
const gulp = require("gulp");
const webp = require("gulp-webp");

const resPath = "./bin/res/**/*.{png,jpg,jpeg}";
const testRes = "bin/res/GUI";

gulp.task('tiny', () => {
    return gulp.src(resPath)
        .pipe(webp())
        .pipe(gulp.dest(`./bin/webp/`));
});
gulp.task('default', gulp.series('tiny'));

// 压缩图片
// const imagemin = require('gulp-imagemin');
// exports.default = () => (
//     gulp.src(respath)
//     .pipe(imagemin())
//     .pipe(gulp.dest('../bin/res/tiny/'))
// );

// 智图压图兼转webp
// const imageisux = require("gulp-imageisux");
// gulp.task("imageisux", function() {
//   return gulp.src([resPath]).pipe(imageisux("", true));
// });
// gulp.task("default", gulp.series("imageisux"));

// 监听文件夹变化
// gulp.task('watch', () =>
//     gulp.watch("bin/res/**/*.{png,jpg,jpeg}", ['imageisux'])
// );
// gulp.task('default', () =>
//     gulp.start('watch')
// );

// tinypng
// var tinypng = require("gulp-tinypng-compress");
// gulp.task("tinypng", function () {
//     gulp
//         .src(resPath)
//         .pipe(
//             tinypng({
//                 key: "TQ9x5ZYkDhRpNcyRlHcQnTm2dY6R8WjN",
//                 sigFile: "images/.tinypng-sigs",
//                 log: true
//             })
//         )
//         .pipe(gulp.dest("./bin/res/tinyimages"));
// });
// gulp.task("default", gulp.series("tinypng"));
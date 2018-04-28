const postcss = require('gulp-postcss');
const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');

gulp.task('css', function () {
  const plugins = [
    autoprefixer({browsers: ['last 1 version']})
  ];
  return gulp.src('./src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist/css'));
});
gulp.task('css:watch', function () {
  gulp.watch('./src/css/*.scss', ['css']);
});

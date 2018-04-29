const postcss = require('gulp-postcss');
const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

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

gulp.task('es6', () => {
  gulp.src('./src/*.js')
    .pipe(babel({
      ignore: 'gulpfile.js'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('es6:watch', () => {
  gulp.watch('./src/*.js', ['es6']);
});

gulp.task('default', ['es6', 'es6:watch', 'css', 'css:watch']);

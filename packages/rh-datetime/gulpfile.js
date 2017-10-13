const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

const trim = require('gulp-trim');
const del = require('del');
const fs = require('fs');
let watcher;

gulp.task('clean', () => {
  return del(['./*.compiled.*', './*.min.js'])
});

gulp.task('compile', () => {
  return gulp.src(['./*.js', '!./*.compiled.js', '!./*.min.js', '!./gulpfile.js'])
    .pipe(replace(/(import ["'].*).(js["'];?)/g, '$1.compiled.$2'))
    .pipe(babel({
      "presets": [
        ["env", {
          "modules": "umd"
        }]
      ]
    }))
    .pipe(uglify())
    .pipe(rename({
      suffix: ".compiled"
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('transpile', () => {
  return gulp.src(['./*.js', '!./*.compiled.js', '!./*.min.js', '!./gulpfile.js'])
    .pipe(babel({
      "presets": [
        ["env", { 
          "modules": false, 
          "targets": { "uglify": true} 
        }]
      ]
    }))
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', () => {
  watcher = gulp.watch(['./rh-datetime.js'], gulp.series('clean', 'compile', 'transpile'));
  return watcher;
});

gulp.task('default',
  gulp.series('clean', 'compile', 'transpile')
);

gulp.task('dev',
  gulp.series('default', 'watch')
);

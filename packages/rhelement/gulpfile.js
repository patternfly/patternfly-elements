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
  return del(['./*.compiled.*'])
});

gulp.task('compile', () => {
  return gulp.src(['./*.js', '!./gulpfile.js'])
    .pipe(replace(/(import ["'].*).(js["'];?)/g, '$1.compiled.$2'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({
      suffix: ".compiled"
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', () => {
  watcher = gulp.watch(['./rhelement.js'], gulp.series('clean', 'compile'));
  return watcher;
});

gulp.task('default',
  gulp.series('clean', 'compile')
);

gulp.task('dev',
  gulp.series('default', 'watch')
);

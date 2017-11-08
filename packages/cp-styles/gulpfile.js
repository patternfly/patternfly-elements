const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const stripCssComments = require('gulp-strip-css-comments');
const trim = require('gulp-trim');
const del = require('del');
const fs = require('fs');
let watcher;

gulp.task('clean', () => {
  return del(['./*.compiled.*'])
});

gulp.task('sass', () => {
  return gulp.src(['./*.scss'])
    .pipe(sass())
    .pipe(stripCssComments())
    .pipe(trim())
    .pipe(gulp.dest('./'));
});

gulp.task('replaceVarsStyles', () => {
  return gulp.src('./cp-vars.js')
    .pipe(replace(/<style class="document-style">[\s\S]*<\/style>/g, '<style class="document-style">' + fs.readFileSync('./cp-vars.css') + '</style>'))
    .pipe(gulp.dest('./'));
});

gulp.task('replaceTypographyStyles', () => {
  return gulp.src('./cp-typography.js')
    .pipe(replace(/<style class="document-style">[\s\S]*<\/style>/g, '<style class="document-style">' + fs.readFileSync('./cp-typography.css') + '</style>'))
    .pipe(gulp.dest('./'));
});

gulp.task('replaceStyles',
  gulp.series('replaceTypographyStyles', 'replaceVarsStyles')
);

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

gulp.task('stopwatch', done => {
  watcher.close();
  done();
});

gulp.task('watch', () => {
  watcher = gulp.watch(['./cp-styles.js', './cp-vars.js', './cp-typography.js', './*.scss'], gulp.series('stopwatch', 'sass', 'replaceStyles', 'clean', 'compile', 'watch'));
  return watcher;
});

gulp.task('default',
  gulp.series('clean', 'sass', 'replaceStyles', 'compile')
);

gulp.task('dev',
  gulp.series('default', 'watch')
);

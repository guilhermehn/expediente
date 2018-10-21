var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var files = ['index.js', 'lib/*.js', 'tests/*.js', 'bin/expediente'];

gulp.task('test', function () {
  return gulp.src('tests/*.js').
    pipe(plugins.mocha());
});

gulp.task('default', ['lint', 'test']);

gulp.task('watch', function () {
  gulp.start('default');

  gulp.watch(files, ['default']);
});

var URIs  = {
    sourceBase: './client/**/*.*',
    styleSourceBase: './client/resource/sass/**/*.scss',
    destination: './client/build',
    shellCommand: 'browserify -t [ babelify ] ./client/app/main.jsx -o ./client/build/main.js',
    pm2Start: 'pm2 start ./index.js --watch',
};

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch');

const exec = require('child_process').exec;


gulp.task('sass', function () {
  return gulp.src(URIs.styleSourceBase)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(URIs.destination));
});

gulp.task('compile', function () {
    exec(URIs.shellCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      console.log('COMPILATION DONE');
    });
});

gulp.task('watch', function () {
  gulp.watch(URIs.sourceBase, ['sass', 'compile']);
});

gulp.task('build', ['sass', 'compile']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);

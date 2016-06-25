var URIs  = {
    codeSourceBase: './client/app/**/*.*',
    styleSourceBase: './client/resources/sass/**/*.scss',
    indexSource: './index.js',
    backendSourceBase: './server/**/*.*',
    destination: './client/dist',
    compileShellCommand: 'browserify -t [ babelify ] ./client/app/main.jsx -o ./client/dist/main.js',
    pm2StartShellCommand: 'pm2 start -f ./index.js --name="web-app-boilerplate"',
    pm2RestartShellCommand: 'pm2 restart web-app-boilerplate',
    pm2StopShellCommand: 'pm2 delete web-app-boilerplate',
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
    exec(URIs.compileShellCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      console.log('COMPILATION DONE');
    });
});
gulp.task('server-init', function() {
    exec(URIs.pm2StopShellCommand, (error, stdout, stderr) => {

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        console.log('Stopped Server.');

        exec(URIs.pm2StartShellCommand, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            console.log('Started Server.');
        });
    });
});

gulp.task('server-watch', function () {
    exec(URIs.pm2RestartShellCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        console.log('Restarted Server.');
    });
});

gulp.task('watch', function () {
  gulp.watch(URIs.codeSourceBase, ['compile']);
  gulp.watch(URIs.styleSourceBase, ['sass']);
  gulp.watch(URIs.backendSourceBase, ['server-watch']);
  gulp.watch(URIs.indexSource, ['server-watch']);

});

gulp.task('build', ['sass', 'compile']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'server-init']);

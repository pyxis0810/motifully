var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    webserver = require('gulp-webserver'),
    compass = require('gulp-compass'),
    browserSync = require('browser-sync').create(),
    config = require('./config');

gulp.task('serve', ['compass', 'webserver'], function () {

});

gulp.task('dev', ['compass', 'browser-sync'], function () {

});

gulp.task('compass', function () {
    return sass('src/sass/*.sass')
        .on('error', sass.logError)
        .pipe(gulp.dest('public/css'));
});

gulp.task('webserver', function () {
    gulp.src('.')
        .pipe(webserver({
            host: 'localhost',
            port: 3000,
            fallback: 'index.html',
            livereload: true,
            open: true
        }));
});

gulp.task('devserver', ['sass'], function () {
    browserSync.init(config.options.browserSync);
});
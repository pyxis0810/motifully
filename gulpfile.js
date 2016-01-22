var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    webserver = require('gulp-webserver'),
    compass = require('gulp-compass'),
    browserSync = require('browser-sync').create(),
    nodemon = require('gulp-nodemon'),
    config = require('./config');

gulp.task('default', ['browser-sync'], function () {

});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["src/**/*.*"],
        browser: "google chrome",
        port: 8080,
    });
});

gulp.task('nodemon', function (cb) {
    
    var started = false;
    
    return nodemon({
        script: 'bin/www'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true; 
        } 
    });
});
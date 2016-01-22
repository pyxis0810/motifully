var gulp = require('gulp'),
    //Gulp Utils
    gutil       = require('gulp-util'),
    gulp_if     = require('gulp-if'),
    sourcemaps  = require('gulp-sourcemaps'),

    //Server Configuration
    browserSync = require('browser-sync').create(),
    nodemon = require('gulp-nodemon'),

    //Sass
    sass = require('gulp-sass'),

    //Javascript
    uglify = require('gulp-uglify'),

    //Browoserify
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),

    //Custom Configuration
    config = require('./config');

// Global variables
global.process.build = false;

gulp.task('default', ['browser-sync', 'watch'], function () {

});

gulp.task('build', ['sass', 'browserify'], function() {

});

//Watch tasks
gulp.task('watch', function() {
    gulp.watch( config.paths.sass.src, ['sass'] );
    gulp.watch( config.paths.browserify.watch_files, ['browserify'] );
    gulp.watch( config.paths.html ).on( 'change', browserSync.reload );
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, config.options.browserSync);
});

gulp.task('nodemon', function (cb) {
    var started = false;
    return nodemon({
        script: 'bin/www'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        if (!started) {
            cb();
            started = true; 
        } 
    });
});

//Convert sass to css
gulp.task('sass', function() {
    gulp
        .src( config.paths.sass.src )
        .pipe( sourcemaps.init() )
        .pipe( sass( config.options.sass ).on('error', sass.logError) )
        .pipe( sourcemaps.write('./') )
        .pipe( gulp.dest( config.paths.sass.dest ) )
        .pipe( browserSync.stream() );
});

//Convert commonjs
gulp.task('browserify', function() {
    var bsr = browserify( config.options.browserify );
    bsr
        .bundle()
        .pipe( source( config.paths.browserify.output_filename ) )
        .pipe( buffer() )
        .pipe( sourcemaps.init({ loadMaps: config.paths.browserify.debugging }) )
        .pipe( gulp_if( global.process.build , uglify()) )
        .on( 'error', gutil.log )
        .pipe( sourcemaps.write( config.paths.browserify.map_location ) )
        .pipe( gulp.dest( config.paths.browserify.dest ) );
});
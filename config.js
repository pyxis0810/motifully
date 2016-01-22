'use strict';

/**
 * 
 * --------------------------------
 */
var root = './src/';

var paths = {
    'html': root + '**/*.html',
    'sass': {
        'src':  root + 'sass/**/*.{sass,scss}',
        'dest': root + 'css'
    },
    'browserify': {
        'src':             [root + 'js/app.js', root+'js/routes.js'],
        'watch_files':     [root + 'js/*.js', root + 'js/app/**/*.js'],
        'dest':            root + 'js/bundle/',
        'output_filename': 'app.js',
        'debugging':       true,
        'map_location':    './'
    }
};

/**
 * 
 * --------------------------------
 */
var options = {
    'sass': {
        'outputStyle': 'compressed'
    },
    'browserify': {
        'entries': paths.browserify.src,
        'debug':   paths.browserify.debugging
    },
    'browserSync': {
        'server': './src'
    }
};

/**
 * 
 * --------------------------------
 */
module.exports = {
    'paths':   paths,
    'options': options
};
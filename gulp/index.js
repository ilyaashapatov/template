module.exports = function(config){
  var gulp = require('gulp'),
      gulpif = require('gulp-if'),
      watch = require('gulp-watch'),
      autoprefixer = require('gulp-autoprefixer'),
      coffee = require('gulp-coffee'),
      stylus = require('gulp-stylus'),
      cssmin = require('gulp-cssmin'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      requi = require('gulp-requi');

  var errors = require('./utils/errors'),
      source = config.source,
      dest = config.dest,
      debug = false;


// =================== CSS ===================
  gulp.task('css', function() {
    gulp.src(source + config.css.source)
      .pipe(stylus())
      .on('error', errors)
      .pipe(autoprefixer({ browsers: config.css.autoprefixer }))
      .pipe(
        gulpif(
          !debug,
          cssmin()
        )
      )
      .pipe(concat(config.css.name))
      .pipe(gulp.dest(dest + config.css.dest))
  });


// =================== Scripts ===================
  gulp.task('js', function() {
    gulp.src(source + config.js.source)
      .pipe(requi())
      .pipe(
        gulpif(
          /[.]coffee$/,
          coffee()
        )
      )
      .on('error', errors)
      .pipe(
        gulpif(
          !debug,
          uglify()
        )
      )
      .pipe(concat(config.js.name))
      .pipe(gulp.dest(dest + config.js.dest))
  }); //task js



  gulp.task('watch', function(){
    watch(source + config.js.watch, function() {
        gulp.start('js');
    });
    watch(source + config.css.watch, function() {
        gulp.start('css');
    });
  });

  gulp.task('default', function(){
    gulp.start(['js', 'css', 'watch']);
  });

  gulp.task('debug', function(){
    console.log('!!! RUNNING IN DEBUG MODE !!!');
    debug = true;
    gulp.start('default');
  });

}
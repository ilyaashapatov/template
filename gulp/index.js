module.exports = function(config){
  var gulp = require('gulp'),
      gulpif = require('gulp-if'),
      watch = require('gulp-watch'),
      autoprefixer = require('gulp-autoprefixer'),
      coffee = require('gulp-coffee'),
      stylus = require('gulp-stylus'),
      less = require('gulp-less'),
      cssmin = require('gulp-cssmin'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      requi = require('gulp-requi'),
      unretina = require('gulp-unretina'),
      spritesmith = require('gulp.spritesmith');

  var errors = require('./utils/errors'),
      debug = false;


// =================== CSS ===================
  gulp.task('css', function() {
    gulp.src(config.css.source)
      .pipe(stylus())
      .on('error', errors)
      .pipe(autoprefixer({ browsers: config.css.autoprefixer }))
      .pipe(
        gulpif(
          !debug,
          cssmin()
        )
      )
      .pipe(concat(config.css.name + '.css'))
      .pipe(gulp.dest(config.css.dest))
  });


// =================== Scripts ===================
  gulp.task('js', function() {
    gulp.src(config.js.source)
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
      .pipe(concat(config.js.name + '.js'))
      .pipe(gulp.dest(config.js.dest))
  });


// =================== Sprites ===================
  gulp.task('sprites', function() {
    var imgName = config.sprites.nameSprite + '.png'

    if (config.sprites.retina) {
      imgName = config.sprites.nameSprite + '@2x.png'
    }

    var spriteData = gulp.src(config.sprites.source)

        .pipe(spritesmith({
          imgName: imgName,
          cssName: config.sprites.nameMixins + '.styl',
          padding: 0,
          cssFormat: 'stylus',
          cssTemplate: config.sprites.tmpl,
          cssVarMap: function(sprite) {
            sprite.retina = config.sprites.retina
          }
        }));

    spriteData.css.pipe(gulp.dest(config.sprites.mixins));
    spriteData.img.pipe(gulp.dest(config.sprites.dest));
  });

  gulp.task('resize_sprites', function(){
    gulp.src(config.sprites.dest + '/' + config.sprites.nameSprite + '@2x.png')
        .pipe(unretina())
        .pipe(gulp.dest(config.sprites.dest));
  });

// ============================================================================


  gulp.task('watch', function(){
    watch(config.js.watch, function() {
        gulp.start('js');
    });
    watch(config.sprites.watch, function() {
        gulp.start('sprites');
    });
    watch(config.css.watch, function() {
        gulp.start('css');
    });

    if (config.sprites.retina) {
      watch(config.sprites.dest + '/' + config.sprites.nameSprite + '@2x.png', function() {
        gulp.start('resize_sprites');
      });
    }
  });

  gulp.task('default', function(){
    gulp.start(['js', 'sprites', 'css', 'watch']);
  });

  gulp.task('debug', function(){
    console.log('!!! RUNNING IN DEBUG MODE !!!');
    debug = true;
    gulp.start('default');
  });

}
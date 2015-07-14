module.exports = function (config) {
  var gulp = require('gulp'),
    gulpsync = require('gulp-sync')(gulp),
    gulpif = require('gulp-if'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    coffee = require('gulp-coffee'),
    stylus = require('gulp-stylus'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    requi = require('gulp-requi'),
    swig = require('gulp-swig'),
    spritesmith = require('gulp.spritesmith');

  var errors = require('./utils/errors'),
    debug = false;


// =================== CSS ===================
  gulp.task('css', function () {
    gulp.src(config.css.source)
      .pipe(requi())
      .pipe(
        gulpif(
          /[.]styl$/,
          stylus()
        )
      )
      .on('error', errors)
      .pipe(autoprefixer({ browsers: config.css.autoprefixer }))
      .pipe(
        gulpif(
          !debug,
          cssmin()
        )
      )
      .pipe(concat(config.css.name))
      .pipe(gulp.dest(config.css.dest));
  });


// =================== Scripts ===================
  gulp.task('js', function () {
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
      .pipe(concat(config.js.name))
      .pipe(gulp.dest(config.js.dest));
  });


// =================== Sprites ===================
  gulp.task('baseSprites', function () {

    var opts = {
      cssTemplate: config.sprites.tmpl,
      imgName: config.sprites.nameSprite,
      cssName: config.sprites.nameMixins,
      imgPath: config.sprites.imgPath,
      padding: 0,
      cssFormat: 'stylus',
      cssVarMap: function (sprite) {
        sprite.prefix = config.sprites.prefixMixin;
        if (config.sprites.retinaNameSprite) {
          sprite.retina = true;
          sprite.retinaImgPath = config.sprites.retinaImgPath;
        } else {
          sprite.retina = false;
        }
      }
    };

    var spriteData = gulp.src(config.sprites.source);

    spriteData = spriteData.pipe(
      spritesmith(opts)
    );

    spriteData.css.pipe(gulp.dest(config.sprites.mixins));
    spriteData.img.pipe(gulp.dest(config.sprites.dest));
  });

  gulp.task('retinaSprites', function () {

    var opts = {
      imgName: config.sprites.retinaNameSprite,
      imgPath: config.sprites.retinaImgPath,
      padding: 0,
      cssName: '.'
    };

    var spriteData = gulp.src(config.sprites.retinaSource);

    spriteData = spriteData.pipe(
      spritesmith(opts)
    );

    spriteData.img.pipe(gulp.dest(config.sprites.dest));
  });

  var tasksSprites = ['baseSprites'];

  if (config.sprites.retinaNameSprite) {
    tasksSprites.push('retinaSprites');
  }

  gulp.task('sprites', tasksSprites);


// ===================  swig  ===================
  gulp.task('swig', function () {
    gulp.src(config.swig.source)
        .pipe(swig())
        .on('error', errors)
        .pipe(gulp.dest(config.swig.dest));
  });


// ============================================================================
  gulp.task('watch', function () {
    watch(config.js.watch, function () {
      gulp.start('js');
    });
    watch(config.sprites.watch, function () {
      gulp.start('sprites');
    });
    watch(config.css.watch, function () {
      gulp.start('css');
    });

    if (config.swig.enable) {
      watch(config.swig.watch, function () {
        gulp.start('swig');
      });
    }
  });

  var tasks = [
    'js',
    [
      'sprites',
      'css'
    ]
  ];

  if (config.swig.enable) {
    tasks.push('swig');
  }

  gulp.task('default', gulpsync.async(tasks));

  gulp.task('start', function () {
    console.log('!!! RUNNING IN DEBUG MODE !!!');
    debug = true;
    gulp.start(gulpsync.sync(['default', 'watch']));
  });
};
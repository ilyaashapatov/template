var build = 'build',
  templates = 'templates',
  assets = build + '/assets',
  source = 'source';

var config = {
  js: {
    source: source + '/js/main.js',
    name: 'main.js',
    dest: assets + '/js',
    watch: source + '/js/**'
  },

  css: {
    source: source + '/css/main.styl',
    name: 'main.css',
    dest: assets + '/css',
    watch: source + '/css/**',
    autoprefixer: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera > 10', 'Explorer >= 9']
  },

  sprites: {
    tmpl: 'utils/sprite-template.handlebars',

    source: [assets + '/images/sprites/*.png', '!' + assets + '/images/sprites/*@*.png'],
    dest: assets + '/images',
    watch: assets + '/images/sprites/*.png',

    mixins: source + '/css/variables',
    nameMixins: 'sprite-mixins.styl',
    prefixMixin: 's-',

    nameSprite: 'sprite.png',
    imgPath: '../images/sprite.png',

    supportRetina: false,
    retinaSource: assets + '/images/sprites/*@2x.png',
    retinaNameSprite: 'sprite@2x.png',
    retinaImgPath: '../images/sprite@2x.png'
  },

  swig: {
    enable: true,
    source: [templates + '/**/*.html', '!' + templates + '/includes/*', '!' + templates + '/base.html'],
    dest: build,
    opt: {
      defaults: {
        cache: false
      }
    },
    watch: [templates + '/**/*.html']
  },

  zip: {
    source: build + '/**/*',
    dest: './',
  }
};

require('./index')(config);
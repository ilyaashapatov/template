var built = '../layout', // ../built – for jade
    dest = built + '/media',
    source = '../src';

var config = {
    'js': {
        'source': source + '/js/main.js',
        'name': 'main.js',
        'dest': dest + '/js',
        'watch': source + '/js/**'
    },

    'css': {
        'source': source + '/css/main.styl',
        'name': 'main.css',
        'dest': dest + '/css',
        'watch': source + '/css/**',
        'autoprefixer': ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera > 10', 'Explorer >= 9']
    },

    'sprites': {
        'tmpl': 'utils/sprite-template.handlebars',

        'source': dest + '/images/sprites/*.png',
        'dest': dest + '/images',
        'watch': dest + '/images/sprites/*.png',

        'mixins': source + '/css/variables',
        'nameMixins': 'sprite-mixins.styl',
        'prefixMixin': 's-',

        'nameSprite': 'sprite.png',
        'imgPath': '../images/sprite.png',
        // retina:
        // 'retinaImgName': 'sprite@2x.png',
        // 'retinaImgPath': '../images/sprite@2x.png',
        // 'retinaSrcFilter': dest + '/images/sprites/*@2x.png'
    },

    'jade': {
        'enable': true,
        'source': [source + '/templates/**/*.jade', '!/**/includes/**/*', '!' + source + '/templates/base.jade'],
        'dest': built,
        'watch': [source + '/templates/**/*.jade']
    }
}

require('./index')(config)
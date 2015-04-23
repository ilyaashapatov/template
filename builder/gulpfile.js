var dest = '../layout/media',
    source = '../src';

var config = {
    'js': {
        'source': source + '/js/main.js',
        'name': 'main',
        'dest': dest + '/js',
        'watch': source + '/js/**'
    },

    'css': {
        'source': source + '/css/main.styl',
        'name': 'main',
        'dest': dest + '/css',
        'watch': source + '/css/**',
        'autoprefixer': ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera > 10', 'Explorer >= 9']
    },

    'sprites': {
        'retina': false,
        'tmpl': 'utils/sprite-template.mustache',
        'source': dest + '/images/sprites/*.png',
        'dest': dest + '/images',
        'nameSprite': 'sprite',
        'watch': dest + '/images/sprites/*.png',
        'mixins': source + '/css/variables',
        'nameMixins': 'sprite-mixins'
    },

    'jade': {
        'enable': false,
        'source': [source + '/templates/**/*.jade', '!/**/includes/**/*', '!' + source + '/templates/base.jade'],
        'dest': '../jade',
        'watch': [source + '/templates/**/*.jade']
    }
}

require('./index')(config)
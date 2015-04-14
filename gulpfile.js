var dest = 'layout/media',
    source = 'layout/assets';

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

    'bootstrap': {
        'source': source + '/bootstrap/bootstrap.less',
        'name': 'bootstrap.css',
        'dest': dest + '/css',
        'watch': source + '/css/bootstrap/**',
    },

    'sprites': {
        'source': dest + '/images/sprites/*.png',
        'sourceRetina': dest + '/images/sprites/*-2x.png',
        'dest': dest + '/images',
        'nameSprite': 'sprite.png',
        'src': '../images/sprite.png',
        'watch': dest + '/images/sprites/*.png',
        'tmpl': 'gulp/utils/sprite-mixins-template.mustache',
        'mixins': source + '/css/variables',
        'nameMixins': 'sprite-mixins.styl'
    }
}




require('./gulp/index')(config)
var config = {
    'source': 'layout/assets',
    'dest': 'layout/media',

    'js': {
        'source': '/js/main.js',
        'name': 'main.js',
        'dest': '/js',
        'watch': '/js/**'
    },

    'css': {
        'source': '/css/main.styl',
        'name': 'main.css',
        'dest': '/css',
        'watch': '/css/**',
        'autoprefixer': ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera > 10', 'Explorer >= 9']
    }
}




require('./gulp/index')(config)
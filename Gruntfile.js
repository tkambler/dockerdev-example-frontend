'use strict';

module.exports = (grunt) => {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.config.init({
        'concat': {
            'vendor': {
                'src': [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js'
                ],
                'dest': 'build/js/vendor.js',
                'nonull': true
            }
        },
        'cssmin': {
        },
        'compass': {
            'all': {
                'options': {
                    'httpPath': '/',
                    'cssDir': 'build/css',
                    'sassDir': 'scss',
                    'specify': [
                        'scss/style.scss'
                    ],
                    'imagesDir': 'build/images',
                    'relativeAssets': true,
                    'outputStyle': 'compressed',
                    'importPath': [
                        'node_modules'
                    ]
                }
            }
        },
        'webpack': {
            'options': {
                'progress': true,
                'stats': {
                    'errorDetails': true
                },
                'storeStatsTo': 'webpackStats'
            },
            'once': require('./webpack.config.js'),
            'watch': Object.assign({ 'watch': true, 'keepalive': true }, require('./webpack.config.js'))
        },
        'copy': {
            'fonts': {
                'files': [
                    {
                        'expand': true,
                        'cwd': 'node_modules/opensans-npm-webfont/fonts',
                        'src': '**/*',
                        'dest': 'build/css/fonts'
                    },
                    {
                        'expand': true,
                        'cwd': 'node_modules/bootstrap-sass/assets/fonts/bootstrap',
                        'src': '**/*',
                        'dest': 'build/fonts'
                    },
                    {
                        'expand': true,
                        'cwd': 'node_modules/font-awesome/fonts',
                        'src': '**/*',
                        'dest': 'build/fonts'
                    }
                ]
            },
            'assets': {
                'expand': true,
                'cwd': 'assets',
                'src': '**',
                'dest': 'build'
            }
        },
        'clean': [
            'build'
        ],
        'connect': {
            'server': {
                'options': {
                    'port': 8000,
                    'base': 'build',
                    'keepalive': true
                }
            }
        },
        'concurrent': {
            'build-serve': {
                'options': {
                    'logConcurrentOutput': true
                },
                'tasks': ['connect', 'webpack:watch']
            }
        },
        'watch': {
            'compass': {
                'files': ['Gruntfile.js', 'scss/**/*'],
                'tasks': ['compass']
            },
            'assets': {
                'files': ['Gruntfile.js', 'assets/**/*'],
                'tasks': ['copy']
            },
            'concat': {
                'files': ['Gruntfile.js'],
                'tasks': ['concat']
            }
        }
    });

    grunt.registerTask('build', ['clean', 'copy', 'webpack:once', 'concat', 'compass']);
    grunt.registerTask('build-serve', ['build', 'concurrent:build-serve']);
    grunt.registerTask('default', ['build']);

};

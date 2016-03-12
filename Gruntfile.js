module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var randomPort = getRandomInt(3000,65536);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      dev: {
        options: {
          sourceMap: 'inline'
        },
        files: [
          {
            expand: true,
            cwd: 'client/src/',
            src: ['**/*.js'],
            dest: 'client/public/'
          }
        ]
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'public/'
          }
        ]
      }
    },
    bower_concat: {
      all: {
        dest: {
          'js': 'client/public/lib/build.js',
          'css': 'client/public/lib/build.css'
        },
        dependencies: {
          'materialize': 'jquery',
          'angular-materialize': ['jquery']
        }
      }
    },
    clean: ['public'],
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: [
              '**',
              '!**/*.jade',
              '!**/*.scss',
              '!**/*.js'
            ],
            dest: 'client/public/',
            filter: 'isFile'
          }
        ]
      }
    },
    cssmin: {
      main: {
        files: {
          'public/lib/build.css': 'public/lib/build.css'
        }
      }
    },
    jade: {
      dev: {
        options: {
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: 'client/src/',
            src: ['**/*.jade', '!**/_*.jade'],
            dest: 'client/public/',
            ext: '.html'
          }
        ]
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: 'client/src/',
            src: ['**/*.jade', '!**/_*.jade'],
            dest: 'public/',
            ext: '.html'
          }
        ]
      }
    },
    sass: {
      prod: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'client/public/assets/main.css': 'client/src/assets/main.scss'
        }
      },
      dev: {
        options: {
          sourceMap: true,
          sourceMapEmbed: true
        },
        files: {
          'client/public/assets/main.css': 'client/src/assets/main.scss'
        }
      }
    },
    uglify: {
      bower: {
        files: {
          'public/lib/build.js': 'public/lib/build.js'
        }
      },
      main: {
        files: [
          {
            expand: true,
            cwd: 'client/public/',
            src: ['**/*.js'],
            dest: 'client/public/'
          }
        ]
      }
    },
    watch: {
      livereload: {
        options: {
          livereload: true
        },

        files: [
          'public/assets/main.css',
          'public/assets/**/*.js',
          'public/**/*.html'
        ]
      },
      jade: {
        files: ['client/src/**/*.jade'],
        tasks: ['jade:dev']
      },
      sass: {
        files: ['client/src/**/*.scss'],
        tasks: ['sass:dev']
      },
      js: {
        files: ['client/src/assets/scripts/**/*.js'],
        tasks: ['babel:dev']
      }

    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('build', [
    'clean',
    'copy',
    'babel:prod',
    'bower_concat',
    'jade:prod',
    'sass:prod',
    'uglify',
    'cssmin'
  ]);
  grunt.registerTask('build-dev', [
    'clean',
    'copy',
    'babel:dev',
    'bower_concat',
    'jade:dev',
    'sass:dev'
  ]);

  grunt.registerTask('serve', [
    'build-dev',
    'watch'
  ]);
};

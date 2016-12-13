'use strict';


module.exports = function(grunt) {

require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    // SASS converter
    sass: {
      options: {
        outputStyle: 'compressed',
        sourceMap: true
      },
      main: {
        files: {
          'stylesheets/css/style.css': 'stylesheets/sass/style.scss'
        }
      }
    },
    // Adding Autoprefixer
    postcss: {
        options: {
          map: true,
          processors: [
            require('autoprefixer')({browsers: 'last 4 versions'}), // add vendor prefixes
          ]
    },
    main: {
      src: 'stylesheets/css/style.css'
    }
    },
    // Convert px units to rem
    px_to_rem: {
        main: {
          options: {
            base: 16,
            fallback: false,
            fallback_existing_rem: true,
            ignore: ['border', 'border-top', 'border-right', 'border-bottom', 'border-left', 'hr', 'box-shadow', 'background'],
            map: true
          },
          files: {
            'stylesheets/css/style.css': 'stylesheets/css/style.css'
          }
        }
    },


    uglify: {
      main: {
        options: {
          mangle: {
            except: ['jQuery', 'Backbone']
          }
          // sourceMap: true,
          // sourceMapName: 'path/to/sourcemap.map'
        },
        files: {
          'js/script.min.js': ['js/script.js']
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      sass: {
        files: ['stylesheets/sass/style.scss', 'stylesheets/sass/**/*.scss', 'stylesheets/sass/***/**/*.scss'],
        tasks: ['buildcss']
      },
      grunt: {
        files: 'Gruntfile.js'
      },
    }

  });
  grunt.registerTask('default', []);
  grunt.registerTask('buildcss',  ['sass', 'postcss', 'px_to_rem']);
};
'use strict';

module.exports = function(grunt) {

	grunt.file.defaultEncoding = 'utf-8';

	// Project configuration.
	grunt.initConfig({
		dirs: {
            bower: 'bower_components',
			js: {
				src: 'JavaScript',
				dest: '../Public/JavaScript/Compiled'
			},
			sass: {
				src: 'Styles'
			}
		},
		compass: {
			dist: {
				options: {
					config: 'config.rb'
				}
			}
		},
		uglify: {
			dist: {
				src: [
					'<%= dirs.js.src %>/**/*.js'
				],
				dest: '<%= dirs.js.dest %>/main.js'
			}
		},
        concat: {
            dist: {
                src: [
                    '<%= dirs.bower %>/jquery/jquery.min.js',
                    '<%= dirs.bower %>/jquery.event.move/js/jquery.event.move.js',
                    '<%= dirs.bower %>/jquery.event.swipe/js/jquery.event.swipe.js'
                ],
                dest: '<%= dirs.js.dest %>/libs.min.js'
            }
        },
		watch: {
			sass: {
				files: ['<%= dirs.sass.src %>/**/*.scss'],
				tasks: 'compass'
			},
			scripts: {
				files: ['<%= dirs.js.src %>/**/*.js'],
				tasks: 'uglify'
			}
		}
	});

    // Load the plugin that provides the "concat" task.
    grunt.loadNpmTasks('grunt-contrib-concat');

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Load the plugin that provides the "watch" task.
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Load the plugin that provides the "compass" task.
	grunt.loadNpmTasks('grunt-contrib-compass');

	// Default task.
	grunt.registerTask('default', ['watch']);

	// Build task.
    grunt.registerTask('build', ['compass', 'uglify', 'concat']);
}

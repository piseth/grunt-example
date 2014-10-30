module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.initConfig({
		clean: {
			build: {
				src: ["Resources/Private/JavaScripts/Builds/*.js", "Resources/Public/Styles/finapp.css"]
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'Resources/Private/JavaScripts/Custom/*.js'
			]
		},

		watch: {
			libs: {
				files: ['Resources/Private/JavaScripts/Libs/*.js'],
				tasks: ['build']
			},
			js: {
				files: ['Resources/Private/JavaScripts/Custom/script.js'],
				tasks: ['build']
			},
			less: {
				files: ['Resources/Private/Styles/*.less'],
				tasks: ['build']
			}
		},

		less: {
			development: {
				files: {
					"Resources/Public/Styles/finapp.css": "Resources/Private/Styles/styles.less"
				}
			}
		},

		concat: {
			libs: {
				src: [
					'Resources/Private/JavaScripts/Libs/jquery.js',
					'Resources/Private/JavaScripts/Libs/bootstrap.js',
					'Resources/Private/JavaScripts/Libs/jquery.dataTables.js',
					'Resources/Private/JavaScripts/Libs/jquery.dataTables.bootstrap.js',
					'Resources/Private/JavaScripts/Libs/ace-extra.js',
					'Resources/Private/JavaScripts/Libs/ace.js'
				],
				dest: 'Resources/Private/JavaScripts/Builds/libs.js',
				options: {
					separator: ';'
				}
			},

			js: {
				src: [
					'Resources/Private/JavaScripts/Custom/*.js'
				],
				dest: 'Resources/Private/JavaScripts/Builds/javascripts.js'
			},

			jsConcat: {
				src: ['Resources/Private/JavaScripts/Builds/libs.js', 'Resources/Private/JavaScripts/Builds/javascripts.js'],
				dest: 'Resources/Public/JavaScripts/finapp.js',
				options: {
					separator: ';'
				}
			}
		},

		uglify: {
			js: {
				files: {
					'Resources/Public/JavaScripts/finapp.min.js': ['Resources/Public/JavaScripts/finapp.js']
				}
			}
		},

		cssmin: {
			minify: {
				src: 'Resources/Public/Styles/finapp.css',
				dest: 'Resources/Public/Styles/finapp.min.css'
			}
		}
	});
	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});

	grunt.registerTask('build', ['clean:build', 'less', 'concat','uglify', 'cssmin']);
	grunt.registerTask('default', ['build', 'watch']);
};
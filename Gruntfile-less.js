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
				src: ["Resources/Private/JavaScripts/Builds/*.js", "Resources/Private/Styles/Builds/*.css", "Resources/Public/Styles/*.css"]
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
				files: ['Resources/Private/JavaScripts/Custom/Custom.js'],
				tasks: ['build']
			},
			less: {
				files: ['Resources/Private/Styles/*.less'],
				tasks: ['build']
			},
			css: {
				files: ['Resources/Private/Styles/Custom/Custom.css'],
				tasks: ['build']
			}
		},

		less: {
			development: {
				files: {
					"Resources/Private/Styles/Builds/Styles.css": "Resources/Private/Styles/styles.less",
					"Resources/Private/Styles/Builds/Custom.css": "Resources/Private/Styles/Custom/*.css"
				}
			}
		},

		concat: {
			libs: {
				src: [
					'Resources/Private/JavaScripts/Libs/jquery-1.11.0.js',
					'Resources/Private/JavaScripts/Bootstrap/bootstrap.min.js',
					'Resources/Private/JavaScripts/Libs/cbpAnimatedHeader.js',
					'Resources/Private/JavaScripts/Bootstrap/jqBootstrapValidation.js',
					'Resources/Private/JavaScripts/Libs/classie.js.js',
					'Resources/Private/JavaScripts/Libs/jquery.dataTables.js',
					'Resources/Private/JavaScripts/Libs/freelancer.js',
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
				dest: 'Resources/Public/JavaScripts/LearnFlow.js',
				options: {
					separator: ';'
				}
			},

			cssConcat: {
				src: ['Resources/Private/Styles/Builds/Styles.css', 'Resources/Private/Styles/Builds/Custom.css'],
				dest: 'Resources/Public/Styles/LearnFlow.css',
				options: {
					separator: ''
				}
			}
		},

		uglify: {
			js: {
				files: {
					'Resources/Public/JavaScripts/LearnFlow.min.js': ['Resources/Public/JavaScripts/LearnFlow.js']
				}
			}
		},

		cssmin: {
			minify: {
				src: 'Resources/Public/Styles/LearnFlow.css',
				dest: 'Resources/Public/Styles/LearnFlow.min.css'
			}
		}
	});
	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});

	grunt.registerTask('build', ['clean:build', 'less', 'concat','uglify', 'cssmin']);
	grunt.registerTask('default', ['build', 'watch']);
};
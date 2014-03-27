module.exports = function(grunt) {

	require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
	var webpack = require("webpack");
	var webpackConfig = require("./webpack.config.js");

	grunt.initConfig({
		"webpack-dev-server": {
			options: {
				webpack: webpackConfig,
				publicPath: "/dist",
				contentBase: './'
			},
			start: {
				keepAlive: true,
				webpack: {
					devtool: "sourcemap",
					debug: true
				}
			}
		},
		watch: {
			sass: {
				files: ['src/css/**/*.scss'],
				tasks: ['sass:dev'],
				options: {
					spawn: false
				}
			}
		},
		sass: {
			dev: {
				options: {
					outputStyle: 'expanded',
					sourceComments: 'map'
				},
				files: { 'dist/main.css': 'src/css/main.scss' }
			}
		},
		exec: {
			docpad: {
				cmd: "docpad generate --env production"
			},
			clear_dist: {
				cmd: "rm -rf ./dist/"
			}
		},
		execute: {
			// TODO :: pass as a parameter into generate-meta.js 
			// TODO :: decide about the fork of the code
			// options: {
					// outputDir: '../../dist'
				// },
			modernizr: {
				src: ['./node_modules/modernizr/lib/generate-meta.js'],
			}
		},
		'gh-pages': {
			options: {
				base: 'dist'
			},
			src: ['**']
		}
	});

	grunt.registerTask("default", ["webpack-dev-server:start"]);
	grunt.registerTask("dist", ["exec:clear_dist", "exec:docpad"])

};

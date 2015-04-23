module.exports = function(grunt) {
  grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	bower: {
    	install: {
    	  options: {
    		layout:  'byComponent',
	        cleanTargetDir: false,
	        cleanBowerDir: false
	      }
		}
  	},
    compass: {
        dist: {
          options: {
            sassDir:'sass',
            cssDir: 'css',
            //environment: 'production'
          }
        }
    },
    uglify: {
      js:{
          files: {
          	'js/main.min.js': ['scripts/main.js']
          }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.registerTask('default', ['bower:install', 'compass', 'uglify']);
};
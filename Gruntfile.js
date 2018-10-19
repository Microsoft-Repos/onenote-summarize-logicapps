module.exports = function(grunt) {

  // Static Webserver
  grunt.loadNpmTasks('grunt-php');
  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    php: {
      dist: {
        options: {
          port: 5000,
          base: ".",
          keepalive: true,
        }
      }
    },
  });

  // Default task(s).
  grunt.registerTask("default", ["php"]);

};


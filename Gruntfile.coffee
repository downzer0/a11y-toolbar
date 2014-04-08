module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    coffee:
      options:
        bare: true
      dist:
        files:
          'js/a11y.js' : 'coffee/a11y.coffee'
    uglify:
      dist:
        files:
          "js/a11y.min.js": 'js/a11y.js'



  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-watch"


  grunt.registerTask "default", [
    "coffee"
    "uglify"
  ]
  return

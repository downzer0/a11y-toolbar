module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    scssFiles:
      "css/a11y-contrast.css" : "scss/a11y-contrast.scss"
      "css/a11y-fontsize.css" : "scss/a11y-fontsize.scss"
      "css/a11y.css" : "scss/a11y.scss"
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
    sass:
      dist:
        files: "<%=scssFiles %>"
        options:
          outputStyle: "compressed"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-sass"

  grunt.registerTask "default", [
    "coffee"
    "uglify"
  ]
  return

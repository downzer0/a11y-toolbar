module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    scssFiles:
      "css/a11y-contrast.css" : "scss/a11y-contrast.scss"
      "css/a11y-fontsize.css" : "scss/a11y-fontsize.scss"
      "css/a11y.css" : "scss/a11y.scss"
    browserify:
      options:
        transforms: ['coffeeify','browserify-shim']

      dist:
        files:
          'js/a11y.js' : 'coffee/a11y.coffee'
          'js/test.js' : 'coffee/test.coffee'
    uglify:
      dist:
        files:
          "js/a11y.min.js": 'js/a11y.js'
    sass:
      dist:
        files: "<%=scssFiles %>"
        options:
          outputStyle: "compressed"
  grunt.loadNpmTasks "grunt-browserify"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-sass"

  grunt.registerTask "default", [
    "browserify"
    "uglify"
    "sass"
  ]
  return

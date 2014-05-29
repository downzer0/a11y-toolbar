$ = require('jquery')
icon = require('./icon.html')
console.log('icon')
module.exports = (settings) ->
  DEFAULTS =
    assets: "/wp-content/themes/ui2011/a11y/"
    containerClasses: ["a11y-toolbar" ]
    btnClasses: []
    iconFont: {
      base: 'fa'
      font: 'fa-font'
      contrast: 'fa-adjust'
      tint: 'fa-tint'
    }
  conf = $.extend({}, DEFAULTS, settings )
  # Cookie handler, non-jQuery style
  createCookie = (name, value, days) ->
    if days
      date = new Date()
      date.setTime date.getTime() + (days * 24 * 60 * 60 * 1000)
      expires = "; expires=" + date.toGMTString()
    else
      expires = ""
    document.cookie = name + "=" + value + expires + "; path=/"
    return
  readCookie = (name) ->
    nameEQ = name + "="
    ca = document.cookie.split(";")
    i = 0

    while i < ca.length
      c = ca[i]
      c = c.substring(1, c.length)  while c.charAt(0) is " "
      return c.substring(nameEQ.length, c.length)  if c.indexOf(nameEQ) is 0
      i++
    null
  eraseCookie = (name) ->

    # createCookie(name, "", -1);
    createCookie name, ""
    return

  construcToolbar = (conf) ->
    # Prepend our toolbar to the left side of the page, right under <body>
    btnClasses = conf.btnClasses.join(' ')
    insert_a11y_toolbar = "<!-- a11y toolbar -->"
    insert_a11y_toolbar += "<menu type=\"toolbar\" role=\"menu\" class=\"a11y-toolbar #{conf.containerClasses.join(' ')}\" label=\"Style Selector\">"
    insert_a11y_toolbar += "<button type=\"button\" class=\"a11y-toggle-contrast toggle-contrast #{ btnClasses }\" id=\"is_normal_contrast\" accesskey=\"C\" title=\"Toggle High Contrast\"><span class=\"sr-only\">Toggle High Contrast</span><i class=\"icon icon-adjust\"></i></button>"
    insert_a11y_toolbar += "<button type=\"button\" class=\"a11y-toggle-grayscale toggle-grayscale #{ btnClasses } \" id=\"is_normal_color\" accesskey=\"S\" title=\"Toggle Grayscale\"><span class=\"sr-only\">Toggle Grayscale</span><i class=\"icon icon-tint\"></i></button>"
    insert_a11y_toolbar += "<button type=\"button\" class=\"a11y-toggle-fontsize toggle-fontsize #{ btnClasses }\" id=\"is_normal_fontsize\" accesskey=\"F\" title=\"Toggle Font Size\"><span class=\"sr-only\">Toggle Font Size</span><i class=\"icon icon-font\"></i></button>"
    insert_a11y_toolbar += "</menu>"
    insert_a11y_toolbar += "</div>"
    insert_a11y_toolbar += "<!-- // a11y toolbar -->"
    return insert_a11y_toolbar

  $(document).find("body").prepend construcToolbar(conf)

  # Saturation handler
  if readCookie("a11y-desaturated")
    $("head").append $("<link rel=\"stylesheet\" href=\"#{conf.assets}css/a11y-desaturate.css\" type=\"text/css\" id=\"desaturatedStylesheet\" />")
    $("#is_normal_color").attr("id", "is_grayscale").addClass "active"
  $(".toggle-grayscale").on "click", ->
    if $(this).attr("id") is "is_normal_color"
      $("head").append $("<link rel=\"stylesheet\" href=\"#{conf.assets}css/a11y-desaturate.css\" type=\"text/css\" id=\"desaturatedStylesheet\" />")
      $(this).attr("id", "is_grayscale").addClass "active"
      createCookie "a11y-desaturated", "1"
      false
    else
      $("#desaturatedStylesheet").remove()
      $(this).attr("id", "is_normal_color").removeClass "active"
      eraseCookie "a11y-desaturated"
      false


  # Contrast handler
  if readCookie("a11y-high-contrast")
    $("head").append $("<link rel=\"stylesheet\" href=\"#{conf.assets}css/a11y-contrast.css\" type=\"text/css\" id=\"highContrastStylesheet\" />")
    $("#is_normal_contrast").attr("id", "is_high_contrast").addClass "active"
    $(".a11y-toolbar ul li a i").addClass "icon-white"
  $(".toggle-contrast").on "click", ->
    if $(this).attr("id") is "is_normal_contrast"
      $("head").append $("<link rel=\"stylesheet\" href=\"#{conf.assets}css/a11y-contrast.css\" type=\"text/css\" id=\"highContrastStylesheet\" />")
      $(this).attr("id", "is_high_contrast").addClass "active"
      $(this).parent().parent().find("i").addClass "icon-white"
      createCookie "a11y-high-contrast", "1"
      false
    else
      $("#highContrastStylesheet").remove()
      $(this).attr("id", "is_normal_contrast").removeClass "active"
      $(this).parent().parent().find("i").removeClass "icon-white"
      eraseCookie "a11y-high-contrast"
      false


  # Fontisze handler
  if readCookie("a11y-larger-fontsize")
    $("head").append $("<link rel=\"stylesheet\" href=\"#{conf.assets}css/a11y-fontsize.css\" type=\"text/css\" id=\"largerFontsizeStylesheet\" />")
    $("#is_normal_fontsize").attr("id", "is_large_fontsize").addClass "active"
  $(".toggle-fontsize").on "click", ->
    if $(this).attr("id") is "is_normal_fontsize"
      $("head").append $("<link rel=\"stylesheet\" href=\"#{conf.assets}css/a11y-fontsize.css\" type=\"text/css\" id=\"largerFontsizeStylesheet\" />")
      $(this).attr("id", "is_large_fontsize").addClass "active"
      createCookie "a11y-larger-fontsize", "1"
      false
    else
      $("#largerFontsizeStylesheet").remove()
      $(this).attr("id", "is_normal_fontsize").removeClass "active"
      eraseCookie "a11y-larger-fontsize"
      false

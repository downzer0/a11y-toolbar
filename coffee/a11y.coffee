#
# * Chris Rodriguez
# * chris@inathought.com
# * Updated by kalamuna to generalize the settings
#

window.a11yToolbar = (settings) ->
  DEFAULTS =
    assets: "/wp-content/themes/ui2011/a11y/"
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

  # Prepend our jump-links to the very top of the page, right under <body>
  insert_a11y_links = "<!-- Accessibility links -->"
  insert_a11y_links += "<a class=\"a11y-jump-link\" href=\"#maincontent\">Skip to main content</a>"
  insert_a11y_links += "<a class=\"a11y-jump-link\" href=\"#search\">Skip to search</a>"
  insert_a11y_links += "<!-- // Accessibility links -->"

  # Prepend our toolbar to the left side of the page, right under <body>
  insert_a11y_toolbar = "<!-- a11y toolbar -->"
  insert_a11y_toolbar += "<div class=\"a11y-toolbar\">"
  insert_a11y_toolbar += "<ul>"
  insert_a11y_toolbar += "<li><a href=\"#\" tabindex=\"-1\" class=\"a11y-toggle-contrast toggle-contrast\" id=\"is_normal_contrast\" accesskey=\"C\" title=\"Toggle High Contrast\"><span class=\"offscreen\">Toggle High Contrast</span><i class=\"icon icon-adjust\"></i></a></li>"
  insert_a11y_toolbar += "<li><a href=\"#\" tabindex=\"-1\" class=\"a11y-toggle-grayscale toggle-grayscale\" id=\"is_normal_color\" accesskey=\"S\" title=\"Toggle Grayscale\"><span class=\"offscreen\">Toggle Grayscale</span><i class=\"icon icon-tint\"></i></a></li>"
  insert_a11y_toolbar += "<li><a href=\"#\" tabindex=\"-1\" class=\"a11y-toggle-fontsize toggle-fontsize\" id=\"is_normal_fontsize\" accesskey=\"F\" title=\"Toggle Font Size\"><span class=\"offscreen\">Toggle Font Size</span><i class=\"icon icon-font\"></i></a></li>"
  insert_a11y_toolbar += "</ul>"
  insert_a11y_toolbar += "</div>"
  insert_a11y_toolbar += "<!-- // a11y toolbar -->"
  $(document).find("body").prepend insert_a11y_toolbar
  $(document).find("body").prepend insert_a11y_links

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


  # Sets a -1 tabindex to ALL sections for .focus()-ing
  sections = document.getElementsByTagName("section")
  i = 0
  max = sections.length

  while i < max
    sections[i].setAttribute "tabindex", -1
    sections[i].className += " focusable"
    i++

  # If there is a '#' in the URL (someone linking directly to a page with an anchor), go directly to that area and focus is
  # Thanks to WebAIM.org for this idea
  if document.location.hash
    anchorUponArrival = document.location.hash
    setTimeout (->

      # $(anchorUponArrival).Scrollto({ duration: 1000 });
      $(anchorUponArrival).focus()
      return
    ), 100

  # Focuses on the correct section of the page if we're page linking
  # Thanks to WebAIM.org for this idea
  $("a[href^=\"#\"]").click (event) ->
    inPageAnchor = "#" + @href.split("#")[1]

    # $(inPageAnchor).ScrollTo({ duration: 1000 });
    setTimeout (->
      $(inPageAnchor).focus()
      return
    ), 100
    false


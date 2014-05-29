$ = require('jquery')


module.exports = (settings) ->
  DEFAULTS =
    assets: "/wp-content/themes/ui2011/a11y/"
    containerClasses: ["a11y-toolbar" ]
    btnClasses: []
    iconFont: {
      base: 'fa'
      fontsize: 'fa-font'
      contrast: 'fa-adjust'
      grayscale: 'fa-tint'
    }
    btnAttrs: {
      contrast: {
        id: 'is_normal_contrast'
        class: 'a11y-toggle-contrast toggle-contrast'
        accesskey:'C'
        title: 'Toggle High Contrast'
        'data-target': 'css/a11y-contrast.css'
      }
      grayscale: {
        id: 'is_normal_color'
        class: 'a11y-toggle-grayscale toggle-grayscale'
        accesskey:'S'
        title: 'Toggle Grayscale'
        'data-target': 'css/a11y-desaturate.css'
      }
      #<button type="button" class="a11y-toggle-fontsize toggle-fontsize #{ btnClasses }" id="is_normal_fontsize" accesskey="F" title="Toggle Font Size"></button>
      fontsize: {
        id: 'is_normal_fontsize'
        class: 'a11y-toggle-fontsize toggle-fontsize'
        accesskey:'S'
        title: 'Toggle Font Size'
        'data-target': 'a11y-larger-fontsize.css'
      }
    }
  conf = $.extend({}, DEFAULTS, settings )
  cookie = require('./cookiehandler.coffee')


  construcToolbar = (conf) ->

    toolbar = $(require('./toolbar.html'))
    for name, btnAtr of conf.btnAttrs
      btn = $('<button/>')
      btnAtr.class += conf.btnClasses.join(' ')
      btn.attr(
        btnAtr
      )
      btn.attr('type', 'button')
      btnIcon = require('./icon.html')
      btnIcon = $(btnIcon)
      $(btnIcon[0])
        .text(btnAtr.title)
      $(btnIcon[1])
        .attr(
          'class': "#{conf.iconFont.base} #{conf.iconFont[name]}"
        )

      toolbar.append(btn.append(btnIcon))
    return toolbar



  tb = construcToolbar(conf)

  $('body').prepend( tb )

  # Saturation handler
  if cookie.read("a11y-desaturated")
    $("head").append $("<link rel=\"stylesheet\" href=\"#{conf.assets}css/a11y-desaturate.css\" type=\"text/css\" id=\"desaturatedStylesheet\" />")
    $("#is_normal_color").attr("id", "is_grayscale").addClass "active"
  $(".toggle-grayscale").on "click", ->
    if $(this).attr("id") is "is_normal_color"
      $("head").append $("<link rel=\"stylesheet\" href=\"#{conf.assets}css/a11y-desaturate.css\" type=\"text/css\" id=\"desaturatedStylesheet\" />")
      $(this).attr("id", "is_grayscale").addClass "active"
      cookie.create "a11y-desaturated", "1"
      false
    else
      $("#desaturatedStylesheet").remove()
      $(this).attr("id", "is_normal_color").removeClass "active"
      cookie.erase "a11y-desaturated"
      false


  # Contrast handler
  if cookie.read("a11y-high-contrast")
    $("head").append $("<link rel=\"stylesheet\" href=\"#{conf.assets}css/a11y-contrast.css\" type=\"text/css\" id=\"highContrastStylesheet\" />")
    $("#is_normal_contrast").attr("id", "is_high_contrast").addClass "active"
    $(".a11y-toolbar ul li a i").addClass "icon-white"
  $(".toggle-contrast").on "click", ->
    if $(this).attr("id") is "is_normal_contrast"
      $("head").append $("<link rel=\"stylesheet\" href=\"#{conf.assets}css/a11y-contrast.css\" type=\"text/css\" id=\"highContrastStylesheet\" />")
      $(this).attr("id", "is_high_contrast").addClass "active"
      $(this).parent().parent().find("i").addClass "icon-white"
      cookie.create "a11y-high-contrast", "1"
      false
    else
      $("#highContrastStylesheet").remove()
      $(this).attr("id", "is_normal_contrast").removeClass "active"
      $(this).parent().parent().find("i").removeClass "icon-white"
      cookie.erase "a11y-high-contrast"
      false


  # Fontisze handler
  if cookie.read("a11y-larger-fontsize")
    $("head").append $("<link rel=\"stylesheet\" href=\"#{conf.assets}css/a11y-fontsize.css\" type=\"text/css\" id=\"largerFontsizeStylesheet\" />")
    $("#is_normal_fontsize").attr("id", "is_large_fontsize").addClass "active"
  $(".toggle-fontsize").on "click", ->
    if $(this).attr("id") is "is_normal_fontsize"
      $("head").append $("<link rel=\"stylesheet\" href=\"#{conf.assets}css/a11y-fontsize.css\" type=\"text/css\" id=\"largerFontsizeStylesheet\" />")
      $(this).attr("id", "is_large_fontsize").addClass "active"
      cookie.create "a11y-larger-fontsize", "1"
      false
    else
      $("#largerFontsizeStylesheet").remove()
      $(this).attr("id", "is_normal_fontsize").removeClass "active"
      cookie.erase "a11y-larger-fontsize"
      false

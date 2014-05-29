(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $, a11yToolbar;

$ = (window.jQuery);

a11yToolbar = function(settings) {
  var DEFAULTS, conf, construcToolbar, cookie, tb;
  DEFAULTS = {
    assets: "/wp-content/themes/ui2011/a11y/",
    containerClasses: ["a11y-toolbar"],
    btnClasses: [],
    iconFont: {
      base: 'fa',
      fontsize: 'fa-font',
      contrast: 'fa-adjust',
      grayscale: 'fa-tint'
    },
    btnAttrs: {
      contrast: {
        id: 'is_normal_contrast',
        "class": 'a11y-toggle-contrast toggle-contrast',
        accesskey: 'C',
        title: 'Toggle High Contrast',
        'data-target': 'css/a11y-contrast.css'
      },
      grayscale: {
        id: 'is_normal_color',
        "class": 'a11y-toggle-grayscale toggle-grayscale',
        accesskey: 'S',
        title: 'Toggle Grayscale',
        'data-target': 'css/a11y-desaturate.css'
      },
      fontsize: {
        id: 'is_normal_fontsize',
        "class": 'a11y-toggle-fontsize toggle-fontsize',
        accesskey: 'S',
        title: 'Toggle Font Size',
        'data-target': 'a11y-larger-fontsize.css'
      }
    }
  };
  conf = $.extend({}, DEFAULTS, settings);
  cookie = require('./cookiehandler.coffee');
  construcToolbar = function(conf) {
    var btn, btnAtr, btnIcon, name, toolbar, _ref;
    toolbar = $(require('./toolbar.html'));
    _ref = conf.btnAttrs;
    for (name in _ref) {
      btnAtr = _ref[name];
      btn = $('<button/>');
      btnAtr["class"] += conf.btnClasses.join(' ');
      btn.attr(btnAtr);
      btn.attr('type', 'button');
      btnIcon = require('./icon.html');
      btnIcon = $(btnIcon);
      $(btnIcon[0]).text(btnAtr.title);
      $(btnIcon[1]).attr({
        'class': "" + conf.iconFont.base + " " + conf.iconFont[name]
      });
      toolbar.append(btn.append(btnIcon));
    }
    return toolbar;
  };
  tb = construcToolbar(conf);
  $('body').prepend(tb);
  if (cookie.read("a11y-desaturated")) {
    $("head").append($("<link rel=\"stylesheet\" href=\"" + conf.assets + "css/a11y-desaturate.css\" type=\"text/css\" id=\"desaturatedStylesheet\" />"));
    $("#is_normal_color").attr("id", "is_grayscale").addClass("active");
  }
  $(".toggle-grayscale").on("click", function() {
    if ($(this).attr("id") === "is_normal_color") {
      $("head").append($("<link rel=\"stylesheet\" href=\"" + conf.assets + "css/a11y-desaturate.css\" type=\"text/css\" id=\"desaturatedStylesheet\" />"));
      $(this).attr("id", "is_grayscale").addClass("active");
      cookie.create("a11y-desaturated", "1");
      return false;
    } else {
      $("#desaturatedStylesheet").remove();
      $(this).attr("id", "is_normal_color").removeClass("active");
      cookie.erase("a11y-desaturated");
      return false;
    }
  });
  if (cookie.read("a11y-high-contrast")) {
    $("head").append($("<link rel=\"stylesheet\" href=\"" + conf.assets + "css/a11y-contrast.css\" type=\"text/css\" id=\"highContrastStylesheet\" />"));
    $("#is_normal_contrast").attr("id", "is_high_contrast").addClass("active");
    $(".a11y-toolbar ul li a i").addClass("icon-white");
  }
  $(".toggle-contrast").on("click", function() {
    if ($(this).attr("id") === "is_normal_contrast") {
      $("head").append($("<link rel=\"stylesheet\" href=\"" + conf.assets + "css/a11y-contrast.css\" type=\"text/css\" id=\"highContrastStylesheet\" />"));
      $(this).attr("id", "is_high_contrast").addClass("active");
      $(this).parent().parent().find("i").addClass("icon-white");
      cookie.create("a11y-high-contrast", "1");
      return false;
    } else {
      $("#highContrastStylesheet").remove();
      $(this).attr("id", "is_normal_contrast").removeClass("active");
      $(this).parent().parent().find("i").removeClass("icon-white");
      cookie.erase("a11y-high-contrast");
      return false;
    }
  });
  if (cookie.read("a11y-larger-fontsize")) {
    $("head").append($("<link rel=\"stylesheet\" href=\"" + conf.assets + "css/a11y-fontsize.css\" type=\"text/css\" id=\"largerFontsizeStylesheet\" />"));
    $("#is_normal_fontsize").attr("id", "is_large_fontsize").addClass("active");
  }
  return $(".toggle-fontsize").on("click", function() {
    if ($(this).attr("id") === "is_normal_fontsize") {
      $("head").append($("<link rel=\"stylesheet\" href=\"" + conf.assets + "css/a11y-fontsize.css\" type=\"text/css\" id=\"largerFontsizeStylesheet\" />"));
      $(this).attr("id", "is_large_fontsize").addClass("active");
      cookie.create("a11y-larger-fontsize", "1");
      return false;
    } else {
      $("#largerFontsizeStylesheet").remove();
      $(this).attr("id", "is_normal_fontsize").removeClass("active");
      cookie.erase("a11y-larger-fontsize");
      return false;
    }
  });
};

module.exports = a11yToolbar;


},{"./cookiehandler.coffee":2,"./icon.html":3,"./toolbar.html":4}],2:[function(require,module,exports){
module.exports = {
  create: function(name, value, days) {
    var date, expires;
    if (days) {
      date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  },
  read: function(name) {
    var c, ca, i, nameEQ;
    nameEQ = name + "=";
    ca = document.cookie.split(";");
    i = 0;
    while (i < ca.length) {
      c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
      i++;
    }
    return null;
  },
  erase: function(name) {
    return createCookie(name, "");
  }
};


},{}],3:[function(require,module,exports){
module.exports = '<span class="sr-only"></span><span aria-hidden="true"></span>\n' +
    '';
},{}],4:[function(require,module,exports){
module.exports = '<!-- a11y toolbar -->\n' +
    '<menu type="toolbar" role="menu" class="a11y-toolbar" label="Style Selector">\n' +
    '</menu>\n' +
    '<!-- // a11y toolbar -->\n' +
    '';
},{}]},{},[1])
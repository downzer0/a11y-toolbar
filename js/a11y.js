/*
 * Chris Rodriguez
 * chris@inathought.com
*/

// Cookie handler, non-jQuery style
function createCookie(name, value, days) {
	if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
	} else
	var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}
	
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}
	
function eraseCookie(name) {
	// createCookie(name, "", -1);
	createCookie(name, "");
}

// Prepend our jump-links to the very top of the page, right under <body>
var insert_a11y_links = '<!-- Accessibility links -->';
insert_a11y_links += '<a class="a11y-jump-link" href="#maincontent">Skip to main content</a>';
insert_a11y_links += '<a class="a11y-jump-link" href="#search">Skip to search</a>';
insert_a11y_links += '<!-- // Accessibility links -->';

// Prepend our toolbar to the left side of the page, right under <body>
var insert_a11y_toolbar = '<!-- a11y toolbar -->';
insert_a11y_toolbar += '<div class="a11y-toolbar">';
insert_a11y_toolbar += '<ul>';
insert_a11y_toolbar += '<li><a href="#" role="button" tabindex="-1" class="a11y-toggle-contrast toggle-contrast" id="is_normal_contrast" accesskey="C"><span class="offscreen">Toggle High Contrast</span><i class="icon icon-adjust" title="Toggle High Contrast"></i></a></li>';
insert_a11y_toolbar += '<li><a href="#" role="button" tabindex="-1" class="a11y-toggle-grayscale toggle-grayscale" id="is_normal_color" accesskey="S"><span class="offscreen">Toggle Grayscale</span><i class="icon icon-tint" title="Toggle Grayscale"></i></a></li>';
insert_a11y_toolbar += '<li><a href="#" role="button" tabindex="-1" class="a11y-toggle-fontsize toggle-fontsize" id="is_normal_fontsize" accesskey="F"><span class="offscreen">Toggle Font Size</span><i class="icon icon-font" title="Toggle Font Size"></i></a></li>';
insert_a11y_toolbar += '</ul>';
insert_a11y_toolbar += '</div>';
insert_a11y_toolbar += '<!-- // a11y toolbar -->';

$(document).find('body').prepend(insert_a11y_toolbar);
$(document).find('body').prepend(insert_a11y_links);

// Saturation handler
if (readCookie('a11y-desaturated')) {
	$('head').append($('<link rel="stylesheet" href="/wp-content/themes/ui2011/a11y/css/a11y-desaturate.css" type="text/css" id="desaturatedStylesheet" />'));
	$('#is_normal_color').attr('id', 'is_grayscale').attr('aria-checked', 'true').addClass('active');
}

$('.toggle-grayscale').on('click', function() {
	if ($(this).attr('id') == "is_normal_color") {
		$('head').append($('<link rel="stylesheet" href="/wp-content/themes/ui2011/a11y/css/a11y-desaturate.css" type="text/css" id="desaturatedStylesheet" />'));
	    $(this).attr('id', 'is_grayscale').attr('aria-checked', 'true').addClass('active');
	    createCookie('a11y-desaturated', '1');
	    return false;
	} else {
		$('#desaturatedStylesheet').remove();
	    $(this).attr('id', 'is_normal_color').removeAttr('aria-checked').removeClass('active');
	    eraseCookie('a11y-desaturated');
	    return false;
	}
});

// Contrast handler
if (readCookie('a11y-high-contrast')) {
	$('head').append($('<link rel="stylesheet" href="/wp-content/themes/ui2011/a11y/css/a11y-contrast.css" type="text/css" id="highContrastStylesheet" />'));
	$('#is_normal_contrast').attr('id', 'is_high_contrast').attr('aria-checked', 'true').addClass('active');
	$('.a11y-toolbar ul li a i').addClass('icon-white');
}

$('.toggle-contrast').on('click', function() {
	if ($(this).attr('id') == "is_normal_contrast") {
		$('head').append($('<link rel="stylesheet" href="/wp-content/themes/ui2011/a11y/css/a11y-contrast.css" type="text/css" id="highContrastStylesheet" />'));
	    $(this).attr('id', 'is_high_contrast').attr('aria-checked', 'true').addClass('active');
	    $(this).parent().parent().find('i').addClass('icon-white');
	    createCookie('a11y-high-contrast', '1');
	    return false;
	} else {
		$('#highContrastStylesheet').remove();
	    $(this).attr('id', 'is_normal_contrast').removeAttr('aria-checked').removeClass('active');
	    $(this).parent().parent().find('i').removeClass('icon-white');
	    eraseCookie('a11y-high-contrast');
	    return false;
	}
});

// Fontisze handler
if (readCookie('a11y-larger-fontsize')) {
	$('head').append($('<link rel="stylesheet" href="/wp-content/themes/ui2011/a11y/css/a11y-fontsize.css" type="text/css" id="largerFontsizeStylesheet" />'));
	$('#is_normal_fontsize').attr('id', 'is_large_fontsize').attr('aria-checked', 'true').addClass('active');
}

$('.toggle-fontsize').on('click', function() {
	if ($(this).attr('id') == "is_normal_fontsize") {
		$('head').append($('<link rel="stylesheet" href="/wp-content/themes/ui2011/a11y/css/a11y-fontsize.css" type="text/css" id="largerFontsizeStylesheet" />'));
	    $(this).attr('id', 'is_large_fontsize').attr('aria-checked', 'true').addClass('active');
	    createCookie('a11y-larger-fontsize', '1');
	    return false;
	} else {
		$('#largerFontsizeStylesheet').remove();
	    $(this).attr('id', 'is_normal_fontsize').removeAttr('aria-checked').removeClass('active');
	    eraseCookie('a11y-larger-fontsize');
	    return false;
	}
});

// Sets a -1 tabindex to ALL sections for .focus()-ing
var sections = document.getElementsByTagName("section");
for (var i = 0, max = sections.length; i < max; i++) {
	sections[i].setAttribute('tabindex', -1);
	sections[i].className += ' focusable';
}

// If there is a '#' in the URL (someone linking directly to a page with an anchor), go directly to that area and focus is
// Thanks to WebAIM.org for this idea
if (document.location.hash) {
	var anchorUponArrival = document.location.hash;
	setTimeout(function() {
		// $(anchorUponArrival).Scrollto({ duration: 1000 });
		$(anchorUponArrival).focus();
	}, 100);
}

// Focuses on the correct section of the page if we're page linking
// Thanks to WebAIM.org for this idea
$('a[href^="#"]').click(function(event) {
	var inPageAnchor = "#" + this.href.split('#')[1];
	// $(inPageAnchor).ScrollTo({ duration: 1000 });
	setTimeout(function() {
		$(inPageAnchor).focus();
	}, 100);
	return false;
});
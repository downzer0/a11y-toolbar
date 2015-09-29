/*
 * Chris Rodriguez
 * github@chrisrodriguez.me
*/

// Cookie handler, non-jQuery style
function createCookie(name, value, days) {
    var expires = '';

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
    }

    document.cookie = name + '=' + value + expires + '; path=/';
}

function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }

    return null;
}

function eraseCookie(name) {
    createCookie(name, '');
}

// Prepend our toolbar to the left side of the page, right under <body>
var insert_a11y_toolbar = '<!-- a11y toolbar -->';
insert_a11y_toolbar += '<ul class="a11y-toolbar">';
insert_a11y_toolbar += '<li class="a11y-item"><button class="a11y-control a11y-fontsize" aria-pressed="false"><span class="icon-fallback-img"><span class="icon icon-fontsize" aria-hidden="true"></span><span class="text">Toggle larger font size</span></span></button></li>';
insert_a11y_toolbar += '<li class="a11y-item"><button class="a11y-control a11y-contrast" aria-pressed="false"><span class="icon-fallback-img"><span class="icon icon-contrast" aria-hidden="true"></span><span class="text">Toggle high contrast mode</span></span></button></li>';
insert_a11y_toolbar += '<li class="a11y-item"><button class="a11y-control a11y-saturation" aria-pressed="false"><span class="icon-fallback-img"><span class="icon icon-saturation" aria-hidden="true"></span><span class="text">Toggle grayscale</span></span></button></li>';
insert_a11y_toolbar += '</ul>';
insert_a11y_toolbar += '<!-- // a11y toolbar -->';

$(document).find('body').prepend(insert_a11y_toolbar);

// Saturation handler
if (readCookie('a11y-desaturated')) {
    $('head')
        .append($('<link rel="stylesheet" href="../lib/css/a11y-desaturate.css" type="text/css" id="desaturatedStylesheet" />'));

    $('.a11y-toolbar .a11y-saturation')
        .attr('aria-pressed', 'true')
        .addClass('is-active');
}

$('.a11y-saturation').on('click', function(event) {
    // console.log('grayscale clicked');
    var el = event.currentTarget;

    event.preventDefault();

    if ($(el).hasClass('is-active')) {
        $('#desaturatedStylesheet').remove();

        $(el)
            .removeClass('is-active')
            .attr('aria-pressed', 'false');

        eraseCookie('a11y-desaturated');

    } else {
        $('head')
            .append($('<link rel="stylesheet" href="../lib/css/a11y-desaturate.css" type="text/css" id="desaturatedStylesheet" />'));

        $(el)
            .attr('aria-checked', 'true')
            .addClass('is-active');

        createCookie('a11y-desaturated', '1');
    }
});

// Contrast handler
if (readCookie('a11y-high-contrast')) {
    $('head')
        .append($('<link rel="stylesheet" href="../lib/css/a11y-contrast.css" type="text/css" id="highContrastStylesheet" />'));

    $('.a11y-toolbar .a11y-contrast')
        .attr('aria-pressed', 'true')
        .addClass('is-active');

    $('.a11y-toolbar')
        .addClass('high-contrast');
}

$('.a11y-contrast').on('click', function(event) {
    // console.log('contrast clicked');
    var el = event.currentTarget;

    event.preventDefault();

    if ($(el).hasClass('is-active')) {
        $('#highContrastStylesheet').remove();

        $(el)
            .removeClass('is-active')
            .attr('aria-pressed', 'false');

        $('.a11y-toolbar')
            .removeClass('high-contrast');

        eraseCookie('a11y-high-contrast');

    } else {
        $('head')
            .append($('<link rel="stylesheet" href="../lib/css/a11y-contrast.css" type="text/css" id="highContrastStylesheet" />'));

        $(el)
            .attr('aria-pressed', 'true')
            .addClass('is-active');

        $('.a11y-toolbar')
            .addClass('icon-white');

        createCookie('a11y-high-contrast', '1');
    }
});

// Fontisze handler
if (readCookie('a11y-larger-fontsize')) {
    $('head')
        .append($('<link rel="stylesheet" href="../lib/css/a11y-fontsize.css" type="text/css" id="largerFontsizeStylesheet" />'));

    $('.a11y-toolbar .a11y-fontsize')
        .attr('aria-pressed', 'true')
        .addClass('is-active');
}

$('.a11y-fontsize').on('click', function(event) {
    // console.log('font size clicked');
    var el = event.currentTarget;

    event.preventDefault();

    if ($(el).hasClass('is-active')) {
        $('#largerFontsizeStylesheet').remove();

        $(el)
            .removeClass('is-active')
            .attr('aria-pressed', 'false');

        eraseCookie('a11y-larger-fontsize');

    } else {
        $('head')
            .append($('<link rel="stylesheet" href="../lib/css/a11y-fontsize.css" type="text/css" id="largerFontsizeStylesheet" />'));

        $(el)
            .attr('aria-pressed', 'true')
            .addClass('is-active');

        createCookie('a11y-larger-fontsize', '1');
    }
});

var A11yToolbar = function() {
    
    var _contrast = 'contrast',
        _desaturate = 'desaturate',
        _fontsize = 'fontsize';
    
    return {
        
        init: function() {
            A11yToolbar.setInitialState();
            A11yToolbar.buildToolbar();
            A11yToolbar.listener();
        },
        
        createCookie: function(name, value, days) {
            var expires = '',
                date;

            if (days) {
                date = new Date();

                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toGMTString();
            }
            document.cookie = name + '=' + value + expires + '; path=/';
        },
        
        readCookie: function(name) {
            var nameEQ = name + '=',
                ca = document.cookie.split(';'),
                c;

            for (var i = 0; i < ca.length; i++) {
                c = ca[i];

                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }

                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return null;
        },
        
        eraseCookie: function(name) {
            A11yToolbar.createCookie(name, '');
        },
        
        setInitialState: function() {
            var button;

            if (A11yToolbar.readCookie(_contrast)) {
                button = $('.a11y-toolbar .a11y-control[data-a11y="' + _contrast + '"]');
                
                A11yToolbar.setActiveState(button, 'true', _contrast);
            }
            
            if (A11yToolbar.readCookie(_desaturate)) {
                button = $('.a11y-toolbar .a11y-control[data-a11y="' + _desaturate + '"]');
                
                A11yToolbar.setActiveState(button, 'true', _desaturate);
            }
            
            if (A11yToolbar.readCookie(_fontsize)) {
                button = $('.a11y-toolbar .a11y-control[data-a11y="' + _fontsize + '"]');
                
                A11yToolbar.setActiveState(button, 'true', _fontsize);
            }
        },
        
        buildToolbar: function() {
            var toolbar = [
                '<!-- a11y toolbar : github.com/clrux/a11y-toolbar -->',
                '<div class="a11y-toolbar" role="region" aria-label="Accessibility Tools">',
                    '<ul>',
                        '<li>',
                            '<button type="button" class="a11y-control" data-a11y="' + _contrast + '" aria-pressed="false" title="Toggle high contrast">',
                                '<span class="a11y-icon icon-contrast" aria-hidden="true"></span>',
                            '</button>',
                        '</li>',
                        '<li>',
                            '<button type="button" class="a11y-control" data-a11y="' + _desaturate + '" aria-pressed="false" title="Toggle grayscale">',
                                '<span class="a11y-icon icon-grayscale" aria-hidden="true"></span>',
                            '</button>',
                        '</li>',
                        '<li>',
                            '<button type="button" class="a11y-control" data-a11y="' + _fontsize + '" aria-pressed="false" title="Toggle larger font size">',
                                '<span class="a11y-icon icon-fontsize" aria-hidden="true"></span>',
                            '</button>',
                        '</li>',
                    '</ul>',
                '</div>',
                '<!-- end a11y toolbar -->'
            ].join(' ');
            
            $('body')
                .addClass('has-a11y-toolbar')
                .prepend(toolbar);
        },
        
        buttonIsActive: function(button) {
            var attr = $(button).attr('aria-pressed');
            
            if (attr == 'true') {
                return true;
            }

            return false;
        },
        
        setActiveState: function(button, state, mode) {
            $(button).attr('aria-pressed', state);
            
            A11yToolbar.updateBodyClass(mode, state);
        },
        
        updateBodyClass: function(mode, state) {
            if (state == 'false') {
                $('body').removeClass('a11y-' + mode);
            } else {
                $('body').addClass('a11y-' + mode);
            }
        },
        
        listener: function() {
            $('.a11y-toolbar')
            
            .on('click', '.a11y-control', function(event) {
                var button = $(event.currentTarget),
                    mode = $(button).data('a11y');
                
                if (A11yToolbar.buttonIsActive(button)) {
                    A11yToolbar.setActiveState(button, 'false', mode);
                    A11yToolbar.eraseCookie(mode);
                } else {
                    A11yToolbar.setActiveState(button, 'true', mode);
                    A11yToolbar.createCookie(mode, 'true', 7);
                }
            })
            
            .on('keydown', '.a11y-control', function(event) {
                var key = event.which,
                    button = $(event.currentTarget),
                    mode = $(button).data('a11y');
                
                if (key === 13 || key === 32) {
                    
                    if (A11yToolbar.buttonIsActive(button)) {
                        A11yToolbar.setActiveState(button, 'false', mode);
                        A11yToolbar.eraseCookie(mode);
                    } else {
                        A11yToolbar.setActiveState(button, 'true', mode);
                        A11yToolbar.createCookie(mode, 'true', 7);
                    }
                    
                    return false;
                } else {
                    return true;
                }
            });
        }    
    };

}();

A11yToolbar.init();

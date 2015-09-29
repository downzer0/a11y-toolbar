# a11y (accessibility) toolbar

## Goals
* Subtle, yet noticeable; easy to use
* Minimally "designed" so that anyone and everyone can and will want to use it on their site, blog, ecommerce, etc.
* Doesn't change existing site layout, but will enhance readability when used
* Semantic; assistive technology and keyboard accessible

## Known issues (things in-progress)

* Only Firefox and Webkit browsers can desaturate
* Sometimes the styles of a website might take precedence over styles for the toolbar; I'm trying to avoid using `!importants`
* There's an edge-case issue where users who specify their own fonts or disallow sites to use their respective stylesheets, the icon fonts won't load. I'm working on an accessible fallback approach taking cues from [The Filament Group](https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html).

## Todos

* The JS file has fixed paths that should be edited per site.
* Continue to explore accessible fallback options (that aren't necessarily image-based) for when the stylesheet isn't available.

## Pull Requests and contributions

Contributions are welcome! Please submit a pull request to make this plugin better. And thank you in advance!

### Contributors

* [Chris Rodriguez (author)](https://github.com/clrux)
* [Patrick H. Lauke](https://github.com/patrickhlauke)
* [Steven Bassett](https://github.com/bassettsj)
* [XhmikosR](https://github.com/XhmikosR)

## License

This file is part of the a11y toolbar.

The a11y toolbar is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

The a11y toolbar is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with the a11y toolbar.  If not, see <http://www.gnu.org/licenses/>.

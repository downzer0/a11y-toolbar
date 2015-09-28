# a11y (accessibility) toolbar

## Goals
* Subtle, yet noticeable; easy to use
* Minimally "designed" so that anyone and everyone can and will want to use it on their site, blog, ecommerce, etc.
* Doesn't change existing site layout, but will enhance readability when used
* Semantic; assistive technology and keyboard accessible

## Known issues (things in-progress)

* Only Firefox and Webkit browsers can desaturate
* ~~There are tiny shifts in the sizes of the icons when the font size is increased~~
* Sometimes the styles of a website might take precedence over styles for the toolbar
* The skip link currently looks for a specific ID; I'd like to make it more relative, perhaps by skipping to HTML5's `role='main'` instead


## Todos

* Skip links are currently `display: none`, which hides them from screen readers. Make them off-screen instead so they can be used. (Thanks Joe)
* JS files must be edited per domain, but I'm planning on making these "settings" externalized.

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

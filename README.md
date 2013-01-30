<h1>a11y (accessibility) toolbar</h1>

<h3>Goals</h3>
<ul>
	<li>Subtle, yet noticeable; easy to use</li>
	<li>Minimally "designed" so that anyone and everyone can and will want to use it on their site, blog, ecommerce, etc.</li>
	<li>Doesn't change existing site layout, but will enhance readability when used</li>
	<li>Semantic; assistive technology and keyboard accessible</li>
</ul>

<h3>Known issues (things in-progress)</h3>
<ul>
	<li>Only Firefox and Webkit browsers can desaturate</li>
	<li><strike>There are tiny shifts in the sizes of the icons when the font size is increased</strike></li>
	<li>Sometimes the styles of a website might take precedence over styles for the toolbar</li>
	<li>The skip link currently looks for a specific ID; I'd like to make it more relative, perhaps by skipping to HTML5's role='main' instead</li>
</ul>

<h3>Todos</h3>
<ul>
        <li>Skip links are currently display: none, which hides them from screen readers. Make them off-screen instead so they can be used. (Thanks Joe)</li>
        <li>JS files must be edited per domain, but I'm planning on making these "settings" externalized.</li>
</ul>

<h3>License</h3>
<p>
    This file is part of the a11y toolbar.
</p>

<p>
    The a11y toolbar is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
</p>

<p>
    The a11y toolbar is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
</p>

<p>
    You should have received a copy of the GNU General Public License
    along with the a11y toolbar.  If not, see <http://www.gnu.org/licenses/>. 
</p>

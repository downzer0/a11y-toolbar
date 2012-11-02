a11y
====

Custom accessibility toolbar


I'd like to introduce you to a new project I'm working on, which I'd like to contribute to the Internet community. Additionally, I've made it open source so that anyone can help make it better. I call it the a11y toolbar and you can see it floating on the left of this site.

It's three (perhaps more in the future) buttons that allow my readers to view any site in high contrast (the top button), grayscale (the middle button) which helps those readers that have difficulties differentiating colors, and increase the size of the screen text (the bottom button). I've designed it to be minimally invasive so web designers and developers will be more open to including it on their sites, simple enough so that it doesn't demand attention and focus, yet in a place that's in the readers periphery. It's designed to be there, but not there if that makes sense.

The package consists of a few stylesheets, three of which are injected/removed into the DOM when the buttons are pressed that handle all of the styling functionality, a few images for the icons, and a fairly simple JavaScript file that handles all the overhead stuff. It requires jQuery and the scrollto plugin by Ariel Flesler (also included) because in addition to allowing you to manage the look of the site, it also creates a skip link at the top of the page that is shown at first tab.

I've not done extensive testing on this yet, mainly a few things at work and this blog, the latter of which is the first to go public and see widespread use, but my goal is to get the ball rolling and get other developers involved to create a really functional, good looking, minimally invasive toolbar that anyone can include on their site or application that extends accessibility for all users.

Some known issues

I'm aware of a few bugs that I'm working on:

Firefox doesn't desaturate
There are tiny shifts in the sizes of the icons when the font size is increased
Sometimes the styles of a website might take precedence over styles for the toolbar
The skip link currently looks for a specific ID; I'd like to make it more relative, perhaps by skipping to HTML5's role='main' instead

+++
title = "PatternFly Elements color palette"
description = ""
weight = 3
draft = false
bref = ""
toc = true
menu = "theme"
tags = [ "theme" ]
+++


Looking for values fast? You can find a <a href="https://github.com/patternfly/patternfly-elements/blob/master/elements/pfe-sass/variables/_colors.scss" target="_blank">list of all the system colors here</a>.

## UI Colors

A user interface uses color to convey:

 - Feedback: Error and success states
 - Information: Charts, graphs, and wayfinding elements
 - Hierarchy: Showing structured order through color and typography

We've exposed 3 color variants for this design system to represent your brand:

 - Base
 - Complement
 - Accent

These colors are used throughout PatternFly Elements, but **accent is the color which should stand out the most**. For example, if your brand colors are navy, orange, and medium gray, you'll want to set orange as the accent color. You'll see it appear on primary level call-to-action buttons and other elements that need to have more weight in the visual heirarchy of the page.

If you are overriding these colors, you can do so by setting the CSS variables to have new values in the stylesheet of your page or app, like this:

```css
:root {
  --pfe-color--ui-base:               #030070;
  --pfe-color--ui-base--hover:        #010047;
  --pfe-color--ui-base--text:         #ffffff;
  --pfe-color--ui-base--text--hover:  #eeeeee;
}
```

UI colors are meant to provide basic colors for ubiquitous page elements like links and body text. You may choose to set the value of a link color to something in your brand, but it is not required, and these colors should provide a good user experience. Pick colors that provide a good user experience, e.g. color contrast.


## Surface Colors

It's also a good idea to choose some neutral colors for general UI backgrounds and borders—usually grays. Surface color encompass any "surface" that are typically part of container-type elements, like cards or bands. These colors should be harmonious with your corporate style guide (if you have one), but they may not necessarily be your company’s primary brand colors. 

```css
:root {
    --pfe-color--surface--base:                      #ccc;
    --pfe-color--surface--base--text:                #000;
    --pfe-color--surface--base--link:                #00538c; 
    --pfe-color--surface--base--link--visited:       #7551a6 !default;
    --pfe-color--surface--base--link--hover:         #00305b !default;
    --pfe-color--surface--base--link--focus:         #00305b !default;
}
```


## Feedback Colors

And finally, you’ll have colors for states such as error, warning, and success. Group these colors to see how well they work together and refine as needed.

```css
:root {
    --pfe-color--feedback--critical:                 $pfe-color--red-600 !default;
    --pfe-color--feedback--critical--lightest:       $pfe-color--red-50 !default;
    --pfe-color--feedback--critical--darkest:        $pfe-color--red-800 !default;
}
```


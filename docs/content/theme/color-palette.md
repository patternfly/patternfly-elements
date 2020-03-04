+++
title = "Colors"
description = ""
weight = 3
draft = false
bref = ""
toc = true
menu = "theme"
tags = [ "theme" ]
+++


*[Skip to this page](/theme/_2_theme-palette/) if you are looking for a list of all the system variables.*


# Color Theory


## Text & links

Text and links are the most fundamental pieces of any web property, so they have their own variables aside from other UI elements. They also respond to context, such as a bit of text in a dark gray card would need to change to white. Or a link in a dark gray card would need to become a lighter shade of blue.  Here are a few examples:

```
  --pfe-theme--color--text: #151515;
  --pfe-theme--color--text--on-saturated: #eee;
  --pfe-theme--color--link: #0066cc;
  --pfe-theme--color--link--hover: #004080;
  --pfe-theme--color--link--focus--on-dark: #2b9af3;
  --pfe-theme--color--link--visited--on-saturated: #ffffff;
  ```

## UI Colors

A user interface uses color to convey:

 - **Feedback**: Error and success states
 - **Information**: Charts, graphs, and wayfinding elements
 - **Hierarchy**: Showing structured order through color and typography

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

UI colors are meant to provide basic colors for other page elements besides links and body text. You may choose to set the value of a link color to something in your brand, but it is not required, and these colors should provide a good user experience. 


## Surface Colors

It's also a good idea to choose some neutral colors for general UI backgrounds and borders—usually grays. Surface color encompass any "surface" that are typically part of container-type elements, like cards or bands. These colors should be harmonious with your corporate style guide (if you have one), but they may not necessarily be your company’s primary brand colors. 

We've exposed 7 color variants for this design system to represent your brand:

 - Lightest
 - Lighter
 - Base
 - Darker
 - Darkest
 - Complement
 - Accent

All components automatically observe and react to the attribute `on` which can equal 1 of 3 possible contexts:

- `light`
- `dark`
- `saturated`

This can be overriden by manually applying the `pfe-theme` attribute with one of the following values:

- `light`
- `dark`
- `saturated`

@TODO

Here's an example of colors from a theme, alongside the named version of the appropriate theme variable.

```css
:root {
  --pfe-theme--color--surface--lighter: #f0f0f0;
  --pfe-theme--color--surface--lighter--theme: light;
  --pfe-theme--color--surface--darkest: #1a1a1a;
  --pfe-theme--color--surface--darkest--theme: dark;
  --pfe-theme--color--surface--accent: #ee0000;
  --pfe-theme--color--surface--accent--theme: saturated;
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


+++
title = "Create a themed PatternFly Element"
description = ""
weight = 2
draft = false
bref = ""
toc = true
menu = "theme"
tags = [ "theme" ]
+++


When applying colors to your new component, it's important to reference CSS variables from the <a href="https://github.com/patternfly/patternfly-elements/blob/master/elements/pfe-sass/variables/_colors.scss" target="_blank">PatternFly Elements palette</a>. This way people using the components will be able to update all of them at once by changing the value of those palette variables.

It's also important for all CSS variables to have fallback values, but then the code can become difficult to read and manage, since you now must input two colors (the variable of choice and the fallback):

```css
.pfe-sad-component {
    color:              var(--pfe-theme--color--ui-link, #99ccff);
    background-color:  var(--pfe-theme--color--ui-accent, #fe460d);
}
```

## pfe-var function

To remedy this, there is a special function within pfe-sass that makes it easier to apply color to components! When you make use of it, be sure to wrap it in the interpolation syntax `#{ }` so that when the Sass is compiled, it will print the CSS variable name and a hex color fallback. You can also omit the `pfe-color--` from the beginning of the color for simplicity's sake:

```css
.pfe-happy-component {
    color:             #{pfe-var( ui-complement )};
    backgground-color: #{pfe-var( surface--lightest )};
}
```

## Local component variables

In some cases, like the CTA (call-to-action) component, you might need to define a background color and a text color, as well as hover, focus, and visited states. That's a lot of colors! For this reason, it might be useful to create local variables for that particular component, and then redefine the values when different attributes come into play. Let's see an example, noticing the usage of the `pfe-var` function:


```css
:host {
    --pfe-cta--main:                     #{pfe-var( ui-link )};
    --pfe-cta--main--hover:              #{pfe-var( ui-link--hover )};
    --pfe-cta--main--focus:              #{pfe-var( ui-link--focus )};
    --pfe-cta--main--visited:            #{pfe-var( ui-link--visited )};
    --pfe-cta--aux:                      transparent;
    --pfe-cta--aux--hover:               transparent;
}

```

The CTA component CSS will make use of these variables by setting the link color using `pfe-cta--main` and the background color of the button using `pfe-cta--aux`, like so:

```css
::slotted(a) {
    border-color: var( --pfe-cta--main );
    background:   var( --pfe-cta--main );
    color:        var( --pfe-cta--aux );
}
```

Because the CTA component allows for palette color overrides such as `pfe-color="completement"`, it will simply reset the value of these local variables to match those of the palette variables. That way when someone using this component adds the attribute `pfe-color="complement"`to the CTA, the completement color is applied. These properties are also marked as important so that they always win over other condidions such as `on="dark"`.

```css
:host([pfe-color="complement"]) {
    --pfe-cta--main:        #{pfe-var( ui-complement )} !important;
    --pfe-cta--main--hover: #{pfe-var( ui-complement--hover )} !important;
    --pfe-cta--aux:         #{pfe-var( ui-complement--text )} !important;
    --pfe-cta--aux--hover:  #{pfe-var( ui-complement--text--hover )} !important;
}
```



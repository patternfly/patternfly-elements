+++
title = "Non-supported browsers"
description = ""
weight = 9
draft = true
bref = ""
toc = true
menu = "theme"
tags = [ "theme" ]
+++


## Microsoft Internet Explorer 11

This is an attempt to document the things that usually go sideways with IE11.

* Using the CSS property `:focus-within` breaks the styles polyfill (ShadyCSS) but you won't see any helpful messages in the rendered page. It will just fail to load entirely.

* The IE11 polyfill can interpret nested variables, but only on the host:

    ```css
    :host {
       padding: var(--ie-fake-var, var(--another, 1em));
    }
    ```

   will result in:

    ```css
    .pfe-cta-1 {
        padding: 1em;
    }
    ```

    You can override either of the two provided variables, `--ie-fake-var` or `--another`.

* IE11 will ignore slotted styles, it doesnt matter if you style it with `::slotted()`, `slot::slotted()` or even if you add a class to the children with JavaScript & try to style that. IE11 ignores all of it because of how it is restructuring the DOM using ShadyDOM.

## Safari

@TODO: Add some notes here on nuances with Safari

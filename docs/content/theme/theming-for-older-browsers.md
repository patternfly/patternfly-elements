+++
title = "Non-Supported Browsers"
description = ""
weight = 9
draft = true
bref = ""
toc = true
menu = "theme"
tags = [ "theme" ]
+++

# Non-Supported Browsers



## Microsoft Edge

Though modern, Edge still does not support Shadow DOM... @TODO


## Microsoft Internet Explorer 11 

This is an attempt to document the things that usually go sideways with IE11.

	<!-- TODO inline image-->

* Using the CSS property `:focus-within` breaks the styles polyfill  


* The IE11 polyfill can interpret nested vars, but only on the host: 

    ```
    :host {
       padding: var(--ie-fake-var, var(--another, 1em));
    }
    ```

   will result in  
 
	```
	.pfe-cta-1 {
	    padding: 1em;
	}
	```

    and you can override either of those variables!

2. IE11 will ignore slotted styles, it doesnt matter if you style it with `::slotted()` `slot::slotted()` or even if you add a class to the children with JavaScript & try to style that. IE11 ignores all of it.

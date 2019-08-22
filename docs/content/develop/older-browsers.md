
## Ie11


<!-- inline image-->

:focus-within breaks the styles polyfill  :( 

**IE11 polyfill**



1.  can interpret nested vars, but only on the host: 

    ```
    :host {
       padding: var(--ie-fake-var, var(--another, 1em));
    }
    ```



    Results in  
 
```
.pfe-cta-1 {
      padding: 1em;
}
```



    And you can override either of those variables!

2. It will ignore slotted styles, it doesnt matter if you style it with ::slotted() slot::slotted() or even add a class to children with javascript & style that. IE ignores all of it.

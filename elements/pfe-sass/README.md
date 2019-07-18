# PFE SASS

@Todo: Add All of the variables and mixins that are available to pfe-elements.




## Containers & broadcast vars

If the container allows changes to  background colors should influence the children:  pfe-set-broadcasted function


## Notes on using broadcast colors in components  

1. Only define CSS color <span style="text-decoration:underline;">property</span> ( `color: ;` ) once per element 
2. Set the value equal to local variable:  `color: var(pfe-pfe-local--Color);`
3. In the pfe-component, do not set <span style="text-decoration:underline;">value</span> of the broadcasted variables, instead set local variable values equal to the value of broadcasted, then with fallback colors
    1. Content components should never set the value of broadcasted vars, otherwise container components won't be able to pass them that information
4. Reset local variable values as needed for color attribute overrides.


### CSS Example

Let's use the pfe-cta as an example. We can start by defining local variables, namespaced for this component, and then updating the values of those variables as we go.

```
    // 1. set up local vars equal to theme vars & fallbacks
    :host {
      --pfe-cta--Color: var(theme--ui-link, #06c);
    }

    // 2. Use color property once, map to local var value
    :host(:not([priority]) {
      ::slotted(a) {
         //color: blue; CSS compiler will print this for IE11
         color: var(--pfe-cta--Color, blue) !important;
      }
    }

    // 3. Use broadcasted as value, with theme fallback after other declarations
    :host {
      --pfe-cta--Color: var(broadcasted--ui-link, var(theme--ui-link, #06c));   
    }

    // 4. Override broadcasted last
    [on=dark] {
      --pfe-cta--Color: var(theme--ui-link--on-dark);
    }
    [color=accent] {
      --pfe-cta--Color: var(theme--surface-accent--ui-link);
    }
```



### On=dark is being deprecated.

**Instead, custom classes already on the page should set broadcast values:**


```
.ux-card[data-ux-theme="dark"] {
 --pfe-broadcasted--color--text: var(--pfe-theme--color--text--on-dark);
 --pfe-broadcasted--color--ui-link:  var(--pfe-theme--color--ui-link--on-dark);
 --pfe-broadcasted--color--ui-link--hover: var(--pfe-theme--color--ui-link--on-dark--hover);
 --pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--ui-link--on-dark--visited);
 --pfe-broadcasted--color--ui-link--focus: var(--pfe-theme--color--ui-link--on-dark--focus);
}


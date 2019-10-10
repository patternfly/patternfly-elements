# PFE SASS

Helper tools for building PatternFly Elements web components.


## Broadcast variables

1. Try to map CSS __properties__ such as `color` only once. If updates to that property are needed, those should be done by updating the local variable.
2. Set the value equal to local variable:  `color: var(--pfe-local--Color);`.  Note that no fallback is defined at this level as that is done when the local variable is declared.
3. In the pfe-component, do not set __value__ of the broadcasted variables unless the component is influencing the background color; instead, set local variables to look for the value of a broadcasted variable, followed by a fallback color.  This provides a hook for containers to influence the color of the typography in the component so that it remains readable.
    * `--pfe-local--Color: var(--pfe-broadcasted--color--text, #444);`
    * If a component sets it's own background color, it can and should update the value of the broadcasted variables.
4. Reset local variable values as needed for attribute overrides.


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
         // color: blue; CSS compiler will print this for IE11
         color: var(--pfe-cta--Color, blue) !important;
      }
    }

    // 3. Use broadcasted variables as needed, with theme fallback after other declarations
    :host {
      --pfe-cta--Color: var(broadcasted--ui-link, var(theme--ui-link, #06c));   
    }

    // 4. Override broadcasted last
    :host([color="accent"]) {
      --pfe-cta--BackgroundColor: var(theme--surface--accent);
      --pfe-cta--Color: var(theme--surface-accent--ui-link);
    }
```



### On=dark is being deprecated.

**Instead, custom classes already on the page should set broadcast values:**

```css
.on-dark {
 --pfe-broadcasted--color--text: var(--pfe-theme--color--text--on-dark, #fff);
 --pfe-broadcasted--color--ui-link:  var(--pfe-theme--color--ui-link--on-dark, #73bcf7);
 --pfe-broadcasted--color--ui-link--hover: var(--pfe-theme--color--ui-link--on-dark--hover, #2b9af3);
 --pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--ui-link--on-dark--visited, #73bcf7);
 --pfe-broadcasted--color--ui-link--focus: var(--pfe-theme--color--ui-link--on-dark--focus, #2b9af3);
}
```

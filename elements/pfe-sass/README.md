# PFE SASS

Helper tools for building PatternFly Elements web components.


## Broadcast variables

## Containers & broadcast vars

If the container allows changes to  background colors should influence the children:  pfe-set-broadcasted function

## Notes on using broadcast colors in components 

1. Try to map CSS __properties__ such as `color` only once. If updates to that property are needed, those should be done by updating the local variable.
2. Set the value equal to local variable:  `color: var(--pfe-local--Color);`.  Note that no fallback is defined at this level as that is done when the local variable is declared.
3. In the pfe-component, do not set __value__ of the broadcasted variables unless the component is influencing the background color; instead, set local variables to look for the value of a broadcasted variable, followed by a fallback color.  This provides a hook for containers to influence the color of the typography in the component so that it remains readable.
    * `--pfe-local--Color: var(--pfe-broadcasted--text, #444);`
    * If a component sets it's own background color, it can and should update the value of the broadcasted variables.
4. Reset local variable values as needed for attribute overrides.


### CSS Example

Let's use the pfe-cta as an example. We can start by defining local variables, namespaced for this component, and then updating the values of those variables as we go.

```
    // 1. set up local vars equal to theme vars & fallbacks
    :host {
      --pfe-cta--Color: var(theme--link, #06c);
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
      --pfe-cta--Color: var(broadcasted--link, var(theme--link, #06c));   
    }

    // 4. Override broadcasted last
    :host([color="accent"]) {
      --pfe-cta--BackgroundColor: var(theme--surface--accent);
      --pfe-cta--Color: var(theme--surface-accent--link);
    }
```



# Typography Classes

There are a variety of mixins, extends, and variables available in pfe-sass. We recommend checking out the sass doc for extensive information about how to use these tools. 

There are already utility / modifier classes available within pfe-typography-classes.css for use within long form content. However if you need custom classes, you can utilize either the placeholders, or the `pfe-typography` mixin.

## Text class examples

```scss
.custom-text--foo {
  @extend %pfe-text--lg;
}
.custom-text--bar {
 @include pfe-typography(lg, $type: "text"); 
}
.custom-text--baz {
 @include pfe-typography(lg, $type: "text", $base: true); 
}

```
 

```css
.custom-text--foo {
  font-size: 1.125rem;
  font-size: var(--pf-c-text--m-lg--FontSize, var(--pf-global--FontSize--lg, 1.125rem));
  font-family: "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif;
  font-family: var(--pfe-theme--font-family, "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif);
  line-height: 1.5;
  line-height: var(--pfe-theme--line-height, 1.5);
  font-weight: 400;
  font-weight: var(--pfe-theme--font-weight--normal, 400);
}

.custom-text--foo:not(:last-child):not(:empty) {
  margin-bottom: 0.5rem;
  margin-bottom: var(--pfe-theme--content-spacer--body--sm, 0.5rem);
}

.custom-text--bar {
  font-size: 1.125rem;
  font-size: var(--pf-c-text--m-lg--FontSize, var(--pf-global--FontSize--lg, 1.125rem));
  font-family: "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif;
  font-family: var(--pfe-theme--font-family, "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif);
  line-height: 1.5;
  line-height: var(--pfe-theme--line-height, 1.5);
  font-weight: 400;
  font-weight: var(--pfe-theme--font-weight--normal, 400);
}

.custom-text--bar:not(:last-child):not(:empty) {
  margin-bottom: 0.5rem;
  margin-bottom: var(--pfe-theme--content-spacer--body--sm, 0.5rem);
}

.custom-text--baz {
  font-size: 1.125rem;
  font-size: var(--pf-c-text--m-lg--FontSize, var(--pf-global--FontSize--lg, 1.125rem));
  font-family: "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif;
  font-family: var(--pfe-theme--font-family, "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif);
  line-height: 1.5;
  line-height: var(--pfe-theme--line-height, 1.5);
  font-weight: 400;
  font-weight: var(--pfe-theme--font-weight--normal, 400);
}

.custom-text--baz:not(:last-child):not(:empty) {
  margin-bottom: 0.5rem;
  margin-bottom: var(--pfe-theme--content-spacer--body--sm, 0.5rem);
}
```

## Title examples

Note that you can opt in or out out of properties beyond the font-family and font-size if desired, via the argument: `$base: false` and/or `$spacing: false`.

```scss
.custom-title--foo {
  @extend %pfe-title--lg;
}
.custom-title--bar {
 @include pfe-typography(lg, $type: "title"); 
}
.custom-title--baz {
 @include pfe-typography(lg, $type: "title", $base: false); 
}
```

```css
.custom-title--foo {
  font-family: "Red Hat Display", "RedHatDisplay", "Overpass", Overpass, Arial, sans-serif;
  font-family: var(--pfe-theme--font-family--heading, "Red Hat Display", "RedHatDisplay", "Overpass", Overpass, Arial, sans-serif);
  font-size: 1.125rem;
  font-size: var(--pf-c-title--m-lg--FontSize, var(--pf-global--FontSize--lg, 1.125rem));
  line-height: 1.5;
  line-height: var(--pfe-theme--line-height, 1.5);
  font-weight: 400;
  font-weight: var(--pfe-theme--font-weight--normal, 400);
}

.custom-title--foo:not(:last-child) {
  margin-bottom: 1rem;
  margin-bottom: var(--pfe-theme--content-spacer--heading--sm, 1rem);
}

.custom-title--bar {
  font-family: "Red Hat Display", "RedHatDisplay", "Overpass", Overpass, Arial, sans-serif;
  font-family: var(--pfe-theme--font-family--heading, "Red Hat Display", "RedHatDisplay", "Overpass", Overpass, Arial, sans-serif);
  font-size: 1.125rem;
  font-size: var(--pf-c-title--m-lg--FontSize, var(--pf-global--FontSize--lg, 1.125rem));
  line-height: 1.5;
  line-height: var(--pfe-theme--line-height, 1.5);
  font-weight: 400;
  font-weight: var(--pfe-theme--font-weight--normal, 400);
}

.custom-title--bar:not(:last-child) {
  margin-bottom: 1rem;
  margin-bottom: var(--pfe-theme--content-spacer--heading--sm, 1rem);
}

.custom-title--baz {
  font-family: "Red Hat Display", "RedHatDisplay", "Overpass", Overpass, Arial, sans-serif;
  font-family: var(--pfe-theme--font-family--heading, "Red Hat Display", "RedHatDisplay", "Overpass", Overpass, Arial, sans-serif);
  font-size: 1.125rem;
  font-size: var(--pf-c-title--m-lg--FontSize, var(--pf-global--FontSize--lg, 1.125rem));
}

```

### Component examples

```scss
:host[foo] {
  font-size: pfe-local(FontSize);
}

:host[bar] {
  @include pfe-c-typography($type: text, $sizing: md);
}

:host[baz] {
  @include pfe-c-typography($type: text, $sizing: md, $base: true, $spacing: true, $light-dom-heading:true);
}

```

```css
:host[foo] {
  font-size: 1rem;
  font-size: var(--pfe-clipboard--FontSize, var(--pf-global--FontSize--md, 1rem));
}

:host[bar] {
  font-size: 1rem;
  font-size: var(--pfe-clipboard--FontSize, var(--pf-global--FontSize--md, 1rem));
}

:host[baz] {
  font-size: 1rem;
  font-size: var(--pfe-clipboard--FontSize, var(--pf-global--FontSize--md, 1rem));
  font-family: "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif;
  font-family: var(--pfe-clipboard--LineHeight, var(--pfe-theme--font-family, "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif));
  line-height: 1.5;
  line-height: var(--pfe-clipboard--LineHeight, var(--pfe-theme--line-height, 1.5));
  font-weight: 400;
  font-weight: var(--pfe-clipboard--FontWeight, var(--pfe-theme--font-weight--normal, 400));
  --pf-c--FontSize: var(--pfe-clipboard--FontSize, var(--pf-global--FontSize--md, 1rem));
}

:host[baz]:not(:last-child) {
  margin-bottom: 0.5rem;
  margin-bottom: var(--pfe-clipboard--MarginBottom, var(--pfe-theme--content-spacer--body--sm, 0.5rem));
}
```
 

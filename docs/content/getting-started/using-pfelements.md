+++
title = "Using PatternFly Elements"
description = ""
weight = 3
draft = false
bref = ""
toc = true
menu = "start"
tags = [ "start" ]
+++


# Using PFE Web Components in your project


Check out the demo files within each component for examples of the attributes and possible variable overrides.  The readme files within the component directories should have descriptions about the variables for each component. 

The list below is the recommended approach to using web components and overriding style properties, in order.


## 1. Markup


### Content Components

The beauty of web components is that they have much of the styling built-into the tag itself. Start with the tags first. **And please use named slots! **


```
<pfe-card>
    <h2 slot="pfe-card--header">Light card</h2>
    <pfe-cta>hello</pfe-cta>
</pfe-card>
```



### Container components (see container notes below)


```
<pfe-card pfe-color="darkest">
  <pfe-cta>hello</pfe-cta>
</pfe-card>
```



## 2. Attributes

Check out the [Storybook](https://patternfly.github.io/patternfly-elements/demo) to see what attributes are readily available

### General

  Priority & variant attributes change style styles globally


  ```
  <pfe-cta pfe-priority="primary">hello</pfe-cta>
  <pfe-tabs pfe-variant="earth">...</pfe-tabs>
  ```

  **Full list:**

  *   `pfe-priority`
  *   `pfe-variant`


### Specific

Color or align attributes change specific properties


```
<pfe-cta pfe-priority="primary" pfe-color="accent">
```


#### **Full list:**

*   `pfe-align`
*   `pfe-color`
*   `vertical`
*   `horizontal`


## 3. CSS variables


### Page-level CSS, [theme](https://static.redhat.com/libs/redhat/redhat-theme/2/advanced-theme.css) variables

Theme variables will impact all components on the page where this CSS is loaded.


```
// your-page.css
:root {
    --pfe-theme--color--ui-accent: green;
    --pfe-theme--color--surface--darker: navy;
}
```


_Note_: overriding local variables (i.e., --pfe-cta--foo) will not work at this level.  Those overrides can only be done on the component via tag name, class, or ID.


### Page-level CSS, component variables


```
/* your-page.css */
pfe-cta {
    --pfe-cta--BackgroundColor: green;
}
pfe-band {
    --pfe-band--Padding--vertical: 34px;
}
```



### Component-level, inline CSS

As a last resort, you may choose to override variables with inline styles. This could be desirable if you only need one component to deviate from the design system. Note that this incurs some level of risk, especially related to colors, as you are opting out of the color combinations in the system.


```
<pfe-cta style="--pfe-cta--BackgroundColor:pink">
```


## FAQ

### Should I use on=dark or color=darkest on my container? What's the difference?



*   `on=dark` is being deprecated. Instead, custom classes already on the page should set broadcast values.
*   The original goal for `on=dark` was all about context. But instead of having to provide another attribute somewhere, the card or a band or another container will inform any nested components that the text color needs to change through the set of broadcast variables. Existing broadcast vars (defined in `$BROADCAST-VARS`)  include: `text`, `ui-link`, `ui-link--hover`, `ui-link--visited`, `ui-link--focus`.
*   If your page has a custom background color for a band or card, you should set the background and also set the broadcast colors.


```
.custom-dark-band {
  background: black;
  --pfe-broadcasted--color--text:             var(--pfe-theme--color--text--on-dark, #fff);
  --pfe-broadcasted--color--ui-link:          var(--pfe-theme--color--ui-link--on-dark, #73bcf7);
  --pfe-broadcasted--color--ui-link--hover:   var(--pfe-theme--color--ui-link--on-dark--hover, pink);
  --pfe-broadcasted--color--ui-link--visited: var(--pfe-theme--color--ui-link--on-dark--visited, pink);
  --pfe-broadcasted--color--ui-link--focus:   var(--pfe-theme--color--ui-link--on-dark--focus, pink);
}
```

In themes (like the advanced-theme.css file from the Red Hat Theme ) we apply broadcast variables to plain links, because they are light DOM and also have default colors applied by the browser. This CSS file not only includes variables but also styles for headlines and links on the page. It sets the colors for these elements using a CSS variable, which web components can change the value of.

For example, advanced-theme.css includes

```
.PFElement a {
color: var(--pfe-broadcasted--color--ui-link);
}
```

We choose not to apply broadcast colors to text elements like paragraphs because it still would not be high enough specificity to override anything coming from pre-existing stylesheets, and paragraphs will inherit color from parents. 


```
// this would not really be helpful to add to cp-theme or redhat-theme
h1, h2, h3, h4, h5, h6, p { 
  color: var(--pfe-broadcasted--color--text);
}
// if there was some class like this in the theme, It would override it anyway. 
body.editorial .body1.generic1 {
    color: #646464;
}
```

Instead, in the host of components, use:

```
:host {
  color: var(--pfe-broadcasted--color--text);
}
```

Then call theme mixin to flip colors of the on=dark on=light attributes. Default tags will use these colors. If devs implementing the component have more specific styles on their page, they will have to handle it.

```
:host([on="dark"]) {
  @include pfe-theme($theme: "dark");
}
:host([on="light"]) {
  @include pfe-theme($theme: "light");
}
```



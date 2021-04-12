+++
title = "Getting Started"
description = "Use a PatternFly Element in your web site or web app."
weight = 1
draft = false
bref = ""
toc = true
menu = "start"
tags = [ "start" ]
+++

## Getting Started

Check out [storybook](https://patternfly.org/patternfly-elements/demo) or the demo/index.html files within each component for examples of the attributes and possible variable overrides.  The readme.md files within each component should have descriptions about the supported attributes & variables.

The list below is the recommended approach to using web components and overriding style properties, in order.


## 1. Install PatternFly Elements

PatternFly Elements (PFE) is a monorepo, meaning that each component is revisioned independently of others, and you can request only the components you need. You can find the latest versions of all PFE webcomponents on [npmjs.com](https://www.npmjs.com/search?q=%40patternfly%20elements).

Depending on the tool you use to manage dependencies ([NPM](https://www.npmjs.com/), Yarn, etc.) use the command line to install the components you'd like as a dependency of your project like this:

```bash
$ npm install --save @patternfly/pfe-card
$ npm install --save @patternfly/pfe-cta
```

This will install not only the pfe-card and pfe-cta, but also the base element, "pfelement", and will save it to your package-lock.json. Depending on which browsers you support, you may also need to load the [custom-elements](https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements) and webcomponentsjs [polyfills](https://www.webcomponents.org/polyfills).

```bash
"@patternfly/pfe-card": "1.3.2",
"@patternfly/pfe-cta": "1.3.2",
"@webcomponents/custom-elements": "^1.2.1",
"@webcomponents/webcomponentsjs": "^2.2.10",
```


## 2. Include PatternFly Elements JavaScript

There are a few options:

1. If your site does not need to [support older browser such as IE11](https://caniuse.com/#feat=es6-module), you may load the JavaScript via: `script type="module"`. List out all the components you may include on your page, and the browser will fetch the dependencies dynamically on load. [Learn more](https://hospodarets.com/native-ecmascript-modules-the-first-overview).

    ```html
    <script type="module" src="PATH/pfe-card.min.js"></script>
    <script type="module" src="PATH/pfe-cta.min.js"></script>
    ```

2. Include the PatternFly Element web component and its dependencies on the page(s) or within the app.

    ```javascript
    import '@patternfly/pfe-card/dist/pfe-card.js';
    import '@patternfly/pfe-cta/dist/pfe-cta.js';
    ```

3. Use [require.js](https://requirejs.org/) JavaScript file and module loader.
	- Learn more about [Polyfills](/getting-started/polyfills)
4. Load individual PatternFly Element scripts, but bundle the polyfills with the base `pfelement.js` file.
	-  All elements are based off of `pfelement.js` so including the polyfills with this one file would mean you only need to include the `pfelement.js` file before you include anything else.
5. Bundle all of the scripts together into one rollup, and include that.

### Important note

  If you are using ES6 you will want to use the regular minified javascript files:

    ```
    pfe-card.min.js
    pfe-cta.min.js
    ```
    If not, use the UMD (universal module definition) versions:

    ```
    pfe-card.umd.min.js
    pfe-cta.umd.min.js
    ```

## 3. Use PatternFly Elements markup in your template

Different components have different intended uses. We tend to think of them in 3 distinct groups:

- Content, such as a call-to-action: `pfe-cta`
- Containers, such as a card: `pfe-card`
- Combos, such as the pattern which captures sets of content and renders it as an accordion or tab set: `pfe-content-set`


### Content components

The beauty of web components is that they have much of the styling built-into the tag itself. Start with the tags first.

```html
<pfe-cta><a href="#">Learn more</a></pfe-cta>
```

### Container components (see also container notes below)

```html
<pfe-card color="darkest">
  <p>Hello world.</p>
</pfe-card>
```

### Combo components

The pfe-content-set will render the content as either pfe-tabs and pfe-accordions depending on the size of the container!

```html
<pfe-content-set variant="wind" breakpoint="500">
  <h3 pfe-content-set--header>Labore ut</h3>
  <div pfe-content-set--panel>
    <p>Quis ad ad quis deserunt.</p>
  </div>
  <h3 pfe-content-set--header>Ullamco est</h3>
  <div pfe-content-set--panel>
    <p>Ex Lorem mollit cupidatat ullamco.</p>
  </div>
</pfe-content-set>
```

You can use PatternFly Elements alongside other standard HTML markup in your app or page. Here's a React app example:

```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '@patternfly/pfe-card/dist/pfe-card.js';
import '@patternfly/pfe-cta/dist/pfe-cta.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="body">
          <pfe-card>
            <h2 slot="pfe-card--header">Default card</h2>
            <p>This is the default pfe-card and <a href="#">a link</a>.</p>
            <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.</p>
            <p>Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
            <div slot="pfe-card--footer">
            	<pfe-cta priority="secondary"><a href="#">Learn more</a></pfe-cta>
            </div>
          </pfe-card>
        </div>
      </div>
    );
  }
}

```


## 4. Add attributes

You may choose to add attributes such as `variant`, `priority` or `color` as needed to adjust usage of general theme, palette color, or priority. Check the readme file of a component to see what attributes are supported. Or check out the [Storybook](https://patternfly.github.io/patternfly-elements/demo) to preview how the attributes work.

### General attributes

  "Priority" & "variant" attributes will change various styles throughout the component, as a set:

  ```html
  <pfe-cta priority="primary">...</pfe-cta>
  <pfe-tabs variant="earth">...</pfe-tabs>
  ```

  **Examples**

  * `priority`
  * `variant`


### Specific attributes

"Color" and "align" attributes change those specific properties respectively, but do not alter the overall look & feel.

```
<pfe-cta color="accent">...</pfe-cta>
```


**Examples:**

  * `align`
  * `color`
  * `vertical` (layout)
  * `horizontal` (layout)


## 5. Use CSS variables to provide hooks for customization or as a means of updating internal styles

CSS variables are subject to the normal cascade, so consider where you want these overrides to propogate.


#### Page-level CSS, [theme](https://raw.githubusercontent.com/starryeyez024/patternfly-theme/prerelease-1.0/dist/advanced-theme.css) variables

Theme variables will impact all components on the page where this CSS is loaded.


```css
// your-page.css
:root {
    --pfe-theme--color--ui-accent: green;
    --pfe-theme--color--surface--darker: navy;
}
```


_Note_: overriding local variables (i.e., --pfe-cta--foo) will not work at this level.  Those overrides can only be done on the component via tag name, class, or ID.


#### Page-level CSS, component variables


```css
/* your-page.css */
pfe-cta {
    --pfe-cta--BackgroundColor: pink;
    --pfe-cta--Color: black;
}
pfe-band {
    --pfe-band--Padding--vertical: 34px;
    --pfe-band--BackgroundColor: green;
    --context: saturated;
}
```



### Component-level inline CSS

As a last resort, you may choose to override variables with inline styles. This could be desirable if you only need one component to deviate from the design system. Note that this incurs some level of risk, especially related to colors, as you are opting out of the color combinations in the system.


```html
<pfe-cta style="--pfe-cta--BackgroundColor: pink">
```


## 6. Victory!

Be sure to browser test within your own site or application. If you run into any trouble, please file an issue in the [issue queue](https://github.com/patternfly/patternfly-elements/issues).

<hr/>


## FAQ

### How should I indicate context for my components, for example, a change in background color that would need a lighter text color?

When setting a background color from outside of a web component, set the `--context` variable to `light`, `dark`, or `saturated`.  This will tell the web components to attach the `on` attribute and allow them to set text and link colors appropriately.  Saturated contexts tend to be red or blue tones (blue links don't work on these contexts typically).

```
.custom-dark-band {
  background: black;
  --context: dark;
}
```

The `on="dark"` attribute will be automatically added by the web component upon detecting this context variable.

You can optionally customize your broadcast variables individually if you have very specific needs.  These are a list of the existing broadcast variables (also defined in `$BROADCAST-VARS`):

* `--pfe-broadcasted--text`
* `--pfe-broadcasted--link`
* `--pfe-broadcasted--link--hover`
* `--pfe-broadcasted--link--visited`
* `--pfe-broadcasted--link--focus`
* `--pfe-broadcasted--link-decoration--hover`
* `--pfe-broadcasted--link-decoration--visited`
* `--pfe-broadcasted--link-decoration--focus`

If you include the `pfe-base.css` stylesheet, it will include application of these broadcast variables to links; this is helpful because links are often nested inside of p tags in the content and thus inaccessible to the stylesheet of the web component.

### How to avoid FOUC (Flash of Unstyled Content) with the body unresolved attribute

PatternFly Elements provides a stylesheet that causes the `body[unresolved]` attribute to avoid the Flash of Unstyled Content (FOUC).
Adding the unresolved attribute to the `body` tag will hide the entire page until all elements have upgraded or 2 seconds have passed, whichever happens first.  By including the `pfelement--noscript.css` file (wrapped in a `noscript` tag), all content will be revealed immediately for pages without JavaScript turned on.  To customize the wait time, update the value of the `--pfe-reveal-delay` variable (default 2 second delay) and the `--pfe-reveal-duration` variable (how long the reveal animation takes, default 0.1618 seconds).

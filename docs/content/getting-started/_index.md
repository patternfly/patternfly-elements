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


## 1. Install PatternFly Elements


Use [NPM](https://www.npmjs.com/) (Node Package Manager) to install the whole PatternFly Elements library or a handful of individual PatternFly Elements.

```bash
npm install --save @patternfly/pfe-card
```

Or, utilize the Red Hat asset library! When it exists! 



## 2. Include PatternFly Elements on a page

You have some options:

1. Load JavaScript modules via script tag: `script type="module"`
	1.  Downloads all of the dependencies on its own
	2.  [Only supported in modern browsers](https://caniuse.com/#search=module)
2. Include the PatternFly Element and its dependencies on the page(s) or within the app.

	```html
	import '@patternfly/pfe-card/pfe-card.js';
	import '@patternfly/pfe-cta/pfe-cta.js';
	```

3. Use [require.js](https://requirejs.org/) JavaScript file and module loader
	- Learn more about [Polyfills](/getting-started/polyfills)
3. Load individual PatternFly Element scripts, but bundle the polyfills with the base `pfelement.js` file
	1.  All elements are based off of pfelement.js so including the polyfills with this one file would mean you only need to include the pfelement.js file before you include anything else
4. Bundle all of the scripts together into one
5. TBD Idea: polyfill.io > webservice (build something similar internal to Red Hat - component service)
	1.  pipe needed polyfills for website, checks headers, runtime
	2.  delivers dynamic JS
	3.  If I want pfe-card - it gets the pfe-card.js + required other files (serves up js bundle)



## 3. Use PatternFly Elements markup

You can use PatternFly Elements with other standard HTML markup in your app or page:

```html
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '@patternfly/pfe-card/pfe-card.js';
import '@patternfly/pfe-cta/pfe-cta.js';

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
            <h2 slot="header">Default card</h2>
            <p>This is the default pfe-card and <a href="#">a link</a>.</p>
            <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.</p>
            <p>Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
            <div slot="footer">
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

You may choose to add attributes such as `priority` or `color` as needed to adjust usage of palette color, context, or priority.

```html
  <pfe-card color="darkest">
    <h2 slot="header">Dark card</h2>
    <p>Lorem ipsum.</p>
    <pfe-cta color="complement" priority="primary" on="dark" slot="footer">
        <a href="#">Important call-to-action</a>
    </pfe-cta>
  </pfe-card>
```




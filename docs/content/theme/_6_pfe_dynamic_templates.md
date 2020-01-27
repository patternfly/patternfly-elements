+++
title = "Dynamic HTML Templates"
description = ""
weight = 6
draft = false
bref = ""
toc = true
menu = "theme"
tags = [ "theme" ]
+++



## Attributes & Variables

Should you need to capture information via an attribute property on your web component, such as a number, URL, or some other piece of information that does not need to be exposed to search engines, here’s how you make that happen:

```
// HTML using component:

<my component how-many-bananas="4">
</my-component>
```
```
// Component javascript:

  get numberBananas() {
    **return** this.getAttribute("how-many-bananas");
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
}
```
```
// Component template can print variables as content:
<h1>${this.numberBananas}</h1>

// or as values within other properties:
<div src="${this.numberBananas}"></div>
```

## Data Object

If you want to loop over a set of data, you can do so by utilizing the constructor. You may need to delay rendering of the component.

```
// Component javascript:

 constructor() {
    super(PfeVideoBand, {
      delayRender: true
    });

    this.data = {
      titles: ["The Sandlot", "The Natural", "Major League"]
    };
  }

 attributeChangedCallback(attr, oldValue, newValue) {
    **if** (attr === "how-many-movies") {
      this.data.videoUrl = newValue;
      this.render();
    }
  }
```
```
// Component template:
<h1>${this.data.numberMovies}</h1>
<div src="${this.data.numberMovies}"></div>
<ul>
${this.data.titles.map(title => `
  <li>${title}</li>
`).join('\n')}
</ul>
```

[Template literals... TBD](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) 

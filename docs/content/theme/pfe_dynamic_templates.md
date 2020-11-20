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


## Attributes & variables

Should you need to capture information via an attribute property on your web component, such as a number, URL, or some other piece of information that does not need to be exposed to search engines, here’s how you make that happen:

```html
<my component how-many-bananas="4">
</my-component>
```

In your component's definition:

```js
  static get properties() {
    return {
      numberBananas: {
        type: Number,
        attr: "how-many-bananas"
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
}
```

In your component's template:

```html
<!--Print variable as content:-->
<h1>${this.numberBananas}</h1>

<!--Print variable withint other markup:-->
<div src="${this.numberBananas}"></div>
```

## Data object

If you want to loop over a set of data, you can do so by utilizing the constructor. You may need to delay rendering of the component.

In your component's definition:

```js
  static get properties() {
    return {
      numberMovies: {
        type: String,
        attr: "how-many-movies",
        observer: "_moviesUpdated"
      }
    }
  }

  constructor() {
    super(PfeVideoBand, {
      delayRender: true
    });

    this.titles: ["The Sandlot", "The Natural", "Major League"];
  }

 _moviesUpdated(oldValue, newValue) {
    this.videoUrl = newValue;
    this.render();
  }
```

In the component template:

```html
<h1>${this.numberMovies} movies selected</h1>
<div src="${this.videoUrl}"></div>
<ul>
${this.titles.map(title => `
  <li>${title}</li>
`).join('\n')}
</ul>
```

[Template literals... TBD](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

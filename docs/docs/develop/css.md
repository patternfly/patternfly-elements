---
layout: layout-docs.njk
title: Write your CSS
order: 5
tags:
  - develop
---

We want the `pfe-cool-element` to have a profile photo, a username, and a follow button.
Right now, it only contains the HTML structure, but we can style our element by 
updating our CSS to make it look the way we want.

We'll be working in the `pfe-cool-element.css` file.

The boilerplate stylesheet has a `:host` selector that makes our element display 
as a block element.

```css
:host {
  display: block;
}
```

Now we can update our styles, like so:

```css
:host {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

:host([hidden]) {
  display: none;
}
```

After saving and viewing our demo page, our profile element looks much better.

![Demo Page CSS](/images/develop/develop-sass.png)

A couple of things to note:

1.  The `:host` selector sets the styles of the container element `<pfe-cool-element>`.
2.  The `button` styles are encapsulated within this element and will not bleed out, meaning that there's no chance these styles will affect other buttons on the page. Feeling confident that your element will always look the same when it's distributed is one of the main advantages of the shadow DOM. Check out the Styling section of [Shadow DOM v1: Self-Contained Web Components](https://developers.google.com/web/fundamentals/web-components/shadowdom#styling) to learn what else you can do when applying styles to the shadow DOM.

Now that our `pfe-cool-element` is more appealing, we'll add the follow button's interaction
and fill in the profile photo.
We can accomplish both of these tasks by updating the `pfe-cool-element.ts` file.

<a href="{{ '/theming/' | url }}">Learn more about applying a theme.</a>

<a class="cta" href="{{ '../javascript' | url }}">Next up: Write your JavaScript</a>

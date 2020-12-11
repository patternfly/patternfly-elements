+++
title = "Write your CSS (or Sass)"
description = ""
weight = 70
draft = false
toc = true
menu = "develop"
tags = [ "develop" ]
+++

We want the `pfe-cool-element` to have a profile photo, a username, and a follow button. Right now, it only contains the HTML structure, but we can style our element by updating our Sass (or CSS) to make it look the way we want.

We'll be working in the `/src/pfe-cool-element.scss` file since we decided to use the Sass option in the PatternFly Element generator.

Your Sass file will initially import additional Sass from the pfe-sass node module, but we can ignore that for now. The second part has a `:host` selector that makes our element display as a block element.

```
@import "../../pfe-sass/pfe-sass";

$LOCAL: cool-element;

$LOCAL-VARIABLES: ();

:host {
  display: block;
}

:host([hidden]) {
  display: none;
}
```

When structuring your Sass, a good rule of thumb for organization is:

```
// Define your hooks and their default values at the top of the file
$LOCAL-VARIABLES: (
  Property: default-value,
  region: (
    Property: default-value
  )
);

:host {
  // Apply the hooks to the appropriate properties
  property: pfe-local(Property);
}

// Modifiers should update local variables
// this will override any variables set externally
// attributes are always stronger than variable overrides
:host([modifiers]) {
  $modifier: ( Property: updated-value );
  @include pfe-print-local($modifier);  // outputs: --pfe-cool-element--Property: updated-value;
}

// Light DOM styles
::slotted(*) {
  > typography defaults
}

// Class-based shadow DOM styles
.pfe-cool-element {
  &__region {
    // Apply the hooks to the appropriate properties in their regions too
    property: pfe-local(Property, $region: region);

    // 1. default styles
    // 2. media queries

    &[modifiers] {
      --pfe-cool-element__region--Property: updated;
    }
  }
  // Modifiers can also be set using classes and scoped to the Shadow DOM
  &--modifier {
    --pfe-cool-element--Property: updated;
  }
}
```

Now we can update our styles, like so:

```
@import "../../pfe-sass/pfe-sass";

$LOCAL: cool-element;

$LOCAL-VARIABLES: (
  Width: 128px,
  Padding: calc(#{pfe-var(container-spacer)} * 2),
  profile: (
    BackgroundColor: pfe-var(surface--base),
    context: pfe-var(surface--base--context),
    Border: 2px solid #333
  )
);

:host {
  // Hardcoded, not connected to theme
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // Local variable hooks
  width: pfe-local(Width);
  padding: pfe-local(Padding);

  // Global theme variable hooks only
  font-family: pfe-var(font-family);
  box-shadow: pfe-var(box-shadow--sm);
}

:host([hidden]) {
  display: none;
}

.pfe-cool-element {
  &__profile {
    background-color: pfe-local(BackgroundColor, $region: profile);
    // Any time background color is updated, context should be set too
    // This sets the `on=` attribute on the component
    --context: #{pfe-local(context, $region: profile)};

    // Invoke the broadcasted default typography styles
    @include pfe-contexts;

    // The above mixins outputs:
    // :host([on="dark"]) {
    //   --pfe-broadcasted--text: var(--pfe-theme--color--text--on-dark, #fff);
    //   --pfe-broadcasted--link: var(--pfe-theme--color--link--on-dark, #99ccff);
    //   --pfe-broadcasted--link--hover: var(--pfe-theme--color--link--hover--on-dark, #cce6ff);
    //   --pfe-broadcasted--link--focus: var(--pfe-theme--color--link--focus--on-dark, #cce6ff);
    //   --pfe-broadcasted--link--visited: var(--pfe-theme--color--link--visited--on-dark, #b38cd9);
    //   --pfe-broadcasted--link-decoration: none;
    //   --pfe-broadcasted--link-decoration--hover: underline;
    //   --pfe-broadcasted--link-decoration--focus: underline;
    //   --pfe-broadcasted--link-decoration--visited: none;
    // }

    border: pfe-local(Border, $region: profile);
    border-radius: pfe-var(surface--border-radius);

    // Hardcoded values
    width: 50px;
    height: 50px;
    margin-bottom: 16px;
  }
  &__social--follow {
    margin-top: 16px;
  }
}
```

After saving and viewing our demo page, our profile element looks much better.

![Demo Page CSS](/demo-page-css-step.png)

A couple of things to note:

1.  The `:host` selector sets the styles of the container element `<pfe-cool-element>`.
2.  The `button` styles are encapsulated within this element and will not bleed out, meaning that there's no chance these styles will affect other buttons on the page. Feeling confident that your element will always look the same when it's distributed is one of the main advantages of the shadow DOM. Check out the Styling section of [Shadow DOM v1: Self-Contained Web Components](https://developers.google.com/web/fundamentals/web-components/shadowdom#styling) to learn what else you can do when applying styles to the shadow DOM.

Now that our demo page is updated, let's take a look at what happened to the ES6 version of the element in the root of our element's directory.

```
import PFElement from '../pfelement/dist/pfelement.js';

class PfeCoolElement extends PFElement {
  get html() {
    return `<style>:host{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:128px;width:var(--pfe-cool-element--Width,128px);padding:calc(16px * 2);padding:var(--pfe-cool-element--Padding,calc(var(--pfe-theme--container-spacer,16px) * 2));font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-theme--font-family, "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif);-webkit-box-shadow:0 .0625rem .125rem 0 rgba(19,19,19,.2);box-shadow:0 .0625rem .125rem 0 rgba(19,19,19,.2);-webkit-box-shadow:var(--pfe-theme--box-shadow--sm,0 .0625rem .125rem 0 rgba(19,19,19,.2));box-shadow:var(--pfe-theme--box-shadow--sm,0 .0625rem .125rem 0 rgba(19,19,19,.2))}:host([hidden]){display:none}.pfe-cool-element__profile{background-color:#dfdfdf;background-color:var(--pfe-cool-element__profile--BackgroundColor,var(--pfe-theme--surface--base,#dfdfdf));--theme:var(--pfe-cool-element__profile--theme,var(--pfe-theme--surface-base--theme,light));border:2px solid #333;border:var(--pfe-cool-element__profile--Border,2px solid #333);border-radius:3px;border-radius:var(--pfe-theme--surface--border-radius,3px);width:50px;height:50px;margin-bottom:16px}.pfe-cool-element__profile :host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #99ccff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #cce6ff);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #cce6ff);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #b38cd9);--pfe-broadcasted--link-decoration:none;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:none}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pfe-cool-element__profile :host{color:#333!important;color:var(--pfe-theme--text,#333)!important}}.pfe-cool-element__profile :host([on=saturated]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-saturated, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-saturated, #fff);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-saturated, white);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-saturated, white);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-saturated, #b38cd9);--pfe-broadcasted--link-decoration:underline;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:underline}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pfe-cool-element__profile :host{color:#333!important;color:var(--pfe-theme--text,#333)!important}}.pfe-cool-element__profile :host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #333);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #003366);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #003366);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, rebeccapurple);--pfe-broadcasted--link-decoration:none;--pfe-broadcasted--link-decoration--hover:underline;--pfe-broadcasted--link-decoration--focus:underline;--pfe-broadcasted--link-decoration--visited:none}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pfe-cool-element__profile :host{color:#333!important;color:var(--pfe-theme--text,#333)!important}}.pfe-cool-element__social--follow{margin-top:16px}
/*# sourceMappingURL=pfe-card.min.css.map */
</style>
<div class="pfe-cool-element__profile" id="profile-pic"></div>
<slot></slot>
<div class="pfe-cool-element__social">
  <button class="pfe-cool-element__social--follow">Follow</button>
</div>`;
  }

  static get tag() {
    return "pfe-cool-element";
  }

  get templateUrl() {
    return "pfe-cool-element.html";
  }

  get styleUrl() {
    return "pfe-cool-element.scss";
  }

  constructor() {
    super(PfeCoolElement);
  }
}

PFElement.create(PfeCoolElement);

export default PfeCoolElement;
```

You'll notice `<style>` contains everything we just wrote in our Sass file. Sass variables and functions will resolve into vanilla CSS before being injected into the web component.  An autoprefixer and minifier will also be run on your styles before being injected so you don't need to worry about vendor prefixing when writing styles.

Now that our `pfe-cool-element` is more appealing, we'll add the follow button's interaction and fill in the profile photo. We can accomplish both of these tasks by updating the `/src/pfe-cool-element.js` file.

<a href="/theme/color-palette/">Learn more about applying a theme here</a>

[Move to Step 2: Develop (Javascript)](../step-2d)

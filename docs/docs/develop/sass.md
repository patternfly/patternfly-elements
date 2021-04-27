---
layout: layout-basic.html
title: Write your Sass
order: 5
tags:
  - develop
---
<script type="module" src="/elements/pfe-cta/dist/pfe-cta.min.js"></script>

::: section header
# {{ title }}
:::

::: section
We want the `pfe-cool-element` to have a profile photo, a username, and a follow button. Right now, it only contains the HTML structure, but we can style our element by updating our Scss (or CSS) to make it look the way we want.

We'll be working in the `/src/pfe-cool-element.scss` file since we decided to use the Sass option in the PatternFly Element generator.

Your Sass file will initially import additional Sass from the pfe-sass node module, but we can ignore that for now. The second part has a `:host` selector that makes our element display as a block element.

```css
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

When structuring your Scss, a good rule of thumb for organization is:

```css
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

```css
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

![Demo Page CSS](/images/develop/develop-sass.png)

A couple of things to note:

1.  The `:host` selector sets the styles of the container element `<pfe-cool-element>`.
2.  The `button` styles are encapsulated within this element and will not bleed out, meaning that there's no chance these styles will affect other buttons on the page. Feeling confident that your element will always look the same when it's distributed is one of the main advantages of the shadow DOM. Check out the Styling section of [Shadow DOM v1: Self-Contained Web Components](https://developers.google.com/web/fundamentals/web-components/shadowdom#styling) to learn what else you can do when applying styles to the shadow DOM.

Now that our `pfe-cool-element` is more appealing, we'll add the follow button's interaction and fill in the profile photo. We can accomplish both of these tasks by updating the `/src/pfe-cool-element.js` file.

<a href="/theming/">Learn more about applying a theme.</a>

<pfe-cta>
  <a href="../javascript">Next up: Write your JavaScript</a>
</pfe-cta>
:::
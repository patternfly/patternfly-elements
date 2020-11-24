+++
title = "Writing web component styles"
description = ""
weight = 5
draft = false
bref = ""
toc = true
menu = "theme"
tags = [ "theme" ]
+++

## Theme variables & related functions

Theme variables exist so that when a user changes a system property such as color or font-size, they see the effects of that trickle through the system to nearly every component.

Several functions exist in the `pfe-sass` component to make it easier to theme individual components you are building!

### Color

Rather than using only Sass variables `$red` or hexidecimal colors like `#c00`, please use the `pfe-var()` function, i.e. `pfe-var(ui-base)`.

_Note: When using this as an assignment to a CSS variable, you will need wrap it in interpolation syntax to allow Sass to compile, i.e. `--pfe-foo--Color: #{pfe-color(ui-base)}`._

This function does some heavy-lifting by looking up the value from the various maps available and returning the namespaced CSS variables for the theme, plus fallback color, in that order:

```sass
:host {
  background-color: pfe-color(ui-base);
}
```

returns:

```css
:host {
  background-color: var(--pfe-theme--color--ui-base, #0477a4));
}
```

Component color properties should almost always use [theme colors](https://raw.githubusercontent.com/starryeyez024/patternfly-theme/prerelease-1.0/dist/advanced-theme.css) as values.

Note that there is no "light" or "dark" color in the palette; only lighter/lightest and darker/darkest. It's all relative to the base color.

```text
Lightest
Lighter
Base
Darker
Darkest
Accent
Complement
```

#### Non-color Properties

Similar to defining color values, the `pfe-var` function looks up other details from the various maps available and returns the full `var` stack -> variable name and fallback value.

```sass
:host {
    font-size: pfe-var(font-size);
}
```

returns:

```css
:host {
    font-size: var(--pfe-theme--font-size, 16px);
}
```

#### Broadcast variables

These variables are designed to cascade and influence the text or link styles of [content components nested inside container components](/getting-started/#3-use-patternfly-elements-markup).  Typically container components come with background colors and need to communicate this to their children so that text and link colors can be adjusted for readability.

Inside the stylesheet for a container component, the following snippet will allow that component to broadcast its context to its children. The `pfe-surfaces` and `pfe-contexts` mixins can be found in `pfe-sass/mixins/_custom-properties.scss`.  For these to work, please ensure you are importing pfe-sass and have the $LOCAL variable set to the name of your component at the top of your Sass file as shown below.

**In your container component:**

```css
@import "../../pfe-sass/pfe-sass";

// name of the component, minus the pfe prefix:
$LOCAL: band;

// Pull in pfe-color settings for all supported surface colors
@include pfe-surfaces;
```

This mixin will compile to the following CSS, one entry for each supported surface color (darkest, darker, base, lighter, lightest, accent, complement):

```css
:host([color="darker"]) {
  --pfe-band--BackgroundColor: var(--pfe-theme--color--surface--darker, #464646);
  --context: var(--pfe-theme--color--surface--darker--context, dark);
}
```

You can optionally customize this set by passing in a list of just the surfaces you would like added; you can also optionally use a different attribute name should you prefer.

```sass
@import "../../pfe-sass/pfe-sass";

$LOCAL: band;

// Pull in pfe-color settings for all supported surface colors
@include surfaces($surfaces: (lightest), $attr-name: background);
```

Would output:

```css
:host([background="lightest"]) {
  --pfe-band--BackgroundColor: var(--pfe-theme--color--surface--lightest, #ffffff);
  --context: light;
}
```

Next we'll look at how the content component can opt into the broadcast variables coming from the parent.

**<a name="pfe-contexts"></a>In your content component:**

```sass
@import "../../pfe-sass/pfe-sass";

// Pull in all contexts with broadcast variables
@include pfe-contexts;
```

This mixin, `pfe-contexts`, will expand to print all the necessary broadcast variables in your compiled CSS to support the 3 contexts available (`light`, `dark`, and `saturated`), one for each supported context:

```css
:host([on="dark"]) {
  --pfe-broadcasted--text: var(--pfe-theme--color--text--on-dark, #fff);
  --pfe-broadcasted--link: var(--pfe-theme--color--link--on-dark, #99ccff);
  --pfe-broadcasted--link--hover: var(--pfe-theme--color--link--hover--on-dark, #cce6ff);
  --pfe-broadcasted--link--focus: var(--pfe-theme--color--link--focus--on-dark, #cce6ff);
  --pfe-broadcasted--link--visited: var(--pfe-theme--color--link--visited--on-dark, #b38cd9);
  --pfe-broadcasted--link-decoration: none;
  --pfe-broadcasted--link-decoration--hover: underline;
  --pfe-broadcasted--link-decoration--focus: underline;
  --pfe-broadcasted--link-decoration--visited: none;
}

/* IE11 fallback */
@media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
  :host([on="dark"]) {
    color: #fff;
    color: var(--pfe-theme--color--text--on-dark, #fff);
  }
}
```

You can optionally customize this set by passing in a list of just the contexts you would like supported; you can also optionally turn off fallback support for older browsers.

```sass
@import "../../pfe-sass/pfe-sass";

// Pull in all contexts with broadcast variables
@include theme-contexts($contexts: (light, dark), $fallback: false);
```

### Local variables

It is strongly encouraged you create "local" variables for properties that developers can override if needed, such as color or sizing. You may use the `pfe-local` function, which automatically creates an empty, component-specific variable, then the corresponding theme variable and appriopriate fallback if one exists. Here's an example of some local variables you would find in the `pfe-cta.scss`:

```sass
:host {
    --pfe-cta--BorderRadius: 0;
    --pfe-cta--Color:  #{pfe-apply-broadcast(link)};
}
```

* When utilizing variables which are scoped to the component, you should use the `pfe-local()` function to refer to them by the shorthand property name:

```sass
::slotted(*) {
    color: #{pfe-local(Color--hover)};
}
```

* If you are using the function to set a variable stack inside a calc function (or any CSS function), you will need to add the interpolation syntax:

```sass
:host([priority]) {
    padding: pfe-var(container-padding) calc(#{pfe-var(container-padding)} * 2);
}
```

* Naming conventions follow the same approach as outlined on the [PatternFly Global Variables documentation.](https://www.patternfly.org/v4/documentation/overview/global-css-variables).

#### Tips & tricks for styling components

Avoid use of `!important` if possible, unless you are trying to force styles on a slotted element.  You will need to use  `!important` when styling slotted content because you will be competing with light DOM styles.

1. If you're not familiar with all the design system variables available, start by adding properties with raw hex values first. i.e., `color: #c00`.

2. Next go back through your styles and add/replace with local variables, `color: var(--pfe-cta--Color, #c00)`.

    * _It's worth noting that every time we surface something as a variable, we offer an opportunity to lean away from the design system. There's no need to create a local variable for all properties though you will want to allow the theme variables to continue to influence your component so that it remains consistent with the look and feel of the site._

3. Pull up the `pfe-sass/maps` directory and review the variables defined in the system.  Pick out the ones that match your _semantic_ meaning most closely.  If the colors are off but the semantic meaning is right, please reach out to the design team about potentially adjusting either your mock-ups or the design system as a whole to reflect the change. **Important note**, please be sure the semantic meaning is correct for your use case. The meaning is far more important than getting the right hex value out of the maps. It's better to hardcode the hex value in your styles than to use the wrong variable just because the colors match; you risk custom themes wreaking havoc on your design.

4. After you pick out the appropriate _semantic_ variable, set up a $LOCAL-VARIABLES map at the top of your file to connect the name of your local variable with the mapped value you want to call.

    ```sass
    $LOCAL-VARIABLES: (
      PaddingTop: calc(#{pfe-var(container-spacer)} * 2)
    );
    ```

    Then in your styles below, you can use `pfe-local` to make use of that value:

    ```sass
    :host {
      padding-top: pfe-local(PaddingTop);
    }
    ```

    Which will output:

    ```css
    :host {
      padding-top: var(--pfe-foo--PaddingTop, calc(var(--pfe-theme--container-spacer, 16px) * 2));
    }
    ```

5. Add additional attributes to a component, to allow users to switch between variants without CSS overrides, i.e.  `<pfe-card color="darkest">`

    * Any component that can change background colors for light DOM content MUST provide values for the broadcast variables. The `pfe-contexts` mixin is useful to loop through system colors.  See above [pfe-contexts example][#pfe-contexts].

#### Example of a component's sass file

```sass
// 1. Create local variable. Set value using color
// function to look up theme variables.
$LOCAL-VARIABLES: (
    Color: pfe-var(ui-link)
);


// 2. Map the color property to the local variable
:host ::slotted(a) {
    color: pfe-local(Color);
}

// 3. Provide a new fallback value for a local variable when necessary. Continue using the helper functions to reference the theme.
:host([color="accent"]) ::slotted(a) {
  color: pfe-local(Color, pfe-var(accent));
}

// 4. Override broadcasted last
:host([on="dark"]) ::slotted(a) {
  color: pfe-local(Color, pfe-var(link--on-dark));
}

:host([on="dark"][color="accent"]) ::slotted(a) {
  color: pfe-local(Color, pfe-var(accent--link));
}
```

----
<a name="broadcasted"></a>

### Containers + broadcast variables

If the container allows changes to background colors, then it should also influence the children by setting values of broadcast colors.

#### Notes on using broadcast colors in pfe-components

1. Only define CSS color <span style="text-decoration:underline;">property</span> once per element
2. Set the value equal to local variable:   \
  `color: var(pfe-local--Color);`
3. In the pfe-component, do not set <span style="text-decoration:underline;">value</span> of the broadcasted variables, instead set local variable values equal to the value of broadcasted, then with fallback colors
    1. Content components should never set the value of broadcasted vars, otherwise container components won't be able to pass them that information
4. Reset local variable values as needed for color attribute overrides.


## Troubleshooting web component style issues

### Problem: I expect the pfe-cta to have a red background, but it doesn't

1. **Inspect the element & look for the style property**
    * Check the light DOM

    * In the styles tab of web inspector, look for the CSS property `background`. Is the property present? Remember styles can be applied to `:host` as opposed to the actual component name, such as `pfe-cta`.

    ![Code block](/theme\_\_code_block_1.png =450x)

    * What is the value of the property? Try changing the value to a funny color.

2. **Check the shadow DOM**
    * Check if the property you expect is being applied elsewhere; i.e., some other element in the shadow root:

    ![Code block]\(/theme\_\_code_block_2.png =450x)

3. **Check to see if the property is being overwritten**
    * If the styles are being applied to the light DOM, and if it's still the wrong color, it could mean styles from elsewhere on the page are winning the specificity battle. [Learn more about detecting overrides](https://developers.google.com/web/tools/chrome-devtools/css/overrides)

    ![Code block]\(/theme\_\_code_block_3.png =450x)

    Options:
        1. Remove the styles that are more specific than your styles (may not be a viable option).
        2. Adjust the web component so that the styles are targeting the component itself, rather than it's children. Try using `:host { }`.
        3. Move the styles to target an element in the Shadow DOM where you'll have more control and little to no outside influence.
        4. If the styles are on a child of the web component, aka slotted content (like a link tag nested inside the `pfe-cta` tag), you might need to hook into [broadcast variables](https://docs.google.com/document/d/1P6ohcr13y0DTca_aow6Lm5qSnUcIdM56wu8Fc4SwE00/edit#heading=h.l0fiuwszzxzg).

4. **Check to see if the value of the property is pointing to a CSS variable**
    Sometimes CSS variables map to other CSS variables which have similar names, which can be confusing. Copy the exact name you are looking for and paste it into the [web inspector filter](https://developers.google.com/web/tools/chrome-devtools/css/reference#fiilter). Look for a plain hex value or RGBa value. For example:

    ```css
    --pfe-cta--BackgroundColor: var(--pfe-theme--color--surface--accent, #fe460d);
    --pfe-theme--color--surface--accent: #ee0000;
    ```

    Every time you hit a variable as the value, [change it to a unusual color](http://www.giphy.com/gifs/hu1kdgZ1ObIGPcENJ0), so you can verify that is the offending property.

+++
title = "Writing Styles"
description = ""
weight = 5
draft = false
bref = ""
toc = true
menu = "theme"
tags = [ "theme" ]
+++





## Writing web component styles

### Theme variables & related functions  

Theme variables exist so that when a user changes a system property such as color or font-size, they see the effects of that trickle through the system to nearly every component.

Several functions exist in the `pfe-sass` component to make it easier to theme individual components you are building!

1. **Color**:  Rather than using only Sass variables `$red` or hexidecimal colors like `#c00`, please use the `pfe-color()` function along with a theme variable, i.e. `pfe-color(ui-base)`. Occasionally you may have to wrap interpolation syntax `#{ }` around the function to allow Sass to compile, i.e. `#{pfe-color(ui-base)}`.


    * This function does some heavy-lifting by looking up the `$pfe-colors: ()` map and returning namespaced CSS variables for the theme and fallback color, in that order:


    ```
    :host {
       background-color: #{pfe-color(ui-base)};
    }
    ```   

     returns:

     ```css
     :host {
        background-color: var(--pfe-theme--color--ui-base, #0477a4));
     }
     ```

   *   Component color properties should almost always use [theme colors](https://raw.githubusercontent.com/starryeyez024/patternfly-theme/prerelease-1.0/dist/advanced-theme.css) as values.  (Sidenote, there is no "light" or "dark" color, only "lighter"/ "darker", it's all relative to the base color, it can only get lighter or darker from there.
      *   Lightest
      *   Lighter
      *   Base
      *   Darker
      *   Darkest
      *   Accent
      *   Complement

2. **Non-color Properties**:   Similarly, the `pfe-var` function does the same work of looking up values from the `$pfe-vars: ()` map, and returning the variable name and the fallback value:

    ```sass
    :host {
        font-size:   #{pfe-var(font-size)};
    }
    ```

    returns:

    ```
    :host {
        font-size: var(--pfe-theme--font-size, 16px);
    }
    ```    

3. **Broadcast Variables**: These variables are designed to cascade and influence the text or link styles of [content components nested inside container components](/getting-started/#3-use-patternfly-elements-markup).  Typically container components come with background colors, and thus need to communicate this to their children so that text and link colors can be adjusted for usability.

Inside the stylesheet for a container component, the following snippet will allow that component to broadcast its context to its children. The `surfaces` and `theme-contexts` mixins can be found in `pfe-sass/mixins/_custom-properties.scss`.  For these to work, please ensure you are importing pfe-sass and have the $LOCAL variable set to the name of your component at the top of your Sass file as shown below.

**In your container component:**
```
  @import "../../pfe-sass/pfe-sass";

 // name of the component, minus the pfe prefix:
  $LOCAL: band;

  // Pull in pfe-color settings for all supported surface colors
  @include pfe-surfaces;
```

This mixin will compile to the following CSS, one entry for each supported surface color (darkest, darker, base, lighter, lightest, accent, complement):
```
:host([pfe-color="darker"]) {
  --pfe-band--BackgroundColor: var(--pfe-theme--color--surface--darker, #464646);
  --theme: dark;
}
```

You can optionally customize this set by passing in a list of just the surfaces you would like added; you can also optionally use a different attribute name should you prefer.
```
  @import "../../pfe-sass/pfe-sass";

  $LOCAL: band;

  // Pull in pfe-color settings for all supported surface colors
  @include surfaces($surfaces: (lightest, darkest), $attr-name: pfe-background);
```

Inside the stylesheet for a content component, the following snippet will allow that component to opt-into the broadcast styles coming from it's parent.

**In your content component:**
```
  @import "../../pfe-sass/pfe-sass";

  // Pull in all themes with broadcast variables
  @include theme-contexts;
```

This mixin will expand to the following in your compiled CSS, one entry for each supported theme context (light, dark, saturated):
```
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

@media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
  :host([on="dark"]) {
    color: #fff;
    color: var(--pfe-theme--color--text--on-dark, #fff);
  }
}
```

You can optionally customize this set by passing in a list of just the themes you would like supported; you can also optionally turn off fallback support for older browsers.
```
  @import "../../pfe-sass/pfe-sass";

  // Pull in all themes with broadcast variables
  @include theme-contexts($themes: (light, dark), $fallback: false);
```


### Local variables & related functions     

2. It is recommended to create "local" variables for properties that developers are likely to override, such as color and sizing. You may use these functions that refer to theme variables to set the values of these local vars. Here's an example of some local variables you would find in the `pfe-cta.scss` file:

    ```
    :host {
         --pfe-cta--BorderRadius: 0;
         --pfe-cta--Color:  #{pfe-apply-broadcast(link)};
    }
    ```

    * When utilizing variables which are scoped to the component, you can use the `pfe-local()` function to refer to them by the shorthand property name:

    ```
    ::slotted(*) {
       color: #{pfe-local(Color--hover)};
    }
    ```

    * If you are using the function to set multiple values, you will need to add the interpolation syntax:

    ```
    :host([pfe-priority]) {
       padding: #{pfe-var(container-padding)} calc( #{pfe-var(container-padding) } * 2)}
    }
    ```

  * Naming conventions follow the same approach as outlined on the [PatternFly Global Variables documentation.](https://www.patternfly.org/v4/documentation/overview/global-css-variables).

3. Avoid use of `!important` if possible


4. Suggested easiest approach to theming your component:
    1. Add properties with normal values first, `color: #c00`.
    2. Then go back and add / replace with local variables, `color: var(--pfe-cta--Color)` or use the local var function `pfe-local(Color)`.
        * _It's worth noting that very time we surface something as a variable, we offer an opportunity to lean away from the design system. There's no need to create a local variable for all properties._
    3. Replace the values of local variables with functions that refer to the theme, `color: pfe-color(accent)` and `pfe-vars(padding)`
    4.  Add additional attributes to a component, to allow users to switch between variants without CSS overrides, i.e.  `<pfe card color="darkest">`
        * Any component that can change background colors MUST provide colors for the broadcast variables. The `pfe-theme` mixin is useful to loop through system colors:  

            ```
            pfe-card {
               @include pfe-set-broadcast-theme(light);
            }
            ```

        * Use CSS property, such as `color:` once. If value needs to change based on variant, reset the value of the CSS variable rather than calling the property again.


    #### Example of a Component Sass file


    ```
    // 1. Create local variable. Set value using color
    // function to look up theme variables.
    :host {
      --pfe-local--Color: pfe-color(link);
    }


    // 2. Use color property once, map to local var value
    :host {
      ::slotted(a) {
         color: pfe-local(Color);
      }
    }

    // 3. Reset value of local variable for variants.
    // Continue to use theme functions.
    :host([priority])
      --pfe-local--Color: pfe-var(accent);   
    }

    // 4. Override broadcasted last
    [on="dark"] {
      --pfe-local--Color: pfe-var(link--on-dark);
    }
    [color="accent"] {
      --pfe-local--Color: pfe-var(accent--link);
    }
    ```

    compiled css:

    ```
    :host(:not([priority]) {
        ::slotted(a) {
            //NOTE: the compiled CSS will print color twice for IE11
            // which sometimes trips over CSS variables.
            //color: blue;
            color: var(--pfe-local--Color, blue) !important;
        }
    }
    ```

----

<a name="broadcasted"></a>
# Containers + broadcast variables

If the container allows changes to background colors, then it should also influence the children by setting values of broadcast colors.


## Notes on using broadcast colors in pfe-components  

1. Only define CSS color <span style="text-decoration:underline;">property</span> once per element
2. Set the value equal to local variable:   \
  `color: var(pfe-local--Color);`
3. In the pfe-component, do not set <span style="text-decoration:underline;">value</span> of the broadcasted variables, instead set local variable values equal to the value of broadcasted, then with fallback colors
    1. Content components should never set the value of broadcasted vars, otherwise container components won't be able to pass them that information
4. Reset local variable values as needed for color attribute overrides.


## Troubleshooting web component style issues

#### Problem: I expect that the pfe-cta should have a red background, but it does not.

1. **Inspect the element & look for the style property**
    1. Check the light DOM
    2. In the styles tab of web inspector, look for the CSS property `background`. Is the property present? Remember styles can be applied to `:host` as opposed to the actual component name, such as `pfe-cta`.

        <img src="/theme__code_block_1.png" width="450px">

    3. What is the value of the property? Try changing the value to a funny color. If there's no change then…

2. **Check the shadow DOM**
    1. Check to see if the property you expect is actually being applied elsewhere, like some other element in the shadow root:

        <img src="/theme__code_block_2.png" width="450px">


    2. What is the value of the property? Try changing the value to a funny color. If there's no change then…
2. **Check to see if the property is overridden**
    1. If the styles are being applied to the light DOM, and if it's still the wrong color, it means something other style from elsewhere on the page is winning the specificity war. [Learn more about detecting overrides.](https://developers.google.com/web/tools/chrome-devtools/css/overrides)

        <img src="/theme__code_block_3.png" width="450px">

    2. Options:
        1. Remove the styles that are more specific than your styles (may not be a viable option)
        2. Adjust the web component so that the styles are targeting the component itself, rather than it's children. Use `:host { }`
        3. Move the styles to target an element in the Shadow DOM
        4. If the styles are on a child of the web component (like a link tag inside the pfe-cta tag) you might need to hook into [broadcast variables.](https://docs.google.com/document/d/1P6ohcr13y0DTca_aow6Lm5qSnUcIdM56wu8Fc4SwE00/edit#heading=h.l0fiuwszzxzg)
        5. If this still doesn't work then...
3. **Check to see if the value of the property set to a CSS variable**
    1. Sometimes CSS variables map to other CSS variables which have similar names, which can be confusing. Copy the exact name you are looking for and paste it into the [web inspector filter](https://developers.google.com/web/tools/chrome-devtools/css/reference#fiilter). Look for a plain hex value or RGBa value. For example:

    ```
    --pfe-cta--background: var(--pfe-theme--color--surface--accent, #fe460d);
    --pfe-theme--color--surface--accent: #ee0000;
    ```

    2. And every time you hit a variable as the value, [change it to a funny color](http://www.giphy.com/gifs/hu1kdgZ1ObIGPcENJ0), so you can verify that is indeed the property you are looking for.

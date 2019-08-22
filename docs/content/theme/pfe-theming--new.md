
# Styling Slots 101

The lines blur between shadow DOM & light DOM when slots are involved. Basically if you add slot=” ” to a regular HTML element inside a web component, you are opening a window to allow styles from the web component to style that thing. It only applies directly to the item with the slot name on it though, nothing nested inside it. 

The examples below would be inside the my-component.scss file:



*   Style any slot. Probably way too general.

    ```
    ::slotted()  {}
    ```


*   Style any iframe in any slot. Still too general.

    ```
    ::slotted(iframe)  {}
    ```


*   Style any HTML element with attribute **<code>slot="video"</code></strong>, but not anything <em>inside</em> the slot.

    For example, 


    ```
    [name="video"]::slotted(*)  {}
    ```



    will style this markup inside the web component


    ```
    <my-component>
<h1 slot="video">I will get styled!</h1>
    <div slot="video">
      <h2>I will not get styled :(</h2>
    </div>
</my-component>
    ```


*   Add further specificity, styling only iframes with the slot="video"

    ```
    [name="video"]::slotted(iframe)  {}
    ```


*   This _<span style="text-decoration:underline;">won’t </span>_work

    ```
    ::slotted() iframe[name="video"] {}
::slotted() h2 {}
::slotted() anything_here… {}

    ```


[More examples in JSFiddle](https://jsfiddle.net/kendalltotten/qdz0tkcm/)


## Best practices for writing styles in the component sass file



*   Use theme variables + functions
    *   Rather than using sass variables or hex colors, please use the pfe-color function along with a theme variable like `#{pfe-color(ui-link)};`
    *   This is so that when a user changes a system color, they see the effects of that trickle through the system to nearly every component.
    *   Component color properties should almost always use [theme colors](https://static.redhat.com/libs/redhat/redhat-theme/2.0.0/advanced-theme.css) as values.  (Sidenote, there is no "light" or "dark" color, only "lighter"/ "darker", it's all relative to the base color, it can only get lighter or darker from there.
        *   Lightest
        *   Lighter
        *   Base
        *   Darker
        *   Darkest
        *   Accent
        *   Complement
*   Avoid use of !Important
    *   ShadyCSS adds !important to styles, which means we should not add !important to our stylesheets.
*   Style a component first, with normal system variables
    *   Then, if necessary, go back and add / replace with local variables
    *   Be stingy with local vars. Every time we surface something as a variable, we offer an opportunity to lean away from the design system
*   Adding additional color attribute support to a component, i.e  <pfe card `color=darkest>  `
    *   Any component that can change background colors MUST provide colors for the broadcast variables. 
    *   Use the mixin: @include pfe-set-broadcast($color);


# Containers + broadcast variables

If the container allows changes to background colors, then it should also influence the children by setting values of broadcast colors.


## Notes on using broadcast colors in pfe-components  



1. Only define CSS color <span style="text-decoration:underline;">property</span> once per element 
2. Set the value equal to local variable:   \
  `color: var(pfe-local--Color);`
3. In the pfe-component, do not set <span style="text-decoration:underline;">value</span> of the broadcasted variables, instead set local variable values equal to the value of broadcasted, then with fallback colors
    1. Content components should never set the value of broadcasted vars, otherwise container components won't be able to pass them that information
4. Reset local variable values as needed for color attribute overrides.


### **CSS Example**


```
    // 1. set up local vars equal to theme vars & fallbacks
    :host {
      --pfe-local--Color: var(theme--ui-link, #06c);
    }

    // 2. Use color property once, map to local var value
    :host(:not([priority]) {
      ::slotted(a) {
         //color: blue; CSS compiler will print this for IE11
         color: var(--pfe-local--Color, blue) !important;
      }
    }

    // 3. Use broadcasted as value, with theme fallback after other declarations
    :host {
      --pfe-local--Color: var(broadcasted--ui-link, var(theme--ui-link, #06c));   
    }

    // 4. Override broadcasted last
    [on=dark] {
      --pfe-local--Color: var(theme--ui-link--on-dark);
    }
    [color=accent] {
      --pfe-local--Color: var(theme--surface-accent--ui-link);
    }
```


### **Should I use on=dark or color=darkest on my container?  \
What's the difference? **



*   On=dark is being deprecated. Instead, custom classes already on the page should set broadcast values.
*   The original goal for **<code>on=dark</code></strong> was all about context. But instead of having to provide another attribute somewhere, the card or a band or another container will inform any nested components that the text color needs to change through the set of broadcast variables. Existing broadcast vars (defined in $BROADCAST-VARS)  include: text, ui-link, ui-link--hover, ui-link--visited, ui-link--focus.
*   If your page has a custom background color for a band or card, you should set the background and also set the broadcast colors.


```
pfe-card[color=darkest],
// OR
.ux-card[data-ux-theme="dark"],
// OR
.custom-dark-band {
  Background: black;
  --pfe-broadcasted--color--text:             var(--pfe-theme--color--text--on-dark, #fff);
  --pfe-broadcasted--color--ui-link:          var(--pfe-theme--color--ui-link--on-dark, #73bcf7);
  --pfe-broadcasted--color--ui-link--hover:   var(--pfe-theme--color--ui-link--on-dark--hover, pink);
  --pfe-broadcasted--color--ui-link--visited: var(--pfe-theme--color--ui-link--on-dark--visited, pink);
  --pfe-broadcasted--color--ui-link--focus:   var(--pfe-theme--color--ui-link--on-dark--focus, pink);
}
```


In themes (like the [advanced-theme.css](https://static.redhat.com/libs/redhat/redhat-theme/2.0.0/advanced-theme.css) file from the [Red Hat Theme](https://gitlab.corp.redhat.com/uxdd/redhat-theme) ) we apply broadcast variables to plain links, because they are light DOM and also have default colors applied by the browser. This CSS file not only includes variables but also styles for headlines and links on the page. It sets the colors for these elements using a CSS variable, which web components can change the value of.

For example, [advanced-theme.css](https://static.redhat.com/libs/redhat/redhat-theme/2.0.0/advanced-theme.css) includes


```
.PFElement a {
  color: var(--pfe-broadcasted--color--ui-link);
}
```


We choose not to apply broadcast colors to text elements like paragraphs because it still would not be high enough specificity to override anything coming from pre-existing stylesheets, and paragraphs will inherit color from parents. 


```
    Use case
    // this would not really be helpful to add to cp-theme or redhat-theme
    h1, h2, h3, h4, h5, h6, p { 
      color: var(--pfe-broadcasted--color--text);
    }
    // if there was some class like this in the theme, It would override it anyway. 
    body.editorial .body1.generic1 {
        color: #646464;
    }

    Instead, in the host of components, use:
    :host {
      color: var(--pfe-broadcasted--color--text);
    }
    Then call theme mixin to flip colors of the on=dark on=light attributes. Default tags will use these colors. If devs implementing the component have more specific styles on their page, they will have to handle it.
    :host([on="dark"]) {
      @include pfe-theme($theme: "dark");
    }
    :host([on="light"]) {
      @include pfe-theme($theme: "light");
    }
```



# Document styles vs. web component styles



*   Note that anything in the light DOM can be styled by regular classes loaded on the page (in the document head or inline) and they will *win* the specificity battle. For example, this style:

    ```
    <head>
<style>
      iframe {
        border: 2px solid wheat;
      }
    </style>
</head>
    ```



    Will trump any slotted styles coming from the web component CSS, like:


    ```
    [name="video"]::slotted(iframe)  {}
    ```



    However, you can move an element into the Shadow DOM, where document styles will not apply. 


    ```
    connectedCallback() {
      super.connectedCallback();

      const iframe = this.querySelector("iframe");
      this.shadowRoot.appendChild(iframe);
    }

    ```



## Troubleshooting web component style issues



1. **Inspect the element & look for the style property **
    1. Example: I expect that the pfe-cta should have a red background. 
    2. **Check the light DOM**
        1. In the styles tab of web inspector, look for the CSS property, like "background". Is the property present? Remember styles can be applied to :host as opposed to the component name, like pfe-cta \


<!-- inline image-->


        2. What is the value of the property? Try changing the value to a funny color. If there's no change then…
    3. **Check the shadow DOM**
        3. Check to see if the property you expect is actually being applied elsewhere, like some other element in the shadow root: 

<!-- inline image-->


<!-- inline image-->


        4. What is the value of the property? Try changing the value to a funny color. If there's no change then…
2. **Is the property overridden?**
    4. If the styles are being applied to the light dom, and if it's light gray, it means something other style from elsewhere on the page is winning the specificity war \


<!-- inline image-->

    5. Options:
        5. Remove the styles that are more specific than your styles (may not be a viable option)
        6. Adjust the web component so that the styles are targeting the component itself, rather than it's children. Use  :host { }
        7. Move the styles to target an element in the shadow DOM
        8. If the styles are on a child of the web component (like a link tag inside the pfe-cta tag) you might need to hook into [broadcast variables.](https://docs.google.com/document/d/1P6ohcr13y0DTca_aow6Lm5qSnUcIdM56wu8Fc4SwE00/edit#heading=h.l0fiuwszzxzg)
3. **Is the value of the property set to a CSS variable?**
    6. Sometimes CSS variables map to other CSS variables which have similar names, which can be confusing. Copy and paste the names you are looking for, until you hit a plain hex value or RGBa value. For example:

        ```
        -pfe-cta--background: var(--pfe-theme--color--surface--accent, #fe460d);
        --pfe-theme--color--surface--accent: #ee0000;
        ```


    7. And every time you hit a variable as the value, [change it to a funny color](http://www.giphy.com/gifs/hu1kdgZ1ObIGPcENJ0), so you can verify that is indeed the property you are looking for. \



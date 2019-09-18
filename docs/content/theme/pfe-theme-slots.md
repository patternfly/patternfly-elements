+++
title = "Create a themed PatternFly Element with Slots"
description = ""
weight = 2
draft = false
bref = ""
toc = true
menu = "theme"
tags = [ "theme" ]
+++



## Slots

<blockquote>
Elements that can be inserted into slots are known as <em>slotable</em>; when an element has been inserted in a slot, it is said to be <em>slotted</em>.
</blockquote>

At first glace, web components may seem tricky to theme, and there's a *lot* of [documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots). Here’s a simplified guide with some basic code examples.

1. **Slots are places to pass content or markup into specific regions within your web component template.**
    ```
	// pfe-card.html:
	<slot name="pfe-card--header"></slot>
	<slot></slot>
	<slot name="pfe-card--footer"></slot>
	```


2. **You can’t nest slots.**

	```
	// my-web-page.html:
	<pfe-card>
	 <div>
	   <h1 slot="pfe-card--header">This content will *not* render in the header slot of the card</h1>
	 </div>
	</pfe-card>
	```
  
  * Child elements within a web component must be direct descendants of the component. Once you nest something inside another tag, it can no longer be slotted.
  
      For example, if we assume the `pfe-cta` web component has some basic styles on all slots like this:   `::slotted()  { color: red; }`
  
    Then both the div and link tag would be styled:
  
    ```
     <pfe-cta pfe-priority="primary">
       <div>styled!</div>
       <a href="#">styled!</a>
     </pfe-cta>
    ```
    
    However, if the link tag is nested inside the div, then it would not receive styles because it’s not a direct child of the pfe-cta component.
    
    ```
     <pfe-cta pfe-priority="primary">
       <div>
         <a href="#">cannot receive styles, because it’s not a direct descendant of the slot. The div is.</a>
       </div>
     </pfe-cta>
    ```


3. **If you put content into a web component tag without a slot name, it will place that markup into the unnamed slot, if there is one.**

    ```
    <pfe-card>
       This would appear in the unnamed slot
    </pfe-card>
    ```

    * If there is no unnamed slot in the component, it will not render that content. For this reason, it’s perhaps a good idea to leave one unnamed slot if general markup is allowed.

	* For example, the reason we are able to style links within the CTA component is because the `<a>` tag is being passed into the only unnamed slot in the CTA component. The link tag doesn’t need an explicit attribute like `slot="link"` because if a web component has one unnamed `<slot></slot>` then anything you put inside that custom component tag will be in that slot by default. 
	
	```
	<pfe-cta priority="primary">
	  <a href="#">Primary</a>   
	  <!-- this link ^ is slotted by default -->
	</pfe-cta>
	```

4.  **Whenever you add the attribute `slot="foo"` in your web component template, you are prescribing *where* elements will appear, if they invoke the attribute `name="foo"`.**

Using the pfe-card template example above, let's explore what would happen if we called the slots out of order:

	```
	// my-web-page.html template
	<pfe-card>
	    <div slot="pfe-card--footer">World</div>
	    <div slot="pfe-card--header">Hello</div>
	</pfe-card>
	```
will render the content like this:

<br/>
<div style="background:#eee;padding:30px;width: 250px;">
    <div>Hello</div>
    <div>World</div>
</div>



# Styling Slots 101

The lines blur between shadow DOM & light DOM when slots are involved. Basically if you add the attribute `slot=" "` to a regular HTML element inside a web component, you are opening a window to allow styles from the web component to style that thing. It only applies directly to the item with the slot name on it though, nothing nested inside it. 

Note that slots should be direct descendants of the component tag, like so:

```
<pfe-card>
	<h1 slot="pfe-card--header">
	  <a>Yes!</a>
	</h1>
	<h1>
	  <a slot="pfe-card--header">Nope.</a>
	</h1>
</pfe-card>
```


The examples below would be inside a `pfe-component.scss` file:



1.   Style any slot. Probably way too general.

    ```
    ::slotted()  {
      color: red;
    }
    ```


2.   Style any link in any slot. Still too general.

    ```
    ::slotted(a)  {
      color: red;
    }
    ```


3.   Apply styles to any HTML element with attribute `slot="headline"`. Styles will cascade to nested children, but the specificity will *not* override anything inside the slot. 

    For example, this CSS: 


    ```   
    [name="headline"]::slotted(*)  {
      color: red;
      text-decoration: none;
    }
    ```

    will style the markup inside the web component accordingly:


    ```
    <my-component>
      <header slot="headline">
        I will be red!
        <a href="#">I will be red too, but will keep the underline provided by the browser styles.</h2>
      </header>
      
      <a slot="pfe-card--header">I shall have no underline.</a>

    </my-component>
    ```


4.   Add further specificity, styling only `<h1>` tags with the attribute `slot="headline"`

    ```
    [name="headline"]::slotted(h1)  {
      color: red;
    }
    ```
    
    ```
    <my-component>
      <h1 slot="headline">
        I will be red!
      </h1>
      <h2 slot="headline">
        I will not.
      </h2>
    </my-component>
    ```


5.  Nothing may follow the `::slotted()` selector, so these <span style="text-decoration:underline;">won’t</span> work

    ```
    ::slotted() iframe[name="video"] {}
    ::slotted() h2 {}
    ::slotted() [name="headline"] {}
    ::slotted() .headline {}
    ```


[More examples in JSFiddle](https://jsfiddle.net/kendalltotten/qdz0tkcm/)




# Document styles vs. web component styles



*   Note that anything in the light DOM can be styled by regular classes loaded on the page (in the document head or inline) and they will *win* the specificity battle. For example, this style:

    ```
    <head>
    <style>
      iframe {
        border: 2px solid red;
      }
    </style>
  </head>
    ```



    Will beat any slotted styles coming from the web component CSS, such as:


    ```
    [name="video"]::slotted(iframe)  {
        border: 2px solid blue;
    }
    ```



    However, you can move an element into the Shadow DOM, where document styles will not apply. 


    ```
    connectedCallback() {
      super.connectedCallback();

      const iframe = this.querySelector("iframe");
      this.shadowRoot.appendChild(iframe);
    }

    ```


## Writing styles in the component sass file

### Theme variables, local variables + related functions

When applying properties like color to your new component, it's important to reference CSS variables from the <a href="https://github.com/patternfly/patternfly-elements/blob/master/elements/pfe-sass/variables/_colors.scss" target="_blank">PatternFly Elements palette</a>. This way people using the components will be able to update all of them at once by changing the value of those palette variables.

Theme variables exist so that when a user changes a system property such as color or font-size, they see the effects of that trickle through the system to nearly every component.

  However, since it's also important for all CSS variables to have fallback values (should the variable not work), then the sass can become difficult to read and manage, since you now must input *two* colors (the variable and the fallback):

```css
.lots-of-work {
  color:             var(--pfe-theme--color--ui-link, #99ccff);
  background-color:  var(--pfe-theme--color--ui-accent, #fe460d);
}
```

Not to worry! Several functions exist in the `pfe-sass` component to make it easier to theme individual components you are building!

1. **Color**:  Rather than using only Sass variables `$red` or hexidecimal colors like `#c00`, please use the `pfe-color()` function along with a theme variable, i.e. `pfe-color(ui-link)`. Occasionally you may have to wrap interpolation syntax `#{ }` around the function to allow Sass to compile, i.e. `#{pfe-color(ui-link)}`. 
    *   This function does some heavy-lifting by looking up the `$pfe-colors: ()` map and returning namespaced CSS variables for the [broadcasted color](#broadcasted) (should it be passed down from a dark container), the theme color, and then a fallback color in that order: 
  
	```sass
	:host {
	   color: pfe-color(ui-link);
	}
	```     
   
    returns:
  
	```css
	:host {
	   color: var(--pfe-broadcasted--color--ui-link, var(--pfe-theme--color--ui-link, #06c));
	}
	```
      
   *   Component color properties should almost always use [theme colors](https://static.redhat.com/libs/redhat/redhat-theme/2.0.0/advanced-theme.css) as values.  (Sidenote, there is no "light" or "dark" color, only "lighter"/ "darker", it's all relative to the base color, it can only get lighter or darker from there.
      *   Lightest
      *   Lighter
      *   Base
      *   Darker
      *   Darkest
      *   Accent
      *   Complement
       
2. **Other Properties**:   Similarly, the `pfe-var` function does the same work of looking up values from the `$pfe-vars: ()` map, and returning the variable name and the fallback value:
      
	```sass
	:host {
	   font-size:   pfe-var(font-size);
	}
	```
	  
	returns:
	  
	```
	:host {
	   font-size: var(--pfe-theme--font-size, 16px);
	}
	```    
      
## Local component variables

In some cases, like the CTA (call-to-action) component, you might need to define a background color and a text color, as well as hover, focus, and visited states. That's a lot of colors! For this reason, it might be useful to create "local" variables for that particular component, and then redefine the values when different attributes come into play.

Additionally it is recommended to create these "local" variables for properties that developers are likely to override, such as color and sizing, should they need the scope. You may use these functions that refer to theme variables to set the values of these local vars. Here's an example of some local variables you would find in the `pfe-cta.scss` file:
     
```sass
 :host {
     --pfe-cta--BorderRadius: 0;
     --pfe-cta--Color:  pfe-color(ui-link);
     --pfe-cta--Color--hover:  pfe-color(ui-link--hover);
 }
```
       
  * When utilizing local variables, you can use the `pfe-local()` function to refer to them by the shorthand property name:
  
	```sass
	::slotted(*) {
	   color: pfe-local(Color--hover);
	}
	```
       
   * If you are using the function to set multiple values, you will need to add the interpolation syntax:
       
   ```sass
   :host([pfe-priority]) {
       padding: #{pfe-var(container-padding)} calc( #{pfe-var(container-padding) } * 2)} 
   }
   ``` 
    * We use the [BEM](https://css-tricks.com/using-sass-control-scope-bem-naming/) (block, element, modifier) naming convention for naming these local variables.

        * `--pfe-navigation--BackgroundColor:` standard naming for a simple variable mapped to a specific property
        * `--pfe-navigation--Padding--vertical:` standard naming for a variable mapped to a specific property but with a generic note about where it is being applied
        (vertical vs. PaddingTop & PaddingBottom which would/should have the same values)
        * `--pfe-navigation--icon:` generic naming for a thing mapped to different properties, descriptive but not the actual name of the property it is applied to
        * `--pfe-navigation__overlay--BackgroundColor:` standard naming for a variable mapped to a specific property in a certain region of the component


3.   Avoid use of !Important if possible
    *   ShadyCSS adds !important to styles, which means we generally should not add !important to our stylesheets. 
    *   @TODO is this still the case? pfe-cta uses important

    
4.   Suggested easiest approach to theming: 
    1. Add properties with normal values first, `color: #c00`.
    2. Then go back and add / replace with local variables, `color: var(--pfe-cta--Color)` or use the local var function `pfe-local(Color)`.
        * _It's worth noting that very time we surface something as a variable, we offer an opportunity to lean away from the design system. There's no need to create a local variable for all properties._
    3. Replace the values of local variables with functions that refer to the theme, `color: pfe-color(accent)` and `pfe-vars(padding)`
    4.  Add additional attributes to a component, to allow users to switch between variants without CSS overrides, i.e.  `<pfe card color="darkest">`
        *   Any component that can change background colors MUST provide colors for the broadcast variables. The broadcast mixin is useful to loop through system colors:  `pfe-card { @include pfe-set-broadcast($color); } ` @TODO verify this in WIP broadcasted branch
      * Use CSS property, such as `color:` once. If value needs to change based on variant, reset the value of the CSS variable rather than calling the property again.



    #### Example of a Component Sass file


  ```sass
  
      // 1. Create local variable. Set value using color function to look up theme variables.
      :host {
        --pfe-local--Color: pfe-color(ui-link);
      }
  
  
      // 2. Use color property once, map to local var value
      
      :host {
        ::slotted(a) {
           color: pfe-local(Color);
        }
      }
  
      // 3. Reset value of local variable for variants. Continue to use theme functions.
      :host([priority])
        --pfe-local--Color: pfe-var(accent);   
      }
  
      // 4. Override broadcasted last
      [on="dark"] {
        --pfe-local--Color: pfe-var(ui-link--on-dark);
      }
      [color="accent"] {
        --pfe-local--Color: pfe-var(accent--ui-link);
      }
  ```
  compiled css:
  
  ```
        :host(:not([priority]) {
        ::slotted(a) {
            //NOTE: the compiled CSS will print color twice for IE11 which sometimes trips over CSS variables.
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



### **Should I use on=dark or color=darkest on my container?  \
What's the difference? **



*   The attribute `on=dark` is being deprecated. Instead, custom classes already on the page should set broadcast values.
*   The original goal for `on=dark` was all about context. But instead of having to provide another attribute somewhere, the card or a band or another container will inform any nested components that the text color needs to change through the set of broadcast variables. Existing broadcast vars (defined in $BROADCAST-VARS)  include: text, ui-link, ui-link--hover, ui-link--visited, ui-link--focus.
*   If your page has a custom background color for a band or card, you should set the background and also set the broadcast colors.


```
.custom-dark-band {
  background: black;
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




## Troubleshooting web component style issues

#### Problem: I expect that the pfe-cta should have a red background, but it does not. 

#### Troubleshooting steps:

1. **Inspect the element & look for the style property**
    1. Check the light DOM**
    2. In the styles tab of web inspector, look for the CSS property `background`. Is the property present? Remember styles can be applied to `:host` as opposed to the actual component name, such as `pfe-cta`.

    <!-- TODO get inline image from gdoc -->

    3. What is the value of the property? Try changing the value to a funny color. If there's no change then…
2. **Check the shadow DOM**
    1. Check to see if the property you expect is actually being applied elsewhere, like some other element in the shadow root: 

  <!-- TODO get inline image from gdoc -->
  
  
  <!-- TODO get inline image from gdoc -->


    2. What is the value of the property? Try changing the value to a funny color. If there's no change then…
2. **Check to see if the property is overridden**
    1. If the styles are being applied to the light DOM, and if it's still the wrong color, it means something other style from elsewhere on the page is winning the specificity war. [Learn more about detecting overrides.](https://developers.google.com/web/tools/chrome-devtools/css/overrides)

  <!-- TODO get inline image from gdoc -->

    2. Options:
        1. Remove the styles that are more specific than your styles (may not be a viable option)
        2. Adjust the web component so that the styles are targeting the component itself, rather than it's children. Use `:host { }`
        3. Move the styles to target an element in the Shadow DOM
        4. If the styles are on a child of the web component (like a link tag inside the pfe-cta tag) you might need to hook into [broadcast variables.](https://docs.google.com/document/d/1P6ohcr13y0DTca_aow6Lm5qSnUcIdM56wu8Fc4SwE00/edit#heading=h.l0fiuwszzxzg)
        5. If this still doesn't work then...
3. **Check to see if the value of the property set to a CSS variable**
    1. Sometimes CSS variables map to other CSS variables which have similar names, which can be confusing. Copy the exact name you are looking for and paste it into the [web inspector filter](https://developers.google.com/web/tools/chrome-devtools/css/reference#fiilter). Look for a plain hex value or RGBa value. For example:

        ```
        -pfe-cta--background: var(--pfe-theme--color--surface--accent, #fe460d);
        --pfe-theme--color--surface--accent: #ee0000;
        ```

    7=2. And every time you hit a variable as the value, [change it to a funny color](http://www.giphy.com/gifs/hu1kdgZ1ObIGPcENJ0), so you can verify that is indeed the property you are looking for. 


+++
title = "Templates & slots"
description = ""
weight = 3
draft = false
bref = ""
toc = true
menu = "start"
tags = [ "start" ]
+++



## Light DOM vs. Shadow DOM

The concept of light DOM is already familiar to any web developer. Basic HTML elements that you place into a `.html` file are light DOM. Tags like `<h1>`, `<div>` and `<aside>` are all simple light DOM.

However, when you add a tag to the light DOM such as `select`, the browser has additional styles that are invoked from within the Shadow DOM.

When building web components, you may choose whether to keep content in the light DOM (i.e. pfe-tab), or to copy it from the light DOM into the shadow DOM (i.e. pfe-accordion-header), or to place it in the shadow DOM only (i.e. close button on pfe-modal).

Consider the pros and cons for each approach, and remember that web components should still contain semantic markup and fail gracefully, so that users or search crawlers can still understand the content on the page.


### Light DOM


```
  <select>
    <option value="books">Books</option>
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="php">PHP</option>
    <option value="js">JavaScript</option>
  </select>
```   

 <select>
    <option value="books">Books</option>
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="php">PHP</option>
    <option value="js">JavaScript</option>
 </select>


![HTML select tag](/HTML__select__Tag.jpg)

One part of web components is the ability to utilize the Shadow DOM to store additional markup. There are pros and cons to placing things in the Light DOM:

**Pros**

1. Search engines can see content, resulting in better SEO
2. Users with JavaScript disabled can see content
3. Content can be themed with normal page stylesheets
    1. Sometimes this is desirable, in the case of paragraphs and links inside a pfe-tab panel for instance.


**Cons**

1. Web component styles can be overriden by styles already on the page. It's likely that existing styles will probably be more specific than styles associated with the `::slotted(*)` selector.

    ```
    // regular-styles.css
    pfe-cta a {
	    color: blue;
    }
    ```

    is more specific than  

	```
	// web-component.css
	::slotted(a) {
      color: red;
   }
   ```
   but you can win the specificity battle with !important

	```
	// web-component.css
	::slotted(a) {
      color: purple !important;
   }
   ```

2. Internet Explorer & Edge

    * @TODO finish notes below

    * Shady CSS polyfills `::slotted()`. Its not really slotted but its a workaround so that you can use that selector

    * IE11 gets complicated; if you add classes to elements in the component's template, you actually can style that class and it does work if the component upgrades correctly.

    * It's really hard to detect because it doesn't show up well in the inspector but if you select a shadow-element that has a custom class on it, it will show up in the header region above the body and it does get styles.


3. You can only style **direct** descendants of the slot.
    - If you need to use nested elements in the web component, like unordered lists & list items: `<ul><li>...</li></ul>` you cannot actually style the list item. This means you would have to ship a light DOM stylesheet with the web component:




**Regular Light DOM stylesheet (i.e. pfe-cta--lightdom.css )**

Some web components ship with a light DOM stylesheet for IE / Edge support. These stylesheets are opt-in (they are not included in the JavaScript file for the web component).

*   Includes
    *   component fallback styles
    *   basic class-based styles for typography  



<br/>


### Shadow DOM


**Pros**

1. Styles are encapsulated, so there are no worries about conflicting styles or specificity battles from other stylesheets.
    - Sometimes this is desirable, like links inside the pfe-cta component. We don't want those links to accept any external styles.
2. Semantic markup
    - Would google see an H3 that a dev put in the pfe-hero component, or the h1 that the component upgrades it to?


**Cons**

1. Analytics tools may not see links in the Shadow DOM. Therefore we must always bubble up custom events if there are interactive items in the shadow DOM.
2. When content is moved to the shadow DOM on upgrade, it can slow down rendering as the page re-paints




## Understanding web component templates and slots

_**Note:** Elements that can be inserted into slots are known as slotable; when an element has been inserted in a slot, it is said to be slotted._



*   Slots are places to pass content or markup into specific regions within your web component template.

```
// my-component.html:
<div class="custom">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
</div>
```


*   If you put some content between the opening & closing tags of a web component without a slot name, it will put that markup into the unnamed slot.
    *   If there is no unnamed slot, it will _not_ render that content.
    *   For this reason, it’s a good idea to leave one unnamed slot if general markup is allowed within that component. All PatternFly Element web components operate this way.
*   Whenever you add slot="something", you are telling the webcomponent where to put this information within the inner template.


```
// my-web-page.html:
 <pfe-card>
      <div slot="pfe-card--header">
          <h1>This heading text will appear in the card header region</h1>
      </div>
 </pfe-card>
```


*   You can’t have nested slots _with the same name_, but when you use different names, the web component will pick up the content and put it where it belongs in the web component template, regardless of order in the light DOM.

```
// my-web-page.html:
<pfe-component>
  <div slot="header">
    <h1 slot="header">This is no good</h1>
  </div>
</pfe-component>

// But...
<pfe-component>
  <div slot="header">
    <h1 slot="header__content">This will work</h1>
  </div>
</pfe-component>

```



*   The direct descendant inside a slot in the light DOM will accept styles from the web component. For example, we are able to style links within the CTA component because the `<a>` tag is being passed into the unnamed slot in the CTA component. The link tag doesn’t need an explicit attribute like` slot="link"` because if a web component has one unnamed `<slot></slot>`, then anything you put inside that custom component tag will be in that slot by default.

    ```
    <pfe-cta pfe-priority="primary">
      <a href="#">Primary</a>  
      <!-- this link ^ is in the default slot -->
    </pfe-cta>
    ```


*   Child elements within a custom tag don’t have to be the first child to be styled, they only have to be direct descendants of the component. Meaning once you nest something inside another tag, it can no longer receive styles targeted with the `::slotted` pseudo selector. Assuming the component has some basic styles on all slots like this:  `::slotted(*)  {border: red solid 1px;}` then both the div and H2 tag would recieve a red border:

    ```
    <pfe-cta pfe-priority="primary">
      <div>styled!</div>
      <h2 href="#">styled!</h2>
    </pfe-cta>
    ```

    However, the nested `<a>` tag would not receive styles, because it’s not a direct child of the pfe-cta component.


    ```
    <pfe-cta pfe-priority="primary">
      <div>
        <a href="#">This cannot receive styles
        from the web component, because it's nested</a>
      </div>
    </pfe-cta>

    ```




# Dynamic HTML Templates


## Attributes & Variables

Should you need to capture information via an attribute in your web component, such as a number, URL, or some other piece of information that does not need to be exposed to search engines, here’s how you make that happen:


```
// Example HTML using component:
<div class="main-content">
  <pfe-component alt="bananas are great!" how-many-bananas="4"></pfe-component>
</div>

// Example of web component Javascript:
  get numberBananas() {
    return this.getAttribute("how-many-bananas");
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
}

// Example of web component template:
<div class="content">
  <slot class="header" name="header">
    <h1>${this.numberBananas} Bananas</h1>
  </slot>
  <slot class="body"></slot>
</div>
```



## Data Object

If you want to loop over a set of data, you can do so by utilizing the constructor. You’ll need to delay rendering of the component though to avoid a flash of unstyled content.


```
// Component JavaScript:
  constructor() {
    super(RhVideoBand, {
      delayRender: true
    });

    this.data = {
      titles: ["The Sandlot", "The Natural", "Major League"]
    };
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === "how-many-movies") {
      this.data.videoUrl = newValue;
      this.render();
    }
  }

// Component template:
<h1>${this.data.numberMovies}</h1>
<div src="${this.data.numberMovies}"></div>

<ul>
	${this.data.titles.map(title => `
	  <li>${title}</li>
	`).join('\n')}
</ul>
```

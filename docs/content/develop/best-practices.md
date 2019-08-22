+++
title = "Development best practices"
description = ""
weight = 3
draft = false
bref = ""
toc = true
menu = "start"
tags = [ "start" ]
+++



**#DRAFT**


[TOC]



# Dynamic HTML Templates


## Attributes & Variables 101

Should you need to capture information via an attribute in your web component, such as a number, URL, or some other piece of information that does not need to be exposed to search engines, here’s how you make that happen:


```

// HTML using component:
```


<code><my-component alt=<strong>"</strong>bananas are great!"  how-many-bananas="4"> \
</my-component></code> \



```
// Component javascript:
  get numberBananas() {
    return this.getAttribute("how-many-bananas");
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
}
// Component template:
<h1>${this.numberBananas}</h1>
or
<div src="${this.numberBananas}"></div>
```



## Data Object

If you want to loop over a set of data, you can do so by utilizing the constructor. You’ll need to delay rendering of the component though because...


```
// Component javascript:
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


# Web component templates & "slots"

**_Note: Elements that can be inserted into slots are known as slotable; when an element has been inserted in a slot, it is said to be slotted._**



*   Slots are places to pass content or markup into specific regions within your web component template.

    ```
    // my-component.html:
<div class="whatev">
        <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
</div>
    ```


*   If you put something into a web component tag without a slot name, it will put that markup into the unnamed slot. 
    *   If there is no unnamed slot, it will <span style="text-decoration:underline;">not</span> render that content. 
    *   For this reason, it’s perhaps a good idea to leave one unnamed slot if general markup is allowed.
*   Whenever you add slot="something", you are telling the webcomponent where to put this information in the inner template

    ```
    // my-web-page.html:
<my-component>
      <div slot="header">
      </div>
</my-component>
    ```


*   You can’t have nested slots _with the same name _(but when you use different names, the WC will pick up the content and put it where it belongs in the WC template)


```
// my-web-page.html:
	<my-component>
      <div slot="header">
        <h1 slot="header">Nope</h1>
      </div>
    </my-component>
	// But...
<my-component>
      <div slot="header">
        <h1 slot="header__content">Yep</h1>
      </div>
    </my-component>

```



*   The reason that we are able to style links within the CTA component is because the `<a>` tag is being passed into the only unnamed slot in the CTA component. The link tag doesn’t need an explicit attribute like` slot="link"` because if a web component has one unnamed <slot></slot> then anything you put inside that custom component tag will be in that slot by default. 

    ```
    <rh-cta priority="primary">
    <a href="#">Primary</a>   <!-- this element is slotted by default -->
</rh-cta>
    ```


*   Child elements within a custom tag don’t have to be the first child to be styled, they only have to be direct descendants of the component. Meaning once you nest something inside another tag, it can no longer receive styles targeted with the ::slotted pseudo selector \
Assuming the component has some basic styles on all slots like this:   `::slotted()  {}`
    
    Then both the div and link tag would be styled:


    ```
    <rh-cta priority="primary">
      <div>styled!</div>
      <a href="#">styled!</a>
    </rh-cta>
    ```



    However the nested `<a>` tag would not receive styles, because it’s not a direct child of the rh-cta component.


    ```
    <rh-cta priority="primary">
      <div>
        <a href="#">cannot receive styles, because it's nested</a>
      </div>
    </rh-cta>

    ```





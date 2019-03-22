+++
title = "Theming Slots"
description = ""
weight = 5
draft = false
bref = ""
toc = true
menu = "theme"
tags = [ "theme" ]
+++


There seem to be lots of tricky gotchas related to web components, and a *lot* of [documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots). Here’s a simplified guide with some basic code examples.


## Slots

**Vocab tip: Elements that can be inserted into slots are known as _slotable_; when an element has been inserted in a slot, it is said to be _slotted_.**

* Slots are places to pass content or markup into specific regions within your web component template.

```
// my-component.html:
<div class="whatev">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
</div>
```

* If you put something into a web component tag without a slot name, it will put that markup into the unnamed slot. 

    * If there is no unnamed slot, it will not render that content. 

    * For this reason, it’s perhaps a good idea to leave one unnamed slot if general markup is allowed.

* Whenever you add slot="something", you are telling the webcomponent where to put this information in the inner template

```
// my-web-page.html:

<my-component>
    <div slot="header"></div>
</my-component>
```

* You can’t have nested slots.

```
// my-web-page.html:
<my-component>
   <div slot="header">
     <h1 slot="header">Nope</h1>
   </div>
 </my-component>

 ```

* The reason that we are able to style links within the CTA component is because the `<a>` tag is being passed into the only unnamed slot in the CTA component. The link tag doesn’t need an explicit attribute like `slot="link"` because if a web component has one unnamed `<slot></slot>` then anything you put inside that custom component tag will be in that slot by default. 

```
<pfe-cta priority="primary">
    <a href="#">Primary</a>   <!-- this element is slotted by default -->
</pfe-cta>
```

* Child elements within a custom tag don’t have to be the first child to be styled, they only have to be direct descendants of the component. Meaning, once you nest something inside another tag, it can no longer receive styles targeted with the `::slotted` pseudo selector.

If we assume the component has some basic styles on all slots like this:   `::slotted()  { color: red; }`

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

## Styling Slots

The lines blur between shadow DOM & light DOM when slots are involved. If you add `slot="name_of_slot"` to a regular HTML element inside a web component, you are opening a window to allow styles from the web component to style that thing. The `::slotted()` CSS pseudo-element represents any element that has been placed into a slot inside an HTML template.

This only works when used inside CSS placed within a shadow DOM. Note also that this selector won't select a text node placed into a slot; it only targets actual elements. *Meaning, these styles _only_ apply directly to the item with the slot name on it though, nothing nested inside it.* 

The examples below would be inside the my-component.scss file:

* Style any content with the slot attribute. 
    * `::slotted() { border: red solid 1px; }` 
* Style any content with the slot attribute. 
    * `::slotted() { border: red solid 1px; }` 
* Style any iframe with the slot attribute.
    * `::slotted(iframe) { border: red solid 1px; }` 
* Style any HTML element inside of a slot with the attribute **slot="video"**
    * `[name="video"]::slotted(*)  { border-color: red solid 1px; }` will style direct children of the slot:

    * ```
    <my-component>
       <div slot="video"> 
	   <span> <!--I will have a red border-->
	      <h2>I will not have a red border.</h2>
	   </span>
       </div>
    </my-component>
	```

* Add further specificity, styling only iframes with the slot="video"
    * `[name="video"]::slotted(iframe)  { color: red; }`

* Just for the record, the element you are targeting within the slot must be within the parenthesis but you cannot add anything after that:

    * ` ::slotted() [name="video"] {}`
    * ` ::slotted(h2) a {}`
    * ` ::slotted() anything_here… {}`

[Demo on JS Fiddle](https://jsfiddle.net/kendalltotten/7n3ep9q0/27/)

## Document styles vs. web component styles

* Note that anything in the light DOM can be styled by regular classes loaded on the page (in the document head or inline) and they will *win* the specificity battle. For example, this style:

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

`[name="video"]::slotted(iframe)  {}`

However, you can move an element into the Shadow DOM, where document styles will not apply. 

```
connectedCallback() {
  super.connectedCallback();
  const iframe = this.querySelector("iframe");
  this.shadowRoot.appendChild(iframe);
}
```

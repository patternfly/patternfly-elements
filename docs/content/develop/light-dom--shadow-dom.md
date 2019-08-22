

# Light DOM vs Shadow DOM


## Light DOM


### **Pros**



1. Search engines can see content, resulting in better SEO
2. Users with JavaScript disabled can see content
3. Content can be themed with normal page stylesheets
    1. Sometimes this is desirable, in the case of paragraphs and links inside a pfe-tab panel for instance.


### **Cons**



1. **Style limitations**
    1. Web component styles can conflict with styles already on the page, and existing styles will probably be more specific than :slotted
    2. You can only style direct descendants of the slot. 
        1. So if you need to use nested elements in the web component, like list items and unordered list <ul><li>...</li></ul> you cannot actually style the list item. This means you would have to ship a regular stylesheet outside the web component.
    3. IE11
        2. IE11 polyfill WILL NOT style elements in the light DOM ( ::slotted ) \
Pfe-cta in IE 11: 




        3. `::slotted(a) {color: foo !important}` \
is more specific than  \
`pfe-cta.PFElement a {color: foo !important}` \
In all browsers except IE11, because slotted doesn't exist. 


## Regular Light DOM stylesheet ( pfelements.css )



*   Opt-in
*   Would it match or mirror regular patternfly styles?
*   Includes 
    *   component fallback styles
    *   basic class-based styles for typography (when pfe-text doesn't do the trick)
*   Could include 
    *   Reveal.css
    *   font styles
*   And put it on static.redhat.com


# 

---



## Shadow DOM 


### **Pros**



1. Styles are encapsulated, so no worries about conflicting styles or specificity battles. 
    1. Sometimes this is desirable, like links inside the pfe-cta component.
2. Semantic markup
    2. Would google see an H3 that a dev put in the pfe-hero component, or the h1 that the component upgrades it to?


### **Cons**



1. Analytics
    1. Analytics tools may not see links in the Shadow DOM
        1. Bubble up events from our components?
            1. Can we fire off generic events that analytics can watch for?
        2. Connect directly to analytics API?
        3. Can Adobe/Clicktale "listen" for clicks on the pfe-cta (etc.)?
            2. Adobe needs to get this figured out. This is the way the web is going
    2. Test
        4. Quick test in Adobe Target shows that conversion events are not recognized from the Shadow DOM
        5. Set up test in Clicktale, custom events that clicktale can listen for
        6. Don’t forget Pendo
        7. Other analytics tools??
2. When content is moved to the shadow DOM on upgrade, it can slow down rendering as the page re-paints
1. 


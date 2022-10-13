---
"@patternfly/pfe-accordion": minor
---

### pfe-accordion 1:1 with patternfly!  

With this change we are adding three base class components `BaseAccordion`, `BaseAccordionHeader`, and `BaseAccordion` panel which rhds will extend off of for functionality. 

### Adding: 
- Single
    - Only a single accordion panel can be expanded at a time.
- Fixed
    - Sets a fixed height for an accordion panel with a scrollbar if the context extends beyond this height.
- Bordered
    - Sets a border between the headers of the accordion
- Large 
    - Uses the large styles along with the bordered styles (larger font, more padding, font color change, and more)

### Breaking Changes
- Disclosure variant removed (will be re-implemented in rhds)

#### Example Accordion:
```html
<pfe-accordion>
    <pfe-accordion-header>
        Item One
    </pfe-accordion-header>
    <pfe-accordion-panel>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </pfe-accordion-panel>
    <pfe-accordion-header>
        Item Two
    </pfe-accordion-header>
    <pfe-accordion-panel>
        Adipiscing elit pellentesque habitant morbi tristique senectus et netus et.
    </pfe-accordion-panel>
</pfe-accordion>
```

#### Example Nested Accordion 
```html
<pfe-accordion>
    <pfe-accordion-header>
        Item One
    </pfe-accordion-header>
    <pfe-accordion-panel>
        <pfe-accordion>
            <pfe-accordion-header>
                Nested Item One
            </pfe-accordion-header>
            <pfe-accordion-panel>
                Elementum nisi quis eleifend quam adipiscing vitae proin sagittis.
            </pfe-accordion-panel>
            <pfe-accordion-header>
                Nested Item Two
            </pfe-accordion-header>
            <pfe-accordion-panel>
                Justo donec enim diam vulputate ut pharetra sit. 
            </pfe-accordion-panel>
        </pfe-accordion>
    </pfe-accordion-panel>
    <pfe-accordion-header>
        Item Two
    </pfe-accordion-header>
    <pfe-accordion-panel>
        Aliquam ultrices sagittis orci a scelerisque purus semper eget.
    </pfe-accordion-panel>
</pfe-accordion>
```
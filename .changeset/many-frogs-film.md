---
"@patternfly/pfe-card": major
---

## Patternfly Card 1:1 🎉

This release migrates Patternfly Card `pfe-card` to Patternfly 1:1 and matches the style and functionality to PFv4.

This will have several breaking changes from the existing `pfe-card`. Many of the attributes will be moving to `rh-card`.

### NEW: Features and Updates
- Styles now match PFv4 Card.
- Size Attribute: `small` is updated to `compact` and `large` is now an option 
  - Example: `<pfe-card size='large'></pfe-card>`.
- Rounded Attribute: NEW! Optionally applies a border radius for the drop shadow and/or border of the card. 
  - Example: `<pfe-card rounded></pfe-card>`
- FullHeight Attribute: NEW! Optionally allow the card to take up the full height of the parent element.
  - Example: `<pfe-card fullHeight></pfe-card>`
- Plain Attribute: NEW! Removes the border on the card element.
  - Example: `<pfe-card plain></pfe-card>`


### Breaking Changes
- No longer includes an `imgSrc` attribute.
- No longer has a dark mode theme. 
- No longer includes a `border` attribute.


The select component provides a way to create list of options in a form.

There are 3 ways of providing options to your component:

- Users can provide options using ```<select>``` element inside ```<pfe-select>```
- Users can pass custom options as an array of objects to the `pfeOptions` setter function
- Users can append more options by using an `addOptions()` API

Note: pfe-select component can also be used in places where dropdowns are needed but its more suitable for forms. For dropdowns, there will be a separate component.
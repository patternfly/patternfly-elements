# `@patternfly/pfe-core`

Utilities for building PatternFly elements.

## Controllers

- `CascadeController` - cascades configured properties/attributes to child elements
- `ColorContextController` - enables colour context detection
- `CssVariableController` - caches computed styles
- `LightDOMController` - controls a light-DOM mutation observer
- `Logger` - logging utilities
- `PerfController` - measures element upgrading performance
- `PropertyObserverController` - caches set values for observed properties until element is updated
- `SlotController` - utilities for managing slots and slotted content

## Decorators

- `@bound` - binds a decorated method to the object instance
- `@cascades` - cascades the decorated property to configured light and shadow child elements
- `@initializer` - executes a decorated method when the element upgrades and on DOM mutations (opt-out)
- `@observed` - runs a callback when the decorated property changes
- `@pfelement` - enabled body auto-reveal as well as colour context and other PFE features

## Directives

- `when` - element-position directive which adds or removes an element depending on a condition

## Functions

- `debounce` - debounce a function
- `pfeEvent` - create (deprecated) composed `CustomEvent`s
- `getRandomId` - generate a random element ID, optionally with a given prefix

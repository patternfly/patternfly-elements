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
- `@time` - tracks the time a method takes to complete using the [performance 
  API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
- `@trace` - debug decorator which logs the name and result of a class method whenever it runs

## Directives

- `when` - element-position directive which adds or removes an element depending on a condition

## Functions

- `debounce` - debounce a function
- `deprecatedCustomEvent` - create (deprecated) composed `CustomEvent`s
- `getRandomId` - generate a random element ID, optionally with a given prefix

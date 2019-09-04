+++
title = "JavaScript"
description = ""
weight = 3
draft = false
bref = ""
toc = true
menu = "start"
tags = [ "start" ]
+++


[TOC]


## Javascript

** DRAFT **

*   Web components and constructors
    *   [Web Components: The Constructor and PatternFly Elements](https://medium.com/@kylebuch8/web-components-the-constructor-and-patternfly-elements-606bc51938c9)
*   Custom Events
    *   How do we structure events coming from our web components?
    *   Use custom events to convey state changes
    *   Can we use custom events to 
    *   Not adding attributes to custom elements
    *   [A possible best practice of always making event names lowercase](https://custom-elements-everywhere.com/). This is the style most DOM events already use: mousedown, popstate, beforeunload, etc.
*   How to pass data to and from a web component
    *   Simple data: attributes
    *   Complex data: properties
*   How to use a third party library with your web component
*   Web Components MVP
    *   [https://www.patternfly.org/patternfly-elements/getting-started/](https://www.patternfly.org/patternfly-elements/getting-started/)
*   Mutation Observers
    *   What are they?
    *   Why should we use them?
    *   Why not just use “slotchange” event?
*   How to use a web component in a framework
    *   Angular
    *   React
    *   Vue
*   How to build a web component that will work in other frameworks
    *   It’s not as simple as you’d think
        *   Angular presents some unique challenges with how you’d expect a web component to behave
            *   connectedCallback can fire multiple times
            *   Light dom is manipulated by Angular causing issues with mutation observers
*   IE11 won't upgrade my component, what's up with that?
    *   Wrap everything in DOM content loader
 
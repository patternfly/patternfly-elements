+++
title = "Framework Support"
description = "Our mission is to create web components that will work with any of the JavaScript frameworks."
weight = 3
draft = false
bref = ""
toc = true
menu = "start"
tags = [ "start" ]
+++

## Supported and Tested Frameworks
If a framework isn't listed below, it doesn't mean that PatternFly Elements won't work with that framework. Chances are that PatternFly Elements *will* work, it's just that we aren't explicitly testing against that framework.

- AngularJS
- Angular
- React
- Vue

Every PatternFly Element is built on top of the [Custom Elements v1 spec](https://w3c.github.io/webcomponents/spec/custom/). There are some caveats, but we'll get into those later.

## Framework Integration

We're working on writing a few guides that will demonstrate how to incorporate PatternFly Elements into certain frameworks. We'll post links here once we have them written.

- Integrating with AngularJS
- Integrating with Angular
- Integrating with React
- Integrating with Vue

## Framework Caveats

PatternFly Elements are just custom elements built with javascript, but there are a few interoperability issues when they are used within certain frameworks. Rather than keeping track of all the interoperability issues here, we'll just point to the [Custom Elements Everywhere](https://custom-elements-everywhere.com/) project that runs a series of 30 tests for each framework and lists the interoperability issues for each.

The good news is that some frameworks pass all of the tests while the ones with the most issues still pass the majority of the tests. And even though the framework may not pass all of the tests, there are ways to get around the issues and the Custom Elements Everywhere site shows just how to do that.

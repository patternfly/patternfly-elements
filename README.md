![RHElements logo](./brand/logo/png/rhelements-logo-red.png)

[RHElements][rhe] is a collection of flexible and lightweight [Web Components][wc], and the tools to build them.

These are the goals of the RHElements project:

 - **minimal**: small file size, minimal boilerplate, no "framework-like" features.
 - **universal**: write once, use everywhere.  RHElements work in React, Vue, Angular, vanilla JS, anywhere HTML elements are used.

The result of these two principles is plugging one set of comopnents into a wide variety of applications, bringing UX consistency and developer familiarity to any web project.

A Yeoman generator is included for creating Web Components that meets these goals.

Let's get started!


## Quick-start

    git clone git@github.com:RHElements/rhelements.git
    cd rhelements
    npm install # this will take a while due to lerna bootstrap
    npm start

The `start` script will launch the demo pages.  Demo pages are static showcases of each element, and also serve as scratchpads for experimenting while working on an element.

*Notice: You will need to use [Node](https://nodejs.org/en/) v.7 or higher.  Storybook _may_ not work with Node v.10.*


## Contributing

See the [contribution guide][contrib]!


[rhe]: https://github.com/RHElements/rhelements
[wc]: https://developer.mozilla.org/en-US/docs/Web/Web_Components
[contrib]: CONTRIBUTING.md

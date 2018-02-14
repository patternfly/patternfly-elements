# RHElements

These are all the RHElements.

## Quick-start

    git clone git@github.com:RHElements/rhelements.git
    cd rhelements
    npm install # this will take a while due to lerna bootstrap
    npm start

## Workflow

 - **npm start** <br> launch a demo server
 - **npm test** <br> run tests on ALL rhelements
 - **npm run build** <br> run build on ALL rhelements
 - **npm run bootstrap** <br> update ALL rhelements' dependencies and interlink them with [lerna bootstrap][lerna-bs]

[lerna]: https://github.com/lerna/lerna
[lerna-bs]: https://github.com/lerna/lerna#bootstrap

## Component Development

Each component that you work on will need to be built for you to see the changes. Every component has a gulpfile and an npm script, `npm run dev`, that you can run on each component that you're working on. The `npm run dev` command will watch the files in the component's directory and will run the build command when you make changes to the component.

### Example Development on a component

```
cd elements/cp-accordion
npm run dev
```

Make any changes you need and the gulpfile will handle transpiling the element down to ES5 and will bring in the HTML template and Sass file into the template in the component.

If you started the dev server at the root of RHElements, then you should be able to navigate to the demo page for the component, refresh the page, and see your changes.

## Storybook

We've added [Storybook](https://storybook.js.org/) to RHElements as a way to preview our components as they are being developed. We'll also use Storybook to export a static site that will be the demo site for RHElements.

To run storybook

```
npm run storybook
```

This will start a web server on port 9001. Navigate in your browser to `http://localhost:9001` to see Storybook in action. Storybook will watch for file changes and reload the browser automatically for you. This is a little slow at the moment, but we'll look into speeding this up.

### Known Issues with Storybook

Any component that has a third-party dependency will not work in our current setup. We are looking into what we need to do to resolve the issue.

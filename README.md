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

To test all RHElements, run `npm test` from the root of the repo.  If you only want to test the component you're working on:

    cd elements/cp-accordion
    npm test

Also, if your tests are failing and you want access to a live browser to investigate why, the following flag will keep the browser open.

    npm test -- -p

Then open the URL that will be printed in the terminal.  It looks something like this: `http://localhost:8081/components/@rhelements/rhelements/generated-index.html?cli_browser_id=0`.

## Storybook

We've added [Storybook](https://storybook.js.org/) to RHElements as a way to preview our components as they are being developed. We'll also use Storybook to export a static site that will be the demo site for RHElements.

To run storybook

```
npm run storybook
```

This will start a web server on port 9001. Navigate in your browser to `http://localhost:9001` to see Storybook in action. Storybook will watch for file changes and reload the browser automatically for you. This is a little slow at the moment, but we'll look into speeding this up.

To export the storybook static site

```
npm run build-storybook
```

This places a build of the storybook site in the .storybook_out directory.

### Known Issues with Storybook

For any component that has a third-party dependency you will need to update the `/.storybook/webpack.config.js` file. You will need to create an alias for your depedency.

For example:

```
"../../whatwg-fetch/fetch.js": path.join( // this is the third-party dependency in the rhelement
  __dirname,
  "../node_modules/whatwg-fetch/fetch.js" // this is where it lives in node_modules
)
```

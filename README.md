# RHElements

Welcome to the RHElements project! Let's get started.

## Quick-start

*Notice: You will need to use [Node](https://nodejs.org/en/) v.7 or higher. These components are written in [ES6](http://es6-features.org/).*

```
$ git clone git@github.com:RHElements/rhelements.git
$ cd rhelements
$ npm install # this will take a while due to lerna bootstrap
$ npm rebuild node-sass  # this may be necessary
$ npm start
```

## Scripts

- `$ npm start`
    - Launch a demo server. This should be continuously running as you develop.
- `$ npm run new`
    -  Create a new component.
- `$ npm test`
    -  Run tests on ALL RHElements.
- `$ npm run build`
    -  Run build on ALL RHElements.
- `$ npm run bootstrap`
    - Update ALL rhelements' dependencies and interlink them with [lerna bootstrap][lerna-bs].
- `$ npm run storybook`
    - Run storybook
- `$ npm run build-storybook`
    - Build storybook for deployment

[lerna]: https://github.com/lerna/lerna
[lerna-bs]: https://github.com/lerna/lerna#bootstrap

## Component development

Because this is a monorepo, each component will need to be independently built in order to actively work on and preview the changes. Every component has its own Gulp file and NPM script.

While still running `npm start` in one terminal window (which runs the local server), you will need to open another terminal window, drill into the directory of the component you'd like to work on, and execute the `npm run dev` command. This command will use gulp tasks to watch the files within that component directory and will automatically re-run the build command and refresh the browser when you make changes to the component.

### Example development on a component

```
$ cd /Sites/rhelement
$ npm start

# SHIFT + CTRL + T to open a new tab in Terminal

$ cd elements/rh-card  # or any other component
$ npm run dev
```

Make a change to the component and save. The gulpfile will handle transpiling the element down to ES5 and will bring in the HTML and Sass into the template in the component.

## Test

To test all RHElements, run `npm test` from the root of the repo. If you only want to test the component you're working on:

```
$ cd elements/rh-card
$ npm test
```

Also, if your tests are failing and you want access to a live browser to investigate why, the following flag will keep the browser open.

```
$ npm test -- -p
```

Then open the URL that will be printed in the terminal. It looks something like this: `http://localhost:8081/components/@rhelements/rhelements/generated-index.html?cli_browser_id=0`.

## Storybook

We've added [Storybook](https://storybook.js.org/) to RHElements as a way to preview our components as they are being developed. We'll also use Storybook to export a static site that will be the demo site for RHElements.

To run storybook

```
$ npm run storybook
```

This will start a web server on port 9001. Navigate in your browser to `http://localhost:9001` to see Storybook in action. Storybook will watch for file changes and reload the browser automatically for you. This is a little slow at the moment, but we'll look into speeding this up.

To export the storybook static site

```
$ npm run build-storybook
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

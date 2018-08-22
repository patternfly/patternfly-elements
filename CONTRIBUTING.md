![RHElements logo](./brand/logo/png/rhelements-logo-blue.png)

This is the contribution guide for [RHElements](README.md), a collection of flexible and lightweight [Web Components][wc].

## Ways to contribute

STUB

## Developing new RHElements

There are two types of development commands, root commands which you run from the root directory of the project, and element commands, which you run from an element directory.

### Root commands

These commands can be run from the root directory of RHElements and operate on all the elements.

| command | description |
|---|---|
| `npm start` | Launch a demo server. This should be continuously running as you work. |
| `npm test` | Test ALL RHElements. |
| `npm run build` | Build ALL RHElements. |
| `npm run bootstrap` | Update ALL rhelements' dependencies and interlink them with [lerna bootstrap][lerna-bs]. |
| `npm run storybook` | Run storybook  |

### Element commands

If you're working on a specific element, you can work more efficiently by going into the element's directory.  There, you'll get access to the following commands which act only on the element you care about.

| command | description |
|---|---|
| `npm test` | Test this element. |
| `npm run dev` | Start a watcher that builds when source files change. |
| `npm run build` | Build this element. |

Even when you're focused on a specific element, it's still useful to have the root command `npm start` running, so you can view the demo page of your element.

## Element development

Because this is a monorepo, each element will need to be independently built in order to actively work on and preview the changes. Every element has its own Gulp file and NPM script. 

While still running `npm start` in one terminal window (which runs the local server), you will need to open another terminal window, drill into the directory of the element you'd like to work on, and execute the `npm run dev` command. This command will use gulp tasks to watch the files within that element directory and will automatically re-run the build command and refresh the browser when you make changes to the element.

### Example development on an element

In one terminal, start the demo server.

    cd /Sites/rhelement
    npm start

In another terminal:

    cd elements/rh-card  # or any other element
    npm run dev

Make a change to the element and save. The gulpfile will handle transpiling the element down to ES5 and will bring in the HTML and Sass into the template in the element.

## Test

To test all RHElements, run `npm test` from the root of the repo. If you only want to test the element you're working on:

    cd elements/rh-card
    npm test

Also, if your tests are failing and you want access to a live browser to investigate why, the following flag will keep the browser open.

    npm test -- -p

The URL to the tests will be printed in the terminal.  It looks something like this: `http://localhost:8081/components/@rhelements/rhelements/generated-index.html?cli_browser_id=0`.

## Storybook

We've added [Storybook](https://storybook.js.org/) to RHElements as a way to preview our elements as they are being developed. We'll also use Storybook to export a static site that will be the demo site for RHElements.

To run storybook

    npm run storybook

This will start a web server on port 9001. Navigate in your browser to `http://localhost:9001` to see Storybook in action. Storybook will watch for file changes and reload the browser automatically for you. This is a little slow at the moment, but we'll look into speeding this up.

To export the storybook static site

    npm run build-storybook

This places a build of the storybook site in the .storybook_out directory.

### Known Issues with Storybook

For any element that has a third-party dependency you will need to update the `/.storybook/webpack.config.js` file. You will need to create an alias for your dependency.

For example:

    "../../whatwg-fetch/fetch.js": path.join( // this is the third-party dependency in the rhelement
      __dirname,
      "../node_modules/whatwg-fetch/fetch.js" // this is where it lives in node_modules
    )

[lerna]: https://lernajs.io/
[lerna-bs]: https://github.com/lerna/lerna#bootstrap
[npmorg]: https://www.npmjs.com/org/rhelements
[npmscripts]: https://docs.npmjs.com/misc/scripts
[wc]: https://developer.mozilla.org/en-US/docs/Web/Web_Components
[contrib]: CONTRIBUTING.md

## Testing

STUB.


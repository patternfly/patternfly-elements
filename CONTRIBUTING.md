![RHElements logo](./brand/logo/png/rhelements-logo-blue.png)

This is the contribution guide for [RHElements](README.md), a collection of flexible and lightweight [Web Components][wc] and the tools to build them.

## Ways to contribute to RHElements

 - Use RHElements in your app (TODO: link to Homa's example apps and API docs)
 - Theming (TODO: describe how)
 - [Creating new elements](#developing-new-rhelements)
 - Improve documentation (TODO: describe how to do this)

## Developing RHElements

There are two types of development commands, root commands which you run from the root directory of the project, and element commands, which you run from an element directory.


### Repo commands

These commands are run from the root directory of RHElements repo.  They operate on all elements.

| command | description |
|---|---|
| `npm start` | Launch a demo server. This should be continuously running as you work. |
| `npm test` | Test ALL RHElements. |
| `npm run build` | Build ALL RHElements. |
| `npm run new` | Create a new RHElement. |
| `npm run storybook` | Run storybook to preview all the RHElements.  |
| `npm run build-storybook` | Build storybook for deployment as a static app.  |


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

    cd /Sites/rhelement
    npm start

    # SHIFT + CTRL + T to open a new tab in Terminal

    cd elements/rh-card  # or any other element
    npm run dev

Make a change to the element and save. The gulpfile will handle transpiling the element down to ES5 and will bring in the HTML and Sass into the template in the element.

## Creating a new RHElement


## Testing

### Running tests

To test ALL RHElements, go to the root of the repo and run:

    npm test
    
If you only want to test the element you're working on:

    cd elements/rh-card
    npm test

Also, if your tests are failing and you want access to a live browser to investigate why, the following flag will keep the browser open.

    npm test -- -p

The `-p` flag is available in both root and element-only testing.  Then open the URL that will be printed in the terminal. It looks something like this: `http://localhost:8081/components/@rhelements/rhelements/generated-index.html?cli_browser_id=0`.

### Writing tests

Tests are run using the [Web Component Tester][wct].  Each RHElement has a `test` directory.  Let's use `elements/rhelement/` as an example:

    rhelement/                                    
    └── test/
        ├── index.html                            
        ├── rhelement_cascade_attribute_test.html 
        └── rhelement_test.html                   

Each `rhelement_*.html` file contains a certain type of tests, and `index.html` is a loader which tells the test runner which html files to run.  These test files can get pretty long, which is why splitting up the tests can be a good idea.  However, most of the elements have only `index.html` and `elementName_test.html`, since they are very simple and don't have complex enough features to require splitting up their test suites.

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


[wct]: https://github.com/Polymer/tools/tree/master/packages/web-component-tester
[lerna]: https://lernajs.io/
[npmorg]: https://www.npmjs.com/org/rhelements
[wc]: https://developer.mozilla.org/en-US/docs/Web/Web_Components


---
layout: layout-docs.njk
title: Write your tests
order: 7
tags:
  - develop
---

<style>
  img {
    max-width: 100%;
  }
</style>

{% band %}

Let's write tests for `pf-cool-element`.

We rely on a few tools to ensure our element is reliable in production:

1.  [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/), built and maintained by the [Modern Web](https://modern-web.dev) team, makes testing easy. All we have to do is create a new test file, provide example markup and write some tests.
2.  We'll use the [Chai Assertion Library](http://chaijs.com/api/assert/) to make sure our tests pass since Mocha and Chai are both included in Web Test Runner. Additional [Web Component specific test helpers](https://open-wc.org/docs/testing/helpers/) are also available.

## Web Test Runner

If you followed the [Prerequisites](/docs/develop/setup/#prerequisites) in [Setup](/docs/develop/setup), your setup should already be done.

### Test Setup

In the root of the element, there's a `/test` directory with an `pf-cool-element.spec.ts` file. This file will be where we add all of our tests.

Let's add four stubs for the functionality we need to test in our test file:

```ts
// Import testing helpers. For more information check out:
// https://open-wc.org/docs/testing/helpers/
import { expect, html } from '@open-wc/testing/index-no-side-effects.js';

// Import our custom fixture wrapper. This allows us to run tests
// in React and Vue as well as a normal fixture.
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';

// Import the element we're testing.
import { PfeCoolElement } from '@patternfly/pf-cool-element';

// One element template, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const template = html`
  <pf-cool-element photo-url="https://avatars2.githubusercontent.com/u/330256?s=400&u=de56919e816dc9f821469c2f86174f29141a896e&v=4">
    Kyle Buchanan
  </pf-cool-element>
`;

describe('<pf-cool-element>', function() {
  it('should upgrade', async function() {
    const el = await createFixture<PfeCoolElement>(template);
    const klass = customElements.get(<%= className %>.tag);
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(<%= className %>);
  });

  it('should set a username from the light DOM', async function() {

  });

  it('should allow a user to follow a profile', async function() {

  });

  it('should set the state to follow if the following attribute is present', async function() {

  });

  it('should set a profile pic from the photo-url attribute', async function() {

  });
});
```

You'll notice the `createFixture<PfeCoolElement>(element)` function. A [test fixture](https://open-wc.org/docs/testing/helpers/#test-fixtures)
renders a piece of HTML and injects into the DOM so that you can test the behavior of your component.
It returns the first DOM element from the template so that you can interact with it if needed.
For example you can call functions, look up DOM nodes or inspect the rendered HTML.
The `<PfeCoolElement>` part signals to TypeScript that the result of calling this function is an instance of `PfeCoolElement`;

Test fixtures are async to ensure rendering is properly completed.

By using `createFixture`, separate instances of tests that use a React or Vue wrapper are automatically created at run time.
This allows us to easy test our elements within a React or Vue context.

Now that our setup is complete, we can start building our tests.

### Test Cases

Let's build out the 'pf-cool-element' tests. We'll use fixtures and `querySelector` to grab our element and include DOM API methods to interact with what we're testing.

Here is the full JavaScript code:

```ts
it('should set a username from the light DOM', async function() {
  const el = await createFixture<PfeCoolElement>(element);

  // Grab the text content from the light DOM and trim off any extra white space.
  const elementLightDOMContent = el.textContent.trim();
  const shadowRoot = el.shadowRoot;

  // Grab the text content from the slot and trim off any extra white space.
  const slotContent = shadowRoot.querySelector('slot').assignedNodes()[0].textContent.trim();

  // Make sure the slot text matches the light DOM text.
  expect(slotContent).to.equal(elementLightDOMContent);
});

it('should allow a user to follow a profile', async function() {
  const el = await createFixture<PfeCoolElement>(element);
  // Click the button.
  el.button.click();

  // Wait for the element to be done updating.
  // Make sure to do this after changing any of the element's observed properties,
  // or calling methods which do so
  await el.updateComplete;

  // Make sure the follow attribute is now updated.
  expect(el.hasAttribute("follow")).to.be.true;
  // Make sure the text is updated to reflect the "unfollowed" state.
  expect(el.button.textContent).to.equal("Unfollow");

  // Click the button again.
  el.button.click();

  await el.updateComplete;

  // Make sure the follow attribute is updated.
  expect(el.hasAttribute("follow")).to.be.false;
  // Make sure the text is updated to reflect the "follow" state.
  expect(el.button.textContent).to.equal("Follow");

});

it('should set the state to follow if the following attribute is present', async function() {
  const el = await createFixture<PfeCoolElement>(element);

  // Manually add the follow attribute.
  el.setAttribute("follow", "");

  // Wait for the element to be done updating.
  await el.updateComplete;

  // Make sure the follow attribute is now updated.
  expect(el.hasAttribute("follow")).to.be.true;
  // Make sure the text is updated to reflect the "unfollowed" state.
  expect(el.button.textContent).to.equal("Unfollow");

  // Manually remove the follow attribute.
  el.removeAttribute("follow");

  // Wait for the element to be done updating.
  await el.updateComplete;

  // Make sure the follow attribute is updated.
  expect(el.hasAttribute("follow")).to.be.false;
  // Make sure the text is updated to reflect the "follow" state.
  expect(el.button.textContent).to.equal("Follow");
});

it('should set a profile pic from the photo-url attribute', async function() {
  const el = await createFixture<PfeCoolElement>(element);

  // Grab the `photo-url` attribute.
  const photoUrlAttribute = el.getAttribute('photo-url');

  // Find the background image in the shadow root css.
  const shadowRoot = el.shadowRoot;
  const profilePicContainer = shadowRoot.querySelector('#profile-pic');
  const backgroundImageUrl = profilePicContainer.style.backgroundImage.slice(5, -2);

  // Make sure the photo url attribute matches the background image url.
  expect(photoUrlAttribute).to.equal(backgroundImageUrl);
});
```

You may notice we're accessing the `shadowRoot` here, available to our element by extending `LitElement` in the definition of our element.
You can also access content in the `<slot></slot>` of your element by using the `assignedNodes()` method.

We use a slot for the username in `pf-cool-element`, making it available to us in the array returned by `assignedNodes()`.

```javascript
shadowRoot.querySelector('slot').assignedNodes()[0].textContent.trim();
```

### Run the Test

Lastly, we can run the test command below to see how we did. You can focus on this specific test so you're only running the tests for `pf-cool-element`.

```bash
npm run test:watch -- --files **/pf-cool-element.spec.ts
```

This command starts up web test runner and allows us to debug our test in the browser.

![npm test command](/images/develop/develop-testing-first-pass.png)

Debugging the test in the browser should give you the following:

![Browser test debugging](/images/develop/develop-testing-final-pass.png)

#### Note

![Unexpected reserved word error](/images/develop/develop-testing-error.png)

If you run into an `SyntaxError: Unexpected reserved word` error while writing tests, chances are it's because you're using an `await` function without an `async` parent.

**Will error out**

```js
it('should set a username from the light DOM', function() {
  const el = await createFixture<PfeCoolElement>(element);
});
```

**Fixed by adding the `async` keyword**

```js
it('should set a username from the light DOM', async function() {
  const el = await createFixture<PfeCoolElement>(element);
});
```

### Testing against Vue and React

Now that our vanilla JavaScript tests are passing, let's use Vue and React wrappers to run the same tests.

Run the same tests within React by using:

```bash
npm run test:watch --group with-react
```

Run the same tests within Vue with:

```bash
npm run test:watch --group with-vue
```

This works exactly the same as the normal `npm run test:watch` command, the only difference is the fixture will be wrapped with React or Vue.

Finally we can run the test "ci" command which will run the following:

1. All tests.
2. Those same tests with React wrappers.
3. Those same tests with Vue wrappers.

```bash
npm run test:ci
```

![Final test output](/images/develop/develop-testing-npm-test.png)

Nice! All tests are working in Chrome and with React and Vue wrappers. 🎉

A quick note about the framework testing—the Vue and React tests are meant to be an initial first pass in those frameworks just to make sure that the functionality is working and that the component renders properly.

That's it for testing! Now that we've created our `pf-cool-element` and all of our code passes, the final step is to submit a pull request to get this merged.

<a class="cta" href="../pull-request">Next up: Open a pull request</a>

{% endband %}
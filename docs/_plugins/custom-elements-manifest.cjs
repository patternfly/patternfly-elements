const dedent = require('dedent');
const glob = require('glob');

const { EleventyRenderPlugin } = require('@11ty/eleventy');
const { readFile } = require('fs/promises');

const {
  getAttributes,
  getCssCustomProperties,
  getCssParts,
  getDescription,
  getProperties,
  getEvents,
  getMethods,
  getSlots,
} = require('./filters/cem.cjs');

const getComponentName = path => {
  const [, , component] = path.match(/(elements|core)\/pfe-([-\w]+)\//);
  return component;
};

module.exports = {
  configFunction(eleventyConfig, options) {
    /**
     * Grab each package's manifest and add it to the global 11ty data cascade
     * under manifests[pkgName], where pkgName is the unscoped, unprefixed name
     * e.g. `accordion` for `@patternfly/pfe-accordion`
     */
    eleventyConfig.addGlobalData('manifests', async () =>
      glob.sync('{elements,core}/*/custom-elements.json')
        .reduce(async (manifests, path) => Object.assign(await manifests, {
          [getComponentName(path)]: JSON.parse(await readFile(path, 'utf-8').catch(() => '{}')),
        }), Promise.resolve({})));

    // add `renderTemplate` filter
    eleventyConfig.addPlugin(EleventyRenderPlugin);

    options = {
      renderTemplate: eleventyConfig.getFilter('renderTemplate'),

      async getManifest(slug) {
        const manifests = await eleventyConfig.globalData.manifests();
        const manifest = manifests[slug];
        if (!manifest) {
          throw new Error(`Could not find manifest for package pfe-${slug}`);
        } else {
          return manifest;
        }
      },

      /**
       * <pfe-band class="header" use-grid>
       *   <h1 slot="header">Element Title</h1>
       * </pfe-band>
       *
       * <pfe-band size="small" color="lightest" use-grid>
       *   <h2 slot="header">Overview</h2>
       *
       *   Element description from CEM
       *
       *   <demo-snippet>
       *     <p>shows off features</p>
       *   </demo-snippet>
       * </pfe-band>
       *
       * <pfe-band size="small" color="lightest" use-grid>
       *   <h2 slot="header">Installation</h2>
       *
       *   ```shell
       *   npm install @patternfly/pfe-button
       *   ```
       *
       * </pfe-band>
       */
      async renderOverview(options, content, kwargs) {
        const M = await import('mdast-builder');
        const { toMarkdown } = await import('mdast-util-to-markdown');
        const { fromMarkdown } = await import('mdast-util-from-markdown');

        const description =
          getDescription(kwargs?.for, await options.getManifest(this.page.fileSlug));

        return toMarkdown(M.root([
          M.html(dedent`
            <pfe-band class="header" use-grid>
              <h1 slot="header">${kwargs.title}</h1>
            </pfe-band>`),
          await band({ header: 'Overview' }, [
            fromMarkdown(description),
            fromMarkdown(content ?? ''),
          ]),
          await band({ header: 'Installation' }, [
            M.code('shell', `npm install @patternfly/${kwargs.for}`),
          ]),
        ]));
      },

      /**
       * <pfe-band size="small" color="lightest" use-grid>
       *
       *   ## Attributes
       *
       *   Paired shortcode content goes here
       *
       *   ### an-attribute
       *   An element attribute
       *
       * </pfe-band>
       */
      async renderAttributes(options, content, kwargs) {
        const M = await import('mdast-builder');
        const { toMarkdown } = await import('mdast-util-to-markdown');
        const { fromMarkdown } = await import('mdast-util-from-markdown');

        const attrs = getAttributes(kwargs?.for, await options.getManifest(this.page.fileSlug));

        kwargs.header ??= 'Attributes';
        kwargs.level ??= 2;

        return band(kwargs, [
          fromMarkdown(content ?? ''),
          ...(!attrs.length && !content) ? [M.text('None')] : attrs.flatMap(attr => [
            M.heading(kwargs.level + 1, M.inlineCode(attr.name)),
            ...maybeDeprecation(attr, { M, fromMarkdown }),
            M.paragraph([
              M.emphasis(M.text('Type')),
              M.text(': '),
              // TODO: inline code highlighting: render the markdown to html and extract the `<code>` from the `<pre>`
              M.inlineCode(attr.type?.text ?? 'unknown'),
              M.text(' '),
              ...!attr.fieldName ? [] : [
                M.emphasis(M.text('DOM Property')),
                M.text(': '),
                M.inlineCode(attr.fieldName),
                M.text(' '),
              ],
              M.emphasis(M.text('Default')),
              M.text(': '),
              // TODO: inline code highlighting: render the markdown to html and extract the `<code>` from the `<pre>`
              attr.default ? M.inlineCode(attr.default) : M.text('none'),
            ]),
            fromMarkdown(attr.description ?? ''),
          ]),
        ]).then(toMarkdown);
      },

      /**
       * <pfe-band size="small" color="lightest" use-grid>
       *
       *   ## Properties
       *
       *   Paired shortcode content goes here
       *
       *   ### classProperty
       *   A class property that has no attribute
       *
       * </pfe-band>
       */
      async renderProperties(options, content, kwargs) {
        const M = await import('mdast-builder');
        const { toMarkdown } = await import('mdast-util-to-markdown');
        const { fromMarkdown } = await import('mdast-util-from-markdown');

        const properties =
          getProperties(kwargs?.for, await options.getManifest(this.page.fileSlug));

        kwargs.header ??= 'DOM Properties';
        kwargs.level ??= 2;

        return !properties.length ? '' : band(kwargs, [
          fromMarkdown(content ?? ''),
          ...properties.flatMap(prop => [
            M.heading(kwargs.level + 1, M.inlineCode(prop.name)),
            ...maybeDeprecation(prop, { M, fromMarkdown }),
            M.paragraph([
              M.emphasis(M.text('Type')),
              M.text(': '),
              // TODO: inline code highlighting: render the markdown to html and extract the `<code>` from the `<pre>`
              M.inlineCode(prop.type?.text ?? 'unknown'),
              M.text(' '),
              M.emphasis(M.text('Default')),
              M.text(': '),
              ...maybeDeprecation(prop, { M, fromMarkdown }),
              // TODO: inline code highlighting: render the markdown to html and extract the `<code>` from the `<pre>`
              prop.default ? M.inlineCode(prop.default) : M.text('none'),
            ]),
            fromMarkdown(prop.description ?? ''),
          ]),
        ]).then(toMarkdown);
      },

      /**
       * <pfe-band size="small" color="lightest" use-grid>
       *
       *   <a id="styling-hooks"></a>
       *   ## CSS Custom Properties
       *
       *   Paired shortcode content goes here
       *
       *   | CSS Property   | Description    | Default         |
       *   | -------------- | -------------- | --------------- |
       *   | `--a-property` | A CSS Property | `rebeccapurple` |
       *
       * </pfe-band>
       */
      async renderCssCustomProperties(options, content, kwargs) {
        const M = await import('mdast-builder');
        const { toMarkdown } = await import('mdast-util-to-markdown');
        const { fromMarkdown } = await import('mdast-util-from-markdown');
        const { gfmTableToMarkdown } = await import('mdast-util-gfm-table');

        const props =
          getCssCustomProperties(kwargs?.for, await options.getManifest(this.page.fileSlug));

        kwargs.header ??= 'CSS Custom Properties';
        kwargs.level ??= 2;

        return band(kwargs, [
          fromMarkdown(content ?? ''),
            !props.length ? M.text(content.length ? '' : 'None')
          : M.table(['left', 'left', 'left'], [
            M.tableRow([
              M.tableCell(M.text('CSS Property')),
              M.tableCell(M.text('Description')),
              M.tableCell(M.text('Default')),
            ]),
            ...props.flatMap(prop => M.tableRow([
              M.tableCell([
                // TODO: inline code highlighting: render the markdown to html and extract the `<code>` from the `<pre>`
                M.inlineCode(prop.name),
                ...maybeDeprecation(prop, { M, fromMarkdown }),
              ]),
              M.tableCell(fromMarkdown(prop.description ?? '')),
              M.tableCell(
                  !prop.default ? M.text('-')
                  // TODO: inline code highlighting: render the markdown to html and extract the `<code>` from the `<pre>`
                : M.inlineCode(prop.default.replace(/^`|`$/g, ''))
              ),
            ])),
          ]),
        ]).then(x => toMarkdown(x, { extensions: [gfmTableToMarkdown()] }));
      },

      /**
       * <pfe-band size="small" color="lightest" use-grid>
       *
       *   ## CSS Shadow Parts
       *
       *   Paired shortcode content goes here
       *
       *   **`a-part`** targets an element shadow part
       *
       * </pfe-band>
       */
      async renderCssParts(options, content, kwargs) {
        const M = await import('mdast-builder');
        const { toMarkdown } = await import('mdast-util-to-markdown');
        const { fromMarkdown } = await import('mdast-util-from-markdown');

        const parts = getCssParts(kwargs?.for, await options.getManifest(this.page.fileSlug));

        kwargs.header ??= 'CSS Shadow Parts';
        kwargs.level ??= 2;

        return !parts.length ? '' : band(kwargs, [
          fromMarkdown(content ?? ''),
          ...parts.map(part => M.paragraph([
            M.strong(M.inlineCode(part.name)),
            ...maybeDeprecation(part, { M, fromMarkdown }),
            M.text(' '),
            fromMarkdown(part.description ?? ''),
          ])),
        ]).then(toMarkdown);
      },

      /**
       * <pfe-band size="small" color="lightest" use-grid>
       *
       *   ## Events
       *
       *   Paired shortcode content goes here
       *
       *   ### event
       *   Fired when an event occurs
       *
       * </pfe-band>
       */
      async renderEvents(options, content, kwargs) {
        const M = await import('mdast-builder');
        const { toMarkdown } = await import('mdast-util-to-markdown');
        const { fromMarkdown } = await import('mdast-util-from-markdown');

        const manifest = await options.getManifest(this.page.fileSlug);
        const events = getEvents(kwargs?.for, manifest);

        kwargs.header ??= 'Events';
        kwargs.level ??= 2;

        return band(kwargs, [
          fromMarkdown(content ?? ''),
          ...!events.length ? [M.text('None')]
          : events.flatMap(event => [
            M.heading(kwargs.level + 1, M.inlineCode(event.name)),
            ...maybeDeprecation(event, { M, fromMarkdown }),
            fromMarkdown(event.description ?? ''),
            ...maybeType(event, { M, fromMarkdown, manifest, header: 'Event Type:' }),
          ]),
        ]).then(toMarkdown);
      },

      /**
       * <pfe-band size="small" color="lightest" use-grid>
       *
       *   ## Methods
       *
       *   Paired shortcode content goes here
       *
       *   ### method(param: type, param: type)
       *   A class method
       *
       * </pfe-band>
       */
      async renderMethods(options, content, kwargs) {
        const M = await import('mdast-builder');
        const { toMarkdown } = await import('mdast-util-to-markdown');
        const { fromMarkdown } = await import('mdast-util-from-markdown');

        const methods = getMethods(kwargs?.for, await options.getManifest(this.page.fileSlug));

        kwargs.header ??= 'Methods';
        kwargs.level ??= 2;

        const stringifyParams = method => (method.parameters ?? []).map(p =>
          `${p.name}: ${p.type?.text ?? 'unknown'}`).join(', ') ?? '';

        return band(kwargs, [
          fromMarkdown(content ?? ''),
          ...!methods.length ? [M.text('None')] : methods.flatMap(method => [
            // TODO: inline code highlighting: render the markdown to html and extract the `<code>` from the `<pre>`
            M.heading(kwargs.level + 1, M.inlineCode(`${method.name}(${stringifyParams(method)})`)),
            ...maybeDeprecation(method, { M, fromMarkdown }),
            fromMarkdown(method.description ?? ''),
          ]),
        ]).then(toMarkdown);
      },

      /**
       * <pfe-band size="small" color="lightest" use-grid>
       *
       *   ## Slots
       *
       *   Paired shortcode content goes here
       *
       *   ### Default Slot
       *   Element content
       *
       *   ### `named-slot`
       *   Specific content
       *
       * </pfe-band>
       */
      async renderSlots(options, content, kwargs) {
        const M = await import('mdast-builder');
        const { toMarkdown } = await import('mdast-util-to-markdown');
        const { fromMarkdown } = await import('mdast-util-from-markdown');

        const slots =
          getSlots(kwargs?.for, await options.getManifest(this.page.fileSlug));

        kwargs.header ??= 'Slots';
        kwargs.level ??= 2;

        return band(kwargs, [
          fromMarkdown(content ?? ''),
          ...!slots.length ? [M.text('None')] : slots.flatMap(slot => [
            M.heading(
              kwargs.level + 1,
              slot.name ? M.inlineCode(slot.name) : M.text('Default Slot')
            ),
            ...maybeDeprecation(slot, { M, fromMarkdown }),
            fromMarkdown(slot.description ?? ''),
          ]),
        ]).then(toMarkdown);
      },

      ...options,
    };

    /**
     * <pfe-band size="small" color="lightest" use-grid>
     *   <h2 slot="header">${kwargs.header}</h2>
     *
     *   ${content}
     *
     * </pfe-band>
     */
    eleventyConfig.addPairedAsyncShortcode('band', async function(content, kwargs) {
      const { toMarkdown } = await import('mdast-util-to-markdown');
      const { fromMarkdown } = await import('mdast-util-from-markdown');
      return band(kwargs, fromMarkdown(content ?? '').children).then(toMarkdown);
    });

    /* eslint-disable max-len */
    eleventyConfig.addPairedAsyncShortcode('renderAttributes', /** @this {*} */function(content, kwargs) {
      return options.renderAttributes.call(this, options, content, kwargs);
    });
    eleventyConfig.addPairedAsyncShortcode('renderCssCustomProperties', /** @this {*} */function(content, kwargs) {
      return options.renderCssCustomProperties.call(this, options, content, kwargs);
    });
    eleventyConfig.addPairedAsyncShortcode('renderCssParts', /** @this {*} */function(content, kwargs) {
      return options.renderCssParts.call(this, options, content, kwargs);
    });
    eleventyConfig.addPairedAsyncShortcode('renderEvents', /** @this {*} */function(content, kwargs) {
      return options.renderEvents.call(this, options, content, kwargs);
    });
    eleventyConfig.addPairedAsyncShortcode('renderMethods', /** @this {*} */function(content, kwargs) {
      return options.renderMethods.call(this, options, content, kwargs);
    });
    eleventyConfig.addPairedAsyncShortcode('renderOverview', /** @this {*} */function(content, kwargs) {
      return options.renderOverview.call(this, options, content, kwargs);
    });
    eleventyConfig.addPairedAsyncShortcode('renderProperties', /** @this {*} */function(content, kwargs) {
      return options.renderProperties.call(this, options, content, kwargs);
    });
    eleventyConfig.addPairedAsyncShortcode('renderSlots', /** @this {*} */function(content, kwargs) {
      return options.renderSlots.call(this, options, content, kwargs);
    });
    /* eslint-enable max-len */
  },
};

/** @typedef {import('mdast-util-to-markdown/lib/types').Node} Node */

/**
 * @return {Promise<Node>}
 */
async function band(kwargs, children) {
  const M = await import('mdast-builder');
  const { fromMarkdown } = await import('mdast-util-from-markdown');

  const l = kwargs?.level ?? 2;

  return M.root([
    M.html(dedent`
      <pfe-band size="small" color="lightest" use-grid>
        <h${l} slot="header">`), fromMarkdown(kwargs?.header ?? ''), M.html(dedent`
        </h${l}>`), ...children, M.html(dedent`
      </pfe-band>`),
  ]);
}

/**
 * @param {*} item
 * @param  {{ M: import("./types").BuilderApi; fromMarkdown: import("mdast-util-from-markdown").fromMarkdown }} M
 */
function maybeDeprecation(item, { M, fromMarkdown }) {
  return !item.deprecated ? [] : [
    M.emphasis([
      M.text(`Note: ${item.name} is deprecated. `),
      ...(typeof item.deprecated === 'string') ? [fromMarkdown(item.deprecated)].flat(1) : [],
    ]),
  ];
}

/**
 * @param {*} item
 * @param  {{ M: import("./types").BuilderApi; fromMarkdown: import("mdast-util-from-markdown").fromMarkdown }} M
 */
function maybeType(item, { M, manifest, fromMarkdown, header }) {
  const { emphasis, inlineCode, list, listItem, paragraph, text } = M;
  // TODO: Better caching and matching
  const decl = item.type && manifest.modules
    .flatMap(x => x.declarations ?? [])
    .find(x => x.name === item.type.text);

  return !item.type ? [] : [
    paragraph([
      emphasis(text(header ?? 'Type:')),
      text(' '),
      inlineCode(item.type.text),
    ]),
    ...!decl?.members ? [] : [
      list('unordered',
        decl.members.filter(m => m.kind === 'field').map(member => listItem([
          paragraph([
            text(`${member.name}: `),
            // TODO: inline code highlighting: render the markdown to html and extract the `<code>` from the `<pre>`
            inlineCode(member.type?.text ?? 'unknown'),
            ...[text(' '), fromMarkdown(member.summary ?? '')].flat(1),
          ]),
          ...!member.description ? [] : [fromMarkdown(member.description)].flat(1),
        ]),
        )),
    ],
    // ...decl ? [M.code('json', JSON.stringify(decl, null, 2))] : [],
    // TODO: fetch types from manifest and render
  ];
}

/** quick and dirty dedent, also provides in-editor syntax highlighting */
const html = (...args) =>
  String.raw(...args)
    .split('\n')
    .map(x => x.replace(/^ {6}/, ''))
    .join('\n');

/** @typedef {import('@patternfly/pfe-tools/11ty/DocsPage').DocsPage} DocsPage */
module.exports = function(eleventyConfig) {
  eleventyConfig.addPairedShortcode('renderCodeDocs',
    function renderCodeDocs(content, kwargs = {}) {
      const renderers = new Renderers(this, kwargs);
      return renderers.renderAll(content);
    }
  );
};

function innerMD(content = '') {
  const trimmed = content.trim();
  return trimmed && `\n\n\n${trimmed}\n\n\n`;
}

function mdHeading(content, length = 2) {
  const hashes = Array.from({ length }, () => '#').join('');
  return innerMD(`${hashes} ${content}`);
}

function type(content = '', { lang = 'ts' } = {}) {
  return content.trim() && `\n\n\`\`\`${lang}\n${content.trim()}\n\n\`\`\`\n\n`;
}

function stringifyParams(method) {
  return method.parameters?.map?.(p =>
    `${p.name}: ${p.type?.text ?? 'unknown'}`).join(', ') ?? '';
}

function renderBand(content, { level, header = '' } = {}) {
  return html`
      <section class="band">
        ${header && mdHeading(header, { level })}
        ${innerMD(content)}
      </section>`;
}

/**
 * docs pages contain a #styling-hooks anchor as back compat for older versions of the page
 * to prevent this id from rendering more than once, we track the number of times each page
 * renders css custom properties.
 */
const cssStylingHookIdTracker = new WeakSet();

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('innerMD', innerMD);
  eleventyConfig.addFilter('mdHeading', mdHeading);
  eleventyConfig.addFilter('type', type);
  eleventyConfig.addFilter('stringifyParams', stringifyParams);
  eleventyConfig.addPairedShortcode('band', renderBand);
  for (const shortCode of [
    'renderAttributes',
    'renderCssCustomProperties',
    'renderCssParts',
    'renderEvents',
    'renderMethods',
    'renderOverview',
    'renderProperties',
    'renderInstallation',
    'renderSlots',
  ]) {
    eleventyConfig.addPairedShortcode(shortCode, function(content, kwargs) {
      return Renderers.forPage(this)[shortCode](content, kwargs);
    });
  }
};

class Renderers {
  /** @type{WeakMap<Page, Renderers>} */
  static renderers = new WeakMap();
  static forPage(page) {
    return new Renderers(page);
  }

  constructor(page) {
    if (Renderers.renderers.has(page)) {
      return Renderers.renderers.get(page);
    }
    /**
     * NB: since the data for this shortcode is no a POJO,
     * but a DocsPage instance, 11ty assigns it to this.ctx._
     * @see https://github.com/11ty/eleventy/blob/bf7c0c0cce1b2cb01561f57fdd33db001df4cb7e/src/Plugins/RenderPlugin.js#L89-L93
     * @type {DocsPage}
     */
    this.docsPage = page.ctx._;
    this.manifest = this.docsPage.manifest;
    Renderers.renderers.set(page, this);
  }

  packageTagName(kwargs) {
    if (kwargs.for && !kwargs.for.match(/@/)) {
      return kwargs.for;
    } else {
      const [, tagName = this.tagName] = (kwargs?.for ?? '').match(/@[-\w]+\/(.*)/) ?? [];
      return tagName ?? this.docsPage.tagName;
    }
  }

  /** Render the overview of a component page */
  renderOverview(content) {
    return html`
      <section class="band overview">
        <h2>Overview</h2>
        <div class="example-preview">
          ${content}
        </div>
      </section>

      <section class="band">
        <h2>Installation</h2>

      ~~~shell
      npm install ${this.manifest.packageJson.name}
      ~~~

      </section>`;
  }

  /** Render the list of element attributes */
  renderAttributes(content, { header = 'Attributes', level = 2, ...kwargs } = {}) {
    const _attrs = this.manifest.getAttributes(this.packageTagName(kwargs)) ?? [];
    const deprecated = _attrs.filter(x => x.deprecated);
    const attributes = _attrs.filter(x => !x.deprecated);
    return html`
      <section class="band api attributes api-properties">
        ${mdHeading(header)}${!content && !attributes.length ? html`
        <em>None</em>` : html`
        ${innerMD(content)}
        <dl>${attributes?.map(attribute => html`
          <dt><strong><code>${attribute.name}</code></strong></dt>
          <dd>
            ${innerMD(attribute.description)}
            <dl class="member">${!attribute.fieldName ? '' : html`
              <dt>DOM Property</dt>
              <dd><code>${attribute.fieldName}</code></dd>`}
              <dt>Type</dt>
              <dd class="inline-type">${type(attribute.type?.text ?? 'unknown')}</dd>
              <dt>Default</dt>
              <dd class="inline-type">${type(attribute.default ?? 'unknown')}</dd>
            </dl>
          </dd>`).join('\n') ?? ''}
        </dl>`}${!deprecated.length ? '' : html`
        <details>
          <summary>${mdHeading(`Deprecated ${header}`, { level: level + 1 })}</summary>
          <dl>${deprecated.map(attribute => html`
            <dt><strong><code>${attribute.name}</code></strong></dt>
            <dd>
              ${innerMD(attribute.description)}
              <em>Note: ${attribute.name} is deprecated. ${innerMD(attribute.deprecated)}</em>
              <dl class="member">${!attribute.fieldName ? '' : html`
                <dt>DOM Property</dt>
                <dd><code>${attribute.fieldName}</code></dd>`}
                <dt>Type</dt>
                <dd class="inline-type">${innerMD(attribute.type?.text ?? 'unknown')}</dd>
                <dt>Default</dt>
                <dd class="inline-type">${innerMD(attribute.default ?? 'unknown')}</dd>
              </dl>
            </dd>`).join('\n')}
          </dl>
        </details>`}
      </section>`;
  }

  /** Render the list of element DOM properties */
  renderProperties(content, { header = 'DOM Properties', level = 2, ...kwargs } = {}) {
    const allProperties = this.manifest.getProperties(this.packageTagName(kwargs)) ?? [];
    const deprecated = allProperties.filter(x => x.deprecated);
    const properties = allProperties.filter(x => !x.deprecated);
    // TODO: inline code highlighting for type and default: render the markdown to html and extract the `<code>` from the `<pre>`
    return html`
      <section class="api band properties api-properties">
        ${mdHeading(header)}${!content && !properties.length ? html`
        <em>None</em>` : html`
        ${innerMD(content)}
        <dl>${properties.map(property => html`
          <dt><strong><code>${property.name}</code></strong></dt>
          <dd>
            ${innerMD(property.description)}
            <dl class="member">
              <dt>Type</dt>
              <dd class="inline-type">${type(property.type?.text ?? 'unknown')} </dd>
              <dt>Default</dt>
              <dd class="inline-type">${type(property.default ?? 'unknown')} </dd>
            </dl>
          </dd>`).join('\n')}
        </dl>`}${!deprecated.length ? '' : html`
        <details>
          <summary>${mdHeading(`Deprecated ${header}`, { level: level + 1 })}</summary>
          <dl>${deprecated.map(property => html`
            <dt><strong><code>${property.name}</code></strong></dt>
            <dd>
              ${innerMD(property.description)}
              <em>Note: ${property.name} is deprecated. ${innerMD(property.deprecated)}</em>
              <dl class="member">
                <dt>Type</dt>
                <dd class="inline-type">${type(property.type?.text ?? 'unknown')}</dd>
                <dt>Default</dt>
                <dd class="inline-type">${type(property.default ?? 'unknown')}</dd>
              </dl>
            </dd>`).join('\n')}
          </dl>
        </details>`}
      </section>`;
  }

  /** Render a table of element CSS Custom Properties */
  renderCssCustomProperties(content, { header = 'CSS Custom Properties', level = 2, ...kwargs } = {}) {
    const allCssProperties = this.manifest.getCssCustomProperties(this.packageTagName(kwargs)) ?? [];
    const cssProperties = allCssProperties.filter(x => !x.deprecated);
    const deprecated = allCssProperties.filter(x => x.deprecated);
    return html`
      <section class="api band css-custom-properties api-properties">
        ${mdHeading(header)}${!content && !cssProperties.length ? html`
        <em>None</em>` : html`
        ${innerMD(content)}
        <table class=css-custom-properties>
          <thead>
            <tr>
              <th style="text-align:left">CSS Property</th>
              <th style="text-align:left">Description</th>
              <th style="text-align:left">Default</th>
            </tr>
          </thead>
          <tbody>${cssProperties.map(prop => html`
            <tr>
              <td style="text-align:left"><code>${prop.name}</code></td>
              <td style="text-align:left">${innerMD(prop.description ?? '')}</td>
              <td style="text-align:left">${!prop.default?.startsWith('#') ? html`
                <code>` : html`
                <code data-color="${prop.default}"
                      style="--color:${prop.default}">`}
                  ${prop.default ?? '—'}
                </code>
              </td>
            </tr>`).join('\n')}
          </tbody>
        </table>`}${!deprecated.length ? '' : html`
        <details>
          <summary>${mdHeading(`Deprecated ${header}`, { level: level + 1 })}</summary>
          <table>
            <thead>
              <tr>
                <th style="text-align:left">CSS Property</th>
                <th style="text-align:left">Description</th>
                <th style="text-align:left">Default</th>
              </tr>
            </thead>
            <tbody>${deprecated.map(prop => html`
              <tr>
                <td style="text-align:left"><code>${prop.name}</code></td>
                <td style="text-align:left">${innerMD(prop.description)}</td>
                <td style="text-align:left">${innerMD(prop.default ?? '—')}</td>
              </tr>`).join('\n')}
            </tbody>
          </table>
        </details>`}
      </section>`;
  }

  /** Render the list of element CSS Shadow Parts */
  renderCssParts(content, { header = 'CSS Shadow Parts', level = 2, ...kwargs } = {}) {
    const allParts = this.manifest.getCssParts(this.packageTagName(kwargs)) ?? [];
    const parts = allParts.filter(x => !x.deprecated);
    const deprecated = allParts.filter(x => x.deprecated);
    return html`
      <section class="api band css-shadow-parts api-properties">
        ${mdHeading(header)}${!content && !parts.length ? html`
        <em>None</em>` : html`
        ${innerMD(content)}
        <dl>${parts.map(part => html`
          <dt><strong><code>${part.name}</code></strong></dt>
          <dd>${innerMD(part.description)}</dd>`).join('\n')}
        </dl>`}${!deprecated.length ? '' : html`
        <details>
          <summary>${mdHeading(`Deprecated ${header}`, { level: level + 1 })}</summary>
          <dl>${deprecated.map(part => html`
            <dt><strong><code>${part.name}</code></strong></dt>
            <dd>
              ${innerMD(part.description)}
              <em>Note: ${part.name} is deprecated. ${innerMD(part.deprecated)}</em>
            </dd>`).join('\n')}
          </dl>
        </details>`}
      </section>`;
  }

  /** Render the list of events for the element */
  renderEvents(content, { header = 'Events', level = 2, ...kwargs } = {}) {
    const _events = this.manifest.getEvents(this.packageTagName(kwargs)) ?? [];
    const deprecated = _events.filter(x => x.deprecated);
    const events = _events.filter(x => !x.deprecated);
    return html`
      <section class="api band events api-properties">
        ${mdHeading(header)}${!content && !events.length ? html`
        <em>None</em>` : html`
        ${innerMD(content)}
        <dl>${events.map(event => html`
          <dt><strong><code>${event.name}</code></strong></dt>
          <dd>
            ${innerMD(event.description)}
            <span>
              <em>Event Type</em>: <span class="inline-type">${type(event.type?.text ?? 'unknown')}</span>
            </span>
          </dd>`).join('\n')}
        </dl>`}${!deprecated.length ? '' : html`
        <details>
          <summary>${mdHeading(`Deprecated ${header}`, { level: level + 1 })}</summary>
          <dl>${deprecated.map(event => html`
            <dt><strong><code>${event.name}</code></strong></dt>
            <dd>
              ${innerMD(event.description)}
              <em>Note: ${event.name} is deprecated. ${innerMD(event.deprecated)}</em>
              <em>Event Type</em>: <span class="inline-type">${type(event.type?.text ?? 'unknown')}</span>
            </dd>`).join('\n')}
          </dl>
        </details>`}
      </section>`;
  }

  /** Render the installation instructions for the element */
  renderInstallation(content, { header = 'Installation', level = 2, tagName = this.docsPage.tagName } = {}) {
    return html`
      <section class="band">
        <h2>Installation</h2>

      We recommend loading elements via a CDN such as [JSPM][inst-jspm] and
      using an import map to manage your dependencies.

      For more information on import maps and how to use them,
      see the [import map reference on MDN Web Docs][inst-mdn].

      If you are using node and NPM, you can install this component using npm:

      ~~~shell
      npm install ${this.manifest.packageJson.name}
      ~~~

      Then import this component into your project by using a
      [bare module specifier][inst-bms]:

      ~~~js
      import '@patternfly/elements/${tagName}/${tagName}.js';
      ~~~

      **Please Note** You should either load elements via a CDN or
      install them locally through NPM. *Do not do both.*

      </section>

      [inst-jspm]: https://jspm.dev
      [inst-mdn]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap/
      [inst-bms]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules`;
  }

  /** Render the list of element methods */
  renderMethods(content, { header = 'Methods', level = 2, ...kwargs } = {}) {
    const allMethods = this.manifest.getMethods(this.packageTagName(kwargs)) ?? [];
    const deprecated = allMethods.filter(x => x.deprecated);
    const methods = allMethods.filter(x => !x.deprecated);
    // TODO: inline code highlighting for type and default: render the markdown to html and extract the `<code>` from the `<pre>`
    return html`
      <section class="api band methods api-properties">
        ${mdHeading(header)}${!content && !methods.length ? html`
        <em>None</em>` : html`
        ${innerMD(content)}
        <dl>${methods.map(method => html`
          <dt><strong><code>${method.name}(${stringifyParams(method)})</code></strong></dt>
          <dd>${innerMD(method.description)}</dd>`).join('\n')}
        </dl>`}${!deprecated.length ? '' : html`
        <details>
          <summary>${mdHeading(`Deprecated ${header}`, { level: level + 1 })}</summary>
          <dl>${deprecated.map(method => html`
            <dt><strong><code>${method.name}(${stringifyParams(method)})</code></strong></dt>
            <dd>
              ${innerMD(method.description)}
              <em>Note: ${method.name} is deprecated. ${innerMD(method.deprecated)}</em>
            </dd>`).join('\n')}
          </dl>
        </details>`}
      </section>`;
  }

  /** Render the list of the element's slots */
  renderSlots(content, { header = 'Slots', level = 2, ...kwargs } = {}) {
    const allSlots = this.docsPage.manifest.getSlots(this.packageTagName(kwargs)) ?? [];
    const slots = allSlots.filter(x => !x.deprecated);
    const deprecated = allSlots.filter(x => x.deprecated);
    return html`
      <section class="api band slots api-properties">
        ${mdHeading(header)}${!content && !slots.length ? html`
        <em>None</em>` : html`
        ${innerMD(content)}
        <dl>${slots.map(slot => html`
          <dt>${slot.name ? html`
            <strong><code>${slot.name}</code></strong>` : html`
            <strong>Default Slot</strong>`}
          </dt>
          <dd>${innerMD(slot.description)}</dd>`).join('\n')}
        </dl>`}${!deprecated.length ? '' : html`
        <details>
          <summary>${mdHeading(`Deprecated ${header}`, { level: level + 1 })}</summary>
          <dl>${deprecated.map(slot => html`
            <dt>${slot.name ? html`
              <strong><code>${slot.name}</code></strong>` : html`
              <strong>Default Slot</strong>`}
            </dt>
            <dd>
              ${innerMD(slot.description)}
              <em>Note: ${slot.name} is deprecated. ${innerMD(slot.deprecated)}</em>
            </dd>`).join('\n')}
          </dl>
        </details>`}
      </section>`;
  }
}

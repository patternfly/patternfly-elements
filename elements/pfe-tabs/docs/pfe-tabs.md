{% renderOverview %}
  ### Horizontal tabs
  <pfe-tabs>
    <pfe-tab role="heading" slot="tab">
      <h2>Tab 1</h2>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h3>Tab 1 content</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima a, vero harum animi libero quos tenetur error quisquam unde ad quidem autem perspiciatis magni blanditiis vel velit nulla nisi sit! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique voluptatem quasi voluptas minima, reprehenderit in nam molestiae inventore doloremque repudiandae, nobis tempore. Suscipit dignissimos voluptatem explicabo soluta veritatis officiis dolor.</p>
    </pfe-tab-panel>
    <pfe-tab role="heading" slot="tab">
      <h2>Tab 2</h2>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h3>Tab 2 content</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia architecto numquam iste quae expedita inventore animi quod veniam aut, fugiat eveniet, a maxime, ullam est veritatis vero esse illo suscipit.</p>
    </pfe-tab-panel>
    <pfe-tab role="heading" slot="tab">
      <h2>Tab 3</h2>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h3>Tab 3 content</h3>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, deserunt nostrum itaque magnam, incidunt ipsam enim magni expedita, quasi quos cum illum nisi vel obcaecati? Eaque temporibus aliquam dolorem facere.</p>
    </pfe-tab-panel>
  </pfe-tabs>

  ### Vertical tabs
  <pfe-tabs vertical>
    <pfe-tab role="heading" slot="tab">
      <h2>Tab 1</h2>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h3>Tab 1 content</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima a, vero harum animi libero quos tenetur error quisquam unde ad quidem autem perspiciatis magni blanditiis vel velit nulla nisi sit! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique voluptatem quasi voluptas minima, reprehenderit in nam molestiae inventore doloremque repudiandae, nobis tempore. Suscipit dignissimos voluptatem explicabo soluta veritatis officiis dolor.</p>
    </pfe-tab-panel>
    <pfe-tab role="heading" slot="tab">
      <h2>Tab 2</h2>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h3>Tab 2 content</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia architecto numquam iste quae expedita inventore animi quod veniam aut, fugiat eveniet, a maxime, ullam est veritatis vero esse illo suscipit.</p>
    </pfe-tab-panel>
    <pfe-tab role="heading" slot="tab">
      <h2>Tab 3</h2>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h3>Tab 3 content</h3>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, deserunt nostrum itaque magnam, incidunt ipsam enim magni expedita, quasi quos cum illum nisi vel obcaecati? Eaque temporibus aliquam dolorem facere.</p>
    </pfe-tab-panel>
  </pfe-tabs>
{% endrenderOverview %}

{% band header="Usage" %}
  For each `pfe-tab`, you are responsible for setting the `role="heading"`and
  `slot="tab"`.

  For each `pfe-tab-panel`, you are responsible for setting `role="region"` and
  `slot="panel"`.

  ### Horizontal
  <pfe-tabs>
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 1</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 1</h2>
      <p>Tab 1 panel content.</p>
    </pfe-tab-panel>
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 2</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 2</h2>
      <p>Tab 2 panel content.</p>
    </pfe-tab-panel>
  </pfe-tabs>

  ```html
  <pfe-tabs>
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 1</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 1</h2>
      <p>Tab 1 panel content.</p>
    </pfe-tab-panel>
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 2</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 2</h2>
      <p>Tab 2 panel content.</p>
    </pfe-tab-panel>
  </pfe-tabs>
  ```

  ### Horizontal: centered
  <pfe-tabs tab-align="center">
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 1</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 1</h2>
      <p>Tab 1 panel content.</p>
    </pfe-tab-panel>
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 2</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 2</h2>
      <p>Tab 2 panel content.</p>
    </pfe-tab-panel>
  </pfe-tabs>

  ```html
  <pfe-tabs tab-align="center">
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 1</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 1</h2>
      <p>Tab 1 panel content.</p>
    </pfe-tab-panel>
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 2</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 2</h2>
      <p>Tab 2 panel content.</p>
    </pfe-tab-panel>
  </pfe-tabs>
  ```

  ### Horizontal: earth variant
  <pfe-tabs variant="earth">
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 1</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 1</h2>
      <p>Tab 1 panel content.</p>
    </pfe-tab-panel>
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 2</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 2</h2>
      <p>Tab 2 panel content.</p>
    </pfe-tab-panel>
  </pfe-tabs>

  ```html
  <pfe-tabs variant="earth">
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 1</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 1</h2>
      <p>Tab 1 panel content.</p>
    </pfe-tab-panel>
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 2</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 2</h2>
      <p>Tab 2 panel content.</p>
    </pfe-tab-panel>
  </pfe-tabs>
  ```

  ### Vertical
  <pfe-tabs vertical>
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 1</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 1</h2>
      <p>Tab 1 panel content.</p>
    </pfe-tab-panel>
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 2</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 2</h2>
      <p>Tab 2 panel content.</p>
    </pfe-tab-panel>
  </pfe-tabs>

  ```html
  <pfe-tabs vertical>
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 1</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 1</h2>
      <p>Tab 1 panel content.</p>
    </pfe-tab-panel>
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 2</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 2</h2>
      <p>Tab 2 panel content.</p>
    </pfe-tab-panel>
  </pfe-tabs>
  ```

  ### Vertical: earth variant
  <pfe-tabs vertical variant="earth">
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 1</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 1</h2>
      <p>Tab 1 panel content.</p>
    </pfe-tab-panel>
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 2</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 2</h2>
      <p>Tab 2 panel content.</p>
    </pfe-tab-panel>
  </pfe-tabs>

  ```html
  <pfe-tabs vertical variant="earth">
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 1</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 1</h2>
      <p>Tab 1 panel content.</p>
    </pfe-tab-panel>
    <pfe-tab role="heading" slot="tab">
      <h1>Tab 2</h1>
    </pfe-tab>
    <pfe-tab-panel role="region" slot="panel">
      <h2>Content 2</h2>
      <p>Tab 2 panel content.</p>
    </pfe-tab-panel>
  </pfe-tabs>
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}
{% renderSlots for="pfe-tab", level=3, header="Slots on `pfe-tab`" %}{% endrenderSlots %}
{% renderSlots for="pfe-tab-panel", level=3, header="Slots on `pfe-tab-panel`" %}{% endrenderSlots %}

{% renderAttributes %}
  <pfe-cta>
    <a href="demo">View the tab history demo</a>
  </pfe-cta>
{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}

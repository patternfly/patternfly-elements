{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}

<pf-v5-accordion>
  <pf-v5-accordion-header>
    <h3>Laboris sunt qui dolor consectetur excepteur in aliqua ipsum?</h3>
  </pf-v5-accordion-header>
  <pf-v5-accordion-panel>
    <p>Culpa adipisicing sunt dolor ullamco dolor duis in ad commodo.</p>
    <a href="#">Call to action</a>
  </pf-v5-accordion-panel>
  <pf-v5-accordion-header>
    <h3>Anim est tempor fugiat pariatur laborum deserunt ex mollit aliquip?</h3>
  </pf-v5-accordion-header>
  <pf-v5-accordion-panel>
    <p><a href="#">Ullamco ullamco sint</a> ex id magna elit deserunt dolore nostrud eu et dolore est Lorem. Esse laborum do ut consectetur occaecat proident et nostrud ut nostrud veniam officia Lorem.</p>
  </pf-v5-accordion-panel>
  <pf-v5-accordion-header>
    <h3>Nostrud ad sit commodo nostrud?</h3>
  </pf-v5-accordion-header>
  <pf-v5-accordion-panel>
    <p>Nisi veniam tempor reprehenderit laboris amet laborum et do ut. Veniam eiusmod aliquip ullamco quis esse laborum Lorem exercitation consequat.</p>
  </pf-v5-accordion-panel>
  <pf-v5-accordion-header>
    <h3>Reprehenderit cupidatat labore?</h3>
  </pf-v5-accordion-header>
  <pf-v5-accordion-panel>
    <p>Magna incididunt aliquip consectetur dolor adipisicing amet cillum officia nostrud. Elit exercitation voluptate aute nostrud.</p>
    <a href="#">Call to action</a>
  </pf-v5-accordion-panel>
</pf-v5-accordion>

{% endrenderOverview %}

{% band header="Usage" %}
  {% htmlexample %}

  <pf-v5-accordion>
    <pf-v5-accordion-header>
      <h3>Laboris sunt qui dolor consectetur excepteur in aliqua ipsum?</h3>
    </pf-v5-accordion-header>
    <pf-v5-accordion-panel>
      <p>Culpa adipisicing sunt dolor ullamco dolor duis in ad commodo.</p>
      <a href="#">Call to action</a>
    </pf-v5-accordion-panel>
    <pf-v5-accordion-header>
      <h3>Anim est tempor fugiat pariatur laborum deserunt ex mollit aliquip?</h3>
    </pf-v5-accordion-header>
    <pf-v5-accordion-panel>
      <p><a href="#">Ullamco ullamco sint</a> ex id magna elit deserunt dolore nostrud eu et dolore est Lorem. Esse laborum do ut consectetur occaecat proident et nostrud ut nostrud veniam officia Lorem.</p>
    </pf-v5-accordion-panel>
    <pf-v5-accordion-header>
      <h3>Nostrud ad sit commodo nostrud?</h3>
    </pf-v5-accordion-header>
    <pf-v5-accordion-panel>
      <p>Nisi veniam tempor reprehenderit laboris amet laborum et do ut. Veniam eiusmod aliquip ullamco quis esse laborum Lorem exercitation consequat.</p>
    </pf-v5-accordion-panel>
    <pf-v5-accordion-header>
      <h3>Reprehenderit cupidatat labore?</h3>
    </pf-v5-accordion-header>
    <pf-v5-accordion-panel>
      <p>Magna incididunt aliquip consectetur dolor adipisicing amet cillum officia nostrud. Elit exercitation voluptate aute nostrud.</p>
      <a href="#">Call to action</a>
    </pf-v5-accordion-panel>
  </pf-v5-accordion>

  {% endhtmlexample %}
{% endband %}

{% renderSlots %}
  ### Default slot in pf-v5-accordion-header

  We expect the light DOM of the `pf-v5-accordion-header` to be a heading level tag
  (h1, h2, h3, h4, h5, h6)

  ### Default slot in pf-v5-accordion-panel

  Add the content for your accordion panel here.
{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderEvents for='pf-v5-accordion-header', header='Events on `pf-v5-accordion-header`' %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}

{% renderOverview %}
  <pfe-accordion>
    <pfe-accordion-header>
      <h3>Laboris sunt qui dolor consectetur excepteur in aliqua ipsum?</h3>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <p>Culpa adipisicing sunt dolor ullamco dolor duis in ad commodo.</p>
      <pfe-cta>
        <a href="#">Call to action</a>
      </pfe-cta>
    </pfe-accordion-panel>
    <pfe-accordion-header>
      <h3>Anim est tempor fugiat pariatur laborum deserunt ex mollit aliquip?</h3>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <p><a href="#">Ullamco ullamco sint</a> ex id magna elit deserunt dolore nostrud eu et dolore est Lorem. Esse laborum do ut consectetur occaecat proident et nostrud ut nostrud veniam officia Lorem.</p>
    </pfe-accordion-panel>
    <pfe-accordion-header>
      <h3>Nostrud ad sit commodo nostrud?</h3>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <p>Nisi veniam tempor reprehenderit laboris amet laborum et do ut. Veniam eiusmod aliquip ullamco quis esse laborum Lorem exercitation consequat.</p>
    </pfe-accordion-panel>
    <pfe-accordion-header>
      <h3>Reprehenderit cupidatat labore?</h3>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <p>Magna incididunt aliquip consectetur dolor adipisicing amet cillum officia nostrud. Elit exercitation voluptate aute nostrud.</p>
      <pfe-cta>
        <a href="#">Call to action</a>
      </pfe-cta>
    </pfe-accordion-panel>
  </pfe-accordion>

  ### Disclosure variation
  Accordions need to have at least two section panels. If only one panel is needed, a Disclosure is presented instead. Accordions are used to organize more important information whereas a disclosure is used to store supplementary content that might not be a crucial part of the user experience.

  <pfe-accordion>
    <pfe-accordion-header>
      <h3>This is a disclosure</h3>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <h3>Headline, sm</h3>
      <p>A Disclosure toggles the visibility of sections of content. It features one panel that consists of a caret icon and a section text label that collapses or expands to reveal more information.</p>
      <pfe-cta><a href="#">Call-to-action</a></pfe-cta>
    </pfe-accordion-panel>
  </pfe-accordion>
{% endrenderOverview %}

{% band header="Usage" %}
  <pfe-accordion>
    <pfe-accordion-header>
      <h3>Laboris sunt qui dolor consectetur excepteur in aliqua ipsum?</h3>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <p>Culpa adipisicing sunt dolor ullamco dolor duis in ad commodo.</p>
      <pfe-cta>
        <a href="#">Call to action</a>
      </pfe-cta>
    </pfe-accordion-panel>
    <pfe-accordion-header>
      <h3>Anim est tempor fugiat pariatur laborum deserunt ex mollit aliquip?</h3>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <p><a href="#">Ullamco ullamco sint</a> ex id magna elit deserunt dolore nostrud eu et dolore est Lorem. Esse laborum do ut consectetur occaecat proident et nostrud ut nostrud veniam officia Lorem.</p>
    </pfe-accordion-panel>
    <pfe-accordion-header>
      <h3>Nostrud ad sit commodo nostrud?</h3>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <p>Nisi veniam tempor reprehenderit laboris amet laborum et do ut. Veniam eiusmod aliquip ullamco quis esse laborum Lorem exercitation consequat.</p>
    </pfe-accordion-panel>
    <pfe-accordion-header>
      <h3>Reprehenderit cupidatat labore?</h3>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <p>Magna incididunt aliquip consectetur dolor adipisicing amet cillum officia nostrud. Elit exercitation voluptate aute nostrud.</p>
      <pfe-cta>
        <a href="#">Call to action</a>
      </pfe-cta>
    </pfe-accordion-panel>
  </pfe-accordion>

  ```html
  <pfe-accordion>
    <pfe-accordion-header>
      <h3>Laboris sunt qui dolor consectetur excepteur in aliqua ipsum?</h3>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <p>Culpa adipisicing sunt dolor ullamco dolor duis in ad commodo.</p>
      <pfe-cta>
        <a href="#">Call to action</a>
      </pfe-cta>
    </pfe-accordion-panel>
    <pfe-accordion-header>
      <h3>Anim est tempor fugiat pariatur laborum deserunt ex mollit aliquip?</h3>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <p><a href="#">Ullamco ullamco sint</a> ex id magna elit deserunt dolore nostrud eu et dolore est Lorem. Esse laborum do ut consectetur occaecat proident et nostrud ut nostrud veniam officia Lorem.</p>
    </pfe-accordion-panel>
    <pfe-accordion-header>
      <h3>Nostrud ad sit commodo nostrud?</h3>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <p>Nisi veniam tempor reprehenderit laboris amet laborum et do ut. Veniam eiusmod aliquip ullamco quis esse laborum Lorem exercitation consequat.</p>
    </pfe-accordion-panel>
    <pfe-accordion-header>
      <h3>Reprehenderit cupidatat labore?</h3>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <p>Magna incididunt aliquip consectetur dolor adipisicing amet cillum officia nostrud. Elit exercitation voluptate aute nostrud.</p>
      <pfe-cta>
        <a href="#">Call to action</a>
      </pfe-cta>
    </pfe-accordion-panel>
  </pfe-accordion>
  ```
{% endband %}

{% renderSlots %}
  ### Accents slot in pfe-accordion

  These elements will appear inline with the accordion header, between the header and the chevron (or after the chevron and header in disclosure mode).

  <pfe-accordion>
    <pfe-accordion-header>
      <h3>This is a disclosure</h3>
      <pfe-badge slot="accents" state="success">NEW</pfe-badge>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <h3>Headline, sm</h3>
      <p>A Disclosure toggles the visibility of sections of content. It features one panel that consists of a caret icon and a section text label that collapses or expands to reveal more information.</p>
      <pfe-cta><a href="#">Call-to-action</a></pfe-cta>
    </pfe-accordion-panel>
  </pfe-accordion>

  ### Default slot in pfe-accordion-header

  We expect the light DOM of the `pfe-accordion-header` to be a heading level tag
  (h1, h2, h3, h4, h5, h6)

  ### Default slot in pfe-accordion-panel

  Add the content for your accordion panel here.
{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderEvents for='pfe-accordion-header', header='Events on `pfe-accordion-header`' %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}

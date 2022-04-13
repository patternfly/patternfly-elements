---
layout: layout-base.njk
title: PatternFly Elements
description: A set of community-created web components based on PatternFly design.
githubLink: https://github.com/patternfly/patternfly-elements
templateEngineOverride: njk,md
---

<body unresolved>
  <header>
    <pfe-band class="pfe-l--text-align--center" color="accent">
      <div class="pfe-l-bullseye">
        <div class="pfe-l-bullseye__item">
          <h1 id="home-title">
            <img src="/images/logo/pfe-icon-white-shaded.svg" alt="">
            {{ title }}
          </h1>
          <p class="tagline">{{ description }}</p>
          <div class="header-ctas">
            <pfe-cta priority="primary">
              <a href="get-started">Get started</a>
            </pfe-cta>
            <pfe-cta priority="secondary">
              <a href="components">View the components</a>
            </pfe-cta>
          </div>
        </div>
      </div>
    </pfe-band>
    <pfe-band size="small">
      <div class="pfe-l--text-align--center">
        <pfe-cta>
          <a href="{{ githubLink }}">
            <pfe-icon size="md" style="--pfe-icon--Color: #666" icon="fas-github" aria-hidden="true"></pfe-icon>&nbsp;&nbsp;Contribute on GitHub
          </a>
        </pfe-cta>
      </div>
    </pfe-band>
  </header>
  <main>
    <section>
      <pfe-band color="lightest">
        <h2 id="lightweight">Lightweight</h2>
        <p class="subtitle">Use only what you need.</p>
        <p>Pick and choose from the <a href="/components/">list of components</a>. Use them all or just one. And keep your page payloads small with PatternFly Elements because the components range from ~3 kB to ~10 kB in size minified and gzipped.</p>
        <div class="pfe-l-grid pfe-m-gutters">
          <div class="pfe-l-grid__item pfe-m-12-col pfe-m-6-col-on-md pfe-m-8-col-on-lg">
<div>

```html
<script type="module"
        src="https://unpkg.com/@patternfly/pfe-card?module"></script>
<script type="module"
        src="https://unpkg.com/@patternfly/pfe-cta?module"></script>

<pfe-card color="lightest">
  <h2 slot="header">Card component</h2>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quam alias ducimus, amet iure quae earum.</p>
  <pfe-cta slot="footer">
    <a href="components/card">Learn more about pfe-card</a>
  </pfe-cta>
</pfe-card>
```

</div>
</div>
          <pfe-card class="pfe-l-grid__item pfe-m-12-col pfe-m-6-col-on-md pfe-m-4-col-on-lg" color="lightest" border>
            <h2 slot="header">Card component</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quam alias ducimus, amet iure quae earum.</p>
            <pfe-cta slot="footer">
              <a href="components/card">More about the pfe-card</a>
            </pfe-cta>
          </pfe-card>
        </div>
        <br>
        <div class="pfe-l--text-align--center">
          <pfe-cta>
            <a href="components/">View the rest of the components</a>
          </pfe-cta>
        </div>
      </pfe-band>
    </section>
    <section>
      <pfe-band>
        <h2 id="universal">Universal</h2>
        <h3>Integrate PatternFly Elements with your framework of choice or use them by themselves.</h3>
        <p>PatternFly Elements integrate seamlessly with multiple frontend frameworks. Or use PatternFly Elements on their own without a framework. It's up to you and the needs of your project.</p>
        <div class="pfe-l-grid pfe-m-gutters">
          <div class="pfe-l-grid__item pfe-m-12-col pfe-m-8-col-on-md pfe-m-7-col-on-lg">

```shell
npm install @patternfly/pfe-accordion
```

```jsx
import React from "react";
import "@patternfly/pfe-accordion";

export default function App() {
  const data = [
    { header: "Heading 1", panel: "Here is some content"},
    { header: "Heading 2", panel: "Here is some more content" }
  ];

  return (
    <pfe-accordion>
      {data.map(accordion =>
        <>
          <pfe-accordion-header>
            <h3>{accordion.header}</h3>
          </pfe-accordion-header>
          <pfe-accordion-panel>
            <p>{accordion.panel}</p>
          </pfe-accordion-panel>
        </>
      )}
    </pfe-accordion>
  );
}
```

</div>
<!-- reset indenting to HTML rules -->
<div class="pfe-l-grid__item pfe-m-12-col pfe-m-4-col-on-md pfe-m-5-col-on-lg">
          <pfe-accordion>
            <pfe-accordion-header>
              <h3>Accordion header</h3>
            </pfe-accordion-header>
            <pfe-accordion-panel>
              <p>Here is some content</p>
            </pfe-accordion-panel>
            <pfe-accordion-header>
              <h3>Accordion header</h3>
            </pfe-accordion-header>
            <pfe-accordion-panel>
              <p>Here is some more content</p>
            </pfe-accordion-panel>
          </pfe-accordion>
          <div class="framework-logos pfe-l--text-align--center">
            <div>
              <img class="react-logo" src="images/react.svg" alt="React logo">
            </div>
            <div>
              <img class="vue-logo" src="images/vue.svg" alt="Vue logo">
            </div>
            <div>
              <img class="angular-logo" src="images/angular.svg" alt="Angular logo">
            </div>
          </div>
        </div>
      </div>
        <br>
        <div class="pfe-l--text-align--center">
          <pfe-cta>
            <a href="/framework-integration/">Learn how to integrate PatternFly Elements in your application</a>
          </pfe-cta>
        </div>
      </pfe-band>
    </section>
    <section id="themeable-section">
      <pfe-band color="lightest">
        <div class="pfe-l-grid pfe-m-gutters">
          <h2 id="themeable" class="pfe-l-grid__item pfe-m-12-col pfe-m-9-col-on-md">Themeable</h2>
          <form class="pfe-l-grid__item pfe-m-12-col pfe-m-3-col-on-md">
            <label for="theme-select">Select a theme</label>
            <pfe-select>
              <select id="theme-select">
                <option value="theme-1">Theme 1</option>
                <option value="theme-2">Theme 2</option>
                <option value="theme-3">Theme 3</option>
              </select>
            </pfe-select>
          </form>
        </div>
        <h3 class="push-top">Make PatternFly Elements components your own by defining a custom theme palette.</h3>
        <p>Use CSS custom properties to theme at a global or component level.</p>
        <div class="pfe-l-grid pfe-m-gutters pfe-m-all-4-col-on-xl pfe-m-all-6-col-on-lg pfe-m-all-6-col-on-sm">
          <div>
            <pfe-card class="card-1" color="darkest">
              <h3 slot="header">Card 1</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. <a href="https://patternflyelements.org">A regular
                  link</a>, <a href="https://patternflyelements.org">or a visited one</a>. Non, qui dolore ex soluta exercitationem fuga asperiores
                natus illo nobis? Expedita modi
                fuga qui praesentium.</p>
              <div slot="footer">
                <pfe-cta>
                  <a href="#">Link 1</a>
                </pfe-cta>
              </div>
            </pfe-card>
          </div>
          <div>
            <pfe-card class="card-2" color="accent">
              <h3 slot="header">Card 2</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. <a href="https://patternflyelements.org">A regular
                  link</a>, <a href="https://patternflyelements.org">or a visited one</a>. Non,
                qui dolore ex soluta exercitationem fuga asperiores natus illo nobis? Expedita modi fuga qui
                praesentium.</p>
              <div slot="footer">
                <pfe-cta>
                  <a href="#">Link 2</a>
                </pfe-cta>
              </div>
            </pfe-card>
          </div>
          <div>
            <pfe-card class="card-3" color="lightest">
              <h3 slot="header">Card 3</h3>
              <p>Lorem, ipsum dolor sectetur adipisicing elit. <a href="https://patternflyelements.org">A regular link</a>, <a
                  href="https://patternflyelements.org">or a visited one</a>.
                doloremque natus corrupti ullam numquam laudantium voluptatibus assumenda alias recusandae vel
                temporibus a soluta?</p>
              <div slot="footer">
                <pfe-cta>
                  <a href="#">Link 3</a>
                </pfe-cta>
              </div>
            </pfe-card>
          </div>
        </div>
      </pfe-band>
      <pfe-band color="lightest" size="small">
        <pfe-tabs pfe-tab-align="center">
          <pfe-tab slot="tab">
            <h3>Tab 1</h3>
          </pfe-tab>
          <pfe-tab-panel slot="panel">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam consequatur soluta totam labore. Dolores
              eum, omnis earum aliquam explicabo excepturi at voluptate, repellendus ipsam velit, nisi enim autem
              reiciendis reprehenderit!</p>
            <div class="pfe-l--text-align--center push-top">
              <pfe-cta priority="secondary" class="push-bottom">
                <a href="#">Link 1</a>
              </pfe-cta>
              <pfe-cta priority="secondary" class="push-bottom">
                <a href="#">Link 2</a>
              </pfe-cta>
              <pfe-cta priority="primary" class="push-bottom">
                <a href="#">Link 3</a>
              </pfe-cta>
            </div>
          </pfe-tab-panel>
          <pfe-tab slot="tab">
            <h3>Tab 2</h3>
          </pfe-tab>
          <pfe-tab-panel slot="panel">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non itaque asperiores aspernatur ducimus
              voluptatum exercitationem saepe eius voluptatem, dicta sunt ad voluptates, vitae quod autem, ipsa
              veritatis at sed odio.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem possimus, velit assumenda id ea dicta
              at deleniti neque repellendus quasi doloremque quidem quam fuga aliquam temporibus adipisci ducimus saepe
              ullam.</p>
            <pfe-cta priority="secondary">
              <a href="#">Link 1</a>
            </pfe-cta>
          </pfe-tab-panel>
          <pfe-tab slot="tab">
            <h3>Tab 3</h3>
          </pfe-tab>
          <pfe-tab-panel slot="panel">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet doloremque dignissimos, libero magni
              repudiandae quod quam optio deserunt, beatae consequatur eius officiis molestiae molestias? Adipisci
              suscipit beatae sed vitae consectetur.</p>
            <pfe-cta>
              <a href="#">Link 1</a>
            </pfe-cta>
          </pfe-tab-panel>
        </pfe-tabs>
      </pfe-band>
      <pfe-band color="lightest" size="small">
        <pfe-accordion>
          <pfe-accordion-header>
            <h3>Accordion header 1</h3>
          </pfe-accordion-header>
          <pfe-accordion-panel>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita obcaecati natus porro, commodi quaerat
              saepe minus iusto consectetur fuga consequuntur repudiandae? Quidem odio accusantium similique magni vel
              a, tenetur sequi.</p>
          </pfe-accordion-panel>
          <pfe-accordion-header>
            <h3>Accordion header 2</h3>
          </pfe-accordion-header>
          <pfe-accordion-panel>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium ea totam, maxime laudantium minus
              modi ipsam. Dolorem suscipit possimus ullam eum pariatur? Repudiandae doloremque consectetur commodi iusto
              suscipit fugit nobis.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit quidem laborum, magni quas quibusdam
              ipsam consectetur, quod consequuntur consequatur ipsum blanditiis animi harum quasi quam, temporibus
              nostrum quis explicabo magnam?</p>
          </pfe-accordion-panel>
          <pfe-accordion-header>
            <h3>Accordion header 3</h3>
          </pfe-accordion-header>
          <pfe-accordion-panel>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti maxime esse, dolores ut quam,
              cupiditate ipsam optio at et perferendis quod eveniet veniam temporibus eius rerum fugiat sequi sapiente
              saepe.</p>
          </pfe-accordion-panel>
        </pfe-accordion>
      </pfe-band>
      <pfe-band color="lightest">
        <div class="pfe-l--text-align--center">
          <pfe-cta>
            <a href="/theming/">Learn more about theming PatternFly Elements</a>
          </pfe-cta>
        </div>
      </pfe-band>
    </section>
    <section>
      <pfe-band id="context-band">
        <div class="pfe-l-grid pfe-m-gutters">
          <h2 id="context" class="pfe-l-grid__item pfe-m-12-col pfe-m-9-col-on-md">Context-aware</h2>
          <form class="pfe-l-grid__item pfe-m-12-col pfe-m-3-col-on-md">
            <label for="context-select">Select a context</label>
            <pfe-select>
              <select id="context-select">
                <option value="">Default</option>
                <option value="lightest">Lightest</option>
                <option value="darkest">Darkest</option>
                <option value="accent">Accent</option>
              </select>
            </pfe-select>
          </form>
        </div>
        <h3 class="push-top">Set a light, dark, or saturated context and watch PatternFly Elements respond.</h3>
        <p>Since PatternFly Elements are contextually aware of their surface colors, when you change the context, PatternFly Elements will adjust child elements with appropriate contrasting values. For example, a dark context on an element would adjust child elements to have light colored text.</p>
        <br>
        <div class="pfe-l--text-align--center push-bottom">
          <pfe-cta priority="primary" class="push-bottom">
            <a href="#">Primary</a>
          </pfe-cta>
          <pfe-cta priority="secondary" class="push-bottom">
            <a href="#">Secondary</a>
          </pfe-cta>
          <pfe-cta class="push-bottom">
            <a href="#">Default</a>
          </pfe-cta>
        </div>
        <br>
        <pfe-accordion class="push-top push-bottom">
          <pfe-accordion-header>
            <h4>Accordion header 1</h4>
          </pfe-accordion-header>
          <pfe-accordion-panel>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos eius architecto sint sed provident. Fugiat quibusdam voluptas eveniet, facere repellendus aperiam aliquid voluptate est porro magni itaque laboriosam voluptatem modi?</p>
          </pfe-accordion-panel>
          <pfe-accordion-header>
            <h4>Accordion header 2</h4>
          </pfe-accordion-header>
          <pfe-accordion-panel>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse voluptas tenetur possimus voluptates ipsam. Unde porro cupiditate eius sed, modi dolor fuga praesentium, rerum minima, quis iusto odio minus tempora?</p>
          </pfe-accordion-panel>
          <pfe-accordion-header>
            <h4>Accordion header 3</h4>
          </pfe-accordion-header>
          <pfe-accordion-panel>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit eos eaque earum porro nisi. Exercitationem qui voluptate officiis debitis alias nostrum! Iusto fugit aliquam temporibus nulla? Eos veniam dolorem delectus?</p>
          </pfe-accordion-panel>
        </pfe-accordion>
        <br>
        <pfe-tabs class="push-top">
          <pfe-tab role="heading" slot="tab">
            <h4>Tab 1</h4>
          </pfe-tab>
          <pfe-tab-panel role="region" slot="panel">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias sunt sapiente quae totam neque beatae soluta expedita sed molestiae error praesentium, quas cupiditate eaque excepturi. Laboriosam soluta totam neque magni!</p>
          </pfe-tab-panel>
          <pfe-tab role="heading" slot="tab">
            <h4>Tab 2</h4>
          </pfe-tab>
          <pfe-tab-panel role="region" slot="panel">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt pariatur culpa mollitia, optio vitae non harum? Voluptate possimus laborum error ex, porro, ut cupiditate iusto officia facilis adipisci iure veniam.</p>
          </pfe-tab-panel>
          <pfe-tab role="heading" slot="tab">
            <h4>Tab 3</h4>
          </pfe-tab>
          <pfe-tab-panel role="region" slot="panel">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ut quibusdam accusamus alias exercitationem sequi impedit, cumque adipisci eos, expedita porro? Ullam quam aspernatur perspiciatis. Similique neque doloremque voluptatum cupiditate?</p>
          </pfe-tab-panel>
        </pfe-tabs>
      </pfe-band>
    </section>
  </main>
  {% include '_foot.njk' %}

  <script type="module" src="/main.mjs"></script>

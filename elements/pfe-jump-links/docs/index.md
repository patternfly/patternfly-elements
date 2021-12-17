---
layout: layout-basic.njk
title: Jump links
description: Moves a user to content when a link is selected
package: pfe-jump-links
packages:
  - pfe-jump-links
tags:
  - component
---

{% renderOverview for=package, title=title %}
  <div class="pfe-l-grid pfe-m-gutters">
    <section class="pfe-l-grid__item pfe-m-3-col">
        <pfe-jump-links id="jumplinks1">
          <p slot="heading">Page navigation</p>
          <ul>
            <li> <a href="#Asection1">Section 1</a> </li>
            <li class="has-sub-section"> <a href="#Asection2">Section 2</a>
              <ul class="sub-nav">
                <li class="sub-section"> <a href="#Asection2.1">Section 2.1</a> </li>
              </ul>
            </li>
            <li> <a href="#Asection3">Section 3</a> </li>
          </ul>
        </pfe-jump-links>
      </section>
      <section class="pfe-l-grid__item pfe-m-9-col">
        <pfe-jump-links-panel scrolltarget="jumplinks1">
          <div>
            <h2 class="pfe-jump-links-panel__section" id="Asection1">Section 1</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima a, vero harum animi libero quos tenetur error quisquam unde ad quidem autem perspiciatis magni blanditiis vel velit nulla nisi sit! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima a, vero harum animi libero quos tenetur error quisquam unde ad quidem autem perspiciatis magni blanditiis vel velit nulla nisi sit! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique voluptatem quasi voluptas minima, reprehenderit in nam molestiae inventore doloremque repudiandae, nobis tempore. Suscipit dignissimos voluptatem explicabo soluta veritatis officiis dolor.</p>
            <h2 class="pfe-jump-links-panel__section has-sub-section" id="Asection2">Section 2</h2>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn
              seitan readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia architecto numquam iste quae expedita inventore animi quod veniam aut, fugiat eveniet, a maxime, ullam est veritatis vero esse illo suscipit.</p>
            <h2 class="pfe-jump-links-panel__section sub-section" id="Asection2.1">Section 2.1</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, deserunt nostrum itaque magnam, incidunt ipsam enim magni expedita, quasi quos cum illum nisi vel obcaecati? Eaque temporibus aliquam dolorem facere.</p>
            <h2 class="pfe-jump-links-panel__section" id="Asection3">Section 3</h2>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica</p>
          </div>
        </pfe-jump-links-panel>
    </section>
  </div>
{% endrenderOverview %}

{% band header="Usage" %}
  This component is focused on reading content inside the and updating a sidebar or horizontal nav with to indicate the section of the document currently being viewed. As a developer, you have the choice of whether you bring your own markup to the nav, or have the nav build a DOM tree for you. Please note the shape of the DOM tree below. In order to support sub-section highlighting jump links must be very opinionated about the DOM tree.

  Inside of add the class .pfe-jump-links-panel__section to tell the component to watch for when that section crosses the scroll threshold. If this section has sub-sections you add the class .has-sub-section to the section parent (i.e. section 8) and add .sub-section to the child sections (i.e. 8.1). Make sure to add an id to each section, this id will match to the href attribute of the corresponding tag.

  ### Wiring up the nav
  The panel and nav are wired up by a scrolltarget and id. On the panel add an attribute scrolltarget="foo". This will correspond to the nav's #id. Add the corresponding id to your nav like so id="foo". The last step is to match the tag's href attribute to specific sections (just like we would with same page anchor links). See below for a simple example with three sections where section two has two sub-sections:

  ```html
  <pfe-jump-links id="jumplinks1">
    <h4 slot="heading">Jump to section</h4>
    <ul>
      <li>
        <a href="#section1">Section 1</a>
      </li>
      <li class="has-sub-section">
        <a href="#section2">Section 2</a>
        <ul class="sub-nav">
          <li class="sub-section">
            <a href="#section2.1">Section 2.1</a>
          </li>
          <li class="sub-section">
            <a href="#section2.2">Section 2.2</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#section3">Section 3</a>
      </li>
    </ul>
  </pfe-jump-links>
  ...
  <pfe-jump-links-panel>
    <h2 id="section1">Section 1</h2>
    <p>Some content...</p>
    <h2 class="has-sub-section" id="section2">Section 2</h2>
    <p>Some content...</p>
    <h2 class="sub-section" id="section2.1">Section 2.1</h2>
    <p>Some content...</p>
    <h2 class="sub-section" id="section2.2">Section 2.2</h2>
    <p>Some content...</p>
    <h2 id="section3">Section 3</h2>
    <p>Some content...</p>
  </pfe-jump-links-panel>
  ```
{% endband %}

{% renderSlots for=package %}{% endrenderSlots %}

{% renderAttributes for=package %}{% endrenderAttributes %}

{% renderProperties for=package %}{% endrenderProperties %}

{% renderMethods for=package %}{% endrenderMethods %}

{% renderEvents for=package %}
  This component fires an event when a link is made active.
{% endrenderEvents %}

{% renderCssCustomProperties for=package %}
  ### style="--pfe-jump-links-panel--offset: {integer};"
  You can control offset in your styling layer as well. This value can be set directly on the component inside a style attribute, e.g. `style="--pfe-jump-links-panel--offset: 100;"` or using the appropriate selector in another file. Please note that adding an attribute will take precedence over a css value. At the moment only integer values passed to this key are valid. No other values are supported. This means that passing "300px", "2rem","calc(100% - 12px)" will all result in JavaScript errors. You should pass a number that correlates to pixels. To read about the `offset` attribute, see above.
{% endrenderCssCustomProperties %}

{% renderCssParts for=package %}{% endrenderCssParts %}

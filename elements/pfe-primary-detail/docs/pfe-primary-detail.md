{% renderOverview %}
  <pfe-primary-detail>
    <h3 slot="nav">Section 1: Infrastructure and Management</h3>
    <div slot="details">
      <p>Content 1:</p>
      <ul>
        <li><a href="#">Lorum ipsum dolor sit amet</a></li>
        <li><a href="#">Aliquam tincidunt mauris eu risus</a></li>
        <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
        <li><a href="#">Pellentesque fermentum dolor</a></li>
      </ul>
    </div>
    <h3 slot="nav">Section 2: Cloud Computing</h3>
    <div slot="details">
      <ul>
        <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
        <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#">Pellentesque fermentum dolor</a></li>
        <li><a href="#">Lorum ipsum dolor sit amet</a></li>
      </ul>
    </div>
    <h3 slot="nav">Storage</h3>
    <ul slot="details">
      <li><a href="#">Pellentesque fermentum dolor</a></li>
      <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
      <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
    </ul>
    <h3 slot="nav">Runtimes</h3>
    <ul slot="details">
      <li><a href="#">Aliquam tincidunt mauris eu risus</a></li>
      <li><a href="#">Pellentesque fermentum dolor</a></li>
      <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
      <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
    </ul>
    <div slot="footer" style="padding: 1em 0.75em 2em;">
      <a href="#">All Products</a>
    </div>
  <pfe-primary-detail>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Default
  <pfe-primary-detail>
    <h2 slot="header">
      <a href="#">Header</a>
    </h2>
    <h3 slot="nav">Section 1: Infrastructure and Management</h3>
    <div slot="details">
      <p>Content 1:</p>
      <ul>
        <li><a href="#">Lorum ipsum dolor sit amet</a></li>
        <li><a href="#">Aliquam tincidunt mauris eu risus</a></li>
        <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
        <li><a href="#">Pellentesque fermentum dolor</a></li>
      </ul>
    </div>
    <h3 slot="nav">Section 2: Cloud Computing</h3>
    <div slot="details">
      <ul>
        <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
        <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#">Pellentesque fermentum dolor</a></li>
        <li><a href="#">Lorum ipsum dolor sit amet</a></li>
      </ul>
    </div>
    <h3 slot="nav">Storage</h3>
    <ul slot="details">
      <li><a href="#">Pellentesque fermentum dolor</a></li>
      <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
      <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
    </ul>
    <h3 slot="nav">Runtimes</h3>
    <ul slot="details">
      <li><a href="#">Aliquam tincidunt mauris eu risus</a></li>
      <li><a href="#">Pellentesque fermentum dolor</a></li>
      <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
      <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
    </ul>
    <div slot="footer" style="padding: 1em 0.75em 2em;">
      <a href="#">All Products</a>
    </div>
  <pfe-primary-detail>

  ```html
  <pfe-primary-detail>
    <h2 slot="header">
      <a href="#">Primary detail demo!</a>
    </h2>

    <h3 slot="nav">Section 1: Infrastructure and Management</h3>
    <div slot="details">
      <p>Content 1:</p>
      <ul>
        <li><a href="#">Lorum ipsum dolor sit amet</a></li>
        <li><a href="#">Aliquam tincidunt mauris eu risus</a></li>
        <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
        <li><a href="#">Pellentesque fermentum dolor</a></li>
      </ul>
    </div>

    <h3 slot="nav">Section 2: Cloud Computing</h3>
    <div slot="details">
      <ul>
        <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
        <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
        <li><a href="#">Pellentesque fermentum dolor</a></li>
        <li><a href="#">Lorum ipsum dolor sit amet</a></li>
      </ul>
    </div>

    <h3 slot="nav">Storage</h3>
    <ul slot="details">
      <li><a href="#">Pellentesque fermentum dolor</a></li>
      <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
      <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
    </ul>

    <h3 slot="nav">Runtimes</h3>
    <ul slot="details">
      <li><a href="#">Aliquam tincidunt mauris eu risus</a></li>
      <li><a href="#">Pellentesque fermentum dolor</a></li>
      <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
      <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
    </ul>

    <div slot="footer" style="padding: 1em 0.75em 2em;">
      <a href="#">All Products</a>
    </div>
  <pfe-primary-detail>
  ```
{% endband %}

{% renderSlots %}
  For this component to work, there should be an equal number of `nav` and `details` slotted elements.
{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}

{% band header="Accessibility" %}
  The provided markup should be semantic so that if the component can't load, the user still has an appropriate experience.  Once it upgrades, the appropriate tab interactions and markup for assistive tech is added to the component.
{% endband %}

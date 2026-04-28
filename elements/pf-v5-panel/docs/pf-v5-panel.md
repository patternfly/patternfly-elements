{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}
  <pf-v5-panel>
    <p>Main content</p>
  </pf-v5-panel>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Header
  {% htmlexample %}
  <pf-v5-panel>
    <h3 slot="header">Header content</h3>
    <p>Main content</p>
  </pf-v5-panel>
  {% endhtmlexample %}

  ### No Header
  {% htmlexample %}
  <pf-v5-panel>
    <p>Main content</p>
    <p slot="footer">Footer content</p>
  </pf-v5-panel>
  {% endhtmlexample %}

  ### Header and footer
  {% htmlexample %}
  <pf-v5-panel>
    <h3 slot="header">Header content</h3>
    <p>Main content</p>
    <p slot="footer">Footer content</p>
  </pf-v5-panel>
  {% endhtmlexample %}

  ### Raised
  {% htmlexample %}
  <pf-v5-panel variant="raised">
    <p>Main content</p>
  </pf-v5-panel>
  {% endhtmlexample %}

  ### Bordered
  {% htmlexample %}
  <pf-v5-panel variant="bordered">
    <p>Main content</p>
  </pf-v5-panel>
  {% endhtmlexample %}

  ### Scrollable
  {% htmlexample %}
  <pf-v5-panel scrollable>
    <p>
      A couple of years ago the Computer Science Club at Bishop's University
      ran into a problem. Our student run computer lab was running
      unlicensed copies of a propriety operating system. The computers also
      had many unlicensed programs installed. It was a big mess. At that
      time we had to make an ethical decision. We had to decide whether we
      wanted to continue breaking the law or not. We decided against running
      software for which we didn't have licenses as it could lead to the lab
      being closed.
    </p>
    <p>
      A couple of years ago the Computer Science Club at Bishop's University
      ran into a problem. Our student run computer lab was running
      unlicensed copies of a propriety operating system. The computers also
      had many unlicensed programs installed. It was a big mess. At that
      time we had to make an ethical decision. We had to decide whether we
      wanted to continue breaking the law or not. We decided against running
      software for which we didn't have licenses as it could lead to the lab
      being closed.
    </p>
    <p>
      A couple of years ago the Computer Science Club at Bishop's University
      ran into a problem. Our student run computer lab was running
      unlicensed copies of a propriety operating system. The computers also
      had many unlicensed programs installed. It was a big mess. At that
      time we had to make an ethical decision. We had to decide whether we
      wanted to continue breaking the law or not. We decided against running
      software for which we didn't have licenses as it could lead to the lab
      being closed.
    </p>
    <p slot="footer">Footer content</p>
  </pf-v5-panel>
  {% endhtmlexample %}

  ### Scrollable with header and footer
  {% htmlexample %}
  <pf-v5-panel scrollable>
    <h3 slot="header">Header content</h3>
    <p>
      A couple of years ago the Computer Science Club at Bishop's University
      ran into a problem. Our student run computer lab was running
      unlicensed copies of a propriety operating system. The computers also
      had many unlicensed programs installed. It was a big mess. At that
      time we had to make an ethical decision. We had to decide whether we
      wanted to continue breaking the law or not. We decided against running
      software for which we didn't have licenses as it could lead to the lab
      being closed.
    </p>
    <p>
      A couple of years ago the Computer Science Club at Bishop's University
      ran into a problem. Our student run computer lab was running
      unlicensed copies of a propriety operating system. The computers also
      had many unlicensed programs installed. It was a big mess. At that
      time we had to make an ethical decision. We had to decide whether we
      wanted to continue breaking the law or not. We decided against running
      software for which we didn't have licenses as it could lead to the lab
      being closed.
    </p>
    <p>
      A couple of years ago the Computer Science Club at Bishop's University
      ran into a problem. Our student run computer lab was running
      unlicensed copies of a propriety operating system. The computers also
      had many unlicensed programs installed. It was a big mess. At that
      time we had to make an ethical decision. We had to decide whether we
      wanted to continue breaking the law or not. We decided against running
      software for which we didn't have licenses as it could lead to the lab
      being closed.
    </p>
    <p slot="footer">Footer content</p>
  </pf-v5-panel>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}

{% renderOverview %}
  <pf-v6-checkbox label="Checkbox"></pf-v6-checkbox>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Controlled

  Nested `<pf-v6-checkbox>` elements are controlled by their parent. The parent
  toggles all children when clicked, and becomes indeterminate when only some
  children are checked.

  {% htmlexample %}
  <pf-v6-checkbox id="controlled-check-1" name="check1" label="Parent CheckBox">
    <pf-v6-checkbox id="controlled-check-2" name="check2" label="Child CheckBox 1"></pf-v6-checkbox>
    <pf-v6-checkbox id="controlled-check-3" name="check3" label="Child CheckBox 2"></pf-v6-checkbox>
  </pf-v6-checkbox>
  <pf-v6-checkbox id="controlled-check-4" name="check4" label="Controlled CheckBox"></pf-v6-checkbox>
  {% endhtmlexample %}

  ### Uncontrolled

  Uncontrolled checkboxes manage their own state. Set the `checked` attribute to
  change the initial state.

  {% htmlexample %}
  <pf-v6-checkbox id="uncontrolled-check-1" label="Uncontrolled CheckBox 1"></pf-v6-checkbox>
  <pf-v6-checkbox id="uncontrolled-check-2" label="Uncontrolled CheckBox 2"></pf-v6-checkbox>
  {% endhtmlexample %}

  ### Reversed

  Use `label-position="start"` to display the label before the checkbox.

  {% htmlexample %}
  <pf-v6-checkbox id="checkbox-reversed"
                  name="checkbox-reversed"
                  label-position="start"
                  label="Reversed checkbox example"></pf-v6-checkbox>
  {% endhtmlexample %}

  ### Disabled

  {% htmlexample %}
  <pf-v6-checkbox id="disabled-check-1" label="Disabled CheckBox 1" disabled checked></pf-v6-checkbox>
  <pf-v6-checkbox id="disabled-check-2" label="Disabled CheckBox 2" disabled></pf-v6-checkbox>
  {% endhtmlexample %}

  ### Checkbox with description

  Use `slot="description"` for descriptive text.

  {% htmlexample %}
  <pf-v6-checkbox id="description-check-1" label="Checkbox with description">
    <span slot="description">Single-tenant cloud service hosted and managed by Red Hat that offers high-availability enterprise-grade clusters in a virtual private cloud on AWS or GCP.</span>
  </pf-v6-checkbox>
  {% endhtmlexample %}

  ### Checkbox with body

  Use the default slot for custom body content.

  {% htmlexample %}
  <pf-v6-checkbox id="body-check-1" label="Checkbox with body">
    <span>This is where custom content goes.</span>
  </pf-v6-checkbox>
  {% endhtmlexample %}

  ### Checkbox with description and body

  Use both the `description` slot and the default slot.

  {% htmlexample %}
  <pf-v6-checkbox id="description-body-check" label="Checkbox with description and body">
    <span slot="description">Single-tenant cloud service hosted and managed by Red Hat that offers high-availability enterprise-grade clusters in a virtual private cloud on AWS or GCP.</span>
    <span>This is where custom content goes.</span>
  </pf-v6-checkbox>
  {% endhtmlexample %}

  ### Standalone input

  A checkbox without a visible label must have an accessible name.

  {% htmlexample %}
  <pf-v6-checkbox id="standalone-check"
                  name="standalone-check"
                  accessible-label="Standalone input"></pf-v6-checkbox>
  {% endhtmlexample %}

  ### Required input

  A required checkbox displays an indicator and participates in constraint
  validation.

  {% htmlexample %}
  <pf-v6-checkbox id="required-check"
                  name="required-check"
                  label="Required checkbox"
                  required></pf-v6-checkbox>
  {% endhtmlexample %}
{% endband %}

### Accessibility
  The host element is the semantic checkbox: it has `role="checkbox"` and exposes
  its checked, disabled, required, and invalid states to assistive technology.
  The shadow `<input>` is a visual affordance only and is hidden from assistive
  technology.

  #### Keyboard interaction

  | Key | Function |
  | --- | -------- |
  | <kbd>Tab</kbd> | Moves focus to the next checkbox or focusable element. |
  | <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves focus to the previous checkbox or focusable element. |
  | <kbd>Space</kbd> | Toggles the checkbox. No other key toggles it. |

  #### Labeling

  Use the `label` attribute for a visible label. Clicking the label toggles the
  checkbox, and the label has a pointer cursor to show that it can be clicked.
  The label text is also the checkbox's accessible name. To label the checkbox
  with an external `<label for="id">` instead, give the checkbox an `id` and omit
  the `label` attribute; do not combine the two.

  A checkbox without a visible label needs an accessible name. Use
  `accessible-label`, or the native `aria-label` or `aria-labelledby`
  attributes.

  {% htmlexample %}
  <pf-v6-checkbox accessible-label="Select all rows"></pf-v6-checkbox>
  {% endhtmlexample %}

  When the `description` slot is populated, the element exposes the description
  as the checkbox's accessible description. `required` and `invalid` add
  `aria-required` and `aria-invalid`, and a disabled checkbox is removed from the
  page's tab order.

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}

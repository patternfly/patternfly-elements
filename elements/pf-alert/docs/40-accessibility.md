## Keyboard interactions

A user should have the ability to navigate to and interact with alerts using their keyboard.

<uxdot-example color-palette="lightest" width-adjustment="456px">
  <img alt="Example of the keyboard navigation tab stops on both inline and toast variant alerts"
       src="../alert-a11y-keyboard-interactions.svg"
       width="456"
       height="276">
</uxdot-example>

<rh-table>

| Key                               | Result                                                                                                                     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| <kbd>Tab</kbd>                    | Moves focus to the next interactive element (e.g., from the close button to the first action button in the alert)          |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves focus to the previous interactive element (e.g., from the first action button in the alert back to the close button) |
| <kbd>Enter</kbd>                  | Selects the close button, an action button, or link                                                                        |

</rh-table>

## Focus order

A logical focus order helps users understand and operate our websites and products. Elements need to receive focus in an order that preserves meaning. Therefore the focus order should make sense and not jump around randomly.

<uxdot-example color-palette="lightest" width-adjustment="456px">
  <img alt="Focus goes to action buttons and to the close button last"
       src="../alert-a11y-focus-order.svg"
       width="456"
       height="276">
</uxdot-example>

{% include 'partials/accessibility/ariaguide.md' %}
{% include 'partials/accessibility/wcag.md' %}
{% include 'partials/accessibility/2.1.1-A.md' %}
{% include 'partials/accessibility/2.1.3-AAA.md' %}
{% include 'partials/accessibility/2.4.3-A.md' %}
{% include 'partials/accessibility/2.5.5-AAA.md' %}

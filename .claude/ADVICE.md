# API Design Advice

Distilled from Benny Powers' PR reviews across 2800+ PRs in RedHat-UX/red-hat-design-system and 2000+ PRs in patternfly/patternfly-elements.

## HTML

### Attributes & Properties

#### Prefer enum-style `variant` attributes, over multiple booleans
Consolidate mutually exclusive visual states into a single `variant` attribute with an enum type rather than multiple boolean attributes. Variants should be exclusive, not stackable.

> "this line introduces a new concept to the design system: multiple layered variants. prior to this, variants were exclusive. this change means that an element can have 0-or-more variants at one time. this opens up quite a bit of flexibility for users, however it could introduce explosive complexity and additional cognitive overhead." (RHDS PR #1587)

Recurring pattern: RHDS PRs #952, #1587

#### Distinguish `variant` from theme attributes
`variant` (or `type`) is for functional/structural differences between component configurations. Theme attributes are for color/theme differences. Never conflate the two.

> RHDS PR #288, #486

#### Boolean attributes for boolean states
When an attribute is yes/no (present/absent), use a boolean attribute, not a string `"true"/"false"`. Use `@property({ type: Boolean })` with a default of `false`.

> "does this need to be `'true'|'false'`? shouldn't it then be a boolean attr?" (RHDS PR #634)

#### Avoid `is-` prefix for boolean attributes
Since boolean attributes are true when present and false when absent, the `is-` prefix adds noise without value. Pair dash-case attributes to camelCase properties.

> "As the presence of boolean attributes indicate true and their absence false, and since we pair dash-case attributes to camelCase properties, we've avoided the syntax noise of `is-` prefixes for boolean element flags." (PFE PR #2357, #2045)

#### Don't default reflected booleans to `true`
A reflecting boolean attribute that defaults to `true` is problematic because there is no good way to unset it in HTML. Flip the sense of the attribute.

> "A reflecting boolean attr that defaults to true isn't great because there will be no good way to unset. Maybe flip (zing!) the sense to `no-flip`?" (PFE PR #2320)

#### Avoid initializing reflected properties
Don't set defaults on reflected properties. Let absence be the default state to avoid noisy attributes appearing on every instance when they connect to the DOM.

> "Let's avoid initializing reflected properties. We also don't really need the default state, we can just assume that as the default." (PFE PR #2186)

#### Don't reflect array properties
Avoid accepting and certainly reflecting array properties. If a list is needed, use a converter (like NumberListConverter).

> "We should avoid accepting and certainly reflecting array props. If this *must* be a list, use a converter like the NumberListConverter." (PFE PR #2320)

#### Don't sprout attributes
Avoid dynamically adding attributes that weren't present at creation time. This is an antipattern per the spec editor.

> "This way we avoid 'sprouting' attrs, which we've seen is an antipattern acc'd to the spec editor." Cited whatwg/html#8365. (PFE PR #2183)

#### Boolean-or-enum converter for multi-modal attributes
When an attribute has a default boolean behavior but also supports specific modes, use a boolean-or-enum converter pattern. Create reusable converter functions for patterns that appear in multiple elements.

> Consider `<rh-tile checkable="radio">` instead of `<rh-tile checkable radio>` (RHDS PR #1239)

#### Attributes should always have sensible defaults
All properties/attributes should have defaults. An element should work correctly with zero attributes set.

> "should have a default" (RHDS PR #952, recurring)

#### Multi-word attributes use dash-case
Multi-word attribute names should be dash-case since HTML attributes are case-insensitive. Property names should be camelCase.

> "The attr for this should be `full-height`." (PFE PR #2222); "We should prefer dash-case attributes for camelCase DOM properties, i.e. `date-format-input`, since HTML attributes are case-insensitive." (PFE PR #2599)

#### Don't expose internal state as public attributes
Internal implementation details like breakpoint state, color context, or responsive behavior should not be exposed as attributes. Use controllers internally.

> Removed `is-mobile` attribute (RHDS PR #471); made `on` attribute shadow-private across RHDS PRs #660, #661, #675

#### Don't expose `aria-*` as public API
Custom elements should expose their own semantic attributes (e.g., `disabled`, `accessible-label`) and manage ARIA attributes internally via ElementInternals.

> "we should prefer our own `disabled` attr, not expose `aria-` as public apis" (RHDS PR #1239); "Users shouldn't set aria on their own." (PFE PR #2699)

#### Abstract ARIA behind custom attributes
Provide custom attributes for screen-reader names rather than exposing ARIA attributes directly. Apply `aria-label` and `role` via ElementInternals internally. This simplifies the public API and reduces user error.

> "Both the aria-label and role will be set by element internals. Easier for the end user and less typing." (RHDS PR #1732)

#### Provide attribute/slot pairs for content
For content that could be plain text or rich markup, provide both an attribute (for simple use) and a named slot (for rich content). Demos should primarily show the attribute form.

> "I noticed these are all plain text, which indicates that these should be slot/attribute pairs; the slot being preferred for rich content and the attribute being preferred for plain text." (RHDS PR #2802)

#### Internalize accessibility wiring via attribute/slot pairs
If content serves as an accessible description (helper text, error text), make it an attr/slot pair so the component handles `aria-describedby` automatically, removing that burden from users.

> "If the design for this permits, we should consider making this an attr/slot pair, and that should allow us to remove the requirement for users to add `aria-describedby`" (RHDS PR #2802)

#### Normalize enumerated attribute values
Always normalize enumerated attribute values to lowercase internally, so `state="neUtRal"` works as expected.

> RHDS PR #2484

#### Remove dead attributes promptly
If an attribute has no effect (no CSS or JS references it), remove it with a proper major version bump. Dead attributes mislead users.

> "remove `bordered` from accordion. it anyways doesn't do anything" (RHDS PR #2217)

#### Don't redeclare native HTML attributes
The `role` attribute already exists on all elements. Don't add a `@property` for it.

> "the role attribute is native, and already reflects" (RHDS PR #2605)

#### Replace custom attributes with `data-action` pattern
Instead of inventing custom boolean attributes for action buttons (like `dismiss`, `cancel`), use `data-action="dismiss|cancel"`. This avoids potential conflicts with future standard attributes.

> RHDS PR #267

#### Use container queries over manual compact/responsive variants
If a layout change is purely a response to available space, make it automatic via container queries. Document how users can force the narrower layout by constraining the container width.

> "compact variant should be replaced with a container query, and we should document how to force it into compact layout by putting it in a narrow container" (RHDS PR #1587)

#### Avoid boolean `has-*` attributes
Instead of boolean `has-*` attributes that signal "some CSS property is set," prefer value-carrying attributes.

> "can we either remove this attribute or give it a value e.g. `<rh-audio-player accent-color='#EE0000'>`" (RHDS PR #679)

#### Prefer opt-in over opt-out for features
Reverse the sense of opt-out booleans so features are opt-in by default.

> "Can we reverse the sense of this? So that filter is opt in instead of opt out?" (PFE PR #2570)

#### Avoid empty strings as public API values
Empty string values are unclear in a public API. Prefer explicit, meaningful values and handle empty string at the access sites.

> "The empty string here... it's not great for a public API, since it's not immediately clear what `''` means here, why I'd need to use it, or what will happen if I do." (PFE PR #2570)

#### Limit public custom elements per component
Prefer working within a single shadow root when possible. Only ship multiple elements when accessibility or composition requires it.

> "Since upstream only provides the `DatePicker` react component, we should also try to limit the number of public components we ship here." (PFE PR #2599)

### Slots

#### Default slot for primary content
The main content of a component goes in the unnamed (default) slot. Only name slots for secondary/metadata content areas.

> "Giving this some thought, does this need to be named?" (RHDS PR #377, recurring across RHDS PRs #267, #471)

#### Use semantic slot names, not implementation-specific ones
Slot names should reflect semantic purpose. Prefer `actions` over `action-groups`, `header` over `title`. Prefer brevity: `actions` over `action-links`, `category` over `category-label`.

> "These are in keeping with the conventions we've developed in PFE" (RHDS PR #267); PFE PRs #2949, #2955

#### Use the DOM standard term "default slot"
The DOM standard uses the term "default slot", not "anonymous slot".

> "The DOM standard uses the term 'default slot' instead of anonymous. We might want to adopt that." (PFE PR #2593)

#### Require semantic HTML in slots
Header slots should accept `<h2>`-`<h6>` tags. Design slot APIs around standard HTML semantics rather than requiring custom class names.

> "Prefer h2-6 tags for header, in keeping with semantic HTML" (RHDS PR #267)

#### Don't provide placeholder content in slots
End users should never see strings like "Placeholder Description" on pages where developers forgot to include required content. Issue console warnings instead.

> "I removed the 'Placeholder Description' content, because I don't want end users to see strings like that on pages where developers forgot to include required content." (RHDS PR #471)

#### Be conservative about adding named slots
Consider alternatives (attributes, i18n controllers) when the number of slots could grow unboundedly.

> "We could always add another slot, but I'm wary that we might end up with dozens of slot names for the various states" (RHDS PR #1496)

#### Use named slots with defaults for i18n
Allow translation of built-in UI text by providing named slots with English default content.

> RHDS PR #591

#### Hide empty slot containers
When a slot has no slotted content, hide wrapper/container elements in shadow DOM to avoid empty spacing, visual artifacts, or empty landmarks in the accessibility tree. When ::has-slotted() becomes baseline, use it, until then,
it requires use of the DOM API to query the element's children client-side. SSR scenarios then require a more advanced solution which parses inputs and places `ssr-hint-has-slotted` attributes.

> Recurring pattern: RHDS PRs #1558, #1895, #2646

#### Don't add slots tightly coupled to a single child component
Prefer composable, general-purpose slots. If the existing API can support the use case (even with CSS workarounds), prefer that over API expansion.

> RHDS PR #1622

#### Keep slot semantics strict
Don't mix unrelated content types in a slot designed for a specific purpose. Design composable patterns where elements link across the DOM via idref references instead.

> "This is maybe a case for disconnected tabs (`<rh-tab for='idref'>`)..." (RHDS PR #995)

#### Prefer text nodes and attributes over nested child elements
For simple content with metadata, use text nodes for content and attributes for metadata.

> "can we do cues like this? `<rh-audio-player-cue start='00:02' voice='Burr Sutter'>I'm Burr Sutter.</rh-audio-player-cue>`" (RHDS PR #679)

#### Use prescriptive slot descriptions in JSDoc
Slot descriptions should tell users what to put there, not describe the slot abstractly.

> "A prescriptive explanation would be better here: `@slot - Label text`" (PFE PR #1899)

### Shadow DOM & Templates

#### Minimize wrapper/container elements
If a class or attribute can be applied directly to a semantic element (like `<article>`), don't add an extra `<div>` wrapper. Fewer DOM nodes mean better performance and simpler CSS.

> "we can remove the container and move the classmap to the article" (RHDS PR #952, recurring with #553)

#### Prefer `<slot>` directly over wrapping `<div>`
Since slots have `display: contents`, slotted content participates in the parent's layout. Only add wrapper divs when CSS layout truly requires them.

> "Slot has display: contents by default which means that as far as CSS layout is concerned, it's as if the slotted content nodes are direct children of the div." (RHDS PR #1302); "Do we need the wrapper div? Why not `<slot id='content' part='content'>` and set `display: block`?" (PFE PR #2588)

#### Set display on slot elements instead of wrapping divs
When a slot is wrapped in a div purely for layout, try setting display directly on the slot element.

> "consider removing the wrapping div and setting a display property on the slot" (RHDS PR #1197)

#### Use ID selectors and tag selectors in shadow DOM CSS
Prefer `#id` and `tagname` selectors over `.class` in shadow roots. Shadow DOM provides encapsulation, so IDs are safe and more semantic.

> RHDS PR #267, #377 (recurring)

#### No BEM in shadow DOM
BEM conventions were designed for a global CSS paradigm. Shadow DOM provides encapsulation, making BEM unnecessary and noisy. Use IDs for unique elements.

> "We shouldn't use BEM in shadow DOM." (PFE PR #2173); "internal dom does not and should not follow BEM conventions which were intended and implemented for a global css paradigm." (PFE PR #2155)

#### No classes required in light DOM
Components should not require users to add specific CSS classes to light DOM content.

> "remove the requirement to use specific classes in light DOM" (RHDS PR #267)

#### Use `::slotted()` styles over light DOM stylesheets
When possible, style slotted content from shadow DOM using `::slotted()` rather than requiring light DOM stylesheets.

> "Couldn't we do this in shadow DOM through the magic of `:is`?" (RHDS PR #254)

#### Distinguish slotted vs fallback content in CSS
Regular selectors target fallback content; `::slotted()` targets slotted content. Combine them to cover both cases.

> "you might want `rh-icon, ::slotted(rh-icon[slot=icon]) {` just to be safe. test it both ways" (RHDS PR #2604)

#### No self-closing void elements
Follow the HTML spec strictly: `<col>`, `<br>`, `<img>` should not have trailing slashes.

> "void elements shouldn't have a slash" (RHDS PR #1197)

#### Static content belongs in HTML, not JavaScript
Static modal/dialog content should be in the HTML template, not created dynamically in JavaScript.

> "This modal content is static, so put it in the HTML rather than in javascript, and call showModal() on it when you need to." (PFE PR #2949)

## CSS

### Custom Properties & Parts

#### Private CSS custom properties use `--_` prefix
Internal/private CSS custom properties use `--_` prefix. Public/customizable ones use component-namespaced names.

> Recurring pattern: RHDS PRs #436, #553, #1330, #2449; PFE PRs #2948

#### Don't create custom properties that duplicate native CSS
If users can achieve the same thing with `width`, `color`, etc., don't add a component-specific custom property for it.

> "although tbh `--rh-spinner-width` might be superfluous. Why not just make the svg's width 100% and have users set built-in property `width` on the host?" (RHDS PR #553)

#### Less is more for CSS custom property APIs
Only expose custom properties when they provide value beyond native CSS. You can always add them later.

> "better don't expose min-width as a token at all, unless specifically needed, users could just set `min-width` themselves" (RHDS PR #599)

#### Consider CSS custom properties before adding variant attributes
If a visual change is purely stylistic (e.g., transparent backgrounds), a CSS custom property is lower-cost and more flexible than a new attribute.

> "`open` might just be a pattern where the user sets `--rh-pagination-control-background-color` to `transparent`" (RHDS PR #1587)

#### Question the need for CSS parts aggressively
Parts create API surface that must be maintained and can allow users to break component internals. Only expose parts with clear use cases.

> "I don't want to get into a sticky situation here. The design guidelines were pretty clear, and a lot of the functionality is tied to the css. Opening up parts could easily break stuff in this case." (RHDS PR #279); "In general, we try to avoid adding parts unless we're sure there's a need for them." (PFE PR #2955)

#### Public CSS properties should be declared as fallback defaults
Public properties should be provided as fallback defaults at the use site, not set on `:host`. Setting on `:host` overrides user settings.

> RHDS PR #553; "Instead of setting these on `:host`, which would override any user settings, please make them fallbacks." (PFE PR #2497); "Instead of actively assigning these on :host, can we just pass the fallback values at the callsites? Less convenient for maintainers but probably better for users, since they'll be able to override when theming." (PFE PR #2114)

#### Non-overridable CSS properties go on internal elements
CSS custom properties that are intentionally non-overridable should be set on internal shadow DOM elements, not the host.

> "For those which are intentionally meant to override user configuration, those should be set on the svg element." (PFE PR #2155)

#### Distinguish system tokens from component tokens
System-level tokens come from the design token package and are used as-is. Component-level custom properties need full `@cssprop` documentation.

> See [RHDS-Specific Conventions: Token System](#token-system) for RHDS token naming.

#### Use token names, not raw values, everywhere
In code, reviews, and design specs, always reference design token names rather than pixel/hex values. Token values may change centrally.

> "The values are not as important as the token names. The values we'll automatically fix later, so if the token names are ok, just approve." (RHDS PR #489, recurring)

#### T-shirt sizes must map to established token values
Don't redefine what "xl" means per-element. XL should mean the same thing across the system.

> "This is still confusing. We have length tokens for a reason, why are we intentionally ignoring them? XL should be the same thing in all cases." (RHDS PR #2430)

#### CSS docstrings describe token usage within the element
When documenting CSS custom properties, describe how the token is used in this specific element, not the token's general purpose.

> "docstrings here will be prepended to the design tokens docstrings, so our text should describe the token's use *within this element*" (RHDS PR #2858)

#### Use logical properties in CSS custom property names
Use `border-block-start` not `border-top` in custom property naming.

> RHDS PR #1720

#### Attribute selectors are a smell for theming
Theming should be done via CSS custom properties, not via attribute selectors on theme attributes.

> "attribute selectors are a smell and shouldn't be required for any theming operation" (RHDS PR #1330)

### Conventions

#### Always use CSS logical properties
Use `inline-start`/`block-start` instead of `left`/`top` to support RTL and vertical writing modes.

> "Please use `inline-start` instead of `left`" (RHDS PR #377, recurring across RHDS PRs #259, #2605)

#### Use `::after` double-colon syntax for pseudo-elements
Per CSS3 spec.

> "`:after` works, but CSS3 prefers `::after`" (RHDS PR #259)

#### Animate GPU-friendly properties
Animate `transform`/`translate`/`opacity`, not `padding`/`margin`/`width`.

> "The change I made was to animate the `translate` value instead of the `padding` value, which is much more performant" (RHDS PR #349)

#### Shadow DOM animation names don't need prefixes
CSS animation names within shadow DOM are scoped automatically. Keep them short and readable.

> "this animation name doesn't need a prefix, it's encapsulated in the shadow dom" (RHDS PR #553)

#### Use modern CSS transform properties
Use individual transform properties (`rotate`, `translate`, `scale`) instead of the combined `transform` function.

> "I think we should already prefer transform properties: `rotate: var(...)`" (PFE PR #2114)

#### Use `aspect-ratio` instead of width+height
When width and height should maintain a ratio, use the `aspect-ratio` property.

> Refactored spinner CSS "to use `aspect-ratio` instead of setting width and height." (PFE PR #2155)

#### Use `pointer-events: none` on disabled hosts
Disabled elements should prevent interaction at the CSS level.

> `:host([disabled]), :host(:disabled) { pointer-events: none; }` (PFE PR #2221)

#### Use CSS grid over CSS table modes
CSS grid handles spanning (like `colspan`) better than CSS table display modes.

> "We should consider using css-grid in place of table modes. I haven't found an effective means of emulating `colspan` with table modes... whereas with grid, we can just `grid-column: 1/-1`." (PFE PR #2564)

#### Use native CSS nesting
Prefer native CSS nesting syntax over preprocessor nesting.

> "We generally prefer to use nesting syntax." (PFE PR #2955)

#### Don't nest `:host` attribute selectors with `&`
CSS nesting does not support `&([attr])` as a shorthand for `:host([attr])`. The `&` in nested CSS represents the parent selector as-is, but `:host` is a pseudo-class function, and `&([attr])` parses as a function call, not an attribute selector appended to `:host`. Keep `:host([variant="..."])` blocks flat at the top level. Nesting is valid for descendant selectors within those blocks, e.g. `& button:hover` or `:host([disabled]) &`.

```css
/* WRONG: &([attr]) is invalid */
:host {
  &([variant="primary"]) { ... }
}

/* RIGHT: flat :host selectors, nested descendants */
:host([variant="primary"]) {
  --_color: blue;
}

:host([variant="primary"]) button {
  &:hover { --_color: darkblue; }
  &:active { --_color: navy; }
}
```

#### Use `display: contents` cautiously
`display: contents` on `:host` can cause issues. Consider ResizeObserver with a private CSS var instead.

> "More and more I'm thinking that we should avoid `:host { display: contents; }`, and maybe calculate a private css var in resize observer instead." (PFE PR #2630)

## JavaScript

### Events

#### Use custom `Event` subclasses, not `CustomEvent` with detail
Create typed Event subclasses instead of `new CustomEvent('name', { detail: {...} })`.
Better TypeScript and runtime type safety and cleaner APIs.
If event detail contains data, use class fields on the event, e.g.

```ts
export class DialogCloseEvent extends Event {
  reason: string;
  constructor(reason: string) {
    super('close', { bubbles: true, cancellable: true });
    this.reason = reason;
  }
}
```

> Also in PFE: "Can we deprecate the el:name events and add our own `extends Event` events?" (PFE PR #1829); "Prefer to extend `Event` with `bubbles: true` and optionally `cancellable: true`, rather than using `ComposedEvent`." (PFE PR #2599)

#### Make destructive/state-changing events cancelable
Events for close, delete, copy, and similar actions should be cancelable via `preventDefault()`. Demonstrate the cancelable pattern in demos.

> "allow handlers to prevent close with `event.preventDefault()`" (RHDS PR #595)

#### Make action events mutable
Events for user-facing actions (like copy) should allow consumers to modify the action data, not just cancel.

> RHDS PR #2677 -- copy event allows modifying copied text (e.g., removing shell prompts)

#### Prefer simple native Event objects when no data is needed
Use `new Event('ready')` rather than CustomEvent when the event carries no data payload.

> "I think we can use a `new Event('ready')` here" (RHDS PR #436)

#### Match native event names when wrapping native elements
When wrapping `<dialog>` or similar, match native event names and timing. Users expect custom elements to behave like their native counterparts.

> RHDS PR #1474

#### Don't bake analytics into components
Let analytics scripts add their own event listeners. This reduces bundle size for non-analytics users.

> "The alternative is IMO much better: analytics users implement their own analytics." (RHDS PR #349)

### Architecture

#### Prefer forking over inheriting from upstream base classes
Don't force inheritance when the downstream component has significantly different needs. Extend LitElement directly for cleaner, simpler code. Share controllers and helpers without class inheritance.

> "We should consider extending LitElement and reimplementing the DOM here: I'm not sure what advantage we get by extending BaseCard." (RHDS PR #952, recurring with #550)

#### Prefer composition (controllers) over inheritance (base classes)
Controllers allow sharing behavior without class hierarchy. Configuration is better than inheritance for shared behavior.

> "Since I was able to put everything in the controller, we don't actually export a base class... composition > inheritance" (PFE PR #2283); "Better to config then inherit." (PFE PR #2375)

#### Elements should have single responsibility
If combining features creates accessibility issues, split them. Let consuming patterns compose simple primitives.

> "remove all the dropdown/button/floating-ui stuff from menu... reimplemented that stuff in audio-player... this fixes cross-root aria problems" (RHDS PR #778)

#### Context propagation must work at arbitrary depth
Test context with grandchild and deeply nested scenarios, not just parent-child.

> RHDS PR #1985

#### Lazy-load optional dependencies
When a component optionally uses another component (e.g., an icon), lazy-load that dependency only when the relevant attribute is set.

> "add something like `@observes('icon') protected iconChanged() { if (this.icon) { import('@rhds/elements/rh-icon/rh-icon.js'); } }`" (RHDS PR #2604)

#### Don't import heavy token maps in client code
Use CSS custom properties and `getComputedStyle` to access values at runtime, keeping bundle size small.

> "We can't use this in client-facing code, it'll drag in the entire map, which is just too much js to justify the convenience of `.get`." (RHDS PR #436)

#### Move private statics to module scope
Private static methods should be module-scoped functions rather than static class methods, to prevent users from seeing them on the constructor.

> "move private static methods into module scope to prevent users from being confused" (RHDS PR #2170)

#### SSR awareness in component code
DOM APIs like `getBoundingClientRect()`, `children`, `assignedElements()` are not available during server-side rendering. Guard DOM-dependent code with `isServer` checks.

> "this might crash in ssr. better to wrap the whole function body in if isServer" (RHDS PR #2448, recurring with #2605, #2802)

#### Prefer declarative state over imperative
Prefer attribute-driven state over imperative state set via JS methods. More predictable and compatible with SSR.

> RHDS PR #2429

#### Prefer re-export entrypoint modules over pre-built bundles
Preserves tree-shaking while providing convenience.

> RHDS PR #1630

#### Use MutationObserver when slotchange is insufficient
`slotchange` won't fire when children are added/removed without slot attributes changing. Use MutationObserver for dynamic content.

> RHDS PR #279

#### `slotchange` already bubbles — don't add redundant listeners
Don't manually add `slotchange` listeners on individual slots when you can listen on the shadow root.

> "Not needed, slotchange already bubbles." (PFE PR #2563)

#### Be careful with `hostConnected`
`hostConnected` reinitializes state when elements are moved in the DOM. State set in `hostConnected` will be blown away.

> "This will blow away the state... `$('#other-container').append(el); // oops... hostConnected()`" (PFE PR #2410)

#### Use single static event listeners instead of per-instance
For document-level event listeners, add a single static listener that iterates over a private set of element instances. Per-instance listeners are memory leaks.

> "This is a memory leak. We must only add one listener to the document, in a static initialization block, and have that listener iterate over a private set of element instances." (PFE PR #2899)

#### State updates should be unidirectional
Don't set the same state in multiple places. State should flow in one direction.

> "`this.value` is set here and in `#onChange`. State updates should be unidirectional." (PFE PR #2899)

#### Expose optional protected hooks
When subclasses may need to hook into behavior, expose an optional protected method rather than making methods protected by default.

> "If the subclass needs to hook in here, let's expose an optional protected hook instead: `protected onSlotchange?(): void`." (PFE PR #2099)

#### Modules don't need to wait on `load`
ES modules are always deferred, so waiting for the `load` event is unnecessary.

> "Modules don't need to wait on `load`, since they're always deferred." (PFE PR #2563)

#### Components should not own features that belong to external code
If a feature (like adding items to a group) belongs to consuming code, document it with demos but don't build it into the component.

> "The idea of adding labels to the group should not be handled inside the PfLabelGroupClass. We should certainly document how to do this with demos, but those demos shouldn't be using built-in features of pf-label-group." (PFE PR #2949)

#### Ensure hard-coded strings are internationalizable
Don't bake locale-specific strings into component logic. Consider i18n from the start.

> "This regexp hard-codes the string 'remaining' into the component's UI. What if a downstream developer needs to put a label group on a page which is translated into french? or swahili?" (PFE PR #2949)

#### Mark properties as private to avoid accidental API surface
Public properties are API surface that bumps the minor version. If a property doesn't need to be public, make it private.

> "Should be private to avoid a minor release." (PFE PR #2493)

#### Consider whether something should be CSS API or HTML attribute API
Some features (like `scrollable`) may be better expressed as CSS custom properties than HTML attributes.

> "I wonder if `scrollable` is better defined as a css api than an html api?" (PFE PR #2099)

### Code Style

#### Use ECMAScript private fields
Prefer `#privateField` syntax over TypeScript `private` keyword for true encapsulation at runtime.

> "Let's use ecmascript private fields here" (RHDS PR #436); "Prefer ecmascript private fields where possible" (PFE PR #2599)

#### Use `override` keyword on lifecycle methods
Always use the TypeScript `override` keyword when overriding LitElement lifecycle methods.

> RHDS PR #1149

#### Use `classList.toggle` with force parameter
Use `classList.toggle(name, force)` instead of if/else with add/remove.

> Suggested `col.classList.toggle('active', index === cellIndex)` (RHDS PR #1197)

#### Use const object literals for simple mappings
`const DIRECTION_OPPOSITES = { asc: 'desc', desc: 'asc' } as const;` instead of switch/if.

> RHDS PR #1197

#### Consider TypeScript union types for constrained attribute values
Enables IDE autocompletion and catches errors at compile time.

> "it Would be cool if we exported the union of names in each set from the icons repo. that way we could get icon name autocompletion." (RHDS PR #1732)

#### Prefer `switch` for keyboard event handling
Use `switch` statements over if/else chains for keyboard events.

> "Nit: prefer `switch` statements for keyboard events." (PFE PR #2570)

#### Follow established class member ordering
Organize class members consistently: static fields, reactive properties, private fields, constructor, lifecycle methods, render, public methods, private methods.

> "Member ordering: https://github.com/RedHat-UX/red-hat-design-system/wiki/Custom-Elements-API-Style-Guide#ordering" (PFE PR #2589)

## Accessibility

### Manage ARIA internally
Elements should manage their own ARIA attributes internally rather than requiring users to set them in markup.

> "can we handle aria internally?" (RHDS PR #2449, recurring)

### Derive accessible labels from slotted content
Automatically compute accessible labels from headline/heading slots. Always provide an accessible-label attribute escape hatch.

> "Ok, we can adjust the code which computes the label to only consider elements slotted into the headline slot. but what if there's no headline text, we still need the accessible-label escape hatch, right?" (RHDS PR #1302)

### Compute ARIA state privately via context
ARIA state derived from DOM structure (`aria-posinset`, `aria-setsize`) should be computed internally via context, not exposed as public attributes.

> "We might consider making this private. The select element would provide a context." (RHDS PR #2802)

### Use ElementInternals for ARIA semantics
Use ElementInternals to set `role`, `aria-label`, and heading levels rather than forcing users to manage them. Accept and gracefully handle common mistakes in attribute values (like `2` vs `h2`).

> RHDS PRs #1715, #1732; "If we adopt FACE we should use `this.#internals.ariaLabelledby`." (PFE PR #2099)

### Use ElementInternals for form association
Use the ElementInternals API for form-associated custom elements rather than wrapping or slotting native form elements. Call `setValue()` on the internals object whenever the value changes.

> "Uses the new ElementInternals API to remove need for slotted button" (RHDS PR #550); "We'll need to attachInternals, and whenever the value changes, call `setValue()` to report back the form value." (PFE PR #2511)

### Avoid landmark pollution
Don't put `<article>`, `<header>`, `<footer>`, `<nav>` landmark elements in shadow DOMs of components used in multiples. They create excessive landmarks for screen reader users.

> RHDS PR #1560

### Internalize landmark roles for navigation components
Components that represent navigation landmarks should include the landmark role in their shadow DOM, not require users to add it.

> "Jump Links will use the `<nav>` role internally as a built-in landmark." (RHDS PR #2194)

### Lean on the native platform
When adopting native elements like `<dialog>`, question any JavaScript that reimplements what the platform already provides. Expose native capabilities (like dialog return values) rather than hiding them.

> "If we're using `<dialog>`, why do we still need kitty's focus trap javascript? Should we just call showModal by default?" (RHDS PR #1865)

### Provide fallback content for computed-content elements
Elements that render computed content should accept the raw value as text content for progressive enhancement / no-JS fallback.

> Suggested `<rh-timestamp date="...">Tue Aug 09 2006...</rh-timestamp>` (RHDS PR #1149)

### Use `<details>` for expandable content
Styled `<details>` elements give expandable/collapsible accessibility for free, avoiding manual ARIA management.

> "This should perhaps be a styled `<details>` element instead. That would give us accessibility for free. Otherwise, you need to apply aria to these elements." (PFE PR #2955)

### Use `aria-hidden="true"` on decorative shadow icons
Decorative icons in shadow DOM should always be hidden from the accessibility tree. Document that users should use `aria-label` or `aria-labelledby` on the host.

> "Always aria-hidden=true the shadow icon, document to use `aria-label(ledby)`." (PFE PR #2138)

### Don't add click listeners to icons
Icons are decorative or informational, not interactive. Click handlers belong on buttons or other interactive elements.

> "You must not add click listeners to icons." (PFE PR #2951)

### Consider cross-root ARIA limitations
When composing elements across shadow boundaries, cross-root ARIA references don't work declaratively yet. This may require duplicating internal elements as a workaround. Client-side, ARIA IDL DOM properties (baseline 2025) can resolve cross-root references imperatively via JavaScript. Upcoming APIs like Reference Target will provide declarative solutions.

> "We can't use pf-button until browser vendors ship a solution for x-root aria." (PFE PR #2676)

### Don't set contradictory ARIA on the same internals
When a role like `role="none"` is set, don't also set contradictory attributes like `aria-disabled` on the same internals object.

> "If we're setting `role='none'` (synonymous with `role='presentation'`) on the host element, then does it make sense to set aria-disabled on the same internals object?" (PFE PR #2671)

### Leave "why comments" on non-obvious ARIA decisions
Non-obvious accessibility decisions need comments explaining the reasoning for future maintainers.

> "I think we should also leave a 'why comment' here and below, to prevent confusion in the future, since the reader may not immediately grok that disabled dropdowns are still permitted to open." (PFE PR #2671)

## API Design Philosophy

### API Surface

#### Easy to add, hard to remove
Be conservative with API surface. Every slot, part, property, and attribute is API surface. Adding new features is a minor release; removing them is a breaking change.

> "absent clear guidance, I'd say 'less is more' - we can always add later, but removing APIs is very difficult to justify" (RHDS PR #952, recurring across RHDS PRs #254, #259, #279)

#### Additive API changes are minor versions, not patches
Adding a new public property, attribute, event, or slot is a minor version bump, not a patch.

> "It's an additive API change, so core 2.1.0." (PFE PR #2410)

#### Don't add escape-hatch slots without concrete use cases
Override/escape-hatch slots that allow replacing entire shadow DOM sections should only be added when there is a proven need.

> "Do we have a concrete use case for the `base` slot, which overrides all the shadow content? If not, we should consider removing it." (RHDS PR #254)

#### Distinguish element-level from pattern-level features
Some visual treatments are achieved through composition and content (pattern-level) rather than built-in attributes (element-level). Document patterns separately from element APIs.

> "We don't need to (and maybe shouldn't) implement all of these in the element - i.e. some of them are likely 'pattern level', and should be moved to docs/patterns/card" (RHDS PR #952, recurring with RHDS PR #995)

#### Composability over configuration
Features that compose multiple behaviors belong at the "pattern" level rather than as built-in booleans. Keep components reusable across more contexts.

> "I'd rather leave that to the pattern level, tbh" (RHDS PR #995)

#### Scrollspy and sticky positioning are patterns, not component features
Keep components focused on rendering and semantics. Layout and behavioral concerns are pattern-level.

> RHDS PR #2194

#### Don't ship what you can't fully support
Limit scope to what can be properly themed/maintained. Expand later when the broader system catches up.

> "Because we have not yet fully developed our theming process yet, it seems to me that shipping this will actually break theming going forward." (RHDS PR #1587)

#### Reuse existing components rather than creating new sub-elements
Before creating new sub-elements, check if existing components can serve the purpose.

> "my thought process was that (1) I'm lazy and (2) it's better to use existing components wherever possible" (RHDS PR #1496)

#### Backwards-compatible API evolution
When simplifying an element's API (e.g., replacing slotted content with an attribute), always maintain backwards compatibility with the existing approach.

> "existing markup will still work" (RHDS PR #2182)

#### Deprecation over removal for shipped APIs
Never remove a shipped public attribute without a deprecation period. Add deprecation warnings (JSDoc and runtime console warnings). Isolate deprecation code with comments for easy cleanup.

> "rather than putting the provider back, let's concentrate on putting the *attribute* back instead" (RHDS PR #1245)

#### Shipped attribute values are part of the public CSS API
Even when deprecating attribute values, keep them functional in CSS to avoid breaking downstream selectors.

> "since open is part of the public css api, we have to keep it in this file. imagine someone had this css: `rh-pagination[variant='open'] { ... }` This will break if we remove the open attr from css" (RHDS PR #2704)

#### Provide deprecated aliases when renaming elements
When renaming elements, always provide backward-compatible aliases so old names continue to work. Use `@deprecated` JSDoc annotations.

> "Since we don't alias to the old names this is a breaking change... Probably best to provide aliases" (RHDS PR #746)

#### Remove prematurely-shipped public APIs
It is better to remove bad public APIs and replace them with private internals than to keep them for backward compatibility.

> "The idea behind the context tokens is useful, but they were hastily implemented by yours truly without consulting the designers." (RHDS PR #817)

#### Breaking change communication
Changesets for breaking changes should include: (1) what changed, (2) BEFORE/AFTER code migration examples, (3) rationale.

> RHDS PR #845; "Please outline breaking changes here with before and after html blocks." (PFE PR #2114)

#### Coordinate breaking changes with downstream consumers
When changing interactive semantics (like moving `href` from slotted `<a>` to element attribute), coordinate with analytics, CMS, and other downstream teams.

> RHDS PR #1608

### Naming Conventions

#### Use "variant" not "variation"
Consistent terminology across all documentation and code.

> RHDS PR #1043

#### Use `expanded` over `open` for collapsible semantics
For accordion-like collapsible elements, `expanded` is more conventional than `open`.

> "I agree with you, `expanded` is more conventional." (PFE PR #1849)

#### Rename parts and public APIs to avoid implementation jargon
CSS parts and public API names should use user-facing terminology, not internal concepts like "provider."

> "on call we talked about renaming this. options: main, nav, menu, mobile menu. anything other than provider, really" (RHDS PR #1108)

#### Rename confusing concepts for adoption
When technical terminology creates a barrier, rename the public-facing concept to use familiar industry terms.

> "we've identified that the word 'color context' is confusing... By contrast, most designers and developers know what a theme is." (RHDS PR #1298)

#### Controller names shouldn't reference underlying libraries
Name controllers for what they do, not what library they wrap. The library may be swapped or removed later.

> "the name shouldn't reference the underlying library (since we might swap or remove it later)" (PFE PR #2045)

#### Standardize controller method names across elements
When multiple elements use the same controller patterns, standardize the method names (e.g., `selectItem`) to prevent inconsistency that would later require breaking changes.

> "we should probably settle on a nomenclature and call all of these `selectItem` etc, aligning names around RTIController in all elements" (RHDS PR #1239)

#### Standardize icon API across elements
When multiple elements use icons, standardize the icon API (`icon`, `icon-set` attributes) across all of them.

> RHDS PR #1859

## Documentation & Testing

### Every element needs `@summary` JSDoc
Required for the custom elements manifest.

> "needs `@summary`" (RHDS PR #952, recurring)

### All public members need JSDoc
Think of the custom elements manifest as consumable by LLMs and tooling. JSDoc blocks on base classes inherit to subclasses.

> "props need jsdoc: think cem as llm fodder" (RHDS PR #2449); "You could move the jsdoc blocks to base, and they'll inherit to the subclasses." (PFE PR #2260)

### Use `/** */` JSDoc blocks, not `//` comments, for public API
Public API documentation should use JSDoc blocks. Examples in JSDoc should use the DOM API (`document.querySelector`), not browser console (`$0`).

> "This should be a jsdoc block, not a `//` comment, and the example should use the DOM api (`document.querySelector('tabs-element')`), not browser console (`$0`)." (PFE PR #2577)

### Use CSS data types in `@cssprop` JSDoc
Use CSS data types where feasible and show direct values in `@default`.

> "Use CSS data types where feasible, so `@cssprop {color} --background-color`. In the `@default` inline tag, use the direct value rather than the variable definition." (PFE PR #2045)

### Don't use unnecessary `@default` JSDoc tags
The CEM analyzer picks up defaults from property initializers automatically.

> "We don't need `@default`, our analyzer will pick it up from the initializer." (PFE PR #2949)

### Document all public CSS custom properties with `@cssprop`
System tokens referenced in documentation should only list names (not values). Every public CSS custom property needs a descriptive comment.

> "needs `@cssprop`s for component props and system tokens" (RHDS PR #952)

### Document all CSS parts with `@csspart`
Every exposed CSS part needs a JSDoc `@csspart` annotation, or it should be removed.

> "This needs a `@csspart` jsdoc tag." (PFE PR #2470); "List the parts in jsdoc, or remove them." (PFE PR #2511)

### Summaries and descriptions belong in inline JSDoc
Not in external data files. Co-locate documentation with code.

> "belongs inline" (RHDS PR #2802)

### Tests should verify public API, not shadow DOM internals
Shadow DOM is an implementation detail. Test via attributes, properties, events, computed styles, offsetWidth, and accessibility tree snapshots.

> "we would generally prefer for tests not to ever look into the shadow root, where feasible. The reason why is because the shadow root should be private to the implementation." (RHDS PR #553)

### Use a11ySnapshot for accessibility assertions
Test accessibility by asserting against the accessibility tree, not by querying shadow DOM structure.

> "instead of asserting on the shadow root, use a11ySnapshot and assert against the ax tree" (RHDS PR #1239); "Don't assert on shadow dom, instead assert on the ax tree." (PFE PR #2589)

### Separate setup from assertions in tests
Move fixture creation and actions into `beforeEach`. Keep `it` blocks focused on assertions. Structure tests as "given a predicate, assert result" using nested `describe` blocks.

> "setup preliminary state in `describe/beforeEach` and perform actions in `beforeEach`. `it` should (usually synchronously) only assert on state" (RHDS PR #1239); PFE PR #2577

### `async` in `it` blocks is a smell
If an `it` block needs to be async, the async setup should move to `beforeEach`. Exception: asserting on the accessibility tree.

> "`it(title, async function() {});` is a smell, the `async` should not be necessary." (PFE PR #2589)

### Don't use arrow functions in Mocha tests
Mocha tests should use `function()` to allow `this.timeout()` and other Mocha context features.

> "Mocha tests should not use arrow functions." (PFE PR #2155)

### Test element computed sizes, not internal CSS property values
Test observable behavior like `offsetWidth` rather than internal CSS custom property values.

> "Might be more maintainable to test the element's offsetWidth." (PFE PR #2155)

### Test form submission behavior
Wrap form-associated elements in forms, add submit listeners that do `event.preventDefault()`, and verify values.

> "Can you add tests for form submission, to make sure the correct value is applied?" (PFE PR #2899)

### Tests should assert observable behavior, not rendering
A test that only checks whether the element renders is not useful.

> "we can remove this test, it doesn't make any assertions about our element's public apis, state, or observable side effects" (RHDS PR #2605)

### Split demos into separate files per variant
Each demo file should show one variant or feature. Index demo is the simplest possible usage.

> "move this pattern to a separate demo. Index should be a simple example of basic usage." (RHDS PR #2802, recurring); PFE PRs #2511, #2599

### Inline demo dependencies
Demo files should be self-contained. Inline JavaScript imports rather than using separate JS files.

> "prefer to inline this into demos, to improve reading comprehension" (RHDS PR #1197); PFE PR #2593

### Avoid wrapper divs in demo HTML
They add noise and don't represent how users would actually use the component.

> "Try to avoid wrapper divs in demos, they add noise." (RHDS PR #2802)

### Make component scope abundantly clear in docs
When a component has a constrained scope, make that limitation explicit at every documentation entry point. Users arrive via deep links.

> "The docs should be updated to make it abundantly clear - at every opportunity - that this element is *not* for displaying arbitrary content" (RHDS PR #1732)

### Document progressive enhancements
When an element progressively enhances standard HTML, document each enhancement feature explicitly.

> RHDS PR #1197

### Changesets describe what changed for the user
Explain user-facing changes, not the development process. Include code snippets.

> "Rather than explaining the steps taken as a dev, explain what the major changes are to the user." (PFE PR #2186)

## Lit-Specific Conventions

The following conventions apply when building custom elements with Lit.

### Omit `type: String` and single-word `attribute` in Lit decorators
`type: String` is the default in `@property()` and should be omitted. The `attribute` option only needs specification when the attribute name differs from the property name.

> "type: String is superfluous" (RHDS PR #679); "You don't need to specify `attribute` for single-word terms" (RHDS PR #377)

### Don't imperatively update shadow DOM — use reactive state
In Lit components, don't imperatively add/remove classes or modify shadow DOM. Use reactive properties and `classMap` in templates. State changes should flow through the reactive system.

> "We shouldn't imperatively update templated DOM... Better to use `classMap` and key everything off element state." (RHDS PR #259); "Imperatively modifying DOM that lit controls is fragile." (PFE PR #2301)

### State then effects
Methods should update state; side effects (events, class changes) should be derived from state changes in lifecycle callbacks or render methods.

> "If the intention is to set state and also fire an event to inform regarding the change, can we invert the responsibility, have this method set `this.expanded = !this.expanded`, then in `expandedChanged` fire the event? state => effects" (RHDS PR #259)

### Put false case first in Lit template ternaries
Makes templates easier to scan: `${!condition ? '' : html\`content\`}`.

> "nit: reads better when the false case is first" (RHDS PR #2624)

### Controllers for cross-cutting concerns
Use reactive controllers (ScreenSizeController, DirController, RovingTabindexController, etc.) rather than manually managing state. Initialize controllers eagerly but make them noop when not applicable.

> "Can we use RHDSScreenSizeController here instead, so that we don't have to import tokens here?" (RHDS PR #259, recurring)

### Use `static styles = [styles]` array form
Even for single stylesheets, use array syntax so adding additional style sources later is a minimal diff.

> RHDS PR #2449

### Prefer `willUpdate` over mutation observers for property changes
Use Lit's reactive property system (`@property` + `willUpdate`) instead of mutation observers when reacting to property changes.

> "We don't need a mutation observer for this; we can use `@property` and `willUpdate`." (PFE PR #2511)

### Keep render methods pure — side effects in `willUpdate`
Side-effect logic (logging, external state updates) should move to `willUpdate`. The render method should be a pure function of state.

> "The logger call, since it's a side effect should move to `willUpdate`." (PFE PR #2511)

### Prefer `firstUpdated()` over async `connectedCallback`
For initial DOM setup, use Lit's `firstUpdated()` rather than making `connectedCallback` async.

> "As elsewhere, maybe we can use firstUpdated to avoid async connectedCallback." (PFE PR #2099)

### Prefer `updated()` over `connectedCallback` for property reactions
Lit likes to control CE lifecycle callbacks. Use `updated()` to react to property changes.

> "Probably better just to check for changes in `updated`, lit likes to take control of ce lifecycle callbacks." (PFE PR #2292)

### Don't break up templates into private render methods without reason
Keep templates inline unless there's a compelling reason to extract them.

> "Can we inline these? We've tended to avoid breaking up the templates into private render methods, unless we had a compelling reason." (PFE PR #2320)

### Don't explicitly bind instance methods in Lit templates
Lit handles `this` binding for event listeners in templates.

> "Shouldn't need to explicitly bind instance methods in lit render templates." (PFE PR #2375)

### Use `styleMap` for dynamic inline styles
When dynamic inline styles need to override the CSS cascade, use Lit's `styleMap` directive.

> "Better to do this as a styleMap, and you can keep everything in the render method IMO." (PFE PR #2588)

### Design controllers for `ReactiveControllerHost`, not just elements
Controllers may need to work with non-element hosts (e.g., `useController` hook in lit/react).

> "Bear in mind we may need to make all of these controllers work with `ReactiveControllerHost` that isn't an element." (PFE PR #2570)

### Ensure controllers are composable
Elements should be able to use multiple controllers (float, RTI, toggle, internals) together without conflicts.

> "Ensure this is composable. Elements should be able to implement their own float, rti, toggle, and internals controllers and have them all work together." (PFE PR #2570)

### Use InternalsController singleton with WeakMap
Access ElementInternals only through a shared controller that maintains a static WeakMap from host to internals.

> "InternalsController should have a static weakmap from ReactiveControllerHost => internals." (PFE PR #2570)

## Lit SSR

The following advice is distilled from hard-won experience implementing Lit Server-Side Rendering across the RHDS docs site and PatternFly Elements, including the SSR wiki, SSR controller patterns, and dozens of SSR fix commits.

### Guard browser-only APIs with `isServer`
Code that accesses `window`, `document`, `MutationObserver`, `IntersectionObserver`, `getComputedStyle()`, `getBoundingClientRect()`, `children`, `assignedElements()`, or any other browser-only API will crash during server render. Guard all such code with Lit's `isServer` flag.

```ts
import { isServer } from 'lit';

connectedCallback() {
  super.connectedCallback();
  if (!isServer) {
    this.#normalize();
  }
}
```

> Recurring pattern across RHDS PRs #2294, #2448, #2605, #2802; PFE PR #2099

### Move DOM logic out of `connectedCallback`
Enabling Lit context SSR support requires components to run `connectedCallback` on the server (so context providers register before consumers need values). This means **all DOM-related logic must move out of `connectedCallback`** into `firstUpdated` or `updated`. Adopting context SSR required a major refactor of the entire RHDS element library.

> RHDS wiki SSR page; RHDS PR #2294

### Avoid hydration mismatches
Mismatches between server-rendered HTML and initial client render are extremely difficult to debug and can prevent components from ever updating on the client. The component must treat server-rendered state as given and not modify it during initial upgrade.

```ts
updated() {
  if (!isServer && this.hasUpdated) {
    // Safe to run client-side-only logic
  }
}
```

The first two render cycles must not override server-set state.

> RHDS wiki SSR page

### Replace template ternaries with `?hidden` for SSR
Conditional ternaries in templates, especially in child parts, can break hydration with cryptic `Hydration value mismatch` errors. Prefer `?hidden` attribute binding over ternaries for conditional rendering. Use `role="none"` to remove semantics from hidden landmark elements.

> RHDS wiki SSR page; Justin Fagnani confirmed this is a first-hydration data issue

### Use `!this.hasUpdated && isServer` for server-only conditionals
When a conditional should only apply during SSR (not on the first client render), combine `isServer` with `hasUpdated` to avoid hydration mismatches.

```ts
const _isServer = !this.hasUpdated && isServer;
classMap({ isServer: _isServer })
```

> RHDS wiki SSR page, per Konnor Rogers and Justin Fagnani

### Lit SSR does not support async rendering
There is currently no built-in Lit framework solution for handling asynchronous tasks during server rendering. RHDS worked around this by leveraging the fact that Lit SSR internals use iterators/generators — creating an async iterator to pause rendering, wait for promises, and yield results back.

> RHDS wiki SSR page; upstream issue: lit/lit#4390

### Use SSR hint attributes for slot-dependent templates
Lit SSR cannot inspect slotted children (a hard technical limit for streaming HTML). Components that alter their template based on slotted content need `ssr-hint-has-slotted` and `ssr-hint-has-slotted-default` attributes on the host so the server render matches the client render.

```html
<pf-card ssr-hint-has-slotted-default
         ssr-hint-has-slotted="header,footer">
  <h2 slot="header">Header</h2>
  <p>Default slot content</p>
  <pf-button slot="footer">Footer</pf-button>
</pf-card>
```

Automations (e.g., 11ty transforms) should inject these attributes server-side by parsing the HTML and detecting slotted children. Incorrect or missing hints will break the element via hydration mismatch.

> RHDS PR #2336; PFE PR #2893; RHDS issue #1858

### Use separate server/client SSR controllers
The SSR controller pattern splits behavior into three files:

1. **Base controller** (`ssr-controller.ts`): Minimal abstract class extending `ReactiveController` with an optional `ssrSetup(renderInfo)` async method
2. **Server controller** (`*-ssr-controller-server.ts`): Performs async work in `ssrSetup()` — reads files, highlights code, parses HTML, injects SSR hint attributes. Uses Node.js APIs (`fs`, `path`, `parse5`)
3. **Client controller** (`*-ssr-controller-client.ts`): Initializes properties to `noChange` to preserve SSR output during hydration. Extracts content from the SSR-rendered shadow DOM synchronously before the first update

The entrypoint uses `isServer` + top-level `await` to conditionally import the right implementation:

```ts
import { isServer } from 'lit';
export const MySSRController =
  isServer ? await import('./my-ssr-server.js').then(m => m.MySSRControllerServer)
           : await import('./my-ssr-client.js').then(m => m.MySSRControllerClient);
```

> RHDS `lib/ssr-controller.ts`, `uxdot/uxdot-pattern-ssr-controller*.ts`

### Client SSR controller: use `noChange` for hydration-safe defaults
Client-side SSR controllers should initialize template-bound properties to Lit's `noChange` sentinel, not `undefined` or empty strings. This tells Lit to preserve the SSR-rendered DOM rather than overwriting it. Extract actual values from the SSR-rendered shadow DOM synchronously in `hostConnected` (before the first update).

```ts
import { noChange } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export class MySSRControllerClient extends RHDSSSRController {
  content: ReturnType<typeof unsafeHTML> | typeof noChange = noChange;

  async hostConnected() {
    this.#extractSSRContent(); // synchronous, before first update
    await this.host.updateComplete;
    this.host.requestUpdate();
  }
}
```

> RHDS `uxdot/uxdot-pattern-ssr-controller-client.ts`

### Strip Lit SSR hydration comment markers when extracting content
When extracting content from SSR-rendered shadow DOM on the client, strip Lit's hydration comment markers (`<!--lit-...-->`) to get clean HTML for `unsafeHTML()`.

```ts
const content = surface.innerHTML.replace(/<!--\/?lit-[^>]*-->/g, '').trim();
```

> RHDS `uxdot/uxdot-pattern-ssr-controller-client.ts`

### Handle hydration failures gracefully
Hydration errors are common and hard to prevent entirely. Consider a recovery pattern: catch `Hydration` errors in `update()`, force-render the component, and force-hydrate child elements by removing `defer-hydration` attributes and requesting updates.

> RHDS `uxdot/ssr-failure-recoverable.ts`

### Use scalar Lit context values, not complex objects
When sharing state via Lit context during SSR, use multiple contexts each carrying a single scalar value (string, boolean) rather than a single context with a complex object. Object references as context values cause strange effects during SSR.

> RHDS wiki SSR page

### Include base theme styles in the SSR response
CSS `var()` calls with fallbacks mitigate most FOUC, but base theme styles must be present in the document. Coordinate with SSR consumers to include the base theme stylesheet.

> RHDS wiki SSR page

### Load SSR modules serially
During the SSR routine, load component modules serially rather than in parallel. Don't swallow errors — surface them immediately to identify which component is causing SSR failures.

> RHDS commit `docs(ssr): load modules serially, don't swallow errors` (PR #2294)

### Minify collected CSS in the SSR payload
Lit collects `static styles` and includes them in the SSR response. Adding a CSS minification step during SSR reduces payload size.

> RHDS wiki SSR page

### SSR and the live `attributes` collection
When iterating over `this.attributes` to remove hydration-related attributes, spread into an array first. The `attributes` NamedNodeMap is live — removing attributes while iterating by index causes items to be skipped.

```ts
// WRONG: live collection mutation
for (let i = 0; i < this.attributes.length; i++) { ... }

// CORRECT: snapshot first
const attributes = [...this.attributes];
for (const attr of attributes) { ... }
```

> RHDS issue #2653 (hydration causing accessibility issues)

## RHDS-Specific Conventions

The following conventions are specific to the Red Hat Design System (RHDS) project.

### Naming

#### Element names use the `rh-` prefix
Element names follow `rh-{category}-{modifier}` (e.g., `rh-navigation-secondary`, `rh-footer-universal`). The main noun comes first, with qualifiers after.

> RHDS PRs #746, #786

#### `color-palette` for theming
RHDS uses the attribute name `color-palette` to separate theme from variant. This is the RHDS-specific application of the general principle [Distinguish `variant` from theme attributes](#distinguish-variant-from-theme-attributes).

> RHDS PR #288, #486

#### `accessible-label` for screen-reader names
The RHDS convention is `accessible-label` (not `label`) for attributes that set an accessible name, e.g., `<rh-icon accessible-label='Arrow right'>`. This is the RHDS-specific application of the general principle [Abstract ARIA behind custom attributes](#abstract-aria-behind-custom-attributes).

> RHDS PR #1732

#### CSS custom property naming convention
Public: `--rh-{component}-{property}`. Private/internal: `--_` prefix. Use logical property directions in names.

> Recurring across RHDS PRs #553, #952, #1330, #2449

### Token System

#### System tokens vs component tokens
System-level tokens (`--rh-color-*`, `--rh-space-*`) come from the RHDS design token package and are used as-is. Component-level custom properties (`--rh-card-background-color`) need full `@cssprop` documentation.

> "we don't have an existing token `--rh-background-color`. perhaps you meant `--rh-card-background-color`?" (RHDS PR #952)

#### Token fallback rules
Theming tokens (colors) computed in `default-theme.css` don't need CSS fallbacks. Other tokens (spacing, fonts, lengths) always need fallback values in component CSS for resilience.

> "general rule: theming tokens like --rh-color-text-primary *don't* need fallbacks... Other tokens like spacing, fonts, etc *do* need fallbacks" (RHDS PR #2448)

#### T-shirt sizes map to RHDS tokens
XL, LG, etc. must map to established RHDS length tokens. This is the RHDS-specific application of the general principle [T-shirt sizes must map to established token values](#t-shirt-sizes-must-map-to-established-token-values).

> RHDS PR #2430

### Architecture

#### Color context provider/consumer system
RHDS uses a context-based color provider/consumer system for theming. The `on` attribute is shadow-private and should not be exposed as a public attribute.

> RHDS PRs #660, #661, #675, #817, #1245, #1298

#### Use `@deprecated` decorator from pfe-core
Use the framework-level `@deprecated` decorator from pfe-core to standardize deprecation behavior across all elements.

> `@deprecated({ reflect: true, attribute: 'theme' }) theme?: 'base' | null = null;` (RHDS PR #1347)

#### Re-export entrypoint modules
RHDS prefers re-export entrypoint modules over pre-built bundles to preserve tree-shaking.

> RHDS PR #1630

### Process

#### Changeset format
User-facing release note quality. Format: `` `<element-tag>`: brief description of what changed ``

> Recurring across RHDS PRs #1041, #1134, #1345, #1376, #1411

#### No changesets needed for unreleased elements
Changesets are only needed for changes to already-released components.

> "So long as we haven't released yet, we don't need changesets for fixes." (RHDS PR #1094)

#### CSS changes use `fix:`, not `style:`
In conventional commits, `style:` means code formatting/linting, not visual/CSS changes.

> "Nit: `style` commit type is actually for _code style_ i.e. refactorings, lintings, things like that. CSS changes should have `fix:` commit type." (RHDS PR #330)

#### Recruit future users to review docs
Documentation should be reviewed by people who will actually use the component, such as developers from Studio Dev, Systems Fed, etc.

> "Please recruit developers from studio dev and systems fed, etc (i.e. future users of rh-table) to make sure the docs are clear to them" (RHDS PR #1197)

## PFE-Specific Conventions

The following conventions are specific to the PatternFly Elements (PFE) project.

### Adhere to upstream API unless there's a DOM-specific reason to diverge
PFE elements must match the upstream PatternFly React component's public API unless there's a good HTML/DOM-specific reason to modify it.

> "Unless there is a good reason to modify one of the react component's public APIs (e.g. to make it more appropriate for HTML/DOM usage), `pf-alert` must adhere to the public API of the react component." (PFE PR #2951)

### Not beholden to upstream names, only end-user features
PFE is not beholden to PatternFly React's API surface and names, only to their user-facing features. Design as if working from design mockups alone.

> "We are not beholden to pf-react's api surface and names, but only to their user-facing features. In other words, if we had received the design mockups only, and there had never been a react implementation, how would we have factored it?" (PFE PR #2570)

### Private CSS properties are fine in base styles
Base element styles can use private CSS custom properties (`--_`), but design-system-specific variables (PatternFly tokens) belong in subclass stylesheets.

> "What's important in Base* styles isn't that they don't have variables, but that they don't have patternfly-specific variables." (PFE PR #2222)

### Use `expanded` over `open` for collapsible semantics
For accordion-like collapsible elements, PFE uses `expanded` as the conventional attribute name.

> "I agree with you, `expanded` is more conventional." (PFE PR #1849)

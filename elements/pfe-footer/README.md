# PFElements Footer Element

`pfe-footer` is our standard Red Hat branded web applications footer.

## Usage

### Minimal Footer Bar

```
<pfe-footer role="contentinfo">
  <section slot="pfe-footer-legal">
    <small>Copyright &copy;2019 Red Hat, Inc.</small>
    <ul>
      <li><a href="#">Privacy statement</a></li>
      <li><a href="#">Terms of Use</a></li>
      <li><a href="#">All policies and guidelines</a></li>
    </ul>
  </section>
</pfe-footer>
```

### Full Footer

```
<pfe-footer role="contentinfo">
  <section slot="pfe-footer-info">
    <h2>About</h2>
    <p>...</p>
    <ul>
      <li><a href="#">Company Information</a></li>
      <li><a href="#">Locations</a></li>
      <li><a href="#">Jobs</a></li>
    </ul>
    <ul pfe-social-links>
      <li><a href="#"><pfe-icon icon="web-linkedin" title="LinkedIn" aria-label="LinkedIn">LinkedIn</pfe-icon></a></li>
      <li><a href="#"><pfe-icon icon="web-youtube" title="YouTube" aria-label="YouTube">YouTube</pfe-icon></a></li>
      <li><a href="#"><pfe-icon icon="web-facebook" title="Facebook" aria-label="Facebook">Facebook</pfe-icon></a></li>
      <li><a href="#"><pfe-icon icon="web-twitter" title="Twitter" aria-label="Twitter">Twitter</pfe-icon></a></li>
    </ul>
  </section>
  <div pfe-footer-links>
    <section>
      <h2>Featured</h2>
      <ul>
        <li><a href="#">Red Hat Enterprise Linux</a></li>
        <li><a href="#">Red Hat Gluster Storage</a></li>
        <li><a href="#">Red Hat Satellite</a></li>
      </ul>
    </section>
    ...
    <!-- Add up to 4 total "sections" -->
  </div>
  <section slot="pfe-footer-legal">
    <small>Copyright &copy;2019 Red Hat, Inc.</small>
    <ul>
      <li><a href="#">Privacy statement</a></li>
      <li><a href="#">Terms of Use</a></li>
      <li><a href="#">All policies and guidelines</a></li>
    </ul>
  </section>
</pfe-footer>
```

## Attributes & Styling

### pfe-variant

Changes the color of the info block

| Value             | Description            |
| ----------------- | ---------------------- |
| *default*         | Red                    |
| `gray`            | Medium gray background |

#### Example

```
<pfe-footer role="contentinfo" pfe-variant="gray">
  ...
</pfe-footer>
```

### pfe-layout

Changes alignment of the footer

| Value             | Description                 |
| ----------------- | --------------------------- |
| *default*         | Centered                    |
| `left-aligned`    | Left aligned and 100% width |

#### Example

```
<pfe-footer role="contentinfo" pfe-layout="left-aligned">
  ...
</pfe-footer>
```

## Test

    npm run test

## Build

    npm run build

## Demo

Run `npm start` and Polyserve will start a server and open your default browser to the demo page of the element.

## Code style

Footer (and all PatternFly Elements) use [Prettier][prettier] to auto-format JS and JSON.  The style rules get applied when you commit a change.  If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[polyserve]: https://github.com/Polymer/polyserve
[web-component-tester]: https://github.com/Polymer/web-component-tester

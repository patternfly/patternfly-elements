# TBD
- [](https://github.com/patternfly/patternfly-elements/commit/) chore: remove Storybook links for homepage and footer include

# 1.12.2 (2021-11-16)
- [a6cf64](https://github.com/patternfly/patternfly-elements/commit/a6cf64f2680780cd1d50ed302f677dbd5024cf85) fix: fixing broken 1.12.1 release.

# 1.12.1 (2021-11-16)
- [bf2088](https://github.com/patternfly/patternfly-elements/commit/bf2088ad92a455ca36b9f12141e273abb360e4a3) fix: added border-box to panel to fix border offset

# 1.12.0 (2021-11-12)
- [b15c47](https://github.com/patternfly/patternfly-elements/commit/b15c476edcb803a1b972e91e048d5b897b64cc91) feat: Update pfe-clipboard so it can copy arbitrary content, and updated tests to new framework
- [f33ba4](https://github.com/patternfly/patternfly-elements/commit/f33ba4a9118454ec939a173f90ba0e0a5f1c96cd) feat: adds custom event for clear search event, adds an aria label for search button (when applicable), and resolves dupe "x" with input[type="search"]

# 1.11.2 (2021-09-29)

- [ac2af8](https://github.com/patternfly/patternfly-elements/commit/ac2af8367c911af5b7cb3953eff470106c48b93b) fix: mobile-typography demo page now has correct CSS variables
- [eee071](https://github.com/patternfly/patternfly-elements/commit/eee07120723168a8aa36b5fec80215d12cb6ecea) fix: added px value defaults for accent-bar mixin

# 1.11.1 (2021-09-03)

- [5393d18](https://github.com/patternfly/patternfly-elements/commit/5393d185fec3b62e78037a9835470fc15adae2b3) fix: Pfe-Primary-Detail - Fixing animation jank when expanding a section in compact mode
- [b691da0](https://github.com/patternfly/patternfly-elements/commit/b691da07c4f3e150337698044369e64b9d2ad849) docs: Adjust example code block for typography classes
- [974ab6f](https://github.com/patternfly/patternfly-elements/commit/974ab6f1ab4047d4e94007d64a31e5a0cddf9b7a) fix: typos in package.json files
- [b18dd64](https://github.com/patternfly/patternfly-elements/commit/b18dd64da950b580b526ebe092b59eaadaf7d07e) fix: fix for re-renders when there is no selectedindex
- [f727065](https://github.com/patternfly/patternfly-elements/commit/f72706530754d9ea27779796d87e227edd0c238e) fix: added resize observer for lining up progress bar
- [2c4b6e4](https://github.com/patternfly/patternfly-elements/commit/2c4b6e442fbc75e02554cb25579754b76986d728) fix: Pfe-Primary-Detail - Fixed issues from Safari, IE11, and the escape key didn't work as expected in compact layout

# 1.11.0 (2021-08-18)

- [489c561](https://github.com/patternfly/patternfly-elements/commit/489c561fd825bd7f84ebd3c1addbdeac28304a0e) feat: Pfe-Primary-Detail - Added much improved a11y and keyboard navigation, added mobile optimized layout behavior, and added thorough tests using new framework.
- [f378caa](https://github.com/patternfly/patternfly-elements/commit/f378caab97b4a2cbf39b9cfad10900bdcf290dde) fix: pfe-autocomplete update aria-selected attribute
- [d3ea7fa](https://github.com/patternfly/patternfly-elements/commit/d3ea7facb0c36b7f3e20e2568bdc4bf2e5a5a852) feat: Graceful failure for component registry
- [099dc3e](https://github.com/patternfly/patternfly-elements/commit/099dc3e2d3ce732a32ecde0644f5c03ec1e8dd9c) fix: Accordion alignment with latest design kit
- [5f88c39](https://github.com/patternfly/patternfly-elements/commit/5f88c3963f8a6c13a9aeba6e9f664678453d46ce) fix: Jump links parseInt for IE11
- [43a904e](https://github.com/patternfly/patternfly-elements/commit/43a904e2ce4f2ef7182f803bf35ade463e7c2f1d) fix: container sass placeholder using incorrect variable for spacing (#1522)
- [3d3c4f1](https://github.com/patternfly/patternfly-elements/commit/3d3c4f109a7e09adae3f3f01122846354a278787) fix: accordion rendering slotted content in the header
- [519d16a](https://github.com/patternfly/patternfly-elements/commit/519d16af4c714efdc5246f9c0925ca30447b87ea) feat: vertically center pfe-tab content
- [877a1ed](https://github.com/patternfly/patternfly-elements/commit/877a1ed5c6a02cdc5899f8e73007572e831b18a0) feat: modal width attribute
- [3765170](https://github.com/patternfly/patternfly-elements/commit/376517064f3f12a4cc97cb7bcd8f7dd7b375a30c) feat: add color vars to pfe-progress-indicator for styling
- [3c1fc43](https://github.com/patternfly/patternfly-elements/commit/3c1fc435276e36c3fcc41c26711d37a69e74a73a) feat: pfe-button | Add large variant


# 1.10.1 (2021-07-12)

- [b717636](https://github.com/patternfly/patternfly-elements/commit/b717636782ebce33b4549ba9f68ffff09c036889) fix: pfelement - only resetContext on a nested child element during contextUpdate if resetContext is available on the child
- [7f9c30e](https://github.com/patternfly/patternfly-elements/commit/7f9c30e0a312e538b1787a91824c6e84d1aa261a) fix: pfe-tabs issue with active border color on horizontal/wind (#1585)
- [56ad59d](https://github.com/patternfly/patternfly-elements/commit/56ad59d551f3362348e0cd5b061ec43c5b98d02b) fix: on mutation, apply cascade to new elements only

# 1.10.0 (2021-07-08)

- [c9c3b56](https://github.com/patternfly/patternfly-elements/commit/c9c3b5654ac05875eabfce0727c54af183e4ac09) chore: Minor testing updates
- [af4bc70](https://github.com/patternfly/patternfly-elements/commit/af4bc7063b995c316320f6df706b744133f1753d) feat: Jump links navigation rework to support panel customizations and elements in separate DOMs; horizontal designs aligned to kit


# 1.9.3 (2021-06-16)

- [b7fc80d](https://github.com/patternfly/patternfly-elements/commit/b7fc80d3417eb14be519c6e37895fcff639d1bbd) fix: set margin-top for ctas in footer on mobile

# 1.9.2 (2021-06-01)

- [225484b](https://github.com/patternfly/patternfly-elements/commit/225484bfcd166f46b515b2500f2f8710fd227e35) fix: pfe-content-set, bring back ID copy from parent to nested item

# 1.9.1 (2021-05-27)

- [21bee7a](https://github.com/patternfly/patternfly-elements/commit/21bee7afb03d9736870ec597f4b29ceb18862276) fix: pfe-content-set, Safari 14.1.1 / WebKitGTK 2.32.0 bug fix (IE11 update: only renders as accordion)

# 1.9.0 (2021-05-26)

- [cb12965](https://github.com/patternfly/patternfly-elements/commit/cb12965db958aaded5baf5ba8867532346d63f03) feat: pfe-progress-steps (new) (#1436)
- [9411f1f](https://github.com/patternfly/patternfly-elements/commit/9411f1f7e614be43e50105540262cd1992bca50f) feat: [pfe-styles] ordered list primary styles
- [b89bd6b](https://github.com/patternfly/patternfly-elements/commit/b89bd6b34dc5bd42c61dd1670bf273587b650268) feat: persist debugLog in localStorage

# 1.8.0 (2021-05-18)

- [267ff8e](https://github.com/patternfly/patternfly-elements/commit/267ff8ee7df7cd0512f16c58fdb169f941bfa4cd) feat: Update fetch mixin to support region input (#1328)
- [f1c1176](https://github.com/patternfly/patternfly-elements/commit/f1c1176d9278d6e5b8066b42fc040ea01d98ecb2) feat: pfe-icon now supports setting default icon sets
- [56eb55e](https://github.com/patternfly/patternfly-elements/commit/56eb55ec8b4b62aee7d36950d158229cbf50ddef) fix: pfe-accordion IE11 regression; background context should always be white with black text
- [398003e](https://github.com/patternfly/patternfly-elements/commit/398003e3d805567af826d924bfd5e2e9655425a4) fix: [pfe-icon] Update icon color vs. background color custom property support
- [63df897](https://github.com/patternfly/patternfly-elements/commit/63df897d5235a2af15733b52a1c0f4d8304dcb96) fix: Add in missing polyfills for pfelement

# 1.7.0 (2021-05-10)

- [351e33d](https://github.com/patternfly/patternfly-elements/commit/351e33dfd8f34963954275004e464ff4c561c01e) feat: Accordion direct link / expand on load (#859)
- [b57c5b0](https://github.com/patternfly/patternfly-elements/commit/b57c5b013acef370ba962b7796a870c37802a33f) feat: Adds Web Test Runner which will eventually replace Web Component Tester
- [20cb906](https://github.com/patternfly/patternfly-elements/commit/20cb906b5bf3d9340097170d6be7bdacbb4b12a5) fix: Updating PFElement.log (aka this.log) so it logs arrays and objects, instead of converting them to strings

# 1.6.0 (2021-04-23)

- [0a549f8](https://github.com/patternfly/patternfly-elements/commit/0a549f8c54037e01006063800e729d633b515f66) feat: JSDoc preview added for PFElement
- [65983e6](https://github.com/patternfly/patternfly-elements/commit/65983e60d5394116d3dce6870b77f72772fa09c0) fix: pfe-primary-detail IE11 rendering fix
- [38290ea](https://github.com/patternfly/patternfly-elements/commit/38290ea822a3c78873184bc4018132aa2fce02c2) fix: Context initialization cascading from parent to child (#1438)

# 1.5.1 (2021-04-15)

- [48b3c30](https://github.com/patternfly/patternfly-elements/commit/48b3c305367d41fefbb1b01fb3d9189bf96a85f5) fix: adjust word-count calculation on pfe-readtime

# 1.5.0 (2021-04-14)

- [a1e4b67](https://github.com/patternfly/patternfly-elements/commit/a1e4b67ac012f5987e6cddf2cc7b532a135fa989) feat: Add CSS variable support for typography & background colors on tabs
- [84cb0b1](https://github.com/patternfly/patternfly-elements/commit/84cb0b1ea257a33dc28954367e82771bb3e17a52) fix: Updated CSS to allow CSS custom properties to override dynamically calculated theme context
- [bdc14f7](https://github.com/patternfly/patternfly-elements/commit/bdc14f7c5e0d1fa0bf23ec3911b7f0b745a310ea) feat: Add a new readtime component to display estimated time to read content

# 1.4.0 (2021-03-30)

- [76c2c36](https://github.com/patternfly/patternfly-elements/commit/76c2c3689a9a338b278d99f6e2d3cbeef4f3cc3d) feat: Add performance marks to PFElement for more accurate reporting on performance
- [5a8c9ee](https://github.com/patternfly/patternfly-elements/commit/5a8c9ee1b66241e20c560b5cd4abf43e1568263a) fix: pfe-content-set bring back template to inject style tag for alignment settings

# 1.3.4 (2021-03-29)

- [5304f20](https://github.com/patternfly/patternfly-elements/commit/5304f20638db60a7c48028a39b49dfbc42f7acc7) fix: pfe-tabs padding
- [e292289](https://github.com/patternfly/patternfly-elements/commit/e2922898ed4dbb96924a1dc3c8f8cd3a3e4d76fa) fix: reduce padding on the pfe jump link
- [404d8e2](https://github.com/patternfly/patternfly-elements/commit/404d8e264a62052afafe815cbc35bdf81f12a897) fix: Content set bug erroring on dynamic content

# 1.3.3 (2021-03-18)

- [06257ba](https://github.com/patternfly/patternfly-elements/commit/06257ba7edc3ca70ddfd0dd6c71e600540ac692b) fix: pfe-accordion accessibility issues
- [c90f649](https://github.com/patternfly/patternfly-elements/commit/c90f6498945292fc8910e80433b8996fc2540be6) fix: pfe-codeblock - update theme colours for accessibility
- [4c602ff](https://github.com/patternfly/patternfly-elements/commit/4c602ffbdeefb4f3958af7cc9ff5a8b92349130c) fix: pfe-sass typography mixin; update arguement support for $type

# 1.3.2 (2021-03-04)

- [d99e9f1](https://github.com/patternfly/patternfly-elements/commit/d99e9f18ae95617332856f00a9d9241bb505479c) fix: Content set hold rendering until upgrade, prefixed attribute support for overflow property in cards

# 1.3.1 (2021-03-03)

- [eaf0e25](https://github.com/patternfly/patternfly-elements/commit/eaf0e256a525833e4cb3a36a51cf78c73c44867d) fix: Content set bug with cascading attributes in UMD assets

# 1.3.0 (2021-02-18)

### Features
- [e7c0f3a](https://github.com/patternfly/patternfly-elements/commit/e7c0f3a45648f26c87bc3447f7c6a47c8c00c1a0) feat: adding a $custom-prop-prefix variable to relieve naming conflict risk ($repo is too generic).

### Fixes
- [51bee47](https://github.com/patternfly/patternfly-elements/commit/51bee47d7ef6515b59b2e49b424985088248b4d5) fix: pfe-content-set requires light DOM styles in panels
- [b7fd31e](https://github.com/patternfly/patternfly-elements/commit/b7fd31ed52b99651d117f471d3c48c1400128659) fix: update sizing on pfe-cta component which was too small

## 1.2.0 ( 2021-02-12 )

### Features
- [89ddfd](https://github.com/patternfly/patternfly-elements/commit/89ddfdc00382e46946309f02719a5faa1190248f) feat: Add Sassdoc and update build tasks to include link
- [4b8326e](https://github.com/patternfly/patternfly-elements/commit/4b8326efea7bd9d45ee0f195ed08ad52b6cdb904) feat: Add typography classes & match PatternFly core variables
- [84365f4](https://github.com/patternfly/patternfly-elements/commit/84365f44e380256cd5287a59c06d9baf9bc32328) feat: Add pfe-clipboard element (#803, #810)
- [9fab144](https://github.com/patternfly/patternfly-elements/commit/9fab1440da7bc26e3dd5f92224f03e964ea9eda2) feat: pfe-primary-detail
- [57b5dd2](https://github.com/patternfly/patternfly-elements/commit/57b5dd2adf1c0fd0e00a6c9112d3ad5fb66a5a11) feat: Update Firefox support to 78 (latest version for RHEL CSB)
- [28439ea](https://github.com/patternfly/patternfly-elements/commit/28439eadb22c34edbbed177233b0eeb2ef77024b) feat: pfe-codeblock (#804)

### Fixes
- [03899cc](https://github.com/patternfly/patternfly-elements/commit/03899ccf7a4421186a7316926955b3a3bd1068f7) fix: Typography: mixins & extends (#1303)
- [5d661cb](https://github.com/patternfly/patternfly-elements/commit/5d661cb7e85921ed72f324a0b635873c23bc69e9) fix: pfe-clipboard docs; add font-size
- [30c77d0](https://github.com/patternfly/patternfly-elements/commit/30c77d0225d235b68367097e8e462621266cab7b) fix: Adjust font-weight on pfe text modifier classes & define custom font-face for Red Hat Text font
- [304ba26](https://github.com/patternfly/patternfly-elements/commit/304ba260891ab4be39a4019e75442a8429563e62) fix: Navigation mobile styles

## 1.1.1 ( 2021-01-18 )

### Fixes
- [f876664](https://github.com/patternfly/patternfly-elements/commit/f876664655894cbd29d610c20b3bdbde31aaed7a) fix: Sass maps missing from compiled assets
- [e3fd841](https://github.com/patternfly/patternfly-elements/commit/e3fd8414cf380a45a89f4166ad2f9d9125cf8760) fix: Storybook updates required change to knobs add-on import
- [7cbd6fb](https://github.com/patternfly/patternfly-elements/commit/7cbd6fb4f879986dcf3677947ae29fe49268884f) fix: Remove deprecated method call in pfe-modal, _mapSchemaToSlots
- [1918511](https://github.com/patternfly/patternfly-elements/commit/191851136da3e9eec65c248dfd00ed04eb275eb0) fix: Tabset should default to 0 if selectedIndex is set to null

## 1.1.0 ( 2020-12-22 )

### Feature
- [20bd14d](https://github.com/patternfly/patternfly-elements/commit/20bd14da07620bdaabbf8ae8e8bb348275db885d) feat: add button variant to pfe-autocomplete (#1108)

### Fixes
- [9671513](https://github.com/patternfly/patternfly-elements/commit/9671513c9981e849a2912b8b0332b6bdcaf5d565) fix: Jump Links fallback alias' added for old property names; additional checks on scroll (#1224)
- [07d1466](https://github.com/patternfly/patternfly-elements/commit/07d14667a0ed521edda8ad5d5fcc7067645c746d) fix: Accordion assigned to content set panel was always being set to hidden
- [5e14a7f](https://github.com/patternfly/patternfly-elements/commit/5e14a7f503e40148d1ec5c9759eb57df9ed45d30) fix: updating pfe-button dependency to point at pfelement 1.0.0 (#1229)
- [6bc79a0](https://github.com/patternfly/patternfly-elements/commit/6bc79a0c2624ba17d5d0bcec1b03dae8654ca5e4) fix: Add patch for build (#1219)

## 1.0.0 ( 2020-12-02 )

### Features
- [e86f33e](https://github.com/patternfly/patternfly-elements/commit/e86f33e0342933f1992d52a022f9a25fd1e2fbeb) feat: Add standard attribute/property definitions
- [4cda080](https://github.com/patternfly/patternfly-elements/commit/4cda080dfc6f3b8e500712ddbe01fada3ce16e3e) feat: Launch specific component demo page when specified on `npm run start`; add start to dev command
- [0354352](https://github.com/patternfly/patternfly-elements/commit/03543523064f4a885b44bd334b0e24a77f00aee9) feat: Open a pull request from the command-line
- [7559485](https://github.com/patternfly/patternfly-elements/commit/755948553015d8745f8faad8b7a299031ec6fff3) feat: Migrate from Travis to GitHub Actions
- [51d055a](https://github.com/patternfly/patternfly-elements/commit/51d055ae15b3570c6d902c60d45163a0154e1011) feat: Add automerge action for pull requests when their base PR is updated

### Fixes
- [24f1057](https://github.com/patternfly/patternfly-elements/commit/24f105789ffb01541e7892f59df0352272bab2a1) fix: updated pfe-autocomplete slotted input to use correct font (#1151)
- [9501ebb](https://github.com/patternfly/patternfly-elements/commit/9501ebb87cfc371563c04ba155a101846fe26e20) fix: Update baseline snapshots to cover full page (#1172)
- [f5443c5](https://github.com/patternfly/patternfly-elements/commit/f5443c58a543368ca58bb98498452af6e4fd88bc) fix: Add a build step to the release script (#1062)
- [b32b41c](https://github.com/patternfly/patternfly-elements/commit/b32b41c2071eb59c5fc17b6c233783cacea59b92) fix: pfe-accordion adding right border and shadow back (#1184)
- [47a1f4f](https://github.com/patternfly/patternfly-elements/commit/47a1f4fe9365f9366974fe67a30b48cc91e4e6a8) fix: unwanted padding on pfe-accordion (#1083)
- [e3cc73b](https://github.com/patternfly/patternfly-elements/commit/e3cc73b92d06cdf7fef8dc091733a046a14e12e5) fix: pfe-tabs vertical display on mobile (#1135)
- [6eadb21](https://github.com/patternfly/patternfly-elements/commit/6eadb21a29768c06ff312de42bd54b44072ee051) fix: umd.min modules now import umd.min builds of PFE dependencies (#1168)
- [40e0b09](https://github.com/patternfly/patternfly-elements/commit/40e0b099e77943feee4e8ba1a34d25b01ddf86ff) fix: global theme palette color for visited links in a saturated context
- [117a0e7](https://github.com/patternfly/patternfly-elements/commit/117a0e7e407ea1244cc861b251391f61a8b143ef) fix: Variable references to theme vs. context
- [a02d6e5](https://github.com/patternfly/patternfly-elements/commit/a02d6e57f9e444b28cde9676d70c0e16a5dca4d9) fix: ie11 pfe-cta link text and padding issues
- [f50368b](https://github.com/patternfly/patternfly-elements/commit/f50368b0bbb1141dc805ef2ceb4f86203e90ceff) fix: Storybook bug fixes; jump links updates
- [f4880d6](https://github.com/patternfly/patternfly-elements/commit/f4880d64ce48b1f503a14bbc1c7c17c0a674142e) fix: Reduce unnecessary interpolation and function calls (#1042)

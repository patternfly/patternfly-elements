# 1.12.3 (2022-02-01)
- [0677854](https://github.com/patternfly/patternfly-elements/commit/0677854cca0c76f66a43ac39de7b3a7be7060a95) chore: remove Storybook links for homepage and footer include
- [a62101e](https://github.com/patternfly/patternfly-elements/commit/) fix: pfe-accordion - fixing issues with accessibility when opening and closing panels (#1813) (#1856)

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
## Prerelease 56 ( 2020-08-26 )

- [2462e69](https://github.com/patternfly/patternfly-elements/commit/2462e6928f98dc08d53d97a95d25531f7b7976de) fix: pfe-tab design tweaks & support for local vars in non-light contexts (#1021)
- [4520a30](https://github.com/patternfly/patternfly-elements/commit/4520a30c72f46d0f211497d3356cf630a4ed60a5) fix: issue in new automerge scripts (#1056)
- [7aad6b4](https://github.com/patternfly/patternfly-elements/commit/7aad6b463920cad87de2697ee5fdf99b46eb628e) feat: Remove build from postinstall
- [06a9b94](https://github.com/patternfly/patternfly-elements/commit/06a9b94505d1471d899f1db9704727c5a249a489) test: disabling visual regression testing in favor of manual running
- [a56f268](https://github.com/patternfly/patternfly-elements/commit/a56f2689df73022bd1b1711270cd7755d0f6be19) feat: pfe-button component (#837)
- [918e067](https://github.com/patternfly/patternfly-elements/commit/918e06717666b971db8b4064120d76e057b108d5) test: visual regression testing (#885)
- [c9e3ae4](https://github.com/patternfly/patternfly-elements/commit/c9e3ae4a505ac4a3524731f693149b4f15e3bb8e) test: framework testing (#1011)

## Prerelease 55 ( 2020-08-19 )

- [3ee117e](https://github.com/patternfly/patternfly-elements/commit/3ee117e8a3df17f50738b9c0fa0caa3a9af9c679) feat: pfe-autocomplete - fire custom event when dropdown is shown (#1046)
- [51e988c](https://github.com/patternfly/patternfly-elements/commit/51e988c3e645ff1d3018bc43f24cfaa6be3b5bb2) fix: pfelement - restore pfelement tests (#1018)
- [fbe4423](https://github.com/patternfly/patternfly-elements/commit/fbe442396f06b0a097366512b698dc0b6d5e1f9f) fix: improve CLS rating in lighthouse (#1020)

## Prerelease 54 ( 2020-07-31 )

- [6ef7f74](https://github.com/patternfly/patternfly-elements/commit/6ef7f74bfe22b259373f3485a46b21f37aa7196e) fix: pfe-accordion border styles (#1002)
- [572ea91](https://github.com/patternfly/patternfly-elements/commit/572ea9133373ab91e99c2fc6e67aa6fb1a0d1ed0) feat: UI colors should match PF core (#895)
- [516d9e8](https://github.com/patternfly/patternfly-elements/commit/516d9e8144b381b0f5c563e2bc2473e9654bc18b) feat: pfe-tab style updates (#814)

## Prerelease 53 ( 2020-07-21 )

- [743913e](https://github.com/patternfly/patternfly-elements/commit/743913e0620ee0ca6f0cdf95cc1ed2597b5fe6e3) fix: pfe-autocomplete prevent search-event from firing twice on option select (#989)
- [f20b509](https://github.com/patternfly/patternfly-elements/commit/f20b5094b6eb02ed473b0e3dab2ea5280e56bda7) fix: pfe-autocomplete add composed flag to option-selected event (#988)
- [0ffd92a](https://github.com/patternfly/patternfly-elements/commit/0ffd92a621d1082b118b84a07063bd39b9c8a904) fix: Move pfe-sass to a dev dependency (#983)
- [a7240fd](https://github.com/patternfly/patternfly-elements/commit/a7240fdce2ec748863c41e8762d36cf29826f902) fix: pfe-health-index color support in IE11 (#993)
- [a5f0a4a](https://github.com/patternfly/patternfly-elements/commit/a5f0a4ab203998c2e3c2568a1a7cb5d1efb3c16f) fix: pfe-cta: fix disabled rendering in IE11 (#994)

## Prerelease 52 ( 2020-07-17 )

- [e5c6f4b](https://github.com/patternfly/patternfly-elements/commit/e5c6f4bc0f5ef3283c115ecbcc7c31456ea39872) fix: fire pfe-autcomplete:option-selected event on click and enter key
- [fbbc35c](https://github.com/patternfly/patternfly-elements/commit/fbbc35c1ccb395015cc35459ae0b4643c5217ac2) feat: Add support for empty local variables

## Prerelease 51 ( 2020-07-16 )

- [6965df](https://github.com/patternfly/patternfly-elements/commit/6965df7214f1cda636337093e0bf22bfc658403d) fix: Support nested tabs or accordions inside pfe-content-set
- [49c6146](https://github.com/patternfly/patternfly-elements/commit/49c6146fbaed4cf6ca8d198e107471b53fe07796) feat: Add generator label to new PRs where appropriate, add .github folder to tools

## Prerelease 50 ( 2020-06-26 )

- [3eecba0](https://github.com/patternfly/patternfly-elements/commit/3eecba06102bd3a92cdcd61780aafebb27175a95) fix: fixed offset to work more reliably and added some docs (#908)
- [003f4dd](https://github.com/patternfly/patternfly-elements/commit/003f4dd4620d02d2ea3f5c04a43bda32f50963a7) fix capitalization of labels & column name in Github actions (#944)
- [732f65a](https://github.com/patternfly/patternfly-elements/commit/732f65ada3383f6d04deb6670d82eb80d525d8ff) fix: pfe-modal removing hidden attribute (#924)
- [cf010c1](https://github.com/patternfly/patternfly-elements/commit/cf010c18c404e07d59eab775ee44552f52627bde) feat: Automerging PRs based on labels (#920)
- [b3f1e46](https://github.com/patternfly/patternfly-elements/commit/b3f1e46fe401be3f09f361fcc3b284a87de3728e) fix: pfe-dropdown: remove preventDefault call on clicks outside of dropdown (#915)
- [775b821](https://github.com/patternfly/patternfly-elements/commit/775b821702c903f926b8bf9fdf9c948ac949335f) feat: Add automatic labeling to PRs (#909)
- [82bf8e6](https://github.com/patternfly/patternfly-elements/commit/82bf8e6a0d407a651571dac1e37d06a2b14fa3d4) feat: Move PR cards automatically in the Project when labels are changed (#911)
- [235e9a8](https://github.com/patternfly/patternfly-elements/commit/235e9a816b763dc9251e3022c914cba72f148368) fix: pfe-tab move content from light to shadow DOM (#769)
- [2adef08](https://github.com/patternfly/patternfly-elements/commit/2adef088768ac52f813899d42ba5a45119761ea3) fix: Add watch task to components generated before infra change (#912)
- [6919a2c](https://github.com/patternfly/patternfly-elements/commit/6919a2c9283551d9e25d60ff96d497fab016e270) feat: pfe-icon and pfe-icon-panel updates (#867)
  - Update paths to built-in sets: (#723)
  - Storybook icon listing: (#728)
  - Icon panel storybook: (#719)

## Prerelease 49 ( 2020-05-29 )

- [9adb7ce](https://github.com/patternfly/patternfly-elements/commit/9adb7ce4e5a672192ca49af8a7b7f9afb5f56e75) feat: pfe-jump-links (#858)
- [b1e69ee](https://github.com/patternfly/patternfly-elements/commit/b1e69ee03f5a56a64c5f57dbc8327e8a2430f0fc) feat: pfe-dropdown (#668)
- [7fe6014](https://github.com/patternfly/patternfly-elements/commit/7fe60149d05ec984e4411a73cf2e1f8185a2df98) fix: pfe-tabs vertical height (#796)

## Prerelease 48 ( 2020-05-19 )

- [b1e546b](https://github.com/patternfly/patternfly-elements/commit/b1e546bfa98254eaaebb1a537065288bdcf1704f) feat: pfe-datetime adding time zone attribute #881
- [a43a44a](https://github.com/patternfly/patternfly-elements/commit/a43a44a585a061694631f13d06b3302cae1e24a2) fix: pfe-card header and footer slot issues (#861)
- [4b2eae1](https://github.com/patternfly/patternfly-elements/commit/4b2eae1e9274986dee64e06d61cef7a7a4b9640f) feat: Add ability to demo individual components using `demo` and `live-demo` scripts (#868)

## Prerelease 47 ( 2020-05-14 )

- [0323eab](https://github.com/patternfly/patternfly-elements/commit/0323eab2d9dd944cb51dee263056566fe1a14a57) fix: pfe-navigtation-item shouldn't add duplicative event listeners #870

## Prerelease 46 ( 2020-05-12 )

- [27fee5f](https://github.com/patternfly/patternfly-elements/commit/27fee5f5c5eb021ac126f3767dd0299f5cda8231) fix: pfe-tabs check for tagName on addedNode mutation before continuing
- [2c950b0](https://github.com/patternfly/patternfly-elements/commit/2c950b08f7638787df50aa5ee6738f1205ea3a9d) fix: Add clearfix within tab and accordion panels
- [96f0a1b](https://github.com/patternfly/patternfly-elements/commit/96f0a1bdf9c758650e02b20a63ee3fb2fcf11bc9) feat: Add border to the card component
- [f392a0f](https://github.com/patternfly/patternfly-elements/commit/f392a0f0eeac3b0379794eff4a1b2946e10e883a) fix: Generator needs to convert slot-name to camelCase in js file if dash exists
- [6eed4c3](https://github.com/patternfly/patternfly-elements/commit/6eed4c3dae562e20c12879b2790cb68031e8975e) fix: adjust arrow spacing & alignment on pfe-cta
- [b342693](https://github.com/patternfly/patternfly-elements/commit/b342693b66a7322e5186606b212c9088584354b6) fix: Move max-width:100px to icon triggers

## Prerelease 45 ( 2020-04-27 )

- [8dbea7b](https://github.com/patternfly/patternfly-elements/commit/8dbea7b5fbd94614d89828c27afafdcc287f016f) fix: typo in pfe-icon README (#840)
- [7246607](https://github.com/patternfly/patternfly-elements/commit/7246607bcae3aaba0c2d8288b58c20244ed83cda) fix: Issue 839 pfe tabs history firefox, focus-state (#841)
- [9381e37](https://github.com/patternfly/patternfly-elements/commit/9381e37cd7530c5aebb9a7b596cb47704165b38d) fix: pfe-tabs adding dynamic tab in IE11 (#838)
- [f9c2813](https://github.com/patternfly/patternfly-elements/commit/f9c2813892eace5e600d168d876ecc4ffd46b472) fix: Add a warning about updating the on attribute before upgrade (#809)
- [a55449b](https://github.com/patternfly/patternfly-elements/commit/a55449bc1da11abdaf98f959961f25bfa20edc67) docs: Content set and tabs update (#824)
- [eb74cb8](https://github.com/patternfly/patternfly-elements/commit/eb74cb8f989048164fbb6ed1508c502659a752ed) feat: Update pfe-select to use new event emission format (#758) (#760)

## Prerelease 44 ( 2020-04-02 )

Tag: [v1.0.0-prerelease.44](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.44)

- [76b1ee1](https://github.com/patternfly/patternfly-elements/commit/76b1ee1abbb5892e03a2c5c435d181324fdbcff7) fix: pfe-tabs urlParms fix for IE11 #821

## Prerelease 43 ( 2020-04-02 )

Tag: [v1.0.0-prerelease.43](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.43)

- [eb64d81](https://github.com/patternfly/patternfly-elements/commit/eb64d819038c904a94e03058e98bf5d5a8e4afed) fix: removing stopPropagation from pfe-tabs click and keydown events #817

## Prerelease 42 ( 2020-03-31 )

Tag: [v1.0.0-prerelease.42](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.42)

- [6b93a6a](https://github.com/patternfly/patternfly-elements/commit/6b93a6a71e515f9f5c32ef82f7691e527a01ed34) feat: history on tab click and open tab based on url parameters on pfe-content-set (#797)
- [40c8ffa](https://github.com/patternfly/patternfly-elements/commit/40c8ffa47899305fbd783c7726184a9a62a66e2a) feat: Remove the "pfe-" prefix from the history feature in pfe-tabs (#808)
- [29780ab](https://github.com/patternfly/patternfly-elements/commit/29780abfab1074aa05a021a43d79bee00afed31b) feat: Add event emission to pfe-cta (#741)
- [36d31bf](https://github.com/patternfly/patternfly-elements/commit/36d31bf34befcbc49a55e74fb79f6887ddd94934) fix: make it so pfe-tabs inside pfe-tabs works (#806)
- [dad975f](https://github.com/patternfly/patternfly-elements/commit/dad975fc009e8cd4a26d5a481556c94d143b8686) fix: set priority pfe-cta font-size as smaller, relative to default pfe-cta font-size (#801)
- [fbc251b](https://github.com/patternfly/patternfly-elements/commit/fbc251b5180684da26a57c0941235d57f961990e) fix: set consistent line-height for pfe-nav triggers (#790)
- [d67c8bf](https://github.com/patternfly/patternfly-elements/commit/d67c8bf4bd58b4c6653a7efc1b53d894535ca3d3) fix: Add support for font family to select options (#794)

## Prerelease 41 ( 2020-03-19 )

Tag: [v1.0.0-prerelease.41](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.41)

- [7a8149e](https://github.com/patternfly/patternfly-elements/commit/7a8149e74fac2792d9968edf7ae0ec4a7a5968c6) fix: pfe-cta text wrapping issues (#791)
- [9f83786](https://github.com/patternfly/patternfly-elements/commit/9f837862e38001e6a1a4d7e2ca735073443c9e7c) feat: pfe-tabs keep history on tab click and open tab based on url parameters (#786)
- [e2ba182](https://github.com/patternfly/patternfly-elements/commit/e2ba18204fb751f8dd434ceb18d6ccdbc05b4081) feat: pfe-health-index size="mini" version (#789)
- [fdfd6fc](https://github.com/patternfly/patternfly-elements/commit/fdfd6fcb25cf01a8a107cb4947864e30da06d087) feat: Add events to the generator (#707)
- [384c314](https://github.com/patternfly/patternfly-elements/commit/384c31407a01939c0877ad214d9290c50ffd2ef7) docs: PR template updates (#776)

## Prerelease 40 ( 2020-03-10 )

Tag: [v1.0.0-prerelease.40](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.40)

- [d0c2a45](https://github.com/patternfly/patternfly-elements/commit/d0c2a4526ec3fc15339bd4ec393364486a260c84) fix: pfe-navigation cta overlap bug in IE11 (#766)
- [eb4a9f6](https://github.com/patternfly/patternfly-elements/commit/eb4a9f63514ad9635d1b195e89d596c3feaf2201) chore: Prettier updates (#770)
- [7deb9bb](https://github.com/patternfly/patternfly-elements/commit/7deb9bb6227c0560b60a665ecd43b450db0f90e1) fix: Prevent default pfe-cta arrow from wrapping to a new line by itself #679 (#765)
- [ba9d8b2](https://github.com/patternfly/patternfly-elements/commit/ba9d8b2cfed50580671041778d3d00cb5d5741d1) chore: Fixed invalid Markdown, was missing a back tic (#762)

## Prerelease 39 ( 2020-02-19 )

Tag: [v1.0.0-prerelease.39](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.39)

- [f93af30](https://github.com/patternfly/patternfly-elements/commit/f93af30cc7eef3e7728effb7cedb4773f54a5f43) feat: adding the ability for pfe-navigation to use the full width of the viewport (#718)
- [6e45ab4](https://github.com/patternfly/patternfly-elements/commit/6e45ab42617086fb7e229af3b0953ff6912c0273) feat: pfe-cta add support for disabled button, reduce lightdom needs
- [aac9925](https://github.com/patternfly/patternfly-elements/commit/aac992563a61495128c00d53f637d656bbe614dd) feat: Update pfe-content-set to accept custom container queries
- [582ffc8](https://github.com/patternfly/patternfly-elements/commit/582ffc87fcbf2ef29aecf01967d19834a7aff116) feat: Move generator into the monorepo
- [3fa441f](https://github.com/patternfly/patternfly-elements/commit/3fa441f9f49f09744ff3fc825be29837921f9933) feat: pfe-navigation - report pfe-nav's height in a global CSS variable (#732)
- [1a7ff6a](https://github.com/patternfly/patternfly-elements/commit/1a7ff6aedf46dfd36011fd8c0ba3020f374ebdc8) feat: Adding ability to configure the localhost domain (#708)
- [afd7d6e](https://github.com/patternfly/patternfly-elements/commit/afd7d6e6d1decc18bcfd88de069a391a3a61ba00) fix: remove navigation report height for specific id (#746)
- [34e54f5](https://github.com/patternfly/patternfly-elements/commit/34e54f56bebc949f5df32726251a100c6350503f) fix: cascading the "on" attribute on pfe-content-set #730
- [422baf4](https://github.com/patternfly/patternfly-elements/commit/422baf4ffb05e74d502521e768ffa926d062e634) fix: run prettier only on js and json (#743)
- [abbbd8f](https://github.com/patternfly/patternfly-elements/commit/abbbd8f2d33da444c4a70eac007939e133cb86bb) docs: Add FOUC docs to getting started README FAQ (#549) (#742)
- [1abe9d7](https://github.com/patternfly/patternfly-elements/commit/1abe9d722ac7d0cc01e77097f920dc9d24e3ca3f) docs: Update name of pfe-colors mixin in docs (#744)
- [ad1b5b5](https://github.com/patternfly/patternfly-elements/commit/ad1b5b505896ee8016173c7faa146d24c861cf7a) docs: Update docs for shell commands (#721)
- [27184d0](https://github.com/patternfly/patternfly-elements/commit/27184d00c310bdb324a9ea1a76645a344ad09814) style: simplify the dotenv check in spandx.config.js (#725)

## Prerelease 38 ( 2020-02-03 )

Tag: [v1.0.0-prerelease.38](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.38)

- [9716f5c](https://github.com/patternfly/patternfly-elements/commit/9716f5c01abb4f1358bcc5b512b3136c3ce9ee0d) fix: pfe-nav & pfe-cta hotfixes
- [ad1b5b5](https://github.com/patternfly/patternfly-elements/commit/ad1b5b505896ee8016173c7faa146d24c861cf7a) docs: Update shell commands
- [5585188](https://github.com/patternfly/patternfly-elements/commit/558518849087bd9b348c2827549acfe081d8ed96) docs: switching pfe-collapse story from heading tag to button

## Prerelease 37 ( 2020-01-28 )

Tag: [v1.0.0-prerelease.37](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.37)

- [6a41811](https://github.com/patternfly/patternfly-elements/commit/6a418112668ba580918ac4a8b4b54e8df05c1155) fix: reference error when slot is missing in pfe-navigation
- [ff859a5](https://github.com/patternfly/patternfly-elements/commit/ff859a5c2b62ae24225f0031f69b5bc050c59470) fix: accordion accessibility improvements; aria-roles corrected

## Prerelease 36 ( 2020-01-20 )

Tag: [v1.0.0-prerelease.36](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.36)

- [082467](https://github.com/patternfly/patternfly-elements/commit/08246701a3de80ea0539facce1f1338de4316be0) fix: arrow from rendering on nav priority cta's when on iOS 12>
- [36ceb1](https://github.com/patternfly/patternfly-elements/commit/36ceb13f31548dfb703bd812d8524844668c1df2) feat: update accent color to red

## Prerelease 35 ( 2020-01-17 )

Tag: [v1.0.0-prerelease.35](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.35)

- [9d9e001](https://github.com/patternfly/patternfly-elements/commit/9d9e00169fe949f78c31211c5d0a4bf3af1dbe9e) fix: Restore clickability of pfe-cta links
- [90855bb](https://github.com/patternfly/patternfly-elements/commit/90855bbc01b800de3280691ee67e61887fd7fe4d) chore: Update license from 2019 to 2020
- [88b26ed](https://github.com/patternfly/patternfly-elements/commit/88b26ed90616651a994890454172be5b4e78db7d) fix: pfe-navigation: Trigger link color, font-size, logo min-width, spacing (#631)
- [ea25cd0](https://github.com/patternfly/patternfly-elements/commit/ea25cd0c87fa853784ffc15329796bda49d192f1) Change direction of disclosure carets (#674) (https://github.com/patternfly/patternfly-elements/issues/662)
- [5511404](https://github.com/patternfly/patternfly-elements/commit/55114047ab4e9e324e12a52cb9f8bf85cbe56940) feat: Add emit events to pfelement base class

## Prerelease 34 ( 2019-12-20 )

Tag: [v1.0.0-prerelease.34](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.34)

- [c2833e3](https://github.com/patternfly/patternfly-elements/commit/c2833e3ef9caa87edbbc56fa22471525d453b7d3) feat: pfe-badge (#625)

## Prerelease 33 ( 2019-12-18 )

Tag: [v1.0.0-prerelease.33](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.33)

- [5ad398](https://github.com/patternfly/patternfly-elements/commit/5ad3983b9ead73cf2db30fd0bc52aada334c6961) Disclosure accordion variant
- [3ccec6](https://github.com/patternfly/patternfly-elements/commit/3ccec6c82efc52aae67b74072b6c0b8ff1b47f23) Update pfe-cta to include broadcast variables for all variants [#659](https://github.com/patternfly/patternfly-elements/issues/658)

## Prerelease 32 ( 2019-12-05 )

Tag: [v1.0.0-prerelease.32](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.32)

- [ed919e](https://github.com/patternfly/patternfly-elements/commit/ed919ed15bffc03ee8de4539090c5de075f9ba7d) DE21128 Fix: Add support for theme hooks within surface colors mixin
- [288322](https://github.com/patternfly/patternfly-elements/commit/2883224d927c26af3c7c9b92a9f8a3d2d852edaf) DE21423 Fix: z-index function now correctly prints variable names
- [959281](https://github.com/patternfly/patternfly-elements/commit/95928118095d235695526d5dd5da9688ebc92fef) DE21491 Fix: Add default broadcast variables to pfe-base.css
- [3ccec6](3ccec6c82efc52aae67b74072b6c0b8ff1b47f23) Update pfe-cta to include broadcast variables for all variants [#659](https://github.com/patternfly/patternfly-elements/issues/658)

## Prerelease 31 ( 2019-11-25 )

Tag: [v1.0.0-prerelease.31](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.31)

- [cdcdddf](https://github.com/patternfly/patternfly-elements/commit/cdcdddfa6858953727a3b6d7dcb9add7a61adf93) fix: Bring back pfe-cta hover animation effect [#624](https://github.com/patternfly/patternfly-elements/pull/624)
- [32b138e](https://github.com/patternfly/patternfly-elements/commit/32b138e64223031fd70ed2e525ee98cd5bb7f954) fix: Update Travis tests
- [67fa1fb](https://github.com/patternfly/patternfly-elements/commit/67fa1fb3f29ec3e48a6d0767b6c08eb008e56655) fix: pfe-navigation mobile login/language links working [#620](https://github.com/patternfly/patternfly-elements/pull/620)
- [4ebcbcc](https://github.com/patternfly/patternfly-elements/commit/4ebcbcccaf50247c27a242a944dd4a5a654aeb80) fix: pfe-navigation add styles for when JavaScript does not load [#600](https://github.com/patternfly/patternfly-elements/pull/600))
- [27ef3ec](https://github.com/patternfly/patternfly-elements/commit/27ef3ec08371ec32c9a9376904163ef48148affa) feat: Updating broadcast and how variables are applied [#392](https://github.com/patternfly/patternfly-elements/pull/392)
- [a78ea1f](https://github.com/patternfly/patternfly-elements/commit/a78ea1fc5e114856ede20e459d35875697410b56) fix: Speed up Travis tests [#621](https://github.com/patternfly/patternfly-elements/issues/621)
- [f144b6f](https://github.com/patternfly/patternfly-elements/commit/f144b6f33dd6a8b615ac2a63cec6b29f3bf70d32) feat: pfe-select component [#553](https://github.com/patternfly/patternfly-elements/pull/553)

## Prerelease 30 ( 2019-11-08 )

Tag: [v1.0.0-prerelease.30](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.30)

- [a666fc4](https://github.com/patternfly/patternfly-elements/commit/a666fc4f8e6e9669ee849d01d11ca77798824cc7) pfe-band layout rendering fix for bug in IE and Edge (#470)
- [2143c84](https://github.com/patternfly/patternfly-elements/commit/2143c84d207076c0c8016c960d6edd447e4048eb) feat: add align attribute to pass down to tabs on render (#610)
- [392399b](https://github.com/patternfly/patternfly-elements/commit/392399b3eb240290e67873a51122459985dbbe7f) fix: pfe-cta svgs removed from tab order in ie11
- [567523a](https://github.com/patternfly/patternfly-elements/commit/567523aeac3504d2d67b922b1f1e4fe51a122a05) docs: Fix hugo nav scroll issue (#612)
- [94ff217](https://github.com/patternfly/patternfly-elements/commit/94ff21768e3b1a8b90e284059f322e091c2d56ae) fix: pfe-content-set: wrapping the observer reconnect in a setTimeout #611
- [94ff217](https://github.com/patternfly/patternfly-elements/commit/94ff21768e3b1a8b90e284059f322e091c2d56ae) fix: ignore compiled assets when determining version bumps #613
- [0537a54](https://github.com/patternfly/patternfly-elements/commit/0537a54c5b02f99c0b53c9199223281ded99062f) chore: making pfe-band public

## Prerelease 29 ( 2019-11-04 )

Tag: [v1.0.0-prerelease.29](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.29)

- [5bef4ed6](https://github.com/patternfly/patternfly-elements/commit/5bef4ed6b9f47412361cb8687f0b4618069a49ea) fix: pfe-card's published package now includes the intended assets #605
- [5f049bf](https://github.com/patternfly/patternfly-elements/commit/5f049bfa4f9595819f704ff14bd7e609c32d796a) fix: updating the location of the toast file in the story #606
- [99fce5d](https://github.com/patternfly/patternfly-elements/commit/99fce5d8fce6f08c901e3ce2398a572d0ae8b6d5) fix: updating pfe-layouts package.json for distribution fixes #607
- [5f049bf](https://github.com/patternfly/patternfly-elements/commit/5f049bfa4f9595819f704ff14bd7e609c32d796a) fix: updating the location of the toast file in the story #606
- [260c54c](https://github.com/patternfly/patternfly-elements/commit/260c54c3206972bf6f8b954c88a3728c81ab4817) fix: updating lerna.json ignoreChanges

## Prerelease 28 ( 2019-11-04 )

Tag: [v1.0.0-prerelease.28](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.28)

- [732ca3e](https://github.com/patternfly/patternfly-elements/commit/732ca3e6b3a5ba5756bcdd9696c05e7b1f9ed8be) fix: adding a mutation observer to pfe-content-set so it works in Angular
- [5ca613d](https://github.com/patternfly/patternfly-elements/commit/5ca613d255f337abf84768fa1b965a52c785ac50) feat: adding a schema to pfe-icon-panel #572
- [79614bc](https://github.com/patternfly/patternfly-elements/commit/79614bca9d3158b2c367251b1b17af6666894e27) fix: pfe-card cta alignment #560
- [5800171](https://github.com/patternfly/patternfly-elements/commit/5800171f9f6afc95f832a01bce7f4eeb5c6717d7) fix: set pfe-band to private, until frameworks + ie11 support (#589)
- [a4b2c27](https://github.com/patternfly/patternfly-elements/commit/a4b2c2751840265831329729ed577651b7099388) fix: build tasks and packages to represent new dist architecture
- [5103c95](https://github.com/patternfly/patternfly-elements/commit/5103c950d8d0df1769ffe2291a46f1c867dc0b8a) feat: pfe-navigation style updates
- [6ddbcff](https://github.com/patternfly/patternfly-elements/commit/6ddbcffa50bb277a3e48c7b729becd1db646425e) fix: pfe-tabs in IE11
- [782f8e9](https://github.com/patternfly/patternfly-elements/commit/782f8e9ec9cf1e1961acd6bb9bc406d715837706) fix: updating pfe-card story so image overflow works #599
- [f111593](https://github.com/patternfly/patternfly-elements/commit/f111593805390b1395c284d5905a2e530f829e01) fix: pfe-icon stretch
- [b2a099d](https://github.com/patternfly/patternfly-elements/commit/b2a099d0fa1cb1bed8cc7d054ffa1138613e4408) fix: pfelement compilation of css assets
- [d16ab0c](https://github.com/patternfly/patternfly-elements/commit/d16ab0ce81268cd32df69bb168dc7e32118a9912) feat: pfe-toast component

## Prerelease 27 ( 2019-10-25 )

Tag: [v1.0.0-prerelease.27](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.27)

- [f18aa6f](https://github.com/patternfly/patternfly-elements/commit/f18aa6ff05e510993baf0f1971a85e2e4715bcc4) fix: Update build tools to support the files array in package.json for each component
- [9d9d41c](https://github.com/patternfly/patternfly-elements/commit/9d9d41c30883674d52cd1c29aa2300829c00693f) feat: Add patternfly project as a dependency so that styles can be extended
- [b13ef5b](https://github.com/patternfly/patternfly-elements/commit/b13ef5b2470770acc01638d4a55c1f90a2859bda) doc: Support table
- [274e35c](https://github.com/patternfly/patternfly-elements/commit/274e35cd4e8a08721888d8fad195b6fe37a525b7) feat: Navigation component
- [6b5db77](https://github.com/patternfly/patternfly-elements/commit/6b5db77c20358499f78b66811b73ea6be309318b) doc: Update documentation
- [d4600dd](https://github.com/patternfly/patternfly-elements/commit/d4600dd1c6e2abfcf8918d06b4eaacb8fb62d208) feat: Add automatic Sass globbing to pfe-sass
- [27a97e1](https://github.com/patternfly/patternfly-elements/commit/27a97e135986de37ede55504a1630bf974de0e0c) fix: pfe-cta - functions & IE11 accessibility
- [9a39ae3](https://github.com/patternfly/patternfly-elements/commit/9a39ae3b7d0b8d129a3aea3b58e71dab5013c721) fix: Adding object-fit to resolve image distortion in cards, #417
- [980203b](https://github.com/patternfly/patternfly-elements/commit/980203b2768d1d9d8813f386bb0f0bf37d3732ab) feat: Upgrade to latest version of storybook (#366)
- [ab5bc0e](https://github.com/patternfly/patternfly-elements/commit/ab5bc0e66b1e0f2f4ba180ff80d24b84d0db3260) feat: added sm md and xl sizes for pfe-progress-indicator (#575)
- [fc51ba](https://github.com/patternfly/patternfly-elements/commit/fc51baf1cb4313ca117cc505ba9c0e99dd44d0e9) feat: Add pfe-number schema (#576)
- [19a5975](https://github.com/patternfly/patternfly-elements/commit/19a5975c6e5e710e8e36e22384bb0125ab52059c) fix: pfe-card: storybook issue with incorrect attribute (#573)
- [f3bf2b2](https://github.com/patternfly/patternfly-elements/commit/f3bf2b2ea82b61ad80f59cf1b2dca3f74c58e920) fix: making pfe-number compatible with angular and IE11 (#570)
- [c01a97f](https://github.com/patternfly/patternfly-elements/commit/c01a97f87f3ca84344842c75b9b60f50a6fb6f3f) pfe-datetime: adding a json schema
- [93c5e99](https://github.com/patternfly/patternfly-elements/commit/93c5e99428fc57514ef4571caacb1dba199f5303) pfe-icon-panel: maintain icon height in flex display
- [d2b16b8](https://github.com/patternfly/patternfly-elements/commit/d2b16b806327bf99e09ca4e7ed0d4aeeeaa37a90) Add larger size to health-index
- [a77f5ff](https://github.com/patternfly/patternfly-elements/commit/a77f5ffb6066a6be4778f48ddec05b6759e219ff) feat: compile assets to a dist directory
- [1f9ec10](https://github.com/patternfly/patternfly-elements/commit/1f9ec10488a4a879d230705c2ea3d783d2df45f6) feat: pfe-cta add wind variant styles
- [a162a43](https://github.com/patternfly/patternfly-elements/commit/a162a431923d037bf33a8ba0ef77edd9d059a39c) fix: bug in pfe-tab-panel

## Prerelease 25 ( 2019-09-10 )

Tag: [v1.0.0-prerelease.25](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.25)

- [13f32d3d](https://github.com/patternfly/patternfly-elements/commit/13f32d3d56c61ebb9cf0285cdc6ef44596df50e7) use bash 'strict mode' for release script
- [e3e0a52d](https://github.com/patternfly/patternfly-elements/commit/e3e0a52d9b1e9aa5281f43eaf8dee0648b7a8db7) reintroduce ctrl+c exit 1
- [4e0735bf](https://github.com/patternfly/patternfly-elements/commit/4e0735bf8f1b3b514da68439059bda80ada865e2) consider merged tags when evaluating changed components
- [4a8e79a4](https://github.com/patternfly/patternfly-elements/commit/4a8e79a4be60995626855529705e623c86fb5601) abort release script if any command fails
- [c4ed3255](https://github.com/patternfly/patternfly-elements/commit/c4ed3255074b81bc36d3acac645879d0a2f5e494) removing the chicken. we're vegan now

## Prerelease 24 ( 2019-09-09 )

Tag: [v1.0.0-prerelease.24](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.24)

- [143b18a8](https://github.com/patternfly/patternfly-elements/commit/143b18a8838c99fdaf3516518a1b7699864c1e30) improve bundle removal commit message during release
- [9a5eb60b](https://github.com/patternfly/patternfly-elements/commit/9a5eb60bcc2166f2b3a83b82a6b8e7f71a0d2d95) lerna.json: ignoreChanges on built assets
- [c9bc32f2](https://github.com/patternfly/patternfly-elements/commit/c9bc32f24e4752539d1b6eed0d39a5bf39914a7a) create annotated tags
- [12b87364](https://github.com/patternfly/patternfly-elements/commit/12b87364bb8c2691c8144eaac6939dc9729b43b3) issue-444 removed TextDecorationColor from accordion header mixins.
- [bae3802e](https://github.com/patternfly/patternfly-elements/commit/bae3802e82c7505f81ac73802059280f0ef4fc98) issue-444: reverted dark theme border left hover color

## Prerelease 23 ( 2019-08-29 )

Tag: [v1.0.0-prerelease.23](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.23)

- [0c810a3](https://github.com/patternfly/patternfly-elements/commit/0c810a3b5727d536498b9456043c8f5cf56c7240) adding one last check for a controlledPanel ([#523](https://github.com/patternfly/patternfly-elements/pull/523))
- [491f53a](https://github.com/patternfly/patternfly-elements/commit/491f53abe86f3704e710768f92125c1991b451c8) move babelrc settings into rollup config; fixes storybook issue ([#521](https://github.com/patternfly/patternfly-elements/pull/521))

## Prerelease 22 ( 2019-08-23 )

Tag: [v1.0.0-prerelease.22](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.22)

- [587b2bd](https://github.com/patternfly/patternfly-elements/commit/587b2bdb91f4a564ace4ac35994351ab363751a8) remove PR template questions that are enforced by github ([#511](https://github.com/patternfly/patternfly-elements/pull/511))
- [18bfc7e](https://github.com/patternfly/patternfly-elements/commit/18bfc7ecf2bd2e925227031db4b4129d4ed2e5aa) adding ability to disable a pfe-collapse-toggle button ([#518](https://github.com/patternfly/patternfly-elements/pull/518))
- [0e0bd84](https://github.com/patternfly/patternfly-elements/commit/0e0bd84ef8efefc83e259dced85caa495cde861a) clean up scattered build files ([#510](https://github.com/patternfly/patternfly-elements/pull/510))
- [2bfff25](https://github.com/patternfly/patternfly-elements/commit/2bfff25fa704aa4dc39da207839d3346819f1c0d) (issue-517) fixing issue in react where the pfe-collapse-toggle can't find the panel

## Prerelease 21 ( 2019-08-23 )

Tag: [v1.0.0-prerelease.21](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.21)

- [bc48948](https://github.com/patternfly/patternfly-elements/commit/bc489485a229e561a1c09e37c97f2f564035b1ea) Update pfe-icon-panel demo
- [dd1797d](https://github.com/patternfly/patternfly-elements/commit/dd1797d00a379e103f0008ffebc6ffbaee7bfed5) Restore pfe-icon readme
- [8e14fb1](https://github.com/patternfly/patternfly-elements/commit/8e14fb1fb07f1199a5d4521b55e7156473592692) Remove debugger statement from pfe-autocomplete
- [5386bdd](https://github.com/patternfly/patternfly-elements/commit/5386bdd2b4cb9e2b684c7ad1eca5bcd44bede7b6) Issue-505: updating pfe-progress-indicator package.json

## Prerelease 20 ( 2019-08-21 )

Tag: [v1.0.0-prerelease.20](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.20)

- [8a0f497](https://github.com/patternfly/patternfly-elements/commit/8a0f497f74f991d831c1a53b4f023ed36a349a63) created pfe-modal
- [c549734](https://github.com/patternfly/patternfly-elements/commit/c54973446a84624f663c230982d670c748a64628) created pfe-progress-indicator
- [569c592](https://github.com/patternfly/patternfly-elements/commit/569c5923f6a200502ee596585229ca5b0445ab3c) Netlify integration

## Prerelease 19 ( 2019-07-31 )

Tag: [v1.0.0-prerelease.19](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.19)

- [00389c2d](https://github.com/patternfly/patternfly-elements/commit/00389c2d581ed5f9b60dd744ab9db3d00f3bac13) adding type="button" to the button in the header ([#474](https://github.com/patternfly/patternfly-elements/pull/474))
- [ddd6779e](https://github.com/patternfly/patternfly-elements/commit/ddd6779ed870ec1a22b5fbc9a4e279a6262c68f2) Pfe-tabs - add centered alignment ([#467](https://github.com/patternfly/patternfly-elements/pull/467))
- [356079fc](https://github.com/patternfly/patternfly-elements/commit/356079fc1f33a625ae3ab99655022417bef8225e) Update CHANGELOG-prerelease.md ([#472](https://github.com/patternfly/patternfly-elements/pull/472))
- [5d4752d8](https://github.com/patternfly/patternfly-elements/commit/5d4752d83f55edad87eb29a8f8736b85fab4d586) dev-pull-request-template add testing instructions to PR template ([#463](https://github.com/patternfly/patternfly-elements/pull/463))

## Prerelease 18 ( 2019-07-30 )

Tag: [v1.0.0-prerelease.18](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.18)

- [daf5ca08](https://github.com/patternfly/patternfly-elements/commit/daf5ca088b7e8e42c7df6944d05626327b4e38c7) pfe-cta bug fixes + open brand styles ([#353](https://github.com/patternfly/patternfly-elements/pull/353))
- [efd115b1](https://github.com/patternfly/patternfly-elements/commit/efd115b1ed956b5f7ee5872eecd571d988ce335b) remove sourceMappingURL from src/pfelement.js ([#464](https://github.com/patternfly/patternfly-elements/pull/464))
- [7d5e78ff](https://github.com/patternfly/patternfly-elements/commit/7d5e78ff11a7680a5888c18be5d0971e5706849c) adding a version getter to each component ([#453](https://github.com/patternfly/patternfly-elements/pull/453))
- [88fb56a0](https://github.com/patternfly/patternfly-elements/commit/88fb56a07f1346af4a520b90f7af679ae16d6ec6) fixing the super call in the constructor of pfe-health-index ([#454](https://github.com/patternfly/patternfly-elements/pull/454))
- [4f9c7997](https://github.com/patternfly/patternfly-elements/commit/4f9c79973be92eeabce3d53266f7b763c47a7336) fix pfe-avatar in ie11

## Prerelease 17 ( 2019-06-24 )

Tag: [v1.0.0-prerelease.17](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.17)

- [1b92821d](https://github.com/patternfly/patternfly-elements/commit/1b92821de18f8c0c49a5397a8dc29b19dcbcb482) adding a check in pfe-tab-panel to see if associated tab is selected when panel is initialized ([#432](https://github.com/patternfly/patternfly-elements/pull/432))
- [ae21a66b](https://github.com/patternfly/patternfly-elements/commit/ae21a66b090df5ac6a7f4015e0d0d6f487b00340) Update README.md ([#426](https://github.com/patternfly/patternfly-elements/pull/426))
- [3796210b](https://github.com/patternfly/patternfly-elements/commit/3796210b038497f010356d97f92637987218ab8a) Adding 2 demo scripts to the npm package ([#430](https://github.com/patternfly/patternfly-elements/pull/430))

## Prerelease 16 ( 2019-05-31 )

Tag: [v1.0.0-prerelease.16](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.16)

- [4a606dbd](https://github.com/patternfly/patternfly-elements/commit/4a606dbd4baf53478bf94780fee0dcea6624fcfc) moving this.button initialization to the constructor ([#419](https://github.com/patternfly/patternfly-elements/pull/419))
- [f8f9004f](https://github.com/patternfly/patternfly-elements/commit/f8f9004f81331abdccbd8f9fb76739290c0b0ef1) pfe-markdown element ([#358](https://github.com/patternfly/patternfly-elements/pull/358))

## Prerelease 15 ( 2019-05-28 )

Tag: [v1.0.0-prerelease.15](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.15)

- [5d6ca9e](https://github.com/patternfly/patternfly-elements/commit/5d6ca9e5441db5e5416612643122c62b2cc84d5a) add meta viewport tag to pfe-content-set demo ([#415](https://github.com/patternfly/patternfly-elements/pull/415))
- [ee6fde4](https://github.com/patternfly/patternfly-elements/commit/ee6fde41c4859023273226439b9c045cea46418c) adding a slotchange listener and adding tests ([#407](https://github.com/patternfly/patternfly-elements/pull/407))
- [bf8790f](https://github.com/patternfly/patternfly-elements/commit/bf8790f62722c765c20e4913def79b062ecaa3d7) Card feature updates ([#312](https://github.com/patternfly/patternfly-elements/pull/312))
- [5d1fa72](https://github.com/patternfly/patternfly-elements/commit/5d1fa72949f0ed83bbb0752bb42ebd7637b9efb3) reset surface-border color to #d2d2d2
- [e8260e5](https://github.com/patternfly/patternfly-elements/commit/e8260e5740275a888d142dbb001a736ae311051f) PFE-accordion border fixes
- [84dbf03](https://github.com/patternfly/patternfly-elements/commit/84dbf031027dcca589dc6bf8176956c2b6ab305c) Pfe docs status ([#408](https://github.com/patternfly/patternfly-elements/pull/408))
- [827aa51](https://github.com/patternfly/patternfly-elements/commit/827aa5199f2891f8b92e4765c6451a49ae853a94) Update Storybook utils to support self-closing tag ([#411](https://github.com/patternfly/patternfly-elements/pull/411))
- [393098c](https://github.com/patternfly/patternfly-elements/commit/393098c258fb3ad8788f4e22413511b490aef93b) Rename PR template directory & file in hopes that github will use them ([#410](https://github.com/patternfly/patternfly-elements/pull/410))

## Prerelease 14 ( 2019-04-30 )

Tag: [v1.0.0-prerelease.14](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.14)

- Version bumps from release release/v1.0.0-prerelease.13 ([#398](https://github.com/patternfly/patternfly-elements/pull/398))
- Adding a mutationobserver to pfe-tabs ([#402](https://github.com/patternfly/patternfly-elements/pull/402))
- Adding a mutationobserver to pfe-accordion ([#401](https://github.com/patternfly/patternfly-elements/pull/401))

## Prerelease 13 ( 2019-04-23 )

Tag: [v1.0.0-prerelease.13](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.13)

- Pt 2: Storybook updates ([#277](https://github.com/patternfly/patternfly-elements/pull/277))
- Documenting release steps ([#379](https://github.com/patternfly/patternfly-elements/pull/379))
- Add release automation script ([#399](https://github.com/patternfly/patternfly-elements/pull/399))

## Prerelease 12 ( 2019-04-22 )

Tag: [v1.0.0-prerelease.12](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.12)

- On branch checkout, look for leftover elements from other branches ([#394](https://github.com/patternfly/patternfly-elements/pull/394))
- Fix the directory of the hugo-check.sh call ([#393](https://github.com/patternfly/patternfly-elements/pull/393))
- Add some additional information to each package file ([#382](https://github.com/patternfly/patternfly-elements/pull/382))

## Prerelease 11 ( 2019-04-02 )

Tag: [v1.0.0-prerelease.11](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.11)

- Removing duplicate has_slot function in PFElement ([#322](https://github.com/patternfly/patternfly-elements/pull/322))
- Change Spandx port to auto ([#354](https://github.com/patternfly/patternfly-elements/pull/354))
- Add autoprefixer tooling to the repo ([#334](https://github.com/patternfly/patternfly-elements/pull/334))

## Prerelease 10 ( 2019-03-26 )

Tag: [v1.0.0-prerelease.10](https://github.com/patternfly/patternfly-elements/releases/tag/v1.0.0-prerelease.10)

- Update accordion styles ([#359](https://github.com/patternfly/patternfly-elements/pull/359))
- Band layout tweaks ([#336](https://github.com/patternfly/patternfly-elements/pull/336))
- Resolve grid gap in band layout ([#361](https://github.com/patternfly/patternfly-elements/pull/361))
- Documentation updates ([#368](https://github.com/patternfly/patternfly-elements/pull/368))
- Prefix pfe-avatar attributes ([#371](https://github.com/patternfly/patternfly-elements/pull/371))
- Remove CP-theme ([#362](https://github.com/patternfly/patternfly-elements/pull/362))

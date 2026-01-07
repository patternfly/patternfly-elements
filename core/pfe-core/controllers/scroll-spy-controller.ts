import { isServer, type ReactiveController, type ReactiveControllerHost } from 'lit';

export interface ScrollSpyControllerOptions extends IntersectionObserverInit {
  /**
   * Tag names of legal link children.
   * Legal children must have an `href` property/attribute pair, like `<a>`.
   */
  tagNames: string[];

  /**
   * Attribute to set on the active link element.
   * @default 'active'
   */
  activeAttribute?: string;

  /**
   * The root node to query content for
   * @default the host's root node
   */
  rootNode?: Node;

  /**
   * function to call on link children to get their URL hash (i.e. id to scroll to)
   * @default el => el.getAttribute('href');
   */
  getHash?: (el: Element) => string | null;

  /**
   * Optional callback for when an intersection occurs
   */
  onIntersection?(): void;
}

interface HeadingState {
  isIntersecting: boolean;
  lastSeenY: number;
  level: number;
  documentOrder: number;
};

/**
 * A reactive controller that implements the scroll-spy pattern for table of contents navigation.
 *
 * ## Logic Overview
 *
 * This controller tracks heading elements and activates the corresponding ToC link based on
 * which headings are currently visible in the viewport.
 *
 * ### Key Behaviors:
 *
 * **Intersection-Based Activation**: Uses IntersectionObserver to detect when headings enter/exit
 * the viewport. Activates the first intersecting heading, or maintains the current active heading
 * when no headings are intersecting (persistence through long sections).
 *
 * **Responsive Debouncing**: Uses 16ms debounce delay (single frame) for responsive updates
 * while preventing excessive DOM changes during scrolling.
 *
 * **Performance Optimized**: Leverages IO-provided bounding rects to avoid manual getBoundingClientRect
 * calls, with automatic cache invalidation on window resize.
 *
 * **Manual Refresh**: Call `refresh()` method after DOM changes to reinitialize heading tracking.
 *
 * ### Edge Cases:
 * - Page top: Activates first heading when no intersections
 * - Page bottom: Activates last heading when no intersections
 * - No intersections: Maintains current active heading or finds most recently passed
 * - When the URL hash changes, if the targeted element is within a tracked section, that
 *   section must be activated.
 */
export class ScrollSpyController implements ReactiveController {
  static #instances = new Set<ScrollSpyController>;

  static {
    if (!isServer) {
      addEventListener('scroll', () => {
        this.#instances.forEach(ssc => {
          ssc.#reconcile();
        });
      }, { passive: true });
      addEventListener('scrollend', () => {
        this.#instances.forEach(ssc => {
          ssc.#reconcile();
        });
      }, { passive: true });
      addEventListener('hashchange', () => {
        this.#instances.forEach(ssc => {
          ssc.#activateHash();
        });
      });
    }
  }

  /**
   * Call to re-initialize scroll spy's DOM representation.
   * Call this method if your SPA framework replaces the DOM, e.g. on route change.
   */
  static refresh(): void {
    for (const instance of this.#instances) {
      instance.#refresh();
    }
  }

  #tagNames: string[];

  #activeAttribute: string;

  #io?: IntersectionObserver;

  /** Has the intersection observer found an element? */
  #intersected = false;

  #root: ScrollSpyControllerOptions['root'];

  #rootMargin?: string;

  #threshold: number | number[];

  #headingStates = new Map<Element, HeadingState>();

  #rectCache = new Map<Element, DOMRect>();

  /** The currently active heading that persists through long sections */
  #activeHeading: Element | null = null;

  #debounceTimeout: number | null = null;

  #isNavigating = false;


  #linkTargetMap = new Map<Element, Element | null>();
  #targetLinkMap = new Map<Element, Element | null>();

  #getRootNode: () => Node | null;

  #getHash: (el: Element) => string | null;

  #onIntersection?: () => void;

  get #linkChildren(): Element[] {
    if (isServer) {
      return [];
    } else {
      return Array.from(this.host.querySelectorAll(this.#tagNames.join(',')))
          .filter(this.#getHash);
    }
  }

  get root(): Element | Document | null | undefined {
    return this.#root;
  }

  set root(v) {
    this.#root = v;
    this.#io?.disconnect();
    this.#initIo();
  }

  get rootMargin(): string | undefined {
    return this.#rootMargin;
  }

  set rootMargin(v) {
    this.#rootMargin = v;
    this.#io?.disconnect();
    this.#initIo();
  }

  get threshold(): number | number[] {
    return this.#threshold;
  }

  set threshold(v) {
    this.#threshold = v;
    this.#io?.disconnect();
    this.#initIo();
  }

  constructor(
    private host: ReactiveControllerHost & HTMLElement,
    options: ScrollSpyControllerOptions,
  ) {
    host.addController(this);
    this.#tagNames = options.tagNames;
    this.#root = options.root;
    this.#rootMargin = options.rootMargin;
    this.#activeAttribute = options.activeAttribute ?? 'active';
    this.#threshold = options.threshold ?? [0, 0.1];
    this.#getRootNode = () => options.rootNode ?? host.getRootNode?.() ?? null;
    this.#getHash = options?.getHash ?? ((el: Element) => el.getAttribute('href'));
    this.#onIntersection = options?.onIntersection;
  }

  hostConnected(): void {
    ScrollSpyController.#instances.add(this);
    this.#initIo();
    this.#setupResizeListener();
  }

  hostDisconnected(): void {
    ScrollSpyController.#instances.delete(this);
    this.#io?.disconnect();

    if (this.#debounceTimeout) {
      clearTimeout(this.#debounceTimeout);
      this.#debounceTimeout = null;
    }
  }

  #initializing = true;

  /** Debounced reconciliation trigger - called on scroll events */
  #reconcile() {
    if (this.#debounceTimeout) {
      clearTimeout(this.#debounceTimeout);
    }

    this.#debounceTimeout = setTimeout(() => {
      this.#performReconciliation();
    }, 16) as unknown as number; // Single frame delay
  }

  /** Main logic to determine and set the active heading */
  #performReconciliation() {
    // Skip reconciliation during hash navigation to prevent flicker
    if (this.#isNavigating) {
      return;
    }

    const { scrollY, innerHeight } = window;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    const isAtPageTop = scrollY <= 100; // Increased buffer for better UX
    // More robust bottom detection with multiple conditions
    const scrollBottom = scrollY + innerHeight;
    const isAtPageBottom = (
      scrollBottom >= documentHeight - 50 // Within 50px of bottom
      || Math.abs(scrollBottom - documentHeight) <= 5 // Very close to bottom
      || scrollY + innerHeight >= document.documentElement.scrollHeight - 50 // Alternative check
    );

    let targetHeading: Element | null = null;
    const intersectingHeadings = this.#getIntersectingHeadings();

    if (isAtPageTop) {
      // Page top edge case: Always activate first heading when near top
      targetHeading = this.#getFirstTrackedHeading();
    } else if (isAtPageBottom) {
      // Page bottom edge case: Always activate last heading when near bottom
      targetHeading = this.#getLastTrackedHeading();
    } else if (intersectingHeadings.length > 0) {
      // Active intersections: Choose the most appropriate one
      targetHeading = this.#selectBestIntersectingHeading(intersectingHeadings);
    } else {
      // No intersections: Maintain current or find most recently passed
      targetHeading = this.#activeHeading ?? this.#getLastPassedHeading();

      // Fallback: if no recently passed heading found, use first heading
      if (!targetHeading) {
        targetHeading = this.#getFirstTrackedHeading();
      }
    }

    // Only update if heading has actually changed
    if (targetHeading && targetHeading !== this.#activeHeading) {
      this.#activeHeading = targetHeading;
      const link = this.#targetLinkMap.get(targetHeading);
      if (link) {
        this.#setActive(link);
      }
    }
  }

  #getLastTrackedHeading(): Element | null {
    const sortedHeadings = [...this.#headingStates.keys()]
        .sort((a, b) => this.#getDocumentOrder(b) - this.#getDocumentOrder(a));
    return sortedHeadings[0] ?? null;
  }

  #getDocumentOrder(element: Element): number {
    return this.#headingStates.get(element)?.documentOrder ?? 0;
  }

  #getFirstTrackedHeading(): Element | null {
    const sortedHeadings = [...this.#headingStates.keys()]
        .sort((a, b) => this.#getDocumentOrder(a) - this.#getDocumentOrder(b));
    return sortedHeadings[0] ?? null;
  }

  /** Find the last heading that has been scrolled past (most recently passed) */
  #getLastPassedHeading(): Element | null {
    // Reading position is 20% down the viewport - where users typically focus
    const readingPosition = window.scrollY + window.innerHeight * 0.2;
    const viewportTop = window.scrollY;

    // Find all headings that have been scrolled past the reading position
    const passedHeadings: { heading: Element; state: HeadingState }[] = [];

    for (const [heading, state] of this.#headingStates) {
      // A heading is "passed" if its position is above the reading position
      // Use a small buffer to handle edge cases with very small headings
      const headingPosition = state.lastSeenY;
      const hasPassedReadingPosition = headingPosition < readingPosition - 10;

      if (hasPassedReadingPosition) {
        passedHeadings.push({ heading, state });
      }
    }

    if (passedHeadings.length === 0) {
      // No headings have been passed, check if we're above all content
      // and return the first heading if we're near the top
      if (viewportTop < 200) {
        return this.#getFirstTrackedHeading();
      }
      return null;
    }

    // Sort by document order (descending) to get the last heading that was passed
    passedHeadings.sort((a, b) => b.state.documentOrder - a.state.documentOrder);

    // Return the heading with the highest document order that has been passed
    return passedHeadings[0].heading;
  }

  /** Get all currently intersecting headings */
  #getIntersectingHeadings(): Element[] {
    const intersecting: Element[] = [];
    for (const [heading, state] of this.#headingStates) {
      if (state.isIntersecting) {
        intersecting.push(heading);
      }
    }
    return intersecting;
  }

  /**
   * Select the best heading from multiple intersecting ones.
   * Prioritizes headings that are closer to the reading position (20% down viewport).
   * @param intersectingHeadings - all headings that are currently intersecting the viewport
   */
  #selectBestIntersectingHeading(intersectingHeadings: Element[]): Element {
    if (intersectingHeadings.length === 1) {
      return intersectingHeadings[0];
    }

    // Reading position is 20% down the viewport - where users typically focus
    const readingPosition = window.scrollY + window.innerHeight * 0.2;
    let [bestHeading] = intersectingHeadings;
    let minDistance = Infinity;

    for (const heading of intersectingHeadings) {
      const state = this.#headingStates.get(heading);
      if (state) {
        // Calculate distance from reading position to heading
        const distance = Math.abs(state.lastSeenY - readingPosition);

        // Prefer headings closer to reading position
        // In case of tie, prefer earlier in document order
        if (distance < minDistance
            || (
              distance === minDistance
              && state.documentOrder < this.#getDocumentOrder(bestHeading)
            )
        ) {
          minDistance = distance;
          bestHeading = heading;
        }
      }
    }

    return bestHeading;
  }

  /**
   * Find the tracked heading section that contains the given element.
   * This determines which section an element logically belongs to based on document order.
   * @param targetElement element tracked by scroll-spy-controller (i.e. link)
   */
  #findContainingTrackedSection(targetElement: Element): Element | null {
    const trackedHeadings = [...this.#headingStates.keys()];
    if (trackedHeadings.length === 0) {
      return null;
    }

    // Sort headings by document order to process them in sequence
    const sortedHeadings = trackedHeadings.sort((a, b) =>
      this.#getDocumentOrder(a) - this.#getDocumentOrder(b)
    );

    // Use DOM position comparison for more reliable ordering
    const targetRect = targetElement.getBoundingClientRect();
    const targetTop = targetRect.top + window.scrollY;

    let containingHeading: Element | null = null;
    let nextHeading: Element | null = null;

    // Find the heading that comes before the target and the one that comes after
    for (let i = 0; i < sortedHeadings.length; i++) {
      const heading = sortedHeadings[i];
      const headingRect = heading.getBoundingClientRect();
      const headingTop = headingRect.top + window.scrollY;

      if (headingTop <= targetTop) {
        containingHeading = heading;
        nextHeading = sortedHeadings[i + 1] || null;
      } else {
        break;
      }
    }

    // If we found a containing heading, verify it's actually the right one
    if (containingHeading) {
      // If there's a next heading, make sure our target is before it
      if (nextHeading) {
        const nextRect = nextHeading.getBoundingClientRect();
        const nextTop = nextRect.top + window.scrollY;

        // If target is after the next heading, it doesn't belong to the containing section
        if (targetTop >= nextTop) {
          return null;
        }
      }

      return containingHeading;
    }

    // If no heading comes before the target, check if target is before the first heading
    if (sortedHeadings.length > 0) {
      const [firstHeading] = sortedHeadings;
      const firstRect = firstHeading.getBoundingClientRect();
      const firstTop = firstRect.top + window.scrollY;

      // If target is before the first heading, it belongs to the first section
      if (targetTop < firstTop) {
        return firstHeading;
      }
    }

    return null;
  }

  async #initIo() {
    const rootNode = this.#getRootNode();
    if (rootNode instanceof Document || rootNode instanceof ShadowRoot) {
      const { threshold, root } = this;
      const rootMargin = this.rootMargin ?? '0px';
      this.#io = new IntersectionObserver(r => this.#onIo(r), { root, rootMargin, threshold });

      this.#headingStates.clear();
      this.#rectCache.clear();
      let documentOrder = 0;

      for (const link of this.#linkChildren) {
        const id = this.#getHash(link)?.replace('#', '');
        if (id) {
          const target = document.getElementById(id);
          if (target) {
            this.#io?.observe(target);
            this.#linkTargetMap.set(link, target);
            this.#targetLinkMap.set(target, link);

            const level = this.#getHeadingLevel(target);
            const rect = target.getBoundingClientRect();

            // Pre-populate rect cache and heading state
            this.#rectCache.set(target, rect);
            this.#headingStates.set(target, {
              isIntersecting: false,
              lastSeenY: rect.top + window.scrollY,
              level,
              documentOrder: documentOrder++,
            });
          }
        }
      }
    }
  }

  #getHeadingLevel(element: Element): number {
    const tagName = element.tagName.toLowerCase();
    const match = tagName.match(/^h(\d)$/);
    return match ? parseInt(match[1], 10) : 999;
  }

  #setActive(link?: EventTarget | null) {
    for (const child of this.#linkChildren) {
      child.toggleAttribute(this.#activeAttribute, child === link);
    }
  }

  async #activateHash() {
    // Set navigation flag to prevent reconciliation flicker
    this.#isNavigating = true;

    // Clear any pending reconciliation
    if (this.#debounceTimeout) {
      clearTimeout(this.#debounceTimeout);
      this.#debounceTimeout = null;
    }

    const links = this.#linkChildren;
    const { hash } = location;

    if (!hash) {
      this.setActive(links.at(0) ?? null);
    } else {
      // First try to find a direct link match
      const directLink = links.find(x => this.#getHash(x) === hash);
      if (directLink) {
        await this.#nextIntersection();
        this.setActive(directLink);
        // Update active heading for consistency
        const target = this.#linkTargetMap.get(directLink);
        if (target) {
          this.#activeHeading = target;
        }
      } else {
        // If no direct link match, check if the hash targets an element within a tracked section
        const targetElement = document.getElementById(hash.slice(1));
        if (targetElement) {
          const containingSection = this.#findContainingTrackedSection(targetElement);
          if (containingSection) {
            const sectionLink = this.#targetLinkMap.get(containingSection);
            if (sectionLink) {
              await this.#nextIntersection();
              this.setActive(sectionLink);
              // Update active heading to maintain consistency
              this.#activeHeading = containingSection;
            }
          } else {
            // No containing section found, clear active state
            await this.#nextIntersection();
            this.setActive(null);
            this.#activeHeading = null;
          }
        } else {
          // Hash target not found, clear active state
          await this.#nextIntersection();
          this.setActive(null);
          this.#activeHeading = null;
        }
      }
    }

    // Clear navigation flag after a short delay to allow scroll to settle
    setTimeout(() => {
      this.#isNavigating = false;
    }, 300); // Give time for any programmatic scrolling to complete
  }

  async #nextIntersection() {
    this.#intersected = false;
    // safeguard the loop
    setTimeout(() => this.#intersected = false, 3000);
    while (!this.#intersected) {
      await new Promise(requestAnimationFrame);
    }
  }

  async #onIo(entries: IntersectionObserverEntry[]) {
    this.#intersected = true;

    for (const entry of entries) {
      const state = this.#headingStates.get(entry.target);
      if (state) {
        state.isIntersecting = entry.isIntersecting;
        const rect = entry.boundingClientRect;
        state.lastSeenY = rect.top + window.scrollY;

        // Update rect cache with IO-provided rect (performance optimization)
        this.#rectCache.set(entry.target, rect);
      }
    }

    if (this.#initializing) {
      this.#initializing = false;
    }

    this.#onIntersection?.();
    this.#reconcile();
  }

  /**
   * Explicitly set the active item
   * @param link usually an `<a>`
   */
  public async setActive(link: EventTarget | null): Promise<void> {
    this.#setActive(link);
    await this.#nextIntersection();
  }

  #setupResizeListener(): void {
    if (!isServer) {
      addEventListener('resize', () => {
        this.#rectCache.clear();
      }, { passive: true });
    }
  }

  /**
   * Manually refresh heading tracking (call after DOM changes)
   */
  #refresh(): void {
    this.#io?.disconnect();
    this.#initIo();
  }
}

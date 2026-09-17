<script>
  import { onMount } from "svelte";

  let {
    nav = {
      services: "",
      projects: "",
      reviews: "",
      contact: "",
      tagline: "",
      servicesLink: "#services",
      projectsLink: "#projects",
      reviewsLink: "#reviews",
      contactLink: "#contact",
      languageLink: "#",
      languageLabel: "",
      freebies: null,
    },

    /*
     * TRUE:
     * Homepage / pages that support light mode.
     *
     * FALSE:
     * Audit / Configurator / pages that are dark-only.
     */
    showThemeControl = true,
  } = $props();

  function clean(text) {
    return String(text ?? "").replace(/[\*\[\]]/g, "");
  }

  let activeSection = $state("");
  let brandClicked = $state(false);

  let freebiesOpen = $state(false);
  let projectsOpen = $state(false);

  let mobileMenuOpen = $state(false);
  let mobileMenuButtonElement = $state(null);

  let dropdownElement = $state(null);
  let dropdownTriggerElement = $state(null);

  let projectDropdownElement = $state(null);
  let projectDropdownTriggerElement = $state(null);

  let mobileDropdownTop = $state(0);
  let mobileDropdownLeft = $state(0);

  let projectMobileDropdownTop = $state(0);
  let projectMobileDropdownLeft = $state(0);

  let previousBodyOverflow = "";
  let previousHtmlOverflow = "";

  /*
   * Tracks the existing global ThemeToggle state
   * so the icon in the mobile header always matches.
   */
  let mobileThemeIsLight = $state(false);
  let themeClassObserver = null;

  /*
   * [DE] means current page is English.
   * [EN] means current page is German.
   */
  let isEnglishPage = $derived(clean(nav.languageLabel).toUpperCase() === "DE");

  let blogLink = $derived(isEnglishPage ? "/en-2/blog/" : "/blog/");

  let navItems = $derived([
    {
      href: nav.servicesLink || "#services",
      label: clean(nav.services),
      id: "services",
      title: `Zum Abschnitt ${clean(nav.services)} springen`,
    },

    {
      href: nav.projectsLink || "#projects",
      label: clean(nav.projects),
      id: "projects",
      title: `Zum Abschnitt ${clean(nav.projects)} springen`,
    },

    {
      href: nav.reviewsLink || "#reviews",
      label: clean(nav.reviews || "Bewertungen"),
      id: "reviews",
      title: `Zum Abschnitt ${clean(nav.reviews || "Bewertungen")} springen`,
    },

    /*
     * BLOG
     * Same visible label in English and German.
     */
    {
      href: blogLink,
      label: "BLOG",
      id: "blog",
      title: isEnglishPage ? "Open the blog" : "Blog öffnen",
    },

    {
      href: nav.contactLink || "#contact",
      label: clean(nav.contact),
      id: "contact",
      title: `Zum Abschnitt ${clean(nav.contact)} springen`,
    },
  ]);

  let contactItem = $derived(navItems.find((item) => item.id === "contact"));

  /*
   * Kept so the rest of the component structure
   * does not need to change.
   */
  let projectsMenu = $derived({
    label: clean(nav.projects || (isEnglishPage ? "PROJECTS" : "PROJEKTE")),
    items: [],
  });

  let freebiesMenu = $derived({
    label: "TOOLS",

    items: isEnglishPage
      ? [
          {
            label: "WEBSITE PLANNER",
            href: "/en-2/website-configurator/",
            title: "Open the Website Planner",
          },
          {
            label: "WEBSITE AUDIT",
            href: "/en-2/website-audit/",
            title: "Open the free Website Audit tool",
          },
        ]
      : [
          {
            label: "WEBSITE PLANNER",
            href: "/website-konfigurator/",
            title: "Website Planner",
          },
          {
            label: "WEBSITE AUDIT",
            href: "/website-audit/",
            title: "Kostenlosen Website-Audit öffnen",
          },
        ],
  });

  /* =========================================================
     MOBILE THEME CONTROL
  ========================================================= */

  function syncMobileThemeState() {
    if (typeof document === "undefined") {
      return;
    }

    mobileThemeIsLight =
      document.body.classList.contains("light") ||
      document.documentElement.classList.contains("light");
  }

  function toggleMobileTheme() {
    if (typeof document === "undefined") {
      return;
    }

    /*
     * Use the existing ThemeToggle component so there is
     * only one theme state / localStorage implementation.
     */
    const existingThemeToggle = document.querySelector(".theme-side-toggle");

    if (existingThemeToggle instanceof HTMLButtonElement) {
      existingThemeToggle.click();

      requestAnimationFrame(() => {
        syncMobileThemeState();
      });

      return;
    }

    /*
     * Small fallback in case a supported page renders the
     * Header without the separate ThemeToggle component.
     */
    const nextTheme = mobileThemeIsLight ? "dark" : "light";

    document.documentElement.classList.remove("light", "dark");

    document.body.classList.remove("light", "dark");

    document.documentElement.classList.add(nextTheme);
    document.body.classList.add(nextTheme);

    syncMobileThemeState();
  }

  function handleMobileContactIconClick(event) {
    if (!contactItem) {
      return;
    }

    closeFreebies();
    closeProjects();

    if (!contactItem.href?.startsWith("#")) {
      return;
    }

    const section = document.getElementById(contactItem.id);

    if (!section) {
      return;
    }

    scrollToSection(event, contactItem.id);
  }

  /* =========================================================
     MOBILE MENU
  ========================================================= */

  function lockMobileScroll() {
    if (typeof document === "undefined") {
      return;
    }

    previousBodyOverflow = document.body.style.overflow;

    previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }

  function unlockMobileScroll() {
    if (typeof document === "undefined") {
      return;
    }

    document.body.style.overflow = previousBodyOverflow;

    document.documentElement.style.overflow = previousHtmlOverflow;
  }

  function openMobileMenu() {
    if (mobileMenuOpen) {
      return;
    }

    closeFreebies();
    closeProjects();

    mobileMenuOpen = true;

    lockMobileScroll();
  }

  function closeMobileMenu() {
    if (!mobileMenuOpen) {
      return;
    }

    mobileMenuOpen = false;

    unlockMobileScroll();
  }

  function toggleMobileMenu() {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function handleMobileNavClick(event, item) {
    closeMobileMenu();
    closeFreebies();
    closeProjects();

    if (!item?.href?.startsWith("#")) {
      return;
    }

    scrollToSection(event, item.id);
  }

  function handleMobileChildClick() {
    closeMobileMenu();
    closeFreebies();
    closeProjects();
  }

  /* =========================================================
     BRAND
  ========================================================= */

  function animateBrand() {
    brandClicked = true;

    closeMobileMenu();
    closeFreebies();
    closeProjects();

    setTimeout(() => {
      brandClicked = false;
    }, 850);
  }

  /* =========================================================
     DROPDOWNS
  ========================================================= */

  function isMobileOrTablet() {
    return window.innerWidth <= 900;
  }

  function updateMobileDropdownPosition() {
    if (!dropdownTriggerElement || !isMobileOrTablet()) {
      return;
    }

    const triggerRect = dropdownTriggerElement.getBoundingClientRect();

    const dropdownWidth = window.innerWidth <= 640 ? 184 : 200;

    const viewportPadding = 12;
    const halfDropdownWidth = dropdownWidth / 2;

    let centerPosition = triggerRect.left + triggerRect.width / 2;

    const minimumCenter = viewportPadding + halfDropdownWidth;

    const maximumCenter =
      window.innerWidth - viewportPadding - halfDropdownWidth;

    centerPosition = Math.max(
      minimumCenter,
      Math.min(centerPosition, maximumCenter),
    );

    mobileDropdownTop = Math.round(triggerRect.bottom + 12);

    mobileDropdownLeft = Math.round(centerPosition);
  }

  function updateProjectDropdownPosition() {
    if (!projectDropdownTriggerElement || !isMobileOrTablet()) {
      return;
    }

    const triggerRect = projectDropdownTriggerElement.getBoundingClientRect();

    const dropdownWidth = window.innerWidth <= 640 ? 184 : 200;

    const viewportPadding = 12;
    const halfDropdownWidth = dropdownWidth / 2;

    let centerPosition = triggerRect.left + triggerRect.width / 2;

    const minimumCenter = viewportPadding + halfDropdownWidth;

    const maximumCenter =
      window.innerWidth - viewportPadding - halfDropdownWidth;

    centerPosition = Math.max(
      minimumCenter,
      Math.min(centerPosition, maximumCenter),
    );

    projectMobileDropdownTop = Math.round(triggerRect.bottom + 12);

    projectMobileDropdownLeft = Math.round(centerPosition);
  }

  function toggleProjects(event) {
    event.preventDefault();
    event.stopPropagation();

    const willOpen = !projectsOpen;

    closeFreebies();

    projectsOpen = willOpen;

    if (willOpen) {
      requestAnimationFrame(() => {
        updateProjectDropdownPosition();
      });
    }
  }

  function closeProjects() {
    projectsOpen = false;
  }

  function toggleFreebies(event) {
    event.preventDefault();
    event.stopPropagation();

    const willOpen = !freebiesOpen;

    closeProjects();

    freebiesOpen = willOpen;

    if (willOpen) {
      requestAnimationFrame(() => {
        updateMobileDropdownPosition();
      });
    }
  }

  function closeFreebies() {
    freebiesOpen = false;
  }

  function handleDropdownItemClick() {
    closeFreebies();
    closeProjects();
  }

  function handleDocumentPointerDown(event) {
    if (!freebiesOpen && !projectsOpen) {
      return;
    }

    if (
      event.target instanceof Node &&
      ((dropdownElement && dropdownElement.contains(event.target)) ||
        (projectDropdownElement &&
          projectDropdownElement.contains(event.target)))
    ) {
      return;
    }

    closeFreebies();
    closeProjects();
  }

  function handleDocumentKeyDown(event) {
    if (event.key !== "Escape") {
      return;
    }

    if (mobileMenuOpen) {
      closeMobileMenu();

      requestAnimationFrame(() => {
        mobileMenuButtonElement?.focus();
      });

      return;
    }

    if (!freebiesOpen && !projectsOpen) {
      return;
    }

    const focusTarget = projectsOpen
      ? projectDropdownTriggerElement
      : dropdownTriggerElement;

    closeFreebies();
    closeProjects();

    focusTarget?.focus();
  }

  function handleViewportChange() {
    if (mobileMenuOpen && window.innerWidth > 900) {
      closeMobileMenu();
    }

    if (!freebiesOpen && !projectsOpen) {
      return;
    }

    if (isMobileOrTablet()) {
      if (freebiesOpen) {
        updateMobileDropdownPosition();
      }

      if (projectsOpen) {
        updateProjectDropdownPosition();
      }
    }
  }

  /* =========================================================
     SCROLL NAVIGATION
  ========================================================= */

  function getHeaderOffset() {
    const header = document.querySelector(".site-header");

    const headerHeight = header?.getBoundingClientRect().height ?? 0;

    if (window.innerWidth <= 640) {
      return headerHeight + 28;
    }

    if (window.innerWidth <= 900) {
      return headerHeight + 26;
    }

    return headerHeight + 18;
  }

  function scrollToSection(event, id) {
    event.preventDefault();

    closeFreebies();
    closeProjects();

    const section = document.getElementById(id);

    if (!section) {
      return;
    }

    const targetPosition =
      section.getBoundingClientRect().top + window.scrollY - getHeaderOffset();

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    history.pushState(null, "", `#${id}`);

    activeSection = id;
  }

  function handleNavClick(event, item) {
    closeFreebies();
    closeProjects();

    if (!item?.href?.startsWith("#")) {
      return;
    }

    scrollToSection(event, item.id);
  }

  function setActiveFromHash() {
    const hash = window.location.hash.replace("#", "");

    if (hash) {
      activeSection = hash;
    }
  }

  /* =========================================================
     MOUNT
  ========================================================= */

  onMount(() => {
    setActiveFromHash();
    syncMobileThemeState();

    /*
     * Watch theme class changes made by ThemeToggle.
     */
    themeClassObserver = new MutationObserver(() => {
      syncMobileThemeState();
    });

    themeClassObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    themeClassObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");

      requestAnimationFrame(() => {
        const section = document.getElementById(id);

        if (!section) {
          return;
        }

        const targetPosition =
          section.getBoundingClientRect().top +
          window.scrollY -
          getHeaderOffset();

        window.scrollTo({
          top: targetPosition,
          behavior: "auto",
        });
      });
    }

    /*
     * Only observe real #section navigation.
     * BLOG is a normal page link and is ignored here.
     */
    const sections = navItems
      .filter((item) => item.href?.startsWith("#"))
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          activeSection = visible[0].target.id;
        }
      },

      {
        root: null,
        rootMargin: "-32% 0px -52% 0px",
        threshold: [0.15, 0.3, 0.45, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    window.addEventListener("hashchange", setActiveFromHash);

    window.addEventListener("resize", handleViewportChange);

    window.addEventListener("scroll", handleViewportChange, {
      passive: true,
    });

    document.addEventListener("pointerdown", handleDocumentPointerDown);

    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      observer.disconnect();

      themeClassObserver?.disconnect();
      themeClassObserver = null;

      unlockMobileScroll();

      window.removeEventListener("hashchange", setActiveFromHash);

      window.removeEventListener("resize", handleViewportChange);

      window.removeEventListener("scroll", handleViewportChange);

      document.removeEventListener("pointerdown", handleDocumentPointerDown);

      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  });
</script>

<header
  class="site-header"
  class:no-theme-control={!showThemeControl}
  class:mobile-menu-open={mobileMenuOpen}
>
  <div class="header-grid">
    <!-- =====================================================
         LOGO
    ====================================================== -->

    <div class="header-left">
      <a
        href="/"
        title="Zora Web Design - Startseite"
        class="brand-block"
        class:brand-clicked={brandClicked}
        onclick={animateBrand}
      >
        <span class="brand">
          ZORA<span class="brand-dot"></span>WEBDESIGN
        </span>

        <span class="brand-subtext brand-subtext-desktop">
          {clean(nav.tagline)}
        </span>

        <span
          class="brand-subtext-mobile"
          aria-label="SEO, Web Design, Branding"
        >
          <span>SEO</span>
          <span>WEB DESIGN</span>
          <span>BRANDING</span>
        </span>
      </a>
    </div>

    <!-- =====================================================
         MOBILE / TABLET HEADER ICONS

         CONTACT → THEME → MENU
    ====================================================== -->

    <div class="mobile-header-actions">
      <!-- CONTACT -->

      <a
        class="mobile-header-icon mobile-contact-action"
        href={contactItem?.href || "#contact"}
        title={isEnglishPage ? "Contact" : "Kontakt"}
        aria-label={isEnglishPage ? "Go to contact" : "Zum Kontakt"}
        onclick={handleMobileContactIconClick}
      >
        <svg class="mobile-contact-svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5.5h16v13H4z"></path>
          <path d="m4.8 6.4 7.2 6 7.2-6"></path>
        </svg>
      </a>

      <!-- THEME -->

      {#if showThemeControl}
        <button
          type="button"
          class="mobile-header-icon mobile-theme-action"
          aria-label={mobileThemeIsLight
            ? "Switch to dark mode"
            : "Switch to light mode"}
          onclick={toggleMobileTheme}
        >
          {#if mobileThemeIsLight}
            <!-- MOON -->

            <svg
              class="mobile-theme-svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5 8.5 8.5 0 1 0 20.5 14.1Z"
              ></path>
            </svg>
          {:else}
            <!-- SUN -->

            <svg
              class="mobile-theme-svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4"></circle>

              <path
                d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.41M17.66 6.34l1.41-1.41"
              ></path>
            </svg>
          {/if}
        </button>
      {/if}

      <!-- HAMBURGER -->

      <button
        bind:this={mobileMenuButtonElement}
        class="mobile-menu-toggle"
        class:open={mobileMenuOpen}
        type="button"
        aria-label={mobileMenuOpen
          ? "Close navigation menu"
          : "Open navigation menu"}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-navigation"
        onclick={toggleMobileMenu}
      >
        <svg class="mobile-menu-icon" viewBox="0 0 32 24" aria-hidden="true">
          <path class="mobile-menu-line mobile-menu-line-one" d="M3 7H29"
          ></path>

          <path class="mobile-menu-line mobile-menu-line-two" d="M10 17H29"
          ></path>
        </svg>
      </button>
    </div>

    <!-- =====================================================
         DESKTOP NAVIGATION

         SERVICES
         TOOLS
         PROJECTS
         REVIEWS
         BLOG
         CONTACT
         LANGUAGE
    ====================================================== -->

    <div class="header-right">
      <nav class="main-nav" aria-label="Main navigation">
        {#each navItems as item, index}
          <!-- TOOLS BEFORE PROJECTS -->

          {#if index === 1 && freebiesMenu}
            <div
              bind:this={dropdownElement}
              class="nav-dropdown"
              class:open={freebiesOpen}
              style={`--mobile-dropdown-top: ${mobileDropdownTop}px; --mobile-dropdown-left: ${mobileDropdownLeft}px;`}
            >
              <button
                bind:this={dropdownTriggerElement}
                type="button"
                class="dropdown-trigger"
                aria-label={`${freebiesOpen ? "Close" : "Open"} ${freebiesMenu.label} menu`}
                aria-expanded={freebiesOpen}
                aria-controls="website-tools-dropdown-panel"
                onclick={toggleFreebies}
              >
                <span class="menu-label">
                  {freebiesMenu.label}
                </span>

                <span class="dropdown-arrow" aria-hidden="true"></span>
              </button>

              <div
                id="website-tools-dropdown-panel"
                class="dropdown-panel"
                aria-hidden={!freebiesOpen}
              >
                {#each freebiesMenu.items as menuItem}
                  <a
                    href={menuItem.href}
                    title={menuItem.title}
                    onclick={handleDropdownItemClick}
                  >
                    <span>
                      {menuItem.label}
                    </span>
                  </a>
                {/each}
              </div>
            </div>
          {/if}

          <!-- NORMAL NAV ITEM -->

          <a
            href={item.href}
            title={item.title}
            class:active={activeSection === item.id}
            class:contact-nav-link={item.id === "contact"}
            onclick={(event) => handleNavClick(event, item)}
          >
            <span class="menu-label">
              {item.label}
            </span>
          </a>
        {/each}

        <!-- LANGUAGE -->

        <div class="lang-switch">
          <a
            href={nav.languageLink || "#"}
            title="Sprache wechseln / Switch Language"
            class="lang-link"
            onclick={handleDropdownItemClick}
          >
            <svg class="language-globe" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9"></circle>

              <path
                d="M3 12h18M12 3c2.4 2.45 3.6 5.45 3.6 9S14.4 18.55 12 21M12 3c-2.4 2.45-3.6 5.45-3.6 9S9.6 18.55 12 21"
              ></path>
            </svg>

            <span class="menu-label">
              {clean(nav.languageLabel)}
            </span>
          </a>
        </div>
      </nav>
    </div>

    <!-- =====================================================
         DESKTOP THEME CONTROL PLACEHOLDER
    ====================================================== -->

    {#if showThemeControl}
      <div class="header-theme-area" aria-hidden="true">
        <span class="header-theme-icon">
          <!-- SUN -->

          <svg
            class="theme-svg theme-sun"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4"></circle>

            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.41M17.66 6.34l1.41-1.41"
            ></path>
          </svg>

          <!-- MOON -->

          <svg
            class="theme-svg theme-moon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5 8.5 8.5 0 1 0 20.5 14.1Z"
            ></path>
          </svg>
        </span>
      </div>
    {/if}
  </div>

  <!-- =======================================================
       MOBILE FULL-SCREEN MENU
  ======================================================== -->

  <div
    id="mobile-navigation"
    class="mobile-menu-overlay"
    class:open={mobileMenuOpen}
    aria-hidden={!mobileMenuOpen}
  >
    <nav class="mobile-menu-nav" aria-label="Mobile navigation">
      {#each navItems as item, index}
        <!-- TOOLS BEFORE PROJECTS -->

        {#if index === 1 && freebiesMenu}
          <section class="mobile-menu-group">
            <div class="mobile-menu-parent mobile-menu-parent-static">
              {freebiesMenu.label}
            </div>

            <div class="mobile-menu-children">
              {#each freebiesMenu.items as menuItem}
                <a
                  href={menuItem.href}
                  title={menuItem.title}
                  tabindex={mobileMenuOpen ? 0 : -1}
                  onclick={handleMobileChildClick}
                >
                  {menuItem.label}
                </a>
              {/each}
            </div>
          </section>
        {/if}

        <!-- ALL MAIN ITEMS -->

        <section class="mobile-menu-group">
          <a
            href={item.href}
            class="mobile-menu-parent"
            class:active={activeSection === item.id}
            class:mobile-contact-link={item.id === "contact"}
            tabindex={mobileMenuOpen ? 0 : -1}
            onclick={(event) => handleMobileNavClick(event, item)}
          >
            {item.label}
          </a>
        </section>
      {/each}
    </nav>
  </div>
</header>

<!-- =========================================================
     MOBILE LANGUAGE SWITCH
========================================================= -->

<a
  class="mobile-language-switcher"
  href={nav.languageLink || "#"}
  title="Sprache wechseln / Switch Language"
  aria-label={isEnglishPage
    ? "Zur deutschen Version wechseln"
    : "Switch to the English version"}
  onclick={handleDropdownItemClick}
>
  <svg class="language-globe" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9"></circle>

    <path
      d="M3 12h18M12 3c2.4 2.45 3.6 5.45 3.6 9S14.4 18.55 12 21M12 3c-2.4 2.45-3.6 5.45-3.6 9S9.6 18.55 12 21"
    ></path>
  </svg>

  <span>
    {clean(nav.languageLabel)}
  </span>
</a>

<style>
  /* =========================================================
     SHARED
  ========================================================= */

  .mobile-language-switcher,
  .mobile-header-actions,
  .mobile-menu-overlay,
  .brand-subtext-mobile {
    display: none;
  }

  .language-globe {
    width: 15px;
    height: 15px;

    flex: 0 0 auto;

    fill: none;

    stroke: #0043ff;
    stroke-width: 1.6;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* =========================================================
     HEADER
  ========================================================= */

  .site-header {
    position: sticky;

    top: 0;

    z-index: 1000;

    width: 100%;

    background: #000000;

    border-bottom: 0;

    backdrop-filter: none;
    -webkit-backdrop-filter: none;

    transition:
      background 0.3s ease,
      border-color 0.3s ease;
  }

  :global(body.light) .site-header {
    background: #ffffff;

    border-bottom: 0;

    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  /* =========================================================
     HEADER BOTTOM LINE
  ========================================================= */

  .site-header::after {
    content: "";

    position: absolute;

    z-index: 2;

    left: 50%;
    bottom: 0;

    width: min(1540px, calc(100% - 32px));
    height: 1px;

    background: rgba(255, 255, 255, 0.1);

    transform: translateX(-50%);

    pointer-events: none;

    transition: background 0.3s ease;
  }

  :global(body.light) .site-header::after {
    background: rgba(0, 0, 0, 0.1);
  }

  /* =========================================================
     HEADER GRID
  ========================================================= */

  .header-grid {
    position: relative;

    width: min(1540px, calc(100% - 32px));

    min-height: 78px;

    margin: 0 auto;

    display: grid;

    align-items: stretch;

    box-sizing: border-box;

    border-left: 1px solid rgba(255, 255, 255, 0.08);

    border-right: 1px solid rgba(255, 255, 255, 0.08);
  }

  .site-header:not(.no-theme-control) .header-grid {
    grid-template-columns:
      minmax(0, 1fr)
      auto
      minmax(0, 1fr);
  }

  .site-header.no-theme-control .header-grid {
    grid-template-columns:
      minmax(0, 1fr)
      auto;
  }

  :global(body.light) .header-grid {
    border-left-color: rgba(0, 0, 0, 0.1);
    border-right-color: rgba(0, 0, 0, 0.1);
  }

  .header-left,
  .header-right,
  .header-theme-area {
    min-height: 78px;

    display: flex;

    align-items: center;
  }

  .header-left {
    grid-column: 1;

    padding: 0 24px;
  }

  /* =========================================================
     DESKTOP HEADER RIGHT
  ========================================================= */

  .site-header:not(.no-theme-control) .header-right {
    grid-column: 2;

    padding: 0 24px;

    justify-content: center;
  }

  .site-header.no-theme-control .header-right {
    grid-column: 2;

    padding: 0 24px;

    justify-content: flex-end;
  }

  /* =========================================================
     BRAND
  ========================================================= */

  .brand-block {
    position: relative;

    isolation: isolate;

    max-width: 380px;

    display: inline-flex;

    flex-direction: column;

    justify-content: center;

    gap: 2px;

    color: inherit;

    text-decoration: none;

    -webkit-tap-highlight-color: transparent;
  }

  .brand {
    display: inline-flex;

    align-items: center;

    gap: 0.42em;

    color: #ffffff;

    font-size: 1.18rem;
    font-weight: 600;

    line-height: 1;

    letter-spacing: 0.015em;

    transition:
      transform 0.25s ease,
      letter-spacing 0.25s ease,
      opacity 0.25s ease,
      color 0.25s ease;
  }

  :global(body.light) .brand {
    color: #050505;
  }

  .brand-dot {
    width: 0.54em;
    height: 0.54em;

    border-radius: 50%;

    display: inline-block;

    flex-shrink: 0;

    background: #0043ff;

    box-shadow: 0 0 0 rgba(255, 255, 255, 0);

    transform: translateY(0.02em);

    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  .brand-block:hover .brand {
    letter-spacing: 0.03em;

    transform: translateX(2px);
  }

  .brand-block:hover .brand-dot {
    box-shadow: 0 0 18px rgba(0, 67, 255, 0.28);

    transform: translateY(0.02em) scale(1.12);
  }

  .brand-subtext {
    margin: 0;

    color: rgba(255, 255, 255, 0.46);

    line-height: 1.2;

    letter-spacing: 0.08em;

    text-transform: uppercase;

    transition:
      color 0.25s ease,
      transform 0.25s ease;
  }

  :global(body:not(:has(.homepage-footer))) .brand-subtext {
    font-size: 0.66rem;
    font-weight: 500;
  }

  :global(body.light) .brand-subtext {
    color: rgba(0, 0, 0, 0.52);
  }

  .brand-block:hover .brand-subtext {
    color: rgba(255, 255, 255, 0.68);

    transform: translateX(2px);
  }

  :global(body.light) .brand-block:hover .brand-subtext {
    color: rgba(0, 0, 0, 0.72);
  }

  /* =========================================================
     BRAND CLICK
  ========================================================= */

  .brand-clicked .brand {
    animation: brandPulse 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .brand-clicked .brand-dot {
    animation: dotPulse 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  @keyframes brandPulse {
    0% {
      transform: translateX(0);
    }

    45% {
      transform: translateX(3px);
    }

    100% {
      transform: translateX(0);
    }
  }

  @keyframes dotPulse {
    0% {
      transform: translateY(0.02em) scale(1);
    }

    50% {
      transform: translateY(0.02em) scale(1.22);
    }

    100% {
      transform: translateY(0.02em) scale(1);
    }
  }

  /* =========================================================
     MAIN NAV
  ========================================================= */

  .main-nav {
    min-height: 78px;

    display: flex;

    align-items: center;

    gap: clamp(18px, 1.7vw, 28px);
  }

  .main-nav > a,
  .dropdown-trigger,
  .lang-link {
    color: #ffffff;

    font-family: inherit;

    font-size: 16px;
    font-weight: 700;

    line-height: 1;

    letter-spacing: -0.005em;

    text-decoration: none;

    transition:
      color 0.2s ease,
      opacity 0.2s ease;
  }

  :global(body.light) .main-nav > a,
  :global(body.light) .dropdown-trigger,
  :global(body.light) .lang-link {
    color: #000000;
  }

  .main-nav > a {
    position: relative;

    display: inline-flex;

    align-items: center;

    white-space: nowrap;
  }

  .menu-label {
    display: inline-block;

    transition:
      color 0.2s ease,
      transform 0.2s ease;
  }

  .main-nav > a:hover .menu-label {
    transform: translateY(-1px);
  }

  /* =========================================================
     DROPDOWN
  ========================================================= */

  .nav-dropdown {
    position: relative;

    min-height: 78px;

    display: flex;

    align-items: center;
  }

  .dropdown-trigger {
    position: relative;

    display: inline-flex;

    align-items: center;

    gap: 0.32em;

    padding: 0;

    border: 0;

    background: transparent;

    cursor: pointer;

    white-space: nowrap;
  }

  .dropdown-arrow {
    width: 6px;
    height: 6px;

    margin: 0 0.13em 3px 0.12em;

    border-right: 1.5px solid #0043ff;

    border-bottom: 1.5px solid #0043ff;

    transform: rotate(45deg);

    transition: transform 0.18s ease;
  }

  .nav-dropdown.open .dropdown-arrow {
    transform: rotate(225deg);
  }

  .dropdown-panel {
    position: absolute;

    z-index: 1020;

    top: calc(100% - 6px);
    left: -12px;

    min-width: 220px;

    display: grid;

    padding: 8px 0;

    border: 1px solid rgba(255, 255, 255, 0.1);

    background: rgba(5, 6, 10, 0.98);

    opacity: 0;

    visibility: hidden;

    pointer-events: none;

    transform: translateY(6px);

    transition:
      opacity 0.18s ease,
      visibility 0.18s ease,
      transform 0.18s ease;
  }

  .nav-dropdown.open .dropdown-panel {
    opacity: 1;

    visibility: visible;

    pointer-events: auto;

    transform: translateY(0);
  }

  .dropdown-panel a {
    min-height: 42px;

    display: inline-flex;

    align-items: center;

    padding: 0 14px;

    color: #ffffff;

    font-size: 16px;
    font-weight: 700;

    text-decoration: none;
  }

  :global(body.light) .dropdown-panel {
    background: #ffffff;

    border-color: rgba(0, 0, 0, 0.12);
  }

  :global(body.light) .dropdown-panel a {
    color: #000000;
  }

  /* =========================================================
     DESKTOP DROPDOWN HOVER
  ========================================================= */

  @media (min-width: 901px) and (hover: hover) {
    .nav-dropdown:hover .dropdown-panel,
    .nav-dropdown:focus-within .dropdown-panel {
      opacity: 1;

      visibility: visible;

      pointer-events: auto;

      transform: translateY(0);
    }
  }

  /* =========================================================
     LANGUAGE
  ========================================================= */

  .lang-switch {
    min-height: 78px;

    margin-left: clamp(18px, 1.7vw, 28px);

    display: flex;

    align-items: center;
  }

  .lang-link {
    display: inline-flex;

    align-items: center;

    gap: 0.34em;
  }

  /* =========================================================
     DESKTOP THEME AREA
  ========================================================= */

  .header-theme-area {
    grid-column: 3;

    justify-content: flex-end;

    padding: 0 24px;

    box-sizing: border-box;
  }

  .header-theme-icon {
    width: 32px;
    height: 32px;

    display: inline-flex;

    align-items: center;
    justify-content: center;

    flex: 0 0 32px;

    color: #ffffff;

    line-height: 1;

    pointer-events: none;
  }

  :global(body.light) .header-theme-icon {
    color: #050505;
  }

  .theme-svg {
    width: 18px;
    height: 18px;

    display: block;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.65;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .theme-sun {
    display: block;
  }

  .theme-moon {
    display: none;
  }

  :global(body.light) .theme-sun {
    display: none;
  }

  :global(body.light) .theme-moon {
    display: block;
  }

  /* =========================================================
     DESKTOP
  ========================================================= */

  @media (min-width: 901px) {
    .site-header.no-theme-control .header-right {
      justify-self: end;
    }

    .site-header:not(.no-theme-control) .header-right {
      justify-self: center;
    }

    .header-left {
      border-right: 0;
    }
  }

  /* =========================================================
     CONTACT DESKTOP
  ========================================================= */

  .main-nav > a.contact-nav-link {
    text-decoration-line: underline;

    text-decoration-color: #0043ff;

    text-decoration-thickness: 1px;

    text-underline-offset: 4px;
  }

  /* =========================================================
     HOMEPAGE TYPOGRAPHY
  ========================================================= */

  :global(body:has(.homepage-footer)) .brand-subtext,
  :global(body:has(.homepage-footer)) .mobile-language-switcher {
    font-size: var(--text-label);

    font-weight: var(--weight-semibold);
  }

  :global(body:has(.homepage-footer)) .main-nav > a,
  :global(body:has(.homepage-footer)) .dropdown-trigger,
  :global(body:has(.homepage-footer)) .lang-link,
  :global(body:has(.homepage-footer)) .dropdown-panel a {
    font-size: 16px;

    font-weight: 700;
  }

  /* =========================================================
     MOBILE + TABLET
     <= 900PX
  ========================================================= */

  @media (max-width: 900px) {
    /*
     * Hide the old floating ThemeToggle on tablet/mobile.
     * The new header theme icon triggers the same button
     * programmatically.
     */
    :global(.theme-side-toggle) {
      display: none !important;
    }

    /* =====================================================
       HEADER
    ====================================================== */

    .site-header {
      min-height: 72px;

      overflow: visible;
    }

    .site-header::after {
      display: none;
    }

    .header-grid,
    .site-header:not(.no-theme-control) .header-grid,
    .site-header.no-theme-control .header-grid {
      position: relative;

      z-index: 5100;

      width: 100%;
      min-height: 72px;

      display: grid;

      grid-template-columns:
        minmax(0, 1fr)
        auto;

      align-items: center;

      margin: 0;

      padding: 0 clamp(14px, 3.5vw, 20px);

      border: 0;

      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      box-sizing: border-box;
    }

    :global(body.light) .header-grid {
      border-bottom-color: rgba(0, 0, 0, 0.1);
    }

    /* =====================================================
       LOGO
    ====================================================== */

    .header-left {
      grid-column: 1;

      min-width: 0;
      min-height: 72px;

      padding: 0;

      border: 0;

      display: flex;

      justify-content: flex-start;

      text-align: left;
    }

    .brand-block {
      width: max-content;

      max-width: calc(100vw - 175px);

      display: inline-flex;

      align-items: flex-start;

      gap: 5px;

      text-align: left;
    }

    .brand {
      width: auto;

      display: inline-flex;

      justify-content: flex-start;
      align-items: center;

      gap: 0.34em;

      font-size: clamp(0.78rem, 2.8vw, 0.96rem);

      letter-spacing: 0.005em;

      white-space: nowrap;
    }

    .brand-subtext-desktop {
      display: none;
    }

    .brand-subtext-mobile {
      width: 100%;

      display: flex;

      align-items: center;
      justify-content: space-between;

      gap: 4px;

      margin: 0;

      color: rgba(255, 255, 255, 0.46);

      font-size: clamp(0.4rem, 1.35vw, 0.49rem);

      font-weight: 500;

      line-height: 1;

      letter-spacing: 0.015em;

      white-space: nowrap;

      text-transform: uppercase;

      box-sizing: border-box;
    }

    :global(body.light) .brand-subtext-mobile {
      color: rgba(0, 0, 0, 0.52);
    }

    .brand-subtext-mobile span {
      display: inline-block;

      white-space: nowrap;
    }

    /* =====================================================
       HIDE DESKTOP ITEMS
    ====================================================== */

    .header-right,
    .header-theme-area {
      display: none;
    }

    /* =====================================================
       MOBILE HEADER ACTIONS

       CONTACT → THEME → MENU
    ====================================================== */

    .mobile-header-actions {
      position: relative;

      z-index: 5102;

      grid-column: 2;

      display: flex;

      align-items: center;
      justify-content: flex-end;

      gap: clamp(5px, 1.5vw, 10px);

      min-width: 0;
    }

    /*
     * Transparent visual treatment.
     * The 38px hit area is only for usability —
     * there is no visible box.
     */

    .mobile-header-icon {
      width: 38px;
      height: 42px;

      flex: 0 0 38px;

      padding: 0;
      margin: 0;

      border: 0;

      display: inline-flex;

      align-items: center;
      justify-content: center;

      background: transparent;

      color: #ffffff;

      text-decoration: none;

      cursor: pointer;

      -webkit-tap-highlight-color: transparent;

      transition:
        opacity 0.2s ease,
        color 0.2s ease;
    }

    :global(body.light) .mobile-header-icon {
      color: #050505;
    }

    .mobile-contact-svg {
      width: 20px;
      height: 20px;

      display: block;

      fill: none;

      stroke: currentColor;

      stroke-width: 1.45;

      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .mobile-theme-svg {
      width: 19px;
      height: 19px;

      display: block;

      fill: none;

      stroke: currentColor;

      stroke-width: 1.55;

      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /*
     * Once menu opens, keep only the X visible.
     */

    .site-header.mobile-menu-open .mobile-contact-action,
    .site-header.mobile-menu-open .mobile-theme-action {
      opacity: 0;

      pointer-events: none;
    }

    /* =====================================================
       HAMBURGER
    ====================================================== */

    .mobile-menu-toggle {
      position: relative;

      z-index: 5102;

      width: 42px;
      height: 44px;

      flex: 0 0 42px;

      display: inline-flex;

      align-items: center;
      justify-content: flex-end;

      margin: 0;
      padding: 0;

      border: 0;

      background: transparent;

      color: #ffffff;

      cursor: pointer;

      -webkit-tap-highlight-color: transparent;
    }

    :global(body.light) .mobile-menu-toggle {
      color: #050505;
    }

    .mobile-menu-icon {
      width: 29px;
      height: 22px;

      display: block;

      overflow: visible;
    }

    .mobile-menu-line {
      fill: none;

      stroke: currentColor;

      stroke-width: 1.5;

      stroke-linecap: round;

      transform-box: fill-box;

      transform-origin: center;

      transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .mobile-menu-toggle.open .mobile-menu-line-one {
      transform: translateY(5px) rotate(45deg);
    }

    .mobile-menu-toggle.open .mobile-menu-line-two {
      transform: translate(-3px, -5px) rotate(-45deg) scaleX(1.36);
    }

    /* =====================================================
       FULL VIEWPORT MENU
    ====================================================== */

    .mobile-menu-overlay {
      position: fixed;

      z-index: 5000;

      inset: 0;

      width: 100vw;

      height: 100vh;
      height: 100dvh;

      display: flex;

      flex-direction: column;

      padding: calc(72px + env(safe-area-inset-top)) clamp(18px, 5vw, 24px)
        calc(18px + env(safe-area-inset-bottom));

      box-sizing: border-box;

      overflow-x: hidden;
      overflow-y: auto;

      overscroll-behavior: contain;

      background: linear-gradient(
        180deg,
        rgba(8, 9, 13, 0.998),
        rgba(3, 4, 7, 0.998)
      );

      color: #ffffff;

      opacity: 0;

      visibility: hidden;

      pointer-events: none;

      transform: translateY(-10px);

      transition:
        opacity 0.28s ease,
        visibility 0.28s ease,
        transform 0.38s cubic-bezier(0.16, 1, 0.3, 1);

      -webkit-overflow-scrolling: touch;
    }

    :global(body.light) .mobile-menu-overlay {
      background: #ffffff;

      color: #050505;
    }

    .mobile-menu-overlay.open {
      opacity: 1;

      visibility: visible;

      pointer-events: auto;

      transform: translateY(0);
    }

    .mobile-menu-overlay::before,
    .mobile-menu-overlay::after {
      content: none;

      display: none;
    }

    /* =====================================================
       MOBILE MENU
    ====================================================== */

    .mobile-menu-nav {
      --mobile-menu-inset: clamp(44px, 11vw, 60px);

      width: 100%;

      flex: 1;

      display: flex;

      flex-direction: column;

      justify-content: center;
      align-items: flex-start;

      gap: clamp(18px, 4vh, 30px);

      margin: 0;

      padding: clamp(18px, 3vh, 28px) 0 clamp(18px, 3vh, 28px)
        var(--mobile-menu-inset);

      box-sizing: border-box;

      text-align: left;
    }

    .mobile-menu-group {
      width: 100%;

      display: flex;

      flex-direction: column;

      align-items: flex-start;

      margin: 0;
      padding: 0;

      border: 0;

      text-align: left;
    }

    /* =====================================================
       MOBILE PARENT ITEMS
    ====================================================== */

    .mobile-menu-parent {
      width: auto;

      min-height: 0;

      display: inline-block;

      margin: 0;
      padding: 0;

      color: inherit;

      font-size: clamp(1.48rem, 6.35vw, 2.1rem);

      font-weight: 600;

      line-height: 1;

      letter-spacing: -0.04em;

      text-align: left;

      text-decoration: none;

      text-transform: uppercase;

      -webkit-tap-highlight-color: transparent;

      transition: opacity 0.2s ease;
    }

    .mobile-menu-parent:hover,
    .mobile-menu-parent:focus-visible {
      opacity: 0.65;
    }

    .mobile-menu-parent-static {
      cursor: default;
    }

    /* =====================================================
       CONTACT
    ====================================================== */

    .mobile-menu-parent.mobile-contact-link {
      text-decoration-line: underline;

      text-decoration-color: #0043ff;

      text-decoration-thickness: 1px;

      text-underline-offset: 6px;

      text-decoration-skip-ink: auto;
    }

    /* =====================================================
       CHILD ITEMS
    ====================================================== */

    .mobile-menu-children {
      width: 100%;

      display: flex;

      flex-direction: column;

      align-items: flex-start;

      gap: 12px;

      margin-top: 13px;

      padding: 0;

      text-align: left;
    }

    .mobile-menu-children a {
      width: auto;

      min-height: 0;

      display: block;

      margin: 0;
      padding: 0;

      color: rgba(255, 255, 255, 0.5);

      font-size: clamp(0.73rem, 3vw, 0.85rem);

      font-weight: 600;

      line-height: 1.4;

      letter-spacing: 0.035em;

      text-align: left;

      text-decoration: none;

      text-transform: uppercase;

      transition:
        color 0.2s ease,
        opacity 0.2s ease;
    }

    :global(body.light) .mobile-menu-children a {
      color: rgba(0, 0, 0, 0.5);
    }

    .mobile-menu-children a:hover,
    .mobile-menu-children a:focus-visible {
      color: #ffffff;

      opacity: 1;
    }

    :global(body.light) .mobile-menu-children a:hover,
    :global(body.light) .mobile-menu-children a:focus-visible {
      color: #000000;
    }

    /* =====================================================
       MOBILE LANGUAGE SWITCH
    ====================================================== */

    .lang-switch {
      display: none;
    }

    .mobile-language-switcher {
      position: fixed;

      z-index: 5200;

      right: max(14px, env(safe-area-inset-right));

      bottom: max(14px, env(safe-area-inset-bottom));

      min-width: 48px;
      height: 42px;

      padding: 0 10px;

      display: inline-flex;

      align-items: center;
      justify-content: center;

      gap: 0.3em;

      border: 1px solid rgba(0, 67, 255, 0.82);

      background: rgba(4, 5, 8, 0.9);

      color: #ffffff;

      text-decoration: none;

      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.24);

      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }

    :global(body.light) .mobile-language-switcher {
      background: rgba(255, 255, 255, 0.96);

      color: #000000;
    }
  }

  /* =========================================================
     VERY NARROW MOBILE
  ========================================================= */

  @media (max-width: 390px) {
    .header-grid,
    .site-header:not(.no-theme-control) .header-grid,
    .site-header.no-theme-control .header-grid {
      padding: 0 12px;
    }

    .mobile-header-actions {
      gap: 2px;
    }

    .mobile-header-icon {
      width: 34px;

      flex-basis: 34px;
    }

    .mobile-menu-toggle {
      width: 38px;

      flex-basis: 38px;
    }

    .brand-block {
      max-width: calc(100vw - 148px);
    }

    .brand {
      font-size: 0.76rem;
    }

    .brand-subtext-mobile {
      font-size: 0.39rem;
    }
  }

  /* =========================================================
     SHORT MOBILE VIEWPORT
  ========================================================= */

  @media (max-width: 640px) and (max-height: 720px) {
    .mobile-menu-nav {
      gap: 14px;

      padding-top: 12px;
      padding-bottom: 12px;
    }

    .mobile-menu-parent {
      font-size: clamp(1.28rem, 5.5vw, 1.7rem);
    }

    .mobile-menu-children {
      margin-top: 8px;

      gap: 8px;
    }

    .mobile-menu-children a {
      font-size: clamp(0.66rem, 2.6vw, 0.76rem);
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    .brand,
    .brand-dot,
    .brand-subtext,
    .dropdown-panel,
    .dropdown-trigger,
    .dropdown-arrow,
    .menu-label,
    .main-nav a,
    .mobile-language-switcher,
    .mobile-menu-overlay,
    .mobile-menu-line,
    .mobile-menu-parent,
    .mobile-menu-children a,
    .mobile-header-icon {
      transition-duration: 0.01ms;

      animation-duration: 0.01ms;

      animation-iteration-count: 1;
    }
  }
</style>

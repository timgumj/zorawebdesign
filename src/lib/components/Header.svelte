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
   * [DE] means the current page is English.
   * [EN] means the current page is German.
   */
  let isEnglishPage = $derived(clean(nav.languageLabel).toUpperCase() === "DE");

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
    {
      href: nav.contactLink || "#contact",
      label: clean(nav.contact),
      id: "contact",
      title: `Zum Abschnitt ${clean(nav.contact)} springen`,
    },
  ]);

  let projectsMenu = $derived({
    label: clean(nav.projects || (isEnglishPage ? "PROJECTS" : "PROJEKTE")),

    items: isEnglishPage
      ? [
          {
            label: "ALL PROJECTS",
            href: "/en-2/#projects",
            title: "View all projects",
          },
          {
            label: "FEATURED PROJECT",
            href: "/en-2/featured-project/",
            title: "View the featured project",
          },
        ]
      : [
          {
            label: "ALLE PROJEKTE",
            href: "/#projects",
            title: "Alle Projekte ansehen",
          },
          {
            label: "REFERENZPROJEKT",
            href: "/referenzprojekt/",
            title: "Referenzprojekt ansehen",
          },
        ],
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
    if (mobileMenuOpen && window.innerWidth > 640) {
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

  onMount(() => {
    setActiveFromHash();

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

    const sections = navItems
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

      unlockMobileScroll();

      window.removeEventListener("hashchange", setActiveFromHash);

      window.removeEventListener("resize", handleViewportChange);

      window.removeEventListener("scroll", handleViewportChange);

      document.removeEventListener("pointerdown", handleDocumentPointerDown);

      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  });
</script>

<header class="site-header" class:mobile-menu-open={mobileMenuOpen}>
  <div class="header-grid">
    <!-- LOGO -->

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

        <!-- DESKTOP / TABLET TAGLINE -->

        <span class="brand-subtext brand-subtext-desktop">
          {clean(nav.tagline)}
        </span>

        <!-- MOBILE TAGLINE -->

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

    <!-- MOBILE HAMBURGER -->

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
        <path class="mobile-menu-line mobile-menu-line-one" d="M3 7H29"></path>

        <path class="mobile-menu-line mobile-menu-line-two" d="M10 17H29"
        ></path>
      </svg>
    </button>

    <!-- DESKTOP / TABLET NAVIGATION -->

    <div class="header-right">
      <nav class="main-nav" aria-label="Main navigation">
        {#each navItems as item, index}
          {#if item.id === "projects"}
            <div
              bind:this={projectDropdownElement}
              class="nav-dropdown"
              class:open={projectsOpen}
              style={`--mobile-dropdown-top: ${projectMobileDropdownTop}px; --mobile-dropdown-left: ${projectMobileDropdownLeft}px;`}
            >
              <button
                bind:this={projectDropdownTriggerElement}
                type="button"
                class="dropdown-trigger"
                class:active={activeSection === "projects"}
                aria-label={`${projectsOpen ? "Close" : "Open"} ${projectsMenu.label} menu`}
                aria-expanded={projectsOpen}
                aria-controls="website-projects-dropdown-panel"
                onclick={toggleProjects}
              >
                <span class="menu-label">
                  {projectsMenu.label}
                </span>

                <span class="dropdown-arrow" aria-hidden="true"></span>
              </button>

              <div
                id="website-projects-dropdown-panel"
                class="dropdown-panel"
                aria-hidden={!projectsOpen}
              >
                {#each projectsMenu.items as menuItem}
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
          {:else}
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
          {/if}

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
      {#each navItems as item}
        {#if item.id === "projects"}
          <section class="mobile-menu-group">
            <a
              href={item.href}
              class="mobile-menu-parent"
              class:active={activeSection === item.id}
              tabindex={mobileMenuOpen ? 0 : -1}
              onclick={(event) => handleMobileNavClick(event, item)}
            >
              {projectsMenu.label}
            </a>

            <div class="mobile-menu-children">
              {#each projectsMenu.items as menuItem}
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
        {:else}
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
        {/if}
      {/each}
    </nav>
  </div>
</header>

<!-- MOBILE LANGUAGE SWITCH -->

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
  .mobile-menu-toggle,
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

    background: radial-gradient(
        circle at 18% 0%,
        rgba(32, 32, 32, 0.075),
        transparent 32%
      ),
      linear-gradient(180deg, rgba(9, 10, 14, 0.96), rgba(4, 5, 8, 0.94));

    border-bottom: 0;

    backdrop-filter: blur(18px);

    -webkit-backdrop-filter: blur(18px);

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

    grid-template-columns:
      1fr
      auto;

    align-items: stretch;

    box-sizing: border-box;

    border-left: 1px solid rgba(255, 255, 255, 0.08);

    border-right: 1px solid rgba(255, 255, 255, 0.08);
  }

  :global(body.light) .header-grid {
    border-left-color: rgba(0, 0, 0, 0.1);

    border-right-color: rgba(0, 0, 0, 0.1);
  }

  .header-left,
  .header-right {
    min-height: 78px;

    display: flex;

    align-items: center;
  }

  .header-left {
    padding: 0 24px;

    border-right: 1px solid rgba(255, 255, 255, 0.08);
  }

  :global(body.light) .header-left {
    border-right-color: rgba(0, 0, 0, 0.1);
  }

  .header-right {
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

    gap: 5px;

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

    gap: 28px;
  }

  .main-nav > a,
  .dropdown-trigger,
  .lang-link {
    color: #ffffff;

    font-family: inherit;

    line-height: 1;

    letter-spacing: -0.005em;

    text-decoration: none;

    transition:
      color 0.2s ease,
      opacity 0.2s ease;
  }

  :global(body:not(:has(.homepage-footer))) .main-nav > a,
  :global(body:not(:has(.homepage-footer))) .dropdown-trigger,
  :global(body:not(:has(.homepage-footer))) .lang-link {
    font-size: 0.96rem;

    font-weight: 600;
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
     DESKTOP HOVER
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

    margin-left: 8px;

    padding-left: 22px;

    border-left: 1px solid rgba(255, 255, 255, 0.08);

    display: flex;

    align-items: center;
  }

  .lang-link {
    display: inline-flex;

    align-items: center;

    gap: 0.34em;
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (max-width: 900px) {
    .site-header::after {
      display: none;
    }

    .header-grid {
      width: min(100%, calc(100% - 28px));

      grid-template-columns: 1fr;
    }

    .header-left {
      min-height: auto;

      padding: 16px 18px;

      border-right: 0;

      justify-content: center;

      text-align: center;
    }

    .header-right {
      min-height: auto;

      padding: 0;

      justify-content: center;
    }

    .brand-block {
      align-items: center;
    }

    .brand {
      font-size: 1.05rem;

      justify-content: center;
    }

    .brand-subtext {
      text-align: center;
    }

    .main-nav {
      width: 100%;

      min-height: auto;

      display: flex;

      flex-wrap: nowrap;

      justify-content: center;

      gap: 22px;

      padding: 14px 18px;

      overflow-x: auto;

      white-space: nowrap;

      scrollbar-width: none;
    }

    .main-nav::-webkit-scrollbar {
      display: none;
    }

    .dropdown-panel {
      position: fixed;

      z-index: 5000;

      top: var(--mobile-dropdown-top);

      left: var(--mobile-dropdown-left);

      width: 200px;

      transform: translate(-50%, 6px);
    }

    .nav-dropdown.open .dropdown-panel {
      transform: translate(-50%, 0);
    }
  }

  /* =========================================================
     <=1024 SUPPORT
  ========================================================= */

  @media (max-width: 1024px) {
    .header-grid,
    .header-left,
    .lang-switch,
    .dropdown-panel,
    .dropdown-panel a {
      border: 0;
    }

    .header-right {
      border-top: 1px solid rgba(255, 255, 255, 0.08);

      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    :global(body.light) .header-right {
      border-color: rgba(0, 0, 0, 0.1);
    }
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
    font-size: 13px;

    font-weight: var(--weight-semibold);
  }

  .main-nav > a.contact-nav-link {
    text-decoration-line: underline;

    text-decoration-color: #0043ff;

    text-decoration-thickness: 1px;

    text-underline-offset: 4px;
  }

  /* =========================================================
     MOBILE ONLY
     <= 640PX
  ========================================================= */

  @media (max-width: 640px) {
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

    .header-grid {
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

      padding: 0 clamp(14px, 4vw, 20px);

      border: 0;

      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      box-sizing: border-box;
    }

    :global(body.light) .header-grid {
      border-bottom-color: rgba(0, 0, 0, 0.1);
    }

    /* =====================================================
       COMPACT MOBILE LOGO
    ====================================================== */

    .header-left {
      min-width: 0;

      min-height: 72px;

      padding: 0;

      border: 0;

      display: flex;

      justify-content: flex-start;

      text-align: left;
    }

    /*
     * Natural logo width.
     * Do NOT stretch ZORA and WEBDESIGN.
     */

    .brand-block {
      width: max-content;

      max-width: calc(100vw - 90px);

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

      font-size: clamp(0.82rem, 3.35vw, 0.96rem);

      letter-spacing: 0.005em;

      white-space: nowrap;
    }

    /*
     * Hide incoming page tagline on mobile.
     * Mobile always uses:
     * SEO • WEB DESIGN • BRANDING
     */

    .brand-subtext-desktop {
      display: none;
    }

    /*
     * Same width as compact logo above.
     *
     * Individual words remain compact.
     * Only the spaces between the three
     * groups expand slightly.
     */

    .brand-subtext-mobile {
      width: 100%;

      display: flex;

      align-items: center;

      justify-content: space-between;

      gap: 4px;

      margin: 0;

      color: rgba(255, 255, 255, 0.46);

      font-size: clamp(0.42rem, 1.55vw, 0.49rem);

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

    /*
     * The groups themselves remain compact.
     */

    .brand-subtext-mobile span {
      display: inline-block;

      white-space: nowrap;
    }

    /* =====================================================
       HIDE NORMAL NAV
    ====================================================== */

    .header-right {
      display: none;
    }

    /* =====================================================
       TWO-LINE HAMBURGER
    ====================================================== */

    .mobile-menu-toggle {
      position: relative;

      z-index: 5102;

      width: 44px;
      height: 44px;

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
      width: 30px;
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
       MENU
       LEFT ALIGNED
       VERTICALLY CENTERED
    ====================================================== */

    .mobile-menu-nav {
      /*
       * Extra offset protects space
       * around the theme switch on the
       * far-left edge.
       */

      --mobile-menu-inset: clamp(44px, 11vw, 60px);

      width: 100%;

      flex: 1;

      display: flex;

      flex-direction: column;

      justify-content: center;

      align-items: flex-start;

      gap: clamp(21px, 4.6vh, 34px);

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
       PARENT ITEMS
    ====================================================== */

    .mobile-menu-parent {
      width: auto;

      min-height: 0;

      display: inline-block;

      margin: 0;

      padding: 0;

      color: inherit;

      font-size: clamp(1.55rem, 6.75vw, 2.2rem);

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

      gap: 13px;

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
     SHORT MOBILE VIEWPORT
  ========================================================= */

  @media (max-width: 640px) and (max-height: 720px) {
    .mobile-menu-nav {
      gap: 16px;

      padding-top: 12px;

      padding-bottom: 12px;
    }

    .mobile-menu-parent {
      font-size: clamp(1.35rem, 5.8vw, 1.8rem);
    }

    .mobile-menu-children {
      margin-top: 8px;

      gap: 9px;
    }

    .mobile-menu-children a {
      font-size: clamp(0.68rem, 2.7vw, 0.78rem);
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
    .mobile-menu-children a {
      transition-duration: 0.01ms;

      animation-duration: 0.01ms;

      animation-iteration-count: 1;
    }
  }
</style>

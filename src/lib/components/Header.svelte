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
    return String(text ?? "").replace(/[\[\]*]/g, "");
  }

  let activeSection = $state("");

  let brandClicked = $state(false);

  let freebiesOpen = $state(false);
  let projectsOpen = $state(false);

  let dropdownElement = $state(null);
  let dropdownTriggerElement = $state(null);

  let projectDropdownElement = $state(null);
  let projectDropdownTriggerElement = $state(null);

  let mobileDropdownTop = $state(0);
  let mobileDropdownLeft = $state(0);

  let projectMobileDropdownTop = $state(0);
  let projectMobileDropdownLeft = $state(0);

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
            title: "View the Eva Eichinger featured project",
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
            title: "Das Referenzprojekt Eva Eichinger ansehen",
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

  function animateBrand() {
    brandClicked = true;

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
    if (event.key !== "Escape" || (!freebiesOpen && !projectsOpen)) {
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

      window.removeEventListener("hashchange", setActiveFromHash);

      window.removeEventListener("resize", handleViewportChange);

      window.removeEventListener("scroll", handleViewportChange);

      document.removeEventListener("pointerdown", handleDocumentPointerDown);

      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  });
</script>

<header class="site-header">
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

        <span class="brand-subtext">
          {clean(nav.tagline)}
        </span>
      </a>
    </div>

    <!-- NAVIGATION -->

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

  .mobile-language-switcher {
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

    /*
     * IMPORTANT:
     * No full-browser-width bottom border.
     * Desktop bottom line is created with ::after.
     */
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
     SAME WIDTH AS HERO + SERVICES
     DESKTOP ONLY
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
     SAME DESKTOP WIDTH AS HERO + SERVICES
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
  }

  /* =========================================================
     OUTER VERTICAL LINES
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

  /* =========================================================
     LOGO / NAV SEPARATOR
  ========================================================= */

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
     BRAND CLICK ANIMATION
  ========================================================= */

  .brand-clicked .brand {
    animation: brandPulse 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .brand-clicked .brand-dot {
    animation: dotPulse 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .brand-clicked::after {
    content: "";

    position: absolute;

    top: 50%;
    left: -14px;

    width: 34px;
    height: 34px;

    border: 1px solid rgba(255, 255, 255, 0.32);

    border-radius: 50%;

    opacity: 0;

    transform: translateY(-50%) scale(0.65);

    animation: brandRing 0.6s ease;

    pointer-events: none;
  }

  :global(body.light) .brand-clicked::after {
    border-color: rgba(0, 67, 255, 0.28);
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

  @keyframes brandRing {
    0% {
      opacity: 0.45;

      transform: translateY(-50%) scale(0.65);
    }

    100% {
      opacity: 0;

      transform: translateY(-50%) scale(1.35);
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

    text-transform: none;

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

  /* =========================================================
     NORMAL MENU ITEMS
  ========================================================= */

  .main-nav > a {
    position: relative;

    display: inline-flex;

    align-items: center;

    gap: 0.32em;

    white-space: nowrap;
  }

  /*
   * NO BLUE HOVER UNDERLINE
   */
  .main-nav > a::after,
  .main-nav > a:hover::after,
  .main-nav > a.active::after,
  .lang-link::after,
  .lang-link:hover::after,
  .lang-link.active::after {
    content: none;

    display: none;
  }

  .main-nav > a:hover,
  .main-nav > a.active {
    color: #ffffff;
  }

  :global(body.light) .main-nav > a:hover,
  :global(body.light) .main-nav > a.active {
    color: #000000;
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
     DROPDOWN WRAPPER
  ========================================================= */

  .nav-dropdown {
    position: relative;

    min-height: 78px;

    display: flex;

    align-items: center;
  }

  /* =========================================================
     DROPDOWN TRIGGER
  ========================================================= */

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

    -webkit-tap-highlight-color: transparent;

    transition:
      color 0.2s ease,
      opacity 0.2s ease,
      transform 0.22s ease;
  }

  .dropdown-trigger:hover,
  .dropdown-trigger.active,
  .nav-dropdown.open .dropdown-trigger {
    color: #ffffff;
  }

  :global(body.light) .dropdown-trigger:hover,
  :global(body.light) .dropdown-trigger.active,
  :global(body.light) .nav-dropdown.open .dropdown-trigger {
    color: #000000;
  }

  .dropdown-trigger:hover .menu-label {
    transform: translateY(-1px);
  }

  /* =========================================================
     BLUE DROPDOWN ARROW
  ========================================================= */

  .dropdown-arrow {
    width: 6px;
    height: 6px;

    margin: 0 0.13em 3px 0.12em;

    display: inline-block;

    flex: 0 0 auto;

    border-right: 1.5px solid #0043ff;

    border-bottom: 1.5px solid #0043ff;

    transform: rotate(45deg);

    transform-origin: center;

    transition:
      transform 0.2s ease,
      margin 0.2s ease;

    color: #0043ff;
  }

  .nav-dropdown.open .dropdown-arrow {
    margin-bottom: -2px;

    transform: rotate(225deg);
  }

  .dropdown-trigger:focus-visible {
    outline: 1px solid #0043ff;

    outline-offset: 6px;
  }

  /* =========================================================
     DROPDOWN PANEL
     NEUTRAL ONLY
  ========================================================= */

  .dropdown-panel {
    position: absolute;

    z-index: 1020;

    top: calc(100% - 6px);

    left: -12px;

    min-width: 220px;

    display: grid;

    gap: 0;

    padding: 8px 0;

    border: 1px solid rgba(255, 255, 255, 0.1);

    background: rgba(5, 6, 10, 0.98);

    box-shadow: 0 18px 42px rgba(0, 0, 0, 0.22);

    backdrop-filter: blur(10px);

    -webkit-backdrop-filter: blur(10px);

    opacity: 0;

    visibility: hidden;

    pointer-events: none;

    transform: translateY(6px);

    transition:
      opacity 0.18s ease,
      visibility 0.18s ease,
      transform 0.18s ease;
  }

  :global(body.light) .dropdown-panel {
    border-color: rgba(0, 0, 0, 0.12);

    background: rgba(255, 255, 255, 0.99);

    box-shadow: 0 18px 42px rgba(0, 0, 0, 0.1);
  }

  .dropdown-panel a {
    min-height: 42px;

    display: inline-flex;

    align-items: center;

    gap: 0.38em;

    padding: 0 14px;

    border-bottom: 1px solid rgba(255, 255, 255, 0.06);

    color: #ffffff;

    line-height: 1.2;

    text-decoration: none;

    text-transform: none;

    box-shadow: none;

    transition:
      background 0.18s ease,
      color 0.18s ease,
      padding-left 0.18s ease;
  }
  :global(body:not(:has(.homepage-footer))) .dropdown-panel a {
    font-size: 0.84rem;
    font-weight: 600;
  }

  .dropdown-panel a:last-child {
    border-bottom: 0;
  }

  :global(body.light) .dropdown-panel a {
    border-bottom-color: rgba(0, 0, 0, 0.07);

    color: #000000;
  }

  .dropdown-panel a:hover,
  .dropdown-panel a:focus-visible {
    background: rgba(255, 255, 255, 0.055);

    color: #ffffff;

    padding-left: 17px;

    box-shadow: none;
  }

  :global(body.light) .dropdown-panel a:hover,
  :global(body.light) .dropdown-panel a:focus-visible {
    background: rgba(0, 0, 0, 0.045);

    color: #000000;
  }

  .dropdown-panel a::after,
  .dropdown-panel a:hover::after,
  .dropdown-panel a:focus::after,
  .dropdown-panel a:focus-visible::after {
    content: none;

    display: none;

    opacity: 0;

    transform: none;
  }

  .dropdown-panel a:hover span {
    transform: none;
  }

  .nav-dropdown.open .dropdown-panel {
    opacity: 1;

    visibility: visible;

    pointer-events: auto;

    transform: translateY(0);
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

    .nav-dropdown:hover .dropdown-arrow,
    .nav-dropdown:focus-within .dropdown-arrow {
      margin-bottom: -2px;

      transform: rotate(225deg);
    }
  }

  /* =========================================================
     LANGUAGE SWITCH
  ========================================================= */

  .lang-switch {
    min-height: 78px;

    margin-left: 8px;

    padding-left: 22px;

    border-left: 1px solid rgba(255, 255, 255, 0.08);

    display: flex;

    align-items: center;
  }

  :global(body.light) .lang-switch {
    border-left-color: rgba(0, 0, 0, 0.1);
  }

  .lang-link {
    position: relative;

    display: inline-flex;

    align-items: center;

    gap: 0.34em;

    white-space: nowrap;
  }

  .lang-link:hover {
    color: #ffffff;
  }

  :global(body.light) .lang-link:hover {
    color: #000000;
  }

  .lang-link .language-globe {
    stroke: #0043ff;
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (max-width: 900px) {
    .site-header {
      overflow: visible;
    }

    /*
     * Desktop architectural bottom line
     * is not needed on tablet/mobile.
     */
    .site-header::after {
      display: none;
    }

    .header-grid {
      width: min(100%, calc(100% - 28px));

      grid-template-columns: 1fr;

      overflow: visible;
    }

    /*
     * Desktop outer edge rails disappear.
     */
    .header-grid::before,
    .header-grid::after {
      display: none;
    }

    /*
     * Tablet separator between logo
     * and navigation remains.
     */
    .header-left {
      min-height: auto;

      padding: 16px 18px;

      border-right: none;

      border-bottom: 1px solid rgba(255, 255, 255, 0.08);

      justify-content: center;

      text-align: center;
    }

    :global(body.light) .header-left {
      border-bottom-color: rgba(0, 0, 0, 0.1);
    }

    .header-right {
      min-height: auto;

      padding: 0;

      justify-content: center;

      overflow: visible;
    }

    .brand-block {
      max-width: 100%;

      align-items: center;
    }

    .brand {
      font-size: 1.05rem;

      justify-content: center;

      text-align: center;
    }

    .brand-subtext {

      text-align: center;
    }
    :global(body:not(:has(.homepage-footer))) .brand-subtext {
      font-size: 0.63rem;
    }

    .main-nav {
      width: 100%;

      min-height: auto;

      display: flex;

      flex-wrap: nowrap;

      justify-content: center;

      gap: 18px;

      padding: 14px 18px;

      overflow-x: auto;
      overflow-y: hidden;

      white-space: nowrap;

      scrollbar-width: none;

      -webkit-overflow-scrolling: touch;
    }

    .main-nav::-webkit-scrollbar {
      display: none;
    }

    .main-nav > a,
    .dropdown-trigger,
    .lang-link {
      flex: 0 0 auto;
    }
    :global(body:not(:has(.homepage-footer))) .main-nav > a,
  :global(body:not(:has(.homepage-footer))) .dropdown-trigger,
  :global(body:not(:has(.homepage-footer))) .lang-link {
      font-size: 0.82rem;
      font-weight: 600;
    }

    .main-nav > a:hover .menu-label,
    .dropdown-trigger:hover .menu-label {
      transform: translateY(-1px);
    }

    .nav-dropdown {
      position: relative;

      min-height: auto;

      flex: 0 0 auto;
    }

    .dropdown-panel {
      position: fixed;

      z-index: 5000;

      top: var(--mobile-dropdown-top);

      left: var(--mobile-dropdown-left);

      width: 200px;

      min-width: 0;

      max-width: calc(100vw - 24px);

      transform: translate(-50%, 6px);
    }

    .nav-dropdown.open .dropdown-panel {
      transform: translate(-50%, 0);
    }

    .lang-switch {
      min-height: auto;

      margin-left: 0;

      padding-left: 16px;

      flex: 0 0 auto;
    }

    .lang-link {
      padding: 0;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 640px) {
    .site-header {
      position: sticky;
    }

    .header-grid {
      width: 100%;
    }

    .header-left {
      padding: 14px 12px;
    }

    .header-right {
      padding: 0;
    }

    .brand {
      font-size: 0.88rem;

      justify-content: center;

      text-align: center;
    }

    .brand-subtext {

      letter-spacing: 0.06em;

      text-align: center;
    }
    :global(body:not(:has(.homepage-footer))) .brand-subtext {
      font-size: 0.61rem;
    }

    .main-nav {
      gap: 14px;

      padding: 12px 14px;

      justify-content: center;
    }
    :global(body:not(:has(.homepage-footer))) .main-nav > a,
  :global(body:not(:has(.homepage-footer))) .dropdown-trigger {
      font-size: 0.76rem;
      font-weight: 600;
    }

    .dropdown-arrow {
      width: 5px;
      height: 5px;

      border-right-width: 1.4px;

      border-bottom-width: 1.4px;
    }

    .dropdown-panel {
      width: 184px;
    }

    .dropdown-panel a {
      min-height: 42px;

      padding: 0 13px;
    }
    :global(body:not(:has(.homepage-footer))) .dropdown-panel a {
      font-size: 0.8rem;
      font-weight: 600;
    }

    /* =====================================================
       HIDE REGULAR LANGUAGE SWITCH
    ====================================================== */

    .lang-switch {
      display: none;
    }

    /* =====================================================
       FIXED MOBILE LANGUAGE SWITCH
    ====================================================== */

    .mobile-language-switcher {
      position: fixed;

      z-index: 1200;

      right: max(14px, env(safe-area-inset-right));

      bottom: max(14px, env(safe-area-inset-bottom));

      width: auto;

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

      font-family: inherit;

      line-height: 1;

      letter-spacing: 0;

      text-decoration: none;

      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.24);

      backdrop-filter: blur(14px);

      -webkit-backdrop-filter: blur(14px);

      -webkit-tap-highlight-color: transparent;

      transition:
        color 0.2s ease,
        border-color 0.2s ease,
        background 0.2s ease,
        transform 0.2s ease;
    }
    :global(body:not(:has(.homepage-footer))) .mobile-language-switcher {
      font-size: 0.72rem;
      font-weight: 600;
    }

    .mobile-language-switcher:hover {
      color: #ffffff;

      transform: translateY(-2px);
    }

    :global(body.light) .mobile-language-switcher {
      background: rgba(255, 255, 255, 0.96);

      color: #000000;

      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
    }

    :global(body.light) .mobile-language-switcher:hover {
      color: #000000;
    }

    .mobile-language-switcher::after {
      content: none;

      display: none;
    }

    .mobile-language-switcher .language-globe {
      stroke: #0043ff;
    }

    .mobile-language-switcher:focus-visible {
      outline: 2px solid #0043ff;

      outline-offset: 3px;
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
    .mobile-language-switcher {
      transition-duration: 0.01ms;

      animation-duration: 0.01ms;

      animation-iteration-count: 1;
    }
  }

  @media (max-width: 1024px) {
    .site-header::after,
    .header-grid::before,
    .header-grid::after {
      display: none;
    }

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
      border-top-color: rgba(0, 0, 0, 0.1);
      border-bottom-color: rgba(0, 0, 0, 0.1);
    }
  }

  @media (max-width: 1024px) {
    .header-grid {
      grid-template-columns: 1fr;
    }

    .header-left,
    .header-right {
      min-height: auto;
      justify-content: center;
      box-sizing: border-box;
    }

    .header-left {
      padding: 16px 12px;
      text-align: center;
    }

    .header-right {
      padding: 0;
    }

    .brand-block {
      max-width: 100%;
      align-items: center;
      text-align: center;
    }

    .brand,
    .brand-subtext {
      justify-content: center;
      text-align: center;
    }

    .main-nav {
      width: 100%;
      min-height: auto;
      box-sizing: border-box;
      justify-content: center;
      padding: 14px 18px;
      gap: 18px;
    }

    .lang-switch {
      min-height: auto;
    }
  }

  @media (max-width: 767px) {
    .main-nav {
      gap: clamp(6px, 2vw, 12px);
      padding: 12px 10px;
    }

    .main-nav > a,
    .dropdown-trigger,
    .lang-link {
      text-align: center;
      justify-content: center;
    }
    :global(body:not(:has(.homepage-footer))) .main-nav > a,
  :global(body:not(:has(.homepage-footer))) .dropdown-trigger,
  :global(body:not(:has(.homepage-footer))) .lang-link {
      font-size: calc(0.76rem - 2px);
    }
  }

  @media (max-width: 767px) {
    .dropdown-panel a {
      min-height: 28px;
      padding-block: 4px;
    }
    :global(body:not(:has(.homepage-footer))) .dropdown-panel a {
      font-size: calc(0.76rem - 2px);
    }
  }

  /* Shared homepage typography; other routes retain their existing styles. */
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

  @media (max-width: 767px) {
    :global(body:has(.homepage-footer)) .main-nav > a,
  :global(body:has(.homepage-footer)) .dropdown-trigger,
  :global(body:has(.homepage-footer)) .lang-link,
  :global(body:has(.homepage-footer)) .dropdown-panel a {
      font-size: 12px;
    }
}


  .main-nav > a.contact-nav-link {
    text-decoration-line: underline;
    text-decoration-color: #0043ff;
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
  }
</style>

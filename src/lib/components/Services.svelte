<script>
  import { onMount, tick } from "svelte";

  let {
    title,

    subtitle,

    eyebrow = "",

    services = [],

    stats = null,

    experienceLabel = "Experience point",

    toolsLabel = "TOOLS",

    toolsAlt = "Tools",

    serviceKeywordsLabel = "Service keywords",

    serviceDescriptionToggleLabel = "Leistungsbeschreibung ein- oder ausblenden",

    extraExperienceItems = [
      { title: "All in one solution" },

      { title: "Agency quality" },
    ],

    serviceKeywords = {
      "web design": [
        "UI Design",

        "UX",

        "Responsive",

        "Brand Look",

        "Wireframes",
      ],

      "web development": [
        "SvelteKit",

        "WordPress",

        "Frontend",

        "Backend",

        "Clean Code",
      ],

      wordpress: ["Themes", "Plugins", "CMS", "WooCommerce"],

      seo: ["Keywords", "On Page SEO", "Analytics", "Performance", "Search"],

      ecommerce: ["Shopify", "WooCommerce", "Checkout", "Products", "Payments"],

      branding: ["Logo", "Identity", "Typography", "Colors", "Style Guide"],

      marketing: ["Campaigns", "Ads", "Content", "Tracking", "Growth"],
    },

    fallbackServiceTags = ["Strategy", "Design", "Build", "Optimize"],

    problemEyebrow = "WIE ICH DIR HELFEN KANN",

    problemTitle = "DEINE WEBSITE SOLLTE DEINEN ALLTAG EINFACHER MACHEN",

    problemText = "Viele meiner Kundinnen und Kunden kommen zu mir, weil der Weg zur richtigen Website unklar, technisch oder unnötig kompliziert wirkt. Ich begleite dich persönlich und sorge dafür, dass du jederzeit weißt, was als Nächstes passiert.",

    problemListTitle = "KOMMEN DIR DIESE HERAUSFORDERUNGEN BEKANNT VOR?",

    problemNarrativeLead = null,

    problemNarrativeOr = null,

    problemNarrativeEnd = null,

    problemCloseLabel = null,

    problemLabel = "DAS PROBLEM",

    solutionLabel = "MEINE LÖSUNG",

    bookCallHref = "https://calendly.com/timgum-julius/get-to-know-meeting",

    problemItems = [
      {
        title: "DU WEISST NICHT, WO DU ANFANGEN SOLLST",

        trigger: "Planung",

        problem:
          "Du möchtest eine neue Website, aber Seiten, Inhalte, Funktionen und Kosten wirken schnell überwältigend.",

        solution:
          "Ich strukturiere dein Projekt gemeinsam mit dir, erkläre die nächsten Schritte verständlich und entwickle eine klare Lösung, die zu deinen tatsächlichen Zielen passt.",
      },

      {
        title: "DEINE BESTEHENDE WEBSITE FUNKTIONIERT NICHT MEHR FÜR DICH",

        trigger: "Redesign",

        problem:
          "Das Design wirkt veraltet, Inhalte sind unübersichtlich oder einzelne Bereiche funktionieren nicht mehr zuverlässig.",

        solution:
          "Ich prüfe, was erhalten werden kann, überarbeite Design und Struktur und bringe deine Website technisch und visuell wieder auf einen professionellen Stand.",
      },

      {
        title: "DU KANNST INHALTE NICHT EINFACH SELBST ÄNDERN",

        trigger: "Änderungen",

        problem:
          "Für kleine Text- oder Bildänderungen bist du jedes Mal auf einen Entwickler angewiesen.",

        solution:
          "Ich baue deine Website so, dass du wichtige Inhalte selbst bearbeiten kannst, und zeige dir persönlich, wie alles funktioniert.",
      },

      {
        title: "DEINE WEBSITE IST LANGSAM",

        trigger: "Ladezeiten",

        problem:
          "Seiten laden zu lange, Bilder sind zu groß oder technische Altlasten bremsen deine Website aus.",

        solution:
          "Ich optimiere Bilder, Code, Hosting und Ladeprozesse, damit deine Website schneller und angenehmer zu bedienen ist.",
      },

      {
        title: "DIE KOMMUNIKATION MIT DEINEM WEB DESIGNER IST SCHWIERIG",

        trigger: "Kommunikation",

        problem:
          "Antworten kommen erst nach Tagen oder Wochen und du weißt nicht, wie weit dein Projekt ist.",

        solution:
          "Du arbeitest direkt mit mir. Ich kommuniziere klar, gebe regelmäßige Updates und bin während des gesamten Projekts zuverlässig erreichbar.",
      },

      {
        title: "DU MÖCHTEST KEINE UNNÖTIGEN MONATLICHEN ABOS",

        trigger: "Kosten",

        problem:
          "Deine Website soll nicht von laufenden Gebühren für Funktionen abhängen, die du eigentlich gar nicht brauchst.",

        solution:
          "Ich setze auf transparente Kosten und wähle Lösungen ohne unnötige Abhängigkeiten. Laufende Kosten entstehen nur dort, wo sie wirklich sinnvoll oder technisch notwendig sind.",
      },
    ],

    toolsSectionTitle = "TOOLS FÜR DEINE WEBSITE",

    toolsMoreLabel = "MEHR",

    toolsMarqueeTitle = "MEIN DIGITALER TOOLKIT",

    profileName = "JULIUS TIMGUM",

    profileRole = "WEBDESIGN · DEVELOPMENT · WORDPRESS",

    profileImageAlt = "Julius Timgum, freelance web designer and WordPress developer in Vienna",

    toolLinks = [
      {
        title: "WEBSITE-PROJEKTPLANER",

        text: "Beantworte einige einfache Fragen und erhalte eine passende Empfehlung für dein Website-Projekt.",

        href: "/website-konfigurator/",

        linkLabel: "PROJEKT PLANEN",
      },

      {
        title: "KOSTENLOSER WEBSITE-AUDIT",

        text: "Prüfe deine Website auf SEO, Leistung, Sicherheit und Barrierefreiheit.",

        href: "/website-audit/",

        linkLabel: "WEBSITE PRÜFEN",
      },
    ],
  } = $props();

  let headerVisible = $state(false);

  let openProblemIndex = $state(-1);
  let problemPopupLeft = $state(0);
  let problemPopupTop = $state(0);
  let problemPopupAnchorOffset = $state(40);
  let problemPopupPlacement = $state("below");
  let problemPopupReady = $state(false);
  let problemCloseTimer;
  let problemAnchorElement = null;

  let problemStoryVisible = $state(false);
  let aboutOverlayVisible = $state(false);

  const problemLanguage = $derived(
    /the problem|my solution|how i can help/i.test(
      `${problemLabel ?? ""} ${solutionLabel ?? ""} ${problemEyebrow ?? ""}`,
    )
      ? "en"
      : "de",
  );

  const resolvedProblemSectionTitle = $derived(
    problemLanguage === "en"
      ? "The value I bring to your online presence"
      : "Was ich für deinen Online-Auftritt mitbringe",
  );

  const resolvedProblemInstruction = $derived(
    problemLanguage === "en"
      ? "Blue underlines open details · hover or tap"
      : "Blaue Unterstreichungen öffnen Details · Hover oder Tap",
  );

  const problemStoryParts = $derived(
    problemLanguage === "en"
      ? [
          {
            text: "Your website should turn the right ",
          },
          { index: 1, label: "visitors", icon: "globe" },
          {
            text: " into enquiries, let you make simple ",
          },
          { index: 2, label: "edits", icon: "bento" },
          {
            text: " yourself and stay ",
          },
          { index: 3, label: "fast", icon: "speed" },
          {
            text: ". ",
          },
          { index: 0, label: "Planning", icon: "glasses" },
          {
            text: " should be clear, ",
          },
          { index: 4, label: "communication", icon: "chat" },
          {
            text: " direct, and your ",
          },
          { index: 5, label: "budget", icon: "magnifier" },
          {
            text: " transparent without unnecessary subscriptions. With me, you work directly with the person building your website from structure and development to launch and support. Let’s work together, ",
          },
          {
            href: bookCallHref,
            label: "book a call",
            icon: "calendar",
          },
          {
            text: ".",
          },
        ]
      : [
          {
            text: "Deine Website sollte die richtigen ",
          },
          { index: 1, label: "Besucher", icon: "globe" },
          {
            text: " in Anfragen verwandeln, einfache ",
          },
          { index: 2, label: "Änderungen", icon: "bento" },
          {
            text: " ermöglichen und ",
          },
          { index: 3, label: "schnell", icon: "speed" },
          {
            text: " bleiben. Die ",
          },
          { index: 0, label: "Planung", icon: "glasses" },
          {
            text: " sollte klar, die ",
          },
          { index: 4, label: "Kommunikation", icon: "chat" },
          {
            text: " direkt und dein ",
          },
          { index: 5, label: "Budget", icon: "magnifier" },
          {
            text: " transparent sein, ohne unnötige Abos. Bei mir arbeitest du direkt mit der Person, die deine Website baut, von Struktur und Entwicklung bis Launch und Support. Lass uns zusammenarbeiten, ",
          },
          {
            href: bookCallHref,
            label: "Gespräch buchen",
            icon: "calendar",
          },
          {
            text: ".",
          },
        ],
  );

  function getProblemText(item, index) {
    if (index === 1) {
      return problemLanguage === "en"
        ? "The right people may reach your website but leave without enquiring, or your site may not be attracting enough relevant visitors in the first place."
        : "Die richtigen Menschen kommen auf deine Website, verlassen sie aber ohne Anfrage – oder deine Seite erreicht noch nicht genug relevante Besucher.";
    }

    if (index === 5) {
      return problemLanguage === "en"
        ? "A website should not drain your budget through subscriptions, premium tools and recurring extras you do not really need."
        : "Eine Website sollte dein Budget nicht durch Abos, Premium-Tools und laufende Extras belasten, die du eigentlich nicht brauchst.";
    }

    return item?.problem ?? "";
  }

  function getSolutionText(item, index) {
    if (index === 1) {
      return problemLanguage === "en"
        ? "I combine clear messaging, intuitive user journeys, conversion points and solid SEO foundations so the right visitors can find you, understand your offer and take the next step."
        : "Ich verbinde klare Botschaften, intuitive Nutzerführung, gute Conversion-Punkte und eine saubere SEO-Basis, damit die richtigen Besucher dich finden, dein Angebot verstehen und den nächsten Schritt machen.";
    }

    if (index === 5) {
      return problemLanguage === "en"
        ? "I keep costs transparent, use paid tools only where they add real value and make sure your budget goes into the website rather than unnecessary recurring fees."
        : "Ich halte die Kosten transparent, nutze kostenpflichtige Tools nur dort, wo sie echten Mehrwert bringen, und achte darauf, dass dein Budget in die Website statt in unnötige laufende Gebühren fließt.";
    }

    return item?.solution ?? "";
  }

  const resolvedProblemTitle = $derived(
    problemLanguage === "en"
      ? "AVAILABLE FOR YOUR PROJECT"
      : "VERFÜGBAR FÜR DEIN PROJEKT",
  );

  const resolvedProblemCloseLabel = $derived(
    problemCloseLabel ?? (problemLanguage === "en" ? "Close" : "Schließen"),
  );

  onMount(() => {
    const desktopHoverQuery = window.matchMedia("(min-width: 1025px)");

    const resetProblemState = () => {
      window.clearTimeout(problemCloseTimer);
      openProblemIndex = -1;
      problemPopupReady = false;
      problemAnchorElement = null;
    };

    const closeProblemOnEscape = (event) => {
      if (event.key === "Escape") {
        resetProblemState();
      }
    };

    const closeProblemOnOutsidePointer = (event) => {
      if (openProblemIndex < 0) return;

      const target = event.target;

      if (
        target instanceof Element &&
        (target.closest(".problem-trigger") || target.closest(".problem-popup"))
      ) {
        return;
      }

      resetProblemState();
    };

    const closeProblemOnScroll = () => {
      if (openProblemIndex >= 0) {
        resetProblemState();
      }
    };

    desktopHoverQuery.addEventListener("change", resetProblemState);
    window.addEventListener("keydown", closeProblemOnEscape);
    window.addEventListener("pointerdown", closeProblemOnOutsidePointer, true);
    window.addEventListener("resize", resetProblemState);
    window.addEventListener("scroll", closeProblemOnScroll, {
      passive: true,
    });

    return () => {
      window.clearTimeout(problemCloseTimer);
      desktopHoverQuery.removeEventListener("change", resetProblemState);
      window.removeEventListener("keydown", closeProblemOnEscape);
      window.removeEventListener(
        "pointerdown",
        closeProblemOnOutsidePointer,
        true,
      );
      window.removeEventListener("resize", resetProblemState);
      window.removeEventListener("scroll", closeProblemOnScroll);
    };
  });

  let activeServiceIndex = $state(0);

  let openServiceIndex = $state(0);

  function toggleServiceDescription(index) {
    openServiceIndex = openServiceIndex === index ? -1 : index;
  }

  let experienceViewport = $state(null);

  function moveExperience(direction) {
    if (!experienceViewport) return;

    const firstItem = experienceViewport.querySelector(".experience-item");

    if (!firstItem) return;

    const gap = parseFloat(getComputedStyle(experienceViewport).columnGap) || 0;

    const step = firstItem.getBoundingClientRect().width + gap;

    const maxScroll =
      experienceViewport.scrollWidth - experienceViewport.clientWidth;

    if (maxScroll <= 0) return;

    let target = experienceViewport.scrollLeft + direction * step;

    if (direction > 0 && experienceViewport.scrollLeft >= maxScroll - 2) {
      target = 0;
    }

    if (direction < 0 && experienceViewport.scrollLeft <= 2) {
      target = maxScroll;
    }

    experienceViewport.scrollTo({
      left: Math.max(0, Math.min(target, maxScroll)),

      behavior: "smooth",
    });
  }

  function autoplayExperience(node) {
    experienceViewport = node.querySelector(".experience-list");

    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return {
        destroy() {},
      };
    }

    const sliderQuery = window.matchMedia("(max-width: 1024px)");

    let hovered = false;

    let focused = false;

    let resumeTimer;

    const onPointerEnter = () => {
      hovered = true;
    };

    const onPointerLeave = () => {
      hovered = false;
    };

    const onFocusIn = () => {
      focused = true;
    };

    const onFocusOut = () => {
      focused = false;
    };

    const pauseTemporarily = () => {
      if (!sliderQuery.matches) return;

      focused = true;

      window.clearTimeout(resumeTimer);

      resumeTimer = window.setTimeout(() => {
        focused = false;
      }, 7000);
    };

    const interval = window.setInterval(() => {
      if (sliderQuery.matches && !hovered && !focused && !document.hidden) {
        moveExperience(1);
      }
    }, 5200);

    node.addEventListener("pointerenter", onPointerEnter);

    node.addEventListener("pointerleave", onPointerLeave);

    node.addEventListener("focusin", onFocusIn);

    node.addEventListener("focusout", onFocusOut);

    node.addEventListener("pointerdown", pauseTemporarily, { passive: true });

    node.addEventListener("wheel", pauseTemporarily, { passive: true });

    return {
      destroy() {
        window.clearInterval(interval);

        window.clearTimeout(resumeTimer);

        node.removeEventListener("pointerenter", onPointerEnter);

        node.removeEventListener("pointerleave", onPointerLeave);

        node.removeEventListener("focusin", onFocusIn);

        node.removeEventListener("focusout", onFocusOut);

        node.removeEventListener("pointerdown", pauseTemporarily);

        node.removeEventListener("wheel", pauseTemporarily);
      },
    };
  }

  const reorderedServices = $derived(services);

  const normalizedStats = $derived(
    [...(stats?.items ?? []), ...extraExperienceItems]

      .filter((item) => {
        const itemTitle =
          typeof item === "string"
            ? item
            : (item.title ?? item.label ?? item.value ?? "");

        return !["bespoke design", "location independent"].includes(
          itemTitle.toLowerCase().trim(),
        );
      })

      .map((item) => {
        const itemTitle =
          typeof item === "string"
            ? item
            : (item.title ?? item.label ?? item.value ?? "");

        return {
          title: itemTitle,

          label:
            typeof item === "string"
              ? experienceLabel
              : (item.label ?? experienceLabel),
        };
      })

      .slice(0, 4),
  );

  const tools = [
    "/images/google-analytics.png",

    "/images/google-ads.png",

    "/images/hubspot.png",

    "/images/mailchimp.png",

    "/images/openai.png",

    "/images/woocommerce.png",

    "/images/shopify.png",

    "/images/wordpress.png",
  ];

  const marqueeTools = $derived([...tools, ...tools]);

  function observeProblemStory(node) {
    if (typeof IntersectionObserver === "undefined") {
      problemStoryVisible = true;

      return {
        destroy() {},
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          problemStoryVisible = true;
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  function observeAboutOverlay(node) {
    if (typeof IntersectionObserver === "undefined") {
      aboutOverlayVisible = true;

      return {
        destroy() {},
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          aboutOverlayVisible = true;
          observer.disconnect();
        }
      },
      {
        threshold: 0.28,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  function canUseProblemHover() {
    if (typeof window === "undefined") return false;

    return window.innerWidth >= 1025;
  }

  function getProblemTrigger(item, index) {
    const triggerSets = {
      de: [
        "Planung",
        "Besucher",
        "Änderungen",
        "schnell",
        "Kommunikation",
        "Budget",
      ],
      en: ["Planning", "visitors", "edits", "fast", "communication", "budget"],
    };

    return (
      triggerSets[problemLanguage]?.[index] ??
      item?.trigger ??
      (item?.title ?? "").split(/\s+/).slice(0, 2).join(" ")
    );
  }

  function cancelProblemClose() {
    window.clearTimeout(problemCloseTimer);
  }

  function scheduleProblemClose() {
    if (!canUseProblemHover()) return;

    window.clearTimeout(problemCloseTimer);
    problemCloseTimer = window.setTimeout(() => {
      openProblemIndex = -1;
      problemPopupReady = false;
      problemAnchorElement = null;
    }, 160);
  }

  async function positionProblemPopup(anchor, index = openProblemIndex) {
    if (typeof window === "undefined" || !anchor || index < 0) return;

    problemAnchorElement = anchor;
    problemPopupReady = false;

    await tick();

    if (problemAnchorElement !== anchor || openProblemIndex !== index) return;

    const popup = document.getElementById(`problem-popup-panel-${index}`);
    if (!popup) return;

    const anchorRect = anchor.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();

    const isMobile = window.innerWidth <= 767;
    const edge = isMobile ? 12 : 16;
    const gap = isMobile ? 10 : 12;

    let left = anchorRect.left + anchorRect.width / 2 - popupRect.width / 2;

    left = Math.max(
      edge,
      Math.min(left, window.innerWidth - popupRect.width - edge),
    );

    const belowTop = anchorRect.bottom + gap;
    const aboveTop = anchorRect.top - popupRect.height - gap;
    const hasRoomBelow =
      belowTop + popupRect.height <= window.innerHeight - edge;
    const hasRoomAbove = aboveTop >= edge;

    let top = belowTop;
    let placement = "below";

    if (!hasRoomBelow && hasRoomAbove) {
      top = aboveTop;
      placement = "above";
    } else if (!hasRoomBelow) {
      /*
       * Neither side has perfect room. Keep the card inside the viewport
       * while still placing it as close to the selected word as possible.
       */
      top = Math.max(
        edge,
        Math.min(belowTop, window.innerHeight - popupRect.height - edge),
      );

      if (
        Math.abs(anchorRect.top - (top + popupRect.height)) <
        Math.abs(top - anchorRect.bottom)
      ) {
        placement = "above";
      }
    }

    const anchorCenter = anchorRect.left + anchorRect.width / 2;
    const anchorOffset = Math.max(
      24,
      Math.min(anchorCenter - left, popupRect.width - 24),
    );

    problemPopupLeft = left;
    problemPopupTop = top;
    problemPopupAnchorOffset = anchorOffset;
    problemPopupPlacement = placement;
    problemPopupReady = true;
  }

  async function previewProblem(event, index) {
    if (!canUseProblemHover()) return;

    cancelProblemClose();

    const anchor = event.currentTarget;
    openProblemIndex = index;

    await positionProblemPopup(anchor, index);
  }

  function clearProblemPreview() {
    scheduleProblemClose();
  }

  async function selectProblem(event, index) {
    const anchor = event.currentTarget;

    if (!canUseProblemHover() && openProblemIndex === index) {
      closeProblem();
      return;
    }

    cancelProblemClose();
    openProblemIndex = index;

    await positionProblemPopup(anchor, index);
  }

  function closeProblem() {
    window.clearTimeout(problemCloseTimer);
    openProblemIndex = -1;
    problemPopupReady = false;
    problemAnchorElement = null;
  }

  function scrollToService(event, index) {
    event.preventDefault();

    activeServiceIndex = index;

    const target = document.getElementById(`service-${index}`);

    if (!target) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  function observeServicePanel(node, index) {
    if (typeof IntersectionObserver === "undefined") {
      return {
        destroy() {},
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activeServiceIndex = index;
        }
      },
      {
        threshold: 0,
        rootMargin: "-18% 0px -68% 0px",
      },
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  function getServiceTags(service) {
    const serviceTitle = service?.title?.toLowerCase() ?? "";

    const foundKey = Object.keys(serviceKeywords).find((key) =>
      serviceTitle.includes(key),
    );

    return foundKey ? serviceKeywords[foundKey] : fallbackServiceTags;
  }

  function observeHeader(node) {
    if (typeof IntersectionObserver === "undefined") {
      headerVisible = true;

      return {
        destroy() {},
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headerVisible = true;

          observer.disconnect();
        }
      },

      {
        threshold: 0.25,

        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      },
    };
  }
</script>

<section id="services" class="services">
  <div class="services-shell">
    <div class="shell-line edge-left" aria-hidden="true"></div>

    <div class="shell-line edge-right" aria-hidden="true"></div>

    <div class="shell-bottom-line"></div>

    <div class="container services-container">
      <!-- =====================================================

           PROBLEM / SOLUTION

      ====================================================== -->

      {#if problemItems?.length}
        <section
          class="problem-workspace"
          aria-labelledby="problem-solution-title"
        >
          <div class="problem-story-wrap">
            <div class="problem-heading-row">
              <h3 id="problem-solution-title" class="problem-section-title">
                {resolvedProblemSectionTitle}
              </h3>

              <p class="problem-instruction">
                <span class="problem-instruction-arrow" aria-hidden="true"
                  >↳</span
                >
                <span>{resolvedProblemInstruction}</span>
              </p>

              <span class="problem-heading-line" aria-hidden="true"></span>
            </div>

            <p
              class="problem-story"
              class:visible={problemStoryVisible}
              use:observeProblemStory
            >
              {#each problemStoryParts as part, storyIndex}
                {#if part.index !== undefined}
                  <button
                    type="button"
                    class="problem-trigger problem-story-segment"
                    class:active={openProblemIndex === part.index}
                    aria-expanded={openProblemIndex === part.index}
                    aria-controls={`problem-popup-panel-${part.index}`}
                    aria-label={problemItems[part.index]?.title ?? part.label}
                    style={`--story-delay: ${storyIndex * 55}ms;`}
                    onpointerenter={(event) =>
                      previewProblem(event, part.index)}
                    onpointerleave={clearProblemPreview}
                    onfocus={(event) => previewProblem(event, part.index)}
                    onblur={clearProblemPreview}
                    onclick={(event) => selectProblem(event, part.index)}
                  >
                    <span class="problem-trigger-text">{part.label}</span>

                    <span
                      class={`problem-inline-icon problem-icon-${part.icon}`}
                      aria-hidden="true"
                    >
                      {#if part.icon === "globe"}
                        <svg viewBox="0 0 24 24" fill="none">
                          <circle
                            class="icon-primary globe-shell"
                            cx="12"
                            cy="12"
                            r="7.5"
                          ></circle>
                          <path
                            class="icon-secondary globe-meridian"
                            d="M12 4.5c2 2.1 3.1 4.6 3.1 7.5S14 17.4 12 19.5M12 4.5C10 6.6 8.9 9.1 8.9 12S10 17.4 12 19.5"
                          ></path>
                          <path
                            class="icon-secondary globe-latitude"
                            d="M5.2 9.3h13.6M5.2 14.7h13.6"
                          ></path>
                        </svg>
                      {:else if part.icon === "bento"}
                        <svg viewBox="0 0 24 24" fill="none">
                          <rect
                            class="icon-primary tile tile-a"
                            x="4"
                            y="4"
                            width="7"
                            height="7"
                          ></rect>
                          <rect
                            class="icon-secondary tile tile-b"
                            x="13"
                            y="4"
                            width="7"
                            height="4.5"
                          ></rect>
                          <rect
                            class="icon-secondary tile tile-c"
                            x="13"
                            y="10.5"
                            width="7"
                            height="9.5"
                          ></rect>
                          <rect
                            class="icon-primary tile tile-d"
                            x="4"
                            y="13"
                            width="7"
                            height="7"
                          ></rect>
                        </svg>
                      {:else if part.icon === "speed"}
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            class="icon-primary speed-arc"
                            d="M5 17.5a8 8 0 1 1 14 0"
                          ></path>
                          <path class="icon-primary" d="M7.1 15.7h9.8"></path>
                          <path
                            class="icon-secondary speed-needle"
                            d="m12 14.6 3.3-5.2"
                          ></path>
                          <circle
                            class="icon-secondary speed-center"
                            cx="12"
                            cy="14.7"
                            r="0.9"
                          ></circle>
                          <path
                            class="icon-primary speed-tick"
                            d="M7.6 10.1 6.4 9.4M16.4 10.1l1.2-.7M12 8V6.6"
                          ></path>
                        </svg>
                      {:else if part.icon === "glasses"}
                        <svg viewBox="0 0 24 24" fill="none">
                          <circle class="icon-primary" cx="7.5" cy="13" r="3.5"
                          ></circle>
                          <circle class="icon-primary" cx="16.5" cy="13" r="3.5"
                          ></circle>
                          <path
                            class="icon-secondary"
                            d="M11 12.5c.7-.6 1.3-.6 2 0"
                          ></path>
                          <path
                            class="icon-secondary"
                            d="M4 11 5.2 7.8M20 11l-1.2-3.2"
                          ></path>
                        </svg>
                      {:else if part.icon === "chat"}
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            class="icon-primary chat-left"
                            d="M4.5 6.5h8v6h-4l-2.8 2v-2H4.5v-6Z"
                          ></path>
                          <path
                            class="icon-secondary chat-right"
                            d="M11.5 10h8v6h-1.2v2l-2.8-2h-4v-6Z"
                          ></path>
                          <path class="icon-secondary" d="M7 9h3M14 13h3"
                          ></path>
                        </svg>
                      {:else}
                        <svg viewBox="0 0 24 24" fill="none">
                          <circle
                            class="icon-primary magnifier-ring"
                            cx="10.5"
                            cy="10.5"
                            r="5.7"
                          ></circle>
                          <path
                            class="icon-primary magnifier-handle"
                            d="m14.7 14.7 4.4 4.4"
                          ></path>
                          <path
                            class="icon-primary magnifier-detail"
                            d="M8.5 10.5h4"
                          ></path>
                        </svg>
                      {/if}
                    </span>
                  </button>
                {:else if part.href}
                  <a
                    class="problem-contact-link problem-story-segment"
                    href={part.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={`--story-delay: ${storyIndex * 55}ms;`}
                    aria-label={problemLanguage === "en"
                      ? "Book a call with Julius"
                      : "Gespräch mit Julius buchen"}
                  >
                    <span class="problem-contact-text">{part.label}</span>

                    <span class="problem-contact-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <rect x="4.5" y="6.5" width="15" height="13" rx="0"
                        ></rect>
                        <path d="M8 4.5v4M16 4.5v4M4.5 10.5h15"></path>
                        <path d="M9 14h2M13 14h2M9 17h2"></path>
                      </svg>
                    </span>
                  </a>
                {:else}
                  <span
                    class="problem-story-segment"
                    style={`--story-delay: ${storyIndex * 55}ms;`}
                  >
                    {part.text}
                  </span>
                {/if}
              {/each}
            </p>
          </div>

          <!--
            Every problem + solution is rendered in the server HTML.
            Inactive cards are visually hidden, not conditionally removed,
            so crawlers can still parse the complete service copy.
          -->
          {#each problemItems as item, index}
            <div
              id={`problem-popup-panel-${index}`}
              class="problem-popup"
              class:active={openProblemIndex === index}
              class:ready={openProblemIndex === index && problemPopupReady}
              class:problem-popup-above={openProblemIndex === index &&
                problemPopupPlacement === "above"}
              role="region"
              aria-hidden={openProblemIndex !== index}
              style={`--problem-popup-left: ${problemPopupLeft}px; --problem-popup-top: ${problemPopupTop}px; --problem-popup-anchor: ${problemPopupAnchorOffset}px;`}
              onpointerenter={cancelProblemClose}
              onpointerleave={scheduleProblemClose}
              onfocusin={cancelProblemClose}
              onfocusout={scheduleProblemClose}
            >
              <button
                type="button"
                class="problem-popup-close"
                aria-label={resolvedProblemCloseLabel}
                tabindex={openProblemIndex === index ? 0 : -1}
                onclick={closeProblem}
              >
                ×
              </button>

              <div class="problem-popup-content">
                <div class="problem-popup-block problem-popup-problem">
                  <h4 class="problem-popup-label">{problemLabel}</h4>
                  <p>{getProblemText(item, index)}</p>
                </div>

                <div class="problem-popup-block problem-popup-solution">
                  <h4 class="problem-popup-label">{solutionLabel}</h4>
                  <p>{getSolutionText(item, index)}</p>
                </div>
              </div>
            </div>
          {/each}
        </section>
      {/if}

      {#if stats}
        <section class="premium-about" aria-labelledby="premium-about-title">
          <!-- =================================================

               EXPERIENCE

          ================================================== -->

          <aside
            class="experience-rail"
            aria-label={experienceLabel}
            use:autoplayExperience
          >
            <div class="experience-toolbar">
              <div class="experience-controls">
                <button
                  type="button"
                  class="experience-nav"
                  onclick={() => moveExperience(-1)}
                  aria-label="Previous experience point"
                >
                  ←
                </button>

                <button
                  type="button"
                  class="experience-nav"
                  onclick={() => moveExperience(1)}
                  aria-label="Next experience point"
                >
                  →
                </button>
              </div>
            </div>

            <div class="experience-list" bind:this={experienceViewport}>
              {#each normalizedStats as stat}
                <article class="experience-item">
                  <p class="experience-title">
                    <span class="experience-title-first"
                      >{stat.title.split(/\s+/)[0]}</span
                    >{#if stat.title.split(/\s+/).slice(1).length}
                      {" "}
                      <span class="experience-title-rest">
                        {stat.title.split(/\s+/).slice(1).join(" ")}</span
                      >
                    {/if}
                  </p>
                </article>
              {/each}
            </div>
          </aside>

          <!-- =================================================

               ABOUT

          ================================================== -->

          <div
            class="about-editorial"
            class:about-overlay-visible={aboutOverlayVisible}
            use:observeAboutOverlay
          >
            <div class="about-profile">
              <div class="about-image-wrap">
                <img
                  src="/images/Julius_Timgum-700.webp"
                  alt={profileImageAlt}
                  loading="eager"
                  decoding="async"
                />
              </div>

              <h2 id="premium-about-title" class="about-editorial-title">
                <span class="about-availability">
                  <span class="about-availability-pulse" aria-hidden="true"
                  ></span>

                  <span class="about-title-static">{resolvedProblemTitle}</span>
                </span>
              </h2>
            </div>

            <div class="about-below-copy">
              <div class="about-top-copy">
                <span class="about-reveal-frame" aria-hidden="true"></span>

                <span class="about-kicker">
                  {problemEyebrow || stats?.eyebrow || eyebrow}
                </span>

                <p class="about-editorial-text">
                  {problemText}
                </p>
              </div>

              <div class="about-editorial-figure">
                <span class="about-reveal-frame" aria-hidden="true"></span>

                <span class="profile-name">{profileName}</span>

                <span class="profile-role">
                  {#each profileRole.split(/\s*·\s*/) as role}
                    <span>{role}</span>
                  {/each}
                </span>

                <div
                  class="about-experience-stack"
                  aria-label={experienceLabel}
                >
                  {#each normalizedStats as stat}
                    <div class="about-experience-card">
                      <span class="about-experience-copy">
                        <span class="about-experience-heading"
                          >{stat.title.split(/\s+/)[0]}</span
                        >
                        {" "}{stat.title.split(/\s+/).slice(1).join(" ")}
                      </span>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        </section>
      {/if}

      <!-- =====================================================

           SECTION HEADER

      ====================================================== -->

      <div
        class="services-header"
        class:visible={headerVisible}
        use:observeHeader
      >
        <div class="services-header-inner">
          <div class="services-header-main">
            <h2>{title}</h2>
          </div>

          {#if subtitle}
            <p class="services-subtitle">{subtitle}</p>
          {/if}
        </div>
      </div>

      <!-- =====================================================

           SERVICES

      ====================================================== -->

      <section class="services-showcase" aria-label={title}>
        <div class="services-desktop-workspace">
          <nav class="service-trigger-list" aria-label={title}>
            {#each reorderedServices as service, index}
              <a
                class="service-trigger"
                class:active={activeServiceIndex === index}
                href={"#service-" + index}
                aria-current={activeServiceIndex === index ? "true" : undefined}
                onclick={(event) => scrollToService(event, index)}
              >
                {#if service.icon}
                  <img
                    src={service.icon}
                    alt=""
                    class="service-trigger-icon"
                    loading="lazy"
                    decoding="async"
                  />
                {/if}
                <span>{service.title}</span>
              </a>
            {/each}
          </nav>

          <div class="service-detail-list">
            {#each reorderedServices as service, index}
              <article
                class="service-detail-panel"
                class:active={activeServiceIndex === index}
                id={"service-" + index}
                use:observeServicePanel={index}
              >
                <div
                  class="service-bg-number service-detail-number"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div class="service-detail-heading">
                  <h3>{service.title}</h3>
                </div>

                <p class="service-detail-text">{service.text}</p>

                <div
                  class="service-tags service-detail-tags"
                  role="group"
                  aria-label={serviceKeywordsLabel}
                >
                  {#each getServiceTags(service) as tag}
                    <span>{tag}</span>
                  {/each}
                </div>
              </article>
            {/each}
          </div>
        </div>

        <div class="services-grid services-mobile-grid">
          {#each reorderedServices as service, index}
            <article class="service-card">
              <div class="service-bg-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div class="service-content">
                {#if service.icon}
                  <img
                    src={service.icon}
                    alt={service.alt ?? ""}
                    class="service-icon"
                    loading="lazy"
                    decoding="async"
                  />
                {/if}

                <div class="service-mobile-heading">
                  <h3>{service.title}</h3>

                  <button
                    class="service-description-toggle"
                    type="button"
                    aria-expanded={openServiceIndex === index}
                    aria-controls={`service-description-${index}`}
                    aria-label={`${serviceDescriptionToggleLabel}: ${service.title}`}
                    onclick={() => toggleServiceDescription(index)}
                  >
                    <span aria-hidden="true">
                      {openServiceIndex === index ? "−" : "+"}
                    </span>
                  </button>
                </div>

                {#if openServiceIndex === index}
                  <p
                    class="service-mobile-description"
                    id={`service-description-${index}`}
                  >
                    {service.text}
                  </p>
                {/if}

                <div
                  class="service-tags"
                  role="group"
                  aria-label={serviceKeywordsLabel}
                >
                  {#each getServiceTags(service) as tag}
                    <span>{tag}</span>
                  {/each}
                </div>
              </div>
            </article>
          {/each}
        </div>
      </section>

      <!-- =====================================================

           FREE TOOLS

      ====================================================== -->

      <section class="free-tools-section" aria-labelledby="free-tools-title">
        <div class="free-tools-heading">
          <span>{toolsLabel}</span>

          <h2 id="free-tools-title">{toolsSectionTitle}</h2>
        </div>

        <div class="free-tools-grid">
          {#each toolLinks as tool}
            <article class="website-tool-card">
              <div class="website-tool-card-inner">
                <div class="website-tool-copy">
                  <h3>{tool.title}</h3>

                  <p>{tool.text}</p>
                </div>

                <div class="website-tool-cta-row">
                  <a
                    class="website-tool-cta"
                    href={tool.href}
                    title={tool.title}
                  >
                    {tool.linkLabel}
                  </a>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="none"
                    class="website-tool-arrow"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 8H14"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M10 4L14 8L10 12"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
            </article>
          {/each}
        </div>

        <article class="tools-marquee-card" aria-label={toolsAlt}>
          <div class="tools-marquee">
            <div class="tools-marquee-track">
              {#each marqueeTools as tool, index}
                <div
                  class="tool-marquee-item"
                  aria-hidden={index >= tools.length}
                >
                  <img src={tool} alt="" loading="lazy" decoding="async" />
                </div>
              {/each}
            </div>
          </div>
        </article>
      </section>
    </div>
  </div>
</section>

<style>
  /* =========================================================

     SECTION

  ========================================================= */

  .services {
    --type-label: 11px;

    --type-small: 13px;

    --type-body: 15px;

    --type-subheading: 18px;

    --type-heading: 28px;

    --weight-regular: 400;

    --weight-semibold: 600;

    --weight-bold: 700;

    --accent-blue: #0043ff;

    --about-content-width: 1100px;

    width: 100vw;

    margin-left: calc(50% - 50vw);

    padding: 0;

    overflow: clip;

    background: #0c0c0c;

    color: #ffffff;

    font-family: "Space Grotesk", Arial, sans-serif;

    transition:
      background 0.3s ease,
      color 0.3s ease;
  }

  :global(body.light) .services {
    background: #ffffff;

    color: #111111;
  }

  .services-shell {
    --shell-x: 40px;

    position: relative;

    width: min(1540px, calc(100% - 32px));

    margin: 0 auto;

    padding: 140px var(--shell-x);

    box-sizing: border-box;
  }

  .shell-line {
    position: absolute;

    top: 0;

    bottom: 0;

    width: 1px;

    background: rgba(255, 255, 255, 0.045);

    pointer-events: none;

    z-index: 0;
  }

  :global(body.light) .shell-line {
    background: rgba(0, 0, 0, 0.05);
  }

  .shell-bottom-line {
    position: absolute;

    right: 0;

    bottom: 0;

    left: 0;

    height: 1px;

    background: rgba(255, 255, 255, 0.05);

    pointer-events: none;
  }

  :global(body.light) .shell-bottom-line {
    background: rgba(0, 0, 0, 0.06);
  }

  .edge-left {
    left: 0;
  }

  .edge-right {
    right: 0;
  }

  .services-container {
    position: relative;

    z-index: 1;

    width: 100%;

    display: flex;

    flex-direction: column;
  }

  /* =========================================================

     ABOUT / EXPERIENCE WRAPPER

  ========================================================= */

  .premium-about {
    width: 100%;

    margin: 0 auto;

    padding: 0 0 92px;

    box-sizing: border-box;
  }

  /* =========================================================

     EXPERIENCE

     Desktop = four static columns. Tablet/mobile = slider.

  ========================================================= */

  .experience-rail {
    width: 100%;

    min-width: 0;

    margin: 0 0 38px;
  }

  .experience-toolbar {
    display: none;
  }

  .experience-list {
    position: relative;

    width: 100%;

    display: grid;

    grid-template-columns: repeat(4, minmax(0, 1fr));

    gap: 90px;

    margin: 0;

    padding: 0;
  }

  .experience-item {
    --experience-border: rgba(255, 255, 255, 0.42);

    position: relative;

    min-width: 0;
    min-height: 13px;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    padding: 8px 24px;

    border: 0;
    border-radius: 0;
    background: transparent;

    box-sizing: border-box;
  }

  /* LEFT BRACKET */
  .experience-item::before {
    content: "";
    position: absolute;

    top: 0;
    bottom: 0;
    left: 0;

    width: 28px;

    border-left: 1px solid var(--experience-border);
    border-top: 1px solid var(--experience-border);
    border-bottom: 1px solid var(--experience-border);

    pointer-events: none;
  }

  /* RIGHT BRACKET */
  .experience-item::after {
    content: "";
    position: absolute;

    top: 0;
    bottom: 0;
    right: 0;

    width: 28px;

    border-right: 1px solid var(--experience-border);
    border-top: 1px solid var(--experience-border);
    border-bottom: 1px solid var(--experience-border);

    pointer-events: none;
  }

  /* LIGHT MODE */
  :global(body.light) .experience-item {
    --experience-border: rgba(0, 0, 0, 0.4);

    background: transparent;
  }

  .experience-title {
    position: relative;
    z-index: 1;

    width: 100%;
    max-width: 100%;

    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;

    text-align: center;

    color: #ffffff;
    font-size: clamp(20px, 1.45vw, 24px);
    font-weight: 700;
    line-height: 1.16;
    letter-spacing: -0.015em;
    text-transform: uppercase;
    text-wrap: balance;
  }

  .experience-title-first {
    font-size: 1.1em;
  }

  .experience-title-rest {
    font-size: 0.72em;

    font-weight: 400;

    letter-spacing: 0.01em;
  }

  :global(body.light) .experience-title {
    color: #111111;
  }

  /* =========================================================

     ABOUT

  ========================================================= */

  .about-editorial {
    width: 100%;

    min-width: 0;

    margin: 0;
  }

  .about-profile {
    position: relative;

    width: 100%;

    min-width: 0;

    overflow: hidden;

    border: 1px solid rgba(255, 255, 255, 0.13);

    background: #111111;

    box-sizing: border-box;

    isolation: isolate;
  }

  :global(body.light) .about-profile {
    border-color: rgba(0, 0, 0, 0.14);

    background: #e7e7e7;
  }

  .about-image-wrap {
    position: relative;

    z-index: 0;

    width: 100%;

    height: 70vh;

    min-height: 520px;

    max-height: 760px;

    display: flex;

    align-items: center;

    justify-content: center;

    overflow: hidden;

    background: #111111;
  }

  .about-image-wrap::after {
    content: "";

    position: absolute;

    inset: auto 0 0;

    z-index: 1;

    height: 24%;

    pointer-events: none;

    background: linear-gradient(
      to top,

      rgba(8, 8, 8, 0.46) 0%,

      rgba(8, 8, 8, 0.14) 48%,

      rgba(8, 8, 8, 0) 100%
    );
  }

  .about-image-wrap img {
    width: 100%;

    height: 100%;

    display: block;

    object-fit: cover;

    object-position: left top;

    background: transparent;

    filter: grayscale(1);
  }

  .about-editorial-title {
    position: absolute;

    right: 24px;

    bottom: 24px;

    left: 24px;

    z-index: 3;

    width: auto;

    margin: 0;

    color: #ffffff;

    font-size: clamp(14px, 1.55vw, 24px);

    font-weight: 700;

    line-height: 1.08;

    letter-spacing: 0.035em;

    text-align: center;

    text-transform: uppercase;

    pointer-events: none;
  }

  .about-title-static {
    position: relative;

    width: min(980px, 92%);

    display: block;

    margin: 0 auto;

    padding-bottom: 14px;

    color: rgba(255, 255, 255, 0.98);

    font: inherit;

    text-align: center;

    text-wrap: balance;

    text-shadow: 0 2px 18px rgba(0, 0, 0, 0.32);
  }

  .about-title-static::after {
    content: "";

    position: absolute;

    bottom: 0;

    left: 50%;

    width: 34px;

    height: 2px;

    background: var(--accent-blue);

    transform: translateX(-50%);
  }

  .about-below-copy {
    width: 100%;

    display: grid;

    grid-template-columns: minmax(0, 1.45fr) minmax(240px, 0.55fr);

    gap: clamp(48px, 7vw, 110px);

    align-items: center;

    padding: 34px 0 0;

    box-sizing: border-box;
  }

  .about-top-copy {
    grid-column: 2;
    grid-row: 1;

    width: 100%;

    justify-self: stretch;
    align-self: start;

    display: grid;
    grid-template-rows: auto auto;
    justify-items: end;
    align-content: start;

    row-gap: 7px;
  }

  .about-kicker {
    display: inline-flex;

    align-items: center;

    gap: 12px;

    margin: 0 0 14px;

    color: #ffffff;

    font-size: 12px;

    font-weight: var(--weight-bold);

    line-height: 1;

    letter-spacing: 0.14em;

    text-transform: uppercase;
  }

  :global(body.light) .about-kicker {
    color: #111111;
  }

  .about-editorial-text {
    --editorial-border: rgba(255, 255, 255, 0.34);

    position: relative;

    width: 100%;
    max-width: 680px;

    margin: 9px 0 0;
    padding: 16px 24px;

    box-sizing: border-box;

    color: #9a9a9a;
    font-size: 17px;
    font-weight: 400;
    line-height: 1.62;
    text-align: left;
    text-wrap: pretty;
  }

  /* =========================================================
   ABOUT EDITORIAL OPEN BRACKETS
========================================================= */

  .about-editorial-text::before,
  .about-editorial-text::after {
    content: "";
    position: absolute;

    top: 0;
    height: 100%;

    width: 28px;

    box-sizing: border-box;

    border-top: 1px solid var(--editorial-border);
    border-bottom: 1px solid var(--editorial-border);

    pointer-events: none;
  }

  /* LEFT */
  .about-editorial-text::before {
    left: 0;
    border-left: 1px solid var(--editorial-border);
  }

  /* RIGHT */
  .about-editorial-text::after {
    right: 0;
    border-right: 1px solid var(--editorial-border);
  }

  /* LIGHT MODE */
  :global(body.light) .about-editorial-text {
    --editorial-border: rgba(0, 0, 0, 0.34);
    color: rgba(0, 0, 0, 0.66);
  }

  .about-editorial-figure {
    position: relative;

    width: fit-content;
    min-width: 0;

    justify-self: end;
    align-self: center;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 0;

    margin: 0;
    padding: 0;

    border: 0;

    text-align: left;

    box-sizing: border-box;
  }

  /* NAME — OUTSIDE THE BRACKET */
  .profile-name {
    display: block;

    margin: 0 0 12px;

    color: #ffffff;

    font-size: 12px;
    font-weight: var(--weight-bold);
    line-height: 1.3;
    letter-spacing: 0.08em;

    text-transform: uppercase;
  }

  :global(body.light) .profile-name {
    color: #111111;
  }

  /* ROLES */
  .profile-role {
    max-width: 100%;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;

    gap: 6px;

    margin: 0;

    color: #888888;

    font-size: 13px;
    font-weight: var(--weight-semibold);
    line-height: 1.45;
    letter-spacing: 0.07em;

    text-align: left;
    text-transform: uppercase;
  }

  .profile-role > span {
    display: block;
    width: 100%;
  }

  /* REMOVE OLD DOT SEPARATORS */
  .profile-role > span:not(:last-child)::after {
    content: none;
    display: none;
  }

  :global(body.light) .profile-role {
    color: rgba(0, 0, 0, 0.56);
  }

  .sr-only {
    position: absolute;

    width: 1px;

    height: 1px;

    padding: 0;

    margin: -1px;

    overflow: hidden;

    clip: rect(0, 0, 0, 0);

    white-space: nowrap;

    border: 0;
  }

  /* =========================================================

     SERVICES HEADER

  ========================================================= */

  .services-header {
    width: 100%;

    margin: 112px 0 78px;

    box-sizing: border-box;

    border-bottom: 1px solid var(--accent-blue);

    background: transparent;

    color: #f2f2f2;

    opacity: 0;

    transform: translateY(18px);

    transition:
      opacity 0.7s ease,
      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .services-header.visible {
    opacity: 1;

    transform: translateY(0);
  }

  .services-header-inner {
    width: 100%;

    min-height: 0;

    box-sizing: border-box;

    display: grid;

    grid-template-columns:
      minmax(0, 1.15fr)
      minmax(320px, 0.85fr);

    align-items: center;

    gap: 80px;

    padding: 44px 0;
  }

  .services-header-main {
    --services-title-marker-size: clamp(18px, 1.6125vw, 25.5px);

    min-width: 0;

    display: grid;

    grid-template-columns: var(--services-title-marker-size) minmax(0, 1fr);

    align-items: start;

    gap: 18px;
  }

  .services-header-main::before {
    width: var(--services-title-marker-size);

    height: var(--services-title-marker-size);

    margin-top: 0.48em;

    border-radius: 50%;

    background: var(--accent-blue);

    content: "";

    transform-origin: center;

    animation: services-title-pulse 1.65s ease-in-out infinite;

    will-change: transform, box-shadow;
  }

  @media (max-width: 1100px) {
    .services-header-main {
      align-items: center;
    }

    .services-header-main::before {
      align-self: center;
      margin-top: 0;
    }
  }

  @keyframes services-title-pulse {
    0%,
    100% {
      transform: scale(0.82);

      box-shadow: 0 0 0 0 rgba(0, 67, 255, 0);
    }

    50% {
      transform: scale(1.18);

      box-shadow: 0 0 0 8px rgba(0, 67, 255, 0.16);
    }
  }

  .services-header h2 {
    max-width: 720px;

    margin: 0;

    color: #f2f2f2;

    font-size: clamp(24px, 2.15vw, 34px);

    line-height: 1.12;

    letter-spacing: -0.035em;

    font-weight: 600;

    text-transform: none;
  }

  .services-subtitle {
    max-width: 520px;

    margin: 0;

    padding: 0;

    color: rgba(255, 255, 255, 0.62);

    font-size: 16px;

    font-weight: 400;

    line-height: 1.65;

    letter-spacing: 0;
  }

  :global(body.light) .services-header {
    background: transparent;

    color: #111111;
  }

  :global(body.light) .services-header h2 {
    color: #111111;
  }

  :global(body.light) .services-subtitle {
    color: rgba(0, 0, 0, 0.62);
  }

  @media (min-width: 1025px) {
    .services-subtitle {
      width: min(460px, 100%);

      justify-self: end;

      margin-left: auto;

      margin-right: 0;

      padding-right: 0;

      text-align: left;
    }
  }

  /* =========================================================

     PROBLEM / SOLUTION

  ========================================================= */

  .problem-workspace {
    width: 100%;

    display: block;

    margin-bottom: 112px;
  }

  .problem-story-wrap {
    width: 100%;

    max-width: 1180px;

    margin: 0 auto;

    text-align: center;
  }

  .problem-heading-row {
    width: 100%;

    display: flex;

    align-items: center;

    justify-content: center;

    margin: 0 auto 18px;

    text-align: center;
  }

  .problem-section-title {
    max-width: 920px;

    margin: 0 auto;

    color: rgba(255, 255, 255, 0.72);

    font-size: clamp(18px, 1.7vw, 27px);

    font-weight: 500;

    line-height: 1.35;

    letter-spacing: -0.018em;

    text-align: center;

    text-transform: none;

    text-wrap: balance;
  }

  :global(body.light) .problem-section-title {
    color: #222222;
  }

  .problem-story {
    max-width: 1080px;

    margin: 0 auto;

    color: #8f8f8f;

    font-size: clamp(18px, 1.7vw, 27px);

    font-weight: 400;

    line-height: 1.68;

    letter-spacing: -0.018em;

    text-align: center;

    text-wrap: pretty;
  }

  :global(body.light) .problem-story {
    color: #747474;
  }

  .problem-story-segment {
    opacity: 0.18;

    filter: blur(2.5px);

    transition:
      opacity 0.58s ease var(--story-delay, 0ms),
      filter 0.65s ease var(--story-delay, 0ms);
  }

  .problem-trigger.problem-story-segment {
    transform: translateY(0.34em) rotateX(-7deg);

    transform-origin: 50% 100%;

    transition:
      opacity 0.58s ease var(--story-delay, 0ms),
      filter 0.65s ease var(--story-delay, 0ms),
      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--story-delay, 0ms),
      color 0.18s ease;
  }

  .problem-story.visible .problem-story-segment {
    opacity: 1;

    filter: blur(0);
  }

  .problem-story.visible .problem-trigger.problem-story-segment {
    transform: translateY(0) rotateX(0);
  }

  .problem-trigger {
    position: relative;

    display: inline-flex;

    align-items: center;

    gap: 0.18em;

    margin: 0 0.08em;

    padding: 0 0.02em;

    border: 0;

    border-radius: 0;

    background: transparent;

    color: #ffffff;

    font: inherit;

    font-weight: 700;

    line-height: inherit;

    letter-spacing: inherit;

    vertical-align: baseline;

    cursor: pointer;

    white-space: nowrap;

    transition:
      color 0.18s ease,
      opacity 0.18s ease;
  }

  .problem-trigger-text {
    position: relative;

    display: inline-block;
  }

  .problem-trigger-text::after {
    content: "";

    position: absolute;

    right: 0;

    bottom: 0.1em;

    left: 0;

    height: 1px;

    background: var(--accent-blue);

    opacity: 0.72;

    transform-origin: left center;

    transition:
      opacity 0.18s ease,
      transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .problem-trigger:hover,
  .problem-trigger:focus-visible,
  .problem-trigger.active {
    color: #ffffff;

    outline: none;
  }

  :global(body.light) .problem-trigger {
    color: #111111;
  }

  :global(body.light) .problem-trigger:hover,
  :global(body.light) .problem-trigger:focus-visible,
  :global(body.light) .problem-trigger.active {
    color: #000000;
  }

  .problem-trigger:hover .problem-trigger-text::after,
  .problem-trigger:focus-visible .problem-trigger-text::after,
  .problem-trigger.active .problem-trigger-text::after {
    opacity: 1;

    transform: scaleX(1.08);
  }

  .problem-inline-icon {
    width: 1.72em;

    height: 1.72em;

    flex: 0 0 1.72em;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    margin: 0 0.3em 0 0.16em;

    transform: translateY(0.12em);

    transform-origin: center;

    opacity: 0.9;

    vertical-align: middle;

    transition:
      transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.18s ease;
  }

  .problem-inline-icon svg {
    width: 100%;

    height: 100%;

    display: block;

    overflow: visible;

    stroke-width: 0.68;

    stroke-linecap: round;

    stroke-linejoin: round;

    fill: none;
  }

  .problem-inline-icon .icon-primary,
  .problem-inline-icon .icon-secondary {
    stroke: rgba(255, 255, 255, 0.72);

    transition: stroke 0.18s ease;
  }

  :global(body.light) .problem-inline-icon .icon-primary,
  :global(body.light) .problem-inline-icon .icon-secondary {
    stroke: #111111;
  }

  .problem-trigger:hover .problem-inline-icon .icon-primary,
  .problem-trigger:hover .problem-inline-icon .icon-secondary,
  .problem-trigger:focus-visible .problem-inline-icon .icon-primary,
  .problem-trigger:focus-visible .problem-inline-icon .icon-secondary,
  .problem-trigger.active .problem-inline-icon .icon-primary,
  .problem-trigger.active .problem-inline-icon .icon-secondary {
    stroke: var(--accent-blue);
  }

  .problem-trigger:hover .problem-inline-icon,
  .problem-trigger:focus-visible .problem-inline-icon,
  .problem-trigger.active .problem-inline-icon {
    opacity: 1;
  }

  .problem-trigger:hover .problem-icon-globe .globe-meridian,
  .problem-trigger:focus-visible .problem-icon-globe .globe-meridian,
  .problem-trigger.active .problem-icon-globe .globe-meridian {
    animation: problem-globe-rotate 0.78s ease-in-out infinite alternate;
  }

  .problem-trigger:hover .problem-icon-globe .globe-latitude,
  .problem-trigger:focus-visible .problem-icon-globe .globe-latitude,
  .problem-trigger.active .problem-icon-globe .globe-latitude {
    animation: problem-globe-latitude 0.78s ease-in-out infinite alternate;
  }

  .problem-trigger:hover .problem-icon-bento .tile-a,
  .problem-trigger:focus-visible .problem-icon-bento .tile-a,
  .problem-trigger.active .problem-icon-bento .tile-a {
    transform: translate(-0.7px, -0.7px);
  }

  .problem-trigger:hover .problem-icon-bento .tile-c,
  .problem-trigger:focus-visible .problem-icon-bento .tile-c,
  .problem-trigger.active .problem-icon-bento .tile-c {
    transform: translate(0.8px, 0.7px);
  }

  .problem-icon-bento .tile {
    transform-box: fill-box;

    transform-origin: center;

    transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .problem-trigger:hover .problem-icon-speed .speed-needle,
  .problem-trigger:focus-visible .problem-icon-speed .speed-needle,
  .problem-trigger.active .problem-icon-speed .speed-needle {
    transform-box: fill-box;

    transform-origin: 0% 100%;

    animation: problem-speed-needle 0.62s cubic-bezier(0.16, 1, 0.3, 1) infinite
      alternate;
  }

  .problem-trigger:hover .problem-icon-glasses,
  .problem-trigger:focus-visible .problem-icon-glasses,
  .problem-trigger.active .problem-icon-glasses {
    animation: problem-glasses-tilt 0.7s ease-in-out infinite alternate;
  }

  .problem-trigger:hover .problem-icon-chat .chat-left,
  .problem-trigger:focus-visible .problem-icon-chat .chat-left,
  .problem-trigger.active .problem-icon-chat .chat-left {
    animation: problem-chat-left 0.75s ease-in-out infinite alternate;
  }

  .problem-trigger:hover .problem-icon-chat .chat-right,
  .problem-trigger:focus-visible .problem-icon-chat .chat-right,
  .problem-trigger.active .problem-icon-chat .chat-right {
    animation: problem-chat-right 0.75s ease-in-out infinite alternate;
  }

  .problem-trigger:hover .problem-icon-magnifier,
  .problem-trigger:focus-visible .problem-icon-magnifier,
  .problem-trigger.active .problem-icon-magnifier {
    transform: translateY(0.03em) rotate(-7deg) scale(1.04);
  }

  .problem-trigger:hover .problem-icon-magnifier .magnifier-detail,
  .problem-trigger:focus-visible .problem-icon-magnifier .magnifier-detail,
  .problem-trigger.active .problem-icon-magnifier .magnifier-detail {
    animation: problem-magnifier-scan 0.72s ease-in-out infinite alternate;
  }

  .problem-instruction {
    width: min(1080px, 100%);

    display: flex;

    align-items: center;

    justify-content: flex-end;

    gap: 7px;

    margin: 16px auto 0;

    text-align: right;
  }

  .problem-instruction-arrow {
    color: var(--accent-blue);

    font-size: 12px;

    font-weight: 500;

    line-height: 1;
  }

  .problem-instruction-text {
    color: rgba(255, 255, 255, 0.38);

    font-size: 8px;

    font-weight: 500;

    line-height: 1.35;

    letter-spacing: 0.025em;

    text-transform: none;
  }

  :global(body.light) .problem-instruction-text {
    color: rgba(0, 0, 0, 0.4);
  }

  @keyframes problem-globe-rotate {
    from {
      transform: translateX(-0.35px);
    }

    to {
      transform: translateX(0.35px);
    }
  }

  @keyframes problem-globe-latitude {
    from {
      transform: scaleX(0.94);
      transform-origin: center;
    }

    to {
      transform: scaleX(1.03);
      transform-origin: center;
    }
  }

  @keyframes problem-speed-needle {
    from {
      transform: rotate(-12deg);
    }

    to {
      transform: rotate(18deg);
    }
  }

  @keyframes problem-magnifier-scan {
    from {
      transform: translateX(-0.6px);
    }

    to {
      transform: translateX(0.8px);
    }
  }

  @keyframes problem-glasses-tilt {
    from {
      transform: translateY(0.08em) rotate(-3deg);
    }

    to {
      transform: translateY(0.02em) rotate(3deg);
    }
  }

  @keyframes problem-chat-left {
    from {
      transform: translateX(-0.5px);
    }

    to {
      transform: translateX(0.5px);
    }
  }

  @keyframes problem-chat-right {
    from {
      transform: translateX(0.5px);
    }

    to {
      transform: translateX(-0.5px);
    }
  }

  @keyframes problem-instruction-pulse {
    0%,
    100% {
      transform: scale(0.82);

      box-shadow: 0 0 0 0 rgba(0, 67, 255, 0);
    }

    50% {
      transform: scale(1);

      box-shadow: 0 0 0 5px rgba(0, 67, 255, 0.08);
    }
  }

  .problem-popup {
    position: fixed;

    top: var(--problem-popup-top);

    left: var(--problem-popup-left);

    z-index: 9998;

    width: min(430px, calc(100vw - 32px));

    max-height: min(520px, calc(100dvh - 24px));

    overflow-y: auto;

    padding: 26px 28px 28px;

    border: 1px solid rgba(255, 255, 255, 0.16);

    border-radius: 0;

    background: #111111;

    color: #ffffff;

    box-shadow: 0 16px 42px rgba(0, 0, 0, 0.24);

    box-sizing: border-box;

    opacity: 0;

    visibility: hidden;

    pointer-events: none;

    transform: translateY(6px);

    transition:
      opacity 0.18s ease,
      transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
      visibility 0s linear 0.18s;
  }

  .problem-popup.active.ready {
    opacity: 1;

    visibility: visible;

    pointer-events: auto;

    transform: translateY(0);

    transition:
      opacity 0.18s ease,
      transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
      visibility 0s;
  }

  .problem-popup.active.ready.problem-popup-above {
    transform: translateY(0);
  }

  .problem-popup::before {
    content: "";

    position: absolute;

    top: -1px;

    left: var(--problem-popup-anchor);

    width: 24px;

    height: 1px;

    background: var(--accent-blue);

    transform: translateX(-50%);

    pointer-events: none;
  }

  .problem-popup.problem-popup-above::before {
    top: auto;

    bottom: -1px;
  }

  :global(body.light) .problem-popup {
    border-color: rgba(0, 0, 0, 0.14);

    background: #ffffff;

    color: #111111;

    box-shadow: 0 18px 52px rgba(0, 0, 0, 0.12);
  }

  .problem-popup-keyword {
    display: block;

    margin: 0 0 22px;

    color: var(--accent-blue);

    font-size: 11px;

    font-weight: 700;

    line-height: 1.2;

    letter-spacing: 0.1em;

    text-transform: uppercase;
  }

  .problem-popup-content {
    display: grid;

    grid-template-columns: 1fr;

    gap: 22px;
  }

  .problem-popup-block {
    min-width: 0;

    padding-left: 15px;

    text-align: left;
  }

  .problem-popup-problem {
    border-left: 1px solid #f2c94c;
  }

  .problem-popup-solution {
    border-left: 1px solid var(--accent-blue);
  }

  :global(body.light) .problem-popup-problem {
    border-left-color: #f2c94c;
  }

  .problem-popup-label {
    display: block;

    margin-bottom: 8px;

    color: #ffffff;

    font-size: 10px;

    font-weight: var(--weight-bold);

    line-height: 1.2;

    letter-spacing: 0.09em;

    text-transform: uppercase;
  }

  .problem-popup-solution .problem-popup-label {
    color: var(--accent-blue);
  }

  :global(body.light) .problem-popup-label {
    color: #111111;
  }

  :global(body.light) .problem-popup-solution .problem-popup-label {
    color: var(--accent-blue);
  }

  .problem-popup-block p {
    margin: 0;

    color: rgba(255, 255, 255, 0.68);

    font-size: 14px;

    font-weight: var(--weight-regular);

    line-height: 1.62;

    text-wrap: pretty;
  }

  .problem-popup-solution p {
    color: rgba(255, 255, 255, 0.86);
  }

  :global(body.light) .problem-popup-block p {
    color: rgba(0, 0, 0, 0.64);
  }

  :global(body.light) .problem-popup-solution p {
    color: rgba(0, 0, 0, 0.82);
  }

  .problem-popup-close {
    position: absolute;

    top: 14px;

    right: 14px;

    width: 32px;

    height: 32px;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    padding: 0;

    border: 0;

    background: transparent;

    color: #ffffff;

    font: inherit;

    font-size: 24px;

    font-weight: 300;

    line-height: 1;

    cursor: pointer;
  }

  :global(body.light) .problem-popup-close {
    color: #111111;
  }

  .problem-popup-close:focus-visible {
    outline: 1px solid currentColor;

    outline-offset: 2px;
  }

  @keyframes problem-popup-in {
    from {
      opacity: 0;

      transform: translateY(6px);
    }

    to {
      opacity: 1;

      transform: translateY(0);
    }
  }

  @keyframes problem-bottom-sheet-in {
    from {
      opacity: 0;

      transform: translate(-50%, 12px);
    }

    to {
      opacity: 1;

      transform: translate(-50%, 0);
    }
  }

  @media (min-width: 1025px) and (hover: hover) and (pointer: fine) {
    .problem-popup-close {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .problem-popup,
    .problem-popup.active.ready,
    .problem-inline-icon,
    .problem-inline-icon *,
    .problem-instruction-dot {
      animation: none !important;

      transition: none !important;
    }
  }

  /* =========================================================

     SERVICES

     Desktop/tablet = navigation list + all service details.

     Mobile = original cards.

  ========================================================= */

  .services-showcase {
    width: 100%;
    padding: clamp(30px, 3.3vw, 48px);
    background: rgba(255, 255, 255, 0.022);
    box-sizing: border-box;
  }

  :global(body.light) .services-showcase {
    background: #ffffff;
  }

  .services-desktop-workspace {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(220px, 0.58fr) minmax(0, 1.42fr);
    gap: clamp(54px, 6vw, 94px);
    align-items: start;
  }

  .service-trigger-list {
    position: sticky;
    top: 120px;
    align-self: start;
    max-height: calc(100vh - 160px);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
  }

  .service-trigger {
    position: relative;
    width: 100%;
    min-height: 52px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 11px;
    padding: 9px 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    color: #777777;
    font: inherit;
    font-size: 20px;
    font-weight: 650;
    line-height: 1.25;
    letter-spacing: 0.025em;
    text-align: left;
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.2s ease;
  }

  .service-trigger::after {
    content: "";
    width: 7px;
    height: 7px;
    flex: 0 0 7px;
    margin-left: auto;
    border-radius: 50%;
    background: var(--accent-blue);
    opacity: 0;
    transform: scale(0);
    transition:
      opacity 0.2s ease,
      transform 0.22s ease;
  }

  .service-trigger:hover,
  .service-trigger:focus-visible,
  .service-trigger.active {
    color: #ffffff;
    outline: none;
  }

  .service-trigger.active::after,
  .service-trigger:hover::after,
  .service-trigger:focus-visible::after {
    opacity: 1;
    transform: scale(1);
  }

  .service-trigger-list:has(.service-trigger:hover)
    .service-trigger.active:not(:hover)::after {
    opacity: 0;
    transform: scale(0);
  }

  .service-trigger-list:has(.service-trigger:focus-visible)
    .service-trigger.active:not(:focus-visible)::after {
    opacity: 0;
    transform: scale(0);
  }

  :global(body.light) .service-trigger {
    color: rgba(0, 0, 0, 0.48);
  }

  :global(body.light) .service-trigger:hover,
  :global(body.light) .service-trigger:focus-visible,
  :global(body.light) .service-trigger.active {
    color: #111111;
  }

  .service-trigger-icon {
    width: 20px;
    height: 20px;
    flex: 0 0 20px;
    display: block;
    object-fit: contain;
    filter: brightness(0) invert(1);
    opacity: 0.42;
    transition: opacity 0.2s ease;
  }

  .service-trigger:hover .service-trigger-icon,
  .service-trigger:focus-visible .service-trigger-icon,
  .service-trigger.active .service-trigger-icon {
    opacity: 1;
  }

  :global(body.light) .service-trigger-icon {
    filter: brightness(0);
    opacity: 0.38;
  }

  :global(body.light) .service-trigger:hover .service-trigger-icon,
  :global(body.light) .service-trigger:focus-visible .service-trigger-icon,
  :global(body.light) .service-trigger.active .service-trigger-icon {
    opacity: 1;
  }

  .service-detail-list {
    min-width: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
  }

  :global(body.light) .service-detail-list {
    border-top-color: rgba(0, 0, 0, 0.14);
  }

  .service-detail-panel {
    position: relative;
    min-width: 0;
    min-height: 255px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 38px 0;
    overflow: hidden;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    background: transparent;
    box-shadow: inset 0 0 0 rgba(255, 255, 255, 0);
    box-sizing: border-box;
    scroll-margin-top: 110px;
    transition:
      background-color 0.25s ease,
      box-shadow 0.25s ease;
  }

  .service-detail-panel.active {
    background: rgba(255, 255, 255, 0.045);
    box-shadow: none;
  }

  :global(body.light) .service-detail-panel {
    border-bottom-color: rgba(0, 0, 0, 0.14);
  }

  :global(body.light) .service-detail-panel.active {
    background: #ffffff;
    box-shadow: none;
  }

  .service-detail-heading {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .service-detail-heading h3 {
    max-width: 100%;
    margin: 0;
    color: #737373;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    transition: color 0.25s ease;
  }

  :global(body.light) .service-detail-heading h3 {
    color: rgba(0, 0, 0, 0.44);
  }

  .service-detail-panel.active .service-detail-heading h3 {
    color: #ffffff;
  }

  :global(body.light) .service-detail-panel.active .service-detail-heading h3 {
    color: #111111;
  }

  .service-detail-text {
    position: relative;
    z-index: 1;
    max-width: 100%;
    margin: 18px 0 0;
    color: #6f6f6f;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    text-wrap: pretty;
    transition: color 0.25s ease;
  }

  :global(body.light) .service-detail-text {
    color: rgba(0, 0, 0, 0.46);
  }

  .service-detail-panel.active .service-detail-text {
    color: rgba(255, 255, 255, 0.62);
  }

  :global(body.light) .service-detail-panel.active .service-detail-text {
    color: rgba(0, 0, 0, 0.78);
  }

  @media (min-width: 1025px) {
    .service-trigger {
      font-size: 18.4px;
    }

    .about-kicker {
      width: 100%;
      max-width: 720px;

      justify-self: end;
    }

    .about-below-copy {
      grid-template-columns: minmax(300px, 360px) minmax(0, 1fr);
      gap: clamp(36px, 5vw, 80px);
      align-items: start;
      padding-top: 30px;
    }

    /* LEFT — JULIUS PROFILE */
    .about-editorial-figure {
      grid-column: 1;
      grid-row: 1;

      width: 100%;
      max-width: 360px;

      justify-self: start;
      align-self: start;
    }

    /* RIGHT — EDITORIAL */
    .about-top-copy {
      grid-column: 2;
      grid-row: 1;

      width: 100%;

      justify-self: stretch;
      align-self: start;

      display: grid;
      grid-template-rows: auto auto;
      align-content: start;
      row-gap: 7px;
    }

    .about-editorial-text {
      width: 100%;
      max-width: 720px;

      margin-top: 0;

      justify-self: end;

      line-height: 1.58;
    }

    /* NAME ABOVE THE BRACKET */
    .profile-name {
      line-height: 1;
      margin: 0 0 12px;
    }

    /* STACKED ROLES */
    .profile-role {
      --profile-border: rgba(255, 255, 255, 0.34);

      position: relative;

      width: 100%;

      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: flex-start;

      gap: 7px;

      margin: 0;
      padding: 16px 24px;

      box-sizing: border-box;
    }

    .profile-role > span {
      display: block;
      width: 100%;
    }

    .profile-role > span:not(:last-child)::after {
      content: none;
      display: none;
    }

    /* OPEN BRACKETS */
    .profile-role::before,
    .profile-role::after {
      content: "";
      position: absolute;

      top: 0;
      height: 100%;

      width: 28px;

      box-sizing: border-box;

      border-top: 1px solid var(--profile-border);
      border-bottom: 1px solid var(--profile-border);

      pointer-events: none;
    }

    .profile-role::before {
      left: 0;
      border-left: 1px solid var(--profile-border);
    }

    .profile-role::after {
      right: 0;
      border-right: 1px solid var(--profile-border);
    }

    :global(body.light) .profile-role {
      --profile-border: rgba(0, 0, 0, 0.34);
    }
    .service-detail-panel {
      padding-top: 42px;
      padding-bottom: 42px;
    }

    .service-detail-text {
      width: 100%;
      max-width: none;
      text-wrap: pretty;
      text-align: left;
    }
  }

  .service-detail-number {
    z-index: 0;
  }

  .service-detail-tags {
    position: relative;
    z-index: 1;
    margin-top: 18px;
  }

  .service-detail-tags span {
    font-weight: 400;
  }

  .services-mobile-grid {
    display: none;
  }

  .services-grid {
    width: 100%;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0;
  }

  .service-card {
    position: relative;
    min-height: 360px;
    display: flex;
    padding: 34px 34px 38px 10px;
    overflow: hidden;
    box-sizing: border-box;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  :global(body.light) .service-card {
    border-top-color: rgba(0, 0, 0, 0.1);
  }

  .services-grid > .service-card:nth-child(3n + 2),
  .services-grid > .service-card:nth-child(3n + 3) {
    padding-left: 40px;
    border-left: 1px solid rgba(255, 255, 255, 0.08);
  }

  :global(body.light) .services-grid > .service-card:nth-child(3n + 2),
  :global(body.light) .services-grid > .service-card:nth-child(3n + 3) {
    border-left-color: rgba(0, 0, 0, 0.08);
  }

  .service-bg-number {
    position: absolute;
    top: 18px;
    right: 18px;
    color: rgba(180, 180, 180, 0.09);
    font-size: clamp(5rem, 8vw, 8rem);
    font-weight: 800;
    line-height: 0.9;
    pointer-events: none;
  }

  :global(body.light) .service-bg-number {
    color: rgba(0, 0, 0, 0.07);
  }

  :global(body.light) .service-detail-panel.active .service-bg-number {
    color: rgba(0, 0, 0, 0.18);
  }

  .service-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
  }

  .service-icon {
    width: 42px;
    height: 42px;
    display: block;
    margin-bottom: 22px;
    object-fit: contain;
  }

  :global(body.light) .service-icon {
    filter: invert(1) brightness(0.12);
  }

  .service-content h3 {
    margin: 0 0 14px;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  :global(body.light) .service-content h3 {
    color: #111111;
  }

  .service-content p {
    margin: 0;
    color: #989898;
    font-size: 16px;
    line-height: 1.5;
  }

  :global(body.light) .service-content p {
    color: rgba(0, 0, 0, 0.68);
  }

  .service-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 18px;
  }

  @media (min-width: 768px) {
    .service-content {
      height: 100%;
    }

    .service-tags {
      margin-top: auto;
      padding-top: 18px;
    }

    .service-detail-tags {
      margin-top: 18px;
      padding-top: 0;
    }
  }

  .service-tags span {
    min-height: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 0;
    color: #ffffff;
    font-size: 11px;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.035em;
    text-transform: uppercase;
  }

  :global(body.light) .service-tags span {
    border-color: rgba(0, 0, 0, 0.28);
    color: #111111;
  }

  .service-detail-panel:not(.active) .service-detail-tags span {
    border-color: rgba(255, 255, 255, 0.16);
    color: rgba(255, 255, 255, 0.44);
  }

  .service-detail-panel.active .service-detail-tags span {
    border-color: rgba(255, 255, 255, 0.42);
    color: #ffffff;
  }

  :global(body.light)
    .service-detail-panel:not(.active)
    .service-detail-tags
    span {
    border-color: rgba(0, 0, 0, 0.16);
    color: rgba(0, 0, 0, 0.44);
  }

  :global(body.light) .service-detail-panel.active .service-detail-tags span {
    border-color: rgba(0, 0, 0, 0.32);
    color: #111111;
  }

  /* =========================================================

     FREE TOOLS

  ========================================================= */

  .free-tools-section {
    margin-top: 120px;
  }

  .free-tools-heading {
    display: flex;

    flex-direction: column;

    align-items: flex-start;

    gap: 13px;

    margin-bottom: 42px;
  }

  .free-tools-heading > span {
    display: none;
  }

  :global(body.light) .free-tools-heading > span {
    color: var(--accent-blue);
  }

  .free-tools-heading h2 {
    max-width: 760px;

    margin: 0;

    color: #ffffff;

    font-size: 20px;

    font-weight: var(--weight-semibold);

    line-height: 1.3;

    letter-spacing: 0.035em;

    text-transform: uppercase;
  }

  :global(body.light) .free-tools-heading h2 {
    color: #111111;
  }

  .free-tools-grid {
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 94px;
    padding-bottom: 40px;
  }

  .website-tool-card {
    --tool-border: rgba(255, 255, 255, 0.34);

    position: relative;

    min-width: 0;
    min-height: 195px;

    display: flex;

    padding: 34px;

    border: 0;
    background: transparent;

    color: #ffffff;
    text-decoration: none;

    box-sizing: border-box;
    overflow: hidden;
  }

  /* LEFT + RIGHT OPEN BRACKETS */
  .website-tool-card::before,
  .website-tool-card::after {
    content: "";

    position: absolute;

    top: 0;
    height: 100%;

    width: 28px;

    box-sizing: border-box;

    border-top: 1px solid var(--tool-border);
    border-bottom: 1px solid var(--tool-border);

    pointer-events: none;
  }

  /* LEFT */
  .website-tool-card::before {
    left: 0;

    border-left: 1px solid var(--tool-border);
  }

  /* RIGHT */
  .website-tool-card::after {
    right: 0;

    border-right: 1px solid var(--tool-border);
  }

  /* LIGHT MODE */
  :global(body.light) .website-tool-card {
    --tool-border: rgba(0, 0, 0, 0.34);

    color: #111111;
  }

  .website-tool-card::before,
  .website-tool-card::after {
    width: 24px;
  }

  .website-tool-card-inner {
    height: 100%;

    width: auto;

    display: flex;

    flex-direction: column;

    justify-content: center;
  }

  .website-tool-arrow {
    width: 18px;

    height: 18px;

    flex: 0 0 18px;

    display: block;

    color: var(--accent-blue);
  }

  .website-tool-copy {
    margin-top: 0;
  }

  .website-tool-copy h3 {
    max-width: 520px;

    margin: 0;

    color: inherit;

    font-size: 20px;

    font-weight: var(--weight-semibold);

    line-height: 1.25;

    letter-spacing: 0.035em;

    text-transform: uppercase;
  }

  .website-tool-copy p {
    max-width: 460px;

    margin: 22px 0 0;

    color: #989898;

    font-size: var(--type-body);

    font-weight: var(--weight-regular);

    line-height: 1.58;
  }

  :global(body.light) .website-tool-copy p {
    color: rgba(0, 0, 0, 0.68);
  }

  .website-tool-cta-row {
    width: fit-content;

    display: flex;

    align-items: center;

    gap: 10px;

    margin-top: 22px;
  }

  .website-tool-cta {
    width: fit-content;

    padding: 0 0 5px;

    border-bottom: 1px solid var(--accent-blue);

    color: #ffffff;

    text-decoration: none;

    font-size: 12px;

    font-weight: var(--weight-bold);

    line-height: 1.2;

    letter-spacing: 0.08em;

    text-transform: uppercase;
  }

  :global(body.light) .website-tool-cta {
    color: #111111;
  }

  .tools-marquee-card {
    margin: 20px 0 0;

    padding: 28px 0 24px;

    border-top: 1px solid rgba(255, 255, 255, 0.22);

    border-bottom: 1px solid rgba(255, 255, 255, 0.22);

    overflow: hidden;
  }

  :global(body.light) .tools-marquee-card {
    border-color: rgba(0, 0, 0, 0.22);
  }

  .tools-marquee {
    width: 100%;

    overflow: hidden;

    mask-image: linear-gradient(
      to right,

      transparent,
      black 5%,

      black 95%,

      transparent
    );
  }

  .tools-marquee-track {
    width: max-content;

    display: flex;

    align-items: center;

    gap: 54px;

    animation: toolsMarquee 28s linear infinite;
  }

  .tool-marquee-item {
    width: 110px;

    height: 76px;

    flex: 0 0 110px;

    display: flex;

    align-items: center;

    justify-content: center;
  }

  .tool-marquee-item img {
    width: 110px;

    height: 110px;

    display: block;

    object-fit: contain;
  }

  :global(body.light) .tool-marquee-item img {
    filter: invert(1) brightness(0.12);
  }

  @keyframes toolsMarquee {
    from {
      transform: translate3d(0, 0, 0);
    }

    to {
      transform: translate3d(calc(-50% - 27px), 0, 0);
    }
  }

  /* =========================================================

     TABLET

  ========================================================= */

  @media (min-width: 768px) and (max-width: 1024px) {
    .services-header-main {
      --services-title-marker-size: 28.8px;
    }

    .free-tools-grid {
      gap: 47px;
    }

    .services-shell {
      --shell-x: 0px;

      width: 90%;

      padding: 110px var(--shell-x) 96px;
    }

    .shell-line,
    .shell-bottom-line {
      display: none;
    }

    .premium-about {
      padding: 0 0 70px;
    }

    /* =====================================================

       TABLET EXPERIENCE / ABOUT

    ====================================================== */

    .experience-rail {
      width: 100%;

      margin-bottom: 32px;
    }

    .experience-toolbar {
      min-height: 42px;

      display: flex;

      align-items: center;

      justify-content: flex-end;

      gap: 24px;

      margin-bottom: 16px;
    }

    .experience-controls {
      display: flex;

      align-items: center;

      gap: 8px;
    }

    .experience-nav {
      width: 40px;

      height: 40px;

      display: inline-flex;

      align-items: center;

      justify-content: center;

      padding: 0;

      border: 1px solid rgba(255, 255, 255, 0.28);

      border-radius: 0;

      background: transparent;

      color: #ffffff;

      font: inherit;

      font-size: 17px;

      line-height: 1;

      cursor: pointer;
    }

    :global(body.light) .experience-nav {
      border-color: rgba(0, 0, 0, 0.24);

      color: #111111;
    }

    .experience-list {
      display: flex;

      grid-template-columns: none;

      gap: 14px;

      overflow-x: auto;

      overflow-y: hidden;

      scroll-snap-type: x mandatory;

      scroll-behavior: smooth;

      scrollbar-width: none;

      overscroll-behavior-inline: contain;
    }

    .experience-list::-webkit-scrollbar {
      display: none;
    }

    .experience-item {
      min-height: 16px;

      flex: 0 0 calc((100% - 14px) / 2);

      align-items: center;

      padding: 10px 22px;

      scroll-snap-align: start;
    }

    .experience-title {
      font-size: 21px;

      font-weight: 700;

      line-height: 1.18;
    }

    .about-profile {
      padding: 0;
    }

    .about-image-wrap {
      width: 100%;

      height: auto;

      min-height: 0;

      max-height: none;

      aspect-ratio: 16 / 10;
    }

    .about-image-wrap img {
      object-position: left top;
    }

    .about-editorial-title {
      bottom: 10px;

      font-size: clamp(29px, 4.59vw, 45px);
    }

    .about-below-copy {
      grid-template-columns: 1fr;
      align-items: start;
      gap: 20px;
      padding-top: 28px;
    }

    .about-kicker {
      font-size: 11px;
    }

    .about-editorial-text {
      max-width: 100%;

      margin-top: 7px;

      font-size: 15px;

      line-height: 1.6;
    }

    .about-editorial-figure {
      width: 100%;
      max-width: none;
      justify-self: start;
      align-self: start;
      padding-left: 0;
    }

    .profile-role {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
    }

    .profile-role > span {
      display: inline-flex;
      align-items: center;
    }

    .profile-role > span:not(:last-child)::after {
      content: "·";
      margin-left: 6px;
    }

    .services-header {
      margin: 92px 0 62px;
    }

    .services-header-inner {
      min-height: 0;

      grid-template-columns:
        minmax(0, 1fr)
        minmax(260px, 0.9fr);

      gap: 38px;

      padding: 36px 0;
    }

    .services-header h2 {
      font-size: 24px;

      line-height: 1.15;
    }

    .services-subtitle {
      font-size: 13px;

      line-height: 1.55;
    }

    .problem-workspace {
      margin-bottom: 82px;
    }

    .problem-story-wrap {
      max-width: 900px;
    }

    .problem-story {
      max-width: 760px;

      font-size: clamp(14px, 1.85vw, 16px);

      line-height: 1.62;

      letter-spacing: -0.012em;
    }

    .problem-section-title {
      margin-bottom: 16px;

      font-size: 9px;
    }

    .problem-instruction {
      width: min(520px, 86%);

      gap: 10px;

      margin-top: 14px;
    }

    .problem-instruction-text {
      font-size: 8px;

      letter-spacing: 0.065em;
    }

    .problem-popup {
      width: min(460px, calc(100vw - 32px));

      max-height: min(460px, calc(100dvh - 24px));

      padding: 24px 24px 25px;
    }

    .problem-popup-content {
      gap: 20px;
    }

    .services-showcase {
      padding: 28px;
    }

    .services-desktop-workspace {
      grid-template-columns: minmax(180px, 0.58fr) minmax(0, 1.42fr);

      gap: 34px;
    }

    .service-trigger-list {
      top: 90px;
    }

    .service-trigger {
      min-height: 48px;

      gap: 10px;

      padding: 8px 0;

      font-size: 16.2px;
    }

    .service-trigger-icon {
      width: 18px;

      height: 18px;

      flex-basis: 18px;
    }

    .service-detail-panel {
      min-height: 230px;

      padding: 32px 0;

      scroll-margin-top: 88px;
    }

    .service-detail-heading h3 {
      font-size: 18px;
    }

    .service-detail-text {
      width: 100%;

      max-width: 100%;

      margin-top: 16px;

      font-size: 14px;

      line-height: 1.55;

      text-wrap: pretty;
    }

    .service-detail-tags {
      margin-top: 16px;
    }

    .free-tools-section {
      margin-top: 92px;
    }

    .website-tool-card {
      min-height: 165px;

      padding: 28px;
    }

    .tools-marquee-track {
      gap: 38px;
    }
  }

  /* =========================================================

     MOBILE

  ========================================================= */

  @media (max-width: 767px) {
    .services-shell {
      --shell-x: 0px;

      width: calc(100% - 40px);

      margin: 0 auto;

      padding: 110px var(--shell-x) 72px;
    }

    .shell-line,
    .shell-bottom-line {
      display: none;
    }

    .premium-about {
      padding: 0 0 62px;
    }

    /* =====================================================

       MOBILE EXPERIENCE / ABOUT

    ====================================================== */

    .experience-rail {
      width: 100%;

      margin-bottom: 28px;

      box-sizing: border-box;
    }

    .experience-toolbar {
      min-height: 40px;

      display: flex;

      align-items: center;

      justify-content: flex-end;

      gap: 20px;

      margin-bottom: 14px;
    }

    .experience-controls {
      display: flex;

      align-items: center;

      gap: 8px;
    }

    .experience-nav {
      width: 38px;

      height: 38px;

      display: inline-flex;

      align-items: center;

      justify-content: center;

      padding: 0;

      border: 1px solid rgba(255, 255, 255, 0.28);

      border-radius: 0;

      background: transparent;

      color: #ffffff;

      font: inherit;

      font-size: 17px;

      line-height: 1;

      cursor: pointer;
    }

    :global(body.light) .experience-nav {
      border-color: rgba(0, 0, 0, 0.24);

      color: #111111;
    }

    .experience-list {
      display: flex;

      grid-template-columns: none;

      gap: 12px;

      overflow-x: auto;

      overflow-y: hidden;

      scroll-snap-type: x mandatory;

      scroll-behavior: smooth;

      scroll-padding-inline: 0;

      scrollbar-width: none;

      overscroll-behavior-inline: contain;
    }

    .experience-list::-webkit-scrollbar {
      display: none;
    }

    .experience-item {
      min-height: 14px;

      flex: 0 0 calc((100% - 12px) / 2);

      align-items: center;

      padding: 10px 20px;

      scroll-snap-align: start;
    }

    .experience-title {
      font-size: 20px;

      font-weight: 700;

      line-height: 1.18;
    }

    .experience-title-first {
      font-size: 0.88em;

      font-weight: 700;
    }

    .about-editorial {
      width: 100%;

      max-width: none;

      margin: 0;
    }

    .about-profile {
      width: 100%;

      max-width: none;

      margin: 0;

      padding: 0;
    }

    .about-image-wrap {
      width: 100%;

      height: auto;

      min-height: 0;

      max-height: none;

      aspect-ratio: 4 / 5;
    }

    .about-image-wrap img {
      object-position: 42% center;
    }

    .about-image-wrap::after {
      height: 28%;

      background: linear-gradient(
        to top,

        rgba(8, 8, 8, 0.48) 0%,

        rgba(8, 8, 8, 0.14) 50%,

        rgba(8, 8, 8, 0) 100%
      );
    }

    .about-editorial-title {
      --about-marquee-edge-fade: 8px;

      right: 10px;

      bottom: 8px;

      left: 10px;

      font-size: clamp(21px, 6.3vw, 31px);

      line-height: 0.92;
    }

    .about-title-track {
      animation-duration: 21s;
    }

    .about-below-copy {
      grid-template-columns: 1fr;

      align-items: start;

      gap: 18px;

      padding-top: 24px;
    }

    .about-top-copy {
      width: 100%;
    }

    .about-kicker {
      gap: 0;

      font-size: 10px;
    }

    .about-editorial-text {
      max-width: 100%;

      margin-top: 6px;

      font-size: 12.5px;

      line-height: 1.6;
    }
    .about-editorial-figure {
      width: 100%;
      max-width: none;
      justify-self: start;
      align-self: start;
      gap: 2px;
      padding-left: 0;
    }

    .profile-role {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
    }

    .profile-role > span {
      display: inline-flex;
      align-items: center;
    }

    .profile-role > span:not(:last-child)::after {
      content: "·";
      margin-left: 6px;
    }

    .profile-name {
      font-size: 11px;
    }

    .profile-role {
      max-width: none;

      font-size: 9.5px;

      line-height: 1.4;
    }

    .services-header {
      margin: 76px 0 50px;
    }

    .services-header-inner {
      min-height: 0;

      display: flex;

      flex-direction: column;

      align-items: flex-start;

      gap: 24px;

      padding: 32px 0;
    }

    .services-header-main {
      --services-title-marker-size: clamp(26.4px, 7.2vw, 32.4px);

      width: 100%;
    }

    .services-header h2 {
      max-width: 100%;

      font-size: clamp(22px, 6vw, 27px);

      line-height: 1.15;
    }

    .services-subtitle {
      max-width: 100%;

      font-size: 14px;

      line-height: 1.6;
    }

    .problem-workspace {
      margin-bottom: 68px;
    }

    .problem-heading-row {
      width: 100%;

      grid-template-columns: minmax(14px, 1fr) auto minmax(14px, 1fr);

      gap: 9px;

      margin-bottom: 15px;
    }

    .problem-story {
      max-width: 100%;

      font-size: clamp(13px, 3.55vw, 14.5px);

      font-weight: 300;

      line-height: 1.74;

      letter-spacing: -0.006em;

      text-align: left;

      text-wrap: pretty;
    }

    .problem-trigger {
      gap: 0.24em;

      font-weight: 550;
    }

    .problem-inline-icon {
      width: 1em;

      height: 1em;

      flex-basis: 1em;

      transform: translateY(0.1em);
    }

    .problem-trigger {
      border-bottom-width: 1px;

      font-weight: 500;
    }

    .problem-section-title {
      max-width: 250px;

      font-size: 8px;

      line-height: 1.45;

      letter-spacing: 0.085em;
    }

    .problem-instruction {
      width: 100%;

      grid-template-columns: minmax(12px, 1fr) auto minmax(12px, 1fr);

      gap: 7px;

      margin-top: 14px;
    }

    .problem-instruction-text {
      max-width: 225px;

      font-size: 7px;

      line-height: 1.45;

      letter-spacing: 0.05em;
    }

    .problem-popup {
      width: min(360px, calc(100vw - 24px));

      max-height: min(420px, calc(100dvh - 20px));

      padding: 23px 20px 22px;
    }

    .problem-popup-keyword {
      margin-bottom: 17px;

      padding-right: 32px;

      font-size: 10px;
    }

    .problem-popup-content {
      grid-template-columns: 1fr;

      gap: 18px;
    }

    .problem-popup-block {
      padding-left: 13px;
    }

    .problem-popup-block p {
      font-size: 13px;

      line-height: 1.55;
    }

    .problem-popup-close {
      top: 9px;

      right: 9px;
    }

    .services-showcase {
      padding: 0;

      background: transparent;
    }

    :global(body.light) .services-showcase {
      background: transparent;
    }

    .services-desktop-workspace {
      display: none;
    }

    .services-mobile-grid {
      display: grid;

      grid-template-columns: 1fr;
    }

    .service-card,
    .services-grid > .service-card:nth-child(3n + 2),
    .services-grid > .service-card:nth-child(3n + 3),
    .services-grid > .service-card:nth-child(2n + 2) {
      min-height: 0;

      padding: 28px 18px 30px 10px;

      border-left: 0;

      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    :global(body.light) .service-card {
      border-bottom-color: rgba(0, 0, 0, 0.1);
    }

    .service-bg-number {
      top: 14px;

      right: 8px;

      font-size: clamp(5.2rem, 26vw, 7.2rem);
    }

    .service-content {
      height: auto;

      justify-content: flex-start;
    }

    .service-mobile-heading {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
    }

    .service-mobile-heading h3 {
      margin-bottom: 0;
    }

    .service-description-toggle {
      width: 26px;
      height: 26px;
      flex: 0 0 26px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: -3px 0 0;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--accent-blue);
      font: inherit;
      font-size: 32.5px;
      font-weight: 300;
      line-height: 1;
      cursor: pointer;
      transition: opacity 0.2s ease;
    }

    .service-description-toggle:hover,
    .service-description-toggle[aria-expanded="true"] {
      color: var(--accent-blue);
      background: transparent;
      opacity: 0.72;
    }

    .service-description-toggle:focus-visible {
      outline: 1px solid currentColor;
      outline-offset: 2px;
    }

    .service-mobile-description {
      margin-top: 16px;
    }

    /*

     * Mobile keeps its original natural tag position.

     */

    .service-tags {
      margin-top: 18px;

      padding-top: 0;
    }

    .service-content p {
      max-width: 95%;

      font-size: 15px;
    }

    .service-tags span {
      font-size: 10px;
    }

    .free-tools-section {
      margin-top: 78px;
    }

    .free-tools-heading {
      gap: 11px;

      margin-bottom: 30px;
    }

    .free-tools-heading h2 {
      font-size: 18px;
    }

    .free-tools-grid {
      grid-template-columns: 1fr;

      gap: 42px;
    }

    .website-tool-card {
      min-height: 150px;

      padding: 26px 22px;
    }
    .website-tool-card::before,
    .website-tool-card::after {
      width: 20px;
    }

    .website-tool-copy h3 {
      font-size: 18px;
    }

    .tools-marquee-card {
      margin: 14px 0 0;

      padding: 24px 0 20px;
    }

    .tools-marquee-track {
      gap: 28px;

      animation-duration: 22s;
    }

    .tool-marquee-item {
      width: 82px;

      height: 58px;

      flex-basis: 82px;
    }

    .tool-marquee-item img {
      width: 82px;

      height: 82px;
    }
  }

  /* =========================================================

     SMALL MOBILE

  ========================================================= */

  @media (max-width: 480px) {
    .services-shell {
      --shell-x: 0px;

      width: calc(100% - 40px);

      padding: 100px var(--shell-x) 64px;
    }

    .experience-rail {
      margin-bottom: 24px;
    }

    .experience-item {
      min-height: 15px;

      padding: 10px 18px;
    }

    .experience-title {
      font-size: 15px;
    }

    .about-image-wrap {
      aspect-ratio: 4 / 5;
    }

    .about-editorial-title {
      font-size: clamp(20px, 5.94vw, 27px);
    }

    .about-below-copy {
      gap: 18px;

      padding-top: 22px;
    }

    .about-editorial-text {
      font-size: 12px;
    }

    .profile-name {
      font-size: 10.5px;
    }

    .profile-role {
      font-size: 9px;
    }

    .services-header-inner {
      padding: 28px 0;
    }

    .service-content h3 {
      font-size: 17px;
    }

    .service-content p {
      font-size: 14px;
    }

    .website-tool-card {
      min-height: 140px;
    }

    .website-tool-copy h3 {
      font-size: 17px;
    }

    .website-tool-copy p {
      font-size: 14px;
    }

    .service-tags span {
      font-size: 8px;
    }

    .service-tags {
      width: 100%;
      max-width: none;
    }
  }

  /* =========================================================

     VERY SMALL MOBILE

  ========================================================= */

  @media (max-width: 420px) {
    .experience-nav {
      width: 36px;

      height: 36px;
    }

    .about-editorial-title {
      font-size: clamp(18px, 5.76vw, 24px);
    }

    .about-editorial-text {
      font-size: 11.5px;
    }

    .services-header {
      margin-bottom: 46px;
    }

    .services-header-inner {
      gap: 20px;

      padding: 28px 0;
    }

    .services-header h2 {
      font-size: 22px;
    }

    .services-subtitle {
      font-size: 14px;
    }
  }

  /* =========================================================

     REDUCED MOTION

  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    .services-header {
      opacity: 1;

      transform: none;

      transition: none;
    }

    .services-header-main::before {
      animation: none;
    }

    .about-title-track {
      animation: none;

      transform: none;
    }

    .tools-marquee-track {
      animation-duration: 0.01ms;

      animation-iteration-count: 1;

      transition-duration: 0.01ms;

      transform: none;
    }
  }

  /* =========================================================
   MOBILE ABOUT — FINAL PROFILE LAYOUT
========================================================= */

  @media (max-width: 767px) {
    /* Two main sections still stack */
    .about-below-copy {
      grid-template-columns: 1fr;
    }

    /* PROFILE FIRST */
    .about-editorial-figure {
      grid-column: 1;
      grid-row: 1;

      width: 100%;
      max-width: none;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      gap: 14px;

      margin: 0;
      padding: 0;
    }

    /* NAME — same horizontal row */
    .profile-name {
      flex: 0 0 auto;

      margin: 0;

      white-space: nowrap;
    }

    /* WEB DESIGN / DEVELOPMENT / WORDPRESS — horizontal */
    .profile-role {
      position: relative;

      width: auto;

      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;

      gap: 6px 10px;

      margin: 0;
      padding: 0;
    }

    .profile-role > span {
      display: inline-flex;
      width: auto;
      white-space: nowrap;
    }

    /* NO DOTS */
    .profile-role > span:not(:last-child)::after {
      content: none !important;
      display: none !important;
      margin: 0 !important;
    }

    /* NO PROFILE BRACKET ON MOBILE */
    .profile-role::before,
    .profile-role::after,
    .about-editorial-figure::before,
    .about-editorial-figure::after {
      content: none !important;
      display: none !important;
    }

    /* EDITORIAL SECOND */
    .about-top-copy {
      grid-column: 1;
      grid-row: 2;

      width: 100%;
    }
  }
  @media (max-width: 767px) {
    .about-kicker {
      width: 100%;
      margin-left: 0;
      margin-right: 0;

      align-self: flex-start;
      justify-self: start;

      text-align: left;
    }
  }

  @media (max-width: 767px) {
    /* WHOLE TITLE + TEXT BECOMES THE BRACKET CONTAINER */
    .about-top-copy {
      --editorial-border: #ffffff;

      position: relative;

      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: flex-start;

      padding: 18px 20px;

      box-sizing: border-box;
      text-align: left;
    }

    /* LEFT + RIGHT OPEN BRACKETS */
    .about-top-copy::before,
    .about-top-copy::after {
      content: "";
      position: absolute;

      top: 0;
      height: 100%;

      width: 22px;

      box-sizing: border-box;

      border-top: 1px solid var(--editorial-border);
      border-bottom: 1px solid var(--editorial-border);

      pointer-events: none;
    }

    .about-top-copy::before {
      left: 0;
      border-left: 1px solid var(--editorial-border);
    }

    .about-top-copy::after {
      right: 0;
      border-right: 1px solid var(--editorial-border);
    }

    /* TITLE — NOW INSIDE THE BRACKET */
    .about-kicker {
      width: 100%;

      margin: 0 0 12px;

      align-self: flex-start;
      justify-content: flex-start;

      text-align: left;
    }

    /* TEXT — REMOVE ITS OWN SEPARATE BRACKET */
    .about-editorial-text {
      width: 100%;
      max-width: none;

      margin: 0;
      padding: 0;

      text-align: left;
    }

    .about-editorial-text::before,
    .about-editorial-text::after {
      content: none;
      display: none;
    }

    /* Keep the bracket white over the image-led About styling in both themes. */
    :global(body.light) .about-top-copy {
      --editorial-border: #ffffff;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .about-below-copy {
      display: grid;
      grid-template-columns: 1fr;

      gap: 28px;
    }

    /* JULIUS / PROFILE FIRST */
    .about-editorial-figure {
      grid-column: 1;
      grid-row: 1;

      width: 100%;
      max-width: none;

      justify-self: start;
      align-self: start;

      padding: 0;
    }

    /* EDITORIAL TEXT SECOND */
    .about-top-copy {
      grid-column: 1;
      grid-row: 2;

      width: 100%;

      justify-self: start;
      align-self: start;
    }

    /* PROFILE ROLES — ONE LINE ON TABLET */
    .profile-role {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;

      align-items: center;

      gap: 14px;

      margin: 0;
      padding: 0;
    }

    .profile-role > span {
      display: inline-flex;
      width: auto;

      white-space: nowrap;
    }

    .profile-role > span:not(:last-child)::after {
      content: none;
      display: none;
    }

    /* NO PROFILE BRACKETS ON TABLET */
    .profile-role::before,
    .profile-role::after,
    .about-editorial-figure::before,
    .about-editorial-figure::after {
      content: none;
      display: none;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .about-kicker {
      width: 100%;
      max-width: none;

      justify-self: start;
      align-self: flex-start;
      justify-content: flex-start;

      margin-left: 0;
      margin-right: 0;

      text-align: left;
    }
  }

  /* =========================================================
     FINAL POLISH — PROBLEM INTRO + DESKTOP ABOUT OVERLAY
  ========================================================= */

  @media (min-width: 1025px) {
    .services-shell {
      padding-top: 96px;
    }

    .about-editorial {
      position: relative;
    }

    .about-below-copy {
      position: absolute;

      top: 36px;
      right: 38px;
      left: 38px;

      z-index: 4;

      width: auto;

      display: grid;

      grid-template-columns:
        minmax(260px, 340px)
        minmax(420px, 680px);

      justify-content: space-between;

      gap: clamp(44px, 6vw, 96px);

      align-items: start;

      margin: 0;

      padding: 0;

      pointer-events: none;
    }

    .about-editorial-figure {
      grid-column: 1;
      grid-row: 1;

      width: 100%;
      max-width: 340px;

      justify-self: start;
      align-self: start;

      margin: 0;

      padding: 0;
    }

    .about-top-copy {
      grid-column: 2;
      grid-row: 1;

      width: 100%;
      max-width: 680px;

      justify-self: end;
      align-self: start;

      display: grid;

      grid-template-rows: auto auto;

      justify-items: stretch;

      align-content: start;

      row-gap: 0;
    }

    .profile-name,
    .about-kicker {
      min-height: 16px;

      display: flex;

      align-items: center;

      margin: 0 0 12px;

      color: #ffffff;

      font-size: 11px;

      font-weight: 700;

      line-height: 1.2;

      letter-spacing: 0.11em;

      text-shadow: 0 1px 14px rgba(0, 0, 0, 0.44);

      text-transform: uppercase;
    }

    .about-kicker {
      width: 100%;

      justify-content: flex-start;

      justify-self: stretch;

      text-align: left;
    }

    .profile-role {
      --profile-border: #ffffff;

      width: 100%;

      max-width: 340px;

      padding: 17px 24px;

      color: rgba(255, 255, 255, 0.82);

      font-size: 12px;

      line-height: 1.48;

      text-shadow: 0 1px 14px rgba(0, 0, 0, 0.44);
    }

    .about-editorial-text {
      --editorial-border: #ffffff;

      width: 100%;

      max-width: 680px;

      margin: 0;

      padding: 17px 24px;

      color: rgba(255, 255, 255, 0.9);

      font-size: 15px;

      line-height: 1.62;

      text-align: left;

      text-shadow: 0 1px 16px rgba(0, 0, 0, 0.4);
    }

    /* Keep every bracket line white over the photograph in both themes. */
    :global(body.light) .profile-name,
    :global(body.light) .about-kicker {
      color: #ffffff;
    }

    :global(body.light) .profile-role {
      --profile-border: #ffffff;

      color: rgba(255, 255, 255, 0.82);
    }

    :global(body.light) .about-editorial-text {
      --editorial-border: #ffffff;

      color: rgba(255, 255, 255, 0.9);
    }

    .about-profile::before {
      content: "";

      position: absolute;

      inset: 0 0 auto;

      z-index: 2;

      height: 46%;

      pointer-events: none;

      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.52) 0%,
        rgba(0, 0, 0, 0.25) 52%,
        rgba(0, 0, 0, 0) 100%
      );
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .services-shell {
      padding-top: 84px;
    }
  }

  @media (max-width: 767px) {
    .services-shell {
      padding-top: 72px;
    }
  }

  /* =========================================================
     FINAL OVERRIDES — INTERACTIVE INTRO / EXPERIENCE / ABOUT TITLE
  ========================================================= */

  @media (min-width: 1025px) {
    /* Experience: smaller headline and smaller supporting line. */
    .experience-title {
      font-size: inherit;

      line-height: 1.12;
    }

    .experience-title-first {
      font-size: clamp(13.2px, 0.96vw, 15.8px);

      font-weight: 700;

      line-height: 1.12;
    }

    .experience-title-rest {
      font-size: clamp(10px, 0.74vw, 12.1px);

      font-weight: 400;

      line-height: 1.28;
    }

    /* Static About statement replaces the marquee completely. */
    .about-editorial-title {
      right: 24px;

      bottom: 24px;

      left: 24px;

      overflow: visible;

      -webkit-mask-image: none;

      mask-image: none;

      font-size: clamp(14px, 1.55vw, 24px);

      font-weight: 700;

      line-height: 1.08;

      text-align: center;

      white-space: normal;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .problem-heading-row {
      width: 100%;

      justify-content: center;

      margin-bottom: 15px;

      text-align: center;
    }

    .problem-section-title {
      max-width: 720px;

      font-size: clamp(16px, 2.2vw, 20px);

      line-height: 1.4;

      text-align: center;
    }

    .problem-story {
      text-align: center;
    }

    .problem-inline-icon {
      width: 1.72em;

      height: 1.72em;

      flex-basis: 1.72em;

      margin: 0 0.28em 0 0.14em;
    }

    .problem-instruction {
      width: min(740px, 100%);

      justify-content: flex-start;

      margin-top: 14px;

      text-align: left;
    }

    .about-editorial-title {
      right: 16px;

      bottom: 16px;

      left: 16px;

      overflow: visible;

      -webkit-mask-image: none;

      mask-image: none;

      font-size: clamp(11px, 2vw, 17px);

      font-weight: 700;

      line-height: 1.08;

      text-align: center;

      white-space: normal;
    }

    .about-title-static {
      width: min(760px, 94%);

      padding-bottom: 11px;
    }
  }

  @media (max-width: 767px) {
    .problem-heading-row {
      width: 100%;

      justify-content: center;

      margin-bottom: 13px;

      text-align: center;
    }

    .problem-section-title {
      max-width: 330px;

      font-size: clamp(15px, 4.2vw, 18px);

      line-height: 1.42;

      text-align: center;
    }

    .problem-story {
      text-align: center;
    }

    .problem-inline-icon {
      width: 1.72em;

      height: 1.72em;

      flex-basis: 1.72em;

      margin: 0 0.26em 0 0.13em;

      transform: translateY(0.12em);
    }

    .problem-instruction {
      width: 100%;

      justify-content: flex-start;

      gap: 6px;

      margin-top: 14px;

      text-align: left;
    }

    .problem-instruction-arrow {
      font-size: 11px;
    }

    .problem-instruction-text {
      font-size: 7.5px;

      line-height: 1.4;
    }

    .about-editorial-title {
      right: 12px;

      bottom: 12px;

      left: 12px;

      overflow: visible;

      -webkit-mask-image: none;

      mask-image: none;

      font-size: clamp(10px, 2.8vw, 14px);

      font-weight: 700;

      line-height: 1.1;

      letter-spacing: 0.025em;

      text-align: center;

      white-space: normal;
    }

    .about-title-static {
      width: 94%;

      padding-bottom: 9px;
    }

    .about-title-static::after {
      width: 28px;

      height: 1.5px;
    }
  }

  @media (max-width: 480px) {
    .about-editorial-title {
      font-size: clamp(9.5px, 2.75vw, 12.5px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .problem-inline-icon,
    .problem-inline-icon *,
    .problem-instruction-arrow,
    .problem-story-segment {
      animation: none !important;

      transition: none !important;
    }

    .problem-inline-icon {
      opacity: 0.88;
    }

    .problem-story-segment {
      opacity: 1;

      filter: none;

      transform: none;
    }

    .about-reveal-frame {
      display: none;
    }

    .about-kicker,
    .about-editorial-text,
    .profile-name,
    .profile-role {
      opacity: 1 !important;

      clip-path: none !important;

      transition: none !important;
    }
  }

  /* =========================================================
     ABOUT TOP COPY — SUBTLE FOCUS-FRAME REVEAL
  ========================================================= */

  @media (min-width: 1025px) {
    .about-top-copy,
    .about-editorial-figure {
      position: relative;
    }

    .about-reveal-frame {
      position: absolute;

      inset: -1px;

      z-index: 5;

      border: 1px solid #ffffff;

      opacity: 0;

      pointer-events: none;

      transform: scaleX(0.045);

      transform-origin: center;
    }

    .about-editorial:not(.about-overlay-visible) .about-kicker,
    .about-editorial:not(.about-overlay-visible) .about-editorial-text,
    .about-editorial:not(.about-overlay-visible) .profile-name,
    .about-editorial:not(.about-overlay-visible) .profile-role {
      opacity: 0;

      clip-path: inset(0 49% 0 49%);
    }

    .about-overlay-visible .about-reveal-frame {
      animation: about-focus-open 0.88s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .about-overlay-visible .about-kicker,
    .about-overlay-visible .profile-name {
      opacity: 1;

      clip-path: inset(0);

      transition:
        opacity 0.36s ease 0.32s,
        clip-path 0.72s cubic-bezier(0.16, 1, 0.3, 1) 0.22s;
    }

    .about-overlay-visible .about-editorial-text,
    .about-overlay-visible .profile-role {
      opacity: 1;

      clip-path: inset(0);

      transition:
        opacity 0.48s ease 0.38s,
        clip-path 0.78s cubic-bezier(0.16, 1, 0.3, 1) 0.24s;
    }

    @keyframes about-focus-open {
      0% {
        opacity: 0;
        transform: scaleX(0.045);
      }

      16% {
        opacity: 0.76;
        transform: scaleX(0.045);
      }

      68% {
        opacity: 0.74;
        transform: scaleX(1);
      }

      100% {
        opacity: 0;
        transform: scaleX(1);
      }
    }
  }

  /* =========================================================
     FINAL PROBLEM STORY ALIGNMENT / ICON SAFETY
  ========================================================= */

  @media (max-width: 1024px) {
    .problem-story,
    .problem-heading-row,
    .problem-section-title {
      text-align: center;
    }

    .problem-heading-row {
      justify-content: center;
    }

    .problem-trigger {
      vertical-align: middle;
    }
  }

  @media (max-width: 767px) {
    .problem-story {
      font-size: clamp(13.5px, 3.75vw, 15px);

      line-height: 1.72;
    }

    .problem-trigger {
      gap: 0.14em;

      margin-right: 0.08em;
    }
  }

  /* =========================================================
     FINAL REFINEMENTS
     Problem heading / popup scrollbar / compact About brackets /
     original Services layout with number clearance
  ========================================================= */

  /* ---------- Problem heading ---------- */

  .problem-story-wrap {
    --problem-copy-size: clamp(18px, 1.7vw, 27px);
  }

  .problem-heading-row {
    width: 100%;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    gap: 10px;

    margin: 0 auto 22px;

    text-align: center;
  }

  .problem-heading-row::after {
    content: "";

    width: 26px;

    height: 1px;

    background: #ffffff;

    opacity: 0.82;
  }

  :global(body.light) .problem-heading-row::after {
    background: #111111;
  }

  .problem-section-title {
    max-width: 920px;

    margin: 0 auto;

    color: #ffffff;

    font-size: var(--problem-copy-size);

    font-weight: 700;

    line-height: 1.42;

    letter-spacing: -0.018em;

    text-align: center;

    text-transform: none;

    text-wrap: balance;
  }

  :global(body.light) .problem-section-title {
    color: #111111;
  }

  .problem-story {
    font-size: var(--problem-copy-size);
  }

  /* ---------- Problem popup / 1px scrollbar ---------- */

  .problem-popup {
    width: min(460px, calc(100vw - 28px));

    scrollbar-width: thin;

    scrollbar-color: #ffffff #090909;
  }

  :global(body.light) .problem-popup {
    scrollbar-color: #111111 #ffffff;
  }

  .problem-popup::-webkit-scrollbar {
    width: 1px;

    height: 1px;
  }

  .problem-popup::-webkit-scrollbar-track {
    background: #090909;
  }

  .problem-popup::-webkit-scrollbar-thumb {
    min-height: 24px;

    border: 0;

    border-radius: 0;

    background: #ffffff;
  }

  :global(body.light) .problem-popup::-webkit-scrollbar-track {
    background: #ffffff;
  }

  :global(body.light) .problem-popup::-webkit-scrollbar-thumb {
    background: #111111;
  }

  /* ---------- About profile bracket ----------
     Keep the bracket only slightly wider than the stacked role text.
  */

  @media (min-width: 768px) {
    .about-editorial-figure {
      width: max-content;

      max-width: min(100%, 320px);

      justify-self: start;
    }

    .profile-role {
      --profile-border: #ffffff;

      position: relative;

      width: max-content;

      max-width: 100%;

      display: flex;

      flex-direction: column;

      flex-wrap: nowrap;

      align-items: flex-start;

      gap: 6px;

      margin: 0;

      padding: 14px 18px;

      box-sizing: border-box;
    }

    .profile-role > span {
      width: auto;

      display: block;

      white-space: nowrap;
    }

    .profile-role > span:not(:last-child)::after {
      content: none;

      display: none;
    }

    .profile-role::before,
    .profile-role::after {
      content: "";

      position: absolute;

      top: 0;

      height: 100%;

      width: 18px;

      box-sizing: border-box;

      border-top: 1px solid var(--profile-border);

      border-bottom: 1px solid var(--profile-border);

      pointer-events: none;
    }

    .profile-role::before {
      left: 0;

      border-left: 1px solid var(--profile-border);
    }

    .profile-role::after {
      right: 0;

      border-right: 1px solid var(--profile-border);
    }

    :global(body.light) .profile-role {
      --profile-border: #ffffff;
    }
  }

  /* ---------- Original Services layout ----------
     All service panels remain visible; only keep copy away from the
     oversized background numbers on desktop.
  */

  @media (min-width: 1025px) {
    .service-detail-text {
      width: 100%;

      max-width: calc(100% - clamp(150px, 16vw, 220px));

      padding-right: 0;

      box-sizing: border-box;

      text-wrap: pretty;
    }
  }

  /* ---------- Responsive Problem heading ---------- */

  @media (min-width: 768px) and (max-width: 1024px) {
    .problem-story-wrap {
      --problem-copy-size: clamp(14px, 1.85vw, 16px);
    }

    .problem-heading-row {
      gap: 8px;

      margin-bottom: 18px;
    }

    .problem-heading-row::after {
      width: 22px;
    }

    .problem-section-title,
    .problem-story {
      text-align: center;
    }

    .problem-popup {
      width: min(485px, calc(100vw - 28px));
    }
  }

  @media (max-width: 767px) {
    .problem-story-wrap {
      --problem-copy-size: clamp(13.5px, 3.75vw, 15px);
    }

    .problem-heading-row {
      gap: 8px;

      margin-bottom: 16px;
    }

    .problem-heading-row::after {
      width: 20px;
    }

    .problem-section-title,
    .problem-story {
      text-align: center;
    }

    .problem-section-title {
      max-width: 340px;
    }

    .problem-popup {
      width: min(380px, calc(100vw - 20px));

      max-height: min(430px, calc(100dvh - 18px));
    }
  }

  /* =========================================================
     FINAL SEMANTIC + CTA POLISH
  ========================================================= */

  .problem-heading-line {
    width: 26px;

    height: 1px;

    display: block;

    background: #ffffff;

    opacity: 0.82;
  }

  :global(body.light) .problem-heading-line {
    background: #111111;
  }

  .problem-instruction {
    width: 100%;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 6px;

    margin: 0 auto 18px;

    color: rgba(255, 255, 255, 0.46);

    font-size: 10px;

    font-weight: 500;

    line-height: 1.4;

    letter-spacing: 0.01em;

    text-align: center;

    text-transform: none;
  }

  .problem-instruction-arrow {
    color: var(--accent-blue);

    font-size: 11px;

    line-height: 1;
  }

  :global(body.light) .problem-instruction {
    color: rgba(0, 0, 0, 0.5);
  }

  .problem-contact-link {
    position: relative;

    display: inline-flex;

    align-items: center;

    gap: 0.18em;

    margin: 0 0.08em;

    color: #ffffff;

    font: inherit;

    font-weight: 700;

    line-height: inherit;

    letter-spacing: inherit;

    text-decoration: none;

    white-space: nowrap;

    vertical-align: baseline;
  }

  :global(body.light) .problem-contact-link {
    color: #111111;
  }

  .problem-contact-text {
    position: relative;

    display: inline-block;
  }

  .problem-contact-text::after {
    content: "";

    position: absolute;

    right: 0;

    bottom: 0.1em;

    left: 0;

    height: 1px;

    background: var(--accent-blue);

    opacity: 0.72;

    transform-origin: left center;

    transition:
      opacity 0.18s ease,
      transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .problem-contact-icon {
    width: 1.55em;

    height: 1.55em;

    flex: 0 0 1.55em;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    margin-left: 0.08em;

    transform: translateY(0.08em);

    color: currentColor;
  }

  .problem-contact-icon svg {
    width: 100%;

    height: 100%;

    display: block;

    fill: none;

    stroke: currentColor;

    stroke-width: 0.72;

    stroke-linecap: round;

    stroke-linejoin: round;

    transition:
      stroke 0.18s ease,
      transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .problem-contact-link:hover,
  .problem-contact-link:focus-visible {
    color: var(--accent-blue);

    outline: none;
  }

  .problem-contact-link:hover .problem-contact-text::after,
  .problem-contact-link:focus-visible .problem-contact-text::after {
    opacity: 1;

    transform: scaleX(1.08);
  }

  .problem-contact-link:hover .problem-contact-icon svg,
  .problem-contact-link:focus-visible .problem-contact-icon svg {
    transform: translateY(-1px);
  }

  .problem-popup-label {
    margin: 0 0 10px;

    font: inherit;
  }

  /* The repeated popup keyword/title was intentionally removed. */
  .problem-popup-keyword {
    display: none;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .problem-story-wrap {
      width: calc(100% - 32px);

      padding-inline: 16px;

      box-sizing: border-box;
    }

    .problem-instruction {
      margin-bottom: 16px;

      font-size: 10px;
    }
  }

  @media (max-width: 767px) {
    .problem-story-wrap {
      width: calc(100% - 24px);

      padding-inline: 8px;

      box-sizing: border-box;
    }

    .problem-instruction {
      max-width: 310px;

      margin-bottom: 15px;

      font-size: 10px;

      line-height: 1.45;
    }

    .problem-contact-icon {
      width: 1.45em;

      height: 1.45em;

      flex-basis: 1.45em;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .problem-contact-link,
    .problem-contact-link *,
    .problem-contact-icon svg {
      transition: none !important;
    }
  }

  /* =========================================================
     FINAL COPY / ABOUT AVAILABILITY POLISH
  ========================================================= */

  .about-editorial-title {
    right: 30px;

    left: auto;

    width: auto;

    display: flex;

    justify-content: flex-end;

    margin: 0;

    font-weight: 400;

    text-align: right;

    text-transform: uppercase;
  }

  .about-availability {
    display: inline-flex;

    align-items: center;

    justify-content: flex-end;

    gap: 14px;

    width: max-content;

    max-width: 100%;
  }

  .about-availability-pulse {
    width: 7px;

    height: 7px;

    flex: 0 0 7px;

    border-radius: 50%;

    background: #ffffff;

    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.24);

    animation: about-availability-pulse 1.8s ease-in-out infinite;
  }

  .about-title-static {
    width: auto;

    display: inline-block;

    margin: 0;

    padding: 0;

    color: rgba(255, 255, 255, 0.96);

    font-size: inherit;

    font-weight: 400;

    line-height: 1.1;

    letter-spacing: 0.14em;

    text-align: right;

    text-shadow: 0 2px 18px rgba(0, 0, 0, 0.3);

    text-wrap: balance;
  }

  .about-title-static::after {
    content: none;

    display: none;
  }

  @keyframes about-availability-pulse {
    0%,
    100% {
      transform: scale(0.78);

      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }

    50% {
      transform: scale(1);

      box-shadow: 0 0 0 7px rgba(255, 255, 255, 0.08);
    }
  }

  /*
   * Restore the open white bracket around the
   * "How I can help you" description.
   */
  .about-editorial-text {
    --editorial-border: #ffffff;

    position: relative;

    padding: 17px 24px;
  }

  .about-editorial-text::before,
  .about-editorial-text::after {
    content: "";

    position: absolute;

    top: 0;

    height: 100%;

    width: 28px;

    box-sizing: border-box;

    border-top: 1px solid var(--editorial-border);

    border-bottom: 1px solid var(--editorial-border);

    pointer-events: none;
  }

  .about-editorial-text::before {
    left: 0;

    border-left: 1px solid var(--editorial-border);
  }

  .about-editorial-text::after {
    right: 0;

    border-right: 1px solid var(--editorial-border);
  }

  :global(body.light) .about-editorial-text {
    --editorial-border: #ffffff;
  }

  @media (min-width: 1025px) {
    .about-editorial-title {
      right: 34px;

      bottom: 24px;

      left: auto;

      font-size: clamp(10.4px, 0.96vw, 14.4px);

      font-weight: 400;
    }

    .about-availability {
      gap: 16px;
    }

    .about-title-static {
      font-weight: 300;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .about-editorial-title {
      right: 20px;

      bottom: 16px;

      left: auto;

      font-size: clamp(11px, 1.7vw, 15px);

      font-weight: 400;

      text-align: right;
    }

    .about-availability {
      gap: 12px;
    }

    .about-availability-pulse {
      width: 6px;

      height: 6px;

      flex-basis: 6px;
    }

    .about-title-static {
      letter-spacing: 0.12em;
    }
  }

  @media (max-width: 767px) {
    .about-editorial-title {
      right: 14px;

      bottom: 12px;

      left: auto;

      max-width: calc(100% - 28px);

      font-size: clamp(9.5px, 2.7vw, 12.5px);

      font-weight: 400;

      text-align: right;
    }

    .about-availability {
      gap: 9px;
    }

    .about-availability-pulse {
      width: 5px;

      height: 5px;

      flex-basis: 5px;
    }

    .about-title-static {
      letter-spacing: 0.1em;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .about-availability-pulse {
      animation: none;
    }
  }

  @media (max-width: 767px) {
    :global(body.light) .about-editorial-text {
      --editorial-border: #111111;
    }
  }

  /* =========================================================
     LIGHT MODE ABOUT BRACKETS — TABLET + MOBILE
     The mobile bracket belongs to .about-top-copy, while tablet
     still uses the bracket on .about-editorial-text.
  ========================================================= */

  @media (min-width: 768px) and (max-width: 1024px) {
    :global(body.light) .about-editorial-text {
      --editorial-border: #111111;
    }
  }

  @media (max-width: 767px) {
    :global(body.light) .about-top-copy {
      --editorial-border: #111111;
    }

    :global(body.light) .about-editorial-text {
      --editorial-border: #111111;
    }
  }

  /* =========================================================
     SERVICE DETAIL INSET SPACING — DARK MODE ONLY
     Light mode intentionally keeps the original layout unchanged.
  ========================================================= */

  @media (min-width: 768px) {
    :global(body:not(.light)) .service-detail-panel {
      position: relative;

      padding-left: 24px;
      padding-right: 24px;

      background: transparent;
    }

    /*
     * Dark mode only:
     * inset the selected background while keeping the divider line
     * full-width across the right service column.
     */
    :global(body:not(.light)) .service-detail-panel::before {
      content: "";

      position: absolute;

      top: 8px;
      right: 10px;
      bottom: 8px;
      left: 10px;

      z-index: 0;

      background: transparent;

      pointer-events: none;

      transition: background-color 0.25s ease;
    }

    :global(body:not(.light)) .service-detail-panel.active {
      background: transparent;

      box-shadow: none;
    }

    :global(body:not(.light)) .service-detail-panel.active::before {
      background: rgba(255, 255, 255, 0.045);
    }

    :global(body:not(.light)) .service-detail-heading,
    :global(body:not(.light)) .service-detail-text,
    :global(body:not(.light)) .service-detail-tags {
      position: relative;

      z-index: 2;
    }

    :global(body:not(.light)) .service-detail-number {
      right: 32px;

      z-index: 1;
    }
  }

  @media (min-width: 1025px) {
    :global(body:not(.light)) .service-detail-panel {
      padding-left: 30px;
      padding-right: 30px;
    }

    :global(body:not(.light)) .service-detail-panel::before {
      right: 14px;
      left: 14px;
    }

    :global(body:not(.light)) .service-detail-number {
      right: 40px;
    }

    /*
     * Keep the dark-mode description comfortably clear of the
     * oversized background number.
     */
    :global(body:not(.light)) .service-detail-text {
      width: 100%;

      max-width: calc(100% - clamp(170px, 17vw, 235px));

      padding-right: 0;

      box-sizing: border-box;
    }
  }

  /* =========================================================
     MOBILE / TABLET PROBLEM POPUP REFINEMENTS
  ========================================================= */

  @media (max-width: 1024px) {
    .problem-popup-label {
      font-size: 70%;
      line-height: 1.25;
      letter-spacing: 0.08em;
    }
  }

  @media (max-width: 767px) {
    .problem-popup-label {
      font-size: 68%;
    }
  }

  .about-experience-stack {
    display: none;
  }

  @media (min-width: 768px) {
    .experience-rail {
      display: none;
    }

    .about-experience-stack {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      width: max-content;
      max-width: 100%;
      gap: 20px;
      margin-top: auto;
      padding-top: 24px;
      flex-shrink: 0;
    }

    .about-editorial-figure {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .about-editorial-figure > .profile-name,
    .about-editorial-figure > .profile-role {
      flex-shrink: 0;
    }

    .about-experience-card {
      max-width: 100%;
      color: #fff;
      text-align: center;
      text-shadow: 0 1px 14px rgba(0, 0, 0, 0.44);
    }

    .about-experience-heading {
      display: block;
      margin-bottom: 6px;
      font-size: 13px;
      font-weight: 800;
      line-height: 1.2;
      letter-spacing: 0.11em;
      text-transform: uppercase;
    }

    .about-experience-copy {
      position: relative;
      display: block;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      padding: 12px 24px;
      font-size: 12px;
      line-height: 1.48;
      color: rgba(255, 255, 255, 0.82);
    }

    .about-experience-copy::before,
    .about-experience-copy::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 20px;
      border-top: 1px solid #fff;
      border-bottom: 1px solid #fff;
      pointer-events: none;
    }

    .about-experience-copy::before {
      left: 0;
      border-left: 1px solid #fff;
    }

    .about-experience-copy::after {
      right: 0;
      border-right: 1px solid #fff;
    }

    .about-editorial-title {
      top: 36px;
      right: 38px;
      bottom: auto;
      max-width: min(680px, calc(100% - 380px));
    }

    .about-below-copy {
      bottom: 24px;
      grid-template-rows: minmax(0, 1fr);
    }

    .about-top-copy {
      align-self: end;
    }

    .about-reveal-frame {
      display: none;
      animation: none;
    }

    .about-editorial .about-kicker,
    .about-editorial .about-editorial-text,
    .about-editorial .profile-name,
    .about-editorial .profile-role {
      opacity: 1 !important;
      clip-path: none !important;
      transition: none !important;
      animation: none !important;
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    .about-editorial {
      position: relative;
    }

    .about-below-copy {
      position: absolute;
      inset: 24px 24px 24px;
      z-index: 4;
      width: auto;
      margin: 0;
      padding: 0;
      grid-template-columns: minmax(140px, 1fr) minmax(0, 1.5fr);
      grid-template-rows: minmax(0, 1fr);
      gap: 32px;
      pointer-events: none;
    }

    .about-editorial-figure {
      grid-column: 1;
      grid-row: 1;
      align-self: stretch;
      width: 100%;
      margin: 0;
    }

    .about-top-copy {
      grid-column: 2;
      grid-row: 1;
      align-self: end;
      width: 100%;
    }

    .about-editorial-title {
      top: 24px;
      right: 24px;
      bottom: auto;
      max-width: 54%;
      font-size: clamp(7.7px, 1.19vw, 10.5px);
    }

    .about-availability-pulse {
      width: 8.4px;
      height: 8.4px;
      flex-basis: 8.4px;
    }

    .profile-role {
      position: relative;
      flex-direction: column;
      align-items: flex-start;
      gap: 7px;
      width: fit-content;
      max-width: 100%;
      padding: 12px 18px;
      border: 0;
      font-size: 10px;
    }

    .about-editorial .profile-role::before,
    .about-editorial .profile-role::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 20px;
      border-top: 1px solid #fff;
      border-bottom: 1px solid #fff;
      pointer-events: none;
    }

    .about-editorial .profile-role::before {
      left: 0;
      border-left: 1px solid #fff;
    }

    .about-editorial .profile-role::after {
      right: 0;
      border-right: 1px solid #fff;
    }

    .profile-name,
    .about-kicker {
      margin: 0 0 8px;
      font-size: 10px;
      font-weight: 700;
    }

    .about-editorial-text {
      margin: 0;
      padding: 12px 18px;
      font-size: 12px;
      line-height: 1.5;
    }

    .about-experience-heading {
      font-size: 8.5px;
      margin-bottom: 3px;
    }

    .about-experience-copy {
      font-size: 8px;
      padding: 8px 12px;
    }

    .about-experience-stack {
      gap: 12px;
    }

    .about-editorial .profile-name,
    .about-editorial .profile-role,
    .about-editorial .about-title-static,
    .about-editorial .about-experience-heading,
    .about-editorial .about-experience-copy,
    .about-editorial .about-kicker,
    .about-editorial .about-editorial-text {
      color: #fff;
      --editorial-border: #fff;
      text-shadow: 0 1px 14px rgba(0, 0, 0, 0.44);
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .about-editorial .about-editorial-text,
    :global(body.light) .about-editorial .about-editorial-text {
      --editorial-border: #ffffff;
    }

    :global(body.light) .about-editorial .profile-name,
    :global(body.light) .about-editorial .profile-role,
    :global(body.light) .about-editorial .about-title-static,
    :global(body.light) .about-editorial .about-experience-heading,
    :global(body.light) .about-editorial .about-experience-copy,
    :global(body.light) .about-editorial .about-kicker,
    :global(body.light) .about-editorial .about-editorial-text {
      color: #ffffff;
    }
  }

  @media (max-width: 767px) {
    .about-top-copy {
      gap: 0;
    }

    .about-kicker {
      margin: 0 0 6px;
    }

    .about-editorial-text {
      margin: 0;
      padding: 0;
      text-indent: 0;
      text-align: left;
    }
  }
</style>

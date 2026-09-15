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

      webdesign: ["UI Design", "UX", "Responsive", "Brand Look", "Wireframes"],

      "web development": [
        "SvelteKit",
        "WordPress",
        "Frontend",
        "Backend",
        "Clean Code",
      ],

      webentwicklung: [
        "SvelteKit",
        "WordPress",
        "Frontend",
        "Backend",
        "Clean Code",
      ],

      wordpress: ["Themes", "Plugins", "CMS", "WooCommerce"],

      seo: ["Keywords", "On Page SEO", "Analytics", "Performance", "Search"],

      ecommerce: ["Shopify", "WooCommerce", "Checkout", "Products", "Payments"],

      webshop: ["Shopify", "WooCommerce", "Checkout", "Products", "Payments"],

      branding: ["Logo", "Identity", "Typography", "Colors", "Style Guide"],

      marketing: ["Campaigns", "Ads", "Content", "Tracking", "Growth"],

      hosting: ["Server", "SSL", "Backups", "DNS"],

      support: ["Updates", "Security", "Support", "Backups"],

      wartung: ["Updates", "Sicherheit", "Support", "Backups"],
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

  /* =========================================================
     GENERAL
  ========================================================= */

  let headerVisible = $state(false);

  let problemStoryVisible = $state(false);

  let aboutOverlayVisible = $state(false);

  /* =========================================================
     LANGUAGE
  ========================================================= */

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

  const resolvedProblemTitle = $derived(
    problemLanguage === "en"
      ? "AVAILABLE FOR YOUR PROJECT"
      : "VERFÜGBAR FÜR DEIN PROJEKT",
  );

  const resolvedProblemCloseLabel = $derived(
    problemCloseLabel ?? (problemLanguage === "en" ? "Close" : "Schließen"),
  );

  /* =========================================================
     TOP STORY
  ========================================================= */

  const problemStoryParts = $derived(
    problemLanguage === "en"
      ? [
          {
            text: "Your website should turn the right ",
          },

          {
            index: 1,
            label: "visitors",
            icon: "globe",
          },

          {
            text: " into enquiries, let you make simple ",
          },

          {
            index: 2,
            label: "edits",
            icon: "bento",
          },

          {
            text: " yourself and stay ",
          },

          {
            index: 3,
            label: "fast",
            icon: "speed",
          },

          {
            text: ". ",
          },

          {
            index: 0,
            label: "Planning",
            icon: "glasses",
          },

          {
            text: " should be clear, ",
          },

          {
            index: 4,
            label: "communication",
            icon: "chat",
          },

          {
            text: " direct, and your ",
          },

          {
            index: 5,
            label: "budget",
            icon: "magnifier",
          },

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

          {
            index: 1,
            label: "Besucher",
            icon: "globe",
          },

          {
            text: " in Anfragen verwandeln, einfache ",
          },

          {
            index: 2,
            label: "Änderungen",
            icon: "bento",
          },

          {
            text: " ermöglichen und ",
          },

          {
            index: 3,
            label: "schnell",
            icon: "speed",
          },

          {
            text: " bleiben. Die ",
          },

          {
            index: 0,
            label: "Planung",
            icon: "glasses",
          },

          {
            text: " sollte klar, die ",
          },

          {
            index: 4,
            label: "Kommunikation",
            icon: "chat",
          },

          {
            text: " direkt und dein ",
          },

          {
            index: 5,
            label: "Budget",
            icon: "magnifier",
          },

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

  /* =========================================================
     PROBLEM POPUP
  ========================================================= */

  let openProblemIndex = $state(-1);

  let problemPopupLeft = $state(0);

  let problemPopupTop = $state(0);

  let problemPopupAnchorOffset = $state(40);

  let problemPopupPlacement = $state("below");

  let problemPopupReady = $state(false);

  let problemCloseTimer;

  let problemAnchorElement = null;

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

  function canUseProblemHover() {
    if (typeof window === "undefined") {
      return false;
    }

    return (
      window.innerWidth >= 1025 &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
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
    if (typeof window === "undefined" || !anchor || index < 0) {
      return;
    }

    problemAnchorElement = anchor;

    problemPopupReady = false;

    await tick();

    if (problemAnchorElement !== anchor || openProblemIndex !== index) {
      return;
    }

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

  /* =========================================================
     SERVICES
     DESKTOP: HOVER + CLICK
     TABLET: CLICK ONLY
  ========================================================= */

  let selectedServiceIndex = $state(0);

  let hoveredServiceIndex = $state(-1);

  const activeServiceIndex = $derived(
    hoveredServiceIndex >= 0 ? hoveredServiceIndex : selectedServiceIndex,
  );

  function canPreviewService() {
    if (typeof window === "undefined") {
      return false;
    }

    return (
      window.innerWidth >= 1025 &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }

  function previewService(event, index) {
    if (!canPreviewService()) return;

    hoveredServiceIndex = index;
  }

  function clearServicePreview() {
    if (!canPreviewService()) return;

    hoveredServiceIndex = -1;
  }

  function focusService(index) {
    if (!canPreviewService()) return;

    hoveredServiceIndex = index;
  }

  function clearServiceFocus() {
    if (!canPreviewService()) return;

    hoveredServiceIndex = -1;
  }

  function selectService(index) {
    selectedServiceIndex = index;

    hoveredServiceIndex = -1;
  }

  /* =========================================================
     MOBILE SERVICE ACCORDION
  ========================================================= */

  let openServiceIndex = $state(0);

  function toggleServiceDescription(index) {
    openServiceIndex = openServiceIndex === index ? -1 : index;
  }

  /* =========================================================
     SERVICE TITLE NORMALISATION
  ========================================================= */

  function getServiceTriggerTitle(service) {
    const raw = String(service?.title ?? "").trim();

    if (/wordpress[\s-]*(development|developer)/i.test(raw)) {
      return "WEB DEVELOPMENT";
    }

    if (/wordpress[\s-]*(entwicklung|entwickler)/i.test(raw)) {
      return "WEBENTWICKLUNG";
    }

    return raw;
  }

  /* =========================================================
     BULLET DESCRIPTIONS
  ========================================================= */

  function getServiceBulletPoints(service) {
    if (Array.isArray(service?.bullets) && service.bullets.length) {
      return service.bullets
        .map((item) => String(item ?? "").trim())
        .filter(Boolean);
    }

    const text = String(service?.text ?? "").trim();

    if (!text) return [];

    const sentences = text
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter(Boolean);

    if (sentences.length > 1) {
      return sentences;
    }

    return [text];
  }

  function getServiceTags(service) {
    const serviceTitle = String(service?.title ?? "").toLowerCase();

    const foundKey = Object.keys(serviceKeywords).find((key) =>
      serviceTitle.includes(key),
    );

    return foundKey ? serviceKeywords[foundKey] : fallbackServiceTags;
  }

  const reorderedServices = $derived(services);

  /* =========================================================
     EXPERIENCE
  ========================================================= */

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

    const sliderQuery = window.matchMedia(
      "(min-width: 768px) and (max-width: 1024px)",
    );

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
      if (!sliderQuery.matches) {
        return;
      }

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

    node.addEventListener("pointerdown", pauseTemporarily, {
      passive: true,
    });

    node.addEventListener("wheel", pauseTemporarily, {
      passive: true,
    });

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

  /* =========================================================
     TOOLS
  ========================================================= */

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

  /* =========================================================
     OBSERVERS
  ========================================================= */

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

  /* =========================================================
     GLOBAL PROBLEM EVENTS
  ========================================================= */

  onMount(() => {
    const resetProblemState = () => {
      window.clearTimeout(problemCloseTimer);

      openProblemIndex = -1;

      problemPopupReady = false;

      problemAnchorElement = null;
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        resetProblemState();
      }
    };

    const closeOnOutsidePointer = (event) => {
      if (openProblemIndex < 0) {
        return;
      }

      const target = event.target;

      if (
        target instanceof Element &&
        (target.closest(".problem-trigger") || target.closest(".problem-popup"))
      ) {
        return;
      }

      resetProblemState();
    };

    window.addEventListener("keydown", closeOnEscape);

    window.addEventListener("pointerdown", closeOnOutsidePointer, true);

    window.addEventListener("resize", resetProblemState);

    return () => {
      window.clearTimeout(problemCloseTimer);

      window.removeEventListener("keydown", closeOnEscape);

      window.removeEventListener("pointerdown", closeOnOutsidePointer, true);

      window.removeEventListener("resize", resetProblemState);
    };
  });
</script>

<section id="services" class="services">
  <div class="services-shell">
    <div class="shell-line edge-left" aria-hidden="true"></div>

    <div class="shell-line edge-right" aria-hidden="true"></div>

    <div class="shell-bottom-line" aria-hidden="true"></div>

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
                <span class="problem-instruction-arrow" aria-hidden="true">
                  ↳
                </span>

                <span class="problem-instruction-text">
                  {resolvedProblemInstruction}
                </span>
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
                    <span class="problem-trigger-text">
                      {part.label}
                    </span>

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
                    <span class="problem-contact-text">
                      {part.label}
                    </span>

                    <span class="problem-contact-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <rect x="4.5" y="6.5" width="15" height="13"></rect>

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
                  <h4 class="problem-popup-label">
                    {problemLabel}
                  </h4>

                  <p>
                    {getProblemText(item, index)}
                  </p>
                </div>

                <div class="problem-popup-block problem-popup-solution">
                  <h4 class="problem-popup-label">
                    {solutionLabel}
                  </h4>

                  <p>
                    {getSolutionText(item, index)}
                  </p>
                </div>
              </div>
            </div>
          {/each}
        </section>
      {/if}

      <!-- =====================================================
           ABOUT
      ====================================================== -->

      {#if stats}
        <section class="premium-about" aria-labelledby="premium-about-title">
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
                    <span class="experience-title-first">
                      {stat.title.split(/\s+/)[0]}
                    </span>

                    {#if stat.title.split(/\s+/).slice(1).length}
                      <span class="experience-title-rest">
                        {stat.title.split(/\s+/).slice(1).join(" ")}
                      </span>
                    {/if}
                  </p>
                </article>
              {/each}
            </div>
          </aside>

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

              <div class="about-image-caption">
                <h2 id="premium-about-title" class="about-editorial-title">
                  <span class="about-availability">
                    <span class="about-availability-pulse" aria-hidden="true"
                    ></span>

                    <span class="about-title-static">
                      {resolvedProblemTitle}
                    </span>
                  </span>
                </h2>

                <div class="about-mobile-identity">
                  <span class="profile-name">
                    {profileName}
                  </span>

                  <span class="profile-role">
                    {#each profileRole.split(/\s*·\s*/) as role}
                      <span>
                        {role}
                      </span>
                    {/each}
                  </span>
                </div>
              </div>
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

                <span class="profile-name">
                  {profileName}
                </span>

                <span class="profile-role">
                  {#each profileRole.split(/\s*·\s*/) as role}
                    <span>
                      {role}
                    </span>
                  {/each}
                </span>

                <div
                  class="about-experience-stack"
                  aria-label={experienceLabel}
                >
                  {#each normalizedStats as stat}
                    <div class="about-experience-card">
                      <span class="about-experience-copy">
                        <span class="about-experience-heading">
                          {stat.title.split(/\s+/)[0]}
                        </span>

                        {stat.title.split(/\s+/).slice(1).join(" ")}
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
           SERVICES HEADER
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
            <p class="services-subtitle">
              {subtitle}
            </p>
          {/if}
        </div>
      </div>

      <!-- =====================================================
           SERVICES
      ====================================================== -->

      <section class="services-showcase" aria-label={title}>
        <div class="services-desktop-workspace">
          <!-- LEFT TRIGGERS -->

          <nav class="service-trigger-list" aria-label={title}>
            {#each reorderedServices as service, index}
              <button
                type="button"
                class="service-trigger"
                class:active={activeServiceIndex === index}
                aria-pressed={selectedServiceIndex === index}
                aria-controls={`service-panel-${index}`}
                onpointerenter={(event) => previewService(event, index)}
                onpointerleave={clearServicePreview}
                onfocus={() => focusService(index)}
                onblur={clearServiceFocus}
                onclick={() => selectService(index)}
              >
                {#if service.icon}
                  <img
                    src={service.icon}
                    alt=""
                    class="service-trigger-icon"
                    loading="lazy"
                    decoding="async"
                    aria-hidden="true"
                  />
                {/if}

                <span class="service-trigger-text">
                  {getServiceTriggerTitle(service)}
                </span>
              </button>
            {/each}
          </nav>

          <!-- RIGHT ACTIVE CARD -->

          <div class="service-detail-list">
            {#each reorderedServices as service, index}
              <article
                id={`service-panel-${index}`}
                class="service-detail-panel"
                class:active={activeServiceIndex === index}
                aria-hidden={activeServiceIndex !== index}
              >
                <!-- RESTORED NUMBER -->

                <div class="service-detail-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {#if service.icon}
                  <div class="service-detail-icon-wrap" aria-hidden="true">
                    <img
                      src={service.icon}
                      alt=""
                      class="service-detail-icon"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                {/if}

                <div class="service-detail-heading">
                  <h3>
                    {service.title}
                  </h3>
                </div>

                <ul class="service-detail-bullets" aria-label={service.title}>
                  {#each getServiceBulletPoints(service) as point}
                    <li>
                      <span class="service-bullet-dot" aria-hidden="true"
                      ></span>

                      <span class="service-bullet-copy">
                        {point}
                      </span>
                    </li>
                  {/each}
                </ul>

                <div
                  class="service-tags service-detail-tags"
                  role="group"
                  aria-label={serviceKeywordsLabel}
                >
                  {#each getServiceTags(service) as tag}
                    <span>
                      {tag}
                    </span>
                  {/each}
                </div>
              </article>
            {/each}
          </div>
        </div>

        <!-- MOBILE -->

        <div class="services-grid services-mobile-grid">
          {#each reorderedServices as service, index}
            <article class="service-card">
              <!-- RESTORED MOBILE NUMBER -->

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
                  <h3>
                    {service.title}
                  </h3>
                </div>

                {#if openServiceIndex === index}
                  <ul
                    class="service-mobile-description"
                    id={`service-description-${index}`}
                  >
                    {#each getServiceBulletPoints(service) as point}
                      <li>
                        <span class="service-bullet-dot" aria-hidden="true"
                        ></span>

                        <span>
                          {point}
                        </span>
                      </li>
                    {/each}
                  </ul>
                {/if}

                <div class="service-mobile-tags-row">
                  <div
                    class="service-tags"
                    role="group"
                    aria-label={serviceKeywordsLabel}
                  >
                    {#each getServiceTags(service) as tag}
                      <span>
                        {tag}
                      </span>
                    {/each}
                  </div>

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
          <span>
            {toolsLabel}
          </span>

          <h2 id="free-tools-title">
            {toolsSectionTitle}
          </h2>
        </div>

        <div class="free-tools-grid">
          {#each toolLinks as tool}
            <article class="website-tool-card">
              <div class="website-tool-card-inner">
                <div class="website-tool-copy">
                  <h3>
                    {tool.title}
                  </h3>

                  <p>
                    {tool.text}
                  </p>
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
     BASE
  ========================================================= */

  .services {
    --accent-blue: #0043ff;

    --type-body: 15px;

    --weight-regular: 400;
    --weight-semibold: 600;
    --weight-bold: 700;

    --services-component-title-size: clamp(24px, 2.15vw, 34px);

    --services-block-gap: 78px;

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

    padding: 96px var(--shell-x) 140px;

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

  .edge-left {
    left: 0;
  }

  .edge-right {
    right: 0;
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

  .services-container {
    position: relative;

    z-index: 1;

    width: 100%;

    display: flex;

    flex-direction: column;
  }

  /* =========================================================
     PROBLEM STORY
  ========================================================= */

  .problem-workspace {
    width: 100%;

    margin-bottom: 112px;
  }

  .problem-story-wrap {
    --problem-copy-size: clamp(18px, 1.7vw, 27px);

    width: 100%;

    max-width: 1180px;

    margin: 0 auto;

    text-align: center;
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

  .problem-section-title {
    max-width: 920px;

    margin: 0 auto;

    color: #ffffff;

    font-size: var(--problem-copy-size);

    font-weight: 700;

    line-height: 1.42;

    letter-spacing: -0.018em;

    text-align: center;

    text-wrap: balance;
  }

  :global(body.light) .problem-section-title {
    color: #111111;
  }

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

    text-align: center;
  }

  .problem-instruction-arrow {
    color: var(--accent-blue);

    font-size: 11px;

    line-height: 1;
  }

  .problem-instruction-text {
    color: inherit;
  }

  :global(body.light) .problem-instruction {
    color: rgba(0, 0, 0, 0.5);
  }

  .problem-story {
    max-width: 1080px;

    margin: 0 auto;

    color: #8f8f8f;

    font-size: var(--problem-copy-size);

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

    filter: none;
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

    padding: 0;

    border: 0;

    background: transparent;

    color: #ffffff;

    font: inherit;

    font-weight: 700;

    line-height: inherit;

    cursor: pointer;

    white-space: nowrap;

    vertical-align: baseline;
  }

  :global(body.light) .problem-trigger {
    color: #111111;
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

  .problem-trigger:hover .problem-trigger-text::after,
  .problem-trigger:focus-visible .problem-trigger-text::after,
  .problem-trigger.active .problem-trigger-text::after {
    opacity: 1;

    transform: scaleX(1.08);
  }

  /* =========================================================
     INTERACTIVE INLINE ICONS
     RESTORED ANIMATIONS
  ========================================================= */

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

    fill: none;

    stroke-width: 0.68;

    stroke-linecap: round;

    stroke-linejoin: round;
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

  /* GLOBE */

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

  /* BENTO */

  .problem-icon-bento .tile {
    transform-box: fill-box;

    transform-origin: center;

    transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
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

  /* SPEED */

  .problem-trigger:hover .problem-icon-speed .speed-needle,
  .problem-trigger:focus-visible .problem-icon-speed .speed-needle,
  .problem-trigger.active .problem-icon-speed .speed-needle {
    transform-box: fill-box;

    transform-origin: 0% 100%;

    animation: problem-speed-needle 0.62s cubic-bezier(0.16, 1, 0.3, 1) infinite
      alternate;
  }

  /* GLASSES */

  .problem-trigger:hover .problem-icon-glasses,
  .problem-trigger:focus-visible .problem-icon-glasses,
  .problem-trigger.active .problem-icon-glasses {
    animation: problem-glasses-tilt 0.7s ease-in-out infinite alternate;
  }

  /* CHAT */

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

  /* MAGNIFIER */

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

  /* =========================================================
     CALL LINK
  ========================================================= */

  .problem-contact-link {
    position: relative;

    display: inline-flex;

    align-items: center;

    gap: 0.18em;

    color: #ffffff;

    font: inherit;

    font-weight: 700;

    line-height: inherit;

    text-decoration: none;

    white-space: nowrap;
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

    transition:
      opacity 0.18s ease,
      transform 0.22s ease;
  }

  .problem-contact-link:hover .problem-contact-text::after,
  .problem-contact-link:focus-visible .problem-contact-text::after {
    opacity: 1;

    transform: scaleX(1.08);
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
  }

  .problem-contact-icon svg {
    width: 100%;

    height: 100%;

    fill: none;

    stroke: currentColor;

    stroke-width: 0.72;

    stroke-linecap: round;

    stroke-linejoin: round;
  }

  /* =========================================================
     POPUP
  ========================================================= */

  .problem-popup {
    position: fixed;

    top: var(--problem-popup-top);

    left: var(--problem-popup-left);

    z-index: 9998;

    width: min(460px, calc(100vw - 28px));

    max-height: min(520px, calc(100dvh - 24px));

    overflow-y: auto;

    padding: 26px 28px 28px;

    border: 1px solid rgba(255, 255, 255, 0.16);

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
      transform 0.18s ease,
      visibility 0s linear 0.18s;
  }

  .problem-popup.active.ready {
    opacity: 1;

    visibility: visible;

    pointer-events: auto;

    transform: translateY(0);

    transition:
      opacity 0.18s ease,
      transform 0.18s ease,
      visibility 0s;
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

  .problem-popup-content {
    display: grid;

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

  .problem-popup-label {
    margin: 0 0 10px;

    color: #ffffff;

    font-size: 10px;

    font-weight: 700;

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

  .problem-popup-block p {
    margin: 0;

    color: rgba(255, 255, 255, 0.68);

    font-size: 14px;

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

    top: 10px;
    right: 10px;

    width: 32px;
    height: 32px;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    border: 0;

    background: transparent;

    color: #ffffff;

    font-size: 24px;

    cursor: pointer;
  }

  :global(body.light) .problem-popup-close {
    color: #111111;
  }

  @media (min-width: 1025px) and (hover: hover) and (pointer: fine) {
    .problem-popup-close {
      display: none;
    }
  }

  /* =========================================================
     ABOUT
  ========================================================= */

  .premium-about {
    width: 100%;

    margin: 0 auto;

    padding: 0 0 92px;
  }

  .experience-rail {
    width: 100%;

    margin-bottom: 38px;
  }

  .experience-toolbar {
    display: none;
  }

  .experience-list {
    width: 100%;

    display: grid;

    grid-template-columns: repeat(4, minmax(0, 1fr));

    gap: 90px;
  }

  .experience-item {
    --experience-border: rgba(255, 255, 255, 0.42);

    position: relative;

    min-height: 13px;

    display: flex;

    align-items: center;

    justify-content: center;

    padding: 8px 24px;

    text-align: center;
  }

  .experience-item::before,
  .experience-item::after {
    content: "";

    position: absolute;

    top: 0;
    bottom: 0;

    width: 28px;

    border-top: 1px solid var(--experience-border);

    border-bottom: 1px solid var(--experience-border);
  }

  .experience-item::before {
    left: 0;

    border-left: 1px solid var(--experience-border);
  }

  .experience-item::after {
    right: 0;

    border-right: 1px solid var(--experience-border);
  }

  :global(body.light) .experience-item {
    --experience-border: rgba(0, 0, 0, 0.4);
  }

  .experience-title {
    width: 100%;

    margin: 0;

    display: flex;

    flex-direction: column;

    align-items: center;

    gap: 2px;

    color: #ffffff;

    font-weight: 700;

    line-height: 1.16;

    text-transform: uppercase;
  }

  .experience-title-first {
    font-size: clamp(13.2px, 0.96vw, 15.8px);

    font-weight: 700;
  }

  .experience-title-rest {
    font-size: clamp(10px, 0.74vw, 12.1px);

    font-weight: 400;

    line-height: 1.28;
  }

  :global(body.light) .experience-title {
    color: #111111;
  }

  .about-editorial {
    position: relative;

    width: 100%;
  }

  .about-profile {
    position: relative;

    width: 100%;

    overflow: hidden;

    border: 1px solid rgba(255, 255, 255, 0.13);

    background: #111111;

    isolation: isolate;
  }

  :global(body.light) .about-profile {
    border-color: rgba(0, 0, 0, 0.14);

    background: #e7e7e7;
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

  .about-image-wrap {
    position: relative;

    width: 100%;

    height: 70vh;

    min-height: 520px;

    max-height: 760px;

    overflow: hidden;
  }

  .about-image-wrap img {
    width: 100%;

    height: 100%;

    display: block;

    object-fit: cover;

    object-position: left top;

    filter: grayscale(1);
  }

  .about-image-wrap::after {
    content: "";

    position: absolute;

    inset: auto 0 0;

    height: 24%;

    z-index: 1;

    background: linear-gradient(
      to top,
      rgba(8, 8, 8, 0.46) 0%,
      rgba(8, 8, 8, 0.14) 48%,
      transparent 100%
    );
  }

  .about-image-caption {
    display: contents;
  }

  .about-editorial-title {
    position: absolute;

    top: 36px;
    right: 34px;

    z-index: 5;

    margin: 0;

    display: flex;

    justify-content: flex-end;

    color: #ffffff;

    font-size: clamp(10.4px, 0.96vw, 14.4px);

    font-weight: 400;

    text-align: right;

    text-transform: uppercase;
  }

  .about-availability {
    display: inline-flex;

    align-items: center;

    justify-content: flex-end;

    gap: 16px;
  }

  /* BLUE ON ALL DEVICES */

  .about-availability-pulse {
    width: 7px;
    height: 7px;

    flex: 0 0 7px;

    border-radius: 50%;

    background: var(--accent-blue);

    box-shadow: 0 0 0 0 rgba(0, 67, 255, 0);

    animation: about-availability-pulse 1.8s ease-in-out infinite;
  }

  @keyframes about-availability-pulse {
    0%,
    100% {
      transform: scale(0.78);

      box-shadow: 0 0 0 0 rgba(0, 67, 255, 0);
    }

    50% {
      transform: scale(1);

      box-shadow: 0 0 0 7px rgba(0, 67, 255, 0.15);
    }
  }

  .about-title-static {
    color: rgba(255, 255, 255, 0.96);

    font-size: 12px;

    font-weight: 700;

    line-height: 1.1;

    letter-spacing: 0.14em;

    text-align: right;

    text-shadow: 0 2px 18px rgba(0, 0, 0, 0.3);
  }

  .about-mobile-identity {
    display: none;
  }

  .about-below-copy {
    position: absolute;

    top: 36px;
    right: 38px;
    bottom: 24px;
    left: 38px;

    z-index: 4;

    display: grid;

    grid-template-columns:
      minmax(260px, 340px)
      minmax(420px, 680px);

    grid-template-rows: minmax(0, 1fr);

    justify-content: space-between;

    gap: clamp(44px, 6vw, 96px);

    pointer-events: none;
  }

  .about-editorial-figure {
    grid-column: 1;

    grid-row: 1;

    align-self: stretch;

    display: flex;

    flex-direction: column;

    align-items: flex-start;

    width: 100%;

    max-width: 340px;
  }

  .profile-name {
    min-height: 16px;

    display: flex;

    align-items: center;

    margin: 0 0 12px;

    color: #ffffff;

    font-size: 11px;

    font-weight: 700;

    line-height: 1.2;

    letter-spacing: 0.11em;

    text-transform: uppercase;

    text-shadow: 0 1px 14px rgba(0, 0, 0, 0.44);
  }

  .profile-role {
    --profile-border: #ffffff;

    position: relative;

    width: max-content;

    max-width: 100%;

    display: flex;

    flex-direction: column;

    gap: 6px;

    padding: 14px 18px;

    color: rgba(255, 255, 255, 0.82);

    font-size: 12px;

    line-height: 1.48;

    text-transform: uppercase;
  }

  .profile-role::before,
  .profile-role::after {
    content: "";

    position: absolute;

    top: 0;
    bottom: 0;

    width: 18px;

    border-top: 1px solid var(--profile-border);

    border-bottom: 1px solid var(--profile-border);
  }

  .profile-role::before {
    left: 0;

    border-left: 1px solid var(--profile-border);
  }

  .profile-role::after {
    right: 0;

    border-right: 1px solid var(--profile-border);
  }

  .about-editorial-figure > .profile-role {
    display: none;
  }

  .about-top-copy {
    grid-column: 2;

    grid-row: 1;

    align-self: end;

    width: 100%;

    max-width: 680px;
  }

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

    text-transform: uppercase;

    text-shadow: 0 1px 14px rgba(0, 0, 0, 0.44);
  }

  .about-editorial-text {
    --editorial-border: #ffffff;

    position: relative;

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

  .about-editorial-text::before,
  .about-editorial-text::after {
    content: "";

    position: absolute;

    top: 0;
    bottom: 0;

    width: 28px;

    border-top: 1px solid var(--editorial-border);

    border-bottom: 1px solid var(--editorial-border);
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

    color: rgba(255, 255, 255, 0.9);
  }

  :global(body.light) .about-kicker,
  :global(body.light) .profile-name {
    color: #ffffff;
  }

  .about-experience-stack {
    display: flex;

    flex-direction: column;

    gap: 20px;

    width: max-content;

    max-width: 100%;

    margin-top: auto;

    padding-top: 24px;
  }

  .about-experience-card {
    color: #ffffff;

    text-align: center;

    text-shadow: 0 1px 14px rgba(0, 0, 0, 0.44);
  }

  .about-experience-heading {
    display: block;

    margin-bottom: 6px;

    font-size: 13px;

    font-weight: 800;

    letter-spacing: 0.11em;

    text-transform: uppercase;
  }

  .about-experience-copy {
    position: relative;

    display: block;

    width: 100%;

    padding: 12px 24px;

    color: rgba(255, 255, 255, 0.82);

    font-size: 12px;

    line-height: 1.48;
  }

  .about-experience-copy::before,
  .about-experience-copy::after {
    content: "";

    position: absolute;

    top: 0;
    bottom: 0;

    width: 20px;

    border-top: 1px solid #ffffff;

    border-bottom: 1px solid #ffffff;
  }

  .about-experience-copy::before {
    left: 0;

    border-left: 1px solid #ffffff;
  }

  .about-experience-copy::after {
    right: 0;

    border-right: 1px solid #ffffff;
  }

  /* =========================================================
     SERVICES HEADER
  ========================================================= */

  .services-header {
    width: 100%;

    margin: 112px 0 0;

    border-bottom: 1px solid var(--accent-blue);

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

    grid-template-columns:
      var(--services-title-marker-size)
      minmax(0, 1fr);

    align-items: start;

    gap: 18px;
  }

  .services-header-main::before {
    content: "";

    width: var(--services-title-marker-size);

    height: var(--services-title-marker-size);

    margin-top: 0.48em;

    border-radius: 50%;

    background: var(--accent-blue);

    transform-origin: center;

    animation: services-title-pulse 1.65s ease-in-out infinite;
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

    font-size: var(--services-component-title-size);

    font-weight: 600;

    line-height: 1.12;

    letter-spacing: -0.035em;
  }

  .services-subtitle {
    max-width: 520px;

    margin: 0;

    color: rgba(255, 255, 255, 0.62);

    font-size: 16px;

    line-height: 1.65;
  }

  :global(body.light) .services-header h2 {
    color: #111111;
  }

  :global(body.light) .services-subtitle {
    color: rgba(0, 0, 0, 0.62);
  }

  /* =========================================================
     SERVICES DESKTOP + TABLET
  ========================================================= */

  .services-showcase {
    width: 100%;

    margin-top: var(--services-block-gap);

    padding: clamp(30px, 3.3vw, 48px);

    background: rgba(255, 255, 255, 0.022);

    box-sizing: border-box;
  }

  :global(body.light) .services-showcase {
    background: #ffffff;
  }

  .services-desktop-workspace {
    width: 100%;

    max-width: 1180px;

    margin: 0 auto;

    display: grid;

    grid-template-columns:
      minmax(300px, 0.9fr)
      minmax(0, 1.1fr);

    gap: clamp(56px, 6vw, 96px);

    align-items: center;
  }

  /* =========================================================
     TRIGGERS
  ========================================================= */

  .service-trigger-list {
    width: 100%;

    display: flex;

    flex-direction: column;

    justify-content: center;

    gap: clamp(10px, 1vw, 16px);
  }

  .service-trigger {
    appearance: none;

    width: 100%;

    display: grid;

    grid-template-columns:
      auto
      minmax(0, 1fr);

    align-items: center;

    gap: 14px;

    padding: 9px 0;

    border: 0;

    background: transparent;

    color: #696969;

    font: inherit;

    font-size: calc(var(--services-component-title-size) - 2px);

    font-weight: 700;

    line-height: 1.04;

    letter-spacing: -0.025em;

    text-align: left;

    text-transform: uppercase;

    cursor: pointer;

    touch-action: manipulation;

    transition: color 0.2s ease;
  }

  .service-trigger.active {
    color: #ffffff;
  }

  :global(body.light) .service-trigger {
    color: rgba(0, 0, 0, 0.4);
  }

  :global(body.light) .service-trigger.active {
    color: #111111;
  }

  @media (min-width: 1025px) and (hover: hover) and (pointer: fine) {
    .service-trigger:hover,
    .service-trigger:focus-visible {
      color: #ffffff;

      outline: none;
    }

    :global(body.light) .service-trigger:hover,
    :global(body.light) .service-trigger:focus-visible {
      color: #111111;
    }
  }

  .service-trigger-text {
    min-width: 0;

    display: block;

    text-wrap: balance;
  }

  .service-trigger-icon {
    width: clamp(28px, 2.4vw, 36px);

    height: clamp(28px, 2.4vw, 36px);

    display: block;

    object-fit: contain;

    filter: brightness(0) invert(1);

    opacity: 0.32;

    transform: scale(0.94);

    transition:
      opacity 0.2s ease,
      transform 0.24s ease;
  }

  .service-trigger.active .service-trigger-icon {
    opacity: 1;

    transform: scale(1);
  }

  @media (min-width: 1025px) and (hover: hover) and (pointer: fine) {
    .service-trigger:hover .service-trigger-icon,
    .service-trigger:focus-visible .service-trigger-icon {
      opacity: 1;

      transform: scale(1);
    }
  }

  :global(body.light) .service-trigger-icon {
    filter: brightness(0);
  }

  /* =========================================================
     RIGHT CARD
  ========================================================= */

  .service-detail-list {
    position: relative;

    width: 100%;

    min-width: 0;

    min-height: 390px;

    border-top: 1px solid rgba(255, 255, 255, 0.15);

    border-bottom: 1px solid rgba(255, 255, 255, 0.15);

    overflow: hidden;
  }

  :global(body.light) .service-detail-list {
    border-top-color: rgba(0, 0, 0, 0.14);

    border-bottom-color: rgba(0, 0, 0, 0.14);
  }

  .service-detail-panel {
    position: absolute;

    inset: 0;

    width: 100%;

    height: 100%;

    display: flex;

    flex-direction: column;

    justify-content: center;

    align-items: stretch;

    padding: 34px 0;

    margin: 0;

    box-sizing: border-box;

    opacity: 0;

    visibility: hidden;

    pointer-events: none;

    transform: translateY(8px);

    transition:
      opacity 0.2s ease,
      transform 0.26s cubic-bezier(0.16, 1, 0.3, 1),
      visibility 0s linear 0.22s;
  }

  .service-detail-panel.active {
    opacity: 1;

    visibility: visible;

    pointer-events: auto;

    transform: translateY(0);

    transition:
      opacity 0.2s ease,
      transform 0.26s cubic-bezier(0.16, 1, 0.3, 1),
      visibility 0s;
  }

  /* RESTORED RIGHT NUMBER */

  .service-detail-number {
    position: absolute;

    top: 16px;
    right: 0;

    z-index: 0;

    color: rgba(180, 180, 180, 0.09);

    font-size: clamp(5rem, 8vw, 8rem);

    font-weight: 800;

    line-height: 0.9;

    letter-spacing: -0.06em;

    pointer-events: none;

    user-select: none;
  }

  :global(body.light) .service-detail-number {
    color: rgba(0, 0, 0, 0.075);
  }

  .service-detail-icon-wrap {
    position: relative;

    z-index: 2;

    width: 48px;
    height: 48px;

    display: flex;

    align-items: center;

    margin-bottom: 22px;
  }

  .service-detail-icon {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: contain;

    object-position: left center;

    filter: brightness(0) invert(1);
  }

  :global(body.light) .service-detail-icon {
    filter: brightness(0);
  }

  .service-detail-heading {
    position: relative;

    z-index: 2;

    width: 100%;
  }

  .service-detail-heading h3 {
    width: 100%;

    margin: 0;

    color: #ffffff;

    font-size: 20px;

    font-weight: 700;

    line-height: 1.15;

    letter-spacing: 0.04em;

    text-transform: uppercase;
  }

  :global(body.light) .service-detail-heading h3 {
    color: #111111;
  }

  /* =========================================================
     BULLETS
  ========================================================= */

  .service-detail-bullets {
    position: relative;

    z-index: 2;

    width: 100%;

    display: flex;

    flex-direction: column;

    gap: 12px;

    margin: 20px 0 0;

    padding: 0;

    list-style: none;
  }

  .service-detail-bullets li {
    width: 100%;

    display: grid;

    grid-template-columns:
      8px
      minmax(0, 1fr);

    align-items: start;

    gap: 12px;

    margin: 0;

    padding: 0;

    color: rgba(255, 255, 255, 0.68);

    font-size: 16px;

    line-height: 1.55;
  }

  :global(body.light) .service-detail-bullets li {
    color: rgba(0, 0, 0, 0.7);
  }

  .service-bullet-dot {
    width: 7px;
    height: 7px;

    display: block;

    margin-top: 0.55em;

    border-radius: 50%;

    background: var(--accent-blue);
  }

  .service-bullet-copy {
    display: block;

    min-width: 0;

    text-wrap: pretty;
  }

  /* =========================================================
     TAGS
  ========================================================= */

  .service-detail-tags {
    position: relative;

    z-index: 2;

    width: 100%;

    margin: 22px 0 0;
  }

  .service-tags {
    display: flex;

    flex-wrap: wrap;

    gap: 7px;
  }

  .service-tags span {
    min-height: 25px;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    padding: 4px 8px;

    border: 1px solid rgba(255, 255, 255, 0.28);

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

  /* =========================================================
     MOBILE SERVICES BASE
  ========================================================= */

  .services-mobile-grid {
    display: none;
  }

  .service-card {
    position: relative;

    overflow: hidden;
  }

  .service-bg-number {
    position: absolute;

    top: 14px;
    right: 8px;

    z-index: 0;

    color: rgba(180, 180, 180, 0.09);

    font-size: clamp(5.2rem, 26vw, 7.2rem);

    font-weight: 800;

    line-height: 0.9;

    pointer-events: none;
  }

  :global(body.light) .service-bg-number {
    color: rgba(0, 0, 0, 0.07);
  }

  .service-content {
    position: relative;

    z-index: 1;

    width: 100%;
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
    margin: 0;

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

  /* =========================================================
     FREE TOOLS
  ========================================================= */

  .free-tools-section {
    margin-top: var(--services-block-gap);
  }

  .free-tools-heading {
    margin-bottom: 42px;
  }

  .free-tools-heading > span {
    display: none;
  }

  .free-tools-heading h2 {
    max-width: 760px;

    margin: 0;

    color: #ffffff;

    font-size: 20px;

    font-weight: 600;

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

  /* FULL [ ] BRACKETS */

  .website-tool-card {
    --tool-border: rgba(255, 255, 255, 0.34);

    position: relative;

    min-width: 0;

    min-height: 195px;

    display: flex;

    padding: 34px;

    background: transparent;

    color: #ffffff;

    box-sizing: border-box;
  }

  .website-tool-card::before,
  .website-tool-card::after {
    content: "";

    position: absolute;

    top: 0;
    bottom: 0;

    width: 24px;

    height: auto;

    box-sizing: border-box;

    border-top: 1px solid var(--tool-border);

    border-bottom: 1px solid var(--tool-border);

    pointer-events: none;
  }

  .website-tool-card::before {
    left: 0;

    border-left: 1px solid var(--tool-border);
  }

  .website-tool-card::after {
    right: 0;

    border-right: 1px solid var(--tool-border);
  }

  :global(body.light) .website-tool-card {
    --tool-border: rgba(0, 0, 0, 0.34);

    color: #111111;
  }

  .website-tool-card-inner {
    width: 100%;

    display: flex;

    flex-direction: column;

    justify-content: center;
  }

  .website-tool-copy h3 {
    max-width: 520px;

    margin: 0;

    color: inherit;

    font-size: 20px;

    font-weight: 600;

    line-height: 1.25;

    letter-spacing: 0.035em;

    text-transform: uppercase;
  }

  .website-tool-copy p {
    max-width: 460px;

    margin: 22px 0 0;

    color: #989898;

    font-size: var(--type-body);

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
    padding-bottom: 5px;

    border-bottom: 1px solid var(--accent-blue);

    color: #ffffff;

    font-size: 12px;

    font-weight: 700;

    letter-spacing: 0.08em;

    text-decoration: none;

    text-transform: uppercase;
  }

  :global(body.light) .website-tool-cta {
    color: #111111;
  }

  .website-tool-arrow {
    width: 18px;
    height: 18px;

    color: var(--accent-blue);
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
    .services {
      --services-component-title-size: 24px;

      --services-block-gap: 62px;
    }

    .services-shell {
      --shell-x: 0px;

      width: 90%;

      padding: 84px 0 96px;
    }

    .shell-line,
    .shell-bottom-line {
      display: none;
    }

    .problem-workspace {
      margin-bottom: 82px;
    }

    .problem-story-wrap {
      --problem-copy-size: clamp(14px, 1.85vw, 16px);

      width: calc(100% - 32px);

      padding-inline: 16px;

      box-sizing: border-box;
    }

    .problem-popup {
      width: min(485px, calc(100vw - 28px));
    }

    /* ABOUT */

    .experience-rail {
      display: none;
    }

    .about-image-wrap {
      height: auto;

      min-height: 0;

      max-height: none;

      aspect-ratio: 16 / 10;
    }

    .about-below-copy {
      inset: 24px;

      grid-template-columns:
        minmax(140px, 1fr)
        minmax(0, 1.5fr);

      gap: 32px;
    }

    .about-editorial-title {
      top: 24px;
      right: 24px;

      max-width: 54%;

      font-size: clamp(7.7px, 1.19vw, 10.5px);
    }

    .about-availability {
      gap: 10px;
    }

    .about-availability-pulse {
      width: 7px;
      height: 7px;

      flex: 0 0 7px;
    }

    .about-title-static {
      font-size: 10px;
    }

    .profile-name,
    .about-kicker {
      margin: 0 0 8px;

      font-size: 10px;
    }

    .profile-role {
      font-size: 10px;
    }

    .about-editorial-text {
      padding: 12px 18px;

      font-size: 12px;

      line-height: 1.5;
    }

    .about-experience-stack {
      gap: 12px;
    }

    .about-experience-heading {
      margin-bottom: 3px;

      font-size: 8.5px;
    }

    .about-experience-copy {
      padding: 8px 12px;

      font-size: 8px;
    }

    /* HEADER */

    .services-header {
      margin-top: 92px;
    }

    .services-header-inner {
      grid-template-columns:
        minmax(0, 1fr)
        minmax(260px, 0.9fr);

      gap: 38px;

      padding: 36px 0;
    }

    .services-subtitle {
      font-size: 13px;

      line-height: 1.55;
    }

    /* CLICK-ONLY SERVICES */

    .services-showcase {
      padding: 28px;
    }

    .services-desktop-workspace {
      max-width: 900px;

      grid-template-columns:
        minmax(230px, 0.9fr)
        minmax(0, 1.1fr);

      gap: 36px;
    }

    .service-trigger-list {
      gap: 13px;
    }

    .service-trigger {
      gap: 11px;

      padding: 10px 0;

      font-size: calc(var(--services-component-title-size) - 2px);

      line-height: 1.06;

      cursor: pointer;

      touch-action: manipulation;
    }

    .service-trigger-icon {
      width: 28px;
      height: 28px;
    }

    .service-detail-list {
      min-height: 350px;
    }

    .service-detail-panel {
      padding: 30px 0;
    }

    .service-detail-number {
      top: 14px;

      font-size: clamp(4.5rem, 10vw, 6.4rem);
    }

    .service-detail-icon-wrap {
      width: 42px;
      height: 42px;

      margin-bottom: 19px;
    }

    .service-detail-heading h3 {
      font-size: 18px;
    }

    .service-detail-bullets {
      gap: 10px;

      margin-top: 17px;
    }

    .service-detail-bullets li {
      grid-template-columns:
        7px
        minmax(0, 1fr);

      gap: 10px;

      font-size: 14px;

      line-height: 1.52;
    }

    .service-bullet-dot {
      width: 6px;
      height: 6px;
    }

    .service-detail-tags {
      margin-top: 18px;
    }

    /* TOOLS */

    .free-tools-grid {
      gap: 47px;
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
    .services {
      --services-block-gap: 50px;
    }

    .services-shell {
      --shell-x: 0px;

      width: calc(100% - 40px);

      padding: 72px 0;
    }

    .shell-line,
    .shell-bottom-line {
      display: none;
    }

    /* TOP STORY */

    .problem-workspace {
      margin-bottom: 68px;
    }

    .problem-story-wrap {
      --problem-copy-size: clamp(13.5px, 3.75vw, 15px);

      width: calc(100% - 24px);

      padding-inline: 8px;

      box-sizing: border-box;
    }

    .problem-story {
      line-height: 1.72;
    }

    .problem-inline-icon {
      width: 1.72em;

      height: 1.72em;

      flex: 0 0 1.72em;

      margin: 0 0.26em 0 0.13em;
    }

    .problem-popup {
      width: min(380px, calc(100vw - 20px));

      max-height: min(430px, calc(100dvh - 18px));
    }

    /* ABOUT */

    .premium-about {
      padding-bottom: 62px;
    }

    .experience-toolbar {
      display: none;
    }

    .experience-list {
      display: grid;

      grid-template-columns: repeat(4, minmax(0, 1fr));

      gap: 4px;
    }

    .experience-item {
      padding: 0;
    }

    .experience-item::before,
    .experience-item::after {
      display: none;
    }

    .experience-title {
      align-items: flex-start;

      text-align: left;

      font-size: clamp(11px, 2.8vw, 16px);

      line-height: 1.3;
    }

    .about-profile::before {
      height: 35%;
    }

    .about-image-wrap {
      height: auto;

      min-height: 0;

      max-height: none;

      aspect-ratio: 4 / 5;
    }

    .about-image-wrap img {
      object-position: 42% center;
    }

    .about-image-caption {
      position: absolute;

      top: 14px;
      right: 14px;

      z-index: 5;

      display: block;

      max-width: calc(100% - 28px);
    }

    .about-editorial-title {
      position: static;

      max-width: 100%;

      font-size: clamp(9.5px, 2.7vw, 12.5px);
    }

    .about-availability {
      gap: 9px;
    }

    .about-availability-pulse {
      width: 6px;
      height: 6px;

      flex: 0 0 6px;
    }

    .about-title-static {
      font-size: calc(clamp(9.5px, 2.7vw, 12.5px) - 2px);
    }

    .about-below-copy {
      position: absolute;

      inset: 0;

      z-index: 4;

      display: block;

      pointer-events: none;
    }

    .about-top-copy {
      --editorial-border: #ffffff;

      position: absolute;

      right: 14px;
      bottom: 14px;

      width: calc(100% - 28px);

      max-width: 380px;

      padding: 12px 14px;
    }

    .about-top-copy::before,
    .about-top-copy::after {
      content: "";

      position: absolute;

      top: 0;
      bottom: 0;

      width: 22px;

      border-top: 1px solid var(--editorial-border);

      border-bottom: 1px solid var(--editorial-border);
    }

    .about-top-copy::before {
      left: 0;

      border-left: 1px solid var(--editorial-border);
    }

    .about-top-copy::after {
      right: 0;

      border-right: 1px solid var(--editorial-border);
    }

    .about-kicker {
      margin: 0 0 6px;

      font-size: 10px;
    }

    .about-editorial-text {
      margin: 0;

      padding: 0;

      font-size: 12.5px;

      line-height: 1.6;
    }

    .about-editorial-text::before,
    .about-editorial-text::after {
      display: none;
    }

    .about-editorial-figure {
      display: none;
    }

    /* HEADER */

    .services-header {
      margin-top: 76px;
    }

    .services-header-inner {
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
      font-size: clamp(22px, 6vw, 27px);
    }

    .services-subtitle {
      max-width: 100%;

      font-size: 14px;
    }

    /* MOBILE SERVICES */

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

    .service-card {
      min-height: 0;

      padding: 28px 18px 30px 10px;

      border-top: 1px solid rgba(255, 255, 255, 0.1);

      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    :global(body.light) .service-card {
      border-color: rgba(0, 0, 0, 0.1);
    }

    .service-content {
      height: auto;
    }

    .service-icon {
      width: 46px;
      height: 46px;
    }

    .service-mobile-heading {
      display: flex;

      align-items: flex-start;

      justify-content: space-between;

      gap: 18px;
    }

    .service-mobile-description {
      width: 100%;

      display: flex;

      flex-direction: column;

      gap: 10px;

      margin: 16px 0 0;

      padding: 0;

      list-style: none;
    }

    .service-mobile-description li {
      display: grid;

      grid-template-columns:
        7px
        minmax(0, 1fr);

      gap: 10px;

      align-items: start;

      margin: 0;

      padding: 0;

      color: #989898;

      font-size: 15px;

      line-height: 1.5;
    }

    :global(body.light) .service-mobile-description li {
      color: rgba(0, 0, 0, 0.68);
    }

    .service-mobile-description .service-bullet-dot {
      width: 6px;
      height: 6px;
    }

    .service-mobile-tags-row {
      display: grid;

      grid-template-columns:
        minmax(0, 1fr)
        26px;

      align-items: center;

      gap: 12px;

      margin-top: 18px;
    }

    .service-description-toggle {
      width: 26px;
      height: 26px;

      display: inline-flex;

      align-items: center;

      justify-content: center;

      justify-self: end;

      margin: 0;

      padding: 0;

      border: 0;

      background: transparent;

      color: var(--accent-blue);

      font: inherit;

      font-size: 32.5px;

      font-weight: 300;

      line-height: 1;

      cursor: pointer;
    }

    .service-tags span {
      font-size: 10px;
    }

    /* TOOLS */

    .free-tools-heading {
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

    .tools-marquee-track {
      gap: 28px;

      animation-duration: 22s;
    }

    .tool-marquee-item {
      width: 82px;

      height: 58px;

      flex: 0 0 82px;
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
      width: calc(100% - 40px);

      padding: 64px 0;
    }

    .service-content h3 {
      font-size: 17px;
    }

    .service-mobile-description li {
      font-size: 14px;
    }

    .service-icon {
      width: 42px;

      height: 42px;
    }

    .service-tags span {
      font-size: 8px;
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

    .services-header-main::before,
    .about-availability-pulse,
    .problem-inline-icon,
    .problem-inline-icon * {
      animation: none !important;
    }

    .tools-marquee-track {
      animation: none;
    }

    .problem-story-segment {
      opacity: 1;

      filter: none;

      transform: none;

      transition: none;
    }

    .service-detail-panel,
    .service-trigger,
    .service-trigger-icon {
      transition: none;
    }
  }
</style>

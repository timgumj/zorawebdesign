<script>
  import { onMount } from "svelte";

  import Header from "$lib/components/Header.svelte";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import Services from "$lib/components/Services.svelte";
  import Projects from "$lib/components/Projects.svelte";
  import Process from "$lib/components/Process.svelte";
  import Reviews from "$lib/components/Reviews.svelte";
  import Faq from "$lib/components/Faq.svelte";
  import Contact from "$lib/components/Contact.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { projects } from "$lib/data/projects.js";

  let CookieConsent = $state(null);

  onMount(() => {
    document.documentElement.lang = "de";

    setTimeout(async () => {
      const module = await import("$lib/components/CookieConsent.svelte");
      CookieConsent = module.default;
    }, 1200);
  });

  const nav = {
    tagline: "SEO • WEBDESIGN • WORDPRESS",

    services: "[LEISTUNGEN]",
    projects: "[PROJEKTE]",
    process: "[ABLAUF]",
    reviews: "[REVIEWS]",
    faq: "[FAQ]",
    contact: "[KONTAKT]",

    languageLabel: "[EN]",
    languageLink: "/en-2",
    languageTitle: "Switch to English portfolio version",

    freebies: {
      label: "[FREEBIES]",
      items: [
        {
          label: "[WEBSITE AUDIT]",
          href: "/website-audit/",
          title: "Kostenlosen Website-Audit öffnen",
        },
      ],
    },
  };

  const hero = {
    avatar: "/images/julius-256.webp",
    avatarAlt:
      "Julius Timgum, selbstständiger Webdesigner und WordPress Freelancer in Wien",
    name: "Ich bin JULIUS",
    titleLines: [
      "WEBDESIGNER,",
      "ENTWICKLER &",
      "WORDPRESS EXPERTE",
      "IN WIEN",
    ],
    seoTitle:
      "SELBSTSTÄNDIGER WEBDESIGNER IN WIEN FÜR MODERNE WORDPRESS WEBSITES",
    cta: "GESPRÄCH BUCHEN",
    ctaLink:
      "https://calendly.com/timgum-julius/get-to-know-meeting?month=2026-04",
    ctaTarget: "_blank",
    ctaRel: "noopener noreferrer",
    ctaTitle: "Kostenloses WordPress Erstgespräch mit Julius Timgum buchen",
    secondaryCta: "PROJEKTE ANSEHEN",
    secondaryCtaLink: "#projects",
    secondaryCtaTitle:
      "Ausgewählte Webdesign Projekte und WordPress Referenzen ansehen",
    text: "Ich bin selbstständiger Webdesigner in Wien und erstelle moderne WordPress Websites für Selbstständige, kleine Unternehmen und Organisationen. Persönlich, verständlich und ohne Agenturpreise.",
    connectionAriaLabel:
      "Was Kundinnen und Kunden an der Zusammenarbeit schätzen",
    greetings: {
      morning: {
        text: "Guten Morgen!",
        icon: "/images/croissant.webp",
        alt: "Guten Morgen Symbol",
      },
      day: {
        text: "Guten Tag!",
        icon: "/images/italian-coffee-maker.webp",
        alt: "Guten Tag Symbol",
      },
      evening: {
        text: "Guten Abend!",
        icon: "/images/martini-glass-citrus.webp",
        alt: "Guten Abend Symbol",
      },
    },
    connectionItems: [
      {
        title: "Erstgespräch",
        popup:
          "Kostenloses Gespräch über deine Website, deine Ziele und deine Ideen. Ganz entspannt und ohne Verpflichtung.",
      },
      {
        title: "Persönlich",
        popup:
          "Du arbeitest direkt mit mir. So bleibt die Kommunikation klar, persönlich und unkompliziert.",
      },
      {
        title: "Unterstützend",
        popup:
          "Ich begleite dich Schritt für Schritt, von der ersten Idee bis zum Launch und auf Wunsch auch danach.",
      },
    ],
  };

  const services = [
    {
      icon: "/images/customize-computer.webp",
      alt: "Professionelles Webdesign Wien für responsive Websites und moderne Benutzeroberflächen",
      title: "WEBDESIGN WIEN",
      text: "Moderne, responsive Websites für Selbstständige, kleine Unternehmen und Organisationen. Klar strukturiert, benutzerfreundlich und so gestaltet, dass deine Marke professionell wirkt und deine Inhalte einfach gepflegt werden können.",
    },
    {
      icon: "/images/display-code-2.webp",
      alt: "Professionelle Webentwicklung in Wien für WordPress und individuelle Funktionen",
      title: "WEBENTWICKLUNG",
      text: "Technische Umsetzung moderner Websites mit WordPress und individuellen Lösungen. Von maßgeschneiderten Funktionen und API-Integrationen bis hin zu barrierefreien Anwendungen und einer technisch sauberen Umsetzung.",
    },
    {
      icon: "/images/shopping-bag.webp",
      alt: "Webshop erstellen mit WooCommerce und Shopify für Selbstständige und Unternehmen",
      title: "WEBSHOP",
      text: "Individuelle E-Commerce-Lösungen mit WooCommerce oder Shopify für den Online-Verkauf von Produkten und Dienstleistungen. Mit sicheren Zahlungen, einfachem Checkout und unkomplizierter Produktverwaltung.",
    },
    {
      icon: "/images/seo.png",
      alt: "SEO und Performance-Optimierung für WordPress-Websites in Wien",
      title: "SEO & PERFORMANCE",
      text: "Technisches SEO, schnelle Ladezeiten und eine klare Website-Struktur helfen dabei, dass deine Website von Google besser gefunden wird. Ich optimiere WordPress-Websites für Sichtbarkeit und eine bessere Nutzererfahrung.",
    },
    {
      icon: "/images/ftp.webp",
      alt: "Schnelles Website-Hosting mit SSL, Backups und DSGVO-konformer Serververwaltung",
      title: "HOSTING",
      text: "Schnelles und sicheres Website-Hosting für WordPress-Websites und Webshops. Inklusive SSL, Caching, Backups, E-Mail-Hosting, regelmäßigen Updates sowie Unterstützung bei Domain- und DNS-Einstellungen.",
    },
    {
      icon: "/images/chat-notification-1.webp",
      alt: "WordPress-Wartung und technischer Website-Support für Unternehmen und Selbstständige",
      title: "WARTUNG & SUPPORT",
      text: "Optionale WordPress-Wartung mit Updates, Backups, Sicherheitslösungen, Monitoring und technischem Support. Damit deine Website langfristig stabil, sicher und gut gepflegt bleibt.",
    },
  ];

  const serviceKeywords = {
    webdesign: ["UX/UI", "Responsive", "Benutzerfreundlich", "Wireframes"],
    webentwicklung: ["WordPress", "Performance", "API", "Core Web Vitals"],
    webshop: ["WooCommerce", "Shopify", "Zahlungen"],
    hosting: ["Server", "SSL", "Backups", "DNS"],
    wartung: ["Sicherheit", "Updates", "Backups", "Support"],
    support: ["Updates", "Sicherheit", "Support", "Backups"],
  };

  const serviceStats = {
    compliment: "DU BIST IN GUTEN HÄNDEN",
    title: "ÜBER MICH",
    text: "Ich bin Julius, selbstständiger Webdesigner und WordPress Entwickler in Wien. Ich unterstütze Selbstständige, kleine Unternehmen und Organisationen dabei, moderne Websites zu erstellen, die professionell wirken und neue Anfragen bringen:",
    items: [
      {
        label: "Praxisbewährt und effizient",
        title: "7+ JAHRE ERFAHRUNG",
      },
      {
        label: "Für Kund*innen umgesetzt",
        title: "100+ PROJEKTE",
      },
      {
        label: "Ohne Agenturpreise",
        title: "PRO QUALITÄT",
      },
      {
        label: "Rundum-sorglos-Paket",
        title: "ALLES AUS EINER HAND",
      },
    ],
  };

  const processImages = [
    {
      image: "/images/Isa_Jules.webp",
      alt: "Erfolgreicher WordPress Website Launch für das reSOMA Projekt mit Julius Timgum",
      caption: "Website Launch mit <span>reSOMA</span>",
    },
    {
      image: "/images/meet_jubs_julius.webp",
      alt: "Strategische Projektplanung für eine WordPress Website in Wien mit Julius Timgum",
      caption: "Projektplanung mit Ines & Andy <span>JUBS</span>",
    },
  ];

  const processSteps = [
    {
      title: "ANFRAGE",
      text: "Wir starten mit einem Gespräch über deine Ziele, deine Zielgruppe, deine Inhalte und die gewünschte Wirkung deiner Website. So entsteht eine klare Grundlage für ein Webdesign, das wirklich zu dir und deinem Angebot passt.",
      linkText: "Gespräch buchen.",
      showArrow: true,
    },
    {
      title: "KONZEPT",
      text: "Auf Basis unseres Gesprächs entwickle ich Struktur, Designrichtung und erste Ideen für deine Website. Danach verfeinern wir gemeinsam das Konzept, bis es sich stimmig, professionell und authentisch anfühlt.",
      showArrow: true,
    },
    {
      title: "LAUNCH",
      text: "Vor dem Launch optimiere ich Details, Ladezeiten, mobile Darstellung und technische Grundlagen. Wir testen die Website auf verschiedenen Geräten und veröffentlichen sie erst, wenn alles sauber funktioniert.",
      showArrow: false,
    },
    {
      title: "SUPPORT",
      text: "Nach dem Launch unterstütze ich dich auf Wunsch mit WordPress Wartung, Updates, Sicherheit, Performance Optimierung, Backups und technischem Support.",
      showArrow: false,
    },
  ];

  const reviews = [
    {
      name: "INES ZSUTTY",
      role: "MANAGEMENT - JUBS",
      text: "Mit Julius zu arbeiten war eine Freude, höchste Professionalität und beeindruckende Ergebnisse. Sehr empfehlenswert!",
      image: "/images/Ines-scaled.webp",
      alt: "Portrait von Ines Zsutty von JUBS Webdesign Projekt",
      stars: 5,
    },
    {
      name: "JAHSON THE SCIENTIST",
      role: "KÜNSTLER - WORDSMITH",
      text: "Ja, wir haben ein paar Konzepte ausprobiert, bis wir das richtige gefunden haben. Julius ist ein großartiger Mensch: Er hört zu, versteht und ist flexibel. Ein Wort: ZUFRIEDEN!",
      image: "/images/Jahson_The_Scientist.jpg",
      alt: "Portrait von Jahson The Scientist Kunde bei Zora Web Design",
      stars: 5,
    },
    {
      name: "Dr Bosede Baldauf",
      role: "UROLOGIN FECSM WIEN",
      image: "/images/dr_bosede_baldauf.webp",
      alt: "Portrait von Dr Bosede Baldauf, Kundin für WordPress Webdesign in Wien",
      stars: 5,
      text: "Julius hat bereits zweimal eine Website für mich gestaltet und meine Vorstellungen jedes Mal perfekt umgesetzt. Er hat meine Aufträge rasch angenommen, und die Kommunikation war jederzeit einfach und unkompliziert. Ich bin mit den Ergebnissen sehr zufrieden und kann seine Arbeit auf jeden Fall weiterempfehlen.",
    },
    {
      name: "ISABELLA PFOSER",
      role: "RESILIENZTRAINERIN",
      text: "Die Zusammenarbeit mit Julius war sehr toll. Geduldig, kreativ setzte er meine Vision um. Freundlich, professionell, empfehlenswert!",
      image: "/images/isabella-landscape.webp",
      alt: "Portrait von Isabella Pfoser, Resilienztrainerin und Webdesign Kundin",
      stars: 5,
    },
    {
      name: "IMANI RAMESES",
      role: "COGNITIVE NEUROSCIENTIST",
      image: "/images/Imani-Rameses.webp",
      alt: "Portrait von Imani Rameses, Cognitive Neuroscientist und Webdesign Kundin",
      stars: 5,
      text: "Working with Julius was a pleasure! His attention to detail and designer's eye made me feel both pragmatically and creatively supported throughout the entire process. With grace and ease, he was able to translate my vision into a living product! Thanks Julius!",
    },
    {
      name: "Benjamin Wüllenweber",
      role: "HYPNOSETHERAPEUT DHV | NGH",
      image: "/images/ben_wüllenweber.webp",
      alt: "Portrait von Benjamin Wüllenweber, Kunde für professionelle Website Erstellung",
      stars: 5,
      text: "Die Zusammenarbeit mit Jules war sehr angenehm und reibungslos. Er hat meine Vorstellungen perfekt umgesetzt und die Website sogar besser gestaltet als erwartet. Sehr zuverlässig und absolut empfehlenswert!",
    },
    {
      name: "Anna Hofbauer",
      role: "KÜNSTLERIN",
      image: "/images/Anna_Artist.jpg",
      alt: "Portrait von Anna Hofbauer, Kundin für Kunst Portfolio Website",
      stars: 5,
      text: "Von Anfang an super Vibe, entspannt, flexibel, professionell. Julius setzte alles nach meinen Vorstellungen um. Absolut top!",
    },
  ];

  const faqItems = [
    {
      key: "duration",
      question: "WIE LANGE DAUERT ES, MEINE WEBSITE ZU ERSTELLEN?",
      answer:
        "Der Zeitrahmen hängt vom Umfang deiner Website ab. Eine typische Website mit 5 Seiten ist meist innerhalb von 2 Wochen fertig. Eine größere WordPress Website mit etwa 15 Seiten kann ungefähr 3 bis 5 Wochen dauern. Wenn du eine bestimmte Deadline hast, berücksichtige ich sie gerne.",
    },
    {
      key: "edit",
      question: "KANN ICH MEINE WEBSITE SPÄTER SELBST BEARBEITEN?",
      answer:
        "Ja. Ich erstelle WordPress Websites so, dass du Inhalte später einfach selbst bearbeiten, aktualisieren und ergänzen kannst. Wenn du möchtest, zeige ich dir persönlich, wie du Texte, Bilder, Seiten und Beiträge pflegst. Alternativ kann ich laufende Änderungen auch nach Absprache für dich übernehmen.",
    },
    {
      key: "freelancer",
      question:
        "WARUM MIT EINEM FREELANCE WEBDESIGNER STATT EINER AGENTUR ARBEITEN?",
      answer:
        "Als selbstständiger Webdesigner arbeitest du direkt mit mir. Das bedeutet kurze Wege, persönliche Betreuung und klare Kommunikation. Besonders für Selbstständige, kleine Unternehmen und Organisationen ist das oft einfacher, flexibler und kosteneffizienter als eine klassische Agentur.",
    },
    {
      key: "payment",
      question: "WIE FUNKTIONIERT DIE BEZAHLUNG?",
      answer:
        "Wenn ich eine Rechnung sende, enthält sie meine Bankdaten für eine direkte Überweisung. Üblicherweise werden 60 Prozent des Gesamtbetrags zu Beginn des Projekts fällig, der Restbetrag nach Fertigstellung. Sobald die Zahlung eingegangen ist, erhältst du eine Zahlungsbestätigung für deine Unterlagen.",
    },
    {
      key: "costs",
      question: "GIBT ES VERSTECKTE KOSTEN?",
      answer:
        "Nein. Ich arbeite transparent und bespreche zusätzliche Kosten immer vorher mit dir. Individuelle Funktionen wie spezielle Buchungsformulare, externe Widgets oder komplexe Erweiterungen können nach Stundenaufwand verrechnet werden. Die meisten Websites benötigen das jedoch nicht, weil vieles bereits im Standardumfang enthalten ist.",
    },
    {
      key: "maintenance",
      question: "BRAUCHT MEINE WORDPRESS WEBSITE WARTUNG?",
      answer:
        "Ja, eine WordPress Website sollte regelmäßig gepflegt werden, damit sie sicher, stabil und aktuell bleibt. Wichtig sind vor allem Updates für WordPress, Themes und Plugins sowie regelmäßige Backups. Ich biete optionale Wartungspakete an, kann dich aber auch unterstützen, wenn du die Pflege selbst übernehmen möchtest.",
    },
    {
      key: "seo",
      question: "IST MEINE WEBSITE FÜR GOOGLE OPTIMIERT?",
      answer:
        "Ich achte bereits beim Aufbau auf wichtige SEO Grundlagen wie klare Seitenstruktur, saubere Überschriften, schnelle Ladezeiten, responsive Darstellung, sinnvolle Meta Daten und verständliche Inhalte. Für langfristige Sichtbarkeit bei Google können wir zusätzlich gezielte SEO Inhalte, lokale Suchbegriffe und weitere Unterseiten einplanen.",
    },
    {
      key: "start",
      question: "WIE STARTEN WIR DAS PROJEKT?",
      answer: `
        <p>Wir beginnen mit einem Gespräch über deine Ziele, Seiten, Inhalte, dein Branding und die gewünschten Funktionen. Danach bereite ich die Struktur und die Designrichtung für deine Website vor.</p>

        <p><strong>Für den Start brauche ich:</strong></p>
        <ul>
          <li>Ein Logo</li>
          <li>Den Großteil deiner Website Inhalte wie Texte und Bilder</li>
          <li>Deine bevorzugten Farben</li>
        </ul>

        <p><strong>Für den Launch brauchst du außerdem:</strong></p>
        <ul>
          <li>Eine Domain, ungefähr €10 bis €50 pro Jahr</li>
          <li>Website Hosting, ungefähr €5 bis €20 pro Monat für eine kleine bis mittlere Website</li>
        </ul>

        <p>Ich begleite dich durch jeden Schritt, damit der Prozess einfach, klar und stressfrei bleibt.</p>
      `,
    },
  ];

  const contact = {
    title: "KONTAKT",
    subtitle: "ICH FREUE MICH AUF DEINE NACHRICHT.",
    phone: "+43 677 648 598 39",
    phoneLink: "tel:+4367764859839",
    phoneTitle: "Webdesigner Julius Timgum in Wien telefonisch kontaktieren",
    email: "info@zorawebdesign.com",
    emailLink: "mailto:info@zorawebdesign.com",
    emailTitle: "E-Mail an WordPress Webdesigner Julius Timgum senden",
    address: "Hackengasse 22 / 1150 / Wien.",
    namePlaceholder: "NAME*",
    companyPlaceholder: "UNTERNEHMEN*",
    emailPlaceholder: "E-MAIL*",
    telephonePlaceholder: "TELEFON OPTIONAL",
    messagePlaceholder: "PROJEKTBESCHREIBUNG*",
    submitText: "SENDEN",
    sendingText: "WIRD GESENDET...",
    successTitle: "Nachricht erhalten",
    successText:
      "Vielen Dank für deine Kontaktaufnahme. Ich habe deine Nachricht erhalten und werde mich so schnell wie möglich bei dir melden.",
    errorTitle: "Nachricht nicht gesendet",
    errorText:
      "Etwas ist schiefgelaufen. Bitte versuche es erneut oder sende mir direkt eine E-Mail an",
    whatsappLink: "https://wa.me/4367764859839",
    whatsappTitle: "WordPress Support über WhatsApp starten",
    telegramLink: "https://t.me/+4367764859839",
    telegramTitle: "Technische Webdesign Beratung über Telegram anfragen",
    bookCallText: "GESPRÄCH BUCHEN",
    bookCallLink:
      "https://calendly.com/timgum-julius/get-to-know-meeting?month=2026-04",
    bookCallTitle: "Kostenloses Gespräch mit Webdesigner Julius Timgum buchen",
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.zorawebdesign.com/#website",
        url: "https://www.zorawebdesign.com/",
        name: "Zora Web Design",
        inLanguage: "de-AT",
        publisher: {
          "@id": "https://www.zorawebdesign.com/#business",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.zorawebdesign.com/#business",
        name: "Zora Web Design",
        alternateName: "Zora Web Design - Julius Timgum",
        url: "https://www.zorawebdesign.com/",
        image: "https://www.zorawebdesign.com/images/meet-700.webp",
        telephone: "+4367764859839",
        email: "info@zorawebdesign.com",
        priceRange: "$$",
        description:
          "Selbstständiger Webdesigner und WordPress Entwickler in Wien für moderne, responsive Websites, Webshops, SEO, Hosting und WordPress Support.",
        founder: {
          "@type": "Person",
          name: "Julius Timgum",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Hackengasse 22",
          addressLocality: "Wien",
          postalCode: "1150",
          addressCountry: "AT",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 48.1979,
          longitude: 16.3356,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        areaServed: [
          {
            "@type": "City",
            name: "Wien",
          },
          {
            "@type": "Country",
            name: "Österreich",
          },
        ],
        sameAs: ["https://calendly.com/timgum-julius"],
      },
    ],
  };
</script>

<svelte:head>
  <title>Webdesigner Wien | WordPress Experte & Webentwickler</title>

  <meta
    name="description"
    content="Selbstständiger Webdesigner und WordPress Freelancer in Wien. Moderne, responsive Websites für Selbstständige, kleine Unternehmen und Organisationen."
  />

  <meta
    name="keywords"
    content="Webdesigner Wien, WordPress Freelancer Wien, WordPress Webdesigner Wien, WordPress Experte Wien, WordPress Entwickler Wien, Webdesign Wien, Website erstellen lassen Wien, Homepage erstellen Wien, WordPress Website Wien, Webdesign für Selbstständige, Webdesign für kleine Unternehmen, Webdesign für Unternehmen Wien, Freelance Webdesigner Wien, Responsive Webdesign Wien, Webshop erstellen Wien, WooCommerce Wien, WordPress Wartung Wien, SEO Webdesign Wien, Zora Web Design, Julius Timgum"
  />

  <link rel="canonical" href="https://www.zorawebdesign.com/" />

  <meta name="robots" content="index, follow" />
  <meta name="author" content="Julius Timgum" />
  <meta name="publisher" content="Zora Web Design" />

  <link
    rel="alternate"
    hreflang="de-AT"
    href="https://www.zorawebdesign.com/"
  />

  <link
    rel="alternate"
    hreflang="en"
    href="https://www.zorawebdesign.com/en-2/"
  />

  <link
    rel="alternate"
    hreflang="x-default"
    href="https://www.zorawebdesign.com/"
  />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Zora Web Design" />
  <meta property="og:url" content="https://www.zorawebdesign.com/" />

  <meta
    property="og:title"
    content="Webdesigner Wien | WordPress Freelancer Julius Timgum"
  />

  <meta
    property="og:description"
    content="Selbstständiger Webdesigner und WordPress Freelancer in Wien. Moderne, responsive Websites für Selbstständige, kleine Unternehmen und Organisationen."
  />

  <meta
    property="og:image"
    content="https://www.zorawebdesign.com/images/meet-700.webp"
  />

  <meta
    property="og:image:alt"
    content="Julius Timgum, selbstständiger Webdesigner und WordPress Entwickler in Wien"
  />

  <meta property="og:locale" content="de_AT" />

  <meta name="twitter:card" content="summary_large_image" />

  <meta
    name="twitter:title"
    content="Webdesigner Wien | WordPress Freelancer Julius Timgum"
  />

  <meta
    name="twitter:description"
    content="Moderne WordPress Websites für Selbstständige, kleine Unternehmen und Organisationen in Wien."
  />

  <meta
    name="twitter:image"
    content="https://www.zorawebdesign.com/images/meet-700.webp"
  />

  <meta
    name="twitter:image:alt"
    content="Julius Timgum, selbstständiger Webdesigner und WordPress Entwickler in Wien"
  />

  <link
    rel="image_src"
    href="https://www.zorawebdesign.com/images/meet-700.webp"
  />

  {@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>

<Header {nav} />
<ThemeToggle />

<main>
  <Hero {hero} {projects} />

  <Services
    title="LEISTUNGEN"
    subtitle="Professionelles Webdesign, technische Entwicklung, Hosting und Support für eine moderne, schnelle und gut auffindbare Website."
    {services}
    stats={serviceStats}
    experienceLabel="Erfahrungspunkt"
    toolsLabel="Tools"
    toolsAlt="Werkzeuge"
    serviceKeywordsLabel="Leistungsmerkmale"
    extraExperienceItems={[]}
    {serviceKeywords}
    fallbackServiceTags={["Strategie", "Design", "Umsetzung", "Optimierung"]}
  />

  <Projects
    title="PROJEKTE"
    subtitle="Ausgewählte Webdesign, WordPress und Branding Projekte für Selbstständige, Unternehmen, Kreative und Organisationen."
    {projects}
    loadMoreCopy="Mehr sehen"
    loadMoreText="Weitere Projekte laden"
    loadMoreAria="Weitere Projekte laden"
    viewProjectText="LIVE SITE"
    viewDetailsText="Details ansehen"
    viewDetailsLink="referenzprojekt/"
    projectTagsLabel="Projektleistungen"
    defaultProjectTags={[
      "Webdesign",
      "WordPress",
      "Webshop",
      "+1 Jahr Support",
    ]}
  />

  <Process
    title="PROJEKTABLAUF"
    subtitle="Ein klarer Website Prozess vom ersten Gespräch über Konzept und Design bis zum Launch und optionalen WordPress Support."
    steps={processSteps}
    imageCredits={[
      "Erstes Treffen mit Ines und Andy – JUBS",
      "Konzeptphase: Struktur, Layout & Designrichtung",
      "Website Launch mit Isabella Pfoser – reSOMA",
      "Support- & Wartungsphase – Sicher, aktuell & zuverlässig",
    ]}
  />

  <Reviews
    title="KUNDENSTIMMEN"
    subtitle="Kundenfeedback aus Webdesign, WordPress, Webshop und Branding Projekten."
    {reviews}
  />

  <Faq
    title="FAQ"
    subtitle="Hilfreiche Antworten zu Website Kosten, Zeitrahmen, WordPress Bearbeitung, Zahlung, SEO und Wartung."
    items={faqItems}
  />

  <Contact ...contact />

  <Footer
    copyright="ZORA WEB DESIGN © COPYRIGHT 2026"
    location="HACKENGASSE 22, 1150 WIEN"
    imprintText="IMPRESSUM"
    language="de"
  />
</main>

{#if CookieConsent}
  <CookieConsent />
{/if}

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  @font-face {
    font-family: "DM Sans";
    src: url("/fonts/dm_sans/DMSans-Light.woff2") format("woff2");
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "DM Sans";
    src: url("/fonts/dm_sans/DMSans-Regular.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "DM Sans";
    src: url("/fonts/dm_sans/DMSans-Medium.woff2") format("woff2");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "DM Sans";
    src: url("/fonts/dm_sans/DMSans-SemiBold.woff2") format("woff2");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "DM Sans";
    src: url("/fonts/dm_sans/DMSans-Bold.woff2") format("woff2");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  :global(body) {
    margin: 0;
    background: #000;
    color: #f4f4f4;
    font-family: "DM Sans", Arial, sans-serif;
    transition:
      background 0.3s ease,
      color 0.3s ease;
  }

  :global(body.light) {
    background: #ffffff;
    color: #111111;
  }

  :global(body.dark) {
    background: #000000;
    color: #f4f4f4;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(.container) {
    width: min(1440px, 88%);
    margin: 0 auto;
  }

  @media (max-width: 1100px) {
    :global(.container) {
      width: min(1440px, 92%);
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    :global(.container) {
      width: 90%;
    }
  }

  @media (max-width: 767px) {
    :global(.container) {
      width: calc(100% - 40px);
    }
  }
</style>

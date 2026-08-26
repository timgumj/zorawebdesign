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

  let { page, projects = [] } = $props();
  let CookieConsent = $state(null);

  let isGerman = $derived(page.language === "de");
  let pairedUrl = $derived(
    `https://www.zorawebdesign.com${page.alternatePath}`,
  );
  let homeUrl = $derived(
    isGerman
      ? "https://www.zorawebdesign.com/"
      : "https://www.zorawebdesign.com/en-2/",
  );
  let contact = $derived(page.contact);

  let structuredData = $derived({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${page.canonical}#service`,
        name: page.seoTitle,
        serviceType: isGerman
          ? "Webdesign und WordPress-Entwicklung"
          : "Web design and WordPress development",
        description: page.metaDescription,
        url: page.canonical,
        areaServed: {
          "@type": "City",
          name: page.city,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: page.region,
          },
        },
        provider: {
          "@type": "ProfessionalService",
          "@id": "https://www.zorawebdesign.com/#business",
          name: "Zora Web Design",
          url: "https://www.zorawebdesign.com/",
          telephone: "+43 677 648 598 39",
          email: "info@zorawebdesign.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Hackengasse 22",
            postalCode: "1150",
            addressLocality: "Wien",
            addressCountry: "AT",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${page.canonical}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isGerman ? "Startseite" : "Home",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isGerman ? "Webdesign Regionen" : "Web design service areas",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.city,
            item: page.canonical,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${page.canonical}#faq-schema`,
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  });

  onMount(() => {
    document.documentElement.lang = page.language;

    const cookieTimer = setTimeout(async () => {
      const module = await import("$lib/components/CookieConsent.svelte");
      CookieConsent = module.default;
    }, 1200);

    return () => clearTimeout(cookieTimer);
  });
</script>

<svelte:head>
  <title>{page.seoTitle}</title>
  <meta name="description" content={page.metaDescription} />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="author" content="Julius Timgum – Zora Web Design" />

  <link rel="canonical" href={page.canonical} />
  <link
    rel="alternate"
    hreflang={page.language === "de" ? (page.countryCode === "DE" ? "de-DE" : "de-AT") : "en"}
    href={page.canonical}
  />
  <link
    rel="alternate"
    hreflang={page.language === "de" ? "en" : page.countryCode === "DE" ? "de-DE" : "de-AT"}
    href={pairedUrl}
  />
  <link
    rel="alternate"
    hreflang="x-default"
    href={page.language === "de" ? page.canonical : pairedUrl}
  />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Zora Web Design" />
  <meta property="og:locale" content={page.locale} />
  <meta property="og:title" content={page.seoTitle} />
  <meta property="og:description" content={page.metaDescription} />
  <meta property="og:url" content={page.canonical} />
  <meta
    property="og:image"
    content="https://www.zorawebdesign.com/images/meet-700.webp"
  />
  <meta
    property="og:image:alt"
    content={`Julius Timgum – ${page.seoTitle}`}
  />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={page.seoTitle} />
  <meta name="twitter:description" content={page.metaDescription} />
  <meta
    name="twitter:image"
    content="https://www.zorawebdesign.com/images/meet-700.webp"
  />

  {@html `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, "\\u003c")}<\/script>`}
</svelte:head>

<Header nav={page.nav} />
<ThemeToggle />

<main>
  <Hero hero={page.hero} {projects} />

  <Services
    title={isGerman ? "LEISTUNGEN" : "SERVICES"}
    subtitle={page.serviceIntro}
    services={page.services}
    stats={page.stats}
    experienceLabel={isGerman ? "Erfahrungspunkt" : "Experience point"}
    toolsLabel={isGerman ? "TOOLS" : "TOOLS"}
    toolsAlt={isGerman ? "Werkzeuge" : "Tools"}
    serviceKeywordsLabel={isGerman ? "Leistungsmerkmale" : "Service keywords"}
    extraExperienceItems={[]}
    serviceKeywords={page.serviceKeywords}
    fallbackServiceTags={isGerman
      ? ["Strategie", "Design", "Umsetzung", "Optimierung"]
      : ["Strategy", "Design", "Build", "Optimize"]}
    problemEyebrow={isGerman ? "WIE ICH DIR HELFEN KANN" : "HOW I CAN HELP"}
    problemTitle={page.problemTitle}
    problemText={page.problemText}
    problemListTitle={isGerman
      ? "KOMMEN DIR DIESE HERAUSFORDERUNGEN BEKANNT VOR?"
      : "DO THESE CHALLENGES SOUND FAMILIAR?"}
    problemLabel={isGerman ? "DAS PROBLEM" : "THE PROBLEM"}
    solutionLabel={isGerman ? "MEINE LÖSUNG" : "MY SOLUTION"}
    problemItems={page.problemItems}
    toolsSectionTitle={isGerman
      ? "KOSTENLOSE TOOLS FÜR DEINE WEBSITE"
      : "FREE TOOLS FOR YOUR WEBSITE"}
    toolsMoreLabel={isGerman ? "MEHR" : "MORE"}
    toolLinks={isGerman
      ? [
          { title: "WEBSITE-PROJEKTPLANER", text: "Finde heraus, welche Seiten und Funktionen dein Projekt wirklich braucht.", href: "/website-konfigurator/", linkLabel: "PROJEKT PLANEN" },
          { title: "KOSTENLOSER WEBSITE-AUDIT", text: "Prüfe deine Website auf SEO, Leistung, Sicherheit und Barrierefreiheit.", href: "/website-audit/", linkLabel: "WEBSITE PRÜFEN" },
        ]
      : [
          { title: "WEBSITE PROJECT PLANNER", text: "Clarify the pages and functionality your project genuinely needs.", href: "/en-2/website-configurator/", linkLabel: "PLAN YOUR PROJECT" },
          { title: "FREE WEBSITE AUDIT", text: "Check your website for SEO, performance, security and accessibility.", href: "/en-2/website-audit/", linkLabel: "CHECK YOUR WEBSITE" },
        ]}
  />

  <Projects
    title={isGerman ? `PROJEKTE` : "PROJECTS"}
    subtitle={isGerman
      ? "Ausgewählte Webdesign, WordPress und Branding Projekte für Selbstständige, Unternehmen, Kreative und Organisationen."
      : "Selected website projects covering design, WordPress development, performance optimization, and custom branding."}
    {projects}
    loadMoreCopy={isGerman ? "Mehr sehen" : "Load more"}
    loadMoreText={isGerman ? "Weitere Projekte laden" : "Load additional projects"}
    loadMoreAria={isGerman ? "Weitere Projekte laden" : "Load additional projects"}
    viewProjectText={isGerman ? "Projekt ansehen" : "View project"}
    viewDetailsText={isGerman ? "Details ansehen" : "View details"}
    viewDetailsLink={isGerman ? "/referenzprojekt/" : "/en-2/reference-project/"}
    projectTagsLabel={isGerman ? "Projektleistungen" : "Project services"}
    defaultProjectTags={isGerman
      ? ["Webdesign", "WordPress", "Performance", "Support"]
      : ["Web design", "WordPress", "Performance", "Support"]}
  />

  <Process
    title={isGerman ? "PROJEKTABLAUF" : "MY PROCESS"}
    subtitle={isGerman
      ? "Ein klarer Website Prozess vom ersten Gespräch über Konzept und Design bis zum Launch und optionalen WordPress Support."
      : "A clear project process from the first consultation to launch and ongoing website support."}
    steps={page.process}
    imageCredits={isGerman
      ? ["Projektgespräch mit Ines und Andy – JUBS", "Konzept und Design", "Website Launch mit Isabella – reSOMA", "Support und Wartung"]
      : ["Project meeting with Ines and Andy – JUBS", "Concept and design", "Website launch with Isabella – reSOMA", "Support and maintenance"]}
  />

  <Reviews
    title={isGerman ? "KUNDENSTIMMEN" : "REVIEWS"}
    subtitle={isGerman
      ? "Kundenfeedback aus Webdesign, WordPress, Webshop und Branding Projekten."
      : "Feedback from clients and project partners."}
    reviews={page.reviews}
  />

  <Faq
    title="FAQ"
    subtitle={isGerman
      ? `Antworten zur Zusammenarbeit, Umsetzung und Sichtbarkeit für Projekte in ${page.cityDe}.`
      : `Answers about collaboration, delivery and visibility for projects in ${page.cityEn}.`}
    items={page.faq}
    language={page.language}
  />

  <Contact ...contact />

  <Footer
    copyright="ZORA WEB DESIGN © COPYRIGHT 2026"
    location={isGerman
      ? "HACKENGASSE 22, 1150 WIEN"
      : "HACKENGASSE 22, 1150 VIENNA"}
    imprintText={isGerman ? "IMPRESSUM" : "IMPRINT"}
    language={page.language}
    currentArea={page.key}
  />
</main>

{#if CookieConsent}
  <CookieConsent />
{/if}

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    margin: 0;
    background: #000;
    color: #f4f4f4;
    font-family: "DM Sans", Arial, sans-serif;
    transition: background 0.3s ease, color 0.3s ease;
  }

  :global(body.light) {
    background: #fff;
    color: #111;
  }

  :global(body.dark) {
    background: #000;
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

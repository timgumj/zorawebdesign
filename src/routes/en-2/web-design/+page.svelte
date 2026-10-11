<script>
  import { onMount } from "svelte";
  import "$lib/service-page-spacing.css";

  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import MoreServices from "$lib/components/MoreServices.svelte";
  import ProjectsHeader from "$lib/components/ProjectsHeader.svelte";
  import Projects from "$lib/components/Projects.svelte";

  import { projects } from "$lib/data/projects-en.js";

  /* =========================================================
     SEO — ENGLISH WEB DESIGN SERVICE PAGE
  ========================================================= */

  const siteUrl = "https://www.zorawebdesign.com";
  const canonical = `${siteUrl}/en-2/web-design/`;
  const germanUrl = `${siteUrl}/webdesign/`;

  const seo = {
    title: "Web Design Vienna | Freelance Web Designer – ZoraWebDesign",

    description:
      "Professional web design in Vienna by Julius Timgum. Custom WordPress websites, responsive design and SEO-friendly development. Explore projects and get in touch.",

    canonical,
  };

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const nav = {
    tagline: "SEO • WEB DESIGN • BRANDING",

    services: "SERVICES",
    projects: "PROJECTS",
    process: "PROCESS",
    reviews: "REVIEWS",
    faq: "FAQ",
    contact: "CONTACT",

    servicesLink: "/en-2/#services",
    projectsLink: "/en-2/#projects",
    processLink: "/en-2/#process",
    reviewsLink: "/en-2/#reviews",
    faqLink: "/en-2/#faq",
    contactLink: "/en-2/#contact",

    languageLabel: "DE",
    languageLink: "/webdesign/",
    languageTitle: "Zur deutschen Webdesign-Seite wechseln",

    freebies: {
      label: "WEBSITE TOOLS",
      items: [
        {
          label: "WEBSITE CONFIGURATOR",
          href: "/en-2/website-configurator/",
          title: "Open the Website Configurator",
        },
        {
          label: "WEBSITE AUDIT",
          href: "/en-2/website-audit/",
          title: "Open the free Website Audit",
        },
      ],
    },
  };

  const arrowPath = "M2 8H14 M10 4L14 8L10 12";

  /* =========================================================
     WEB DESIGN SERVICES
  ========================================================= */

  const services = [
    {
      title: "CUSTOM WEB DESIGN",

      description:
        "Professional web design starts with your business goals and the needs of your visitors. I create distinctive websites with intuitive navigation, thoughtful typography and a visual identity that reflects your brand. Rather than relying on a generic template, your website is designed around your content, audience and objectives.",

      tags: ["UI DESIGN", "UX", "RESPONSIVE"],
    },

    {
      title: "WORDPRESS WEBSITE DESIGN",

      description:
        "Looking for a professional WordPress website that you can manage yourself? I design and develop custom WordPress websites with an intuitive content management experience. After launch, you can update text, images and important sections without needing to write code or depend on a developer for every small change.",

      tags: ["WORDPRESS", "CMS", "GUTENBERG"],
    },

    {
      title: "RESPONSIVE WEB DESIGN",

      description:
        "Your website should work beautifully on smartphones, tablets and desktop computers. I develop responsive layouts with flexible typography, accessible navigation and carefully designed interactions. Mobile usability is considered from the beginning of the design process rather than treated as an afterthought.",

      tags: ["MOBILE", "TABLET", "DESKTOP"],
    },

    {
      title: "SEO & WEBSITE PERFORMANCE",

      description:
        "A professional website should be visually appealing and technically understandable to search engines. I consider semantic HTML, logical heading structures, metadata, internal linking, image optimization and loading performance throughout development. This provides a solid technical foundation for your ongoing SEO strategy.",

      tags: ["SEO", "CORE WEB VITALS", "PERFORMANCE"],
    },
  ];

  /* =========================================================
     WEBSITE DESIGN PROCESS
  ========================================================= */

  const process = [
    {
      title: "CONSULTATION & GOALS",

      description:
        "We discuss what your website needs to achieve, who you want to reach and which content or functionality your business requires. I help you identify the priorities and establish a clear direction for the project.",
    },

    {
      title: "CONCEPT & WEB DESIGN",

      description:
        "I develop a suitable website structure, user journey and visual direction based on your goals. We review the layout, content organization and design together before proceeding with development.",
    },

    {
      title: "DEVELOPMENT & OPTIMIZATION",

      description:
        "I turn the approved design into a functional website and test its navigation, responsive behavior, loading performance and technical SEO foundations. For WordPress projects, I also focus on making important content easy for you to manage.",
    },

    {
      title: "TESTING, LAUNCH & SUPPORT",

      description:
        "Before launch, I test the website's essential functionality and presentation across different devices. Once everything is ready, your new website goes live. Optional hosting, maintenance and technical support are available afterward.",
    },
  ];

  /* =========================================================
     PROJECTS — FIRST SIX FROM ENGLISH HOMEPAGE DATA
  ========================================================= */

  const selectedProjects = projects.slice(0, 6);

  /* =========================================================
     WEBSITE PRICING
     NO UNVERIFIED FIXED PRICES
  ========================================================= */

  const priceFactors = [
    {
      title: "WEBSITE SIZE & STRUCTURE",

      description:
        "A compact business website with a few pages generally requires less development work than a larger website with multiple service pages, project portfolios, detailed content sections or custom navigation.",
    },

    {
      title: "DESIGN & FUNCTIONALITY",

      description:
        "The cost also depends on the level of customization and the features your website requires. Booking systems, multilingual content, online shops and third-party integrations may increase the overall project scope.",
    },

    {
      title: "CONTENT & DEVELOPMENT",

      description:
        "Having your text, images and brand assets ready helps streamline development. Additional services such as content creation, complex website migrations or custom technical features are considered when preparing your proposal.",
    },

    {
      title: "HOSTING & MAINTENANCE",

      description:
        "Besides the initial website development, there may be ongoing costs for domain registration, hosting, third-party services and WordPress maintenance. I explain which recurring services are necessary and which are optional.",
    },
  ];

  /* =========================================================
     FREE WEBSITE TOOLS
  ========================================================= */

  const freeTools = [
    {
      title: "WEBSITE CONFIGURATOR",

      description:
        "Planning a new website but unsure which pages and features you need? My free Website Configurator guides you through the essential questions so you can organize your project before development begins.",

      href: "/en-2/website-configurator/",

      button: "PLAN YOUR WEBSITE",
    },

    {
      title: "FREE WEBSITE AUDIT",

      description:
        "Already have a website and want to identify potential improvements? Use my free Website Audit to examine important technical areas including SEO, performance, security and accessibility.",

      href: "/en-2/website-audit/",

      button: "AUDIT YOUR WEBSITE",
    },
  ];

  /* =========================================================
     TECHNOLOGY MARQUEE
  ========================================================= */

  const tools = [
    { src: "/images/google-analytics.png", alt: "Google Analytics" },
    { src: "/images/google-ads.png", alt: "Google Ads" },
    { src: "/images/hubspot.png", alt: "HubSpot" },
    { src: "/images/mailchimp.png", alt: "Mailchimp" },
    { src: "/images/openai.png", alt: "OpenAI" },
    { src: "/images/vercel-logotype-dark.svg", alt: "Vercel" },
    { src: "/images/svelte.png", alt: "Svelte" },
    { src: "/images/woocommerce.png", alt: "WooCommerce" },
    { src: "/images/shopify.png", alt: "Shopify" },
    { src: "/images/wordpress.png", alt: "WordPress" },
  ];

  const marqueeTools = [...tools, ...tools];

  /* =========================================================
     FAQ — ENGLISH SEARCH INTENT
  ========================================================= */

  const faqs = [
    {
      question: "HOW MUCH DOES PROFESSIONAL WEB DESIGN COST IN VIENNA?",

      answer:
        "The cost of professional web design depends on the number of pages, design requirements and features involved. A straightforward business website usually requires less work than a multilingual platform with advanced integrations. After an initial consultation, I prepare a transparent proposal based on your actual project needs.",
    },

    {
      question: "HOW LONG DOES IT TAKE TO DESIGN AND BUILD A WEBSITE?",

      answer:
        "The timeline depends on the size of the website, the required functionality and the availability of your content. A smaller business website can usually be completed more quickly than a complex project. Before development begins, we agree on a realistic schedule for design, implementation, testing and launch.",
    },

    {
      question:
        "WHAT IS THE DIFFERENCE BETWEEN WEB DESIGN AND WEB DEVELOPMENT?",

      answer:
        "Web design focuses on visual appearance, website structure, usability and user experience. Web development turns that design into a working website and implements its functionality, content management and responsive behavior. I provide both services, so you can work directly with one designer and developer throughout your project.",
    },

    {
      question: "CAN I EDIT MY WORDPRESS WEBSITE AFTER LAUNCH?",

      answer:
        "Yes. I develop WordPress websites with a straightforward content management experience so you can update important text, images and website sections yourself. I can also provide a personal walkthrough to help you understand how to maintain your content.",
    },

    {
      question: "WILL MY NEW WEBSITE BE OPTIMIZED FOR GOOGLE?",

      answer:
        "I include essential technical SEO foundations during development, including semantic HTML, appropriate metadata, clear heading structures, internal links, mobile usability and loading performance. Search rankings also depend on competition, content quality and other factors, so specific Google positions cannot be guaranteed.",
    },

    {
      question: "CAN YOU REDESIGN MY EXISTING WEBSITE?",

      answer:
        "Yes. A website redesign begins with reviewing your current content, layout and functionality. I identify what should be preserved and which areas need improvement. During a redesign or migration, I also consider existing URLs, important content and search visibility to reduce unnecessary SEO risks.",
    },

    {
      question: "DO YOU PROVIDE WORDPRESS HOSTING AND WEBSITE MAINTENANCE?",

      answer:
        "Yes. I offer optional hosting and ongoing WordPress maintenance, including updates, backups, security measures and technical support. The exact scope of ongoing services is agreed individually according to your website's requirements.",
    },

    {
      question: "DO YOU WORK WITH CLIENTS OUTSIDE VIENNA?",

      answer:
        "Absolutely. I am a freelance web designer based in Vienna, Austria, and work with freelancers, businesses and organizations across Austria, Germany and internationally. Many projects can be completed remotely with clear communication and regular feedback.",
    },
  ];

  /* =========================================================
     STRUCTURED DATA
  ========================================================= */

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "Service",

        "@id": `${canonical}#service`,

        name: "Web Design Vienna – Custom Websites and WordPress Development",

        serviceType: "Web Design and WordPress Website Development",

        description: seo.description,

        url: canonical,

        inLanguage: "en",

        provider: {
          "@type": "ProfessionalService",
          "@id": `${siteUrl}/#business`,
          name: "ZoraWebDesign",
          url: `${siteUrl}/`,
        },

        areaServed: [
          {
            "@type": "City",
            name: "Vienna",
          },
          {
            "@type": "Country",
            name: "Austria",
          },
        ],
      },

      {
        "@type": "BreadcrumbList",

        "@id": `${canonical}#breadcrumbs`,

        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteUrl}/en-2/`,
          },

          {
            "@type": "ListItem",
            position: 2,
            name: "Web Design Vienna",
            item: canonical,
          },
        ],
      },
    ],
  };

  /* =========================================================
     PAGE THEME
  ========================================================= */

  onMount(() => {
    const body = document.body;
    const html = document.documentElement;

    const hadLight = body.classList.contains("light");
    const htmlHadLight = html.classList.contains("light");

    html.lang = "en";

    html.classList.remove("light");
    body.classList.remove("light");
    body.classList.add("service-dark-page");

    return () => {
      body.classList.remove("service-dark-page");

      if (hadLight) body.classList.add("light");
      if (htmlHadLight) html.classList.add("light");
    };
  });
</script>

<!-- =========================================================
     SEO HEAD
========================================================= -->

<svelte:head>
  <title>{seo.title}</title>

  <meta name="description" content={seo.description} />

  <meta name="robots" content="index, follow, max-image-preview:large" />

  <meta name="author" content="Julius Timgum – ZoraWebDesign" />

  <link rel="canonical" href={canonical} />

  <!-- HREFLANG -->

  <link rel="alternate" hreflang="en" href={canonical} />

  <link rel="alternate" hreflang="de" href={germanUrl} />

  <link rel="alternate" hreflang="x-default" href={germanUrl} />

  <!-- OPEN GRAPH -->

  <meta property="og:type" content="website" />

  <meta property="og:site_name" content="ZoraWebDesign" />

  <meta property="og:locale" content="en_US" />

  <meta property="og:locale:alternate" content="de_AT" />

  <meta property="og:title" content={seo.title} />

  <meta property="og:description" content={seo.description} />

  <meta property="og:url" content={canonical} />

  <meta property="og:image" content={`${siteUrl}/images/meet-700.webp`} />

  <!-- TWITTER / X -->

  <meta name="twitter:card" content="summary_large_image" />

  <meta name="twitter:title" content={seo.title} />

  <meta name="twitter:description" content={seo.description} />

  <meta name="twitter:image" content={`${siteUrl}/images/meet-700.webp`} />

  <!-- STRUCTURED DATA -->

  {@html `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, "\\u003c")}</script>`}
</svelte:head>

<!-- =========================================================
     HEADER
========================================================= -->

<Header {nav} showStaticThemeIcon={false} />

<main class="webdesign-page compact-service-page">
  <!-- =======================================================
       HERO
  ======================================================== -->

  <section class="intro-section">
    <div class="page-shell intro-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="reading-column">
        <div class="hero">
          <span class="eyebrow"> ZORAWEBDESIGN / VIENNA / AUSTRIA </span>

          <h1>
            <span>WEB DESIGN VIENNA</span>
            <span class="outlined-title">
              CUSTOM WEBSITES & WORDPRESS DEVELOPMENT
            </span>
          </h1>

          <p class="hero-lead">
            Looking for a professional website that represents your business and
            makes a strong first impression? I design and develop custom,
            responsive websites for freelancers, businesses and organizations.
            Modern design, intuitive user experiences and technically sound
            development – delivered personally by Julius Timgum.
          </p>

          <div class="hero-actions">
            <a href="/en-2/#contact" class="button button-primary">
              <span>START YOUR PROJECT</span>

              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4.34 11.66L11.66 4.34M4.59 4.34H11.66V11.41"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>

            <a href="#webdesign-projects" class="button button-outline">
              <span>VIEW PROJECTS</span>

              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M8 2V14M3 9L8 14L13 9"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- =================================================
             INTRODUCTION
        ================================================== -->

        <div class="overview">
          <h2>WHAT MAKES A PROFESSIONAL WEBSITE EFFECTIVE?</h2>

          <p>
            Effective web design combines strong visual presentation with clear
            information architecture, intuitive navigation and reliable
            technical performance. A professional business website should
            explain your services, build trust and make it easy for visitors to
            contact you, book an appointment or take the next step.
          </p>

          <p>
            I am Julius Timgum, a freelance web designer and developer based in
            Vienna, Austria. I create custom websites for freelancers, small
            businesses, creatives and organizations. My work combines modern web
            design, WordPress development and user-focused frontend engineering.
          </p>

          <p>
            Each website is developed around the relationship between design,
            content and technology. You work directly with me from the initial
            consultation through concept development, implementation and launch.
            I can also provide ongoing support after your website goes live.
          </p>

          <ul class="benefit-list">
            <li>Custom website design tailored to your business</li>

            <li>Responsive layouts for smartphones, tablets and desktops</li>

            <li>Search-engine-friendly structure and technical foundations</li>

            <li>
              Direct collaboration with a freelance web designer in Vienna
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- =======================================================
       WEB DESIGN SERVICES
  ======================================================== -->

  <section class="content-section">
    <ProjectsHeader
      title="WHAT WEB DESIGN SERVICES DO I OFFER IN VIENNA?"
      subtitle="From individual visual design to technical development, I help freelancers and businesses create professional websites that reflect their identity, serve their customers and support their goals."
    />

    <div class="page-shell content-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="service-grid">
        {#each services as service}
          <article class="service-card">
            <span class="blue-dot" aria-hidden="true"></span>

            <h3>{service.title}</h3>

            <p>{service.description}</p>

            <div class="tag-list">
              {#each service.tags as tag}
                <span>{tag}</span>
              {/each}
            </div>
          </article>
        {/each}
      </div>

      <div class="section-note">
        <p>
          Need more than a beautifully designed website? Explore my
          <a href="/en-2/#services">complete range of services</a>
          including WordPress development, website hosting, maintenance and technical
          support.
        </p>
      </div>
    </div>
  </section>

  <!-- =======================================================
       SELECTED PROJECTS
  ======================================================== -->

  <section id="webdesign-projects" class="projects-section">
    <ProjectsHeader
      title="WEB DESIGN PROJECTS & CLIENT REFERENCES"
      subtitle="Explore selected website projects for freelancers, businesses, creatives and organizations. Each project combines custom design with the specific requirements of its audience."
    />

    <Projects
      projects={selectedProjects}
      loadMoreCopy="See more"
      loadMoreText="Load more projects"
      loadMoreAria="Load more projects"
      viewProjectText="LIVE SITE"
      viewDetailsText="View details"
      viewDetailsLink="/en-2/reference-project/"
      projectTagsLabel="Project services"
      defaultProjectTags={["Web Design", "WordPress", "Development", "Support"]}
    />

    <div class="projects-more">
      <a href="/en-2/#projects" class="button button-outline">
        <span>VIEW ALL PROJECTS</span>

        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M4.34 11.66L11.66 4.34M4.59 4.34H11.66V11.41"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </div>
  </section>

  <!-- =======================================================
       WEBSITE DESIGN PROCESS
  ======================================================== -->

  <section class="content-section">
    <ProjectsHeader
      title="HOW DOES THE WEBSITE DESIGN PROCESS WORK?"
      subtitle="From your first inquiry through concept development, web design and implementation to launch, a clear process helps you understand what happens at every stage of your project."
    />

    <div class="page-shell content-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="process-grid">
        {#each process as step}
          <article class="process-card">
            <span class="blue-dot" aria-hidden="true"></span>

            <h3>{step.title}</h3>

            <p>{step.description}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <!-- =======================================================
       WEBSITE PRICING
  ======================================================== -->

  <section class="content-section">
    <ProjectsHeader
      title="HOW MUCH DOES PROFESSIONAL WEB DESIGN COST IN VIENNA?"
      subtitle="Website design costs depend on your project's scope, content and functionality. I explain the factors that influence pricing and help you define a realistic approach for your business."
    />

    <div class="page-shell pricing-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="reading-column pricing-intro">
        <p>
          If you are considering hiring a web designer in Vienna, it is
          important to understand that website pricing varies depending on the
          requirements of your project. A small business website with a handful
          of pages generally requires less work than a large multilingual
          website with custom functionality or external integrations.
        </p>

        <p>
          Instead of offering the same solution to every client, I first discuss
          your goals, content, design expectations and technical needs. This
          allows me to assess the actual project scope and prepare a tailored
          proposal. The aim is to build a website that serves your business
          without adding unnecessary features or complexity.
        </p>
      </div>

      <div class="pricing-grid">
        {#each priceFactors as factor}
          <article class="pricing-card">
            <span class="blue-dot" aria-hidden="true"></span>

            <h3>{factor.title}</h3>

            <p>{factor.description}</p>
          </article>
        {/each}
      </div>

      <div class="pricing-bottom">
        <div>
          <h3>WANT TO ESTIMATE THE SCOPE OF YOUR WEBSITE?</h3>

          <p>
            Use my free Website Configurator to organize your requirements and
            identify the features that matter. We can then discuss the most
            suitable approach for your project.
          </p>
        </div>

        <a href="/en-2/website-configurator/" class="button button-outline">
          <span>PLAN YOUR WEBSITE</span>

          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4.34 11.66L11.66 4.34M4.59 4.34H11.66V11.41"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>

  <!-- =======================================================
       FREE WEBSITE TOOLS
  ======================================================== -->

  <section class="content-section">
    <ProjectsHeader
      title="FREE WEBSITE PLANNING & AUDIT TOOLS"
      subtitle="Plan your next website or analyze your existing online presence. My free tools help you identify the requirements of your project and understand opportunities for improvement."
    />

    <div class="page-shell tools-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="free-tools-grid">
        {#each freeTools as tool}
          <article class="free-tool-card">
            <div class="free-tool-content">
              <span class="blue-dot" aria-hidden="true"></span>

              <h3>{tool.title}</h3>

              <p>{tool.description}</p>
            </div>

            <a href={tool.href} class="free-tool-link">
              <span>{tool.button}</span>

              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d={arrowPath}
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </article>
        {/each}
      </div>

      <!-- TECHNOLOGY MARQUEE -->

      <div class="marquee-heading">
        <span class="blue-dot" aria-hidden="true"></span>

        <h3>MY DIGITAL TOOLKIT</h3>
      </div>

      <div
        class="tools-marquee"
        aria-label="Technologies and tools I work with"
      >
        <div class="tools-marquee-track">
          {#each marqueeTools as tool, index}
            <div
              class="marquee-item"
              class:vercel-logo={tool.alt === "Vercel"}
              class:svelte-logo={tool.alt === "Svelte"}
              aria-hidden={index >= tools.length}
            >
              <img
                src={tool.src}
                alt={index < tools.length ? tool.alt : ""}
                loading="lazy"
                decoding="async"
              />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- =======================================================
       FAQ
  ======================================================== -->

  <section class="content-section">
    <ProjectsHeader
      title="FREQUENTLY ASKED QUESTIONS ABOUT WEB DESIGN IN VIENNA"
      subtitle="Answers to common questions about professional website costs, WordPress, web development, SEO, project timelines and working with a freelance web designer."
    />

    <div class="page-shell faq-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="reading-column">
        <div class="faq-list">
          {#each faqs as faq}
            <details class="faq-item">
              <summary>
                <span>{faq.question}</span>

                <svg
                  class="faq-icon"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M10 4V16M4 10H16"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </summary>

              <p>{faq.answer}</p>
            </details>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- =======================================================
       FINAL CTA
  ======================================================== -->

  <section class="final-section">
    <div class="page-shell final-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="reading-column final-content">
        <span class="eyebrow"> YOUR NEXT WEB DESIGN PROJECT </span>

        <h2>NEED A NEW WEBSITE? LET'S DISCUSS YOUR PROJECT.</h2>

        <p>
          Planning a new business website or considering a redesign of your
          existing online presence? As a freelance web designer based in Vienna,
          I can help you develop the right solution – from the first idea
          through design, development and launch.
        </p>

        <a href="/en-2/#contact" class="button button-primary">
          <span>START YOUR PROJECT</span>

          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4.34 11.66L11.66 4.34M4.59 4.34H11.66V11.41"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>
  <MoreServices language="en" currentService="webdesign" />
</main>

<!-- =========================================================
     FOOTER
========================================================= -->

<div class="service-footer">
  <Footer
    homepage
    location="HACKENGASSE 22, 1150 VIENNA"
    imprintText="IMPRINT"
    language="en"
  />
</div>

<!-- =========================================================
     STYLES
========================================================= -->

<style>
  /* =========================================================
     BASE
  ========================================================= */

  :global(body.service-dark-page) {
    margin: 0;
    background: #000 !important;
    color: #f5f5f5 !important;
    color-scheme: dark;
  }

  .webdesign-page {
    --accent: #0043ff;
    --text: #f5f5f5;
    --muted: rgba(255, 255, 255, 0.65);
    --line: rgba(255, 255, 255, 0.09);

    width: 100%;
    overflow: clip;
    background: #000;
    color: var(--text);
    color-scheme: dark;
    font-family: "DM Sans", Arial, sans-serif;
  }

  .webdesign-page * {
    box-sizing: border-box;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  /* =========================================================
     PAGE SHELL
  ========================================================= */

  .page-shell {
    position: relative;
    width: min(1540px, calc(100% - 32px));
    margin: 0 auto;
    padding-left: 40px;
    padding-right: 40px;
  }

  .edge-line {
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--line);
    pointer-events: none;
  }

  .edge-left {
    left: 0;
  }

  .edge-right {
    right: 0;
  }

  .reading-column {
    width: min(800px, 100%);
    margin: 0 auto;
  }

  .intro-section,
  .content-section,
  .projects-section,
  .final-section {
    background: #000;
  }

  /* =========================================================
     HERO
  ========================================================= */

  .intro-section {
    border-top: 1px solid var(--line);
  }

  .intro-shell {
    padding-top: 86px;
    padding-bottom: 100px;
  }

  .eyebrow {
    display: block;
    color: var(--muted);
    font-size: 11px;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .hero h1 {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin: 27px 0 0;
    color: var(--text);
    font-size: clamp(28px, 3.25vw, 52px);
    font-weight: 600;
    line-height: 1.03;
    letter-spacing: -0.035em;
    text-transform: uppercase;
  }

  .hero h1 span {
    display: block;
  }

  .outlined-title {
    color: transparent;
    -webkit-text-stroke: 1px #f5f5f5;
  }

  .hero-lead {
    max-width: 650px;
    margin: 28px 0 0;
    color: var(--muted);
    font-size: 17px;
    line-height: 1.75;
  }

  /* =========================================================
     BUTTONS
  ========================================================= */

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    margin-top: 30px;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 46px;
    padding: 0 20px;
    border: 1px solid #fff;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.06em;
    text-decoration: none;
    text-transform: uppercase;
    transition:
      background 0.25s ease,
      color 0.25s ease;
  }

  .button svg {
    width: 16px;
    height: 16px;
    flex: 0 0 auto;
    transition: transform 0.25s ease;
  }

  .button:hover svg {
    transform: translate(3px, -2px);
  }

  .button-primary {
    background: #fff;
    color: #000;
  }

  .button-primary:hover {
    background: transparent;
    color: #fff;
  }

  .button-outline {
    background: transparent;
    color: #fff;
  }

  .button-outline:hover {
    background: #fff;
    color: #000;
  }

  .button:focus-visible,
  .free-tool-link:focus-visible,
  .faq-item summary:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
  }

  /* =========================================================
     INTRODUCTION
  ========================================================= */

  .overview {
    margin-top: 90px;
  }

  .overview h2 {
    max-width: 750px;
    margin: 0;
    font-size: clamp(23px, 2vw, 32px);
    font-weight: 600;
    line-height: 1.16;
    letter-spacing: -0.025em;
  }

  .overview p {
    margin: 25px 0 0;
    color: var(--muted);
    font-size: 16px;
    line-height: 1.8;
  }

  .benefit-list {
    display: grid;
    gap: 18px;
    margin: 35px 0 0;
    padding: 0;
    list-style: none;
  }

  .benefit-list li {
    position: relative;
    padding-left: 23px;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.65;
  }

  .benefit-list li::before {
    position: absolute;
    top: 0.65em;
    left: 0;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    content: "";
  }

  /* =========================================================
     SECTION SPACING
  ========================================================= */

  .content-shell {
    padding-top: 65px;
    padding-bottom: 125px;
  }

  /* =========================================================
     BLUE DOT
  ========================================================= */

  .blue-dot {
    display: block;
    flex: 0 0 auto;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: var(--accent);
  }

  /* =========================================================
     SERVICE CARDS
  ========================================================= */

  .service-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    border: 1px solid var(--line);
    background: var(--line);
  }

  .service-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
    padding: clamp(32px, 4vw, 65px);
    background: #000;
  }

  .service-card h3 {
    margin: 35px 0 0;
    color: var(--text);
    font-size: clamp(20px, 1.7vw, 27px);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .service-card p {
    max-width: 540px;
    margin: 22px 0 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.8;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
    padding-top: 35px;
  }

  .tag-list span {
    padding: 7px 10px;
    border: 1px solid var(--line);
    color: rgba(255, 255, 255, 0.8);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  .section-note {
    max-width: 800px;
    margin: 48px auto 0;
  }

  .section-note p {
    margin: 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.8;
  }

  .section-note a {
    color: #fff;
    text-decoration-color: var(--accent);
    text-underline-offset: 4px;
  }

  /* =========================================================
     PROJECTS
  ========================================================= */

  .projects-section {
    padding-bottom: 110px;
  }

  .projects-more {
    display: flex;
    justify-content: center;
    padding: 0 24px 30px;
  }

  /* =========================================================
     PROCESS
  ========================================================= */

  .process-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    border: 1px solid var(--line);
    background: var(--line);
  }

  .process-card {
    min-width: 0;
    padding: clamp(32px, 4vw, 60px);
    background: #000;
  }

  .process-card h3 {
    margin: 35px 0 0;
    font-size: clamp(20px, 1.6vw, 25px);
    line-height: 1.2;
    font-weight: 600;
  }

  .process-card p {
    max-width: 550px;
    margin: 22px 0 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.8;
  }

  /* =========================================================
     PRICING
  ========================================================= */

  .pricing-shell {
    padding-top: 65px;
    padding-bottom: 125px;
  }

  .pricing-intro {
    padding-bottom: 55px;
  }

  .pricing-intro p {
    margin: 0 0 22px;
    color: var(--muted);
    font-size: 16px;
    line-height: 1.8;
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    border: 1px solid var(--line);
    background: var(--line);
  }

  .pricing-card {
    min-width: 0;
    padding: clamp(32px, 4vw, 60px);
    background: #000;
  }

  .pricing-card h3 {
    margin: 35px 0 0;
    font-size: clamp(20px, 1.6vw, 25px);
    font-weight: 600;
    line-height: 1.2;
  }

  .pricing-card p {
    max-width: 540px;
    margin: 22px 0 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.8;
  }

  .pricing-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 45px;
    padding: 50px 0 0;
  }

  .pricing-bottom > div {
    max-width: 650px;
  }

  .pricing-bottom h3 {
    margin: 0;
    font-size: clamp(19px, 1.5vw, 25px);
    font-weight: 600;
    line-height: 1.25;
  }

  .pricing-bottom p {
    margin: 18px 0 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.8;
  }

  .pricing-bottom .button {
    flex: 0 0 auto;
  }

  /* =========================================================
     FREE TOOLS
  ========================================================= */

  .tools-shell {
    padding-top: 65px;
    padding-bottom: 125px;
  }

  .free-tools-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    border: 1px solid var(--line);
    background: var(--line);
  }

  .free-tool-card {
    display: flex;
    flex-direction: column;
    min-width: 0;
    background: #000;
  }

  .free-tool-content {
    flex: 1;
    padding: clamp(30px, 4vw, 60px);
  }

  .free-tool-content h3 {
    margin: 35px 0 0;
    font-size: clamp(20px, 1.65vw, 27px);
    font-weight: 600;
    line-height: 1.2;
  }

  .free-tool-content p {
    max-width: 530px;
    margin: 22px 0 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.8;
  }

  .free-tool-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    min-height: 75px;
    padding: 20px clamp(30px, 4vw, 60px);
    border-top: 1px solid var(--line);
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-decoration: none;
    transition: background 0.2s ease;
  }

  .free-tool-link:hover {
    background: #101010;
  }

  .free-tool-link svg {
    width: 18px;
    height: 18px;
    transition: transform 0.2s ease;
  }

  .free-tool-link:hover svg {
    transform: translateX(5px);
  }

  /* =========================================================
     TOOL MARQUEE
  ========================================================= */

  .marquee-heading {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 95px;
    margin-bottom: 30px;
  }

  .marquee-heading h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  .tools-marquee {
    width: 100%;
    overflow: hidden;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    background: #000;
  }

  .tools-marquee-track {
    display: flex;
    align-items: center;
    width: max-content;
    animation: tools-scroll 45s linear infinite;
  }

  .tools-marquee:hover .tools-marquee-track {
    animation-play-state: paused;
  }

  .marquee-item {
    display: flex;
    flex: 0 0 170px;
    align-items: center;
    justify-content: center;
    height: 115px;
    padding: 20px 35px;
  }

  .marquee-item img {
    display: block;
    max-width: 100%;
    max-height: 48px;
    width: auto;
    height: auto;
    object-fit: contain;
  }

  .marquee-item.vercel-logo img {
    filter: invert(1);
  }

  .marquee-item.svelte-logo img {
    max-height: 44px;
  }

  @keyframes tools-scroll {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-50%);
    }
  }

  /* =========================================================
     FAQ
  ========================================================= */

  .faq-shell {
    padding-top: 65px;
    padding-bottom: 135px;
  }

  .faq-list {
    border-top: 1px solid var(--line);
  }

  .faq-item {
    border-bottom: 1px solid var(--line);
  }

  .faq-item summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
    padding: 26px 0;
    cursor: pointer;
    color: var(--text);
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    list-style: none;
  }

  .faq-item summary::-webkit-details-marker {
    display: none;
  }

  .faq-icon {
    width: 18px;
    height: 18px;
    flex: 0 0 auto;
    color: var(--accent);
    transition: transform 0.25s ease;
  }

  .faq-item[open] .faq-icon {
    transform: rotate(45deg);
  }

  .faq-item p {
    margin: 0;
    padding: 0 30px 28px 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.8;
  }

  /* =========================================================
     FINAL CTA
  ========================================================= */

  .final-section {
    border-top: 1px solid var(--line);
  }

  .final-shell {
    padding-top: 115px;
    padding-bottom: 130px;
  }

  .final-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .final-content h2 {
    max-width: 700px;
    margin: 25px 0 0;
    font-size: clamp(26px, 3vw, 45px);
    font-weight: 600;
    line-height: 1.12;
    letter-spacing: -0.035em;
  }

  .final-content p {
    max-width: 630px;
    margin: 25px 0 0;
    color: var(--muted);
    font-size: 16px;
    line-height: 1.75;
  }

  .final-content .button {
    margin-top: 35px;
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (max-width: 1024px) {
    .page-shell {
      padding-left: 26px;
      padding-right: 26px;
    }

    .intro-shell {
      padding-top: 75px;
      padding-bottom: 85px;
    }

    .content-shell,
    .tools-shell,
    .pricing-shell {
      padding-top: 55px;
      padding-bottom: 95px;
    }

    .service-card,
    .process-card,
    .pricing-card,
    .free-tool-content {
      padding: 35px;
    }

    .free-tool-link {
      padding-left: 35px;
      padding-right: 35px;
    }

    .pricing-bottom {
      align-items: flex-start;
      flex-direction: column;
      gap: 25px;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 767px) {
    .page-shell {
      width: calc(100% - 24px);
      padding-left: 14px;
      padding-right: 14px;
    }

    .intro-shell {
      padding-top: 55px;
      padding-bottom: 70px;
    }

    .hero h1 {
      font-size: clamp(28px, 7vw, 40px);
      overflow-wrap: anywhere;
    }

    .outlined-title {
      -webkit-text-stroke: 0.8px #f5f5f5;
    }

    .hero-lead {
      font-size: 15px;
    }

    .hero-actions {
      align-items: stretch;
    }

    .button {
      min-height: 45px;
    }

    .overview {
      margin-top: 72px;
    }

    .overview h2 {
      font-size: 24px;
    }

    .overview p,
    .pricing-intro p {
      font-size: 15px;
    }

    .content-shell,
    .tools-shell,
    .faq-shell,
    .pricing-shell {
      padding-top: 45px;
      padding-bottom: 75px;
    }

    .service-grid,
    .process-grid,
    .pricing-grid,
    .free-tools-grid {
      grid-template-columns: 1fr;
    }

    .service-card,
    .process-card,
    .pricing-card,
    .free-tool-content {
      padding: 30px 22px;
    }

    .service-card h3,
    .process-card h3,
    .pricing-card h3,
    .free-tool-content h3 {
      font-size: 21px;
    }

    .service-card p,
    .process-card p,
    .pricing-card p,
    .free-tool-content p {
      font-size: 15px;
    }

    .free-tool-link {
      padding: 20px 22px;
    }

    .pricing-intro {
      padding-bottom: 30px;
    }

    .pricing-bottom {
      padding-top: 35px;
    }

    .projects-section {
      padding-bottom: 75px;
    }

    .marquee-heading {
      margin-top: 65px;
    }

    .marquee-item {
      flex-basis: 125px;
      height: 90px;
      padding: 15px 25px;
    }

    .marquee-item img {
      max-height: 36px;
    }

    .faq-item summary {
      font-size: 15px;
    }

    .final-shell {
      padding-top: 80px;
      padding-bottom: 95px;
    }

    .final-content h2 {
      font-size: 29px;
    }

    .final-content p {
      font-size: 15px;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    :global(html) {
      scroll-behavior: auto;
    }

    .tools-marquee-track {
      animation: none;
    }

    .button,
    .button svg,
    .free-tool-link svg,
    .faq-icon {
      transition: none;
    }
  }
</style>

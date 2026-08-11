<script>
  import { onMount } from "svelte";

  import { page } from "$app/state";

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

  import { projects as rawProjects } from "$lib/data/projects-en.js";

  const translatedProjects = $derived(
    rawProjects.map((project) => {
      const titleLower = project.title?.toLowerCase() || "";

      if (titleLower.includes("jubs")) {
        return {
          ...project,
          title: "JUBS VEREIN",
          description:
            "A custom high performance WordPress platform tailored for youth advisory services in Vienna. Features optimized accessibility workflows, a clean intuitive UI layout, and custom Gutenberg content block mechanics.",
          tags: project.tags,
          imgAlt: "Web design project for JUBS VEREIN in Austria",
          imgTitle: "JUBS VEREIN",
        };
      }

      if (titleLower.includes("soma") || titleLower.includes("resoma")) {
        return {
          ...project,
          title: "RESOMA",
          description:
            "Strategic visual interface overhaul and fast portfolio engineering built around strong Core Web Vitals. Fully optimized modern responsive layouts designed for intuitive customer conversion.",

          imgAlt: "Web design project for RESOMA in Vienna",
          imgTitle: "RESOMA",
        };
      }

      if (titleLower.includes("bosede") || titleLower.includes("baldauf")) {
        return {
          ...project,
          title: "Dr. Bosede Baldauf",
          description:
            "A clean, modern medical practice layout prioritizing user journey flows and fast mobile page performance. Engineered with an easily updateable content structure.",

          imgAlt: "Website project for Dr. Bosede Baldauf in Vienna",
          imgTitle: "Dr. Bosede Baldauf",
        };
      }

      if (
        titleLower.includes("wüllenweber") ||
        titleLower.includes("hypnosie") ||
        titleLower.includes("hypnose")
      ) {
        return {
          ...project,
          title: "ONLINE-HYPNOSE",
          description:
            "A tailored creative web layout designed to capture organic client inquiries. Showcases structured landing blocks built on a lightweight architecture for fast loading speeds.",

          imgAlt: "Website project for ONLINE-HYPNOSE",
          imgTitle: "ONLINE-HYPNOSE",
        };
      }

      if (titleLower.includes("jahson") || titleLower.includes("scientist")) {
        return {
          ...project,
          title: "JAHSON The Scientist",
          description:
            "A bold digital portfolio engineered for a contemporary international artist. Features media presentation blocks, custom creative styling, and smooth performance transitions.",

          imgAlt: "Creative portfolio website for JAHSON The Scientist",
          imgTitle: "JAHSON The Scientist",
        };
      }

      if (titleLower.includes("hofbauer") || titleLower.includes("anna")) {
        return {
          ...project,
          title: "ANNA HOFBAUER",
          description:
            "A minimalist digital gallery showcase crafted for a professional visual artist. Designed as an immersive online art archive with clean image layouts and elegant content organization.",

          imgAlt: "Digital gallery website for ANNA HOFBAUER",
          imgTitle: "ANNA HOFBAUER",
        };
      }

      let fallbackAlt =
        "Premium web design and WordPress development project reference.";
      let fallbackTitle = project.title || "WordPress Project Reference";

      if (titleLower.includes("kathrin")) {
        fallbackAlt = "Website project for KATHRIN SIEDER";
        fallbackTitle = "KATHRIN SIEDER";
      } else if (titleLower.includes("ernst")) {
        fallbackAlt = "Website project for EWA ERNST-DZIEDZIG";
        fallbackTitle = "EWA ERNST-DZIEDZIG";
      } else if (titleLower.includes("imani")) {
        fallbackAlt = "Website project for Imani Rameses";
        fallbackTitle = "Imani Rameses";
      } else if (titleLower.includes("glucksraum")) {
        fallbackAlt = "Website project for GLÜCKSRAUM";
        fallbackTitle = "GLÜCKSRAUM";
      } else if (titleLower.includes("moha")) {
        fallbackAlt = "Website project for Moha Galerie";
        fallbackTitle = "Moha Galerie";
      } else if (titleLower.includes("botang")) {
        fallbackAlt = "Website project for Botang Records";
        fallbackTitle = "Botang Records";
      } else if (titleLower.includes("promove")) {
        fallbackAlt = "Website project for Pro Move Transport";
        fallbackTitle = "Pro Move Transport";
      } else if (titleLower.includes("afrieurotext")) {
        fallbackAlt = "Website project for Afrieurotext in Vienna";
        fallbackTitle = "Afrieurotext";
      }

      return {
        ...project,
        title: fallbackTitle,
        description:
          project.description_en || project.description || fallbackAlt,
        imgAlt: fallbackAlt,
        imgTitle: fallbackTitle,
      };
    }),
  );

  let CookieConsent = $state(null);
  let currentUrl = $derived(
    page.url?.href || "https://zorawebdesign.com/en-2/",
  );

  onMount(() => {
    document.documentElement.lang = "en";

    setTimeout(async () => {
      const module = await import("$lib/components/CookieConsent.svelte");
      CookieConsent = module.default;
    }, 1200);
  });

  const nav = {
    tagline: "SEO • WEB DESIGN • BRANDING",

    services: "SERVICES",
    projects: "PROJECTS",
    process: "PROCESS",
    reviews: "REVIEWS",
    faq: "FAQ",
    contact: "CONTACT",

    languageLabel: "DE",
    languageLink: "/",
    languageTitle: "Switch to the German portfolio version",

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

  const hero = {
    avatar: "/images/julius-256.webp",
    avatarAlt:
      "Julius Timgum, freelance web designer and WordPress developer in Vienna",
    avatarTitle: "Julius Timgum, freelance web designer in Vienna",
    name: "I am JULIUS",
    titleLines: [
      "WEB DESIGNER,",
      "DEVELOPER &",
      "WORDPRESS EXPERT",
      "IN VIENNA",
    ],
    seoTitle: "FREELANCE WEB DESIGNER & WORDPRESS DEVELOPER IN VIENNA",
    cta: "BOOK A CALL",
    ctaLink:
      "https://calendly.com/timgum-julius/get-to-know-meeting?month=2026-04",
    ctaTarget: "_blank",
    ctaRel: "noopener noreferrer",
    ctaTitle: "Schedule a free introductory meeting on Calendly",
    secondaryCta: "VIEW PROJECTS",
    secondaryCtaLink: "#projects",
    secondaryCtaTitle: "View selected web design projects in Vienna",
    text: "I am a freelance web designer and WordPress developer in Vienna, creating high performance websites for freelancers, small businesses, and organizations with personal support and transparent pricing.",
    connectionAriaLabel: "What clients value most",
    greetings: {
      morning: {
        text: "Good morning!",
        icon: "/images/salad.webp",
        alt: "Fresh morning energy icon",
        title: "Morning energy icon",
      },
      day: {
        text: "Good day!",
        icon: "/images/italian-coffee-maker.webp",
        alt: "Italian coffee maker icon",
        title: "Good day coffee icon",
      },
      evening: {
        text: "Good evening!",
        icon: "/images/martini-glass-citrus.webp",
        alt: "Evening relaxation icon",
        title: "Good evening relaxation icon",
      },
    },
    decorations: {
      roomService: {
        icon: "/images/room-service.webp",
        alt: "Dedicated client care icon",
        title: "Dedicated client care icon",
      },
      juliusLarge: {
        icon: "/images/Julius_Timgum-700.webp",
        alt: "Julius Timgum, professional web designer in Vienna",
        title: "Julius Timgum studio portrait",
      },
      saltPepper: {
        icon: "/images/salt-pepper.webp",
        alt: "Creative design detail icon",
        title: "Creative design detail icon",
      },
      plateEating: {
        icon: "/images/plate-eating.webp",
        alt: "Completed website launch icon",
        title: "Website launch quality icon",
      },
      popcorn: {
        icon: "/images/popcorn.webp",
        alt: "Engaging digital content icon",
        title: "Engaging content icon",
      },
    },
    connectionItems: [
      {
        title: "Free Call",
        popup:
          "Let's talk about your website requirements and ideas in a relaxed and obligation free first conversation.",
      },
      {
        title: "Bespoke",
        popup:
          "I create websites that tell your brand story, fit your personality, and help you stand out online.",
      },
      {
        title: "Supportive",
        popup:
          "You will feel guided and respected throughout every phase of the project with clear and transparent updates.",
      },
    ],
  };

  const servicesList = [
    {
      icon: "/images/customize-computer.webp",
      alt: "Bespoke web design services in Vienna for modern responsive websites",
      title: "WEB DESIGN VIENNA",
      titleTag: "Bespoke web design services in Vienna",
      text: "Modern, responsive websites with clear structure, intuitive user journeys, fast loading speeds, clean layouts, and simple self editing content blocks.",
    },
    {
      icon: "/images/display-code-2.webp",
      alt: "WordPress development and custom coding services in Austria",
      title: "WORDPRESS DEVELOPMENT",
      titleTag: "Custom WordPress development services",
      text: "Interactive custom websites built around fast loading speeds, accessibility standards, strong Core Web Vitals, and smooth rendering across every screen size.",
    },
    {
      icon: "/images/shopping-bag.webp",
      alt: "E commerce and online shop development using WooCommerce or Shopify",
      title: "WEB SHOP",
      titleTag: "E commerce website development services",
      text: "Custom, scalable e commerce systems driven by Shopify or WooCommerce. Built for conversions with clear admin workflows, secure checkout, and clean inventory management.",
    },
    {
      icon: "/images/seo.png",
      alt: "SEO and performance optimization for WordPress websites in Vienna",
      title: "SEO & PERFORMANCE",
      text: "Technical SEO, fast loading speeds and a clear website structure help rank high on search engines. I optimise your websites for visibility and an improved user experience.",
    },
    {
      icon: "/images/ftp.webp",
      alt: "Fast website hosting and domain management on secure servers",
      title: "HOSTING",
      titleTag: "Secure high speed web hosting services",
      text: "Fast and secure premium hosting infrastructure with GDPR compliant servers, caching, backups, free SSL, domain transfers, and professional DNS configuration.",
    },
    {
      icon: "/images/chat-notification-1.webp",
      alt: "WordPress maintenance and technical support for website safety",
      title: "SUPPORT",
      titleTag: "Website support and WordPress maintenance services",
      text: "Monthly website maintenance covering updates, monitoring, security protection, performance checks, and direct developer support.",
    },
  ];

  const serviceKeywords = {
    "web design": ["UX Design", "Responsive", "Branding", "Wireframes"],
    wordpress: ["Themes", "Plugins", "CMS", "Clean Code"],
    "web shop": ["Shopify", "WooCommerce", "Checkout", "Payments"],
    hosting: ["Servers", "SSL", "Backups", "Caching", "DNS"],
    support: ["Updates", "Security", "Support", "Backups"],
  };

  const serviceStats = {
    compliment: "YOU ARE IN GOOD HANDS",
    title: "ABOUT ME",
    text: "I am Julius, an experienced freelance web designer and custom WordPress developer based in Vienna. I work with brands, freelancers, and businesses to create web experiences that turn visitors into customers.",
    items: [
      {
        label: "Results, solution oriented",
        title: "7+ YEARS EXPERIENCE",
      },
      {
        label: "Bespoke Web Design",
        title: "100+ PROJECTS",
      },
      {
        label: "Without agency prices",
        title: "AGENCY QUALITY",
      },
      {
        label: "Complete package",
        title: "ALL IN ONE SOLUTION",
      },
    ],
  };

  const serviceProblemItems = [
    {
      title: "YOU DO NOT KNOW WHERE TO START",
      problem:
        "You need a new website, but decisions about pages, content, features, and costs quickly become overwhelming.",
      solution:
        "I structure the project with you, explain every next step clearly, and create a focused solution based on your actual goals.",
    },
    {
      title: "YOUR CURRENT WEBSITE NO LONGER WORKS FOR YOU",
      problem:
        "The design feels outdated, the content is difficult to follow, or parts of the website are beginning to break.",
      solution:
        "I assess what can be kept, improve the structure and design, and bring the website back to a professional technical and visual standard.",
    },
    {
      title: "EDITING YOUR OWN CONTENT IS TOO DIFFICULT",
      problem:
        "Even a small text or image change requires help from a developer.",
      solution:
        "I build the website around the way you work, make important content easy to update, and show you personally how everything works.",
    },
    {
      title: "YOUR WEBSITE IS SLOW",
      problem:
        "Pages take too long to load, images are oversized, or old technical decisions are holding the website back.",
      solution:
        "I optimize the images, code, hosting, and loading process to make the website faster and more pleasant to use.",
    },
    {
      title: "COMMUNICATION WITH YOUR WEB DESIGNER IS DIFFICULT",
      problem:
        "Replies take days or weeks, leaving you unsure about the progress of your project.",
      solution:
        "You work directly with me. I communicate clearly, provide regular updates, and remain reliably available throughout the project.",
    },
    {
      title: "YOU DO NOT WANT UNNECESSARY MONTHLY SUBSCRIPTIONS",
      problem:
        "Your website should not depend on recurring fees for features you do not actually need.",
      solution:
        "I use transparent pricing and avoid unnecessary dependencies. Ongoing costs are included only where they provide real value or are technically required.",
    },
  ];

  const websiteToolLinks = [
    {
      title: "WEBSITE PROJECT PLANNER",
      text: "Answer a few simple questions and receive a clear recommendation for your website.",
      href: "/en-2/website-configurator/",
      linkLabel: "PLAN YOUR WEBSITE",
    },
    {
      title: "FREE WEBSITE AUDIT",
      text: "Check your website for SEO, performance, security, and accessibility issues.",
      href: "/en-2/website-audit/",
      linkLabel: "AUDIT YOUR WEBSITE",
    },
  ];

  const processImages = [
    {
      image: "/images/Isa_Jules.webp",
      alt: "Successful website launch for the reSOMA project with Julius Timgum",
      title: "reSOMA website launch",
      caption: "Website launch with <span>reSOMA</span>",
    },
    {
      image: "/images/meet_jubs_julius.webp",
      alt: "Website planning session for the custom JUBS WordPress project in Vienna",
      title: "JUBS WordPress planning session",
      caption: "Project planning with Ines & Andy <span>JUBS</span>",
    },
  ];

  const processSteps = [
    {
      title: "INQUIRY",
      text: "We start with a strategy session. I listen to your goals, visual ideas, and launch priorities. This gives the project a clear structure from the beginning.",
      linkText: "Book a call.",
      showArrow: true,
      icon: "/images/meet-700.webp",
      iconAlt: "Inquiry meeting icon",
      iconTitle: "Inquiry meeting",
    },
    {
      title: "CONCEPT",
      text: "We define the website structure, layout direction, and content flow. Clear feedback rounds make sure the final design matches your goals and brand personality.",
      showArrow: true,
      icon: "/images/Isa-700.webp",
      iconAlt: "Website concept icon",
      iconTitle: "Website concept",
    },
    {
      title: "LAUNCH",
      text: "Code, images, mobile layouts, performance, and caching are checked carefully. Once everything runs smoothly, your website goes live.",
      showArrow: false,
      icon: "/images/design-700.webp",
      iconAlt: "Website launch icon",
      iconTitle: "Website launch",
    },
    {
      title: "SUPPORT",
      text: "After launch, I can support you with updates, security, backups, performance checks, and content changes whenever needed.",
      showArrow: false,
      icon: "/images/support-700.webp",
      iconAlt: "Website support icon",
      iconTitle: "Website support",
    },
  ];

  const reviews = [
    {
      name: "INES ZSUTTY",
      role: "MANAGEMENT, JUBS",
      text: "Working with Julius was an absolute pleasure. High professionalism coupled with remarkable technical output. Highly recommended design partner!",
      image: "/images/Ines-scaled.webp",
      alt: "INES ZSUTTY",
      title: "INES ZSUTTY",
      stars: 5,
    },
    {
      name: "JAHSON THE SCIENTIST",
      role: "ARTIST, WORDSMITH",
      text: "We tested a few creative routes before finding the exact aesthetic direction. Julius listens closely, understands context quickly, and stays flexible. Immensely satisfied!",
      image: "/images/Jahson_The_Scientist.jpg",
      alt: "JAHSON THE SCIENTIST",
      title: "JAHSON THE SCIENTIST",
      stars: 5,
    },
    {
      name: "Dr Bosede Baldauf",
      role: "Urologist FECSM Vienna",
      image: "/images/dr_bosede_baldauf.webp",
      alt: "Dr Bosede Baldauf",
      title: "Dr Bosede Baldauf",
      stars: 5,
      text: "Julius has now created two modern websites for my practice and translated my vision perfectly both times. Deadlines were met and coordination was very easy. Exceptional developer quality.",
    },
    {
      name: "ISABELLA PFOSER",
      role: "RESILIENCE TRAINER",
      text: "Collaborating with Julius was incredible. Patient, creative, and very structured in understanding my goals. Warm and thoroughly professional throughout.",
      image: "/images/isabella-landscape.webp",
      alt: "ISABELLA PFOSER, RESILIENCE TRAINER",
      title: "ISABELLA PFOSER",
      stars: 5,
    },

    {
      name: "IMANI RAMESES",
      role: "COGNITIVE NEUROSCIENTIST",
      image: "/images/Imani-Rameses.webp",
      alt: "Portrait of Imani Rameses, Cognitive Neuroscientist and web design client",
      stars: 5,
      text: "Working with Julius was a pleasure! His attention to detail and designer's eye made me feel both pragmatically and creatively supported throughout the entire process. With grace and ease, he was able to translate my vision into a living product! Thanks Julius!",
    },
    {
      name: "Benjamin Wüllenweber",
      role: "Hypnotherapist DHV | NGH",
      image: "/images/ben_wüllenweber.webp",
      alt: "Benjamin Wüllenweber",
      title: "Benjamin Wüllenweber",
      stars: 5,
      text: "Our design journey with Julius was very smooth. He understood my design requirements quickly and delivered a website that exceeded my original expectations. Thoroughly reliable.",
    },
    {
      name: "Anna Hofbauer",
      role: "Artist",
      image: "/images/Anna_Artist.jpg",
      alt: "Anna Hofbauer",
      title: "Anna Hofbauer",
      stars: 5,
      text: "Awesome communication and project energy from day one. Flexible, relaxed, and highly skilled. He executed exactly what I envisioned. Fantastic results!",
    },
  ];

  const faqItems = [
    {
      key: "duration",
      question: "HOW LONG DOES IT TAKE TO BUILD A WEBSITE?",
      answer:
        "The timeline depends on the size and complexity of the project. A standard website with around 5 content sections can usually be launched within 2 weeks. Larger projects with more pages or special features usually take 3 to 5 weeks.",
    },
    {
      key: "edit",
      question: "WILL I BE ABLE TO EDIT MY WEBSITE CONTENT MYSELF?",
      answer:
        "Yes. I build websites so you can update text, images, blog posts, and common content areas without writing code. I also provide a personal walkthrough so you know how to manage your website confidently.",
    },
    {
      key: "payment",
      question: "HOW DO PAYMENTS AND BILLING WORK?",
      answer:
        "Projects usually begin with a 60 percent deposit. The remaining 40 percent is paid after final approval and before or shortly after launch. Every invoice includes clear payment details.",
    },
    {
      key: "costs",
      question: "ARE THERE ANY EXTRA FEES?",
      answer:
        "Standard website projects are priced clearly before work begins. Extra costs only appear when you request additional features, premium tools, booking systems, complex integrations, or new scope after the project has started.",
    },
    {
      key: "maintenance",
      question: "DOES A WORDPRESS WEBSITE NEED REGULAR MAINTENANCE?",
      answer:
        "Yes. WordPress websites need regular updates for plugins, themes, security, backups, and performance. I offer monthly maintenance support, but I can also show you how to manage basic updates yourself.",
    },
    {
      key: "start",
      question: "HOW DO WE START WORKING TOGETHER?",
      answer: `
        <p>We begin with an introductory call to discuss your goals, target audience, features, design direction, and available content.</p>
        <p><strong>To start the project, I usually need:</strong></p>
        <ul>
          <li>Your logo and brand assets</li>
          <li>Your website text or draft content</li>
          <li>Your photos, images, or visual references</li>
          <li>Your preferred colors, style direction, or existing brand guide</li>
        </ul>
        <p><strong>To launch the website, you will also need:</strong></p>
        <ul>
          <li>A domain name, usually around €10 to €50 per year</li>
          <li>Web hosting, usually around €5 to €20 per month for standard projects</li>
        </ul>
        <p>I guide you through every step so the process stays simple and clear.</p>
      `,
    },
  ];

  const contactProps = {
    title: "CONTACT",
    subtitle: "LOOKING FORWARD TO HEARING FROM YOU.",

    /*
     * Card 01: guided website project planner.
     */
    configuratorEyebrow: "PROJECT PLANNER",
    configuratorBadge: "RECOMMENDED",
    configuratorTitle: "PLAN YOUR WEBSITE PROJECT",
    configuratorText:
      "Are you planning a new website, updating an existing one, or adding more content and features? Use the free project planner. It will help you understand what your website needs.",
    configuratorBenefits: [
      "CLARIFY YOUR CURRENT SITUATION AND GOALS",
      "CHOOSE YOUR PAGES AND FEATURES",
      "RECEIVE A RECOMMENDATION AND PERSONAL QUOTE",
    ],
    configuratorMeta: "FREE · ABOUT 5 MINUTES",
    configuratorButtonText: "START PROJECT PLANNER",
    configuratorLink: "/en-2/website-configurator/",

    /*
     * Card 02: direct written inquiry.
     */
    formEyebrow: "SEND A MESSAGE",
    formTitle: "ASK ABOUT YOUR PROJECT",

    /*
     * Card 03: direct contact details.
     */
    contactEyebrow: "PERSONAL CONTACT",
    contactTitle: "TALK TO ME DIRECTLY",

    phone: "+43 677 648 598 39",
    phoneLink: "tel:+4367764859839",
    email: "info@zorawebdesign.com",
    emailLink: "mailto:info@zorawebdesign.com",
    address: "HACKENGASSE 22, 1150 VIENNA",

    namePlaceholder: "NAME*",
    companyPlaceholder: "COMPANY*",
    emailPlaceholder: "EMAIL*",
    telephonePlaceholder: "PHONE OPTIONAL",
    messagePlaceholder: "PROJECT DESCRIPTION*",

    submitText: "SUBMIT",
    sendingText: "SENDING...",

    telTitle: "PHONE",
    emailTitle: "EMAIL",
    addressTitle: "ADDRESS",

    whatsappLink: "https://wa.me/4367764859839",
    whatsappIcon: "/images/whatsapp.png",
    whatsappLabel: "WhatsApp",

    telegramLink: "https://t.me/+4367764859839",
    telegramIcon: "/images/telegram.png",
    telegramLabel: "Telegram",

    bookCallText: "BOOK A CALL",
    bookCallLink:
      "https://calendly.com/timgum-julius/get-to-know-meeting?month=2026-04",

    successTitle: "MESSAGE RECEIVED",
    successText:
      "Thank you for getting in touch. I have received your inquiry and will contact you as soon as possible.",

    errorTitle: "MESSAGE NOT SENT",
    errorText: "Something went wrong. Please try again or email me directly at",
  };

  const localBusinessSchema = $derived({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Zora Web Design",
    image: "https://zorawebdesign.com/images/julius-256.webp",
    "@id": "https://zorawebdesign.com/en-2/#website",
    url: "https://zorawebdesign.com/en-2/",
    telephone: "+4367764859839",
    email: "info@zorawebdesign.com",
    priceRange: "$$",
    description:
      "Professional web design and WordPress development in Vienna for freelancers, small businesses, and organizations.",
    founder: {
      "@type": "Person",
      name: "Julius Timgum",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hackengasse 22",
      addressLocality: "Vienna",
      postalCode: "1150",
      addressCountry: "AT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "48.1979",
      longitude: "16.3356",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: ["Vienna", "Austria"],
    sameAs: ["https://calendly.com/timgum-julius"],
  });
</script>

<svelte:head>
  <title>Freelance Web Designer & WordPress Expert Vienna | Julius Timgum</title
  >

  <meta
    name="description"
    content="Professional web design and WordPress development in Vienna. Over 100 successful projects for freelancers and businesses."
  />

  <meta
    name="keywords"
    content="Web Designer Vienna, Freelance Web Designer Vienna, WordPress Expert Vienna, WordPress Developer Vienna, Web Design Vienna, Website Design Vienna, Website Development Vienna, Professional Web Design Austria, WordPress Website Vienna, WordPress Development Austria, Small Business Website Vienna, Website Designer Austria, Freelance Developer Austria, SEO Friendly Website Vienna, Responsive Web Design Vienna, E Commerce Website Vienna, WooCommerce Developer Vienna, Shopify Website Vienna, WordPress Maintenance Vienna, Website Support Vienna, Hire Web Designer Vienna, Hire WordPress Developer Vienna, Zora Web Design, Julius Timgum"
  />

  <link rel="canonical" href="https://zorawebdesign.com/en-2/" />

  <meta name="robots" content="index, follow" />
  <meta name="author" content="Julius Timgum" />
  <meta name="publisher" content="Zora Web Design" />

  <link rel="alternate" hreflang="de" href="https://zorawebdesign.com/" />
  <link rel="alternate" hreflang="en" href="https://zorawebdesign.com/en-2/" />
  <link
    rel="alternate"
    hreflang="x-default"
    href="https://zorawebdesign.com/"
  />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://zorawebdesign.com/en-2/" />
  <meta
    property="og:title"
    content="Freelance Web Designer & WordPress Expert Vienna | Julius Timgum"
  />
  <meta
    property="og:description"
    content="Professional web design and WordPress development in Vienna. Over 100 successful projects for freelancers and businesses."
  />
  <meta
    property="og:image"
    content="https://zorawebdesign.com/images/meet-700.webp"
  />
  <meta property="og:locale" content="en_US" />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://zorawebdesign.com/en-2/" />
  <meta
    property="twitter:title"
    content="Freelance Web Designer & WordPress Expert Vienna | Julius Timgum"
  />
  <meta
    property="twitter:description"
    content="Professional web design and WordPress development in Vienna."
  />
  <meta
    property="twitter:image"
    content="https://zorawebdesign.com/images/meet-700.webp"
  />

  <link rel="image_src" href="https://zorawebdesign.com/images/meet-700.webp" />

  {@html `<script type="application/ld+json">${JSON.stringify(localBusinessSchema)}</script>`}
</svelte:head>

<Header {nav} />
<ThemeToggle />

<main>
  <Hero {hero} projects={translatedProjects} />

  <Services
    title="SERVICES"
    subtitle="Web design, custom development, hosting, ongoing maintenance, and everything needed to turn your idea into a live website."
    services={servicesList}
    stats={serviceStats}
    experienceLabel="Experience point"
    toolsLabel="TOOLS"
    toolsAlt="Tools"
    serviceKeywordsLabel="Service keywords"
    extraExperienceItems={[]}
    {serviceKeywords}
    fallbackServiceTags={["Strategy", "Design", "Build", "Optimize"]}
    problemEyebrow="HOW I CAN HELP YOU"
    problemTitle="A WEBSITE SHOULD MAKE YOUR EVERYDAY LIFE EASIER"
    problemText="Many of my clients come to me because the path to the right website feels unclear, technical, or unnecessarily complicated. I guide you personally and make sure you always know what happens next."
    problemListTitle="DO THESE CHALLENGES SOUND FAMILIAR?"
    problemLabel="THE PROBLEM"
    solutionLabel="MY SOLUTION"
    problemItems={serviceProblemItems}
    toolsSectionTitle="ESSENTIAL TOOLS FOR YOUR WEBSITE"
    toolsMoreLabel="MORE"
    toolLinks={websiteToolLinks}
  />

  <Projects
    title="PROJECTS"
    subtitle="Selected website projects covering design, WordPress development, performance optimization, and custom branding."
    projects={translatedProjects}
    loadMoreCopy="Load more"
    loadMoreText="Load additional website projects"
    loadMoreAria="Load additional website projects"
    viewProjectText="View project"
    viewDetailsText="View details"
    viewDetailsLink="/en-2/reference-project/"
    projectTagsLabel="Project services"
    defaultProjectTags={[
      "Webdesign",
      "WordPress",
      "Webshop",
      "+1 Year Support",
    ]}
  />

  <Process
    title="MY PROCESS"
    subtitle="A clear project process from the first consultation to launch and ongoing website support."
    images={processImages}
    steps={processSteps}
    imageCredits={[
      "With Ines and Andy, JUBS",
      "With Isabella, reSOMA",
      "UI design phase",
      "Website maintenance phase",
    ]}
  />

  <Reviews
    title="REVIEWS"
    subtitle="Feedback from clients and project partners."
    {reviews}
  />

  <Faq
    title="FAQ"
    subtitle="Clear answers about pricing, timelines, website ownership, content editing, and maintenance."
    items={faqItems}
  />

  <Contact
    title={contactProps.title}
    subtitle={contactProps.subtitle}
    configuratorEyebrow={contactProps.configuratorEyebrow}
    configuratorBadge={contactProps.configuratorBadge}
    configuratorTitle={contactProps.configuratorTitle}
    configuratorText={contactProps.configuratorText}
    configuratorBenefits={contactProps.configuratorBenefits}
    configuratorMeta={contactProps.configuratorMeta}
    configuratorButtonText={contactProps.configuratorButtonText}
    configuratorLink={contactProps.configuratorLink}
    formEyebrow={contactProps.formEyebrow}
    formTitle={contactProps.formTitle}
    contactEyebrow={contactProps.contactEyebrow}
    contactTitle={contactProps.contactTitle}
    phone={contactProps.phone}
    phoneLink={contactProps.phoneLink}
    email={contactProps.email}
    emailLink={contactProps.emailLink}
    address={contactProps.address}
    namePlaceholder={contactProps.namePlaceholder}
    companyPlaceholder={contactProps.companyPlaceholder}
    emailPlaceholder={contactProps.emailPlaceholder}
    telephonePlaceholder={contactProps.telephonePlaceholder}
    messagePlaceholder={contactProps.messagePlaceholder}
    submitText={contactProps.submitText}
    sendingText={contactProps.sendingText}
    telTitle={contactProps.telTitle}
    emailTitle={contactProps.emailTitle}
    addressTitle={contactProps.addressTitle}
    whatsappLink={contactProps.whatsappLink}
    whatsappIcon={contactProps.whatsappIcon}
    whatsappLabel={contactProps.whatsappLabel}
    telegramLink={contactProps.telegramLink}
    telegramIcon={contactProps.telegramIcon}
    telegramLabel={contactProps.telegramLabel}
    bookCallText={contactProps.bookCallText}
    bookCallLink={contactProps.bookCallLink}
    successTitle={contactProps.successTitle}
    successText={contactProps.successText}
    errorTitle={contactProps.errorTitle}
    errorText={contactProps.errorText}
  />

  <Footer
    copyright="ZORA WEB DESIGN © COPYRIGHT 2026"
    location="HACKENGASSE 22, 1150 VIENNA"
    imprintText="IMPRINT"
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

  /* FIXED: Entire selector string wrapped cleanly inside :global() wrapper */
  :global(.imprint-content) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    width: 100%;
  }

  :global(.imprint-column) {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  :global(.imprint-block h2) {
    margin: 0 0 10px 0;
    color: #fff;
    font-size: 28px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  :global(.imprint-block h3) {
    margin: 0 0 10px 0;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  :global(.imprint-block p) {
    margin: 0 0 6px 0;
    color: #fff;
    font-size: 16px;
    line-height: 1.7;
    text-transform: none;
    letter-spacing: 0.02em;
  }

  @media (max-width: 1100px) {
    :global(.container) {
      width: min(1440px, 92%);
    }
  }

  @media (max-width: 1024px) {
    :global(.imprint-content) {
      grid-template-columns: 1fr 1fr;
      gap: 36px;
    }
  }

  @media (max-width: 767px) {
    :global(.imprint-content) {
      grid-template-columns: 1fr;
      gap: 28px;
    }

    :global(.imprint-block h2) {
      font-size: 22px;
    }

    :global(.imprint-block h3) {
      font-size: 13px;
    }

    :global(.imprint-block p) {
      font-size: 15px;
      line-height: 1.6;
    }
  }
</style>

const SITE_URL = "https://www.zorawebdesign.com";
const CALENDLY_URL =
  "https://calendly.com/timgum-julius/get-to-know-meeting?month=2026-04";

const serviceIcons = [
  "/images/customize-computer.webp",
  "/images/display-code-2.webp",
  "/images/shopping-bag.webp",
  "/images/seo.png",
  "/images/ftp.webp",
  "/images/chat-notification-1.webp",
];

const reviewsDe = [
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
    name: "Shanan Delp",
    role: "THE AUSTRIAN RESTORED CITIZENSHIP NETWORK",
    text: "My team was developing a nonprofit community website to help establish our identity, both virtually and in the real world. We had a loose definition of our vision, and a lot of stakeholders. Julius was an instrumental part of making the vision concrete, both in terms of scope, but also in terms of user experience, visual design and information architecture. He is also an enthusiastic and collaborative team member, always ready to go above and beyond.",
    image: "/images/shanan-700.webp",
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

const reviewsEn = [
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
    role: "UROLOGIST FECSM VIENNA",
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
    name: "Shanan Delp",
    role: "THE AUSTRIAN RESTORED CITIZENSHIP NETWORK",
    text: "My team was developing a nonprofit community website to help establish our identity, both virtually and in the real world. We had a loose definition of our vision, and a lot of stakeholders. Julius was an instrumental part of making the vision concrete, both in terms of scope, but also in terms of user experience, visual design and information architecture. He is also an enthusiastic and collaborative team member, always ready to go above and beyond.",
    image: "/images/shanan-700.webp",
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
    role: "HYPNOTHERAPIST DHV | NGH",
    image: "/images/ben_wüllenweber.webp",
    alt: "Benjamin Wüllenweber",
    title: "Benjamin Wüllenweber",
    stars: 5,
    text: "Our design journey with Julius was very smooth. He understood my design requirements quickly and delivered a website that exceeded my original expectations. Thoroughly reliable.",
  },
  {
    name: "Anna Hofbauer",
    role: "ARTIST",
    image: "/images/Anna_Artist.jpg",
    alt: "Anna Hofbauer",
    title: "Anna Hofbauer",
    stars: 5,
    text: "Awesome communication and project energy from day one. Flexible, relaxed, and highly skilled. He executed exactly what I envisioned. Fantastic results!",
  },
];

const processDe = [
  {
  title: "ANFRAGE",
  text: "Wir starten mit einem Gespräch über deine Ziele, deine Zielgruppe, deine Inhalte und die gewünschte Wirkung deiner Website. So entsteht eine klare Grundlage für ein Webdesign, das wirklich zu dir und deinem Angebot passt.",
  linkBefore: " Nutze meinen ",
  linkText: "Website-Planer",
  linkHref: "/website-konfigurator/",
  linkAfter: ", damit ich den Umfang deines Projekts besser verstehen kann.",
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
  linkBefore: " Nutze auch mein ",
  linkText: "Kostenloses Audit Tool",
  linkHref: "/website-audit/",
  linkAfter: ", um deine Website auf SEO, Performance, Sicherheit und Barrierefreiheit zu prüfen.",
  showArrow: false,
},
];

const processEn = [
  {
  title: "INQUIRY",
  text: "We start with a strategy session. I listen to your goals, visual ideas, and launch priorities. This gives the project a clear structure from the beginning.",
  linkBefore: " Please use my ",
  linkText: "Website Planner",
  linkHref: "/en-2/website-configurator/",
  linkAfter: " to help me understand the scope of your project.",
  showArrow: true,
},
  {
    title: "CONCEPT",
    text: "We define the website structure, layout direction, and content flow. Clear feedback rounds make sure the final design matches your goals and brand personality.",
    showArrow: true,
  },
  {
    title: "LAUNCH",
    text: "Code, images, mobile layouts, performance, and caching are checked carefully. Once everything runs smoothly, your website goes live.",
    showArrow: false,
  },
 {
  title: "SUPPORT",
  text: "After launch, I can support you with updates, security, backups, performance checks, and content changes whenever needed.",
  linkBefore: " You can also use my ",
  linkText: "Free Audit Tool",
  linkHref: "/en-2/website-audit/",
  linkAfter: " to audit your website for SEO, performance, security and accessibility.",
  showArrow: false,
},
];

const sharedStatsDe = {
  compliment: "DU BIST IN GUTEN HÄNDEN",
  title: "ÜBER MICH",
  text: "Ich bin Julius, selbstständiger Webdesigner und WordPress Entwickler in Wien. Ich unterstütze Selbstständige, kleine Unternehmen und Organisationen dabei, moderne Websites zu erstellen, die professionell wirken und neue Anfragen bringen:",
  items: [
    { label: "Praxisbewährt und effizient", title: "7+ JAHRE ERFAHRUNG" },
    { label: "Für Kund*innen umgesetzt", title: "100+ PROJEKTE" },
    { label: "Ohne Agenturpreise", title: "PRO QUALITÄT" },
    { label: "Rundum-sorglos-Paket", title: "ALLES AUS EINER HAND" },
  ],
};

const sharedStatsEn = {
  compliment: "YOU ARE IN GOOD HANDS",
  title: "ABOUT ME",
  text: "I am Julius, an experienced freelance web designer and custom WordPress developer based in Vienna. I work with brands, freelancers, and businesses to create web experiences that turn visitors into customers.",
  items: [
    { label: "Results, solution oriented", title: "7+ YEARS EXPERIENCE" },
    { label: "Bespoke Web Design", title: "100+ PROJECTS" },
    { label: "Without agency prices", title: "AGENCY QUALITY" },
    { label: "Complete package", title: "ALL IN ONE SOLUTION" },
  ],
};

const germanContact = {
  title: "KONTAKT",
  subtitle: "ERZÄHL MIR VON DEINEM PROJEKT.",
};

const englishContact = {
  title: "CONTACT",
  subtitle: "LOOKING FORWARD TO HEARING FROM YOU.",
  formEyebrow: "SEND A MESSAGE",
  contactEyebrow: "PERSONAL CONTACT",
  address: "HACKENGASSE 22, 1150 VIENNA, AUSTRIA",
  namePlaceholder: "NAME*",
  companyPlaceholder: "COMPANY*",
  emailPlaceholder: "EMAIL*",
  telephonePlaceholder: "PHONE OPTIONAL",
  messagePlaceholder: "PROJECT DETAILS*",
  submitText: "SUBMIT",
  sendingText: "SENDING...",
  telTitle: "PHONE",
  emailTitle: "EMAIL",
  addressTitle: "STUDIO ADDRESS",
  bookCallText: "BOOK A CALL",
  successTitle: "MESSAGE RECEIVED",
  successText: "Thank you for getting in touch. I have received your inquiry and will contact you as soon as possible.",
  errorTitle: "MESSAGE NOT SENT",
  errorText: "Something went wrong. Please try again or email me directly at",
};

function makeServices(language, city, copy) {
  const titles =
    language === "de"
      ? [
          `WEBDESIGN ${city.toUpperCase()}`,
          "WEBENTWICKLUNG",
          "WEBSHOP",
          "SEO & PERFORMANCE",
          "HOSTING",
          "WARTUNG & SUPPORT",
        ]
      : [
          `WEB DESIGN ${city.toUpperCase()}`,
          "WEB DEVELOPMENT",
          "ECOMMERCE",
          "SEO & PERFORMANCE",
          "HOSTING",
          "MAINTENANCE & SUPPORT",
        ];

  return titles.map((title, index) => ({
    icon: serviceIcons[index],
    title,
    text: copy[index],
    alt: `${title} – Zora Web Design`,
  }));
}

function homepageServiceCopy(language, city) {
  if (language === "de") {
    return [
      `Moderne, responsive Websites für Selbstständige, kleine Unternehmen und Organisationen in ${city}. Klar strukturiert, benutzerfreundlich und so gestaltet, dass deine Marke professionell wirkt und deine Inhalte einfach gepflegt werden können.`,
      "Technische Umsetzung moderner Websites mit WordPress und individuellen Lösungen. Von maßgeschneiderten Funktionen und API-Integrationen bis hin zu barrierefreien Anwendungen und einer technisch sauberen Umsetzung.",
      "Individuelle E-Commerce-Lösungen mit WooCommerce oder Shopify für den Online-Verkauf von Produkten und Dienstleistungen. Mit sicheren Zahlungen, einfachem Checkout und unkomplizierter Produktverwaltung.",
      `Technisches SEO, schnelle Ladezeiten und eine klare Website-Struktur helfen dabei, dass dein Angebot in ${city} von Google besser eingeordnet und gefunden werden kann. Rankings können dabei nicht garantiert werden.`,
      "Schnelles und sicheres Website-Hosting für WordPress-Websites und Webshops. Inklusive SSL, Caching, Backups, E-Mail-Hosting, regelmäßigen Updates sowie Unterstützung bei Domain- und DNS-Einstellungen.",
      "Optionale WordPress-Wartung mit Updates, Backups, Sicherheitslösungen, Monitoring und technischem Support. Damit deine Website langfristig stabil, sicher und gut gepflegt bleibt.",
    ];
  }

  return [
    `Modern, responsive websites for independent professionals, small businesses and organisations in ${city}. Clearly structured, user-friendly and designed to present your brand professionally while keeping content easy to manage.`,
    "Technical delivery with WordPress and tailored solutions, from custom functionality and API integrations to accessible interfaces and a clean, dependable implementation.",
    "Tailored ecommerce with WooCommerce or Shopify for selling products and services online, including secure payments, a straightforward checkout and practical product management.",
    `Technical SEO, fast loading and a clear site structure help search engines understand your offer and its relevance to ${city}. Rankings cannot be guaranteed.`,
    "Fast, secure hosting for WordPress websites and online stores, including SSL, caching, backups, email hosting, regular updates and support with domains and DNS.",
    "Optional WordPress maintenance with updates, backups, security, monitoring and technical support to keep your website stable and well maintained over time.",
  ];
}

function homepageProblemContent(language, city) {
  if (language === "de") {
    return {
      title: "EINE WEBSITE SOLLTE DEINEN ALLTAG EINFACHER MACHEN",
      text: `Viele Kundinnen und Kunden aus ${city} kommen zu mir, weil der Weg zur richtigen Website unklar, technisch oder unnötig kompliziert wirkt. Ich begleite dich persönlich und sorge dafür, dass du jederzeit weißt, was als Nächstes passiert.`,
      items: [
        { title: "DU WEISST NICHT, WO DU ANFANGEN SOLLST", problem: "Du möchtest eine neue Website, aber Seiten, Inhalte, Funktionen und Kosten wirken schnell überwältigend.", solution: "Ich strukturiere dein Projekt gemeinsam mit dir, erkläre die nächsten Schritte verständlich und entwickle eine klare Lösung, die zu deinen tatsächlichen Zielen passt." },
        { title: "DEINE BESTEHENDE WEBSITE FUNKTIONIERT NICHT MEHR FÜR DICH", problem: "Das Design wirkt veraltet, Inhalte sind unübersichtlich oder einzelne Bereiche funktionieren nicht mehr zuverlässig.", solution: "Ich prüfe, was erhalten werden kann, überarbeite Design und Struktur und bringe deine Website technisch und visuell wieder auf einen professionellen Stand." },
        { title: "DU KANNST INHALTE NICHT EINFACH SELBST ÄNDERN", problem: "Für kleine Text- oder Bildänderungen bist du jedes Mal auf einen Entwickler angewiesen.", solution: "Ich baue deine Website so, dass du wichtige Inhalte selbst bearbeiten kannst, und zeige dir persönlich, wie alles funktioniert." },
        { title: "DEINE WEBSITE IST LANGSAM", problem: "Seiten laden zu lange, Bilder sind zu groß oder technische Altlasten bremsen deine Website aus.", solution: "Ich optimiere Bilder, Code, Hosting und Ladeprozesse, damit deine Website schneller und angenehmer zu bedienen ist." },
        { title: "DIE KOMMUNIKATION MIT DEINEM WEBDESIGNER IST SCHWIERIG", problem: "Antworten kommen erst nach Tagen oder Wochen und du weißt nicht, wie weit dein Projekt ist.", solution: `Du arbeitest direkt mit mir. Auch bei der Remote-Zusammenarbeit für ${city} kommuniziere ich klar, gebe regelmäßige Updates und bin zuverlässig erreichbar.` },
        { title: "DU MÖCHTEST KEINE UNNÖTIGEN MONATLICHEN ABOS", problem: "Deine Website soll nicht von laufenden Gebühren für Funktionen abhängen, die du eigentlich nicht brauchst.", solution: "Ich setze auf transparente Kosten und wähle Lösungen ohne unnötige Abhängigkeiten. Laufende Kosten entstehen nur dort, wo sie sinnvoll oder technisch notwendig sind." },
      ],
    };
  }

  return {
    title: "A WEBSITE SHOULD MAKE YOUR EVERYDAY WORK EASIER",
    text: `Many clients in ${city} contact me because the path to the right website feels unclear, technical or unnecessarily complicated. I guide you personally and make sure you always know what happens next.`,
    items: [
      { title: "YOU DO NOT KNOW WHERE TO START", problem: "You need a new website, but the pages, content, functionality and costs quickly feel overwhelming.", solution: "I structure the project with you, explain each next step clearly and shape a solution around your real goals." },
      { title: "YOUR CURRENT WEBSITE NO LONGER WORKS FOR YOU", problem: "The design feels dated, the content is difficult to navigate or parts of the website are unreliable.", solution: "I assess what is worth keeping, improve the structure and design, and bring the website back to a professional technical standard." },
      { title: "YOU CANNOT UPDATE CONTENT EASILY", problem: "Even small text or image changes require a developer.", solution: "I build the site so you can manage the important content yourself and personally show you how it works." },
      { title: "YOUR WEBSITE IS SLOW", problem: "Pages take too long to load, images are oversized or technical debt affects the experience.", solution: "I optimise images, code, hosting and loading behaviour to make the website faster and easier to use." },
      { title: "COMMUNICATION WITH YOUR WEB DESIGNER IS DIFFICULT", problem: "Replies take days or weeks and the project status is unclear.", solution: `You work directly with me. For remote projects in ${city}, I communicate clearly, provide regular updates and remain reliably available.` },
      { title: "YOU DO NOT WANT UNNECESSARY MONTHLY SUBSCRIPTIONS", problem: "Your website should not depend on recurring fees for tools you do not need.", solution: "I use transparent pricing and avoid unnecessary dependencies. Ongoing costs are introduced only when they add real value or are technically required." },
    ],
  };
}

function homepageFaq(language, cityDe, cityEn) {
  if (language === "de") {
    return [
      { key: "duration", question: `WIE LANGE DAUERT EINE WEBSITE FÜR EIN PROJEKT IN ${cityDe.toUpperCase()}?`, answer: "Der Zeitrahmen hängt vom Umfang deiner Website ab. Eine typische Website mit 5 Seiten ist meist innerhalb von 2 Wochen fertig. Eine größere WordPress Website mit etwa 15 Seiten kann ungefähr 3 bis 5 Wochen dauern. Wenn du eine bestimmte Deadline hast, berücksichtige ich sie gerne." },
      { key: "edit", question: "KANN ICH MEINE WEBSITE SPÄTER SELBST BEARBEITEN?", answer: "Ja. Ich erstelle WordPress Websites so, dass du Inhalte später einfach selbst bearbeiten, aktualisieren und ergänzen kannst. Wenn du möchtest, zeige ich dir persönlich, wie du Texte, Bilder, Seiten und Beiträge pflegst. Alternativ kann ich laufende Änderungen auch nach Absprache für dich übernehmen." },
      { key: "freelancer", question: "WARUM MIT EINEM FREELANCE WEBDESIGNER STATT EINER AGENTUR ARBEITEN?", answer: `Als selbstständiger Webdesigner arbeitest du direkt mit mir. Das bedeutet kurze Wege, persönliche Betreuung und klare Kommunikation – auch bei der Remote-Zusammenarbeit zwischen meinem Studio in Wien und deinem Projekt in ${cityDe}.` },
      { key: "payment", question: "WIE FUNKTIONIERT DIE BEZAHLUNG?", answer: "Wenn ich eine Rechnung sende, enthält sie meine Bankdaten für eine direkte Überweisung. Üblicherweise werden 60 Prozent des Gesamtbetrags zu Beginn des Projekts fällig, der Restbetrag nach Fertigstellung. Sobald die Zahlung eingegangen ist, erhältst du eine Zahlungsbestätigung für deine Unterlagen." },
      { key: "costs", question: "GIBT ES VERSTECKTE KOSTEN?", answer: "Nein. Ich arbeite transparent und bespreche zusätzliche Kosten immer vorher mit dir. Individuelle Funktionen wie spezielle Buchungsformulare, externe Widgets oder komplexe Erweiterungen können nach Stundenaufwand verrechnet werden. Die meisten Websites benötigen das jedoch nicht, weil vieles bereits im Standardumfang enthalten ist." },
      { key: "maintenance", question: "BRAUCHT MEINE WORDPRESS WEBSITE WARTUNG?", answer: "Ja, eine WordPress Website sollte regelmäßig gepflegt werden, damit sie sicher, stabil und aktuell bleibt. Wichtig sind vor allem Updates für WordPress, Themes und Plugins sowie regelmäßige Backups. Ich biete optionale Wartungspakete an, kann dich aber auch unterstützen, wenn du die Pflege selbst übernehmen möchtest." },
      { key: "seo", question: `IST MEINE WEBSITE FÜR GOOGLE UND SUCHANFRAGEN IN ${cityDe.toUpperCase()} OPTIMIERT?`, answer: `Ich achte bereits beim Aufbau auf wichtige SEO Grundlagen wie klare Seitenstruktur, saubere Überschriften, schnelle Ladezeiten, responsive Darstellung, sinnvolle Metadaten und verständliche Inhalte. Für langfristige Sichtbarkeit in ${cityDe} können wir zusätzlich gezielte SEO-Inhalte und passende Unterseiten einplanen. Rankings lassen sich nicht garantieren.` },
      { key: "start", question: "WIE STARTEN WIR DAS PROJEKT?", answer: `<p>Wir beginnen mit einem Gespräch über deine Ziele, Seiten, Inhalte, dein Branding und die gewünschten Funktionen. Danach bereite ich die Struktur und Designrichtung vor.</p><p><strong>Für den Start brauche ich:</strong></p><ul><li>Ein Logo</li><li>Den Großteil deiner Website-Inhalte wie Texte und Bilder</li><li>Deine bevorzugten Farben</li></ul><p><strong>Für den Launch brauchst du außerdem:</strong></p><ul><li>Eine Domain, ungefähr €10 bis €50 pro Jahr</li><li>Website Hosting, ungefähr €5 bis €20 pro Monat für eine kleine bis mittlere Website</li></ul><p>Ich begleite dich durch jeden Schritt, damit der Prozess einfach, klar und stressfrei bleibt.</p>` },
    ];
  }

  return [
    { key: "duration", question: `HOW LONG DOES IT TAKE TO BUILD A WEBSITE FOR A ${cityEn.toUpperCase()} PROJECT?`, answer: "The timeline depends on the size and complexity of the project. A standard website with around 5 content sections can usually be launched within 2 weeks. Larger projects with more pages or special features usually take 3 to 5 weeks." },
    { key: "edit", question: "WILL I BE ABLE TO EDIT MY WEBSITE CONTENT MYSELF?", answer: "Yes. I build websites so you can update text, images, blog posts and common content areas without writing code. I also provide a personal walkthrough so you know how to manage your website confidently." },
    { key: "payment", question: "HOW DO PAYMENTS AND BILLING WORK?", answer: "Projects usually begin with a 60 percent deposit. The remaining 40 percent is paid after final approval and before or shortly after launch. Every invoice includes clear payment details." },
    { key: "costs", question: "ARE THERE ANY EXTRA FEES?", answer: "Standard website projects are priced clearly before work begins. Extra costs only appear when you request additional features, premium tools, booking systems, complex integrations or new scope after the project has started." },
    { key: "maintenance", question: "DOES A WORDPRESS WEBSITE NEED REGULAR MAINTENANCE?", answer: "Yes. WordPress websites need regular updates for plugins, themes, security, backups and performance. I offer monthly maintenance support, but I can also show you how to manage basic updates yourself." },
    { key: "start", question: `HOW DO WE START A WEBSITE PROJECT FOR ${cityEn.toUpperCase()}?`, answer: `<p>We begin with an introductory call to discuss your goals, target audience, features, design direction and available content.</p><p><strong>To start the project, I usually need:</strong></p><ul><li>Your logo and brand assets</li><li>Your website text or draft content</li><li>Your photos, images or visual references</li><li>Your preferred colours or existing brand guide</li></ul><p><strong>To launch the website, you will also need:</strong></p><ul><li>A domain name, usually around €10 to €50 per year</li><li>Web hosting, usually around €5 to €20 per month for standard projects</li></ul><p>I guide you through every step so the remote process between Vienna and ${cityEn} stays simple and clear.</p>` },
  ];
}

function makePage(config) {
  const isGerman = config.language === "de";
  const path = config.path;
  const canonical = `${SITE_URL}${path}`;
  const problemContent = homepageProblemContent(config.language, config.city);

  return {
    ...config,
    canonical,
    serviceIntro: isGerman
      ? `Professionelles Webdesign, technische Entwicklung, Hosting und Support für eine moderne, schnelle und gut auffindbare Website in ${config.cityDe}.`
      : `Web design, custom development, hosting and ongoing support for a modern, fast and discoverable website serving ${config.cityEn}.`,
    locale: config.locale ?? (isGerman ? "de_AT" : "en_US"),
    nav: {
      tagline: isGerman
        ? "SEO • WEBDESIGN • WORDPRESS"
        : "SEO • WEB DESIGN • BRANDING",
      services: isGerman ? "[LEISTUNGEN]" : "[SERVICES]",
      projects: isGerman ? "[PROJEKTE]" : "[PROJECTS]",
      process: isGerman ? "[ABLAUF]" : "[PROCESS]",
      reviews: "[REVIEWS]",
      faq: "[FAQ]",
      contact: isGerman ? "[KONTAKT]" : "[CONTACT]",
      servicesLink: "#services",
      projectsLink: "#projects",
      processLink: "#process",
      reviewsLink: "#reviews",
      faqLink: "#faq",
      contactLink: "#contact",
      languageLabel: isGerman ? "[EN]" : "[DE]",
      languageLink: config.alternatePath,
      languageTitle: isGerman
        ? `View the ${config.cityEn} page in English`
        : `${config.cityDe}-Seite auf Deutsch öffnen`,
      freebies: {
        label: "[FREEBIES]",
        items: [
          {
            label: isGerman ? "[WEBSITE AUDIT]" : "[WEBSITE AUDIT]",
            href: isGerman ? "/website-audit/" : "/en-2/website-audit/",
            title: isGerman
              ? "Kostenlosen Website-Audit öffnen"
              : "Open the free website audit",
          },
        ],
      },
    },
    hero: {
      avatar: "/images/julius-256.webp",
      avatarAlt: isGerman
        ? "Julius Timgum, selbstständiger Webdesigner und WordPress Freelancer in Wien"
        : "Julius Timgum, freelance web designer and WordPress developer in Vienna",
      name: isGerman ? "Ich bin JULIUS" : "I am JULIUS",
      titleLines: config.heroTitle,
      seoTitle: config.seoTitle,
      cta: isGerman ? "GESPRÄCH BUCHEN" : "BOOK A CALL",
      ctaLink: CALENDLY_URL,
      ctaTarget: "_blank",
      ctaRel: "noopener noreferrer",
      ctaTitle: isGerman
        ? `Kostenloses Webdesign-Erstgespräch für ein Projekt in ${config.cityDe} buchen`
        : `Book a free web design discovery call for a project in ${config.cityEn}`,
      secondaryCta: isGerman ? "PROJEKTE ANSEHEN" : "VIEW PROJECTS",
      secondaryCtaLink: "#projects",
      text: config.heroText,
      language: config.language,
      connectionAriaLabel: isGerman
        ? "Was Kundinnen und Kunden an der Zusammenarbeit schätzen"
        : "What clients value most",
      connectionItems: isGerman
        ? [
            { title: "Erstgespräch", popup: "Kostenloses Gespräch über deine Website, deine Ziele und deine Ideen. Ganz entspannt und ohne Verpflichtung." },
            { title: "Persönlich", popup: "Du arbeitest direkt mit mir. So bleibt die Kommunikation klar, persönlich und unkompliziert." },
            { title: "Unterstützend", popup: "Ich begleite dich Schritt für Schritt, von der ersten Idee bis zum Launch und auf Wunsch auch danach." },
          ]
        : [
            { title: "Free Call", popup: "Let's talk about your website requirements and ideas in a relaxed and obligation free first conversation." },
            { title: "Bespoke", popup: "I create websites that tell your brand story, fit your personality, and help you stand out online." },
            { title: "Supportive", popup: "You will feel guided and respected throughout every phase of the project with clear and transparent updates." },
          ],
    },
    services: makeServices(
      config.language,
      config.city,
      homepageServiceCopy(config.language, config.city),
    ),
    stats: isGerman ? sharedStatsDe : sharedStatsEn,
    process: isGerman ? processDe : processEn,
    reviews: isGerman ? reviewsDe : reviewsEn,
    problemTitle: problemContent.title,
    problemText: problemContent.text,
    problemItems: problemContent.items,
    faq: homepageFaq(config.language, config.cityDe, config.cityEn),
    contact: isGerman ? germanContact : englishContact,
    serviceKeywords: isGerman
      ? {
          webdesign: ["UX/UI", "Responsive", "Markenwirkung", "Conversion"],
          wordpress: ["WordPress", "CMS", "Individuell", "DSGVO"],
          seo: ["Technisches SEO", "Struktur", "Performance", "Indexierung"],
          webshop: ["WooCommerce", "Shopify", "Checkout", "Zahlungen"],
          hosting: ["SSL", "Backups", "Caching", "DNS"],
          wartung: ["Updates", "Sicherheit", "Monitoring", "Support"],
        }
      : {
          "web design": ["UX/UI", "Responsive", "Brand clarity", "Conversion"],
          wordpress: ["WordPress", "CMS", "Custom build", "GDPR"],
          seo: ["Technical SEO", "Structure", "Performance", "Indexing"],
          ecommerce: ["WooCommerce", "Shopify", "Checkout", "Payments"],
          hosting: ["SSL", "Backups", "Caching", "DNS"],
          maintenance: ["Updates", "Security", "Monitoring", "Support"],
        },
  };
}

const salzburgDe = makePage({
  language: "de",
  locale: "de_AT",
  key: "salzburg",
  city: "Salzburg",
  cityDe: "Salzburg",
  cityEn: "Salzburg",
  country: "Österreich",
  countryCode: "AT",
  region: "Salzburg",
  path: "/webdesign/salzburg/",
  alternatePath: "/en-2/web-design/salzburg/",
  seoTitle: "Webdesign Salzburg | WordPress Websites für Unternehmen",
  metaDescription: "Professionelles Webdesign für Unternehmen in Salzburg: individuelle WordPress Websites, SEO-Basis, Webshops und persönlicher Support direkt vom Freelancer.",
  heroTitle: ["WEBDESIGNER,", "ENTWICKLER &", "WORDPRESS EXPERTE", "IN SALZBURG"],
  heroText: "Ich entwickle individuelle Websites für Salzburger Unternehmen, Gastgeber, Kulturprojekte und Selbstständige. Hochwertig gestaltet, schnell, zweisprachig planbar und persönlich betreut – aus meinem Studio in Wien, digital für Salzburg.",
  serviceIntro: "Webdesign für einen international sichtbaren Kultur- und Wirtschaftsstandort: klar positioniert, mobil überzeugend und einfach zu pflegen.",
  aboutText: "Salzburg verbindet internationale Gäste mit einer starken Kultur-, Tourismus- und Kreativwirtschaft. Ich entwickle Websites, die diese Qualitätsansprüche digital übersetzen – mit einer klaren Nutzerführung für lokale wie internationale Zielgruppen und direkter Zusammenarbeit ohne Agenturumwege.",
  serviceCopy: [
    "Individuelle Websites, die Qualität und Charakter vermitteln – passend für Salzburger Dienstleister, Gastgeber, Kulturinitiativen und kreative Unternehmen.",
    "Flexible WordPress-Lösungen mit leicht pflegbaren Angeboten, Veranstaltungen, Teams, Referenzen oder mehrsprachigen Inhalten.",
    "Technisch saubere Seiten, verständliche Leistungsinhalte und lokale Relevanzsignale, damit Suchmaschinen dein Angebot in Salzburg einordnen können.",
    "Übersichtliche Shops und Buchungsstrecken für Produkte, Gutscheine oder Leistungen – auf Mobilgeräten genauso klar wie am Desktop.",
    "Schnelle Ladezeiten und zuverlässiges Hosting für Seiten mit starken Bildern, Portfolios, Unterkünften oder Veranstaltungshinweisen.",
    "Persönliche Wartung, Sicherheitsupdates und Hilfe bei saisonalen Angeboten oder regelmäßigen Inhaltsänderungen.",
  ],
  problemTitle: "DEINE WEBSITE MUSS QUALITÄT SCHON VOR DEM ERSTEN KONTAKT ZEIGEN",
  problemText: "Wer in Salzburg Gäste, Kundschaft oder Partner überzeugt, braucht mehr als eine schöne Startseite. Die Website muss Angebote schnell erklären, Vertrauen aufbauen und auf Deutsch wie international funktionieren.",
  problemItems: [
    { title: "DEIN ANGEBOT WIRKT ONLINE AUSTAUSCHBAR", problem: "Die Besonderheit deiner Leistung wird zwischen Bildern und allgemeinen Aussagen nicht klar.", solution: "Ich schärfe Positionierung, Seitenstruktur und visuelle Sprache, damit Besucher sofort verstehen, warum dein Angebot relevant ist." },
    { title: "INTERNATIONALE GÄSTE FINDEN SICH NICHT ZURECHT", problem: "Sprachen, Informationen oder Kontaktwege sind unübersichtlich organisiert.", solution: "Ich plane klare Sprachpfade, verständliche Navigation und mobile Kontakt- oder Buchungswege." },
    { title: "BILDER MACHEN DIE WEBSITE LANGSAM", problem: "Hochwertige Fotos laden schwer und kosten auf mobilen Geräten Geduld.", solution: "Ich optimiere Bildformate, Ladeverhalten und Hosting, ohne die visuelle Wirkung zu verlieren." },
    { title: "SAISONALE INHALTE SIND SCHWER ZU PFLEGEN", problem: "Neue Angebote oder Termine müssen umständlich eingepflegt werden.", solution: "Du erhältst ein verständliches WordPress-System und eine persönliche Einschulung." },
  ],
  faq: [
    { question: "Arbeitest du direkt vor Ort in Salzburg?", answer: "Mein Studio befindet sich in Wien. Projekte für Salzburg begleite ich remote mit Videocalls, klaren Meilensteinen und direkter Kommunikation. Bei einem passenden Projekt können Vor-Ort-Termine separat vereinbart werden." },
    { question: "Kannst du eine mehrsprachige Website für internationale Gäste erstellen?", answer: "Ja. Sprachstruktur, Navigation, übersetzbare Inhalte und SEO-Signale werden von Beginn an geplant, statt später nur eine automatische Übersetzung anzuhängen." },
    { question: "Ist das Angebot auch für Hotels, Gastronomie und Kulturprojekte geeignet?", answer: "Ja. Umfang und Funktionen richten sich nach deinem Projekt – etwa Angebote, Veranstaltungen, Buchungslinks, Gutscheine, News oder mehrsprachige Informationsseiten." },
    { question: "Wie hilft die Website bei der lokalen Auffindbarkeit in Salzburg?", answer: "Ich lege eine saubere technische und inhaltliche Grundlage: klare Themen, lokale Relevanz, Metadaten, strukturierte Inhalte, Performance und eine gute interne Verlinkung. Rankings können nicht garantiert werden." },
    { question: "Kann ich Angebote und Termine später selbst ändern?", answer: "Ja. WordPress wird so eingerichtet, dass du wichtige Inhalte selbst pflegen kannst. Dazu erhältst du eine verständliche Einschulung." },
    { question: "Was kostet eine Website?", answer: "Der Preis hängt von Seitenumfang, Sprachen, Funktionen und vorhandenen Inhalten ab. Nach dem Erstgespräch erhältst du ein transparentes Angebot für dein konkretes Projekt." },
  ],
  localSource: "https://www.stadt-salzburg.at/wirtschaftsstandort-salzburg",
});

const salzburgEn = makePage({
  language: "en",
  locale: "en_AT",
  key: "salzburg",
  city: "Salzburg",
  cityDe: "Salzburg",
  cityEn: "Salzburg",
  country: "Austria",
  countryCode: "AT",
  region: "Salzburg",
  path: "/en-2/web-design/salzburg/",
  alternatePath: "/webdesign/salzburg/",
  seoTitle: "Web Designer Salzburg | WordPress Websites for Businesses",
  metaDescription: "English-speaking web designer for Salzburg businesses. Bespoke WordPress websites, multilingual structure, SEO foundations, ecommerce and personal support.",
  heroTitle: ["WEB DESIGNER,", "DEVELOPER &", "WORDPRESS EXPERT", "IN SALZBURG"],
  heroText: "I design and build websites for Salzburg businesses, hospitality brands, cultural projects and independent professionals. Premium in feel, fast in use and ready for German and international audiences—delivered personally from my Vienna studio.",
  serviceIntro: "Web design for an internationally visible cultural and business city—clear in positioning, convincing on mobile and straightforward to manage.",
  aboutText: "Salzburg combines an international visitor economy with strong cultural and creative sectors. I translate that standard of quality into clear digital experiences for local and international audiences, with direct collaboration and no agency layers.",
  serviceCopy: [
    "Distinctive websites for Salzburg service firms, hospitality brands, cultural initiatives and creative businesses.",
    "Flexible WordPress builds for editable offers, events, teams, case studies and multilingual content.",
    "Clean technical structure, useful service content and location relevance that help search engines understand your Salzburg offer.",
    "Clear ecommerce and booking journeys for products, vouchers or services, designed around mobile visitors.",
    "Fast image delivery and dependable hosting for visual portfolios, accommodation and event-led websites.",
    "Personal maintenance, security updates and practical help with seasonal campaigns or changing content.",
  ],
  problemTitle: "YOUR WEBSITE SHOULD COMMUNICATE QUALITY BEFORE THE FIRST CONVERSATION",
  problemText: "In Salzburg, a polished first impression is only the start. Visitors need to understand your offer quickly, trust it and move confidently between languages, details and next steps.",
  problemItems: [
    { title: "YOUR OFFER FEELS GENERIC ONLINE", problem: "The value of your service gets lost between attractive imagery and broad statements.", solution: "I clarify the positioning, content hierarchy and visual direction so visitors immediately understand what makes your offer relevant." },
    { title: "INTERNATIONAL VISITORS GET LOST", problem: "Languages, practical details or enquiry paths are organised inconsistently.", solution: "I plan intentional language routes, clear navigation and mobile-first enquiry or booking journeys." },
    { title: "LARGE IMAGES SLOW EVERYTHING DOWN", problem: "High-quality photography becomes a burden on mobile connections.", solution: "I optimise formats, loading behaviour and hosting while protecting the visual impact." },
    { title: "SEASONAL CONTENT IS HARD TO UPDATE", problem: "New offers or dates require technical help every time.", solution: "You receive a manageable WordPress setup and a personal handover." },
  ],
  faq: [
    { question: "Are you based in Salzburg?", answer: "My studio is in Vienna. I work with Salzburg clients remotely through video calls, clear milestones and direct communication. On-site meetings can be arranged separately when a project benefits from them." },
    { question: "Can you build a German and English website?", answer: "Yes. I plan the language structure, navigation, editable content and SEO signals from the start instead of attaching an automatic translation later." },
    { question: "Do you work with hospitality and cultural organisations?", answer: "Yes. The scope can include offers, events, booking links, vouchers, editorial content and multilingual visitor information." },
    { question: "How do you support visibility in Salzburg searches?", answer: "I build a strong technical and editorial foundation with clear topics, genuine local relevance, metadata, performance and internal linking. No ethical provider can guarantee rankings." },
    { question: "Can my team update offers and events?", answer: "Yes. WordPress is configured around the content you actually change, followed by a practical personal handover." },
    { question: "How much does a website cost?", answer: "Cost depends on page count, languages, functionality and content readiness. After a discovery call, you receive a transparent proposal for your specific project." },
  ],
  localSource: "https://www.stadt-salzburg.at/wirtschaftsstandort-salzburg",
});

const grazDe = makePage({
  language: "de", locale: "de_AT", key: "graz", city: "Graz", cityDe: "Graz", cityEn: "Graz", country: "Österreich", countryCode: "AT", region: "Steiermark",
  path: "/webdesign/graz/", alternatePath: "/en-2/web-design/graz/",
  seoTitle: "Webdesign Graz | WordPress Websites für Unternehmen",
  metaDescription: "Individuelles Webdesign für Unternehmen in Graz: WordPress Entwicklung, technische SEO, performante Websites und persönlicher Support vom Freelancer.",
  heroTitle: ["WEBDESIGNER,", "ENTWICKLER &", "WORDPRESS EXPERTE", "IN GRAZ"],
  heroText: "Ich entwickle moderne Websites für Grazer Unternehmen, Start-ups, Forschungsteams und Kreative. Strategisch klar, technisch sauber und persönlich umgesetzt – digital aus Wien, mit direkter Zusammenarbeit für Graz.",
  serviceIntro: "Websites für einen technologie-, forschungs- und designorientierten Standort: verständlich für Menschen, belastbar in der Technik und offen für Wachstum.",
  aboutText: "Graz verbindet Forschung, Technologie, Industrie und eine lebendige Kreativszene. Genau an dieser Schnittstelle entstehen Websites, die komplexe Leistungen einfach erklären, Innovation glaubwürdig zeigen und Bewerber, Partner oder neue Kundschaft gezielt abholen.",
  serviceCopy: [
    "Markenstarke, responsive Websites für Grazer KMU, Start-ups, Beratungen, Forschungsprojekte und kreative Studios.",
    "Individuelle WordPress-Systeme für Leistungen, Projekte, Teams, Publikationen, offene Stellen oder mehrsprachige Inhalte.",
    "Saubere Informationsarchitektur und technische SEO-Grundlagen für erklärungsbedürftige Angebote und regionale Sichtbarkeit.",
    "Flexible WooCommerce- oder Shopify-Lösungen für Produkte, digitale Leistungen und klar aufgebaute Verkaufsprozesse.",
    "Performance-Optimierung und zuverlässiges Hosting für technisch anspruchsvolle Inhalte, Medien und Integrationen.",
    "Laufende Wartung, Monitoring und Weiterentwicklung mit einer festen Ansprechperson statt wechselnder Tickets.",
  ],
  problemTitle: "INNOVATION BRAUCHT EINE WEBSITE, DIE SIE VERSTÄNDLICH MACHT",
  problemText: "Komplexe Leistungen, Forschung oder Technologie wirken online schnell abstrakt. Eine gute Website übersetzt Kompetenz in eine klare Geschichte und führt unterschiedliche Zielgruppen zum richtigen Inhalt.",
  problemItems: [
    { title: "DEIN ANGEBOT IST ZU KOMPLEX ERKLÄRT", problem: "Fachbegriffe und lange Textblöcke erschweren den Einstieg.", solution: "Ich strukturiere Inhalte nach echten Nutzerfragen und entwickle visuelle Ebenen, die Komplexität verständlich machen." },
    { title: "DIE WEBSITE PASST NICHT MEHR ZUM UNTERNEHMEN", problem: "Team, Produkt oder Positionierung haben sich weiterentwickelt, der digitale Auftritt aber nicht.", solution: "Wir schärfen Struktur und Design auf Basis deiner heutigen Ziele und erhalten sinnvolle bestehende Inhalte." },
    { title: "MEHRERE ZIELGRUPPEN FINDEN NICHT DEN RICHTIGEN EINSTIEG", problem: "Kundschaft, Talente und Partner sehen dieselbe unspezifische Startseite.", solution: "Ich entwickle klare Einstiege und Contentpfade für die wichtigsten Entscheidungen." },
    { title: "DIE TECHNIK BREMST NEUE IDEEN", problem: "Inhalte oder Funktionen lassen sich nur mit großem Aufwand ergänzen.", solution: "Ein modularer WordPress-Aufbau schafft eine stabile Grundlage für neue Projekte, Jobs oder Publikationen." },
  ],
  faq: [
    { question: "Arbeitest du mit Start-ups und Technologieunternehmen in Graz?", answer: "Ja. Besonders bei erklärungsbedürftigen Angeboten unterstütze ich dabei, Inhalte zu ordnen, Nutzen klar zu formulieren und eine skalierbare Website umzusetzen." },
    { question: "Bist du in Graz ansässig?", answer: "Nein, mein Studio ist in Wien. Die Zusammenarbeit läuft effizient remote über Video, E-Mail und nachvollziehbare Projektphasen. Vor-Ort-Termine sind nach Absprache möglich." },
    { question: "Kannst du Forschungsprojekte und Publikationen in WordPress strukturieren?", answer: "Ja. Dafür plane ich wiederverwendbare Inhaltstypen, Filter oder klare Übersichten, abhängig vom tatsächlichen Umfang und den Nutzerbedürfnissen." },
    { question: "Ist eine englische Version gleichzeitig möglich?", answer: "Ja. Für internationale Teams kann die Informationsarchitektur von Beginn an zweisprachig aufgebaut werden – einschließlich eigener Metadaten und Sprachverknüpfungen." },
    { question: "Was umfasst die SEO-Grundlage?", answer: "Dazu gehören technische Sauberkeit, logische Seitenstruktur, Metadaten, Performance, Indexierbarkeit und Inhalte, die das Angebot präzise beantworten. Laufende SEO-Arbeit kann darauf aufbauen." },
    { question: "Gibt es Support nach dem Launch?", answer: "Ja. Wartung, Backups, Sicherheitsupdates, Monitoring und Weiterentwicklung können als transparentes Support-Paket vereinbart werden." },
  ],
  localSource: "https://www.wirtschaft.graz.at/?cms_nearest=10373407",
});

const grazEn = makePage({
  language: "en", locale: "en_AT", key: "graz", city: "Graz", cityDe: "Graz", cityEn: "Graz", country: "Austria", countryCode: "AT", region: "Styria",
  path: "/en-2/web-design/graz/", alternatePath: "/webdesign/graz/",
  seoTitle: "Web Designer Graz | WordPress Websites for Businesses",
  metaDescription: "English-speaking web designer for Graz companies, startups and research teams. Custom WordPress, technical SEO, performance and personal support.",
  heroTitle: ["WEB DESIGNER,", "DEVELOPER &", "WORDPRESS EXPERT", "IN GRAZ"],
  heroText: "I create modern websites for Graz companies, startups, research teams and creative businesses. Strategically clear, technically robust and delivered through direct English-speaking collaboration from Vienna.",
  serviceIntro: "Websites for a technology, research and design-driven city—clear to people, dependable in production and ready to grow.",
  aboutText: "Graz brings research, technology, industry and a strong creative sector together. I help organisations at that intersection explain complex value clearly, demonstrate innovation credibly and guide clients, partners or talent toward the right next step.",
  serviceCopy: [
    "Distinctive responsive websites for Graz SMEs, startups, consultancies, research initiatives and creative studios.",
    "Custom WordPress systems for services, projects, teams, publications, careers and multilingual content.",
    "Clear information architecture and technical SEO foundations for complex offers and location-relevant searches.",
    "Flexible WooCommerce or Shopify builds for products, digital services and focused sales journeys.",
    "Performance optimisation and dependable hosting for technical content, media and integrations.",
    "Ongoing maintenance, monitoring and improvement with one consistent technical contact.",
  ],
  problemTitle: "INNOVATION NEEDS A WEBSITE THAT MAKES IT UNDERSTANDABLE",
  problemText: "Technology, research and complex services can feel abstract online. A focused website turns expertise into a coherent story and gives each audience a useful path through it.",
  problemItems: [
    { title: "YOUR OFFER IS TOO COMPLEX TO SCAN", problem: "Specialist terminology and dense paragraphs make the first step difficult.", solution: "I organise content around real audience questions and use visual hierarchy to make complexity understandable." },
    { title: "THE WEBSITE NO LONGER REFLECTS THE COMPANY", problem: "Your team, product or positioning has evolved while the site stayed behind.", solution: "We realign structure and design with current goals while retaining useful existing content." },
    { title: "DIFFERENT AUDIENCES SHARE ONE GENERIC ENTRY", problem: "Clients, talent and partners all land on the same unspecific message.", solution: "I create deliberate entry points and content paths for the decisions that matter." },
    { title: "THE CMS SLOWS DOWN NEW IDEAS", problem: "Adding projects, vacancies or resources takes disproportionate effort.", solution: "A modular WordPress setup creates a stable base for new initiatives and content." },
  ],
  faq: [
    { question: "Do you work with Graz startups and technology companies?", answer: "Yes. For complex offers I help organise the information, clarify the user value and turn it into a scalable website system." },
    { question: "Are you located in Graz?", answer: "My studio is in Vienna. Projects run efficiently through video calls, email and transparent milestones. On-site sessions can be discussed when useful." },
    { question: "Can WordPress manage research projects and publications?", answer: "Yes. I can create reusable content types, filters and clear archives according to the real volume of material and user needs." },
    { question: "Can we launch German and English versions together?", answer: "Yes. The information architecture can be bilingual from day one, including distinct metadata and correct language connections." },
    { question: "What is included in the SEO foundation?", answer: "It covers technical quality, logical structure, metadata, performance, indexability and content that answers the offer precisely. Ongoing SEO can build on that foundation." },
    { question: "Can you support the website after launch?", answer: "Yes. Maintenance, backups, security updates, monitoring and iterative improvements are available as a transparent support package." },
  ],
  localSource: "https://www.wirtschaft.graz.at/?cms_nearest=10373407",
});

const munichDe = makePage({
  language: "de", locale: "de_DE", key: "munich", city: "München", cityDe: "München", cityEn: "Munich", country: "Deutschland", countryCode: "DE", region: "Bayern",
  path: "/webdesign/muenchen/", alternatePath: "/en-2/web-design/munich/",
  seoTitle: "Webdesign München | WordPress Websites für Unternehmen",
  metaDescription: "Individuelles Webdesign für Unternehmen in München: WordPress Entwicklung, technische SEO, schnelle Websites und persönliche Remote-Zusammenarbeit.",
  heroTitle: ["WEBDESIGNER,", "ENTWICKLER &", "WORDPRESS EXPERTE", "IN MÜNCHEN"],
  heroText: "Ich entwickle klare, performante Websites für Münchner Unternehmen, Start-ups und Selbstständige. Persönlich geführt, hochwertig umgesetzt und transparent organisiert – remote aus meinem Studio in Wien.",
  serviceIntro: "Webdesign für einen anspruchsvollen, internationalen Markt: präzise positioniert, professionell umgesetzt und auf messbare Geschäftsziele ausgerichtet.",
  aboutText: "München ist ein starker Standort für Technologie, Innovation, Beratung und international ausgerichtete Unternehmen. In diesem Wettbewerb muss eine Website Kompetenz schnell beweisen, Angebote differenzieren und vom ersten Besuch bis zur Anfrage konsequent führen.",
  serviceCopy: [
    "Individuelle Websites für Münchner B2B-Unternehmen, Start-ups, Beratungen und Selbstständige, die sich sichtbar differenzieren möchten.",
    "Skalierbare WordPress-Entwicklung für Leistungen, Cases, Teams, Recruiting, Ressourcen und internationale Sprachversionen.",
    "Technische SEO, klare Suchintentionen und saubere Seitenhierarchien als belastbare Basis für einen wettbewerbsintensiven Markt.",
    "Conversion-orientierte WooCommerce- und Shopify-Shops mit verständlichem Sortiment, kurzem Checkout und zuverlässigen Zahlungen.",
    "Schnelles Hosting, Core-Web-Vitals-Optimierung und sauber eingebundene Analytics- oder CRM-Schnittstellen.",
    "Planbare Wartung und direkte technische Unterstützung, damit dein Team verlässlich weiterarbeiten kann.",
  ],
  problemTitle: "IN EINEM STARKEN MARKT MUSS DEINE WEBSITE SCHNELL ÜBERZEUGEN",
  problemText: "Münchner Kundschaft vergleicht Qualität, Spezialisierung und Vertrauen in kurzer Zeit. Deshalb braucht deine Website eine klare Positionierung, belastbare Beweise und einen reibungslosen Weg zur Anfrage.",
  problemItems: [
    { title: "DEIN UNTERSCHIED ZUM WETTBEWERB BLEIBT UNKLAR", problem: "Die Website beschreibt Leistungen, aber nicht den konkreten Grund, dich zu wählen.", solution: "Ich schärfe Kernbotschaft, Nutzenargumentation und Cases zu einer nachvollziehbaren Positionierung." },
    { title: "GUTE LEADS FINDEN ZU WENIG BEWEISE", problem: "Referenzen, Prozess und Fachkompetenz stehen an unterschiedlichen Stellen oder fehlen ganz.", solution: "Ich baue Vertrauen systematisch mit Projekten, Ablauf, Antworten und klaren nächsten Schritten auf." },
    { title: "DIE WEBSITE GENERIERT BESUCHE, ABER KAUM ANFRAGEN", problem: "Landingpages informieren, führen aber nicht zur Entscheidung.", solution: "Wir richten Inhalte und Calls-to-Action an Suchintention und Kaufphase aus und reduzieren unnötige Hürden." },
    { title: "DAS SYSTEM SKALIERT NICHT INTERNATIONAL", problem: "Neue Sprachen, Leistungen oder Märkte erzeugen unübersichtliche Duplikate.", solution: "Ich plane eine wiederverwendbare Informationsarchitektur mit sauberen Sprach- und Inhaltsstrukturen." },
  ],
  faq: [
    { question: "Ist Zora Web Design in München ansässig?", answer: "Nein. Mein Studio ist in Wien und ich betreue Münchner Projekte remote. Diese klare Konstellation ermöglicht direkte Kommunikation, flexible Termine und transparente Abläufe ohne vorzugeben, eine Münchner Niederlassung zu haben." },
    { question: "Funktioniert die Zusammenarbeit zwischen München und Wien komplett remote?", answer: "Ja. Strategie, Feedback und Übergabe laufen über Videocalls, strukturierte Dokumente und feste Meilensteine. Falls ein Vor-Ort-Termin sinnvoll ist, kann er separat geplant werden." },
    { question: "Kannst du B2B-Landingpages für einzelne Leistungen erstellen?", answer: "Ja. Jede Seite erhält eine klare Suchintention, eigenständigen Nutzen, passende Beweise und einen konkreten nächsten Schritt – nicht nur ausgetauschte Keywords." },
    { question: "Erstellst du deutsche und englische Websites gleichzeitig?", answer: "Ja. Inhalte, Navigation, hreflang-Verknüpfungen und Metadaten werden je Sprache eigenständig geplant, sodass internationale Teams nicht mit einer schwachen Kopie arbeiten müssen." },
    { question: "Kannst du bestehende WordPress-Websites überarbeiten?", answer: "Ja. Nach einem Audit entscheiden wir, welche Technik und Inhalte sinnvoll erhalten werden können und wo ein sauberer Neuaufbau wirtschaftlicher ist." },
    { question: "Wie startet ein Projekt?", answer: "Mit einem kostenlosen Erstgespräch zu Zielen, Zielgruppen, Seitenumfang und Zeitrahmen. Danach erhältst du eine konkrete Empfehlung und ein transparentes Angebot." },
  ],
  localSource: "https://stadt.muenchen.de/lhm-ms-wirtschaftsfoerderung/standort-muenchen.html",
});

const munichEn = makePage({
  language: "en", locale: "en_DE", key: "munich", city: "Munich", cityDe: "München", cityEn: "Munich", country: "Germany", countryCode: "DE", region: "Bavaria",
  path: "/en-2/web-design/munich/", alternatePath: "/webdesign/muenchen/",
  seoTitle: "Web Designer Munich | WordPress Websites for Businesses",
  metaDescription: "English-speaking web designer for Munich companies and startups. Bespoke WordPress development, technical SEO, fast websites and personal remote support.",
  heroTitle: ["WEB DESIGNER,", "DEVELOPER &", "WORDPRESS EXPERT", "IN MUNICH"],
  heroText: "I create clear, high-performance websites for Munich companies, startups and independent professionals. Personally led, carefully built and transparently managed in English from my Vienna studio.",
  serviceIntro: "Web design for a demanding international market—precisely positioned, professionally delivered and tied to meaningful business goals.",
  aboutText: "Munich is a major environment for technology, innovation, consulting and internationally focused companies. In that competitive context, a website must establish expertise quickly, differentiate the offer and guide visitors confidently from first impression to enquiry.",
  serviceCopy: [
    "Bespoke websites for Munich B2B companies, startups, consultancies and independent experts that need meaningful differentiation.",
    "Scalable WordPress development for services, case studies, teams, recruiting, resources and international language versions.",
    "Technical SEO, focused search intent and clean page hierarchy for competing in a mature digital market.",
    "Conversion-focused WooCommerce and Shopify stores with clear product ranges, short checkout journeys and dependable payments.",
    "Fast hosting, Core Web Vitals improvements and considered integrations for analytics, CRM or marketing workflows.",
    "Planned maintenance and direct technical support so your team can keep moving without agency ticket queues.",
  ],
  problemTitle: "IN A STRONG MARKET, YOUR WEBSITE HAS TO EARN ATTENTION QUICKLY",
  problemText: "Munich buyers compare quality, specialisation and trust in a short window. Your site therefore needs a sharp position, credible evidence and a frictionless route to enquiry.",
  problemItems: [
    { title: "YOUR DIFFERENCE IS HARD TO SEE", problem: "The website lists services without making the choice of provider any clearer.", solution: "I connect the core message, customer value and case evidence into a credible position." },
    { title: "HIGH-VALUE LEADS CANNOT FIND ENOUGH PROOF", problem: "Projects, process and expertise are scattered or missing.", solution: "I build trust deliberately through case studies, process clarity, useful answers and relevant next steps." },
    { title: "TRAFFIC DOES NOT BECOME ENQUIRIES", problem: "Landing pages inform visitors but fail to move the decision forward.", solution: "We align content and calls to action with search intent and buying stage, then remove avoidable friction." },
    { title: "THE SYSTEM DOES NOT SCALE INTERNATIONALLY", problem: "New markets, languages and services create unmanaged duplication.", solution: "I plan reusable information architecture with deliberate language and content relationships." },
  ],
  faq: [
    { question: "Are you located in Munich?", answer: "No. My studio is in Vienna and I serve Munich projects remotely. This is stated clearly: you get direct communication and flexible delivery without a fictional Munich office." },
    { question: "Can a Munich–Vienna project run fully remotely?", answer: "Yes. Strategy, review and handover take place through video calls, structured documents and clear milestones. An on-site session can be planned separately when it adds value." },
    { question: "Can you create B2B landing pages for specific services?", answer: "Yes. Each page is built around a real search intent, unique customer value, supporting proof and an appropriate next step—not a city name swapped into duplicate copy." },
    { question: "Can you build German and English versions together?", answer: "Yes. Content, navigation, hreflang relationships and metadata are planned independently for each language so international teams receive a proper experience." },
    { question: "Can you redesign an existing WordPress website?", answer: "Yes. An initial audit shows what can be retained responsibly and where a clean rebuild offers better long-term value." },
    { question: "How does a project start?", answer: "We begin with a free discovery call covering goals, audiences, scope and timing. You then receive a practical recommendation and transparent proposal." },
  ],
  localSource: "https://stadt.muenchen.de/lhm-ms-wirtschaftsfoerderung/standort-muenchen.html",
});

export const cityPages = {
  de: { salzburg: salzburgDe, graz: grazDe, munich: munichDe },
  en: { salzburg: salzburgEn, graz: grazEn, munich: munichEn },
};

export const cityPagePaths = [
  salzburgDe.path,
  salzburgEn.path,
  grazDe.path,
  grazEn.path,
  munichDe.path,
  munichEn.path,
];

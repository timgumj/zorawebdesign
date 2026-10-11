<script>
  let { language = "de", currentService } = $props();

  const services = [
    {
      id: "webdesign",
      label: { de: "WEBDESIGN", en: "WEB DESIGN" },
      href: { de: "/webdesign/", en: "/en-2/web-design/" },
    },
    {
      id: "seo-performance",
      label: { de: "SEO & PERFORMANCE", en: "SEO & PERFORMANCE" },
      href: {
        de: "/seo-performance/",
        en: "/en-2/seo-performance/",
      },
    },
    {
      id: "webshop",
      label: { de: "WEBSHOP", en: "E-COMMERCE" },
      href: { de: "/webshop/", en: "/en-2/e-commerce/" },
    },
    {
      id: "webentwicklung",
      label: { de: "WEBENTWICKLUNG", en: "WEB DEVELOPMENT" },
      href: { de: "/webentwicklung/", en: "/en-2/web-development/" },
    },
    {
      id: "website-wartung",
      label: { de: "WEBSITE-WARTUNG", en: "WEBSITE MAINTENANCE" },
      href: {
        de: "/website-wartung/",
        en: "/en-2/website-maintenance/",
      },
    },
    {
      id: "webhosting",
      label: { de: "WEBHOSTING", en: "WEBSITE HOSTING" },
      href: { de: "/webhosting/", en: "/en-2/website-hosting/" },
    },
  ];

  const isGerman = $derived(language === "de");
  const otherServices = $derived(
    services.filter((service) => service.id !== currentService),
  );
</script>

<section
  class="more-services"
  aria-labelledby="more-services-heading"
  lang={isGerman ? "de" : "en"}
>
  <div class="more-services-inner">
    <h2 id="more-services-heading">
      {isGerman ? "WEITERE LEISTUNGEN" : "MORE SERVICES"}
    </h2>

    <nav aria-label={isGerman ? "Weitere Leistungen" : "More services"}>
      {#each otherServices as service}
        <a href={service.href[isGerman ? "de" : "en"]}>
          {service.label[isGerman ? "de" : "en"]}
        </a>
      {/each}
    </nav>
  </div>
</section>

<style>
  .more-services {
    width: min(1400px, 90%);
    margin: 0 auto 80px;
    padding-top: 28px;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
    color: #ffffff;
    font-family: "DM Sans", Arial, sans-serif;
  }

  .more-services-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }

  h2 {
    margin: 0;
    color: rgba(255, 255, 255, 0.62);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  a {
    padding: 8px 12px;
    border: 1px solid #0043ff;
    color: inherit;
    font-size: 10.53px;
    letter-spacing: 0.14em;
    text-decoration: none;
    transition:
      color 0.2s ease,
      background 0.2s ease;
  }

  a:hover {
    background: #0043ff;
    color: #ffffff;
  }

  :global(body.light) .more-services {
    border-top-color: rgba(17, 17, 17, 0.18);
    color: #111111;
  }

  :global(body.light) .more-services h2 {
    color: rgba(17, 17, 17, 0.62);
  }
</style>

<script>
  const currentYear = new Date().getFullYear();

  let {
    copyright = `ZORA DESIGN © COPYRIGHT ${currentYear}`,
    location = "VIENNA / AUSTRIA",
    imprintText = "IMPRINT",
    language = "en",
    currentArea = "",
  } = $props();

  const areaLinks = {
    de: [
      { key: "salzburg", label: "SALZBURG", href: "/webdesign/salzburg/" },
      { key: "graz", label: "GRAZ", href: "/webdesign/graz/" },
      { key: "munich", label: "MÜNCHEN", href: "/webdesign/muenchen/" },
    ],
    en: [
      { key: "salzburg", label: "SALZBURG", href: "/en-2/web-design/salzburg/" },
      { key: "graz", label: "GRAZ", href: "/en-2/web-design/graz/" },
      { key: "munich", label: "MUNICH", href: "/en-2/web-design/munich/" },
    ],
  };

  let serviceAreas = $derived(areaLinks[language] ?? areaLinks.en);
</script>

<footer class="site-footer">
  <div class="container footer-row">
    <div class="footer-meta">
      <p class="footer-copyright">{copyright}</p>
      <p>{location}</p>
    </div>

    <div class="footer-service-areas">
      <p>{language === "de" ? "WEBDESIGN REGIONEN" : "WEB DESIGN SERVICE AREAS"}</p>
      <nav aria-label={language === "de" ? "Webdesign Regionen" : "Web design service areas"}>
        {#each serviceAreas as area}
          <a
            href={area.href}
            class:active={area.key === currentArea}
            aria-current={area.key === currentArea ? "page" : undefined}
          >{area.label}</a>
        {/each}
      </nav>
    </div>

    <a href="/impressum/" class="footer-imprint-link">
      {imprintText}
    </a>

    <a
      href="https://firmen.wko.at/ngwainmbi-timgum-julius-ma/wien/?firmaid=b7f32d66-1d76-4cb5-9651-55d43404c7bf&standortid=1&standortname=wien%20%28bundesland%29&suchbegriff=julius%20timgum"
      class="footer-wko-link"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open WKO company profile"
    >
      <img
        src="/images/logo_wko_black.BdRrud0O_54cLF.webp"
        alt="WKO Member"
        class="footer-wko-logo"
      />
    </a>
  </div>
</footer>

<style>
  .site-footer {
    margin-top: 110px;
    border-top: 1px solid #111;
    background: #050505;
    color: #ffffff;
    font-family: "DM Sans", Arial, sans-serif;
    transition:
      background 0.3s ease,
      color 0.3s ease,
      border-color 0.3s ease;
  }

  :global(body.light) .site-footer {
    background: #f7f7f4;
    color: #111111;
    border-top: 0;
  }

  .footer-row {
    display: grid;
    grid-template-areas: "meta imprint wko regions";
    grid-template-columns: minmax(250px, 1.15fr) auto auto minmax(360px, 1.7fr);
    align-items: center;
    gap: clamp(28px, 3.5vw, 64px);
    padding: 36px 0;
  }

  .footer-service-areas {
    grid-area: regions;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    min-width: 0;
  }

  .footer-service-areas p {
    margin: 0;
    color: rgba(255, 255, 255, 0.62);
    font-size: 9.72px;
    letter-spacing: 0.16em;
  }

  :global(body.light) .footer-service-areas p {
    color: rgba(17, 17, 17, 0.62);
  }

  .footer-service-areas nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: clamp(14px, 1.5vw, 26px);
  }

  .footer-service-areas a {
    display: inline-block;
    width: fit-content;
    padding-bottom: 4px;
    border-bottom: 1px solid #0043ff;
    color: #fff;
    font-size: 10.53px;
    letter-spacing: 0.14em;
    text-decoration: none;
  }

  .footer-service-areas a:hover,
  .footer-service-areas a.active {
    border-bottom-color: #0043ff;
  }

  :global(body.light) .footer-service-areas a {
    color: #111;
  }

  .footer-meta {
    grid-area: meta;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .footer-meta p {
    margin: 0;
    color: #fff;
    font-size: 11.34px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  .footer-meta .footer-copyright {
    font-weight: 300;
  }

  :global(body.light) .footer-meta p {
    color: #111111;
  }

  .footer-imprint-link {
    grid-area: imprint;
    display: inline-block;
    width: fit-content;
    justify-self: start;
    background: transparent;
    color: #fff;
    font: inherit;
    font-size: 11.34px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    text-decoration: none;
    border-bottom: 1px solid #0043ff;
    padding: 0 0 4px;
    transition:
      color 0.3s ease,
      border-color 0.3s ease;
  }

  :global(body.light) .footer-imprint-link {
    color: #111111;
    border-bottom-color: #0043ff;
  }

  .footer-wko-link {
    grid-area: wko;
    display: flex;
    align-items: center;
    margin: 0;
  }

  .footer-wko-logo {
    width: 120px;
    height: auto;
    display: block;
    filter: brightness(0) invert(1);
    transition:
      filter 0.3s ease,
      opacity 0.3s ease;
  }

  .footer-wko-link:hover .footer-wko-logo {
    opacity: 0.8;
  }

  :global(body.light) .footer-wko-logo {
    filter: none;
  }

  @media (min-width: 1025px) {
    .footer-row {
      width: min(1560px, 94%);
      grid-template-columns: minmax(0, 1fr) auto auto minmax(0, 1fr);
    }
  }

  @media (max-width: 1024px) {
    .footer-row {
      grid-template-areas:
        "meta"
        "regions"
        "imprint"
        "wko";
      grid-template-columns: 1fr;
      align-items: start;
      gap: 24px;
      padding: 34px 0;
    }

    .footer-service-areas {
      align-items: flex-start;
    }

    .footer-service-areas nav {
      justify-content: flex-start;
    }

    .footer-imprint-link,
    .footer-wko-link {
      justify-self: start;
    }

    .footer-meta p,
    .footer-imprint-link {
      font-size: 12.96px;
    }

    .footer-wko-logo {
      width: 100px;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .footer-row {
      grid-template-areas:
        "meta regions"
        "wko imprint";
      grid-template-columns: repeat(2, minmax(0, 1fr));
      column-gap: 48px;
      row-gap: 28px;
    }

    .footer-service-areas {
      align-items: flex-end;
      text-align: right;
    }

    .footer-service-areas nav {
      justify-content: flex-end;
    }

    .footer-imprint-link {
      justify-self: end;
    }
  }

  @media (max-width: 600px) {
    .site-footer {
      margin-top: 80px;
    }

    .footer-meta p,
    .footer-imprint-link {
      font-size: 11.34px;
      letter-spacing: 0.12em;
    }

    .footer-wko-logo {
      width: 90px;
    }
  }
</style>

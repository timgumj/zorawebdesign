<script>
  const currentYear = new Date().getFullYear();

  let {
    copyright = `ZORA DESIGN © COPYRIGHT ${currentYear}`,
    location = "VIENNA / AUSTRIA",
    imprintText = "IMPRINT",
  } = $props();
</script>

<footer class="site-footer">
  <div class="container footer-bar">
    <p>{copyright}</p>

    <p>{location}</p>

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
    background: #ffffff;
    color: #111111;
    border-top-color: rgba(0, 0, 0, 0.12);
  }

  .footer-bar {
    width: 90%;
    max-width: 1560px;
    min-height: 90px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    align-items: center;
    gap: 32px;
  }

  .footer-bar p {
    margin: 0;
    color: #fff;
    font-size: 14px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  :global(body.light) .footer-bar p {
    color: #111111;
  }

  .footer-bar p:first-child {
    justify-self: start;
  }

  .footer-bar p:nth-child(2) {
    justify-self: center;
  }

  .footer-imprint-link {
    justify-self: end;
    background: transparent;
    color: #fff;
    font: inherit;
    font-size: 14px;
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
    justify-self: end;
    display: flex;
    align-items: center;
    margin-left: 20px; /* Moves logo further right */
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

  @media (max-width: 1024px) {
    .footer-bar {
      grid-template-columns: 1fr;
      gap: 18px;
      padding: 28px 0;
      text-align: left;
    }
    .footer-bar {
      width: 92%;
      grid-template-columns: 1fr;
      gap: 18px;
      padding: 28px 0;
      text-align: left;
    }
    .footer-bar p,
    .footer-imprint-link {
      font-size: 16px;
      justify-self: start;
    }

    .footer-bar p:nth-child(2) {
      justify-self: start;
    }

    .footer-wko-link {
      justify-self: start;
      margin-left: 0;
    }

    .footer-wko-logo {
      width: 100px;
    }
  }

  @media (max-width: 600px) {
    .site-footer {
      margin-top: 80px;
    }

    .footer-bar p,
    .footer-imprint-link {
      font-size: 14px;
      letter-spacing: 0.12em;
    }

    .footer-wko-logo {
      width: 90px;
    }
  }
</style>

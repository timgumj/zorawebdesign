<script>
  import Configurator from "$lib/components/website-configurator/Configurator.svelte";

  const language = "de";
</script>

<svelte:head>
  <title>Website Konfigurator | Zora Web Design Wien</title>

  <meta
    name="description"
    content="Planen Sie Ihre neue Website Schritt für Schritt. Erhalten Sie Empfehlungen für Seiten, Funktionen und den passenden Projektumfang."
  />

  <meta name="robots" content="index, follow" />
  <meta name="author" content="Julius Timgum" />
  <meta name="publisher" content="Zora Web Design" />

  <link
    rel="canonical"
    href="https://www.zorawebdesign.com/website-konfigurator/"
  />

  <link
    rel="alternate"
    hreflang="de-AT"
    href="https://www.zorawebdesign.com/website-konfigurator/"
  />

  <link
    rel="alternate"
    hreflang="en"
    href="https://www.zorawebdesign.com/en-2/website-configurator/"
  />

  <link
    rel="alternate"
    hreflang="x-default"
    href="https://www.zorawebdesign.com/website-konfigurator/"
  />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Zora Web Design" />

  <meta
    property="og:url"
    content="https://www.zorawebdesign.com/website-konfigurator/"
  />

  <meta property="og:title" content="Website Konfigurator | Zora Web Design" />

  <meta
    property="og:description"
    content="Planen Sie Ihre Website und erhalten Sie eine individuelle Empfehlung für Ihr Projekt."
  />

  <meta
    property="og:image"
    content="https://www.zorawebdesign.com/images/meet-700.webp"
  />

  <meta property="og:locale" content="de_AT" />

  <meta name="twitter:card" content="summary_large_image" />

  <meta name="twitter:title" content="Website Konfigurator | Zora Web Design" />

  <meta
    name="twitter:description"
    content="Planen Sie Ihre Website und erhalten Sie eine individuelle Empfehlung für Ihr Projekt."
  />

  <meta
    name="twitter:image"
    content="https://www.zorawebdesign.com/images/meet-700.webp"
  />
</svelte:head>

<Configurator {language} />

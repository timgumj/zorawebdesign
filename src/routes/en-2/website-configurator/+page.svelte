<script>
  import Configurator from "$lib/components/website-configurator/Configurator.svelte";

  const language = "en";
</script>

<svelte:head>
  <title>Website planner | Zora Web Design Vienna</title>

  <meta
    name="description"
    content="Plan your new or existing website step by step. Receive tailored recommendations for pages, features and project scope and get a solid recommendation for your project."
  />

  <meta name="robots" content="index, follow" />
  <meta name="author" content="Julius Timgum" />
  <meta name="publisher" content="Zora Web Design" />

  <link
    rel="canonical"
    href="https://www.zorawebdesign.com/en-2/website-configurator/"
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
    content="https://www.zorawebdesign.com/en-2/website-configurator/"
  />

  <meta property="og:title" content="Website planner | Zora Web Design" />

  <meta
    property="og:description"
    content="Plan your website and receive a tailored recommendation for your project."
  />

  <meta
    property="og:image"
    content="https://www.zorawebdesign.com/images/meet-700.webp"
  />

  <meta property="og:locale" content="en_GB" />

  <meta name="twitter:card" content="summary_large_image" />

  <meta name="twitter:title" content="Website planner | Zora Web Design" />

  <meta
    name="twitter:description"
    content="Plan your website and receive a tailored recommendation for your project."
  />

  <meta
    name="twitter:image"
    content="https://www.zorawebdesign.com/images/meet-700.webp"
  />
</svelte:head>

<Configurator {language} />

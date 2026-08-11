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

  <link
    rel="canonical"
    href="https://zorawebdesign.com/en-2/website-configurator/"
  />

  <link
    rel="alternate"
    hreflang="de"
    href="https://zorawebdesign.com/website-konfigurator/"
  />

  <link
    rel="alternate"
    hreflang="en"
    href="https://zorawebdesign.com/en-2/website-configurator/"
  />

  <link
    rel="alternate"
    hreflang="x-default"
    href="https://zorawebdesign.com/website-konfigurator/"
  />

  <meta property="og:title" content="Website planner | Zora Web Design" />

  <meta
    property="og:description"
    content="Plan your website and receive a tailored recommendation for your project."
  />

  <meta property="og:type" content="website" />

  <meta
    property="og:url"
    content="https://zorawebdesign.com/en-2/website-configurator/"
  />
</svelte:head>

<Configurator {language} />

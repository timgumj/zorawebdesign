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

  <link
    rel="canonical"
    href="https://zorawebdesign.com/website-konfigurator/"
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

  <meta property="og:title" content="Website Konfigurator | Zora Web Design" />

  <meta
    property="og:description"
    content="Planen Sie Ihre Website und erhalten Sie eine individuelle Empfehlung für Ihr Projekt."
  />

  <meta property="og:type" content="website" />

  <meta
    property="og:url"
    content="https://zorawebdesign.com/website-konfigurator/"
  />
</svelte:head>

<Configurator {language} />

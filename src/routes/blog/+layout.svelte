<script>
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children } = $props();

  const nav = {
    services: "LEISTUNGEN",
    projects: "PROJEKTE",
    reviews: "BEWERTUNGEN",
    contact: "KONTAKT",

    tagline: "WEBDESIGN & ENTWICKLUNG",

    servicesLink: "/#services",
    projectsLink: "/#projects",
    reviewsLink: "/#reviews",
    contactLink: "/#contact",

    languageLink: "/en-2/blog/",
    languageLabel: "EN",
  };
</script>

<Header {nav} />

{@render children()}

<Footer />

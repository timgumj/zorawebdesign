<script>
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children } = $props();

  const nav = {
    services: "SERVICES",
    projects: "PROJECTS",
    reviews: "REVIEWS",
    contact: "CONTACT",

    tagline: "WEB DESIGN & DEVELOPMENT",

    servicesLink: "/en-2/#services",
    projectsLink: "/en-2/#projects",
    reviewsLink: "/en-2/#reviews",
    contactLink: "/en-2/#contact",

    languageLink: "/blog/",
    languageLabel: "DE",
  };
</script>

<Header {nav} />

{@render children()}

<Footer language="en" />

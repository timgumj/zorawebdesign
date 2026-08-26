<script>
  import CityLandingPage from "$lib/components/city/CityLandingPage.svelte";
  import { cityPages } from "$lib/data/city-pages.js";
  import { projects } from "$lib/data/projects.js";
</script>

<CityLandingPage page={cityPages.de.salzburg} {projects} />

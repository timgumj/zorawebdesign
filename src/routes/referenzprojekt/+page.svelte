<script>
  import FeaturedProjectPage from "$lib/components/featured-project/FeaturedProjectPage.svelte";
  import {
    evaProjectContent,
    evaProjectMedia,
  } from "$lib/data/featured-project/eva-project.js";

  const content = evaProjectContent.de;
</script>

<FeaturedProjectPage
  {content}
  media={evaProjectMedia}
  websiteUrl="https://evaeichinger.com"
/>

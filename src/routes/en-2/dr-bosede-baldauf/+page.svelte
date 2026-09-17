<script>
  import FeaturedProjectPage from "$lib/components/featured-project/FeaturedProjectPage.svelte";

  import {
    baldaufProjectContent,
    baldaufProjectMedia,
  } from "$lib/data/featured-project/baldauf-project.js";

  const content = baldaufProjectContent.en;
</script>

<FeaturedProjectPage
  {content}
  media={baldaufProjectMedia}
  websiteUrl="https://www.baldauf-uro.at/"
/>

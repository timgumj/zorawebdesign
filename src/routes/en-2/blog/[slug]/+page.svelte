<script>
  import BlogArticle from "$lib/components/blog/BlogArticle.svelte";

  let { data } = $props();
</script>

<BlogArticle post={data.post} />

<script>
  import "../app.css";
  import { onMount } from "svelte";
  import { page } from "$app/state";

  let { children } = $props();

  onMount(() => {
    const savedTheme = localStorage.getItem("site-theme") || "dark";

    document.body.classList.remove("light", "dark");
    document.body.classList.add(savedTheme);
  });

  $effect(() => {
    const isEnglish = page.url.pathname.startsWith("/en-2");

    document.documentElement.lang = isEnglish ? "en" : "de";
  });
</script>

{@render children()}

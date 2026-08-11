<script>
  import "../app.css";
  import { onMount } from "svelte";

  let { children } = $props();

  onMount(() => {
    const savedTheme = localStorage.getItem("site-theme") || "dark";

    document.body.classList.remove("light", "dark");
    document.body.classList.add(savedTheme);
  });
</script>

{@render children()}

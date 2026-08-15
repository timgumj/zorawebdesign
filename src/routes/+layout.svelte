<script>
  import "../app.css";
  import { browser } from "$app/environment";
  import { page } from "$app/state";

  let { children } = $props();

  $effect(() => {
    if (!browser) return;

    const pathname = page.url.pathname;

    const isHomepage =
      pathname === "/" || pathname === "/en-2" || pathname === "/en-2/";

    document.body.classList.remove("light", "dark");

    if (isHomepage) {
      const savedTheme = localStorage.getItem("site-theme") || "dark";
      document.body.classList.add(savedTheme);
    }
  });

  $effect(() => {
    if (!browser) return;

    const isEnglish = page.url.pathname.startsWith("/en-2");

    document.documentElement.lang = isEnglish ? "en" : "de";
  });
</script>

{@render children()}

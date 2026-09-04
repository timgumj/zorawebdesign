<script>
  import "../app.css";
  import { browser } from "$app/environment";
  import { page } from "$app/state";
  import {
    getStoredTheme,
    getThemeSettings,
    isThemeEnabledPath,
  } from "$lib/theme.js";

  let { children } = $props();

  $effect(() => {
    if (!browser) return;

    const pathname = page.url.pathname;

    document.documentElement.classList.remove("light", "dark");
    document.body.classList.remove("light", "dark");

    if (!isThemeEnabledPath(pathname)) return;

    const { defaultTheme, storageKey } = getThemeSettings(pathname);
    const selectedTheme = getStoredTheme(
      localStorage,
      storageKey,
      defaultTheme,
    );

    document.documentElement.classList.add(selectedTheme);
    document.body.classList.add(selectedTheme);
  });

  $effect(() => {
    if (!browser) return;

    const isEnglish = page.url.pathname.startsWith("/en-2");

    document.documentElement.lang = isEnglish ? "en" : "de";
  });
</script>

{@render children()}

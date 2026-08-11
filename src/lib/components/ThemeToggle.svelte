<script>
  import { onMount } from "svelte";

  let theme = $state("dark");

  function applyTheme(selectedTheme) {
    theme = selectedTheme;

    document.body.classList.remove("light", "dark");
    document.body.classList.add(selectedTheme);

    localStorage.setItem("site-theme", selectedTheme);
  }

  function toggleTheme() {
    applyTheme(theme === "dark" ? "light" : "dark");
  }

  onMount(() => {
    const savedTheme = localStorage.getItem("site-theme") || "dark";
    applyTheme(savedTheme);
  });
</script>

<button
  type="button"
  class="theme-side-toggle"
  class:is-light={theme === "light"}
  onclick={toggleTheme}
  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
>
  <span class="theme-icon">
    {theme === "dark" ? "☀" : "☾"}
  </span>

  <span class="theme-text">
    {theme === "dark" ? "LIGHT MODE" : "DARK MODE"}
  </span>
</button>

<style>
  .theme-side-toggle {
    position: fixed;
    left: 18px;
    top: 50%;
    z-index: 9999;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(5, 5, 5, 0.78);
    color: #ffffff;
    font-family: "DM Sans", Arial, sans-serif;
    cursor: pointer;
    transform: translateY(-50%) rotate(-90deg);
    transform-origin: left center;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    transition:
      background 0.3s ease,
      color 0.3s ease,
      border-color 0.3s ease,
      transform 0.3s ease;
  }

  .theme-side-toggle:hover {
    background: #0043ff;
    border-color: #0043ff;
    transform: translateY(-50%) rotate(-90deg) translateY(-2px);
  }

  .theme-side-toggle.is-light {
    background: rgba(255, 255, 255, 0.84);
    color: #111111;
    border-color: rgba(0, 0, 0, 0.16);
  }

  .theme-side-toggle.is-light:hover {
    background: #111111;
    color: #ffffff;
    border-color: #111111;
  }

  .theme-icon {
    font-size: 16px;
    line-height: 1;
  }

  .theme-text {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.16em;
    line-height: 1;
  }

  /* Tablet */

  @media (max-width: 1024px) {
    .theme-side-toggle {
      left: 8px;
      padding: 5px 10px;
      gap: 5px;
    }

    .theme-icon {
      font-size: 12px;
    }

    .theme-text {
      font-size: 10px;
      letter-spacing: 0.08em;
    }
  }

  /* Mobile */

  @media (max-width: 767px) {
    .theme-side-toggle {
      left: 8px;
      padding: 8px 8px;
      gap: 4px;
      opacity: 0.92;
    }

    .theme-icon {
      font-size: 10px;
    }

    .theme-text {
      font-size: 10px;
      letter-spacing: 0.05em;
    }
  }

  /* Very small phones */

  @media (max-width: 480px) {
    .theme-side-toggle {
      left: 6px;
      padding: 6px 7px;
      gap: 3px;
    }

    .theme-icon {
      font-size: 9px;
    }

    .theme-text {
      font-size: 10px;
      letter-spacing: 0.04em;
    }
  }
</style>

<script>
  import { onMount } from "svelte";

  let theme = $state("dark");
  let mobileHeroVisible = $state(true);

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

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const hero = document.querySelector(".hero, .project-hero");

    function updateMobileHeroVisibility() {
      if (!mobileQuery.matches || !hero) {
        mobileHeroVisible = true;
        return;
      }

      const heroBounds = hero.getBoundingClientRect();
      const togglePosition = window.innerHeight / 2;

      mobileHeroVisible =
        heroBounds.top <= togglePosition && heroBounds.bottom >= togglePosition;
    }

    updateMobileHeroVisibility();
    window.addEventListener("scroll", updateMobileHeroVisibility, {
      passive: true,
    });
    window.addEventListener("resize", updateMobileHeroVisibility);
    mobileQuery.addEventListener("change", updateMobileHeroVisibility);

    return () => {
      window.removeEventListener("scroll", updateMobileHeroVisibility);
      window.removeEventListener("resize", updateMobileHeroVisibility);
      mobileQuery.removeEventListener("change", updateMobileHeroVisibility);
    };
  });
</script>

<button
  type="button"
  class="theme-side-toggle"
  class:is-light={theme === "light"}
  class:mobile-hero-hidden={!mobileHeroVisible}
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
    border: 1px solid #0043ff;
    background: #0043ff;
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
      transform 0.3s ease,
      opacity 0.2s ease;
  }

  .theme-side-toggle:hover {
    background: #0043ff;
    border-color: #0043ff;
    transform: translateY(-50%) rotate(-90deg) translateY(-2px);
  }

  .theme-side-toggle.is-light {
    background: #000000;
    color: #ffffff;
    border-color: #000000;
  }

  .theme-side-toggle.is-light:hover {
    background: #000000;
    color: #ffffff;
    border-color: #000000;
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
      left: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 10px;
      gap: 5px;
      box-sizing: border-box;
      line-height: 1;
      text-align: center;
      transform: rotate(-90deg) translate(-50%, -50%);
      transform-origin: left top;
    }

    .theme-side-toggle:hover {
      transform: rotate(-90deg) translate(-50%, -50%);
    }

    .theme-icon {
      width: 12px;
      height: 12px;
      flex: 0 0 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }

    .theme-text {
      min-height: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      letter-spacing: 0.08em;
    }
  }

  /* Mobile */

  @media (max-width: 767px) {
    .theme-side-toggle {
      left: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      gap: 4px;
      opacity: 0.92;
    }

    .theme-side-toggle.mobile-hero-hidden {
      visibility: hidden;
      pointer-events: none;
      opacity: 0;
    }

    .theme-icon {
      width: 10px;
      height: 10px;
      flex-basis: 10px;
      font-size: 10px;
    }

    .theme-text {
      min-height: 10px;
      font-size: 10px;
      letter-spacing: 0.05em;
      text-align: center;
    }
  }

  /* Very small phones */

  @media (max-width: 480px) {
    .theme-side-toggle {
      left: 13px;
      padding: 7px;
      gap: 3px;
    }

    .theme-icon {
      width: 9px;
      height: 9px;
      flex-basis: 9px;
      font-size: 9px;
    }

    .theme-text {
      font-size: 10px;
      letter-spacing: 0.04em;
    }
  }
</style>

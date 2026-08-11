<script>
  import ImpressumContent from "$lib/components/ImpressumContent.svelte";
</script>

<svelte:head>
  <title>Impressum | Zora Web Design</title>

  <meta
    name="description"
    content="Impressum von Zora Web Design, Julius Timgum, Webdesigner und WordPress Entwickler in Wien."
  />

  <link rel="canonical" href="https://zorawebdesign.com/impressum/" />

  <meta name="robots" content="index, follow" />
</svelte:head>

<main class="impressum-page">
  <div class="impressum-shell">
    <div class="impressum-top">
      <h1>Impressum</h1>

      <a href="/" class="close-button" aria-label="Impressum schließen"> × </a>
    </div>

    <ImpressumContent />
  </div>
</main>

<style>
  .impressum-page {
    min-height: 100vh;
    background: #000;
    color: #fff;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .impressum-shell {
    width: 100%;
    max-width: 920px;
    background: #000;
    color: #fff;
    padding: 46px;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .impressum-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 42px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  }

  .impressum-top h1 {
    margin: 0;
    color: #fff;
    font-size: clamp(30px, 4vw, 48px);
    line-height: 1;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 500;
  }

  .close-button {
    color: #0043ff;
    text-decoration: none;
    font-size: 44px;
    line-height: 1;
  }

  @media (max-width: 1024px) {
    .impressum-page {
      padding: 24px;
      align-items: flex-start;
    }

    .impressum-shell {
      padding: 38px 30px;
    }
  }

  @media (max-width: 767px) {
    .impressum-page {
      padding: 16px;
    }

    .impressum-shell {
      padding: 32px 22px;
    }

    .impressum-top {
      margin-bottom: 30px;
      padding-bottom: 18px;
    }

    .close-button {
      font-size: 38px;
    }
  }
</style>

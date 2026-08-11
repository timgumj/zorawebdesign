<script>
  let { data } = $props();

  let canonicalUrl = $derived(`https://zorawebdesign.com/${data.post.slug}/`);
</script>

<svelte:head>
  <title>{data.post.title} | Zora Web Design</title>

  <meta name="description" content={data.post.description} />
  <link rel="canonical" href={canonicalUrl} />

  <meta name="robots" content="index, follow" />
  <meta name="author" content="Julius Timgum" />

  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.post.title} />
  <meta property="og:description" content={data.post.description} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:site_name" content="Zora Web Design" />

  <meta name="twitter:card" content="summary_large_image" />

  {#if data.post.date}
    <meta property="article:published_time" content={data.post.date} />
  {/if}
</svelte:head>

<main class="blog-page">
  <div class="blog-shell">
    <a href="/" class="back-home"> ← HOME </a>

    <article class="blog-card">
      <header class="blog-header">
        <p class="blog-kicker">ZORA WEB DESIGN</p>

        <h1>{data.post.title}</h1>

        <div class="blog-meta">
          <span>By Julius</span>
        </div>

        {#if data.post.description}
          <p class="blog-description">
            {data.post.description}
          </p>
        {/if}

        {#if data.post.youtube}
          <a
            class="youtube-button"
            href={data.post.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            WATCH ON YOUTUBE →
          </a>
        {/if}
      </header>

      <div class="blog-content">
        {@html data.post.content}
      </div>
    </article>
  </div>
</main>

<style>
  .blog-page {
    min-height: 100vh;
    padding: 48px 0 120px;
    background: #000;
    color: #f4f4f4;
    font-family: "Space Grotesk", Arial, sans-serif;
  }

  .blog-shell {
    width: min(1080px, calc(100% - 32px));
    margin: 0 auto;
  }

  .back-home {
    display: inline-flex;
    align-items: center;
    margin-bottom: 48px;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    font-size: 0.82rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    transition: opacity 0.25s ease;
  }

  .back-home:hover {
    opacity: 1;
    color: #fff;
  }

  .blog-card {
    padding: clamp(26px, 5vw, 80px);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.04),
      rgba(255, 255, 255, 0.015)
    );
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .blog-header {
    margin-bottom: 56px;
    padding-bottom: 42px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .blog-kicker {
    margin: 0 0 22px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.75rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  .blog-header h1 {
    margin: 0;
    color: #fff;
    font-size: clamp(2rem, 5vw, 3.8rem);
    line-height: 1;
    letter-spacing: -0.05em;
    font-weight: 500;
  }

  .blog-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 28px;
  }

  .blog-meta span {
    padding: 10px 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.58);
    font-size: 0.78rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .blog-description {
    max-width: 760px;
    margin: 30px 0 0;
    color: rgba(255, 255, 255, 0.7);
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.8;
  }

  .youtube-button {
    display: inline-flex;
    align-items: center;
    margin-top: 34px;
    padding: 14px 22px;
    color: #fff;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.14);
    font-size: 0.8rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    transition:
      background 0.25s ease,
      color 0.25s ease;
  }

  .youtube-button:hover {
    background: #fff;
    color: #000;
  }

  .blog-content {
    max-width: 820px;
    color: rgba(255, 255, 255, 0.76);
    font-size: 1.08rem;
    line-height: 1.9;
  }

  .blog-content :global(h1),
  .blog-content :global(h2),
  .blog-content :global(h3) {
    color: #fff;
    line-height: 1.1;
    letter-spacing: -0.03em;
    font-weight: 500;
  }

  .blog-content :global(h1) {
    margin: 0 0 1em;
    font-size: clamp(2rem, 5vw, 3rem);
  }

  .blog-content :global(h2) {
    margin-top: 2.5em;
    margin-bottom: 0.7em;
    font-size: clamp(1.7rem, 4vw, 2.4rem);
  }

  .blog-content :global(h3) {
    margin-top: 2em;
    margin-bottom: 0.7em;
    font-size: clamp(1.2rem, 3vw, 1.6rem);
  }

  .blog-content :global(p) {
    margin: 0 0 1.3em;
  }

  .blog-content :global(ul),
  .blog-content :global(ol) {
    margin: 0 0 1.5em 1.4em;
    padding: 0;
  }

  .blog-content :global(li) {
    margin-bottom: 0.7em;
  }

  .blog-content :global(a) {
    color: #fff;
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
  }

  .blog-content :global(code) {
    font-family: monospace;
    font-size: 0.95em;
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 0.15em 0.35em;
  }

  .blog-content :global(pre) {
    max-width: 100%;
    margin: 2em 0;
    padding: 22px;
    overflow-x: auto;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .blog-content :global(pre code) {
    background: transparent;
    border: 0;
    padding: 0;
    color: #f4f4f4;
  }

  .blog-content :global(img) {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 2.5em 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .blog-content :global(hr) {
    border: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    margin: 2.5em 0;
  }

  @media (max-width: 767px) {
    .blog-page {
      padding: 28px 0 90px;
    }

    .back-home {
      margin-bottom: 28px;
    }

    .blog-header {
      margin-bottom: 40px;
      padding-bottom: 32px;
    }

    .blog-content {
      font-size: 1rem;
      line-height: 1.75;
    }

    .blog-content :global(pre) {
      padding: 16px;
    }
  }
</style>

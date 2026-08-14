<script>
  import "$lib/styles/blog-archive.css";
  import { blogPostsDe } from "$lib/content/blog-de.js";

  const posts = Object.values(blogPostsDe);
</script>

<svelte:head>
  <title>Blog | Zora Web Design</title>

  <meta
    name="description"
    content="Artikel und Guides rund um Webdesign, Websites und digitale Projekte von Zora Web Design."
  />
</svelte:head>

<main class="blog-archive">
  <div class="blog-archive-shell">
    <div class="blog-topbar">
      <a href="/" class="blog-back-link"> ← ZURÜCK ZUR STARTSEITE </a>

      <a href="/en-2/blog/" class="blog-language-link"> ENGLISH </a>
    </div>

    <header class="blog-archive-header">
      <h1>Blog</h1>
    </header>

    <div class="blog-archive-list">
      {#each posts as post}
        <article class="blog-archive-item">
          <div class="blog-archive-copy">
            <h2>
              <a href={`/blog/${post.slug}/`}>
                {post.title}
              </a>
            </h2>

            <div class="blog-archive-meta" aria-label="Artikelinformationen">
              {#if post.published}
                <span>
                  {post.published}
                </span>
              {/if}

              {#if post.author}
                <span class="blog-meta-separator" aria-hidden="true"> / </span>

                <span>
                  {post.author}
                </span>
              {/if}

              {#if post.readingTime}
                <span class="blog-meta-separator" aria-hidden="true"> / </span>

                <span>
                  {post.readingTime} MIN. LESEZEIT
                </span>
              {/if}
            </div>

            {#if post.description}
              <p>{post.description}</p>
            {/if}
          </div>

          {#if post.image}
            <div class="blog-archive-image">
              <img
                src={post.image}
                alt={post.imageAlt || ""}
                loading="lazy"
                decoding="async"
              />
            </div>
          {/if}
        </article>
      {/each}
    </div>
  </div>
</main>

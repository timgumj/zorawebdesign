<script>
  import "$lib/styles/blog-archive.css";
  import { blogPostsDe } from "$lib/content/blog-de.js";

  const posts = Object.values(blogPostsDe);
</script>

<svelte:head>
  <title>Webdesign Blog | WordPress & SEO Tipps | Zora Web Design</title>

  <meta
    name="description"
    content="Artikel und praktische Tipps zu Webdesign, WordPress, SEO, Website Performance und digitalen Projekten von Zora Web Design in Wien."
  />

  <meta name="robots" content="index, follow" />
  <meta name="author" content="Julius Timgum" />
  <meta name="publisher" content="Zora Web Design" />

  <link rel="canonical" href="https://www.zorawebdesign.com/blog/" />

  <link
    rel="alternate"
    hreflang="de-AT"
    href="https://www.zorawebdesign.com/blog/"
  />

  <link
    rel="alternate"
    hreflang="en"
    href="https://www.zorawebdesign.com/en-2/blog/"
  />

  <link
    rel="alternate"
    hreflang="x-default"
    href="https://www.zorawebdesign.com/blog/"
  />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Zora Web Design" />

  <meta property="og:url" content="https://www.zorawebdesign.com/blog/" />

  <meta
    property="og:title"
    content="Webdesign Blog | WordPress & SEO Tipps | Zora Web Design"
  />

  <meta
    property="og:description"
    content="Artikel und praktische Tipps zu Webdesign, WordPress, SEO, Website Performance und digitalen Projekten von Zora Web Design in Wien."
  />

  <meta
    property="og:image"
    content="https://www.zorawebdesign.com/images/meet-700.webp"
  />

  <meta property="og:locale" content="de_AT" />

  <meta name="twitter:card" content="summary_large_image" />

  <meta
    name="twitter:title"
    content="Webdesign Blog | WordPress & SEO Tipps | Zora Web Design"
  />

  <meta
    name="twitter:description"
    content="Artikel und praktische Tipps zu Webdesign, WordPress, SEO, Website Performance und digitalen Projekten von Zora Web Design in Wien."
  />

  <meta
    name="twitter:image"
    content="https://www.zorawebdesign.com/images/meet-700.webp"
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

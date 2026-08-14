<script>
  import "$lib/styles/blog-archive.css";
  import { blogPostsEn } from "$lib/content/blog-en.js";

  const posts = Object.values(blogPostsEn);
</script>

<svelte:head>
  <title>Web Design Blog | WordPress & SEO Guides | Zora Web Design</title>

  <meta
    name="description"
    content="Articles and practical guides about web design, WordPress, SEO, website performance and digital projects from Zora Web Design in Vienna."
  />

  <meta name="robots" content="index, follow" />
  <meta name="author" content="Julius Timgum" />
  <meta name="publisher" content="Zora Web Design" />

  <link rel="canonical" href="https://www.zorawebdesign.com/en-2/blog/" />

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

  <meta property="og:url" content="https://www.zorawebdesign.com/en-2/blog/" />

  <meta
    property="og:title"
    content="Web Design Blog | WordPress & SEO Guides | Zora Web Design"
  />

  <meta
    property="og:description"
    content="Articles and practical guides about web design, WordPress, SEO, website performance and digital projects from Zora Web Design in Vienna."
  />

  <meta
    property="og:image"
    content="https://www.zorawebdesign.com/images/meet-700.webp"
  />

  <meta property="og:locale" content="en_GB" />

  <meta name="twitter:card" content="summary_large_image" />

  <meta
    name="twitter:title"
    content="Web Design Blog | WordPress & SEO Guides | Zora Web Design"
  />

  <meta
    name="twitter:description"
    content="Articles and practical guides about web design, WordPress, SEO, website performance and digital projects from Zora Web Design in Vienna."
  />

  <meta
    name="twitter:image"
    content="https://www.zorawebdesign.com/images/meet-700.webp"
  />
</svelte:head>

<main class="blog-archive">
  <div class="blog-archive-shell">
    <div class="blog-topbar">
      <a href="/en-2/" class="blog-back-link"> ← BACK TO HOMEPAGE </a>

      <a href="/blog/" class="blog-language-link"> GERMAN </a>
    </div>

    <header class="blog-archive-header">
      <h1>Blog</h1>
    </header>

    <div class="blog-archive-list">
      {#each posts as post}
        <article class="blog-archive-item">
          <div class="blog-archive-copy">
            <h2>
              <a href={`/en-2/blog/${post.slug}/`}>
                {post.title}
              </a>
            </h2>

            <div class="blog-archive-meta" aria-label="Article information">
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
                  {post.readingTime} MIN READ
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

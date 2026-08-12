<script>
  import "$lib/styles/blog-article.css";

  let { post } = $props();
</script>

<svelte:head>
  <title>{post.title} | Zora Web Design</title>
  <meta name="description" content={post.description} />
</svelte:head>

<main class="blog-article">
  <div class="blog-article-shell">
    <!-- =====================================================
         TOP BAR
    ====================================================== -->

    <div class="blog-article-topbar">
      <a
        href={post.language === "en" ? "/en-2/blog/" : "/blog/"}
        class="blog-article-back"
      >
        ← BACK TO BLOG
      </a>

      <a
        href={post.language === "en" ? "/blog/" : "/en-2/blog/"}
        class="blog-article-language"
      >
        {post.language === "en" ? "GERMAN" : "ENGLISH"}
      </a>
    </div>

    <!-- =====================================================
         BREADCRUMB
    ====================================================== -->

    <nav
      class="blog-breadcrumb"
      aria-label={post.language === "de"
        ? "Breadcrumb-Navigation"
        : "Breadcrumb"}
    >
      <a href={post.language === "en" ? "/en-2/" : "/"}>
        {post.language === "en" ? "HOME" : "STARTSEITE"}
      </a>

      <span aria-hidden="true">/</span>

      <a href={post.language === "en" ? "/en-2/blog/" : "/blog/"}> BLOG </a>

      <span aria-hidden="true">/</span>

      <span class="blog-breadcrumb-current" aria-current="page">
        {post.title}
      </span>
    </nav>

    <!-- =====================================================
         ARTICLE
    ====================================================== -->

    <article class="blog-article-card">
      <!-- ARTICLE HEADER -->

      <header class="blog-article-header">
        <div
          class="blog-article-meta"
          aria-label={post.language === "de"
            ? "Artikelinformationen"
            : "Article information"}
        >
          {#if post.published}
            <span>
              {post.language === "de" ? "Veröffentlicht" : "Published"}
              {post.published}
            </span>
          {/if}

          {#if post.author}
            <span aria-hidden="true">·</span>
            <span>{post.author}</span>
          {/if}

          {#if post.readingTime}
            <span aria-hidden="true">·</span>
            <span>
              {post.readingTime}
              {post.language === "de" ? " Min. Lesezeit" : " min read"}
            </span>
          {/if}
        </div>

        <h1>{post.title}</h1>

        {#if post.description}
          <p class="blog-article-description">
            {post.description}
          </p>
        {/if}
      </header>

      <!-- FEATURED IMAGE -->

      {#if post.image}
        <div class="blog-article-image">
          <img src={post.image} alt={post.imageAlt || ""} />
        </div>
      {/if}

      <!-- ===================================================
           ARTICLE BODY
           Sidebar will appear here once post.toc is added.
      ==================================================== -->

      <div class="blog-article-body">
        {#if post.toc?.length}
          <aside class="blog-article-toc">
            <p class="blog-article-toc-title">
              {post.language === "en" ? "IN THIS ARTICLE" : "IN DIESEM ARTIKEL"}
            </p>

            <nav
              aria-label={post.language === "en"
                ? "Article contents"
                : "Artikelinhalt"}
            >
              {#each post.toc as item, index}
                <a href={`#${item.id}`}>
                  <span class="blog-article-toc-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span class="blog-article-toc-label">
                    {item.label}
                  </span>
                </a>
              {/each}
            </nav>
          </aside>
        {/if}

        <div class="blog-article-content">
          {@html post.content}
        </div>
      </div>
    </article>
  </div>
</main>

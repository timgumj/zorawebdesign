<script>
  import "$lib/styles/blog-archive.css";
  import { blogPostsEn } from "$lib/content/blog-en.js";

  const posts = Object.values(blogPostsEn);
</script>

<svelte:head>
  <title>Blog | Zora Web Design</title>
  <meta
    name="description"
    content="Articles and guides about web design, websites, and digital projects from Zora Web Design."
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

            {#if post.description}
              <p>{post.description}</p>
            {/if}
          </div>

          {#if post.image}
            <div class="blog-archive-image">
              <img src={post.image} alt={post.imageAlt || ""} loading="lazy" />
            </div>
          {/if}
        </article>
      {/each}
    </div>
  </div>
</main>

import { blogPosts } from "$lib/content/blog.js";
import { blogPostsDe } from "$lib/content/blog-de.js";
import { blogPostsEn } from "$lib/content/blog-en.js";

export const prerender = true;

export function GET() {
  const staticPages = [
    "",
    "en-2/",
    "website-konfigurator/",
    "en-2/website-configurator/",
    "website-audit/",
    "en-2/website-audit/",
    "blog/",
    "en-2/blog/",
    "impressum/",
  ];

  // Existing technical/tutorial blog posts.
  const legacyBlogPages = Object.values(blogPosts).map(
    (post) => `${post.slug}/`,
  );

  // German blog articles.
  const germanBlogPages = Object.values(blogPostsDe).map(
    (post) => `blog/${post.slug}/`,
  );

  // English blog articles.
  const englishBlogPages = Object.values(blogPostsEn).map(
    (post) => `en-2/blog/${post.slug}/`,
  );

  const pages = [
    ...staticPages,
    ...legacyBlogPages,
    ...germanBlogPages,
    ...englishBlogPages,
  ];

  // Updated whenever npm run build is executed.
  const buildDate = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    const loc = page
      ? `https://zorawebdesign.com/${page}`
      : "https://zorawebdesign.com/";

    let priority = "0.7";
    let changefreq = "monthly";

    if (page === "") {
      priority = "1.0";
    } else if (page === "en-2/") {
      priority = "0.9";
    } else if (page === "blog/" || page === "en-2/blog/") {
      priority = "0.8";
      changefreq = "weekly";
    } else if (
      page.includes("website-audit") ||
      page.includes("website-konfigurator") ||
      page.includes("website-configurator")
    ) {
      priority = "0.8";
    } else if (page === "impressum/") {
      priority = "0.3";
    }

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
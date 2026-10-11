import { blogPosts } from "$lib/content/blog.js";
import { blogPostsDe } from "$lib/content/blog-de.js";
import { blogPostsEn } from "$lib/content/blog-en.js";

export const prerender = true;

// Confirmed content and internal-link updates, not build or layout changes.
const pageModificationDates = {
  "": "2026-10-11",
  "en-2/": "2026-10-11",
  "webdesign/": "2026-10-11",
  "seo-performance/": "2026-10-11",
  "webshop/": "2026-10-11",
  "webentwicklung/": "2026-10-11",
  "website-wartung/": "2026-10-11",
  "webhosting/": "2026-10-11",
  "en-2/web-design/": "2026-10-11",
  "en-2/seo-performance/": "2026-10-11",
  "en-2/e-commerce/": "2026-10-11",
  "en-2/web-development/": "2026-10-11",
  "en-2/website-maintenance/": "2026-10-11",
  "en-2/website-hosting/": "2026-10-11",
  "webdesign/salzburg/": "2026-10-11",
  "webdesign/graz/": "2026-10-11",
  "webdesign/muenchen/": "2026-10-11",
  "en-2/web-design/salzburg/": "2026-10-11",
  "en-2/web-design/graz/": "2026-10-11",
  "en-2/web-design/munich/": "2026-10-11",
};

export function GET() {
  const staticPages = [
    "",
    "en-2/",
    "website-konfigurator/",
    "en-2/website-configurator/",
    "website-audit/",
    "en-2/website-audit/",
    "webdesign/",
    "seo-performance/",
    "webshop/",
    "webentwicklung/",
    "website-wartung/",
    "webhosting/",
    "en-2/web-design/",
    "en-2/seo-performance/",
    "en-2/e-commerce/",
    "en-2/web-development/",
    "en-2/website-maintenance/",
    "en-2/website-hosting/",
    "webdesign/salzburg/",
    "webdesign/graz/",
    "webdesign/muenchen/",
    "en-2/web-design/salzburg/",
    "en-2/web-design/graz/",
    "en-2/web-design/munich/",
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
    ...new Set([
      ...staticPages,
      ...legacyBlogPages,
      ...germanBlogPages,
      ...englishBlogPages,
    ]),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    const loc = page
      ? `https://www.zorawebdesign.com/${page}`
      : "https://www.zorawebdesign.com/";
    const lastmod = pageModificationDates[page];

    return `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
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

import { blogPosts } from "$lib/content/blog.js";

export const prerender = true;

export function GET() {
  const staticPages = [
    "",
    "en-2/",
    "website-konfigurator/",
    "en-2/website-configurator/",
    "website-audit/",
    "en-2/website-audit/",
    "impressum/",
  ];

  const blogPages = Object.values(blogPosts).map(
    (post) => `${post.slug}/`,
  );

  const pages = [...staticPages, ...blogPages];

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

    if (page === "") {
      priority = "1.0";
    } else if (page === "en-2/") {
      priority = "0.9";
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
    <changefreq>monthly</changefreq>
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
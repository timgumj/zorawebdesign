import { error } from "@sveltejs/kit";
import { blogPostsDe } from "$lib/content/blog-de.js";

export const prerender = true;

export function entries() {
  return Object.keys(blogPostsDe).map((slug) => ({ slug }));
}

export function load({ params }) {
  const post = blogPostsDe[params.slug];

  if (!post) {
    throw error(404, "Post not found");
  }

  return {
    post,
  };
}
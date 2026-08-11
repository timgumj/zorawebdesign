import { error } from "@sveltejs/kit";
import { blogPosts } from "$lib/content/blog.js";

export const prerender = true;

export function entries() {
  // This tells SvelteKit to generate a page for every key in your blogPosts object
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export function load({ params }) {
  const post = blogPosts[params.slug];

  if (!post) {
    throw error(404, "Post not found");
  }

  return {
    post,
  };
}
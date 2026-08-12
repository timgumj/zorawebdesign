import { error } from "@sveltejs/kit";
import { blogPostsEn } from "$lib/content/blog-en.js";

export const prerender = true;

export function entries() {
  return Object.keys(blogPostsEn).map((slug) => ({ slug }));
}

export function load({ params }) {
  const post = blogPostsEn[params.slug];

  if (!post) {
    throw error(404, "Post not found");
  }

  return {
    post,
  };
}
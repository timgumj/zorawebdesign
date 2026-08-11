import { error } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
    // 1. Language logic (kept as you had it)
    const lang = event.url.pathname.startsWith("/en-2") ? "en" : "de";

    // 2. Resolve the page
    const response = await resolve(event, {
        transformPageChunk: ({ html }) => html.replace("%lang%", lang),
    });

    // 3. SEO Cleanup: Detect if the page is missing
    // If the path is not one of your valid routes, force a 404 status
    // Add your list of "live" base paths here
    const validPaths = ['/', '/en-2', '/impressum', '/blog'];
    const isBlog = event.url.pathname.startsWith('/blog/');
    const isProject = event.url.pathname.startsWith('/project/');

    // If the page doesn't exist (status 404) and it's not a valid internal route,
    // ensure we aren't sending a "soft" 200 OK
    if (response.status === 404 && !isBlog && !isProject && !validPaths.includes(event.url.pathname)) {
        return new Response('Not Found', { status: 404 });
    }

    return response;
}
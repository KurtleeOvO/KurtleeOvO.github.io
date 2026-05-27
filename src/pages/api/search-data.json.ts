import { getSortedPosts } from "@utils/content-utils";
import { url } from "@utils/url-utils";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	const posts = await getSortedPosts();
	const data = posts.map((post) => ({
		title: post.data.title,
		description: post.data.description || "",
		tags: post.data.tags || [],
		url: url(`/posts/${post.slug}/`),
	}));
	return new Response(JSON.stringify(data), {
		headers: { "Content-Type": "application/json; charset=utf-8" },
	});
};

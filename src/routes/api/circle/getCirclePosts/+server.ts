import { get } from 'svelte/store';
import { getCirclePosts } from '../../../../stores'
import { authFlow } from '../../../../functions/auth'
import { error } from '@sveltejs/kit';

const GetCirclePosts = get(getCirclePosts);

/** @type {import('./$types').Load} */
export async function GET({ request, fetch, cookies, url }) {
	const auth = await authFlow(request.headers.get('cookie'), fetch);

	if (!auth) {
		throw error(401, 'Not authorised');
	}

  const iterations: number = url.searchParams.get("iterations")
  const circleUUID: UUID = url.searchParams.get("uuid")

	const posts = await GetCirclePosts.getPosts(circleUUID, auth.uuid, iterations)

	if (!posts) {
		throw error(500, 'There has been an error while retrieving posts from this circle. Please try again later, and if this issue persists please email me at jaddalkwork@gmail.com')
	}

	cookies.set('key', auth.newKey, {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});

	return new Response(JSON.stringify({ data: posts }));
}
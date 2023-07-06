import { get } from 'svelte/store';
import { circle } from '../../../../stores'
import { authFlow } from '../../../../functions/auth'
import { user } from '../../../../stores';
import { error } from '@sveltejs/kit';

const User = get(user);
const Circle = get(circle);

/** @type {import('./$types').Load} */
export async function GET({ request, fetch, cookies, url }) {
	const auth = await authFlow(request.headers.get('cookie'), fetch);

	if (!auth) {
		throw error(401, 'Not authorised');
	}

  const user: UUID = url.searchParams.get("uuid")

	const circles = await Circle.getUserCircles(user, auth.uuid)

	if (!circles) {
		throw error(500, 'There has been an error while retrieving this user\'s circles. Please try again later, and if this issue persists please email me at jaddalkwork@gmail.com')
	}

	cookies.set('key', auth.newKey, {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});

	return new Response(JSON.stringify({ data: circles }));
}
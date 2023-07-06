import { get } from 'svelte/store';
import { circle } from '../../../../stores'
import { authFlow } from '../../../../functions/auth'
import { error } from '@sveltejs/kit';

const Circle = get(circle);

/** @type {import('./$types').Load} */
export async function GET({ request, fetch, cookies, url }) {
	const auth = await authFlow(request.headers.get('cookie'), fetch);

	if (!auth) {
		throw error(401, 'Not authorised');
	}

  const uuid: UUID = url.searchParams.get("uuid")

	const req = await request.json()
	const circle = await Circle.getCircle(uuid, auth.uuid)

	if (!circle) {
		throw error(500, 'There has been an error while retrieving this circle. Please try again later, and if this issue persists please email me at jaddalkwork@gmail.com')
	}

	cookies.set('key', auth.newKey, {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});

	return new Response(JSON.stringify({ data: circle }));
}
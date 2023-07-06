import { get } from 'svelte/store';
import { deleteCircle } from '../../../../stores'
import { authFlow } from '../../../../functions/auth'
import { error } from '@sveltejs/kit';

const DeleteCircle = get(deleteCircle);

/** @type {import('./$types').Load} */
export async function POST({ request, fetch, cookies }) {
	const auth = await authFlow(request.headers.get('cookie'), fetch);

	if (!auth) {
		throw error(401, 'Not authorised');
	}

	const req = await request.json()
	const circle = await DeleteCircle.deleteCircle(req.circleUUID, auth.uuid)

	if (!circle) {
		throw error(500, 'There has been an error whilst deleting this circle. Please try again later, and if this issue persists please email me at jaddalkwork@gmail.com')
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
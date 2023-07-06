import { get } from 'svelte/store';
import { moderator } from '../../../../../../stores'
import { authFlow } from '../../../../../../functions/auth'
import { error } from '@sveltejs/kit';

const Moderator = get(moderator);

/** @type {import('./$types').Load} */
export async function POST({ request, fetch, cookies }) {
	const auth = await authFlow(request.headers.get('cookie'), fetch);

	if (!auth) {
		throw error(401, 'Not authorised');
	}

	const req = await request.json()
	const moderator = await Moderator.promoteModerator(req.circleUUID, req.userUUID, auth.uuid)

	if (!moderator) {
		throw error(500, 'There has been an error whilst promoting this moderator. Please try again later, and if this issue persists please email me at jaddalkwork@gmail.com')
	}

	cookies.set('key', auth.newKey, {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});

	return new Response(JSON.stringify({ data: moderator }));
}
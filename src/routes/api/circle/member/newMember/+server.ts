import { get } from 'svelte/store';
import { newMember } from '../../../../../stores'
import { authFlow } from '../../../../../functions/auth'
import { error } from '@sveltejs/kit';

const NewMember = get(newMember);

/** @type {import('./$types').Load} */
export async function POST({ request, fetch, cookies }) {
	const auth = await authFlow(request.headers.get('cookie'), fetch);

	if (!auth) {
		throw error(401, 'Not authorised');
	}

	const req = await request.json()
	const member = await NewMember.newMember(req.circleUUID, auth.uuid)

	if (!member) {
		throw error(500, 'There has been an error whilst joining this circle. Please try again later, and if this issue persists please email me at jaddalkwork@gmail.com')
	}

	cookies.set('key', auth.newKey, {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});

	return new Response(JSON.stringify({ data: member }));
}
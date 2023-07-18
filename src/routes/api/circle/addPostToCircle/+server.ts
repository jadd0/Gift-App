import { get } from 'svelte/store';
import { addPostToCircle } from '../../../../stores'
import { authFlow } from '../../../../functions/auth'
import { user } from '../../../../stores';
import { error } from '@sveltejs/kit';

const AddPostToCircle = get(addPostToCircle);

/** @type {import('./$types').Load} */
export async function POST({ request, fetch, cookies }) {
	const auth = await authFlow(request.headers.get('cookie'), fetch);

	if (!auth) {
		throw error(401, 'Not authorised');
	}

	const req = await request.json()
	const post = await AddPostToCircle.add(req.circleUUID, auth.uuid, {...req.post})

	if (!post) {
		throw error(500, 'There has been an error while creating this post. Please try again later, and if this issue persists please email me at jaddalkwork@gmail.com')
	}

	cookies.set('key', auth.newKey, {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});

	return new Response(JSON.stringify({ data: post }));
}
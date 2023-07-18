import { get } from 'svelte/store';
import { comment } from '../../../../../stores'
import { authFlow } from '../../../../../functions/auth'
import { error } from '@sveltejs/kit';

const Comment = get(comment);

/** @type {import('./$types').Load} */
export async function POST({ request, fetch, cookies }) {
	const auth = await authFlow(request.headers.get('cookie'), fetch);

	if (!auth) {
		throw error(401, 'Not authorised');
	}

	const req = await request.json()
	const res = await Comment.postComment(req.postUUID, auth.uuid, req.body)

	if (!res) {
		throw error(500, 'There has been an error whilst posting this comment. Please try again later, and if this issue persists please email me at jaddalkwork@gmail.com')
	}

	cookies.set('key', auth.newKey, {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});

	return new Response(JSON.stringify({ data: res }));
}
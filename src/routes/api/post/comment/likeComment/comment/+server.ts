import { get } from 'svelte/store';
import { likeComment } from '../../../../../../stores'
import { authFlow } from '../../../../../../functions/auth'
import { error } from '@sveltejs/kit';

const LikeComment = get(likeComment);

/** @type {import('./$types').Load} */
export async function POST({ request, fetch, cookies }) {
	const auth = await authFlow(request.headers.get('cookie'), fetch);

	if (!auth) {
		throw error(401, 'Not authorised');
	}

	const req = await request.json()
	const res = await LikeComment.likeComment(req.postUUID, auth.uuid, req.commentUUID)

	if (!res) {
		throw error(500, 'There has been an error whilst liking this comment. Please try again later, and if this issue persists please email me at jaddalkwork@gmail.com')
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
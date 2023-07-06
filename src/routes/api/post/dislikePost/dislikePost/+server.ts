import { get } from 'svelte/store';
import { dislikePost } from '../../../../../stores'
import { authFlow } from '../../../../../functions/auth'
import { error } from '@sveltejs/kit';

const DislikePost = get(dislikePost);

/** @type {import('./$types').Load} */
export async function POST({ request, fetch, cookies }) {
	const auth = await authFlow(request.headers.get('cookie'), fetch);

	if (!auth) {
		throw error(401, 'Not authorised');
	}

	const req = await request.json()

  const undislike = await fetch('/api/post/likePost/unlikePost', {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postUUID: req.postUUID,
      userUUID: auth.userUUID
    }),
  })

	const res = await DislikePost.dislikePost(req.postUUID, auth.uuid)

	if (!res) {
		throw error(500, 'There has been an error whilst disliking this post. Please try again later, and if this issue persists please email me at jaddalkwork@gmail.com')
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
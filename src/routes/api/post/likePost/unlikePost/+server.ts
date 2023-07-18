import { get } from 'svelte/store';
import { likePost } from '../../../../../stores'
import { authFlow } from '../../../../../functions/auth'
import { error } from '@sveltejs/kit';

const LikePost = get(likePost);

/** @type {import('./$types').Load} */
export async function POST({ request, fetch, cookies }) {
  const req = await request.json()
  let auth
  
  if (!req.userUUID) {
    auth = await authFlow(request.headers.get('cookie'), fetch);

    if (!auth) {
      throw error(401, 'Not authorised');
    }
  }
	
	const res = await LikePost.deleteLike(req.postUUID, auth.uuid || req.userUUID)

	if (!res) {
		throw error(500, 'There has been an error whilst unliking this post. Please try again later, and if this issue persists please email me at jaddalkwork@gmail.com')
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
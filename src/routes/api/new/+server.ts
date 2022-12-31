import { user } from '../../../stores'
import { get } from 'svelte/store';

const User = get(user)


export const GET: any = async ({ request }) => {
	
  await User.unfollow({username: 'jadd', userToUnfollow: 'john'})

	return new Response('hello');
}
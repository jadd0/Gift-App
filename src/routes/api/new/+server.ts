import { circlesClass } from '../../../stores'
import { get } from 'svelte/store';

const Circles = get(circlesClass);


export const GET: any = async ({ request }) => {
	
  await Circles.createCircle({ 
    username: 'jadd',
    name: 'Jadd\'s Circle',
   })

	return new Response('hello');
}
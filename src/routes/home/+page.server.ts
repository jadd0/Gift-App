
import { error, redirect } from "@sveltejs/kit";
import { db, auth } from '../../stores'
import { get } from 'svelte/store';

const DB = get(db)
const Auth = get(auth)

/** @type {import('./$types').Load} */
export const load: any = async ({ request }) => {
  const cookie = Auth.Parse.parseCookie(request.headers.get("cookie"));
  console.log(cookie)
	if (cookie.key == undefined) {
		throw redirect(307, "/login");
	}

	const auth = await Auth.checkKey(cookie.key)
  console.log(auth)
	if (!auth) {
		throw redirect(307, "/login");
	}

	return {
		username: auth
	}
}
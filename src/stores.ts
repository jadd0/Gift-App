import { writable } from 'svelte/store';
import { get } from 'svelte/store';

import { supabase } from './supabaseClient';
import bcryptjs from 'bcryptjs';

import { DB } from './classes/db';
import { Auth } from './classes/auth';
import { Parse } from './classes/parse';
import { User } from './classes/user';
import { Circles } from './classes/circles';

// INIT

const dbObj = new DB(supabase);
const authObj = new Auth(new Parse(), bcryptjs, supabase);
const userObj = new User(supabase);
const circlesObj = new Circles(supabase);

// OBJECTS

export const db = writable(dbObj);
export const auth = writable(authObj);
export const user = writable(userObj);
export const circlesClass = writable(circlesObj);

// ARRAYS

// const usersList = await dbObj.getAllValues('Users');
// export const users = writable(usersList);

// const circlesList = await dbObj.getAllValues('Circles');
// export const circles = writable(circlesList);

// const likesDislikesList = await dbObj.getAllValues('CircleLikesAndDislikes');
// export const likesAndDislikes = writable(likesDislikesList);

// const commentsList = await dbObj.getAllValues('CircleComments');
// export const comments = writable(commentsList);

// const followingList = await dbObj.getAllValues('Following');
// export const following = writable(followingList);

// const circleMembersList = await dbObj.getAllValues('CircleMembers');
// export const circleMembers = writable(usersList);

// const contentList = await dbObj.getAllValues('CircleContent');
// export const circleContent = writable(contentList);

// // SUBSCRIPTIONS
// // TODO change so special for delete, make universal function?

// const table = [
// 	'CircleComments',
// 	'CircleContent',
// 	'CircleLikesAndDislikes',
// 	'Circles',
// 	'CircleMembers',
// 	'Users',
// 	'Following',
// ];
// type Table = typeof table[number];

// function insertSupa(config: { table: Table; data: any }) {
// 	const { table, data } = config;

// 	let localTable = get();
// 	const userIndex = localUsers.findIndex(
// 		(user: any) => user.uuid === payload.new.uuid
// 	);

// 	if (userIndex == -1) {
// 		localUsers.push(payload.new);
// 	} else {
// 		localUsers[userIndex] = payload.new;
// 	}

// 	users.set(localUsers);
// }

// function updateSupa(config: { table: Table; data: any }) {
// 	const { table, data } = config;
// }

// function deleteSupa(config: { table: Table; data: any }) {
// 	const { table, data } = config;
// }

// supabase
// 	.channel('*')
// 	.on('postgres_changes', { event: '*', schema: '*' }, (payload) => {
// 		switch (payload.eventType) {
// 			case 'INSERT': {
// 				insertSupa({ table: payload.table, data: payload.new });
// 				break;
// 			}
// 			case 'UPDATE': {
// 				updateSupa({ table: payload.table, data: payload.new });
// 				break;
// 			}
// 			case 'DELETE': {
// 				deleteSupa({ table: payload.table, data: payload.new });
// 				break;
// 			}
// 		}
// 	})
// 	.subscribe();

// // supabase
// // 	.channel('*')
// // 	.on(
// // 		'postgres_changes',
// // 		{ event: 'INSERT', schema: '*', table: '*' },
// // 		(payload) => {
// // 			console.log(payload, '1')
// // 			// let localUsers = get(users);
// // 			// const userIndex = localUsers.findIndex(
// // 			// 	(user: any) => user.uuid === payload.new.uuid
// // 			// );

// // 			// if (userIndex == -1) {
// // 			// 	localUsers.push(payload.new);
// // 			// } else {
// // 			// 	localUsers[userIndex] = payload.new;
// // 			// }

// // 			// users.set(localUsers);
// // 		}
// // 	)
// // 	.subscribe();

// // supabase
// // 	.channel('*')
// // 	.on(
// // 		'postgres_changes',
// // 		{ event: 'UPDATE', schema: '*', table: '*' },
// // 		(payload) => {
// // 			console.log(payload, '2')
// // 		}
// // 	)
// // 	.subscribe();

// // supabase
// // 	.channel('*')
// // 	.on(
// // 		'postgres_changes',
// // 		{ event: 'DELETE', schema: '*', table: '*' },
// // 		(payload) => {
// // 			console.log(payload, '3')
// // 		}
// // 	)
// // 	.subscribe();

// // TODO this for all tables

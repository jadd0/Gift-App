import { writable } from 'svelte/store';
import { get } from 'svelte/store';

import { supabase } from './supabaseClient';
import bcryptjs from 'bcryptjs';

import { DB } from './classes/db';
import { Auth } from './classes/user/auth';
import { Parse } from './classes/parse';
import { User } from './classes/user/user';

import { Circle } from './classes/circle/circle';
import { AddPostToCircle } from './classes/circle/addPostToCircle';
import { DeleteCircle } from './classes/circle/deleteCircle';
import { GetCirclePosts } from './classes/circle/getCirclePosts';
import { MakeCircle } from './classes/circle/makeCircle';
import { Moderator } from './classes/circle/member/moderator';
import { NewMember } from './classes/circle/member/newMember';
import { RemoveMember } from './classes/circle/member/removeMember';

import { Post } from './classes/post/post';
import { DeletePost } from './classes/post/deletePost';
import { DislikePost } from './classes/post/likeDislike/dislikePost';
import { LikePost } from './classes/post/likeDislike/likePost';
import { Comment } from './classes/post/comment/comment';
import { DislikeComment } from './classes/post/comment/dislikeComment';
import { LikeComment } from './classes/post/comment/likeComment';
import { CommentReply } from './classes/post/commentReply/commentReply';
import { LikeCommentReply } from './classes/post/commentReply/likeCommentReply';
import { DislikeCommentReply } from './classes/post/commentReply/dislikeCommentReply';

// INIT

const dbObj = new DB(supabase);
const authObj = new Auth(new Parse(), bcryptjs, supabase);
const userObj = new User(supabase);

const circleObj = new Circle(supabase)
const addPostToCircleObj = new AddPostToCircle(supabase)
const deleteCircleObj = new DeleteCircle(supabase)
const getCirclePostsObj = new GetCirclePosts(supabase)
const makeCircleObj = new MakeCircle(supabase)
const moderatorObj = new Moderator(supabase)
const newMemberObj = new NewMember(supabase)
const removeMemberObj = new RemoveMember(supabase)

const postObj = new Post(supabase)
const deletePostObj = new DeletePost(supabase)
const dislikePostObj = new DislikePost(supabase)
const likePostObj = new LikePost(supabase)
const commentObj = new Comment(supabase)
const dislikeCommentObj = new DislikeComment(supabase)
const likeCommentObj = new LikeComment(supabase)
const commentReplyObj = new CommentReply(supabase)
const likeCommentReplyObj = new LikeCommentReply(supabase)
const dislikeCommentReplyObj = new DislikeCommentReply(supabase)

// OBJECTS

export const db = writable(dbObj);
export const auth = writable(authObj);
export const user = writable(userObj);

export const circle = writable(circleObj)
export const addPostToCircle = writable(addPostToCircleObj)
export const deleteCircle = writable(deleteCircleObj)
export const getCirclePosts = writable(getCirclePostsObj)
export const makeCircle = writable(makeCircleObj)
export const moderator = writable(moderatorObj)
export const newMember = writable(newMemberObj)
export const removeMember = writable(removeMemberObj)

export const post = writable(postObj)
export const deletePost = writable(deletePostObj)
export const dislikePost = writable(dislikePostObj)
export const likePost = writable(likePostObj)
export const comment = writable(commentObj)
export const dislikeComment = writable(dislikeCommentObj)
export const likeComment = writable(likeCommentObj)
export const commentReply = writable(commentReplyObj)
export const likeCommentReply = writable(likeCommentReplyObj)
export const dislikeCommentReply = writable(dislikeCommentReplyObj)

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
// // 			
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
// // 			
// // 		}
// // 	)
// // 	.subscribe();

// // supabase
// // 	.channel('*')
// // 	.on(
// // 		'postgres_changes',
// // 		{ event: 'DELETE', schema: '*', table: '*' },
// // 		(payload) => {
// // 			
// // 		}
// // 	)
// // 	.subscribe();

// // TODO this for all tables

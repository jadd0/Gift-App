import { DB } from './db';

export class User extends DB {
	constructor(supabase: any) {
		super(supabase);
	}

	async unfollow(config: { username: any; userToUnfollow: any }) {
		const { username, userToUnfollow } = config;

		const res = await this.deleteValue({
			table: 'Following',
			values: {
				username: username,
				followedUsername: userToUnfollow,
			},
		});

		if (res) return true;

		return false;
	}

	async follow(config: { username: any; userToFollow: any }) {
		const { username, userToFollow } = config;
		const user2 = await this.getValue({
			table: 'Users',
			value: { username: userToFollow },
		});

		if (!user2) {
			return false;
		}

		const followBool = !(await this.getValue({
			table: 'Following',
			value: { username: username, followedUsername: user2.username },
		}))
			? false
			: true;

		if (followBool) {
			return false;
		}

		const err = await this.newValue({
			table: 'Following',
			values: {
				username: username,
				followedUsername: user2.username,
			},
		});

		if (err) return true;

		return false;
	}
}

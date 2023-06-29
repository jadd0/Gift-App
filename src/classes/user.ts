import { DB } from './db';

export class User extends DB {
	constructor(supabase: any) {
		super(supabase);
	}

	async getAllUsernames() {
		const { data, e } = await this.supabase.from('Users').select('username');

		return data;
	}

	async getAllUsers() {
		const { data, error } = await this.supabase.from('Users').select('*');

		return data;
	}

	async getUser(username: string) {
		const user = await this.getValue({
			table: 'Users',
			value: {
				username: username
			}
		})

		if (!user) return false;
		return user;
	}

	async changePassword(username: string, password: string): Promise<boolean> {
		{
			const { data, error } = await this.supabase
				.from('Users')
				.update({ password })
				.match({ username });

			if (error == undefined) return true;
			return false;
		}
	}

	async checkFollowing(username: string, followedUsername: string): Promise<boolean> {
		const res = await this.getValue({
			table: 'Following',
			value: {
				username,
				followedUsername
			}
		})

		if (!res) return false
		return true
	}

	async follow(username: string, followedUsername: string): Promise<boolean> {
		if (await this.checkFollowing(username, followedUsername)) return false
		const res = await this.newValue({
			table: 'Following',
			values: {
				username,
				followedUsername
			}
		})

		if (!res) return false
		return true
	}

	async unfollow(username: string, followedUsername: string): Promise<boolean> {
		if (!await this.checkFollowing(username, followedUsername)) return false

		const res = await this.deleteValue({
			table: 'Following',
			values: {
				username,
				followedUsername
			}
		})

		if (!res) return false
		return true
	}	

	async getFollowed(followedUsername: string) {
		const { data, error } = await this.supabase
			.from('Following')
			.select('*')
			.eq('followedUsername', followedUsername) 

		if (error != undefined) return false;
		return data;
	}

	async getFollowing(username: string) {
		const { data, error } = await this.supabase
			.from('Following')
			.select('*')
			.eq('username', username) 

		if (error != undefined) return false;
		return data;
	}
}
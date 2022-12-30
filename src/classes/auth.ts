import { DB } from './db';

export class Auth extends DB {
	Parse: any;
  Bcrypt: any;
	constructor(Parse: any, Bcrypt: any, supabase: any) {
		super(supabase);
		this.Parse = Parse;
    this.Bcrypt = Bcrypt;
	}

	async signUp(userDetails: {
		username: string;
		email: string;
		password: string;
		name: string;
	}) {
		const result = await this.checkAvailability(
			userDetails.username,
			userDetails.email
		);

		if (!result) {
			return false;
		}

    const res = await this.newValue({ table: 'Users', values: userDetails })

		if (res) {
			return true;
		}

		return false;
	}

	// async logout(username) {
	// 	const { data, error } = await this.supabase
	// 		.from('users')
	// 		.update({ key: '' })
	// 		.match({ username: username });

	// 	if (error != undefined) return false;
	// 	return true;
	// }

	async checkAvailability(username: string, email: string) {
		const userList = await this.getAllValues('Users')

		const usernameAvailability = userList.find(
			(user: any) => user.username === username.toLowerCase()
		);

		const emailAvailability = userList.find(
			(user: any) => user.email === email.toLowerCase()
		);

		//true if undefined, false otherwise
		const userBool = usernameAvailability == undefined;
		const emailBool = emailAvailability == undefined;

		if (!userBool || !emailBool) return false;

		return true;
	}

	async comparePassword(plaintextPassword: string, hash: string) {
		const result = await this.Bcrypt.compare(plaintextPassword, hash);
		return result;
	}

	async authenticate(username: string, password: string) {
		if (password == undefined) return false;

		const user = await this.getValue({
      table: 'Users',
      column: 'username',
      value: username
    });

    if (!user) return false;

		const res = await this.comparePassword(password, user.password);
		if (!res) return false;
		return user.username;
	}

	checkDate(expiry: any) {
		const dateNow = new Date().getTime();

		if (dateNow >= expiry) return false;
		return true;
	}

	async checkKey(token: string) {
		const splitToken = token.split('.');
		const date = splitToken[0];

		const res = this.checkDate(date);
		if (!res) return false;

    const data = await this.getValue({
      table: 'Users',
      column: 'authKey',
      value: token,
      returnValues: 'username'
    })

		if (data.length == 0) return false;
		return data[0];
	}
}

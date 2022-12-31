import { DB } from './db';

export class Auth extends DB {
	Parse: any;
  Bcrypt: any;

	constructor(Parse: any, Bcrypt: any, supabase: any) {
		super(supabase);
		this.Parse = Parse;
    this.Bcrypt = Bcrypt;
	}

	public async hashPassword(plaintextPassword: string) {
		const hash = await this.Bcrypt.hash(plaintextPassword, 10);
		return hash;
	}

	public async signUp(userDetails: {
		username: string;
		email: string;
		password: string;
		name: string;
	}) {
		// console.log(userDetails)
		const result = await this.checkAvailability(
			userDetails.username,
			userDetails.email
		);
		// console.log(result)

		if (!result) {
			return false;
		}

    const res = await this.newValue({ table: 'Users', values: userDetails })

		console.log(res)
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

	public async checkAvailability(username: string, email: string) {
		const userList = await this.getAllValues('Users')
		console.log(userList)
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

	public async comparePassword(plaintextPassword: string, hash: string) {
		const result = await this.Bcrypt.compare(plaintextPassword, hash);
		return result;
	}

	public async authenticate(username: string, password: string) {
		if (password == undefined) return false;

		const user = await this.getValue({
      table: 'Users',
      column: 'username',
      value: username
    });

		console.log(user)

    if (!user) return false;

		const res = await this.comparePassword(password, user.password);
		if (!res) return false;
		return user.username;
	}

	public checkDate(expiry: any) {
		const dateNow = new Date().getTime();

		if (dateNow >= expiry) return false;
		return true;
	}

	async changeKey(username: string, key: string) {
		console.log("ufdsxbfgs")
		const res = await this.updateValue({
			table: 'Users',
			valueToChange: key,
			columnToChange: 'authKey',
			valueToMatch: username,
			columnToMatch: 'username'
		 })

		 if (!res) return false
		 return true
	}

	public async checkKey(token: string) {
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

		if (data.length == 0 || data == false) return false;
		return true;
	}
}

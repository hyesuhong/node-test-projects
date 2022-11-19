interface ILogin {
	userId: string;
	password: string;
}

interface ISignup {
	userId: string;
	password: string;
	userName: string;
	email?: string;
	url?: string;
}

export default class AuthService {
	async login({ userId, password }: ILogin) {
		return {
			userId: 'ssu',
			token: 'abc1234',
		};
	}

	async isMe() {
		return {
			userId: 'ssu',
			token: 'abc1234',
		};
	}

	async logout() {
		return;
	}

	async signup({ userId, password, userName, email, url }: ISignup) {
		return {
			userId: 'ssu',
			token: 'abc1234',
		};
	}
}

import TokenStorage from '../db/token';
import { IHttpClient } from '../network/http';

interface ILogin {
	userId: string;
	password: string;
}

export interface ISignup extends ILogin {
	userName: string;
	email?: string;
	url?: string;
}

interface IAuthService {
	http: IHttpClient;
	tokenStorage: TokenStorage;
}

export default class AuthService implements IAuthService {
	readonly http: IHttpClient;
	readonly tokenStorage: TokenStorage;

	constructor(http: IHttpClient, tokenStorage: TokenStorage) {
		this.http = http;
		this.tokenStorage = tokenStorage;
	}

	async login({ userId, password }: ILogin) {
		const data = await this.http.fetch('/auth/signIn', {
			method: 'POST',
			body: JSON.stringify({ uid: userId, password }),
		});
		this.tokenStorage.saveToken(data.token);
		return data;
	}

	async isMe() {
		const token = this.tokenStorage.getToken();
		return this.http.fetch('/auth/me', {
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});
	}

	async logout() {
		this.tokenStorage.clearToken();
	}

	async signup({ userId, password, userName, email, url }: ISignup) {
		const data = await this.http.fetch('/auth/signUp', {
			method: 'POST',
			body: JSON.stringify({
				uid: userId,
				password,
				name: userName,
				email,
				url,
			}),
		});
		this.tokenStorage.saveToken(data.token);
		return data;
	}
}

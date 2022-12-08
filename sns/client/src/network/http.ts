import { AuthErrorEventBus } from '../context/AuthContext';

export interface IHttpClient {
	baseURL: string;
	authErrorEventBus: AuthErrorEventBus;
	fetch(url: string, options: IFetchOpt): Promise<any>;
}

interface IFetchOpt {
	method: string;
	body?: string;
	headers?: {
		[key: string]: string;
	};
}

export default class httpClient implements IHttpClient {
	readonly baseURL: string = '';
	readonly authErrorEventBus: AuthErrorEventBus;

	constructor(baseURL: string, authErrorEventBus: AuthErrorEventBus) {
		this.baseURL = baseURL;
		this.authErrorEventBus = authErrorEventBus;
	}

	async fetch(url: string, options: IFetchOpt) {
		const res = await fetch(`${this.baseURL}${url}`, {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...options.headers,
			},
		});

		let data;
		try {
			data = await res.json();
		} catch (error) {
			console.error(error);
		}

		if (res.status > 299 || res.status < 200) {
			const message =
				data && data.message ? data.message : 'Something wrong...';
			const error = new Error(message);
			if (res.status === 401) {
				this.authErrorEventBus.notify(error);
			}
			throw new Error(message);
		}
		return data;
	}
}

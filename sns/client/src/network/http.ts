export interface IHttpClient {
	baseURL: string;
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
	constructor(baseURL: string) {
		this.baseURL = baseURL;
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
			throw new Error(message);
		}
		return data;
	}
}

import TokenStorage from '../db/token';
import { IHttpClient } from '../network/http';
import SocketClass from '../network/socket';

export interface IPost {
	id: number;
	createdDate: string;
	msg: string;
	userId: number;
	uid: string;
	name: string;
	url?: string;
}

export default class PostService {
	readonly http: IHttpClient;
	readonly tokenStorage: TokenStorage;
	readonly socket: SocketClass;

	constructor(
		http: IHttpClient,
		tokenStorage: TokenStorage,
		socket: SocketClass
	) {
		this.http = http;
		this.tokenStorage = tokenStorage;
		this.socket = socket;
	}

	async getPosts(userId?: string) {
		const query = userId ? `?userId=${userId}` : '';
		return this.http.fetch(`/posts${query}`, {
			method: 'GET',
			headers: this.getHeaders(),
		});
	}

	async createPost(msg: string) {
		return this.http.fetch(`/posts`, {
			method: 'POST',
			headers: this.getHeaders(),
			body: JSON.stringify({ msg, userId: 'ssu', userName: 'Ssu' }),
		});
	}

	async updatePost(postId: number, msg: string) {
		return this.http.fetch(`/posts/${postId}`, {
			method: 'PUT',
			headers: this.getHeaders(),
			body: JSON.stringify({ msg }),
		});
	}

	async deletePost(postId: number) {
		return this.http.fetch(`/posts/${postId}`, {
			method: 'DELETE',
			headers: this.getHeaders(),
		});
	}

	getHeaders() {
		const token = this.tokenStorage.getToken();
		return {
			Authorization: `Bearer ${token}`,
		};
	}

	onSync(callback: (...args: any[]) => void) {
		return this.socket.onSync('post', callback);
	}
}

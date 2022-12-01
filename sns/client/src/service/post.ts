import { IHttpClient } from '../network/http';

export interface IPost {
	id: number;
	createdDate: string;
	msg: string;
	userId: string;
	userName: string;
	url?: string;
}

export default class PostService {
	readonly http: IHttpClient;

	/* posts: IPost[] = [
		{
			id: 1,
			msg: 'Dream Coding 👍',
			createdDate: '2022-11-17T23:19:57.000Z',
			userId: 'ellie',
			userName: 'Ellie',
			url: 'https://joeschmoe.io/api/v1/random',
		},
	]; */

	constructor(http: IHttpClient) {
		this.http = http;
	}

	async getPosts(userId?: string) {
		const query = userId ? `?userId=${userId}` : '';
		return this.http.fetch(`/posts${query}`, {
			method: 'GET',
		});
	}

	async createPost(msg: string) {
		return this.http.fetch(`/posts`, {
			method: 'POST',
			body: JSON.stringify({ msg, userId: 'ssu', userName: 'Ssu' }),
		});
	}

	async updatePost(postId: number, msg: string) {
		return this.http.fetch(`/posts/${postId}`, {
			method: 'PUT',
			body: JSON.stringify({ msg }),
		});
	}

	async deletePost(postId: number) {
		return this.http.fetch(`/posts/${postId}`, {
			method: 'DELETE',
		});
	}
}

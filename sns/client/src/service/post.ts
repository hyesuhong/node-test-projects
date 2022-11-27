export interface IPost {
	id: number;
	createdDate: string;
	msg: string;
	userId: string;
	userName: string;
	url?: string;
}

export default class PostService {
	readonly baseURL: string = '';

	// posts: IPost[] = [
	// 	{
	// 		id: 1,
	// 		msg: 'Dream Coding 👍',
	// 		createdDate: '2022-11-17T23:19:57.000Z',
	// 		userId: 'ellie',
	// 		userName: 'Ellie',
	// 		url: 'https://joeschmoe.io/api/v1/random',
	// 	},
	// ];

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	async getPosts(userId?: string) {
		const query = userId ? `?userId=${userId}` : '';
		const res = await fetch(`${this.baseURL}/posts${query}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await res.json();

		if (res.status !== 200) {
			throw new Error(data.message);
		}
		return data;
	}

	async createPost(msg: string) {
		// const post = {
		// 	id: Date.now(),
		// 	createdDate: new Date().toString(),
		// 	userId: 'ssu',
		// 	userName: 'Ssu',
		// 	msg,
		// };
		// this.posts.push(post);
		// return post;

		const res = await fetch(`${this.baseURL}/posts`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ msg, userId: 'ssu', userName: 'Ssu' }),
		});
		const data = await res.json();
		if (res.status !== 201) {
			throw new Error(data.message);
		}
		return data;
	}

	async updatePost(postId: number, msg: string) {
		// const post = this.posts.find((post) => post.id === postId);
		// if (!post) {
		// 	throw new Error('cannot find post :(');
		// }

		// post.msg = msg;
		// return post;

		const res = await fetch(`${this.baseURL}/posts/${postId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ msg }),
		});
		const data = await res.json();
		if (res.status !== 200) {
			throw new Error(data.message);
		}
		return data;
	}

	async deletePost(postId: number) {
		// this.posts = this.posts.filter((post) => post.id !== postId);

		const res = await fetch(`${this.baseURL}/posts/${postId}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		});

		if (res.status !== 204) {
			const data = await res.json();
			throw new Error(data.message);
		}
	}
}

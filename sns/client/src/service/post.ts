export interface IPost {
	id: number;
	createdDate: string;
	msg: string;
	userId: string;
	userName: string;
	url?: string;
}
export default class PostService {
	posts: IPost[] = [
		{
			id: 1,
			msg: 'Dream Coding 👍',
			createdDate: '2022-11-17T23:19:57.000Z',
			userId: 'ellie',
			userName: 'Ellie',
			url: 'https://joeschmoe.io/api/v1/random',
		},
	];

	constructor(baseURL?: string) {}

	async getPosts(userName: string) {
		return userName
			? this.posts.filter((post) => post.userId === userName)
			: this.posts;
	}

	async createPost(msg: string) {
		const post = {
			id: Date.now(),
			createdDate: new Date().toString(),
			userId: 'ssu',
			userName: 'Ssu',
			msg,
		};
		this.posts.push(post);
		return post;
	}

	async updatePost(postId: number, msg: string) {
		const post = this.posts.find((post) => post.id === postId);
		if (!post) {
			throw new Error('cannot find post :(');
		}

		post.msg = msg;
		return post;
	}

	async deletePost(postId: number) {
		this.posts = this.posts.filter((post) => post.id !== postId);
	}
}

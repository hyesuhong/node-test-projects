interface IPost {
	id: number;
	msg: string;
	createdDate: string;
	userId: string;
	userName: string;
	url?: string;
}

let posts: IPost[] = [
	{
		id: 2,
		msg: 'Dream Coding 👍',
		createdDate: '2022-11-17T23:19:57.000Z',
		userId: 'ellie',
		userName: 'Ellie',
		url: 'https://joeschmoe.io/api/v1/random',
	},
	{
		id: 1,
		msg: 'Hi :D',
		createdDate: '2022-11-17T23:19:57.000Z',
		userId: 'bob',
		userName: 'Bob',
	},
];

export async function getAll() {
	return posts;
}

export async function getAllByUser(userId: string) {
	return posts.filter((post) => post.userId === userId);
}

export async function getById(id: number) {
	return posts.find((post) => post.id === Number(id));
}

export async function create(msg: string, userId: string, userName: string) {
	const post: IPost = {
		id: Date.now(),
		msg,
		createdDate: new Date().toString(),
		userId,
		userName,
	};
	posts = [post, ...posts];
	return post;
}

export async function update(id: number, msg: string) {
	const postIndex = posts.findIndex((post) => post.id === Number(id));

	if (postIndex < 0) {
		return { message: `post id(${id}) not found` };
	}

	posts[postIndex].msg = msg;
	return posts[postIndex];
}

export async function remove(id: number) {
	posts = posts.filter((post) => post.id !== Number(id));
}

let posts = [
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

export async function getAllByUser(userId) {
	return posts.filter((post) => post.userId === userId);
}

export async function getById(id) {
	return posts.find((post) => post.id === Number(id));
}

export async function create(msg, userId, userName) {
	const post = {
		id: Date.now(),
		msg,
		createdDate: new Date(),
		userId,
		userName,
	};
	posts = [post, ...posts];
	return post;
}

export async function update(id, msg) {
	const postIndex = posts.findIndex((post) => post.id === Number(id));

	if (postIndex < 0) {
		return { message: `post id(${id}) not found` };
	}

	posts[postIndex].msg = msg;
	return posts[postIndex];
}

export async function remove(id) {
	posts = posts.filter((post) => post.id !== Number(id));
}

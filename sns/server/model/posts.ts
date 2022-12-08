import * as userRepository from '../model/auth';

interface IPost {
	id: number;
	msg: string;
	createdDate: string;
	userId: number;
}

let posts: IPost[] = [
	{
		id: 2,
		msg: 'Dream Coding 👍',
		createdDate: '2022-11-17T23:19:57.000Z',
		userId: 1,
	},
	{
		id: 1,
		msg: 'Hi :D',
		createdDate: '2022-11-17T23:19:57.000Z',
		userId: 0,
	},
];

export async function getAll() {
	return Promise.all(
		posts.map(async (post) => {
			const user = await userRepository.findById(post.userId);
			return { ...post, uid: user?.uid, name: user?.name, url: user?.url };
		})
	);
}

export async function getAllByUser(uid: string) {
	const user = await userRepository.findByUserId(uid);
	if (!user) {
		return null;
	}
	return getAll().then((posts) => {
		return posts.filter((post) => post.userId === user.id);
	});
}

export async function getById(id: number) {
	const found = posts.find((post) => post.id === Number(id));
	if (!found) {
		return null;
	}
	const user = await userRepository.findById(found.userId);
	return { ...found, uid: user?.uid, name: user?.name, url: user?.url };
}

export async function create(msg: string, userId: number) {
	const post: IPost = {
		id: Date.now(),
		msg,
		createdDate: new Date().toJSON(),
		userId,
	};
	posts = [post, ...posts];
	return getById(post.id);
}

export async function update(id: number, msg: string) {
	const postIndex = posts.findIndex((post) => post.id === Number(id));

	if (postIndex < 0) {
		return { message: `post id(${id}) not found` };
	}

	posts[postIndex].msg = msg;
	return getById(posts[postIndex].id);
}

export async function remove(id: number) {
	posts = posts.filter((post) => post.id !== Number(id));
}

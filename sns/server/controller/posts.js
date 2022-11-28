import * as postRepository from '../model/posts.js';

export async function getPosts(req, res) {
	const { userId } = req.query;
	const data = await (userId
		? postRepository.getAllByUser(userId)
		: postRepository.getAll());
	console.log(data);
	res.status(200).json(data);
}

export async function getPost(req, res) {
	const { id } = req.params;
	const post = await postRepository.getById(id);
	if (post) {
		res.status(200).json(post);
	} else {
		res.status(404).json({ message: `post id(${id}) not found` });
	}
}

export async function createPost(req, res) {
	const { msg, userId, userName } = req.body;
	const post = await postRepository.create(msg, userId, userName);

	res.status(201).json(post);
}

export async function updatePost(req, res) {
	const { id } = req.params;
	const { msg } = req.body;
	const post = await postRepository.update(id, msg);

	if (post.message) {
		res.status(404).json(post);
	} else {
		console.log(post);
		res.status(200).json(post);
	}
}

export async function deletePost(req, res) {
	const { id } = req.params;
	await postRepository.remove(id);

	res.sendStatus(204);
}

import * as postRepository from '../model/posts';
import { Request, Response } from 'express';
import { getSocketIO } from '../connection/socket';

type authRequest = Request & {
	userId?: number;
	token?: string;
};

type httpFunction = (req: authRequest, res: Response) => Promise<any>;

export const getPosts: httpFunction = async (req, res) => {
	const { userId } = req.query;
	const data = await (userId
		? postRepository.getAllByUser(userId.toString())
		: postRepository.getAll());
	// console.log(data);
	res.status(200).json(data);
};

export const getPost: httpFunction = async (req, res) => {
	const { id } = req.params;
	const post = await postRepository.getById(Number(id));
	if (post) {
		res.status(200).json(post);
	} else {
		res.status(404).json({ message: `post id(${id}) not found` });
	}
};

export const createPost: httpFunction = async (req, res) => {
	const { msg } = req.body;
	if (typeof req.userId !== 'number' && !req.userId) {
		return res.status(401).json({ message: 'Authentication Error' });
	}

	const post = await postRepository.create(msg, req.userId);

	res.status(201).json(post);
	getSocketIO().emit('post', post);
};

export const updatePost: httpFunction = async (req, res) => {
	const { id } = req.params;
	const { msg } = req.body;
	const post = await postRepository.getById(Number(id));
	if (!post) {
		return res.sendStatus(404);
	}
	if (post.userId !== req.userId) {
		return res.sendStatus(403);
	}
	const updated = await postRepository.update(Number(id), msg);

	if (updated) {
		// console.log(updated);
		res.status(200).json(updated);
	} else {
		res.status(404).json({ message: `post id(${id}) not found` });
	}
};

export const deletePost: httpFunction = async (req, res) => {
	const { id } = req.params;
	const post = await postRepository.getById(Number(id));
	if (!post) {
		return res.sendStatus(404);
	}
	if (post.userId !== req.userId) {
		return res.sendStatus(403);
	}

	await postRepository.remove(Number(id));

	res.sendStatus(204);
};

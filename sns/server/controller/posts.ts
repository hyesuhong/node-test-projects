import * as postRepository from '../model/posts';
import { Request, Response } from 'express';

type httpFunction = (req: Request, res: Response) => Promise<any>;

export const getPosts: httpFunction = async (req, res) => {
	const { userId } = req.query;
	const data = await (userId
		? postRepository.getAllByUser(userId.toString())
		: postRepository.getAll());
	console.log(data);
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
	const { msg, userId, userName } = req.body;
	const post = await postRepository.create(msg, userId, userName);

	res.status(201).json(post);
};

export const updatePost: httpFunction = async (req, res) => {
	const { id } = req.params;
	const { msg } = req.body;
	const post = await postRepository.update(Number(id), msg);

	if (post) {
		console.log(post);
		res.status(200).json(post);
	} else {
		res.status(404).json({ message: `post id(${id}) not found` });
	}
};

export const deletePost: httpFunction = async (req, res) => {
	const { id } = req.params;
	await postRepository.remove(Number(id));

	res.sendStatus(204);
};

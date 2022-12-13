import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as userRepository from '../model/auth';
import { config } from '../config';

type authRequest = Request & {
	userId?: number;
	token?: string;
};

type httpFunction = (
	req: authRequest,
	res: Response,
	next?: NextFunction
) => Promise<any>;

export const signUp: httpFunction = async (req, res) => {
	const { uid, password, name, email, url } = req.body;
	const found = await userRepository.findByUserId(uid);
	if (found) {
		return res.status(409).json({ message: `${uid} already exists` });
	}

	const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
	const user = await userRepository.createUser({
		uid,
		password: hashed,
		name,
		email,
		url,
	});
	const token = createJwtToken(user);
	res.status(201).json({ token, uid });
};

export const signIn: httpFunction = async (req, res) => {
	const { uid, password } = req.body;
	const user = await userRepository.findByUserId(uid);
	if (!user) {
		return res.status(401).json({ message: `Invalid id or password` });
	}

	const isValidPassword = await bcrypt.compare(password, user.password);
	if (!isValidPassword) {
		return res.status(401).json({ message: `Invalid id or password` });
	}

	const token = createJwtToken(user.id);
	res.status(200).json({ token, uid });
};

export const me: httpFunction = async (req, res, next) => {
	if (typeof req.userId !== 'number' && !req.userId) {
		return res.status(401).json({ message: 'Authentication Error' });
	}

	const user = await userRepository.findById(req.userId);
	if (typeof user !== 'number' && !user) {
		return res.status(404).json({ message: 'Cannot found user' });
	}
	res.status(200).json({ token: req.token, uid: user.uid });
};

function createJwtToken(id: number) {
	return jwt.sign({ id }, config.jwt.secretKey, {
		expiresIn: config.jwt.expiresInSec,
	});
}

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as userRepository from '../model/auth';

type authRequest = Request & {
	userId?: number;
	token?: string;
};

type httpFunction = (
	req: authRequest,
	res: Response,
	next: NextFunction
) => Promise<any>;

interface AuthJwtPayLoad extends jwt.JwtPayload {
	id?: number;
}

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth: httpFunction = async (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!(authHeader && authHeader.startsWith('Bearer'))) {
		return res.status(401).json(AUTH_ERROR);
	}

	const token = authHeader.split(' ')[1];
	// TODO: Make it secure
	jwt.verify(
		token,
		'u$*87v2Cgmf5$3rUEJhSG&7s@R%DrAJw',
		async (error, decoded) => {
			if (error) {
				return res.status(401).json(AUTH_ERROR);
			}

			if (typeof decoded !== 'object') {
				return res.status(401).json(AUTH_ERROR);
			}

			/*
			사용자가 DB에 있는지 확인하는 과정(생략가능)
			=> 사용자의 유효성을 확인하는 것이 필수적인 상황이라면,
			1. 필요한 API에 한해서 컨트롤러에서 확인하거나
			2. 여기처럼 별도의 미들웨어를 만들어서 확인할 수 있음.
			=> 미들웨어에서 jwt 토큰 자체로 유효성을 확인할 수 있으니(DB에 쿼리할 필요 없음) 더 좋은 성능을 기대해 볼 수 있지 않을까?
			*/
			const user = await userRepository.findById(decoded.id);
			if (!user) {
				return res.status(401).json(AUTH_ERROR);
			}

			req.userId = user.id;
			next();
		}
	);
};

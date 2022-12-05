import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validate = (req: Request, res: Response, next: any) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	} else {
		return res.status(400).json({ message: errors.array()[0].msg });
	}
};

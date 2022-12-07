import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validator';
import * as authController from '../controller/auth';
import { isAuth } from '../middleware/auth';

const router = express.Router();

const validateCredential = [
	body('uid')
		.trim()
		.notEmpty()
		.isLength({ min: 5 })
		.withMessage(`user's id should be at least 5 characters.`),
	body('password')
		.trim()
		.notEmpty()
		.isLength({ min: 5 })
		.withMessage(`password should be at least 5 characters.`),
	validate,
];

const validateSignup = [
	...validateCredential,
	body('name').notEmpty().withMessage(`name is missing.`),
	body('email').isEmail().normalizeEmail().withMessage(`invalid email`),
	body('url')
		.isURL()
		.withMessage(`invalid URL`)
		.optional({ nullable: true, checkFalsy: true }),
	validate,
];

router.post('/signUp', validateSignup, authController.signUp);

router.post('/signIn', validateCredential, authController.signIn);

router.get('/me', isAuth, authController.me);

export default router;
